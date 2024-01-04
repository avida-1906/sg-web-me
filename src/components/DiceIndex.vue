<script setup>
import { Dice } from '~/utils/dice'

const amount = ref('0.00000000')
let times = 0
let isOnBetting = false
let dice
const canvasRef = ref()
const isManual = ref(true)
const isSetting = ref(false)

function onChangeBet(event) {
  event.target.value = event.target.value.replace(/[^0-9]/g, '')
  console.log(event.target.value)
  amount.value = event.target.value
}

function bet() {
  const randomNumber = (Math.random() * 100).toFixed(2)

  dice.show_dice(randomNumber)
  dice.show_history(randomNumber)
}
let intervalID
const cnt = 0
function autoBet() {
  console.log(`sniper times ${times}`)
  if (isOnBetting) {
    if (!isSetting.value)
      document.getElementById('button-bet').innerText = '自动投注'
    else
      document.getElementById('button-bet').innerText = '开始自动投注'

    console.log(`sniper here ${times}`)
    clearInterval(intervalID)
    isOnBetting = false
  }
  else {
    isOnBetting = true
    document.getElementById('button-bet').innerText = '停止自动投注'
    if (times === 0) {
      // callBet(times);
    }
    else {
      callBet(times)
    }
  }
}

function callBet(tt) {
  if (times) {
    intervalID = setTimeout(() => {
      bet()
      tt--
      times--
      callBet(tt)
      if (times >= 0)
        document.getElementById('bet-times').value = tt
    }, 1000)
  }
  else {
    isOnBetting = false
  }
}

const selectedOption = 'option1'

function activeButton(buttonId) {
  isManual.value = buttonId === 'manualButton'
  isSetting.value = buttonId === 'setting'
}

function halfbetaction() {
  amount.value = amount.value / 2
  console.log(amount)
}

function doublebetaction() {
  amount.value = amount.value * 2
  console.log(amount)
}

function handleChange(event) {
  const id = event.target.id
  if (id === 'multiplier') {
    const val = dice.calc_position(event.target.value)
    const vale = val * (615.768 - 106.23) / 96 + 106
    dice.setSlider(vale)
  }
  else if (id === 'rollunder') {
    dice.invertSlider()
  }
  else if (id === 'winchance') {
    const value = 100 - event.target.value
    const value2 = 615.768 - value * (615.768 - 106.23) / 96
    dice.setSlider(value2)
  }
}

onMounted(() => {
  dice = Dice(canvasRef.value)
  dice.map()
})
</script>

<template>
  <div class="dice">
    <div class="container">
      <div class="betType">
        <button
          id="manualButton" class="betButtonStyle" :class="[{ active: isManual }]"
          @click="activeButton('manualButton')"
        >
          手动投注
        </button>
        <button
          id="autoButton" class="betButtonStyle"
          :class="[{ active: !isManual && !isSetting }]"
          @click="activeButton('autoButton')"
        >
          自动投注
        </button>
        <div
          class="swapstyle" :class="[{ active: isSetting }]"
          @click="activeButton('setting')"
        >
          <img src="/png/mini/swap.svg">
        </div>
      </div>
      <div class="labelstyle">
        <div class="spanstyle">
          投注额
        </div>
        <div class="valuestyle">
          US$ {{ amount }}
        </div>
      </div>
      <div class="betamountstyle">
        <input
          id="inputbetamount" v-model="amount" class="tempstyle1" placeholder="0.00000000"
          @change="onChangeBet($event)"
        >
        <div class="btnbet">
          <button class="halfbet" @click="halfbetaction">
            ½
          </button>
          <button class="doublebet" @click="doublebetaction">
            2x
          </button>
        </div>
      </div>
      <div v-if="isManual">
        <div class="labelstyle">
          <div class="spanstyle">
            获胜利润
          </div>
          <div class="valuestyle">
            US$ {{ amount }}
          </div>
        </div>
        <input
          v-model="amount" class="inputdisablestyle"
          placeholder="0.00000000" disabled
        >

        <button class="tempstyle buttonstyle betClickStyle" @click="bet">
          投注
        </button>
      </div>
      <div v-if="!isManual && !isSetting" id="auto-bet">
        <div>
          <label>投注次数</label>
          <input id="bet-times" v-model="times">
        </div>
        <div>
          <label>若赢</label>
          <div id="button-group">
            <button id="first-btn">
              重置
            </button>
            <button>增加:</button>
            <input type="number" placeholder="0">
          </div>
        </div>
        <div>
          <label>若输</label>
          <div id="button-group">
            <button id="first-btn">
              重置
            </button>
            <button>增加:</button>
            <input type="number" placeholder="0">
          </div>
        </div>
        <div>
          <div id="label-group">
            <label>止盈</label>
            <label>US$0.00</label>
          </div>
          <input type="number" placeholder="0.00000000">
        </div>
        <div>
          <div id="label-group">
            <label>止损</label>
            <label>US$0.00</label>
          </div>
          <input type="number" placeholder="0.00000000">
        </div>
        <div>
          <button id="button-bet" @click="autoBet">
            自动投注
          </button>
        </div>
      </div>
      <div v-if="isSetting" id="auto-bet">
        <div>
          <label>投注次数</label>
          <input id="bet-times" v-model="times" type="number" placeholder="0">
        </div>
        <div>
          <label>选择策略</label>
          <select v-model="selectedOption" class="select-btn">
            <option value="option1">
              Option 1
            </option>
            <option value="option2">
              Option 2
            </option>
            <option value="option3">
              Option 3
            </option>
          </select>
        </div>
        <div id="option-button">
          <button>1</button>
          <button>2</button>
        </div>
        <div>
          <button id="buttons">
            创建策略
          </button>
        </div>
        <div>
          <button id="buttons">
            编辑策略
          </button>
        </div>
        <div>
          <button id="buttons">
            删除策略
          </button>
        </div>
        <div>
          <button id="button-bet" @click="autoBet">
            开始自动投注
          </button>
        </div>
      </div>
    </div>
    <div class="right">
      <div
        ref="canvasRef" style="width: 50vw; height: 80vh;
   background-color:#0F212E; border-radius: 5px;"
      />
      <div class="betting-data">
        <div>
          <h3>乘数</h3>
          <input
            id="multiplier" type="number" value="2.0000"
            @input="handleChange($event)"
          >
        </div>
        <div>
          <h3>掷小于</h3>
          <input
            id="rollunder" value="50.50" disabled
            style="cursor: pointer;" @click="handleChange($event)"
          >
        </div>
        <div>
          <h3>获胜机率</h3>
          <input id="winchance" type="number" value="49.50" @input="handleChange($event)">
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.dice {
  display: flex;
}

.container {
  background-color: #192d36;
  border-radius: 4px;
  height: 80vh;
  display: flex;
  flex-direction: column;
  width: 300px;
  padding: 12px;
}

.right {
  position: relative;
}

.tempstyle {
  width: 100%;
  height: 3.5vh;
  background-color: #0F212E;
  color: #fff;
  border: none !important;
  padding-left: 5px;
}

.betting-data {
  position: absolute;
  width: 94.677%;
  left: 50%;
  transform: translateX(-50%);
  bottom: 16px;
  border-radius: 4px;
  box-shadow: #000000;
  background-color: #213743;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  gap: 10px;
}

.betting-data div {
  display: flex;
  flex-direction: column;
  width: 33%;
}

.betting-data div h3 {
  color: #B1BAD3;
  margin-top: 0px;
  margin-bottom: 10px;
}

.betting-data div input {
  height: 40px;
  border: solid 2px #304554;
  border-radius: 4px;
  background-color: #0F212E;
  color: white;
  background-repeat: no-repeat;
  background-position: 90%;
  background-size: auto;
}

#auto-bet div {
  display: flex;
  flex-direction: column;
  margin-top: 5px;
}

#button-group {
  display: flex !important;
  flex-direction: row !important;
  background-color: #304554;
  padding: 3px;
  border-radius: 2px;
}

#button-group button {
  width: 4vw;
  margin-right: 3px;
  border: solid 2px transparent;
  border-radius: 2px;
  background-color: #304554;
  color: #B1BAD3;
  cursor: pointer;
}

#first-btn {
  background-color: #0F212E !important;
}

#button-group input {
  width: 10vw;
  border-radius: 4px !important;
}

#label-group {
  display: flex !important;
  flex-direction: row !important;
  align-items: center;
  justify-content: space-between;
}

#auto-bet div input {
  background-color: #0F212E;
  border: solid 2px #2F4553;
  border-radius: 2px;
  padding: 10px;
  color: white;
}

#auto-bet div label {
  color: #B1BAD3;
  font-size: 14px;
  margin: 1px;
}

#auto-bet .select-btn {
  background-color: #0F212E;
  border: solid 2px #2F4553;
  color: white;
  height: 40px;
  cursor: pointer;
}

#auto-bet .select-btn option {
  height: 30px;
}

#button-bet {
  color: #071824;
  font-family: 'Times New Roman', Times, serif;
  font-size: 16px;
  font-weight: 600;
  background-color: #00E700;
  border-radius: 4px;
  border-width: 0px;
  width: 100%;
  padding: 10px;
  margin-top: 20px;
}

#button-bet:hover {
  cursor: pointer;
  background-color: #2cee2c;
}

#option-button {
  display: flex !important;
  flex-direction: row !important;
  width: auto;
  margin: 15px;
  margin-top: 15px !important;
  margin-left: 0px;
}

#option-button>button {
  padding: 15px 20px;
  margin-right: 10px;
  background-color: #304554;
  color: white;
  border-width: 0px;
  border-radius: 2px;
  box-shadow: #242424 0px 2px;
  cursor: pointer;
}

#option-button>button:hover {
  background-color: #3a5466;
  transition: 0.1s;
}

#buttons {
  padding: 15px;
  margin-bottom: 10px;
  background-color: #304554;
  color: white;
  font-weight: 700;
  border-width: 0px;
  border-radius: 2px;
  box-shadow: #1b1b1b 0px 1px;
  cursor: pointer;
}

#buttons:hover {
  background-color: #3a5466;
  transition: 0.1s;
}

#multiplier {
  background-image: url('/png/mini/cross.svg');
}

#rollunder {
  background-image: url('/png/mini/refresh.svg');
}

#winchance {
  background-image: url('/png/mini/percent.svg');
}

.inputdisablestyle {
  width: 99%;
  height: 3.5vh;
  background-color: #304554;
  color: #fff;
  border: none !important;
  border-radius: 2px;
  padding-left: 10px;
}

.labelstyle {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
}

.spanstyle {
  color: #B1BAD3;
  font-size: 14px;
  font-weight: 500;
  text-align: left;
  width: 5vw;
  white-space: nowrap;
}

.valuestyle {
  width: 15vw;
  color: #B1BAD3;
  font-size: 14px;
  font-weight: 500;
  text-align: right;
}

.buttonstyle {
  background-color: #0094ea;
}

.betamountstyle {
  display: flex;
  flex-direction: row;
  height: 4.5vh;
  background-color: #2F4553;
  align-items: center;
  margin-bottom: 3vh;
  padding-left: 5px;
  justify-content: space-between;
}

.tempstyle1 {
  width: 80%;
  height: 3.5vh;
  background-color: #0F212E;
  color: #fff;
  border: none !important;
  padding-left: 5px;
}

.btnbet {
  margin-left: 3px;
  padding: 1px;
  display: flex;
  align-items: center;
}

.halfbet {
  width: 2vw;
  color: #ffffff;
  height: 4vh;
  background-color: #2F4553;
  border: none !important;
  cursor: pointer;
}

.doublebet {
  width: 2vw;
  color: #ffffff;
  height: 2.8vh;
  background-color: #2F4553;
  border: none !important;
  border-left: 0.3vh #1A2C37 solid !important;
  cursor: pointer;
}

.betType {
  margin-top: 5vh;
  border-radius: 30px;
  background-color: #0F212E;
  margin-bottom: 10px;
  padding: 5px;
  align-items: center;
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 20px;
}

.betButtonStyle {
  background-color: #0F212E;
  border-radius: 30px;
  padding: 13px 16px;
  color: #fff;
  border-width: 0px !important;
  font-size: 14px;
  cursor: pointer;
}

.betButtonStyle:hover {
  background-color: #2e424e;
  transition: 0.2s;
}

.swapstyle {
  margin-right: 0.5vw;
  border-radius: 100%;
  padding: 13px 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.swapstyle:hover {
  background-color: #2F4552;
  ;
}

.active {
  background-color: #2F4552;
  /* transition: 0.1s; */
}

.betClickStyle {
  margin-top: 3.5vh;
  height: 4.5vh !important;
  background-color: #00E701 !important;
  color: #000000 !important;
  font-size: 16px;
  font-weight: 600;
  border-radius: 2px;
}

.betClickStyle:hover {
  background-color: #4bc44b !important;
  cursor: pointer;
}
</style>
