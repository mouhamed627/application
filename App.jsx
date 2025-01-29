import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login';
import Tasks from './Tasks'; 
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Tasks" element={<Tasks />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
