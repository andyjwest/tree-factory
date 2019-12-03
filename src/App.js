import React, {useCallback, useEffect, useState} from 'react';
import './App.css';
import Factory from './Factory';
import ErrorContainer from './ErrorContainer';
import FactoryForm from './FactoryForm';

const io = require('socket.io-client');
const socket = io('http://localhost:8080');

function App() {
  const [factories, setFactories] = useState([]);
  const [error, setError] = useState(undefined);
  const [connected, setConnected] = useState(socket.connected);

  useEffect(() => {
    socket.on('connect', () => setConnected(true));
    socket.on('disconnect', () => setConnected(false));
    socket.on('factories updated', setFactories);
    socket.on('validation errors', setError);
    socket.on('server error', setError);
  }, []);

  const deleteFactory = useCallback(
      (id) => socket.emit('delete factory', {id: id}), []);
  const addFactory = useCallback(factory => socket.emit('add factory', factory),
      []);
  const updateFactory = useCallback(
      factory => socket.emit('update factory', factory), []);

  return (
      <div className="App">
        <div>
          <h1>Add a Factory</h1>
          <FactoryForm submitFactory={addFactory} connected={connected}
                       buttonTitle='Add Factory' factory={{}}
          />
        </div>
        <div>
          <ErrorContainer text={error} show={!!error}
                          clear={() => setError(undefined)}/>
          {factories.sort((a,b) => b.createdDate._seconds - a.createdDate._seconds).map(it => <Factory
              deleteFactory={() => deleteFactory(it.id)} key={it.id}
              updateFactory={updateFactory} factory={it}/>)}
        </div>
      </div>
  );
}

export default App;
