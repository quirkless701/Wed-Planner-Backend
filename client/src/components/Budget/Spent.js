import React, { useContext } from "react";
import { AppContext } from "../../context/AppContext";

const Spent = () => {
    const { expenses } = useContext(AppContext);
    const totalExpenses = expenses.reduce((total, item) => {
        return (total += item.cost);
    },0);

    return (
        <div className='spent'>
            <span className='spentDisplay'>Spent: ${ totalExpenses }</span>
        </div>
    );
};

export default Spent;