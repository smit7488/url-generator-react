import React, { useState, useEffect, useCallback } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useFormValidation } from './hooks/useFormValidation';
import { useURLGenerator } from './hooks/useURLGenerator';
import { useFormType } from './hooks/useFormType';
import { urlCategories } from './data/urlCategories';
import AppLayout from './components/AppLayout';
import './App.css';
import './index.css';

const App = () => {
  const initialFormData = {
    pageUrl: 'https://www.henryschein.com/en-us/search/', // Default GEP URL
    items: '',
    promo: '',
    date: '',
    project: '',
    jobNumber: '',
    keyword: '',
    division: 'dental',
    pricing: 'dp=false',
    vanity: '',
    webLinkVendorName: '',
    tradePublicationName: '',
    tradePublicationLink: '',
    marketoFolderName: '',
    qrCodeContent: '',
    formType: 'gep'
  };

  const { formData, errors, handleInputChange, setFormData } = useFormValidation(initialFormData);

  const [selectedGroups, setSelectedGroups] = useState({
    Generic: true,
    PaidDisplayAdsAdRoll: true,
    SocialMeta: true,
    SocialTwitter: true
  });

  const hasRequiredUTMFields = formData.date && formData.project && formData.jobNumber && formData.division;
  const showTaggedURLs = !selectedGroups.Generic && hasRequiredUTMFields;

  const [showUpdates, setShowUpdates] = useState(false);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const { generatedUrls, generateURLs } = useURLGenerator(formData, selectedGroups);
  
  const { handleFormTypeChange } = useFormType(setFormData, generateURLs);

  // Generate URLs on component mount and whenever dependencies change
  useEffect(() => {
    generateURLs();
  }, [generateURLs]);

  const enhancedHandleInputChange = useCallback((e) => {
    if (e.target.name === 'formType') {
      handleFormTypeChange(e);
    } else {
      handleInputChange(e);
    }
  }, [handleInputChange, handleFormTypeChange]);

  const handleCheckboxChange = useCallback((key) => {
    setSelectedGroups(prev => {
      return { ...prev, [key]: !prev[key] };
    });
  }, []);

  const copyAllURLs = () => {
    if (generatedUrls.length === 0) {
      alert('No URLs to copy!');
      return;
    }
    
    const text = generatedUrls.map(group => 
      `${group.category}\n${group.urls.map(u => `${u.name}: ${u.url}`).join('\n')}`
    ).join('\n\n');
    
    navigator.clipboard.writeText(text).then(() => {
      alert('All URLs copied to clipboard!');
    }).catch(err => {
      console.error('Failed to copy:', err);
      alert('Failed to copy URLs');
    });
  };

  const isFormValid = formData.pageUrl && (
    selectedGroups.Generic || (
      formData.date && 
      formData.project && 
      formData.jobNumber && 
      formData.division
    )
  );

  const toggleMobileFilters = () => {
    setShowMobileFilters(!showMobileFilters);
  };

  return (
    <div className="app-container">
      <AppLayout
        categories={urlCategories}
        selectedGroups={selectedGroups}
        onCheckboxChange={handleCheckboxChange}
        formData={formData}
        errors={errors}
        handleInputChange={enhancedHandleInputChange}
        generatedUrls={generatedUrls}
        onCopyAll={copyAllURLs}
        isFormValid={isFormValid}
        showUpdates={showUpdates}
        onToggleUpdates={() => setShowUpdates(!showUpdates)}
        showMobileFilters={showMobileFilters}
        onToggleMobileFilters={toggleMobileFilters}
        showTaggedURLs={showTaggedURLs}
        hasRequiredUTMFields={hasRequiredUTMFields}
      />
    </div>
  );
};

export default App;