<script setup lang="ts">
defineProps<{
  label: string
  color?: 'brand' | 'green' | 'yellow' | 'red' | 'gray'
}>()
</script>

<template>
  <span class="wiki-badge" :class="`wiki-badge--${color ?? 'gray'}`">
    {{ label }}
  </span>
</template>

<style scoped>
.wiki-badge {
  display: inline-block;
  padding: 0.1rem 0.45rem;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 600;
  line-height: 1.5;
  margin-right: 0.25rem;
  letter-spacing: 0.02em;
}

.wiki-badge--brand {
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
}

.wiki-badge--green {
  background: rgba(90, 138, 90, 0.12);
  color: #5a8a5a;
}

.dark .wiki-badge--green {
  background: rgba(122, 184, 122, 0.12);
  color: #7ab87a;
}

.wiki-badge--yellow {
  background: rgba(138, 122, 58, 0.12);
  color: #8a7a3a;
}

.dark .wiki-badge--yellow {
  background: rgba(196, 176, 96, 0.12);
  color: #c4b060;
}

.wiki-badge--red {
  background: rgba(139, 42, 42, 0.12);
  color: #8b2a2a;
}

.dark .wiki-badge--red {
  background: rgba(196, 85, 85, 0.12);
  color: #c45555;
}

.wiki-badge--gray {
  background: var(--vp-c-default-soft);
  color: var(--vp-c-text-2);
}
</style>
