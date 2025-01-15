<template>
  <div>
    <!-- Navbar -->
    <nav class="navbar navbar-expand-lg fixed-top navbar-light bg-light">
      <!-- Container wrapper -->
      <div class="container-fluid">
        <!-- Navbar brand -->
        <a class="navbar-brand" href="#">
          <!-- Remplacer par votre logo -->
          <img 
            :src="require('@/assets/logo1.png')" 
            height="40" 
            alt="Logo" 
            loading="lazy" 
          />
        </a>

        <!-- Toggle button -->
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <!-- Collapsible wrapper -->
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <!-- Left links -->
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <router-link to="/" class="nav-link active" aria-current="page">Accueil</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/about" class="nav-link">À propos</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/clients" class="nav-link">Clients</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/produits" class="nav-link">Produits</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/reglement" class="nav-link">Règlements</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/facture" class="nav-link">Factures</router-link>
            </li>
          </ul>
        </div>
        <!-- Collapsible wrapper -->
      </div>
      <!-- Container wrapper -->
    </nav>
    <!-- Navbar -->

    <!-- Main Content -->
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      username: "",
    };
  },
  methods: {
    // Méthode de déconnexion
    logout() {
      console.log("User logged out");
      // Rediriger vers la page de connexion
      this.$router.push("/login");
    },
  },
};
</script>

<style>
.navbar-dark .nav-item .nav-link {
  color: #fff;
}

.navbar-dark .nav-item .nav-link:hover {
  background-color: rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
  border-radius: 0.25rem;
  color: #fff;
}

.fa-li {
  position: relative;
  left: 0;
}
</style>
