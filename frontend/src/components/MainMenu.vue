<template>
  <v-navigation-drawer permanent >
    <v-list-item>
      <v-img
        alt="Aulas Logo"
        class="mx-auto"
        contain
        :src="require('@/assets/logo.png')"
        transition="scale-transition"
        width="70"
      />
      <v-list-item-content>
        <v-list-item-title class="text-h6">App Aulas</v-list-item-title>
        <v-list-item-subtitle> Curza 2024 </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
    <v-divider></v-divider>
    <v-list dense>
      <v-list-item
        v-for="item in items"
        :key="item.title"
        :to="item.to"
        link
      >
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: 'MainMenu',
  data() {
    return {
      items: [
        { title: 'Aulas', icon: 'mdi-domain', to: '/aulas' },
        { title: 'Carreras', icon: 'mdi-book-education', to: '/carreras' },
        { title: 'Profesores', icon: 'mdi-account-details', to: '/profesores' },
        { title: 'Materias', icon: 'mdi-book-open-variant', to: '/materias' },
        { title: 'Reservas', icon: 'mdi-gesture-tap', to: '/reservas' },
      ],
    };
  },
};
</script>

<style scoped>
.v-navigation-drawer {
  background-color: #ffffff;
}
</style>
