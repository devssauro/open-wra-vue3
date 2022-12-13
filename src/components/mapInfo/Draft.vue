<template>
  <v-container fluid>
    <!-- {{map}} -->
    <v-row>
      <v-col cols="4" offset="2">
        <v-card class="bg-blue-darken-4" dark variant="outlined">
           <v-card-title style="display: flex; justify-content: center">
            {{[teams.team1, teams.team2].filter(t => t.id === map.blue_side)[0].name}}
          </v-card-title>
          <v-divider />
         <v-card-text>
            <v-row>
              <v-col cols="12">
                <ChampionField side="blue" :map="map" :label="getPlayerName(map.blue_side, map.blue_baron_player)" field="blue_baron_pick" :champions="blueChampions" />
              </v-col>
              <v-col cols="12">
                <ChampionField side="blue" :map="map" :label="getPlayerName(map.blue_side, map.blue_jungle_player)" field="blue_jungle_pick" :champions="blueChampions" />
              </v-col>
              <v-col cols="12">
                <ChampionField side="blue" :map="map" :label="getPlayerName(map.blue_side, map.blue_mid_player)" field="blue_mid_pick" :champions="blueChampions" />
              </v-col>
              <v-col cols="12">
                <ChampionField side="blue" :map="map" :label="getPlayerName(map.blue_side, map.blue_dragon_player)" field="blue_dragon_pick" :champions="blueChampions" />
              </v-col>
              <v-col cols="12">
                <ChampionField side="blue" :map="map" :label="getPlayerName(map.blue_side, map.blue_sup_player)" field="blue_sup_pick" :champions="blueChampions" />
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="4">
        <v-card class="bg-red-darken-4" dark variant="outlined">
          <v-card-title style="display: flex; justify-content: center">
            {{[teams.team1, teams.team2].filter(t => t.id === map.red_side)[0].name}}
          </v-card-title>
          <v-divider />
          <v-card-text>
            <v-row>
              <v-col cols="12">
                <ChampionField side="red" :map="map" :label="getPlayerName(map.red_side, map.red_baron_player)" field="red_baron_pick" :champions="redChampions" />
              </v-col>
              <v-col cols="12">
                <ChampionField side="red" :map="map" :label="getPlayerName(map.red_side, map.red_jungle_player)" field="red_jungle_pick" :champions="redChampions" />
              </v-col>
              <v-col cols="12">
                <ChampionField side="red" :map="map" :label="getPlayerName(map.red_side, map.red_mid_player)" field="red_mid_pick" :champions="redChampions" />
              </v-col>
              <v-col cols="12">
                <ChampionField side="red" :map="map" :label="getPlayerName(map.red_side, map.red_dragon_player)" field="red_dragon_pick" :champions="redChampions" />
              </v-col>
              <v-col cols="12">
                <ChampionField side="red" :map="map" :label="getPlayerName(map.red_side, map.red_sup_player)" field="red_sup_pick" :champions="redChampions" />
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref } from 'vue'
import MapRequest from '@/types/MapRequest'
import TeamsInfo from '@/types/TeamsInfo'
import Team from '@/types/Team'
import Player from '@/types/Player'
import Champion from '@/types/Champion'
import ChampionField from '@/components/mapInfo/ChampionField.vue'

export default defineComponent({
  name: 'Draft',
  components: {
    ChampionField
  },
  props: {
    map: {
      type: Object as PropType<MapRequest>,
      required: true
    },
    teams: {
      type: Object as PropType<TeamsInfo>,
      required: true
    },
    champions: {
      type: Array as PropType<Champion[]>,
      required: true,

    }
  },
  watch: {
    'map.blue_pick_1': function(val) { this.map.blue_baron_pick = val; },
    'map.blue_pick_2': function(val) { this.map.blue_jungle_pick = val; },
    'map.blue_pick_3': function(val) { this.map.blue_mid_pick = val; },
    'map.blue_pick_4': function(val) { this.map.blue_dragon_pick = val; },
    'map.blue_pick_5': function(val) { this.map.blue_sup_pick = val; },
    'map.red_pick_1': function(val) { this.map.red_baron_pick = val; },
    'map.red_pick_2': function(val) { this.map.red_jungle_pick = val; },
    'map.red_pick_3': function(val) { this.map.red_mid_pick = val; },
    'map.red_pick_4': function(val) { this.map.red_dragon_pick = val; },
    'map.red_pick_5': function(val) { this.map.red_sup_pick = val; },
  },
  computed: {
    blueChampions() {
      return this.champions.filter(c => 
        c.id === this.map.blue_pick_1 || 
        c.id === this.map.blue_pick_2 || 
        c.id === this.map.blue_pick_3 || 
        c.id === this.map.blue_pick_4 || 
        c.id === this.map.blue_pick_5
      );
    },
    redChampions() {
      return this.champions.filter(c => 
        c.id === this.map.red_pick_1 || 
        c.id === this.map.red_pick_2 || 
        c.id === this.map.red_pick_3 || 
        c.id === this.map.red_pick_4 || 
        c.id === this.map.red_pick_5
      );
    }  
  },
  created() {
    if (this.teams.team1.id === this.map.blue_side) {
      this.blueSidePlayers = this.teams.team1.players;
      this.redSidePlayers = this.teams.team2.players;
    } else {
      this.blueSidePlayers = this.teams.team2.players;
      this.redSidePlayers = this.teams.team1.players;
    }
  },
  setup(props) {
    const teamsList = computed<Team[]>(() => [props.teams.team1, props.teams.team2])
    const blueSidePlayers = ref<Player[]>()
    const redSidePlayers = ref<Player[]>()
    return {
      blueSidePlayers,
      redSidePlayers,
      teamsList,
    }
  },
  methods: {
    getImg(champion: string) {
      return require(`@/assets/${champion}.png`);
    },
    getPlayerName(teamId: number, playerId: number) {
      if (this.teams.team1.id == teamId)
        return this.teams?.team1?.players?.filter(p => p.id === playerId)[0].nickname;
      else
        return this.teams?.team2?.players?.filter(p => p.id === playerId)[0].nickname;
    }
  }
});
</script>
<style>

</style>