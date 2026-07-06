export const divisionsQuery = `*[_type == "division"] | order(order asc){
  "slug": slug.current, name, short, kicker, tagline, summary, intro, accent,
  "image": image.asset->url,
  capabilities[]{title, description},
  process[]{title, description},
  useCase{title, body, metrics[]{value, label}}
}`;

export const caseStudiesQuery = `*[_type == "caseStudy"] | order(featured desc, year desc){
  "slug": slug.current, title, client, industry, service, division, year, featured, summary,
  "cover": cover.asset->url,
  hero{value, label}, challenge, contribution,
  decisions[]{title, body}, outcomes[]{value, label},
  "gallery": gallery[]{ "src": asset->url, alt }
}`;

export const servicesQuery = `*[_type == "service"] | order(order asc){
  "id": slug.current, title, blurb, deliverables, outcomes, span
}`;

export const industriesQuery = `*[_type == "industry"] | order(order asc){
  name, blurb, highlight
}`;

export const testimonialsQuery = `*[_type == "testimonial"] | order(order asc){
  quote, author, role, company
}`;

export const postsQuery = `*[_type == "post"] | order(date desc){
  "slug": slug.current, title, excerpt, category, date, readMins, author, tags, featured,
  "cover": cover.asset->url,
  body[]{ _type == "block" => { "type": "p", "text": pt::text(@) }, type, text, items, cite }
}`;

export const siteSettingsQuery = `*[_type == "siteSettings"][0]{
  tagline, description, email, phoneDisplay, phoneHref, whatsappHref,
  offices[]{city, label, address, mapQuery},
  socials[]{label, handle, href}
}`;
