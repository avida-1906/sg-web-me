<script lang="ts" setup>
interface Props {
  description?: string
  icon?: string
}

const props = withDefaults(defineProps<Props>(), {
  showDescription: true,
  icon: 'spt-user-bet',
})

const { t } = useI18n()

const emptyDescription = computed(
  () => props.description || t('no_articles_to_display'),
)
</script>

<template>
  <div class="base-empty">
    <div class="base-empty-icon">
      <slot v-if="$slots.icon" name="icon" />
      <BaseIcon v-else class="base-empty-icon-name" :name="icon" />
    </div>
    <div class="base-empty-description">
      <slot v-if="$slots.description" name="description" />
      <p v-else>
        {{ emptyDescription }}
      </p>
    </div>
    <div v-if="$slots.default" class="base-empty-extra">
      <slot />
    </div>
  </div>
</template>

<style>
:root{
  --tg-empty-text-padding: var(--tg-spacing-5) 0 var(--tg-spacing-10);
}
</style>

<style lang="scss" scoped>
.base-empty {
  text-align: center;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: flex-start;
  padding: var(--tg-spacing-16);

  &-icon {
    display: flex;
    &-name {
      font-size: var(--tg-empty-icon-size);
    }
  }

  &-description {
    padding: var(--tg-empty-text-padding);
    font-size: var(--tg-font-size-default);
    color: var(--tg-secondary-light);
  }
}
</style>
