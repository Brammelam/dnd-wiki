import DefaultTheme from 'vitepress/theme-without-fonts'
import type { Theme } from 'vitepress'
import Layout from './Layout.vue'
import WikiInfobox from './WikiInfobox.vue'
import WikiHome from './WikiHome.vue'
import './fonts.css'
import './custom.css'

export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app }) {
    app.component('WikiInfobox', WikiInfobox)
    app.component('WikiHome', WikiHome)
  },
} satisfies Theme
