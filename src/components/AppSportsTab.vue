<script setup lang='ts'>
interface ListItem {
  [text: string]: any
  id: string
  num: number
}
interface TabItem {
  label: string
  value: string
  icon: string
  num: number
  id: string
}
interface Props {
  list: ListItem[]
  modelValue: string
}
const props = defineProps<Props>()
const emit = defineEmits(['update:modelValue'])

const allList = [
  { label: '全部', value: 'all', icon: 'uni-all', num: 0, id: '1' },
  { label: '网球', value: 'tennis', icon: 'spt-tennis', num: 0, id: '2' },
  { label: '足球', value: 'soccer', icon: 'spt-soccer', num: 0, id: '3' },
  {
    label: '美式橄榄球',
    value: 'american-football',
    icon: 'spt-american-football',
    num: 0,
    id: '4',
  },
  { label: '棒球', value: 'spt-baseball', icon: 'spt-baseball', num: 0, id: '5' },
  { label: '篮球', value: 'spt-basketball', icon: 'spt-basketball', num: 0, id: '6' },
  { label: '乒乓球', value: 'spt-table-tennis', icon: 'spt-table-tennis', num: 0, id: '7' },
  { label: '板球', value: 'spt-cricket', icon: 'spt-cricket', num: 0, id: '8' },
  { label: '英式橄榄球', value: 'spt-rugby', icon: 'spt-rugby', num: 0, id: '9' },
  { label: '冰上曲棍球', value: 'spt-ice-hockey', icon: 'spt-ice-hockey', num: 0, id: '10' },
  {
    label: '排球',
    value: 'spt-volleyball',
    icon: 'spt-volleyball',
    num: 0,
    id: '11',
  },
  { label: '传说对决', value: 'spt-legend', icon: 'spt-legend', num: 0, id: '12' },
  {
    label: '澳洲足球',
    value: 'spt-aussie-rules',
    icon: 'spt-aussie-rules',
    num: 0,
    id: '13',
  },
  {
    label: '拳击',
    value: 'spt-boxing',
    icon: 'spt-boxing',
    num: 0,
    id: '14',
  },
  {
    label: 'CS:GO',
    value: 'spt-counter-strike',
    icon: 'spt-counter-strike',
    num: 0,
    id: '15',
  },
  { label: '飞镖', value: 'spt-darts', icon: 'spt-darts', num: 0, id: '16' },
  { label: '刀塔2', value: 'spt-dota-2', icon: 'spt-dota-2', num: 0, id: '17' },
  { label: 'eCricket', value: 'spt-ecricket', icon: 'spt-ecricket', num: 0, id: '18' },
  { label: 'FIFA', value: 'spt-fifa', icon: 'spt-fifa', num: 0, id: '19' },
  { label: '地板球', value: 'spt-floorball', icon: 'spt-floorball', num: 0, id: '21' },
  { label: '五人制足球', value: 'spt-futsal', icon: 'spt-futsal', num: 0, id: '22' },
  { label: '手球', value: 'spt-handball', icon: 'spt-handball', num: 0, id: '23' },
  {
    label: '英雄联盟',
    value: 'spt-league-of-legends',
    icon: 'spt-league-of-legends',
    num: 0,
    id: '24',
  },
  { label: '综合格斗', value: 'spt-mma', icon: 'spt-mma', num: 0, id: '25' },
  {
    label: '无尽对决',
    value: 'spt-mobile-legends',
    icon: 'spt-mobile-legends',
    num: 0,
    id: '26',
  },
  { label: 'NBA2K', value: 'spt-nba2k', icon: 'spt-nba2k', num: 0, id: '27' },
  { label: '彩虹六号', value: 'spt-rainbow-six', icon: 'spt-rainbow-six', num: 0, id: '28' },
  { label: '桌球', value: 'spt-snooker', icon: 'spt-snooker', num: 0, id: '29' },
  {
    label: '星际争霸2',
    value: 'spt-starcraft-2',
    icon: 'spt-starcraft-2',
    num: 0,
    id: '30',
  },
  { label: '无畏契约', value: 'spt-valorant', icon: 'spt-valorant', num: 0, id: '31' },
  { label: '魔兽争霸3', value: 'spt-warcraft', icon: 'spt-warcraft', num: 0, id: '32' },
  { label: '水球', value: 'spt-waterpolo', icon: 'spt-waterpolo', num: 0, id: '33' },
]

const showList = computed(() => {
  const arr: TabItem[] = []
  props.list.forEach((pl) => {
    allList.forEach((al) => {
      if (pl.id === al.id) {
        al.num = pl.num
        arr.push(al)
      }
    })
  })
  return arr
})

function handleClick(item: TabItem) {
  emit('update:modelValue', item.id)
}
</script>

<template>
  <div class="app-sports-tab">
    <div class="scroll-x">
      <div class="tab-wrap">
        <div v-for="tab in showList" :key="tab.value" class="tab">
          <BaseButton type="text" padding0 @click="handleClick(tab)">
            <div class="button" :class="{ active: tab.id === modelValue }">
              <div class="dot" />
              <div class="main">
                <div class="icon">
                  <BaseIcon :name="tab.icon" />
                  <BaseBadge
                    :mode="tab.id === modelValue ? 'active' : 'black'"
                    style="--tg-badge-font-size:var(--tg-font-size-xs);
                    --tg-badge-padding-x:var(--tg-spacing-6);"
                    class="badge" :count="tab.num"
                  />
                </div>
                <div class="name">
                  {{ tab.label }}
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
    }
  }
}
</style>
