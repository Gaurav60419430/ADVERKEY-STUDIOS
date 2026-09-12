import { type CSSProperties, type ReactNode, useEffect, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'
import './iks.css'
import './book-pages.css'
import './aryabhata.css'
import './catalogue.css'
import './polish.css'
import iitKanpurLogo from './assets/iit-kanpur-logo.png'
import manitBhopalLogo from './assets/manit-bhopal-logo.png'

const stages = [
  ['01', 'SOURCE', 'Research papers, texts, and knowledge traditions.'],
  ['02', 'VERIFY', 'Academic review, source checking, and editorial care.'],
  ['03', 'TRANSLATE', 'Complex ideas made clear and age-appropriate.'],
  ['04', 'DESIGN', 'Illustration, structure, and visual learning.'],
  ['05', 'PUBLISH', 'Books for classrooms, homes, and independent reading.'],
]

function Arrow() { return <span className="arrow" aria-hidden="true">↗</span> }

function HeroBook() {
  const [open, setOpen] = useState(false)
  const tilt = useRef<HTMLDivElement>(null)
  const lean = (event: React.PointerEvent<HTMLDivElement>) => {
    const el = tilt.current
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const bounds = el.getBoundingClientRect()
    el.style.setProperty('--tilt-x', `${((event.clientY - bounds.top) / bounds.height - .5) * -14}deg`)
    el.style.setProperty('--tilt-y', `${((event.clientX - bounds.left) / bounds.width - .5) * 18}deg`)
  }
  const level = () => { tilt.current?.style.setProperty('--tilt-x', '0deg'); tilt.current?.style.setProperty('--tilt-y', '0deg') }
  return <div ref={tilt} className="hero-book-tilt" role="button" tabIndex={0} aria-pressed={open} aria-label={open ? 'Close the floating book' : 'Open the floating book'} onClick={() => setOpen(o => !o)} onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setOpen(o => !o) } }} onPointerMove={lean} onPointerLeave={level}><div className={`hero-book${open ? ' is-open' : ' hero-book--closed'}`} aria-hidden="true"><div className="hero-book-cover hero-book-cover-back"></div><div className="hero-book-pages"><i className="page-spread page-spread-1"><span className="page-kicker">01 / GANITA</span><b>0 · 1 · 1 · 2</b><p className="page-text">Zero woke up one morning and asked: what if nothing is something?</p><em className="page-diagram page-orbit"></em><small>THE LANGUAGE OF PATTERNS</small></i><i className="page-spread page-spread-2"><span className="page-kicker">02 / AKASHA</span><b>✦</b><p className="page-text">Aryabhata looked up and read the night sky like a manuscript.</p><em className="page-diagram page-constellation"></em><small>READING THE NIGHT SKY</small></i><i className="page-spread page-spread-3"><span className="page-kicker">03 / BHUMI</span><b>△</b><p className="page-text">Rivers remember every field they ever fed.</p><em className="page-diagram page-map"></em><small>LAND, WATER, MEMORY</small></i><i className="page-spread page-spread-4"><span className="page-kicker">04 / SHABDA</span><b>ॐ</b><p className="page-text">Every word you speak travelled a thousand years to reach you.</p><em className="page-diagram page-lines"></em><small>WORDS THAT TRAVEL</small></i><i className="page-spread page-spread-5"><span className="page-kicker">05 / KALA</span><b>✺</b><p className="page-text">Hands shape clay; rhythm shapes time.</p><em className="page-diagram page-grid"></em><small>FORM, RHYTHM, MAKING</small></i></div><div className="hero-book-cover hero-book-cover-front"><span>IKS</span><b>READ<br/>INDIA</b><small>ADVERKEY PRESS</small></div></div><span className="hero-book-hint" aria-hidden="true">{open ? 'CLICK TO CLOSE ✕' : 'CLICK TO OPEN ↗'}</span></div>
}

function HeroTitle() {
  const ref = useRef<HTMLHeadingElement>(null)
  useEffect(() => {
    const h1 = ref.current
    const hero = h1?.closest('.hero') as HTMLElement | null
    if (!h1 || !hero || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const chars = Array.from(h1.querySelectorAll('.hero-char')) as HTMLElement[]
    const RADIUS = 170
    let raf = 0
    let px = 0, py = 0
    const apply = () => {
      raf = 0
      chars.forEach(c => {
        const r = c.getBoundingClientRect()
        const dx = (r.left + r.width / 2) - px
        const dy = (r.top + r.height / 2) - py
        const d = Math.hypot(dx, dy)
        c.style.transform = (d < RADIUS && d > 0.1) ? `translate(${(dx / d * (1 - d / RADIUS) * 26).toFixed(1)}px, ${(dy / d * (1 - d / RADIUS) * 26).toFixed(1)}px) rotate(${(dx / RADIUS * 6).toFixed(1)}deg)` : ''
      })
    }
    const move = (event: PointerEvent) => {
      px = event.clientX; py = event.clientY
      if (!raf) raf = requestAnimationFrame(apply)
    }
    const leave = () => { if (raf) cancelAnimationFrame(raf); raf = 0; chars.forEach(c => { c.style.transform = '' }) }
    hero.addEventListener('pointermove', move)
    hero.addEventListener('pointerleave', leave)
    return () => { if (raf) cancelAnimationFrame(raf); hero.removeEventListener('pointermove', move); hero.removeEventListener('pointerleave', leave) }
  }, [])
  const line = (text: string, base: number) => text.split('').map((ch, i) => <span key={i} className="hero-char" style={{ '--d': `${base + i * 30}ms` } as CSSProperties}>{ch === ' ' ? ' ' : ch}</span>)
  return <h1 id="hero-title" ref={ref}><span className="hero-line">{line('LEARN', 350)}</span><span className="hero-line">{line('FROM OUR', 470)}</span><span className="hero-line">{line('ROOTS.', 590)}</span></h1>
}

function Reveal({ children, className = '', id }: { children: ReactNode, className?: string, id?: string }) {
  const ref = useRef<HTMLElement>(null)
  useEffect(() => {
    const element = ref.current
    if (!element || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { element.classList.add('is-visible'); observer.unobserve(element) }
    }, { threshold: 0.14 })
    observer.observe(element)
    return () => observer.disconnect()
  }, [])
  return <section ref={ref} id={id} className={`reveal ${className}`}>{children}</section>
}

function Header() {
  const [open, setOpen] = useState(false)
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = prev }
  }, [open])
  return <header className="header">
    <a className="wordmark" href="#top" aria-label="Adverkey Studios home">ADVERKEY<span>STUDIOS</span></a>
    <nav className={open ? 'nav open' : 'nav'} aria-label="Primary navigation">
      <a onClick={() => setOpen(false)} href="#about">ABOUT</a><a onClick={() => setOpen(false)} href="#books">BOOKS</a><a onClick={() => setOpen(false)} href="#method">METHOD</a><a onClick={() => setOpen(false)} href="#trust">TRUST</a>
    </nav>
    <a className="contact-link" href="#contact">PUBLISH WITH US <Arrow /></a>
    <button className="menu" onClick={() => setOpen(!open)} aria-label="Toggle navigation" aria-expanded={open}><i></i><i></i></button>
  </header>
}

function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    let raf = 0
    const update = () => {
      raf = 0
      const h = document.documentElement
      const max = h.scrollHeight - h.clientHeight
      ref.current?.style.setProperty('transform', `scaleX(${max > 0 ? h.scrollTop / max : 0})`)
    }
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update) }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); if (raf) cancelAnimationFrame(raf) }
  }, [])
  return <div ref={ref} className="scroll-progress" aria-hidden="true"></div>
}

type BookItem = { id: string, title: string, subtitle: string, kicker: string, cover: string, author: string, color: string }
const isImage = (c: string) => c.startsWith('data:') || c.startsWith('http') || c.startsWith('blob:') || c.startsWith('.') || c.endsWith('.svg')
const defaultBooks: BookItem[] = [
  { id: '1', title: 'THE\nLONG\nWAY\nHOME', subtitle: 'AN ORIGINAL STORY', kicker: 'THE / 01', cover: '#e34f33', author: 'Adverkey Press', color: '#f6cf70' },
  { id: '2', title: 'GANITA', subtitle: 'THE LANGUAGE OF PATTERNS', kicker: '01 / GANITA', cover: `${import.meta.env.BASE_URL}proposals/cover-ganita.svg`, author: 'IKS Series', color: '#f1efe9' },
  { id: '3', title: 'AKASHA', subtitle: 'READING THE NIGHT SKY', kicker: '02 / AKASHA', cover: `${import.meta.env.BASE_URL}proposals/cover-akasha.svg`, author: 'IKS Series', color: '#e7a664' },
  { id: '4', title: 'BHUMI', subtitle: 'LAND, WATER, MEMORY', kicker: '03 / BHUMI', cover: `${import.meta.env.BASE_URL}proposals/cover-bhumi.svg`, author: 'IKS Series', color: '#f6cf70' },
]

function Book({ onOpen }: { onOpen?: () => void }) {
  return <a className="book-wrap" href="#catalogue" onClick={(e) => { e.preventDefault(); onOpen?.(); if (location.hash !== '#catalogue') location.hash = '#catalogue' }} aria-label="Open book catalogue">
    <div className="book" aria-hidden="true"><div className="book-spine"></div><div className="book-cover"><span className="sun">✺</span><em>THE</em><strong>LONG<br/>WAY<br/>HOME</strong><small>AN ORIGINAL STORY</small></div></div>
    <span className="book-hint">EXPLORE A BOOK <Arrow /></span>
  </a>
}

function Catalogue({ onBack }: { onBack: () => void }) {
  const [books, setBooks] = useState<BookItem[]>(() => {
    try { const s = localStorage.getItem('adverkey-catalogue'); return s ? JSON.parse(s) as BookItem[] : defaultBooks } catch { return defaultBooks }
  })
  const [dragOver, setDragOver] = useState(false)
  useEffect(() => { try { localStorage.setItem('adverkey-catalogue', JSON.stringify(books)) } catch {} }, [books])
  const addFiles = (files: FileList | null) => {
    if (!files) return
    Array.from(files).slice(0, 12).forEach(file => {
      if (!file.type.startsWith('image/')) return
      const reader = new FileReader()
      reader.onload = () => {
        const url = reader.result as string
        setBooks(b => [...b, { id: String(Date.now() + Math.random()), title: file.name.replace(/\.[^.]+$/, '').toUpperCase().slice(0, 24) || 'UNTITLED', subtitle: 'UPLOADED', kicker: 'USER / UPLOAD', cover: url, author: 'Your upload', color: '#1d1d1b', }])
      }
      reader.readAsDataURL(file)
    })
  }
  const remove = (id: string) => setBooks(b => b.filter(x => x.id !== id))
  return <div className="catalogue">
    <div className="catalogue-head">
      <div>
        <p className="eyebrow">BOOK CATALOGUE</p>
        <h2>Your<br/><i>uploaded books.</i></h2>
        <p className="catalogue-intro">Click the book on the home page to come here. Upload covers below — they’re saved locally in your browser so you can build your catalogue and share it.</p>
      </div>
      <button className="text-link" onClick={onBack}>← BACK TO HOME</button>
    </div>
    <div className="catalogue-grid">
      {books.map((b, i) => <div key={b.id} className="catalogue-card" style={{ '--d': `${Math.min(i, 8) * 70}ms` } as CSSProperties}>
        <div className="catalogue-cover" style={isImage(b.cover) ? { backgroundImage: `url(${b.cover})`, backgroundSize: 'cover', backgroundPosition: 'center', color: 'transparent' } : { background: b.cover || '#e34f33', color: b.color }}>
          {!isImage(b.cover) && <><span className="sun">✺</span><em>{b.kicker}</em><strong style={{ whiteSpace: 'pre-line' }}>{b.title}</strong><small>{b.subtitle}</small></>}
        </div>
        <div className="catalogue-meta"><span>{b.author}</span><button onClick={() => remove(b.id)} aria-label="Remove book" className="catalogue-remove">×</button></div>
      </div>)}
      <label className={`catalogue-upload ${dragOver ? 'is-drag' : ''}`} onDragOver={e => { e.preventDefault(); setDragOver(true) }} onDragLeave={() => setDragOver(false)} onDrop={e => { e.preventDefault(); setDragOver(false); addFiles(e.dataTransfer.files) }}>
        <input type="file" accept="image/*" multiple onChange={e => addFiles(e.target.files)} hidden />
        <span className="upload-plus">+</span>
        <b>Upload book covers</b>
        <small>Drag & drop images or click to browse<br/>PNG / JPG — saved locally</small>
      </label>
    </div>
    <p className="catalogue-note">Tip: replace the demo books with your own. To reset, clear your browser storage for this site.</p>
  </div>
}

function BuildField() {
  const field = useRef<HTMLDivElement>(null)
  const [armed, setArmed] = useState(false)
  const move = (event: React.PointerEvent<HTMLDivElement>) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !field.current) return
    const bounds = field.current.getBoundingClientRect()
    field.current.style.setProperty('--pointer-x', `${((event.clientX - bounds.left) / bounds.width - .5) * 2}`)
    field.current.style.setProperty('--pointer-y', `${((event.clientY - bounds.top) / bounds.height - .5) * 2}`)
  }
  return <div ref={field} className={`field aryabhata-field${armed ? ' is-armed' : ''}`} onClick={() => setArmed(!armed)} onPointerMove={move} onPointerLeave={() => { field.current?.style.setProperty('--pointer-x', '0'); field.current?.style.setProperty('--pointer-y', '0') }} aria-label="Animated halftone portrait of Aryabhata, an Indian mathematician and astronomer. Point at or click the portrait to trigger the red eyes."><img src="/aryabhata.jpg" alt="Aryabhata surrounded by the Sun, Earth, and stars" /><span className="aryabhata-scan" aria-hidden="true"></span><span className="aryabhata-eye aryabhata-eye-left" aria-hidden="true"></span><span className="aryabhata-eye aryabhata-eye-right" aria-hidden="true"></span><span className="aryabhata-dots" aria-hidden="true"></span><div className="field-label">ARYABHATA / MATHEMATICS,<br/>ASTRONOMY, AND THE SKY</div></div>
}

let loaderShown = false

function Loader() {
  const [gone, setGone] = useState(false)
  useEffect(() => {
    if (loaderShown || document.readyState === 'complete') { loaderShown = true; setGone(true); return }
    loaderShown = true
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setGone(true); return }
    const t1 = window.setTimeout(() => { document.querySelector('.loader')?.classList.add('is-done') }, 650)
    const t2 = window.setTimeout(() => setGone(true), 1450)
    return () => { window.clearTimeout(t1); window.clearTimeout(t2) }
  }, [])
  if (gone) return null
  return <div className="loader" aria-hidden="true"><p>ADVERKEY<span>STUDIOS</span></p><small>RESEARCH · READING · RENEWAL</small></div>
}

function Cursor() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches || window.matchMedia('(pointer: coarse)').matches) return
    let x = -100, y = -100, tx = -100, ty = -100, raf = 0, hot = false
    const loop = () => {
      x += (tx - x) * .2; y += (ty - y) * .2
      el.style.transform = `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px) scale(${hot ? 2.4 : 1})`
      raf = requestAnimationFrame(loop)
    }
    const move = (e: PointerEvent) => { tx = e.clientX; ty = e.clientY }
    const over = (e: Event) => { hot = (e.target as HTMLElement).closest('a,button,[role="button"]') != null }
    window.addEventListener('pointermove', move, { passive: true })
    window.addEventListener('pointerover', over, { passive: true })
    raf = requestAnimationFrame(loop)
    return () => { cancelAnimationFrame(raf); window.removeEventListener('pointermove', move); window.removeEventListener('pointerover', over) }
  }, [])
  return <div ref={ref} className="cursor" aria-hidden="true"></div>
}

function App() {
  const [stage, setStage] = useState(0)
  const [paused, setPaused] = useState(false)
  const heroRef = useRef<HTMLElement>(null)
  const [topic, setTopic] = useState('WANT TO PUBLISH A BOOK')
  const [view, setView] = useState<'home' | 'catalogue'>(() => (typeof location !== 'undefined' && location.hash === '#catalogue' ? 'catalogue' : 'home'))
  useEffect(() => { document.documentElement.style.setProperty('--stage', String(stage)) }, [stage])
  useEffect(() => { // process auto-advance, paused on hover/focus
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || paused) return
    const id = window.setInterval(() => setStage(s => (s + 1) % 5), 4200)
    return () => window.clearInterval(id)
  }, [paused])
  useEffect(() => { // hero scroll parallax via --sy (translate property, composes with transforms)
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let raf = 0
    const update = () => { raf = 0; heroRef.current?.style.setProperty('--sy', String(window.scrollY)) }
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update) }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => { window.removeEventListener('scroll', onScroll); if (raf) cancelAnimationFrame(raf) }
  }, [view])
  useEffect(() => { // magnetic pull for tagged elements (fine pointers only)
    if (view !== 'home' || window.matchMedia('(prefers-reduced-motion: reduce)').matches || window.matchMedia('(pointer: coarse)').matches) return
    const els = Array.from(document.querySelectorAll('[data-magnetic]')) as HTMLElement[]
    const cleanups = els.map(el => {
      const move = (e: PointerEvent) => {
        const r = el.getBoundingClientRect()
        el.style.setProperty('--mx', `${((e.clientX - (r.left + r.width / 2)) / r.width * 14).toFixed(1)}px`)
        el.style.setProperty('--my', `${((e.clientY - (r.top + r.height / 2)) / r.height * 14).toFixed(1)}px`)
      }
      const leave = () => { el.style.setProperty('--mx', '0px'); el.style.setProperty('--my', '0px') }
      el.addEventListener('pointermove', move)
      el.addEventListener('pointerleave', leave)
      return () => { el.removeEventListener('pointermove', move); el.removeEventListener('pointerleave', leave) }
    })
    return () => cleanups.forEach(fn => fn())
  }, [view])
  useEffect(() => {
    const onHash = () => setView(location.hash === '#catalogue' ? 'catalogue' : 'home')
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])
  useEffect(() => {
    if (view !== 'home') return
    const id = location.hash.replace('#', '')
    if (!id || id === 'catalogue' || id === 'top') return
    requestAnimationFrame(() => { document.getElementById(id)?.scrollIntoView() })
  }, [view])
  const goCatalogue = () => { location.hash = '#catalogue'; setView('catalogue'); window.scrollTo(0, 0) }
  const goHome = () => { history.pushState('', document.title, window.location.pathname + window.location.search); setView('home'); window.scrollTo(0, 0) }
  if (view === 'catalogue') return <main id="top"><ScrollProgress /><Header /><div className="catalogue-wrap"><Catalogue onBack={goHome} /></div><footer><a className="wordmark" href="#top" onClick={e => { e.preventDefault(); goHome() }}>ADVERKEY<span>STUDIOS</span></a><p>RESEARCH · READING · RENEWAL</p><p>© 2026 ADVERKEY STUDIOS. ALL RIGHTS RESERVED.</p></footer></main>
  return <>
    <Loader /><Cursor />
    <main id="top">
    <ScrollProgress />
    <Header />
    <section ref={heroRef} className="hero" aria-labelledby="hero-title">
      <div className="hero-covers" aria-hidden="true">
        <div className="cover-track cover-track-forward"><i></i><i></i></div>
        <div className="cover-track cover-track-reverse"><i></i><i></i></div>
      </div>
      <div className="hero-index">001 / RESEARCH-LED PUBLISHING</div>
      <HeroTitle />
      <div className="hero-bottom"><p>Adverkey Studios turns research, scholarship, and living traditions into books for the next generation.</p><a href="#books" className="circle-link" data-magnetic aria-label="Explore our books">↓</a><p className="hero-note">IKS / RESEARCH / LEARNING</p></div>
      <HeroBook />
    </section>

    <Reveal className="manifesto" id="about"><p className="eyebrow">WHAT WE DO</p><div><h2>Traditional<br/><i>knowledge made alive again.</i></h2><p className="intro">Adverkey Studios works with trusted authors and researchers to turn research papers, traditional texts, academic work, and cultural knowledge into accessible books for a new generation of readers.</p></div></Reveal>

    <Reveal className="chapter create" id="books">
      <div className="chapter-heading"><p className="eyebrow">01 / OUR READERS</p><p>BOOKS FOR EVERY AGE</p></div>
      <div className="create-main"><div><h2>Books for<br/><i>curious minds.</i></h2><p>We make books that help young readers discover where ideas come from—and where they can go next. We edit, translate, design, and publish knowledge in forms people can read, enjoy, and remember.</p><a className="text-link" href="#method">HOW WE MAKE BOOKS <Arrow /></a></div><Book onOpen={goCatalogue} /></div>
      <div className="audiences"><div><b>01</b><strong>CHILDREN</strong><span>Illustrated, story-led introductions to Indian ideas and traditions.</span></div><div><b>02</b><strong>TEENAGERS</strong><span>Context, curiosity, and deeper connections across subjects and time.</span></div><div><b>03</b><strong>COLLEGE</strong><span>Rigorous, accessible learning material for students and independent readers.</span></div></div>
      <div className="marquee"><span>ROOTED IN RESEARCH · MADE FOR THE NEXT GENERATION</span><span>ROOTED IN RESEARCH · MADE FOR THE NEXT GENERATION</span></div>
    </Reveal>

    <Reveal className="process" id="method"><div className="process-head"><p className="eyebrow">02 / FROM SOURCE TO LAST PAGE</p><h2>Research becomes<br/><i>a reading journey.</i></h2></div><div className="stages" role="tablist" aria-label="Our publishing process" onPointerEnter={() => setPaused(true)} onPointerLeave={() => setPaused(false)} onFocus={() => setPaused(true)} onBlur={() => setPaused(false)}>{[['01','SOURCE','Research papers, texts, and knowledge traditions.'],['02','VERIFY','Academic review, source checking, and editorial care.'],['03','TRANSLATE','Complex ideas made clear, vivid, and age-appropriate.'],['04','DESIGN','Illustrations, structure, and visual learning that invite attention.'],['05','PUBLISH','Books made for classrooms, homes, and independent reading.']].map(([number,title,description], i) => <button key={title} className={i === stage ? 'stage current' : 'stage'} onClick={() => setStage(i)} role="tab" aria-selected={i === stage}><span>{number}</span><b>{title}</b><p>{description}</p><i>↘</i></button>)}</div><div className={`process-art process-stage-${stage}`}><span> {['SOURCE','VERIFY','TRANSLATE','DESIGN','PUBLISH'][stage]} </span><div className="page page-a"></div><div className="page page-b"></div><div key={stage} className="ink ink-pop">{stage === 0 ? 'ॐ' : stage === 1 ? '∴' : stage === 2 ? '✹' : stage === 3 ? '▤' : '✦'}</div></div></Reveal>

    <Reveal className="chapter back" id="trust"><div className="chapter-heading"><p className="eyebrow">03 / TRUSTED SOURCES</p><p>ACADEMIC COLLABORATION</p></div><div className="back-grid"><h2>Knowledge with<br/><i>a foundation.</i></h2><div className="back-copy"><p>We work with contributors from academic and research communities, including relationships connected to IIT Kanpur and MANIT Bhopal. Their research and source material help give our books a strong foundation.</p><p className="muted">These institutions represent contributor and research relationships, not an institutional endorsement of Adverkey Studios or its publications.</p><a className="text-link light" href="#contact">COLLABORATE WITH US <Arrow /></a></div><div className="institutions" aria-label="Trusted partners connected to our contributors"><p>TRUSTED PARTNERS</p><div className="institution-mark"><div className="institution-logo"><img src={iitKanpurLogo} alt="IIT Kanpur logo" /></div><span>INDIAN INSTITUTE OF TECHNOLOGY<br/><strong>KANPUR</strong></span></div><div className="institution-mark"><div className="institution-logo"><img src={manitBhopalLogo} alt="MANIT Bhopal logo" /></div><span>MAULANA AZAD NATIONAL INSTITUTE OF TECHNOLOGY<br/><strong>BHOPAL</strong></span></div></div></div></Reveal>

    <Reveal className="chapter build" id="iks"><div className="chapter-heading"><p className="eyebrow">04 / WHY IKS</p><p>IDEAS THAT STILL SPEAK</p></div><div className="build-grid"><div><h2>Old wisdom,<br/><i>new questions.</i></h2><p>Indian Knowledge Systems are the many ways people in India have studied, understood, recorded, and passed on knowledge across generations. Our books explore mathematics, astronomy, ecology, medicine, philosophy, literature, architecture, and the arts.</p><a className="text-link" href="#contact">EXPLORE A TOPIC <Arrow /></a></div><BuildField /></div>
      <div className="marquee marquee--alt" aria-hidden="true"><span>GANITA · AKASHA · BHUMI · SHABDA · KALA · VEDA ·&nbsp;</span><span>GANITA · AKASHA · BHUMI · SHABDA · KALA · VEDA ·&nbsp;</span></div></Reveal>

    <Reveal className="contact" id="contact"><p className="eyebrow">05 / A GOOD PLACE TO START</p><h2>Let’s make<br/><i>knowledge travel.</i></h2><div className="topic-buttons" role="radiogroup" aria-label="What brings you here?">{['HAVE RESEARCH TO SHARE','WANT TO PUBLISH A BOOK','NEED LEARNING CONTENT','WANT TO COLLABORATE'].map(x => <button role="radio" aria-checked={topic === x} className={topic === x ? 'chosen' : ''} key={x} onClick={() => setTopic(x)}>{x}<Arrow /></button>)}</div><a className="contact-email" data-magnetic href={`mailto:hello@adverkey.com?subject=${encodeURIComponent(topic + ' — Adverkey Studios enquiry')}`}>START A PUBLISHING CONVERSATION<br/>hello@adverkey.com</a></Reveal>
    <footer><a className="wordmark" href="#top">ADVERKEY<span>STUDIOS</span></a><p>RESEARCH · READING · RENEWAL</p><p>© 2026 ADVERKEY STUDIOS. ALL RIGHTS RESERVED.</p></footer>
  </main>
  </>}

createRoot(document.getElementById('root')!).render(<App />)
