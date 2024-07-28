<template>
  <v-container>
    <v-data-table
      :headers="headers"
      :items="formateoReservas"
      :search="search"
      :items-per-page="5"
      item-key="id"
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
      <template v-slot:[`item.aulas`]="{ item }">
        <span>{{ item.aulaDescripcion }}</span>
      </template>
    </v-data-table>
    <v-dialog v-model="dialog" max-width="600px">
      <ReservaAulaCRUD 
        v-if="dialog"
        @saved="fetchReservas" 
        :selected-item="selectedItem" 
        @close="dialog = false"
      />
      </v-dialog>
    <ConfirmDelete
      v-if="deleteDialog"
      @confirm="deleteReserva"
      @cancel="deleteDialog = false;"
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
      search: '',
      dialog: false,
      deleteDialog: false,
      reservas: [],
      aulas: [],
      selectedItem: null,
      headers: [
        { title: 'Aula', value: 'aulaDescripcion', align: 'center' },
        { title: 'Desde', value: 'fh_desde', align: 'center' },
        { title: 'Hasta', value: 'fh_hasta', align: 'center' },
        { title: 'Observación', value: 'observacion', align: 'center' },
        { title: 'Acciones', value: 'actions', sortable: false, align: 'center' },
      ],
    };
  },
  created() {
    this.fetchReservas();
    this.fetchAulas();
  },
  computed: {
    formateoReservas() {
      return this.reservas.map(reserva => ({
        ...reserva,
        fh_desde: format(new Date(reserva.fh_desde), 'dd/MM/yyyy HH:mm'),
        fh_hasta: format(new Date(reserva.fh_hasta), 'dd/MM/yyyy HH:mm'),
        aulaDescripcion: this.aulas.find(aula => aula.id === reserva.id_aula)?.descripcion || 'Sin Aula',
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
    async fetchAulas() {
      try {
        const response = await axios.get('http://localhost:8000/api/aulas/');
        this.aulas = response.data;
      } catch (error) {
        console.error('Error fetching aulas:', error);
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
      //console.log(this.selectedItem.id); fallaba y marcaba undefined porque el serializador no devolvia el 'id'.
      axios
        .delete(`http://localhost:8000/api/reservas/${this.selectedItem.id}/`)
        .then(() => {
          this.fetchReservas();
          this.deleteDialog = false;
          this.selectedItem = null;
        })
        .catch(error => {
          console.error('Error deleting reserva:', error);
        });
    },
  },
};
</script>

<style scoped>
.v-text-field {
  margin-top: 15px;
}
</style>
