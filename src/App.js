import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import './style/App.css';
import Landing from './components/Landing.js';
import Library from './components/Library.js';
import Album from './components/Album.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="first-header">
          <Link className='title-logo' to = '/'><img className = "logo" src = "./assets/images/bloc_jams_logo.png" alt = "bloc jams logo" /></Link>
          <nav>
            <Link className='navigation-links' to = '/library'>Library</Link>
          </nav>
        </header>
        <main>
          <Route exact path = '/' component = {Landing} />
          <Route path = '/library' component = {Library} />
          <Route path = '/album/:slug' component = {Album} />
        </main>
      </div>
    );
  }
}

export default App;
