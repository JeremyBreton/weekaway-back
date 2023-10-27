/*
Désormais l'index.js ne servira qu'a implémenter le serveur web
 */
import './app/helpers/env.load.js';
import { createServer } from 'node:http';
// L'application sera récupérer en tant que module
import app from './app/index.app.js';



// Et on l'injecte dans le serveur web, comme on fournirai un middleware pour gérer les requêtes.
const server = createServer(app);

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log(`API launched on http://localhost:${PORT}`));
