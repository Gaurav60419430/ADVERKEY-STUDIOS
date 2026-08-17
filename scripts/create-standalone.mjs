import { readFile, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'

const dist = resolve('dist')
const html = await readFile(resolve(dist, 'index.html'), 'utf8')
const jsFile = html.match(/src="\.\/(assets\/[^\"]+\.js)"/)?.[1]
const cssFile = html.match(/href="\.\/(assets\/[^\"]+\.css)"/)?.[1]

if (!jsFile || !cssFile) throw new Error('Build assets were not found.')

const css = await readFile(resolve(dist, cssFile), 'utf8')

const page = `<main id="top">
  <header class="header"><a class="wordmark" href="#top">ADVERKEY<span>STUDIOS</span></a><nav class="nav"><a href="#create">CREATE</a><a href="#back">BACK</a><a href="#build">BUILD</a><a href="#about">ABOUT</a></nav><a class="contact-link" href="#contact">LET'S TALK <span class="arrow">↗</span></a></header>
  <section class="hero"><div class="hero-index">001 / AN INDEPENDENT COMPANY</div><h1><span>CREATE.</span><span>BACK.</span><span>BUILD.</span></h1><div class="hero-bottom"><p>Ideas deserve more than one way forward.</p><a href="#create" class="circle-link">↓</a><p class="hero-note">PUBLISHING / INVESTMENT / TECHNOLOGY</p></div><div class="hero-disc"></div></section>
  <section class="manifesto" id="about"><p class="eyebrow">WHAT WE'RE HERE FOR</p><div><h2>We make room for<br/><i>what could be.</i></h2><p class="intro">Adverkey Studios is a home for stories, ambitious people, and useful technology. We work where imagination becomes something real.</p></div></section>
  <section class="chapter create" id="create"><div class="chapter-heading"><p class="eyebrow">01 / CREATE</p><p>CHILDREN'S PUBLISHING</p></div><div class="create-main"><div><h2>Stories for<br/><i>curious minds.</i></h2><p>We shape books from their first flicker of an idea to the moment they are held, read, and passed on.</p><a class="text-link" href="#process">HOW WE MAKE BOOKS <span class="arrow">↗</span></a></div><div class="book-wrap"><div class="book"><div class="book-spine"></div><div class="book-cover"><span class="sun">✺</span><em>THE</em><strong>LONG<br/>WAY<br/>HOME</strong><small>AN ORIGINAL STORY</small></div></div><span class="book-hint">EXPLORE THE BOOK <span class="arrow">↗</span></span></div></div><div class="marquee"><span>WORDS CAN CHANGE THE WEATHER</span><span>WORDS CAN CHANGE THE WEATHER</span></div></section>
  <section class="process" id="process"><div class="process-head"><p class="eyebrow">FROM FIRST MARK TO LAST PAGE</p><h2>Making a book<br/>is a <i>way of seeing.</i></h2></div><div class="stages"><div class="stage current"><span>01</span><b>IDEA</b><p>A small question with room to grow.</p><i>↘</i></div><div class="stage"><span>02</span><b>WRITE</b><p>A voice, a world, a beginning.</p><i>↘</i></div><div class="stage"><span>03</span><b>CREATE</b><p>Words meet colour and character.</p><i>↘</i></div><div class="stage"><span>04</span><b>PRODUCE</b><p>Care, craft, and a physical object.</p><i>↘</i></div><div class="stage"><span>05</span><b>PUBLISH</b><p>A story ready to find its reader.</p><i>↘</i></div></div><div class="process-art"><span>IDEA</span><div class="page page-a"></div><div class="page page-b"></div><div class="ink">?</div></div></section>
  <section class="chapter back" id="back"><div class="chapter-heading"><p class="eyebrow">02 / BACK</p><p>INVESTMENT, IN FORMATION</p></div><div class="back-grid"><h2>Back the<br/><i>beginning.</i></h2><div class="back-copy"><p>We are building our approach to investment around people with clear conviction and ideas with a reason to exist.</p><p class="muted">No portfolio theatre. Just a long-term interest in what people are making next.</p><a class="text-link light" href="#contact">START A CONVERSATION <span class="arrow">↗</span></a></div><div class="thesis"><p>WHAT WE LOOK FOR</p><button><span>01</span>A considered point of view<span class="arrow">↗</span></button><button><span>02</span>People who stay curious<span class="arrow">↗</span></button><button><span>03</span>Useful, enduring work<span class="arrow">↗</span></button></div></div></section>
  <section class="chapter build" id="build"><div class="chapter-heading"><p class="eyebrow">03 / BUILD</p><p>TECHNOLOGY & MACHINE LEARNING</p></div><div class="build-grid"><div><h2>Intelligence,<br/><i>made useful.</i></h2><p>We are developing a technology practice for teams working through consequential questions.</p><a class="text-link" href="#contact">BUILD WITH US <span class="arrow">↗</span></a></div><div class="field"><div class="field-label">A SYSTEM IS ONLY AS GOOD AS<br/>THE QUESTION IT HELPS ANSWER.</div></div></div></section>
  <section class="contact" id="contact"><p class="eyebrow">A GOOD PLACE TO START</p><h2>What brings<br/>you <i>here?</i></h2><div class="topic-buttons"><button class="chosen">CREATE <span class="arrow">↗</span></button><button>BACK <span class="arrow">↗</span></button><button>BUILD <span class="arrow">↗</span></button><button>SOMETHING ELSE <span class="arrow">↗</span></button></div><p class="contact-email">CONTACT DETAILS<br/>COMING SOON</p></section>
  <footer><a class="wordmark" href="#top">ADVERKEY<span>STUDIOS</span></a><p>CREATE. BACK. BUILD.</p><p>© 2026 ADVERKEY STUDIOS. ALL RIGHTS RESERVED.</p></footer>
</main>`

const standalone = html
  .replace(/\s*<script type="module" crossorigin src="[^\"]+"><\/script>/, '')
  .replace(/\s*<link rel="stylesheet" crossorigin href="[^\"]+">/, '')
  .replace('</head>', `<style>${css}</style></head>`)
  .replace('<body>', '<body class="preview">')
  .replace('<div id="root"></div>', page)

await writeFile(resolve(dist, 'NOON.html'), standalone)
