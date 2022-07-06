
const { ethers, Contract } = require("ethers");
const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname,'../../.env') })



const chain = {4:'rinkeby',1:'mainnet'};
const INFURA_ID = process.env.API_KEYS;

const ERC721_Rabbit_ABI = [
    "function name() view returns (string)",
    "function symbol() view returns (string)",
    "function isPause() view returns (bool)",
    "function totalSupply() view returns (uint256)",
    "function maxSupply() view returns (uint256)",
    "function mintPrice() view returns (uint256)"
];

const Rabbit_address = process.env.contract_address;

const getData =  async (chainId=4) => {
    const provider = new ethers.providers.JsonRpcProvider(`https://${chain[chainId]}.infura.io/v3/${INFURA_ID}`)
    const contract = new Contract(Rabbit_address, ERC721_Rabbit_ABI, provider);
    const [isPause,totalSupplyBig,mintPriceBig] = await Promise.all([contract.isPause(),contract.totalSupply(),contract.mintPrice()]);
    const mintPriceETH = ethers.utils.formatEther(mintPriceBig);
    const totalSupply = totalSupplyBig.toNumber();

    return ({isPause:isPause, totalSupply:totalSupply, mintPrice:mintPriceETH})
};

export default getData




