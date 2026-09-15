const irParaPokemonPesquisa = () => {
  window.location.href = "/pages/pokemonPesquisa.html";
};
const ConsumirApi = async (name) => {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    const data = await response.json();
    const input = document.getElementById("pokemon-id");
    input.value = data.id;
    return data;
  } catch (error) {
    console.error("Erro ao consumir a API:", error);
  }
};
