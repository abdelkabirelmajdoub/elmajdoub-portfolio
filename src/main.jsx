import React from 'react';
import { createRoot } from 'react-dom/client';
import { profile, projects } from './profile';
import './design.css';

const sideout = 'https://sideout-silk-iota.vercel.app/';

function Sideout() {
  return <article className="feature">
    <div className="court-art" aria-hidden="true"><div className="court"><i /></div><span className="ball" /></div>
    <div className="feature-copy">
      <h3>Sideout</h3>
      <p>A volleyball match finder. Filter games by court and skill level, then reserve a spot in a demo match.</p>
      <div className="links"><a className="button" href={sideout}>Try Sideout</a>
        <a href="https://github.com/abdelkabirelmajdoub/sidout">View code</a>
        <a href={sideout + 'portfolio.html'}>Project story</a></div>
    </div>
  </article>;
}

function App() {
  return <div className="page">
    <a className="skip" href="#main">Skip to content</a>
    <header><a className="mark" href="#main" aria-label="Abdelkabir El Majdoub home">em.</a>
      <nav aria-label="Main navigation"><a href="#work">Work</a><a href="#contact">Contact</a></nav>
    </header>
    <main id="main">
      <section className="intro" aria-labelledby="name"><h1 id="name">Abdelkabir<br/>El Majdoub</h1>
        <div className="bio"><p>{profile.role} based in {profile.location}, Morocco.</p>
          <p>I study at 1337 and build web interfaces with React. Playing volleyball gave me the idea for Sideout.</p></div>
      </section>
      <section id="work"><h2>Selected work</h2><Sideout/>
        {projects.map(project => <details key={project.id}><summary>{project.category}</summary>
          <p>{project.description}</p><a href={profile.github + '/elmajdoub-portfolio'}>View portfolio source</a></details>)}
      </section>
    </main>
    <footer id="contact"><h2>Get in touch</h2><div className="links">
      {profile.email && <a href={'mailto:' + profile.email}>Email me</a>}
      <a href={profile.github}>GitHub</a><a href={profile.linkedin}>LinkedIn</a>
    </div></footer>
  </div>;
}

createRoot(document.getElementById('root')).render(<App/>);
