import React, { useLayoutEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { profile } from './profile';
import './design.css';

const demo = 'https://sideout-silk-iota.vercel.app/';

function ProjectPreview() {
  const [phone, setPhone] = useState(false);
  const [width, setWidth] = useState(0);
  const screen = useRef(null);
  useLayoutEffect(() => {
    const element = screen.current;
    const measure = () => setWidth(element.clientWidth);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  const sourceWidth = phone ? 390 : 1220;
  return <div className="exhibit">
    <div className="exhibit-top"><span>Sideout preview</span>
      <div className="switch" role="group" aria-label="Preview size">
        <button aria-pressed={!phone} onClick={() => setPhone(false)}>Desktop</button>
        <button aria-pressed={phone} onClick={() => setPhone(true)}>Phone</button>
      </div>
    </div>
    <div className="stage"><div className={'device' + (phone ? ' phone' : '')}>
      <div className="chrome" aria-hidden="true"><i/><i/><i/><span>sideout</span></div>
      <div className="screen" ref={screen}>
        <iframe title="Non-interactive preview of the Sideout volleyball match finder" aria-hidden="true" tabIndex="-1" sandbox="" src="/sideout-preview.html"
          style={{ width: sourceWidth, height: phone ? 930 : 730, transform: 'scale(' + width / sourceWidth + ')' }}/>
      </div>
    </div></div>
  </div>;
}

function App() {
  return <div className="shell">
    <a className="skip" href="#work">Skip to work</a>
    <header><a className="logo" href="#work" aria-label="Elmajdoub home">e.</a><span className="identity">Elmajdoub <span>/ Frontend developer</span></span>
      <nav aria-label="Main navigation"><a href="#projects">Projects</a><a href="#contact">Contact</a></nav></header>
    <main id="work">
      <section className="hero" aria-labelledby="hero-title"><div className="hero-copy">
        <h1 id="hero-title">Interfaces<br/>in play.</h1>
        <p>Selected frontend work, from a volleyball match finder to this portfolio.</p>
        <a className="primary" href={demo}>Try Sideout <span aria-hidden="true">↗</span></a>
      </div><ProjectPreview/></section>
      <section id="projects" aria-labelledby="project-heading"><h2 id="project-heading">Project index</h2>
        <article className="item"><span className="tile sport" aria-hidden="true">S.</span><div className="info"><h3>Sideout</h3><p>Find a court, filter games by level and reserve a place in a demo match.</p></div><div className="meta"><span>HTML, CSS, JavaScript</span><div><a href={demo + 'portfolio.html'}>Project story</a><a href={profile.github + '/sidout'}>Code</a></div></div></article>
        <article className="item"><span className="tile sport" aria-hidden="true">T.</span><div className="info"><h3>Touchline</h3><p>Football fixtures in your timezone, with player, coach and stadium cards.</p></div><div className="meta"><span>JavaScript, Node.js</span><a href="https://touchline-clock.vercel.app/">Launch project</a></div></article>
        <article className="item"><span className="tile personal" aria-hidden="true">e.</span><div className="info"><h3>Personal portfolio</h3><p>A responsive showcase with a switchable project preview.</p></div><div className="meta"><span>React, Vite</span><a href={profile.github + '/elmajdoub-portfolio'}>View source</a></div></article>
      </section>
    </main>
    <footer id="contact"><h2>Get in touch.</h2><div><a href={'mailto:' + profile.email}>Email me</a><a href={profile.github}>GitHub</a><a href={profile.linkedin}>LinkedIn</a></div></footer>
  </div>;
}

createRoot(document.getElementById('root')).render(<App/>);
