<script setup lang="ts">
import { computed } from 'vue'
import { useData } from 'vitepress'
import { data } from './sessions.data.mjs'

const { page } = useData()
const sessions = computed(() => data[`/${page.value.relativePath.replace(/\.md$/, '')}`] ?? [])
</script>

<template>
  <section v-if="sessions.length" class="vp-doc session-mentions" aria-labelledby="session-mentions-heading">
    <h2 id="session-mentions-heading">Mentioned in sessions</h2>
    <p>Latest mentions first. Follow a recap to see what the party learned.</p>
    <ul>
      <li v-for="session in sessions" :key="session.url">
        <a :href="session.url">{{ session.title }}</a>
      </li>
    </ul>
  </section>
</template>

<style scoped>
.session-mentions {
  clear: both;
  margin-top: 2rem;
}
</style>
