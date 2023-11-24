import { useState, useEffect } from 'react';

function CountdownPage() {
  const [countdownCompleted, setCountdownCompleted] = useState(false);
  const [targetDate, setTargetDate] = useState(''); // Assuming targetDate is a string in 'MM/DD/YYYY' format

  useEffect(() => {
    let countdownInterval;

    // Function to initiate the countdown
    function startCountdown() {
      if (!isValidDate(targetDate)) {
        console.log("Invalid date format. Please try again.");
        return;
      }

      // Convert targetDate to a valid Date object (using ISO format)
      const [month, day, year] = targetDate.split('/');
      const target = new Date(`${year}-${month}-${day}`).getTime();

      const today = new Date().getTime();

      if (today > target) {
        console.log("Invalid date. The target date has already passed.");
        return;
      }

      // Start the countdown
      countdownInterval = setInterval(() => {
        const now = new Date().getTime();
        const distance = target - now;

        if (distance <= 0) {
          clearInterval(countdownInterval);
          setCountdownCompleted(true);
        }
      }, 1000);
    }

    // Start the countdown when targetDate changes
    startCountdown();

    // Clean up the interval when the component unmounts
    return () => clearInterval(countdownInterval);
  }, [targetDate]);

  // ... (rest of the component code)

  return (
    <div>
      {/* ... (render countdown or completion message based on countdownCompleted) */}
    </div>
  );
}
