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
                <a class="card-text" :href="`/produits/${produit.id}`">
          <img 
            :src="require('@/assets/add-cart_16699600.png')" 
            height="40" 
            loading="lazy" 
          />
        </a>
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
  margin-top: 80px;
  padding: 0 20px;
}

.product-card {
  opacity: 0;
  animation: fadeIn 0.6s forwards;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.product-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.card {
  border: none;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  background: #fff;
  transition: transform 0.3s ease;
}

.card:hover {
  transform: scale(1.03);
}

.card-img-top {
  height: 220px;
  width: 100%;
  object-fit: cover;
  border-bottom: 2px solid #f1f1f1;
}

.card-body {
  padding: 20px;
  text-align: center;
}

.card-title {
  font-size: 1.3rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 15px;
}

.card-text {
  font-size: 1rem;
  color: #666;
  margin-bottom: 10px;
}

.card-text:last-child {
  margin-bottom: 0;
}

.card-text a {
  display: inline-block;
  margin-top: 20px;
}

.card-text img {
  width: 40px;
  height: auto;
  transition: transform 0.3s ease;
}

.card-text img:hover {
  transform: scale(1.1);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.6s ease-in-out;
}

.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0;
}

@media (max-width: 768px) {
  .card-img-top {
    height: 180px;
  }
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
  