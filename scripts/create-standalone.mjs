import { readFile, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'

const dist = resolve('dist')
const html = await readFile(resolve(dist, 'index.html'), 'utf8')
const jsFile = html.match(/src="\.\/(assets\/[^\"]+\.js)"/)?.[1]
const cssFile = html.match(/href="\.\/(assets\/[^\"]+\.css)"/)?.[1]

if (!jsFile || !cssFile) throw new Error('Build assets were not found.')

const css = await readFile(resolve(dist, cssFile), 'utf8')

const page = `<main id="top">
  <header class="header"><a class="wordmark" href="#top">ADVERKEY<span>STUDIOS</span></a><nav class="nav"><a href="#about">ABOUT</a><a href="#create">BOOKS</a><a href="#process">METHOD</a><a href="#back">TRUST</a></nav><a class="contact-link" href="#contact">PUBLISH WITH US <span class="arrow">↗</span></a></header>
  <section class="hero"><div class="hero-index">001 / RESEARCH-LED PUBLISHING</div><h1><span>LEARN</span><span>FROM OUR</span><span>ROOTS.</span></h1><div class="hero-bottom"><p>Adverkey Studios turns research, scholarship, and living traditions into books for the next generation.</p><a href="#create" class="circle-link">↓</a><p class="hero-note">IKS / RESEARCH / LEARNING</p></div><div class="hero-book hero-book--closed" aria-hidden="true"><div class="hero-book-cover hero-book-cover-back"></div><div class="hero-book-pages"><i></i></div><div class="hero-book-cover hero-book-cover-front"><span>IKS</span><b>READ<br/>INDIA</b><small>ADVERKEY PRESS</small></div></div></section>
  <section class="manifesto" id="about"><p class="eyebrow">WHAT WE'RE HERE FOR</p><div><h2>Traditional<br/><i>knowledge made alive again.</i></h2><p class="intro">Adverkey Studios creates research-backed books that help children, teenagers, and college students meet Indian Knowledge Systems with curiosity and confidence.</p></div></section>
  <section class="chapter create" id="create"><div class="chapter-heading"><p class="eyebrow">01 / OUR READERS</p><p>BOOKS FOR EVERY AGE</p></div><div class="create-main"><div><h2>Books for<br/><i>curious minds.</i></h2><p>We make books that help young readers discover where ideas come from—and where they can go next. We edit, translate, design, and publish knowledge in forms people can read, enjoy, and remember.</p><a class="text-link" href="#process">HOW WE MAKE BOOKS <span class="arrow">↗</span></a></div><div class="book-wrap"><div class="book"><div class="book-spine"></div><div class="book-cover"><span class="sun">✺</span><em>THE</em><strong>LONG<br/>WAY<br/>HOME</strong><small>AN ORIGINAL STORY</small></div></div><span class="book-hint">EXPLORE THE BOOK <span class="arrow">↗</span></span></div></div><div class="marquee"><span>ROOTED IN RESEARCH · MADE FOR THE NEXT GENERATION</span><span>ROOTED IN RESEARCH · MADE FOR THE NEXT GENERATION</span></div></section>
  <section class="process" id="process"><div class="process-head"><p class="eyebrow">FROM FIRST MARK TO LAST PAGE</p><h2>Making a book<br/>is a <i>way of seeing.</i></h2></div><div class="stages"><div class="stage current"><span>01</span><b>IDEA</b><p>A small question with room to grow.</p><i>↘</i></div><div class="stage"><span>02</span><b>WRITE</b><p>A voice, a world, a beginning.</p><i>↘</i></div><div class="stage"><span>03</span><b>CREATE</b><p>Words meet colour and character.</p><i>↘</i></div><div class="stage"><span>04</span><b>PRODUCE</b><p>Care, craft, and a physical object.</p><i>↘</i></div><div class="stage"><span>05</span><b>PUBLISH</b><p>A story ready to find its reader.</p><i>↘</i></div></div><div class="process-art"><span>IDEA</span><div class="page page-a"></div><div class="page page-b"></div><div class="ink">?</div></div></section>
  <section class="chapter back" id="back"><div class="chapter-heading"><p class="eyebrow">02 / TRUSTED SOURCES</p><p>ACADEMIC COLLABORATION</p></div><div class="back-grid"><h2>Knowledge with<br/><i>a foundation.</i></h2><div class="back-copy"><p>Our books grow from research and source material shared by trusted authors and researchers. We make that knowledge open, engaging, and ready to travel.</p><p class="muted">Academic rigour gives every story its spine. Editorial care helps it meet the reader.</p><a class="text-link light" href="#contact">COLLABORATE WITH US <span class="arrow">↗</span></a></div><div class="thesis"><p>TRUSTED PARTNERS</p><button><span>IIT</span>INDIAN INSTITUTE OF TECHNOLOGY KANPUR<span class="arrow">↗</span></button><button><span>MANIT</span>MANIT BHOPAL<span class="arrow">↗</span></button></div></div></section>
  <section class="chapter build" id="build"><div class="chapter-heading"><p class="eyebrow">03 / WHY IKS</p><p>IDEAS THAT STILL SPEAK</p></div><div class="build-grid"><div><h2>Old wisdom,<br/><i>new questions.</i></h2><p>We explore culture, science, philosophy, history, mathematics, ecology, and the many ways Indian knowledge can shape a more curious future.</p><a class="text-link" href="#contact">EXPLORE A TOPIC <span class="arrow">↗</span></a></div><div class="field aryabhata-field" aria-label="Animated halftone portrait of Aryabhata. Hover over the portrait to trigger the red eyes."><img src="./aryabhata.jpg" alt="Aryabhata surrounded by the Sun, Earth, and stars" /><span class="aryabhata-scan" aria-hidden="true"></span><span class="aryabhata-eye aryabhata-eye-left" aria-hidden="true"></span><span class="aryabhata-eye aryabhata-eye-right" aria-hidden="true"></span><span class="aryabhata-dots" aria-hidden="true"></span><div class="field-label">ARYABHATA / MATHEMATICS,<br/>ASTRONOMY, AND THE SKY</div></div></div></section>
  <section class="contact" id="contact"><p class="eyebrow">A GOOD PLACE TO START</p><h2>Bring us a<br/><i>good question.</i></h2><div class="topic-buttons"><button class="chosen">PUBLISH A BOOK <span class="arrow">↗</span></button><button>SHARE RESEARCH <span class="arrow">↗</span></button><button>PARTNER WITH US <span class="arrow">↗</span></button><button>SOMETHING ELSE <span class="arrow">↗</span></button></div><a class="contact-email" href="mailto:hello@adverkey.com">hello@adverkey.com</a></section>
  <footer><a class="wordmark" href="#top">ADVERKEY<span>STUDIOS</span></a><p>RESEARCH · READING · RENEWAL</p><p>© 2026 ADVERKEY STUDIOS. ALL RIGHTS RESERVED.</p></footer>
</main>`

const updatedPage = page
  .replace('FROM FIRST MARK TO LAST PAGE', 'FROM SOURCE TO LAST PAGE')
  .replace('Making a book<br/>is a <i>way of seeing.</i>', 'Research becomes<br/>a <i>reading journey.</i>')
  .replace('IDEA</b><p>A small question with room to grow.', 'SOURCE</b><p>Research papers, texts, and knowledge traditions.')
  .replace('WRITE</b><p>A voice, a world, a beginning.', 'VERIFY</b><p>Academic review, source checking, and editorial care.')
  .replace('CREATE</b><p>Words meet colour and character.', 'TRANSLATE</b><p>Complex ideas made clear and age-appropriate.')
  .replace('PRODUCE</b><p>Care, craft, and a physical object.', 'DESIGN</b><p>Illustration, structure, and visual learning.')
  .replace('A story ready to find its reader.', 'Books for classrooms, homes, and independent reading.')
  .replace('Our books grow from research and source material shared by trusted authors and researchers. We make that knowledge open, engaging, and ready to travel.', 'We work with contributors from academic and research communities. Their research and source material help give our books a strong foundation.')
  .replace('Academic rigour gives every story its spine. Editorial care helps it meet the reader.', 'These relationships do not imply institutional endorsement of Adverkey Studios or its publications.')
  .replace('We explore culture, science, philosophy, history, mathematics, ecology, and the many ways Indian knowledge can shape a more curious future.', 'Indian Knowledge Systems are the many ways people in India have studied, understood, recorded, and passed on knowledge across generations. Our books explore mathematics, astronomy, ecology, medicine, philosophy, literature, architecture, and the arts.')
  .replace('Bring us a<br/><i>good question.</i>', 'Let’s make<br/><i>knowledge travel.</i>')
  .replace('PUBLISH A BOOK <span class="arrow">↗</span></button><button>SHARE RESEARCH <span class="arrow">↗</span></button><button>PARTNER WITH US <span class="arrow">↗</span></button><button>SOMETHING ELSE', 'HAVE RESEARCH TO SHARE <span class="arrow">↗</span></button><button>WANT TO PUBLISH A BOOK <span class="arrow">↗</span></button><button>NEED LEARNING CONTENT <span class="arrow">↗</span></button><button>WANT TO COLLABORATE')
  .replace('hello@adverkey.com</a>', 'START A PUBLISHING CONVERSATION<br/>hello@adverkey.com</a>')

const standalone = html
  .replace(/\s*<script type="module" crossorigin src="[^\"]+"><\/script>/, '')
  .replace(/\s*<link rel="stylesheet" crossorigin href="[^\"]+">/, '')
  .replace('FROM FIRST MARK TO LAST PAGE', 'FROM SOURCE TO LAST PAGE')
  .replace('Making a book<br/>is a <i>way of seeing.</i>', 'Research becomes<br/>a <i>reading journey.</i>')
  .replace('IDEA</b><p>A small question with room to grow.', 'SOURCE</b><p>Research papers, texts, and knowledge traditions.')
  .replace('WRITE</b><p>A voice, a world, a beginning.', 'VERIFY</b><p>Academic review, source checking, and editorial care.')
  .replace('CREATE</b><p>Words meet colour and character.', 'TRANSLATE</b><p>Complex ideas made clear and age-appropriate.')
  .replace('PRODUCE</b><p>Care, craft, and a physical object.', 'DESIGN</b><p>Illustration, structure, and visual learning.')
  .replace('A story ready to find its reader.', 'Books for classrooms, homes, and independent reading.')
  .replace('Our books grow from research and source material shared by trusted authors and researchers. We make that knowledge open, engaging, and ready to travel.', 'We work with contributors from academic and research communities. Their research and source material help give our books a strong foundation.')
  .replace('Academic rigour gives every story its spine. Editorial care helps it meet the reader.', 'These relationships do not imply institutional endorsement of Adverkey Studios or its publications.')
  .replace('We explore culture, science, philosophy, history, mathematics, ecology, and the many ways Indian knowledge can shape a more curious future.', 'Indian Knowledge Systems are the many ways people in India have studied, understood, recorded, and passed on knowledge across generations. Our books explore mathematics, astronomy, ecology, medicine, philosophy, literature, architecture, and the arts.')
  .replace('Bring us a<br/><i>good question.</i>', 'Let’s make<br/><i>knowledge travel.</i>')
  .replace('PUBLISH A BOOK <span class="arrow">↗</span></button><button>SHARE RESEARCH <span class="arrow">↗</span></button><button>PARTNER WITH US <span class="arrow">↗</span></button><button>SOMETHING ELSE', 'HAVE RESEARCH TO SHARE <span class="arrow">↗</span></button><button>WANT TO PUBLISH A BOOK <span class="arrow">↗</span></button><button>NEED LEARNING CONTENT <span class="arrow">↗</span></button><button>WANT TO COLLABORATE')
  .replace('hello@adverkey.com</a>', 'START A PUBLISHING CONVERSATION<br/>hello@adverkey.com</a>')
  .replace('</head>', `<style>${css}</style></head>`)
  .replace('<body>', '<body class="preview">')
  .replace('<div id="root"></div>', updatedPage)

await writeFile(resolve(dist, 'NOON.html'), standalone)
