<script setup lang='ts'>
import LeaderLine from 'vue3-leaderline'

const box1Ref = ref()
const box2Ref = ref()
const box3Ref = ref()
const box4Ref = ref()

let mainScroll: any
let line1: LeaderLine, line2: LeaderLine, line3: LeaderLine
function addEvent() {
  window.addEventListener('resize', eventCallback)
  mainScroll?.addEventListener('scroll', eventCallback, false)
}
function removeEvent() {
  window.removeEventListener('resize', eventCallback)
  mainScroll?.removeEventListener('scroll', eventCallback, false)
}
function eventCallback() {
  line1.position()
  line2.position()
  line3.position()
}
onMounted(() => {
  mainScroll = document.getElementById('main-content-scrollable')
  setTimeout(() => {
    line1 = new LeaderLine(box2Ref.value, box1Ref.value, {
      path: 'grid',
      color: '#FF9D00',
      size: 2,
      startSocket: 'top',
    })
    line2 = new LeaderLine(box3Ref.value, box1Ref.value, {
      path: 'straight',
      color: '#FF9D00',
      size: 2,
      startSocket: 'top',
    })
    line3 = new LeaderLine(box4Ref.value, box1Ref.value, {
      path: 'grid',
      color: '#FF9D00',
      size: 2,
      startSocket: 'top',
    })
    addEvent()
  }, 500)
})
onBeforeUnmount(() => {
  removeEvent()
})
</script>

<template>
  <div class="promotion_tutorial">
    <div ref="box1Ref" class="box1 box">
      box1
    </div>
    <div class="wrap">
      <div ref="box2Ref" class="box box2">
        box2
      </div>
      <div ref="box3Ref" class="box box3">
        box3
      </div>
      <div ref="box4Ref" class="box box4">
        box4
      </div>
    </div>
  </div>
</template>

<style lang='scss' scoped>
.box{
  width: 200px;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 30px;
}
.wrap{
  display: flex;
}
.box1{
  background-color: aliceblue;
  margin: 0 auto;
}
.box2{
  background-color: rgb(0, 136, 255);
}
.box3{
  background-color: rgb(38, 255, 150);
}
.box4{
  background-color: rgb(255, 53, 218);
}
</style>
