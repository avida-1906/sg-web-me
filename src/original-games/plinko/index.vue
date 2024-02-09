<script>
import { store } from './core/Store'
import ScoreBoard from './components/ScoreBoard.vue'
import SideBar from './components/SideBar.vue'

export default {
  components: {
    ScoreBoard, SideBar,
  },
  setup() {

   },

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

.plinko-container {
  display: flex;
  flex-direction: row;
  margin: auto;
  border-bottom: 3px solid #213743;
}

.plinko-container .app-container {
  width: 300px;
  height: 630px;
  order: 1;
}

.canvas-container {
  width: 900px;
  height: 630px;
  margin: auto;
  color: #fff;
  border-radius: 0px 8px 0px 0px;
  background: #0f212e;
  order: 2;
}

.canvas {
  width: 800px;
  height: 630px;
  margin: auto;
  border-radius: 0px 8px 0px 0px;
  background: #0f212e;
}

.overlay-container {
  position: absolute;
  bottom: 18vh;
  left: 40vw;
  width: 36vw;
  background-color: #082537;
  pointer-events: none;
  border-radius: 5px;
  border: 1px solid #000000;
  flex-direction: row;
  gap: 10px;
  padding: 20px;
  display: none;
}

.profit-container {
  display: flex;
  flex-direction: column;
  gap: 2vh;
  width: 100%;
}

.span-group {
  display: flex;
  width: 100%;
  justify-content: space-between;
}

.span-color {
  color: #fff;
}

.profit-input {
  background-color: #05121c;
  height: 30px;
  width: 100%;
  border: none;
  border-radius: 5px;
  color: #fff;
}

::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-track {
  background: #1a2c38;
  background: 8px;
}

::-webkit-scrollbar-thumb {
  background: #304554;
  border-radius: 8px;
}

::-webkit-scrollbar-thumb:hover {
  background: #2f4552;
}

.tooltip {
  position: relative;
  width: 100%;
  display: inline-block;
}

.tooltip .tooltiptext {
  visibility: hidden;
  width: 200px;
  background-color: #fff;
  color: #000;
  text-align: center;
  border-radius: 6px;
  padding: 0.5rem;
  position: absolute;
  z-index: 1;
  bottom: 150%;
  left: 10%;
  font-family: PingFang SC;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.2),
    0px 1px 2px 0px rgba(0, 0, 0, 0.12);
}

.tooltip .tooltiptext::after {
  content: "";
  position: absolute;
  top: 100%;
  left: 50%;
  margin-left: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: #fff transparent transparent transparent;
}

.tooltip:hover .tooltiptext {
  visibility: visible;
}

.stooltip {
  position: relative;
  display: inline-block;
}

.stooltip .tooltiptext {
  visibility: hidden;
  background-color: #fff;
  color: #000;
  text-align: center;
  border-radius: 6px;
  padding: 0.5rem;
  white-space: nowrap;
  position: absolute;
  z-index: 1;
  font-family: PingFang SC;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  bottom: 150%;
  left: 50%;
  transform: translateX(-50%);
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.2),
    0px 1px 2px 0px rgba(0, 0, 0, 0.12);
}

.stooltip .tooltiptext::after {
  content: "";
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  border-width: 5px;
  border-style: solid;
  border-color: #fff transparent transparent transparent;
}

.stooltip:hover .tooltiptext {
  visibility: visible;
}

.stooltip .tooltiptext1 {
  visibility: hidden;
  background-color: #fff;
  color: #000;
  text-align: center;
  border-radius: 6px;
  padding: 8px 5px;
  white-space: nowrap;
  position: absolute;
  z-index: 999;
  font-family: PingFang SC;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  bottom: 120%;
  left: 50%;
  transform: translateX(-50%);
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.2),
    0px 1px 2px 0px rgba(0, 0, 0, 0.12);
}

.stooltip .tooltiptext1::after {
  content: "";
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  border-width: 5px;
  border-style: solid;
  border-color: #fff transparent transparent transparent;
}

.stooltip .tooltiptext1-active {
  visibility: visible;
}
@media screen and (max-width: 1100px) {
  .plinko-container {
    display: flex;
    flex-direction: column;
    margin: 0 auto;
  }

  .plinko-container .app-container {
    width: 400px;
    order: 2;
    margin-left: 0;
    position: relative;
  }

  .canvas-container {
    width: 400px;
    height: 310px;
    border-radius: 8px 8px 0px 0px;
    order: 1;
    margin-top: 10px;
  }

  .canvas {
    width: 400px;
    height: 310px;
    border-radius: 8px 8px 0px 0px;
  }

  /* .overlay-container {
    position: absolute;
    bottom: 18vh;
    left: 40vw;
    width: 36vw;
    background-color: #082537;
    pointer-events: none;
    border-radius: 5px;
    border: 1px solid #000000;
    flex-direction: row;
    gap: 10px;
    padding: 20px;
    display: none;
  }

  .profit-container {
    display: flex;
    flex-direction: column;
    gap: 2vh;
    width: 100%;
  }

  .span-group {
    display: flex;
    width: 100%;
    justify-content: space-between;
  }

  .span-color {
    color: #fff;
  }

  .profit-input {
    background-color: #05121c;
    height: 30px;
    width: 100%;
    border: none;
    border-radius: 5px;
    color: #fff;
  } */
}

}
</style>
