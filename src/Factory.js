import React, {useState} from 'react'
import './factory.css'
import './factory.css'
import CreateFactorySidebar from "./CreateFactorySidebar";

export default function Factory({id, name, min, max, nodeCount, nodes, deleteFactory}) {

    const [editMode, setEditMode] = useState(false);

    return <div className='factory'>
        <div>
            {editMode ? <CreateFactorySidebar factory={{id, name, min, max, nodeCount}} /> : <div>
                <div>{name}</div>
                <div>Range {min} - {max}</div>
            </div>}
            <div>
                <button onClick={() => setEditMode(!editMode)}><img alt='edit' src='edit-2.svg' /></button>
                <button onClick={deleteFactory}><img alt='delete' src='trash-2.svg'/></button>
            </div>
        </div>
        <div>
            {!!nodes && nodes.map((it, i) => <div key={i}>{it}</div>)}
        </div>
    </div>
}
