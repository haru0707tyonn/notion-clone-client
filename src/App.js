import './App.css';
import AuthLayout from './components/layout/AuthLayout';
import Login from './components/pages/Login';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from './components/pages/Register';
import { createTheme, ThemeProvider } from "@mui/material/styles"; // 41 MaterialUIのテーマを使う
import { CssBaseline } from '@mui/material'; // CssBaselineAPIを呼び出す必要がある  
import { blue } from '@mui/material/colors';
import AppLayout from './components/layout/AppLayout';
import Home from './components/pages/Home';
import Memo from './components/pages/Memo';

function App() {

  const theme = createTheme({
    palette: { primary: blue }, // ボタンを追加すると青になるらしい
  });

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
      <CssBaseline />
        <Routes>
          <Route path="/" element={<AuthLayout />}>
            <Route path='login' element={<Login />} />
            <Route path='register' element={<Register />} />
          </Route>
          <Route path='/' element={<AppLayout />}>
            <Route index element={<Home />} />
            <Route path='memo' element={<Home />} />
            <Route path='memo/:memoId' element={<Memo />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
