import React from 'react';
import './../style/Landing.css';

const Landing = () => (
  <section className = 'Landing'>
    <section className = 'Center'>
      <h1 className = 'hero-title'>Turn the music up!</h1>
      <img className = 'hero-image' src = "./assets/images/Music.jpg" />
    </section>
    <section className = 'selling-points'>
      <div className = 'point-1'>
        <img className = 'music-icon' src = "./assets/images/music.png" alt = "music icon" />
        <h2 className = 'point-title'>Choose your music</h2>
        <p className = 'point-description'>The world is full of music; why should you have to listen to music that someone else chose?</p>
      </div>
      <div className = 'point-2'>
        <img className = 'internet-icon' src = "./assets/images/Internet.png" alt = "internet icon"  />
        <h2 className = 'point-title'>Unlimited, streaming, ad-free</h2>
        <p className = 'point-description'>No arbitrary limits. No distractions.</p>
      </div>
      <div className = 'point-3'>
        <img className = 'wireless-icon' src = "./assets/images/wireless.png" alt = "wireless icon" />
        <h2 className = 'point-title'>Mobile enabled</h2>
        <p className = 'point-description'>Listen to your music on the go. This streaming service is available on all mobile platforms.</p>
      </div>
    </section>
  </section>
);

export default Landing;
