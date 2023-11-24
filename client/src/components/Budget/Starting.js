import React, { useContext, useState } from "react";
import ViewBudget from "./ViewBudget";
import EditBudget from "./EditBudget";
import { AppContext } from "../../context/AppContext";

const Starting = () => {
    const { budget, dispatch } = useContext(AppContext);
    const [isEditing, setIsEditing] = useState(false);

    const handleEditClick = () => {
        setIsEditing(true);
    };

    // linked to AppContext to set value 
    const handleSaveClick = (value) => {
        dispatch({
            type: 'SET_BUDGET',
            payload: value,
        });
        setIsEditing(false);
    };

    // should handle switch from edit to save 
    return (
        <div>
            {isEditing ? (
                // editbudget file
                <EditBudget handleSaveClick={handleSaveClick} budget={budget} />
            ) : (
                // viewbudget file
                <ViewBudget handleEditClick={handleEditClick} budget={budget} />
            )}
        </div>
    );
};

export default Starting;