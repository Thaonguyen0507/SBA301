import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from 'react-router-dom';

import ListOfOrchids from './components/ListOfOrchids';
import EditOrchid from './components/EditOrchid';
import NavBar from './components/NavBar';
import "bootstrap-icons/font/bootstrap-icons.css";

function App() {
  // Inline styles for the app
  const appStyles = {
    minHeight: '100vh',
    backgroundColor: '#f8f9fa'
  };

  return (
    <div style={appStyles}>
      <NavBar />

      <Routes>
        <Route path="/" element={<ListOfOrchids />} />
        <Route path="/edit/:id" element={<EditOrchid />} />
      </Routes>
    </div>
  );
}

export default App;
