import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useEffect, useState } from "react";
import IRestaurante from "../../../interfaces/IRestaurante";
import { Link } from "react-router-dom";
import http from "../../../http";

export default function AdminstracaoRestaurantes(){
  const [restaurantes, setRestaurante] = useState<IRestaurante[]>([]);

  useEffect(() =>{
    http.get<IRestaurante[]>('restaurantes/')
      .then(response => {
        setRestaurante(response.data);
      });
  },[]);

  const excluir = (restauranteParaExcluir: IRestaurante) => {
    http.delete(`restaurantes/${restauranteParaExcluir.id}/`)
      .then(() => {
        const listRestaurantes = restaurantes.filter(restaurante => restaurante.id !== restauranteParaExcluir.id);
        setRestaurante([...listRestaurantes]);
      });
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              Nome
            </TableCell>
            <TableCell>
              Editar
            </TableCell>
            <TableCell>
              Excluir
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {restaurantes.map((restaurante) => {
            return (
              <TableRow key={restaurante.id}>
                <TableCell>
                  {restaurante.nome}
                </TableCell>
                <TableCell>
                  [<Link to={`/admin/restaurantes/${restaurante.id}`}>Editar</Link>]
                </TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => excluir(restaurante)}
                  >
                    Excluir
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}