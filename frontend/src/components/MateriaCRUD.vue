<template>
  <v-dialog v-model="dialog" max-width="600px" persistent>
    <v-card>
      <v-card-title>
        <span class="headline">{{ form.id ? 'Editar Materia' : 'Nueva Materia' }}</span>
      </v-card-title>
      <v-card-text>
        <v-form ref="form" v-model="valid" @submit.prevent="saveMateria">
          <v-text-field 
            v-model="form.nombre" 
            label="Nombre"
            :rules="rules.nombre"
            required>
          </v-text-field>
          <v-text-field 
            v-model="form.cant_alumnos" 
            label="Cantidad de Alumnos"
            type="number"
            :rules="rules.cant_alumnos"
            required>
          </v-text-field>
          <v-select
            v-model="form.id_carrera"
            :items="carreras"
            item-title="nombre"
            item-value="id"
            label="Carrera"
            :rules="rules.id_carrera"
            required>
          </v-select>
          <v-select
            v-model="form.id_profesor"
            :items="profesorCompleto"
            item-title="nombreCompleto"
            item-value="id"
            label="Profesor"
            :rules="rules.id_profesor"
            required>
          </v-select>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" text @click="saveMateria" :disabled="!valid">
          Guardar
        </v-btn>
        <v-btn color="grey" text @click="$emit('close')">Cancelar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import axios from 'axios';

export default {
  name: 'MateriaCRUD',
  props: {
    selectedItem: {
      type: Object,
      default: () => ({}),
    },
    carreras: {
      type: Array,
      default: () => [],
    },
    profesores: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      valid: false,
      dialog: true,
      form: {
        nombre: '',
        cant_alumnos: '',
        id_carrera: null,
        id_profesor: null,
      },
      rules: {
        nombre: [(v) => !!v || 'El nombre es obligatorio'],
        cant_alumnos: [(v) => !!v || 'La cantidad de alumnos es obligatoria'],
        id_carrera: [(v) => !!v || 'La carrera es obligatoria'],
        id_profesor: [(v) => !!v || 'El profesor es obligatorio'],
      },
    };
  },
  computed: {
    profesorCompleto() {
      return this.profesores.map(profesor => ({
        ...profesor,
        nombreCompleto: `${profesor.nombre} ${profesor.apellido}`
      }));
    },
  },
  methods: {
    async saveMateria() {
      if (this.$refs.form.validate()) {
        try {
          if (this.form.id) {
            await axios.put(`http://localhost:8000/api/materias/${this.form.id}/`, this.form);
          } else {
            await axios.post('http://localhost:8000/api/materias/', this.form);
          }
          this.$emit('saved');
          this.$emit('close');
        } catch (error) {
          console.error('Error saving materia:', error);
        }
      }
    },
  },
  watch: {
    selectedItem: {
      handler(newVal) {
        if (newVal) {
          this.form = { ...newVal };
        } else {
          this.form = {
            nombre: '',
            cant_alumnos: '',
            id_carrera: null,
            id_profesor: null,
          };
        }
      },
      immediate: true,
    },
  },
};
</script>

<style scoped>
</style>
