<template>
  <v-dialog v-model="showDialog" max-width="400">
    <v-card>
      <v-card-title class="headline">Confirmar eliminación</v-card-title>
      <v-card-text>
        ¿Estás seguro de que quieres eliminar esta reserva?
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="red" @click="$emit('confirm')">Eliminar</v-btn>
        <v-btn @click="$emit('cancel')">Cancelar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'ConfirmDelete',
  props: {
    item: Object,
  },
  computed: {
    showDialog: {
      get() {
        return this.item !== null;
      },
      set(value) {
        if (!value) {
          this.$emit('cancel');
        }
      },
    },
  },
};
</script>

<style scoped>
</style>
