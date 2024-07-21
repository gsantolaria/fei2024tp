<template>
  <v-container>
    <v-data-table
      :headers="headers"
      :items="materias"
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
          <v-btn color="primary" @click="openDialog">Agregar Materia</v-btn>
        </v-toolbar>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon small color="primary" @click="editMateria(item)">mdi-pencil</v-icon>
        <v-icon small color="red" @click="confirmDelete(item)">mdi-delete</v-icon>
      </template>
      <template v-slot:[`item.id_carrera`]="{ item }">
        <span>{{ item.carrera ? item.carrera.nombre : 'Sin Carrera' }}</span>
      </template>
      <template v-slot:[`item.id_profesor`]="{ item }">
        <span>{{ item.profesor ? item.profesor.nombre : 'Sin Profesor' }}</span>
      </template>
    </v-data-table>
    <MateriaCRUD
      v-if="dialog"
      :materia="editedItem"
      :carreras="carreras"
      :profesores="profesores"
      @refresh="fetchMaterias"
      @close="closeDialog"
    />
    <ConfirmDelete
      v-if="deleteDialog"
      @confirm="deleteMateria"
      @cancel="closeDeleteDialog"
    />
  </v-container>
</template>

<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import MateriaCRUD from './MateriaCRUD.vue';
import ConfirmDelete from './ConfirmDelete.vue';

export default {
  name: 'MateriaList',
  components: { MateriaCRUD, ConfirmDelete },
  setup() {
    const search = ref('');
    const dialog = ref(false);
    const deleteDialog = ref(false);
    const headers = ref([
      { title: 'Nombre', value: 'nombre' },
      { title: 'Cantidad de Alumnos', value: 'cant_alumnos' },
      { title: 'Carrera', value: 'id_carrera' },
      { title: 'Profesor', value: 'id_profesor' },
      { title: 'Acciones', value: 'actions', sortable: false },
    ]);
    const materias = ref([]);
    const carreras = ref([]);
    const profesores = ref([]);
    const editedItem = ref({});
    const itemToDelete = ref(null);

    const fetchMaterias = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/materias/');
        materias.value = response.data.map(materia => {
          materia.carrera = carreras.value.find(c => c.id === materia.id_carrera);
          materia.profesor = profesores.value.find(p => p.id === materia.id_profesor);
          return materia;
        });
      } catch (error) {
        console.error('Error fetching materias:', error);
      }
    };

    const fetchCarreras = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/carreras/');
        carreras.value = response.data;
      } catch (error) {
        console.error('Error fetching carreras:', error);
      }
    };

    const fetchProfesores = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/profesores/');
        profesores.value = response.data;
      } catch (error) {
        console.error('Error fetching profesores:', error);
      }
    };

    const openDialog = () => {
      editedItem.value = {};
      dialog.value = true;
    };

    const editMateria = (item) => {
      editedItem.value = { ...item };
      dialog.value = true;
    };

    const confirmDelete = (item) => {
      itemToDelete.value = item;
      deleteDialog.value = true;
    };

    const deleteMateria = async () => {
      try {
        await axios.delete(`http://localhost:8000/api/materias/${itemToDelete.value.id}/`);
        await fetchMaterias();
        deleteDialog.value = false;
        itemToDelete.value = null;
      } catch (error) {
        console.error('Error deleting materia:', error);
      }
    };

    const closeDialog = () => {
      dialog.value = false;
    };

    const closeDeleteDialog = () => {
      deleteDialog.value = false;
    };

    onMounted(() => {
      fetchMaterias();
      fetchCarreras();
      fetchProfesores();
    });

    return {
      search,
      dialog,
      deleteDialog,
      headers,
      materias,
      carreras,
      profesores,
      editedItem,
      itemToDelete,
      fetchMaterias,
      openDialog,
      editMateria,
      confirmDelete,
      deleteMateria,
      closeDialog,
      closeDeleteDialog,
    };
  },
};
</script>

<style scoped>
.v-text-field {
    margin-top: 15px;
  }
</style>
