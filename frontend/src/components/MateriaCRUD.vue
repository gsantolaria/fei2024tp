<template>
  <v-dialog v-model="dialog" max-width="600px" persistent>
    <v-card>
      <v-card-title>
        <span v-if="form.id">Editar Materia</span>
        <span v-else>Agregar Materia</span>
      </v-card-title>
      <v-card-text>
        <v-form ref="form" v-model="valid" @submit.prevent="saveMateria">
          <v-text-field
            v-model="form.nombre"
            label="Nombre"
            :rules="rules.nombre"
            required
          ></v-text-field>
          <v-text-field
            v-model="form.cant_alumnos"
            label="Cantidad de Alumnos"
            :rules="rules.cant_alumnos"
            required
          ></v-text-field>
          <v-select
            v-model="form.id_carrera"
            :items="carreras"
            item-text="nombre"
            item-value="id"
            label="Carrera"
            :rules="rules.id_carrera"
            required
          ></v-select>
          <v-select
            v-model="form.id_profesor"
            :items="profesores"
            item-text="nombre"
            item-value="id"
            label="Profesor"
            :rules="rules.id_profesor"
            required
          ></v-select>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="saveMateria" :disabled="!valid">
          Guardar
        </v-btn>
        <v-btn color="grey" text @click="closeDialog">Cancelar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { ref, watch, onMounted } from 'vue';
import axios from 'axios';

export default {
  name: 'MateriaCRUD',
  props: {
    materia: {
      type: Object,
      default: () => ({}),
    },
    carreras: {
      type: Array,
      required: true,
    },
    profesores: {
      type: Array,
      required: true,
    },
  },
  setup(props, { emit }) {
    const dialog = ref(true);
    const valid = ref(false);
    const form = ref({ ...props.materia });
    const rules = {
      nombre: [(v) => !!v || 'Nombre es requerido'],
      cant_alumnos: [(v) => !!v || 'Cantidad de alumnos es requerida'],
      id_carrera: [(v) => !!v || 'Carrera es requerida'],
      id_profesor: [(v) => !!v || 'Profesor es requerido'],
    };

    watch(() => props.materia, (newVal) => {
      form.value = { ...newVal };
    });

    const saveMateria = async () => {
      const materiaData = {
        id: form.value.id,
        nombre: form.value.nombre,
        cant_alumnos: form.value.cant_alumnos,
        id_carrera: form.value.id_carrera,
        id_profesor: form.value.id_profesor,
      };

      if (materiaData.id) {
        try {
          await axios.put(`http://localhost:8000/api/materias/${materiaData.id}/`, materiaData);
          emit('refresh');
          closeDialog();
        } catch (error) {
          console.error('Error updating materia:', error);
        }
      } else {
        try {
          await axios.post('http://localhost:8000/api/materias/', materiaData);
          emit('refresh');
          closeDialog();
        } catch (error) {
          console.error('Error creating materia:', error);
        }
      }
    };

    const closeDialog = () => {
      dialog.value = false;
    };

    onMounted(() => {
      dialog.value = true;
    });

    return {
      dialog,
      valid,
      form,
      rules,
      saveMateria,
      closeDialog,
    };
  },
};
</script>

<style scoped>
</style>
