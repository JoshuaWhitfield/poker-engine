const createCard = require('./card.cjs');
const createRiver = require('./river.cjs');
const createHole = require('./hole.cjs')

class DeckUtil {
    constructor() {
        this.meta = {
            suits: [
                'clubs',
                'spades',
                'diamonds',
                'hearts',
            ],
    
            suits_abbr: [ 'c', 's', 'd', 'h' ]
        };

    }

    init() {
        const arr = [];
        const royals = { 11: 'J', 12: 'Q', 13: 'K', 1: 'A' };
        for (let suit of this.meta.suits) {
            for (let value_idx = 1; value_idx <= 13; value_idx++) {
                let name = `${value_idx}`;
                if ( value_idx >= 11 || value_idx === 1 ) name = royals[value_idx];
                arr.push( createCard(`${name}_${suit}`, suit, value_idx ) )
                //console.log(`${name}_${suit}`, value_idx)
            }
        }
        return arr;
    }

    generateCardNames = (deck) => {
        const arr = [];
        for (let card of deck) {
            arr.push(card.getName());
        }
        return arr;
    }

}

class Deck {
    constructor () {
        this.utils = new DeckUtil(); 
        this.deck = this.utils.init();
        this.card_names = this.utils.generateCardNames(this.deck);
        this.hole_cards = [];
        this.river = [];
        this.cache = [];
    }

    getDeck = () => this.deck;
    getHoleCards = () => this.hole_cards;
    getRiver = () => this.river;
    getUtil = () => this.utils;
    getCardNames = () => this.card_names;

    generateRiver = (targets) => {
        const river = createRiver();
        river.deal(this.deck, targets);
        this.river = river.getRiver();
    }

    generateHoleCards = (targets) => {
        const arr = [];
        for (let target of targets) {
            const hole = createHole();
            hole.deal(this.deck, target);
            arr.push(hole.getHole());
        }
        this.hole_cards = arr;
    }

};

const createDeck = () => {
    const deck = new Deck(); //console.log(deck.deck)
    return deck;
};

module.exports = createDeck;