<script>
export default {
  props: {
    isMaximum: {
      type: Boolean,
      required: true,
    },
  },

  methods: {
    hideModal() {
      const modal = document.getElementById('demo-modal')
      modal.classList.toggle('active')
    },
    setMaximum() {
      this.$emit('update:isMaximum', !this.isMaximum)
      this.hideModal()
      if (!this.isMaximum) {
        document.getElementById('times1').style.display = 'none'
        document.getElementById('times2').style.display = 'flex'
        document.getElementById('timesmax').style.display = 'flex'
        if (window.innerWidth > 1050)
          document.getElementById('bitImage').style.right = '170px'
        else
          document.getElementById('bitImage').style.right = '180px'
      }
      else {
        document.getElementById('times1').style.display = 'flex'
        document.getElementById('times2').style.display = 'none'
        document.getElementById('timesmax').style.display = 'none'
        document.getElementById('bitImage').style.right = '100px'
      }
    },
  },
}
</script>

<template>
  <div id="demo-modal" class="modal">
    <div class="modal__content">
      <div class="modal-title">
        <img
          src="/png/mini/plinko/max-setting.png"
          alt="Image"
          width="16"
          height="16"
        >
        <span>{{ $t("plinko_maxvalue") }}</span>
      </div>
      <div class="modal-body">
        <span>{{
          isMaximum ? $t("plinko_maxquestion2") : $t("plinko_maxquestion1")
        }}</span>
      </div>
      <div class="modal__footer">
        <button class="activeButton" @click="setMaximum">
          {{ isMaximum ? $t("plinko_turnOff") : $t("plinko_turnOn") }}
        </button>
      </div>
      <a href="#" class="modal__close" @click="hideModal">&times;</a>
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
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
}
.modal__content {
  border-radius: 4px;
  position: relative;
  width: 500px;
  max-width: 90%;
  background: #1a2c37;
  padding: 1em 2em;
}

.modal-title {
  display: flex;
  gap: 10px;
  align-items: center;
  color: #fff;
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
}
</style>
