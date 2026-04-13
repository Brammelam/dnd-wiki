import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Chronicles of Morgan',
  description: 'A wiki for our D&D campaign',
  cleanUrls: true,

  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }],
    ['link', { href: 'https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700&family=Source+Sans+3:ital,wght@0,300;0,400;0,600;0,700;1,400&display=swap', rel: 'stylesheet' }],
  ],

  themeConfig: {
    logo: '/favicon.svg',
    siteTitle: 'Chronicles of Morgan',

    search: {
      provider: 'local',
    },

    nav: [
      { text: 'Home', link: '/' },
      { text: 'Characters', link: '/characters/' },
      { text: 'Places', link: '/places/' },
      { text: 'Factions', link: '/factions/' },
      { text: 'Events', link: '/events/' },
      { text: 'Sessions', link: '/sessions/' },
    ],

    sidebar: {
      '/characters/': [
        {
          text: 'Characters',
          link: '/characters/',
          items: [
            {
              text: 'Player Characters',
              collapsed: false,
              items: [
                { text: 'Voris', link: '/characters/voris' },
                { text: 'Peren', link: '/characters/peren' },
                { text: 'Elowen', link: '/characters/elowen' },
                { text: 'Fenris Shadowveil', link: '/characters/fenris' },
                { text: 'Lilith', link: '/characters/lilith' },
                { text: "Gal'Rok", link: '/characters/galrok' },
                { text: 'Flint', link: '/characters/flint' },
                { text: 'Thia', link: '/characters/thia' },
                { text: 'Sir Simon Strong', link: '/characters/sir-simon' },
              ],
            },
            {
              text: 'NPCs',
              collapsed: false,
              items: [
                { text: 'Helga', link: '/characters/helga' },
                { text: 'Carlos', link: '/characters/carlos' },
                { text: 'Bob Swords', link: '/characters/bob-swords' },
                { text: 'Toltec', link: '/characters/toltec' },
                { text: 'Gilda', link: '/characters/gilda' },
                { text: 'Practical Joe', link: '/characters/practical-joe' },
                { text: 'Fat Hans', link: '/characters/fat-hans' },
                { text: 'Salander', link: '/characters/salander' },
                { text: 'Lynch', link: '/characters/lynch' },
                { text: 'Sommerhimmel', link: '/characters/sommerhimmel' },
                { text: 'Tore Idle', link: '/characters/tore-idle' },
                { text: 'Knut Pilsen', link: '/characters/knut-pilsen' },
                { text: 'Lynn Salt', link: '/characters/lynn-salt' },
                { text: 'Father Terry', link: '/characters/father-terry' },
                { text: 'Frida', link: '/characters/frida' },
              ],
            },
          ],
        },
      ],

      '/places/': [
        {
          text: 'Places',
          link: '/places/',
          items: [
            { text: "Morgan's Keep", link: '/places/morgans-keep' },
            { text: 'Kingdom of Morgan', link: '/places/kingdom-of-morgan' },
            { text: 'Rinden', link: '/places/rinden' },
            { text: 'Saltside', link: '/places/saltside' },
            { text: 'Greenfield', link: '/places/greenfield' },
            { text: 'Turn', link: '/places/turn' },
            { text: 'The Large Log', link: '/places/the-large-log' },
            { text: 'Dior', link: '/places/dior' },
            { text: "Mountain Dew's Rest", link: '/places/mountain-dews-rest' },
            { text: 'The Academy (Dior)', link: '/places/the-academy' },
            { text: 'The Crypt of Dior', link: '/places/the-crypt' },
            { text: 'Hooves Bay', link: '/places/hooves-bay' },
            { text: 'Sire', link: '/places/sire' },
            { text: 'Kalén', link: '/places/kalen' },
            { text: 'Tyr Moir', link: '/places/tyr-moir' },
            { text: 'Azure Oak Grove', link: '/places/azure-oak-grove' },
            { text: 'Fey Realm', link: '/places/fey-realm' },
            { text: 'Alverike', link: '/places/alverike' },
            { text: 'Dead Isle', link: '/places/dead-isle' },
          ],
        },
      ],

      '/factions/': [
        {
          text: 'Factions & Organizations',
          link: '/factions/',
          items: [
            { text: "The King's Guard", link: '/factions/kings-guard' },
            { text: 'The Academy', link: '/factions/the-academy' },
            { text: 'The Crabs', link: '/factions/the-crabs' },
            { text: 'Toll Guild', link: '/factions/toll-guild' },
            { text: 'Humanus Association', link: '/factions/humanus-association' },
            { text: 'Temple of the Just', link: '/factions/temple-of-tyr' },
          ],
        },
      ],

      '/events/': [
        {
          text: 'Key Events',
          link: '/events/',
          items: [
            { text: 'Crown Prince Murder', link: '/events/crown-prince-murder' },
            { text: "Escape from Morgan's Keep", link: '/events/escape-from-morgans-keep' },
            { text: 'Azure Oak Quest', link: '/events/azure-oak-quest' },
            { text: 'Mercenary Ambush', link: '/events/mercenary-ambush' },
            { text: 'The Crabs Job', link: '/events/the-crabs-job' },
            { text: "Fey Portal & Flint's Arm", link: '/events/fey-portal' },
            { text: 'Hooves Bay Outpost', link: '/events/hooves-bay-outpost' },
            { text: 'Dior Crypt Expedition', link: '/events/dior-crypt' },
            { text: 'Dior Wedding & Helga', link: '/events/dior-wedding' },
            { text: 'Burning of Sire', link: '/events/burning-of-sire' },
          ],
        },
      ],

      '/sessions/': [
        {
          text: 'Session Log',
          link: '/sessions/',
          items: [
            { text: 'Session 1 – Framed & Fled', link: '/sessions/session-01' },
            { text: 'Session 2 – Turn & the Azure Oak', link: '/sessions/session-02' },
            { text: 'Session 3 – Selling the Seed', link: '/sessions/session-03' },
            { text: 'Session 4 – Fat Hans Ambush', link: '/sessions/session-04' },
            { text: 'Session 5 – The Crabs of Rinden', link: '/sessions/session-05' },
            { text: 'Session 6 – Arriving in Dior', link: '/sessions/session-06' },
            { text: 'Session 7 – Into the Crypt', link: '/sessions/session-07' },
            { text: 'Session 8 – Escaping the Crypt', link: '/sessions/session-08' },
            { text: 'Session 9 – Hooves Bay & Outpost', link: '/sessions/session-09' },
            { text: 'Session 10 – Wedding Plans', link: '/sessions/session-10' },
            { text: 'Session 11 – Helga, Come Alone', link: '/sessions/session-11' },
            { text: 'Session 12 – Graveyard Confrontation', link: '/sessions/session-12' },
            { text: 'Session 13 – Burning of Sire', link: '/sessions/session-13' },
            { text: 'Session 14 – Salt, Thorn & Cheese', link: '/sessions/session-14' },
          ],
        },
      ],
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/Brammelam/dnd-wiki' },
    ],

    editLink: {
      pattern: 'https://github.com/Brammelam/dnd-wiki/edit/main/:path',
      text: 'Edit this page on GitHub',
    },

    footer: {
      message: 'Chronicles of Morgan — A D&D Campaign Wiki',
    },
  },
})
