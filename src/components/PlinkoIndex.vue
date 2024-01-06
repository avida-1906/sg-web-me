<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import Setting from '~/components/PlinkoSetting.vue'
import { GlobalFunc } from '~/mini-games/plinko/GlobalFunc'
import { Plinko } from '~/mini-games/plinko/Plinko'

const { isMobile } = storeToRefs(useWindowStore())

const isManualButton = ref(true)
const isAutoButton = ref(false)
const isAutoBetting = ref(false)
const isEmpty = ref(false)
const amount = ref('0.000000000')
const level = ref('Medium')
const rows = ref('16')
const numberofbet = ref(0)
let intervalId

const initialWidth = window.innerWidth
const initialHeight = window.innerHeight
let plinko
const canvasRef = ref()

function changeState() {
  plinko.GetSettings(
    amount.value,
    level.value,
    rows.value,
    numberofbet.value,
    1000,
  )
  plinko.clear()
  plinko.map()
}
function selectInput() {
  const inputField = document.querySelector('.betAmountInput')
  if (inputField)
    inputField.select()
}
function dropParticle() {
  let target = 0
  let sum = 0
  const percentage = GlobalFunc().probabilities[`_${rows.value}`]
  const randomNumber = Math.random()
  for (let i = 0; i < percentage.length; i++) {
    sum += percentage[i]
    if (randomNumber >= sum - percentage[i] && randomNumber < sum) {
      target = i + 1
      break
    }
    else {
      continue
    }
  }
  plinko.add(target)
}
function startInterval() {
  intervalId = setInterval(dropParticle, 500)
}

function stopInterval() {
  clearInterval(intervalId)
}
function bet() {
  if (
    amount.value === 0
        || amount.value === undefined
        || amount.value === ''
  ) {
    isEmpty.value = true
  }
  else {
    isEmpty.value = false
    if (isManualButton.value) {
      dropParticle()
    }
    else {
      if (
        Number.parseInt(numberofbet.value) === 0
            || numberofbet.value === undefined
            || numberofbet.value === ''
      ) {
        if (!isAutoBetting.value) {
          isAutoBetting.value = true
          startInterval()
          document.getElementById('alert').style.opacity = 1
          document.getElementById('alert').style.visibility = 'visible'
          setTimeout(() => {
            document.getElementById('alert').style.opacity = 0
            document.getElementById('alert').style.visibility = 'hidden'
          }, 2000)
        }
        else {
          isAutoBetting.value = false
          stopInterval()
          document.getElementById('alert').style.opacity = 1
          document.getElementById('alert').style.visibility = 'visible'
          setTimeout(() => {
            document.getElementById('alert').style.opacity = 0
            document.getElementById('alert').style.visibility = 'hidden'
          }, 2000)
        }
      }
      else {
        for (let i = 0; i < numberofbet.value; i++) {
          setTimeout(() => {
            dropParticle()
            numberofbet.value = Number.parseInt(numberofbet.value) - 1
          }, 500 * i)
        }
      }
    }
  }
}

function activeButton(buttonId) {
  isManualButton.value = buttonId === 'manualButton'
  isAutoButton.value = buttonId === 'autoButton'
}

function betAmountTimes(times) {
  if (times === 999)
    amount.value = 999999

  amount.value = amount.value * times
}

function handleResize() {
  plinko.map()
}

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})

onMounted(() => {
  window.addEventListener('resize', handleResize)

  plinko = Plinko(canvasRef.value)
  plinko.map()

  plinko.GetSettings(
    amount.value,
    level.value,
    rows.value,
    numberofbet.value,
    1000,
  )
})
</script>

<template>
  <div class="plinko">
    <div class="top" :class="{ isMobile }">
      <div class="container">
        <div class="betTypeContainer">
          <button
            id="manualButton" class="typeButton"
            :class="[{ betTypeActive: isManualButton }]"
            @click="activeButton('manualButton')"
          >
            {{ $t("plinko_manual") }}
          </button>
          <button
            id="autoButton" class="typeButton"
            :class="[{ betTypeActive: isAutoButton }]"
            @click="activeButton('autoButton')"
          >
            {{ $t("plinko_auto") }}
          </button>
        </div>
        <div class="amountorder">
          <div class="betamountcontainer">
            <div class="spanstyle">
              {{ $t("plinko_amount") }}
            </div>
            <div class="spanstyle" :style="{ fontSize: '12px' }">
              US$0.00
            </div>
          </div>
          <div class="betAmountContainer">
            <div class="tooltip">
              <input
                v-model="amount" class="betAmountInput"
                :class="[{ warning: isEmpty }]"
                placeholder="0.000000000"
                type="number"
                min="0"
                step="0.000000001"
                @focus="selectInput"
                @change="changeState"
              >
              <span class="tooltiptext">{{ $t("plinko_betamountalert") }}</span>
            </div>
            <button class="betAmountTimesBtn-left" @click="betAmountTimes(0.5)">
              <div class="border-span">
                ½
              </div>
            </button>
            <button
              id="times1"
              class="betAmountTimesBtn-right"
              @click="betAmountTimes(2)"
            >
              2x
            </button>
            <button
              id="times2"
              class="betAmountTimesBtn-left"
              @click="betAmountTimes(2)"
            >
              <div class="border-span">
                2x
              </div>
            </button>
            <button
              id="timesmax"
              class="betAmountTimesBtn-max"
              @click="betAmountTimes(999)"
            >
              {{ $t("plinko_max") }}
            </button>
            <img
              id="bitImage"
              src="/png/mini/plinko/bit.png"
              width="16"
              height="16"
              alt="Image"
              class="bitImage"
            >
          </div>
        </div>
        <div class="levelorder">
          <div class="spanstyle">
            {{ $t("plinko_risk") }}
          </div>
          <img
            src="/png/mini/plinko/arrow-down.png"
            width="14"
            height="14"
            alt="Image"
            class="arrow-down"
          >
          <select v-model="level" class="baseStyle" @change="changeState">
            <option value="Low">
              {{ $t("plinko_level1") }}
            </option>
            <option value="Medium">
              {{ $t("plinko_level2") }}
            </option>
            <option value="High">
              {{ $t("plinko_level3") }}
            </option>
          </select>
        </div>
        <div class="roworder">
          <div class="spanstyle">
            {{ $t("plinko_rows") }}
          </div>
          <img
            src="/png/mini/plinko/arrow-down.png"
            width="14"
            height="14"
            alt="Image"
            class="arrow-down"
          >
          <select v-model="rows" class="baseStyle" @change="changeState">
            <option value="8">
              8
            </option>
            <option value="9">
              9
            </option>
            <option value="10">
              10
            </option>
            <option value="11">
              11
            </option>
            <option value="12">
              12
            </option>
            <option value="13">
              13
            </option>
            <option value="14">
              14
            </option>
            <option value="15">
              15
            </option>
            <option value="16">
              16
            </option>
          </select>
        </div>
        <div v-if="isAutoButton" class="betNumberContainer">
          <div class="spanstyle">
            {{ $t("plinko_betNumbers") }}
          </div>
          <input
            v-model="numberofbet"
            class="baseStyle"
            placeholder="0"
            type="number"
            min="0"
            @change="changeState"
          >
          <img
            src="/png/mini/plinko/infinitive.png"
            width="14"
            height="14"
            alt="Image"
            class="infinitiveImage"
            style="width: 14px;height: 14px;"
          >
        </div>
        <div class="betbuttonorder">
          <button class="baseStyle betButton" @click="bet">
            {{
              isManualButton
                ? $t("plinko_bet")
                : isAutoBetting
                  ? $t("plinko_autobetstop")
                  : $t("plinko_autobetstart")
            }}
          </button>
        </div>
      </div>

      <!-- canvas -->
      <div class="canvas-warp">
        <div id="canvas-container" class="canvas-container">
          <div id="canvas" ref="canvasRef" class="canvas" />
        </div>
      </div>
    </div>

    <div id="alert" class="autobet-alert">
      <div class="auto-image">
        <img
          src="/png/mini/plinko/auto.png"
          width="20"
          height="20"
          alt="Image"
          class="infinitiveImage"
          style="width: 20px;height: 20px;"
        >
      </div>
      <span>
        {{ isAutoBetting ? $t("plinko_autobetalert1") : $t("plinko_autobetalert2") }}
      </span>
      <div class="close">
        <img
          src="/png/mini/plinko/times.png"
          width="14"
          height="14"
          alt="Image"
          class="infinitiveImage"
          style="width: 14px;height: 14px;"
        >
      </div>
    </div>
    <Setting />
  </div>
</template>

<style lang="scss" scoped>
.plinko{
  position: relative;
  .top{
    display: flex;
    &.isMobile{
      flex-direction: column-reverse;
      align-items: center;
      .container{
        width: 100%;
      }
    }
  }
}
.canvas-warp{
  width: 100%;
}
.canvas-container {
  width: 100%;
  padding-top: 75%;
  overflow: hidden;
  margin: auto;
  color: #fff;
  border-radius: 0px 8px 0px 0px;
  background: #0f212e;
  order: 2;
  position: relative;
}

.canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  margin: auto;
  background: #0f212e;
}

.container {
  flex-shrink: 0;
  width: 300px;
  background-color: #213743;
  padding-left: 10px;
  padding-right: 10px;
  display: flex;
  flex-direction: column;
  border-radius: 8px 0px 0px 0px;
}

.betAmountContainer {
  display: flex;
  flex-direction: row;
  position: relative;
}
.betAmountTimesBtn-left {
  width: 48px;
  height: 40px;
  background-color: #2f4553;
  border: none;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
}
.border-span {
  height: 20px;
  border-right: 2px solid #1a2c37;
  padding-left: 10px;
  padding-right: 15px;
}

.betAmountTimesBtn-right {
  width: 48px;
  height: 40px;
  background-color: #2f4553;
  border: none;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
  color: #fff;
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 15px;
  padding-right: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
}
#times2,
#timesmax {
  display: none;
}
.betAmountTimesBtn-max {
  width: 132px;
  height: 40px;
  background-color: #2f4553;
  border: none;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
  color: #fff;
  padding: 10px;
  justify-content: center;
  align-items: center;
}

.betAmountTimesBtn-left:hover,
.betAmountTimesBtn-max:hover,
.betAmountTimesBtn-right:hover {
  background-color: #557086;
}

.divider {
  position: absolute;
  right: 15%;
  top: 10px;
  width: 2px;
  height: 20px;
  background: #1a2c37;
}

.baseStyle {
  width: 100%;
  height: 40px;
  background-color: #0f212e;
  border-radius: 4px;
  border: 2px solid #2f4553;
  color: #fff;
  margin-bottom: 10px;
}

.betAmountInput {
  width: 100%;
  height: 40px;
  background-color: #0f212e;
  border: 2px solid #2f4553;
  color: #fff;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
  margin-bottom: 10px;
}

.betamountcontainer {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: baseline;
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

input,
select {
  box-sizing: border-box;
  width: 100%;
  -webkit-appearance: none;
  padding-left: 8px;
}

.arrow-down {
  position: absolute;
  top: 30px;
  right: 10px;
  width: 14px;
  height: 14px;
}

.spanstyle {
  color: #b1bad3;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
}

.betButton {
  background-color: #00e701;
  border-radius: 4px;
  height: 52px;
  border: none;
  color: #000000;
  font-weight: 600;
}
.betTypeContainer {
  display: flex;
  flex-direction: row;
  gap: 10px;
  border-radius: 1000px;
  background-color: #0f212e;
  padding: 5px;
  margin-top: 10px;
  margin-bottom: 10px;
  order: 1;
}
.typeButton {
  width: 100%;
  height: 40px;
  color: #fff;
  background-color: transparent;
  border: none;
}
.betTypeActive {
  border-radius: 1000px;
  background-color: #2f4552;
}
.warning {
  border: 2px solid #ff0000;
}
.container .amountorder .betAmountContainer .bitImage {
  position: absolute;
  top: 12px;
  right: 100px;
  width: 14px;
  height: 14px;
}

button {
  cursor: pointer;
}
.betNumberContainer {
  position: relative;
  order: 5;
}

.betNumberContainer .infinitiveImage {
  position: absolute;
  bottom: 24px;
  right: 5%;
}

.amountorder {
  order: 2;
}

.levelorder {
  order: 3;
  position: relative;
}

.roworder {
  order: 4;
  position: relative;
}

.betbuttonorder {
  order: 6;
}

.autobet-alert {
  width: 246px;
  height: 55px;
  flex-shrink: 0;
  border-radius: 4px;
  background: #2f4552;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  position: fixed;
  z-index: 999;
  top: 30px;
  left: 20px;
  display: flex;
  align-items: center;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.5s, visibility 0.5s;
  transition-delay: 1s;
}

.auto-image {
  width: 60px;
  height: 55px;
  flex-shrink: 0;
  border-radius: 4px 0px 0px 4px;
  background: #213743;
  display: flex;
  justify-content: center;
  align-items: center;
}
.autobet-alert span {
  color: #fff;
  text-align: center;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  margin-left: 24px;
}

.autobet-alert .close {
  position: absolute;
  right: 20px;
  top: 20px;
  cursor: pointer;
}
@media screen and (max-width: 1050px) {
  .container {
    background-color: #213743;
    padding-left: 12px;
    padding-right: 12px;
    border-radius: 0;
  }

  .betAmountContainer {
    display: flex;
    flex-direction: row;
    position: relative;
  }

  .betTypeContainer {
    order: 6;
    margin-top: 0;
  }

  .amountorder {
    margin-top: 20px;
    order: 1;
  }

  .levelorder {
    order: 3;
  }

  .roworder {
    order: 4;
  }

  .betNumberContainer {
    order: 5;
  }

  .betbuttonorder {
    order: 2;
  }

  .divider {
    right: 10.5%;
  }
}
</style>
