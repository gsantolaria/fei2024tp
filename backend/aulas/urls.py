from django.urls import path, include
from rest_framework.routers import DefaultRouter
from aulas import views
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

router = DefaultRouter()
router.register(r'carreras', views.CarreraViewSet)
router.register(r'profesores', views.ProfesorViewSet)
router.register(r'materias', views.MateriaViewSet)
router.register(r'aulas', views.AulaViewSet)
router.register(r'reservas', views.ReservaAulaViewSet)
router.register(r'horarios', views.HorarioMateriaViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
