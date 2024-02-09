<script>
import { ref } from 'vue'
import { mutations, store } from '../../core/Store'

export default {

  setup() {
    const stmodal = ref(null)
    const typeFlag = ref(false)
    const gameTypeFlag = ref(false)
    const showRaceFlag = ref(false)
    const modalType = ref('type1')
    const gameType = ref('type1')

    const hideModal = () => {
      mutations.showStatistics()
      typeFlag.value = false
      gameTypeFlag.value = false
      showRaceFlag.value = false
    }

    const showType = () => {
      typeFlag.value = !typeFlag.value
      gameTypeFlag.value = false
      showRaceFlag.value = false
    }

    const showGameType = () => {
      gameTypeFlag.value = !gameTypeFlag.value
      typeFlag.value = false
      showRaceFlag.value = false
    }

    const showRaceTooltip = () => {
      showRaceFlag.value = !showRaceFlag.value
      typeFlag.value = false
      gameTypeFlag.value = false
    }

    const changeModalType = (req) => {
      modalType.value = req
      typeFlag.value = false
    }

    const changeGameType = (req) => {
      gameType.value = req
      gameTypeFlag.value = false
    }
    return {
      stmodal,
      typeFlag,
      gameTypeFlag,
      showRaceFlag,
      modalType,
      gameType,
      hideModal,
      showType,
      showGameType,
      showRaceTooltip,
      changeModalType,
      changeGameType,
    }
  },
  data() {
    return {
      typeSrc: '/png/mini/plinko/arrow-down.svg',
      gameTypeSrc: '/png/mini/plinko/arrow-down.svg',
      tooltipSrc: '/png/mini/plinko/arrow-down.svg',
      dragging: false,
      startX: 0,
      startY: 0,
      offsetX: 0,
      offsetY: 0,
    }
  },
  computed: {
    showStatistics() {
      return store.showStatistics
    },
  },

  methods: {
    handleMouseOut() {
      this.typeSrc = '/png/mini/plinko/arrow-down.svg'
      this.gameTypeSrc = '/png/mini/plinko/arrow-down.svg'
      this.tooltipSrc = '/png/mini/plinko/arrow-down.svg'
    },
    handleMouseOver(button) {
      switch (button) {
        case 'type':
          this.typeSrc = '/png/mini/plinko/arrow-down-hover.svg'
          break
        case 'gameType':
          this.gameTypeSrc = '/png/mini/plinko/arrow-down-hover.svg'
          break
        case 'tooltip':
          this.tooltipSrc = '/png/mini/plinko/arrow-down-hover.svg'
          break
      }
    },
    startDrag(event) {
      this.dragging = true
      this.startX = event.clientX
      this.startY = event.clientY
      this.offsetX = event.target.offsetLeft
      this.offsetY = event.target.offsetTop
      console.log(event.clientX, event.clientY)
    },
    drag(event) {
      if (this.dragging) {
        const dx = event.clientX - this.startX
        const dy = event.clientY - this.startY
        this.$refs.stmodal.style.left = `${this.offsetX + dx}px`
        this.$refs.stmodal.style.top = `${this.offsetY + dy}px`
      }
    },
    stopDrag() {
      this.dragging = false
    },
  },
}
</script>

<template>
  <div class="modal" :class="[showStatistics ? 'active' : '']">
    <div class="modal__content">
      <div
        class="modal-title"
        @mousedown="startDrag"
        @mousemove="drag"
        @mouseup="stopDrag"
      >
        <img src="/png/mini/plinko/total.svg" alt="Image" width="16" height="16">
        <span>{{ $t("plinko_statistics") }}</span>
      </div>
      <div class="modal-body">
        <div class="type-container">
          <div class="dropdown">
            <button
              class="type-selector"
              @click="showType"
              @mouseover="handleMouseOver('type')"
              @mouseout="handleMouseOut()"
            >
              <span>
                {{ $t(modalType) }}
                <img
                  :src="typeSrc"
                  width="14"
                  height="14"
                  alt="Image"
                  :class="typeFlag ? 'rotate' : ''"
                >
              </span>
            </button>
            <div v-if="typeFlag" class="dropdown-content">
              <button
                class="contents" :class="[
                  modalType === 'type1' ? 'unactivecontent' : 'activecontent',
                ]"
                @click="changeModalType('type1')"
              >
                <span :class="modalType === 'type1' ? 'active' : ''">{{
                  $t("plinko_type1")
                }}</span>
              </button>
              <button
                class="contents" :class="[
                  modalType === 'type2' ? 'unactivecontent' : 'activecontent',
                ]"
                @click="changeModalType('type2')"
              >
                <span :class="modalType === 'type2' ? 'active' : ''">{{
                  $t("plinko_type2")
                }}</span>
              </button>
              <button
                class="contents" :class="[
                  modalType === 'type3' ? 'unactivecontent' : 'activecontent',
                ]"
                @click="changeModalType('type3')"
              >
                <span :class="modalType === 'type3' ? 'active' : ''">{{
                  $t("plinko_type3")
                }}</span>
              </button>
              <button
                class="contents" :class="[
                  modalType === 'type4' ? 'unactivecontent' : 'activecontent',
                ]"
                @click="hideModal"
              >
                <span :class="modalType === 'type4' ? 'active' : ''">{{
                  $t("plinko_type4")
                }}</span>
              </button>
              <div class="triangle" />
            </div>
          </div>
          <img src="/png/mini/plinko/refresh.svg" alt="Image" width="14" height="14">
        </div>
        <div
          v-if="modalType === 'type1' || modalType === 'type2'"
          class="dropdown"
        >
          <button
            class="game-selector"
            @click="showGameType"
            @mouseover="handleMouseOver('gameType')"
            @mouseout="handleMouseOut()"
          >
            <span>{{ gameType === 'type1' ? $t("plinko_type1") : "Plinko" }}</span>
            <img
              :src="gameTypeSrc"
              width="14"
              height="14"
              alt="Image"
              :class="gameTypeFlag ? 'rotate' : ''"
            >
          </button>
          <div v-if="gameTypeFlag" class="dropdown-content">
            <button
              class="contents" :class="[
                gameType === 'type1' ? 'unactivecontent' : 'activecontent',
              ]"
              @click="changeGameType('type1')"
            >
              <span :class="gameType === 'type1' ? 'active' : ''">
                {{ $t("plinko_type1") }}
              </span>
            </button>
            <button
              class="contents" :class="[
                gameType === 'type2' ? 'unactivecontent' : 'activecontent',
              ]"
              @click="changeGameType('type2')"
            >
              <span :class="gameType === 'type2' ? 'active' : ''">
                Plinko
              </span>
            </button>
            <div class="triangle" />
          </div>
        </div>
        <div
          v-if="modalType === 'type1' || modalType === 'type2'"
          class="score"
        >
          <div class="left">
            <span>{{ $t("plinko_left1") }}</span>
            <span class="number success">
              0.00000000
              <img src="/png/mini/plinko/bit.svg" width="14" height="14" alt="Image">
            </span>
            <span>{{ $t("plinko_left2") }}</span>
            <span class="number">
              0.00000000
              <img src="/png/mini/plinko/bit.svg" width="14" height="14" alt="Image">
            </span>
          </div>
          <div class="right">
            <span>{{ $t("plinko_right1") }}</span>
            <span class="number success"> 8 </span>
            <span>{{ $t("plinko_right2") }}</span>
            <span class="number failed"> 7 </span>
          </div>
        </div>
        <div
          v-if="modalType === 'type1' || modalType === 'type2'"
          class="content"
        >
          <div class="line" />
        </div>
        <div
          v-if="modalType === 'type1' || modalType === 'type3'"
          class="race"
        >
          <div class="dropdown">
            <button
              @click="showRaceTooltip"
              @mouseover="handleMouseOver('tooltip')"
              @mouseout="handleMouseOut()"
            >
              <span>
                $100,000 竞赛 — 24小时
                <img
                  :src="tooltipSrc"
                  width="14"
                  height="14"
                  alt="Image"
                  :class="showRaceFlag ? 'rotate' : ''"
                >
              </span>
            </button>
            <div
              v-if="showRaceFlag"
              class="dropdown-content"
              :style="{ padding: 0 }"
            >
              <button
                class="unactivecontent contents"
                :style="{ margin: 0 }"
              >
                <span class="active"> $100,000 竞赛 — 24小时 </span>
              </button>
              <div class="triangle" />
            </div>
          </div>
          <span class="racebottom">{{ $t("plinko_racespan") }}</span>
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
  right: 50px;
  bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
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

.modal__content {
  position: relative;
  width: 280px;
  border-radius: 8px;
  background: #1a2c37;
  box-shadow: 0px 1px 0px 0px #253541 inset,
    0px 11px 0px 0px rgba(0, 0, 0, 0.14);
}
.active {
  color: #1475e1 !important;
}
.modal-title {
  display: flex;
  gap: 10px;
  align-items: center;
  color: #fff;
  font-family: PingFang SC;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  border-radius: 8px 8px 0px 0px;
  background: #1a2c37;
  padding: 1em 1em;
}
.modal-body {
  flex-shrink: 0;
  border-radius: 0px 0px 8px 8px;
  background: #213743;
  padding: 12px 16px;
  box-shadow: 0px 13px 29px 0px rgba(0, 0, 0, 0.1),
    0px 53px 53px 0px rgba(0, 0, 0, 0.09),
    0px 120px 72px 0px rgba(0, 0, 0, 0.05),
    0px 213px 85px 0px rgba(0, 0, 0, 0.01), 0px 333px 93px 0px rgba(0, 0, 0, 0);
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.dropdown {
  position: relative;
  display: inline-block;
}
.racebottom {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%);
}
.dropdown-content {
  position: absolute;
  background: #fff;
  border-radius: 4px;
  z-index: 1;
  bottom: -5px;
  left: 50%;
  transform: translate(-50%, 100%);
  padding-top: 7px;
  padding-bottom: 5px;
}
.dropdown-content .triangle {
  position: absolute;
  top: -5px;
  left: 50%;
  width: 10px;
  height: 10px;
  background: #fff;
  transform: translateX(-50%) rotate(45deg);
}

.dropdown-content .contents {
  color: black;
  padding: 9px 12px;
  text-decoration: none;
  display: flex;
  align-items: center;
  width: 100%;
  background: transparent;
  border: none;
  cursor: pointer;
}

.dropdown-content .contents span {
  color: #2f4552;
  font-family: PingFang SC;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  letter-spacing: -0.84px;
  white-space: nowrap;
}

.modal__close {
  position: absolute;
  top: 18px;
  right: 12px;
  text-decoration: none;
  background-color: transparent;
  border: none;
}

.score {
  width: 100%;
  height: 120px;
  flex-shrink: 0;
  border-radius: 4px;
  background: #0f212e;
  display: flex;
}

.score .left {
  display: flex;
  flex-direction: column;
  gap: 6px;
  border-right: 2px solid #213743;
  margin: 15px;
  padding-right: 35px;
}

.score .right {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin: 15px;
}

span {
  color: #b1bad3;
  font-family: PingFang SC;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  display: flex;
  align-items: baseline;
  gap: 5px;
}

.number {
  color: #fff;
  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
}
.success {
  color: #17e700;
}

.failed {
  color: #ed4163;
}
.content {
  width: 100%;
  height: 220px;
  flex-shrink: 0;
  border-radius: 4px;
  background: #0f212e;
  position: relative;
}

.rotate {
  transform: rotate(180deg);
}
.race {
  width: 100%;
  height: 155px;
  border-radius: 4px;
  background: #0f212e;
  position: relative;
}

.race button {
  color: #fff;
  font-family: Proxima Nova;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  background: transparent;
  border: none;
  margin-top: 16px;
  margin-left: 16px;
}

.line {
  width: 86%;
  height: 1px;
  position: absolute;
  bottom: 10px;
  margin-left: 7%;
  background: #4b5259;
}
.type-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.type-selector {
  flex-shrink: 0;
  border-radius: 4px;
  background: #0f212e;
  position: relative;
  border: none;
  padding: 10px 16px;
  color: #fff;
  font-family: PingFang SC;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
}

.type-selector:hover {
  background: #0a1623;
}

button span {
  display: flex;
  align-items: center;
  color: #fff;
}
.unactivecontent:hover {
  background: transparent !important;
}
.activecontent:hover {
  background: #b1bad3 !important;
}
.game-selector {
  flex-shrink: 0;
  border-radius: 4px;
  background: #0f212e;
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 16px;
  border: none;
  width: 100%;
}
.game-selector:hover {
  background: #0a1623;
}
.baseStyle {
  width: 100%;
  height: 40px;
  background-color: #0f212e;
  border: none;
  border-radius: 4px;
  color: #fff;
}
select {
  box-sizing: border-box;
  width: 100%;
  padding-left: 8px;
  appearance: none;
  -moz-appearance: none;
  -webkit-appearance: none;
}
.arrow-down {
  position: absolute;
  top: 13px;
  right: 10px;
}
</style>
