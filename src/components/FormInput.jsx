import React from 'react';

const FormInput = ({ label, name, value, onChange, error, helpText, type = "text", required = false, className = "mb-3" }) => (
  <div className={className}>
    <label className="form-label fw-bold text-primary-dark">
      {required && '*'}{label}:
    </label>
    <input
      type={type}
      className={`form-control ${error ? 'is-invalid' : ''}`}
      name={name}
      value={value}
      onChange={onChange}
    />
    {error && <div className="invalid-feedback">{error}</div>}
    {helpText && <small className="form-text text-muted d-block mt-1">{helpText}</small>}
  </div>
);

export const SelectInput = ({ label, name, value, onChange, options, required = false, className = "" }) => (
  <div className={className}>
    <label className="form-label fw-bold text-primary-dark">
      {required && '*'}{label}
    </label>
    <select className="form-select" name={name} value={value} onChange={onChange}>
      {options.map(opt => (
        <option key={opt.value} value={opt.value}>{opt.label}</option>
      ))}
    </select>
  </div>
);

export default FormInput;