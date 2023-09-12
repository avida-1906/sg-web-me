<script setup lang='ts'>
interface MenuItem {
  title: string
  path: string
  icon: string
  list: {
    title: string
    path: string
    icon: string
  }[]
}
interface Props {
  staticMenu1: MenuItem[]
  staticMenu2: MenuItem[]
}
const props = defineProps<Props>()
function handleClickHead() { }
function handleClickItem() { }
</script>

<template>
  <div class="big-warp">
    <div class="inner-content scroll-y scroll-contain">
      <!-- 个人中心 -->
      <div class="menu-box">
        <div v-for="item, i in staticMenu1" :key="i">
          <BaseAccordion
            v-if="item.list.length" :menu-info="item" @click-head="handleClickHead"
            @click-item="handleClickItem"
          />
          <div v-else class="menu">
            <BaseIcon :name="item.icon" />
            <span>{{ item.title }}</span>
          </div>
        </div>
      </div>
      <!-- 赞助活动 -->
      <div class="menu-box">
        <div v-for="item, i in staticMenu2" :key="i">
          <BaseAccordion
            v-if="item.list.length" :menu-info="item" @click-head="handleClickHead"
            @click-item="handleClickItem"
          />
          <div v-else class="menu">
            <BaseIcon :name="item.icon" />
            <span>{{ item.title }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang='scss' scoped>
.big-warp {
  display: flex;
  overflow: hidden;
  flex-direction: column;
  align-content: flex-start;
  padding: 0;
  touch-action: pan-x;
  flex: 1;
  color: var(--tg-text-white);
  font-size: var(--tg-font-size-default);
}

.inner-content {
  padding: 16px;
  padding-right: 9.6px;
  display: flex;
  flex-direction: column;
  gap: var(--tg-spacing-8);

  .menu-box {
    display: flex;
    flex-direction: column;
    max-width: 100%;
    background-color: var(--tg-primary-main);
    border-radius: var(--tg-radius-default);
    overflow: hidden;

    .menu {
      display: flex;
      align-items: center;
      height: 45px;
      padding: 0 16px;
      cursor: pointer;

      &:hover {
        background-color: #213743;
      }

      span {
        padding-left: 6px;
      }
    }
  }
}
</style>
