const controller = require('./controller.cjs');

class PokerEngine {

    constructor() {
        this.controller = controller;
        this.deck = this.controller.deck;
    }

    showDeck = () => this.deck;
    showController = () => this.controller;
    getWinningHand = () => this.controller.getWinningHand();

    generateRiver() {
        this.deck.generateRiver(this.controller.generateRiverTarget());
        return this.deck.getRiver();
    };

    generateHoleCards(amount = 1) {
        const holeCardsArr = [];
        for (let count = 0; count <= amount; count++) {
            this.deck.generateHoleCards(this.controller.generateHoleTarget());
            holeCardsArr.push(this.deck.getHoleCards());
        };
        return holeCardsArr;
    };
    
    getWinner(holeCardsArr, river) {
        return this.controller.determineWinner(holeCardsArr, river);
    };

    readableRiver(river) {
        let riverString = '';
        for (let card of river) {
            riverString += `${card.getName()} `;
        };
        return riverString.slice(0, -1);
    };

    readableHole(hole) {
        let holeString = '';
        for (let card of hole) {
            holeString += `${card.getName()} `;
        };
        return holeString.slice(0, -1);
    };
    
    readableWinner(winnerArr) {
        let totalWinnerString = '';
        for (let winner of winnerArr) {
            let winnerString = '';
            for (let card of winner) {
                winnerString += `${card.getName()} `;
            };
            totalWinnerString += `${winnerString} `;
        };
        return totalWinnerString.slice(0, -1);
    };

};

const pokerEngine = new PokerEngine();

module.exports = pokerEngine;