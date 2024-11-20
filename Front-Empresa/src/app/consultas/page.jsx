"use client";
import NavBarLayout from "@/components/layout/NavBarLayout";
import Modal from "@/components/Modal";
import { getConsultas } from "@/js/info";
import { useState, useEffect, useRef } from "react";

function criarCard(consulta) {
    const card = document.createElement('div');
    card.classList.add('bg-zinc-200', 'rounded-lg', 'w-[300px]', 'h-[330px]');

    const especialidade = document.createElement('p');
    especialidade.textContent = consulta.nome_especialidade;
    especialidade.classList.add('text-blue-950', 'text-xl', 'font-bold', 'font-sans', 'ml-[20px]');

    const nomeMedico = document.createElement('h2');
    nomeMedico.textContent = consulta.nome_medico;
    nomeMedico.classList.add('text-blue-950', 'text-lg', 'font-bold', 'ml-[20px]');

    const detalhes = document.createElement('p');
    detalhes.textContent = "Descrição: " + consulta.detalhes_consulta;
    detalhes.classList.add('text-blue-950', 'ml-[20px]');

    const dias = document.createElement('p');
    const diasData = new Date(consulta.dias_consulta);
    dias.textContent = !isNaN(diasData) ? "Dia: " + diasData.toLocaleDateString() : "Dia: " + consulta.dias_consulta;
    dias.classList.add('text-blue-950', 'ml-[20px]');

    const horario = document.createElement('p');
    horario.textContent = "Horário: " + consulta.horas_consulta.slice(11, 19);
    horario.classList.add('text-blue-950', 'ml-[20px]');

    card.append(especialidade, nomeMedico, detalhes, dias, horario);
    card.addEventListener('click', () => {
        window.location.href = '/infoConsulta?id=' + consulta.id_consulta;
    });

    return card;
}

function Consultas() {
    const [openModal, setOpenModal] = useState(false);
    const contanierConsultaRef = useRef(null);

    useEffect(() => {
        async function preencherContainer() {
            const contanierConsulta = contanierConsultaRef.current;

            if (!contanierConsulta) return;

            const consultas = await getConsultas();

            // Verifique se `consultas` é definido e se é um array antes de usar `.forEach`
            if (Array.isArray(consultas)) {
                consultas.forEach(consulta => {
                    const card = criarCard(consulta);
                    contanierConsulta.appendChild(card);
                });
            } else if (consultas === undefined) {
                console.error("Erro: `consultas` é `undefined`.");
            } else {
                console.error("Erro: `consultas` não é um array.", consultas);
            }
            
        }

        preencherContainer();
    }, []);

    return (
        <div className="flex flex-col">
            <NavBarLayout>
                <div className="flex-1 p-4">
                    <div className="flex">
                        <h1 className="text-4xl font-bold text-[--font] p-10">CONSULTAS</h1>
                        <div className="relative">
                            <input type="text" placeholder="Pesquisar..." className="bg-[--navempresa] ml-[500px] pl-3 pr-10 py-2 mt-[50px] rounded-full w-96 h-14 border focus:border-blue-900 focus:bg-blue-5 transition-all" />
                            <button>
                                <img src="./img/lupa.png" alt="" className="absolute ml-[-50px] mt-[-19px] w-7" />
                            </button>
                        </div>
                    </div>

                    <Modal isOpen={openModal} setModalOpen={() => setOpenModal(!openModal)} />

                    <div className="flex mt-20 ml-[300px] grid">
                        <div
                            id="contanierConsulta"
                            ref={contanierConsultaRef}
                            className="flex flex-wrap gap-4 w-[1100px] h-[100px]">
                        </div>
                    </div>
                </div>
            </NavBarLayout>
        </div>
    );
}

export default Consultas;
