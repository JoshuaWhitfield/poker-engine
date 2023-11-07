const oper = require('./operations.cjs');

const getInstances = (inputArr) => {
    const instances = {};
    for (let elem of inputArr) {
        if (Object.keys(instances).indexOf(elem.toString()) === -1) {
            instances[elem] = 1;
            continue;
        };

        instances[elem] += 1;
    };
    return instances;
};

class HandRanking {

    RoyalFlush (valueArr, suitArr) {
        const royals = [ 1, 10, 11, 12, 13 ];
        let count = 0; let idx = -1;

        const suitInstances = getInstances(suitArr);
        const frequency = Object.values(suitInstances);
        if (frequency.indexOf(5) === -1) return false;

        const dominantSuit = Object.keys(suitInstances)[frequency.indexOf(5)];
        for (let value of valueArr) {idx++;
            if (royals.indexOf(value) === -1) continue;
            if (suitArr[idx] === dominantSuit) count += 1;
        };

        if (count < 5) return false;
        return true;
    };

    StraightFlush (valueArr, suitArr) {
        if (!this.Straight(valueArr)) return false;

        let ascendingValues = []; let idx = -1; let count = 0;
        for (let value of valueArr) {idx++
            if (valueArr[idx+1] === undefined) break;
            if ((value + 1) === valueArr[idx+1]) {
                ascendingValues.push(value);
                continue;
            };
            count = 0;
            ascendingValues = [];
        };

        const suitInstances = getInstances(suitArr);
        const frequency = Object.values(suitInstances);
        if (frequency.indexOf(5) === -1) return false;

        const dominantSuit = Object.keys(suitInstances)[frequency.indexOf(5)];
        idx = -1;
        for (let value of valueArr) {idx++;
            if (ascendingValues.indexOf(value) === -1) continue;
            if (suitArr[idx] === dominantSuit) count += 1;
        };

        if (count < 5) return false;
        return true;
    };

    FourOfAKind (valueArr) {
        const valueInstances = getInstances(valueArr);
        const frequency = Object.values(valueInstances);
        if (frequency.indexOf(4) === -1) return false;
        return true;
    };

    FullHouse (valueArr) {
        if (!this.ThreeOfAKind(valueArr)) return false;
        
        const valueInstances = Object.values(getInstances(valueArr));
        if (oper.findSubArray(valueInstances, [ 3, 3 ])) return true;

        if (!this.TwoPair(valueArr)) {
            if (!this.Pair(valueArr)) return false; 
            return true;  
        };
        return true;
    };

    Flush (suitArr) {
        const suitInstances = getInstances(suitArr);
        const frequency = Object.values(suitInstances);
        if (frequency.indexOf(5) === -1) return false;
        return true;
    };

    Straight (valueArr) {
        valueArr = valueArr.sort((a, b) => a - b);
        let count = 0; let idx = -1;
        for (let value of valueArr) {idx++
            if (valueArr[idx+1] === undefined) break;
            if ((value + 1) === valueArr[idx+1]) {
                count += 1;
                continue;
            };
            
            if (value === valueArr[idx+1]) continue;
            count = 0;
        };

        if (count < 5) {
            let countRoyals = 0;
            const royals = [ 1, 10, 11, 12, 13 ];
            for (let value of valueArr) {
                if (royals.indexOf(value) === -1) continue;
                countRoyals += 1;
            };
            if (countRoyals < 5) return false;
        };
        return true;
    };

    ThreeOfAKind (valueArr) {
        const valueInstances = getInstances(valueArr);
        const frequency = Object.values(valueInstances);
        if (frequency.indexOf(3) === -1) return false;
        return true;
    };

    TwoPair (valueArr) {
        const valueInstances = Object.values(getInstances(valueArr));
        let count = 0;
        for (let value of valueInstances) {
            if (value === 2) count += 1;
        };

        if (count < 2) return false;
        return true;
    };

    Pair (valueArr) {
        const valueInstances = getInstances(valueArr);
        const frequency = Object.values(valueInstances);
        if (frequency.indexOf(2) === -1) return false;
        return true;
    };

};

const handRanking = new HandRanking();

module.exports = handRanking;