from rest_framework import serializers
from .models import Carrera, Profesor, Materia, Aula, ReservaAula, HorarioMateria

class CarreraSerializer(serializers.ModelSerializer):
    class Meta:
        model = Carrera
        #fields = '__all__'
        fields = ['id', 'nombre']

class ProfesorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profesor
        #fields = '__all__'
        fields = ['id', 'nombre', 'apellido', 'mostrar', 'email']

class MateriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Materia
        #fields = '__all__'
        fields = ['id', 'nombre', 'cant_alumnos', 'id_carrera', 'id_profesor']

class AulaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Aula
        #fields = '__all__'
        fields = ['id', 'descripcion', 'ubicacion', 'cant_proyector', 'aforo', 'es_climatizada']

class ReservaAulaSerializer(serializers.ModelSerializer):
    class Meta:
        model = ReservaAula
        #fields = '__all__'
        fields = ['id_aula', 'fh_desde', 'fh_hasta', 'observacion']

class HorarioMateriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = HorarioMateria
        #fields = '__all__'
        fields = ['id_materia', 'id_reserva', 'fh_desde', 'fh_hasta']