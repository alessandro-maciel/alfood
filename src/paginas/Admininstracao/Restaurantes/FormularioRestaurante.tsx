import { Box, Button, TextField, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import IRestaurante from "../../../interfaces/IRestaurante";

export default function FormularioRestaurante() {
  const [nomeRestaurante, setNomeRestaurante] = useState('');
  const parametros = useParams();

  useEffect(()=>{
    if (parametros.id) {
      axios.get<IRestaurante>(`http://localhost:8000/api/v2/restaurantes/${parametros.id}/`)
      .then(response => {
        setNomeRestaurante(response.data.nome)
      });
    }
  },[parametros])

  const aoSubmeterForm = (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault();

    if (parametros.id) {
      axios.put(`http://localhost:8000/api/v2/restaurantes/${parametros.id}/`, {
        nome: nomeRestaurante,
      })
        .then(response => {
          alert('Restaurante atualizado com sucesso')
        })

      return;
    }

    axios.post('http://localhost:8000/api/v2/restaurantes/', {
      nome: nomeRestaurante,
    })
      .then(response => {
        alert('Restaurante cadastrado com sucesso')
      })
  }

  return (
    <Box sx={{display: 'flex', flexDirection:'column', alignItems:'center'}}>
      <Typography component='h1' variant='h6'>Formulário de Restaurante</Typography>
      <Box component='form' onSubmit={aoSubmeterForm}>
        <TextField 
          label="Nome do Restaurante" 
          variant="standard" 
          required
          fullWidth
          value={nomeRestaurante} 
          onChange={event => setNomeRestaurante(event.target.value)} 
        />
        <Button sx={{marginTop:1}} fullWidth variant="outlined" type="submit">Salvar</Button>
      </Box>
    </Box>
  );
}