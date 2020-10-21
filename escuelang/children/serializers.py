from rest_framework import serializers
from .models import Season, Course, Child


class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = ('name', 'location')


class SeasonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Season
        fields = ('course',
                  'name', 'start_date', 'end_date',
                  'active')


class ChildrenSerializer(serializers.ModelSerializer):
    class Meta:
        model = Child
        fields = ('name', 'first_surname', 'second_surname',
                  'birthdate', 'telephone', 'telephone2',
                  'address', 'town', 'postcode', 'school',
                  'email', 'notes', 'dni')