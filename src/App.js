import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Services from "./pages/ServicesInfo/services";
import Home from "./pages/Home/home";

function App() {
  return (
    <BrowserRouter>
      <div >
        <Navbar />
      </div>

      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="services" element={<Services/>} />
      </Routes>

    </BrowserRouter>
  );
}

export default App;
