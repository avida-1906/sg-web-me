<script>
import { onMounted, onUnmounted, ref } from 'vue'
import { mutations, store } from '../core/Store'
import { Plinko } from '../core/Plinko'
import { GlobalFunc } from '../core/GlobalFunc'
import Setting from './Setting.vue'

export default {
  components: {
    Setting,
  },
  setup() {
    const isManualButton = ref(true)
    const isAutoButton = ref(false)
    const isAutoBetting = ref(false)
    const isEmpty = ref(false)
    const amount = ref('0.000000000')
    const level = ref('Medium')
    const rows = ref('16')
    const numberofbet = ref(0)
    const isMaximum = ref(false)
    const rowValues = ['8', '9', '10', '11', '12', '13', '14', '15', '16']
    let intervalId
    const betting = ref(0)
    const betAmountInput = ref(null)
    const statisticsComponent = ref(null)
    const amountorder = ref(null)
    const betbuttonorder = ref(null)
    let plinko

    const changeState = () => {
      mutations.updatePlinko(amount.value, rows.value, level.value)
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
    const showAlert = (req) => {
      mutations.updateAuto(req)
    }
    const dropParticle = () => {
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
      betting.value = betting.value + 1
    }

    const startInterval = () => {
      intervalId = setInterval(dropParticle, 500)
    }

    const stopInterval = () => {
      clearInterval(intervalId)
    }

    const selectInput = () => {
      const inputField = betAmountInput.value
      if (inputField)
        inputField.select()
    }
    const responsive = (a_w, a_h, co_w, co_h, c_w, c_h, st_w, s_w) => {
      mutations.responsive(a_w, a_h, co_w, co_h, c_w, c_h, st_w, s_w)
    }
    const bet = () => {
      if (!amount.value) {
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
              showAlert('start')
            }
            else {
              isAutoBetting.value = false
              stopInterval()
              showAlert('end')
            }
          }
          else {
            isAutoBetting.value = true
            for (let i = 0; i < numberofbet.value; i++) {
              setTimeout(() => {
                dropParticle()
                numberofbet.value = Number.parseInt(numberofbet.value) - 1
              }, 500 * i)
            }
            setTimeout(() => {
              isAutoBetting.value = false
            }, 500 * numberofbet.value)
          }
        }
      }
    }
    const changeOrder = () => {
      if (window.innerWidth > 1100) {
        betbuttonorder.value.style.order = 6
        amountorder.value.style.order = 1
      }
      else {
        betbuttonorder.value.style.order = isAutoButton.value ? 1 : 2
        amountorder.value.style.order = isAutoButton.value ? 2 : 1
      }
    }

    const activeButton = (buttonId) => {
      isManualButton.value = buttonId === 'manualButton'
      isAutoButton.value = buttonId === 'autoButton'
      changeOrder()
    }

    const betAmountTimes = (times) => {
      if (times === 999)
        amount.value = 999999

      amount.value = amount.value * times
    }

    const handleResize = () => {
      const newWidth = window.innerWidth
      if (newWidth < 1200) {
        changeOrder()
        if (newWidth > 1100) {
          mutations.rectShow(true)
          responsive(
            '300px',
            `${(630 * newWidth) / 1200}px`,
            `${900 - 1200 + newWidth}px`,
            `${(630 * newWidth) / 1200}px`,
            '800px',
            `${(630 * newWidth) / 1200}px`,
            `${newWidth - 60}px`,
            `${newWidth}px`,
          )
        }
        else {
          mutations.rectShow(false)
          responsive(
            '400px',
            '500px',
            '400px',
            '310px',
            '400px',
            '310px',
            `${newWidth * 0.8 - 60}px`,
            '400px',
          )
        }
      }
      else {
        responsive(
          '300px',
          '630px',
          '900px',
          '630px',
          '800px',
          '630px',
          '1140px',
          '1200px',
        )
      }
      plinko.map()
    }

    const handleDataUpdate = (event) => {
      if (event.detail === 1 || event.detail === 2)
        betting.value = betting.value - 1
    }
    onUnmounted(() => {
      window.removeEventListener('resize', handleResize)
      window.addEventListener('data-updated', handleDataUpdate)
    })

    onMounted(() => {
      window.addEventListener('data-updated', handleDataUpdate)
      window.addEventListener('resize', handleResize)
      plinko = Plinko(document.body.querySelector('#plinko-canvas'))
      plinko.map()

      plinko.GetSettings(
        amount.value,
        level.value,
        rows.value,
        numberofbet.value,
        1000,
      )
    })

    return {
      isManualButton,
      isAutoButton,
      isAutoBetting,
      isEmpty,
      amount,
      level,
      rows,
      numberofbet,
      rowValues,
      betting,
      betAmountInput,
      statisticsComponent,
      isMaximum,
      amountorder,
      betbuttonorder,
      activeButton,
      selectInput,
      betAmountTimes,
      changeState,
      bet,
    }
  },

  computed: {
    showMax() {
      return store.isMaximum
    },
    autoStart() {
      return store.autoStart
    },
    autoEnd() {
      return store.autoEnd
    },
  },
}
</script>

<template>
  <div class="container">
    <div class="betTypeContainer">
      <button
        class="typeButton" :class="[
          isAutoBetting ? 'disabled' : '',
          { betTypeActive: isManualButton },
        ]"
        :disabled="isAutoBetting"
        @click="activeButton('manualButton')"
      >
        <span>{{ $t("plinko_manual") }}</span>
      </button>
      <button
        class="typeButton" :class="[
          isAutoBetting ? 'disabled' : '',
          { betTypeActive: isAutoButton },
        ]"
        :disabled="isAutoBetting"
        @click="activeButton('autoButton')"
      >
        <span>{{ $t("plinko_auto") }}</span>
      </button>
    </div>
    <div ref="amountorder" class="amountorder">
      <div class="betamountcontainer">
        <div class="spanstyle">
          {{ $t("plinko_amount") }}
        </div>
        <div class="spanstyle" :style="{ fontSize: '12px' }">
          US$<span :style="{ fontFamily: 'PingFang SC' }">0.00</span>
        </div>
      </div>
      <div class="betAmountContainer">
        <div class="tooltip">
          <input
            ref="betAmountInput" v-model="amount"
            class="betAmountInput"
            :class="[
              isAutoBetting ? 'disabled' : '',
              { warning: isEmpty },
            ]"
            placeholder="0.000000000"
            type="number"
            min="0"
            step="0.000000001"
            :disabled="isAutoBetting"
            @focus="selectInput"
            @change="changeState"
          >
          <img
            src="/png/mini/plinko/bit.svg"
            width="16"
            height="16"
            alt="Image"
            class="bitImage"
          >
          <span class="tooltiptext">{{ $t("plinko_betamountalert") }}</span>
        </div>
        <div class="buttons-container" :class="[betting > 0 ? 'disabled' : '']">
          <button
            class="betAmountTimesBtn"
            :disabled="isAutoBetting"
            @click="betAmountTimes(0.5)"
          >
            <span>½</span>
          </button>
          <button
            class="betAmountTimesBtn"
            :disabled="isAutoBetting"
            @click="betAmountTimes(2)"
          >
            <span>2×</span>
          </button>
          <button
            v-if="showMax"
            class="betAmountTimesBtn"
            :disabled="isAutoBetting"
            @click="betAmountTimes(999)"
          >
            <span>{{ $t("plinko_max") }}</span>
          </button>
        </div>
      </div>
    </div>
    <div class="levelorder">
      <div class="spanstyle">
        {{ $t("plinko_risk") }}
      </div>
      <img
        src="/png/mini/plinko/arrow-down.svg"
        width="14"
        height="14"
        alt="Image"
        class="arrow-down"
      >
      <select
        v-model="level" class="baseStyle"
        :class="[betting > 0 || isAutoBetting ? 'disabled' : '']"
        :disabled="betting > 0 || isAutoBetting"
        :style="{ fontFamily: 'PingFang SC', fontWeight: 600 }"
        @change="changeState"
      >
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
        src="/png/mini/plinko/arrow-down.svg"
        width="14"
        height="14"
        alt="Image"
        class="arrow-down"
      >
      <select
        v-model="rows" class="baseStyle"
        :class="[betting > 0 || isAutoBetting ? 'disabled' : '']"
        :disabled="betting > 0 || isAutoBetting"
        :style="{ fontFamily: 'Inter', fontWeight: 600 }"
        @change="changeState"
      >
        <option v-for="value in rowValues" :key="value" :value="value">
          {{ value }}
        </option>
      </select>
    </div>
    <div v-if="isAutoButton" class="betNumberContainer">
      <div class="spanstyle">
        {{ $t("plinko_betNumbers") }}
      </div>
      <input
        v-model="numberofbet" class="baseStyle"
        :class="[isAutoBetting ? 'disabled' : '']"
        placeholder="0"
        type="number"
        min="0"
        :disabled="isAutoBetting"
        :style="{ fontFamily: 'Inter', fontWeight: 600 }"
        @change="changeState"
      >
      <img
        src="/png/mini/plinko/infinitive.svg"
        width="14"
        height="14"
        alt="Image"
        class="infinitiveImage"
      >
    </div>
    <div ref="betbuttonorder" class="betbuttonorder">
      <button class="baseStyle betButton" @click="bet">
        <span>{{
          isManualButton
            ? $t("plinko_bet")
            : isAutoBetting
              ? $t("plinko_autobetstop")
              : $t("plinko_autobetstart")
        }}</span>
        <img
          v-if="isAutoBetting"
          src="/png/mini/plinko/betting.svg"
          width="16"
          height="16"
          alt="Image"
          class="betting-image"
        >
      </button>
    </div>
  </div>
  <div class="alert-container">
    <div v-if="autoStart" class="autobet-alert">
      <div class="auto-image">
        <img
          src="/png/mini/plinko/auto.svg"
          width="20"
          height="20"
          alt="Image"
          class="infinitiveImage"
        >
      </div>
      <span>{{ $t("plinko_autobetalert1") }}</span>
      <div class="close">
        <img
          src="/png/mini/plinko/times.svg"
          width="14"
          height="14"
          alt="Image"
          class="infinitiveImage"
        >
      </div>
      <div class="alert-timeline" />
    </div>
    <div v-if="autoEnd" class="autobet-alert">
      <div class="auto-image">
        <img
          src="/png/mini/plinko/auto.svg"
          width="20"
          height="20"
          alt="Image"
          class="infinitiveImage"
        >
      </div>
      <span>{{ $t("plinko_autobetalert2") }}</span>
      <div class="close">
        <img
          src="/png/mini/plinko/times.svg"
          width="14"
          height="14"
          alt="Image"
          class="infinitiveImage"
        >
      </div>
      <div class="alert-timeline" />
    </div>
  </div>
  <Setting />
</template>

<style scoped>
@import "../assets/css/sidebar.css";
</style>
