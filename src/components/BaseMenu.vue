<script lang="ts" setup>
interface Props {
  data: Array<BaseMenuItem>
}

interface BaseMenuItem {
  title: string
  path: string
  icon?: string
}

const props = defineProps<Props>()

const router = useRouter()
const route = useRoute()

const activeMenu = ref(route.path)

const activeIdx = computed(() => props.data.findIndex((item: BaseMenuItem) => item.path === activeMenu.value))
const percent = computed(() => activeIdx.value >= 0 ? activeIdx.value * 100 : 0)
const height = computed(() => (100 / props.data.length).toFixed(2))

function menuItemClick(item: BaseMenuItem) {
  activeMenu.value = item.path
  router.push(item.path)
}
</script>

<template>
  <section class="tg-base-menu">
    <div class="outer-wrapper">
      <div class="wrapper">
        <a v-for="item, idx in data" :key="idx" class="link" :class="{ active: activeMenu === item.path }" @click="menuItemClick(item)">
          <span class="content-or-loader"><span>{{ item.title }}</span></span>
        </a>
        <div class="dash" :style="{ height: `${height}%`, transform: `translateY(${percent}%)` }" />
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.tg-base-menu {
  position: sticky;
  top: 2em;
  max-width: 100%;
  min-width: 180px;
  background: var(--tg-secondary-dark);
  color: var(--tg-border-color-grey);
  border-radius: var(--tg-radius-md);
  .outer-wrapper {
    padding: var(--tg-spacing-8) 0;
    .wrapper {
      position: relative;
      .link {
        font-size: var(--tg-font-size-default);
        color: var(--tg-text-white);
        display: flex;
        width: 100%;
        padding: var(--tg-spacing-button-padding-vertical-md) var(--tg-spacing-button-padding-horizontal-md);
        align-items: center;
        justify-content: flex-start;
        appearance: none;
        margin: 0;
        border: none;
        font-weight: var(--tg-font-weight-semibold);
        &:hover, &.active {
          background: var(--tg-secondary-deepdark);
        }
      }
      .dash {
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
        width: 3px;
        background: var(--tg-text-blue);
        transition: all .2s ease-out;
      }
    }
  }
}
</style>
