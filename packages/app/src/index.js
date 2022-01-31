import React from 'react'
import { render } from 'react-dom'
import App from './App'
import theme from '@Theme'
import { ColorModeScript } from '@chakra-ui/react'
import { BrowserRouter } from 'react-router-dom'
import './styles/index.css'

render(
  <BrowserRouter>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <App />
  </BrowserRouter>,
  document.getElementById('root')
)
