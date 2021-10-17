require('dotenv/config');

import 'reflect-metadata';
import app from './app';
import { createConnection } from 'typeorm';

createConnection().then(() => {
    const port = process.env.APP_PORT;

    app.listen(port, () => console.log(`Server is running in "localhost:${port}"`));
})