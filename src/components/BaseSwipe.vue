<script lang="ts" setup>
const { appContentWidth } = storeToRefs(useWindowStore())

const gridAutoColumns = computed(() => {
  if (appContentWidth.value < 600)
    return 'calc(95.24% - 0.6875rem)'

  else if (appContentWidth.value > 600 && appContentWidth.value < 1020)
    return 'calc(48.78% - 0.6875rem)'
  else
    return 'calc(33.33% - 0.6875rem)'
})
</script>

<template>
  <div class="hero-wrapper">
    <div class="grid-heroes">
      <div
        class="scroll-x hero-content hide-scrollbar"
        :style="{
          'grid-auto-columns': gridAutoColumns,
        }"
      >
        <div class="hero">
          123
        </div>
        <div class="hero">
          123
        </div>
        <div class="hero">
          123
        </div>
        <div class="hero">
          123
        </div>
        <div class="hero">
          123
        </div>
        <div class="hero">
          123
        </div>
        <div class="arrow arrow-left" style="">
          <button class="grid-heroes-button" data-testid="heroes-scroll-left">
            <BaseIcon name="uni-arrow-left" />
          </button>
        </div>
        <div class="arrow arrow-right" style="">
          <button class="grid-heroes-button" data-testid="heroes-scroll-right">
            <BaseIcon name="uni-arrow-right" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.hero-wrapper {
  container-type: inline-size;
  container-name: grid-size;
  --sick-fade-stamp-of-ed-approval: linear-gradient( 90deg, transparent 0, #1a2c38 4px, #1a2c38 calc(100% - 4px), transparent 100% );
  --standard-lockup-shadow-offset: 6px;
}
.grid-heroes {
  width: 100%;
  display: flex;
  position: relative;
}
.hero-content {
  display: grid;
  grid-auto-flow: column;
  padding-top: 12px;
  padding-bottom: 2px;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
  width: 100%;
  position: relative;
  -moz-column-gap: 16px;
  column-gap: 16px;
}
.hero {
  scroll-snap-align: start;
  overflow: hidden;
  container-type: inline-size;
  container-name: card-size;
  display: flex;
  flex-direction: column;
  position: relative;
  color: #ffffff;
  background: #213743;
  border-radius: 8px;
  height: 224px;
}

.arrow {
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  height: 100%;
  top: 0;
  /* opacity: 0; */
  transition: opacity .2s;
}

.arrow-right {
  left: calc(100% - 8px);
}

.arrow-left {
  right: calc(100% - 8px);
}

@container grid-size (width < 50rem) {
    .grid-heroes:after {
      content: "";
      position: absolute;
      top: 0;
      right: calc(16px*-1);
      bottom: 0;
      width: 28px;
      background-image: var(--sick-fade-stamp-of-ed-approval);
      z-index: 10
    }

    .hero-content {
      -moz-column-gap: 8px;
      column-gap: 8px
    }

    .hero-content > .hero:last-of-type {
      margin-right: 4px
    }
}
</style>
