import './App.css';
import {Detail, Home, Form, Landing} from './views';
import { Route, Routes } from 'react-router-dom';

function App() {

  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={ <Landing />} />
        <Route path="/home" element={ <Home />} />
        <Route path="/videogames/:id" element={ <Detail />} />
        <Route path="/create" element={ <Form />} />
      </Routes>
      
    </div>
  );
}

export default App;