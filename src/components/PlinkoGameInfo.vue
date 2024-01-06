<script>
export default {
  methods: {
    hideModal() {
      const modal = document.getElementById('gameinfo-modal')
      modal.classList.toggle('active')
    },
  },
}
</script>

<template>
  <div id="gameinfo-modal" class="modal">
    <div class="modal__content">
      <div class="modal-title">
        <img src="/png/mini/plinko/info.png" alt="Image" width="16" height="16">
        <span>{{ $t("plinko_info") }}</span>
      </div>
      <div class="modal__footer">
        <button class="activeButton" @click="setMaximum">
          {{ $t("plinko_rules") }}
        </button>
      </div>
      <div class="modal-body">
        <span>{{ $t("plinko_info1") }}</span>
        <span>{{ $t("plinko_info2") }}</span>
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
  width: 106px;
  height: 54px;
  flex-shrink: 0;
  border-radius: 30px;
  background: #223d49;
  border: 5px solid #0a1e29;
  color: #fff;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
}
.modal__content {
  position: relative;
  width: 500px;
  max-width: 90%;
  padding: 1em 2em;
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
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
}
.modal-body {
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  justify-content: space-between;
  gap: 10px;
  margin-top: 30px;
  color: #b1bad3;
  font-size: 16px;
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
