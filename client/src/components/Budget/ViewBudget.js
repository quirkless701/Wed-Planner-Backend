import React from 'react';
import { Button } from 'antd';


const ViewBudget = (props) => {
	return (
		<>
			<span className='budgetDisplay'>Budget: ${props.budget}
			<Button style={{color:'#000'}} type='text' onClick={props.handleEditClick}>
				Edit
			</Button>
			</span>
		</>
	);
};

export default ViewBudget;