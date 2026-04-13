<script setup lang="ts">
import { useData } from 'vitepress'

const { isDark } = useData()

const categories = [
  {
    title: 'Characters',
    href: '/characters/',
    description: 'Player characters and the NPCs encountered across the campaign.',
    count: 24,
  },
  {
    title: 'Places',
    href: '/places/',
    description: 'Cities, taverns, dungeons, and wilderness across the realm.',
    count: 19,
  },
  {
    title: 'Factions',
    href: '/factions/',
    description: 'Guilds, temples, and organizations shaping the world.',
    count: 6,
  },
  {
    title: 'Events',
    href: '/events/',
    description: 'Major plot points from conspiracy to war.',
    count: 10,
  },
  {
    title: 'Sessions',
    href: '/sessions/',
    description: 'Full recaps of every session played.',
    count: 14,
  },
]

const recentSessions = [
  { title: 'Session 14 — Salt, Thorn & Cheese', href: '/sessions/session-14' },
  { title: 'Session 13 — Burning of Sire', href: '/sessions/session-13' },
  { title: 'Session 12 — Graveyard Confrontation', href: '/sessions/session-12' },
]
</script>

<template>
  <div class="wiki-home">
    <header class="wiki-home__header">
      <h1 class="wiki-home__title">Chronicles of Morgan</h1>
      <p class="wiki-home__tagline">
        A living record of our adventures through the Kingdom of Morgan and beyond
      </p>
    </header>

    <div class="wiki-home__body">
      <section class="wiki-home__portal">
        <h2 class="wiki-home__section-title">Browse the Wiki</h2>
        <div class="wiki-home__grid">
          <a
            v-for="cat in categories"
            :key="cat.title"
            :href="cat.href"
            class="wiki-home__card"
          >
            <span class="wiki-home__card-title">{{ cat.title }}</span>
            <span class="wiki-home__card-count">{{ cat.count }} articles</span>
            <span class="wiki-home__card-desc">{{ cat.description }}</span>
          </a>
        </div>
      </section>

      <aside class="wiki-home__sidebar">
        <h2 class="wiki-home__section-title">The Story So Far</h2>
        <div class="wiki-home__prose">
          <p>
            Our party &mdash;
            <a href="/characters/voris">Voris</a>,
            <a href="/characters/peren">Peren</a>,
            <a href="/characters/flint">Flint</a>,
            <a href="/characters/thia">Thia</a>,
            <a href="/characters/elowen">Elowen</a>,
            <a href="/characters/fenris">Fenris</a>,
            <a href="/characters/lilith">Lilith</a>,
            <a href="/characters/galrok">Gal'Rok</a>, and
            <a href="/characters/sir-simon">Sir Simon</a>
            &mdash; were ordinary residents of
            <a href="/places/morgans-keep">Morgan's Keep</a>, the capital of the
            <a href="/places/kingdom-of-morgan">Kingdom of Morgan</a>.
          </p>
          <p>
            Everything changed when they were arrested for the
            <a href="/events/crown-prince-murder">murder of the Crown Prince</a>
            &mdash; a crime they did not commit. After a daring
            <a href="/events/escape-from-morgans-keep">escape</a>, they became
            fugitives, traveling through the kingdom seeking answers and allies
            while trying to clear their names.
          </p>
          <p>
            Their journey has taken them through the trading town of
            <a href="/places/turn">Turn</a>, the port city of
            <a href="/places/rinden">Rinden</a>, the mountain stronghold of
            <a href="/places/dior">Dior</a>, and beyond &mdash; encountering fey
            creatures, ancient crypts, political intrigue, and a conspiracy that
            reaches to the highest levels of power.
          </p>
        </div>

        <h3 class="wiki-home__sub-title">Recent Sessions</h3>
        <ul class="wiki-home__recent">
          <li v-for="s in recentSessions" :key="s.href">
            <a :href="s.href">{{ s.title }}</a>
          </li>
        </ul>
      </aside>
    </div>
  </div>
</template>

<style scoped>
.wiki-home {
  max-width: 1152px;
  margin: 0 auto;
  padding: 2rem 1.5rem 4rem;
}

.wiki-home__header {
  text-align: center;
  padding: 3rem 0 2rem;
  border-bottom: 2px solid var(--vp-c-brand-1);
  margin-bottom: 2rem;
}

.wiki-home__title {
  font-family: 'Cinzel', serif;
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--vp-c-brand-1);
  margin: 0 0 0.5rem;
  letter-spacing: 0.02em;
  line-height: 1.2;
}

.wiki-home__tagline {
  font-size: 1.05rem;
  color: var(--vp-c-text-2);
  margin: 0;
  max-width: 540px;
  margin-left: auto;
  margin-right: auto;
}

.wiki-home__body {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2.5rem;
  align-items: start;
}

.wiki-home__section-title {
  font-family: 'Cinzel', serif;
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin: 0 0 1rem;
  padding-bottom: 0.4rem;
  border-bottom: 1px solid var(--wiki-color-warm-border, var(--vp-c-divider));
  letter-spacing: 0.01em;
}

.wiki-home__sub-title {
  font-family: 'Cinzel', serif;
  font-size: 1rem;
  font-weight: 500;
  color: var(--vp-c-text-1);
  margin: 1.5rem 0 0.75rem;
}

.wiki-home__grid {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.wiki-home__card {
  display: grid;
  grid-template-columns: 1fr auto;
  grid-template-rows: auto auto;
  gap: 0 1rem;
  padding: 0.75rem 1rem;
  border: 1px solid var(--wiki-color-warm-border, var(--vp-c-divider));
  border-left: 3px solid var(--vp-c-brand-1);
  border-radius: 4px;
  background: var(--vp-c-bg-soft);
  text-decoration: none;
  transition: border-color 0.15s, background 0.15s;
}

.wiki-home__card:hover {
  border-color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft);
}

.wiki-home__card-title {
  font-family: 'Cinzel', serif;
  font-size: 1rem;
  font-weight: 600;
  color: var(--vp-c-brand-1);
  grid-column: 1;
  grid-row: 1;
}

.wiki-home__card-count {
  font-size: 0.8rem;
  color: var(--vp-c-text-3);
  grid-column: 2;
  grid-row: 1;
  align-self: center;
  white-space: nowrap;
}

.wiki-home__card-desc {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  grid-column: 1 / -1;
  grid-row: 2;
  margin-top: 0.2rem;
  line-height: 1.4;
}

.wiki-home__prose {
  font-size: 0.95rem;
  line-height: 1.7;
  color: var(--vp-c-text-1);
}

.wiki-home__prose p {
  margin: 0 0 0.75rem;
}

.wiki-home__prose a {
  color: var(--vp-c-brand-1);
  text-decoration-color: var(--vp-c-brand-soft);
  transition: color 0.15s;
}

.wiki-home__prose a:hover {
  color: var(--vp-c-brand-2);
}

.wiki-home__recent {
  list-style: none;
  padding: 0;
  margin: 0;
}

.wiki-home__recent li {
  padding: 0.35rem 0;
  border-bottom: 1px solid var(--wiki-color-warm-border, var(--vp-c-divider));
  font-size: 0.9rem;
}

.wiki-home__recent li:last-child {
  border-bottom: none;
}

.wiki-home__recent a {
  color: var(--vp-c-brand-1);
  text-decoration: none;
  transition: color 0.15s;
}

.wiki-home__recent a:hover {
  color: var(--vp-c-brand-2);
}

@media (max-width: 768px) {
  .wiki-home__body {
    grid-template-columns: 1fr;
  }

  .wiki-home__title {
    font-size: 1.8rem;
  }

  .wiki-home__header {
    padding: 2rem 0 1.5rem;
  }
}
</style>
