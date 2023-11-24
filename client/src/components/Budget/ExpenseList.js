import React, { useContext, useState, useEffect } from "react";
import ExpenseItem from "./ExpenseItem";
import { AppContext } from "../../context/AppContext";


const ExpenseList = () => {
    const { expenses } = useContext(AppContext);

    const [saveExpense, setExpense] = useState(expenses); 

    useEffect(() => {
        const getExpenses = window.localStorage.getItem('expenseList');
        setExpense(JSON.parse(getExpenses))
    }, [])

    useEffect(() => {
        window.localStorage.setItem('expenseList', JSON.stringify(saveExpense));
    }, [saveExpense])
 
    return (
          <ul>
            {expenses.map((expense) => (
                <ExpenseItem key={expense.id} id={expense.id} name={expense.name} cost={expense.cost} 
                />              
            ))}
        </ul>  
    );
};

export default ExpenseList;