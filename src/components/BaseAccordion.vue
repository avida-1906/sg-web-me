<script setup lang="ts">
interface Props {
  menuInfo: any
  autoShow?: boolean
}
const props = withDefaults(defineProps<Props>(), {
  menuInfo: () => {
    return {
      title: '',
      icon: '',
      list: [],
    }
  },
  autoShow: false,
})
const emit = defineEmits(['clickHead', 'clickItem'])
const isShow = ref(props.autoShow)
function handleClickHeader() {
  isShow.value = !isShow.value
  emit('clickHead', props.menuInfo)
}
function handleClickItem(item: any) {
  emit('clickItem', item)
}
const showDown = computed(() => {
  return props.menuInfo?.list?.length
})
</script>

<template>
  <div class="base-accordion" :class="{ 'only-accordion': !isShow }">
    <div class="accordion-header" :style="isShow ? 'background-color: #213743;' : ''" @click="handleClickHeader">
      <div class="flex-center">
        <BaseIcon :name="menuInfo.icon" />
        <span class="header-title">{{ menuInfo.title }}</span>
      </div>
      <template v-if="showDown">
        <BaseIcon v-if="isShow" name="uni-arrow-down" />
        <BaseIcon v-else name="uni-arrow-right" />
      </template>
    </div>
    <div v-if="showDown" class="accordion-content" :style="`max-height:${isShow ? '1000px' : 0};transition: max-height ${isShow ? '1' : '0.3'}s;`">
      <div class="content-line" />
      <div v-for="item of menuInfo.list" :key="item.id" class="content-item" @click="handleClickItem(item)">
        <BaseIcon :name="item.icon" />
        <span class="header-title">{{ item.title }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.base-accordion{
  color: var(--tg-text-white);
  background-color: #1A2C38;
  font-weight: var(--tg-font-weight-semibold);
  // background-color: #213743;
  .accordion-header{
    display: flex;
    height: 45px;
    padding: 0 16px;
    border-radius: var(--tg-radius-default) var(--tg-radius-default) 0 0;
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
    .content-line{
      background: var(--tg-secondary-main);
      height: 2px;
      width: 100%;
    }
    .content-item{
      height: 45px;
      display: flex;
      border-radius: var(--tg-radius-default);
      padding-left: 16px;
      align-items: center;
      cursor: pointer;
    }
    .content-item:hover{
      background-color: var(--tg-secondary-main);
    }
  }
  .header-title{
    padding-left: 6px;
  }
}
.only-accordion{
  border-radius:0 0 var(--tg-radius-default) var(--tg-radius-default);
  overflow:  hidden;
}
</style>
