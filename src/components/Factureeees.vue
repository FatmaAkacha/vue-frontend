<template>
  <div class="factures">
    <h1>Gestion des Factures</h1>
    
    <!-- Liste des factures -->
    <div v-if="factures.length">
      <h2 class="text-center liste">Liste des Factures</h2>
      <div class="text mt-4">
      <button @click="openCreateModal" class="btn success">Ajouter une nouvelle Facture</button>
    </div>
    <br>
      <table class="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Clients</th>
            <th>Statut</th>
            <th>Total</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="facture in factures" :key="facture.id">
            <td>{{ facture.id }}</td>
            <td>{{ facture.client?.name || 'Client inconnu' }}</td>
            <td>{{ facture.statut }}</td>
            <td>{{ afficherTotalFacture(facture) }} €</td>
            <td>
              <button class="btn warning" @click="openUpdateModal(facture)">Modifier</button>&nbsp;
              <button class="btn danger" @click="deleteFacture(facture.id)">Supprimer</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal de création/mise à jour -->
    <AppModal v-if="showModal" @close="closeModal">
      <template #header>
        <h3>{{ modalTitle }}</h3>
      </template>
      <template #body>
        <form @submit.prevent="submitFacture">
          <div class="form-group">
            <label>Client ID :</label>
            <input v-model="currentFacture.clientID" type="number" class="form-control" required />
          </div>
          <div class="form-group">
            <label>Statut :</label>
            <select v-model="currentFacture.status" class="form-control" required>
              <option value="PAID">Payée</option>
              <option value="UNPAID">Non Payée</option>
              <option value="PENDING">En Attente</option>
            </select>
          </div>

          <!-- Lignes de Facture -->
          <h3>Lignes de Facture</h3>
          <div v-for="(ligne, index) in currentFacture.lignes" :key="index" class="form-group">
            <label>Produit ID :</label>
            <input v-model="ligne.produitID" type="number" class="form-control" required />
            <label>Quantité :</label>
            <input v-model="ligne.quantity" type="number" class="form-control" required />
            <button type="button" class="btn btn-danger mt-2" @click="removeFactureLigne(index)">Supprimer Ligne</button>
          </div>
          <button type="button" @click="addFactureLigne" class="btn btn-primary mt-2">Ajouter Ligne</button>
          <button type="submit" class="btn btn-success mt-3">{{ modalButtonText }}</button>
        </form>
      </template>
      <template #footer>
        <button class="btn btn-secondary" @click="closeModal">Annuler</button>
      </template>
    </AppModal>
  </div>
</template>

<script>
import AppModal from '../components/AppModal';
import FacturServices from '@/services/FacturServices';

export default {
  name: 'FactureeeesVue',
  components: { AppModal },
  data() {
    return {
      factures: [], // Liste des factures
      currentFacture: { id: null, clientID: null, status: 'PENDING', lignes: [] }, // Facture en cours
      showModal: false, // Contrôle de l'affichage du modal
      modalTitle: 'Ajouter Facture', // Titre du modal
      modalButtonText: 'Ajouter', // Texte du bouton du modal
      isUpdateMode: false, // Mode de mise à jour
    };
  },
  methods: {
    addFactureLigne() {
      this.currentFacture.lignes.push({ produitID: null, quantity: 1, prixUnitaire: 0 });
    },
    removeFactureLigne(index) {
      this.currentFacture.lignes.splice(index, 1);
    },
  
    formatStatus(status) {
  const normalizedStatus = status ? status.trim().toUpperCase() : '';

  switch (normalizedStatus) {
    case 'PAID': return 'Payée';
    case 'UNPAID': return 'Non Payée';
    case 'PENDING': return 'En Attente';
    default: return 'Inconnu';
  }
},
calculerTotalFacture(facture) {
    return facture.facturelignes.reduce((total, ligne) => {
      return total + (ligne.quantity * ligne.price);  // Total = quantité * prix pour chaque ligne
    }, 0);
  },
  afficherTotalFacture(facture) {
    const total = this.calculerTotalFacture(facture);
    return total.toFixed(2);  // Formatage du total avec 2 décimales
  },

submitFacture() {
  const factureToSend = {
    ...this.currentFacture,
    facturelignes: this.currentFacture.lignes, // Assurez-vous d'envoyer 'facturelignes' et non 'lignes'
  };

  if (this.isUpdateMode) {
    if (this.isStatusUpdateOnly()) {
      FacturServices.updateFactureStatus(this.currentFacture.id, this.currentFacture.status)
        .then(() => {
          this.fetchFactures();
          this.closeModal();
        })
        .catch((error) => console.error('Erreur lors de la mise à jour du statut de la facture:', error));
    } else {
      FacturServices.updateFacture(this.currentFacture.id, factureToSend)
        .then(() => {
          this.fetchFactures();
          this.closeModal();
        })
        .catch((error) => console.error('Erreur lors de la mise à jour de la facture:', error));
    }
  } else {
    FacturServices.createFacture(factureToSend)
      .then(() => {
        this.fetchFactures();
        this.closeModal();
      })
      .catch((error) => console.error('Erreur lors de la création de la facture:', error));
  }
},

    isStatusUpdateOnly() {
      const originalFacture = this.factures.find(facture => facture.id === this.currentFacture.id);
      if (!originalFacture) return false;

      return (
        originalFacture.status !== this.currentFacture.status &&
        JSON.stringify({ ...originalFacture, status: this.currentFacture.status }) === JSON.stringify(this.currentFacture)
      );
    },
    openCreateModal() {
      this.currentFacture = { id: null, clientID: null, status: 'PENDING', lignes: [] };
      this.showModal = true;
      this.modalTitle = 'Ajouter Facture';
      this.modalButtonText = 'Ajouter';
      this.isUpdateMode = false;
    },
    openUpdateModal(facture) {
      this.currentFacture = JSON.parse(JSON.stringify(facture));
      this.showModal = true;
      this.modalTitle = 'Mettre à jour la Facture';
      this.modalButtonText = 'Mettre à jour';
      this.isUpdateMode = true;
    },
    closeModal() {
      this.showModal = false;
    },
    deleteFacture(id) {
      if (confirm('Voulez-vous vraiment supprimer cette facture ?')) {
        FacturServices.deleteFacture(id)
          .then(() => this.fetchFactures())
          .catch((error) => console.error('Erreur lors de la suppression de la facture:', error));
      }
    },
    fetchFactures() {
      FacturServices.getFactures()
        .then((response) => {
          this.factures = response.data || [];
        })
        .catch((error) => console.error('Erreur lors de la récupération des factures:', error));
    },
  },
  mounted() {
    this.fetchFactures();
  },
};
</script>

<style>
.table {
  width: 100%;
  border-collapse: collapse;
}
.table th, .table td {
  padding: 10px;
  text-align: left;
  border: 1px solid #ddd;
}
.container{
    margin-top:100px;
  }
  .boutons{
    align-content: center;
  }
  
  .danger{
    background-color: #ff6961 !important;
  }
  .warning{
    background-color: #FAC900 !important;
  }
  .success{
    background-color: #99c5c4 !important;
  }
  .liste{
    padding-top: 20px;
  }
</style>
