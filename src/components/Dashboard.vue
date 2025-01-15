<template>
    <div class="dashboard">
      <h1 class="text-center my-4">Tableau de Bord</h1>
  
      <!-- Cartes pour les données globales -->
      <div class="row">
        <div class="card-container" v-for="(card, index) in cards" :key="index">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">{{ card.title }}</h5>
              <p class="card-text">{{ card.value }}</p>
              <button class="btn" @click="openModal(card.key)">Voir Détails</button>
            </div>
          </div>
        </div>
      </div>
  
      <!-- Modale de détails -->
      <div v-if="isModalOpen" class="modal-overlay" @click="closeModal">
        <div class="modal-content" @click.stop>
          <div class="modal-header">
            <h5>{{ modalTitle }}</h5>
            <button class="close-btn" @click="closeModal">×</button>
          </div>
          <div class="modal-body">
            <!-- Si modalData est un tableau, afficher sous forme de tableau -->
            <table v-if="Array.isArray(modalData)">
              <thead>
                <tr>
                  <th v-for="(header, index) in tableHeaders" :key="index">{{ header }}</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(row, index) in modalData" :key="index">
                  <td v-for="(value, column) in row" :key="column">{{ value }}</td>
                </tr>
              </tbody>
            </table>
  
            <!-- Si modalData n'est pas un tableau (ex. chiffre d'affaires, dettes), afficher la valeur -->
            <div v-else>
              <p>{{ modalData }}</p>
            </div>
          </div>
          <div class="modal-footer">
            <button class="btn" @click="closeModal">Fermer</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import FacturServices from "@/services/FacturServices";
  
  export default {
    name: "DashboardAdmin",
    data() {
      return {
        cards: [
          { title: "Produits les plus demandés", key: "mostRequestedProducts", value: "" },
          { title: "Clients les plus fidèles", key: "mostLoyalClients", value: "" },
          { title: "Factures par statut", key: "facturesByStatus", value: "" },
          { title: "Chiffre d'affaires global", key: "globalChiffreAffaires", value: "" },
          { title: "Dettes par client", key: "dettesParClient", value: "" },
        ],
        modalTitle: "",
        modalData: null,
        isModalOpen: false,
        tableHeaders: [],
      };
    },
    methods: {
      fetchData() {
        // Appels API pour remplir les cartes
        FacturServices.getMostRequestedProducts().then((response) => {
          this.cards.find((card) => card.key === "mostRequestedProducts").value = `${response.data.length} Produits`;
        });
  
        FacturServices.getMostLoyalClients().then((response) => {
          this.cards.find((card) => card.key === "mostLoyalClients").value = `${response.data.length} Clients`;
        });
  
        FacturServices.getFacturesByStatus().then((response) => {
          this.cards.find((card) => card.key === "facturesByStatus").value = `${Object.keys(response.data).length} Statuts`;
        });
  
        FacturServices.getGlobalChiffreAffaires().then((response) => {
          this.cards.find((card) => card.key === "globalChiffreAffaires").value = `${response.data} €`;
        });
  
        FacturServices.getDettesParClient().then((response) => {
          this.cards.find((card) => card.key === "dettesParClient").value = `${response.data.length} Clients avec dettes`;
        });
      },
      openModal(key) {
        // Définit le titre et charge les données pour la modale
        this.modalTitle = this.cards.find((card) => card.key === key).title;
  
        // Appel API en fonction de la clé pour remplir la modale
        switch (key) {
          case "mostRequestedProducts":
            FacturServices.getMostRequestedProducts().then((response) => {
              this.modalData = response.data;
              this.tableHeaders = ['Id','Nom de Produit', 'Quantité demandée'];
            }).catch(error => this.handleError(error));
            break;
          case "mostLoyalClients":
            FacturServices.getMostLoyalClients().then((response) => {
              this.modalData = response.data;
              this.tableHeaders = ['Id Client', 'Nombre Factures','Client', 'Fidélité'];
            }).catch(error => this.handleError(error));
            break;
            case "facturesByStatus":
          FacturServices.getFacturesByStatus().then((response) => {
            this.modalData = Object.entries(response.data).map(([status, count]) => {
              return { statut: status, nombre: count };
            });
            this.tableHeaders = ['Statut', 'Nombre de factures'];
          }).catch(error => this.handleError(error));
          break;
          case "globalChiffreAffaires":
            FacturServices.getGlobalChiffreAffaires().then((response) => {
              this.modalData = `${response.data} €`;  // Afficher comme texte
              this.tableHeaders = [];  // Pas de tableau
            }).catch(error => this.handleError(error));
            break;
          case "dettesParClient":
            FacturServices.getDettesParClient().then((response) => {
              this.modalData = `${response.data} Clients avec dettes`;  // Afficher comme texte
              this.tableHeaders = [];  // Pas de tableau
            }).catch(error => this.handleError(error));
            break;
          default:
            this.modalData = "Aucune donnée disponible.";
            this.tableHeaders = [];
        }
  
        this.isModalOpen = true;
      },
      closeModal() {
        this.isModalOpen = false;
      },
      handleError(error) {
        // Gestion des erreurs
        console.error("Erreur lors de la récupération des données : ", error.response ? error.response.data : error.message);
        this.modalData = "Erreur de récupération des données.";
      }
    },
    mounted() {
      this.fetchData();
    },
  };
  </script>
  
  <style>
  /* Styles généraux */
  .dashboard {
    padding: 20px;
  }
  
  .text-center {
    text-align: center;
  }
  
  .row {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    justify-content: center;
  }
  
  /* Styles des cartes */
  .card-container {
    width: 300px;
  }
  
  .card {
    border: 1px solid #ccc;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    padding: 20px;
    text-align: center;
  }
  
  .card-title {
    font-size: 18px;
    font-weight: bold;
  }
  
  .card-text {
    margin: 10px 0;
  }
  
  .btn {
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .btn:hover {
    background-color: #0056b3;
  }
  
  /* Styles pour la modale */
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: white;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .modal-content {
    background: white;
    border-radius: 8px;
    padding: 20px;
    width: 500px;
    max-width: 90%;
  }
  
  .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }
  
  .close-btn {
    background: none;
    border: none;
    font-size: 20px;
    cursor: pointer;
  }
  
  .modal-body {
    margin-bottom: 20px;
    font-family: monospace;
    font-size: 14px;
  }
  
  .modal-footer {
    text-align: right;
  }
  
  table {
    width: 100%;
    border-collapse: collapse;
  }
  
  table, th, td {
    border: 1px solid #ddd;
  }
  
  th, td {
    padding: 8px;
    text-align: left;
  }
  
  th {
    background-color: #f2f2f2;
  }
  </style>
  