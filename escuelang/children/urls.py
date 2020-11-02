from django.urls import path, include
from django.conf.urls import url
from rest_framework import routers, permissions
from rest_framework_nested import routers as nested_router
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from . import views


schema_view = get_schema_view(
    openapi.Info(title="Escuela API",
                 default_version='v1',
                 description="Test description",
                 terms_of_service="https://www.google.com/policies/terms/",
                 contact=openapi.Contact(email="contact@snippets.local"),
                 license=openapi.License(name="BSD License"),
    ),
    public=True,
    permission_classes=[permissions.IsAuthenticated],
)


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
    url(r'^swagger$', schema_view.with_ui('swagger', cache_timeout=0),),
    path('', include(router.urls)),
    path('', include(season_router.urls)),
    path('', include(payment_router.urls))
]
