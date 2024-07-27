<template>
  <v-container>
    <v-data-table
      :headers="headers"
      :items="aulas"
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
          <v-btn color="primary" @click="openDialog">Agregar Aula</v-btn>
        </v-toolbar>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon small color="primary" @click="editAula(item)">mdi-pencil</v-icon>
        <v-icon small color="red" @click="confirmDelete(item)">mdi-delete</v-icon>
      </template>
      <template v-slot:[`item.es_climatizada`]="{ item }">
        <span>{{ item.es_climatizada ? 'Si' : 'No' }}</span>
      </template>
    </v-data-table>
    <v-dialog v-model="dialog" max-width="600px">
      <AulaCRUD 
        @saved="fetchAulas" 
        :selected-item="selectedItem" 
        @close="dialog = false"
      />
    </v-dialog>
    <ConfirmDelete
      v-if="deleteDialog"
      :item="selectedItem"
      @confirm="deleteAula"
      @cancel="cancelDelete"
    />
  </v-container>
</template>

<script>
import axios from 'axios';
import AulaCRUD from './AulaCRUD.vue';
import ConfirmDelete from './ConfirmDelete.vue';

export default {
  name: 'AulaList',
  components: { AulaCRUD, ConfirmDelete },
  data() {
    return {
      dialog: false,
      deleteDialog: false,
      aulas: [],
      selectedItem: null,
      search: '',
      headers: [
        { title: 'Nombre', value: 'descripcion', align: 'center' },
        { title: 'Ubicacion', value: 'ubicacion', align: 'center' },
        { title: 'Aforo', value: 'aforo', align: 'center' },
        { title: 'Cant proyectores', value: 'cant_proyector', align: 'center' },
        { title: 'Es climatizada?', value: 'es_climatizada', align: 'center' },
        { title: 'Acciones', value: 'actions', sortable: false, align: 'center' },
      ],
    };
  },
  methods: {
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
    editAula(item) {
      this.selectedItem = item;
      this.dialog = true;
    },
    confirmDelete(item) {
      this.selectedItem = item;
      this.deleteDialog = true;
    },
    async deleteAula() {
      try {
        await axios.delete(`http://localhost:8000/api/aulas/${this.selectedItem.id}/`);
        this.fetchAulas();
        this.deleteDialog = false;
      } catch (error) {
        console.error('Error deleting aula:', error);
      }
    },
    cancelDelete() {
      this.deleteDialog = false;
    },
  },
  created() {
    this.fetchAulas();
  },
};
</script>

<style scoped>
.v-text-field {
  margin-top: 15px;
}
</style>
