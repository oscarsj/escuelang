from .models import (
    Course, Season, Child, RegisteredChild, Monitor, Days
)
from .serializers import (
    CourseSerializer, SeasonSerializer, ChildrenSerializer, RegisterSerializer,
    MonitorSerializer, DaysSerializer
)
from rest_framework import generics, viewsets
from rest_framework.permissions import IsAuthenticated


class CourseListCreate(viewsets.ModelViewSet):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    permission_classes = (IsAuthenticated,)


class SeasonListCreate(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated,)
    queryset = Season.objects.all()
    serializer_class = SeasonSerializer


class SeasonDetailCreate(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated,)
    serializer_class = SeasonSerializer
    lookup_field = 'id'

    def get_queryset(self):
        return Season.objects.get(id=self.kwargs['season'])


class ActiveSeasonDetailCreate(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated,)
    serializer_class = RegisterSerializer
    queryset = Season.get_active_season()


class ChildrenListCreate(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated,)
    queryset = Child.objects.all()
    serializer_class = ChildrenSerializer


class RegisterListCreate(generics.ListCreateAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = RegisterSerializer

    def get_queryset(self):
        return RegisteredChild.objects.filter(
            season__id=self.kwargs.get('season')
        )


class MonitorListCreate(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated,)
    serializer_class = MonitorSerializer
    queryset = Monitor.objects.all()


class DaysListCreate(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated,)
    serializer_class = DaysSerializer
    queryset = Days.objects.all()
