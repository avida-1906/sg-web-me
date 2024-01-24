<script setup lang='ts'>
interface Props {
  data: {
    /** ID */
    id: string
    /** 公告类型 1-公告  2-跑马灯 */
    notice_type: number
    /** 公告标题 */
    title: string
    /** 开始时间 */
    start_time: number
    /** 结束时间 */
    end_time: number
    /** 弹跳位置 1-不限制 2-登录前 3-登陆后 */
    bounce_location: number
    /** 弹跳频率 1-不限制 2-自定义 */
    bounce_frequency: number
    /** 自定义频率次数 */
    bounce_frequency_limit: number
    /** 弹窗内容类型 1-文字 2-图片 */
    pop_up_type: number
    /** 内容 */
    content: {
      [key: string]: string
    }
    /** 图片地址 */
    image_url: {
      [key: string]: string
    }
  }[]
}
const props = defineProps<Props>()

const lang = getCurrentLanguageForBackend()

const tab = ref(props.data[0].id)

const tabList = computed(() => {
  return props.data.map((a) => {
    return { ...a, label: a.title, value: a.id }
  })
})
const currentNotice = computed(() => tabList.value.find(a => a.id === tab.value))
const isText = computed(() => currentNotice.value?.pop_up_type === 1)
const isImg = computed(() => currentNotice.value?.pop_up_type === 2)
const textContent = computed(() => currentNotice.value?.content[lang] ?? '')
const imgUrl = computed(() => currentNotice.value?.image_url[lang] ?? '')
</script>

<template>
  <div class="flex flex-col px-12 pb-18">
    <BaseTab v-if="tabList.length > 1" v-model="tab" :list="tabList" />
    <div class="bg-tg-secondary-dark relative mt-15 w-full rounded-[4px] pt-[78.125%]">
      <div class="scroll-y absolute left-0 top-0 h-full w-full">
        <!-- 文字 -->
        <div v-if="isText" class="text-tg-secondary-light p-[10px] leading-[1.5]" v-html="textContent" />
        <!-- 图片 -->
        <BaseImage v-if="isImg" class="h-full w-full" :url="imgUrl" is-network />
      </div>
    </div>
  </div>
</template>

<style lang='scss' scoped></style>
