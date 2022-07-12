import React from 'react';
import Questions from './components/Questions';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './theme'
import { BrowserRouter, Routes , Route , Navigate} from "react-router-dom";


const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path='/' exact element={<Navigate to={'/questions'} />}/>
          <Route path='/questions' exact element={<Questions/>}/>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
