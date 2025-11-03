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
      { name: "Google", key: "PaidSearchAdsGoogle", urls: ["utm_source=Google&utm_medium=CPC"], contentutm: ["PaidSearchGoogle"] },
      { name: "Bing", key: "PaidSearchAdsBing", urls: ["utm_source=Bing&utm_medium=CPC"], contentutm: ["PaidSearchBing"] }
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
        urls: ["utm_source=MarketoSCS&utm_medium=Email"],
        tier2: [
          { name: "HS Logo", key: "MarketoSCSHenryScheinLogo", urls: ["utm_source=MarketoSCS&utm_medium=Email"], contentutm: ["Logo"] },
          { name: "Shop Button", key: "MarketoSCSShopButton", urls: ["utm_source=MarketoSCS&utm_medium=Email"], contentutm: ["Shop"] },
          { name: "Account Button", key: "MarketoSCSAccountButton", urls: ["utm_source=MarketoSCS&utm_medium=Email"], contentutm: ["Account"] },
          { name: "Hero Partner Image", key: "MarketoSCSHeroPartnerImage", urls: ["utm_source=MarketoSCS&utm_medium=Email"], contentutm: ["HeaderImage"] },
          { name: "Main CTA", key: "MarketoSCSMainCTA", urls: ["utm_source=MarketoSCS&utm_medium=Email"], contentutm: ["CTA"] },
          { name: "Supplies", key: "MarketoSCSSupplies", urls: ["utm_source=MarketoSCS&utm_medium=Email"], contentutm: ["Supplies"] },
          { name: "Repair Solutions", key: "MarketoSCSRepairSolutions", urls: ["utm_source=MarketoSCS&utm_medium=Email"], contentutm: ["RepairSolutions"] },
          { name: "Featured Offers", key: "MarketoSCSFeaturedOffers", urls: ["utm_source=MarketoSCS&utm_medium=Email"], contentutm: ["FeaturedOffers"] },
          { name: "Help", key: "MarketoSCSHelp", urls: ["utm_source=MarketoSCS&utm_medium=Email"], contentutm: ["Help"] }
        ]
      },
      { name: "MarketoMktg", key: "EmailMarketoMktg", urls: ["utm_source=MarketoMktg&utm_medium=Email"], contentutm: ["MarketoMktg"] }
    ]
  },
  {
    category: "Email Featured Banner",
    key: "EmailFeaturedBanner",
    requiresMarketo: true,
    subcategories: [
      { name: "MarketoSCS", key: "EmailFeaturedBannerMarketoSCSFeaturedBanner", urls: ["utm_source=MarketoSCS&utm_medium=Email"], contentutm: ["EmailFeaturedBanner"] },
      { name: "MarketoMktg", key: "EmailFeaturedBannerMarketoMktgFeaturedBanner", urls: ["utm_source=MarketoMktg&utm_medium=Email"], contentutm: ["EmailFeaturedBanner"] }
    ]
  },
  {
    category: "Paid Display Ads",
    key: "PaidDisplayAds",
    subcategories: [
      { name: "AdRoll", key: "PaidDisplayAdsAdRoll", urls: ["utm_source=AdRoll&utm_medium=Display"], contentutm: ["AdRollBanner"] },
      { name: "AdAdvance", key: "PaidDisplayAdsAdAdvance", urls: ["utm_source=AdAdvance&utm_medium=Display"], contentutm: ["AdAdvanceBanner"] },
      { name: "RichRelevance", key: "PaidDisplayAdsRichRelevance", urls: ["utm_source=RichRelevance&utm_medium=Display"], contentutm: ["RichRelevanceBanner"] }
    ]
  },
  {
    category: "Narvar",
    key: "Narvar",
    subcategories: [
      { name: "Website", key: "NarvarWebsite", urls: ["utm_source=Narvar&utm_medium=Website"], contentutm: ["NarvarBannerWebsite"] },
      { name: "Email", key: "NarvarEmail", urls: ["utm_source=Narvar&utm_medium=Email"], contentutm: ["NarvarBannerEmail"] }
    ]
  },
  {
    category: "Social",
    key: "Social",
    subcategories: [
      { name: "Meta", key: "SocialMeta", urls: ["utm_source=Meta&utm_medium=Social"], contentutm: ["SocialBannerMeta"] },
      { name: "Twitter", key: "SocialTwitter", urls: ["utm_source=Twitter&utm_medium=Social"], contentutm: ["SocialBannerTwitter"] },
      { name: "YouTube", key: "SocialYouTube", urls: ["utm_source=YouTube&utm_medium=Social"], contentutm: ["SocialBannerYouTube"] },
      { name: "LinkedIn", key: "SocialLinkedIn", urls: ["utm_source=LinkedIn&utm_medium=Social"], contentutm: ["SocialBannerLinkedIn"] }
    ]
  },
  {
    category: "Website Linking Agreement",
    key: "WebsiteLinkingAgreement",
    requiresVendorName: true,
    subcategories: [
      { name: "Website Linking Agreement", key: "WebsiteLinkingAgreement", urls: ["utm_medium=Referral"] }
    ]
  },
  {
    category: "Trade Publication",
    key: "TradePublication",
    requiresTradePub: true,
    subcategories: [
      { name: "Email", key: "TradePublicationEmail", urls: ["&utm_medium=Email"] },
      { name: "Website", key: "TradePublicationWebsite", urls: ["&utm_medium=Website"] }
    ]
  },
  {
    category: "Vanity URLs",
    key: "VanityURLs",
    subcategories: [
      { name: "External", key: "VanityURLs", urls: ["utm_source=External&utm_medium=VanityURL"], contentutm: ["VanityURL"] }
    ]
  },
  {
    category: "QR Code",
    key: "QRCode",
    requiresQRContent: true,
    subcategories: [
      { name: "Nxtbook", key: "QRCodeNxtBook", urls: ["utm_source=Nxtbook&utm_medium=QRCode"] },
      { name: "External", key: "QRCodeExternal", urls: ["utm_source=External&utm_medium=QRCode"] }
    ]
  },
  {
    category: "Telesales",
    key: "Telesales",
    subcategories: [
      { name: "Telesales", key: "Telesales", urls: ["utm_source=Telesales&utm_medium=Phone"], contentutm: ["TelesalesLink"] }
    ]
  }
];