const pokerEngine = require('./classes/engine.cjs');

const river = pokerEngine.generateRiver();
const holeCardsArr = pokerEngine.generateHoleCards();
const winner = pokerEngine.getWinner(holeCardsArr, river);

console.log(`river: ${pokerEngine.readableRiver(river)}`);
console.log('\n'); let idx = 0;
for (let hole of holeCardsArr) {idx++
    console.log(`player ${idx}: ${pokerEngine.readableHole(hole)}`);
};
console.log('\n')
console.log(`winner: ${pokerEngine.readableWinner(winner)}`);
console.log(`hand strength: ${pokerEngine.getWinningHand()}`);
