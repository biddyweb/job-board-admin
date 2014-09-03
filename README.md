# About jobs.js.uy

The jobs.js.uy webiste is a job listing app that shows all the js related jobs in Uruguay.

The application is a compound of three small apps:

* [job-board-public](http://github.com/js-uy/job-board-public) is the main website that you see when you go to [jobs.js.uy](http://jobs.js.uy).
* [job-board-admin](http://github.com/js-uy/job-board-admin) is the administration site and is where companies and particulars log in to post open jobs positions.
* [job-board-api](http://github.com/js-uy/job-board-api) is a node app that talks json and powers all the other two apps. It is the heart of the [jobs.js.uy](http://jobs.js.uy) website.

## About job board admin

The admin interface for [jobs.js.uy](http://jobs.js.uy).

## Getting started

If you want to try this app first you will need to have a working copy of [job-board-api](http://github.com/js-uy/job-board-api) once you have that configured and installed you can run this app doing the following:

```bash
npm install -g gulp
npm install
mv sample.config.js config.js
npm run-script start
```

If you want to build / deploy the app run `npm run-script build / deploy`.

## Contributors:

* Gabriel Chertok
* Gaston Festari