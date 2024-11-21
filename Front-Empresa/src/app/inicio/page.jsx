"use client"; // Indica que o componente é um Client Component

import NavBarLayout from "@/components/layout/NavBarLayout";
import { useEffect, useState } from "react";

// Função para pegar as consultas da API
async function getConsultas() {
  try {
    const response = await fetch("https://vital-umqy.onrender.com/v1/vital/consulta");
    if (!response.ok) throw new Error("Erro ao buscar dados");
    const data = await response.json();
    return data.consultas || [];
  } catch (error) {
    console.error("Erro ao buscar consultas:", error);
    return [];
  }
}

async function getVideos() {
  try {
    const response = await fetch("https://vital-back-geh2haera4f5hzfb.brazilsouth-01.azurewebsites.net//v1/vital/video");
    if (!response.ok) throw new Error("Erro ao buscar vídeos");
    const data = await response.json();
    return data.videos || [];
  } catch (error) {
    console.error("Erro ao buscar vídeos:", error);
    return [];
  }
}


// Função para criar um card com os dados da consulta
function criarCard(consulta) {
  const card = document.createElement('div');
  card.classList.add(
    'bg-zinc-200',
    'rounded-lg',
    'w-[500px]',
    'h-[250px]',
    'p-4'
  );

  const imgEspecialidade = consulta.especialidade && consulta.especialidade[0] 
  ? consulta.especialidade[0].imagem_url
  : "Especialidade não definida";

const especialidadeImg = document.createElement('img');
especialidadeImg.url = imgEspecialidade;
especialidadeImg.classList.add(
  'w-2'
);



  const especialidade = consulta.especialidade && consulta.especialidade[0] 
    ? consulta.especialidade[0].nome
    : "Especialidade não definida";

  const especialidadeElement = document.createElement('p');
  especialidadeElement.textContent = especialidade;
  especialidadeElement.classList.add(
    'text-blue-950',
    'text-xl',
    'font-bold',
    'font-sans',
    'ml-[20px]'
  );

  const imgMedico = consulta.medico && consulta.medico[0]
  ? consulta.medico[0].foto_medico
  :"Médico não encontrado";

  const medicoImg = document.createElement('img');
  medicoImg.url = imgMedico
  medicoImg.classList.add(
    'ml-10'
  )



  const medicoNome = consulta.medico && consulta.medico[0] 
    ? consulta.medico[0].nome
    : "Médico não definido";

  const nomeMedico = document.createElement('h2');
  nomeMedico.textContent = `Médico: ${medicoNome}`;
  nomeMedico.classList.add(
    'text-blue-950',
    'text-lg',
    'font-bold',
    'ml-[20px]'
  );

  const detalhes = document.createElement('p');
  detalhes.textContent = "Descrição: " + consulta.detalhes_consulta;
  detalhes.classList.add(
    'text-blue-950',
    'ml-[20px]'
  );

  const dias = document.createElement('p');
  const diasData = new Date(consulta.dias_consulta);
  dias.textContent = "Dia: " + diasData.toLocaleDateString();
  dias.classList.add(
    'text-blue-950',
    'ml-[20px]'
  );

  const horario = document.createElement('p');
  const hora = new Date(consulta.horas_consulta);
  horario.textContent = "Horário: " + hora.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  horario.classList.add(
    'text-blue-950',
    'ml-[20px]'
  );

  card.append(especialidadeImg, especialidadeElement, medicoImg, nomeMedico, detalhes, dias, horario);

  card.addEventListener('click', () => {
    window.location.href = '/consultas';
  });

  return card;
}

// Função para preencher o container com os cards
async function preencherContainer(searchTerm, setConsultas, setLoading) {
  setLoading(true); // Inicia o carregamento
  const contanierConsulta = document.getElementById('contanierConsulta');
  contanierConsulta.innerHTML = ''; // Limpa o contêiner antes de renderizar novos resultados

  // Se não houver pesquisa, carrega todas as consultas
  const consultas = searchTerm ? await buscarConsultas(searchTerm) : await getConsultas();

  setConsultas(consultas); // Atualiza o estado de consultas

  if (Array.isArray(consultas)) {
    consultas.forEach(consulta => {
      const card = criarCard(consulta);
      contanierConsulta.appendChild(card);
    });
  } else {
    console.error("Erro: `consultas` não é um array.");
  }

  setLoading(false); // Finaliza o carregamento
}

// Função para buscar consultas com base no termo de pesquisa
async function buscarConsultas(term) {
  try {
    const response = await fetch(`https://vital-umqy.onrender.com/v1/vital/consulta?search=${term}`);
    if (!response.ok) throw new Error("Erro ao buscar dados");
    const data = await response.json();
    return data.consultas || [];
  } catch (error) {
    console.error("Erro ao buscar consultas:", error);
    return [];
  }
}


// Função para criar o card do React (sem manipulação direta do DOM)
function ConsultaCard({ consulta }) {
  const especialidadeImg = consulta.especialidade?.[0]?.imagem_url || "Imagem não encontrada";
  const especialidade = consulta.especialidade?.[0]?.nome || "Especialidade não definida";
  const medicoImg = consulta.medico?.[0]?.foto_medico || "Sem imagem";
  const medicoNome = consulta.medico?.[0]?.nome_medico || "Médico não definido";
  const descricao = consulta.detalhes_consulta || "Descrição não disponível";
  const dia = new Date(consulta.dias_consulta).toLocaleDateString();
  const horario = new Date(consulta.horas_consulta).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  return (
    <div
      className="bg-zinc-200 rounded-lg w-[280px] h-[400px] p-4"
      onClick={() => (window.location.href = "/consultas")}
    >
      <img src={especialidadeImg} className=""/>

      
      <p className="text-blue-950 text-xl font-bold font-sans justify-center items-center flex ">{especialidade}</p>
      <p className="text-blue-950 justify-center items-center flex ">{descricao}</p>
      
      <div className="flex mt-[20px]">
      <img src={medicoImg} className="rounded-full w-[50px] h-[50px] ml-[10px]" />
      <h2 className="text-blue-950 text-lg font-bold ml-[10px] fonts-sans mt-[10px]">{medicoNome}</h2>
      </div>

      <div className="flex mt-[10px]">
      <p className="text-blue-950 ml-[20px] font-bold">Dia:  {dia}</p>
      <p className="text-blue-950 ml-[20px] font-bold">Horário:  {horario}</p>
      </div>

    </div>
  );
}


export default function Inicio() {
  const [searchTerm, setSearchTerm] = useState('');
  const [consultas, setConsultas] = useState([]); // Estado para armazenar as consultas
  const [loading, setLoading] = useState(false); // Estado de carregamento

  // Preenche o container com os dados ao carregar o componente



  function criarCardVideo(video) {
    const card = document.createElement("div");
    card.classList.add(
      "bg-gray-100",
      "rounded-lg",
      "w-[300px]",
      "h-auto",
      "p-4",
      "shadow-md"
    );
  
    // Thumbnail ou ícone de vídeo
    const videoFrame = document.createElement("div");
    videoFrame.classList.add("w-full", "h-[180px]", "relative", "bg-black", "flex", "items-center", "justify-center");
  
    const playIcon = document.createElement("img");
    playIcon.src = "/img/play-icon.png"; // Substitua pelo ícone desejado
    playIcon.alt = "Play";
    playIcon.classList.add("w-[50px]", "h-[50px]", "cursor-pointer");
    videoFrame.appendChild(playIcon);
  
    // Redirecionar para a URL do vídeo ao clicar no ícone
    playIcon.addEventListener("click", () => {
      window.open(video.url_video, "_blank");
    });
  
    // Título do vídeo
    const titulo = document.createElement("h2");
    titulo.textContent = video.titulo_video;
    titulo.classList.add("text-blue-950", "text-lg", "font-bold", "mt-2");
  
    // Descrição do vídeo
    const descricao = document.createElement("p");
    descricao.textContent = video.descricao_video;
    descricao.classList.add("text-gray-700", "mt-1");
  
    // Monta o card
    card.append(videoFrame, titulo, descricao);
  
    return card;
  }
  

  async function preencherGaleria() {
    const galeriaContainer = document.querySelector(".Galeria");
    if (!galeriaContainer) return;
  
    // Adicione um título para a seção, se necessário
    const tituloGaleria = document.createElement("h2");
    tituloGaleria.textContent = "Galeria de Vídeos";
    tituloGaleria.classList.add("text-2xl", "font-bold", "text-[--font]", "ml-[80px]", "mt-[20px]");
    galeriaContainer.appendChild(tituloGaleria);
  
    // Buscar vídeos
    const videos = await getVideos();
  
    // Limpar a galeria antes de preencher
    galeriaContainer.innerHTML = "";
    galeriaContainer.appendChild(tituloGaleria);
  
    // Adicionar vídeos à galeria
    const videosContainer = document.createElement("div");
    videosContainer.classList.add("flex", "flex-wrap", "gap-4", "ml-[80px]", "mt-[20px]");
  
    videos.forEach((video) => {
      const videoCard = criarCardVideo(video);
      videosContainer.appendChild(videoCard);
    });
  
    galeriaContainer.appendChild(videosContainer);
  }

  useEffect(() => {
    if (consultas.length === 0 && !loading) {
      preencherConsultas();
      preencherGaleria();
    }
  }, [consultas, loading]);
  
  const preencherConsultas = async () => {
    setLoading(true);
    const dados = searchTerm ? await buscarConsultas(searchTerm) : await getConsultas();
    setConsultas(dados);
    setLoading(false);
  };

  const handleSearch = () => {
    setConsultas([]);
    preencherContainer(searchTerm, setConsultas, setLoading);
  };
  


  return (
    <div className="flex flex-col">
      <NavBarLayout>
        <div className="flex-1 p-4">
          <div className="relative flex items-center">
            <input
              type="text"
              placeholder="Pesquisar..."
              className="bg-[--navempresa] pl-3 pr-10 py-2 ml-[60vh] mt-[30px] rounded-full w-96 h-14 border focus:border-blue-900 focus:bg-blue-5 transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button onClick={handleSearch} className="absolute right-[70vh] top-[48px]">
              <img src="./img/lupa.png" alt="Buscar" className="w-7" />
            </button>
          </div>

          <div>
            <h1 className="text-2xl font-bold text-[--font] ml-[80px] mt-[30px]">CONSULTAS</h1>
          </div>

          <div className="flex mt-[30px] ml-[80px] grid overflow-x-scroll w-[1520px]">
            <div id="contanierConsulta" className=" flex space-x-4 gap-4 mb-[20px]">
              {consultas.map((consulta, index) => (
                <ConsultaCard key={index} consulta={consulta} />
              ))}
            </div>
          </div>

          <div>
            <h1 className="text-2xl font-bold text-[--font] ml-[80px] mt-[50px]">GALERIA</h1>
          </div>
        </div>
      </NavBarLayout>
    </div>
  );
}