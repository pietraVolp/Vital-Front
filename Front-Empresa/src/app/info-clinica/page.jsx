"use client";

import { useEffect, useState } from "react";
import NavBarLayout from "@/components/layout/NavBarLayout";

export async function getEmpresa (id) {
    const url = `https://vital-back-geh2haera4f5hzfb.brazilsouth-01.azurewebsites.net/v1/vital/empresa/${id}`
    const response = await fetch(url)
    const data = await response.json()
    return data.empresa[0]
 }

 function EmpresaCard({ empresa }) {
   
    const medicoImg = medico.foto_medico|| "Sem imagem";
    const medicoNome = medico.nome_medico|| "Médico não definido";
    const especialidade = medico.especialidade || "Especialidade não definida";
    
    return (
      <div
      className="bg-zinc-200 rounded-lg w-[1200px] h-[70px] p-4 " 
      onClick={() => (window.location.href = "/consultas")}
    >
        
     <img src={medicoImg} className="rounded-full w-[50px] h-[50px] ml-[20px] mt-[-5px] " />

      <div className="flex justify-center items-center mt-[-40px] ">
      <h2 className="text-blue-950 text-2xl font-bold  fonts-sans ml-[50px] ">{medicoNome}</h2>

      <div className="flex justify-center items-center ">
      <p className="flex justify-center items-center text-blue-950 text-lg font-sans ml-[350px] ">{especialidade}</p>
      </div>

      <button className="text-blue-950 text-2xl ml-[400px]" onClick={() => (window.location.href = "/infoMedico")}>+</button>
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
  }




export default function Inicio() {
    return (


        <div className="flex">
            <NavBarLayout>
            
                <div className="flex-1 p-4">
                    {/* <h1>Estou na Home</h1> */}
                    <h1 className="text-4xl font-bold text-[--font] p-10">EMPRESA</h1>

          
                  
            <div className="bg-blue-300 w-4/6 h-auto items-center rounded-lg">
                <div className="ml-36 mt-10">
                    <h2 className="font-bold font-sans text-3xl text-blue-900 mt-5">Informações sobre empresa</h2>
                </div>

                <div className="flex ml-[9vh] mt-[6vh]">
                    <img src="/Front/img/hospital-svgrepo-com 1.png" alt="" className="w-20" />
                    <h1 className="text-xl text-gray-400 mt-7 ml-14">Nome da Clinica</h1>
                    <img src="/Front/img/Vector.png" alt="" className="h-5 mt-7 ml-36" />
                </div>

                <div className="flex ml-[11vh] mt-5">
                    <img src="/Front/img/heroicons_identification.png" alt="" className="w-14" />
                    <h1 className="text-xl text-gray-400 mt-3 ml-14">9876543</h1>
                    <img src="/Front/img/Vector.png" alt="" className="h-5 mt-4 ml-36" />
                </div>

                <div className="flex ml-[11vh] mt-5">
                    <img src="/Front/img/map-tag-svgrepo-com 1.png" alt="" className="h-9" />
                    <h1 className="text-xl text-gray-400 mt-2 ml-16">Rua Alameda Araguaia</h1>
                    <img src="/Front/img/Vector.png" alt="" className="h-5 mt-5 ml-20" />
                </div>

                <div className="flex ml-[12vh] mt-5">
                    <img src="/Front/img/fone.png" alt="" className="h-7" />
                    <h1 className="text-xl text-gray-400 mt-2 ml-16">(11)986759687</h1>
                    <img src="/Front/img/Vector.png" alt="" className="h-5 mt-2 ml-36" />
                </div>

                <div className="h-40 w-96 bg-white mt-10 ml-36 rounded-lg">
                    <div className="bg-white w-5 h-5 rounded-lg"></div>
                    <div className="flex ml-5">
                        <img src="/Front/img/pessoa.icon.png" alt="" className="h-8" />
                        <h1 className="text-gray-400 text-base mt-1 ml-7">Responsável pela clinica</h1>
                        <img src="/Front/img/Vector.png" alt="" className="h-4 ml-9" />
                    </div>

                    <div className="flex mt-5 ml-5">
                        <img src="/Front/img/email.png" alt="" className="h-6" />
                        <h1 className="text-gray-400 text-base mt-1 ml-7">donoClinica@gmail.com</h1>
                    </div>

                    <div className="flex mt-5 ml-5">
                        <img src="/Front/img/fone.png" alt="" className="h-6" />
                        <h1 className="text-gray-400 text-base mt-1 ml-7">(11)48578576</h1>
                    </div>
                </div>

                <div className="bg-blue-300 h-20 w-10"></div>
            </div>


            


                    {/* Aqui você pode adicionar mais conteúdo */}
                </div>
            </NavBarLayout>
        </div>
    );
}

