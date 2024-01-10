<script lang="ts" setup>
usePageTitle({ prefix: 'transaction_archive', isT: true })

const data = reactive([])
</script>

<template>
  <section class="tg-archive-record-page">
    <div class="record-content">
      <div v-if="data && data.length" class="scroll-x table-wrapper bet-record">
        <table class="table">
          <thead />
          <tbody>
            <tr>
              <td class="table-cell">
                <div class="row-wrap">
                  <div class="col header-stack">
                    <span>2023年8月29日</span>
                    <span>9 项投注</span>
                  </div>
                </div>
              </td>
              <td class="table-cell">
                <div class="row-wrap right">
                  <div class="col">
                    <a class="link">
                      <span>{{ $t('download') }}</span>
                      <BaseIcon name="uni-jump-page" />
                    </a>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-else>
        <BaseEmpty :description="$t('empty_archive')" icon="empty-1" />
      </div>
    </div>
    <div class="page-stack-wrap tg-mt-24">
      <AppStack />
    </div>
  </section>
</template>

<style lang="scss" scoped>
.record-content {
  --tg-empty-text-padding: 16px 0 0 0;
}
.line-height-1-5 {
  line-height: 1.5;
}
.link {
  text-decoration: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  margin: 0;
  padding: 0;
  background: 0 0;
  border: none;
  font-size: inherit;
  line-height: inherit;
  cursor: pointer;
  font-weight: 600;
  touch-action: manipulation;
  position: relative;
  display: inline-flex;
  justify-content: flex-start;
  align-items: center;
  -webkit-tap-highlight-color: transparent;
  transition: background-color var(0.2s),color var(0.2s);
  flex-shrink: 0;
  border-radius: var(--tg-radius-default);
}
.table-wrapper {
  overflow-x: auto;
  overflow-anchor: none;
  max-width: 100%;
  position: relative;
}
.row-wrap {
  display: flex;
  align-items: center;
  &.right {
    justify-content: flex-end;
    flex-direction: column;
    align-items: flex-end;
    .col {
      align-items: center;
    }
  }
}
.icon-wrap {
  margin-right: var(--tg-spacing-8);
  font-size: var(--tg-font-size-base);
}
.col {
  display: flex;
  gap: var(--tg-spacing-4);
}
.col.header-stack {
  flex-direction: column;
  white-space: pre-line;
}
.table {
  width: 100%;
  position: relative;
  z-index: 2;
  transform-style: preserve-3d;
  border-collapse: separate;
  overflow-x: scroll;
  > thead {
    position: relative;
    transform: translateZ(1px);
  }
  > tbody {
    position: relative;
    animation-fill-mode: forwards!important;
    animation-duration: .35s!important;
    animation-timing-function: ease-out!important;
    will-change: transform;
    tr:nth-child(odd) {
      background: var(--tg-secondary-grey);
    }
  }
  td, th {
    padding: var(--tg-spacing-16);
    word-wrap: break-word;
    white-space: nowrap;
    text-align: center;
    vertical-align: middle;
    color: var(--tg-secondary-light);
    font-size: var(--tg-font-size-default);
  }
  td:first-child, th:first-child {
    text-align: left;
    border-top-left-radius: var(--tg-radius-default);
    border-bottom-left-radius: var(--tg-radius-default);
  }
}
</style>

<route lang="yaml">
  </route>
