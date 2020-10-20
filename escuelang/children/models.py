import datetime
from django.db import models


class Parent(models.Model):
    class Meta:
        verbose_name = "padre"

    name = models.CharField("nombre", max_length=255)
    first_surname = models.CharField("primer apellido", max_length=255)
    second_surname = models.CharField("segundo apellido", max_length=255, null=True, blank=True)
    address = models.CharField("dirección", max_length=255, null=True, blank=True)

    def __unicode__(self):
        return "%s %s" % (self.name, self.first_surname)

    def get_fields(self):
        # make a list of field/values.
        return [(field, field.value_to_string(self)) for field in Parent._meta.fields]

    @classmethod
    def create(cls, initial_values):
        parent = cls(name=initial_values['name'],
                     first_surname=initial_values['first_surname'],
                     second_surname=initial_values['second_surname'],
                     address=initial_values['address'],
                     )
        return parent


class Child(models.Model):
    class Meta:
        verbose_name = "niño"
        ordering = ['first_surname', 'second_surname', 'name']

    id = models.AutoField(primary_key=True)
    name = models.CharField("nombre", max_length=255)
    first_surname = models.CharField("primer apellido", max_length=255)
    second_surname = models.CharField("segundo apellido", max_length=255, blank=True)
    birthdate = models.DateField("fecha de nacimiento", null=True, blank=True)
    telephone = models.CharField("teléfono", max_length=13, null=True, blank=True)
    telephone2 = models.CharField("teléfono 2", max_length=13, null=True, blank=True)
    address = models.CharField("dirección", max_length=255, null=True, blank=True)
    town = models.CharField("localidad", max_length=255, null=True, blank=True)
    postal = models.CharField("código postal", max_length=5, null=True, blank=True)
    school = models.CharField("colegio", max_length=255, null=True, blank=True)
    email = models.EmailField(blank=True)
    parents = models.ManyToManyField(Parent, blank=True, null=True, verbose_name="padres")
    notes = models.CharField("notas", max_length=500, blank=True, null=True)
    dni = models.CharField("DNI", max_length=9, blank=True, null=True)

    def get_fullname(self):
        return "%s %s %s".lower() % (self.first_surname,
                                 self.second_surname,
                                 self.name)


    def __unicode__(self):
        return self.get_fullname()

    def get_fields(self):
        # make a list of field/values.
        return [(field, field.value_to_string(self)) for field in Child._meta.fields]

    def get_data(self):
        return {'name': self.name,
                'first_surname': self.first_surname,
                'second_surname': self.second_surname,
                'birthdate': self.birthdate,
                'address': self.address,
                'school': self.school,
                }

    @classmethod
    def create(cls, initial_values):
        child = cls(name=initial_values['name'],
                    first_surname=initial_values['first_surname'],
                    second_surname=initial_values['second_surname'],
                    birthdate=initial_values['birthdate'],
                    address=initial_values['address'],
                    school=initial_values['school'],
                    )
        return child


class Monitor(models.Model):
    class Meta:
        verbose_name = "monitor"
        verbose_name_plural = "monitores"

    name = models.CharField("nombre", max_length=255)
    first_surname = models.CharField("primer apellido", max_length=255, blank=True, null=True)
    second_surname = models.CharField("segundo apellido", max_length=255, blank=True, null=True)
    nick = models.CharField("apodo", max_length=255, blank=True, null=True)
    address = models.CharField("dirección", max_length=255, blank=True, null=True)

    def __unicode__(self):
        return self.nick if self.nick else self.name

    def get_fields(self):
        # make a list of field/values.
        return [(field, field.value_to_string(self)) for field in Monitor._meta.fields]

    @classmethod
    def create(cls, initial_values):
        monitor = cls(name=initial_values['name'],
                      first_surname=initial_values['first_surname'],
                      second_surname=initial_values['second_surname'],
                      address=initial_values['address'],
                      )
        return monitor


class Course(models.Model):
    class Meta:
        verbose_name = "curso"

    name = models.CharField("nombre", max_length=255)
    location = models.CharField("lugar", max_length=255)

    def __unicode__(self):
        return self.name


class Season(models.Model):
    class Meta:
        verbose_name = "temporada"

    course = models.ForeignKey(Course, verbose_name="curso", on_delete=models.CASCADE)
    name = models.CharField("nombre", max_length=255)
    start_date = models.DateField("fecha de comienzo")
    end_date = models.DateField("fecha de finalización")
    monitors = models.ManyToManyField(Monitor, blank=True, verbose_name="monitores")
    children = models.ManyToManyField(Child, through='RegisteredChild', verbose_name="alumnos", null=True, blank=True)
    active = models.BooleanField("temporada actual")

    def __unicode__(self):
        return "%s (%s)" % (self.name, self.course.name)

    @staticmethod
    def get_active_season():
        return Season.objects.get(active=True)


class PricesPerDay(models.Model):
    class Meta:
        verbose_name = "Precios por dias"

    season = models.ForeignKey(Season, verbose_name="temporada", on_delete=models.CASCADE)
    days = models.IntegerField("número de días")
    price = models.DecimalField("precio", default=0, decimal_places=2, max_digits=8)


class Days(models.Model):
    class Meta:
        verbose_name = "día"

    name = models.CharField("día", max_length=25)
    dow = models.IntegerField("día de la semana")
    def __unicode__(self):
        return "%s" % self.name


class PaymentMethods(models.Model):
    class Meta:
        verbose_name = "método de pago"
        verbose_name_plural = "métodos de pago"

    name = models.CharField("método de pago", max_length=255)

    def __unicode__(self):
        return self.name


class RegisteredChild(models.Model):
    class Meta:
        verbose_name = "registro"

    child = models.ForeignKey(Child, verbose_name="alumno", on_delete=models.CASCADE)
    season = models.ForeignKey(Season, verbose_name="temporada", on_delete=models.CASCADE)
    price_month = models.DecimalField("precio/mes", decimal_places=2, max_digits=8, default=0)
    days = models.ManyToManyField(Days, blank=True, null=True, verbose_name="días de clase")
    monitor = models.ForeignKey(Monitor, blank=True, null=True, verbose_name="monitor", on_delete=models.CASCADE)
    payment_method = models.ForeignKey(PaymentMethods, blank=True, null=True, verbose_name="método de pago",
                                       on_delete=models.CASCADE)
    competition = models.BooleanField("competición", default=False)


    def __unicode__(self):
        return "%s (%s)" % (self.child, self.season)

    def get_child_birthdate(self):
        if self.child.birthdate:
            return self.child.birthdate
        else:
            return datetime.datetime.now().date()


class Payments(models.Model):
    class Meta:
        verbose_name = "pago"

    register = models.ForeignKey(RegisteredChild, verbose_name="alumno", on_delete=models.CASCADE)
    date = models.DateField("fecha", null=True, blank=True)
    amount = models.DecimalField("cantidad", decimal_places=2, max_digits=8, default=0)

    def __unicode__(self):
        return "%s el %s (%s euros)" % (self.register, self.date, self.amount)


class ModelFactory(object):
    @staticmethod
    def getModel(model_name):
        if model_name == "Child":
            return Child
        if model_name == "Parent":
            return Parent
        if model_name == "Monitor":
            return Monitor

