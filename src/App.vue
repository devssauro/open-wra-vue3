<!-- <template>
  <router-view/>
</template> -->

<template>
  <v-app>
    <v-app-bar flat dark>
      <v-container class="fill-height d-flex align-center">
        <v-menu>
          <template v-slot:activator="{ props }">
            <v-btn
              v-bind="props">
              Relatórios
            </v-btn>
          </template>
          <v-list>
            <v-list-item
              v-for="(item, index) in items"
              :key="index"
              :value="index"
            >
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>

        <template v-for="link in links" :key="link">
          <v-btn variant="text" v-if="link.toShow">
            {{ link.title }}
          </v-btn>
        </template>
        <v-spacer></v-spacer>
      </v-container>
    </v-app-bar>

    <v-main class="bg-grey-darken-3">
      <router-view fill-height />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import ToolbarLink from '@/types/ToolbarLink'

export default defineComponent({
  name: 'HomeView',
  components: {},
  setup() {
    const links = ref<ToolbarLink[]>([
      { title: 'Matchups', to: '/', toShow: true},
      { title: 'Cadastros', to: '/cadastros', toShow: true },
      { title: 'Download', to: '/download', toShow: true },
    ])
    const items = ref<ToolbarLink[]>([
      { title: 'Champion', to: '/view/champion' },
      { title: 'Player', to: '/view/player' },
      { title: 'Picks & Bans', to: '/view/picks_bans' },
      { title: 'Stats Geral', to: '/view/stats' },
    ]);

    return {links, items}
  },
  methods: {
    goTo(path: string) {
      this.$router.push(path);
    },
  }
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
