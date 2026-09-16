const irParaPokemonPesquisa = () => {
  window.location.href = "/pages/pokemonPesquisa.html";
};
async function ConsumirApi(nomePokemon) {
  const entradaNome = document.getElementById("nome");
  const botao = document.getElementById("botao-pesquisar");
  nomePokemon = entradaNome.value.trim();
  try {
    botao.disabled = true;
    const loading = document.getElementById("loading");
    Object.assign(loading.style, {
      display: "flex",
      margin: "0 auto",
      width: "30px",
      height: "30px",
      border: "4px solid #ffffff40",
      borderTop: "4px solid white",
      borderRadius: "50%",
    });

    loading.animate(
      [{ transform: "rotate(0deg)" }, { transform: "rotate(360deg)" }],
      {
        duration: 800,
        iterations: Infinity,
        easing: "linear",
      },
    );
    const resposta = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${nomePokemon}`,
    );
    if (!resposta.ok) {
      throw new Error("Pokemon não encontrado!");
    }
    if (resposta.ok) {
      entradaNome.value = "";
      loading.style.display = "none";
      botao.disabled = false;
      const dados = await resposta.json();
      //exibir os dados do Pokémon na página
      const id = document.getElementById("pokemon-id");
      id.value = dados.id || "";
      const altura = document.getElementById("pokemon-height");
      altura.value = dados.height || "";
      const weigth = document.getElementById("pokemon-weight");
      weigth.value = dados.weight || "";
      const imagem = document.createElement("img");
      imagem.src = dados.sprites.other.home.front_shiny;
      imagem.style.display = "flex";
      imagem.style.margin = "0 auto";
      imagem.style.width = "250x";
      imagem.style.height = "150px";
      imagem.style.marginTop = "10px";
      const container = document.getElementById("imagem-pokemon");
      container.querySelector("img")?.remove();
      //coloca a imagem dentro do container
      container.appendChild(imagem);
    }
  } catch (error) {
    console.error("Erro ao consumir a API:", error);
  }
}
