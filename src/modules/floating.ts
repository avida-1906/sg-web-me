import FloatingVue from 'floating-vue'
import type { FloatingVueConfig } from 'floating-vue/dist/config'
import 'floating-vue/dist/style.css'
import type { App } from 'vue'

export const config: FloatingVueConfig = {
  // Disable popper components
  disabled: false,
  // Default position offset along main axis (px)
  distance: 10,
  // Default position offset along cross axis (px)
  skidding: 0,
  // Default container where the tooltip will be appended
  container: 'body',
  // Element used to compute position and size boundaries
  boundary: undefined,
  // Skip delay & CSS transitions when another popper is shown, so that the popper appear to instanly move to the new position.
  instantMove: false,
  // Auto destroy tooltip DOM nodes (ms)
  disposeTimeout: 5000,
  // Triggers on the popper itself
  popperTriggers: [],
  // Positioning strategy
  strategy: 'absolute',
  // Prevent overflow
  preventOverflow: true,
  // Flip to the opposite placement if needed
  flip: true,
  // Shift on the cross axis to prevent the popper from overflowing
  shift: true,
  // Overflow padding (px)
  overflowPadding: 0,
  // Arrow padding (px)
  arrowPadding: 0,
  // Compute arrow overflow (useful to hide it)
  arrowOverflow: true,
  autoBoundaryMaxSize: true,
  // Themes
  themes: {
    tooltip: {
      $extend: 'dropdown',
      // Default tooltip placement relative to target element
      placement: 'top',
      // Default events that trigger the tooltip
      triggers: ['hover', 'focus', 'touch'],
      // Close tooltip on click on tooltip target
      hideTriggers: (events: any) => [...events, 'click'],
      // Delay (ms)
      delay: {
        show: 0,
        hide: 0,
      },
      // Update popper on content resize
      handleResize: true,
      // Enable HTML content in directive
      html: false,
      // Displayed when tooltip content is loading
      loadingContent: '...',
    },
    dropdown: {
      $extend: 'tg-popper-outer',
      // Default dropdown placement relative to target element
      placement: 'bottom',
      // Default events that trigger the dropdown
      triggers: ['click'],
      // Delay (ms)
      delay: 0,
      // Update popper on content resize
      handleResize: true,
      // Hide on click outside
      autoHide: true,
    },
    menu: {
      $extend: 'dropdown',
      triggers: ['hover', 'focus'],
      popperTriggers: ['hover', 'focus'],
      delay: {
        show: 0,
        hide: 0,
      },
    },
  },
}

export function install(app: App<Element>) {
  app.use(FloatingVue, config)
}
