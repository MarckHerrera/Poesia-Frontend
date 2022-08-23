import React from 'react'

import { Routes, Route, Navigate, } from "react-router-dom";
import { ThemeProvider } from '@mui/material/styles';
import { Theme } from '../../Theme/Theme';
import Formulario from '../Formulario/Formulario';




const Main = () => {

    return (
        <ThemeProvider theme={Theme}>
            <>
                <Routes>
                    <Route path="*" element={<Navigate to="/" replace />} />
                    <Route path="/reporte" element={<Navigate to="/" replace />} />
                    <Route path="/" element={


                            <Formulario
                            />

                    } />
                </Routes>
            </>
        </ThemeProvider>
    )
}

export default Main