<template>
  <v-card>
    <v-container fluid class="pt-0">
      <v-tabs v-model="tab" background-color="transparent" color="basil" grow>
        <v-tab v-for="item in tabs" :key="item">
          {{ item }}
        </v-tab>
      </v-tabs>
      <v-window v-model="tab">
        <v-window-item v-if="teamsInfo !== null">
          <TeamSide v-if="teamsLoading" :map="map" :teams="teamsInfo" />
        </v-window-item>
        <v-window-item v-if="map.blue_side !== undefined && map.red_side !== undefined">
          <PicksBans :map="map" :teams="teamsInfo" :champions="champions" />
        </v-window-item>
        <v-window-item v-if="map.blue_side !== undefined && map.red_side !== undefined">
          <Draft :map="map" :teams="teamsInfo" :champions="champions"/>
        </v-window-item>
        <!-- <v-window-item>
          <objectives :map="map" :teams="teamsInfo" />
        </v-window-item>
        <v-window-item>
          <final-stats @save="save" :map="map" :teams="teamsInfo" :champions="champions" />
        </v-window-item> -->
      </v-window>
    </v-container>
  </v-card>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref } from 'vue'
import Champion from '@/types/Champion'
import MapRequest from '@/types/MapRequest'
import TeamsInfo from '@/types/TeamsInfo'
import TeamSide from '@/components/mapInfo/TeamSide.vue'
import PicksBans from '@/components/mapInfo/PicksBans.vue'
import Draft from '@/components/mapInfo/Draft.vue'

export default defineComponent({
  name: 'MapDialog',
  components: {
    PicksBans,
    TeamSide,
    Draft
  },
  props: {
    matchupId: {
      type: Number,
      required: true
    },
    mapId: {
      type: Number,
      required: false,
      default: null
    }
  },
  watch: {
  },
  created() {
    this.getMap();
    this.getPlayers();
    this.getChampions();
  },
  setup() {
    const teamsLoading = ref<boolean>(true)
    const isLoading = ref<boolean>(false)
    const champions = ref<Champion[]>()
    const teamsInfo = ref<TeamsInfo | null>(null)
    const map = ref<MapRequest>(new MapRequest())
    const tab = ref<number | null>()
    const tabs = ref<string[]>([
      'side', 'Picks & Bans', 'Champion Picks', 'Objectives', 'Map stats'
    ])

    const onlyIf = computed(() => {
      return teamsInfo !== undefined && teamsInfo !== undefined
    })
    return {
      champions,
      isLoading,
      map,
      onlyIf,
      tab,
      tabs,
      teamsInfo,
      teamsLoading
    }
  },
  methods: {
    getMap() {
      if (this.mapId !== null && this.mapId !== undefined) 
        this.$axios.get(`/v1/matchup/${this.matchupId}/map/${this.mapId}/edit`).then(res => {
          this.map = Object.assign({}, res.data);
      });
    },
    getPlayers() {
      this.$axios.get(`/v1/matchup/${this.matchupId}/teams`).then(res => {
        this.teamsInfo = {...res.data};
        // console.log(this.teamsInfo);
        this.teamsLoading = true;
      });
    },
    getChampions() {
      this.isLoading = true;
      this.$axios.get('v1/champion').then(res => {
        this.champions = res.data.champions;
        this.isLoading = false;
      });
    },
    save(signal) {
      // console.log('MapDialog');
      if (this.mapId !== null && this.mapId !== undefined) 
        this.$axios.put(`v1/matchup/${this.matchup}/map/${this.mapId}/edit`, this.map).then(res => {
          this.$emit('saved', true);
        });
      else
        this.$axios.post(`v1/matchup/${this.matchup}/map`, this.map).then(res => {
          this.$emit('saved', true);
        });
    }
  }
});
</script>
<style>

</style>