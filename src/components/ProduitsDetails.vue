<template>
    <div class="produit-details">
      <h1>Détails du Produit :</h1>
      <div v-if="produit">
        <div class="card">
          <img :src="`http://localhost:7268${produit.photoPath}`" class="card-img-top" alt="Product Photo" />
          <div class="card-body">
            <h5 class="card-title">{{ produit.name }}</h5>
            <p class="card-text">Description: {{ produit.description }}</p>
            <p class="card-text">Prix: {{ produit.price }} €</p>
            <p class="card-text">Quantité en Stock: {{ produit.stockQuantity }}</p>
            <button class="btn btn-success" @click="acheterProduit(produit.id)">
            Acheter
            <img 
              :src="require('@/assets/shopping.png')" 
              height="20" 
              alt="Shopping Icon" 
              class="shopping-icon"
            />
          </button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import ProduitService from '@/services/ProduitService';
  
  export default {
    name: 'ProduitDetails',
    data() {
      return {
        produit: '',  
      };
    },
    methods: {
      acheterProduit() {
        this.$router.push('/create-facture');
      },
      fetchProduitDetails() {
        const produitId = this.$route.params.id;
        ProduitService.getProduitById(produitId)
          .then((response) => {
            this.produit = response.data;
          })
          .catch((error) => {
            console.error('Erreur lors de la récupération des détails du produit:', error);
          });
      },
    },
    created() {
      this.fetchProduitDetails();
    },
  };
  </script>
  
  <style scoped>
  .produit-details {
    align-items: center;
    margin: 0px;
    display: flex;
    padding: 10px;
  }
  
  .card {
    width: 55rem;
    background-color: #fff;
    border-radius: 1px;
    margin-top:16%;
    margin-left: 5%;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
  }
  
  .card:hover {
    transform: translateY(-10px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  }
  
  .card-img-top {
    width: 100%;
    height: 250px;
    object-fit: cover;
    border-bottom: 1px solid #eee;
  }
  
  .card-body {
    padding: 20px;
    display: flex;
    flex-direction: column;
  }
  
  .card-title {
    font-size: 1.5rem;
    font-weight: bold;
    color: #333;
    margin-bottom: 15px;
  }
  .shopping-icon {
  margin-left: 10px; /* Add space between text and icon */
}
  .card-text {
    font-size: 1rem;
    color: #555;
    margin-bottom: 10px;
  }
  
  .btn-success {
    background-color: #28a745;
    border: none;
    padding: 10px 20px;
    color: #fff;
    font-size: 1rem;
    border-radius: 30px;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.2s;
  }
  
  .btn-success:hover {
    background-color: #218838;
    transform: scale(1.05);
  }
  
  @media (max-width: 768px) {
    .produit-details {
      padding: 10px;
    }
  
    .card {
      max-width: 100%;
    }
  }
  </style>
   