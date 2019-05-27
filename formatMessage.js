const today = new Date().toLocaleDateString('en-US', {month: 'long', day: 'numeric'});

const toText = (arrivals, departures) => {
    let text = `What's on-tap at Cidercade for ${today}?`;

    if(arrivals.length) {
        text += '\n\nARRIVALS';
        text = arrivals.reduce((message, cider) => {
            return `${message}\n* ${cider.name} [${cider.abv}]`;
        }, text);
    }

    if(departures.length) {
        text += '\n\nDEPARTURES';
        text = departures.reduce((message, cider) => {
            return `${message}\n* ${cider.name} [${cider.abv}]`;
        }, text);
    }

    return text;
};

const toHtmlListItems = (list) => {
    return list.reduce((items, entry) => `${items}\n<li><b>${entry.name}</b> - <i>${entry.abv}</i></li>`, '');
}

const toHtml = (arrivals, departures) => {
    let html = `<h1>Cidercade Updates for ${today}</h1>`;

    arrivals.length && (html = `
        ${html}
        <h2>🆕 New Arrivals</h2>
        <ul>
            ${toHtmlListItems(arrivals)}
        </ul>
    `);

    departures.length && (html = `
        ${html}
        <h2>👋 No Longer Available</h2>
        <ul>
            ${toHtmlListItems(departures)}
        </ul>
    `);

    return html;
};

const formatMessage = (arrivals, departures) => {
    return {text: toText(arrivals, departures), html: toHtml(arrivals, departures)};
}

module.exports = formatMessage;