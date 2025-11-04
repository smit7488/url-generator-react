import { useCallback } from 'react';

export const useFormType = (setFormData, generateURLs) => {
  const handleFormTypeChange = useCallback((e) => {
    const newFormType = e.target.value;
    
    const defaultUrls = {
      oneweb: 'https://www.henryschein.com/us-en/shopping/products.aspx',
      gep: 'https://www.henryschein.com/en-us/search/'
    };

    // Update form data with new form type and URL
    setFormData(prev => {
      const shouldUpdateUrl = !prev.pageUrl || prev.pageUrl === defaultUrls[prev.formType];
      
      return { 
        ...prev, 
        formType: newFormType,
        pageUrl: shouldUpdateUrl ? defaultUrls[newFormType] : prev.pageUrl
      };
    });

    // Generate URLs immediately after state update
    // Note: This will trigger via the useEffect dependency on formData in useURLGenerator
  }, [setFormData]);

  return { handleFormTypeChange };
};