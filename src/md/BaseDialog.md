#### 模板里使用
  <BaseDialog v-model:show="showDialog" icon="uni-trend" title="提款">
    <div class="data-table">
      内容
    </div>
  </BaseDialog>

#### 函数调用
const { openDialog, closeDialog } = useDialog({
  title: '表格',
  icon: 'balls-darts-on',
  default: () => h(AppDemoCard, { title: '标题' }, {
    default: () => h('table', { style: { color: 'orange' } }, 'abcdefg'),
  }),
})
function showDialog() {
  openDialog()
  setTimeout(() => {
    closeDialog()
  }, 3000)
}