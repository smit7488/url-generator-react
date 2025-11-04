# URL-GENius: GA4-Tagged URL Generator

A modern, React-based URL generation tool for Henry Schein marketing professionals. URL-GENius streamlines the creation of UTM-tagged URLs for GA4 tracking across multiple marketing channels.

![Version](https://img.shields.io/badge/URL--GENius-v2.0.0-blue)
![React](https://img.shields.io/badge/React-18.2.0-61dafb)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5.2.0-7952b3)
![Vite](https://img.shields.io/badge/Vite-4.4.5-646cff)

---

<details>
<summary>Overview</summary>

**URL-GENius** is a GA4-tagged URL generator built with React and Bootstrap. It allows marketing teams to:

* Generate UTM-tagged URLs for GA4 tracking
* Support both OneWeb and GEP platforms
* Create URLs for 11+ marketing channels simultaneously
* Automatically format and validate URLs
* Copy and deploy URLs with a single click

### Key Statistics

* **11+ Marketing Channels** supported (Paid Search, Email, Social, Display Ads, QR Codes, etc.)
* **5 Required Fields** for GA4 tagging (when not using Generic mode)
* **Dynamic Form Validation** with real-time error feedback
* **Mobile Responsive** design
* **Runs Entirely Client-Side** (no external URL APIs required)

</details>

<details>
<summary>Features</summary>

### Core Functionality

**Dual Platform Support**

* OneWeb (product pages with promo/pricing parameters)
* GEP (search-based URL structure)
* Toggle between platforms with automatic URL switching

**Comprehensive Marketing Channel Coverage**

* Paid Search (Google, Bing)
* Email (Marketo SCS, MKtg with multi-tier CTA support)
* Paid Display Ads (AdRoll, AdAdvance, RichRelevance)
* Social Media (Meta, Twitter, YouTube, LinkedIn)
* QR Codes (Nxtbook, External)
* Trade Publications
* Website Linking Agreements
* Telesales
* Narvar
* Vanity URLs

**Smart Form Features**

* Auto-populate default URLs based on platform selection
* Real-time field validation with helpful error messages
* Optional item code, promo code, and pricing support
* Parse existing tagged URLs and auto-populate form fields
* UTM campaign auto-formatting (Date-Project-JobNumber)

**User Experience**

* One-click copy all URLs
* Individual URL copy buttons with success feedback
* Smooth animations and transitions
* Mobile-optimized layout with filter panel

**Quality Assurance**

* Input validation for all fields
* Job Number format enforcement (##LL####)
* Item code validation (7-digit numbers)
* URL sanitization to prevent duplicates
* Comprehensive help documentation

</details>

<details>
<summary>Getting Started</summary>

### Prerequisites

* Node.js 16+
* npm or yarn
* React 18+
* Bootstrap 5+

### Quick Start

```bash
git clone <repository-url>
cd url-generator
npm install
npm run dev
```

Open your browser at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

</details>

<details>
<summary>Installation</summary>

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

### Optional Dependencies

```bash
npm install bootstrap react-bootstrap
npm install react-icons
npm install --save-dev vite @vitejs/plugin-react
```

</details>

<details>
<summary>Project Structure</summary>

```
src/
├── components/
│   ├── AppLayout.jsx
│   ├── AppLayout.css
│   ├── MainContent.jsx
│   ├── MainContent.css
│   ├── Navigation.jsx
│   ├── Navigation.css
│   ├── FormSection.jsx
│   ├── FormSection.css
│   ├── FilterPanel.jsx
│   ├── FilterPanel.css
│   ├── URLResults.jsx
│   ├── URLResults.css
│   ├── HelpModal.jsx
│   ├── HelpModal.css
│   ├── FormInput.jsx
│   └── Footer.jsx
├── hooks/
│   ├── useFormValidation.js
│   ├── useURLGenerator.js
│   └── useFormType.js
├── data/
│   └── urlCategories.js
├── utils/
│   ├── urlHelpers.js
│   └── validators.js
├── assets/
│   └── icon.svg
├── App.jsx
├── App.css
├── index.css
└── main.jsx
```

</details>

<details>
<summary>Usage Guide</summary>

### Basic Workflow

1. Select Platform (OneWeb or GEP)
2. Enter Base URL
3. Fill GA4 Fields (Date, Project, Job Number, Division)
4. Add optional item codes, promo codes, vanity URLs
5. Select Channels
6. Copy URLs individually or all at once

### Field Validation

| Field      | Format        | Example                                                            | Required |
| ---------- | ------------- | ------------------------------------------------------------------ | -------- |
| Page URL   | Valid URL     | [https://henryschein.com/search/](https://henryschein.com/search/) | Yes      |
| Item Codes | 7-digit codes | 5702440,1126402                                                    | No       |
| Job Number | ##LL####      | 24DS2828                                                           | GA4 only |
| Promo Code | 1-3 chars     | ABC                                                                | No       |
| Date       | YYYY-MM-DD    | 2025-01-15                                                         | GA4 only |

</details>

<details>
<summary>Component Documentation</summary>

### App.jsx

* Root component managing global state
* Initializes form data, selected channels
* Coordinates URL generation
* Handles copy-to-clipboard

### useURLGenerator Hook

* Core URL generation logic
* Validates fields, handles special cases, formats URLs
* Returns `generatedUrls` array and `generateURLs` function

### useFormValidation Hook

* Manages form state and validation
* Validates URL, item codes, job numbers, promo codes

### useFormType Hook

* Handles OneWeb ↔ GEP switching
* Updates defaults and regenerates URLs

### URLResults Component

* Displays generated URLs grouped by channel
* Supports individual and bulk copy
* Responsive layout

### HelpModal Component

* Comprehensive documentation modal
* Includes 14 FAQs, quick start, field validation examples

</details>

<details>
<summary>Configuration</summary>

* Edit `src/data/urlCategories.js` to add channels or modify UTM parameters
* Edit `src/utils/validators.js` to add or change field validators
* Set default form values in `App.jsx`

</details>

<details>
<summary>Troubleshooting</summary>

* URLs not generating → Check required fields and selected channels
* Form type switch not updating → Ensure `formType` state changes
* Copy button not working → Ensure HTTPS and modern browser support
* Validation errors → Clear and re-enter fields, refresh page

</details>

<details>
<summary>Future Enhancements</summary>

* URL History with local storage
* Templates for campaign reuse
* Bulk URL generation via CSV
* Analytics integration with GA4
* Dark Mode toggle
* Multi-language support
* Batch export (CSV, JSON)
* Team collaboration features

</details>

<details>
<summary>Support</summary>

* In-app help modal
* Field tooltips
* Validation messages
* GA4 resources: [Google Analytics Help Center](https://support.google.com/analytics/answer/10917952)
* Report bugs with steps to reproduce, browser info, and screenshots

</details>

<details>
<summary>License & Contributors</summary>

* Henry Schein Internal Use Only
* **Original HTML Version:** Trevor Smith
* **React Conversion & Enhancement:** Trevor Smith
* **Design & UX:** Trevor Smith

</details>

<details>
<summary>Changelog</summary>

### Version 2.0.0 (React)

* Complete React rewrite
* Improved mobile responsiveness
* New Help modal with 14 FAQs
* Enhanced animations and UX
* Better form validation
* Streamlined navigation
* Fixed copy button animations
* Fixed form type switching
* Fixed promo code truncation

### Version 1.0.0 (Legacy HTML)

* Original HTML/jQuery implementation
* Core URL generation functionality
* Basic channel support
* Manual validation

</details>

<div align="center">
URL-GENius - Generate GA4-tagged URLs efficiently.  
Built with React and Bootstrap
</div>
