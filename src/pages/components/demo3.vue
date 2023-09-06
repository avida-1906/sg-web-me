<script setup lang="ts">



const { copy } = useClipboard()
function handleKeyNum(num:String){
  alert(num)
}
function handleKeyOk(){
  alert('ok')
}

function getFile(file:any) {
  console.log(file)
}

function handleDelFile() {
  alert('删除')
}

function copyUploadCode() {
  copy(`<BaseUpload @selectFile="getFile" @deleteFile="handleDelFile" />`)
}
function copyNumericKeypadCode(){
  copy(`<div style="width: 371px;">
          <BaseNumericKeypad @keyNum="handleKeyNum" @keyOk="handleKeyOk" />
        </div>`)
}
function copyBadgeCode(type: number) {
  switch (type) {
    // 按钮
    case 1:
      copy(`<BaseBadge :count="5">
							<BaseButton @click="copyBadgeCode(1)"> copy </BaseButton>
						</BaseBadge>`)
      break
    case 2:
      copy(`<BaseBadge :count="99" :max="10">
							<BaseButton @click="copyBadgeCode(2)"> copy </BaseButton>
						</BaseBadge>`)
      break
    case 3:
      copy(`<BaseBadge :dot="true">
							<BaseButton @click="copyBadgeCode(3)"> copy </BaseButton>
						</BaseBadge>`)
      break
    case 4:
      copy(`<BaseBadge :count="25" />`)
      break
    case 5:
      copy(`<BaseBadge status="success" text="copy" />`)
      break
  }
}
</script>

<template>
  <ul>
    <li class="box">
      <AppDemoCard title="BaseUpload">
        <BaseUpload @selectFile="getFile" @deleteFile="handleDelFile" />
        <BaseButton @click="copyUploadCode"> copy </BaseButton>
      </AppDemoCard>
    </li>
    <li class="box">
      <AppDemoCard title="BaseBadge">
        <div class="flex-row">
          <div>
            <BaseBadge :count="5">
              <BaseButton @click="copyBadgeCode(1)"> copy </BaseButton>
            </BaseBadge>
          </div>
          <div>
            <BaseBadge :count="99" :max="10">
              <BaseButton @click="copyBadgeCode(2)"> copy </BaseButton>
            </BaseBadge>
          </div>
          <div>
            <BaseBadge :dot="true">
              <BaseButton @click="copyBadgeCode(3)"> copy </BaseButton>
            </BaseBadge>
          </div>
          <div>
            <BaseButton @click="copyBadgeCode(4)">
              <BaseBadge :count="25" />
            </BaseButton>
          </div>
          <div>
            <BaseButton @click="copyBadgeCode(5)">
              <BaseBadge status="success" text="copy" />
            </BaseButton>
          </div>
        </div>
      </AppDemoCard>
    </li>
    <li class="box">
      <AppDemoCard title="BaseNumericKeypad">
        <div style="width: 371px;">
          <BaseNumericKeypad @keyNum="handleKeyNum" @keyOk="handleKeyOk" />
        </div>
        <BaseButton @click="copyNumericKeypadCode"> copy </BaseButton>
      </AppDemoCard>
    </li>
  </ul>
</template>

<style scoped>
.flex-row {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
}

</style>
