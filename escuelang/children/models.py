import datetime
from django.db import models
from djmoney.models.fields import MoneyField


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

    @property
    def age(self):
        today = datetime.date.today()
        return (today.year - self.birthdate.year - 
            ((today.month, today.day) < (self.birthdate.month, self.birthdate.day)))
    
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
    default_price = MoneyField(max_digits=5, decimal_places=2,
                               default_currency='EUR')

    def __str__(self):
        return "%s (%s)" % (self.name, self.course.name)

    @staticmethod
    def get_active():
        return Season.objects.get(active=True)


class PricesPerDay(models.Model):

    season = models.ForeignKey(Season, on_delete=models.CASCADE)
    days = models.IntegerField()
    price = models.DecimalField(default=0, decimal_places=2, max_digits=8)


class Days(models.Model):

    name = models.CharField(max_length=25)
    dows = models.CharField(max_length=5)

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
    season = models.ForeignKey(Season, on_delete=models.CASCADE)
    price_month = MoneyField(decimal_places=2, max_digits=8,
                             default_currency='EUR')
    days = models.ForeignKey(Days, blank=True, null=True,
                            on_delete=models.CASCADE)
    monitor = models.ForeignKey(Monitor, blank=True, null=True,
                                on_delete=models.CASCADE)
    payment_method = models.OneToOneField(PaymentMethods, null=True,
                                          on_delete=models.SET_NULL)
    competition = models.BooleanField(default=False)

    def __str__(self):
        return "%s (%s)" % (self.child, self.season)


class Payments(models.Model):

    register = models.ForeignKey(RegisteredChild, on_delete=models.CASCADE)
    date = models.DateField(null=True, blank=True)
    amount = MoneyField(max_digits=5, decimal_places=2,
                        default_currency='EUR')

    def __str__(self):
        return "%s: %s" % (self.date, self.amount)


class Settings(models.Model):
    key = models.CharField(max_length=100)
    value = models.CharField(max_length=500)
    
    def __str__(self):
        return "%s: %s" % (self.key, self.value)
