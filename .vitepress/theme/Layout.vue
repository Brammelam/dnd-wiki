<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'
import GiscusComments from './GiscusComments.vue'
import SessionMentions from './SessionMentions.vue'

const { Layout } = DefaultTheme
</script>

<template>
  <Layout>
    <template #doc-footer-before>
      <SessionMentions />
    </template>
    <template #doc-after>
      <GiscusComments />
    </template>
  </Layout>
</template>
