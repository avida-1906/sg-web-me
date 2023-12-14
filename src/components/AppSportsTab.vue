<script setup lang='ts'>
interface ListItem {
  si: number
  sn: string
  count: number
  icon: string
  useCloudImg?: boolean
}
interface Props {
  list: ListItem[]
  modelValue: number
}
defineProps<Props>()
const emit = defineEmits(['update:modelValue', 'change'])

function handleClick(item: ListItem) {
  emit('update:modelValue', item.si)
  emit('change', item)
}
</script>

<template>
  <div class="app-sports-tab">
    <div class="scroll-x">
      <div class="tab-wrap">
        <div v-for="tab in list" :key="tab.si" class="tab">
          <BaseButton type="text" size="none" @click="handleClick(tab)">
            <div class="button" :class="{ active: tab.si === modelValue }">
              <div class="dot" />
              <div class="main">
                <div class="icon" style="--app-sport-image-error-icon-size:28px;">
                  <AppImage
                    v-if="tab.useCloudImg"
                    class="icon-img"
                    :class="{ 'icon-act': tab.si === modelValue }"
                    :url="tab.icon" is-cloud
                  />
                  <BaseIcon v-else :name="tab.icon" />
                  <BaseBadge
                    :mode="tab.si === modelValue ? 'active' : 'black'"
                    style="--tg-badge-font-size:var(--tg-font-size-xs);
                    --tg-badge-padding-x:var(--tg-spacing-6);"
                    class="badge" :count="tab.count" :max="99999"
                  />
                </div>
                <div class="name">
                  {{ tab.sn }}
                </div>
              </div>
            </div>
          </BaseButton>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang='scss' scoped>
.app-sports-tab {
  width: 100%;
  display: flex;
  align-items: center;
  margin-top: var(--tg-spacing-12);
  margin-bottom: var(--tg-spacing-12);
  background-color: var(--tg-secondary-dark);
  border-radius: var(--tg-radius-md);
  overflow: hidden;
}

.tab-wrap {
  padding: var(--tg-spacing-32) var(--tg-spacing-8) var(--tg-spacing-18);
  display: inline-flex;

  .tab {
    flex-shrink: 0;
    position: relative;

    .button {
      .dot {
        display: none;
        content: "";
        background: var(--tg-text-blue);
        width: 12px;
        height: 6px;
        position: absolute;
        top: calc(-1 * var(--tg-spacing-32));
        left: 50%;
        z-index: 1;
        transform: translate(-50%);
        border-radius: 0 0 100% 100%;
      }

      .main {
        display: grid;
        grid-auto-flow: row;
        gap: var(--tg-spacing-8);
        place-items: center;
        position: relative;
        width: 9ch;
        max-width: 9ch;
        font-size: var(--tg-font-size-xs);

        .icon {
          font-size: 28px;
          width: 28px;
          height: 28px;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          .icon-act{
            filter: brightness(2);
          }

          .badge {
            position: absolute;
            top: -8px;
            left: 55%;
          }
        }

        .name {
          font-size: var(--tg-font-size-xs);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 6ch;
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
      &:hover{
        .main{
          .icon{
            .icon-img{
              filter: brightness(2);
            }

          }
        }
      }
    }
  }
}
</style>
