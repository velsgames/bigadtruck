import { getPosts } from '@/lib/cms';
import { SITE_URL } from '@/lib/seo';
import { site, blog } from '@/content/site';

export const dynamic = 'force-static';
export const revalidate = 3600;

function esc(s: string) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

export async function GET() {
  const posts = await getPosts();
  const items = posts
    .map((p) => {
      const url = `${SITE_URL}/blog/${p.slug}`;
      return `    <item>
      <title>${esc(p.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <category>${esc(p.category)}</category>
      <pubDate>${new Date(`${p.date}T09:00:00+05:30`).toUTCString()}</pubDate>
      <description>${esc(p.excerpt)}</description>
    </item>`;
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${esc(blog.name)} — ${esc(site.name)}</title>
    <link>${SITE_URL}/blog</link>
    <description>${esc(blog.description)}</description>
    <language>en-in</language>
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
}
