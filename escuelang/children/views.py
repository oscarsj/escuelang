from .models import (
    Course, Season, Child, RegisteredChild, Monitor, Days
)
from .serializers import (
    CourseSerializer, SeasonSerializer, ChildrenSerializer, RegisterSerializer,
    MonitorSerializer, DaysSerializers
)
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated


class CourseListCreate(generics.ListCreateAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    permission_classes = (IsAuthenticated,)


class SeasonListCreate(generics.ListCreateAPIView):
    permission_classes = (IsAuthenticated,)
    queryset = Season.objects.all()
    serializer_class = SeasonSerializer


class ChildrenListCreate(generics.ListCreateAPIView):
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


class MonitorListCreate(generics.ListCreateAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = MonitorSerializer
    queryset = Monitor.objects.all()


class DaysListCreate(generics.ListCreateAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = DaysSerializers
    queryset = Days.objects.all()
