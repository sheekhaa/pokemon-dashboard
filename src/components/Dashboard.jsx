import { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import placeImg from "./place.jpg";
import myGif from "./pika_runpokeball.gif";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [fetchApi, setFetchApi] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPokemon = async () => {
      //fetch list
      const res = await fetch(
        "https://pokeapi.co/api/v2/pokemon?offset=151&limit=151"
      );
      const data = await res.json();

      //fetch image from pokemon url
      const pokemonWithImages = await Promise.all(
        data.results.map(async (pokemon) => {
          const res = await fetch(pokemon.url);
          const details = await res.json();
          console.log("details for", pokemon.name, details);

          return {
            id: details.id,
            name: details.name,
            image: details.sprites.front_default,
          };
        })
      );
      console.log("fetch pokemon images", pokemonWithImages);
      setFetchApi(pokemonWithImages);
    };
    fetchPokemon();
  }, []);

  const filteredPokemon = fetchApi.filter((poke) => {
    const searchLower = search.toLocaleLowerCase();
    return (
      poke.name.toLocaleLowerCase().includes(searchLower) ||
      poke.id.toString().includes(searchLower)
    );
  });

  return (
    <>
      <div className="nav">
        <p>Home</p>
        <div className="search-container">
          <input
            type="text"
            placeholder="search"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <CiSearch
            className="search-icon"
            onClick={() => setSearch(inputValue)}
          />
        </div>
      </div>
      <div className="pokemon-items">
        {filteredPokemon.map((pokemon, index) => (
          <div
            className="pokemon-cards"
            key={index}
            onClick={() => navigate(`/pokemon/${pokemon.id}`)}
          >
            <div
              className="pokemon-image-bg"
              style={{
                backgroundImage: `url(${placeImg})`,
              }}
            >
              <img src={pokemon.image} alt={pokemon.name} />
            </div>
            <p className="pokemon-name" key={index}>
              {pokemon.name}{" "}
            </p>
            <div className="line"></div>
            <div className="gif">
              <img className="pokeball" src={myGif} alt="pokeBall" />
              <p className="pokemon-id">{pokemon.id}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
export default Dashboard;
