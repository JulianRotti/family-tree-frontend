// Function to convert DD.MM.YYYY to YYYY-MM-DD format (for API)
export const convertToApiDateFormat = (dateStr) => {
    const [day, month, year] = dateStr.split('.');
    return `${year}-${month}-${day}`;  // Return in YYYY-MM-DD format
  };
  
  // Function to convert YYYY-MM-DD to DD.MM.YYYY format (for UI)
  export const convertToUIDateFormat = (dateStr) => {
    const [year, month, day] = dateStr.split('-');
    return `${day}.${month}.${year}`;  // Return in DD.MM.YYYY format
  };
  
  // Function to validate DD.MM.YYYY date input
  export const isValidDateFormat = (dateStr) => {
    const regex = /^\d{2}\.\d{2}\.\d{4}$/;  // Matches DD.MM.YYYY format
    return regex.test(dateStr);
  };
  