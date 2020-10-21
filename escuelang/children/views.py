from .models import Course, Season, Child

from .serializers import (CourseSerializer, SeasonSerializer,
                          ChildrenSerializer)
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
