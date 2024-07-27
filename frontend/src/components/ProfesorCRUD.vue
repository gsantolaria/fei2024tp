<template>
  <v-dialog v-model="dialog" max-width="600px" persistent>
    <v-card>
      <v-card-title>
        <span class="headline">{{ form.id ? 'Editar profesor' : 'Nuevo profesor' }}</span>
      </v-card-title>
      <v-card-text>
        <v-form ref="form" v-model="valid" @submit.prevent="saveProfesor">
          <v-text-field 
            v-model="form.nombre" 
            label="Nombre"
            :rules="rules.nombre"
            required>
          </v-text-field>
          <v-text-field
            v-model="form.apellido"
            label="Apellido" 
            :rules="rules.apellido" 
            required>
          </v-text-field>
          <v-text-field 
            v-model="form.email" 
            label="Email"
            :rules="rules.email">
          </v-text-field>
          <v-text-field
            v-model="form.mostrar"
            label="Nombre a mostrar">
          </v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" text @click="saveProfesor" :disabled="!valid">
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
  name: 'ProfesorCRUD',
  props: {
    selectedItem: {
      type: Object,
      default: () => ({}),
    }
  },
  data() {
    return {
      valid: false,
      dialog: true,
      form: {
        nombre: '',
        apellido: '',
        email: '',
        mostrar: '',
      },
      rules: {
        nombre: [(v) => !!v || 'El nombre es obligatorio'],
        apellido: [(v) => !!v || 'El apellido es obligatorio'],
        email: [
          //(v) => !!v || 'El correo es obligatorio',
          (v) => ( !v || /.+@.+\..+/.test(v)) || 'El correo debe ser válido',
        ],
        //mostrar: [(v) => !!v || 'El nombre a mostrar es obligatorio'],
      },
    };
  },
  methods: {
    async saveProfesor() {
      if (this.$refs.form.validate()) {
        try {
          if (this.form.id) {
            await axios.put(`http://localhost:8000/api/profesores/${this.form.id}/`, this.form);
          } else {
            await axios.post('http://localhost:8000/api/profesores/', this.form);
          }
          this.$emit('saved');
          this.$emit('close');
        } catch (error) {
          console.error('Error saving profesor:', error);
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
            apellido: '',
            email: '',
            mostrar: '',
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
