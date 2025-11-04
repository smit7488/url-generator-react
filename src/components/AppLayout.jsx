import MainContent from './MainContent';
import FilterPanel from './FilterPanel';
import './AppLayout.css';

const AppLayout = ({ 
  categories, 
  selectedGroups, 
  onCheckboxChange, 
  formData, 
  errors, 
  handleInputChange, 
  generatedUrls, 
  onCopyAll, 
  isFormValid,
  showMobileFilters,
  onToggleMobileFilters 
}) => {
  return (
    <div className="app-main-wrapper">
      {/* Mobile Filter Overlay */}
      {showMobileFilters && (
        <div 
          className="mobile-filter-overlay"
          onClick={onToggleMobileFilters}
        ></div>
      )}
      
      {/* Filter Column - Fixed on desktop, slide-out on mobile */}
      <div className={`filter-column border-right ${showMobileFilters ? 'mobile-filter-open' : ''}`}>
        {/* Desktop Filter Header - Always Visible */}
        <div className="filter-header-desktop d-none d-lg-block">
          <h5 className="mb-0">Filters</h5>
        </div>
        
        {/* Mobile Filter Header */}
        <div className="filter-header-mobile d-lg-none">
          <h5 className="mb-0">Filters</h5>
          <button 
            className="btn-close" 
            onClick={onToggleMobileFilters}
            aria-label="Close filters"
          ></button>
        </div>
        
        <FilterPanel
          categories={categories}
          selectedGroups={selectedGroups}
          onCheckboxChange={onCheckboxChange}
        />
      </div>
      
      {/* Right Column with Main Content */}
      <div className="right-column">
        <MainContent
          formData={formData}
          errors={errors}
          handleInputChange={handleInputChange}
          selectedGroups={selectedGroups}
          generatedUrls={generatedUrls}
          onCopyAll={onCopyAll}
          isFormValid={isFormValid}
          onToggleMobileFilters={onToggleMobileFilters}
        />
      </div>

 
    </div>
  );
};

export default AppLayout;