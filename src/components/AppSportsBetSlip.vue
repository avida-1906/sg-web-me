<script setup lang='ts'>
const type = ref('1')
const options = [
  { label: '投注单', value: '1', num: 5, icon: 'spt-user-bet' },
  { label: '我的投注', value: '2', num: 4, icon: 'navbar-user-bet' },
]
</script>

<template>
  <div class="app-sports-bet-slip">
    <div class="header">
      <div class="navigation-header">
        <BaseSelect v-model="type" style="--tg-base-select-hover-bg-color:var(--tg-secondary-dark);" :options="options" no-hover popper>
          <template #label="{ data }">
            <div class="type-select">
              <BaseIcon :name="data?.icon" />
              <span>{{ data?.label }}</span>
            </div>
          </template>
          <template #option="{ data: { item } }">
            {{ item }}
          </template>
        </BaseSelect>
        <BaseButton bg-style="dark" round>
          <BaseIcon name="uni-close" />
        </BaseButton>
      </div>
    </div>
    <div class="bet-list">
      123
    </div>
    <div class="footer">
      123
    </div>
  </div>
</template>

<style lang='scss' scoped>
.app-sports-bet-slip {
  color: var(--tg-text-white);
  height: 100%;
  display: flex;
  flex-direction: column;
}

.header {
  display: grid;
  grid-auto-flow: row;
  place-content: stretch;
  .navigation-header{
    background: var(--sidebar-header-background);
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: var(--header-height);
    z-index: 2;
    position: relative;
    box-shadow: var(--shadows-lg);
    touch-action: none;
    padding-right: var(--scrollbar-size);
    padding-left: var(--spacing-1);
    .type-select{
      display: flex;
      span{
        margin-left: var(--tg-spacing-8);
      }
    }
  }
}

.bet-list {
  width: 100%;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  overflow: hidden;
}

.footer {
  display: grid;
  padding: var(--tg-spacing-16);
  row-gap: var(--tg-spacing-12);
  background: var(--tg-secondary-grey);
  grid-template-rows: auto;
  grid-auto-flow: row;
}
</style>
