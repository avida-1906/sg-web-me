<script>
import { ref } from 'vue'
import { store } from '../core/Store'
import BigReward from './Statistics/BigReward.vue'
import Challenge from './Statistics/Challenge.vue'
import Persuade from './Statistics/Persuade.vue'

export default {
  components: {
    BigReward,
    Challenge,
    Persuade,
  },
  setup() {
    const expand = ref(false)
    const active1 = ref(true)
    const active2 = ref(false)
    const active3 = ref(false)
    const active4 = ref(false)

    const activeButton = (buttonId) => {
      active1.value = buttonId === 'active1'
      active2.value = buttonId === 'active2'
      active3.value = buttonId === 'active3'
      active4.value = buttonId === 'active4'
    }

    const expandReward = () => {
      expand.value = !expand.value
    }

    return {
      expand,
      active1,
      active2,
      active3,
      active4,
      activeButton,
      expandReward,
    }
  },

  computed: {
    stWidth() {
      return store.st_w
    },
  },
}
</script>

<template>
  <div
    id="statisticscontainer"
    :style="{ width: stWidth }"
    class="statistics-container"
  >
    <button class="statistics-button" @click="expandReward">
      <div class="span-group">
        <span class="span-white">Plinko</span>
        <span class="span-gray">{{ $t("plinko_original") }}</span>
      </div>
      <div class="reward">
        <img src="/png/mini/plinko/cup.svg" alt="Image" width="16" height="16">
        <span class="span1">1,000.00x</span>
        <img src="/png/mini/plinko/cap.svg" alt="Image" width="14" height="14">
        <span class="span2">{{ $t("plinko_stealth") }} </span>
      </div>
      <img
        src="/png/mini/plinko/arrow.svg"
        alt="Image"
        width="16"
        height="16"
        :class="{ rotate: expand }"
      >
    </button>
    <div :style="{ overflowX: 'auto' }">
      <div v-if="expand" class="RewardTypeContainer">
        <button
          class="RewardTypeButton" :class="[{ RewardTypeActive: active1 }]"
          @click="activeButton('active1')"
        >
          <span>{{ $t("plinko_bigwins") }}</span>
        </button>
        <button
          class="RewardTypeButton" :class="[{ RewardTypeActive: active2 }]"
          @click="activeButton('active2')"
        >
          <span>{{ $t("plinko_luckwins") }}</span>
        </button>
        <button
          class="RewardTypeButton" :class="[{ RewardTypeActive: active3 }]"
          @click="activeButton('active3')"
        >
          <span>{{ $t("plinko_challenges") }}</span>
        </button>
        <button
          class="RewardTypeButton" :class="[{ RewardTypeActive: active4 }]"
          @click="activeButton('active4')"
        >
          <span>{{ $t("plinko_description") }}</span>
        </button>
      </div>
    </div>
    <div v-if="active1 && expand">
      <BigReward />
    </div>
    <div v-if="active2 && expand">
      <BigReward />
    </div>
    <div v-if="active3 && expand">
      <Challenge />
    </div>
    <div v-if="active4 && expand">
      <Persuade />
    </div>
  </div>
</template>

<style scoped>
@import "../assets/css/statistics.css";
</style>
