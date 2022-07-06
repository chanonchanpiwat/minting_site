# Minting Web 
This site is created for testing a NFT miniting web. A smart contract is deployed on rinkeby testnet. 
A front-end web are responsible for calling smart contract minting function and retriving 
blockchain data including totalsupply, mintprice and status via infura API. 

# How to run
1. git clone ----
2. npm install
3. add .env which should include your infura API_KEYS and contract address you wish to interact with
4. reconfig your ABI according to your contract

# How it work
1. connect wallet [the site will automatically switch your network to rinkeby testnet]
2. specific amount of NFT you would like to mint and pressing mint button
3. after NFT is minted totalsupply and image shown on web will change coresponding to the remaining tokenID

<img src="/screenshot/2.png" alt="screenshot"/>
<img src="/screenshot/1.png" alt="screenshot"/>
<img src="/screenshot/3.png" alt="screenshot"/>
<img src="/screenshot/4.png" alt="screenshot"/>

# How to run
1. git clone ----
2. npm install
3. add .env which should include your infura API_KEYS and contract address you wish to interact with
4. reconfig contract ABI according to smart contract you wish to interact with
5. npm start

