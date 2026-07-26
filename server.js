import express from 'express';
import cors from 'cors';
import axios from 'axios';
import * as cheerio from 'cheerio';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.get('/api/fetch-metadata', async (req, res) => {
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

    // Make favicon absolute if it's relative
    if (metadata.favicon && !metadata.favicon.startsWith('http')) {
      try {
        metadata.favicon = new URL(metadata.favicon, url).href;
      } catch (e) {
        // Ignore invalid URL
      }
    }

    res.json(metadata);
  } catch (error) {
    console.error('Error fetching metadata:', error.message);
    res.status(500).json({ error: 'Failed to fetch metadata or site blocked the request.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
