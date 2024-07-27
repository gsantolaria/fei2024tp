<template>
<v-card>
    <v-card-title>
        <span class="headline">{{ selectedItem ? 'Editar Reserva' : 'Nueva Reserva' }}</span>
    </v-card-title>
    <v-card-text>
    <v-form ref="form" v-model="valid" @submit.prevent="saveReserva">
        <v-select 
        v-model="form.id_aula" 
        :items="aulas" 
        item-title="descripcion" 
        item-value="id" 
        label="Aula" 
        :rules="rules.id_aula" 
        required>
        </v-select>
        <div class="datePicker">
            <vue-date-picker v-model="form.fh_desde" label="Desde" :rules="rules.fh_desde" required></vue-date-picker>
        </div>
        <div class="datePicker">
            <vue-date-picker v-model="form.fh_hasta" label="Hasta" :rules="rules.fh_hasta" required></vue-date-picker>
        </div>
        <v-textarea v-model="form.observacion" label="Observación" :rules="rules.observacion" required></v-textarea>
    </v-form>
    </v-card-text>
    <v-card-actions>
    <v-spacer></v-spacer>
    <v-btn color="blue darken-1" text @click="$emit('close')">Cancelar</v-btn>
    <v-btn color="blue darken-1" text @click="saveReserva">Guardar</v-btn>
    </v-card-actions>
</v-card>
</template>

<script>
import axios from 'axios';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

export default {
name: 'ReservaAulaCRUD',
components: { VueDatePicker },
props: {
    selectedItem: Object,
},
data() {
    return {
    form: {
        id_aula: '',
        fh_desde: '',
        fh_hasta: '',
        observacion: '',
    },
    aulas: [],
    valid: false,
    rules: {
        id_aula: [(v) => !!v || 'El Aula es requerida'],
        fh_desde: [(v) => !!v || 'La Fecha y hora de inicio son requeridas'],
        fh_hasta: [(v) => !!v || 'La Fecha y hora de finalización son requeridas'],
        observacion: [(v) => !!v || 'Una observación es requerida'],
    },
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
    formatDateString(date) {
      const d = new Date(date);
      return d.toISOString().slice(0, 19).replace('T', ' ');
    },
    async saveReserva() {
    if (this.$refs.form.validate()) {
        try {
            const dataFormateada = {
            ...this.form,
            fh_desde: this.formatDateString(this.form.fh_desde),
            fh_hasta: this.formatDateString(this.form.fh_hasta),
        };
        if (this.selectedItem ) {
            console.log(this.selectedItem);
            await axios.put(`http://localhost:8000/api/reservas/${this.selectedItem.id}/`, dataFormateada);
        } else {
            await axios.post('http://localhost:8000/api/reservas/', dataFormateada);
        }
        this.$emit('saved');
        this.$emit('close');
        } catch (error) {
            console.error('Error saving reserva:', error);
        }
    }
    },
},
watch: {
    selectedItem: {
    handler(newVal) {
        if (newVal) {
        this.form = { ...newVal };
        } else {
        this.form = {
            id_aula: '',
            fh_desde: '',
            fh_hasta: '',
            observacion: '',
        };
        }
    },
    immediate: true,
    },
},
created() {
    this.fetchAulas();
},
};
</script>

<style scoped>
.datePicker {
    margin: 10px;
}
</style>