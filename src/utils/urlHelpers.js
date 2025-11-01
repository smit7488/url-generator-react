export const sanitizeURL = (url) => {
  let [base, queryString] = url.split('?');
  if (queryString) {
    queryString = queryString
      .split('&')
      .filter(param => param)
      .join('&');
    return `${base}?${queryString}`;
  }
  return base;
};

export const buildURL = (baseUrl, params) => {
  const { items, promo, pricing, urlPart, dateProjectJob, contentUtm, 
          division, commaCount, isHenrySchein } = params;
  
  let finalUrl = baseUrl.includes('?') ? baseUrl + '&' : baseUrl + '?';

  if (isHenrySchein) {
    if (items) finalUrl += `productid=${items}&`;
    if (promo) finalUrl += `promocode=${promo}&`;
    if (pricing !== 'dp=false') finalUrl += `${pricing}&`;
  }

  finalUrl += urlPart;
  finalUrl += dateProjectJob;
  
  if (contentUtm) {
    finalUrl += `&utm_content=${contentUtm}`;
  }

  if (isHenrySchein) {
    finalUrl += `&utm_term=${division}&cdivid=${division}`;
    if (division === 'specialmarkets') finalUrl += '_d';
    if (commaCount > 23) finalUrl += '&browsingmode=p';
  }

  finalUrl = finalUrl.toLowerCase().replace(/promocode=[^&]*/i, `promocode=${promo}`);
  return sanitizeURL(finalUrl);
};