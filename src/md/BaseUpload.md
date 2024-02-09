# KYC验证 上传图片
```
<BaseUpload img-type="fund" :image-url="imageUrl2" disabled @select-file="getFile" @delete-file="handleDelFile" />
```
## Props
img-type
>? :string 上传图片用途 （'frontId' | 'backId' | 'address' | 'fund'）（id正面｜id背面｜地址证明｜资金证明）  默认'frontId'

image-url
>? :string 显示图片地址 默认''

disabled
>? :boolean 是否禁用 默认false，为true时不显示删除按钮

accept
>? :string 可选文件类型 默认'image/png, image/jpg, application/pdf'

## Slot
无

## Event
select-file
>选择文件触发

delete-file
>删除触发