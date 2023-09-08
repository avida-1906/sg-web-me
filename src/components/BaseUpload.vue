<script setup lang="ts">
interface Props {
  imgType?: 'frontId' | 'backId' | 'address' | 'fund' // 上传图片用途
  disabled?: boolean // 禁用
  accept?: string // 可选文件类型
  // showDelete?: boolean // 是否显示删除按钮
  imageUrl?: string // 显示图片地址
}
const props = withDefaults(defineProps<Props>(), {
  imgType: 'frontId',
  disabled: false,
  accept: 'image/png, image/jpg, application/pdf',
  // showDelete: true,
  imageUrl: '',
})
const emit = defineEmits(['selectFile', 'deleteFile'])
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
  }
})
// const imageUrl: any = ref(props.url)
function changFile(event: any) {
  const file = event.target.files[0]
  if (file) {
    // const reader = new FileReader()
    // reader.readAsDataURL(file)
    // reader.onloadend = function (e) {
    //   imageUrl.value = e.target?.result
    // }
    emit('selectFile', file)
  }
}
function deleteImg() {
  emit('deleteFile')
}
</script>

<template>
  <div :class="`base-upload ${getBackground}`">
    <div v-if="imageUrl" class="img-box">
      <img class="file-img" :src="imageUrl" alt="">
      <div v-if="!disabled" class="icon-upload-delete" @click.stop="deleteImg">
        <BaseIcon name="upload-delete" />
      </div>
    </div>
    <input
      v-else class="input-file" type="file" :accept="accept" :disabled="disabled"
      @change="changFile"
    >
  </div>
</template>

<style lang="scss" scoped>
.base-upload {
  // width: 149px;
  // height: 97px;
  height: 100%;
  width: 100%;
  position: relative;
  border-radius: var(--tg-radius-default);
  overflow: hidden;
  // background-image: url(../icons/upload-border.svg), url(../icons/upload-type.svg), url(../icons/upload-up.svg);
  background-repeat: no-repeat;
  // background-size: 95% 92%, 80% 80%, 25px 25px;
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
    padding-top: var(--tg-spacing-input-padding-vertical);
    padding-right: var(--tg-spacing-input-padding-vertical);
    cursor: pointer;
  }

  .file-img {
    width: 100%;
    height: 100%;
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
</style>
