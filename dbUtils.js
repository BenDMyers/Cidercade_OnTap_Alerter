/*** DATABASE UTILS ***/

const mongoose = require('mongoose');
const {Schema} = mongoose;

const {mongoUri} = require('./config/keys');
mongoose.connect(mongoUri, {useNewUrlParser: true});
mongoose.Promise = Promise;


// DB model
const TapSchema = new Schema({ciders: [{name: String, abv: String, desc: String}]});
const Tap = mongoose.model('Tap', TapSchema);

// Determines which ciders are new and which have been voted off the island
const getDiffs = (currentCiders) => {
    return Tap.findOne().exec().then(tap => {
            // Arrivals are ciders that are on tap now that weren't last time.
            const arrivals = currentCiders.reduce((accumulatedArrivals, cider) => {
                if(!tap.ciders.find(c => (c.name === cider.name))) {
                    return [...accumulatedArrivals, cider];
                } else {return accumulatedArrivals;}
            }, []);

            // Departures are ciders that were on tap last time, but aren't now.
            const departures = tap.ciders.reduce((accumulatedDepartures, cider) => {
                const existingCider = currentCiders.find(c => (c.name === cider.name));
                if(!existingCider) {
                    return [...accumulatedDepartures, cider];
                } else {return accumulatedDepartures;}
            }, []);

            return {arrivals, departures};
        });
};

// Stores a record of the current tap in the DB
const updateCiders = (currentCiders) => {
    Tap.findOneAndUpdate(null, {ciders: currentCiders})
        .then(() => {
            console.log("Updated successfully");
            mongoose.connection.close();
        });
};

module.exports = {getDiffs, updateCiders};