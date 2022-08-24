import React, { useEffect, useState } from 'react'

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Divider, FormControl, Grid, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from '@mui/material';
import styled from '@emotion/styled';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';

const Reporte = () => {

  const [participantes, setParticipantes] = useState([]);
  const [tablaParticipantes, setTablaParticipantes] = useState([]);
  const [busqueda, setBusqueda] = useState("");

  const usuarioData = async () => {

    const ros = await fetch('http://localhost:3000/api/verFichas', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    const resUser = await ros.json();
    setParticipantes(resUser)
    setTablaParticipantes(resUser)

  }

  useEffect(() => {
    usuarioData();

  }, []);


  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: '#8D40DB',
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: '#a887cad8',
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));


  const handleChange= e => {
    setBusqueda(e.target.value);
    filtrar(e.target.value);

  }

  const filtrar=(terminoBusqueda) => {
    var resultadosBusqueda = tablaParticipantes.filter((elemento)=>{
      if (elemento.nombre.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())) {
        return elemento;
      }
    })
    setParticipantes(resultadosBusqueda);
  }

  return (
    <>
        <Grid align="center"  sx={{ marginTop: 10, marginBottom: 5, marginLeft: 20, marginRight: 20 }}>

          <FormControl  variant="filled">
            <InputLabel >Búsqueda por Nombre</InputLabel>
            <OutlinedInput
              value={busqueda}
              onChange={handleChange}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton>
                    <PersonSearchIcon />
                  </IconButton>
                </InputAdornment>
              }
              label="Búsqueda por Nombre"
            />
          </FormControl>
        </Grid>

      <Divider />
      <Paper elevation={10} sx={{ marginTop: 5, marginBottom: 10, marginLeft: 10, marginRight: 10 }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="center">Nombre</StyledTableCell>
                <StyledTableCell align="center">Carnet</StyledTableCell>
                <StyledTableCell align="center">Fecha Nacimiento</StyledTableCell>
                <StyledTableCell align="center">Genero</StyledTableCell>
                <StyledTableCell align="center">Telefono</StyledTableCell>
                <StyledTableCell align="center">Carrera</StyledTableCell>
                <StyledTableCell align="center">Dirección</StyledTableCell>
                <StyledTableCell align="center">Fecha de Inscripcion</StyledTableCell>
                <StyledTableCell align="center">Fecha de Declamacion</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {participantes.map((participantes) => (
                <StyledTableRow
                  key={participantes._id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <StyledTableCell component="th" scope="row" align="center">
                    {participantes.nombre}
                  </StyledTableCell >
                  <StyledTableCell align="center">{participantes.carnet}</StyledTableCell >
                  <StyledTableCell align="center">{participantes.fechaNacimientoTxt}</StyledTableCell >
                  <StyledTableCell align="center">{participantes.genero}</StyledTableCell >
                  <StyledTableCell align="center">{participantes.telefono}</StyledTableCell >
                  <StyledTableCell align="center">{participantes.carrera}</StyledTableCell >
                  <StyledTableCell align="center">{participantes.direccion}</StyledTableCell >
                  <StyledTableCell align="center">{participantes.fechaDeInscripcionTxt}</StyledTableCell >
                  <StyledTableCell align="center">{participantes.fechaDeDeclamacionTxt}</StyledTableCell >
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </>
  )
}

export default Reporte