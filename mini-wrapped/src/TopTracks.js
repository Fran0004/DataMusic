import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
function TopTracks() {
  const [tracks, setTracks] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/top-tracks')
      .then(res => setTracks(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
     <div>
      <h2>🎧 Tus Top Tracks</h2>
      <ul>
        {tracks.map((t, i) => (
          <li key={i}>{t.name} - {t.artist}- {t.album.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default TopTracks;
