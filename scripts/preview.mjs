import { existsSync } from 'node:fs';
import { createServer } from 'node:http';
import handler from 'serve-handler';

if (!existsSync('out/index.html')) {
  console.error('Run npm run build before starting the static preview.');
  process.exit(1);
}

const host = '127.0.0.1';
const port = Number(process.env.PORT ?? 4173);
const server = createServer((request, response) =>
  handler(request, response, {
    public: 'out',
    trailingSlash: true,
    directoryListing: false,
  }),
);
server.listen(port, host, () =>
  console.log(`Fenka preview at http://${host}:${port}`),
);
