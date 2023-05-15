import { Button, TextField } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";

export default function FormularioRestaurante() {
  const [nomeRestaurante, setNomeRestaurante] = useState('');

  const aoSubmeterForm = (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault();

    axios.post('http://localhost:8000/api/v2/restaurantes/', {
      nome: nomeRestaurante,
    })
      .then(response => {
        alert('Restaurante cadastrado com sucesso')
      })
  }

  return (
    <form onSubmit={aoSubmeterForm}>
      <TextField 
        label="Nome do Restaurante" 
        variant="standard" 
        value={nomeRestaurante} 
        onChange={event => setNomeRestaurante(event.target.value)} 
      />
      <Button variant="outlined" type="submit">Salvar</Button>
    </form>
  );
}