<template>
    <v-card>
      <v-card-title>
        <span class="headline">{{ selectedItem ? 'Editar Horario Materia' : 'Nueva Horario Materia' }}</span>
      </v-card-title>
      <v-card-text>
        <v-form ref="form" v-model="valid" @submit.prevent="saveHorarioMateria">
          <v-select 
            v-model="form.id_materia" 
            :items="materias" 
            item-title="nombre" 
            item-value="id" 
            label="Materia" 
            :rules="rules.id_materia" 
            required
          ></v-select>
          <v-select 
            v-model="form.id_reserva" 
            :items="reservas" 
            item-title="observacion" 
            item-value="id" 
            label="Reserva" 
            :rules="rules.id_reserva" 
            required
          ></v-select>
          <div class="datePicker">
            <vue-date-picker v-model="form.fh_desde" label="Desde" :rules="rules.fh_desde" required></vue-date-picker>
          </div>
          <div class="datePicker">
            <vue-date-picker v-model="form.fh_hasta" label="Hasta" :rules="rules.fh_hasta" required></vue-date-picker>
          </div>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="$emit('close')">Cancelar</v-btn>
        <v-btn color="blue darken-1" text @click="saveHorarioMateria">Guardar</v-btn>
      </v-card-actions>
    </v-card>
  </template>
  
  <script>
  import axios from 'axios';
  import VueDatePicker from '@vuepic/vue-datepicker';
  import '@vuepic/vue-datepicker/dist/main.css'
  
  export default {
    name: 'HorarioMateriaCRUD',
    components: { VueDatePicker },
    props: {
      selectedItem: Object,
    },
    data() {
      return {
        form: {
          id_materia: '',
          id_reserva: '',
          fh_desde: '',
          fh_hasta: '',
        },
        materias: [],
        reservas: [],
        valid: false,
        rules: {
          id_materia: [(v) => !!v || 'La Materia es requerida'],
          id_reserva: [(v) => !!v || 'La Reserva es requerida'],
          fh_desde: [(v) => !!v || 'La Fecha y hora de inicio son requeridas'],
          fh_hasta: [(v) => !!v || 'La Fecha y hora de finalización son requeridas'],
        },
      };
    },
    methods: {
      async fetchMaterias() {
        try {
          const response = await axios.get('http://localhost:8000/api/materias/');
          this.materias = response.data;
        } catch (error) {
          console.error('Error fetching materias:', error);
        }
      },
      async fetchReservas() {
        try {
          const response = await axios.get('http://localhost:8000/api/reservas/');
          this.reservas = response.data;
        } catch (error) {
          console.error('Error fetching reservas:', error);
        }
      },
      async saveHorarioMateria() {
        if (this.$refs.form.validate()) {
          try {
            if (this.selectedItem) {
              await axios.put(`http://localhost:8000/api/horarios/${this.selectedItem.id}/`, this.form);
            } else {
              await axios.post('http://localhost:8000/api/horarios/', this.form);
            }
            this.$emit('saved');
            this.$emit('close');
          } catch (error) {
            console.error('Error saving horarioMateria:', error);
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
                id_materia: '',
                id_reserva: '',
                fh_desde: '',
                fh_hasta: '',
                };
            }
        },
        immediate: true,
      },
    },
    created() {
      this.fetchMaterias();
      this.fetchReservas();
    },
  };
  </script>
  
  <style scoped>
  .datePicker {
    margin: 10px;
  }
  </style>
  