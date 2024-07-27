<template>
  <v-card>
    <v-card-title>
      <span class="headline">{{ selectedItem ? 'Editar Aula' : 'Nueva Aula' }}</span>
    </v-card-title>
    <v-card-text>
      <v-form ref="form" v-model="valid" @submit.prevent="saveAula">
        <v-text-field v-model="form.descripcion" label="Nombre" :rules="rules.descripcion" required></v-text-field>
        <v-text-field v-model="form.aforo" label="Aforo" :rules="rules.aforo" required></v-text-field>
        <v-text-field v-model="form.ubicacion" label="Ubicacion" :rules="rules.ubicacion" required></v-text-field>
        <v-text-field v-model="form.cant_proyector" label="Cant Proyectores" :rules="rules.cant_proyector" required></v-text-field>
        <v-checkbox
          v-model="form.es_climatizada"
          label="Es climatizada?"
        ></v-checkbox>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="blue darken-1" text @click="$emit('close')">Cancelar</v-btn>
      <v-btn color="blue darken-1" text @click="saveAula">Guardar</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import axios from 'axios';

export default {
  name: 'AulaCRUD',
  props: {
    selectedItem: Object,
  },
  data() {
    return {
      form: {
        descripcion: '',
        aforo: '',
        ubicacion: '',
        cant_proyector: '',
        es_climatizada: false,
      },
      valid: false,
      rules: {
        descripcion: [(v) => !!v || 'La descripción es requerida'],
        aforo: [(v) => !!v || 'El Aforo es requerido'],
        ubicacion: [(v) => !!v || 'La ubicacion es requerida'],
        cant_proyector: [(v) => !!v || 'La cantidad de proyectores es requerida'],
        es_climatizada: [(v) => !!v || 'La informacion sobre calefaccion es requerida'],
      },
    };
  },
  methods: {
    async saveAula() {
      if (this.$refs.form.validate()) {
        try {
          if (this.selectedItem) {
            await axios.put(`http://localhost:8000/api/aulas/${this.selectedItem.id}/`, this.form);
          } else {
            await axios.post('http://localhost:8000/api/aulas/', this.form);
          }
          this.$emit('saved');
          this.$emit('close');
        } catch (error) {
          console.error('Error saving aula:', error);
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
            descripcion: '',
            aforo: '',
            ubicacion: '',
            cant_proyector: '',
            es_climatizada: false,
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
