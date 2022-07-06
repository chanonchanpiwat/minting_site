import React, { useEffect, useState } from 'react'
import { Item } from 'semantic-ui-react'
import crane from '../assets/crane.gif'
import getData from './getData.js'
import handleMint from './mint'

const Main = () => {
  const [totalSupply,setTotalSupply] = useState('...');
  const [mintPrice,setMintPrice] = useState(0.002);
  const [status,setStatus] = useState(true);
  const [mintAmount,setMintAmount] = useState(1);

  useEffect(() => {
    async function fetchData() {
      const data = await getData();
      setTotalSupply(data.totalSupply);
      setMintPrice(data.mintPrice);
      setStatus(data.isPause);
      // ...
    }
    fetchData().catch(console.error);
  }, []); // Or [] if effect doesn't need props or state


  const handleChange = (event) => {
    setMintAmount(event.target.value);
  }
  

  const DisplayImage = ({mintAmount,totalSupply}) => {
    let NFT_list=[];
    for (let i=0;i<mintAmount;i++){
      NFT_list[i]=i+totalSupply
    }
    return (<div className='flex flex-col md:flex-row'>
      {NFT_list.map( (Item) => <img src={`https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${Item.toString().padStart(3, "0")}.png`} alt="" className='m-2 w-30 bg-slate-300 rounded-xl border-4 border-teal-200'/>)}
    </div>);

  }

  // <img src={`https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${totalSupply.toString().padStart(3, "0")}.png`} alt="" className='m-2 w-30 bg-white'/>

  return (
    <main className='flex flex-col justify-around items-center w-screen h-fit my-4 overflow:scroll'>
      <div className='flex flex-col items-center justify-center rounded-xl bg-slate-100 border-4 border-stone-400'>
        <DisplayImage mintAmount={mintAmount} totalSupply={totalSupply} />
        <div className='flex flex-row p-4'>
          <div className='mx-2 p-3 font-bold rounded-md bg-black text-white'>{`Minted ${totalSupply} /898`}</div>
          <div className='mx-2 p-3 font-bold rounded-md bg-black text-white'>{`1 NFT = ${mintPrice} ETH`}</div>
        </div>
        <div className='w-full flex justify-center p-4 bg-yellow-300 rounded-b-lg'>
          {status?  <div className='flex justify-between items-center border-4 border-gray-900 bg-blue-300 p-2 rounded-lg'>
            <form >
              <select value={mintAmount} onChange={handleChange} className='w-16 p-2 rounded-md items-center content-center'>
                <option value={1}>{1}</option>
                <option value={2}>{2}</option>
                <option value={3}>{3}</option>
              </select>
            </form>
            <button onClick={() => handleMint({mintAmount: mintAmount,mintPrice: mintPrice})} className=' bg-red-200 p-2 ml-2 rounded-md font-extrabold text-pink-700'>
              Mint
            </button>
            </div> : <div className='flex bg-slate-200  p-2 rounded-md font-extrabold text-neutral-800 border-2 border-slate-600'>
                  <p>minting is paused</p>
            </div>}
        </div>
      </div>
      <article className='my-16 flex flex-col'>
        <h1 className='m-2 text-left text-3xl font-bold'>About</h1>
        <p className='p-4 bg-white rounded-lg align-text-top max-w-xl text-justify text-2xl'>
        This miniting site is created for testing purpose.You can mint a NFT from this site only on rinkeby testnet. The pic shown above will change corresponding to the tokenID avariable. You can refresh page to re-load information about NFT including amount of NFT minted, NFT price and contract status which if it is paused minting button will not be displayed. 
        </p>
        <div className='font-medium my-2'>
          Address : 0x8a9EaAAA30F63cF9e2453A022125eE5Cde894874
        </div>
      </article>
    </main>
  )
}

export default Main