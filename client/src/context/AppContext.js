import React, { createContext, useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid';

const AppReducer = (state, action) => {
	switch (action.type) {
		case 'ADD_EXPENSE':
			return {
				...state,
				expenses: [...state.expenses, action.payload],
			};
		case 'DELETE_EXPENSE':
			return {
				...state, 
				expenses: state.expenses.filter((expenses) => 
				expenses.id !==action.payload 
				),
			};

			case 'SET_BUDGET':
				return {
					...state,
					budget: action.payload,
				};

		default:
			return state;
	}
};

const initialState = {
	budget: 25000,
	expenses: [
		{ id: uuidv4(), name: 'Wedding Dress', cost: 2000 },
        { id: uuidv4(), name: 'Bridesmaid Dresses', cost: 3000 },
        { id: uuidv4(), name: 'Accessories', cost: 1500 },
		{ id: uuidv4(), name: 'Flowers', cost: 1500 },
        { id: uuidv4(), name: 'Make up', cost: 500 },
        { id: uuidv4(), name: 'Rentals (utensels, chairs, tables)', cost: 1500 },
		{ id: uuidv4(), name: 'Decorations', cost: 1000 },
        { id: uuidv4(), name: 'Venue', cost: 5000 },
        { id: uuidv4(), name: 'Dj', cost: 2000 },
		{ id: uuidv4(), name: 'Vendor', cost: 3000 },
        { id: uuidv4(), name: 'Cake', cost: 500 },
        { id: uuidv4(), name: 'Photographer', cost: 2500 },
	],
};

export const AppContext = createContext();

export const AppProvider = (props) => {
	const [state, dispatch] = useReducer(AppReducer, initialState);

	return (
		<AppContext.Provider
			value={{
				budget: state.budget,
				expenses: state.expenses,
				dispatch,
			}}
		>
			{props.children}
		</AppContext.Provider>
	);
};