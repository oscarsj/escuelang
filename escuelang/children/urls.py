from django.urls import path, include
from . import views
from rest_framework import routers

router = routers.DefaultRouter()
router.register('courses', views.CourseListCreate)
router.register('children', views.ChildrenListCreate)
router.register('seasons', views.SeasonListCreate)
router.register('monitors', views.MonitorListCreate)
router.register('days', views.DaysListCreate)
router.register('seasons/(?P<season>[^/.]+)/registers',
                views.RegisterViewSet, basename='registers')

urlpatterns = [
    path('', include(router.urls))
]