const { ethers, Contract } = require("ethers");
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname,'../../.env') });
const INFURA_ID = process.env.API_KEYS;

const ERC721_Rabbit_ABI = [
    'event Transfer(address indexed from, address indexed to, uint indexed tokenId)',
    'event Approval(address indexed owner,address indexed approved,uint indexed tokenId)',
    'event ApprovalForAll(address indexed owner,address indexed operator,bool approved)']

const Rabbit_address = process.env.contract_address;
const main = async (chainId=4) => {
    const chain = {4:'rinkeby',1:'mainnet'};
    const provider = new ethers.providers.JsonRpcProvider(`https://${chain[chainId]}.infura.io/v3/${INFURA_ID}`);
    const contract = new Contract(Rabbit_address, ERC721_Rabbit_ABI, provider); 
    const block = await provider.getBlockNumber();
    const transferEvents = await contract.queryFilter('Transfer', block-10, block);
    console.log(transferEvents[0]);
}

main();