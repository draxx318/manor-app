import Head from 'next/head'
import { useState, useEffect } from "react";
import data from '../data/data'
import Dropdown from '../components/Dropdown';
import Input from '../components/Input';

export default function App() {
  const [crops, setCrops] = useState(0);
  const [buyPrice, setBuyPrice] = useState(0);
  const [mats, setMats] = useState(0);
  const [selectedItem, setSelectedItem] = useState(-1)
  const [rewardType, setRewardType] = useState(-1)

  useEffect(() => {
    setMats(0)
  }, [crops, buyPrice, selectedItem, rewardType])

  const selectedCrop = selectedItem > -1 ? data[selectedItem] : null

  const basePrice = selectedCrop && rewardType > -1 ? selectedCrop.rewards[rewardType].price : 0

  function calculate() {
    setMats((parseInt(crops, 10) * parseInt(buyPrice, 10)) / basePrice);
  }

  const dropdownValue = selectedItem > -1 ? data[selectedItem].name : 'Select crop'

  const rewardTypeValue = rewardType > -1 ? rewardType + 1 : 'Select reward type'

  const rewardObj = selectedCrop && rewardType > -1 ? selectedCrop.rewards[rewardType] : null

  return (
    <div className="App">
      <Head>
        <title>Manor calculator app</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="max-w-[1400px] px-5 md:px-16 lg:px-20 mx-auto py-20">
        <h1 className="mb-10 text-3xl text-center">Manor calculator</h1>
        <div className="flex flex-wrap mb-10 -mx-4 lg:flex-nowrap">
          <div className="w-full px-4 mb-10 lg:w-1/4 lg:mb-0 md:w-1/2">
            <Dropdown label="Seed type" data={data} handler={setSelectedItem} value={dropdownValue} />
          </div>
          <div className={`lg:w-1/4 mb-10 lg:mb-0 md:w-1/2 w-full  px-5 ${selectedItem < 0 ? 'opacity-50 pointer-events-none' : ''}`}>
            <Dropdown label="Reward type" data={[{ name: '1' }, { name: '2' }]} handler={setRewardType} value={rewardTypeValue} />
          </div>
          <div className="w-full px-5 mb-10 md:mb-0 lg:w-1/4 md:w-1/2">
            <Input
              label="Number of crops"
              handler={setCrops}
              value={crops || ''}
              type="number"
            />
          </div>
          <div className="w-full px-5 mb-10 md:mb-0 lg:w-1/4 md:w-1/2">
            <Input
              label="Castle buy price"
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
          {
            !!mats && (
              <div className="flex items-center">
                <img src={rewardObj?.image.src} className="w-8 mr-3" />
                <div>
                  {`${Math.floor(mats)} ${rewardObj?.name}`}
                </div>
              </div>
            )
          }
        </div>
      </div>
    </div>
  );
}

