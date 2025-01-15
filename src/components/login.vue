<template>
    <section class="vh-100">
      <div class="container-fluid h-custom">
        <div class="row d-flex justify-content-center align-items-center h-100">
          <div class="col-md-9 col-lg-6 col-xl-5">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
              class="img-fluid"
              alt="Sample image"
            />
          </div>
          <div class="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
            <form @submit.prevent="submitLogin">
              <!-- Email input -->
              <div data-mdb-input-init class="form-outline mb-4">
                <label class="form-label">Username</label>

                <input type="text" v-model="username" class="form-control form-control-lg" placeholder="Enter username" />
              </div>
  
              <!-- Password input -->
              <div data-mdb-input-init class="form-outline mb-3">
                <label class="form-label">Password</label>
                <input type="password" v-model="password" class="form-control form-control-lg" placeholder="Enter password" />
              </div>
  
              <div class="text-center text-lg-start mt-4 pt-2">
                <button type="submit" class="btn btn-primary btn-lg" style="padding-left: 2.5rem; padding-right: 2.5rem;">
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  </template>
  
  <script>
  export default {
    name: "LoginList",
    data() {
      return {
        username: "",
        password: "",
      };
    },
    methods: {
      async submitLogin() {
        try {
          const response = await fetch("http://localhost:9001/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({
              username: this.username,
              password: this.password,
            }),
          });
  
          if (!response.ok) {
            throw new Error("Login failed");
          }
  
          const data = await response.json();
          console.log("Login successful:", data);
          this.$router.push("/clients");
        } catch (error) {
          console.error("An error occurred during login:", error);
        }
      },
    },
  };
  </script>
  
  <style scoped>
  /* Global container for the login form */
  .vh-100 {
    min-height: 100vh;
  }
  
  .h-custom {
    height: calc(100% - 73px);
  }
  
  .container-fluid {
    max-width: 100%;
    padding: 0;
  }
  
  .row {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }
  
  /* Form Styles */
  form {
    display: flex;
    flex-direction: column;
    padding: 1rem;
  }
  
  /* Style for buttons (Facebook, Twitter, LinkedIn) */
  .btn-floating {
    background-color: #007bff;
    border-radius: 50%;
    font-size: 20px;
  }
  
  .btn-floating:hover {
    background-color: #0056b3;
  }
  
  /* Divider */
  .divider:after,
  .divider:before {
    content: "";
    flex: 1;
    height: 1px;
    background: #eee;
  }
  
  /* Input Fields */
  input {
    margin-bottom: 1rem;
    padding: 0.75rem;
    font-size: 1rem;
    border-radius: 5px;
  }
  
  input:focus {
    border-color: #007bff;
    outline: none;
  }
  
  /* Custom label styling */
  .form-label {
    font-size: 14px;
    color: #555;
  }
  
  /* Login Button */
  button {
    padding: 0.75rem;
    font-size: 1rem;
    background-color: #007bff;
    color: #fff;
    border: none;
    cursor: pointer;
    border-radius: 5px;
  }
  
  button:hover {
    background-color: #0056b3;
  }
  
  /* Footer styles */
  .text-center {
    text-align: center;
  }
  
  .link-danger {
    color: red;
  }
  
  /* Responsive design */
  @media (max-width: 450px) {
    .h-custom {
      height: 100%;
    }
  }
  </style>  