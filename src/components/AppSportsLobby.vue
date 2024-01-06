<script setup lang='ts'>
defineProps<{ marketType: string }>()

const {
  lobbyCurrentEventType,
  sportsEventTypeList,
} = storeToRefs(useSportsStore())

// 统一加载tab中的网络icon
function loadIcon() {
  return new Promise((resolve) => {
    let a = 0
    const t = setInterval(() => {
      a++
      if (sportsEventTypeList.value && sportsEventTypeList.value.length > 0) {
        clearInterval(t)
        const arr1 = sportsEventTypeList.value.map((a) => {
          return application.loadImage(a.icon)
        })
        const arr2 = sportsEventTypeList.value.map((a) => {
          return application.loadImage(a.icon_hl)
        })
        Promise.allSettled([arr1, arr2]).then((result) => {
          resolve(result)
        })
      }
      else if (a > 300 || !sportsEventTypeList.value) {
        clearInterval(t)
        resolve(true)
      }
    }, 50)
  })
}

await application.allSettled([loadIcon()])
</script>

<template>
  <!-- 大厅 -->
  <template v-if="marketType === 'all'">
    <div class="lobby">
      <div class="types">
        <AppSportsEventTypeTab
          v-model="lobbyCurrentEventType"
          :list="sportsEventTypeList ?? []"
        />
        <!-- <AppSportsMarketTypeSelect
          v-model="currentLiveBetType" :is-standard="isStandard"
          :base-type-options="baseTypeOptions"
        /> -->
      </div>
    </div>
    <AppSportsPageLive on-page on-lobby />
    <AppSportsHotEvent />
  </template>
  <!-- 我的投注 -->
  <AppSportsPageMyBet
    v-else-if="marketType === 'my-bet'" on-page
  />
  <!-- 收藏夹 -->
  <AppSportsPageFavourites v-else-if="marketType === 'fav'" on-page />
  <!-- 滚球 -->
  <!-- <AppSportsPageLive v-else-if="marketType === 'live'" on-page /> -->
  <!-- 即将开赛 -->
  <!-- <AppSportsPageUpcoming v-else-if="marketType === 'soon'" on-page /> -->
</template>

<style lang='scss' scoped>
.lobby{
  width: 100%;
  .types{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: var(--tg-spacing-12);
  }
}
</style>
