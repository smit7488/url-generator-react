import { useState, useCallback } from 'react';
import { validators, validateAllFields } from '../utils/validators';

export const useFormValidation = (initialData) => {
  const [formData, setFormData] = useState(initialData);
  const [errors, setErrors] = useState({});

const handleInputChange = useCallback((e) => {
  const { name, value } = e.target;
  setFormData(prev => ({ ...prev, [name]: value }));

  const currentCountry = name === 'country' ? value : (formData.country || 'us');

  let error;
  if (name === 'items') {
    error = validators['items']?.(value, currentCountry);
  } else if (validators[name]) {
    error = validators[name]?.(value);
  }

  // When country changes, re-validate existing items value against the new country
  if (name === 'country' && formData.items) {
    const itemsError = validators['items']?.(formData.items, value);
    setErrors(prev => ({ ...prev, [name]: error, items: itemsError }));
  } else {
    setErrors(prev => ({ ...prev, [name]: error }));
  }
}, [formData.country, formData.items]);

  const validateForm = useCallback(() => {
    const currentCountry = formData.country || 'us';
    const newErrors = validateAllFields(formData, currentCountry);
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  // Enhanced function to remove spaces and add commas as delimiters
  const removeSpacesFromItems = useCallback(() => {
    const currentItems = formData.items || '';
    
    if (!currentItems.trim()) {
      return '';
    }

    let cleanedItems = currentItems.trim();
    
    // Check if commas already exist
    const hasCommas = cleanedItems.includes(',');
    
    if (hasCommas) {
      // If commas exist, just remove spaces around them
      cleanedItems = cleanedItems
        .replace(/\s*,\s*/g, ',')  // Remove spaces around commas
        .replace(/,+/g, ',')        // Replace multiple commas with single comma
        .replace(/^,|,$/g, '');     // Remove leading/trailing commas
    } else {
      // If no commas, replace spaces with commas
      cleanedItems = cleanedItems
        .replace(/\s+/g, ',')       // Replace one or more spaces with a comma
        .replace(/,+/g, ',')        // Replace multiple consecutive commas with single comma
        .replace(/^,|,$/g, '');     // Remove leading/trailing commas
    }
    
    setFormData(prev => ({ ...prev, items: cleanedItems }));
    
    // Revalidate after cleaning
    const currentCountry = formData.country || 'us';
    const error = validators.items?.(cleanedItems, currentCountry);
    setErrors(prev => ({ ...prev, items: error }));
    
    return cleanedItems;
  }, [formData.items, formData.country]);

  return {
    formData,
    setFormData,
    errors,
    handleInputChange,
    validateForm,
    removeSpacesFromItems
  };
};