import React,{useState, useEffect} from "react";

import "./styles.css";
import api from './services/api.js';

function App() {
  const [repositories, setRepositories]=useState([]);
  useEffect(()=>{
    api.get('/repositories').then(response=>{
      const repository= response.data;
      setRepositories(repository);
    });
  },[]);

  async function handleAddRepository() {
    const response=await api.post('/repositories',{
      title:`Desafio React ${Date.now()}`,
      owner:'Matias',
      techs:['ReactJS', 'NodeJS']
    });
    const repository=response.data;
    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`);
    const repos= repositories.filter(repository=>repository.id!==id);
    setRepositories(repos);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        
          {repositories.map(repository=>(
            <>
                <li key={repository.id}>{repository.title}</li>
                <button onClick={() => handleRemoveRepository(repository.id)}>
                  Remover
                </button>
            </>))}
        
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
