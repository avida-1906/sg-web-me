<script setup lang="ts">
// const activeTab = ref('Divider')
const list = [
  { id: 1, key: 'left', name: '偏左' },
  { id: 2, key: 'center', name: '居中' },
  { id: 3, key: 'right', name: '偏右' },
  { id: 4, key: 'right', name: '偏移量20%', offset: '20%' },
]

const { copy } = useClipboard()
function copyDividerCode(type: number) {
  switch (type) {
    // 按钮
    case 1:
      copy('<BaseDivider titlePlacement="left">偏左</BaseDivider>')
      break
    case 2:
      copy('<BaseDivider titlePlacement="center">居中</BaseDivider>')
      break
    case 3:
      copy('<BaseDivider titlePlacement="right">偏右</BaseDivider>')
      break
    case 4:
      copy('<BaseDivider titlePlacement="right" offset="20%">偏移量20%</BaseDivider>')
      break
    default:
      break
  }
}

function copyEmptyCode(type: number) {
  switch (type) {
    // 按钮
    case 1:
      copy('<BaseEmpty description="自定义数据" icon="navbar-user-bet"></BaseEmpty>')
      break
    case 2:
      copy('<BaseEmpty></BaseEmpty>')
      break
    case 3:
      copy(`<BaseEmpty>
              <template #icon>
                <BaseIcon font-size="58" name="navbar-user-bet" />
              </template>
              <template #description>
                <span>自定义插槽</span>
              </template>
              <BaseButton @click="copyEmptyCode(3)">
                copy
              </BaseButton>
            </BaseEmpty>`)
      break
    default:
      break
  }
}
</script>

<template>
  <ul>
    <li class="box">
      <AppDemoCard title="BaseDivider">
        <div v-for="item in list" :key="item.id" class="center">
          <BaseDivider :title-placement="item.key" :offset="item.offset">
            {{ item.name }}
          </BaseDivider>
          <BaseButton @click="copyDividerCode(item.id)">
            copy
          </BaseButton>
        </div>
      </AppDemoCard>
    </li>
    <li class="box">
      <AppDemoCard title="BaseEmpty">
        <div class="center">
          <BaseEmpty description="自定义数据" icon="navbar-user-bet">
            <BaseButton @click="copyEmptyCode(1)">
              copy
            </BaseButton>
          </BaseEmpty>
          <BaseEmpty>
            <BaseButton @click="copyEmptyCode(2)">
              copy
            </BaseButton>
          </BaseEmpty>
          <BaseEmpty>
            <template #icon>
              <BaseIcon font-size="58" name="navbar-user-bet" />
            </template>
            <template #description>
              <span>自定义插槽</span>
            </template>
            <BaseButton @click="copyEmptyCode(3)">
              copy
            </BaseButton>
          </BaseEmpty>
        </div>
      </AppDemoCard>
    </li>
  </ul>
</template>

<style scoped></style>
