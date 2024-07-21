<template>
<v-container>
    <v-data-table
    :headers="headers"
    :items="carreras"
    :search="search"
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
            <v-btn color="primary" @click="openDialog">Agregar Carrera</v-btn>
        </v-toolbar>
    </template>
    <template v-slot:[`item.actions`]="{ item }">
        <v-icon small color="primary" @click="editCarrera(item)">mdi-pencil</v-icon>
        <v-icon small color="red" @click="confirmDelete(item)">mdi-delete</v-icon>
    </template>
    </v-data-table>
    <CarreraCRUD
    v-if="dialog"
    :carrera="editedItem"
    @refresh="fetchCarreras"
    @close="dialog = false"
    />
    <ConfirmDelete
    v-if="deleteDialog"
    @confirm="deleteCarrera"
    @cancel="deleteDialog = false"
    />
</v-container>
</template>

<script>
import axios from 'axios';
import CarreraCRUD from './CarreraCRUD.vue';
import ConfirmDelete from './ConfirmDelete.vue';

export default {
name: 'CarreraList',
components: { CarreraCRUD, ConfirmDelete },
data() {
    return {
    search: '',
    dialog: false,
    deleteDialog: false,
    headers: [
        { title: 'Nombre', value: 'nombre' },
        { title: 'Acciones', value: 'actions', sortable: false },
    ],
    carreras: [],
    editedItem: {},
    itemToDelete: null,
    };
},
created() {
    this.fetchCarreras();
},
methods: {
    fetchCarreras() {
    axios
        .get('http://localhost:8000/api/carreras/')
        .then(response => {
        this.carreras = response.data;
        })
        .catch(error => {
        console.error('Error fetching carreras:', error);
        });
    },
    openDialog() {
        this.editedItem = {};
        this.dialog = true;
    },
    editCarrera(item) {
        this.editedItem = { ...item };
        this.dialog = true;
    },
    confirmDelete(item) {
        this.itemToDelete = item;
        this.deleteDialog = true;
    },
    deleteCarrera() {
    axios
        .delete(`http://localhost:8000/api/carreras/${this.itemToDelete.id}/`)
        .then(() => {
        this.fetchCarreras();
        this.deleteDialog = false;
        this.itemToDelete = null;
        })
        .catch(error => {
        console.error('Error deleting carrera:', error);
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
