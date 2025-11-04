# URL-GENius: GA4-Tagged URL Generator

A modern, React-based URL generation tool for Henry Schein marketing professionals. URL-GENius streamlines the creation of UTM-tagged URLs for GA4 tracking across multiple marketing channels.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Getting Started](#getting-started)
- [Installation](#installation)
- [Project Structure](#project-structure)
- [Usage Guide](#usage-guide)
- [Component Documentation](#component-documentation)
- [Configuration](#configuration)
- [Troubleshooting](#troubleshooting)
- [Future Enhancements](#future-enhancements)
- [Support](#support)

---

## 🎯 Overview

**URL-GENius** is a GA4-tagged URL generator built with React and Bootstrap. It enables marketing teams to:

- Generate UTM-tagged URLs for GA4 tracking
- Support both OneWeb and GEP platforms
- Create URLs for 11+ marketing channels simultaneously
- Automatically format and validate URLs
- Copy and deploy URLs with a single click

### Key Statistics

- **11+ Marketing Channels** supported (Paid Search, Email, Social, Display Ads, QR Codes, etc.)
- **5 Required Fields** for GA4 tagging (when not using Generic mode)
- **Dynamic Form Validation** with real-time error feedback
- **Mobile Responsive** design for all screen sizes
- **Zero Dependencies** on external URL APIs (runs entirely client-side)

---

## ✨ Features

### Core Functionality

✅ **Dual Platform Support**
- OneWeb (product pages with promo/pricing parameters)
- GEP (search-based URL structure)
- Toggle between platforms with automatic URL switching

✅ **Comprehensive Marketing Channel Coverage**
- Paid Search (Google, Bing)
- Email (Marketo SCS, MKtg with multi-tier CTA support)
- Paid Display Ads (AdRoll, AdAdvance, RichRelevance)
- Social Media (Meta, Twitter, YouTube, LinkedIn)
- QR Codes (Nxtbook, External)
- Trade Publications
- Website Linking Agreements
- Telesales
- Narvar
- Vanity URLs

✅ **Smart Form Features**
- Auto-populate default URLs based on platform selection
- Real-time field validation with helpful error messages
- Optional item code, promo code, and pricing support
- Parse existing tagged URLs and auto-populate form fields
- UTM campaign auto-formatting (Date-Project-JobNumber)

✅ **User Experience**
- One-click copy all URLs
- Individual URL copy buttons with success feedback
- Smooth animations and transitions
- Copy button state changes (Copy → Copied!)
- Mobile-optimized layout with filter panel

✅ **Quality Assurance**
- Input validation for all fields
- Job Number format enforcement (##LL####)
- Item code validation (7-digit numbers)
- URL sanitization to prevent duplicates
- Comprehensive help documentation

---

## 🚀 Getting Started

### Prerequisites

- Node.js 16+ 
- npm or yarn package manager
- React 18+
- Bootstrap 5+

### Quick Start

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd url-generator
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

---

## 📦 Installation

### Dependencies

```json
{
  "react": "^18.0.0",
  "react-dom": "^18.0.0",
  "react-bootstrap": "^2.0.0",
  "bootstrap": "^5.0.0",
  "react-icons": "^4.0.0"
}
```

### Install All Dependencies

```bash
npm install
```

### Optional: Add Specific Dependencies

```bash
# Bootstrap and React Bootstrap
npm install bootstrap react-bootstrap

# Icons
npm install react-icons

# Development dependencies (if needed)
npm install --save-dev vite @vitejs/plugin-react
```

---

## 📁 Project Structure

```
src/
├── components/
│   ├── AppLayout.jsx           # Main layout wrapper
│   ├── AppLayout.css
│   ├── MainContent.jsx         # Content area container
│   ├── MainContent.css
│   ├── Navigation.jsx          # Top navigation bar
│   ├── Navigation.css
│   ├── FormSection.jsx         # Form inputs and fields
│   ├── FormSection.css
│   ├── FilterPanel.jsx         # Channel selection filters
│   ├── FilterPanel.css
│   ├── URLResults.jsx          # Generated URLs display
│   ├── URLResults.css
│   ├── HelpModal.jsx           # Help documentation modal
│   ├── HelpModal.css
│   ├── FormInput.jsx           # Reusable form input components
│   └── Footer.jsx              # Footer with branding
├── hooks/
│   ├── useFormValidation.js    # Form validation logic
│   ├── useURLGenerator.js      # URL generation engine
│   └── useFormType.js          # Form type (OneWeb/GEP) switching
├── data/
│   └── urlCategories.js        # Channel definitions and UTM mappings
├── utils/
│   ├── urlHelpers.js           # URL building and sanitization
│   └── validators.js           # Field validators
├── assets/
│   └── icon.svg                # Henry Schein logo
├── App.jsx                     # Root component
├── App.css
├── index.css
└── main.jsx                    # Entry point
```

---

## 📖 Usage Guide

### Basic Workflow

1. **Select Platform**
   - Use the toggle switch to choose OneWeb or GEP
   - Default URL updates automatically

2. **Enter Base URL** (Required)
   - Paste or use auto-populated URL
   - Tool validates format on input

3. **Fill GA4 Fields** (Required for tagged URLs)
   - **Date**: Campaign launch date (YYYY-MM-DD)
   - **Project**: Campaign name (e.g., CADCAM)
   - **Job Number**: Format ##LL#### (e.g., 24DS2828)
   - **Division**: Select from dropdown (Dental, Medical, etc.)

4. **Add Optional Details**
   - Item codes (7-digit product codes)
   - Promo code (OneWeb only, up to 3 chars)
   - Keyword/description
   - Vanity URL
   - Vendor names (for specific channels)

5. **Select Channels**
   - Check boxes in the Filter Panel for channels you need
   - URLs generate in real-time

6. **Copy URLs**
   - Click "Copy All" to copy everything
   - Or click "Copy" on individual URLs
   - Paste into your campaign tools

### Field Validation

| Field | Format | Example | Required |
|-------|--------|---------|----------|
| Page URL | Valid URL | https://henryschein.com/search/ | Yes |
| Item Codes | 7-digit codes, comma-separated | 5702440,1126402 | No |
| Job Number | ##LL#### | 24DS2828 | GA4 only |
| Promo Code | 1-3 characters | ABC | No |
| Date | YYYY-MM-DD | 2025-01-15 | GA4 only |

### Special Cases

**Generic URLs**
- Generate without GA4 fields
- Useful for quick links or testing
- Still include item codes and promo codes if provided

**Marketo Email Campaigns**
- Requires Marketo Folder Name
- Replaces utm_campaign parameter
- Format: EM-YYYYMMDD-CampaignName-ID-State-Division

**QR Codes**
- Specify QR Code Content (product name)
- Generates utm_content from your input
- Link to [Adobe QR Generator](https://new.express.adobe.com/tools/generate-qr-code)

---

## 🔧 Component Documentation

### App.jsx
**Root component managing global state**

- Initializes form data with defaults
- Manages selected channel groups
- Coordinates URL generation
- Handles copy-to-clipboard functionality

**Key Props:**
- `formData`: Current form values
- `selectedGroups`: Selected channel checkboxes
- `generatedUrls`: Generated URL output

### useURLGenerator Hook
**Core URL generation logic**

```javascript
const { generatedUrls, generateURLs } = useURLGenerator(formData, selectedGroups);
```

**Returns:**
- `generatedUrls`: Array of URL groups by category
- `generateURLs`: Function to trigger URL generation

**Features:**
- Validates required fields before generating
- Handles special cases (Marketo, QR codes, etc.)
- Formats URLs with proper UTM parameters
- Sanitizes output

### useFormValidation Hook
**Form state and validation management**

```javascript
const { formData, errors, handleInputChange, setFormData } = useFormValidation(initialData);
```

**Validates:**
- URL format
- Item code format (7 digits)
- Job Number format (##LL####)
- Promo code length (≤3 chars)

### useFormType Hook
**OneWeb ↔ GEP switching logic**

- Updates form type state
- Manages platform-specific URL defaults
- Triggers URL regeneration on switch

### URLResults Component
**Displays generated URLs with copy functionality**

**Features:**
- Grouped by marketing channel
- Individual and bulk copy buttons
- Copy state animations
- Click-to-copy URL display
- Responsive layout

### HelpModal Component
**Comprehensive documentation modal**

**Includes:**
- 14 detailed FAQs
- Quick start guide
- Marketing channel reference
- Field validation examples
- Best practices
- External GA4 resources

---

## ⚙️ Configuration

### URL Categories
Edit `src/data/urlCategories.js` to:
- Add new marketing channels
- Modify UTM parameters
- Update tier-2 subcategories (e.g., email CTAs)
- Change content UTM values

**Example: Adding a New Channel**
```javascript
{
  category: "New Channel Name",
  key: "NewChannelKey",
  subcategories: [
    {
      name: "Channel Variant",
      key: "NewChannelVariant",
      urls: ["utm_source=NewSource&utm_medium=Channel"],
      contentutm: ["VariantName"]
    }
  ]
}
```

### Form Validation
Edit `src/utils/validators.js` to:
- Add new field validators
- Modify regex patterns
- Change error messages

**Example: Add Custom Validator**
```javascript
export const validators = {
  customField: (value) => {
    return !value || /your-regex/.test(value) 
      ? null 
      : "Your error message";
  }
};
```

### Default Values
Edit initial form data in `App.jsx`:
```javascript
const initialFormData = {
  pageUrl: 'https://www.henryschein.com/en-us/search/',
  formType: 'gep',
  division: 'dental',
  // ... other defaults
};
```

---

## 🐛 Troubleshooting

### URLs Not Generating

**Issue:** URLs section shows "No URLs generated yet"

**Solutions:**
1. ✅ Ensure Page URL is filled
2. ✅ For GA4 URLs, fill all required fields: Date, Project, Job Number, Division
3. ✅ Check at least one channel is selected in Filters
4. ✅ For Email channels, fill Marketo Folder Name
5. ✅ For QR Code channels, fill QR Code Content
6. ✅ Open browser console (F12) to check for errors

### Form Type Switch Not Working

**Issue:** Switching OneWeb/GEP doesn't update URLs

**Solutions:**
1. ✅ Check browser console for errors
2. ✅ Ensure formType is properly updating
3. ✅ Try refreshing the page
4. ✅ Clear browser cache

### Last Character Cut Off

**Issue:** Promo code missing last character in URL

**Solutions:**
1. ✅ Clear form and try again
2. ✅ Ensure promo code is ≤3 characters
3. ✅ Check for trailing spaces in input

### Copy Button Not Working

**Issue:** Copy to clipboard fails

**Solutions:**
1. ✅ Check browser supports clipboard API (all modern browsers)
2. ✅ Ensure HTTPS is used (required for clipboard API)
3. ✅ Try copying individual URLs instead of "Copy All"

### Validation Errors Persist

**Issue:** Error messages won't clear

**Solutions:**
1. ✅ Clear the field completely
2. ✅ Re-enter valid value
3. ✅ Refresh page if error persists

---

## 🔮 Future Enhancements

### Planned Features

- [ ] **URL History**: Save recently generated URLs
- [ ] **Templates**: Save and reuse campaign configurations
- [ ] **Bulk URL Generation**: Upload CSV of campaigns
- [ ] **Analytics Integration**: Direct GA4 dashboard link
- [ ] **URL Preview**: Visual preview of final URLs
- [ ] **Dark Mode**: Theme toggle
- [ ] **Multi-language**: Internationalization support
- [ ] **Advanced Analytics**: Track tool usage patterns
- [ ] **Batch Export**: Export URLs to multiple formats (CSV, JSON)
- [ ] **Custom UTM Parameters**: Add proprietary parameters
- [ ] **Campaign Templates**: Pre-built configurations
- [ ] **Team Collaboration**: Share campaign configurations

### Enhancement Roadmap

**Phase 1 (Near-term)**
- URL history with local storage
- Basic analytics integration

**Phase 2 (Mid-term)**
- Template system
- CSV bulk import
- Dark mode

**Phase 3 (Long-term)**
- Advanced analytics dashboard
- Team collaboration features
- API integration

---

## 📝 Best Practices

### URL Generation

1. **Consistency**: Use same Job Number, Project, Date for all URLs in a campaign
2. **Testing**: Test one URL first before deploying batch
3. **Documentation**: Keep campaign details for future reference
4. **Channel Alignment**: Ensure URL channel matches actual placement
5. **GA4 Monitoring**: Check GA4 dashboard after launch to verify tracking

### Field Entry

1. **Job Numbers**: Follow format strictly (##LL####) for proper analytics
2. **Promo Codes**: Keep concise (1-3 characters)
3. **Project Names**: Use meaningful, consistent naming conventions
4. **Item Codes**: Verify codes before entry
5. **Dates**: Always use campaign launch date for consistency

### Campaign Management

1. Archive old campaigns after completion
2. Review GA4 data regularly
3. Adjust future campaigns based on performance
4. Document any custom parameters used
5. Train team members on tool usage

---

## 🤝 Support

### Getting Help

1. **In-App Help**: Click "Help" in navigation for comprehensive documentation
2. **Field Tooltips**: Hover over labels for field descriptions
3. **Validation Messages**: Read error messages carefully for guidance
4. **GA4 Resources**: Visit [Google Analytics Help Center](https://support.google.com/analytics/answer/10917952)

### Reporting Issues

When reporting bugs, include:
- Steps to reproduce
- Expected vs. actual behavior
- Browser and OS information
- Console error messages (F12 → Console)
- Screenshots if applicable

### Feature Requests

Submit feature requests with:
- Use case description
- Expected user benefit
- Proposed implementation (if applicable)
- Priority level (High/Medium/Low)

---

## 📄 License

Henry Schein Internal Use Only

---

## 👥 Contributors

- **Original HTML Version**: Trevor Smith
- **React Conversion & Enhancement**: Trevor Smith
- **Design & UX**: Trevor Smith

---


## 🗺️ Changelog

### Version 2.0.0 (Current - React)
- ✨ Complete React rewrite
- ✨ Improved mobile responsiveness
- ✨ New Help modal with 14 FAQs
- ✨ Enhanced animations and UX
- ✨ Better form validation
- ✨ Streamlined navigation
- 🐛 Fixed copy button animations
- 🐛 Fixed form type switching
- 🐛 Fixed promo code truncation

### Version 1.0.0 (Legacy - HTML)
- Original HTML/jQuery implementation
- Core URL generation functionality
- Basic channel support
- Manual validation

---

## 📚 Additional Resources

### GA4 Documentation
- [UTM Parameters Guide](https://support.google.com/analytics/answer/10917952)
- [GA4 Setup Guide](https://support.google.com/analytics/answer/9304153)
- [GA4 Reports](https://support.google.com/analytics/answer/10337382)

### React Documentation
- [React Hooks](https://react.dev/reference/react)
- [React Bootstrap](https://react-bootstrap.github.io/)
- [Bootstrap Documentation](https://getbootstrap.com/docs/)

### Related Tools
- [Google URL Builder](https://ga-dev-tools.web.app/ga4/campaign-url-builder/)



---

**Last Updated**: January 2025
**Current Version**: 2.0.0