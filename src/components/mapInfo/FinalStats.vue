<template>
  <v-container fluid>
    <!-- {{map}} -->
    <v-row>
      <v-col cols="12">
        <v-card variant="outlined">
          <v-card-title>
            Resultado final
          </v-card-title>
          <v-card-title>
            <v-row>
              <v-col cols="3">
                <v-text-field variant="outlined" v-model="map.patch" label="Patch" />
              </v-col>
              <v-col cols="3">
                <v-text-field variant="outlined" v-model="map.length" label="Duração" />
              </v-col>
              <v-col cols="3">
                <v-select 
                  v-model="map.winner"
                  :items="[teams.team1, teams.team2]"
                  item-title="name"
                  item-value="id"
                  label="Vencedor"
                  variant="outlined"/>
              </v-col>
              <v-col cols="3">
                <v-text-field readonly
                  v-model="map.winner_side"
                  label="Lado Vencedor"
                  variant="outlined"/>
              </v-col>
              <v-col class="py-0" cols="12">
                <v-text-field dense
                  v-model="map.vod_link"
                  label="Link do VOD"
                  variant="outlined"/>
              </v-col>
            </v-row>
          </v-card-title>
        </v-card>
      </v-col>
      <v-col cols="6">
        <v-card class="bg-blue-darken-4" variant="outlined">
           <v-card-title style="display: flex; justify-content: center">
            {{[teams.team1, teams.team2].filter(t => t.id === map.blue_side)[0].name}}
          </v-card-title>
          <v-divider />
         <v-card-text>
            <v-row>
              <v-col cols="12">
                <v-text-field v-model="map.blue_turrets_destroyed" label="Torres destruídas" solo light/>
              </v-col>
              <v-col cols="12">
                <FinalStatsBlue side="blue" :map="map" :label="getPlayerName(map.blue_side, map.blue_baron_player)" field="baron" :champions="blueChampions" />
              </v-col>
              <v-col cols="12">
                <FinalStatsBlue side="blue" :map="map" :label="getPlayerName(map.blue_side, map.blue_jungle_player)" field="jungle" :champions="blueChampions" />
              </v-col>
              <v-col cols="12">
                <FinalStatsBlue side="blue" :map="map" :label="getPlayerName(map.blue_side, map.blue_mid_player)" field="mid" :champions="blueChampions" />
              </v-col>
              <v-col cols="12">
                <FinalStatsBlue side="blue" :map="map" :label="getPlayerName(map.blue_side, map.blue_dragon_player)" field="dragon" :champions="blueChampions" />
              </v-col>
              <v-col cols="12">
                <FinalStatsBlue side="blue" :map="map" :label="getPlayerName(map.blue_side, map.blue_sup_player)" field="sup" :champions="blueChampions" />
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="6">
        <v-card class="bg-red-darken-4" dark variant="outlined">
          <v-card-title style="display: flex; justify-content: center">
            {{[teams.team1, teams.team2].filter(t => t.id === map.red_side)[0].name}}
          </v-card-title>
          <v-divider />
          <v-card-text>
            <v-row>
              <v-col cols="12">
                <v-text-field v-model="map.red_turrets_destroyed" label="Torres destruídas" solo light/>
              </v-col>
              <v-col cols="12">
                <FinalStatsRed side="red" :map="map" :label="getPlayerName(map.red_side, map.red_baron_player)" field="baron" :champions="redChampions" />
              </v-col>
              <v-col cols="12">
                <FinalStatsRed side="red" :map="map" :label="getPlayerName(map.red_side, map.red_jungle_player)" field="jungle" :champions="redChampions" />
              </v-col>
              <v-col cols="12">
                <FinalStatsRed side="red" :map="map" :label="getPlayerName(map.red_side, map.red_mid_player)" field="mid" :champions="redChampions" />
              </v-col>
              <v-col cols="12">
                <FinalStatsRed side="red" :map="map" :label="getPlayerName(map.red_side, map.red_dragon_player)" field="dragon" :champions="redChampions" />
              </v-col>
              <v-col cols="12">
                <FinalStatsRed side="red" :map="map" :label="getPlayerName(map.red_side, map.red_sup_player)" field="sup" :champions="redChampions" />
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12">
        <v-btn block color="green" dark depressed @click="save">
          Salvar
        </v-btn>
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
import FinalStatsBlue from '@/components/mapInfo/FinalStatsBlue.vue'
import FinalStatsRed from '@/components/mapInfo/FinalStatsRed.vue'

export default defineComponent({
  name: 'Draft',
  components: {
    FinalStatsBlue,
    FinalStatsRed,
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
    'map.winner'(val: number) {
      if (val !== undefined)
        this.map.winner_side = this.map.blue_side === val ? 'blue' : 'red';
    }
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
    save() {
      this.$emit('save', true);
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