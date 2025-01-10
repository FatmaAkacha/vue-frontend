<template>
  <transition name="appmodal-fade">
    <div class="appmodal-backdrop">
      <div class="appmodal" role="dialog">
        <header class="appmodal-header">
          <slot name="header">Default Header</slot>
          <button type="button" class="btn-close" @click="close">×</button>
        </header>
        <section class="appmodal-body">
          <slot name="body">Default Body</slot>
        </section>
        <footer class="appmodal-footer">
          <slot name="footer"></slot>
        </footer>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'AppModal',
  methods: {
    close() {
      this.$emit('close'); // Émet l'événement pour fermer la modale
    },
  },
};
</script>

<style>
.appmodal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* Couleur de l'arrière-plan */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.appmodal {
  background: #fff;
  width: 500px;
  max-width: 90%;
  border-radius: 5px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  z-index: 1001;
}

.appmodal-header {
  padding: 10px 20px;
  border-bottom: 1px solid #ddd;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.appmodal-body {
  padding: 20px;
  
}

.appmodal-footer {
  padding: 10px 20px;
  border-top: 1px solid #ddd;
  text-align: right;
}

.btn-close {
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
}
</style>
