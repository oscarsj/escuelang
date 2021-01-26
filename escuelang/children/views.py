from django.shortcuts import get_object_or_404
from rest_framework import viewsets
from rest_framework.response import Response
from .models import (
    Course, Season, Child, RegisteredChild, Monitor, Days, Payments
)
from .serializers import (
    CourseSerializer, ChildrenSerializer, RegisterSerializer,
    MonitorSerializer, DaysSerializer, SeasonSerializer,
    PaymentsSerializer, RegisterReadOnlySerializer
)


class CourseListCreate(viewsets.ModelViewSet):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer


class SeasonListCreate(viewsets.ModelViewSet):
    queryset = Season.objects.all()
    serializer_class = SeasonSerializer

    def retrieve(self, request, pk=None):
        queryset = Season.objects.all()
        if pk == "active":
            season_id = Season.get_active().id
            season = get_object_or_404(queryset, pk=season_id)
        else:
            season = get_object_or_404(queryset, pk=pk)
        serializer = SeasonSerializer(season)
        return Response(serializer.data)


class ChildrenListCreate(viewsets.ModelViewSet):
    queryset = Child.objects.all()
    serializer_class = ChildrenSerializer


class RegisterViewSet(viewsets.ModelViewSet):
    serializer_class = RegisterSerializer

    def get_queryset(self):
        if self.kwargs.get('season_pk') == "active":
            return RegisteredChild.objects.filter(season__active=True)
        return RegisteredChild.objects.filter(
            season__id=self.kwargs.get('season_pk')
        )


class DetailedRegisterViewSet(viewsets.ModelViewSet):
    serializer_class = RegisterReadOnlySerializer

    def get_queryset(self):
        if self.kwargs.get('season_pk') == "active":
            return RegisteredChild.objects.filter(season__active=True)
        return RegisteredChild.objects.filter(
            season__id=self.kwargs.get('season_pk')
        )


class MonitorListCreate(viewsets.ModelViewSet):
    serializer_class = MonitorSerializer
    queryset = Monitor.objects.all()


class DaysListCreate(viewsets.ModelViewSet):
    serializer_class = DaysSerializer
    queryset = Days.objects.all()


class PaymentViewSet(viewsets.ModelViewSet):
    serializer_class = PaymentsSerializer

    def get_queryset(self):
        return Payments.objects.filter(
            register__id=self.kwargs.get('register_pk')
        )

class RegisterListCreate(viewsets.ModelViewSet):
    serializer_class = RegisterSerializer
    queryset = RegisteredChild.objects.all()
