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
  const titleRef = useRef(null);

  useEffect(() => {

    const isProd = process.env.NODE_ENV === "production";
    const isGhPages = window.location.hostname.includes('github.io');
    
    let url;
    
    if (isProd || isGhPages) {
      // En producción/GitHub Pages
      url = window.location.hostname+"/DataMusic/data/artists.json";
    } else {
      // En desarrollo local
      console.log(isProd+" "+process.env.NODE_ENV);
      console.log(window.location.hostname);
      console.log(`https://fran0004.github.io/DataMusic/data/artists.json`);
      url = "http://127.0.0.1:8000/top-artists";
    }

    axios.get(url)
      .then(res => setArtist(res.data))
      .catch(err => console.error(err));
  }, []);

useLayoutEffect(() => {
  if (artists.length === 0) return;

  const calculate = () => {
    const listaWidth = listaRef.current.scrollWidth;
    const contWidth = contRef.current.offsetWidth;
    const maxScroll = listaWidth - contWidth;
    return { listaWidth, contWidth, maxScroll };
  };

  // Esperar a que todas las imágenes carguen
  const imgs = listaRef.current.querySelectorAll("img");
  let imagesLoaded = 0;

  const checkAndInit = () => {
    if (imagesLoaded !== imgs.length) return;

    // Limpiar animaciones anteriores
    ScrollTrigger.getAll().forEach((st) => st.kill());
    gsap.killTweensOf(listaRef.current);

    // Recalcular tamaños REALES
    const { maxScroll, contWidth } = calculate();

    gsap.context(() => {
      gsap.to(listaRef.current, {
        x: -maxScroll,
        ease: "none",
        scrollTrigger: {
          trigger: contRef.current,
          start: "center center",
          end: () => `+=${maxScroll}`,
          scrub: 0.5,
          pin: true,
          markers: false,
          onEnter: () => {
            titleRef.current.style.opacity = 1;
            contRef.current.style.opacity = 1;
          },
          onEnterBack: () => {
            titleRef.current.style.opacity = 1;
            contRef.current.style.opacity = 1;
          },
          onLeaveBack: () => {
            titleRef.current.style.opacity = 0;
            contRef.current.style.opacity = 0;

          },
          onUpdate: (self) => {
            const scroll = self.progress * maxScroll;
            cardsRef.current.forEach((card) => {
              const cardCenter = card.offsetLeft + card.offsetWidth / 2;
              const contCenter = scroll + contWidth / 2;
              const distance = Math.abs(contCenter - cardCenter);
              const maxDistance = contWidth / 2;
              const scale = gsap.utils.clamp(
                0.2,
                1,
                1 - (distance / maxDistance) * 0.8
              );
              card.style.transform = `scale(${scale})`;
                // Imagen dentro de la card
              const imagen = card.querySelector("img");
              if (imagen) {
                // Cambia el box-shadow dinámicamente según la distancia (opcional)
                const shadowIntensity = (1 - distance / maxDistance) * 100; // opcional
                imagen.style.boxShadow = `0 0 ${shadowIntensity}px #d1bcdb94`;
  }


            });
          },
        },
      });
    });

    ScrollTrigger.refresh();
  };

  imgs.forEach((img) => {
    if (img.complete) {
      imagesLoaded++;
    } else {
      img.onload = () => {
        imagesLoaded++;
        checkAndInit();
      };
    }
  });

  // Si todas estaban cargadas desde el principio
  checkAndInit();

  // RE-CALCULAR AL RESIZE
  const handleResize = () => {
    checkAndInit();
  };
  window.addEventListener("resize", handleResize);

  return () => {
    window.removeEventListener("resize", handleResize);
    ScrollTrigger.getAll().forEach((st) => st.kill());
  };
}, [artists]);

  return (
    <section>
    <h1 id='title'  ref={titleRef} >🎧 Tus Top Artists</h1>
    <div id='TopArtist'>
      <div id='contArtists' ref={contRef}>
        <div className='lista' ref={listaRef} >
          <div className="emptyItemList a"  ref={el => (cardsRef.current[0] = el)}></div>
          {artists.map((a, i) => (
            <div key={i} className="artist-card a" ref={el => (cardsRef.current[i+1] = el)}>
              <img src={a.images.url} alt={a.name} />
              <h2>{a.name}</h2>
              <h3>{a.genres.join(", ")}</h3>
            </div>
          ))}
          <div className="emptyItemList  a"  ref={el => (cardsRef.current[artists.length + 1] = el)}></div>
        </div>
      </div>
    </div>
    </section>
  );
}

export default TopArtists;
