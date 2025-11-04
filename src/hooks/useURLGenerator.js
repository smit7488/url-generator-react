import { useState, useCallback } from 'react';
import { urlCategories } from '../data/urlCategories';
import { buildURL } from '../utils/urlHelpers';

export const useURLGenerator = (formData, selectedGroups) => {
  const [generatedUrls, setGeneratedUrls] = useState([]);

  const generateURLs = useCallback(() => {
    if (!formData.pageUrl) {
      setGeneratedUrls([]);
      return;
    }

    const urls = [];
    const baseUrl = formData.pageUrl.trim();
    const items = formData.items.trim().replace(/\s/g, '');
    const promo = formData.promo.trim().toUpperCase();
    const date = formData.date.replace(/-/g, '');
    const project = formData.project.trim().replace(/\s/g, '');
    const jobNumber = formData.jobNumber.trim().replace(/\s/g, '').toUpperCase();
    const division = formData.division;
    const pricing = formData.pricing;
    const vanity = formData.vanity.split('/').pop() || '';
    const dateProjectJob = `utm_campaign=${date}-${project}-${jobNumber}`;
    const isHenrySchein = baseUrl.includes('henryschein');
    const formType = formData.formType;

    // Check if we have minimum required fields for tagged URLs
    const hasRequiredUTMFields = date && project && jobNumber && division;

    urlCategories.forEach(group => {
      // For Generic URLs, ALWAYS generate if we have a base URL
      if (group.key === "Generic") {
        const categoryUrls = [];
        group.subcategories.forEach(sub => {
          if (selectedGroups[sub.key]) {
            const url = buildURL(baseUrl, {
              items,
              promo,
              pricing,
              urlPart: sub.urls[0],
              dateProjectJob: '',
              contentUtm: '',
              division: '',
              formType,
              isGeneric: true,
              isHenrySchein
            });
            categoryUrls.push({ subcategory: sub.name, name: sub.name, url });
          }
        });
        if (categoryUrls.length > 0) {
          urls.push({ category: group.category, urls: categoryUrls });
        }
        return; // Exit early for Generic, don't apply UTM checks
      }

      // For all other groups, check requirements
      if (group.requiresMarketo && !formData.marketoFolderName) return;
      if (group.requiresQRContent && !formData.qrCodeContent) return;
      if (group.requiresVendorName && !formData.webLinkVendorName) return;
      if (group.requiresTradePub && !formData.tradePublicationName) return;
      
      // For non-generic URLs, check if required UTM fields are filled
      if (!hasRequiredUTMFields) return;

      const categoryUrls = [];

      group.subcategories.forEach(sub => {
        if (!selectedGroups[sub.key]) return;

        const processUrl = (urlPart, contentUtm, subName) => {
          let finalUrlPart = urlPart;
          let finalContentUtm = contentUtm;

          // Handle special cases
          if (group.key === "WebsiteLinkingAgreement") {
            finalUrlPart = `utm_source=${formData.webLinkVendorName}&${urlPart}`;
            finalContentUtm = 'WebsiteLinkingAgreement';
          } else if (group.key === "TradePublication") {
            finalUrlPart = `utm_source=TradePublication-${formData.tradePublicationName}${urlPart}`;
            finalContentUtm = formData.tradePublicationLink;
          } else if (group.key === "VanityURLs") {
            finalContentUtm = `${contentUtm}${vanity}`;
          } else if (group.key === "QRCode") {
            finalContentUtm = formData.qrCodeContent.replace(/\s/g, '');
          }

          // Use Marketo campaign if required
          const campaignString = group.requiresMarketo 
            ? `&utm_campaign=${formData.marketoFolderName}`
            : `&${dateProjectJob}`;

          return buildURL(baseUrl, {
            items,
            promo,
            pricing,
            urlPart: finalUrlPart,
            dateProjectJob: campaignString,
            contentUtm: finalContentUtm,
            division: group.key === "Generic" ? '' : division,
            formType,
            isGeneric: false,
            isHenrySchein
          });
        };

        if (sub.tier2) {
          sub.tier2.forEach(tier => {
            if (selectedGroups[tier.key]) {
              const url = processUrl(tier.urls[0], tier.contentutm?.[0], tier.name);
              categoryUrls.push({ subcategory: sub.name, name: tier.name, url });
            }
          });
        } else {
          const url = processUrl(sub.urls[0], sub.contentutm?.[0], sub.name);
          categoryUrls.push({ subcategory: sub.name, name: sub.name, url });
        }
      });

      if (categoryUrls.length > 0) {
        urls.push({ category: group.category, urls: categoryUrls });
      }
    });

    setGeneratedUrls(urls);
  }, [formData, selectedGroups]);

  // Generate URLs whenever formData or selectedGroups change
  // This is key: useCallback dependency array ensures generateURLs is updated
  // whenever these dependencies change, and the effect will re-run
  return { generatedUrls, generateURLs };
};