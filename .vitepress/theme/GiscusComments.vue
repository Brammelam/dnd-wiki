<script setup lang="ts">
import { useData, useRoute } from 'vitepress'
import { ref, watch, nextTick, onMounted } from 'vue'

const { isDark, frontmatter } = useData()
const route = useRoute()
const container = ref<HTMLElement>()

const isDoc = () => frontmatter.value.layout !== 'page' && frontmatter.value.layout !== 'home'

function loadGiscus() {
  if (!container.value || !isDoc()) return
  container.value.innerHTML = ''

  const script = document.createElement('script')
  script.src = 'https://giscus.app/client.js'
  script.setAttribute('data-repo', 'Brammelam/dnd-wiki')
  script.setAttribute('data-repo-id', 'R_kgDOSBoiMQ')
  script.setAttribute('data-category', 'General')
  script.setAttribute('data-category-id', 'DIC_kwDOSBoiMc4C6xJa')
  script.setAttribute('data-mapping', 'pathname')
  script.setAttribute('data-strict', '0')
  script.setAttribute('data-reactions-enabled', '1')
  script.setAttribute('data-emit-metadata', '0')
  script.setAttribute('data-input-position', 'bottom')
  script.setAttribute('data-theme', isDark.value ? 'transparent_dark' : 'light')
  script.setAttribute('data-lang', 'en')
  script.crossOrigin = 'anonymous'
  script.async = true
  container.value.appendChild(script)
}

onMounted(loadGiscus)

watch(() => route.path, () => {
  nextTick(loadGiscus)
})

watch(isDark, (dark) => {
  const iframe = document.querySelector<HTMLIFrameElement>('.giscus-frame')
  iframe?.contentWindow?.postMessage(
    { giscus: { setConfig: { theme: dark ? 'transparent_dark' : 'light' } } },
    'https://giscus.app',
  )
})
</script>

<template>
  <div v-if="isDoc()" ref="container" class="giscus-wrapper" />
</template>

<style scoped>
.giscus-wrapper {
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--wiki-color-warm-border, var(--vp-c-divider));
}
</style>
