export const validators = {
  pageUrl: (value) => {
    const regex = /^(https?:\/\/)?(www\.)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}([\/\w \.-]*)*\/?$/;
    return !value || regex.test(value) ? null : "Please enter a valid URL";
  },
  
  items: (value) => {
    const regex = /^(\d{7})(,\d{7})*$/;
    return !value || regex.test(value) ? null : "Item codes must be 7-digit numbers separated by commas";
  },
  
  promo: (value) => {
    return !value || value.length <= 3 ? null : "Promo codes are typically 3 characters";
  },
  
  jobNumber: (value) => {
    const regex = /^\d{2}[A-Za-z]{2}\d{4}$/;
    return !value || regex.test(value) ? null : "Format: ##LL#### (e.g., 24DS2828)";
  }
};

export const validateAllFields = (formData) => {
  const errors = {};
  
  Object.keys(validators).forEach(field => {
    const error = validators[field](formData[field]);
    if (error) {
      errors[field] = error;
    }
  });
  
  return errors;
};