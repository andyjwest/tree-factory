import React, {useCallback, useState} from 'react';


export default function CreateFactorySidebar({sendMessage, ready}) {
    const [name, setName] = useState('');
    const [min, setMin] = useState(0);
    const [max, setMax] = useState(10);
    const [nodeCount, setNodeCount] = useState(1);

    const addFactory = useCallback((e) => {
        //TODO validate
        e.preventDefault();
        sendMessage({
            nodeCount,
            name,
            min,
            max
        })
    }, [name, max, min, nodeCount, sendMessage]);

    return <form onSubmit={addFactory}>
        <input required
               value={name}
               onChange={e => setName(e.target.value)}
               placeholder='Factory Name'/>
        <div>Range</div>
        <div>
            Min <input required
                       type='number'
                       className='number'
                       value={min}
                       min={0}
                       max={500000}
                       onChange={e => setMin(e.target.value)}
        /> - Max <input type='number'
                        className='number'
                        value={max}
                        min={min}
                        max={500000}
                        onChange={e => setMax(e.target.value)}
                        required
        />
        </div>
        <div># of Nodes</div>
        <input value={nodeCount}
               onChange={e => setNodeCount(e.target.value)}
               className='number'
               type='number'
               // required
               min={1}
               max={15}
        />
        <div/>
        <button disabled={!ready} type='submit'>Add Factory</button>
    </form>
}
