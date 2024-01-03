<script setup lang="ts">
const { t } = useI18n()
const { push } = useLocalRouter()

const list = [
  {
    img: '/png/mini/limbo.png',
    name: 'Limbo',
    game_id: 'limbo',
  },
]

function startGame(id: string) {
  push(`/casino/original-game/?id=${id}`)
}
</script>

<template>
  <div class="list-wrap">
    <BaseButton
      type="text" size="none"
    >
      <div class="title">
        <BaseIcon name="chess-original-game" />
        <span>{{ t('casino_origin_game') }}</span>
      </div>
    </BaseButton>

    <AppCardList :list="list">
      <template #default="{ item }">
        <BaseAspectRatio ratio="100/134.1463414634" @click="startGame(item.game_id)">
          <div class="item">
            <BaseImage :url="item.img" />
          </div>
        </BaseAspectRatio>
      </template>
    </AppCardList>
  </div>
</template>

<style lang="scss" scoped>
.list-wrap {
  margin-top: var(--tg-spacing-24);

  .title {
    font-size: var(--tg-font-size-base);
    color: var(--tg-text-white);
    margin-bottom: var(--tg-spacing-12);
    display: flex;
    align-items: center;

    &:hover {
      --tg-icon-color: var(--tg-text-white);
    }

    span {
      font-size: var(--tg-font-size-md);
      font-weight: var(--tg-font-weight-semibold);
      margin-left: var(--tg-spacing-8);
      line-height: 1.5;
    }
  }

  .item{
    background-color: #fff;
    cursor: pointer;
    border-radius: var(--tg-radius-md);
    overflow: hidden;
    transition: var(--tg-transition);
    &:hover{
      transform: translateY(-7px);
    }
  }
}
</style>
