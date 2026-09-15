const irParaPokemonPesquisa = () => {
  window.location.href = "/pages/pokemonPesquisa.html";
};
async function ConsumirApi(nomePokemon) {
  const entradaNome = document.getElementById("nome");
  const botao = document.getElementById("botao-pesquisar");
  nomePokemon = entradaNome.value.trim();
  try {
    botao.disabled = true;
    const resposta = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${nomePokemon}`,
    );
    if (!resposta.ok) {
      throw new Error("Pokemon não encontrado!");
    }
    if (resposta.ok) {
      botao.disabled = false;
      const dados = await resposta.json();
      const id = document.getElementById("pokemon-id");
      id.value = dados.id || "";
      const altura = document.getElementById("pokemon-height");
      altura.value = dados.height || "";
    }
  } catch (error) {
    console.error("Erro ao consumir a API:", error);
  }
}
