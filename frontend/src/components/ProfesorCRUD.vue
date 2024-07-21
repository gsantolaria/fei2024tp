<template>
  <v-dialog v-model="dialog" max-width="600px" persistent>
      <v-card>
      <v-card-title>
          <span v-if="form.id">Editar profesor</span>
          <span v-else>Agregar profesor</span>
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
            :rules="rules.email" 
            required>
          </v-text-field>
          <v-text-field
            v-model="form.mostrar"
            label="Nombre a mostrar" 
            :rules="rules.mostrar" 
            required></v-text-field>
          </v-form>
      </v-card-text>
      <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="saveProfesor" :disabled="!valid">
            Guardar
          </v-btn>
          <v-btn color="grey" text @click="closeDialog">Cancelar</v-btn>
      </v-card-actions>
      </v-card>
  </v-dialog>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
  name: 'profesorCRUD',
  props: {
      profesor: {
      type: Object,
      default: () => ({}),
      },
  },
  data() {
      return {
      dialog: true,
      valid: false,
      form: {
          ...this.profesor,
      },
      rules: {
        nombre: [(v) => !!v || 'El nombre es obligatorio'],
        apellido: [(v) => !!v || 'El apellido es obligatorio'],
        email: [
          (v) => !!v || 'El correo es obligatorio',
          (v) => /.+@.+\..+/.test(v) || 'El correo debe ser válido',
        ],
      },
      };
  },
  methods: {
      saveProfesor() {
      if (this.$refs.form.validate()) {
          const profesorData = { ...this.form };
          const request = this.form.id
          ? axios.put(`http://localhost:8000/api/profesores/${this.form.id}/`, profesorData)
          : axios.post('http://localhost:8000/api/profesores/', profesorData);
  
          request
          .then(() => {
              this.$emit('refresh');
              this.closeDialog();
          })
          .catch(error => {
              console.error('Error saving profesor:', error);
          });
      }
      },
      closeDialog() {
        this.dialog = false;
        this.$emit('close');
      },
  },
  };
  </script>
  
  <style scoped>
  </style>  