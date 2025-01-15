<template>
  <section class="vh-100">
    <div class="container-fluid h-custom">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <!-- Image Section -->
        <div class="col-md-9 col-lg-6 col-xl-5">
          <img
            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
            class="img-fluid"
            alt="Login image"
          />
        </div>

        <!-- Form Section -->
        <div class="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
          <form @submit.prevent="loginUser">

            <!-- Email Input -->
            <div class="form-outline mb-4">
              <input
                type="email"
                id="email"
                class="form-control form-control-lg"
                v-model="user.email"
                placeholder="Email"
              />
              <label class="form-label" for="email">Email</label>
            </div>

            <!-- Password Input -->
            <div class="form-outline mb-3">
              <input
                type="password"
                id="password"
                class="form-control form-control-lg"
                v-model="user.password"
                placeholder="Mot de passe"
              />
              <label class="form-label" for="password">Mot de passe</label>
            </div>

            <!-- Submit Button -->
            <div class="text-center text-lg-start mt-4 pt-2">
              <button type="submit" class="btn btn-primary btn-lg" style="padding-left: 2.5rem; padding-right: 2.5rem;">
                Se connecter
              </button>
              <p class="small fw-bold mt-2 pt-1 mb-0">
                Vous n'avez pas de compte ?
                <router-link to="/register" class="link-danger">Register</router-link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <div
      class="d-flex flex-column flex-md-row text-center text-md-start justify-content-between py-4 px-4 px-xl-5 bg-primary"
    >
      <div class="text-white mb-3 mb-md-0">
        Copyright © 2025. All rights reserved.
      </div>
    </div>
  </section>
</template>

<script>
import AuthService from "../services/AuthService";

export default {
  data() {
    return {
      user: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    loginUser() {
      AuthService.login(this.user)
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.error("Login failed:", error);
        });
    },
  },
};
</script>

<style>
.divider:after,
.divider:before {
  content: "";
  flex: 1;
  height: 1px;
  background: #eee;
}
.h-custom {
  height: calc(100% - 73px);
}
@media (max-width: 450px) {
  .h-custom {
    height: 100%;
  }
}
</style>
