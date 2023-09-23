import dotenv from 'dotenv';
import path from 'path';
import express from 'express';

const nodeEnv = process.env.NODE_ENV;

dotenv.config({ path: `.env.${nodeEnv}` });

const port = process.env.PORT;

(() => {
  return express()
    .set('view engine', 'ejs')
    .set('views', path.join(process.cwd(), 'source/server/view'))
    .get('*', (request, response) =>
      response.render('index', {
        title: process.env.npm_package_name
      })
    )
    .listen(port, () =>
      // eslint-disable-next-line no-console
      console.log(`${nodeEnv}-server: http://localhost:${port}`)
    );
})();