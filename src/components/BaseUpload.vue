<script setup lang="ts">
interface Props {
  modelValue: string
  imgType?: 'frontId' | 'backId' | 'address' | 'fund' | 'common' // 上传图片用途
  disabled?: boolean // 禁用
  accept?: string // 可选文件类型
  // showDelete?: boolean // 是否显示删除按钮
  // imageUrl?: string // 显示图片地址
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  imgType: 'frontId',
  disabled: false,
  accept: 'image/png, image/jpg',
  // showDelete: true,
  // imageUrl: '',
})

const emit = defineEmits(['update:modelValue', 'delete'])
const { VITE_CASINO_IMG_CLOUD_URL } = getEnv()

const {
  data: fileUrl,
  run: runFileUpload,
  loading: fileUploadLoading,
} = useRequest(ApiMemberUpload, {
  onSuccess() {
    emit('update:modelValue', fileUrl.value)
  },
})

const getBackground = computed(() => {
  switch (props.imgType) {
    case 'frontId':
      return 'front-id-bg'
    case 'backId':
      return 'back-id-bg'
    case 'address':
      return 'address-bg'
    case 'fund':
      return 'fund-bg'
    case 'common':
      return 'common-bg'
  }
})
const getUrl = computed(() => {
  return props.modelValue ? (`${VITE_CASINO_IMG_CLOUD_URL}/${props.modelValue}`) : ''
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
function deleteImg() {
  emit('update:modelValue', '')
}
</script>

<template>
  <div class="base-upload" :class="[getBackground]">
    <div v-if="getUrl" class="center img-box">
      <BaseImage class="file-img" is-network :url="getUrl" />
      <BaseButton
        v-if="!disabled"
        class="icon-upload-delete"
        type="text"
        @click.stop="deleteImg"
      >
        <BaseIcon name="upload-delete" />
      </BaseButton>
      <!-- <div v-if="!disabled" class="icon-upload-delete" @click.stop="deleteImg">
        <BaseIcon name="upload-delete" />
      </div> -->
    </div>
    <input
      v-else class="input-file" type="file" :accept="accept" :disabled="disabled"
      @change="changFile"
    >
    <div v-if="fileUploadLoading" class="img-box center">
      <BaseLoading style="transform: scale(0.5);" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.base-upload {
  height: 100%;
  width: 100%;
  position: relative;
  border-radius: var(--tg-radius-default);
  overflow: hidden;
  background-repeat: no-repeat;
  background-position: center;
  background-color: var(--tg-secondary-grey);

  .input-file {
    width: 100%;
    height: 100%;
    opacity: 0;
    cursor: pointer;
  }

  .img-box {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    right: 0;
  }

  .icon-upload-delete {
    position: absolute;
    top: 0;
    right: 0;
  }
}
.front-id-bg{
  background-image: url(../icons/upload-border.svg), url(../icons/upload-id-border.svg), url(../icons/upload-id-person.svg), url(../icons/upload-up.svg);
  background-size: 95% 92%, 80% 80%,70% 70%, 25px 25px;
}
.back-id-bg{
  background-image: url(../icons/upload-border.svg), url(../icons/upload-id-border.svg), url(../icons/upload-id-text.svg),  url(../icons/upload-id-text.svg), url(../icons/upload-up.svg);
  background-size: 95% 92%, 80% 80%,25% 40%,25% 40%, 25px 25px;
  background-position: center,center,left 25% center,right 25% center,center;
}
.address-bg{
  background-image: url(../icons/upload-border.svg), url(../icons/upload-type.svg), url(../icons/upload-up.svg);
  background-size: 95% 92%, 80% 80%, 25px 25px;
}
.fund-bg{
  background-image: url(../icons/upload-border.svg), url(../icons/upload-fund.svg), url(../icons/upload-up.svg);
  background-size: 95% 92%, 80% 80%, 25px 25px;
}
.common-bg{
  background-image: url(../icons/upload-common.svg);
}
</style>
