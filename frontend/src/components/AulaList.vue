<template>
  <v-container>
    <v-row>
      <v-col v-for="aula in aulas" :key="aula.id" cols="12" md="4">
        <v-card>
          <v-card-title>{{ aula.descripcion }}</v-card-title>
          <v-card-subtitle>{{ aula.ubicacion }}</v-card-subtitle>
          <v-card-text>
            Proyectores: {{ aula.cant_proyector }} <br>
            Climatizada: {{ aula.es_climatizada ? 'Sí' : 'No' }} <br>
            Aforo: {{ aula.aforo }}
          </v-card-text>
          <v-card-actions class="justify-center">
            <v-icon color="primary" @click="editAula(aula)">mdi-pencil</v-icon>
            <v-icon color="red" @click="deleteAula(aula.id)">mdi-delete</v-icon>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="text-right">
        <v-btn color="primary" @click="navigateToCreate">Agregar Aula</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import router from '@/router';

export default {
  name: 'AulaList',
  setup() {
    const aulas = ref([]);

    const fetchAulas = async () => {
      const response = await axios.get('http://localhost:8000/api/aulas/');
      aulas.value = response.data;
    };

    const navigateToCreate = () => {
      router.push({ name: 'CreateAula' });
    };

    const editAula = (aula) => {
      router.push({ name: 'EditAula', params: { id: aula.id } });
    };

    const deleteAula = async (id) => {
      await axios.delete(`http://localhost:8000/api/aulas/${id}/`);
      fetchAulas();
    };

    onMounted(fetchAulas);

    return { aulas, navigateToCreate, editAula, deleteAula };
  },
};
</script>
