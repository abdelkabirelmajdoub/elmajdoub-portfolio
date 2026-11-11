import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { profile, projects, upcoming } from './profile';
import './styles.css';
import './design.css';

function Arrow({ diagonal = true, ...props }) {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}><path d={diagonal ? 'M5 19 19 5M5 5h14v14' : 'M4 12h16m-6-6 6 6-6 6'} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

function Sculpture() {
  const ref = useRef(null);
  function move(event) {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const box = event.currentTarget.getBoundingClientRect();
    ref.current.style.setProperty('--rx', `${(event.clientY - box.top - box.height / 2) / 35}deg`);
    ref.current.style.setProperty('--ry', `${(event.clientX - box.left - box.width / 2) / 35}deg`);
  }
  return <div className="sculpture" onPointerMove={move} onPointerLeave={() => { ref.current.style.setProperty('--rx', '0deg'); ref.current.style.setProperty('--ry', '0deg'); }} aria-hidden="true">
    <div className="sculpture-inner" ref={ref}>
      <svg viewBox="0 0 500 420" className="sculpture-svg">
        <defs>
          <linearGradient id="metal" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#e7ff9b"/><stop offset=".45" stopColor="#baf13d"/><stop offset="1" stopColor="#5d8e10"/></linearGradient>
          <linearGradient id="side" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#729a20"/><stop offset="1" stopColor="#304c06"/></linearGradient>
        </defs>
        <g className="orbit-lines" fill="none" stroke="currentColor" strokeWidth=".7" opacity=".18"><ellipse cx="250" cy="214" rx="224" ry="95" transform="rotate(-24 250 214)"/><ellipse cx="250" cy="214" rx="224" ry="95" transform="rotate(53 250 214)"/><circle cx="250" cy="214" r="177"/></g>
        <g transform="translate(250 210) rotate(-23)">
          <path d="M-47-140H27V-47H120V27H27V120H-47V27H-140V-47H-47Z" fill="url(#side)" transform="translate(25 27)"/>
          <path d="M-47-140H27L52-113H-22Z M27-47H120L145-20H52Z M120-47V27L145 54V-20Z M27 27V120L52 147V54Z M-47 120H27L52 147H-22Z M-140 27H-47L-22 54H-115Z" fill="url(#side)"/>
          <path d="M-47-140H27V-47H120V27H27V120H-47V27H-140V-47H-47Z" fill="url(#metal)" stroke="#e4ff93" strokeWidth="1"/>
          <path d="M-44-137H24M-137-44H-44V-137M-44 24V117" fill="none" stroke="#efffcb" opacity=".55"/>
        </g>
        <circle cx="442" cy="126" r="4" fill="currentColor"/><path d="M60 322h16m-8-8v16" stroke="currentColor" strokeWidth="1"/>
      </svg>
    </div>
    <span className="art-caption mono">CREATIVE / DEVELOPMENT</span>
  </div>;
}

function ProjectPreview() {
  return <div className="project-art" aria-hidden="true">
    <div className="preview-browser"><div className="preview-toolbar"><span>e.</span><span>WORK &nbsp; ABOUT &nbsp; CONTACT</span><span>↗</span></div>
      <div className="preview-name">elmajdoub<span>®</span></div>
      <div className="preview-middle"><span>Interfaces.<br/><em>With character.</em></span><div className="preview-star">✳</div></div>
      <div className="preview-bottom"><span>FRONTEND DEVELOPER</span><span>REACT / TAILWIND / VITE</span></div>
    </div><span className="art-index mono">PORTFOLIO / 001</span>
  </div>;
}

function ProjectDialog({ onClose }) {
  const dialog = useRef(null);
  useEffect(() => {
    const element = dialog.current;
    element.showModal();
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);
  return <dialog ref={dialog} className="project-dialog" onCancel={onClose} onClick={e => { if (e.target === e.currentTarget) onClose(); }} aria-labelledby="dialog-title">
    <div className="dialog-content"><div className="flex items-center justify-between"><span className="eyebrow">PROJECT 01 / PERSONAL PORTFOLIO</span><button className="close-button" onClick={onClose} aria-label="Close project details">×</button></div>
      <h2 id="dialog-title">A home for<br/>what comes next.</h2><p>A personal space to introduce myself, experiment with interaction, and document the things I build.</p>
      <div className="case-detail"><h3>What’s inside</h3><ul><li>Reusable React components and editable project data</li><li>Responsive layouts built with Tailwind CSS and custom CSS</li><li>Keyboard navigation, a mobile menu, and reduced motion support</li><li>A lightweight production build powered by Vite</li></ul></div>
      <div className="case-detail"><h3>What I’m working toward</h3><p>Adding projects with real interactions, clear documentation, and source code I can walk through in an interview.</p></div>
      {profile.github && <a className="text-link" href={profile.github} target="_blank" rel="noreferrer">Find me on GitHub <Arrow/></a>}
      <button className="primary-button mt-8" onClick={onClose}>Back to portfolio <Arrow diagonal={false}/></button>
    </div>
  </dialog>;
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showProject, setShowProject] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }
    }), { threshold: .12 });
    document.querySelectorAll('[data-reveal]').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    function escape(e) { if (e.key === 'Escape') setMenuOpen(false); }
    window.addEventListener('keydown', escape);
    return () => window.removeEventListener('keydown', escape);
  }, []);
  const closeMenu = () => setMenuOpen(false);
  return <>
    <a href="#main" className="skip-link">Skip to content</a>
    <header className="site-header">
      <a href="#" className="wordmark" aria-label="Elmajdoub home">e<span>.</span></a>
      <nav className="desktop-nav" aria-label="Main navigation"><a href="#work">Work <span>02</span></a><a href="#about">About</a><a href="#contact">Let’s talk <Arrow/></a></nav>
      <a className="header-github mono" href={profile.github} target="_blank" rel="noreferrer">GITHUB <Arrow/></a>
      <button className="menu-toggle" aria-expanded={menuOpen} aria-controls="mobile-nav" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? 'Close' : 'Menu'} <span>{menuOpen ? '−' : '+'}</span></button>
    </header>
    <nav id="mobile-nav" className={`mobile-nav ${menuOpen ? 'open' : ''}`} aria-label="Mobile navigation" inert={!menuOpen ? true : undefined}><a onClick={closeMenu} href="#work">Work <span>02</span></a><a onClick={closeMenu} href="#about">About</a><a onClick={closeMenu} href="#contact">Let’s talk <Arrow/></a></nav>
    <main id="main">
      <section className="hero" aria-labelledby="hero-name">
        <div className="hero-top"><span className="eyebrow hero-enter">FRONTEND DEVELOPER / PORTFOLIO</span><span className="eyebrow hero-enter">INDEPENDENT MIND. DIGITAL CRAFT.</span></div>
        <div className="hero-coordinate mono" aria-hidden="true">35°34′ N / 05°22′ W</div><div className="name-wrap"><h1 id="hero-name" className="hero-name hero-enter">{profile.name}<span className="name-dot">.</span></h1></div>
        <div className="hero-main"><div className="hero-copy hero-enter"><div className="role-label"><span className="small-cross">✳</span><span>CODE WITH INTENTION.</span></div><h2>Interfaces.<br/><em>With character.</em></h2><p>I’m Elmajdoub. I build responsive web experiences with React, Tailwind CSS, and a curious mind.</p><a className="primary-button" href="#work">Explore my work <Arrow diagonal={false}/></a></div><Sculpture/></div>
        <div className="hero-bottom"><span className="mono">REACT / TAILWIND CSS / VITE</span><a href="#work" className="scroll-link mono">SCROLL TO EXPLORE <span>↓</span></a></div>
      </section>

      <div className="tech-ticker" aria-label="React, Tailwind CSS, Vite, responsive interfaces"><div aria-hidden="true">{[0,1,2,3].map(i => <span key={i}>REACT <b>✳</b> TAILWIND CSS <b>✳</b> VITE <b>✳</b> RESPONSIVE INTERFACES <b>✳</b> </span>)}</div></div><section id="work" className="section work-section">
        <div className="section-heading" data-reveal><span className="eyebrow">01 / SELECTED WORK</span><div><h2>Less talk.<br/><span className="muted">More building.</span></h2><p>A growing collection. Starting right here.</p></div></div>
        {projects.map(project => <article className="featured-project" key={project.id} data-reveal>
          <button className="project-visual-button" onClick={() => setShowProject(true)} aria-label={`Read about ${project.category}`}><ProjectPreview/><span className="project-open"><Arrow/></span></button>
          <div className="project-info"><div className="project-title"><span className="project-number mono">{project.number}</span><div><div className="project-category mono">{project.category} <span>— {project.status}</span></div><h3><button onClick={() => setShowProject(true)}>{project.title}</button></h3><p>{project.description}</p></div></div><div className="project-meta"><span className="mono">{project.tags.join(' / ')}</span><button className="text-link" onClick={() => setShowProject(true)}>Project notes <Arrow/></button></div></div>
        </article>)}
        <article className="featured-project" data-reveal>
          <a className="project-visual-button" href="https://sideout-silk-iota.vercel.app/" aria-label="Open Sideout volleyball demo"><div className="project-art" style={{background:'#123db5',color:'#fff',display:'grid',placeItems:'center',padding:'3rem'}}><div><p style={{fontSize:'1rem',color:'#f5d547'}}>Sideout / Volleyball match finder</p><h3 style={{fontSize:'clamp(2.5rem,6vw,5rem)',lineHeight:1.05}}>Less scrolling.<br/>More volleyball.</h3><p>Find your next game.</p></div></div><span className="project-open"><Arrow/></span></a>
          <div className="project-info"><div className="project-title"><span className="project-number mono">02</span><div><div className="project-category mono">Interactive frontend <span>— Demo</span></div><h3><a href="https://sideout-silk-iota.vercel.app/">Sideout: find your next game.</a></h3><p>A volleyball match finder with court and level filters, local reservations, and an original court illustration. All matches are illustrative.</p></div></div><div className="project-meta"><span className="mono">HTML / CSS / JavaScript</span><a className="text-link" href="https://sideout-silk-iota.vercel.app/portfolio.html">Project story <Arrow/></a><a className="text-link" href="https://github.com/abdelkabirelmajdoub/elmajdoub-portfolio/tree/main/public/sideout" target="_blank" rel="noreferrer">Source code <Arrow/></a></div></div>
        </article>
        <div className="next-projects" data-reveal><span className="eyebrow">ON THE HORIZON</span>{upcoming.map(project => <div className="upcoming-row" key={project.number}><span className="mono upcoming-number">{project.number}</span><h3>{project.title}</h3><span className="upcoming-detail">{project.detail}</span><span className="upcoming-symbol" aria-hidden="true">↗</span></div>)}<p className="future-note">Ideas on the roadmap — I’ll share the live projects and code as I build them.</p></div>
      </section>

      <section id="about" className="section about-section"><div className="about-top" data-reveal><span className="eyebrow">02 / A BIT ABOUT ME</span><span className="about-mark" aria-hidden="true">e<span>.</span></span></div>
        <div className="about-content" data-reveal><h2>Curiosity is<br/><span className="muted">the starting point.</span></h2><div className="about-text"><p>{profile.about}</p><p>I care about the small things: a layout that works on a phone, a button that feels right, and code that’s easy to come back to.</p>{profile.location && <span className="mono">BASED IN {profile.location.toUpperCase()}</span>}</div></div>
        <div className="skills-list" data-reveal><div className="skills-label"><span className="eyebrow">MY CURRENT TOOLKIT</span><p>The tools I’m learning<br/>and building with.</p></div><div className="skill-items">{[{number:'01',name:'React',detail:'Components, props & state'},{number:'02',name:'Tailwind CSS',detail:'Responsive layouts & styling'},{number:'03',name:'Vite',detail:'Development & production builds'}].map(skill => <div className="skill-row" key={skill.name}><span className="mono">{skill.number}</span><h3>{skill.name}</h3><span>{skill.detail}</span><Arrow/></div>)}</div></div>
      </section>

      <section id="contact" className="section contact-section"><div className="contact-top" data-reveal><span className="eyebrow">03 / WHAT’S NEXT?</span><span className="availability mono">TETOUAN, MOROCCO / ON THE WEB</span></div><div data-reveal><h2>Let’s build<br/>something<span className="orange">.</span></h2><div className="contact-bottom"><p>Have an idea worth building?<br/>Let’s turn it into something real.</p>{profile.email ? <a className="contact-link" href={`mailto:${profile.email}`}>Say hello <Arrow/></a> : <span className="contact-pending">Contact details coming soon <span aria-hidden="true">↗</span></span>}</div></div></section>
    </main>
    <footer className="site-footer"><a className="footer-name" href="#">{profile.name}<span>.</span></a><span className="mono">BUILT WITH REACT, TAILWIND & VITE</span><div className="footer-links">{profile.github && <a href={profile.github} target="_blank" rel="noreferrer">GitHub <Arrow/></a>}{profile.linkedin && <a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn <Arrow/></a>}<a href="#">Back to top ↑</a></div></footer>
    {showProject && <ProjectDialog onClose={() => setShowProject(false)}/>}
  </>;
}

createRoot(document.getElementById('root')).render(<App/>);
