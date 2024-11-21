"use client";

import { useEffect, useState } from "react";
import NavBarLayout from "@/components/layout/NavBarLayout";
import Modal from "@/components/MedicoModal";

export async function getMedico(){
    const url = `https://vital-back-geh2haera4f5hzfb.brazilsouth-01.azurewebsites.net/v1/vital/medico`
    const response = await fetch(url)
    const data = await response.json()
    return data.medicos
}

function MedicoCard({ medico }) {
    const especialidadeImg = medico.especialidade?.[0]?.imagem_url || "Imagem não encontrada";
    const especialidade = medico.especialidade?.[0]?.nome || "Especialidade não definida";
    const medicoImg = medico.medico?.[0]?.foto_medico || "Sem imagem";
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
  

  export default function Medicos() {
    const [openModal, setOpenModal] = useState(false);
    const [medicos, setMedicos] = useState([]);

    useEffect(() => {
        async function carregarMedicos() {
            try {
                const dados = await getMedico();
                if (Array.isArray(dados)) {
                    setMedicos(dados);
                } else {
                    console.error('getMedico não retornou um array:', dados);
                }
            } catch (error) {
                console.error('Erro ao carregar médicos:', error);
            }
        }

        carregarMedicos();
    }, []);

    return (
        <div className="flex flex-col">
            <NavBarLayout>
                <div className="flex-1 p-4">
                    <div className="flex">
                    <h1 className="text-4xl font-bold text-[--font] p-10">DOUTORES CADASTRADOS</h1>
                    

                <div className="relative ml-[-250px]">
                <input
                    type="text"
                    placeholder="Pesquisar..."
                    className="bg-[--navempresa] ml-[500px] pl-3 pr-10 py-2 mt-[40px] rounded-full w-96 h-14 border focus:border-blue-900 focus:bg-blue-5 transition-all"
                />
                <button>
                    <img
                    src="./img/lupa.png"
                    alt=""
                    className="absolute ml-[-50px] mt-[-19px] w-7"
                    />
                </button>
                </div>
                </div>

                    <button
                        onClick={() => setOpenModal(true)}
                        className="bg-[--font] w-[25vh] h-[5vh] rounded-full ml-[140vh] mt-[10px]"
                    >
                        <h1 className="text-white font-bold">CADASTRAR DOUTORES +</h1>
                    </button>

                    <Modal isOpen={openModal} setModalOpen={() => setOpenModal(!openModal)} />

                    <div className="mt-20 ml-[300px] grid">
                        <div id="contanierMedico" className="gap-4 w-[1100px] h-[1700px]"></div>
                        {medicos.map((medico, index) => (
                <MedicoCard key={index} medico={medico} />
              ))}
                    </div>

                </div>
            </NavBarLayout>
        </div>
    );
}
