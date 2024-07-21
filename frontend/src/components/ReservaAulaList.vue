<template>
    <v-container>
      <v-data-table
        :headers="headers"
        :items="formateoReservas"
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
            <v-btn color="primary" @click="openDialog">Agregar Reserva</v-btn>
          </v-toolbar>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <v-icon small color="primary" @click="editReserva(item)">mdi-pencil</v-icon>
          <v-icon small color="red" @click="confirmDelete(item)">mdi-delete</v-icon>
        </template>
      </v-data-table>
      <v-dialog v-model="dialog" max-width="600px">
        <ReservaAulaCRUD 
          @saved="fetchReservas" 
          :selected-item="selectedItem" 
          @close="dialog = false"
        />
      </v-dialog>
      <ConfirmDelete
        v-if="deleteDialog"
        :item="selectedItem"
        @confirm="deleteReserva"
        @cancel="cancelDelete"
      />
    </v-container>
  </template>
  
  <script>
  import axios from 'axios';
  import { format } from 'date-fns';
  import ReservaAulaCRUD from './ReservaAulaCRUD.vue';
  import ConfirmDelete from './ConfirmDelete.vue';
  
  export default {
    name: 'ReservaAulaList',
    components: { ReservaAulaCRUD, ConfirmDelete },
    data() {
      return {
        dialog: false,
        deleteDialog: false,
        reservas: [],
        selectedItem: null,
        search: '',
        headers: [
          { title: 'Aula', value: 'aula' },
          { title: 'Desde', value: 'fh_desde' },
          { title: 'Hasta', value: 'fh_hasta' },
          { title: 'Observación', value: 'observacion' },
          { title: 'Acciones', value: 'actions', sortable: false },
        ],
      };
    },
    computed: {
      formateoReservas() {
        return this.reservas.map(reserva => ({
          ...reserva,
          fh_desde: format(new Date(reserva.fh_desde), 'dd/MM/yyyy HH:mm'),
          fh_hasta: format(new Date(reserva.fh_hasta), 'dd/MM/yyyy HH:mm'),
        }));
      },
    },
    methods: {
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
      editReserva(item) {
        this.selectedItem = item;
        this.dialog = true;
      },
      confirmDelete(item) {
        this.selectedItem = item;
        this.deleteDialog = true;
      },
      async deleteReserva() {
        try {
          await axios.delete(`http://localhost:8000/api/reservas/${this.selectedItem.id}/`);
          this.fetchReservas();
          this.deleteDialog = false;
        } catch (error) {
          console.error('Error deleting reserva:', error);
        }
      },
      cancelDelete() {
        this.deleteDialog = false;
      },
    },
    created() {
      this.fetchReservas();
    },
  };
  </script>
  
  <style scoped>
  .v-text-field {
    margin-top: 15px;
  }
  </style>  