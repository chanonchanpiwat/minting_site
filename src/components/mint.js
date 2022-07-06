const { ethers } = require("ethers");


const ERC721_Rabbit_ABI = [
    "function withdraw() view",
    "function mint(uint256) payable external",
];
const Rabbit_address = process.env.contract_address;

const handleMint = async ({mintAmount,mintPrice}) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
        Rabbit_address,
        ERC721_Rabbit_ABI,
        signer,
    );

    try {
        const tx = await contract.mint(ethers.BigNumber.from(mintAmount),{value:ethers.utils.parseEther((mintPrice*mintAmount).toString())});
        await tx.wait();
        console.log(tx);
    }   catch(err){
        console.log("error: ",err)
    }
}

export default handleMint