import datetime
from django.db import models


class Parent(models.Model):

    name = models.CharField(max_length=255)
    first_surname = models.CharField(max_length=255)
    second_surname = models.CharField(max_length=255, null=True, blank=True)
    address = models.CharField(max_length=255, null=True, blank=True)

    def __str__(self):
        return "%s %s" % (self.name, self.first_surname)


class Child(models.Model):

    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255)
    surname = models.CharField(max_length=255)
    birthdate = models.DateField(null=True, blank=True)
    telephone = models.CharField(max_length=13, blank=True)
    telephone2 = models.CharField(max_length=13, blank=True)
    address = models.CharField(max_length=255, blank=True)
    town = models.CharField(max_length=255, blank=True)
    postcode = models.CharField(max_length=5, blank=True)
    school = models.CharField(max_length=255, blank=True)
    email = models.EmailField(blank=True)
    parents = models.ManyToManyField(Parent, blank=True, null=True)
    notes = models.CharField(max_length=500, blank=True)
    dni = models.CharField(max_length=9, blank=True)

    def __str__(self):
        return "%s, %s" % (self.surname, self.name)

    class Meta:
        unique_together = (('name', 'surname'),)


class Monitor(models.Model):

    name = models.CharField(max_length=255)
    first_surname = models.CharField(max_length=255, blank=True, null=True)
    second_surname = models.CharField(max_length=255, blank=True, null=True)
    nick = models.CharField(max_length=255, blank=True, null=True)
    address = models.CharField(max_length=255, blank=True, null=True)

    def __str__(self):
        return self.nick or self.name


class Course(models.Model):

    name = models.CharField(max_length=255)
    location = models.CharField(max_length=255)

    def __str__(self):
        return self.name


class Season(models.Model):

    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    start_date = models.DateField()
    end_date = models.DateField()
    monitors = models.ManyToManyField(Monitor, blank=True)
    children = models.ManyToManyField(Child, through='RegisteredChild',
                                      null=True, blank=True)
    active = models.BooleanField()

    def __str__(self):
        return "%s (%s)" % (self.name, self.course.name)

    @property
    def repr(self):
        return self.__str__()

    @staticmethod
    def get_active_season():
        return Season.objects.filter(active=True)


class PricesPerDay(models.Model):

    season = models.ForeignKey(Season, on_delete=models.CASCADE)
    days = models.IntegerField()
    price = models.DecimalField(default=0, decimal_places=2, max_digits=8)


class Days(models.Model):

    name = models.CharField(max_length=25)
    dow = models.IntegerField()

    def __str__(self):
        return "%s" % self.name


class PaymentMethods(models.Model):

    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name


class RegisteredChild(models.Model):

    class Meta:
        unique_together = (('child', 'season'),)

    child = models.OneToOneField(Child, on_delete=models.CASCADE)
    season = models.OneToOneField(Season, on_delete=models.CASCADE)
    price_month = models.DecimalField(decimal_places=2, max_digits=8, default=0)
    days = models.ManyToManyField(Days)
    monitor = models.OneToOneField(Monitor, blank=True, null=True,
                                   on_delete=models.CASCADE)
    payment_method = models.OneToOneField(PaymentMethods, blank=True, null=True,
                                          on_delete=models.CASCADE)
    competition = models.BooleanField(default=False)

    def __str__(self):
        return "%s (%s)" % (self.child, self.season)


class Payments(models.Model):

    register = models.OneToOneField(RegisteredChild, on_delete=models.CASCADE)
    date = models.DateField(null=True, blank=True)
    amount = models.DecimalField(decimal_places=2, max_digits=8, default=0)

    def __str__(self):
        return "%s el %s (%s euros)" % (self.register, self.date, self.amount)


