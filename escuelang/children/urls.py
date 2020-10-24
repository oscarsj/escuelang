from django.urls import path
from . import views

urlpatterns = [
    path('course/', views.CourseListCreate.as_view()),
    path('children/', views.ChildrenListCreate.as_view()),
    path('season/<str:season>/', views.RegisterListCreate.as_view()),
    path('season/', views.SeasonListCreate.as_view()),
    path('monitor/', views.MonitorListCreate.as_view()),
    path('days/', views.DaysListCreate.as_view())
]