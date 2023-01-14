<template>
  <div id="app">
    <Menu :user=user />
    <div class="card">
      <div class="card-content">
        <router-view />
      </div>
      <div class="card-footer"></div>
    </div>
  </div>
</template>

<script>
  import Menu from './components/Menu.vue'

  export default {
    name: 'App',
    components: {
      Menu,
    },
    data() {
      return {
        user: {
          "google_id": "105279476200599131602",
          "email": "giokkaaaa@gmail.com",
          "username": "[WT]MageOx",
          "picture": "https://lh3.googleusercontent.com/a-/AOh14GhQ7zNdW_hUyLB8AmogdFej9S8eMLLLBfXWLN3lSg=s96-c"
        },
        login: false
      }
    },
    created() {
      // controllo login
      let self = this;
      this.$http('/api/v1/user').then(res => {
        self.login = true;
        self.user = res.data
      }).catch(err => console.log(err))
    }
  }
</script>