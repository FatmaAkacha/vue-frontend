<template>
    <div class="factures">
      <h1>Gestion des Factures</h1>
  
      <!-- Liste des factures -->
      <div v-if="factures.length">
        <h2>Liste des Factures</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Client</th>
              <th>Total</th>
              <th>Statut</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="facture in factures" :key="facture.id">
              <td>{{ facture.id }}</td>
              <td>{{ facture.client?.name || 'Client inconnu' }}</td>
              <td>{{ facture.total }}</td>
              <td>{{ facture.status }}</td>
              <td>
                <button @click="editFacture(facture)">Modifier</button>
                <button @click="deleteFacture(facture.id)">Supprimer</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
  
      <!-- Ajouter une nouvelle facture -->
      <div class="new-facture">
        <h2>Créer une nouvelle Facture</h2>
        <form @submit.prevent="createFacture">
          <div>
            <label for="client">Client ID</label>
            <input
              v-model.number="newFacture.clientID"
              id="client"
              type="number"
              required
              placeholder="ID du client"
            />
          </div>
          <div>
            <label for="total">Total</label>
            <input
              v-model.number="newFacture.total"
              id="total"
              type="number"
              required
            />
          </div>
          <div>
            <label for="status">Statut</label>
            <select v-model="newFacture.status" id="status" required>
              <option value="PAID">Payée</option>
              <option value="UNPAID">Non Payée</option>
              <option value="PENDING">En Attente</option>
            </select>
          </div>
          <button type="submit">Ajouter</button>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  import FactureService from '@/services/FactureService ';
  
  export default {
    name: 'FactureVue',
    data() {
      return {
        factures: [],
        newFacture: {
          clientID: null,
          total: 0,
          status: 'PENDING',
        },
      };
    },
    methods: {
      // Charger les factures au chargement du composant
      fetchFactures() {
        FactureService.getFactures()
          .then((response) => {
            this.factures = response.data;
          })
          .catch((error) => {
            console.error('Erreur lors de la récupération des factures:', error);
          });
      },
      // Créer une nouvelle facture
      createFacture() {
        FactureService.createFacture(this.newFacture)
          .then(() => {
            this.fetchFactures();
            this.newFacture = { clientID: null, total: 0, status: 'PENDING' }; // Réinitialiser le formulaire
          })
          .catch((error) => {
            console.error('Erreur lors de la création de la facture:', error);
          });
      },
      // Supprimer une facture
      deleteFacture(id) {
        FactureService.deleteFacture(id)
          .then(() => {
            this.fetchFactures();
          })
          .catch((error) => {
            console.error('Erreur lors de la suppression de la facture:', error);
          });
      },
      // Modifier une facture (exemple basique pour affichage)
      editFacture(facture) {
        alert(`Modifier la facture ${facture.id}. Implémentation à ajouter.`);
      },
    },
    mounted() {
      this.fetchFactures();
    },
  };
  </script>
  
  <style scoped>
  .factures {
    padding: 20px;
  }
  table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 20px;
  }
  table,
  th,
  td {
    border: 1px solid #ddd;
  }
  th,
  td {
    padding: 8px;
    text-align: left;
  }
  .new-facture {
    margin-top: 20px;
  }
  form div {
    margin-bottom: 10px;
  }
  </style>
  