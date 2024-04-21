let alarms=[];
const digitalClock=document.getElementById('digiClock');
const alarmList = document.getElementById('alarmList');
const setAlarmBtn=document.getElementById('setAlarmBtn');
const alarmRing=document.getElementById('alarmRing');
const alarmSound=document.getElementById('alarmSound');
const snoozeBtn=document.getElementById('snooze');
const closeButton=document.getElementById('closeBtn');

// Function to display digital clock
function displayDigitalClock() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const twelveHours = hours % 12 || 12;        // Convert to 12-hour format
    // Pad single digit hours, minutes and seconds with leading zero
    const formattedHours = twelveHours < 10? '0' + twelveHours : twelveHours;
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
    const formattedSeconds = seconds < 10 ? '0' + seconds : seconds;

    const timeString = formattedHours + ':' + formattedMinutes + ':' + formattedSeconds + ' ' + ampm;
    
    // Display the time in the digital clock element
    digitalClock.textContent = timeString;

    //go through each alarm set in the list and match it with current time and play the alarm when alarm time is reached
    alarms.forEach(function(alarm){
        if (alarm.hours === formattedHours &&
            alarm.minutes === formattedMinutes &&
            alarm.seconds === formattedSeconds &&
            alarm.meridian === ampm){
                alarmRing.style.display='block';
                alarmSound.play();
            }
    })
}
setInterval(displayDigitalClock,1000);                //update clock after every second
snoozeBtn.addEventListener('click',snoozeAlarm);   
closeButton.addEventListener('click',closeAlarm);

//function to snoozze alarm when snoze button is clicked and time is set after which alarm again starts ringing
function snoozeAlarm() {
    alarmRing.style.display='none';
    alarmSound.pause();
                setTimeout(() => {
                    alarmRing.style.display='block';
                    alarmSound.play();
                }, 10000);
}

//function to close alarm on clicking on close button
function closeAlarm() {
    alarmRing.style.display='none';
    alarmSound.pause();
}
// Function to add an alarm
function addAlarm() {
    const hrElement=document.getElementById("hourVal");
    const minElement=document.getElementById("minsVal");
    const secsElement=document.getElementById("secsVal");
    const amPmElement = document.getElementById("AmPm");
    validateInput(hrElement);
    validateInput(minElement);
    validateInput(secsElement);
    const hrVal=parseInt(hrElement.value);
    const minsVal=parseInt(minElement.value);
    const secsVal=parseInt(secsElement.value);
    const hrValue = hrVal < 10? '0' + hrVal : hrVal;
    const minsValue = minsVal < 10? '0' + minsVal : minsVal;
    const secsValue = secsVal < 10? '0' + secsVal : secsVal;
    const ampmVal=amPmElement.value;
    //check if the alarm for particulaar time is already set and if its already set give an alert
    const isAlarmExists = alarms.some(function(alarm) {
        return alarm.hours === hrValue &&
               alarm.minutes === minsValue &&
               alarm.seconds === secsValue &&
               alarm.meridian === ampmVal;
    });

    if (isAlarmExists) {
        alert("Alarm for this time is already set!");
        return; // Don't add the alarm if it already exists
    }
    const alarm = {
        hours: hrValue,
        minutes: minsValue,
        seconds: secsValue,
        meridian: ampmVal
    };
  
    console.log("etting alarm");
    // Add the alarm object to the alarms array
    alarms.push(alarm);
    displayAlarms();
}
function validateInput(input) {
    console.log("validating input")
    const minValue = parseInt(input.min);
    const maxValue = parseInt(input.max);
    console.log(`max value= ${maxValue}`);
    let value = parseInt(input.value);
  
    // If the entered value is less than the minimum, set it to the minimum
    if (isNaN(value) || value < minValue) {
        input.value = minValue;
    }
    // If the entered value is greater than the maximum, set it to the maximum
    else if (value > maxValue) {
        input.value = maxValue;
    }
    // If the entered value is valid, keep it unchanged
}

setAlarmBtn.addEventListener('click',addAlarm);
// Function to display alarms
function displayAlarms() {
    alarmList.innerHTML = '';

    // Create and append elements for each alarm
    alarms.forEach(function(alarm) {
        const alarmElement = document.createElement('div');
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'delete';
        deleteButton.classList.add('deleteButton');
        alarmElement.textContent = `${alarm.hours}:${alarm.minutes}:${alarm.seconds} ${alarm.meridian}`;
        alarmList.appendChild(alarmElement);
        alarmElement.appendChild(deleteButton);
        deleteButton.addEventListener('click', function() {
            // Remove the alarm when the delete button is clicked
            const index = alarms.indexOf(alarm);
            if (index !== -1) {
                alarms.splice(index, 1);
                displayAlarms(); // Update the alarm list after removing the alarm
            }
        });
    });
}

displayDigitalClock() 