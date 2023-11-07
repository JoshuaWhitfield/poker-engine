class River {
    constructor() {
        this.body = []
    }

    getRiver = () => this.body;
    getLength = () => this.body.length;
    resetRiver = () => this.body = [];

    deal(deck, targets) {
        const arr = []; const deckArr = deck;
        deckArr.map(
            (card) => {
                if (targets.indexOf(card.getName()) != -1) {
                    arr.push(card);
                }
            }
        )
        this.body = arr;
    }
}

const createRiver = () => {
    const river =  new River();
    return river;
}

module.exports = createRiver;