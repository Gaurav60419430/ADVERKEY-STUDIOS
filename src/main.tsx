import { type ReactNode, useEffect, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'
import './iks.css'
import './book-pages.css'
import './aryabhata.css'
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
  return <div className="hero-book hero-book--closed" aria-hidden="true"><div className="hero-book-cover hero-book-cover-back"></div><div className="hero-book-pages"><i className="page-spread page-spread-1"><span className="page-kicker">01 / GANITA</span><b>0 · 1 · 1 · 2</b><em className="page-diagram page-orbit"></em><small>THE LANGUAGE OF PATTERNS</small></i><i className="page-spread page-spread-2"><span className="page-kicker">02 / AKASHA</span><b>✦</b><em className="page-diagram page-constellation"></em><small>READING THE NIGHT SKY</small></i><i className="page-spread page-spread-3"><span className="page-kicker">03 / BHUMI</span><b>△</b><em className="page-diagram page-map"></em><small>LAND, WATER, MEMORY</small></i><i className="page-spread page-spread-4"><span className="page-kicker">04 / SHABDA</span><b>ॐ</b><em className="page-diagram page-lines"></em><small>WORDS THAT TRAVEL</small></i><i className="page-spread page-spread-5"><span className="page-kicker">05 / KALA</span><b>✺</b><em className="page-diagram page-grid"></em><small>FORM, RHYTHM, MAKING</small></i></div><div className="hero-book-cover hero-book-cover-front"><span>IKS</span><b>READ<br/>INDIA</b><small>ADVERKEY PRESS</small></div></div>
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
  return <header className="header">
    <a className="wordmark" href="#top" aria-label="Adverkey Studios home">ADVERKEY<span>STUDIOS</span></a>
    <nav className={open ? 'nav open' : 'nav'} aria-label="Primary navigation">
      <a onClick={() => setOpen(false)} href="#about">ABOUT</a><a onClick={() => setOpen(false)} href="#books">BOOKS</a><a onClick={() => setOpen(false)} href="#method">METHOD</a><a onClick={() => setOpen(false)} href="#trust">TRUST</a>
    </nav>
    <a className="contact-link" href="#contact">PUBLISH WITH US <Arrow /></a>
    <button className="menu" onClick={() => setOpen(!open)} aria-label="Toggle navigation" aria-expanded={open}><i></i><i></i></button>
  </header>
}

function Book() {
  const [active, setActive] = useState(false)
  return <button className={'book-wrap ' + (active ? 'book-active' : '')} onClick={() => setActive(!active)} aria-label="Reveal book details">
    <div className="book" aria-hidden="true"><div className="book-spine"></div><div className="book-cover"><span className="sun">✺</span><em>THE</em><strong>LONG<br/>WAY<br/>HOME</strong><small>AN ORIGINAL STORY</small></div></div>
    <span className="book-hint">{active ? 'A RESEARCH-LED READING JOURNEY' : 'EXPLORE A BOOK'} <Arrow /></span>
  </button>
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

function App() {
  const [stage, setStage] = useState(0)
  const [topic, setTopic] = useState('PUBLISH A BOOK')
  useEffect(() => { document.documentElement.style.setProperty('--stage', String(stage)) }, [stage])
  return <main id="top">
    <Header />
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-covers" aria-hidden="true">
        <div className="cover-track cover-track-forward"><i></i><i></i></div>
        <div className="cover-track cover-track-reverse"><i></i><i></i></div>
      </div>
      <div className="hero-index">001 / RESEARCH-LED PUBLISHING</div>
      <h1 id="hero-title"><span>LEARN</span><span>FROM OUR</span><span>ROOTS.</span></h1>
      <div className="hero-bottom"><p>Adverkey Studios turns research, scholarship, and living traditions into books for the next generation.</p><a href="#books" className="circle-link" aria-label="Explore our books">↓</a><p className="hero-note">IKS / RESEARCH / LEARNING</p></div>
      <HeroBook />
    </section>

    <Reveal className="manifesto" id="about"><p className="eyebrow">WHAT WE DO</p><div><h2>Traditional<br/><i>knowledge made alive again.</i></h2><p className="intro">Adverkey Studios works with trusted authors and researchers to turn research papers, traditional texts, academic work, and cultural knowledge into accessible books for a new generation of readers.</p></div></Reveal>

    <Reveal className="chapter create" id="books">
      <div className="chapter-heading"><p className="eyebrow">01 / OUR READERS</p><p>BOOKS FOR EVERY AGE</p></div>
      <div className="create-main"><div><h2>Books for<br/><i>curious minds.</i></h2><p>We make books that help young readers discover where ideas come from—and where they can go next. We edit, translate, design, and publish knowledge in forms people can read, enjoy, and remember.</p><a className="text-link" href="#method">HOW WE MAKE BOOKS <Arrow /></a></div><Book /></div>
      <div className="audiences"><div><b>01</b><strong>CHILDREN</strong><span>Illustrated, story-led introductions to Indian ideas and traditions.</span></div><div><b>02</b><strong>TEENAGERS</strong><span>Context, curiosity, and deeper connections across subjects and time.</span></div><div><b>03</b><strong>COLLEGE</strong><span>Rigorous, accessible learning material for students and independent readers.</span></div></div>
      <div className="marquee"><span>ROOTED IN RESEARCH · MADE FOR THE NEXT GENERATION</span><span>ROOTED IN RESEARCH · MADE FOR THE NEXT GENERATION</span></div>
    </Reveal>

    <Reveal className="process" id="method"><div className="process-head"><p className="eyebrow">FROM SOURCE TO LAST PAGE</p><h2>Research becomes<br/><i>a reading journey.</i></h2></div><div className="stages" role="tablist" aria-label="Our publishing process">{[['01','SOURCE','Research papers, texts, and knowledge traditions.'],['02','VERIFY','Academic review, source checking, and editorial care.'],['03','TRANSLATE','Complex ideas made clear, vivid, and age-appropriate.'],['04','DESIGN','Illustrations, structure, and visual learning that invite attention.'],['05','PUBLISH','Books made for classrooms, homes, and independent reading.']].map(([number,title,description], i) => <button key={title} className={i === stage ? 'stage current' : 'stage'} onClick={() => setStage(i)} role="tab" aria-selected={i === stage}><span>{number}</span><b>{title}</b><p>{description}</p><i>↘</i></button>)}</div><div className={`process-art process-stage-${stage}`}><span> {['SOURCE','VERIFY','TRANSLATE','DESIGN','PUBLISH'][stage]} </span><div className="page page-a"></div><div className="page page-b"></div><div className="ink">{stage === 0 ? 'ॐ' : stage === 1 ? '∴' : stage === 2 ? '✹' : stage === 3 ? '▤' : '✦'}</div></div></Reveal>

    <Reveal className="chapter back" id="trust"><div className="chapter-heading"><p className="eyebrow">02 / TRUSTED SOURCES</p><p>ACADEMIC COLLABORATION</p></div><div className="back-grid"><h2>Knowledge with<br/><i>a foundation.</i></h2><div className="back-copy"><p>We work with contributors from academic and research communities, including relationships connected to IIT Kanpur and MANIT Bhopal. Their research and source material help give our books a strong foundation.</p><p className="muted">These institutions represent contributor and research relationships, not an institutional endorsement of Adverkey Studios or its publications.</p><a className="text-link light" href="#contact">COLLABORATE WITH US <Arrow /></a></div><div className="institutions" aria-label="Trusted partners connected to our contributors"><p>TRUSTED PARTNERS</p><div className="institution-mark"><div className="institution-logo"><img src={iitKanpurLogo} alt="IIT Kanpur logo" /></div><span>INDIAN INSTITUTE OF TECHNOLOGY<br/><strong>KANPUR</strong></span></div><div className="institution-mark"><div className="institution-logo"><img src={manitBhopalLogo} alt="MANIT Bhopal logo" /></div><span>MAULANA AZAD NATIONAL INSTITUTE OF TECHNOLOGY<br/><strong>BHOPAL</strong></span></div></div></div></Reveal>

    <Reveal className="chapter build" id="iks"><div className="chapter-heading"><p className="eyebrow">03 / WHY IKS</p><p>IDEAS THAT STILL SPEAK</p></div><div className="build-grid"><div><h2>Old wisdom,<br/><i>new questions.</i></h2><p>Indian Knowledge Systems are the many ways people in India have studied, understood, recorded, and passed on knowledge across generations. Our books explore mathematics, astronomy, ecology, medicine, philosophy, literature, architecture, and the arts.</p><a className="text-link" href="#contact">EXPLORE A TOPIC <Arrow /></a></div><BuildField /></div></Reveal>

    <Reveal className="contact" id="contact"><p className="eyebrow">A GOOD PLACE TO START</p><h2>Let’s make<br/><i>knowledge travel.</i></h2><div className="topic-buttons">{['HAVE RESEARCH TO SHARE','WANT TO PUBLISH A BOOK','NEED LEARNING CONTENT','WANT TO COLLABORATE'].map(x => <button className={topic === x ? 'chosen' : ''} key={x} onClick={() => setTopic(x)}>{x}<Arrow /></button>)}</div><a className="contact-email" href="mailto:hello@adverkey.com">START A PUBLISHING CONVERSATION<br/>hello@adverkey.com</a></Reveal>
    <footer><a className="wordmark" href="#top">ADVERKEY<span>STUDIOS</span></a><p>RESEARCH · READING · RENEWAL</p><p>© 2026 ADVERKEY STUDIOS. ALL RIGHTS RESERVED.</p></footer>
  </main>
}

createRoot(document.getElementById('root')!).render(<App />)
