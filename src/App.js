
import './main.scss';
import DataList from './pages/DataList';
import Main from './pages/Main';
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
    
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/details" element={<DataList />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
