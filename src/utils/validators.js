// Country-specific item code configurations
export const ITEM_CODE_RULES = {
  us: {
    pattern: /^(\d{7})(,\s*\d{7})*$/,
    message: "Item codes must be 7-digit numbers separated by commas (e.g., 5702440,1126402)",
    validateSingle: (code) => /^\d{7}$/.test(code)
  },
  uk: {
    pattern: /^([A-Za-z0-9]{1,10})(,\s*[A-Za-z0-9]{1,10})*$/,
    message: "Item codes can be alphanumeric (e.g., 0915,101025,1130364,H085413)",
    validateSingle: (code) => /^[A-Za-z0-9]{1,10}$/.test(code)
  },
  kentExpress: {
    pattern: /^([A-Za-z0-9]{1,10})(,\s*[A-Za-z0-9]{1,10})*$/,
    message: "Item codes can be alphanumeric (e.g., KX228006,9792761,207388)",
    validateSingle: (code) => /^[A-Za-z0-9]{1,10}$/.test(code)
  },
  ireland: {
    pattern: /^(\d{7})(,\s*\d{7})*$/,
    message: "Item codes must be 7-digit numbers separated by commas (e.g., 5702440,1126402)",
    validateSingle: (code) => /^\d{7}$/.test(code)
  },
  canadaEn: {
    pattern: /^(\d{7})(,\s*\d{7})*$/,
    message: "Item codes must be 7-digit numbers separated by commas (e.g., 5702440,1126402)",
    validateSingle: (code) => /^\d{7}$/.test(code)
  },
  canadaFr: {
    pattern: /^(\d{7})(,\s*\d{7})*$/,
    message: "Item codes must be 7-digit numbers separated by commas (e.g., 5702440,1126402)",
    validateSingle: (code) => /^\d{7}$/.test(code)
  },
  france: {
    pattern: /^(\d{3}-\d{4})(,\s*\d{3}-\d{4})*$/,
    message: "Item codes must be in the format 878-0128, 123-4567, etc.",
    validateSingle: (code) => /^\d{3}-\d{4}$/.test(code)
  }
};

export const validators = {
  pageUrl: (value) => {
    const regex = /^(https?:\/\/)?[^\s/$.?#].[^\s]*$/i;
    return !value || regex.test(value) ? null : "Please enter a valid URL";
  },
  
  // Updated items validator that accepts country parameter
  items: (value, country = 'us') => {
    if (!value) return null;
    
    const rules = ITEM_CODE_RULES[country] || ITEM_CODE_RULES.us;
    
    // Remove all whitespace for validation
    const cleanValue = value.replace(/\s/g, '');
    
    // Check overall pattern
    if (!rules.pattern.test(cleanValue)) {
      return rules.message;
    }
    
    // Additional validation: check each individual code
    const codes = cleanValue.split(',');
    const invalidCodes = codes.filter(code => !rules.validateSingle(code));
    
    if (invalidCodes.length > 0) {
      return `Invalid item code(s): ${invalidCodes.join(', ')}. ${rules.message}`;
    }
    
    return null;
  },
  
  promo: (value) => {
    return !value || value.length <= 3 ? null : "Promo codes are typically 3 characters";
  },
  
  jobNumber: (value) => {
    const regex = /^\d{2}[A-Za-z]{2}\d{4}$/;
    return !value || regex.test(value) ? null : "Format: ##LL#### (e.g., 24DS2828)";
  }
};

// Updated validateAllFields to accept country for item code validation
export const validateAllFields = (formData, country = 'us') => {
  const errors = {};
  
  Object.keys(validators).forEach(field => {
    let error;
    
    // Pass country parameter for items validation
    if (field === 'items') {
      error = validators[field](formData[field], country);
    } else {
      error = validators[field](formData[field]);
    }
    
    if (error) {
      errors[field] = error;
    }
  });
  
  return errors;
};

// Helper function to get item code rules for a specific country
export const getItemCodeRules = (country) => {
  return ITEM_CODE_RULES[country] || ITEM_CODE_RULES.us;
};

// Helper function to validate item codes in real-time
export const validateItemCodes = (value, country = 'us') => {
  return validators.items(value, country);
};