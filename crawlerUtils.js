/*** CRAWLER UTILITIES ***/

// List processing
const LIST_NUMBER_REGEX = /^\d+\.[ ]*/;
const toCiders = (cells) => {
    return cells.reduce((ciders, currentCell) => {
        let data = currentCell.children[0] && currentCell.children[0].data;

        if(!data || typeof data !== 'string') {
            return ciders;
        } else if(data.includes('%')) {
            ciders[ciders.length -1].abv = data;
            return ciders;
        } else if(LIST_NUMBER_REGEX.test(data)){
            const name = data.replace(LIST_NUMBER_REGEX, '').trim();
            if(name) return [...ciders, {name}];
        }

        return ciders;
    }, []);
};

module.exports = toCiders;