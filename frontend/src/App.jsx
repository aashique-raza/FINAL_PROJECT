
import { BrowserRouter as Router, Routes , Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import Header from './components/Header';
import SignupPage from './pages/SignupPage';

function App() {
 
  return (
   <Router>
    <Header/>
    <Routes>
      <Route path='/' element={<HomePage/>} />
      <Route path='/about' element={<AboutPage/>} />
      <Route path='/signup' element={<SignupPage/>}></Route>
    </Routes>
   </Router>
  )
}

export default App
