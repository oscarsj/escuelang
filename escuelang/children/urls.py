from django.urls import path, include
from . import views
from rest_framework import routers
from rest_framework_nested import routers as nested_router


router = routers.DefaultRouter()
router.register('courses', views.CourseListCreate)
router.register('children', views.ChildrenListCreate)
router.register('seasons', views.SeasonListCreate)
router.register('monitors', views.MonitorListCreate)
router.register('days', views.DaysListCreate)

season_router = nested_router.NestedSimpleRouter(router, r'seasons',
                                                 lookup='season')
season_router.register(r'registers', views.RegisterViewSet,
                       basename='registers')
season_router.register(r'children', views.DetailedRegisterViewSet,
                       basename='children')

payment_router = nested_router.NestedSimpleRouter(season_router, r'registers',
                                                  lookup='register')
payment_router.register(r'payments', views.PaymentViewSet,
                        basename='payments')

urlpatterns = [
    path('', include(router.urls)),
    path('', include(season_router.urls)),
    path('', include(payment_router.urls))
]
