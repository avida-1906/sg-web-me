<script>
import { ref } from 'vue'
import GameInfo from '~/components/PlinkoGameInfo.vue'
import MaxValue from '~/components/PlinkoMaxValue.vue'

export default {
  components: {
    MaxValue,
    GameInfo,
  },
  setup() {
    const isFavorite = ref(false)
    const isShowSetting = ref(false)
    const isLive = ref(false)
    const isAnimation = ref(false)
    const isMaximum = ref(false)
    const volumn = ref(0)

    const changeImage = () => {
      isFavorite.value = !isFavorite.value
    }

    const showSetting = () => {
      isShowSetting.value = !isShowSetting.value
    }

    const liveSetting = () => {
      isLive.value = !isLive.value
    }

    const animationSetting = () => {
      isAnimation.value = !isAnimation.value
    }

    const showMaxSetting = () => {
      const modal = document.getElementById('demo-modal')
      modal.classList.toggle('active')
      isShowSetting.value = false
    }

    const showGameInfo = () => {
      const modal = document.getElementById('gameinfo-modal')
      modal.classList.toggle('active')
      isShowSetting.value = false
    }

    const showHotkeySetting = () => {
      const modal = document.getElementById('hotkeys-modal')
      modal.classList.toggle('active')
      isShowSetting.value = false
    }

    const showStatistics = () => {
      const modal = document.getElementById('realtime-modal')
      modal.classList.toggle('active')
      isShowSetting.value = false
    }

    return {
      isFavorite,
      isShowSetting,
      isLive,
      isAnimation,
      isMaximum,
      volumn,
      changeImage,
      showSetting,
      liveSetting,
      animationSetting,
      showMaxSetting,
      showGameInfo,
      showHotkeySetting,
      showStatistics,
    }
  },
}
</script>

<template>
  <div class="footer-container">
    <div class="button-group-container">
      <div class="dropdown">
        <button class="button-group dropbtn" @click="showSetting">
          <img src="/png/mini/plinko/setting.png" width="14" height="14" alt="Image">
        </button>
        <div v-if="isShowSetting" class="dropdown-content">
          <div class="triangle" />
          <div class="contents">
            <img
              :src="volumn > 0 ? '/png/mini/plinko/voice-active.png'
                : '/png/mini/plinko/voice.png'"
              width="14"
              height="14"
              alt="Image"
            >
            <input v-model="volumn" type="range" max="100" min="0">
          </div>
          <div class="contents" @click="liveSetting">
            <img
              :src="isLive ? '/png/mini/plinko/live-active.png'
                : '/png/mini/plinko/live.png'"
              width="14"
              height="14"
              alt="Image"
            >
            <span :class="isLive ? 'active' : null">{{ $t("plinko_live") }}</span>
          </div>
          <div class="contents" @click="animationSetting">
            <img
              :src="
                isAnimation
                  ? '/png/mini/plinko/animation-active.png'
                  : '/png/mini/plinko/animation.png'
              "
              width="14"
              height="14"
              alt="Image"
            >
            <span :class="isAnimation ? 'active' : null">{{
              $t("plinko_animation")
            }}</span>
          </div>
          <div class="contents" @click="showMaxSetting">
            <img
              :src="
                isMaximum ? '/png/mini/plinko/maxvalue-active.png' : '/png/mini/plinko/maxvalue.png'
              "
              width="14"
              height="14"
              alt="Image"
            >
            <span :class="isMaximum ? 'active' : null">{{
              $t("plinko_maxvalue")
            }}</span>
          </div>
          <div class="contents" @click="showGameInfo">
            <img src="/png/mini/plinko/info.png" width="14" height="14" alt="Image">
            <span>{{ $t("plinko_info") }}</span>
          </div>
          <div class="contents" @click="showHotkeySetting">
            <img src="/png/mini/plinko/key.png" width="14" height="14" alt="Image">
            <span>{{ $t("plinko_keyboard") }}</span>
          </div>
        </div>
      </div>
      <button class="button-group">
        <img src="/png/mini/plinko/rect.png" width="14" height="14" alt="Image">
      </button>
      <button class="button-group" @click="showStatistics">
        <img src="/png/mini/plinko/total.png" width="14" height="14" alt="Image">
      </button>
      <button id="favorite" class="button-group" @click="changeImage">
        <img
          :src="isFavorite ? '/png/mini/plinko/favorite.png'
            : '/png/mini/plinko/unfavorite.png'"
          width="14"
          height="14"
          alt="Image"
        >
      </button>
      <div class="divider" />
    </div>
    <div class="footer-image">
      <img src="/png/mini/plinko/Vector.png" alt="Image" width="68" height="25">
    </div>
    <div>
      <span class="footer-span">{{ $t("plinko_fairness") }}</span>
    </div>
    <MaxValue :is-maximum="isMaximum" @update:isMaximum="isMaximum = $event" />
    <GameInfo />
  </div>
</template>

<style scoped>
.footer-container {
  width: 100%;
  height: 63px;
  margin-top: 3px;
  background-color: #0f212e;
  display: flex;
  align-items: center;
  border-radius: 0px 0px 8px 8px;
  justify-content: space-between;
}

.button-group-container {
  width: 30%;
  display: flex;
  align-items: center;
}
.button-group {
  background-color: transparent;
  border: none;
  margin-left: 20px;
  cursor: pointer;
}

.divider {
  width: 2px;
  height: 40px;
  background-color: #2f4552;
  margin-left: 20px;
}

.footer-image {
  align-items: center;
  display: flex;
  justify-content: center;
}

.footer-span {
  color: #b1bad3;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  margin-right: 20px;
}

.dropbtn {
  border: none;
}

.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-content {
  position: absolute;
  background: #fff;
  border-radius: 4px;
  width: 118px;
  height: 220px;
  z-index: 1;
  top: -10px;
  left: -25px;
  transform: translateY(-100%);
}
.dropdown-content .triangle {
  position: absolute;
  bottom: -5px;
  left: 50%;
  width: 10px;
  height: 10px;
  background: #fff;
  transform: translateX(-50%) rotate(45deg);
}
.dropdown-content .contents {
  color: black;
  padding: 9px 12px;
  text-decoration: none;
  display: flex;
  align-items: center;
}

.dropdown-content .contents input {
  width: 70px;
  margin-left: 5px;
}

.dropdown-content .contents span {
  color: #2f4553;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  margin-left: 5px;
}

.active {
  color: #1475e1 !important;
}

.dropdown-content .contents:hover {
  background-color: #f1f1f1;
  border-radius: 4px;
  cursor: pointer;
}

@media screen and (max-width: 1050px) {
  .footer-container {
    width: 100%;
    height: 80px;
    flex-shrink: 0;
    background-color: #0f212e;
    border-radius: 0px 0px 8px 8px;
    margin-top: 0;
    min-width: 0;
  }

  .button-group-container {
    width: 50%;
  }
  .button-group {
    margin-left: 10px;
  }

  .divider {
    width: 1px;
    height: 40px;
    background-color: #2f4552;
    margin-left: 20px;
  }

  .footer-image {
    display: none;
  }
}
</style>
