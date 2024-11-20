"use client";

import React, { useState } from "react";

const Login = () => {
  const [cnpj, setCnpj] = useState("");
  const [senha, setSenha] = useState("");

  const handleLogin = async () => {
    if (cnpj.trim() === "" || senha.trim() === "") {
      alert("Por favor, preencha todos os campos!");
      return;
    }

    try {
      const response = await fetch("https://vital-umqy.onrender.com/v1/vital/loginEmpresa", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cnpj, senha }),
      });

      const result = await response.json();

      if (response.ok && result.status_code === 200) {
        localStorage.setItem("idC", result.id_empresa);
        console.log(result.id_empresa);
        window.location.href = "/inicio";
      } else {
        alert(result.message || "Ocorreu um erro inesperado.");
      }
    } catch (error) {
      console.error(error);
      alert("Erro ao tentar fazer login. Por favor, tente novamente.");
    }
  };

  const handleCadastro = () => {
    window.location.href = "/cadastro";
  };

  return (
    <div className="bg-gradient-to-r from-blue-700 to-blue-300 min-h-screen flex flex-col items-center justify-center">
      <div className="bg-blue-300/75 w-2/6 h-auto items-center rounded-lg mt-[10px] absolute">
        <div className="ml-52 mt-10 flex">
          <img src="./img/logo.png" alt="Logo" />
          <h2 className="font-sans text-5xl text-white mt-10">Vital+</h2>
        </div>

        <div className="ml-52">
          <h1 className="font-sans text-3xl text-blue-900 ml-3">Seja Bem-vindo!</h1>
          <h2 className="font-bold font-sans text-3xl text-blue-900 mt-5 ml-16">
            LOGIN
          </h2>
        </div>

        <div className="mt-16 ml-32">
          <label htmlFor="cnpj" className="block text-white text-base font-sans mb-2 text-xl">
            CNPJ
          </label>
          <input
            type="text"
            id="cnpj"
            placeholder="Digite seu CNPJ aqui..."
            className="shadow-2xl w-3/4 h-16 border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 relative"
            value={cnpj}
            onChange={(e) => setCnpj(e.target.value)}
          />
          <img src="./img/empresa.png" alt="Hospital" className="absolute ml-72 mt-[-70px]" />
        </div>

        <div className="mt-14 ml-32">
          <label htmlFor="senha" className="block text-white text-base font-sans mb-2 text-xl">
            SENHA
          </label>
          <input
            type="password"
            id="senha"
            placeholder="Digite sua senha aqui ..."
            className="shadow-2xl w-3/4 h-16 border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={senha}
            onChange={(e) => setSenha(e.target.value)} // Correção
          />
        </div>

        <div className="mt-20 mb-10 ml-40">
          <button
            className="bg-blue-900 text-white rounded-3xl w-80 h-14 text-2xl"
            onClick={handleLogin} // Associando a função de login
          >
            ENTRAR
          </button>
          <button
            className="bg-blue-200 text-white rounded-3xl w-60 h-8 text-base mt-4 ml-9"
            onClick={handleCadastro}
          >
            CADASTRAR A EMPRESA
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
