<template>
  <v-container fluid>
    <!-- {{map}} -->
    <v-row>
      <v-col cols="6">
        <v-card class="bg-red-darken-3" dark variant="outlined">
          <v-card-title style="display: flex; justify-content: center">
            First Blood
          </v-card-title>
          <v-divider />
          <v-card-text>
            <v-row>
              <v-col cols="12">
                <v-select density="comfortable" clearable v-model="map.team_first_blood" @change="setTeamFirstDeath" variant="outlined" label="Time"
                  :items="teamsList" item-title="name" item-value="id" />
              </v-col>
              <v-col cols="6">
                <v-select density="comfortable" clearable v-model="map.player_first_blood" variant="outlined" label="First Blood" :items="firstBloodTeam()"
                  item-title="nickname" item-value="id" />
              </v-col>
              <v-col cols="6">
                <v-select density="comfortable" clearable v-model="map.player_first_death" variant="outlined" label="First Death" :items="firstDeathTeam()"
                  item-title="nickname" item-value="id" />
              </v-col>
              <v-col cols="12">
                <v-select density="comfortable" clearable v-model="map.place_first_blood" variant="outlined" label="Local" :items="firstBloodPlaces" />
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="6">
        <v-card class="bg-deep-orange-darken-3" dark variant="outlined">
          <v-card-title style="display: flex; justify-content: center">
            First tower
          </v-card-title>
          <v-divider />
          <v-card-text>
            <v-row>
              <v-col cols="12">
                <v-select density="comfortable" clearable v-model="map.team_first_tower" variant="outlined" label="Time" :items="teamsList"
                  item-title="name" item-value="id" />
              </v-col>
              <v-col cols="12">
                <v-select density="comfortable" clearable v-model="map.first_tower_route" variant="outlined" label="Rota" :items="towerRoutes"
                  item-title="name" item-value="id" />
              </v-col>
              <v-col cols="12">
                <v-switch color="green" v-model="map.first_tower_herald" label="Com arauto" />
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="6">
        <v-card class="bg-purple-darken-2" dark variant="outlined">
          <v-card-title style="display: flex; justify-content: center">
            First Herald
          </v-card-title>
          <v-divider />
          <v-card-text>
            <v-row>
              <v-col cols="6">
                <v-select density="comfortable" clearable v-model="map.team_first_herald" variant="outlined" label="Time" :items="teamsList"
                  item-title="name" item-value="id" />
              </v-col>
              <v-col cols="6">
                <v-select density="comfortable" clearable v-model="map.first_herald_route" variant="outlined" label="Rota lançada" :items="towerRoutes" />
              </v-col>
              <v-col cols="6">
                <v-switch color="green" density="comfortable" clearable v-model="map.first_herald_teamfight" label="Com luta" />
              </v-col>
              <v-col cols="6">
                <v-switch color="green" density="comfortable" clearable v-model="map.first_herald_stealed" label="Arauto roubado" />
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="6">
        <v-card class="bg-purple-darken-2" dark variant="outlined">
          <v-card-title style="display: flex; justify-content: center">
            Second Herald
          </v-card-title>
          <v-divider />
          <v-card-text>
            <v-row>
              <v-col cols="6">
                <v-select density="comfortable" clearable v-model="map.team_second_herald" variant="outlined" label="Time" :items="teamsList"
                  item-title="name" item-value="id" />
              </v-col>
              <v-col cols="6">
                <v-select density="comfortable" clearable v-model="map.second_herald_route" variant="outlined" label="Rota lançada" :items="towerRoutes" />
              </v-col>
              <v-col cols="6">
                <v-switch color="green" density="comfortable" clearable v-model="map.second_herald_teamfight" label="Com luta" />
              </v-col>
              <v-col cols="6">
                <v-switch color="green" density="comfortable" clearable v-model="map.second_herald_stealed" label="Arauto roubado" />
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="4">
        <v-card class="bg-blue-grey-darken-2" dark variant="outlined">
          <v-card-title style="display: flex; justify-content: center">
            First Drake
          </v-card-title>
          <v-divider />
          <v-card-text>
            <v-row>
              <v-col cols="12">
                <v-select density="comfortable" clearable v-model="map.team_first_drake" variant="outlined" label="Time" :items="teamsList"
                  item-title="name" item-value="id" />
              </v-col>
              <v-col cols="12">
                <v-select density="comfortable" clearable v-model="map.first_drake_type" variant="outlined" label="Dragão" :items="drakes"
                  item-title="name" item-value="id" />
              </v-col>
              <v-col cols="6">
                <v-switch color="green" v-model="map.first_drake_teamfight" label="Com luta" />
              </v-col>
              <v-col cols="6">
                <v-switch color="green" v-model="map.first_drake_stealed" label="Dragão roubado" />
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="4">
        <v-card class="bg-blue-grey-darken-2" dark variant="outlined">
          <v-card-title style="display: flex; justify-content: center">
            Second Drake
          </v-card-title>
          <v-divider />
          <v-card-text>
            <v-row>
              <v-col cols="12">
                <v-select density="comfortable" clearable v-model="map.team_second_drake" variant="outlined" label="Time" :items="teamsList"
                  item-title="name" item-value="id" />
              </v-col>
              <v-col cols="12">
                <v-select density="comfortable" clearable v-model="map.second_drake_type" variant="outlined" label="Dragão" :items="secondDrakeOptions"
                  item-title="name" item-value="id" />
              </v-col>
              <v-col cols="6">
                <v-switch color="green" v-model="map.second_drake_teamfight" label="Com luta" />
              </v-col>
              <v-col cols="6">
                <v-switch color="green" v-model="map.second_drake_stealed" label="Dragão roubado" />
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="4">
        <v-card class="bg-blue-grey-darken-2" dark variant="outlined">
          <v-card-title style="display: flex; justify-content: center">
            Third Drake
          </v-card-title>
          <v-divider />
          <v-card-text>
            <v-row>
              <v-col cols="12">
                <v-select density="comfortable" clearable v-model="map.team_third_drake" variant="outlined" label="Time" :items="teamsList"
                  item-title="name" item-value="id" />
              </v-col>
              <v-col cols="12">
                <v-select density="comfortable" clearable v-model="map.third_drake_type" variant="outlined" label="Dragão" :items="thirdDrakeOptions"
                  item-title="name" item-value="id" />
              </v-col>
              <v-col cols="6">
                <v-switch color="green" v-model="map.third_drake_teamfight" label="Com luta" />
              </v-col>
              <v-col cols="6">
                <v-switch color="green" v-model="map.third_drake_stealed" label="Dragão roubado" />
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
import { DrakeType } from '@/types/mapParts/objectives/Drake'
import { PlacesFirstBlood } from '@/types/mapParts/objectives/FirstBlood'
import ChampionField from '@/components/mapInfo/ChampionField.vue'


export default defineComponent({
  name: 'Objectives',
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
  },
  watch: {
    'map.second_drake_type': function (val) {
    if (val !== undefined && val !== null) {
      this.map.third_drake_type = this.secondDrakeOptions.filter(d => d !== val)[0];
    }
  }
  },
  computed: {
    secondDrakeOptions() {
      return this.drakes.filter(d => d !== this.map.first_drake_type)
    },
    thirdDrakeOptions() {
      return this.drakes.filter(d => d !== this.map.second_drake_type)
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
    const drakes = ref<DrakeType[]>(['infernal', 'mountain', 'ocean'])
    const towerRoutes = ref<string[]>(['baron', 'mid', 'dragon'])
    const firstBloodPlaces = ref<PlacesFirstBlood[]>([
      'baron lane',
      'mid lane',
      'dragon lane',
      'baron river',
      'dragon river',
      'blue jungle',
      'red jungle',
    ])
    return {
      blueSidePlayers,
      drakes,
      redSidePlayers,
      teamsList,
      towerRoutes,
      firstBloodPlaces,
    }
  },
  methods: {
    setTeamFirstDeath(val: number) {
      this.map.team_first_death = this.teamsList.filter(t => t.id !== val)[0].id;
    },
    firstBloodTeam() {
      if (this.map.team_first_blood !== undefined) 
        return this.teamsList.filter(t => t.id === this.map.team_first_blood)[0].players;
      return [];
    },
    firstDeathTeam() {
      if (this.map.team_first_blood !== undefined)
        return this.teamsList.filter(t => t.id !== this.map.team_first_blood)[0].players;
      return [];
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