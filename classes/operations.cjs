const oper = {
    randomIdx: (max = 52) => {
        return Math.floor((Math.random() * max) + 0);
    },
};

module.exports = oper;
