<script>
import { mutations, store } from '../../core/Store'

export default {

  setup() {
    const hideModal = () => {
      mutations.showMaxValueModal()
    }

    const setMaximum = () => {
      hideModal()
      mutations.showMaximum(!store.isMaximum)
    }
    return {
      hideModal,
      setMaximum,
    }
  },
  computed: {
    showMax() {
      return store.isMaximum
    },
    showMaxValueModal() {
      return store.showMaxValueModal
    },
  },
}
</script>

<template>
  <div class="modal" :class="[showMaxValueModal ? 'active' : '']">
    <div class="modal__content">
      <div class="modal-title">
        <img
          src="/png/mini/plinko/max-setting.svg"
          alt="Image"
          width="16"
          height="16"
        >
        <span>{{ $t("plinko_maxvalue") }}</span>
      </div>
      <div class="modal-body">
        <span>{{ showMax ? $t("plinko_maxquestion2") : $t("plinko_maxquestion1") }}</span>
      </div>
      <div class="modal__footer">
        <button class="activeButton" @click="setMaximum">
          <span>{{ showMax ? $t("plinko_turnOff") : $t("plinko_turnOn") }}</span>
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
.modal.active {
  visibility: visible;
  opacity: 1;
}
.modal:target {
  visibility: visible;
  opacity: 1;
}

.activeButton {
  width: 68px;
  height: 44px;
  flex-shrink: 0;
  border: none;
  border-radius: 4px;
  background: #17e702;
  color: #05080a;
  font-family: PingFang SC;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
}
.activeButton:hover {
  background-color: #1fff20;
}
.modal__content {
  border-radius: 4px;
  position: relative;
  width: 500px;
  max-width: 90%;
  background: #1a2c37;
  padding: 16px;
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
  align-items: center;
  justify-content: center;
  margin-top: 30px;
  color: #b1bad3;
  font-family: PingFang SC;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
}
.modal__footer {
  margin-top: 20px;
  display: flex;
  align-items: center;
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
</style>
