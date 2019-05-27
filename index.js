const Crawler = require('crawler');
const {comparators} = require('generate-comparators');
const toCiders = require('./crawlerUtils');
const {getDiffs, updateCiders} = require('./dbUtils');
const sendMail = require('./sendMail');


const byName = comparators(({name}) => name.toLowerCase());

const crawler = new Crawler({
    callback: (error, res, done) => {
        const cells = res.$('td').toArray();
        const ciders = toCiders(cells);
        getDiffs(ciders).then(diffs => {
            const {arrivals, departures} = diffs;
            if(arrivals.length || departures.length) {
                updateCiders(ciders);
            } else {
                require('mongoose').connection.close();
            }
        });
        // const message = ciders.reduce((str, cider) => `${str}${cider.name} [${cider.abv}]`\n, '');
        // sendMail(message);
        done();
    }
});

crawler.queue({
    uri: 'https://www.cidercade.com/ciders',
    userAgent: 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Mobile Safari/537.36'
});