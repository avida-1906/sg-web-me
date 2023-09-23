declare interface Window {
  // extend the window
}

declare module 'virtual:svg-icons-names' {
  const names: string[]
  export default names
}

// with vite-plugin-vue-markdown, markdown files can be treated as Vue components
declare module '*.md' {
  import { type DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module '*.vue' {
  import { type DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module '*.tsx' {
  import { type DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

/**
 * 用于select的option
 */
interface ISelectOption {
  label: string
  value: string | number
}

interface IObject {
  [key: string]: any
}