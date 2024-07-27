<template>
  <v-container>
    <v-data-table
      :headers="headers"
      :items="profesores"
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
          <v-btn color="primary" @click="openDialog">Agregar Profesor</v-btn>
        </v-toolbar>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon small color="primary" @click="editProfesor(item)">mdi-pencil</v-icon>
        <v-icon small color="red" @click="confirmDelete(item)">mdi-delete</v-icon>
      </template>
      <template v-slot:[`item.profesores`]="{ item }">
        <span>{{ item.profesores.email }}</span>
      </template>
    </v-data-table>
    <v-dialog v-model="dialog" max-width="600px">
      <ProfesorCRUD
        :selectedItem="selectedItem"
        :dialog="dialog"
        @saved="fetchProfesores"
        @close="dialog = false"
      />
    </v-dialog>
    <ConfirmDelete
      v-if="deleteDialog"
      :item="selectedItem"
      @confirm="deleteProfesor"
      @cancel="cancelDelete"
    />
  </v-container>
</template>

<script>
import axios from 'axios';
import ProfesorCRUD from './ProfesorCRUD.vue';
import ConfirmDelete from './ConfirmDelete.vue';

export default {
  name: 'ProfesorList',
  components: { ProfesorCRUD, ConfirmDelete },
  data() {
    return {
      dialog: false,
      deleteDialog: false,
      profesores: [],
      selectedItem: null,
      search: '',
      headers: [
        { title: 'Nombre', value: 'nombre', align: 'center' },
        { title: 'Apellido', value: 'apellido', align: 'center' },
        { title: 'Correo', value: 'email', align: 'center' },
        { title: 'Acciones', value: 'actions', sortable: false, align: 'center' },
      ],
    };
  },
  methods: {
    async fetchProfesores() {
      try {
        const response = await axios.get('http://localhost:8000/api/profesores/');
        this.profesores = response.data;
      } catch (error) {
        console.error('Error fetching profesores:', error);
      }
    },
    openDialog() {
      this.selectedItem = null;
      this.dialog = true;
    },
    editProfesor(item) {
      this.selectedItem = item;
      this.dialog = true;
    },
    confirmDelete(item) {
      this.selectedItem = item;
      this.deleteDialog = true;
    },
    async deleteProfesor() {
      try {
        await axios.delete(`http://localhost:8000/api/profesores/${this.selectedItem.id}/`);
        this.fetchProfesores();
        this.deleteDialog = false;
      } catch (error) {
        console.error('Error deleting profesor:', error);
      }
    },
    cancelDelete() {
      this.deleteDialog = false;
    },
  },
  created() {
    this.fetchProfesores();
  },
};
</script>

<style scoped>
.v-text-field {
  margin-top: 15px;
}
</style>
