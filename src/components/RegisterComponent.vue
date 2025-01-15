<template>
  <!-- Section: Design Block -->
  <section class="text-center">
    <!-- Background image -->
    <div class="p-5 bg-image" style="background-image: url('https://mdbootstrap.com/img/new/textures/full/171.jpg'); height: 300px;"></div>
    <!-- Background image -->

    <div class="card mx-4 mx-md-5 shadow-5-strong bg-body-tertiary" style="margin-top: -100px; backdrop-filter: blur(30px);">
      <div class="card-body py-5 px-md-5">
        <div class="row d-flex justify-content-center">
          <div class="col-lg-8">
            <h2 class="fw-bold mb-5">Inscrivez-vous</h2>
            <form @submit.prevent="registerUser">
              <!-- First and Last Name -->
              <div class="row">
                <div class="col-md-6 mb-4">
                  <div class="form-outline">
                    <input v-model="user.firstName" type="text" id="firstName" class="form-control" placeholder="Prénom" />
                    <label class="form-label" for="firstName">Prénom</label>
                  </div>
                </div>
                <div class="col-md-6 mb-4">
                  <div class="form-outline">
                    <input v-model="user.lastName" type="text" id="lastName" class="form-control" placeholder="Nom" />
                    <label class="form-label" for="lastName">Nom</label>
                  </div>
                </div>
              </div>

              <!-- Email -->
              <div class="form-outline mb-4">
                <input v-model="user.email" type="email" id="email" class="form-control" placeholder="Emai" />
                <label class="form-label" for="email">Email</label>
              </div>

              <!-- Password -->
              <div class="form-outline mb-4">
                <input v-model="user.password" type="password" id="password" class="form-control" placeholder="Mot de passe" />
                <label class="form-label" for="password">Mot de passe</label>
              </div>

              <!-- Submit Button -->
              <button type="submit" class="btn btn-primary btn-block mb-4">
                S'inscrire
              </button>

              <!-- Already Registered -->
              <p class="mt-3">
                Déjà inscrit ? <router-link to="/login" class="link-danger">Connectez-vous ici</router-link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import AuthService from '../services/AuthService';

export default {
  data() {
    return {
      user: {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
      },
      socialIcons: ['fab fa-facebook-f', 'fab fa-google', 'fab fa-twitter', 'fab fa-github'],
    };
  },
  methods: {
    registerUser() {
      AuthService.register(this.user)
        .then((response) => {
          console.log('Registration successful:', response.data);
        })
        .catch((error) => {
          console.error('Registration failed:', error);
        });
    },
  },
};
</script>

<style>
/* Background blur effect for the card */
.card {
    border-radius: 1rem;
    max-width: 75%;
    justify-content: center;
    display: flex;
    margin-left: 14rem !important;
}

.form-outline {
  position: relative;
}

.form-outline input {
  padding: 1rem;
  border: 1px solid #ced4da;
  border-radius: 0.375rem;
}

.form-label {
  position: absolute;
  top: -10px;
  left: 15px;
  background: white;
  padding: 0 5px;
  font-size: 0.85rem;
}

.bg-image {
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

.btn-link {
  color: #6c757d;
  text-decoration: none;
}

.btn-link:hover {
  text-decoration: underline;
}
</style>