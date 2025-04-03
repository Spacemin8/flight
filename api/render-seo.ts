import { render } from '../src/entry-server';

// Create Supabase client

export default async function handler(req: any, res: any) {
  try {
    const path = req.url || '/';

    // Read the index.html template
    const template = `<!doctype html>
<html lang="sq">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/png" href="https://himatravel.com/wp-content/uploads/2020/11/cropped-logo-1-192x192.png" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <!--app-head-->
  </head>
  <body>
    <div id="root"><!--app-html--></div>
    <script type="module" src="/src/entry-client.tsx"></script>
  </body>
</html>`;

    // Render the page
    const { appHtml, helmet } = await render(path);

    // Insert the rendered app and helmet data into the template
    const html = template.replace('<!--app-html-->', appHtml).replace(
      '<!--app-head-->',
      `${helmet.title}
        ${helmet.meta}
        ${helmet.link}
        ${helmet.script}`
    );

    // Set headers and send response
    res.setHeader('Content-Type', 'text/html');
    res.setHeader('Cache-Control', 'public, max-age=3600, s-maxage=86400'); // 1 hour client, 1 day server
    res.status(200).send(html);
  } catch (err) {
    console.error('Error rendering page:', err);
    res.status(500).send('Error rendering page');
  }
}
