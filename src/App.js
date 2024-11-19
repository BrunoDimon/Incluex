import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Home from './pages/Home';
import FinishedFile from './pages/FinishedFile';

export default function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/FinishedFile' element={<FinishedFile />} />
        </Routes>
      </Router>
    </div>
  );
};
