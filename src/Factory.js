import React, {useState} from 'react'
import './factory.css'
import './factory.css'
import FactoryForm from './FactoryForm';

export default function Factory({factory, deleteFactory, updateFactory}) {

    const [editMode, setEditMode] = useState(false);

    const submitFactory = factory => {
        setEditMode(false);
        updateFactory(factory);
    };

    return <div className='factory'>
        <div>
            <div>
            {editMode ? <FactoryForm factory={factory}
                                     buttonTitle='Update' connected={true}
                                     submitFactory={submitFactory} /> :
                <div>{factory.name}</div>}
                {!editMode && <div>Range {factory.min} - {factory.max}</div>}
            </div>
            <div>
                <button className={(editMode) ? 'active': ''}
                        onClick={() => setEditMode(!editMode)}><img alt='edit' src='edit-2.svg' /></button>
                <button onClick={deleteFactory}><img alt='delete' src='trash-2.svg'/></button>
            </div>
        </div>
        <div>
            {!!factory.nodes && factory.nodes.map((it, i) => <div key={i}>{it}</div>)}
        </div>
    </div>
}
