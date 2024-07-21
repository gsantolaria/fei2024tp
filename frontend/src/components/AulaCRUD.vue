<template>
  <v-form ref="form" v-model="valid" @submit.prevent="submit">
    <v-card>
      <v-card-title>{{ isEdit ? 'Editar Aula' : 'Agregar Aula' }}</v-card-title>
      <v-card-text>
        <v-text-field v-model="descripcion" label="Descripción" required :rules="descripcionRules"></v-text-field>
        <v-text-field v-model="ubicacion" label="Ubicación" required :rules="ubicacionRules"></v-text-field>
        <v-text-field v-model="cant_proyector" label="Cantidad de Proyectores" required></v-text-field>
        <v-checkbox v-model="es_climatizada" label="¿Es Climatizada?"></v-checkbox>
        <v-text-field v-model="aforo" label="Aforo" required></v-text-field>

        <v-btn color="primary" @click="submit" :disabled="!valid">Guardar</v-btn>
        <v-btn color="secondary" @click="cancelar">Cancelar</v-btn>
      </v-card-text>
    </v-card>
  </v-form>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';

export default {
  name: 'AulaCRUD',
  setup() {
    const route = useRoute();
    const router = useRouter();
    const valid = ref(false);
    const descripcion = ref('');
    const ubicacion = ref('');
    const cant_proyector = ref('');
    const es_climatizada = ref(false);
    const aforo = ref('');
    const descripcionRules = [v => !!v || 'La descripción es obligatoria'];
    const ubicacionRules = [v => !!v || 'La ubicación es obligatoria'];
    const isEdit = ref(false);

    const fetchAula = async (id) => {
      const response = await axios.get(`http://localhost:8000/api/aulas/${id}/`);
      const aula = response.data;
      descripcion.value = aula.descripcion;
      ubicacion.value = aula.ubicacion;
      cant_proyector.value = aula.cant_proyector;
      es_climatizada.value = aula.es_climatizada;
      aforo.value = aula.aforo;
      isEdit.value = true;
    };

    const submit = async () => {
      const aulaData = {
        descripcion: descripcion.value,
        ubicacion: ubicacion.value,
        cant_proyector: cant_proyector.value,
        es_climatizada: es_climatizada.value,
        aforo: aforo.value,
      };
      if (isEdit.value) {
        await axios.put(`http://localhost:8000/api/aulas/${route.params.id}/`, aulaData);
      } else {
        await axios.post('http://localhost:8000/api/aulas/', aulaData);
      }
      router.push('/aulas');
    };

    const cancelar = () => {
      router.push('/aulas');
    };

    onMounted(() => {
      if (route.params.id) {
        fetchAula(route.params.id);
      }
    });

    return {
      valid,
      descripcion,
      ubicacion,
      cant_proyector,
      es_climatizada,
      aforo,
      descripcionRules,
      ubicacionRules,
      submit,
      cancelar,
      isEdit,
    };
  },
};
</script>

<style>
.v-btn {
  margin-right: 10px;
}
</style>