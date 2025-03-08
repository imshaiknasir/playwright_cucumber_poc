const XLSX = require('xlsx');
const path = require('path');
const fs = require('fs');

// Define user data
const userData = [
  ['userType', 'username', 'password'],
  ['standard', 'standard_user', 'secret_sauce'],
  ['locked_out', 'locked_out_user', 'secret_sauce'],
  ['problem', 'problem_user', 'secret_sauce'],
  ['performance_glitch', 'performance_glitch_user', 'secret_sauce']
];

// Create a new workbook
const workbook = XLSX.utils.book_new();

// Convert data to worksheet
const worksheet = XLSX.utils.aoa_to_sheet(userData);

// Add the worksheet to the workbook
XLSX.utils.book_append_sheet(workbook, worksheet, 'Users');

// Write the workbook to a file
const filePath = path.join(__dirname, 'users.xlsx');
XLSX.writeFile(workbook, filePath);

console.log(`Excel file created at ${filePath}`); 