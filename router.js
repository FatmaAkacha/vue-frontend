import { createRouter, createWebHistory } from 'vue-router';
import Client from './src/components/Client.vue';
import FactureeeesVue from '@/components/Factureeees.vue';
import ReglementComponent from '@/components/ReglementComponent.vue';
import Produit from '@/components/Produit.vue';
import loginList from '@/components/login.vue';
import AccueilClient from '@/components/AccueilClient.vue';



const routes = [
  { path: "/", redirect: "/login" },
  { path: "/login", component: loginList },
  //{ path: '/register', component: RegisterComponent },
 // { path: '/login', component : LoginComponent},
  { path: '/clients', component: Client },
  { path: '/produits', component: Produit },
  { path: '/reglement', component: ReglementComponent },
  { path: '/facture', component: FactureeeesVue},
  { path: '/magasin', component: AccueilClient},
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;