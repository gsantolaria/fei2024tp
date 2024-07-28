<template>
    <v-container>
      <v-data-table
        :headers="headers"
        :items="formattedHorarioMaterias"
        :search="search"
        :items-per-page="5"
        item-value="id"
        class="elevation-1"
      >
        <template v-slot:top>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Buscar"
            class="mx-4"
          ></v-text-field>
          <v-toolbar>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="openDialog">Agregar Horario Materia</v-btn>
          </v-toolbar>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <v-icon small color="primary" @click="editHorarioMateria(item)">mdi-pencil</v-icon>
          <v-icon small color="red" @click="confirmDelete(item)">mdi-delete</v-icon>
        </template>
      </v-data-table>
      <v-dialog v-model="dialog" max-width="600px">
        <HorarioMateriaCRUD 
          @saved="fetchHorarioMaterias" 
          :selected-item="selectedItem" 
          @close="dialog = false"
        />
      </v-dialog>
      <ConfirmDelete
        v-if="deleteDialog"
        :item="selectedItem"
        @confirm="deleteHorarioMateria"
        @cancel="cancelDelete"
      />
    </v-container>
  </template>
  
  <script>
  import axios from 'axios';
  import { format } from 'date-fns';
  import HorarioMateriaCRUD from './HorarioMateriaCRUD.vue';
  import ConfirmDelete from './ConfirmDelete.vue';
  
  export default {
    name: 'HorarioMateriaList',
    components: { HorarioMateriaCRUD, ConfirmDelete },
    data() {
      return {
        dialog: false,
        deleteDialog: false,
        horarioMaterias: [],
        materias: [],
        reservas: [],
        selectedItem: null,
        search: '',
        headers: [
          { title: 'Materia', value: 'materiaDescripcion', align: 'center' },
          { title: 'Reserva', value: 'reservaDescripcion', align: 'center' },
          { title: 'Desde', value: 'fh_desde', align: 'center' },
          { title: 'Hasta', value: 'fh_hasta', align: 'center' },
          { title: 'Acciones', value: 'actions', sortable: false, align: 'center' },
        ],
      };
    },
    computed: {
      formattedHorarioMaterias() {
        return this.horarioMaterias.map(horarioMateria => ({
          ...horarioMateria,
          fh_desde: format(new Date(horarioMateria.fh_desde), 'dd/MM/yyyy HH:mm'),
          fh_hasta: format(new Date(horarioMateria.fh_hasta), 'dd/MM/yyyy HH:mm'),
          materiaDescripcion: this.materias.find(materia => materia.id === horarioMateria.id_materia)?.descripcion || 'Sin Materia',
          reservaDescripcion: this.reservas.find(reserva => reserva.id === horarioMateria.id_reserva)?.descripcion || 'Sin Reserva',
        }));
      },
    },
    methods: {
      async fetchHorarioMaterias() {
        try {
          const response = await axios.get('http://localhost:8000/api/horarios/');
          this.horarioMaterias = response.data;
        } catch (error) {
          console.error('Error fetching horario materias:', error);
        }
      },
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
      openDialog() {
        this.selectedItem = null;
        this.dialog = true;
      },
      editHorarioMateria(item) {
        this.selectedItem = item;
        this.dialog = true;
      },
      confirmDelete(item) {
        this.selectedItem = item;
        this.deleteDialog = true;
      },
      async deleteHorarioMateria() {
        try {
          await axios.delete(`http://localhost:8000/api/horarios/${this.selectedItem.id}/`);
          this.fetchHorarioMaterias();
          this.deleteDialog = false;
        } catch (error) {
          console.error('Error deleting horario materia:', error);
        }
      },
      cancelDelete() {
        this.deleteDialog = false;
      },
    },
    created() {
      this.fetchHorarioMaterias();
      this.fetchMaterias();
      this.fetchReservas();
    },
  };
  </script>
  
  <style scoped>
  .v-text-field {
    margin-top: 15px;
  }
  </style>