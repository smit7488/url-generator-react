import { useState, useCallback } from 'react';
import { validators, validateAllFields } from '../utils/validators';

export const useFormValidation = (initialData) => {
  const [formData, setFormData] = useState(initialData);
  const [errors, setErrors] = useState({});

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Validate on change
    const error = validators[name]?.(value);
    setErrors(prev => ({ ...prev, [name]: error }));
  }, []);

  const validateForm = useCallback(() => {
    const newErrors = validateAllFields(formData);
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  return {
    formData,
    setFormData,
    errors,
    handleInputChange,
    validateForm
  };
};