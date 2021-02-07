from rest_framework import serializers
from .models import (
    Season, Course, Child, Settings,
    RegisteredChild, Monitor, Days, Payments
)


class SettingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Settings
        fields = ('key', 'value')


class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = ('name', 'location')


class SeasonSerializer(serializers.ModelSerializer):
    course = serializers.SlugRelatedField(slug_field='name',
                                          queryset=Course.objects.all())

    class Meta:
        model = Season
        fields = (
            'id', 'course', 'name', 'start_date', 'end_date', 'default_price',
            'active', 'children')
        depth = 0


class MonitorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Monitor
        fields = ('id', 'name', 'first_surname', 'second_surname',
                  'nick', 'address')


class DaysSerializer(serializers.ModelSerializer):
    class Meta:
        model = Days
        fields = ('id', 'name', 'dows')


class ChildrenSerializer(serializers.ModelSerializer):
    class Meta:
        model = Child
        fields = ('id', 'name', 'surname',
                  'birthdate', 'age', 'telephone', 'telephone2',
                  'address', 'town', 'postcode', 'school',
                  'email', 'notes', 'dni')


class RegisterSerializer(serializers.ModelSerializer):

    monitor = serializers.SlugRelatedField(read_only=False,
                                           queryset=Monitor.objects.all(),
                                           slug_field='nick')
    days = serializers.SlugRelatedField(read_only=False,
                                        queryset=Days.objects.all(),
                                        slug_field='name')
    season = serializers.StringRelatedField()

    class Meta:
        model = RegisteredChild
        fields = ('id', 'season', 'child',
                  'days', 'monitor', 'price_month',
                  'payment_method', 'competition',
                  'payments_set')
        depth = 0

    def create(self, validated_data):
        request = self.context['request']
        season_id = request.parser_context['kwargs']['season_pk']
        season = Season.objects.get(id=season_id)
        register = RegisteredChild.objects.create(
            season=season,
            child=validated_data['child'],
            monitor=validated_data['monitor'],
            price_month=validated_data.get('price_month',
                                           season.default_price),
            payment_method=validated_data.get('payment_method'),
            competition=validated_data.get('competition', False)
        )
        register.save()
        register.days.set(validated_data['days'])
        register.save()

        return register

class RegisterReadOnlySerializer(serializers.ModelSerializer):

    monitor = serializers.SlugRelatedField(read_only=True,
                                           slug_field='nick')
    days = serializers.SlugRelatedField(read_only=True,
                                        slug_field='name')
    season = serializers.StringRelatedField()
    payments_set = serializers.StringRelatedField(read_only=True, many=True)
    child = ChildrenSerializer()
    
    class Meta:
        model = RegisteredChild
        fields = ('id', 'season', 'child',
                  'days', 'monitor', 'price_month',
                  'payment_method', 'competition',
                  'payments_set')
        depth = 1


class PaymentsSerializer(serializers.ModelSerializer):

    class Meta:
        model = Payments
        fields = ('date', 'amount')

    def create(self, validated_data):
        context = self.context['request'].parser_context['kwargs']
        register_id = context['register_pk']

        payment = Payments.objects.create(
            register_id=register_id,
            date=validated_data['date'],
            amount=validated_data['amount'])
        payment.save()
        return payment
