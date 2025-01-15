<template>
    <div class="container">
      <h1 class="text-center">Réglements List</h1>
  
      <!-- Table to Display Reglements -->
      <table class="table table-striped">
        <thead>
          <tr>
            <th>Id</th>
            <th>Facture Id</th>
            <th>Montant</th>
            <th>Mode Paiement</th>
            <th>Statut</th>
            <th>Date Reglement</th>
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
              <button class="btn btn-warning" @click="openUpdateModal(reglement)">Update</button>
              <button class="btn btn-danger" @click="deleteReglement(reglement.id)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
  
      <!-- Button to Add New Reglement -->
      <div class="text-center mt-4">
        <button @click="openCreateModal" class="btn btn-success">Add New Reglement</button>
      </div>
  
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
              <label>Date Réglement:</label>
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
          <button class="btn btn-secondary" @click="closeModal">Cancel</button>
        </template>
      </AppModal>
    </div>
  </template>
  
  <script>
  import ReglementService from '@/services/ReglementService';
  import AppModal from '../components/AppModal';
  
  export default {
    name: 'ReglementList',
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
          dateReglement: ''
        },
        showModal: false,
        modalTitle: 'Add New Reglement',
        modalButtonText: 'Save',
        isUpdateMode: false
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
  
      openCreateModal() {
        this.currentReglement = { factureId: '', montant: '', modePaiement: '', statut: '', dateReglement: '' };
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
        if (this.isUpdateMode) {
          ReglementService.updateReglement(this.currentReglement.id, this.currentReglement)
            .then((response) => {
              const updatedReglement = response.data;
              const index = this.reglements.findIndex((reglement) => reglement.id === updatedReglement.id);
              if (index !== -1) {
                this.$set(this.reglements, index, updatedReglement);
              }
              this.fetchReglements();
              this.closeModal();
            })
            .catch((error) => {
              console.error('Failed to update reglement:', error);
            });
        } else {
          ReglementService.createReglement(this.currentReglement)
            .then((response) => {
              this.reglements.push(response.data);
              this.closeModal();
            })
            .catch((error) => {
              console.error('Failed to create reglement:', error);
            });
        }
      },
  
      deleteReglement(id) {
        if (confirm('Voulez-vous vraiment supprimer cette reglement?')) {
          ReglementService.deleteReglement(id)
            .then(() => {
              this.reglements = this.reglements.filter((reglement) => reglement.id !== id);
            })
            .catch((error) => {
              console.error('Erreur lors de la suppression de la règlement:', error);
            });
        }
      }
    },
  
    created() {
      this.fetchReglements();
    }
  };
  </script>  