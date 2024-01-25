<script setup lang='ts'>
const { companyData } = storeToRefs(useAppStore())
const { t } = useI18n()
</script>

<template>
  <div class="flex flex-col p-12">
    <!-- 🔖🔖🔖 -->
    <section class="flex flex-col">
      <div class="mb-8">
        <div class="text-tg-text-white text-[24px] font-semibold leading-[1.32]">
          {{ companyData.name }} {{ t('menu_title_settings_security') }}
        </div>
      </div>
      <div class="mb-12">
        <div class="text-tg-secondary-light text-[16px] leading-[1.5]">
          {{ t('responsible_safe_text_1') }}
        </div>
      </div>
      <div class="mb-12">
        <div class="text-tg-secondary-light text-[16px] leading-[1.5]">
          {{ t('responsible_safe_text_2') }}
        </div>
      </div>
      <div>
        <div class="text-tg-secondary-light text-[16px] leading-[1.5]">
          {{ t('responsible_safe_text_3') }}
        </div>
      </div>
      <ul class="text-tg-secondary-light mb-16 ml-[32px] list-disc text-[16px] leading-[1.5]">
        <li class="my-4">
          <div>
            {{ t('responsible_safe_text_4') }}
          </div>
        </li>
        <li class="my-4">
          <div>
            {{ t('responsible_safe_text_5') }}
          </div>
        </li>
        <li class="my-4">
          <div>
            {{ t('responsible_safe_text_6') }}
          </div>
        </li>
        <li class="my-4">
          <div>
            {{ t('responsible_safe_text_7') }}
          </div>
        </li>
        <li class="my-4">
          <div>
            {{ t('responsible_safe_text_8') }}
          </div>
        </li>
      </ul>
    </section>

    <!-- 🔖🔖🔖 -->
    <section class="flex flex-col">
      <div class="mb-8 mt-24">
        <div class="text-tg-text-white text-[20px] font-semibold leading-[1.32]">
          {{ t('responsible_safe_text_9') }}
        </div>
      </div>
      <div class="mb-12">
        <div class="text-tg-secondary-light text-[16px] leading-[1.5]">
          {{ t('responsible_safe_text_10') }}
        </div>
      </div>
      <div>
        <div class="text-tg-secondary-light text-[16px] leading-[1.5]">
          {{ t('responsible_safe_text_11') }}
        </div>
      </div>
      <ul class="text-tg-secondary-light mb-16 ml-[32px] list-disc text-[16px] leading-[1.5]">
        <li class="my-4">
          <div>
            {{ t('responsible_safe_text_12') }}
          </div>
        </li>
        <li class="my-4">
          <div>
            {{ t('responsible_safe_text_13') }}
          </div>
        </li>
        <li class="my-4">
          <div>
            {{ t('responsible_safe_text_14') }}
          </div>
        </li>
        <li class="my-4">
          <div>
            {{ t('responsible_safe_text_15') }}
          </div>
        </li>
        <li class="my-4">
          <div>
            {{ t('responsible_safe_text_16') }}
          </div>
        </li>
        <li class="my-4">
          <div>
            {{ t('responsible_safe_text_17') }}
          </div>
        </li>
      </ul>
      <div>
        <div class="text-tg-secondary-light text-[16px] leading-[1.5]">
          {{ t('responsible_safe_text_18') }}
        </div>
      </div>
    </section>

    <!-- 🔖🔖🔖 -->
    <section class="flex flex-col">
      <div class="mb-8 mt-24">
        <div class="text-tg-text-white text-[20px] font-semibold leading-[1.32]">
          {{ t('responsible_safe_text_19') }}
        </div>
      </div>
      <div class="mb-12">
        <div class="text-tg-secondary-light text-[16px] leading-[1.5]">
          {{ t('responsible_safe_text_20') }}
        </div>
      </div>
      <div class="mb-12">
        <div class="text-tg-secondary-light text-[16px] leading-[1.5]">
          {{ t('responsible_safe_text_21') }}
        </div>
      </div>
      <div class="mb-12">
        <div class="text-tg-secondary-light text-[16px] leading-[1.5]">
          {{ t('responsible_safe_text_22') }}
        </div>
      </div>
      <!-- 🔖🔖 -->
      <div class="mb-8 mt-24">
        <div class="text-tg-text-white text-[16px] font-semibold leading-[1.32]">
          {{ t('responsible_safe_text_23') }}
        </div>
      </div>
      <div>
        <div class="text-tg-secondary-light text-[16px] leading-[1.5]">
          {{ t('responsible_safe_text_24') }}
        </div>
      </div>
      <!-- 🔖🔖 -->
      <div class="mb-8 mt-24">
        <div class="text-tg-text-white text-[16px] font-semibold leading-[1.32]">
          {{ t('responsible_safe_text_25') }}
        </div>
      </div>
      <div>
        <div class="text-tg-secondary-light text-[16px] leading-[1.5]">
          {{ t('responsible_safe_text_26') }}
        </div>
      </div>
      <!-- 🔖🔖 -->
      <div class="mb-8 mt-24">
        <div class="text-tg-text-white text-[16px] font-semibold leading-[1.32]">
          {{ t('responsible_safe_text_27') }}
        </div>
      </div>
      <div>
        <div class="text-tg-secondary-light text-[16px] leading-[1.5]">
          {{ t('responsible_safe_text_28') }}
        </div>
      </div>
      <!-- 🔖🔖 -->
      <div class="mb-8 mt-24">
        <div class="text-tg-text-white text-[16px] font-semibold leading-[1.32]">
          {{ t('responsible_safe_text_29') }}
        </div>
      </div>
      <div>
        <div class="text-tg-secondary-light text-[16px] leading-[1.5]">
          {{ t('responsible_safe_text_30') }}
        </div>
      </div>
    </section>

    <!-- 🔖🔖🔖 -->
    <section class="flex flex-col">
      <div class="mb-8 mt-24">
        <div class="text-tg-text-white text-[20px] font-semibold leading-[1.32]">
          {{ t('responsible_safe_text_31') }}
        </div>
      </div>
      <div>
        <div class="text-tg-secondary-light text-[16px] leading-[1.5]">
          {{ t('responsible_safe_text_32') }}
        </div>
      </div>
      <!-- 🔖🔖 -->
      <div class="mb-8 mt-24">
        <div class="text-tg-text-white text-[16px] font-semibold leading-[1.32]">
          {{ t('responsible_safe_text_33') }}
        </div>
      </div>
      <div>
        <div class="text-tg-secondary-light text-[16px] leading-[1.5]">
          {{ t('responsible_safe_text_34') }}
        </div>
      </div>
      <!-- 🔖🔖 -->
      <div class="mb-8 mt-24">
        <div class="text-tg-text-white text-[16px] font-semibold leading-[1.32]">
          {{ t('responsible_safe_text_35') }}
        </div>
      </div>
      <div>
        <div class="text-tg-secondary-light text-[16px] leading-[1.5]">
          {{ t('responsible_safe_text_36') }}
        </div>
      </div>
      <!-- 🔖🔖 -->
      <div class="mb-8 mt-24">
        <div class="text-tg-text-white text-[16px] font-semibold leading-[1.32]">
          {{ t('responsible_safe_text_37') }}
        </div>
      </div>
      <!-- 🔖 -->
      <div class="mb-8 mt-24">
        <div class="text-tg-text-white text-[14px] leading-[1.32]">
          {{ t('responsible_safe_text_38') }}
        </div>
      </div>
      <div>
        <div class="text-tg-secondary-light text-[16px] leading-[1.5]">
          {{ t('responsible_safe_text_39') }}
        </div>
      </div>
      <!-- 🔖 -->
      <div class="mb-8 mt-24">
        <div class="text-tg-text-white text-[14px] leading-[1.32]">
          {{ t('responsible_safe_text_40') }}
        </div>
      </div>
      <div class="mb-12">
        <div class="text-tg-secondary-light text-[16px] leading-[1.5]">
          {{ t('responsible_safe_text_41') }}
        </div>
      </div>
      <div>
        <div class="text-tg-secondary-light text-[16px] leading-[1.5]">
          {{ t('responsible_safe_text_42') }}
        </div>
      </div>
      <!-- 🔖🔖 -->
      <div class="mb-8 mt-24">
        <div class="text-tg-text-white text-[16px] font-semibold leading-[1.32]">
          {{ t('responsible_safe_text_43') }}
        </div>
      </div>
      <div>
        <div class="text-tg-secondary-light text-[16px] leading-[1.5]">
          {{ t('responsible_safe_text_44') }}
        </div>
      </div>
      <!-- 🔖🔖 -->
      <div class="mb-8 mt-24">
        <div class="text-tg-text-white text-[16px] font-semibold leading-[1.32]">
          {{ t('responsible_safe_text_45') }}
        </div>
      </div>
      <div>
        <div class="text-tg-secondary-light text-[16px] leading-[1.5]">
          {{ t('responsible_safe_text_46') }}
        </div>
      </div>
    </section>

    <!-- 🔖🔖🔖 -->
    <section class="flex flex-col">
      <div class="mb-8 mt-24">
        <div class="text-tg-text-white text-[20px] font-semibold leading-[1.32]">
          {{ t('responsible_safe_text_47') }}
        </div>
      </div>
      <div>
        <div class="text-tg-secondary-light text-[16px] leading-[1.5]">
          {{ t('responsible_safe_text_48') }}
        </div>
      </div>
      <ul class="text-tg-secondary-light mb-16 ml-[32px] list-disc text-[16px] leading-[1.5]">
        <li class="my-4">
          <div>
            {{ t('responsible_safe_text_49') }}
          </div>
        </li>
        <li class="my-4">
          <div>
            {{ t('responsible_safe_text_50') }}
          </div>
        </li>
        <li class="my-4">
          <div>
            {{ t('responsible_safe_text_51') }}
          </div>
        </li>
        <li class="my-4">
          <div>
            {{ t('responsible_safe_text_52') }}
          </div>
        </li>
      </ul>
      <!-- 🔖 -->
      <div class="mb-8 mt-24">
        <div class="text-tg-text-white text-[14px] leading-[1.32]">
          {{ t('responsible_safe_text_53') }}
        </div>
      </div>
      <ul class="text-tg-secondary-light mb-16 ml-[32px] list-disc text-[16px] leading-[1.5]">
        <li class="my-4">
          <div>
            {{ t('responsible_safe_text_54') }}
          </div>
        </li>
        <li class="my-4">
          <div>
            {{ t('responsible_safe_text_55') }}
          </div>
        </li>
        <li class="my-4">
          <div>
            {{ t('responsible_safe_text_56') }}
          </div>
        </li>
        <li class="my-4">
          <div>
            {{ t('responsible_safe_text_57') }}
          </div>
        </li>
        <li class="my-4">
          <div>
            {{ t('responsible_safe_text_58') }}
          </div>
        </li>
        <li class="my-4">
          <div>
            {{ t('responsible_safe_text_59') }}
          </div>
        </li>
      </ul>
    </section>

    <!-- 🔖🔖🔖 -->
    <section class="flex flex-col">
      <div class="mb-8 mt-24">
        <div class="text-tg-text-white text-[20px] font-semibold leading-[1.32]">
          {{ t('responsible_safe_text_60') }}
        </div>
      </div>
      <div>
        <div class="text-tg-secondary-light text-[16px] leading-[1.5]">
          {{ t('responsible_safe_text_61') }}
        </div>
      </div>
      <div class="mt-12">
        <div class="text-tg-secondary-light text-[16px] leading-[1.5]">
          {{ t('responsible_safe_text_62') }}
        </div>
      </div>
      <div class="mt-12">
        <div class="text-tg-secondary-light text-[16px] leading-[1.5]">
          {{ t('responsible_safe_text_63') }}
        </div>
      </div>
      <!-- 🔖🔖 -->
      <div class="mb-8 mt-24">
        <div class="text-tg-text-white text-[16px] font-semibold leading-[1.32]">
          {{ t('responsible_safe_text_64') }}
        </div>
      </div>
      <ul class="text-tg-secondary-light mb-16 ml-[32px] list-disc text-[16px] leading-[1.5]">
        <li class="my-4">
          <div>
            {{ t('responsible_safe_text_65') }}
          </div>
        </li>
        <li class="my-4">
          <div>
            {{ t('responsible_safe_text_66') }}
          </div>
        </li>
        <li class="my-4">
          <div>
            {{ t('responsible_safe_text_67') }}
          </div>
        </li>
        <li class="my-4">
          <div>
            {{ t('responsible_safe_text_68') }}
          </div>
        </li>
        <li class="my-4">
          <div>
            {{ t('responsible_safe_text_69') }}
          </div>
        </li>
        <li class="my-4">
          <div>
            {{ t('responsible_safe_text_70') }}
          </div>
        </li>
      </ul>
      <!-- 🔖🔖 -->
      <div class="mb-8 mt-24">
        <div class="text-tg-text-white text-[16px] font-semibold leading-[1.32]">
          {{ t('responsible_safe_text_71') }}
        </div>
      </div>
      <div>
        <div class="text-tg-secondary-light text-[16px] leading-[1.5]">
          {{ t('responsible_safe_text_72') }}
        </div>
      </div>
      <ul class="text-tg-secondary-light mb-16 ml-[32px] list-disc text-[16px] leading-[1.5]">
        <li class="my-4">
          <div>
            {{ t('responsible_safe_text_73') }}
          </div>
        </li>
        <li class="my-4">
          <div>
            {{ t('responsible_safe_text_74') }}
          </div>
        </li>
        <li class="my-4">
          <div>
            {{ t('responsible_safe_text_75') }}
          </div>
        </li>
      </ul>
    </section>
  </div>
</template>

<style lang='scss' scoped>

</style>
