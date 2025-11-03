import { useCallback } from 'react';

export const useFormType = (setFormData, formData) => {
  const handleFormTypeChange = useCallback((e) => {
    const newFormType = e.target.value;
    setFormData(prev => ({ 
      ...prev, 
      formType: newFormType 
    }));
    
    const defaultUrls = {
      oneweb: 'https://www.henryschein.com/us-en/shopping/products.aspx',
      gep: 'https://www.henryschein.com/en-us/search/'
    };
    
    if (!formData.pageUrl || formData.pageUrl === defaultUrls[formData.formType]) {
      setFormData(prev => ({ 
        ...prev, 
        pageUrl: defaultUrls[newFormType] 
      }));
    }
  }, [setFormData, formData.pageUrl, formData.formType]);

  return { handleFormTypeChange };
};