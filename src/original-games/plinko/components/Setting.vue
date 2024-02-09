<script>
import { ref } from 'vue'
import { mutations, store } from '../core/Store'
import MaxValue from './Modals/MaxValue.vue'
import GameInfo from './Modals/GameInfo.vue'
import Hotkeys from './Modals/Hotkeys.vue'
import RealTimeStatistics from './Modals/RealTimeStatistics.vue'
import Fairness from './Modals/Fairness.vue'

export default {
  components: {
    MaxValue,
    GameInfo,
    Hotkeys,
    RealTimeStatistics,
    Fairness,
  },
  setup() {
    const isFavorite = ref(false)
    const isShowSetting = ref(false)
    const isLive = ref(false)
    const isAnimation = ref(false)
    const volumn = ref(50)
    const rectComponent = ref(null)
    const inputRange = ref(null)

    const changeImage = () => {
      isFavorite.value = !isFavorite.value
    }
    const changeRange = (req) => {
      const volumeElement = inputRange.value
      if (volumeElement) {
        volumn.value = req
        volumeElement.style.setProperty('--width', `${req * 0.86}%`)
      }
    }

    const showSetting = () => {
      isShowSetting.value = !isShowSetting.value
      if (isShowSetting.value) {
        setTimeout(() => {
          changeRange(volumn.value)
        }, 10)
      }
    }

    const liveSetting = () => {
      isLive.value = !isLive.value
    }

    const animationSetting = () => {
      isAnimation.value = !isAnimation.value
    }

    const showMaxSetting = () => {
      if (!store.isMaximum) {
        mutations.showMaxValueModal()
        isShowSetting.value = false
      }
      else {
        mutations.showMaximum(!store.isMaximum)
      }
    }

    const showGameInfo = () => {
      mutations.showGameInfoModal()
      isShowSetting.value = false
    }

    const showHotkeySetting = () => {
      mutations.showHotkeyModal()
      isShowSetting.value = false
    }

    const showStatistics = () => {
      mutations.showStatistics()
      isShowSetting.value = false
    }

    const showFairness = () => {
      mutations.showFairness()
    }

    return {
      isFavorite,
      isShowSetting,
      isLive,
      isAnimation,
      volumn,
      inputRange,
      rectComponent,
      changeImage,
      showSetting,
      liveSetting,
      animationSetting,
      showMaxSetting,
      showGameInfo,
      showHotkeySetting,
      showStatistics,
      showFairness,
      changeRange,
    }
  },
  data() {
    return {
      settingSrc: '/png/mini/plinko/setting.svg',
      rectSrc: '/png/mini/plinko/rect.svg',
      totalSrc: '/png/mini/plinko/total.svg',
      unSrc: '/png/mini/plinko/unfavorite.svg',
    }
  },

  computed: {
    showMax() {
      return store.isMaximum
    },
    hotkeyState() {
      return store.hotkey
    },
    showRect() {
      return store.rectShow
    },
    settingWidth() {
      return store.s_w
    },
  },
  methods: {
    handleMouseOut(button) {
      this.settingSrc = '/png/mini/plinko/setting.svg'
      this.rectSrc = '/png/mini/plinko/rect.svg'
      this.totalSrc = '/png/mini/plinko/total.svg'
      this.unSrc = '/png/mini/plinko/unfavorite.svg'
    },
    handleMouseOver(button) {
      switch (button) {
        case 'setting':
          this.settingSrc = '/png/mini/plinko/settinghover.svg'
          break
        case 'total':
          this.totalSrc = '/png/mini/plinko/totalhover.svg'
          break
        case 'rect':
          this.rectSrc = '/png/mini/plinko/recthover.svg'
          break
        case 'un':
          this.unSrc = '/png/mini/plinko/unfavoritehover.svg'
          break
      }
    },
  },
}
</script>

<template>
  <div
    id="setting"
    :style="{ width: settingWidth }"
    class="footer-container"
  >
    <div class="button-group-container">
      <div class="dropdown">
        <div class="stooltip">
          <button class="button-group dropbtn" @click="showSetting">
            <span><img
              :src="settingSrc"
              width="14"
              height="14"
              alt="Image"
              @mouseover="handleMouseOver('setting')"
              @mouseout="handleMouseOut('setting')"
            ></span>
            <span class="tooltiptext">{{ $t("plinko_tooltip1") }}</span>
          </button>
        </div>
        <div v-if="isShowSetting" class="dropdown-content">
          <div class="contents" :style="{ alignItems: 'end' }">
            <button>
              <span>
                <img
                  :src="
                    volumn > 0 ? '/png/mini/plinko/voice-active.svg' : '/png/mini/plinko/voice.svg'
                  "
                  width="16"
                  height="16"
                  alt="Image"
                  @click="volumn === 0 ? changeRange(50) : changeRange(0)"
                >
              </span>
            </button>
            <div :style="{ position: 'relative' }">
              <input
                ref="inputRange"
                v-model="volumn"
                type="range"
                max="100"
                min="0"
                @input="changeRange(volumn)"
              >
            </div>
          </div>
          <button
            class="contents" :class="[isLive ? 'unactivecontent' : 'activecontent']"
            @click="liveSetting"
          >
            <span><img
                    :src="isLive ? '/png/mini/plinko/live-active.svg' : '/png/mini/plinko/live.svg'"
                    width="14"
                    height="14"
                    alt="Image"
                  >
              <span :class="isLive ? 'active' : null">{{
                $t("plinko_live")
              }}</span></span>
          </button>
          <button
            class="contents" :class="[
              isAnimation ? 'unactivecontent' : 'activecontent',
            ]"
            @click="animationSetting"
          >
            <span><img
                    :src="
                      isAnimation
                        ? '/png/mini/plinko/animation-active.svg'
                        : '/png/mini/plinko/animation.svg'
                    "
                    width="14"
                    height="14"
                    alt="Image"
                  >
              <span :class="isAnimation ? 'active' : null">{{
                $t("plinko_animation")
              }}</span></span>
          </button>
          <button
            class="contents" :class="[showMax ? 'unactivecontent' : 'activecontent']"
            @click="showMaxSetting"
          >
            <span><img
                    :src="
                      showMax ? '/png/mini/plinko/maxvalue-active.svg' : '/png/mini/plinko/maxvalue.svg'
                    "
                    width="14"
                    height="14"
                    alt="Image"
                  >
              <span :class="showMax ? 'active' : ''">{{
                $t("plinko_maxvalue")
              }}</span></span>
          </button>
          <button class="activecontent contents" @click="showGameInfo">
            <span><img
                    src="/png/mini/plinko/info.svg"
                    width="14"
                    height="14"
                    alt="Image"
                  >
              <span>{{ $t("plinko_info") }}</span></span>
          </button>
          <button
            class="contents" :class="[
              hotkeyState ? 'unactivecontent' : 'activecontent',
            ]"
            @click="showHotkeySetting"
          >
            <span><img
                    :src="hotkeyState ? '/png/mini/plinko/key-active.svg' : '/png/mini/plinko/key.svg'"
                    width="14"
                    height="14"
                    alt="Image"
                  >
              <span :class="hotkeyState ? 'active' : ''">{{
                $t("plinko_keyboard")
              }}</span></span>
          </button>
          <div class="triangle" />
        </div>
      </div>
      <div v-if="showRect" class="stooltip">
        <button class="button-group">
          <span>
            <img
              :src="rectSrc"
              width="14"
              height="14"
              alt="Image"
              @mouseover="handleMouseOver('rect')"
              @mouseout="handleMouseOut('rect')"
            >
          </span>
          <span class="tooltiptext">{{ $t("plinko_tooltip2") }}</span>
        </button>
      </div>
      <div class="stooltip">
        <button class="button-group" @click="showStatistics">
          <span>
            <img
              :src="totalSrc"
              width="14"
              height="14"
              alt="Image"
              @mouseover="handleMouseOver('total')"
              @mouseout="handleMouseOut('total')"
            >
          </span>
          <span class="tooltiptext">{{ $t("plinko_tooltip3") }}</span>
        </button>
      </div>
      <div class="stooltip">
        <button class="button-group" @click="changeImage">
          <span>
            <img
              :src="isFavorite ? '/png/mini/plinko/favorite.svg' : unSrc"
              width="14"
              height="14"
              alt="Image"
              @mouseover="handleMouseOver('un')"
              @mouseout="handleMouseOut('un')"
            >
          </span>
          <span class="tooltiptext">{{ $t("plinko_tooltip4") }}</span>
        </button>
      </div>
      <div class="divider" />
    </div>
    <div class="footer-image">
      <img src="/png/mini/plinko/Vector.svg" alt="Image" width="68" height="25">
    </div>
    <button :style="{ background: 'transparent', border: 'none' }" @click="showFairness">
      <span class="footer-span">{{ $t("plinko_fairness") }}</span>
    </button>
    <MaxValue />
    <GameInfo />
    <Hotkeys />
    <RealTimeStatistics />
    <Fairness />
  </div>
</template>

<style scoped>
@import "../assets/css/setting.css";
</style>
