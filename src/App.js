import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div >
        <Navbar />
      </div>
    </BrowserRouter>
  );
}

export default App;
