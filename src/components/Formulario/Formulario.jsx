import { Avatar, Button, Fab, FormControl, Grid, InputLabel, MenuItem, Paper, Select, TextField } from '@mui/material'
import React from 'react'
import MenuBookIcon from '@mui/icons-material/MenuBook';
import RegexTextField from './RegexTextField';
import { useNavigate } from 'react-router-dom';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { Box } from '@mui/system';

const Formulario = () => {


    const avatarStyle = { backgroundColor: '#8D40DB' }
    const btnStyle = { marginTop: '15px',}
    const TFStyle = { margin: '4px 0' }

    const onlyAlphanumericRegex = /[^a-z1-9]/gi;
    const onlyNumbers = /[^1-9]/gi;

    const navigate = useNavigate();

    const [valueCarnet, setValueCarnet] = React.useState("");
    const [valueTelefono, setValueTelefono] = React.useState("");
    const [valueNombre, setValueNombre] = React.useState("");
    const [valueDireccion, setValueDireccion] = React.useState("");
    const [valueGenero, setValueGenero] = React.useState("");
    const [valueCarrera, setValueCarrera] = React.useState("");
    const [valueGeneroDePoesia, setValueGeneroDePoesia] = React.useState("");
    const [valueFechaNacimiento, setValueFechaNacimiento] = React.useState(Date.now());




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

    const handleSubmit = (event) => {
        event.preventDefault();

        MySwal.fire({
            title: <p>¿Seguro que quieres Aprobar?</p>,
            text: 'Aun puedes seguir revisando los datos',
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

                fetch('https://poesiagt.herokuapp.com/api/solicitudFicha', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        nombre: valueNombre,
                        carnet: valueCarnet,
                        direccion: valueDireccion,
                        genero: valueGenero,
                        telefono: valueTelefono,
                        fechaNacimiento: valueFechaNacimiento,
                        carrera: valueCarrera,
                        generoDePoesia: valueGeneroDePoesia,
                    })


                })
                    .then((res) => res.json())
                    .then((res) => {
                        if (res.mensaje) {
                            Toast.fire({
                                icon: 'warning',
                                iconColor: '#03b1bb',
                                title: res.mensaje
                            })
                        } else {

                            setValueNombre('')
                            setValueCarnet('')
                            setValueDireccion('')
                            setValueGenero('')
                            setValueGeneroDePoesia('')
                            setValueTelefono('')
                            setValueCarrera('')

                            setValueFechaNacimiento(Date.now())

                            Toast.fire({
                                icon: 'success',
                                iconColor: '#03b1bb',
                                title: 'Participante ' + 'Aprobado'
                            })

                        }

                    })







            }
        })

    };


    const handleClick = e => {
        navigate('reporte', { replace: true })

    }



    return (
        <>

            <Grid >

                <Paper elevation={10} sx={{ padding: 2, width: 400, margin: '0px auto ', backgroundColor: 'rgb(211, 193, 224)' }}>

                    <Grid align="center" >

                        <Avatar style={avatarStyle}><MenuBookIcon /></Avatar>
                        <h2>Recital</h2>
                    </Grid>
                    <Box component="form" onSubmit={handleSubmit} align="center">
                        <TextField style={TFStyle} label='Nombre Completo' placeholder='Nombre Completo' fullWidth required value={valueNombre} onChange={(e) => setValueNombre(e.target.value)} />
                        <RegexTextField style={TFStyle} label='Carnet' placeholder='Carnet' fullWidth required regex={onlyAlphanumericRegex} value={valueCarnet} onChange={(e) => setValueCarnet(e.target.value)} inputProps={{ maxLength: 8 }} />
                        <TextField style={TFStyle} label='Dirección' placeholder='Dirección' fullWidth required value={valueDireccion} onChange={(e) => setValueDireccion(e.target.value)} />

                        <FormControl fullWidth required style={TFStyle}>
                            <InputLabel id="demo-simple-select-label">Genero</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"

                                label='Genero'
                                value={valueGenero}
                                onChange={(e) => setValueGenero(e.target.value)}
                            >
                                <MenuItem value={'M'}>Masculino</MenuItem>
                                <MenuItem value={'F'}>Femenino</MenuItem>
                            </Select>
                        </FormControl>

                        <FormControl fullWidth required style={TFStyle}>
                            <InputLabel id="demo-simple-select-label2">Genero de poesia</InputLabel>
                            <Select
                                labelId="demo-simple-select-label2"
                                id="demo-simple-select2"

                                label='Genero de poesia'
                                value={valueGeneroDePoesia}
                                onChange={(e) => setValueGeneroDePoesia(e.target.value)}
                            >
                                <MenuItem value={'Épico'}>Épico</MenuItem>
                                <MenuItem value={'Lírico'}>Lírico</MenuItem>
                                <MenuItem value={'Dramático'}>Dramático</MenuItem>
                            </Select>
                        </FormControl>


                        <FormControl fullWidth required style={TFStyle}>
                            <DesktopDatePicker
                                label="For mobile"
                                value={valueFechaNacimiento}
                                onChange={(newValue) => {
                                    setValueFechaNacimiento(newValue._d.toLocaleDateString());
                                }}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </FormControl>

                        <RegexTextField style={TFStyle} label='Teléfono' placeholder='Teléfono' fullWidth required regex={onlyNumbers} value={valueTelefono} onChange={(e) => setValueTelefono(e.target.value)} inputProps={{ maxLength: 8 }} />
                        <TextField style={TFStyle} label='Carrera' placeholder='Carrera' fullWidth required value={valueCarrera} onChange={(e) => setValueCarrera(e.target.value)} />

                        <Button type='submit' color='primary' fullWidth variant='contained' style={btnStyle}>Enviar</Button>
                        <Button color='primary' fullWidth variant='contained' style={btnStyle} onClick={handleClick} ><ArrowForwardIcon /> Reporte <ArrowForwardIcon /></Button>

                    </Box>
                </Paper>
            </Grid>
        </>
    )
}

export default Formulario