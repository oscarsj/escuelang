from django.contrib import admin
from children.models import (Child, Parent, RegisteredChild, Course,
                             Season, Monitor, PaymentMethods, Payments,
                             Days, PricesPerDay)

admin.site.register(Child)
admin.site.register(Parent)
admin.site.register(RegisteredChild)
admin.site.register(Course)
admin.site.register(Season)
admin.site.register(Monitor)
admin.site.register(PaymentMethods)
admin.site.register(Payments)
admin.site.register(Days)
admin.site.register(PricesPerDay)
