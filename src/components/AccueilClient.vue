<template>
    <div class="container">
      <h1 class="text-center">Nos Produits</h1>
      <div class="row mt-4">
        <transition-group name="fade" tag="div" class="row">
          <div
            class="col-md-4 product-card"
            v-for="produit in produits"
            :key="produit.id"
          >
            <div class="card">
              <img :src="`http://localhost:7268${produit.photoPath}`" class="card-img-top" alt="Product Photo" />
              <div class="card-body">
                <h5 class="card-title">{{ produit.name }}</h5>
                <p class="card-text">Prix: {{ produit.price }} €</p>
                <p class="card-text">Quantité en Stock: {{ produit.stockQuantity }}</p>
                <a href="#" class="btn btn-primary">Voir Détails</a>
              </div>
            </div>
          </div>
        </transition-group>
      </div>
    </div>
  </template>
  
  <script>
  import ProduitService from '../services/ProduitService';
  
  export default {
    name: 'AccueilClient',
    data() {
      return {
        produits: [], // Liste des produits à afficher
      };
    },
    methods: {
      // Méthode pour récupérer la liste des produits
      fetchProduits() {
        ProduitService.getProduits()
          .then((response) => {
            this.produits = response.data;
          })
          .catch((error) => {
            console.error('Erreur lors de la récupération des produits:', error);
          });
      },
    },
    created() {
      this.fetchProduits(); // Appel de la méthode fetchProduits lors du chargement de la page
    },
  };
  </script>
  
  <style scoped>
  .container {
    margin-top: 100px;
  }
  
  .product-card {
    opacity: 0;
    animation: fadeIn 0.5s forwards;
  }
  
  .card {
    margin-bottom: 20px;
  }
  
  .card-img-top {
    height: 200px;
    object-fit: cover;
  }
  
  .card-body {
    text-align: center;
  }
  
  .card-title {
    font-size: 1.2rem;
  }
  
  .card-text {
    font-size: 1rem;
    margin: 10px 0;
  }
  
  .btn-primary {
    background-color: #007bff;
    border-color: #007bff;
  }
  
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
    opacity: 0;
  }
  </style>
  