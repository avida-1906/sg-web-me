<script lang="ts" setup>
</script>

<template>
  <div class="hero-wrapper">
    <div class="grid-heroes">
      <div
        class="scroll-x hero-content hide-scrollbar"
        style="grid-auto-columns: calc(95.24% - 0.6875rem);"
      >
        <div class="svelte-4wrc96 hero">
          123
        </div>
        <div class="hero svelte-4wrc96">
          123
        </div>
        <div class="hero svelte-4wrc96">
          123
        </div>
        <div class="hero svelte-4wrc96">
          123
        </div>
        <div class="hero svelte-4wrc96">
          123
        </div>
        <div class="hero svelte-4wrc96">
          123
        </div>
        <!-- <div class="arrow arrow-left" style="">
          <button class="grid-heroes-button" data-testid="heroes-scroll-left">
            <svg fill="currentColor" viewBox="0 0 64 64" class="svg-icon" style="">
              <title />
              <path d="
                M36.998 53.995
                16 32.998 36.998 12l6.306 6.306L28.61
                 33l14.694 14.694L36.998 54v-.005Z" />
            </svg>
          </button>
        </div>
        <div class="arrow arrow-right" style="">
          <button class="grid-heroes-button" data-testid="heroes-scroll-right">
            <svg fill="currentColor" viewBox="0 0 64 64" class="svg-icon" style="">
              <title />
              <path d="m26.307 53.995 20.998-20.997L26.307
               12 20 18.306 34.694 33 20.001 47.694 26.307 54v-.005Z" />
            </svg>
          </button>
        </div> -->
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.hero-wrapper {
  container-type: inline-size;
  container-name: grid-size;
}
.grid-heroes {
  width: 100%;
  display: flex;
  position: relative;
  --sick-fade-stamp-of-ed-approval: linear-gradient( 90deg, transparent 0, var(--grey-600) 4px, var(--grey-600) calc(100% - 4px), transparent 100% );
  --standard-lockup-shadow-offset: 6px;
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
}
</style>
