# Cidercade On-Tap Alerter

A little tool that will send an email whenever the [Bishop Cidercade](https://www.cidercade.com/) in Dallas, TX updates its selection of drinks on tap.

## Dependencies

* [`crawler`](https://www.npmjs.com/package/crawler) for scraping the Cidercade website

* [`mongoose`](https://www.npmjs.com/package/mongoose) to access a MongoDB database hosted on [mLab](https://mlab.com/home) to serve as a persistent store for the on-tap selection.

* [`nodemailer`](https://www.npmjs.com/package/nodemailer) for sending out email alerts

* [Heroku](https://heroku.com) for hosting and scheduling the job.

## Setting Up Your Own Instance

### Prerequisites

1. Set up a new Gmail for sending out alerts. Use a password you don't care about.
2. Go to [your new Gmail account's Security page](https://myaccount.google.com/security), scroll to the **Less secure app access** section, and enable *Allow less secure apps*.
3. Create a new MongoDB database with a user that has read/write access, and retrieve the new URI. This should be of the format `mongodb://<db_username>:<db_password>@ds123456.mlab.com:12345/<db_name>`.
    * For instructions on how to do this in mLab, read [the mLab docs](https://docs.mlab.com/) and follow steps 1-3.
4. Clone this repository using `git clone https://github.com/BenDMyers/Cidercade_OnTap_Alerter.git`.
5. Navigate inside the repository in your terminal.
6. Install npm dependencies by running `yarn install`.
    * If you don't have Yarn, install it at [yarnpkg.com](https://yarnpkg.com/en/docs/install).

### Configuring for Local Development

When running the code locally in a `development` build, the project looks to `config/keys_dev.js` for important configuration values. However, these are tokens that should never be committed into version control. As a result, you'll have to create this file yourself.

`config/keys_dev.js`

```js
module.exports = {
    mongoUri: 'PUT THE MONGODB DATABASE URI YOU GOT EARLIER HERE',
    outboxAddress: 'THE FIRST PART OF YOUR NEW GMAIL (BEFORE THE `@`)',
    outboxPass: 'THE PASSWORD FOR YOUR NEW GMAIL',
    receiverAddress: 'THE EMAIL ADDRESS THAT WILL RECEIVE THE ALERTS'
}
```

### Configuring for Production Deployment

In a `production` build, this project will instead get the above values from its environment variables. Set the env variables `MONGO_URI`, `OUTBOX_ADDRESS`, `OUTBOX_PASS`, and `RECEIVER_ADDRESS`, corresponding to the same values as above.