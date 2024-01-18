// Import the functions you need from date-fns
//import { format, addDays, parseISO } from 'date-fns';
const { format, addDays, parseISO } = require('date-fns');


// Example usage of date-fns functions
const today = new Date();

// Format the date
const formattedDate = format(today, 'yyyy-MM-dd HH:mm:ss');
console.log(`Formatted Date: ${formattedDate}`);

// Add 3 days to the current date
const futureDate = addDays(today, 3);
console.log(`Date in 3 days: ${futureDate}`);

// Parse an ISO string to a Date object
const isoString = '2022-01-01T12:00:00Z';
const parsedDate = parseISO(isoString);
console.log(`Parsed Date: ${parsedDate}`);
