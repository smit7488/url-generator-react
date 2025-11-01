import { useState, useEffect } from 'react';
import { urlCategories } from '../data/urlCategories';
import { buildURL } from '../utils/urlHelpers';

export const useURLGenerator = (formData, selectedGroups) => {
  const [generatedUrls, setGeneratedUrls] = useState([]);

  useEffect(() => {
    generateURLs();
  }, [formData, selectedGroups]);

  const generateURLs = () => {
    if (!formData.pageUrl || !formData.date || !formData.project || !formData.jobNumber) {
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
    const dateProjectJob = `&utm_campaign=${date}-${project}-${jobNumber}`;
    const isHenrySchein = baseUrl.includes('henryschein');
    const commaCount = (items.match(/,/g) || []).length;

    urlCategories.forEach(group => {
      if (group.requiresMarketo && !formData.marketoFolderName) return;
      if (group.requiresQRContent && !formData.qrCodeContent) return;
      if (group.requiresVendorName && !formData.webLinkVendorName) return;
      if (group.requiresTradePub && !formData.tradePublicationName) return;

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
            : dateProjectJob;

          return buildURL(baseUrl, {
            items,
            promo,
            pricing,
            urlPart: finalUrlPart,
            dateProjectJob: campaignString,
            contentUtm: finalContentUtm,
            division,
            commaCount,
            isHenrySchein
          });
        };

        if (sub.tier2) {
          sub.tier2.forEach(tier => {
            if (selectedGroups[tier.key]) {
              const url = processUrl(tier.urls[0], tier.contentutm[0], tier.name);
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
  };

  return { generatedUrls, generateURLs };
};