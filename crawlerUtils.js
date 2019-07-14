/*** CRAWLER UTILITIES ***/
const toCiders = (cells) => {
    return cells.reduce((ciders, currentCell) => {
        let name = currentCell.children[1].children[0].data;
        let desc = currentCell.children[3].children[0].data;
        let abv = currentCell.children[7].children[0].data;

        return [...ciders, {name, abv, desc}];
    }, []);
};

module.exports = toCiders;