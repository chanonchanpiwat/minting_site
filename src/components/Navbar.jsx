import React, { useEffect, useState} from 'react'
import logo from '../assets/logo.png'
import { ethers } from 'ethers';
import { Popup } from "semantic-ui-react";

const WalletWindow = ({address,chainId,switchWallet}) => {
  
  const NETWORKS = {
    1: "Ethereum",
    3: "Ropsten",
    4: "Rinkeby",
    5: "Goerli",
    10: "Optimism",
    42: "Kovan",
    137: 'Polygon',
    42161: 'Arbitrum'
  };

  const addressCheckSummed = ethers.utils.getAddress(address);
  const chainName = NETWORKS[parseInt(chainId, 16)];

  return (
  <div className='flex flex-col space-y-4'>
    <Popup trigger={<button onClick={switchWallet} className='w-50 flex mx-1 p-1 space-x-1 rounded-2xl items-center bg-yellow-300'>
      <div className='m-2 font-extrabold'>
        {chainName}
      </div>
      <div className='font-bold px-1 py-2 border-4 rounded-xl hover:border-yellow-200 bg-white'>
        {`${addressCheckSummed.slice(0,5)}...${address.slice(-4,addressCheckSummed.lenght)}`}
      </div>
    </button>} position="bottom center">
      {<p className='bg-slate-100 rounded-xl mt-5 p-4 opacity-75'>Click to switch wallet</p>}
    </Popup>
  </div>
  )

}




const ConnectWallet = ({onClickConnect}) => {
  return (
    <button onClick={onClickConnect} className='font-extrabold p-2 bg-yellow-300 rounded-xl border-4 hover:border-green-400'>
      Connect Wallet
    </button>
  )

}

const Navbar = () => {

  const [address,setAddress] = useState(null);
  const [chainId,setChainId] = useState(null);
  const [isConnect,setIsConnect] = useState(false);

  const onClickConnect = async () => {
    try {
      await window.ethereum.request({method: "wallet_requestPermissions",params: [{eth_accounts: {}}]})
      const [accounts,chainId] = await Promise.all([window.ethereum.request({ method: "eth_requestAccounts" }),await window.ethereum.request({ method: "eth_chainId" })]);
      await window.ethereum.request({method: 'wallet_switchEthereumChain',params: [{ chainId: '0x4' }]})
      console.log('login')
      setAddress(accounts[0]);
      setChainId(chainId);
      setIsConnect(true);
    } catch (error) {
      alert('window.ethereum is not found');
    }
  }
  
  //only handleAccountsChange is triggered when metamsk is disconnected
  const handleAccountsChange = (accounts) => {
    //catch null accounts
    if (accounts[0] == null) {
      console.log('logout')
      setIsConnect(false);
      setAddress(null);
      setChainId(null);
    }
    //catch other account
    else {
      console.log('changeAccount')
      setAddress(accounts[0]);
    }

  }

  //chainChange is not triggered when user logout
  const chainChange = (chainId) => {
    console.log(chainId)
    if (chainId.lenght !== 0) {
      setChainId(chainId);
    } 
  }

  useEffect(() => {
    // accounts and chainId is passed into to callback function
    if (isConnect) {
      window.ethereum.on('accountsChanged', handleAccountsChange);
      window.ethereum.on('chainChanged',chainChange);
    }
    return  () => { 
      if (isConnect) {
        window.ethereum.removeListener('accountsChanged',handleAccountsChange);
        window.ethereum.removeListener('chainChanged',chainChange);
      }
  }}
    ,[isConnect])
  


  return (
    <nav className='w-screen my-3 flex justify-between md:justify-around items-center'>
        <div className='flex flex-row items-center justify-center'>
          <div className='flex justify-center items-center bg-blue-300 w-16 p-2 rounded-full mx-2'>
            <img src={logo} alt="logo" className='w-7'/>
          </div>
          <div className='font-extrabold'>
            NFT Pokemon
          </div>
        </div>
        <div className='flex mx-2 items-center justify-end'>
          <div>
            {!isConnect ? <ConnectWallet onClickConnect={onClickConnect}/>:<WalletWindow switchWallet={onClickConnect} address={address} chainId={chainId}/>}
          </div>
        </div>  
    </nav>
  )
 }
  
  

export default Navbar
