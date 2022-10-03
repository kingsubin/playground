"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crypto = require("crypto");
class Block {
    constructor(prevHash, height, data) {
        this.prevHash = prevHash;
        this.height = height;
        this.data = data;
        this.hash = Block.calculateHash(prevHash, height, data);
    }
    static calculateHash(prevHash, height, data) {
        const toHash = `${prevHash}${height}${data}`;
        return crypto.createHash("sha256").update(toHash).digest("hex");
    }
}
class Blockchain {
    constructor() {
        this.blocks = [];
    }
    getPrevHash() {
        if (this.blocks.length === 0)
            return '';
        return this.blocks[this.blocks.length - 1].hash;
    }
    addBlock(data) {
        const newBlock = new Block(this.getPrevHash(), this.blocks.length + 1, data);
        this.blocks.push(newBlock);
    }
    getBlocks() {
        return [...this.blocks];
    }
}
const blockchain = new Blockchain();
blockchain.addBlock('Hello');
blockchain.addBlock('Hi');
blockchain.addBlock('Hola');
blockchain.addBlock('Bye');
console.log(blockchain.getBlocks());
