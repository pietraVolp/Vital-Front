"use client"; // Indica que o componente é um Client Component

import NavBarLayout from "@/components/layout/NavBarLayout";
import { useEffect, useState } from "react";
import { getConsultas } from "@/js/info";

function criarCard(consulta) {
  const card = document.createElement('div');
  card.classList.add(
    'bg-zinc-200',
    'rounded-lg',
    'w-[300px]',
    'h-[200px]'
  );

  const especialidade = document.createElement('p');
  especialidade.textContent = consulta.nome_especialidade;
  especialidade.classList.add(
    'text-blue-950',
    'text-xl',
    'font-bold',
    'font-sans',
    'ml-[20px]'
  );

  const nomeMedico = document.createElement('h2');
  nomeMedico.textContent = consulta.nome_medico;
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
  if (!isNaN(diasData)) {
    dias.textContent = "Dia: " + diasData.toLocaleDateString();
  } else {
    dias.textContent = "Dia: " + consulta.dias_consulta;
  }
  dias.classList.add(
    'text-blue-950',
    'ml-[20px]'
  );

  const horario = document.createElement('p');
  horario.textContent = "Horário: " + consulta.horas_consulta.slice(11,19);
  horario.classList.add(
    'text-blue-950',
    'ml-[20px]'
  );

  card.append(especialidade, nomeMedico, detalhes, dias, horario);
  card.addEventListener('click', () => {
    window.location.href = '/consultas';
  });

  return card;
}

async function preencherContainer(searchTerm) {
  const contanierConsulta = document.getElementById('contanierConsulta');
  contanierConsulta.innerHTML = ''; // Limpa o contêiner antes de renderizar novos resultados

  const consultas = searchTerm ? await buscarConsultas(searchTerm) : await getConsultas();

  // Verifica se `consultas` é um array antes de usar `forEach`
  if (Array.isArray(consultas)) {
    consultas.forEach(consulta => {
      const card = criarCard(consulta);
      contanierConsulta.appendChild(card);
    });
  } else {
    console.error("Erro: `consultas` não é um array.");
  }
}

async function buscarConsultas(term) {
  try {
    const response = await fetch(getConsultas());
    if (!response.ok) throw new Error("Erro ao buscar dados");
    return await response.json();
  } catch (error) {
    console.error("Erro ao buscar consultas:", error);
    return [];
  }
}

export default function Inicio() {
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    preencherContainer();
  }, []);

  const handleSearch = () => {
    preencherContainer(searchTerm);
  };

  return (
    <div className="flex flex-col">
      <NavBarLayout>
        <div className="flex-1 p-4">
          <div className="relative flex items-center">
            <input
              type="text"
              placeholder="Pesquisar..."
              className="bg-[--navempresa] pl-3 pr-10 py-2 ml-[60vh] mt-[50px] rounded-full w-96 h-14 border focus:border-blue-900 focus:bg-blue-5 transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button onClick={handleSearch} className="absolute right-[70vh] top-[58px]">
              <img src="./img/lupa.png" alt="Buscar" className="w-7" />
            </button>
          </div>

          <div>
            <h1 className="text-2xl font-bold text-[--font] ml-[80px] mt-[50px]">CONSULTAS</h1>
          </div>

          <div className="flex mt-10 ml-[80px] grid overflow-x-scroll">
            <div id="contanierConsulta" className="flex space-x-4 gap-4 w-[1100px] h-[230px]"></div>
          </div>

          <div>
            <h1 className="text-2xl font-bold text-[--font] ml-[80px] mt-[50px]">GALERIA</h1>
          </div>
        </div>
      </NavBarLayout>
    </div>
  );
}
