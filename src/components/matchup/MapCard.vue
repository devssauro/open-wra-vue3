<template>
  <v-card @click="openVod" :color="`${map.winner_side} darken-3`">
    <v-card-title>
      <v-row>
        <v-col cols="6">
          {{matchup[map.winner].tag}}
        </v-col>
        <v-col cols="6">
          {{map.length}}
        </v-col>
      </v-row>
    </v-card-title>
  </v-card>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref } from 'vue'
import MatchupResponse from '@/types/Matchup'
import MatchupMapResponse from '@/types/Map'

export default defineComponent({
  name: 'AllMatchups',
  props: {
    matchup: {
      type: Object as PropType<MatchupResponse>,
      required: true
    },
    map: {
      type: Object as PropType<MatchupMapResponse>,
      required: true
    }
  },
  watch: {
  },
  created() {
  },
  setup() {
    const isOperationalUser = computed(() => {
      const userStorage = localStorage.getItem('user')?.toString() 
      const user: any = JSON.parse(userStorage ? userStorage : '')
      if (user !== null && user !== undefined) {
        return user.roles.indexOf('operational') > -1;
      } else
        return false;
    })
    const showMenu = ref<boolean>()
    const mapDialog = ref<boolean>()
    return {
      isOperationalUser,
      mapDialog,
      showMenu,
    }
  },
  methods: {
    openVod() {
      if (this.map.vod_link !== undefined && this.map.vod_link !== null) {
        window.open(this.map.vod_link, '_blank');
      }
    },
    viewMap(matchupId: number, mapId: number) {
      this.$emit('viewMap', {matchupId: matchupId, mapId: mapId});
    },
    editMap(matchupId: number, mapId: number) {
      this.$emit('editMap', {matchupId: matchupId, mapId: mapId});
    },
  }
});
</script>
<style>

</style>