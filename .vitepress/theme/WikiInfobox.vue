<script setup lang="ts">
defineProps<{
  type?: 'character' | 'place' | 'faction' | 'event'
}>()
</script>

<template>
  <aside class="wiki-infobox" :class="`wiki-infobox--${type ?? 'character'}`">
    <slot />
  </aside>
</template>

<style scoped>
.wiki-infobox {
  --wiki-infobox-accent: var(--vp-c-brand-1);
  float: right;
  width: 280px;
  margin: 0 0 1rem 1.5rem;
  border: 1px solid var(--wiki-color-warm-border);
  border-radius: 4px;
  background: var(--vp-c-bg-soft);
  font-size: 0.875rem;
  line-height: 1.5;
  overflow: hidden;
}

.wiki-infobox :deep(h3) {
  margin: 0;
  padding: 0.65rem 1rem;
  font-family: 'Cinzel', serif;
  font-size: 0.95rem;
  font-weight: 600;
  text-align: center;
  background: var(--vp-c-brand-soft);
  color: var(--wiki-infobox-accent);
  border-bottom: 1px solid var(--wiki-color-warm-border);
}

.wiki-infobox--place {
  --wiki-infobox-accent: #5a8a5a;
}

.dark .wiki-infobox--place {
  --wiki-infobox-accent: #7ab87a;
}

.wiki-infobox--faction {
  --wiki-infobox-accent: #8a7a3a;
}

.dark .wiki-infobox--faction {
  --wiki-infobox-accent: #c4b060;
}

.wiki-infobox--event {
  --wiki-infobox-accent: var(--wiki-color-crimson);
}

.wiki-infobox :deep(table) {
  width: 100%;
  border-collapse: collapse;
  margin: 0;
}

.wiki-infobox :deep(th),
.wiki-infobox :deep(td) {
  padding: 0.35rem 1rem;
  border-bottom: 1px solid var(--wiki-color-warm-border);
  text-align: left;
}

.wiki-infobox :deep(th) {
  font-weight: 600;
  width: 40%;
  color: var(--vp-c-text-2);
}

.wiki-infobox :deep(td) {
  color: var(--vp-c-text-1);
}

.wiki-infobox :deep(p) {
  padding: 0.5rem 1rem;
  margin: 0;
}

@media (max-width: 640px) {
  .wiki-infobox {
    float: none;
    width: 100%;
    margin: 0 0 1rem 0;
  }
}
</style>
