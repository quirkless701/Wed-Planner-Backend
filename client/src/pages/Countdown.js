import React, { useState, useEffect } from 'react';
import { DatePicker, Space } from 'antd';
import weddingCountdown from "../assets/images/wedding-countdown.jpg";
import moment from 'moment';

const Countdown = () => {
    const [countdownText, setCountdownText] = useState('');
    const [countdownIntervalId, setCountdownIntervalId] = useState(null);
    const [targetDate, setTargetDate] = useState(null);

    // Function to validate the date format (YYYY-MM-DD)
    const isValidDate = (dateString) => {
        let regEx = /^\d{4}-\d{2}-\d{2}$/;
        if (!dateString.match(regEx)) return false; // Invalid format
        let d = new Date(dateString);
        let dNum = d.getTime();
        if (!dNum && dNum !== 0) return false; // NaN value, invalid date
        return d.toISOString().slice(0, 10) === dateString;
    }

    // Function to initiate the countdown
    const countdownTimer = (formattedDate) => {
        if (!isValidDate(formattedDate)) {
          console.log('Invalid date format. Please try again.');
          return;
        }
    
        let today = new Date().getTime();
        let target = new Date(formattedDate).getTime();
    
        if (today > target) {
          console.log('Invalid date. The target date has already passed.');
          return;
        }
    
        if (countdownIntervalId) {
          clearInterval(countdownIntervalId);
        }
    
        setTargetDate(target);
    
        // Create and append the image element
        let banner = document.getElementById('countdown-banner');
        banner.innerHTML = '<img src="' + weddingCountdown + '" alt="Wedding Countdown">';
    
        let countdownInterval = setInterval(function () {
          let now = new Date().getTime();
          let distance = target - now;
    
          let days = Math.floor(distance / (1000 * 60 * 60 * 24));
          let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
          let seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
          if (distance <= 0) {
            clearInterval(countdownInterval);
            setCountdownIntervalId(null); // Reset interval ID when countdown is completed
            setCountdownText('Countdown completed!');
          } else {
            setCountdownText(`Time remaining: ${days}d ${hours}h ${minutes}m ${seconds}s`);
          }
        }, 1000);
    
        setCountdownIntervalId(countdownInterval); // Store the interval ID in the state variable
      };

    const formatDateToYYYYMMDD = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    const handleOnChange = (date) => {
      const targetDate = new Date(date.$d);
      const formattedDate = formatDateToYYYYMMDD(targetDate);
      console.log(formattedDate); // Output: "YYYY-MM-DD"
      countdownTimer(formattedDate);
  }

  const disabledDate = (current) => {
    return current && current < moment().endOf('day');
  }

  useEffect(() => {
    // Clear the interval when the component unmounts
    return () => {
      if (countdownIntervalId) {
        clearInterval(countdownIntervalId);
      }
    };
  }, [countdownIntervalId]);

  return (
    <>
        <div className="hero">
            <h1 className="text-gradient sublogo">Countdown</h1>
            <img src="robot.png" width="200px" alt="Robot wearing a veil"></img>
            <h3 className="text-gradient description">&ldquo;Are you r-really excited?? Just a few days to go for your b-b-big day. Keep calm!&rdquo;</h3>
        </div>
        <div style={{padding:"1em"}}>
            <div style={{textAlign:"center"}}>
              <p><strong>Select a date to start your countdown!</strong></p>
              <Space direction="vertical">
                  <DatePicker
                      onChange={handleOnChange}
                      id="dateInput"
                      disabledDate={disabledDate}
                      style={{
                          width: '300px', // Adjust the width to your preference
                          height: '40px', // Adjust the height to your preference
                          fontSize: '1.5rem', // Adjust the font size to your preference
                      }}
                  />
              </Space>
            </div>
            <div id="countdown-banner" style={{textAlign:"center",padding:"1em"}}></div>
            <div
                id="countdown-timer"
                style={{
                    fontFamily: 'Arial, sans-serif',
                    fontSize: '5rem', // Increase the font size to make it bigger
                    fontWeight: 'bold',
                    color: '#FE7B72', // Customize the color to your preference
                    margin: '2rem 0', // Add more margin to the top to move it down
                    display: 'flex',
                    justifyContent: 'center', // Center the content horizontally
                    alignItems: 'center', // Center the content vertically
                }}
            >
                {countdownText}
            </div>
        </div>
    </>
);
};

export default Countdown;