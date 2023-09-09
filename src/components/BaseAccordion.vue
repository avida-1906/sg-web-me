<script setup lang="ts">
interface Props {
  menuInfo: any
}
withDefaults(defineProps<Props>(), {
  menuInfo: () => {
    return {
      title: '',
      icon: '',
      list: [],
    }
  },
})
// const emit = defineEmits(['clickItem'])
const isShow = ref(false)
function handleClickHeader() {
  isShow.value = !isShow.value
}
</script>

<template>
  <div class="base-accordion">
    <div class="accordion-header" :style="isShow ? 'background-color: #213743;' : ''" @click="handleClickHeader">
      <div class="flex-center">
        <BaseIcon :name="menuInfo.icon" />
        <span class="header-title">{{ menuInfo.title }}</span>
      </div>
      <BaseIcon v-if="isShow" name="uni-arrow-down" />
      <BaseIcon v-else name="uni-arrow-right" />
    </div>
    <div class="accordion-content" :style="`max-height:${isShow ? '1000px' : 0};transition: max-height ${isShow ? '1' : '0.3'}s;`">
      <div v-for="item of menuInfo.list" :key="item.id" class="content-item">
        <BaseIcon :name="item.icon" />
        <span class="header-title">{{ item.title }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.base-accordion{
  color: var(--tg-text-white);
  // width: 220px;
  background-color: #1A2C38;
  // background-color: #213743;
  .accordion-header{
    display: flex;
    height: 45px;
    padding: 0 16px;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
  }
  .accordion-header:hover{
    background-color: #213743;
  }
  .flex-center{
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .accordion-content{
    max-height: 0;
    overflow: hidden;
    // transition: max-height 0.8s;
    background-color:var(--tg-secondary-grey);
    .content-item{
      height: 45px;
      display: flex;
      padding-left: 16px;
      align-items: center;
      cursor: pointer;
    }
    .content-item:hover{
      background-color: var(--tg-secondary-main);
    }
    .content-item:first-child{
      border-top: 2px solid var(--tg-secondary-main);
    }
  }
  .header-title{
    padding-left: 6px;
  }
}
</style>
