import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
function PokemonDetails() {
  const { id: pokemonId } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [description, setDescription] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
      const data = await res.json();
      setPokemon(data);
      console.log(data);

      const speciesRes = await fetch(
        `https://pokeapi.co/api/v2/pokemon-species/${pokemonId}`
      );
      const speciesData = await speciesRes.json();
      const enFlavor = speciesData.flavor_text_entries[0].flavor_text;
      setDescription(enFlavor);
    };
    fetchData();
  }, [pokemonId]);

  if (!pokemon) return <p>loading........</p>;

  return (
    <>
      <div className="details-page">
        <div className="details-container">
          <img src={pokemon.sprites.front_default} alt={pokemon.name} />
          <p className="name">{pokemon.name}</p>
          <div className="line"></div>
          <p> {pokemon.id} </p>

          <div className="row">
            <p>
              <span>Height:</span>
              {pokemon.height}
            </p>
            <span className="divider"></span>
            <p>
              <span>Weight:</span> {pokemon.weight}
            </p>
            <span className="divider"></span>
            <p>
              <span>Base Experience:</span> {pokemon.base_experience}
            </p>
          </div>
          <div className="description-section">
            <p className="description-label">Description:</p>
            <p className="description-text">{description}</p>
          </div>
          <p className="pokemon-details">
            <span>Moves:</span>
          </p>
          <ul>
            {pokemon.moves.slice(0, 10).map((m) => (
              <li key={m.move.name}>{m.move.name}</li>
            ))}
          </ul>
          <p className="pokemon-details">
            <span>Types:</span>
          </p>
          <ul>
            {pokemon.types.map((i) => (
              <li key={i.type.name}>{i.type.name}</li>
            ))}
          </ul>
          <p className="pokemon-details">
            <span>Version:</span>
          </p>
          <ul>
            {pokemon.game_indices.map((i) => (
              <li key={i.version.name}>{i.version.name}</li>
            ))}
          </ul>
          <p className="pokemon-details">
            <span>Abilities:</span>
          </p>
          <ul>
            {pokemon.abilities.map((i) => (
              <li key={i.ability.name}>{i.ability.name}</li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
export default PokemonDetails;
