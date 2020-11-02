from .models import (
    Course, Season, Child, RegisteredChild, Monitor, Days, Payments
)
from .serializers import (
    CourseSerializer, SeasonSerializer, ChildrenSerializer, RegisterSerializer,
    MonitorSerializer, DaysSerializer, SeasonShallowSerializer,
    PaymentsSerializer
)
from rest_framework import viewsets


class CourseListCreate(viewsets.ModelViewSet):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer


class SeasonListCreate(viewsets.ModelViewSet):
    queryset = Season.objects.all()
    serializer_class = SeasonShallowSerializer


class SeasonDetailCreate(viewsets.ModelViewSet):
    serializer_class = SeasonSerializer
    lookup_field = 'id'

    def get_queryset(self):
        return Season.objects.get(id=self.kwargs['season'])


class ActiveSeasonDetailCreate(viewsets.ModelViewSet):
    serializer_class = SeasonSerializer
    queryset = Season.get_active_season()


class ChildrenListCreate(viewsets.ModelViewSet):
    queryset = Child.objects.all()
    serializer_class = ChildrenSerializer


class RegisterViewSet(viewsets.ModelViewSet):
    serializer_class = RegisterSerializer

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
