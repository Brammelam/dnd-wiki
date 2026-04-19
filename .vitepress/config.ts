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
                { text: 'Practical Joe', link: '/characters/practical-joe' },
                { text: 'Fat Hans', link: '/characters/fat-hans' },
                { text: 'Salander', link: '/characters/salander' },
                { text: 'Lynch', link: '/characters/lynch' },
                { text: 'Sommerhimmel', link: '/characters/sommerhimmel' },
                { text: 'Tore Idle', link: '/characters/tore-idle' },
                { text: 'Knut Pilsen', link: '/characters/knut-pilsen' },
                { text: 'Anne Knutsen', link: '/characters/anne-knutsen' },
                { text: 'Lynn Salt', link: '/characters/lynn-salt' },
                { text: 'Father Terry', link: '/characters/father-terry' },
                { text: 'Frida Marsensen', link: '/characters/frida-marsensen' },
                { text: 'Lady Amber', link: '/characters/lady-amber' },
                { text: 'Lady Alabaster', link: '/characters/lady-alabaster' },
                { text: 'Brad (Academy)', link: '/characters/brad-academy-student' },
                { text: 'Griselda (Mud Street)', link: '/characters/griselda-mud-street' },
                { text: 'Markus', link: '/characters/markus-lieutenant' },
                { text: 'Thorn', link: '/characters/thorn-alchemist' },
                { text: 'Mirbog', link: '/characters/mirbog' },
                { text: 'Karl Marsensen', link: '/characters/karl-marsensen' },
                { text: 'Baron Peridott', link: '/characters/baron-peridott' },
                { text: 'Konstantin Carnelian', link: '/characters/konstantin-carnelian' },
                { text: 'Lieutenant Jet', link: '/characters/lieutenant-jet' },
                { text: 'Glassmaker', link: '/characters/glassmaker-fey' },
                { text: 'Thor', link: '/characters/thor-veteran' },
                { text: 'Magda', link: '/characters/magda-artificer' },
                { text: 'Rudolf the Great', link: '/characters/rudolf-the-great' },
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
            { text: 'Academy office (Dior)', link: '/places/the-academy' },
            { text: 'The Crypt of Dior', link: '/places/the-crypt' },
            { text: 'Hooves Bay', link: '/places/hooves-bay' },
            { text: 'Sire', link: '/places/sire' },
            { text: 'Kalén', link: '/places/kalen' },
            { text: 'Tyr Moir', link: '/places/tyr-moir' },
            { text: 'Azure Oak Grove', link: '/places/azure-oak-grove' },
            { text: 'Fey Realm', link: '/places/fey-realm' },
            { text: 'Alverike', link: '/places/alverike' },
            { text: 'Dead Isle', link: '/places/dead-isle' },
            { text: 'Scully Stronghold', link: '/places/scully-stronghold' },
            { text: 'Fort John', link: '/places/fort-john' },
            { text: 'Havfika', link: '/places/havfika' },
            { text: 'Calen', link: '/places/calen' },
            { text: 'The Thirsty Dwarf', link: '/places/the-thirsty-dwarf' },
            { text: 'Frontier', link: '/places/frontier-outskirts' },
            { text: 'The Final Straw', link: '/places/the-final-straw' },
            { text: 'Crypt of Alabaster', link: '/places/crypt-of-alabaster' },
          ],
        },
      ],

      '/factions/': [
        {
          text: 'Factions & Organizations',
          link: '/factions/',
          items: [
            { text: "The King's Guard", link: '/factions/kings-guard' },
            { text: 'Third Army', link: '/factions/third-army' },
            { text: 'The Academy', link: '/factions/the-academy' },
            { text: 'The Crabs', link: '/factions/the-crabs' },
            { text: 'Toll Guild', link: '/factions/toll-guild' },
            { text: 'Humanus Association', link: '/factions/humanus-association' },
            { text: 'Church of the Triad', link: '/factions/temple-of-tyr' },
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
            { text: 'Scully Stronghold Infiltration', link: '/events/scully-stronghold-infiltration' },
            { text: 'Rinden Mud Street Brawl', link: '/events/rinden-mud-street-brawl' },
            { text: 'Toltec Box Courier', link: '/events/toltec-box-courier' },
            { text: "Thorn's Serpent & Visions", link: '/events/thorn-serpent-and-visions' },
            { text: "Fey Portal & Flint's Arm", link: '/events/fey-portal' },
            { text: 'Hooves Bay Outpost', link: '/events/hooves-bay-outpost' },
            { text: 'Lake Hydra Hunt', link: '/events/lake-hydra-hunt' },
            { text: 'Fort John Rebellion', link: '/events/fort-john-rebellion' },
            { text: 'Dior Crypt Expedition', link: '/events/dior-crypt' },
            { text: 'Dior Wedding & Helga', link: '/events/dior-wedding' },
            { text: 'Burning of Sire', link: '/events/burning-of-sire' },
            { text: 'Road Inn Ambush', link: '/events/road-inn-ambush' },
            { text: "Return to Morgan's Keep", link: '/events/return-to-morgans-keep' },
          ],
        },
      ],

      '/sessions/': [
        {
          text: 'Session Log',
          link: '/sessions/',
          items: [
            { text: 'Session 1 – Framed & Fled', link: '/sessions/session-01' },
            { text: 'Session 2 – Fat Hans Ambush', link: '/sessions/session-02' },
            { text: 'Session 3 – Turn & the Azure Oak', link: '/sessions/session-03' },
            { text: 'Session 4 – Selling the Seed', link: '/sessions/session-04' },
            { text: 'Session 5 – The Crabs of Rinden', link: '/sessions/session-05' },
            { text: 'Session 6 – Scully Stronghold', link: '/sessions/session-06' },
            { text: 'Session 7 – Two Fights in Rinden', link: '/sessions/session-07' },
            { text: 'Session 8 – The Poor Fisherman', link: '/sessions/session-08' },
            { text: 'Session 9 – Snakes & the Fey', link: '/sessions/session-09' },
            { text: 'Session 10 – Hooves Bay & Outpost', link: '/sessions/session-10' },
            { text: 'Session 11 – The Lake Hydra', link: '/sessions/session-11' },
            { text: 'Session 12 – Fort John, Part One', link: '/sessions/session-12' },
            { text: 'Session 13 – Fort John, Part Two', link: '/sessions/session-13' },
            { text: 'Session 14 – Fort John, Part Three', link: '/sessions/session-14' },
            { text: 'Session 15 – Arrival in Dior', link: '/sessions/session-15' },
            { text: 'Session 16 – Dior & Crypt Deal', link: '/sessions/session-16' },
            { text: 'Session 17 – Into the Crypt', link: '/sessions/session-17' },
            { text: 'Session 18 – Escaping the Crypt', link: '/sessions/session-18' },
            { text: 'Session 19 – Wedding Plans', link: '/sessions/session-19' },
            { text: 'Session 20 – Helga, Come Alone', link: '/sessions/session-20' },
            { text: 'Session 21 – Graveyard Confrontation', link: '/sessions/session-21' },
            { text: 'Session 22 – Burning of Sire', link: '/sessions/session-22' },
            { text: 'Session 23 – Salt, Thorn & Cheese', link: '/sessions/session-23' },
            { text: 'Session 24 – Return to Morgan’s Keep', link: '/sessions/session-24' },
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
