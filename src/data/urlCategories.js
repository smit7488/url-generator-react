export const urlCategories = [
  {
    category: "Generic (Untagged)",
    key: "Generic",
    subcategories: [
      { name: "Generic Url", key: "Generic", urls: [""], contentutm: [""] }
    ]
  },
  {
    category: "Paid Search Ads",
    key: "PaidSearchAds",
    subcategories: [
      { name: "Google", key: "PaidSearchAdsGoogle", urls: ["utm_source=google&utm_medium=cpc"], contentutm: ["paidsearchgoogle"] },
      { name: "Bing", key: "PaidSearchAdsBing", urls: ["utm_source=bing&utm_medium=cpc"], contentutm: ["paidsearchbing"] }
    ]
  },
  {
    category: "Email",
    key: "Email",
    requiresMarketo: true,
    subcategories: [
      {
        name: "MarketoSCS",
        key: "EmailMarketoSCS",
        urls: ["utm_source=marketoscs&utm_medium=email"],
        tier2: [
          { name: "HS Logo", key: "MarketoSCSHenryScheinLogo", urls: ["utm_source=marketoscs&utm_medium=email"], contentutm: ["logo"] },
          { name: "Shop Button", key: "MarketoSCSShopButton", urls: ["utm_source=marketoscs&utm_medium=email"], contentutm: ["shop"] },
          { name: "Account Button", key: "MarketoSCSAccountButton", urls: ["utm_source=marketoscs&utm_medium=email"], contentutm: ["account"] },
          { name: "Hero Partner Image", key: "MarketoSCSHeroPartnerImage", urls: ["utm_source=marketoscs&utm_medium=email"], contentutm: ["headerimage"] },
          { name: "Main CTA", key: "MarketoSCSMainCTA", urls: ["utm_source=marketoscs&utm_medium=email"], contentutm: ["cta"] },
          { name: "Supplies", key: "MarketoSCSSupplies", urls: ["utm_source=marketoscs&utm_medium=email"], contentutm: ["supplies"] },
          { name: "Repair Solutions", key: "MarketoSCSRepairSolutions", urls: ["utm_source=marketoscs&utm_medium=email"], contentutm: ["repairsolutions"] },
          { name: "Featured Offers", key: "MarketoSCSFeaturedOffers", urls: ["utm_source=marketoscs&utm_medium=email"], contentutm: ["featuredoffers"] },
          { name: "Help", key: "MarketoSCSHelp", urls: ["utm_source=marketoscs&utm_medium=email"], contentutm: ["help"] }
        ]
      },
      { name: "MarketoMktg", key: "EmailMarketoMktg", urls: ["utm_source=marketomktg&utm_medium=email"], contentutm: ["marketomktg"] }
    ]
  },
  {
    category: "Email Featured Banner",
    key: "EmailFeaturedBanner",
    requiresMarketo: true,
    subcategories: [
      { name: "MarketoSCS", key: "EmailFeaturedBannerMarketoSCSFeaturedBanner", urls: ["utm_source=marketoscs&utm_medium=email"], contentutm: ["emailfeaturedbanner"] },
      { name: "MarketoMktg", key: "EmailFeaturedBannerMarketoMktgFeaturedBanner", urls: ["utm_source=marketomktg&utm_medium=email"], contentutm: ["emailfeaturedbanner"] }
    ]
  },
  {
    category: "Paid Display Ads",
    key: "PaidDisplayAds",
    subcategories: [
      { name: "AdRoll", key: "PaidDisplayAdsAdRoll", urls: ["utm_source=adroll&utm_medium=display"], contentutm: ["adrollbanner"] },
      { name: "AdAdvance", key: "PaidDisplayAdsAdAdvance", urls: ["utm_source=adadvance&utm_medium=display"], contentutm: ["adadvancebanner"] },
      { name: "RichRelevance", key: "PaidDisplayAdsRichRelevance", urls: ["utm_source=richrelevance&utm_medium=display"], contentutm: ["richrelevancebanner"] }
    ]
  },
  {
    category: "Narvar",
    key: "Narvar",
    subcategories: [
      { name: "Website", key: "NarvarWebsite", urls: ["utm_source=narvar&utm_medium=website"], contentutm: ["narvarbannnerwebsite"] },
      { name: "Email", key: "NarvarEmail", urls: ["utm_source=narvar&utm_medium=email"], contentutm: ["narvarbanneremail"] }
    ]
  },
  {
    category: "Social",
    key: "Social",
    subcategories: [
      { name: "Meta", key: "SocialMeta", urls: ["utm_source=meta&utm_medium=social"], contentutm: ["socialbannermeta"] },
      { name: "Twitter", key: "SocialTwitter", urls: ["utm_source=twitter&utm_medium=social"], contentutm: ["socialbannertwitter"] },
      { name: "YouTube", key: "SocialYouTube", urls: ["utm_source=youtube&utm_medium=social"], contentutm: ["socialbanneryoutube"] },
      { name: "LinkedIn", key: "SocialLinkedIn", urls: ["utm_source=linkedin&utm_medium=social"], contentutm: ["socialbannerlinkedin"] }
    ]
  },
  {
    category: "Website Linking Agreement",
    key: "WebsiteLinkingAgreement",
    requiresVendorName: true,
    subcategories: [
      { name: "Website Linking Agreement", key: "WebsiteLinkingAgreement", urls: ["utm_medium=referral"] }
    ]
  },
  {
    category: "Trade Publication",
    key: "TradePublication",
    requiresTradePub: true,
    subcategories: [
      { name: "Email", key: "TradePublicationEmail", urls: ["&utm_medium=email"] },
      { name: "Website", key: "TradePublicationWebsite", urls: ["&utm_medium=website"] }
    ]
  },
  {
    category: "Vanity URLs",
    key: "VanityURLs",
    requiresVanityURL: true,
    subcategories: [
      { name: "External", key: "VanityURLs", urls: ["utm_source=external&utm_medium=vanityurl"], contentutm: ["vanityurl"] }
    ]
  },
  {
    category: "QR Code",
    key: "QRCode",
    requiresQRContent: true,
    subcategories: [
      { name: "Nxtbook", key: "QRCodeNxtBook", urls: ["utm_source=nxtbook&utm_medium=qrcode"] },
      { name: "External", key: "QRCodeExternal", urls: ["utm_source=external&utm_medium=qrcode"] }
    ]
  },
  {
    category: "Telesales",
    key: "Telesales",
    subcategories: [
      { name: "Telesales", key: "Telesales", urls: ["utm_source=telesales&utm_medium=phone"], contentutm: ["telesaleslink"] }
    ]
  }
];