import React from 'react';

const FilterCheckbox = ({ checked, onChange, label, indent = 0 }) => (
  <div className={`form-check filter-checkbox-indent-${indent}`}>
    <input
      className="form-check-input"
      type="checkbox"
      checked={checked}
      onChange={onChange}
      id={`filter-${label.replace(/\s+/g, '-')}`}
    />
    <label 
      className={`form-check-label filter-label-size-${indent}`}
      htmlFor={`filter-${label.replace(/\s+/g, '-')}`}
    >
      {label}
    </label>
  </div>
);

const FilterCategory = ({ group, selectedGroups, onCheckboxChange }) => (
  <div className="filter-category">
    <div className="filter-category-title">
      {group.category}
    </div>
    {group.subcategories.map(sub => (
      <div key={sub.key} className="ms-2">
        <FilterCheckbox
          checked={!!selectedGroups[sub.key]}
          onChange={() => onCheckboxChange(sub.key)}
          label={sub.name}
          indent={0}
        />
        {sub.tier2 && selectedGroups[sub.key] && (
          <div className="ms-3">
            {sub.tier2.map(tier => (
              <FilterCheckbox
                key={tier.key}
                checked={!!selectedGroups[tier.key]}
                onChange={() => onCheckboxChange(tier.key)}
                label={tier.name}
                indent={1}
              />
            ))}
          </div>
        )}
      </div>
    ))}
  </div>
);

const FilterPanel = ({ categories, selectedGroups, onCheckboxChange }) => (
  <div className="filter-panel">
    <div className="filter-panel-body">
      {categories.map(group => (
        <FilterCategory
          key={group.key}
          group={group}
          selectedGroups={selectedGroups}
          onCheckboxChange={onCheckboxChange}
        />
      ))}
    </div>
  </div>
);

export default FilterPanel;