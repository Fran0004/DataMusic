from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import spotipy
from spotipy.oauth2 import SpotifyOAuth

app = FastAPI()

# Permitir que React (localhost:3000) haga requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ======= CONFIGURACIÓN =======
CLIENT_ID = "1fae7af2baa74bb39d98252806c62193"
CLIENT_SECRET = "09c4156841574bc588965f71a10c9e52"
REDIRECT_URI = "http://127.0.0.1:8888/callback"


sp = spotipy.Spotify(auth_manager=SpotifyOAuth(
    client_id=CLIENT_ID,
    client_secret=CLIENT_SECRET,
    redirect_uri=REDIRECT_URI,
    scope="user-top-read"
))

@app.get("/top-tracks")
def get_top_tracks():
    top_tracks = sp.current_user_top_tracks(limit=10)['items']
    # Solo enviar datos necesarios
    result = [{"name": t['name'], "artists": t['artists'][0]['name'],"album": t['album'],"external_urls": t['external_urls']['spotify'], "id": t['id']} for t in top_tracks]
    return result

@app.get("/top-artists")
def get_top_artists():
    top_artist = sp.current_user_top_artists(limit=10)['items']
    # Solo enviar datos necesarios
    result = [{"name": t['name'],"genres": t['genres'], "images": t['images'][0]} for t in top_artist]
    return result