## 所有的css变量都已经写在main.scss里面了，写组件的时候要注意使用变量

## 组件全部放在 `src/components` 目录下，除了路由组件

### 关于全局数据
为了避免产生太多重复的代码，stores、http和utils文件夹代码全部由akun维护，如果需要添加或者修改，可以直接通知修改，或者直接提供代码。

### 组件
基础组件都使用 `Base` 开头，如 `BaseButton、BaseInput` 等。    
业务组件都使用 `App` 开头，如 `AppHeader、AppFooter` 等。    
组件写好后全部在 `/components/index.vue` 下把demo写上，复制功能加上。    
给组件把README.md写上，方便后续使用。


### Pages文件夹
pages 下面所有的文件夹和文件都使用中横线 `-` 连接，如 `home-page`。

### Class 命名
统一使用中横线 `-` 连接，如 `app-header`。  不要出现下划线 `_` 和驼峰命名法。 

### 函数和组件都使用自动引入

