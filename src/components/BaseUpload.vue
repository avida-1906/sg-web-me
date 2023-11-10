<script setup lang="ts">
interface Props {
  modelValue: string[]
  imgType?: 'common' // 上传图片用途
  disabled?: boolean // 禁用
  accept?: string // 可选文件类型
  much?: number // 可上传文件数量
}

withDefaults(defineProps<Props>(), {
  modelValue: () => [],
  imgType: 'common',
  disabled: false,
  accept: 'image/png, image/jpg',
  much: 1,
})

const emit = defineEmits(['update:modelValue', 'delete'])
const { VITE_CASINO_IMG_CLOUD_URL } = getEnv()

const urlList: Ref<string[]> = ref([])
const {
  data: fileUrl,
  run: runFileUpload,
  loading: fileUploadLoading,
} = useRequest(ApiMemberUpload, {
  onSuccess() {
    urlList.value.push(fileUrl.value ?? '')
    emit('update:modelValue', urlList.value)
  },
})

function changFile(event: any) {
  const file = event.target.files[0]
  if (file) {
    runFileUpload({
      upload_type: 1,
      upload_file: file,
    })
  }
}
function deleteImg(index: number) {
  urlList.value.splice(index, 1)
  emit('update:modelValue', urlList.value)
}
</script>

<template>
  <div class="base-upload">
    <div
      v-for="item, index of modelValue"
      :key="index"
      class="center upload-box upload-border"
    >
      <BaseImage
        is-network
        :url="`${VITE_CASINO_IMG_CLOUD_URL}/${item}`"
      />
      <div class="icon-upload-delete">
        <BaseButton
          v-if="!disabled"
          type="text"
          padding0
          @click.stop="deleteImg(index)"
        >
          <BaseIcon name="upload-delete" />
        </BaseButton>
      </div>
    </div>
    <div v-if="urlList.length < much" class="upload-border input-upload">
      <div class="upload-box center">
        <BaseIcon name="uni-close" font-size="21px" style="transform: rotate(45deg)" />
      </div>
      <input
        class="input-file" type="file" :accept="accept" :disabled="disabled" title=""
        @change="changFile"
      >
      <div v-if="fileUploadLoading" class="upload-box center">
        <BaseLoading style="transform: scale(0.5);" />
      </div>
    </div>
  </div>
</template>

<style lang="scss">
  :root{
    --tg-base-upload-with:80px;
    --tg-base-upload-height:80px;
  }
</style>

<style lang="scss" scoped>
.base-upload{
  display: flex;
  gap: var(--tg-spacing-12);
  .upload-border{
    border: var(--tg-border-width-sm) solid var(--tg-border-color-main);
    border-radius: var(--tg-radius-default);
  }
}
.upload-box {
  width: var(--tg-base-upload-with);
  height: var(--tg-base-upload-height);
  position: relative;
  .icon-upload-delete {
    position: absolute;
    top: 0;
    right: 0;
  }
}
.input-upload {
  width: var(--tg-base-upload-with);
  height: var(--tg-base-upload-height);
  position: relative;
  overflow: hidden;
  background-color: var(--tg-primary-main);
  transition: var(--tg-transition);
  &:hover{
    border-color: var(--tg-border-color-deep-grey);
  }
  .input-file {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    cursor: pointer;
  }

}
</style>
