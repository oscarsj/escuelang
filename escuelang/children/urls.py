from django.urls import path
from . import views

urlpatterns = [
    path('api/course/', views.CourseListCreate.as_view()),
    path('api/season/', views.SeasonListCreate.as_view()),
    path('api/children/', views.ChildrenListCreate.as_view()),
]