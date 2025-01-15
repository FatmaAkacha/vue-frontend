<template>
    <div class="container">
      <h1 class="text-center">Create New Reglement</h1>
  
      <!-- Form to Create a New Reglement -->
      <form @submit.prevent="submitReglement">
        <div class="form-group">
          <label>Facture Id:</label>
          <input
            type="number"
            v-model="currentReglement.factureId"
            class="form-control"
            required
          />
        </div>
        <div class="form-group">
          <label>Montant:</label>
          <input
            type="number"
            v-model="currentReglement.montant"
            class="form-control"
            required
          />
        </div>
  
        <!-- Mode Paiement Dropdown -->
        <div class="form-group">
          <label>Mode Paiement:</label>
          <select v-model="currentReglement.modePaiement" class="form-control" required>
            <option value="Espèce">Espèce</option>
            <option value="Chèque">Chèque</option>
            <option value="Carte Bancaire">Carte Bancaire</option>
            <option value="Virement">Virement</option>
          </select>
        </div>
  
        <!-- Statut Dropdown -->
        <div class="form-group">
          <label>Statut:</label>
          <select v-model="currentReglement.statut" class="form-control" required>
            <option value="Payée">Payée</option>
            <option value="Partiellement Payée">Partiellement Payée</option>
            <option value="Non Payée">Non Payée</option>
          </select>
        </div>
  
        <div class="form-group">
          <label>Date Réglement:</label>
          <input
            type="datetime-local"
            v-model="currentReglement.dateReglement"
            class="form-control"
            required
          />
        </div>
  
        <button type="submit" class="btn btn-success mt-3">Save Reglement</button>
      </form>
    </div>
  </template>
  
  <script>
  import ReglementService from '@/services/ReglementService';
  
  export default {
    name: 'ReglementCreate',
    data() {
      return {
        currentReglement: {
          factureId: '',
          montant: '',
          modePaiement: '',
          statut: '',
          dateReglement: ''
        }
      };
    },
    methods: {
        submitReglement() {
  ReglementService.createReglement(this.currentReglement)
    .then(() => {
      this.$router.push('/magasin'); // Redirect to the list of reglements (optional)
    })
    .catch((error) => {
      console.error('Failed to create reglement:', error);
    });
}

    }
  };
  </script>
  