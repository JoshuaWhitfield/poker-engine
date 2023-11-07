const oper = {
    randomIdx: (max = 52) => {
        return Math.floor((Math.random() * max) + 0);
    },
    findSubArray: (mainArray, subArray) => {
        const mainStr = mainArray.join(',');
        const subStr = subArray.join(',');
        const index = mainStr.indexOf(subStr);
      
        return index !== -1 ? true : false;
    },
};

module.exports = oper;