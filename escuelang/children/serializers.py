from rest_framework import serializers
from .models import (
    Season, Course, Child, RegisteredChild, Monitor, Days
)


class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = ('name', 'location')


class SeasonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Season
        fields = ('id', 'course',
                  'name', 'start_date', 'end_date',
                  'active')


class ChildrenSerializer(serializers.ModelSerializer):
    class Meta:
        model = Child
        fields = ('id', 'name', 'first_surname', 'second_surname',
                  'birthdate', 'telephone', 'telephone2',
                  'address', 'town', 'postcode', 'school',
                  'email', 'notes', 'dni')


class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = RegisteredChild
        fields = ('id', 'child',
                  'days', 'monitor', 'price_month',
                  'payment_method', 'competition')


class MonitorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Monitor
        fields = ('id', 'name', 'first_surname', 'second_surname',
                  'nick', 'address')


class DaysSerializers(serializers.ModelSerializer):
    class Meta:
        model = Days
        fields = ('id', 'name', 'dow')