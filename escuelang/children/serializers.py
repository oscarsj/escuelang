from rest_framework import serializers
from .models import (
    Season, Course, Child, RegisteredChild, Monitor, Days
)


class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = ('name', 'location')


class SeasonSerializer(serializers.ModelSerializer):
    course = serializers.SlugRelatedField(slug_field='name',
                                          queryset=Course.objects.all())

    class Meta:
        model = Season
        fields = ('id', 'course',
                  'name', 'start_date', 'end_date',
                  'active', 'children')
        depth = 1


class SeasonShallowSerializer(SeasonSerializer):
    course = serializers.SlugRelatedField(slug_field='name',
                                          queryset=Course.objects.all())

    class Meta:
        model = Season
        fields = (
            'id', 'course', 'name', 'start_date', 'end_date', 'active', 'children')
        depth = 0


class MonitorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Monitor
        fields = ('id', 'name', 'first_surname', 'second_surname',
                  'nick', 'address')


class DaysSerializer(serializers.ModelSerializer):
    class Meta:
        model = Days
        fields = ('id', 'name', 'dow')


class ChildrenSerializer(serializers.ModelSerializer):
    class Meta:
        model = Child
        fields = ('id', 'name', 'surname',
                  'birthdate', 'telephone', 'telephone2',
                  'address', 'town', 'postcode', 'school',
                  'email', 'notes', 'dni')


class RegisterSerializer(serializers.ModelSerializer):
    child = ChildrenSerializer(many=False)
    season = serializers.StringRelatedField(many=False)
    days = serializers.StringRelatedField(many=True)
    monitor = serializers.StringRelatedField(many=False)

    class Meta:
        model = RegisteredChild
        fields = ('id', 'season', 'child',
                  'days', 'monitor', 'price_month',
                  'payment_method', 'competition')

    def create(self, validated_data):
        child_data = validated_data['child']

        child, created = Child.objects.get_or_create(
            name=child_data['name'],
            surname=child_data['surname'],
            defaults=child_data,
        )
        register = RegisteredChild.objects.create(child=child, **validated_data)
        return register
