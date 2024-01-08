<script setup>
const father = defineProps({
  tipMsg: {
    type: String,
    default: '',
    required: true,
  },
})
const show = ref(true)
const tipMsg = ref('')
function close() {
  show.value = false
}
setTimeout(() => {
  show.value = false
}, 5000)
onMounted(() => {
  console.log(father.tipMsg)
  tipMsg.value = father.tipMsg
})
</script>

<template>
  <div v-if="show" class="auto-bet-tip">
    <div class="tip-top-box">
      <div class="tip-top-img" />
      <div class="tip-top-msg">
        {{ tipMsg }}
      </div>
      <button @click="close">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14">
          <path
            d="M11.9934 3.5409L10.4593 2.00659L7.00002 5.4659L3.54093 2.00659L2.00684
            3.5409L5.46593 7L2.00684 10.4591L3.54093 11.9934L7.00024 8.53409L10.4593
            11.9934L11.9934 10.4591L8.53434 7L11.9934 3.5409Z"
            fill="#B1BAD3"
          />
        </svg>
      </button>
    </div>
    <div class="tip-bottom-process" />
  </div>
</template>

<style scoped>
.auto-bet-tip {
  z-index: 999;
  /* position: absolute;
  left: 15px;
  top: 80px; */
  border-radius: 4px;
  background: #2F4552;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  width: 246px;
  height: 55px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  animation: bounceInLeft 0.5s 1 cubic-bezier(0.215, 0.610, 0.355, 1.000)
}

.tip-top-img {
  width: 60px;
  height: 55px;
  flex-shrink: 0;
  border-radius: 4px 0px 0px 4px;
  background: #213743 url('../assets/autoBetTip.svg') center center no-repeat;
}

.tip-top-box button {
  position: relative;
  padding: 20px;
}

button:hover svg {
  fill: #fff;
}

.tip-top-msg {
  width: 100%;
  background: #2F4552;
  color: #FFF;
  text-align: center;
  font-family: PingFang SC;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 52px;
}

.tip-top-box {
  display: flex;
  flex-direction: row;
  height: 52px;
}

.tip-bottom-process {
  border-radius: 0px 0px 0px 4px;
  background: #557086;
  width: 0;
  height: 3px;
  flex-shrink: 0;
  animation-name: scaleDraw1;
  /*关键帧名称*/
  animation-timing-function: ease-in-out;
  /*动画的速度曲线*/
  animation-iteration-count: 1;
  /*动画播放的次数*/
  animation-duration: 5s;
}

@keyframes scaleDraw1 {

  /*定义关键帧、scaleDrew是需要绑定到选择器的关键帧名称*/
  0% {
      width:100%;
      /*开始为原始大小*/
  }

  100% {
      width:0%;
  }

}
@keyframes bounceInLeft {
0% {
  opacity: 0;
  transform: translate3d(-3000px, 0, 0);
}

100% {
  transform: none;
}
}
</style>
