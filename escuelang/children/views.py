from rest_framework import viewsets
from .models import (
    Course, Season, Child, RegisteredChild, Monitor, Days, Payments
)
from .serializers import (
    CourseSerializer, SeasonSerializer, ChildrenSerializer, RegisterSerializer,
    MonitorSerializer, DaysSerializer, SeasonSerializer,
    PaymentsSerializer, RegisterReadOnlySerializer
)


class CourseListCreate(viewsets.ModelViewSet):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer


class SeasonListCreate(viewsets.ModelViewSet):
    queryset = Season.objects.all()
    serializer_class = SeasonSerializer


class ChildrenListCreate(viewsets.ModelViewSet):
    queryset = Child.objects.all()
    serializer_class = ChildrenSerializer


class RegisterViewSet(viewsets.ModelViewSet):
    serializer_class = RegisterSerializer

    def get_queryset(self):
        return RegisteredChild.objects.filter(
            season__id=self.kwargs.get('season_pk')
        )


class DetailedRegisterViewSet(viewsets.ModelViewSet):
    serializer_class = RegisterReadOnlySerializer

    def get_queryset(self):
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
