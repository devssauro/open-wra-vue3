<template>
  <v-row class="pb-0 mb-n4">
    <!-- <v-col cols="1" class="pb-0 mb-n4">
      <v-avatar>
        <v-img :src="getChampionAvatar(map[`blue_${field}_pick`])" />
      </v-avatar>
    </v-col> -->
    <v-col cols="1" class="pb-0 mb-n4">
      <v-text-field solo light label="K" v-model="map[`blue_${field}_kills`]" />
    </v-col>
    <v-col cols="1" class="pb-0 mb-n4">
      <v-text-field solo light label="D" v-model="map[`blue_${field}_deaths`]" />
    </v-col>
    <v-col cols="1" class="pb-0 mb-n4">
      <v-text-field solo light label="A" v-model="map[`blue_${field}_assists`]" />
    </v-col>
    <v-col cols="3" class="pb-0 mb-n4">
      <v-text-field solo light label="Dano aplicado" v-model="map[`blue_${field}_dmg_dealt`]" />
    </v-col>
    <v-col cols="3" class="pb-0 mb-n4">
      <v-text-field solo light label="Dano sofrido" v-model="map[`blue_${field}_dmg_taken`]" />
    </v-col>
    <v-col cols="3" class="pb-0 mb-n4">
      <v-text-field solo light label="Total Gold" v-model="map[`blue_${field}_total_gold`]" />
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue'
import MapRequest from '@/types/MapRequest'
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
  setup() {
    const isLoading = ref<boolean>(false)
    const searchChampion = ref<String>('')
    return {
      searchChampion,
      isLoading,
    }
  },
  methods: {
    getChampionAvatar(championId: number) {
      const champion = this.champions.filter(c => c.id == championId);
      if (champion.length === 0)
        return
      return require(`@/assets/${champion[0].name}.png`);
    },
    championChanged(val: number) {
      this.$emit('change', {id: val, field: this.field});
      this.$forceUpdate();
    },
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