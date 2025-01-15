<template>
    <div class="container">
      <h1 class="text-center">Liste Des Clients</h1>
      <div class="text mt-4">
        <button @click="openCreateModal" class="btn success">Ajouter Nouveau Client</button>
      </div>
  <br>
      <table class="table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Nom</th>
            <th>Email</th>
            <th>Téléphone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="client in clients" :key="client.id">
            <td>{{ client.id }}</td>
            <td>{{ client.name }}</td>
            <td>{{ client.email }}</td>
            <td>{{ client.phone }}</td>
            <td class= "boutons">
              <button class="btn warning " @click="openUpdateModal(client)">Modifier</button>&nbsp;
              <button class="btn danger" @click="deleteClient(client.id)">Supprimer</button>
            </td>
          </tr>
        </tbody>
      </table>
  
      
      <AppModal v-if="showModal" @close="closeModal">
        <template #header>
          <h3>{{ modalTitle }}</h3>
        </template>
        <template #body>
          <form @submit.prevent="submitClient">
            <div class="form-group">
              <label>Nom:</label>
              <input type="text" v-model="currentClient.name" class="form-control" required />
            </div>
            <div class="form-group">
              <label>Email:</label>
              <input type="email" v-model="currentClient.email" class="form-control" required />
            </div>
            <div class="form-group">
              <label>Téléphone:</label>
              <input type="text" v-model="currentClient.phone" class="form-control" required />
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
  import ClientService from '../services/ClientService';
  
  export default {
    name: 'ClientList',
    components: { AppModal },
    data() {
      return {
        clients: [], 
        currentClient: { id: null, name: '', email: '', phone: '' }, 
        showModal: false, 
        modalTitle: 'Add New Client', 
        modalButtonText: 'Save', 
        isUpdateMode: false, 
      };
    },
    methods: {
      fetchClients() {
        ClientService.getClients()
          .then((response) => {
            this.clients = response.data;
          })
          .catch((error) => {
            console.error('Impossible de récupérer les clients:', error);
          });
      },
  
      openCreateModal() {
        this.currentClient = { name: '', email: '', phone: '' }; 
        this.showModal = true;
        this.modalTitle = 'Add New Client';
        this.modalButtonText = 'Save';
        this.isUpdateMode = false;
      },
  
      openUpdateModal(client) {
        this.currentClient = { ...client }; 
        this.showModal = true;
        this.modalTitle = 'Update Client';
        this.modalButtonText = 'Update';
        this.isUpdateMode = true;
      },
  
      closeModal() {
        this.showModal = false;
      },
  
      submitClient() {
        if (this.isUpdateMode) {
          ClientService.updateClient(this.currentClient.id, this.currentClient)
            .then((response) => {
              const updatedClient = response.data;
              const index = this.clients.findIndex((client) => client.id === updatedClient.id);
              if (index !== -1) {
                this.$set(this.clients, index, updatedClient);
              }
              this.fetchClients();
              this.closeModal();
            })
            .catch((error) => {
              console.error('Échec de la mise à jour du client:', error);
            });
        } else {
          ClientService.createClient(this.currentClient)
            .then((response) => {
              this.clients.push(response.data); 
              this.closeModal();
            })
            .catch((error) => {
              console.error('Échec de la création du client:', error);
            });
        }
      },
  
      deleteClient(id) {
        if (confirm('Voulez-vous vraiment supprimer?')) {
          ClientService.deleteClient(id)
            .then(() => {
              this.clients = this.clients.filter((client) => client.id !== id);
            })
            .catch((error) => {
              console.error('Impossible de supprimer le client:', error);
            });
        }
      },
    },
    created() {
      this.fetchClients(); 
    },
  };
  </script>
  <style>
  .container{
    margin-top:100px;
  }
  .boutons{
    align-content: center;
  }
  
  .danger{
    background-color: #ff6961 !important;
  }
  .warning{
    background-color: #FAC900 !important;
  }
  .success{
    background-color: #99c5c4 !important;
  }
  </style>