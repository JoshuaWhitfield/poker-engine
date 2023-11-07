class Cache {
    constructor() {
        this.cache = [];
    };

    add(index) { this.cache.push(index) };
    get = () => this.cache;
    reset = () => { this.cache = [] };
}

const cache = new Cache();

module.exports = cache;