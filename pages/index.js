import Head from 'next/head'
import { useState } from "react";
import data from '../data/data'
import Dropdown from '../components/Dropdown';
import Input from '../components/Input';

export default function App() {
  const [crops, setCrops] = useState(0);
  const [buyPrice, setBuyPrice] = useState(0);
  const [mats, setMats] = useState(0);
  const [selectedItem, setSelectedItem] = useState(-1)
  const [rewardType, setRewardType] = useState(-1)

  const basePrice = selectedItem > -1 && rewardType > -1 ? data[selectedItem][`reward${rewardType + 1}`]?.price : 0

  function calculate() {
    setMats((crops * buyPrice) / basePrice);
  }


  const dropdownValue = selectedItem > -1 ? data[selectedItem].name : 'Select crop'

  const rewardTypeValue = rewardType > -1 ? rewardType + 1 : 'Select reward type'

  const rewardName = selectedItem > -1 && rewardType > -1 ? data[selectedItem][`reward${rewardType + 1}`]?.name : ''

  return (
    <div className="App">
      <Head>
        <title>Manor calculator app</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="max-w-[1400px] mx-auto py-20">
        <h1 className="mb-10 text-3xl text-center">Manor calculator</h1>
        <div className="flex mb-10 -mx-4">
          <div className="w-1/4 px-4">
            <div>Seed type</div>
            <Dropdown data={data} handler={setSelectedItem} value={dropdownValue} />
          </div>
          <div className={`w-1/4  px-5 ${selectedItem < 0 ? 'opacity-50 pointer-events-none' : ''}`}>
            <div>Reward type</div>
            <Dropdown data={[{ name: '1' }, { name: '2' }]} handler={setRewardType} value={rewardTypeValue} />
          </div>
          <div className="w-1/4 px-5">
            <div>Number of crops</div>
            <Input
              handler={setCrops}
              value={crops || ''}
              type="number"
            />
          </div>
          <div className="w-1/4 px-5">
            <div>Castle buy price</div>
            <Input
              handler={setBuyPrice}
              value={buyPrice || ''}
              type="number"
            />
          </div>
        </div>
        <div className="flex flex-col items-center">
          <div className="inline-block px-6 py-3 mb-6 text-center border-2 border-gray-100 rounded cursor-pointer select-none" onClick={calculate}>
            Calculate
          </div>
          <div>{mats ? `${Math.floor(mats)} ${rewardName}` : ''}</div>
        </div>
      </div>
    </div>
  );
}

