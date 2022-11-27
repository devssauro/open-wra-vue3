<template>
  <v-sheet
    min-height="70vh"
    rounded="lg">
    <v-expansion-panels :multiple="false" variant="accordion">
      <template v-for="matchup in matchups" :key="matchup.id">
        <v-expansion-panel>
          <v-expansion-panel-title>
              <span>{{matchup.datetime}} | {{matchup.team1.name}} X {{matchup.team2.name}}</span>
              <v-spacer /> <span/>
          </v-expansion-panel-title>
          <v-expansion-panel-text class="pt-3">
            <v-row>
              <template v-if="matchup.maps.length === 1 || matchup.maps.length === 2 || matchup.maps.length === 3 || matchup.maps.length === 4 || matchup.maps.length === 6">
                <template v-for="map in matchup.maps" :key="map.id">
                  <v-col :cols="matchup.maps.length === 6 ? 3 : 12 / matchup.maps.length">
                    <MapCard @viewMap="viewMap" @editMap="editMap" :map="map" :matchup="matchup" />
                  </v-col>
                </template>
              </template>
              <template v-if="matchup.maps.length === 5">
                <template v-for="n in [0, 1, 2]" :key="n">
                  <v-col cols="4">
                    <MapCard @viewMap="viewMap" @editMap="editMap" :map="matchup.maps[n]" :matchup="matchup" />
                  </v-col>
                </template>
                <template v-for="n in [3, 4]" :key="n">
                  <v-col cols="6">
                    <MapCard @viewMap="viewMap" @editMap="editMap" :map="matchup.maps[n]" :matchup="matchup" />
                  </v-col>
                </template>
              </template>
              <template v-if="matchup.maps.length === 7">
                <template v-for="n in [0, 1, 2, 3]" :key="n">
                  <v-col cols="3">
                    <MapCard @viewMap="viewMap" @editMap="editMap" :map="matchup.maps[n]" :matchup="matchup" />
                  </v-col>
                </template>
                <template v-for="n in [4, 5, 6]" :key="n">
                  <v-col cols="4">
                    <MapCard @viewMap="viewMap" @editMap="editMap" :map="matchup.maps[n]" :matchup="matchup" />
                  </v-col>
                </template>
              </template>
              <v-col cols="12">
                <v-btn block depressed color="success" v-if="isOperationalUser" @click="newMap(matchup.id)">
                  Adicionar mapa
                </v-btn>
              </v-col>
            </v-row>
          </v-expansion-panel-text>
        </v-expansion-panel>
        <!-- <v-divider :key="`${matchup.id}-${matchup.id}`"/> -->
      </template>
    </v-expansion-panels>
  </v-sheet>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref } from 'vue'
import MatchupResponse from '@/types/Matchup'
import MapCard from '@/components/matchup/MapCard.vue'

export default defineComponent({
  name: 'AllMatchups',
  components: {
    MapCard
  },
  props: {
    matchups: {
      type: Array as PropType<MatchupResponse[]>,
      required: true,
      default: []
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
    const selectedMatchup = ref()
    const selectedMap = ref()
    const mapDialog = ref<boolean>()
    return {
      isOperationalUser,
      mapDialog,
      selectedMap,
      selectedMatchup,
    }
  },
  methods: {
    viewMap(mapData: any) {
      console.log(mapData);
    },
    editMap(mapData: any) {
      this.selectedMatchup = mapData.matchupId;
      this.selectedMap = mapData.mapId;
      this.mapDialog = true;
    },
  }
});
</script>
<style>

</style>