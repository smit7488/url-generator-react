// Sanitize URL by removing duplicate '&' and trailing '&' or '?'
function sanitizeURL(url) {
  let [base, queryString] = url.split('?');
  if (queryString) {
    queryString = queryString
      .split('&')
      .filter(param => param) // Remove empty parameters
      .join('&');
    if (queryString.endsWith('&')) queryString = queryString.slice(0, -1);
    if (queryString.endsWith('?')) queryString = queryString.slice(0, -1);
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
  let queryStart = base.includes('?') ? '&' : '?';

  // Handle Generic (Untagged) URLs
  if (isGeneric) {
    if (isHenrySchein) {
      if (formType === 'gep' && items !== '') {
        const formattedItems = items.split(',').map(code => `%22${code}%22`).join('');
        base = base.replace(/\/search\/?$/, `/search/${formattedItems}`);
        finalUrl = base + queryStart + 'type=products&exactsearch=false';
      } else {
        finalUrl = base + queryStart;
        if (items !== '') {
          finalUrl += `productid=${items}`;
        }
      }

      // Add promo and pricing for OneWeb
      if (formType === 'oneweb') {
        if (promo !== '' && finalUrl.includes('?')) {
          finalUrl += `&promocode=${promo.toUpperCase()}`;
        }
        if (pricing !== 'dp=false' && pricing !== '' && finalUrl.includes('?')) {
          finalUrl += `&${pricing}`;
        }
      }
    } else {
      finalUrl = base;
    }

    return sanitizeURL(finalUrl.toLowerCase().replace(/promocode=[^&]*/i, promo ? `promocode=${promo.toUpperCase()}` : ''));
  }

  // Handle Tagged URLs
  if (isHenrySchein) {
    if (formType === 'gep' && items !== '') {
      const formattedItems = items.split(',').map(code => `%22${code}%22`).join('');
      base = base.replace(/\/search\/?$/, `/search/${formattedItems}`);
      finalUrl = base + queryStart + 'type=products&exactsearch=false&';
    } else {
      finalUrl = base + queryStart;
      if (items !== '') {
        finalUrl += `productid=${items}&`;
      }
    }

    // Add promo and pricing
    if (promo !== '') {
      finalUrl += `promocode=${promo.toUpperCase()}&`;
    }
    if (pricing !== 'dp=false' && pricing !== '' && formType === 'oneweb') {
      finalUrl += `${pricing}&`;
    }
  } else {
    finalUrl = base + queryStart;
  }

  // Add UTM parameters
  if (urlPart !== '') {
    finalUrl += urlPart;
  }

  // Add campaign
  if (dateProjectJob !== '' && !dateProjectJob.includes('undefined')) {
    finalUrl += dateProjectJob;
  }

  // Add content
  if (contentUtm !== '') {
    finalUrl += `&utm_content=${contentUtm}`;
  }

  // Add division
  if (division !== '') {
    finalUrl += `&utm_term=${division}&cdivid=${division}`;
  }

  // Normalize to lowercase but keep promo code uppercase
  finalUrl = finalUrl.toLowerCase();
  if (promo) {
    finalUrl = finalUrl.replace(/promocode=[^&]*/i, `promocode=${promo.toUpperCase()}`);
  }

  return sanitizeURL(finalUrl);
};