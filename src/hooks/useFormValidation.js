import { useState, useCallback } from 'react';
import { validators, validateAllFields } from '../utils/validators';

export const useFormValidation = (initialData) => {
  const [formData, setFormData] = useState(initialData);
  const [errors, setErrors] = useState({});

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Get current country for item code validation
    // If we're changing the country, use the new value; otherwise use existing
    const currentCountry = name === 'country' ? value : (formData.country || 'us');
    
    // Validate on change with country parameter for items
    let error;
    if (name === 'items') {
      error = validators[name]?.(value, currentCountry);
    } else if (validators[name]) {
      error = validators[name]?.(value);
    }
    
    setErrors(prev => ({ ...prev, [name]: error }));
  }, [formData.country]);

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