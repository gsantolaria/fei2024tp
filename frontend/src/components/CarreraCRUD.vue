<template>
<v-dialog v-model="dialog" max-width="600px" persistent>
    <v-card>
    <v-card-title>
        <span v-if="form.id">Editar Carrera</span>
        <span v-else>Agregar Carrera</span>
    </v-card-title>
    <v-card-text>
        <v-form ref="form" v-model="valid" @submit.prevent="saveCarrera">
        <v-text-field
            v-model="form.nombre"
            label="Nombre"
            :rules="rules.nombre"
            required
        ></v-text-field>
        </v-form>
    </v-card-text>
    <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="saveCarrera" :disabled="!valid">
        Guardar
        </v-btn>
        <v-btn color="grey" text @click="closeDialog">Cancelar</v-btn>
    </v-card-actions>
    </v-card>
</v-dialog>
</template>

<script>
import axios from 'axios';

export default {
name: 'CarreraCRUD',
props: {
    carrera: {
    type: Object,
    default: () => ({}),
    },
},
data() {
    return {
    dialog: true,
    valid: false,
    form: {
        ...this.carrera,
    },
    rules: {
        nombre: [(v) => !!v || 'El Nombre es requerido'],
    },
    };
},
methods: {
    saveCarrera() {
    if (this.$refs.form.validate()) {
        const carreraData = { ...this.form };
        const request = this.form.id
        ? axios.put(`http://localhost:8000/api/carreras/${this.form.id}/`, carreraData)
        : axios.post('http://localhost:8000/api/carreras/', carreraData);

        request
        .then(() => {
            this.$emit('refresh');
            this.closeDialog();
        })
        .catch(error => {
            console.error('Error saving carrera:', error);
        });
    }
    },
    closeDialog() {
    this.dialog = false;
    this.$emit('close');
    },
},
};
</script>

<style scoped>
</style>  