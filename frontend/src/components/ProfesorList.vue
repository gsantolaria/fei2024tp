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
          <v-btn color="primary" @click="openDialog">Agregar profesor</v-btn>
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
    <ProfesorCRUD
    v-if="dialog"
    :carrera="editedItem"
    @refresh="fetchProfesores"
    @close="dialog = false"
    />
    <ConfirmDelete
    v-if="deleteDialog"
    @confirm="deleteProfesor"
    @cancel="deleteDialog = false"
    />
  </v-container>
</template>

<script>
import axios from 'axios';
import ConfirmDelete from './ConfirmDelete.vue';
import ProfesorCRUD from './ProfesorCRUD.vue';

export default {
name: 'ProfesorList',
components: { ProfesorCRUD, ConfirmDelete },
data() {
    return {
    search: '',
    dialog: false,
    deleteDialog: false,
    headers: [
        { text: 'Nombre', value: 'nombre' },
        { text: 'Apellido', value: 'apellido' },
        { text: 'Email', value: 'email' },
        { text: 'Acciones', value: 'actions', sortable: false },
      ],
    profesores: [],
    editedItem: {},
    itemToDelete: null,
    };
},
created() {
    this.fetchProfesores();
},
methods: {
    fetchProfesores() {
    axios
        .get('http://localhost:8000/api/profesores/')
        .then(response => {
        this.profesores = response.data;
        })
        .catch(error => {
        console.error('Error fetching profesores:', error);
        });
    },
    openDialog() {
        this.editedItem = {};
        this.dialog = true;
    },
    editProfesor(item) {
        this.editedItem = { ...item };
        this.dialog = true;
    },
    confirmDelete(item) {
        this.itemToDelete = item;
        this.deleteDialog = true;
    },
    deleteProfesor() {
    axios
        .delete(`http://localhost:8000/api/profesores/${this.itemToDelete.id}/`)
        .then(() => {
        this.fetchProfesores();
        this.deleteDialog = false;
        this.itemToDelete = null;
        })
        .catch(error => {
        console.error('Error deleting profesor:', error);
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