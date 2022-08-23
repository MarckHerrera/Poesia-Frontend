import { Avatar, Button, Grid, Paper, TextField } from '@mui/material'
import React from 'react'
import MenuBookIcon from '@mui/icons-material/MenuBook';
import RegexTextField from './RegexTextField';


const Formulario = () => {

    const paperStyle = { padding: 20, height: '70vh', width: 280, margin: '20px auto', }
    const avatarStyle = { backgroundColor: '#8D40DB'}
    const btnStyle = { margin:'10px 0' }
    const TFStyle = { margin:'2px 0' }

    const onlyAlphanumericRegex = /[^a-z1-9]/gi;
    const onlyNumbers = /[^1-9]/gi;

    const [valueCarnet, setValueCarnet] = React.useState("");
    const [valueTelefono, setValue] = React.useState("");

    return (
        <Grid>
            <Paper elevation={10} style={paperStyle}>
                <Grid align="center">

                    <Avatar style={avatarStyle}><MenuBookIcon /></Avatar>
                    <h2>Sing IN</h2>
                </Grid>
                <TextField style={TFStyle} label='Nombre Completo' placeholder='Nombre Completo' fullWidth required/>
                <RegexTextField style={TFStyle} label='Carnet' placeholder='Carnet' fullWidth required regex={onlyAlphanumericRegex} value={valueCarnet} onChange={(e) => setValueCarnet(e.target.value)} inputProps={{ maxLength: 8 }}/>
                <TextField style={TFStyle} label='Dirección' placeholder='Dirección' fullWidth required/>
                {/* <TextField label='Dirección' placeholder='Dirección' fullWidth required/> */}
                <RegexTextField style={TFStyle} label='Teléfono' placeholder='Teléfono' fullWidth required regex={onlyNumbers} value={valueTelefono} onChange={(e) => setValue(e.target.value)} inputProps={{ maxLength: 8 }}/>
                <TextField style={TFStyle} label='Carrera' placeholder='Carrera' fullWidth required/>
                <TextField style={TFStyle} label='Dirección' placeholder='Dirección' fullWidth required/>
                <Button type='submit' color='primary' fullWidth variant='contained' style={btnStyle}>Enviar</Button>
            </Paper>
        </Grid>

    )
}

export default Formulario