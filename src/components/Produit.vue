<template>
  <div class="container">
    <h1 class="text-center">Liste des produits</h1>
    <div class="text mt-4">
      <button class="btn success" @click="openCreateModal">Ajouter un nouveau Produit</button>
    </div>
    <br />
    <table class="table">
      <thead>
        <tr>
          <th>Id</th>
          <th>Nom</th>
          <th>Image</th>
          <th>Quantité de Stock</th>
          <th>Prix Unitaire</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="produit in produits" :key="produit.id">
          <td>{{ produit.id }}</td>
          <td>{{ produit.name }}</td>
          <td>
  <img :src="`http://localhost:7268${produit.photoPath}`" alt="Product Photo" width="50" height="50" />
</td>

          <td>{{ produit.stockQuantity }}</td>
          <td>{{ produit.price }}</td>
          <td>
            <button class="btn warning" @click="openUpdateModal(produit)">Modifier</button>&nbsp;
            <button class="btn danger" @click="deleteProduit(produit.id)">Supprimer</button>
          </td>
        </tr>
      </tbody>
    </table>

    <AppModal v-if="showModal" @close="closeModal">
      <template #header>
        <h3>{{ modalTitle }}</h3>
      </template>

      <template #body>
        <form @submit.prevent="submitProduit">
          <div class="form-group">
            <label>Nom:</label>
            <input type="text" v-model="currentProduit.name" class="form-control" required />
          </div>
          <div class="form-group">
            <label>Image:</label>
            <input type="file" @change="handleFileUpload" class="form-control" />
          </div>
          <div class="form-group">
            <label>Quantité de Stock:</label>
            <input type="number" v-model="currentProduit.stockQuantity" class="form-control" required />
          </div>
          <div class="form-group">
            <label>Prix Unitaire:</label>
            <input type="number" v-model="currentProduit.price" class="form-control" required />
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
import AppModal from '../components/AppModal';
import ProduitService from '../services/ProduitService';

export default {
  name: 'ProduitList',
  components: { AppModal },
  data() {
    return {
      produits: [],
      currentProduit: { id: null, name: '', photo: '', stockQuantity: 0, price: 0 },
      newProduit: { name: '', photo: '', stockQuantity: 0, price: 0 },
      selectedFile: null, 
      showModal: false,
      modalTitle: 'Add New Produit',
      modalButtonText: 'Save',
      isUpdateMode: false,
    };
  },
  methods: {
    fetchProduits() {
      ProduitService.getProduits()
        .then((response) => {
          this.produits = response.data;
        })
        .catch((error) => {
          console.error('Failed to fetch produits:', error);
        });
    },

    handleFileUpload(event) {
      this.selectedFile = event.target.files[0]; 
    },

    openCreateModal () {
      this.currentProduit = { name: '', photo: '', stockQuantity: 0, price: 0 };
      this.selectedFile = null;
      this.showModal = true;
      this.modalTitle = 'Add New Produit';
      this.modalButtonText = 'Save';
      this.isUpdateMode = false;
    },

    openUpdateModal(produit) {
      this.currentProduit = { ...produit };
      this.selectedFile = null;
      this.showModal = true;
      this.modalTitle = 'Update Produit';
      this.modalButtonText = 'Update';
      this.isUpdateMode = true;
    },

    closeModal() {
      this.showModal = false;
    },

    submitProduit() {
  const formData = new FormData();
  formData.append('name', this.currentProduit.name);
  formData.append('stockQuantity', this.currentProduit.stockQuantity);
  formData.append('price', this.currentProduit.price);

  // Ajout de l'image si elle est sélectionnée
  if (this.selectedFile) {
    formData.append('photo', this.selectedFile);
  }

  const config = {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  };

  if (this.isUpdateMode) {
    if (!this.currentProduit.id) {
      console.error('ID du produit manquant pour la mise à jour');
      return;
    }

    ProduitService.updateProduit(this.currentProduit.id, formData, config)
      .then((response) => {
        const updatedProduit = response.data;
        const index = this.produits.findIndex((p) => p.id === updatedProduit.id);
        if (index !== -1) {
          this.$set(this.produits, index, updatedProduit);
        }
        this.fetchProduits(); // Rafraîchissement de la liste des produits
        this.closeModal();
      })
      .catch((error) => {
        console.error('Failed to update produit:', error);
      });
  } else {
    // Requête POST pour la création du produit
    ProduitService.createProduit(formData, config)
      .then((response) => {
        this.produits.push(response.data); // Ajout du produit créé à la liste
        this.closeModal();
      })
      .catch((error) => {
        console.error('Failed to create produit:', error);
      });
  }
},


    deleteProduit(id) {
      if (confirm('Do you really want to delete?')) {
        ProduitService.deleteProduit(id)
          .then(() => {
            this.produits = this.produits.filter((produit) => produit.id !== id);
          })
          .catch((error) => {
            console.error('Failed to delete produit:', error);
          });
      }
    },
  },
  created() {
    this.fetchProduits();
  },
};
</script>

<style>
.container {
  margin-top: 100px;
}
.boutons {
  align-content: center;
}

.danger {
  background-color: #ff6961 !important;
}
.warning {
  background-color: #fac900 !important;
}
.success {
  background-color: #99c5c4 !important;
}
</style>