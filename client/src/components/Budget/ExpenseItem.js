import { AppContext } from "../../context/AppContext";
import React, { useContext } from "react";
import { Button } from 'antd';

const ExpenseItem = (props) => {

    const { dispatch } = useContext(AppContext);
    const handleDeleteExpense = () => {
		dispatch({
			type: 'DELETE_EXPENSE',
			payload: props.id,
		});
	};

    return (
        <li className='border aliceBlue'>
            <div className="listName">
            <span>
                {props.name}
            </span>
            </div>
            <div className="listPrice">
                <span>
                    ${props.cost}
                </span>
                <Button type='primary' danger ghost onClick={handleDeleteExpense}>Delete</Button>
            </div>
            </li>
    );
};


export default ExpenseItem;