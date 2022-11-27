<template>
  <v-container fluid>
    <v-row>
      <!-- {{map}} -->
      <v-col cols="4" offset="2">
        <v-card class="bg-blue-darken-4" dark variant="outlined">
          <template v-slot:title>
            BLUE SIDE
          </template>
          <v-card-text>
            <v-select 
              v-model="map.blue_side"
              :items="[teams.team1, teams.team2]"
              item-title="name"
              item-value="id"
              label="Time"
              variant="solo" theme="light"/>
            <v-select 
              v-model="map.blue_baron_player"
              :items="blueSidePlayers"
              item-title="nickname"
              item-value="id"
              label="Baron"
              variant="solo" theme="light"/>
            <v-select 
              v-model="map.blue_jungle_player"
              :items="blueSidePlayers"
              item-title="nickname"
              item-value="id"
              label="Jungle"
              variant="solo" theme="light"/>
            <v-select 
              v-model="map.blue_mid_player"
              :items="blueSidePlayers"
              item-title="nickname"
              item-value="id"
              label="Mid"
              variant="solo" theme="light"/>
            <v-select 
              v-model="map.blue_dragon_player"
              :items="blueSidePlayers"
              item-title="nickname"
              item-value="id"
              label="Dragon"
              variant="solo" theme="light"/>
            <v-select 
              v-model="map.blue_sup_player"
              :items="blueSidePlayers"
              item-title="nickname"
              item-value="id"
              label="Sup"
              variant="solo" theme="light"/>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="4">
        <v-card class="bg-red-darken-4" dark variant="outlined">
          <template v-slot:title class="float-end">
            RED SIDE
          </template>
          <v-card-text>
            <v-select 
              v-model="map.red_side"
              :items="[teams.team1, teams.team2]"
              item-title="name"
              item-value="id"
              label="Time"
              variant="solo" theme="light"/>
            <v-select 
              v-model="map.red_baron_player"
              :items="redSidePlayers"
              item-title="nickname"
              item-value="id"
              label="Baron"
              variant="solo" theme="light"/>
            <v-select 
              v-model="map.red_jungle_player"
              :items="redSidePlayers"
              item-title="nickname"
              item-value="id"
              label="Jungle"
              variant="solo" theme="light"/>
            <v-select 
              v-model="map.red_mid_player"
              :items="redSidePlayers"
              item-title="nickname"
              item-value="id"
              label="Mid"
              variant="solo" theme="light"/>
            <v-select 
              v-model="map.red_dragon_player"
              :items="redSidePlayers"
              item-title="nickname"
              item-value="id"
              label="Dragon"
              variant="solo" theme="light"/>
            <v-select 
              v-model="map.red_sup_player"
              :items="redSidePlayers"
              item-title="nickname"
              item-value="id"
              label="Sup"
              variant="solo" theme="light"/>
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

export default defineComponent({
  name: 'AllMatchups',
  props: {
    map: {
      type: Object as PropType<MapRequest>,
      required: true
    },
    teams: {
      type: Object as PropType<TeamsInfo>,
      required: true
    }
  },
  watch: {
    'map.blue_side': function (val) {
      if (this.teams.team1.id === val) {
        this.blueSidePlayers = this.teams.team1.players;
        this.redSidePlayers = this.teams.team2.players;
        this.map.red_side = this.teams.team2.id;
      } else {
        this.blueSidePlayers = this.teams.team2.players;
        this.redSidePlayers = this.teams.team1.players;
        this.map.red_side = this.teams.team1.id;
      }
      this.map.blue_baron_player = this.blueSidePlayers[0].id;
      this.map.blue_jungle_player = this.blueSidePlayers[1].id;
      this.map.blue_mid_player = this.blueSidePlayers[2].id;
      this.map.blue_dragon_player = this.blueSidePlayers[3].id;
      this.map.blue_sup_player = this.blueSidePlayers[4].id;
      this.map.red_baron_player = this.redSidePlayers[0].id;
      this.map.red_jungle_player = this.redSidePlayers[1].id;
      this.map.red_mid_player = this.redSidePlayers[2].id;
      this.map.red_dragon_player = this.redSidePlayers[3].id;
      this.map.red_sup_player = this.redSidePlayers[4].id;
    },
  },
  created() {
    // console.log(this.teams);
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
  }
});
</script>
<style>

</style>