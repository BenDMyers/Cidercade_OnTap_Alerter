const Crawler = require('crawler');
const {comparators} = require('generate-comparators');
const toCiders = require('./crawlerUtils');
const {getDiffs, updateCiders} = require('./dbUtils');
const formatMessage = require('./formatMessage');
const sendMail = require('./sendMail');


const byName = comparators(({name}) => name.toLowerCase());

const crawler = new Crawler({
    callback: (error, res, done) => {
        const cells = res.$('.menu li.drink:not(.jk)').toArray();
        const ciders = toCiders(cells);
        getDiffs(ciders).then(({arrivals, departures}) => {
            if(arrivals.length || departures.length) {
                const {text, html} = formatMessage(arrivals, departures);
                sendMail(text, html);
                updateCiders(ciders);
            } else {
                require('mongoose').connection.close();
            }
        });
        done();
    }
});

crawler.queue({
    uri: 'https://www.cidercade.com/ontap',
    userAgent: 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Mobile Safari/537.36'
});