import Debug from 'debug';
import './app/helpers/env.load.js';
import { createServer } from 'node:http';
// app is a module
import app from './app/index.app.js';

const debug = Debug('WeekAway:index');
// and we inject app, like a middleware
const server = createServer(app);

// Production mode or dev mode

if (process.env.NODE_ENV === 'development') {
  server.listen(3000, () => console.log(`API launched on http://localhost:${3000}`));
} else if (process.env.NODE_ENV === 'production') {
  server.listen(80, () => console.log(`API launched on http://localhost:${80}`));
}
