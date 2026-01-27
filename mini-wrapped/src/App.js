import Title from './Title/Title';
import TopArtists from './TopArtists/TopArtists';
import TopTracks from './TopTracks/TopTracks';
import Background from './Background/Background';

function App() {
  return (
    <div>
      <Background />
      <Title />
      <TopTracks />
      <TopArtists />
    </div>
  );
}

export default App;