<script setup lang="ts">
// 公告弹框和跑马灯
const {
  data: noticeData,
  runAsync: runMemberNoticeAllList,
  loading: memberNoticeAllListLoading,
} = useRequest(ApiMemberNoticeAllList)

await application.allSettled([runMemberNoticeAllList()])
</script>

<template>
  <!-- 滚动（跑马灯）消息 -->
  <div v-if="!memberNoticeAllListLoading && noticeData?.marquee.length" class="tg-mt-24">
    <BaseNoticeBar>
      <template #prefix>
        <div
          class="center"
          style="padding: 0 var(--tg-spacing-20);font-size: var(--tg-font-size-lg);"
        >
          <BaseIcon name="uni-speaker" />
        </div>
      </template>
      <template #default>
        <div style="display: flex;gap: 100px;">
          <span v-for="item of noticeData?.marquee" :key="item.id">{{
            item.content[getCurrentLanguageForBackend()] }}</span>
        </div>
      </template>
    </BaseNoticeBar>
  </div>
</template>

<style lang="scss" scoped>
</style>
