<script>
import { store } from './core/Store'
import ScoreBoard from './components/ScoreBoard.vue'
import SideBar from './components/SideBar.vue'

export default {
  components: {
    ScoreBoard, SideBar,
  },
  setup() { },

  computed: {
    appWidth() {
      return store.a_w
    },
    appHeight() {
      return store.a_h
    },
    containerWidth() {
      return store.co_w
    },
    containerHeight() {
      return store.co_h
    },
    canvasWidth() {
      return store.c_w
    },
    canvasHeight() {
      return store.c_h
    },
    appOpacity() {
      return store.appOpacity
    },
    score() {
      return store.currentScore
    },
  },
}
</script>

<template>
  <div class="plinko-container" :class="[appOpacity ? 'modalShow' : '']">
    <div id="app" class="app-container" :style="{ width: appWidth, height: appHeight }">
      <SideBar />
    </div>
    <div id="canvas-container" :style="{ width: containerWidth, height: containerHeight }" class="canvas-container">
      <div id="plinko-canvas" :style="{ width: canvasWidth, height: canvasHeight }" class="canvas" />
    </div>
    <div id="overlay" class="overlay-container">
      <div class="profit-container">
        <div class="span-group">
          <span class="span-color">Profit to win</span>
          <span id="profit" class="span-color">$0.00</span>
        </div>
        <input id="bitProfit" class="profit-input" type="text" value="25.00000" readonly>
      </div>
      <div class="profit-container">
        <span class="span-color">Chance</span>
        <input id="chance" class="profit-input" type="text" value="0.396" readonly>
      </div>
    </div>
    <div v-if="score !== 0">
      <ScoreBoard />
    </div>
  </div>
</template>

<style scoped>
@import "./assets/css/style.css";

.plinko-container {
  margin: 0;
  display: flex;
  place-items: center;
  min-width: 320px;
  background-color: #1a2c38;
  color: "#FFF";
  font-family: PingFang SC;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;

}
</style>

<style lang="scss">
.plinko-container {
  img {
    width: auto;
  }

  button>span,
  button>img {
    display: inline-block;
    cursor: pointer;
    transition: transform 0.1s ease;
  }

  button:active>span,
  button:active>img {
    transform: scale(0.95);
  }
}
</style>
