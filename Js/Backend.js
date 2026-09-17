const irParaPokemonPesquisa = () => {
  window.location.href = "/pages/pokemonPesquisa.html";
};

async function ConsumirApi() {
  const entradaNome = document.getElementById("nome");
  const botao = document.getElementById("botao-pesquisar");
  const loading = document.getElementById("loading");

  // Transformando em minúsculo, pois a PokéAPI não aceita letras maiúsculas
  const nomePokemon = entradaNome.value.trim().toLowerCase();

  if (!nomePokemon) {
    return alert("Por favor Insira o nome de um Pokémon primeiro para pesquisar")
  };

  try {
    botao.disabled = true;

    // Configuração do Loading
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
      { duration: 800, iterations: Infinity, easing: "linear" }
    );

    const resposta = await fetch(`https://pokeapi.co/api/v2/pokemon/${nomePokemon}`);

    if (!resposta.ok) {
      throw new Error("Pokémon não encontrado!");
    }

    const dados = await resposta.json();
    entradaNome.value = "";

    // Preenchendo dados básicos
    document.getElementById("pokemon-id").value = dados.id || "";
    document.getElementById("pokemon-name").value = dados.name || "";
    document.getElementById("pokemon-height").value = dados.height || "";
    document.getElementById("pokemon-weight").value = dados.weight || "";
    document.getElementById("pokemon-Life").value = dados.stats[0].base_stat || "";
    document.getElementById("pokemon-Attack").value = dados.stats[1].base_stat || "";

    // Habilidades com verificação de segurança 
    const Hab1 = document.getElementById("pokemon-abilities1");
    Hab1.value = dados.abilities[0]?.ability?.name || "N/A";

    const Hab2 = document.getElementById("pokemon-abilities2");
    Hab2.value = dados.abilities[1]?.ability?.name || "N/A";

    // --- IMAGEM DEFAULT ---
    const containerDefault = document.getElementById("imagem-pokemon-default");

    // Remove APENAS a imagem anterior, mantendo os textos que já estão no HTML intactos
    containerDefault.querySelector("img")?.remove();
    const imagemDefault = document.createElement("img");
    imagemDefault.src = dados.sprites.other.home.front_default || dados.sprites.front_default;
    Object.assign(imagemDefault.style, {
      display: "flex",
      margin: "50px auto 0 auto",
      width: "auto",
      height: "150px"
    });
    containerDefault.appendChild(imagemDefault);

    //  IMAGEM FÊMEA 
    const containerFemea = document.getElementById("imagem-pokemon");
    containerFemea.querySelector("img")?.remove();
    containerFemea.querySelector("#aviso-sem-femea")?.remove();

    // Checa se o Pokémon tem a versão fêmea
    if (dados.sprites.front_female) {
      const imagemFemea = document.createElement("img");
      imagemFemea.src = dados.sprites.front_female;
      Object.assign(imagemFemea.style, {
        display: "flex",
        margin: "50px auto 0 auto",
        width: "auto",
        height: "150px"
      });
      containerFemea.appendChild(imagemFemea);
    } else {
      // Se não tiver, cria um quadrado com o aviso
      const avisoSemFemea = document.createElement("div");
      avisoSemFemea.id = "aviso-sem-femea";
      avisoSemFemea.innerText = "Este Pokémon não tem a versão fêmea.";

      // Estilização do quadrado de aviso
      Object.assign(avisoSemFemea.style, {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        margin: "10px auto 0 auto",
        width: "150px",
        height: "150px",
        backgroundColor: "#ff0000",
        border: "2px solid #ccc",
        borderRadius: "8px",
        color: "#ffffff",
        padding: "10px",
        fontFamily: "Arial, sans-serif",
        fontSize: "14px"
      });

      containerFemea.appendChild(avisoSemFemea);
    }

  } catch (error) {
    console.error("Erro ao consumir a API:", error);
    alert("Pokémon não encontrado! Tente novamente."); // Feedback visual pro usuário
  } finally {
    // Esconde o loading e reabilita o botão independente de erro ou sucesso
    loading.style.display = "none";
    botao.disabled = false;
  }
}