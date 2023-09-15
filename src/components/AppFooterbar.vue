<script setup lang="ts">
// interface Props {
//
// }
// withDefaults(defineProps<Props>(), {
//
// })
const tabbar = ref([
  { title: '浏览', icon: 'tabbar-menu', name: 'menu' },
  { title: '娱乐城', icon: 'tabbar-game', name: 'game' },
  { title: '投注', icon: 'tabbar-bet', name: 'bet' },
  // { title: '投注单', icon: 'spt-user-bet' },
  { title: '体育', icon: 'tabbar-sport', name: 'sport' },
  { title: '聊天室', icon: 'tabbar-chat', name: 'chat' },
])
const activeBar = ref('menu')
</script>

<template>
  <div class="app-bottombar">
    <div v-for="item of tabbar" :key="item.icon" class="bar-item" :class="{ 'active-bar': activeBar === item.name }">
      <div class="bar-btn" @click.stop="activeBar = item.name">
        <BaseIcon class="bar-icon" :name="item.icon" />
        <span>{{ item.title }}</span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.app-bottombar {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 68px;
  display: grid;
  z-index: var(--tg-z-index-50);
  padding: 0 16px;
  grid-template-columns: repeat(5,1fr);
  justify-items: center;
  line-height: 1;
  background: var(--tg-secondary-dark);
  box-shadow: 0 5px 5px #0a1c2766;
  overflow: hidden;
  .bar-item{
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    .bar-btn{
      display: flex;
      justify-content: center;
      flex-direction: column;
      flex-wrap: nowrap;
      align-items: center;
      cursor: pointer;
      &:active{
        transform: scale(0.9);
      }
    }
    .bar-icon{
      font-size: var(--tg-font-size-md);
    }
    span{
      font-size: var(--tg-font-size-xs);
      color:var(--tg-text-white);
      font-weight: var(--tg-font-weight-semibold);
      padding-top: 3px;
    }

  }
  .active-bar{
    --tg-icon-color: var(--tg-text-lightblue);
    position: relative;
    &:before{
      content: "";
      position: absolute;
      top: 0;
      min-height: 4px;
      width: 60%;
      background-color: var(--tg-text-lightblue);
    }
  }
}
</style>
