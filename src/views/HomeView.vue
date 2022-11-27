<template>
  <Matchups />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Matchups from '@/components/Matchups.vue'; // @ is an alias to /src

export default defineComponent({
  name: 'HomeView',
  components: {
    Matchups,
  },
});
</script>
