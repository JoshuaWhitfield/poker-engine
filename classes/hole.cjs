class Hole {
    constructor(size=2) {
        this.meta = {
            length: size,
        }
        this.body = [];
    }

    getHole = () => {
        return this.body[0]
    };
    getLength = () => this.meta.length;

    deal(deck, targets) {
        const arr = [];
        const deckArr = deck;
        deckArr.map(
            (card) => {
                if (targets.indexOf(card.getName()) > -1) {
                    arr.push(card);
                }
            }
        )
        this.body = arr;
    }
}

const createHole = (size=2) => {
    const hole = new Hole(size);
    return hole;
}

module.exports = createHole;