import { type CSSProperties, type ReactNode, useEffect, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'

const stages = [
  ['01', 'IDEA', 'A small question with room to grow.'],
  ['02', 'WRITE', 'A voice, a world, a beginning.'],
  ['03', 'CREATE', 'Words meet colour and character.'],
  ['04', 'PRODUCE', 'Care, craft, and a physical object.'],
  ['05', 'PUBLISH', 'A story ready to find its reader.'],
]

function Arrow() { return <span className="arrow" aria-hidden="true">↗</span> }

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
      <a onClick={() => setOpen(false)} href="#create">CREATE</a><a onClick={() => setOpen(false)} href="#back">BACK</a><a onClick={() => setOpen(false)} href="#build">BUILD</a><a onClick={() => setOpen(false)} href="#about">ABOUT</a>
    </nav>
    <a className="contact-link" href="#contact">LET'S TALK <Arrow /></a>
    <button className="menu" onClick={() => setOpen(!open)} aria-label="Toggle navigation" aria-expanded={open}><i></i><i></i></button>
  </header>
}

function Book() {
  const [active, setActive] = useState(false)
  return <button className={'book-wrap ' + (active ? 'book-active' : '')} onClick={() => setActive(!active)} aria-label="Reveal book details">
    <div className="book" aria-hidden="true"><div className="book-spine"></div><div className="book-cover"><span className="sun">✺</span><em>THE</em><strong>LONG<br/>WAY<br/>HOME</strong><small>AN ORIGINAL STORY</small></div></div>
    <span className="book-hint">{active ? 'A STORY FOR THE ROAD' : 'EXPLORE THE BOOK'} <Arrow /></span>
  </button>
}

function BuildField() {
  const field = useRef<HTMLDivElement>(null)
  const move = (event: React.PointerEvent<HTMLDivElement>) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !field.current) return
    const bounds = field.current.getBoundingClientRect()
    field.current.style.setProperty('--pointer-x', `${((event.clientX - bounds.left) / bounds.width - .5) * 2}`)
    field.current.style.setProperty('--pointer-y', `${((event.clientY - bounds.top) / bounds.height - .5) * 2}`)
  }
  return <div ref={field} className="field" onPointerMove={move} onPointerLeave={() => { field.current?.style.setProperty('--pointer-x', '0'); field.current?.style.setProperty('--pointer-y', '0') }} aria-label="An abstract system that responds to pointer movement"><div className="field-label">A SYSTEM IS ONLY AS GOOD AS<br/>THE QUESTION IT HELPS ANSWER.</div>{Array.from({length: 16}).map((_,i) => <i key={i} style={{'--x': `${(i%4)*31+4}%`, '--y': `${Math.floor(i/4)*29+7}%`, '--depth': `${(i % 3 + 1) * 7}px`} as CSSProperties}></i>)}</div>
}

function App() {
  const [stage, setStage] = useState(0)
  const [topic, setTopic] = useState('CREATE')
  useEffect(() => { document.documentElement.style.setProperty('--stage', String(stage)) }, [stage])
  return <main id="top">
    <Header />
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-index">001 / AN INDEPENDENT COMPANY</div>
      <h1 id="hero-title"><span>CREATE.</span><span>BACK.</span><span>BUILD.</span></h1>
      <div className="hero-bottom"><p>Ideas deserve more than one way forward.</p><a href="#create" className="circle-link" aria-label="Begin exploring">↓</a><p className="hero-note">PUBLISHING / INVESTMENT / TECHNOLOGY</p></div>
      <div className="hero-disc"></div>
    </section>

    <Reveal className="manifesto" id="about"><p className="eyebrow">WHAT WE'RE HERE FOR</p><div><h2>We make room for<br/><i>what could be.</i></h2><p className="intro">Adverkey Studios is a home for stories, ambitious people, and useful technology. We work where imagination becomes something real.</p></div></Reveal>

    <Reveal className="chapter create" id="create">
      <div className="chapter-heading"><p className="eyebrow">01 / CREATE</p><p>CHILDREN'S PUBLISHING</p></div>
      <div className="create-main"><div><h2>Stories for<br/><i>curious minds.</i></h2><p>We shape books from their first flicker of an idea to the moment they are held, read, and passed on.</p><a className="text-link" href="#process">HOW WE MAKE BOOKS <Arrow /></a></div><Book /></div>
      <div className="marquee"><span>WORDS CAN CHANGE THE WEATHER</span><span>WORDS CAN CHANGE THE WEATHER</span></div>
    </Reveal>

    <Reveal className="process" id="process"><div className="process-head"><p className="eyebrow">FROM FIRST MARK TO LAST PAGE</p><h2>Making a book<br/>is a <i>way of seeing.</i></h2></div><div className="stages" role="tablist" aria-label="Publishing process">{stages.map(([number,title,description], i) => <button key={title} className={i === stage ? 'stage current' : 'stage'} onClick={() => setStage(i)} role="tab" aria-selected={i === stage}><span>{number}</span><b>{title}</b><p>{description}</p><i>↘</i></button>)}</div><div className={`process-art process-stage-${stage}`}><span> {stages[stage][1]} </span><div className="page page-a"></div><div className="page page-b"></div><div className="ink">{stage === 0 ? '?' : stage === 1 ? 'Once' : stage === 2 ? '✹' : stage === 3 ? '▤' : '✦'}</div></div></Reveal>

    <Reveal className="chapter back" id="back"><div className="chapter-heading"><p className="eyebrow">02 / BACK</p><p>INVESTMENT, IN FORMATION</p></div><div className="back-grid"><h2>Back the<br/><i>beginning.</i></h2><div className="back-copy"><p>We are building our approach to investment around people with clear conviction and ideas with a reason to exist.</p><p className="muted">No portfolio theatre. Just a long-term interest in what people are making next.</p><a className="text-link light" href="#contact">START A CONVERSATION <Arrow /></a></div><div className="thesis"><p>WHAT WE LOOK FOR</p>{['A considered point of view','People who stay curious','Useful, enduring work','Ambition with texture'].map((item,i) => <button key={item}><span>0{i+1}</span>{item}<Arrow /></button>)}</div></div></Reveal>

    <Reveal className="chapter build" id="build"><div className="chapter-heading"><p className="eyebrow">03 / BUILD</p><p>TECHNOLOGY & MACHINE LEARNING</p></div><div className="build-grid"><div><h2>Intelligence,<br/><i>made useful.</i></h2><p>We are developing a technology practice for teams working through consequential questions.</p><a className="text-link" href="#contact">BUILD WITH US <Arrow /></a></div><BuildField /></div></Reveal>

    <Reveal className="contact" id="contact"><p className="eyebrow">A GOOD PLACE TO START</p><h2>What brings<br/>you <i>here?</i></h2><div className="topic-buttons">{['CREATE','BACK','BUILD','SOMETHING ELSE'].map(x => <button className={topic === x ? 'chosen' : ''} key={x} onClick={() => setTopic(x)}>{x}<Arrow /></button>)}</div><p className="contact-email">CONTACT DETAILS<br/>COMING SOON</p></Reveal>
    <footer><a className="wordmark" href="#top">ADVERKEY<span>STUDIOS</span></a><p>CREATE. BACK. BUILD.</p><p>© 2026 ADVERKEY STUDIOS. ALL RIGHTS RESERVED.</p></footer>
  </main>
}

createRoot(document.getElementById('root')!).render(<App />)
