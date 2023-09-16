<script setup lang='ts'>
const gameUrl = ref('https://static-live.hacksawgaming.com/1263/1.11.3/index.html?language=zh&channel=desktop&gameid=1263&mode=1&token=ce6f762e-a59b-417e-83aa-9f72d335a35f&lobbyurl=https%3A%2F%2Fstake.com&currency=CAD&partner=stake&env=https://rgs-cu.hacksawgaming.com/api')
</script>

<template>
  <div class="app-iframe">
    <div class="game-wrapper">
      <div class="content-wrapper">
        <div class="content">
          <div class="iframe-wrapper">
            <iframe :src="gameUrl" frameborder="0" allowfullscreen />
          </div>

          <div class="footer">
            <div class="left">
              <div class="button">
                <BaseIcon name="uni-full-screen" />
              </div>
            </div>
            <div class="logo">
              1
            </div>
            <div class="right">
              1
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang='scss' scoped>
.app-iframe {
  width: 100%;
  max-width: 1200px;
}

.game-wrapper {
  margin-top: var(--tg-spacing-40);
}

.content-wrapper {
  --header-height: 60px;
  overflow: hidden;
  background: var(--tg-secondary-dark);
  border-radius: var(--tg-radius-md);
}

.content {

  .iframe-wrapper {
    position: relative;
    &::before {
      content: "";
      display: block;
      width: 100%;
      padding-top: 56.25%;
    }

    iframe {
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      width: 100%;
      height: 100%;
      border: none;
    }
  }
  .footer{
    height: 63px;
    padding: var(--tg-spacing-8);
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    background:var(--tg-secondary-dark);
    color: var(--tg-secondary-light);
    .left{
      font-size:16px;
      .button{
        padding: var(--tg-spacing-button-padding-vertical-sm) var(--tg-spacing-button-padding-horizontal-sm);
        cursor: pointer;
      }
    }
  }
}
</style>
