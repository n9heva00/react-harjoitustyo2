import './App.css';
import { useState } from 'react';

const URL = 'https://api.spotify.com/v1/search?q=';
const token = '';

function App() {
  const [search, setSearch] = useState('');

  const [name, setName] = useState('');
  const [followers, setFollowers] = useState('');
  const [genres, setGenres] = useState('');
  const [image, setImage] = useState('');
  const [popularity, setPopularity] = useState('');

  async function HandleSubmit(e) {
    e.preventDefault();

    try {
      const address = URL + search + '&type=artist&market=US&limit=50';
      const response = await fetch(address, {
        headers: {
          'Authorization': 'Bearer ' + token
        }
      });

      if (response.ok) {
        const json = await response.json();
        console.log(json);

        let i = 0;
        let result = json.artists.items[i];
        const total = json.artists.items.length;

        if (total === 0) {
          setName("Artist not found!");
          setImage('');
          setFollowers('');
          setGenres('');
          setPopularity('');
        } else {
          while ((String(result.name).length != search.length) && i < (total - 1)) {
            i++;
            result = json.artists.items[i];
          }
          if (i === (total - 1)) {
            result = json.artists.items[0];
            console.log(json.artists.items[0]);
          }
          setName(result.name);
          setImage(result.images[2].url);
          setFollowers(result.followers.total);
          setGenres(result.genres.map(genre => (
            genre + ' | '
          )));
          setPopularity(result.popularity);
        }
      } else {
        alert("Error searching artist.");
        console.log(response);
      }
    } catch (err) {
      alert(err);
    }
  }

  return (
    <div style={{ margin: 50 }}>
      <form onSubmit={HandleSubmit}>
        <div>
          <h4>Search artist info from Spotify</h4>
          <div>
            <label>Name:</label>
            <input style={{ marginLeft: 5 }} type="text" onChange={e => setSearch(e.target.value)} />
          </div>
          <button style={{ marginTop: 20 }} >Search</button>
        </div>
        <div>
          <h4>{name}</h4>
          <img src={image} alt=""></img>
          <p>Followers on Spotify: {followers.toLocaleString()}</p>
          <p>Artists genres: | {genres}</p>
          <p>Popularity:</p>
          <progress value={popularity} max="100"></progress>
        </div>
      </form>
    </div>
  );
}

export default App;
