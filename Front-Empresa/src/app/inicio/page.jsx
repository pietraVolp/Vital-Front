"use client";

import NavBarLayout from "@/components/layout/NavBarLayout";
import { useEffect, useState } from "react";

// Função para buscar todas as consultas
async function getConsultas() {
  try {
    const response = await fetch("https://vital-back-geh2haera4f5hzfb.brazilsouth-01.azurewebsites.net/v1/vital/consulta");
    if (!response.ok) throw new Error("Erro ao buscar dados");
    const data = await response.json();
    return data.consultas || [];
  } catch (error) {
    console.error("Erro ao buscar consultas:", error);
    return [];
  }
}

// Função para buscar consultas filtradas
async function buscarConsultas(term) {
  try {
    const response = await fetch(`https://vital-back-geh2haera4f5hzfb.brazilsouth-01.azurewebsites.net/v1/vital/consulta?search=${term}`);
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
  const especialidade = consulta.especialidade?.[0]?.nome || "Especialidade não definida";
  const medicoNome = consulta.medico_nome || "Médico não definido";
  const descricao = consulta.detalhes_consulta || "Descrição não disponível";
  const dia = new Date(consulta.dias_consulta).toLocaleDateString();
  const horario = new Date(consulta.horas_consulta).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  return (
    <div
      className="bg-zinc-200 rounded-lg w-[300px] h-[250px] p-4"
      onClick={() => (window.location.href = "/consultas")}
    >
      <p className="text-blue-950 text-xl font-bold font-sans ml-[20px]">{especialidade}</p>
      <h2 className="text-blue-950 text-lg font-bold ml-[20px]">Médico: {medicoNome}</h2>
      <p className="text-blue-950 ml-[20px]">Descrição: {descricao}</p>
      <p className="text-blue-950 ml-[20px]">Dia: {dia}</p>
      <p className="text-blue-950 ml-[20px]">Horário: {horario}</p>
    </div>
  );
}

export default function Inicio() {
  const [searchTerm, setSearchTerm] = useState("");
  const [consultas, setConsultas] = useState([]);
  const [loading, setLoading] = useState(false);

  // Busca inicial das consultas
  useEffect(() => {
    if (consultas.length === 0 && !loading) {
      preencherConsultas();
    }
  }, []);

  const preencherConsultas = async () => {
    setLoading(true);
    const dados = searchTerm ? await buscarConsultas(searchTerm) : await getConsultas();
    setConsultas(dados);
    setLoading(false);
  };

  const handleSearch = () => {
    preencherConsultas();
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
            <div id="contanierConsulta" className="flex space-x-4 gap-4 w-[1100px] h-[250px]">
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
