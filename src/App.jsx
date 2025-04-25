import { BrowserRouter, Routes, Route } from 'react-router'
import { div } from '@tensorflow/tfjs'
import './App.css'
import Header from './Components/Header'
import Footer from './Components/Footer'
import Historique from './Pages/Historique'
import Home from './Pages/Home'
import NotFound from './Pages/NotFound'


function App() {


  return (
    <BrowserRouter>
    <Header/>
    <Routes>
    <Route path='/' element={<Home />} />
    <Route path='/Historique' element={<Historique />} />
    <Route path='/NotFound' element={<NotFound />} />
    </Routes>
    <Footer/>
    </BrowserRouter>


  );
}

export default App;
