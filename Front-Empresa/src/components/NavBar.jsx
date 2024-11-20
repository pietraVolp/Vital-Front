// NavBar.js
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import "../styles/globals.css";

// Import das Imagens
import infoImg from "../../public/img/empresa.png"
import inicioImg from "../../public/img/inicio.png"
import consultaImg from "../../public/img/consultas.png"
import doutorImg from "../../public/img/medicos.png"
import notificacoesImg from "../../public/img/notificacoes.png"




import NavBarCategory from './NavBarCategory';

const NavBar = () => {
    return (
        <div className="bg-[--navdestaque] text-white w-72 min-h-screen flex flex-col py-6 px-5">
            {/* Logo Vital+ */}
            <div className="top-0 flex ">
                <img className="h-[100px]" src="/img/logo.png" alt="Logo" />
                <h1 className="text-3xl mt-10">Vital+</h1>
            </div>

    
            <ul className="mt-[1px] pt-20 " id="categoria">
                {/* Links da NavBar */}

                <NavBarCategory category={"/info-clinica"} images={infoImg} title={"Nome da Cliníca"}  />
                <NavBarCategory category={"/inicio"} images={inicioImg} title={"Ínicio"} />
                <NavBarCategory category={"/consultas"} images={consultaImg} title={"Consultas"} />
                <NavBarCategory category={"/doutores"} images={doutorImg} title={"Doutores"} />
                <NavBarCategory category={"/notificacoes"} images={notificacoesImg} title={"Notificações"} />
                



        
               
            </ul>
        </div>
    );
};

export default NavBar;