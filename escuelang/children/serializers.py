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
            'id', 'course', 'name', 'start_date', 'end_date', 'active',
            'children')
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

    monitor = serializers.SlugRelatedField(read_only=False,
                                           queryset=Monitor.objects.all(),
                                           slug_field='nick')
    days = serializers.SlugRelatedField(read_only=False,
                                        queryset=Days.objects.all(),
                                        slug_field='name',
                                        many=True)
    season = serializers.StringRelatedField()

    class Meta:
        model = RegisteredChild
        fields = ('id', 'season', 'child',
                  'days', 'monitor', 'price_month',
                  'payment_method', 'competition')

    def create(self, validated_data):
        data = self.context['request'].POST.copy()
        register = RegisteredChild.objects.create(
            season=data.get('season'),
            child=validated_data['child'],
            monitor=validated_data['monitor'],
            price_month=validated_data['price_month'],
            payment_method=validated_data['payment_method'],
            competition=validated_data['competition'])
        register.save()
        for day in validated_data['days']:
            register.days.set(day)
            
        return register

