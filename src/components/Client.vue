<template>
    <div class="container">
      <h1 class="text-center">Clients List</h1>
  
      <table class="table table-striped">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="client in clients" :key="client.id">
            <td>{{ client.id }}</td>
            <td>{{ client.name }}</td>
            <td>{{ client.email }}</td>
            <td>{{ client.phone }}</td>
            <td>
              <button class="btn btn-warning" @click="openUpdateModal(client)">Update</button>
              <button class="btn btn-danger" @click="deleteClient(client.id)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
  
      <div class="text-center mt-4">
        <button @click="openCreateModal" class="btn btn-success">Add New Client</button>
      </div>
  
      <AppModal v-if="showModal" @close="closeModal">
        <template #header>
          <h3>{{ modalTitle }}</h3>
        </template>
        <template #body>
          <form @submit.prevent="submitClient">
            <div class="form-group">
              <label>Name:</label>
              <input type="text" v-model="currentClient.name" class="form-control" required />
            </div>
            <div class="form-group">
              <label>Email:</label>
              <input type="email" v-model="currentClient.email" class="form-control" required />
            </div>
            <div class="form-group">
              <label>Phone:</label>
              <input type="text" v-model="currentClient.phone" class="form-control" required />
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
            console.error('Failed to fetch clients:', error);
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
          // Mettre à jour un client
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
              console.error('Failed to update client:', error);
            });
        } else {
          ClientService.createClient(this.currentClient)
            .then((response) => {
              this.clients.push(response.data); 
              this.closeModal();
            })
            .catch((error) => {
              console.error('Failed to create client:', error);
            });
        }
      },
  
      deleteClient(id) {
        if (confirm('Do you really want to delete?')) {
          ClientService.deleteClient(id)
            .then(() => {
              this.clients = this.clients.filter((client) => client.id !== id);
            })
            .catch((error) => {
              console.error('Failed to delete client:', error);
            });
        }
      },
    },
    created() {
      this.fetchClients(); 
    },
  };
  </script>