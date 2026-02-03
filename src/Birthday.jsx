import { useState, useEffect, useRef } from 'react';
import './Birthday.css';

export default function Birthday() {
  const [name, setName] = useState('');
  const [showBirthday, setShowBirthday] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [slideOut, setSlideOut] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [clickedPhotos, setClickedPhotos] = useState([]);
  const audioRef = useRef(null);
  const shutterRef = useRef(null);

  // Photo data with updated heartfelt messages
  const photos = [
    { img: 'BG.jpg', message: `Hiii ${name}!!🌟` },
    { img: 'BG2.jpg', message: "I know that you have been looking forward to today for a while now (hopefully I guess)..." },
    { img: 'BG3.jpg', message: "I wanted to make sure that this day really feels special for you.." },
    { img: 'BG4.jpg', message: "for as the years go by, people tend to feel less excited on their birthday and treat it as an ordinary day.." },
    { img: 'BG5.jpg', message: "I hope your day is as beautiful as the energy you bring everywhere.." },
    { img: 'BG6.jpg', message: "Wish the best for you in everything always" },
    { img: 'BG7.jpg', message: "Will always have your back just in case you have no one to lean on" },
    { img: 'BG8.jpg', message: "Take care and stay safe always <3" },
    { img: 'BG9.jpg', message: "I clearly had way too much time on my hands today, but you're worth the effort! HBD! 🎂" }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      setSlideOut(true);
      
      setTimeout(() => {
        setIsTransitioning(true);
        setShowBirthday(true);
        setShowConfetti(true);
        
        setTimeout(() => {
          setIsTransitioning(false);
          setSlideOut(false);
        }, 800);
        
        setTimeout(() => {
          setShowConfetti(false);
        }, 4800);
      }, 600);
    }
  };

  useEffect(() => {
    if (showBirthday && audioRef.current) {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(err => {
        console.log('Autoplay prevented:', err);
      });
    }
  }, [showBirthday]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const openPhoto = (photo, index) => {
    // Play shutter sound
    if (shutterRef.current) {
      shutterRef.current.currentTime = 0; // Reset to start
      shutterRef.current.play().catch(err => {
        console.log('Shutter sound failed:', err);
      });
    }
    
    setSelectedPhoto(photo);
    // Mark photo as clicked
    if (!clickedPhotos.includes(index)) {
      setClickedPhotos([...clickedPhotos, index]);
    }
  };

  const closePhoto = () => {
    setSelectedPhoto(null);
  };

  // Get the index of the next unclicked photo
  const getNextUnclickedIndex = () => {
    for (let i = 0; i < photos.length; i++) {
      if (!clickedPhotos.includes(i)) {
        return i;
      }
    }
    return -1; // All photos clicked
  };

  const nextUnclickedIndex = getNextUnclickedIndex();

  if (showBirthday) {
    return (
      <div className="birthday-wrapper">
        <div className="background-layer bg1"></div>
        <div className="background-layer bg2 active"></div>
        <div className="blur-overlay"></div>
        <div className="gradient-overlay"></div>
        
        <audio ref={audioRef} src="/HBD.mp3" loop />
        <audio ref={shutterRef} src="/SHUTTER.mp3" />
        
        <div className="music-player">
          <div className="music-info">
            <div className="music-icon">🎵</div>
            <div className="music-details">
              <div className="song-title">Happy Birthday</div>
              <div className="artist-name">Birthday Celebration</div>
            </div>
          </div>
          <button className="play-button" onClick={togglePlay}>
            {isPlaying ? '⏸' : '▶'}
          </button>
        </div>

        {showConfetti && (
          <div className="confetti-container">
            {[...Array(50)].map((_, i) => (
              <div key={i} className="confetti" style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 0.5}s`,
                backgroundColor: ['#ff6b9d', '#4facfe', '#ffd700', '#ff6347', '#7b68ee'][Math.floor(Math.random() * 5)]
              }}></div>
            ))}
          </div>
        )}

        {!isTransitioning && (
          <div className="birthday-card smaller" key="birthday-card">
            <h1 className="birthday-text">Happy Birthday</h1>
            <p className="birthday-name">{name}!</p>
          </div>
        )}

        <div className="photo-gallery">
          <div className="photo-track">
            {[...Array(4)].map((_, setIndex) => (
              <div key={setIndex} className="photo-set">
                {photos.map((photo, i) => (
                  <div 
                    key={`${setIndex}-${i}`} 
                    className="photo-item"
                    onClick={() => openPhoto(photo, i)}
                  >
                    <img src={`/${photo.img}`} alt={`Memory ${i + 1}`} />
                    {/* Show hint only on first set and only for next unclicked photo */}
                    {setIndex === 0 && i === nextUnclickedIndex && (
                      <div className="click-hint">
                        <span>Click me!</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {selectedPhoto && (
          <div className="photo-modal" onClick={closePhoto}>
            <div className="photo-modal-content" onClick={(e) => e.stopPropagation()}>
              <button className="close-button" onClick={closePhoto}>×</button>
              <img src={`/${selectedPhoto.img}`} alt="Memory" className="modal-image" />
              <div className="photo-message">{selectedPhoto.message}</div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="birthday-wrapper">
      <div className="background-layer bg1 active"></div>
      <div className="background-layer bg2"></div>
      <div className="blur-overlay"></div>
      <div className="gradient-overlay"></div>
      <div className={`birthday-card ${slideOut ? 'slide-out' : ''}`} key="name-card">
        <h2 className="input-title">Enter name for verification</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="name-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            autoFocus
          />
          <button type="submit" className="submit-button">
            Enter
          </button>
        </form>
      </div>
    </div>
  );
}