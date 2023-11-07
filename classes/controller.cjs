const createDeck =  require("./deck.cjs");
const cache = require('./cache.cjs');
const handRanking = require("./handRanking.cjs");
const oper = require('./operations.cjs');

class ControllerUtil {

    constructor() {
        this.hierarchy = {
            'Royal Flush': 10,
            'Straight Flush': 9,
            'Four of a Kind': 8,
            'Full House': 7,
            'Flush': 6,
            'Straight': 5,
            'Three of a Kind': 4,
            'Two Pair': 3,
            'Pair': 2,
            'High Card': 1,
        };
        this.handRank = handRanking;
    };

    generateValueList(cardArr) {
        const valueArr = [];
        for (let card of cardArr) {
            valueArr.push(card.getValue());
        };
        return valueArr;
    };

    generateSuitList(cardArr) {
        const suitArr = [];
        for (let card of cardArr) {
            suitArr.push(card.getSuit());
        };
        return suitArr;
    };

    compareHands(contestant, winnerArr, river) {
        const contestantRanking = this.determineHandRanking(contestant, river);
        const winnerRanking = this.determineHandRanking(winnerArr[0], river); /* all rankings in winnerArray are the same */

        if (this.hierarchy[contestantRanking] > this.hierarchy[winnerRanking]) return { 'winner': [contestant], 'handStrength': contestantRanking };
        if (this.hierarchy[winnerRanking] > this.hierarchy[contestantRanking]) return { 'winner': winnerArr, 'handStrength': winnerRanking };
        return { 'winner': winnerArr.concat([contestant]), 'handStrength': contestantRanking };
    };

    determineHandRanking(hole, river) {
        const valueArr = this.generateValueList(river.concat(hole));
        const suitArr = this.generateSuitList(river.concat(hole));
        
        if (this.handRank.RoyalFlush(valueArr, suitArr)) return 'Royal Flush';
        if (this.handRank.StraightFlush(valueArr, suitArr)) return 'Straight Flush';
        if (this.handRank.FourOfAKind(valueArr)) return 'Four of a Kind';
        if (this.handRank.FullHouse(valueArr)) return 'Full House';
        if (this.handRank.Flush(suitArr)) return 'Flush';
        if (this.handRank.Straight(valueArr)) return 'Straight';
        if (this.handRank.ThreeOfAKind(valueArr)) return 'Three of a Kind';
        if (this.handRank.TwoPair(valueArr)) return 'Two Pair';
        if (this.handRank.Pair(valueArr)) return 'Pair';
        
        return 'High Card';
    };

}

class Controller {
    constructor() {
        this.deck = createDeck();
        this.cardNamesArr = this.deck.getCardNames();
        this.util = new ControllerUtil();
        this.winningHand = '';
        this.cache = cache;
    };

    getWinningHand = () => this.winningHand;

    determineWinner(holeCardsArr, river) {
        let winner = [];
        for (let current of holeCardsArr) {
            if (!winner.length) {
                winner = [current];
                continue;
            };
            winner = this.util.compareHands(current, winner, river).winner;
            this.winningHand = this.util.compareHands(current, winner, river).handStrength;
        };
        return winner;
    };

    generateRiverTarget() {
        const indexes = []; const targets = [];
        for (let idx = 0; idx < 5; idx++) {
            const rndIdx = oper.randomIdx();
            if (this.cache.get().indexOf(rndIdx) > -1) {
                idx -= 1;
                continue;
            };
            this.cache.add(rndIdx);
            targets.push(this.cardNamesArr[rndIdx]);
        };
        return targets;
    };

    generateHoleTarget() {
        const indexes = []; const targets = [];
        for (let idx = 0; idx < 2; idx++) {
            const rndIdx = oper.randomIdx();
            if (this.cache.get().indexOf(rndIdx) > -1) {
                idx -= 1;
                continue;
            };
            this.cache.add(rndIdx);
            targets.push(this.cardNamesArr[rndIdx]);
        };
        return targets;
    };
};

const controller = new Controller();

module.exports = controller;