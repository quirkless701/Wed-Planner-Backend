import React, { useContext } from "react";
import { AppContext } from "../../context/AppContext";

const Remaining = () => {
    const { expenses, budget } = useContext(AppContext);

    const totalExpenses = expenses.reduce((total, item) => {
        return (total = total + item.cost);
    },0);

    // add alert/ was set up with bootstrap
    const alertType = totalExpenses > budget ? 'alert-danger' : 'alert-success';
    
    return (
        <div className={`spent ${alertType}`}>
            <span className='spentDisplay'>Remaining: ${ budget - totalExpenses }</span>
        </div>
    );
};

export default Remaining;