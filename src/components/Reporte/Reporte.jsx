import React, { useEffect, useState } from 'react'

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, Divider, Fab, FormControl, Grid, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from '@mui/material';
import styled from '@emotion/styled';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const Reporte = () => {

  const navigate = useNavigate();

  const [participantes, setParticipantes] = useState([]);
  const [tablaParticipantes, setTablaParticipantes] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [busquedaC, setBusquedaC] = useState("");
  const [busquedaFD, setBusquedaFD] = useState("");

  const usuarioData = async () => {

    const ros = await fetch('https://poesiagt.herokuapp.com/api/verFichas', {
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


  const handleChange = e => {
    setBusqueda(e.target.value);
    filtrar(e.target.value);

  }

  const handleChange2 = e => {
    setBusquedaC(e.target.value);
    filtrarC(e.target.value);

  }

  const handleChange3 = e => {
    setBusquedaFD(e.target.value);
    filtrarFD(e.target.value);

  }

  const filtrar = (terminoBusqueda) => {
    var resultadosBusqueda = tablaParticipantes.filter((elemento) => {
      if (elemento.nombre.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())) {
        return elemento;
      }
    })
    setParticipantes(resultadosBusqueda);
  }

  const filtrarC = (terminoBusqueda) => {
    var resultadosBusqueda = tablaParticipantes.filter((elemento) => {
      if (elemento.carnet.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())) {
        return elemento;
      }
    })
    setParticipantes(resultadosBusqueda);
  }

  const filtrarFD = (terminoBusqueda) => {
    var resultadosBusqueda = tablaParticipantes.filter((elemento) => {
      if (elemento.fechaDeDeclamacionTxt.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())) {
        return elemento;
      }
    })
    setParticipantes(resultadosBusqueda);
  }

  const handleClick = e => {
    navigate('/#', { replace: true })

  }

  const MySwal = withReactContent(Swal)

  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
})

  function handleDelete (id){

    console.log(id)
    MySwal.fire({
      title: <p>¿Seguro que quieres Eliminar?</p>,
      icon: 'question',
      iconColor: '##03b1bb',
      showCloseButton: true,
      confirmButtonColor: '#03b1bb',
      cancelButtonColor: '#f1940a',
      confirmButtonText: 'Si quiero',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {

        fetch('https://poesiagt.herokuapp.com/api/eliminarFichas/' + `${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          }
        })

        Toast.fire({
          icon: 'success',
          iconColor: '#03b1bb',
          title: 'Participante ' + 'Eliminado'
        })

        
      }
    })
  }

  return (
    <>
      <Fab color="primary" aria-label="add" onClick={handleClick}>
        <ArrowBackIcon />
      </Fab>
      <Grid align="center" sx={{ marginTop: 10, marginBottom: 5, marginLeft: 20, marginRight: 20 }}>

        <FormControl variant="filled">
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

        <FormControl variant="filled">
          <InputLabel >Búsqueda por Carnet</InputLabel>
          <OutlinedInput
            value={busquedaC}
            onChange={handleChange2}
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

        <FormControl variant="filled">
          <InputLabel >Fecha de Declamación</InputLabel>
          <OutlinedInput
            value={busquedaFD}
            onChange={handleChange3}
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
                <StyledTableCell align="center">----</StyledTableCell>
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
                  <StyledTableCell align="center">
                    <Button 
                    onClick={ () => handleDelete( participantes._id) }
                    variant="contained" startIcon={<DeleteIcon />}>
                      Eliminar
                    </Button>

                  </StyledTableCell >
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