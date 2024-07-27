import { createRouter, createWebHistory } from 'vue-router';
import AulaList from '@/components/AulaList.vue';
import AulaCRUD from '@/components/AulaCRUD.vue';
import ProfesorList from '@/components/ProfesorList.vue';
import ProfesorCRUD from '@/components/ProfesorCRUD.vue';
import MateriaList from '@/components/MateriaList.vue';
import MateriaCRUD from '@/components/MateriaCRUD.vue';
import CarreraList from '@/components/CarreraList.vue';
import CarreraCRUD from '@/components/CarreraCRUD.vue';
import ReservaAulaCRUD from '@/components/ReservaAulaCRUD.vue';
import ReservaAulaList from '@/components/ReservaAulaList.vue';
import HorarioMateriaList from '@/components/HorarioMateriaList.vue';
import HorarioMateriaCRUD from '@/components/HorarioMateriaCRUD.vue';
import LoginPage from '@/components/LoginPage.vue';


const routes = [
  { path: '/', component: LoginPage, name: 'Login', meta: { requiresAuth: true } },
  { path: '/aulas', component: AulaList, name: 'AulaList' },
  { path: '/aulas/create', component: AulaCRUD, name: 'CreateAula' },
  { path: '/aulas/:id/edit', component: AulaCRUD, name: 'EditAula' },
  { path: '/profesores', component: ProfesorList, name: 'ProfesorList' },
  { path: '/profesores/create', component: ProfesorCRUD, name: 'CreateProfesor' },
  { path: '/profesores/:id/edit', component: ProfesorCRUD, name: 'EditProfesor' },
  { path: '/materias', component: MateriaList, name: 'MateriaList' },
  { path: '/materias/create', component: MateriaCRUD, name: 'CreateMateria' },
  { path: '/materias/:id/edit', component: MateriaCRUD, name: 'EditMateria' },
  { path: '/carreras', component: CarreraList, name: 'CarreraList' },
  { path: '/materias/create', component: CarreraCRUD, name: 'CreateCarrera' },
  { path: '/materias/:id/edit', component: CarreraCRUD, name: 'EditCarrera' },
  { path: '/reservas', component: ReservaAulaList, name: 'ReservaAulaList' },
  { path: '/reservas/create', component: ReservaAulaCRUD, name: 'CreateReserva' },
  { path: '/reservas/:id/edit', component: ReservaAulaCRUD, name: 'EditReserva' },
  { path: '/horarios', component: HorarioMateriaList, name: 'HorarioMateriaList' },
  { path: '/horarios/create', component: HorarioMateriaCRUD, name: 'CreateHorario' },
  { path: '/horarios/:id/edit', component: HorarioMateriaCRUD, name: 'EditHorario' },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;