import './TopTracks.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
function TopTracks() {
  const [tracks, setTracks] = useState([]);

  useEffect(() => {
      const isProd = process.env.NODE_ENV === "production";
    const isGhPages = window.location.hostname.includes('github.io');
    
    let url;
    
    if (isProd || isGhPages) {
      // En producción/GitHub Pages
      url = "https://fran0004.github.io/DataMusic/data/tracks.json";
    } else {
      // En desarrollo local
      console.log(`https://fran0004.github.io/DataMusic/data/tracks.json`);
      url = "http://127.0.0.1:8000/top-tracks";
    }

    axios.get("https://fran0004.github.io/DataMusic/data/tracks.json")
      .then(res => setTracks(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
     <section>
      <h2>🎧 Tus Top Tracks</h2>
      <div id='TopTrack'>
        <div className='divtrack'>
          {tracks.map((t, i) => (
            <div className='capsuleTrack'>
              <div className='track' key={i}>
                <div className='divNum'>
                  <p
                    className={`numTrack ${i + 1 === 10 ? "num10Track" : ""}`}
                  >
                    {i + 1}
                  </p>
                </div>
                <div className='divTextTrack'>
                  <h2>{t.name}</h2>
                  <div id='details'><p>{t.artists}</p><p>{t.album.name}</p></div>
                </div>
                <div className='divImg'>
                  <img className='imgTrack' src={t.album.images[0].url} alt=''></img>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TopTracks;
