<template>
    <div class="container">
      <h1 class="text-center">Produits List</h1>
  
      <table class="table table-striped">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Photo</th>
            <th>Stock Quantity</th>
            <th>Price</th>
            <th>Action</th> 
          </tr>
        </thead>
        <tbody>
          <tr v-for="produit in produits" :key="produit.id">
            <td>{{ produit.id }}</td>
            <td>{{ produit.name }}</td>
            <td>
              <img :src="produit.photo" alt="Product Photo" width="50" height="50" />
            </td>
            <td>{{ produit.stockQuantity }}</td>
            <td>{{ produit.price }}</td>
            <td>
              <button class="btn btn-warning" @click="openUpdateModal(produit)">Update</button>
              <button class="btn btn-danger" @click="deleteProduit(produit.id)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
  
      <div class="text-center mt-4">
        <button class="btn btn-success" @click="openCreateModal">Add New Produit</button>
      </div>
  
      <AppModal v-if="showModal" @close="closeModal">
        <template #header>
          <h3>{{ modalTitle }}</h3>
        </template>
  
        <template #body>
          <form @submit.prevent="submitProduit">
            <div class="form-group">
              <label>Name:</label>
              <input type="text" v-model="currentProduit.name" class="form-control" required />
            </div>
            <div class="form-group">
              <label>Photo URL:</label>
              <input type="text" v-model="currentProduit.photo" class="form-control" required />
            </div>
            <div class="form-group">
              <label>Stock Quantity:</label>
              <input type="number" v-model="currentProduit.stockQuantity" class="form-control" required />
            </div>
            <div class="form-group">
              <label>Price:</label>
              <input type="number" v-model="currentProduit.price" class="form-control" required />
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
  
      openCreateModal() {
        this.newProduit = { name: '', photo: '', stockQuantity: 0, price: 0 }; 
        this.showModal = true;
        this.modalTitle = 'Add New Produit';
        this.modalButtonText = 'Save';
        this.isUpdateMode = false;
      },
  
      openUpdateModal(produit) {
        this.currentProduit = { ...produit }; 
        this.showModal = true;
        this.modalTitle = 'Update Produit';
        this.modalButtonText = 'Update';
        this.isUpdateMode = true;
      },
  
      closeModal() {
        this.showModal = false;
      },
  
      submitProduit() {
        if (this.isUpdateMode) {
          ProduitService.updateProduit(this.currentProduit.id, this.currentProduit)
            .then((response) => {
              const updatedProduit = response.data;
              const index = this.produits.findIndex((p) => p.id === updatedProduit.id);
              if (index !== -1) {
                this.$set(this.produits, index, updatedProduit);
              }
              this.fetchProduits();
              this.closeModal();
            })
            .catch((error) => {
              console.error('Failed to update produit:', error);
            });
        } else {
          ProduitService.createProduit(this.newProduit)
            .then((response) => {
              this.produits.push(response.data); 
              this.closeModal();
            })
            .catch((error) => {
              console.error('Failed to create produit:', error);
            });
        }
      },
  
      deleteProduit(id) {
        if (confirm("Do you really want to delete?")) {
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