import './app/helpers/env.load.js';
import { createServer } from 'node:http';
// L'application sera récupérer en tant que module
import app from './app/index.app.js';
// Et on l'injecte dans le serveur web, comme on fournirai un middleware pour gérer les requêtes.
const server = createServer(app);

if (process.env.NODE_ENV === 'development') {
  server.listen(3000, () => console.log(`API launched on http://localhost:${3000}`));
} else if (process.env.NODE_ENV === 'production') {
  server.listen(80, () => console.log(`API launched on http://localhost:${80}`));
}
