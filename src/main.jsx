import React from 'react';
import { createRoot } from 'react-dom/client';
import { profile } from './profile';
import './design.css';

const demo = 'https://sideout-silk-iota.vercel.app/';

function CourtPoster() {
  return <div className="poster" aria-hidden="true">
    <div className="court"><i/><b/></div>
    <div className="ball"><i/><b/></div>
    <span className="poster-title">Sideout.</span>
  </div>;
}

function App() {
  return <div className="page">
    <a className="skip" href="#main">Skip to content</a>
    <header><a className="logo" href="#main" aria-label="Elmajdoub home">e.</a>
      <nav aria-label="Main navigation"><a href="#work">Projects</a><a href="#contact">Contact</a></nav>
    </header>
    <main id="main">
      <section id="work" aria-labelledby="title">
        <div className="intro"><h1 id="title">Selected work.</h1><p>Elmajdoub<br/><span>Frontend developer</span></p></div>
        <article className="feature">
          <CourtPoster/>
          <div className="story"><p className="category">Sports application</p><h2>Sideout</h2>
            <p className="description">Find a volleyball game by court and skill level, then reserve a spot in a demo match.</p>
            <p className="technology">HTML, CSS &amp; JavaScript</p>
            <div className="actions"><a className="button" href={demo}>Launch demo</a><a href={demo + 'portfolio.html'}>Project story</a><a href={profile.github + '/sidout'}>Source code</a></div>
          </div>
        </article>
        <article className="secondary"><div className="mini" aria-hidden="true">e.</div>
          <div><h2>Personal portfolio</h2><p>A home for my projects, built with React and Vite.</p></div>
          <a href={profile.github + '/elmajdoub-portfolio'}>View source</a></article>
      </section>
    </main>
    <footer id="contact"><h2>Contact</h2><div><a href={'mailto:' + profile.email}>Email</a><a href={profile.github}>GitHub</a><a href={profile.linkedin}>LinkedIn</a></div></footer>
  </div>;
}

createRoot(document.getElementById('root')).render(<App/>);
