<script lang="ts" setup>
const gameInfo = { id: 2, url: 'https://mediumrare.imgix.net/d51d84f1074e5b54c25c54e6cbf026a4e352c491e7a574d3da6504743d71e2d6?&dpr=2&format=auto&auto=format&q=50&w=167', name: 'plynko' }
const gameList = Array(22).fill(gameInfo)

const sliderOuter = ref()
const { appContentWidth } = storeToRefs(useWindowStore())
const outerWidth = computed(() => appContentWidth.value) // ref(0)

// function setOuterWidth() {
//   const { width } = sliderOuter.value.getBoundingClientRect()
//   outerWidth.value = width
// }

// onMounted(() => {
//   window.addEventListener('resize', setOuterWidth)
//   nextTick(() => {
//     setOuterWidth()
//   })
// })

// onUnmounted(() => {
//   window.removeEventListener('resize', setOuterWidth)
// })

const galleryClass = ref('')

watchEffect(() => {
  if (outerWidth.value >= 1150)
    galleryClass.value = 'card-list-1150'

  else if (outerWidth.value >= 1000)
    galleryClass.value = 'card-list-1150-1000'

  else if (outerWidth.value >= 850)
    galleryClass.value = 'card-list-1000-850'

  else if (outerWidth.value >= 700)
    galleryClass.value = 'card-list-850-700'

  else if (outerWidth.value >= 500)
    galleryClass.value = 'card-list-700-500'

  else
    galleryClass.value = 'card-list-500'
})
</script>

<template>
  <div ref="sliderOuter" class="card-list" :class="[galleryClass]">
    <div v-for="item in gameList" :key="item.id" class="wrap">
      <BaseGameItem :game-info="item" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.card-list {
  display: grid;
  grid-gap: 2rem 1rem;
  grid-template-columns: repeat(auto-fill,minmax(150px,1fr));
  &-1150 {
    grid-template-columns: repeat(8, 1fr);
    gap: 20px 10px;
  }
  &-1150-1000 {
    grid-template-columns: repeat(7, 1fr);
    gap: 30px 15px;

  }
  &-1000-850 {
    grid-template-columns: repeat(6, 1fr);
    gap: 30px 15px;
  }
  &-850-700 {
    grid-template-columns: repeat(5, 1fr);
    gap: 30px 15px;
  }
  &-700-500 {
    grid-template-columns: repeat(4, 1fr);
    gap: 10px 5px;
  }
  &-500 {
    grid-template-columns: repeat(3, 1fr);
    gap: 10px 5px;
  }
}
</style>
