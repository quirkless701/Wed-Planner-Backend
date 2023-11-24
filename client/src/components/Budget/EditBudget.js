import React, { useState } from 'react';
import { Button, Input } from 'antd';

const EditBudget = (props) => {
	const [value, setValue] = useState(props.budget);
	return (
		<>
			<Input required='required' type='number' className='' id='name' value={value}
				onChange={(event) => setValue(event.target.value)}
			/>
			<Button type='default' className=''
				onClick={() => props.handleSaveClick(value)}
			>
				Save
			</Button>
		</>
	);
};

export default EditBudget;