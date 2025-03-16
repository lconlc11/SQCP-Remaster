<template>
  <v-app>
    <AppBar v-bind:display-menu="shouldDisplayMenu" />
    <v-main>
      <v-container fluid class="pa-0">
        <div>
          <select v-model="selectedServer">
            <option value="server1">Server 1</option>
            <option value="server2">Server 2</option>
          </select>
          <button @click="connectToServer">Connect</button>
          <button @click="retryConnection">Retry</button>
          <p>{{ connectionStatus }}</p>
        </div>
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import AppBar from './components/AppBar.vue';

export default {
  name: 'App',

  components: {
    AppBar,
  },

  data() {
    return {
      selectedServer: 'server1',
      connectionStatus: ''
    };
  },

  computed: {
    shouldDisplayMenu() {
      return this.$route.path.includes('login') ? 'no' : 'yes';
    },
  },

  methods: {
    async connectToServer() {
      try {
        const response = await fetch(`/api/connect?server=${this.selectedServer}`);
        if (response.ok) {
          this.connectionStatus = 'Connected successfully!';
        } else {
          this.connectionStatus = 'Connection failed.';
        }
      } catch (error) {
        this.connectionStatus = 'Error connecting to server.';
      }
    },
    retryConnection() {
      this.connectToServer();
    }
  },

  beforeUpdate() {
    const nextPageMessage = this.$store.getters.getNextPageMessage;

    if (nextPageMessage !== null) {
      this.$swal({
        icon: nextPageMessage.type,
        title: nextPageMessage.message,
      });

      this.$store.dispatch('setNextPageMessage', null);
    }
  },
};
</script>

<style>
.swal2-popup {
  font-family: 'Open Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen-Sans, Ubuntu, Cantarell,
    'Helvetica Neue', Helvetica, Arial, sans-serif !important;
}
</style>
