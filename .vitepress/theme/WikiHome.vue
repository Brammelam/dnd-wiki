<script setup lang="ts">
const categories = [
  {
    title: 'Characters',
    href: '/characters/',
    description: 'Player characters and the NPCs encountered across the campaign.',
    count: 43,
  },
  {
    title: 'Places',
    href: '/places/',
    description: 'Cities, taverns, dungeons, and wilderness across the realm.',
    count: 28,
  },
  {
    title: 'Factions',
    href: '/factions/',
    description: 'Guilds, temples, and organizations shaping the world.',
    count: 7,
  },
  {
    title: 'Events',
    href: '/events/',
    description: 'Major plot points from conspiracy to war.',
    count: 21,
  },
  {
    title: 'Sessions',
    href: '/sessions/',
    description: 'Full recaps of every session played.',
    count: 29,
  },
]

const recentSessions = [
  { title: 'Session 29 — The Trial of Lady Alabaster', href: '/sessions/session-29' },
  { title: 'Session 28 — The Burning Barge', href: '/sessions/session-28' },
  { title: 'Session 27 — Infiltrating Humanus', href: '/sessions/session-27' },
]
</script>

<template>
  <div class="wiki-home">
    <header class="wiki-home__header">
      <div class="wiki-home__masthead">
        <h1 class="wiki-home__title">Chronicles <span>of Morgan</span></h1>
        <p class="wiki-home__tagline">
          A living record of our adventures through the Kingdom of Morgan and beyond
        </p>
      </div>
      <a class="wiki-home__latest" :href="recentSessions[0].href">
        <span class="wiki-home__latest-label">Latest session</span>
        <span class="wiki-home__latest-title">{{ recentSessions[0].title.split(' — ')[1] }}</span>
        <span class="wiki-home__latest-action">Read latest session <span aria-hidden="true">→</span></span>
      </a>
    </header>

    <div class="wiki-home__body">
      <section class="wiki-home__story">
        <h2 class="wiki-home__section-title">The Story So Far</h2>
        <div class="wiki-home__prose">
          <p>
            Our party &mdash;
            <a href="/characters/varis">Varis</a>,
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
            <a :href="s.href">{{ s.title }} <span aria-hidden="true">↗</span></a>
          </li>
        </ul>
      </section>

      <nav class="wiki-home__portal" aria-label="Browse the wiki">
        <h2 class="wiki-home__section-title">Browse the Wiki</h2>
        <div class="wiki-home__grid">
          <a
            v-for="cat in categories"
            :key="cat.title"
            :href="cat.href"
            class="wiki-home__card"
          >
            <span class="wiki-home__card-title">{{ cat.title }}</span>
            <span class="wiki-home__card-desc">{{ cat.description }}</span>
            <span class="wiki-home__card-count">{{ cat.count }} articles <span aria-hidden="true">↗</span></span>
          </a>
        </div>
      </nav>
    </div>
  </div>
</template>

<style scoped>
.wiki-home {
  box-sizing: border-box;
  width: min(100%, 1152px);
  margin: 0 auto;
  padding: 2rem clamp(1.25rem, 4vw, 3.5rem) 5rem;
}

.wiki-home__header {
  display: grid;
  grid-template-columns: minmax(0, 1.5fr) minmax(230px, 0.7fr);
  align-items: end;
  gap: clamp(2rem, 6vw, 6rem);
  padding: clamp(2.5rem, 6vw, 6rem) 0 clamp(2.5rem, 5vw, 4.5rem);
  border-top: 1px solid var(--vp-c-brand-1);
  border-bottom: 1px solid var(--wiki-color-warm-border);
  margin-bottom: clamp(2.5rem, 5vw, 4.5rem);
}

.wiki-home__title {
  max-width: 12ch;
  font-family: 'Cinzel', Georgia, serif;
  font-size: clamp(3rem, 6vw, 5.75rem);
  font-weight: 600;
  color: var(--vp-c-brand-1);
  margin: 0 0 1.5rem;
  padding: 0;
  border: 0;
  letter-spacing: -0.035em;
  line-height: 1.05;
  text-wrap: balance;
}

.wiki-home__title span {
  display: block;
  color: var(--vp-c-text-1);
}

.wiki-home__tagline {
  font-size: 1.12rem;
  color: var(--vp-c-text-2);
  margin: 0;
  max-width: 36ch;
  line-height: 1.5;
}

.wiki-home__latest {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: 1.5rem 0 0;
  border-top: 1px solid var(--vp-c-brand-1);
  color: var(--vp-c-text-1);
  text-decoration: none;
}

.wiki-home__latest-label,
.wiki-home__latest-action {
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.09em;
  text-transform: uppercase;
  color: var(--vp-c-brand-1);
}

.wiki-home__latest-title {
  font-family: 'Cinzel', Georgia, serif;
  font-size: clamp(1.25rem, 2vw, 1.65rem);
  line-height: 1.3;
  transition: color 0.2s ease;
}

.wiki-home__latest:hover .wiki-home__latest-title {
  color: var(--vp-c-brand-1);
}

.wiki-home__latest-action {
  margin-top: 0.25rem;
  letter-spacing: 0.02em;
  text-transform: none;
}

.wiki-home__latest-action span {
  margin-left: 0.35rem;
}

.wiki-home__body {
  display: grid;
  grid-template-columns: minmax(0, 1.25fr) minmax(0, 0.75fr);
  gap: clamp(2.5rem, 7vw, 7rem);
  align-items: start;
}

.wiki-home__section-title {
  font-family: 'Cinzel', Georgia, serif;
  font-size: 1.35rem;
  font-weight: 500;
  color: var(--vp-c-text-1);
  margin: 0 0 1.5rem;
  padding: 0 0 0.7rem;
  border-bottom: 1px solid var(--wiki-color-warm-border);
  letter-spacing: -0.02em;
}

.wiki-home__sub-title {
  font-family: 'Cinzel', Georgia, serif;
  font-size: 1.1rem;
  font-weight: 500;
  color: var(--vp-c-text-1);
  margin: 3rem 0 0.75rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--wiki-color-warm-border);
}

.wiki-home__grid {
  display: grid;
}

.wiki-home__card {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.25rem;
  padding: 1.15rem 0;
  border-bottom: 1px solid var(--wiki-color-warm-border);
  text-decoration: none;
  transition: border-color 0.2s ease;
}

.wiki-home__card:hover {
  border-color: var(--vp-c-brand-1);
}

.wiki-home__card-title {
  font-family: 'Cinzel', Georgia, serif;
  font-size: 1.17rem;
  font-weight: 500;
  color: var(--vp-c-text-1);
}

.wiki-home__card-count {
  margin-top: 0.35rem;
  font-size: 0.8rem;
  color: var(--vp-c-brand-1);
  font-variant-numeric: tabular-nums;
}

.wiki-home__card-count span {
  margin-left: 0.25rem;
}

.wiki-home__card-desc {
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
  line-height: 1.5;
}

.wiki-home__prose {
  max-width: 68ch;
  font-size: 1.05rem;
  line-height: 1.75;
  color: var(--vp-c-text-1);
}

.wiki-home__prose p {
  margin: 0 0 1.25rem;
}

.wiki-home__prose p:first-child::first-letter {
  float: left;
  padding: 0.09em 0.12em 0 0;
  font-family: 'Cinzel', Georgia, serif;
  font-size: 3.6em;
  line-height: 0.8;
  color: var(--vp-c-brand-1);
}

.wiki-home__prose a {
  color: var(--vp-c-brand-1);
  text-decoration-color: var(--wiki-color-warm-border);
  text-underline-offset: 0.18em;
}

.wiki-home__prose a:hover {
  color: var(--vp-c-brand-2);
  text-decoration-color: currentColor;
}

.wiki-home__recent {
  list-style: none;
  padding: 0;
  margin: 0;
}

.wiki-home__recent li {
  border-bottom: 1px solid var(--wiki-color-warm-border);
}

.wiki-home__recent a {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.65rem 0;
  color: var(--vp-c-text-1);
  text-decoration: none;
  font-size: 0.92rem;
  transition: color 0.2s ease;
}

.wiki-home__recent a:hover,
.wiki-home__recent a span {
  color: var(--vp-c-brand-1);
}

.wiki-home a:focus-visible {
  outline: 2px solid var(--vp-c-brand-1);
  outline-offset: 4px;
}

.wiki-home ::selection {
  background: var(--vp-c-brand-1);
  color: var(--vp-c-bg);
}

@media (max-width: 768px) {
  .wiki-home__header,
  .wiki-home__body {
    grid-template-columns: 1fr;
  }

  .wiki-home__header {
    gap: 2.5rem;
  }

  .wiki-home__title {
    font-size: clamp(2.5rem, 10vw, 4.5rem);
  }

  .wiki-home__body {
    gap: 3rem;
  }

  .wiki-home__portal {
    order: -1;
  }
}

@media (prefers-reduced-motion: reduce) {
  .wiki-home a,
  .wiki-home__latest-title {
    transition: none;
  }
}
</style>
