import React, { Component } from 'react';
import albumData from './../data/albums';
import PlayerBar from './PlayerBar';

class Album extends Component {
  constructor(props) {
    super(props);

    const album = albumData.find( album => {
      return album.slug === this.props.match.params.slug
    });

    this.state = {
      album: album,
      currentSong: null,
      isPlaying: false,
      isHover: false,
      currentTime: 0,
      duration: album.songs[0].duration,
      volume: 0
    };

    this.audioElement = document.createElement('audio');
    this.audioElement.src = album.songs[0].audioSrc;
  }

  play() {
    this.audioElement.play();
    this.setState({ isPlaying: true });
  }

  pause() {
    this.audioElement.pause();
    this.setState({ isPlaying: false });
  }

  componentDidMount() {
    this.eventListeners = {
      timeupdate: e => {
        this.setState({ currentTime: this.audioElement.currentTime });
      },
      durationchange: e => {
        this.setState({ duration: this.audioElement.duration });
      },
      volumechange: e => {
        this.setState({ volume: this.audioElement.volume });
      }
    };
    this.audioElement.addEventListener('timeupdate', this.eventListeners.timeupdate);
    this.audioElement.addEventListener('durationchange', this.eventListeners.durationchange);
    this.audioElement.addEventListener('volumechange', this.eventListeners.volumechange);
  }

  componentWillUnmount() {
    this.audioElement.src = null;
    this.audioElement.removeEventListener('timeupdate', this.eventListeners.timeupdate);
    this.audioElement.removeEventListener('durationchange', this.eventListeners.durationchange);
    this.audioElement.removeEventListener('volumechange', this.eventListeners.volumechange);
  }

  setSong(song) {
    this.audioElement.src = song.audioSrc;
    this.setState({ currentSong: song })
  }

  handleSongClick(song) {
    const isSameSong = this.state.currentSong === song;
    if( this.state.isPlaying && isSameSong ) {
      this.pause();
    } else {
      if (!isSameSong) { this.setSong(song) };
      this.play();
    }
  }

  mouseOn(index) {
    this.setState({ isHover: index });
  }

  mouseOff() {
    this.setState({ isHover: false });
  }

  handleHoverOnSong(song, index) {
    if ( this.state.currentSong === song && this.state.isPlaying ) {
      return <span className = 'icon ion-md-pause' />;
    } else if ( this.state.isHover === index ) {
      return <span className = 'icon ion-md-play' />;
    } else if ( this.state.currentSong === song && !this.state.isPlaying ) {
      return <span className = 'icon ion-md-play' />;
    } else {
      return index + 1;
    }
  }

  handlePrevClick() {
    const currentIndex = this.state.album.songs.findIndex( song => this.state.currentSong === song );
    const newIndex = Math.max( 0, currentIndex - 1 );
    const newSong = this.state.album.songs[newIndex];
    this.setSong(newSong);
    this.play();
  }

  handleNextClick() {
    const currentIndex = this.state.album.songs.findIndex( song => this.state.currentSong === song );
    const newIndex = Math.min( this.state.album.songs.length - 1 , currentIndex + 1 );
    const newSong = this.state.album.songs[newIndex];
    this.setSong(newSong);
    this.play();
  }

  handleTimeChange(e) {
    const newTime = this.audioElement.duration * e.target.value;
    this.audioElement.currentTime = newTime;
    this.setState({ currentTime: newTime });
  }

  handleVolumeChange(e) {
    const newVolume = e.target.value;
    this.audioElement.volume = newVolume;
    this.setState( { volume: newVolume })
  }

  formatTime(time) {
    if ( time >= 0 && time === number ) {
      const minutes = Math.floor( time / 60 );
      const seconds = Math.floor( time - minutes * 60 );
      return (minutes < 10 ? minutes : minutes) + ':' + (seconds < 10 ? '0' + seconds : seconds);
    } else {
      return '-:--';
    }
  }

  render() {
    return (
      <section className = 'album'>
        <section id = 'album-info'>
          <img id = 'album-cover-art' src = {this.state.album.albumCover} alt = {this.state.album.title} />
          <div className = 'album-details'>
            <h1 id = 'album-title'>{this.state.album.title}</h1>
            <h2 className = 'artist'>{this.state.album.artist}</h2>
            <div id = 'release-info'>{this.state.album.releaseInfo}</div>
          </div>
        </section>
        <table id = 'song-list'>
          <colgroup>
            <col id = 'song-number-column' />
            <col id = 'song-title-column' />
            <col id = 'song-duration-column' />
          </colgroup>
          <tbody>
            {
              this.state.album.songs.map( (song, index) =>
                <tr
                  className = 'song'
                  key = {index}
                  onClick = { () => this.handleSongClick(song) }
                  onMouseEnter = { () => this.mouseOn(index) }
                  onMouseLeave = { () => this.mouseOff() }
                >
                  <td>{this.handleHoverOnSong(song, index)}</td>
                  <td>{song.title}</td>
                  <td>{song.duration}</td>
                </tr>
              )
            }
          </tbody>
        </table>
        <PlayerBar
          isPlaying = {this.state.isPlaying}
          currentSong = {this.state.currentSong}
          currentTime = {this.state.currentTime}
          duration = {this.state.duration}
          formatTime = { (time) => this.formatTime(time) }
          handleSongClick = { () => this.handleSongClick( this.state.currentSong )}
          handlePrevClick = { () => this.handlePrevClick() }
          handleNextClick = { () => this.handleNextClick() }
          handleTimeChange = { (e) => this.handleTimeChange(e) }
          handleVolumeChange = { (e) => this.handleVolumeChange(e) }
        />
      </section>
    );
  }
}

export default Album;
