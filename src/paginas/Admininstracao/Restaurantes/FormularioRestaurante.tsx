import { AppBar, Box, Button, Container, Link, Paper, TextField, Toolbar, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import IRestaurante from "../../../interfaces/IRestaurante";
import http from "../../../http";

export default function FormularioRestaurante() {
  const [nomeRestaurante, setNomeRestaurante] = useState('');
  const parametros = useParams();

  useEffect(() => {
    if (parametros.id) {
      http.get<IRestaurante>(`restaurantes/${parametros.id}/`)
        .then(response => {
          setNomeRestaurante(response.data.nome)
        });
    }
  }, [parametros])

  const aoSubmeterForm = (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault();

    if (parametros.id) {
      http.put(`restaurantes/${parametros.id}/`, {
        nome: nomeRestaurante,
      })
        .then(response => {
          alert('Restaurante atualizado com sucesso')
        })

      return;
    }

    http.post('restaurantes/', {
      nome: nomeRestaurante,
    })
      .then(response => {
        alert('Restaurante cadastrado com sucesso')
      })
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexGrow: 1 }}>
      <Typography component='h1' variant='h6'>Formulário de Restaurante</Typography>
      <Box component='form' sx={{ width: '100%' }} onSubmit={aoSubmeterForm}>
        <TextField
          label="Nome do Restaurante"
          variant="standard"
          required
          fullWidth
          value={nomeRestaurante}
          onChange={event => setNomeRestaurante(event.target.value)}
        />
        <Button sx={{ marginTop: 1 }} fullWidth variant="outlined" type="submit">Salvar</Button>
      </Box>
    </Box>
  );
}