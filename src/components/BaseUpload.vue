<script lang="ts" setup>
interface Props {
  readonly?: boolean // 只读
  disabled?: boolean // 禁用
  accept?: string // 可选文件类型
  showDelete?: boolean // 是否有删除按钮
}
withDefaults(defineProps<Props>(), {
  readonly: false,
  disabled: false,
  accept: 'image/png, image/jpg, application/pdf',
  showDelete: true,
})
const emit = defineEmits(['selectFile', 'deleteFile'])
const imageUrl: any = ref('')
function changFile(event: any) {
  const file = event.target.files[0]
  if (file) {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = function (e) {
      imageUrl.value = e.target?.result
    }
    emit('selectFile', file)
  }
}
function deleteImg() {
  imageUrl.value = ''
  emit('deleteFile')
}
</script>

<template>
  <div class="base-upload">
    <div v-if="imageUrl" class="img-box">
      <img class="file-img" :src="imageUrl" alt="">
      <div v-if="showDelete" class="icon-upload-delete" @click.stop="deleteImg">
        <BaseIcon name="upload-delete" />
      </div>
    </div>
    <input
      v-else
      class="input-file"
      type="file"
      :readonly="readonly"
      :accept="accept"
      :disabled="disabled"
      @change="changFile"
    >
  </div>
</template>

<style lang="scss" scoped>
.base-upload {
  width: 149px;
  height: 97px;
  position: relative;
  border-radius: var(--tg-radius-default);
  overflow: hidden;
  background-image: url(../icons/upload-border.svg), url(../icons/upload-type.svg), url(../icons/upload-up.svg);
  background-repeat: no-repeat;
  background-size: 95% 92%, 80% 80%, 25px 25px;
  background-position: center;
  background-color: #202630;

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
    padding: 4px;
    cursor: pointer;
  }

  .file-img {
    width: 100%;
    height: 100%;
  }
}
</style>
