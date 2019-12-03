import React, {useState} from 'react';

export default function({connected, submitFactory, buttonTitle, factory}) {
  const [name, setName] = useState(factory.name);
  const [min, setMin] = useState(factory.min);
  const [max, setMax] = useState(factory.max);
  const [nodeCount, setNodeCount] = useState(factory.nodeCount);
  const submit = (e) => {
    e.preventDefault();
    let newFactory = {nodeCount, name, min, max};
    if (!!factory.id) newFactory.id = factory.id;
    if (!!factory.createdDate) newFactory.createdDate = factory.createdDate;
    submitFactory(newFactory);
  };

  return <form onSubmit={submit}>
    <input required type='text' value={name}
           onChange={e => setName(e.target.value)} placeholder='Factory Name'/>
    <div>Range</div>
    <div>Min <input required type='number' className='number' value={min}
                    min={0}
                    max={499999} onChange={e => setMin(Number(e.target.value))}
    /> - Max <input type='number' className='number' value={max} min={min}
                    max={500000} onChange={e => setMax(Number(e.target.value))}
                    required/>
    </div>
    <div># of Nodes</div>
    <input value={nodeCount} onChange={e => setNodeCount(Number(e.target.value))}
           className='number' type='number' required min={1} max={15}/>
    <div/>
    <button disabled={!connected} type='submit'>{buttonTitle}</button>
  </form>;
}