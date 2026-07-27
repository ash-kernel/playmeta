import axios from 'axios';
import * as cheerio from 'cheerio';

export default async function handler(req, res) {
  // CORS setup
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ error: 'URL parameter is required' });
  }

  try {
    const { data, headers } = await axios.get(url, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
      },
      timeout: 10000,
    });

    const contentType = headers['content-type'];
    if (!contentType || !contentType.includes('text/html')) {
      return res.status(400).json({ error: 'URL does not point to an HTML page' });
    }

    const $ = cheerio.load(data);
    const getMetaTag = (name) => {
      return (
        $(`meta[name="${name}"]`).attr('content') ||
        $(`meta[property="${name}"]`).attr('content') ||
        $(`meta[name="twitter:${name}"]`).attr('content') ||
        $(`meta[property="twitter:${name}"]`).attr('content')
      );
    };

    const metadata = {
      title: $('title').text() || getMetaTag('title') || getMetaTag('og:title') || '',
      description: getMetaTag('description') || getMetaTag('og:description') || '',
      ogTitle: getMetaTag('og:title') || '',
      ogDescription: getMetaTag('og:description') || '',
      ogImage: getMetaTag('og:image') || '',
      ogUrl: getMetaTag('og:url') || url,
      ogSiteName: getMetaTag('og:site_name') || '',
      twitterCard: getMetaTag('twitter:card') || '',
      twitterTitle: getMetaTag('twitter:title') || '',
      twitterDescription: getMetaTag('twitter:description') || '',
      twitterImage: getMetaTag('twitter:image') || '',
      favicon: $('link[rel="icon"]').attr('href') || $('link[rel="shortcut icon"]').attr('href') || '',
    };

    // Extract all raw meta tags on the page
    const rawTags = [];
    $('meta').each((index, element) => {
      const name = $(element).attr('name') || $(element).attr('property') || $(element).attr('http-equiv') || $(element).attr('charset');
      const content = $(element).attr('content');
      if (name || content) {
        rawTags.push({
          name: name || '',
          content: content || '',
          attribute: $(element).attr('name') ? 'name' : $(element).attr('property') ? 'property' : $(element).attr('http-equiv') ? 'http-equiv' : $(element).attr('charset') ? 'charset' : 'other'
        });
      }
    });

    // Make favicon absolute if it's relative
    if (metadata.favicon && !metadata.favicon.startsWith('http')) {
      try {
        metadata.favicon = new URL(metadata.favicon, url).href;
      } catch {
        // Ignore invalid URL
      }
    }

    res.status(200).json({
      ...metadata,
      rawTags
    });
  } catch (error) {
    console.error('Error fetching metadata:', error.message);
    res.status(500).json({ error: 'Failed to fetch metadata or site blocked the request.' });
  }
}
