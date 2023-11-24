import React, { useState } from "react"; 
import { AppContext } from '../../context/AppContext';
import { useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Input } from 'antd';

const AddExpense = () => {
    const { dispatch } = useContext(AppContext);

    const [name, setName] = useState('');
    const [cost, setCost] = useState('');

    const onSubmit = (event) => {
        event.preventDefault();

		const expense = {
			id: uuidv4(),
			name: name,
			cost: parseInt(cost),
		};

		dispatch({
			type: 'ADD_EXPENSE',
			payload: expense,
		});
    };

    return (
        <form onSubmit={onSubmit}> 
            <div>
                <div> 
                    <label htmlFor='name'>Name</label>
                    <Input required='required' type='text' id='name' value={name} onChange={(event) => setName(event.target.value)}></Input>
                </div>
                <div> 
                    <label htmlFor='cost'>Cost</label>
                    <Input required='required' type='text' id='cost' value={cost} onChange={(event) => setCost(event.target.value)}></Input>
                </div>
            </div>
              
            <div>
                <div className="center">
                    {/* adding the capital Button will not add item to page*/}
                    <button type='default'>
                       Add to Budget 
                    </button>
                </div>
            </div>
        </form>
    );
};

export default AddExpense;
