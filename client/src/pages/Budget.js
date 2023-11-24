import React from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
import Starting from '../components/Budget/Starting';
import Spent from '../components/Budget/Spent';
import Remaining from '../components/Budget/Remaining';
import ExpenseList from '../components/Budget/ExpenseList';
import AddExpense from '../components/Budget/AddExpense';
import { AppProvider } from '../context/AppContext';
import Auth from '../utils/auth';


const Budget = () => {
    return (
      <>
    {Auth.loggedIn() ? (
      <>
      <AppProvider>
      {/* starting budget */}
      {/* bootstrap  container budget*/}
      <div className='darkGreen'>
        {/* bootstrap  "inlineBorder"*/}
        <div className='hero'>
          <h1 className='marginTop text-gradient sublogo'>Budget Board</h1>
          <img src="robot.png" width="200px" alt="Robot wearing a veil"></img>
          <h3 className="text-gradient description">&ldquo;Craft your dream celebration with fiscal finesse on our Budget Board. Strategize wisely, ensuring every penny transforms into unforgettable moments on your big day.&rdquo;</h3>
          <div className='budgetSection'>
            {/* bootstrap  'col-sm'*/}
            <div>
              <Starting />
            </div>
            {/* bootstrap  'col-sm'*/}
            <div className='margin'>
              <Spent />
            </div>
            {/* bootstrap  'col-sm'*/}
            <div>
              <Remaining />
            </div>
          </div>
        </div>

{/* expenses added to the budget */}
        <h2 className='center salmonText'>Expenses</h2>
        <div>
          <div>
            <ExpenseList />
          </div>
        </div>

{/* form to add expenses */}
        <div  className="footer">
        <h3 className="center">Add Expenses</h3>
        {/* bootstrap  'col-sm'*/}
        <div>
          <AddExpense />
        </div>
        </div>

      </div>  
      </AppProvider>
      </>
    ) : (
      <div fluid="true" className='text-light bg-dark p-5'>
        <div className='container p-4'>
          <h1>You must be logged in to view this page.</h1>
        </div>
      </div>
    )}
  </>
    );
  };
  
  export default Budget;