<script>
import { ref } from 'vue'
import { mutations, store } from '../../core/Store'

export default {
  setup() {
    const buttonType = ref('seed')
    const nonce = ref(0)
    const copied1 = ref(false)
    const copied2 = ref(false)
    const copied3 = ref(false)
    const copy1 = ref('edr74dsfsg3df5644')
    const copy2 = ref(
      'edr74dsfsg3df5644gguyg34534536uigiugigig346346346uig346',
    )
    const copy3 = ref('sgfsg345345h34jh634534jh534j5h3j45h3j45jh345j345hjj35')
    const hideModal = () => {
      mutations.showFairness()
    }
    const changeType = (req) => {
      buttonType.value = req
    }
    const changeNonce = (req) => {
      if (req === 'plus') {
        nonce.value = nonce.value + 1
      }
      else {
        nonce.value = nonce.value - 1
        if (nonce.value < 0)
          nonce.value = 0
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
      }
      navigator.clipboard.writeText(text)
    }
    return {
      buttonType,
      nonce,
      hideModal,
      changeType,
      changeNonce,
      copy1,
      copy2,
      copy3,
      copied1,
      copied2,
      copied3,
      copyText,
    }
  },
  computed: {
    showFairness() {
      return store.showFairness
    },
  },
}
</script>

<template>
  <div class="modal" :class="[showFairness ? 'active' : '']">
    <div
      class="modal__content"
      :style="{
        height: buttonType === 'seed' ? '' : '664px',
        overflowY: buttonType === 'seed' ? 'hidden' : 'auto',
        overflowX: 'hidden',
      }"
    >
      <div class="modal-title">
        <img src="/png/mini/plinko/fairness.svg" alt="Image" width="16" height="16">
        <span>{{ $t("plinko_fairness") }}</span>
      </div>
      <div class="modal-body">
        <div class="buttonContainer">
          <button
            :class="buttonType === 'seed' ? 'activeButton' : 'deactiveButton'"
            @click="changeType('seed')"
          >
            <span class="white-span">{{ $t("plinko_fairnesses_verify") }}</span>
          </button>
        </div>
        <div v-if="buttonType === 'seed'" class="input-container">
          <div class="gray-span">
            {{ $t("plinko_fairnesses_text1") }}
          </div>
          <div class="inputBox buttonbox">
            <input
              v-model="copy1"
              class="inputStyle"
              type="text"
              readonly
              :style="{ width: '400px' }"
            >
            <div class="stooltip" :style="{ width: '46px' }">
              <button class="copy" @click="copyText('copy1')">
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
                class="tooltiptext1" :class="[copied1 ? 'tooltiptext1-active' : '']"
              >{{ $t("plinko_copyText") }}</span>
            </div>
          </div>
        </div>
        <div v-if="buttonType === 'seed'" class="input-container">
          <div class="gray-span">
            {{ $t("plinko_fairnesses_text2") }}
          </div>
          <div class="inputBox buttonbox">
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
                class="tooltiptext1" :class="[copied2 ? 'tooltiptext1-active' : '']"
              >{{ $t("plinko_copyText") }}</span>
            </div>
          </div>
        </div>
        <div v-if="buttonType === 'seed'" class="input-container">
          <div class="gray-span">
            {{ $t("plinko_fairnesses_text3") }}
          </div>
          <div class="inputBox">
            <input
              class="inputStyle"
              type="text"
              value="9,340"
              readonly
            >
          </div>
        </div>
        <div v-if="buttonType === 'verify'" class="plinko-container">
          <span class="gray-span" :style="{ fontWeight: 400, fontFamily: 'PingFang SC' }">{{
            $t("plinko_fairnesses_verifyText1")
          }}</span>
          <img
            src="/png/mini/plinko/betting1.svg"
            width="16"
            height="16"
            alt="Image"
            class="betting-image"
          >
        </div>
      </div>
      <div v-if="buttonType === 'seed'" class="modal-footer">
        <span class="white-span" :style="{ fontSize: '16px' }">{{
          $t("plinko_fairnesses_text4")
        }}</span>
        <div class="input-container" :style="{ marginTop: '20px' }">
          <div class="gray-span">
            {{ $t("plinko_fairnesses_text5") }}
            <span class="gray-span" :style="{ color: '#E54161' }">*</span>
          </div>
          <div class="inputBox buttonbox">
            <input
              class="inputStyle"
              type="text"
              value="adT2z3laCC"
              readonly
              :style="{
                background: 'transparent',
                border: '2px solid #203441',
                color: '#879097',
                cursor: 'not-allowed',
              }"
            >
            <button class="changeButton">
              <span class="white-span" :style="{ color: '#000' }">
                {{ $t("plinko_fairnesses_button") }}
              </span>
            </button>
          </div>
        </div>
        <div class="input-container" :style="{ marginTop: '17px' }">
          <div class="gray-span">
            {{ $t("plinko_fairnesses_text6") }}
          </div>
          <div class="inputBox buttonbox">
            <input
              v-model="copy3"
              class="inputStyle"
              type="text"
              readonly
              :style="{ width: '400px' }"
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
                class="tooltiptext1" :class="[copied3 ? 'tooltiptext1-active' : '']"
              >{{ $t("plinko_copyText") }}</span>
            </div>
          </div>
        </div>
        <span class="gray-span" :style="{ alignSelf: 'flex-start', marginTop: '21px', marginBottom: '7px' }">
          {{ $t("plinko_fairnesses_text7") }}Blackjack, Video Poker
        </span>
      </div>
      <div v-if="buttonType === 'verify'" class="modal-footer verify">
        <div class="input-container">
          <div class="gray-span">
            {{ $t("plinko_verifyTexts_game") }}
          </div>
          <div class="inputBox">
            <select
              class="inputStyle"
              :style="{ width: '468px', height: '40px' }"
            >
              <option value="Blackjack">
                Blackjack
              </option>
              <option value="Crash">
                Crash
              </option>
              <option value="Dice">
                Dice
              </option>
              <option value="Hilo">
                Hilo
              </option>
              <option value="Limbo">
                Limbo
              </option>
              <option value="Mines">
                Mines
              </option>
              <option value="Plinko">
                Plinko
              </option>
            </select>
            <img
              src="/png/mini/plinko/arrow-down.svg"
              width="14"
              height="14"
              alt="Image"
              :style="{ position: 'absolute', right: '12px', top: '15px' }"
            >
          </div>
        </div>
        <div class="input-container">
          <div class="gray-span">
            {{ $t("plinko_verifyTexts_clientSeed") }}
          </div>
          <div class="inputBox">
            <input class="inputStyle" type="text">
          </div>
        </div>
        <div class="input-container">
          <div class="gray-span">
            {{ $t("plinko_verifyTexts_serverSeed") }}
          </div>
          <div class="inputBox">
            <input class="inputStyle" type="text">
          </div>
        </div>
        <div class="input-container">
          <div class="gray-span">
            {{ $t("plinko_verifyTexts_nonce") }}
          </div>
          <div class="inputBox buttonbox">
            <input
              v-model="nonce"
              class="inputStyle numberType"
              type="number"
              :style="{ width: '338px' }"
            >
            <button
              class="noncebutton"
              :style="{ background: '#304554', top: 0, right: '54px' }"
              @click="changeNonce('minus')"
            >
              <span>
                <img
                  src="/png/mini/plinko/arrow-down.svg"
                  width="14"
                  height="14"
                  alt="Image"
                >
              </span>
            </button>
            <button
              class="noncebutton beforebutton"
              :style="{
                background: '#304554',
                top: 0,
                right: 0,
                borderRadius: '0px 4px 4px 0px',
              }"
              @click="changeNonce('plus')"
            >
              <span>
                <img
                  src="/png/mini/plinko/arrow-down.svg"
                  width="14"
                  height="14"
                  alt="Image"
                  :style="{ transform: 'rotate(180deg)' }"
                >
              </span>
            </button>
          </div>
        </div>
        <div class="input-container">
          <div class="gray-span">
            {{ $t("plinko_risk") }}
          </div>
          <div class="inputBox">
            <select
              class="inputStyle"
              :style="{ width: '468px', height: '40px' }"
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
            <img
              src="/png/mini/plinko/arrow-down.svg"
              width="14"
              height="14"
              alt="Image"
              :style="{ position: 'absolute', right: '12px', top: '15px' }"
            >
          </div>
        </div>
        <div class="input-container">
          <div class="gray-span">
            {{ $t("plinko_rows") }}
          </div>
          <div class="inputBox">
            <select
              class="inputStyle"
              :style="{ width: '468px', height: '40px' }"
            >
              <option
                v-for="value in [8, 9, 10, 11, 12, 13, 14, 15, 16]"
                :key="value"
                :value="value"
              >
                {{ value }}
              </option>
            </select>
            <img
              src="/png/mini/plinko/arrow-down.svg"
              width="14"
              height="14"
              alt="Image"
              :style="{ position: 'absolute', right: '12px', top: '15px' }"
            >
          </div>
        </div>
        <button class="bottomButton">
          <span class="gray-span">{{ $t("plinko_fairnesses_calcButton") }}</span>
        </button>
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
.noncebutton-container {
  position: "absolute";
  top: 0;
  right: 0;
  border-radius: "0px 4px 4px 0px";
  width: 108px;
  height: 40px;
  display: "flex";
}
.buttonbox {
  display: flex;
}
.noncebutton {
  position: absolute;
  width: 54px;
  height: 40px;
  flex-shrink: 0;
  background: #304554;
  border: none;
}

.noncebutton:hover {
  background: #567086 !important;
}

.beforebutton::before {
  content: "";
  position: absolute;
  background: #1a2c38;
  height: 22px;
  top: 11px;
  left: -1px;
  width: 2px;
}
.changeButton {
  background: #16852d;
  width: 103px;
  height: 40px;
  top: 0;
  right: 0;
  border-radius: 0px 4px 4px 0px;
  position: absolute;
  border: none;
  cursor: not-allowed;
}

img.betting-image {
  margin-top: 12px;
  animation: mover 0.8s infinite alternate;
}
@keyframes mover {
  0% {
    transform: translateY(0px);
  }
  25% {
    transform: translateY(-5px);
  }
  50% {
    transform: translateY(0px);
  }
  75% {
    transform: translateY(-2px);
  }
  100% {
    transform: translateY(0px);
  }
}
.verify {
  gap: 18px;
}
.verify .input-container .inputBox .inputStyle {
  border-radius: 4px;
  border: 2px solid #304554;
  background: #0f212e;
  box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.3);
}
.verify .input-container .inputBox .inputStyle:hover {
  border: 2px solid #567086;
}
.modal.active {
  visibility: visible;
  opacity: 1;
}
.modal:target {
  visibility: visible;
  opacity: 1;
}
.plinko-container {
  width: 100%;
  border-radius: 8px;
  border: 2px dashed #304554;
  height: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.activeButton {
  display: flex;
  width: 65px;
  padding: 11px 37px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
  border-radius: 30px;
  background: #304554;
  border: none;
  white-space: nowrap;
}
.deactiveButton {
  display: flex;
  width: 65px;
  padding: 11px 37px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
  background: transparent;
  white-space: nowrap;
  border: none;
}
.deactiveButton:hover {
  border-radius: 30px;
  background: #304554;
}
.input-container {
  width: 100%;
}
.inputBox {
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
.buttonbox .inputStyle {
  border-radius: 4px 0 0 4px;
}
.white-span {
  color: #fff;
  text-align: center;
  font-family: PingFang SC;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
}

.gray-span {
  color: #b1bad3;
  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
}
.input-container .gray-span {
  font-family: Inter;
}
.input-container .inputStyle {
  font-family: Inter;
}

.inputBox:has(.copy:hover) > input {
  border: 2px solid #557086;
}
.changeButton span {
  font-family: Inter;
}
.bottomButton {
  margin-top: -5px;
  background: transparent;
  border: none;
  padding: 0;
}
.bottomButton:hover span {
  color: #fff;
}
.modal__content {
  position: relative;
  width: 500px;
  max-width: 90%;
  border-radius: 8px;
  background: #1a2c37;
  box-shadow: 0px 1px 0px 0px #253541 inset,
    0px 11px 0px 0px rgba(0, 0, 0, 0.14);
}
.modal-footer {
  width: 468px;
  border-radius: 0px 0px 8px 8px;
  background: #0f212e;
  padding: 21px 16px 11px 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 16px;
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
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 17px;
  margin-top: 20px;
  color: #b1bad3;
  font-family: PingFang SC;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  padding: 0 16px;
}
.buttonContainer {
  display: flex;
  width: 160px;
  padding: 5px 6px;
  justify-content: center;
  align-items: center;
  border-radius: 30px;
  background: #0f212e;
  gap: 10px;
}
.numberType {
  border-radius: 4px 0 0 4px !important;
}
.numberType::-webkit-outer-spin-button,
.numberType::-webkit-inner-spin-button {
  margin-right: 9px;
  height: 22px;
  width: 16px;
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
</style>
