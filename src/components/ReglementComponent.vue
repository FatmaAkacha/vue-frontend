<template>
  <div class="container">
    <h1 class="text-center">Liste des Réglements</h1>
    <div class="text mt-4">
      <button @click="openCreateModal" class="btn success">Ajouter un nouveau Réglement</button>
    </div>
    <br>
    <table class="table ">
      <thead>
        <tr>
          <th>Id</th>
          <th>Facture Id</th>
          <th>Montant</th>
          <th>Mode de Paiement</th>
          <th>Statut</th>
          <th>Date de Réglement</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="reglement in reglements" :key="reglement.id">
          <td>{{ reglement.id }}</td>
          <td>{{ reglement.factureId }}</td>
          <td>{{ reglement.montant }}</td>
          <td>{{ reglement.modePaiement }}</td>
          <td>{{ reglement.statut }}</td>
          <td>{{ new Date(reglement.dateReglement).toLocaleString() }}</td> <!-- Formate la date -->
          <td>
            <button class="btn warning" @click="openUpdateModal(reglement)">Modifier</button>&nbsp;
            <button class="btn danger" @click="deleteReglement(reglement.id)">Supprimer</button>
          </td>
        </tr>
      </tbody>
    </table>



    <!-- Modal for Create/Update Reglement -->
    <AppModal v-if="showModal" @close="closeModal">
      <template #header>
        <h3>{{ modalTitle }}</h3>
      </template>
      <template #body>
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
            <label>Date Reglement:</label>
            <input
              type="datetime-local"
              v-model="currentReglement.dateReglement"
              class="form-control"
              required
            />
          </div>

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
import ReglementssService from '@/services/ReglementssService';
import AppModal from '../components/AppModal';

export default {
  name: 'ReglementComponent',
  components: { AppModal },
  data() {
    return {
      reglements: [],
      currentReglement: {
        id: null,
        factureId: '',
        montant: '',
        modePaiement: '',
        statut: '',
        dateReglement: '',
        resteAPayer: null // Assurez-vous que cette valeur est incluse ici
      },
      showModal: false,
      modalTitle: 'Add New Reglement',
      modalButtonText: 'Save',
      isUpdateMode: false
    };
  },
  methods: {
    fetchReglements() {
      ReglementssService.getReglements()
        .then((response) => {
          this.reglements = response.data;
        })
        .catch((error) => {
          console.error('Failed to fetch reglements:', error);
        });
    },

    openCreateModal() {
      this.currentReglement = { factureId: '', montant: '', modePaiement: '', statut: '', dateReglement: '', resteAPayer: null }; // Assurez-vous que 'resteAPayer' est réinitialisé
      this.showModal = true;
      this.modalTitle = 'Add New Reglement';
      this.modalButtonText = 'Save';
      this.isUpdateMode = false;
    },

    openUpdateModal(reglement) {
      this.currentReglement = { ...reglement };
      this.showModal = true;
      this.modalTitle = 'Update Reglement';
      this.modalButtonText = 'Update';
      this.isUpdateMode = true;
    },

    closeModal() {
      this.showModal = false;
    },

    submitReglement() {
      // Si 'resteAPayer' est manquant ou égal à 0, le calculer
      if (!this.currentReglement.resteAPayer || this.currentReglement.resteAPayer === 0) {
        this.currentReglement.resteAPayer = parseFloat(this.currentReglement.montant); // Assurez-vous qu’il s’agit d’un nombre
      }

      if (this.isUpdateMode) {
        // Si mode de mise à jour, envoyez les données actualisées
        ReglementssService.updateReglement(this.currentReglement.id, this.currentReglement)
          .then((response) => {
            const updatedReglement = response.data;
            const index = this.reglements.findIndex((reglement) => reglement.id === updatedReglement.id);
            if (index !== -1) {
              this.reglements.splice(index, 1, updatedReglement); // Met à jour l'élément dans le tableau
            }
            this.fetchReglements();
            this.closeModal();
          })
          .catch((error) => {
            console.error('Failed to update reglement:', error);
          });
      } else {
        // Mode création, calculer le 'resteAPayer'
        this.currentReglement.resteAPayer = this.currentReglement.montant;

        // Créer un nouveau règlement
        ReglementssService.createReglement(this.currentReglement)
          .then((response) => {
            console.log('Created Reglement:', response.data);
            this.reglements.push(response.data); // Ajoutez le règlement créé à la liste
            this.fetchReglements();
            this.closeModal();
          })
          .catch((error) => {
            console.error('Failed to create reglement:', error);
          });
      }
    },

    deleteReglement(id) {
      if (confirm('Voulez-vous vraiment supprimer ce règlement?')) {
        ReglementssService.deleteReglement(id)
          .then(() => {
            this.reglements = this.reglements.filter((reglement) => reglement.id !== id);
          })
          .catch((error) => {
            console.error('Erreur lors de la suppression du règlement:', error);
          });
      }
    }
  },

  created() {
    this.fetchReglements();
  }
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
</style>
