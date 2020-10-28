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

    def validate(self, data):
        return data


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

    def get_obj_from_querydcit(self, query_dict, name):
        result = {}
        for key, value in query_dict.items():
            if key.startswith(name):
                result[key.replace(name + '.', '')] = value
        return result

    def del_obj_from_querydcit(self, query_dict, name):
        for key in list(query_dict.keys()):
            if key.startswith(name):
                query_dict.pop(key)
        return query_dict
    #
    # def to_internal_value(self, data):
    #     copy = data.copy()
    #     child_data = self.get_obj_from_querydcit(copy, 'child')
    #     child, created = Child.objects.get_or_create(
    #         name=child_data['name'],
    #         surname=child_data['surname'],
    #         defaults=child_data)
    #     child.save()
    #     copy['child.id'] = child.id
    #     self.del_obj_from_querydcit(copy, 'child')
    #     return super(RegisterSerializer, self).to_internal_value(copy)

    def validate_child(self, value):
        return value

    def validate(self, data):
        # TODO: perform other validations than child
        return data

    def create(self, validated_data):
        child_data = validated_data['child']
        child, created = Child.objects.get_or_create(
            name=child_data['name'],
            surname=child_data['surname'],
            defaults=child_data,
        )
        register = RegisteredChild.objects.create(child=child, **validated_data)
        return register

    def update(self, instance, validated_data):
        course = Course.objects.get(name=validated_data['course'])
        instance.course = course
        instance.name = validated_data['name']
        registers_data = validated_data['children']
        present_registers = instance.children
        for register in registers_data:
            register_to_modify = self.get_register_to_modify(register,
                                                             present_registers)
            if not register_to_modify:
                child = self.get_child(register)
                if not child:
                    child = Child.objects.create(register.child)
                else:
                    child.update(register.child)
                child.save()
                register_to_modify = RegisteredChild.objects.create(register)
            else:
                register_to_modify.update(register)
            register_to_modify.child = child
            register_to_modify.save()
        instance.children.append(register_to_modify)
        instance.save()
        return SeasonSerializer(instance)

    @staticmethod
    def get_child(child_data):
        created, child = Child.objects.get_or_create(
            name=child_data['name'],
            surname=child_data['surname'], defaults=child_data)
        child.save()
        return child

    @staticmethod
    def get_register_to_modify(register, present_registers):
        for present_register in present_registers:
            if register.child.name == present_register.child.name \
                    and register.child.surname == present_register.child.surname:
                return RegisteredChild.objects.get(
                    id=present_register.id)
        return None


