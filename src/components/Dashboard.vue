<template>
    
    <div class="dashboard">
        <br/><br/><br/>
        <h1 class="text-center my-4">Tableau de Bord</h1>
        <br/><br/>
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
            <!-- Affichage conditionnel pour les sous-tableaux -->
            <table v-if="modalData && modalTitle === 'Factures par statut'">
              <thead>
                <tr>
                  <th>Statut</th>
                  <th>Détails</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in modalData" :key="index">
                  <td>{{ item.statut }}</td>
                  <td>
                    <table>
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Date Facture</th>
                          <th>Client</th>
                          <th>Statut</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="(facture, i) in item.factures" :key="i">
                          <td>{{ facture.id }}</td>
                          <td>{{ facture.dateFacture }}</td>
                          <td>{{ facture.clientID }}</td>
                          <td>{{ facture.statut }}</td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
  
            <!-- Autres affichages conditionnels -->
            <table v-else-if="Array.isArray(modalData)">
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
        ],
        modalTitle: "",
        modalData: null,
        isModalOpen: false,
        tableHeaders: [],
      };
    },
    methods: {
      fetchData() {
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
  
  
      },
      openModal(key) {
        this.modalTitle = this.cards.find((card) => card.key === key).title;
  
        switch (key) {
          case "mostRequestedProducts":
            FacturServices.getMostRequestedProducts().then((response) => {
              this.modalData = response.data;
              this.tableHeaders = ['Id', 'Nom de Produit', 'Quantité demandée'];
            }).catch(error => this.handleError(error));
            break;
          case "mostLoyalClients":
            FacturServices.getMostLoyalClients().then((response) => {
              this.modalData = response.data;
              this.tableHeaders = ['Id Client', 'Nombre Factures', 'Client', 'Fidélité'];
            }).catch(error => this.handleError(error));
            break;
          case "facturesByStatus":
            FacturServices.getFacturesByStatus().then((response) => {
              this.modalData = Object.entries(response.data).map(([status, factures]) => {
                return { statut: status, factures: factures };
              });
              this.tableHeaders = ['Statut', 'Nombre de factures'];
            }).catch(error => this.handleError(error));
            break;
          case "globalChiffreAffaires":
            FacturServices.getGlobalChiffreAffaires().then((response) => {
              this.modalData = `${response.data} €`;
              this.tableHeaders = [];
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
  background-color: white;
  min-height: 100vh;
  font-family: 'Roboto', sans-serif;
}


.text-center {
  text-align: center;
  font-size: 1.4rem;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 20px;
}

/* Styles des cartes */
.row {
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
}

.card-container {
  width: 48%;  
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease;
  cursor: pointer;
}

.card-container:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
}

.card {
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 15px;
  text-align: center;
  transition: all 0.3s ease;
  width: 100%;
}

.card-title {
  font-size: 1rem;
  font-weight: 500;
  color: #34495e;
  margin-bottom: 8px;
}

.card-text {
  font-size: 0.9rem;
  font-weight: 400;
  color: #7f8c8d;
  margin-bottom: 12px;
}

.btn {
  padding: 10px 20px;
  background-color: #2980b9;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn:hover {
  background-color: #3498db;
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
  transition: opacity 0.3s ease;
}

.modal-content {
  background: #ffffff;
  border-radius: 8px;
  padding: 30px;
  width: 85%;
  max-width: 700px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
  animation: fadeIn 0.3s ease;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.modal-header h5 {
  font-size: 1.2rem;
  font-weight: 600;
  color: #2c3e50;
}

.close-btn {
  background: none;
  border: none;
  font-size: 1.8rem;
  color: #2c3e50;
  cursor: pointer;
  transition: color 0.3s ease;
}

.close-btn:hover {
  color: #e74c3c;
}

.modal-body {
  margin-bottom: 20px;
}

.modal-footer {
  text-align: right;
}

.modal-footer .btn {
  background-color: #e74c3c;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
}

table, th, td {
  border: 1px solid #ecf0f1;
}

th, td {
  padding: 12px 15px;
  text-align: left;
  font-size: 0.9rem;
}

th {
  background-color: #f4f6f7;
  font-weight: 500;
  color: #34495e;
}

td {
  color: #7f8c8d;
}

/* Animation d'apparition pour la modale */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

/* Media Queries pour les petits écrans */
@media (max-width: 768px) {
  .text-center {
    font-size: 1.4rem;
  }

  .card-container {
    width: 100%;  /* Sur petits écrans, les cartes s'affichent en une seule colonne */
  }

  .modal-content {
    width: 90%;
  }
}

  </style>
  