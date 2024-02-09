<script>
import { ref } from 'vue'
import { mutations, store } from '../core/Store'

export default {
  setup() {
    const showFairFlag = ref(false)
    const isHover1 = ref(false)
    const isHover2 = ref(false)
    const isHover3 = ref(false)
    const copy1 = ref('201,213,564,969')
    const copy2 = ref(
      'edr74dsfsg3df5644dfgd2525245hjjh2hjjhhj23423jh234j23jhj234',
    )
    const copy3 = ref('edr74dsfsg3df5644')
    const copy4 = ref('4345')
    const copied1 = ref(false)
    const copied2 = ref(false)
    const copied3 = ref(false)
    const copied4 = ref(false)
    const copied5 = ref(false)
    const hideModal = () => {
      mutations.currentScore(0, '', '')
    }
    const showFairness = () => {
      showFairFlag.value = !showFairFlag.value
    }
    const changeHover = (hover, req) => {
      if (hover === 'isHover1') {
        if (req === 'on')
          isHover1.value = true
        else
          isHover1.value = false
      }
      else if (hover === 'isHover2') {
        if (req === 'on')
          isHover2.value = true
        else
          isHover2.value = false
      }
      else if (hover === 'isHover3') {
        if (req === 'on')
          isHover3.value = true
        else
          isHover3.value = false
      }
    }
    const copyText = (req) => {
      let text = ''
      switch (req) {
        case 'copy1':
          text = copy1.value
          copied1.value = true
          setTimeout(() => {
            copied1.value = false
          }, 1000)
          break
        case 'copy2':
          text = copy2.value
          copied2.value = true
          setTimeout(() => {
            copied2.value = false
          }, 1000)
          break
        case 'copy3':
          text = copy3.value
          copied3.value = true
          setTimeout(() => {
            copied3.value = false
          }, 1000)
          break
        case 'copy4':
          text = copy4.value
          copied4.value = true
          setTimeout(() => {
            copied4.value = false
          }, 1000)
          break
        case 'copy5':
          text = copy1.value
          copied5.value = true
          setTimeout(() => {
            copied5.value = false
          }, 1000)
          break
      }
      navigator.clipboard.writeText(text)
    }
    return {
      showFairFlag,
      isHover1,
      isHover2,
      isHover3,
      hideModal,
      copy1,
      copy2,
      copy3,
      copy4,
      copied1,
      copied2,
      copied3,
      copied4,
      copied5,
      showFairness,
      changeHover,
      copyText,
    }
  },
  computed: {
    cColor() {
      return store.currentColor
    },
    cShadow() {
      return store.currentShadow
    },
    cText() {
      return store.currentScore
    },
    plinkoAmount() {
      return store.plinkoAmount
    },
    plinkoLevel() {
      if (store.plinkoLevel === 'Low')
        return 'level1'
      else if (store.plinkoLevel === 'Medium')
        return 'level2'
      else if (store.plinkoLevel === 'High')
        return 'level3'
      return ''
    },
    plinkoRow() {
      return store.plinkoRow
    },
  },
}
</script>

<template>
  <div class="modal active">
    <div
      class="modal__content"
      :style="{ height: showFairFlag ? '843px' : '653px' }"
    >
      <div class="modal-title">
        <img src="/png/mini/plinko/score.svg" alt="Image" width="16" height="16">
        <span>{{ $t("plinko_bet") }}</span>
      </div>
      <div class="modal-body">
        <span class="white-span">Plinko</span>
        <div class="id-container">
          <span class="white-span">ID <span :style="{ fontFamily: 'Inter' }">{{ copy1 }}</span></span>
          <div class="stooltip">
            <button
              @mouseover="changeHover('isHover1', 'on')"
              @mouseout="changeHover('isHover1', 'off')"
              @click="copyText('copy1')"
            >
              <span>
                <img
                  :src="isHover1 ? '/png/mini/plinko/copy-hover.svg' : '/png/mini/plinko/copy.svg'"
                  alt="Image"
                  width="14"
                  height="14"
                >
              </span>
            </button>
            <span
              class="tooltiptext1" :class="[copied1 ? 'tooltiptext1-active' : '']"
            >{{ $t("plinko_copyId") }}</span>
          </div>
          <div class="stooltip">
            <button
              @mouseover="changeHover('isHover2', 'on')"
              @mouseout="changeHover('isHover2', 'off')"
              @click="copyText('copy5')"
            >
              <span>
                <img
                  :src="isHover2 ? '/png/mini/plinko/link-hover.svg' : '/png/mini/plinko/link.svg'"
                  alt="Image"
                  width="14"
                  height="14"
                >
              </span>
            </button>
            <span
              class="tooltiptext1" :class="[copied5 ? 'tooltiptext1-active' : '']"
            >{{ $t("plinko_copyId") }}</span>
          </div>
        </div>
        <span class="gray-span" :style="{ marginTop: '16px' }">
          {{ $t("plinko_scoreboard_time") }}dwwyy332
        </span>
        <span class="gray-span" :style="{ marginTop: '5px' }">
          {{ $t("plinko_scoreboard_on") }}
          <span :style="{ fontFamily: 'Inter' }">1/13/2024</span>
          {{ $t("plinko_scoreboard_at") }}
          <span :style="{ fontFamily: 'Inter' }">4:51</span> PM
        </span>
        <div class="forLogo">
          <img src="/png/mini/plinko/Vector1.svg" alt="Image" width="91" height="34">
        </div>
        <div class="state-container">
          <div class="state">
            <span class="gray-span">{{ $t("plinko_bet") }}</span>
            <span class="number-span">
              {{ plinkoAmount }}
              <img src="/png/mini/plinko/bit.svg" alt="Image" width="14" height="14">
            </span>
          </div>
          <div class="state">
            <span class="gray-span">{{ $t("plinko_scoreboard_multi") }}</span>
            <span class="number-span"> {{ cText }}x </span>
          </div>
          <div class="state">
            <span class="gray-span">{{ $t("plinko_scoreboard_payout") }}</span>
            <span class="number-span success">
              {{ (plinkoAmount * (cText - 1)).toFixed(9) }}
              <img src="/png/mini/plinko/bit.svg" alt="Image" width="14" height="14">
            </span>
          </div>
        </div>
        <div class="score">
          <div
            class="rect"
            :style="{
              background: cColor,
              boxShadow: `0px 3px 0px 0px ${cShadow}`,
            }"
          >
            <span class="gray-span" :style="{ color: '#000' }">{{ cText }}x</span>
          </div>
        </div>
        <div class="rowrisk">
          <div class="input-container">
            <div class="gray-span" :style="{ fontFamily: 'Inter' }">
              {{ $t("plinko_risk") }}
            </div>
            <input
              class="inputStyle"
              type="text"
              :value="$t(`${plinkoLevel}`)"
              readonly
            >
          </div>
          <div class="input-container">
            <div class="gray-span" :style="{ fontFamily: 'Inter' }">
              {{ $t("plinko_rows") }}
            </div>
            <input
              class="inputStyle"
              type="text"
              :value="plinkoRow"
              readonly
            >
          </div>
        </div>
        <button class="playbutton" @click="hideModal">
          <span class="gray-span">{{ $t("plinko_scoreboard_play") }} Plinko</span>
        </button>
        <div class="fairness">
          <span
            class="white-span"
            :style="{ cursor: 'pointer', fontSize: '14px' }"
            @click="showFairness"
            @mouseover="changeHover('isHover3', 'on')"
            @mouseout="changeHover('isHover3', 'off')"
          >
            {{ $t("plinko_scoreboard_provable") }}
            <img
              :src="
                isHover3
                  ? '/png/mini/plinko/arrow-left-hover.svg'
                  : '/png/mini/plinko/arrow-left.svg'
              "
              alt="Image"
              width="14"
              height="14"
              :style="{ transform: showFairFlag ? 'rotate(-90deg)' : 'none' }"
            >
          </span>
          <div v-if="showFairFlag" class="fairness-container">
            <div class="input-container">
              <div class="gray-span">
                {{ $t("plinko_prove_text1") }}
              </div>
              <div class="inputBox">
                <input
                  class="inputStyle"
                  type="text"
                  :value="$t('plinko_prove_value1')"
                  readonly
                  :style="{ background: '#203441', color: '#868F96', borderColor: '#203441' }"
                >
              </div>
            </div>
            <div class="input-container">
              <div class="gray-span">
                {{ $t("plinko_prove_text2") }}
              </div>
              <div class="inputBox buttonBox">
                <input
                  v-model="copy2"
                  class="inputStyle"
                  type="text"
                  readonly
                  :style="{ width: '400px' }"
                >
                <div class="stooltip" :style="{ width: '46px' }">
                  <button class="copy" @click="copyText('copy2')">
                    <span>
                      <img
                        src="/png/mini/plinko/copy-hover.svg"
                        alt="Image"
                        width="14"
                        height="14"
                      >
                    </span>
                  </button>
                  <span
                    class="tooltiptext1" :class="[
                      copied2 ? 'tooltiptext1-active' : '',
                    ]"
                  >{{ $t("plinko_copyText") }}</span>
                </div>
              </div>
            </div>
            <div class="seed">
              <div class="input-container">
                <div class="gray-span">
                  {{ $t("plinko_prove_text3") }}
                </div>
                <div
                  class="inputBox buttonBox"
                  :style="{ width: '312px' }"
                >
                  <input
                    v-model="copy3"
                    class="inputStyle"
                    type="text"
                    readonly
                    :style="{ width: '244px' }"
                  >
                  <div class="stooltip" :style="{ width: '46px' }">
                    <button class="copy" @click="copyText('copy3')">
                      <span>
                        <img
                          src="/png/mini/plinko/copy-hover.svg"
                          alt="Image"
                          width="14"
                          height="14"
                        >
                      </span>
                    </button>
                    <span
                      class="tooltiptext1" :class="[
                        copied3 ? 'tooltiptext1-active' : '',
                      ]"
                    >{{ $t("plinko_copyText") }}</span>
                  </div>
                </div>
              </div>
              <div class="input-container">
                <div class="gray-span">
                  {{ $t("plinko_prove_text4") }}
                </div>
                <div
                  class="inputBox buttonBox"
                  :style="{ width: '134px' }"
                >
                  <input
                    v-model="copy4"
                    class="inputStyle"
                    type="text"
                    readonly
                    :style="{ width: '66px' }"
                  >
                  <div class="stooltip" :style="{ width: '46px' }">
                    <button class="copy" @click="copyText('copy4')">
                      <span>
                        <img
                          src="/png/mini/plinko/copy-hover.svg"
                          alt="Image"
                          width="14"
                          height="14"
                        >
                      </span>
                    </button>
                    <span
                      class="tooltiptext1" :class="[
                        copied4 ? 'tooltiptext1-active' : '',
                      ]"
                    >{{ $t("plinko_copyText") }}</span>
                  </div>
                </div>
              </div>
            </div>
            <div
              :style="{
                marginTop: '-4px',
                display: 'flex',
                flexDirection: 'column',
                gap: '9px',
              }"
            >
              <button class="fobutton">
                <span class="gray-span">{{ $t("plinko_prove_button1") }}</span>
              </button>
              <button class="fobutton">
                <span class="gray-span">{{ $t("plinko_prove_button2") }}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <button class="modal__close" @click="hideModal">
        <span><img src="/png/mini/plinko/times.svg" alt="Image" width="10" height="10"></span>
      </button>
    </div>
  </div>
</template>

<style scoped>
.modal {
  visibility: hidden;
  opacity: 0;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.32);
  transition: all 0.4s;
  z-index: 9;
}
.modal.active {
  visibility: visible;
  opacity: 1;
}
.modal:target {
  visibility: visible;
  opacity: 1;
}
.buttonBox {
  display: flex;
}
.modal__content {
  position: relative;
  width: 500px;
  max-width: 90%;
  border-radius: 8px;
  background: #1a2c37;
  box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.16);
  overflow-y: auto;
  overflow-x: hidden;
  height: 647px;
}
.rowrisk {
  width: 468px;
  margin-top: 15px;
  display: flex;
  flex-direction: column;
  gap: 13px;
  padding: 0 16px;
}

.fairness-container {
  width: 468px;
  margin-top: 12px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.seed {
  display: flex;
  justify-content: space-between;
  margin-right: 18px;
}
.inputBox {
  width: 100%;
  position: relative;
}

.inputBox button {
  position: absolute;
  top: 13px;
  right: 15px;
  background: transparent;
  border: none;
  padding: 0;
}

.seed .input-container:first-child {
  width: 222px;
}
.seed .input-container:not(:first-child) {
  width: 116px;
}
.seed .input-container .inputStyle {
  width: 100%;
  position: relative;
}
.inputStyle {
  width: 446px;
  background: #304554;
  border: 2px solid #304554;
  box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.3);
  border-radius: 4px;
  color: #fff;
  font-family: PingFang SC;
  font-weight: 600;
  height: 36px;
  padding: 0 9px;
  appearance: none;
}
.inputStyle:hover {
  border: 2px solid #557086;
}
.inputStyle:focus {
  border: 2px solid #557086;
  outline: 0;
}
.fobutton {
  background: transparent;
  border: none;
  margin: auto;
}
.expand-button {
  width: 468px;
  margin-top: 15px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 13px;
  padding: 0 16px;
}
.playbutton {
  padding: 12px 18px;
  border: none;
  border-radius: 4px;
  background: #0f212e;
  margin-top: 16px;
}
.fairness {
  margin-top: 16px;
  width: 100%;
  padding: 13px 16px;
  border: none;
  box-sizing: border-box;
  border-radius: 0px 0px 8px 8px;
  background: #0f212e;
}
.fairness span {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.forLogo {
  position: relative;
  display: flex;
  align-items: center;
  gap: 5px;
  width: 468px;
  padding: 0 16px;
  margin-top: 30px;
}
.forLogo::before {
  content: "";
  background: #2f4553;
  height: 2px;
  flex-grow: 1;
}

.forLogo::after {
  content: "";
  background: #2f4553;
  height: 2px;
  flex-grow: 1;
}
.white-span {
  color: #fff;
  font-family: PingFang SC;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
}

.gray-span {
  color: #b1bad3;
  font-family: PingFang SC;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
}
.number-span {
  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: -0.84px;
  color: #fff;
}

.modal-title {
  display: flex;
  gap: 10px;
  align-items: center;
  color: #fff;
  font-family: PingFang SC;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  padding: 0 16px;
  margin-top: 16px;
}
.modal-body {
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 18px;
  color: #b1bad3;
  font-family: PingFang SC;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
}
.id-container {
  display: flex;
  gap: 10px;
  margin-top: 4px;
}
.inputBox .copy {
  position: absolute;
  top: 0;
  right: 0;
  background: #304554;
  border: none;
  padding: 0;
  width: 46px;
  height: 40px;
  border-radius: 0 4px 4px 0;
}
.inputBox .copy:hover {
  background: #567086;
}
.inputBox:has(.copy:hover) > input {
  border: 2px solid #557086;
}

/* .inputStyle:hover + .stooltip {
  border: 2px solid #557086;
} */
.buttonBox .inputStyle {
  border-radius: 4px 0 0 4px;
}
.id-container button {
  border: none;
  background: transparent;
  padding: 0;
}
.state-container {
  border-radius: 4px;
  background: #0f212e;
  display: grid;
  width: 468px;
  justify-content: center;
  grid-template-columns: 1fr 1fr 1fr;
  padding: 19px 0;
  margin-top: 16px;
}

.state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 9px;
  position: relative;
}

.state span:not(:first-child) {
  display: flex;
  align-items: center;
  gap: 4px;
}

.state:not(:first-child)::before {
  content: "";
  position: absolute;
  background: #213743;
  height: 45px;
  top: 50%;
  right: 100%;
  transform: translate(-50%, -50%);
  width: 2px;
}
.score {
  position: relative;
  width: 100%;
  height: 36px;
  align-items: center;
  justify-content: center;
  display: flex;
  margin-top: 21px;
}
.rect {
  border-radius: 4px;
  width: 48px;
  height: 40px;
  background: #fa223e;
  position: absolute;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
.success {
  color: #17e700;
}
.input-container .gray-span {
  font-family: Inter;
}
.input-container .inputStyle {
  font-family: Inter;
}
.failed {
  color: #ed4163;
}
.copy span {
  display: flex;
  justify-content: center;
}
.modal__close {
  position: absolute;
  top: 10px;
  right: 10px;
  color: #585858;
  text-decoration: none;
  background-color: transparent;
  border: none;
  font-size: 14px;
}
.fobutton:hover span {
  color: #fff;
}
</style>
