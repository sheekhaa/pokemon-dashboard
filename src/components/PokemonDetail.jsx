//not included
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function PokemonDetail() {
  const { id } = useParams();
  console.log(id);
  const [pokemon, setPokemon] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
      const data = await res.json();
      setPokemon(data);
      console.log("ddddddddddddd", data);

      const speciesRes = await fetch(
        `https://pokeapi.co/api/v2/pokemon-species/${id}`
      );
      const speciesData = await speciesRes.json();
      console.log(speciesData);
      const speciesEn = speciesData.flavor_text_entries.find(
        (entry) => entry.language.name === "en"
      );

      setDescription(
        speciesEn
          ? speciesEn.flavor_text.replace(/\f/, " ")
          : "No description available"
      );
    };

    fetchData();
  }, [id]);

  if (!pokemon) return <p>loading.............</p>;
  return (
    <>
      <div>
        <p>{pokemon.id}</p>
        <p>{pokemon.name}</p>
        <p>{description}</p>
        <p>{pokemon.types.map((i) => i.type.name)}</p>
        <ul>
          {pokemon.moves.slice(0, 10).map((i) => (
            <li key={i.move.name}>{i.move.name}</li>
          ))}
        </ul>
      </div>
    </>
  );
}
export default PokemonDetail;
