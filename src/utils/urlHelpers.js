// Sanitize URL by removing duplicate '&' and trailing '&' or '?'
function sanitizeURL(url) {
  if (!url.includes('?')) return url;
  
  let [base, queryString] = url.split('?');
  if (queryString) {
    // Remove duplicate & and clean up
    queryString = queryString
      .replace(/&+/g, '&') // Replace multiple & with single &
      .replace(/^&|&$/g, '') // Remove leading/trailing &
      .replace(/\?+$/g, ''); // Remove trailing ?
    
    return queryString ? `${base}?${queryString}` : base;
  }
  return base;
}

export const buildURL = (baseUrl, options) => {
  const {
    items,
    promo,
    pricing,
    urlPart,
    dateProjectJob,
    contentUtm,
    division,
    formType,
    isGeneric,
    isHenrySchein
  } = options;

  let finalUrl = '';
  let base = baseUrl;
  const hasExistingParams = base.includes('?');
  let queryParams = [];

  // Handle Generic (Untagged) URLs - ALWAYS generate these
  if (isGeneric) {
    if (isHenrySchein) {
      if (formType === 'gep' && items) {
        // GEP format: /search/"item1""item2""item3"
        const formattedItems = items.split(',').map(code => `%22${code}%22`).join('');
        base = base.replace(/\/search\/?$/, `/search/${formattedItems}`);
        queryParams.push('type=products', 'exactsearch=false');
      } else if (items) {
        queryParams.push(`productid=${items}`);
      }

      // Add promo and pricing for OneWeb
      if (formType === 'oneweb') {
        if (promo) {
          queryParams.push(`promocode=${promo}`);
        }
        if (pricing && pricing !== 'dp=false') {
          queryParams.push(pricing);
        }
      }
    }

    // Build final URL
    finalUrl = queryParams.length > 0 ? `${base}?${queryParams.join('&')}` : base;
    return sanitizeURL(finalUrl);
  }

  // Handle Tagged URLs
  if (isHenrySchein) {
    if (formType === 'gep' && items) {
      // GEP format: /search/"item1""item2""item3"
      const formattedItems = items.split(',').map(code => `%22${code}%22`).join('');
      base = base.replace(/\/search\/?$/, `/search/${formattedItems}`);
      queryParams.push('type=products', 'exactsearch=false');
    } else if (items) {
      queryParams.push(`productid=${items}`);
    }

    // Add promo and pricing
    if (promo) {
      queryParams.push(`promocode=${promo}`);
    }
    if (pricing && pricing !== 'dp=false' && formType === 'oneweb') {
      queryParams.push(pricing);
    }
  }

  // Add UTM parameters from urlPart
  if (urlPart) {
    const utmParams = urlPart.split('&').filter(param => param);
    queryParams.push(...utmParams);
  }

  // Add campaign
  if (dateProjectJob && !dateProjectJob.includes('undefined')) {
    const campaignParams = dateProjectJob.replace(/^&/, '').split('&').filter(param => param);
    queryParams.push(...campaignParams);
  }

  // Add content
  if (contentUtm) {
    queryParams.push(`utm_content=${contentUtm}`);
  }

  // Add division
  if (division) {
    queryParams.push(`utm_term=${division}`);
    // Only add cdivid if not GEP form
    if (formType !== 'gep') {
      queryParams.push(`cdivid=${division}`);
    }
  }

  // Build final URL
  finalUrl = queryParams.length > 0 ? `${base}?${queryParams.join('&')}` : base;
  return sanitizeURL(finalUrl);
};