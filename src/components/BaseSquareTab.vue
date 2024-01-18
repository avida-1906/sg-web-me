<script setup lang='ts'>
interface ListItem {
  value: string | number
  label: string
  count?: number
  icon?: string
  useCloudImg?: boolean
}
interface Props {
  list: ListItem[]
  modelValue: string | number
}
const props = defineProps<Props>()
const emit = defineEmits(['update:modelValue', 'change'])

const { isMobile } = storeToRefs(useWindowStore())

function handleClick(item: ListItem) {
  emit('update:modelValue', item.value)
  emit('change', item)
}

// 统一加载tab中的网络icon
function loadIcon() {
  return new Promise((resolve) => {
    let a = 0
    const t = setInterval(() => {
      a++
      if (props.list && props.list.length > 0) {
        clearInterval(t)
        const arr = props.list.map((a) => {
          return a.useCloudImg ? application.loadImage(a.icon ?? '') : ''
        })
        Promise.allSettled(arr).then((result) => {
          resolve(result)
        })
      }
      else if (a > 300) {
        clearInterval(t)
        resolve(true)
      }
    }, 50)
  })
}
await application.allSettled([loadIcon()])
</script>

<template>
  <div class="app-sports-tab">
    <div class="scroll-x">
      <div class="tab-wrap" :class="{ 'is-mobile': isMobile }">
        <div v-for="tab in list" :key="tab.value" class="tab">
          <div
            class="button" :class="{ active: tab.value === modelValue }"
            @click="handleClick(tab)"
          >
            <div class="dot" />
            <div class="main">
              <div
                v-if="tab.icon"
                class="icon" style="--app-sport-image-error-icon-size:16px;"
              >
                <AppImage
                  v-if="tab.useCloudImg"
                  class="icon-img"
                  :class="{ 'icon-act': tab.value === modelValue }"
                  :url="tab.icon" is-cloud
                />
                <BaseIcon v-else :name="tab.icon" />
                <BaseBadge
                  :mode="tab.value === modelValue ? 'active' : 'black'"
                  style="--tg-badge-font-size:var(--tg-font-size-xs);
                    --tg-badge-padding-x:var(--tg-spacing-6);"
                  class="badge" :count="tab.count" :max="99999"
                />
              </div>
              <div class="name">
                {{ tab.label }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
:root {
  --tg-base-square-tab-padding-y: var(--tg-spacing-16);
  --tg-base-square-tab--padding-outer-y: 0;
  --tg-base-square-tab-bg: var(--tg-secondary-dark);
  --tg-base-square-tab-font-weight: var(--tg-font-weight-semibold);
  --tg-base-square-tab-padding-top: 14px;
  --tg-base-square-tab-dot-width: 28px;
}
</style>

<style lang='scss' scoped>
.app-sports-tab {
  width: 100%;
  // display: flex;
  // align-items: center;
  // margin: var(--tg-base-square-tab-margin);
  padding: 0 16px;
  background-color: var(--tg-base-square-tab-bg);
  border-radius: var(--tg-radius-default);
  overflow: hidden;
  padding-bottom: var(--tg-base-square-tab--padding-outer-y);
  .scroll-x{
    padding-bottom: var(--tg-base-square-tab-padding-y);
  }
}

.tab-wrap {
  display: inline-flex;
  gap:55px;
  // padding-left: 33px;

  .tab {
    flex-shrink: 0;
    position: relative;

    .button {
      display: flex;
      flex-direction: column;
      align-items: center;
      height: 100%;
      cursor: pointer;
      padding-top: 14px;

      .dot {
        display: none;
        content: "";
        background: var(--tg-text-blue);
        width: var(--tg-base-square-tab-dot-width);
        height: 7px;
        position: absolute;
        top: 0;
        left: 50%;
        z-index: 1;
        transform: translate(-50%);
        border-radius: 0 0 3px 3px;
      }

      .main {
        display: grid;
        grid-auto-flow: row;
        gap: var(--tg-spacing-4);
        place-items: center;
        position: relative;
        font-size: var(--tg-font-size-xs);

        .icon {
          font-size: 26px;
          width: 26px;
          height: 26px;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          .badge {
            position: absolute;
            top: -8px;
            left: 55%;
          }
        }
        .name {
          font-size: var(--tg-font-size-default);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          line-height: 1.5;
          // max-width: 6ch;
          color: var(--tg-text-lightgrey);
          font-weight: var(--tg-base-square-tab-font-weight);
        }
      }
      &:active{
        .main{
          transform: scale(0.96);
        }
      }
      &:hover{
        .main{
          .name {
            color: var(--tg-text-white);
          }
          .icon{
           --tg-icon-color: var(--tg-text-white);
            .icon-img{
              // filter: brightness(2);
            }
          }
        }
      }

      &.active {
        .dot {
          display: block;
        }

        .main {
          .icon {
            --tg-icon-color: var(--tg-text-white);
          }

          .name {
            color: var(--tg-text-white);
          }
        }
      }

    }
  }
  &.is-mobile{
    width: 100%;
    gap:40px;
    justify-content: space-between;
    .button{
      padding-top: var(--tg-base-square-tab-padding-top);
      .main{
        gap: var(--tg-spacing-4);
        .icon {
          font-size: 16px;
          width: 16px;
          height: 16px;
        }
        .name{
          line-height: 1;
        }
      }
    }
  }
}
</style>
