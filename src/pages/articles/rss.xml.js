import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const articles = await getCollection('articles');
  
  // Sort articles by publish date (newest first)
  const sortedArticles = articles.sort((a, b) => 
    new Date(b.data.publishDate).getTime() - new Date(a.data.publishDate).getTime()
  );

  return rss({
    title: 'Marine Coders Articles',
    description: 'Latest articles and news from Marine Coders',
    site: context.site,
    items: sortedArticles.map((article) => ({
      title: article.data.title,
      description: article.data.description,
      pubDate: article.data.publishDate,
      link: article.data.external ? article.data.externalUrl : `${context.site}/articles/${article.slug}`,
      author: article.data.author,
      categories: article.data.tags || [],
    })),
    customData: `<language>en-us</language>`,
  });
}
