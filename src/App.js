import React, {useCallback, useEffect, useMemo, useState} from 'react';
import './App.css';
import CreateFactorySidebar from "./CreateFactorySidebar";
import useWebSocket from 'react-use-websocket';
import Factory from "./Factory";
import ErrorContainer from "./ErrorContainer";

function App() {
    const STATIC_OPTIONS = useMemo(() => ({shouldReconnect: () => true}), []);
    const [sendMessage, lastMessage, readyState] = useWebSocket('ws://localhost:8080/ws', STATIC_OPTIONS);
    const [factories, setFactories] = useState([]);
    const [error, setError] = useState(undefined);

    const deleteFactory = useCallback((id) => sendMessage(JSON.stringify({id, type: 'delete'})), sendMessage);
    const send = useCallback((message) => sendMessage(JSON.stringify(message)), sendMessage);

    useEffect(() => {
        if (readyState === 1 && !!lastMessage) {
            const message = JSON.parse(lastMessage.data);
            if (message.type === 'error') {
                setError(message.text);
            } else {
                setError();
                setFactories(message);
            }
        }
    }, [readyState, lastMessage]);

    return (
        <div className="App">
            <div>
                <h1>Add a Factory</h1>
                <CreateFactorySidebar sendMessage={send} ready={readyState !== 1}/>
            </div>
            <div>
                <ErrorContainer text={error} show={!!error} clear={() => setError(undefined)}/>
                {factories.map((it, i) => <Factory
                    deleteFactory={() => deleteFactory(it.id)} key={i} {...it}/>)}</div>
        </div>
    );
}

export default App;
