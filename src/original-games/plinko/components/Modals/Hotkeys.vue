<script>
import { mutations, store } from '../../core/Store'

export default {

  setup() {
    const hideModal = () => {
      mutations.showHotkeyModal()
    }
    const hotkeyState = () => {
      mutations.updateHotkey()
    }
    return {
      hideModal,
      hotkeyState,
    }
  },
  computed: {
    state() {
      return store.hotkey
    },
    showHotkeyModal() {
      return store.showHotkeyModal
    },
  },
}
</script>

<template>
  <div class="modal" :class="[showHotkeyModal ? 'active' : '']">
    <div class="modal__content">
      <div class="modal-title">
        <img
          src="/png/mini/plinko/hotkey-setting.svg"
          alt="Image"
          width="16"
          height="16"
        >
        <span>{{ $t("plinko_keyboard") }}</span>
      </div>
      <div class="modal-body">
        <div class="hotkey-row">
          <span>{{ $t("plinko_hotkey1") }}</span>
          <span class="hotkey">Space</span>
        </div>
        <div class="hotkey-row">
          <span>{{ $t("plinko_hotkey2") }}</span>
          <span class="hotkey">s</span>
        </div>
        <div class="hotkey-row">
          <span>{{ $t("plinko_hotkey3") }}</span>
          <span class="hotkey">a</span>
        </div>
        <div class="hotkey-row">
          <span>{{ $t("plinko_hotkey4") }}</span>
          <span class="hotkey">d</span>
        </div>
        <div class="hotkey-info">
          <img
            src="/png/mini/plinko/information.svg"
            alt="Image"
            width="16"
            height="16"
          >
          <span>
            {{ $t("plinko_hotkeyInfo") }}
          </span>
        </div>
      </div>
      <div class="modal__footer">
        <label class="check-container">{{ $t("plinko_hotkeyUse") }}
          <input type="checkbox" :checked="state" @input="hotkeyState">
          <span class="checkmark" />
        </label>
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

.activeButton {
  width: 106px;
  height: 54px;
  flex-shrink: 0;
  border-radius: 30px;
  background: #223d49;
  border: 5px solid #0a1e29;
  color: #fff;
  font-family: PingFang SC;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
}
.modal__content {
  position: relative;
  width: 500px;
  max-width: 90%;
  padding: 16px;
  border-radius: 8px;
  background: #1a2c37;
  box-shadow: 0px 1px 0px 0px #253541 inset,
    0px 11px 0px 0px rgba(0, 0, 0, 0.14);
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
}
.modal-body {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 26px;
  margin-top: 38px;
  color: #b1bad3;
  font-family: PingFang SC;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
}

.hotkey-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.hotkey {
  padding-left: 15px;
  padding-right: 15px;
  padding-top: 5px;
  padding-bottom: 5px;
  color: #d5dceb;
  font-family: PingFang SC;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  border-radius: 4px;
  background: #2f4552;
  box-shadow: 0px 1px 0px 0px #394e5a inset, 0px 1px 2px 0px rgba(0, 0, 0, 0.28);
}

.hotkey-info {
  width: 468px;
  height: 75px;
  flex-shrink: 0;
  border-radius: 8px;
  border: 2px dashed #b1bad3;
  background: #0f212e;
  display: flex;
  padding: 18px;
  margin-top: -4px;
}

.hotkey-info img {
  margin-top: 4px;
}

.hotkey-info span {
  margin-left: 12px;
}
.modal__footer {
  margin-top: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #0f212e;
  margin-left: -16px;
  margin-right: -16px;
  margin-bottom: -16px;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  padding-top: 16px;
  padding-bottom: 18px;
}

.check-container {
  display: flex;
  position: relative;
  padding-left: 40px;
  padding-top: 5px;
  cursor: pointer;
  font-size: 22px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  color: #b1bad3;
  font-family: PingFang SC;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
}

.check-container input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

.checkmark {
  position: absolute;
  top: 0;
  left: 0;
  height: 24px;
  width: 24px;
  border-radius: 3px;
  border: 2px solid #2f4552;
  background: #0f212e;
  box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.25);
}

.check-container:hover input ~ .checkmark {
  border: 2px solid #557086;
}

.check-container input:checked ~ .checkmark {
  border: 2px solid #557086;
  background: #2f4552;
  box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.25);
}

.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

.check-container input:checked ~ .checkmark:after {
  display: block;
}

.check-container .checkmark:after {
  left: 9px;
  top: 5px;
  width: 5px;
  height: 10px;
  border: solid white;
  border-width: 0 3px 3px 0;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
}

.modal__footer span {
  color: #b1bad3;
  font-family: PingFang SC;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  margin-left: 8px;
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
