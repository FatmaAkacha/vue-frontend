<template>
    <div class="container">
      <h1 class="text-center">Création d'une Nouvelle Facture</h1>
  
      <form @submit.prevent="submitFacture">
        <div class="form-group">
          <label>Client ID :</label>
          <input v-model="newFacture.clientID" type="number" class="form-control" required />
        </div>
  
        <div class="form-group">
          <label>Statut :</label>
          <select v-model="newFacture.status" class="form-control" required>
            <option value="PAID">Payée</option>
            <option value="UNPAID">Non Payée</option>
            <option value="PENDING">En Attente</option>
          </select>
        </div>
  
        <!-- Lignes de Facture -->
        <h3>Lignes de Facture</h3>
        <div v-for="(ligne, index) in newFacture.lignes" :key="index" class="form-group">
          <label>Produit ID :</label>
          <input v-model="ligne.produitID" type="number" class="form-control" required />
          <label>Quantité :</label>
          <input v-model="ligne.quantity" type="number" class="form-control" required />
          <button type="button" class="btn btn-danger mt-2" @click="removeFactureLigne(index)">Supprimer Ligne</button>
        </div>
  
        <button type="button" @click="addFactureLigne" class="btn btn-primary mt-2">Ajouter Ligne</button> &nbsp;
        
        <button type="submit" class="btn btn-success mt-3">Créer Facture</button>
      </form>
    </div>
  </template>
  
  <script>
  import FacturServices from '@/services/FacturServices';
  
  export default {
    name: 'CreateFacture',
    data() {
      return {
        newFacture: { clientID: null, status: 'PENDING', lignes: [] },
      };
    },
    methods: {
      addFactureLigne() {
        this.newFacture.lignes.push({ produitID: null, quantity: 1, prixUnitaire: 0 });
      },
      removeFactureLigne(index) {
        this.newFacture.lignes.splice(index, 1);
      },
      submitFacture() {
        const factureToSend = {
          ...this.newFacture,
          facturelignes: this.newFacture.lignes,
        };
  
        FacturServices.createFacture(factureToSend)
          .then(() => {
            // Rediriger vers la page /create-reglement après la création de la facture
            this.$router.push('/create-reglement');
          })
          .catch((error) => {
            console.error('Erreur lors de la création de la facture:', error);
          });
      },
    },
  };
  </script>
  
  <style scoped>
  /* Styles pour la création de la facture */
  .container {
    max-width: 600px;
    margin-top: 10%;
    margin-left: auto;
    margin-right: auto;
    border-radius: 8px;
  }
  
  .form-group {
    margin-bottom: 20px;
  }
  
  h1 {
    text-align: center;
    margin-bottom: 30px;
  }
  
  .btn {
    margin-top: 20px;
  }
  
  h3 {
    margin-top: 30px;
  }
  </style>
  