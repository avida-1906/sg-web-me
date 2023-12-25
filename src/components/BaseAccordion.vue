<script setup lang="ts">
import type { MenuItem } from '~/composables/useApiMenuData'

interface Props {
  menuInfo: any
  autoShow?: boolean
  domId?: string
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

const emit = defineEmits(['clickHead', 'clickItem', 'radioChange'])

const { bool: isShow, setBool: setAutoShowBool } = useBoolean(props.autoShow)

const radioValue = ref(props.menuInfo.value === void 0 ? '' : props.menuInfo.value)

const showDown = computed(() => {
  return props.menuInfo?.list?.length
})

function handleClickHeader() {
  setAutoShowBool(!isShow.value)
  emit('clickHead', props.menuInfo)
}
function handleClickItem(item: any) {
  emit('clickItem', item)
}
function close() {
  setAutoShowBool(false)
}

watch(() => props.menuInfo.value, (val) => {
  radioValue.value = val
})

watch(radioValue, (val) => {
  emit('radioChange', val)
})

defineExpose({ close })
</script>

<template>
  <div class="base-accordion" :class="{ 'only-accordion': !isShow }">
    <div
      :id="domId"
      class="accordion-header"
      :style="isShow ? 'background-color: #213743;' : ''"
      @click="handleClickHeader"
    >
      <div class="title flex-center" style="--app-sport-image-error-icon-size:14px;">
        <AppImage
          v-if="menuInfo.useCloudImg"
          style="width: 14px;height: 14px;"
          :url="menuInfo.icon" is-cloud
          class="icon-img"
        />
        <BaseIcon v-else :name="menuInfo.icon" />
        <span class="header-title">{{ menuInfo.title }}</span>
      </div>
      <template v-if="showDown">
        <div class="header-icon" :class="{ 'is-show': isShow }">
          <BaseIcon :name="`uni-arrow-${isShow ? 'down' : 'right'}`" />
        </div>
      </template>
    </div>
    <div
      v-if="showDown" class="accordion-content"
      :style="`max-height:${isShow ? '1000px' : 0};
      transition: max-height ${isShow ? '1' : '0.3'}s;`"
    >
      <div class="content-line" />
      <template v-if="menuInfo.type === 'radio'">
        <BaseRadioGroup v-model="radioValue" :columns="1">
          <div
            v-for="item in menuInfo.list.map((r: MenuItem) => ({ ...r, label: r.title }))"
            :key="item.value" class="radio-menu-item"
          >
            <BaseRadio :value="item.value">
              {{ item.label }}
            </BaseRadio>
          </div>
        </BaseRadioGroup>
      </template>
      <template v-else>
        <template v-for="item of menuInfo.list" :key="item.id">
          <slot :menu-item="{ ...item, domId }">
            <div class="content-item" @click="handleClickItem(item)">
              <BaseIcon v-if="item.icon" :name="item.icon" />
              <span class="header-title">{{ item.title }}</span>
            </div>
          </slot>
        </template>
      </template>
    </div>
  </div>
</template>

<style>
:root {
  --tg-base-accordion-header-height: 45px;
}
</style>

<style scoped lang="scss">
.base-accordion {
  color: var(--tg-text-white);
  background-color: #1A2C38;
  font-weight: var(--tg-font-weight-semibold);

  --tg-radio-group-style-gap-vertical: 0;
  --tg-radio-group-style-gap-horizontal: 0;
  --tg-base-radio-style-just-content: space-between;
  --tg-base-radio-style-flex-direction: row-reverse;

  // background-color: #213743;
  .accordion-header {
    display: flex;
    height: var(--tg-base-accordion-header-height);
    min-height: 45px;
    padding: 0 16px;
    border-radius: var(--tg-radius-default) var(--tg-radius-default) 0 0;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
    .title {
      flex: 1;
      justify-content: flex-start;
      width: 0;
    }

    .header-icon {
      width: var(--tg-spacing-24);
      height: var(--tg-spacing-24);
      border-radius: 100px;
      background-color: var(--tg-secondary-main);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 10px;
      --tg-icon-color: var(--tg-text-white);
    }

    .is-show {
      background-color: var(--tg-sub-deepblue);
    }
  }

  .accordion-header:hover {
    background-color: #213743;
    --tg-icon-color: var(--tg-text-white);
    .icon-img{
      filter: brightness(2);
    }
  }

  .flex-center {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .accordion-content {
    max-height: 0;
    overflow: hidden;
    // transition: max-height 0.8s;
    background-color: var(--tg-secondary-grey);

    .content-line {
      background: var(--tg-secondary-main);
      height: 2px;
      width: 100%;
    }

    .content-item, .radio-menu-item {
      height: 45px;
      display: flex;
      border-radius: var(--tg-radius-default);
      padding-left: 16px;
      align-items: center;
      cursor: pointer;
      > div {
        height: 100%;
      }
    }

    .content-item:hover, .radio-menu-item:hover {
      background-color: var(--tg-secondary-main);
    }
  }

  .header-title {
    padding-left: 8px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}

.only-accordion {
  border-radius: 0 0 var(--tg-radius-default) var(--tg-radius-default);
  overflow: hidden;
}
</style>
