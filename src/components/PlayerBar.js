import React, { Component } from 'react';
import './../style/PlayerBar.css';

class PlayerBar extends Component {
  render() {
    return (
      <section className = 'player-bar' >
        <section id = 'buttons'>
          <button id = 'previous' onClick = { this.props.handlePrevClick }>
            <span className = 'icon ion-md-skip-backward' />
          </button>
          <button id = 'play-pause' onClick = { this.props.handleSongClick }>
            <span className = { this.props.isPlaying ? 'icon ion-md-pause' : 'icon ion-md-play' } />
          </button>
          <button id = 'next' onClick = {this.props.handleNextClick } >
            <span className = 'icon ion-md-skip-forward' />
          </button>
        </section>
        <section id = 'time-control' >
          <div className = 'current-time'>{this.props.formatTime(this.props.currentTime)}</div>
          <div className = 'time-container'>
            <input
              type = 'range'
              className = 'seek-bar-1'
              value = { (this.props.currentTime / this.props.duration) || 0 }
              max = '1'
              min = '0'
              step = '0.01'
              onChange = {this.props.handleTimeChange}
            />
          </div>
          <div className = 'total-time'>{this.props.formatTime(this.props.duration)}</div>
        </section>
        <section id = 'volume-control' >
          <div className = 'icon ion-md-volume-low' />
          <div className = 'volume-container'>
            <input
              type = 'range'
              className = 'seek-bar-2'
              value = {this.props.volume}
              max = '1'
              min = '0'
              step = '0.01'
              onChange = {this.props.handleVolumeChange}
            />
          </div>
          <div className = 'icon ion-md-volume-high' />
        </section>
      </section>
    );
  }
}

export default PlayerBar;
