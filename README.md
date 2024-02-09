## 所有的css变量都已经写在main.scss里面了，写组件的时候要注意使用变量

## 组件全部放在 `src/components` 目录下，除了路由组件

### 关于全局数据
为了避免产生太多重复的代码，
stores、
http
utils
vite.config.js
.eslintrc
文件和文件夹 代码全部由akun维护，如果需要添加或者修改，可以直接通知修改，或者直接提供代码给akun。

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

### 组件内部:root 命名规范
使用 --tg-组件名称-style-xxxx 这样命名


### 关于网络请求
```js
// 统一使用vue-request, 全局已经将manual设置成了true，所以需要手动调用，要使用runAsync，不能使用run
await application.allSettled([run1(), run2()])
```

### script setup 代码顺序，每类之间空一行
类型定义(interface, type)

props

hooks

data

computed

methods

watch, watchEffect

mounted

…生命周期

初始化需要执行的函数，比如网络请求 init()之类的

### 关于KeepAlive名称
```js
// 统一使用 KeepAlive开头+组件名称，如
defineOptions({
  name: 'KeepAliveCasino',
})
```

### 不要出现any类型

### 多语言
新增多语言添加到根目录的 lang.yml 文件中，如：
```yml
test: 测试
```
然后终端执行 `pnpm add:lang` 会自动添加到 `src/locales` 下的所有语言文件中。