# 🎧 Spotify Mini Wrapped

Este repositorio ha sido creado con el objetivo de **mejorar y practicar mis habilidades en desarrollo Front End**, utilizando **React** como tecnología principal.

El proyecto consiste en un **mini Spotify Wrapped**, una aplicación web que muestra estadísticas y visualizaciones inspiradas en el resumen anual de Spotify, como artistas, canciones o hábitos de escucha.

---

## 🛠️ Tecnologías utilizadas

- React  
- JavaScript  
- CSS  
- Spotipy (API de Spotify)

---

## ⚙️ Funcionamiento del proyecto

La aplicación puede funcionar de dos maneras:

### 1. Modo demostración (datos locales)

Debido a que el servicio que consume la API de Spotify mediante **Spotipy** requiere un backend en funcionamiento (y su mantenimiento implica un coste), el repositorio incluye una carpeta con **datos de ejemplo locales**.

Este modo permite:
- Visualizar la interfaz completa
- Entender la estructura del proyecto
- Ver cómo se representan los datos en la página sin necesidad de autenticación

Es ideal para revisar el diseño y la lógica del frontend sin configurar servicios adicionales.

---

### 2. Modo completo (datos reales de Spotify)

Si se desea, el proyecto puede **desplegarse en local junto con el servicio backend**, permitiendo:

- Autenticarse con una cuenta de Spotify
- Consumir la API real mediante Spotipy
- Visualizar los datos personales reales del usuario

