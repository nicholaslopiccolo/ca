<template>
  <div>
    <b-navbar>
      <template #brand>
        <span class="icon m-2" @click="open = true">
          <i class="fa-solid fa-bars"></i>
        </span>
      </template>
      <template #end>
        <b-navbar-item>
          {{user.username}}
        </b-navbar-item>
        <b-navbar-item tag="div">
          <div class="buttons">
            <a class="button">
              <b-image img :src="user.picture" :alt="user.username" rounded />
            </a>
          </div>
        </b-navbar-item>
      </template>
    </b-navbar>
    <b-sidebar type="is-light" :fullheight="fullheight" :fullwidth="fullwidth" :overlay="overlay" :right="right"
      v-model="open">
      <div class="p-1">
        <b-menu>
          <b-menu-list label="Menu">
            <b-menu-item icon="settings" tag="router-link" :to="{'name':'Sign'}">
              <template #label="props">
                Login
                <b-icon class="is-pulled-right" :icon="props.expanded ? 'menu-down' : 'menu-up'"></b-icon>
              </template>
            </b-menu-item>
            <b-menu-item icon="settings">
              <template #label="props">
                Nuovo inserimento
                <b-icon class="is-pulled-right" :icon="props.expanded ? 'menu-down' : 'menu-up'"></b-icon>
              </template>
            </b-menu-item>
            <b-menu-item icon="settings">
              <template #label="props">
                Impostazioni
                <b-icon class="is-pulled-right" :icon="props.expanded ? 'menu-down' : 'menu-up'"></b-icon>
              </template>
            </b-menu-item>
            <b-menu-item icon="settings">
              <template #label="props">
                Grafici
                <b-icon class="is-pulled-right" :icon="props.expanded ? 'menu-down' : 'menu-up'"></b-icon>
              </template>
            </b-menu-item>

          </b-menu-list>
          <b-menu-list label="Actions">
            <b-menu-item label="Logout"></b-menu-item>
          </b-menu-list>
        </b-menu>
      </div>
    </b-sidebar>
  </div>
</template>

<script>
  export default {
    props: ['user'],
    data() {
      return {
        open: false,
        overlay: true,
        fullheight: true,
        fullwidth: false,
        right: false
      };
    }
  };
</script>

<style>
  .p-1 {
    padding: 1em;
  }
</style>