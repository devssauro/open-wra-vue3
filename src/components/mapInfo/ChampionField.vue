<template>
  <v-autocomplete
    v-model="map[field]"
    :items="champions"
    hide-details
    hide-selected
    item-title="name"
    item-value="id"
    :label="label"
    :variant="variant">
  </v-autocomplete>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref } from 'vue'
import MapRequest from '@/types/MapRequest'
import Team from '@/types/Team'
import Champion from '@/types/Champion'

export default defineComponent({
  name: 'ChampionField',
  props: {
    map: {
      type: Object as PropType<MapRequest>,
      required: true
    },
    label: {
      type: String,
      required: true
    },
    field: {
      type: String,
      required: true
    },
    champions: {
      type: Array as PropType<Champion[]>,
      required: true,
    },
    side: {
      type: String as PropType<'blue' | 'red'>,
      required: true
    },
    variant: {
      type: String as PropType<'solo' | 'outlined'>,
      required: false,
      default: 'solo'
    }
  },
  watch: {
  },
  computed: {
  },
  created() {
  },
  setup(props) {
    const teamsList = computed<Team[]>(() => [props.teams.team1, props.teams.team2])
    const searchChampion = ref<String>('')
    return {
      searchChampion,
      teamsList,
    }
  },
  methods: {
    getImg(champion: string) {
      if (champion)
        return require(`@/assets/${champion}.png`);
      return;
    },
  }
});
</script>
<style>

</style>