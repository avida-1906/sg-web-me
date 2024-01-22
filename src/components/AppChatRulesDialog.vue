<script lang="ts" setup>
const { companyData } = storeToRefs(useAppStore())
</script>

<template>
  <section class="modal-content-normal">
    <ol class="rules-content">
      <li v-for="r in 12" :key="r">
        <span>{{ $t(`chat_rule_${r}`, { site: companyData?.name }) }}</span>
      </li>
    </ol>
    <div class="text-center">
      {{ $t('chat_rule_full_title') }}
      <a>
        <span class="bold-text">{{ $t('chat_forum') }}</span>
        <BaseIcon name="uni-jump-page" />
      </a>
      {{ $t('chat_rule_find') }}
    </div>
  </section>
</template>

<style lang="scss" scoped>
.bold-text {
  font-weight: var(--tg-font-weight-semibold);
}
.modal-content-normal {
  padding-right: var(--tg-spacing-16);
  padding-left: var(--tg-spacing-16);
  display: flex;
  flex-direction: column;
  padding-bottom: var(--tg-spacing-16);
  gap: var(--tg-spacing-16);
  touch-action: auto;
  line-height: 1.5;
  color: var(--tg-secondary-light);
  font-size: var(--tg-font-size-default);
  font-weight: var(--tg-font-weight-normal);
  ol {
    list-style-type: decimal;
    list-style-position: inside;
    > *+* {
      margin-top: var(--tg-spacing-8);
    }
  }
  a {
    color: var(--tg-text-white);
    display: inline-flex;
    align-items: center;
    .app-svg-icon {
      font-size: var(--tg-font-size-xs);
    }
    .app-svg-icon {
      margin: 0 var(--tg-spacing-8);
    }
  }
  .center {
    display: inline-flex;
    flex-wrap: wrap;
  }
}
</style>
