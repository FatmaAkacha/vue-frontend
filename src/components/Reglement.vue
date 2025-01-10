<template>
    <div class="container">
        <h1 class="text-center">
            Reglements List
        </h1>
        <table class="table table-striped">
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Montant</th>
                    <th>Mode Paiement</th>
                    <th>Statut</th>
                    <th>Date Reglement</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="reglement in reglements" :key="reglement.id">
                    <td>{{ reglement.id }}</td>
                    <td>{{ reglement.montant }}</td>
                    <td>{{ reglement.modePaiement }}</td>
                    <td>{{ reglement.statut }}</td>
                    <td>{{ reglement.dateReglement }}</td>
                </tr>
            </tbody>
        </table>

        <!-- Form to Add New Reglement -->
        <div>
            <h2>Add New Reglement</h2>
            <form @submit.prevent="createReglement">
                <input type="number" v-model="newReglement.montant" placeholder="Montant" required>
                <input type="text" v-model="newReglement.modePaiement" placeholder="Mode Paiement" required>
                <input type="text" v-model="newReglement.statut" placeholder="Statut" >
                <input type="date" v-model="newReglement.dateReglement" placeholder="Date Reglement" required>
                <button type="submit">Create Reglement</button>
            </form>
        </div>
    </div>
</template>

<script>
import ReglementService from '../services/ReglementService';

export default {
    name: 'ReglementList',
    data() {
        return {
            reglements: [], 
            newReglement: { 
                montant: '',
                modePaiement: '',
                statut: '',
                dateReglement: ''
            }
        };
    },
    methods: {
        fetchReglements() {
            ReglementService.getReglements()
                .then((response) => {
                    this.reglements = response.data;
                })
                .catch((error) => {
                    console.error('Failed to fetch reglements:', error);
                });
        },
        createReglement() {
            ReglementService.createReglement(this.newReglement)
                .then((response) => {
                    this.reglements.push(response.data); 
                    this.newReglement = { montant: '', modePaiement: '', statut: '', dateReglement: '' }; // Reset form after submission
                })
                .catch((error) => {
                    console.error('Failed to create reglement:', error);
                });
        }
    },
    created() {
        this.fetchReglements(); 
    }
};
</script>