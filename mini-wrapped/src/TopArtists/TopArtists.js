import React, { useState, useEffect, useLayoutEffect , useRef } from 'react';
import './TopArtists.css';
import axios from 'axios';
import gsap from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function TopArtists() {
  const [artists, setArtist] = useState([]);
  const contRef = useRef(null);
  const listaRef = useRef(null);
   const cardsRef = useRef([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/top-artists')
      .then(res => setArtist(res.data))
      .catch(err => console.error(err));
  }, []);

  useLayoutEffect(() => {
    if (artists.length === 0) return; // Evita correr antes de tiempo
    const listaWidth = listaRef.current.scrollWidth;
    const contWidth = contRef.current.offsetWidth;
    const maxScroll = listaWidth - contWidth;

    let ctx = gsap.context(() => {

      gsap.to(listaRef.current, {
      x: -maxScroll,             // mueve la lista a la izquierda hasta el final
      ease: "none",
      scrollTrigger: {
        trigger: contRef.current,
        start: "center center",
        end: () => `+=${maxScroll}`, // duracion proporcional al contenido
        scrub: 0.5,
        pin: true,
        onUpdate: self => {
          const scroll = self.progress * maxScroll;
          cardsRef.current.forEach(card => {
            const cardCenter = card.offsetLeft + card.offsetWidth / 2;
            const contCenter = scroll + contWidth / 2;
            const distance = Math.abs(contCenter - cardCenter);
            const maxDistance = contWidth / 2;
            const scale = gsap.utils.clamp(0.2, 1, 1 - distance / maxDistance * 0.8);
            card.style.transform = `scale(${scale})`;
          });
        },   
        markers: true
      }
    });
    
      ScrollTrigger.refresh();
    });

    return () => ctx.revert(); // Limpia en desmontaje
  }, [artists]); // <-- Se ejecuta cuando ya hay imágenes en el DOM

  return (
    <div id='TopArtist'>
      <div id='contArtists' ref={contRef}>
        <div className='lista' ref={listaRef} >
          <div className="emptyItemList a"  ref={el => (cardsRef.current[0] = el)}></div>
          {artists.map((a, i) => (
            <div key={i} className="artist-card a" ref={el => (cardsRef.current[i+1] = el)}>
              <img src={a.images.url} alt={a.name} />
              <h2>{a.name}</h2>
              {/* <h3>{a.genres.join(", ")}</h3> */}
            </div>
          ))}
          <div className="emptyItemList  a"  ref={el => (cardsRef.current[artists.length + 1] = el)}></div>
        </div>
      </div>
    </div>
  );
}

export default TopArtists;
