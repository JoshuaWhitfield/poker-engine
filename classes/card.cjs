class Card {

    constructor(card_name, suit, value) {
        this.meta = {
            location: 0,
            card_name: card_name,
            suit: suit,
            value: value,
        };
    };

    getName = () => this.meta.card_name;
    getLoc = () => this.meta.location;
    getSuit = () => this.meta.suit;
    getValue = () => this.meta.value;
    
};

const createCard = (name, suit, value) => {
    const card = new Card(name, suit, value);
    return card;
};

module.exports = createCard;
