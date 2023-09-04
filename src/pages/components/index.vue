<script lang="ts" setup>
import ids from 'virtual:svg-icons-names'

const { copy } = useClipboard()

function toast() {
  const div = document.createElement('div')
  div.innerHTML = 'Copied'
  div.style.cssText = `
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 10px 20px;
    background: rgba(0, 0, 0, 0.5);
    color: #fff;
    border-radius: 5px;
    z-index: 999;
  `
  document.body.appendChild(div)

  setTimeout(() => {
    document.body.removeChild(div)
  }, 1000)
}

function copyIcon(id: string) {
  copy(`<BaseIcon name="${id}" />`)
  toast()
}
</script>

<template>
  <ul>
    <li class="box">
      <AppDemoCard title="BaseIcon">
        <ul class="icon-wrap m0 p0">
          <li v-for="id in ids" :key="id" class="item" @click="() => copyIcon(id.slice(5))">
            <BaseIcon :name="id.slice(5)" />
          </li>
        </ul>
      </AppDemoCard>
    </li>
    <li class="box">
      <AppDemoCard title="BaseLoading">
        <div class="box">
          <BaseLoading />
        </div>
      </AppDemoCard>
    </li>
  </ul>
</template>

<style lang="scss" scoped>
.box {
  padding: 20px;
  position: relative;
  text-align: center;
}

.icon-wrap {
  display: flex;
  list-style: none;
  align-items: flex-start;
  flex-wrap: wrap;
  .item {
    cursor: pointer;
    width: 60px;
    font-size: 50px;
  }
}
</style>
