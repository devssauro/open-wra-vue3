<template>
  <v-container>
    <v-row>
      <v-col cols="3">
        <v-sheet rounded="lg">
        <v-btn block variant="plain" size="large">
          Nova Matchup
        </v-btn>
        <v-divider v-if="isOperationalUser" />
        <v-autocomplete
          v-model="selectedTournaments"
          :items="tournaments" class="mb-n8"
          item-title="name"
          item-value="id" />
        </v-sheet>
      </v-col>
      <v-col>
        <AllMatchups :matchups="matchups" @newMap="newMap" />
      </v-col>
    </v-row>
    <v-dialog fullscreen v-model="mapDialog">
      <mapDialog v-if="mapDialog" @saved="closeMapDialog" :matchupId="selectedMatchup" :mapId="selectedMap" />
    </v-dialog>
  </v-container>
</template>

<script lang="ts">
import { computed, defineComponent, ref, ref, ref, ref } from 'vue'
import moment from  'moment'
import Tournament from '@/types/Tournament'
import AllMatchups from '@/components/matchup/AllMatchups.vue'
import MapDialog from '@/components/dialogs/MapDialog.vue'

export default defineComponent({
  name: 'Matchup',
  components: {
    AllMatchups,
    MapDialog,
  },
  watch: {
    selectedTournaments: function (t) {
      this.getMatchups(t);
    }
  },
  created() {
    this.getTournaments();
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
    const selectedTournaments = ref<number | number[]>(8)
    const tournaments = ref<Tournament>()
    const matchupDialog = ref(false)
    const matchups = ref([])
    const selectedMatchup = ref<Number>()
    const mapDialog = ref<boolean>(false)
    const selectedMap = ref<number | null>(null)
    const snackText = ref<string>('')
    const snackbar = ref<boolean>(false)

    return {
      isOperationalUser, 
      mapDialog,
      matchupDialog,
      matchups,
      selectedMap,
      selectedMatchup,
      selectedTournaments,
      snackbar,
      snackText,
      tournaments, 
    }
  },
  methods: {
    newMap(matchupId: number) {
      this.selectedMatchup = matchupId
      this.selectedMap = null
      this.mapDialog = true
    },
    newMatchup(matchupId: number) {
      this.selectedMatchup = matchupId
      this.matchupDialog = true
    },
    getMatchups(tournaments: number | number[]) {
      let params = new URLSearchParams()
      if (Array.isArray(tournaments))
        for (const t in tournaments) {
          params.append('tournament', tournaments[t].toString());
        }
      else {
        params = {tournament: tournaments}
      }
      this.$axios.get('v1/matchup', {'params': params}).then(res => {
        this.matchups = res.data.matchups.map(m => {
          m.datetime = moment(`${m.datetime}-3`).format('DD/MM/YY HH:mm');
          return m;
        });
        if(this.matchups.length > 0)
          this.selectedMatchup = this.matchups[0].id;
        // this.mapDialog = true;
      });
    },
    getTournaments() {
      this.$axios.get('v1/tournament').then(res => {
        this.tournaments = res.data.tournaments.map(m => {
          // m.datetime = moment(`${m.datetime}`).format('DD/MM/YYYY HH:mm');
          return m
        })
        this.selectedTournaments = 8
        this.getMatchups(this.selectedTournaments)
      })
    },
    goTo(path: string) {
      this.$router.push(path)
    },
    closeMapDialog() {
      this.getMatchups(this.selectedTournaments);
      this.mapDialog = false;
      this.snackText = 'Novo mapa criado';
      this.snackbar = true;
    }
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
