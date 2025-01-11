import { createRouter, createWebHistory } from 'vue-router';
import Client from './src/components/Client.vue';
import Produit from './src/components/Produit.vue';
import RegisterComponent from './src/components/RegisterComponent.vue';
import LoginComponent from './src/components/LoginComponent.vue';
import FactureeeesVue from '@/components/Factureeees.vue';
import ReglementComponent from '@/components/ReglementComponent.vue';




const routes = [
  { path: '/', component: RegisterComponent },
  { path: '/register', component: RegisterComponent },
  { path: '/login', component : LoginComponent},
  { path: '/clients', component: Client },
  { path: '/produits', component: Produit },
  { path: '/reglement', component: ReglementComponent },
  { path: '/facture', component: FactureeeesVue},
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;