<script lang="ts" setup>
interface Props {
  userInfo: ChatUserInfo
}

defineProps<Props>()

const levelRoleTxt = {
  1: 'Platinum I',
  2: 'Platinum II',
  3: 'Platinum III',
  4: 'Platinum IV',
  bronze: 'Bronze',
  silver: 'Silver',
  gold: 'Gold',
  diamond: 'Diamond',
  moderator: 'Moderator',
}

const roleMap = {
  moderator: 'M',
}
</script>

<template>
  <div class="tg-user-tags">
    <template v-if="userInfo.level">
      <VMenu placement="bottom">
        <div :class="[`user-badge-${userInfo.level}`]">
          <span class="hoverable">
            <BaseIcon :name="`chat-star-${userInfo.level}`" />
          </span>
        </div>
        <template #popper>
          <div class="tiny-menu-item-title">
            {{ levelRoleTxt[userInfo.level] }}
          </div>
        </template>
      </VMenu>
    </template>
    <template v-if="userInfo.role">
      <VMenu placement="bottom">
        <div :class="[`user-role-${userInfo.role}`]">
          <span class="hoverable">{{ roleMap[userInfo.role] }}</span>
        </div>
        <template #popper>
          <div class="tiny-menu-item-title">
            {{ levelRoleTxt[userInfo.role] }}
          </div>
        </template>
      </VMenu>
    </template>
    <BaseButton type="text">
      <span>{{ userInfo.name }}</span>
    </BaseButton>
  </div>
</template>

<style lang="scss" scoped>
.tg-user-tags {

}
</style>
