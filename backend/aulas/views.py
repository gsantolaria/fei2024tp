from rest_framework import viewsets
from django.shortcuts import render
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from aulas.models import Carrera, Profesor, Materia, Aula, ReservaAula, HorarioMateria
from aulas.serializers import CarreraSerializer, ProfesorSerializer, MateriaSerializer, AulaSerializer, ReservaAulaSerializer, HorarioMateriaSerializer

""" def home(request):
    return render(request, './home.html') """

class CarreraViewSet(viewsets.ModelViewSet):
    queryset = Carrera.objects.all()
    serializer_class = CarreraSerializer
    permission_classes = [IsAuthenticated]

class ProfesorViewSet(viewsets.ModelViewSet):
    queryset = Profesor.objects.all()
    serializer_class = ProfesorSerializer
    permission_classes = [IsAuthenticated]

class MateriaViewSet(viewsets.ModelViewSet):
    queryset = Materia.objects.all()
    serializer_class = MateriaSerializer
    permission_classes = [IsAuthenticated]

class AulaViewSet(viewsets.ModelViewSet):
    queryset = Aula.objects.all()
    serializer_class = AulaSerializer
    permission_classes = [IsAuthenticated]

class ReservaAulaViewSet(viewsets.ModelViewSet):
    queryset = ReservaAula.objects.all()
    serializer_class = ReservaAulaSerializer
    permission_classes = [IsAuthenticated]

class HorarioMateriaViewSet(viewsets.ModelViewSet):
    queryset = HorarioMateria.objects.all()
    serializer_class = HorarioMateriaSerializer
    permission_classes = [IsAuthenticated]

# Create your views here.