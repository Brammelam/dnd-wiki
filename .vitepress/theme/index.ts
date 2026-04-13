import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import WikiInfobox from './WikiInfobox.vue'
import WikiBadge from './WikiBadge.vue'
import WikiHome from './WikiHome.vue'
import './custom.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('WikiInfobox', WikiInfobox)
    app.component('WikiBadge', WikiBadge)
    app.component('WikiHome', WikiHome)
  },
} satisfies Theme
