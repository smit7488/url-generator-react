import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { useFormValidation } from './hooks/useFormValidation';
import { useURLGenerator } from './hooks/useURLGenerator';
import { useFormType } from './hooks/useFormType';
import { urlCategories } from './data/urlCategories';
import AppLayout from './components/AppLayout';

const App = () => {
  const { formData, errors, handleInputChange, setFormData } = useFormValidation({
    pageUrl: '',
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
  });

  const [selectedGroups, setSelectedGroups] = useState({
    Generic: true,
    PaidDisplayAdsAdRoll: true,
    PaidDisplayAdsAdAdvance: true,
    PaidDisplayAdsRichRelevance: true,
    SocialMeta: true,
    SocialTwitter: true,
    SocialYouTube: true,
    SocialLinkedIn: true
  });

  

  const [showUpdates, setShowUpdates] = useState(false);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const { generatedUrls } = useURLGenerator(formData, selectedGroups);
  const { handleFormTypeChange } = useFormType(setFormData, formData);

  const handleCheckboxChange = (key) => {
    setSelectedGroups(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const copyAllURLs = () => {
    const text = generatedUrls.map(group => 
      `${group.category}\n${group.urls.map(u => `${u.name}: ${u.url}`).join('\n')}`
    ).join('\n\n');
    navigator.clipboard.writeText(text);
    alert('Content copied to clipboard!');
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
        handleInputChange={(e) => {
          if (e.target.name === 'formType') {
            handleFormTypeChange(e);
          } else {
            handleInputChange(e);
          }
        }}
        generatedUrls={generatedUrls}
        onCopyAll={copyAllURLs}
        isFormValid={isFormValid}
        showUpdates={showUpdates}
        onToggleUpdates={() => setShowUpdates(!showUpdates)}
        showMobileFilters={showMobileFilters}
        onToggleMobileFilters={toggleMobileFilters}
      />


    </div>
  );
};

export default App;