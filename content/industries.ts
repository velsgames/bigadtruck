/**
 * Industries served (75+). We surface ~24 named tiles; the grid notes the
 * long tail. Highlighted industries get prominence on /industries and the home.
 */

export type Industry = {
  name: string;
  blurb: string;
  highlight?: boolean;
};

export const industries: Industry[] = [
  { name: 'Education', blurb: 'Schools, colleges & universities — branding and admission lead-gen.', highlight: true },
  { name: 'Real Estate', blurb: 'Developers & brokers — portals, 3D and demand generation.', highlight: true },
  { name: 'Government', blurb: 'Departments, PSUs & GeM — compliant public-sector media.', highlight: true },
  { name: 'Manufacturing', blurb: 'Industrial brands — B2B marketing, web and collateral.', highlight: true },
  { name: 'Healthcare', blurb: 'Hospitals & clinics — trust-led brand and patient acquisition.', highlight: true },
  { name: 'Retail', blurb: 'Stores & chains — identity, e-commerce and festive campaigns.', highlight: true },
  { name: 'Hospitality', blurb: 'Hotels & restaurants — brand, social and bookings.' },
  { name: 'Infrastructure', blurb: 'Projects & bodies — DPRs, visualization and PMC.' },
  { name: 'Automotive', blurb: 'Dealers & OEMs — launch campaigns and lead engines.' },
  { name: 'Finance & Insurance', blurb: 'BFSI — performance media and compliant creative.' },
  { name: 'Technology & SaaS', blurb: 'Product teams — brand, web and demand gen.' },
  { name: 'E-commerce', blurb: 'Online brands — storefronts and growth media.' },
  { name: 'FMCG', blurb: 'Consumer goods — mass media, OOH and activations.' },
  { name: 'Pharmaceuticals', blurb: 'Pharma — brand, print and regulated communications.' },
  { name: 'Agriculture', blurb: 'Agri brands — vernacular reach and rural media.' },
  { name: 'Logistics & Transport', blurb: 'Movers & fleets — B2B branding and digital.' },
  { name: 'Energy & Utilities', blurb: 'Power & utilities — public communications and DPRs.' },
  { name: 'NGOs & Social', blurb: 'Causes — awareness campaigns and fundraising.' },
  { name: 'Travel & Tourism', blurb: 'Destinations & operators — content and campaigns.' },
  { name: 'Fashion & Lifestyle', blurb: 'Labels — brand, social and e-commerce.' },
  { name: 'Food & Beverage', blurb: 'F&B brands — packaging, social and promotions.' },
  { name: 'Construction', blurb: 'Builders — branding, web and project documentation.' },
  { name: 'Events & Entertainment', blurb: 'Promoters — movie & brand promotions and activations.' },
  { name: 'Professional Services', blurb: 'Firms — brand, web and lead generation.' },
];

export const highlightedIndustries = industries.filter((i) => i.highlight);
