import React from 'react'

import { Routes, Route, Navigate, } from "react-router-dom";
import { ThemeProvider } from '@mui/material/styles';
import { Theme } from '../../Theme/Theme';
import Formulario from '../Formulario/Formulario';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers';
import Reporte from '../Reporte/Reporte';



const Main = () => {

    return (
        <ThemeProvider theme={Theme}>
            <LocalizationProvider dateAdapter={AdapterMoment}>

                    <Routes>
                        <Route path="*" element={<Navigate to="" replace />} />
                        <Route path="" element={


                            <Formulario
                            />

                        } />
                        <Route path="reporte" element={


                            <Reporte
                            />

                        } />
                    </Routes>

            </LocalizationProvider>
        </ThemeProvider>
    )
}

export default Main