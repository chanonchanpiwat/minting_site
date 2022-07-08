
//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import '@openzeppelin/contracts/token/ERC721/ERC721.sol';
import '@openzeppelin/contracts/access/Ownable.sol';

contract RabbitNft is ERC721, Ownable {
    uint256 public mintPrice;
    uint256 public totalSupply;
    uint256 public maxSupply;
    uint256 public maxPerWallet;
    bool public isPause = true;
    string internal baseTokenUri;
    address payable public withdrawWallet;
    mapping(address => uint256) public walletMints;

    constructor() payable ERC721('RabbitNft','RBT') {
        mintPrice = 0.002 ether;
        totalSupply = 0;
        maxSupply =1000;
        maxPerWallet=3;

    }

    function setIsPublicMintEnable(bool _isPause) external onlyOwner {
        isPause=_isPause;
    }

    function setBaseTokenUri(string calldata _baseTokenUri) external onlyOwner {
        baseTokenUri = _baseTokenUri;
    }

    function tokenURI(uint256 _id) public view override returns (string memory){
        require(_exists(_id),'This token does not exist!');
        return string(abi.encodePacked(baseTokenUri,Strings.toString(_id),'.json'));
    }

    function withdraw() external onlyOwner {
        (bool success,)=withdrawWallet.call{value:address(this).balance}('');
        require(success,'withdraw failed' );
    }

    function mint(uint256 _quantity) public payable {
        require(isPause,'minting not enable');
        require(msg.value==_quantity*mintPrice,'wrong mint value');
        require(totalSupply+_quantity<=maxSupply,'sold out');
        require(walletMints[msg.sender]+_quantity<=maxPerWallet,'exeed max wallet');

        for (uint256 i=0;i<_quantity;i++){
            uint256 newTokenId = totalSupply+1;
            totalSupply++;
            _safeMint(msg.sender,newTokenId);
        }
    }
}