import { color } from 'chart.js/helpers';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const NextMilkBottle = () => {
    const lastBottleConsumed = new Date(useSelector((state) => state.events.lastBottleConsumed));
    const nextBottleToConsume = new Date(new Date(lastBottleConsumed).getTime() + 4 * 60 * 60 * 1000);
    const diff = new Date(nextBottleToConsume) - new Date();
    const [styles, setStyles] = useState({});
    const [NextBottleTime, setNextBottleTime] = useState(null);

    useEffect(() => {
        if((diff / (1000 * 60 * 60)) <= 0){
            setStyles({color : '#80001acb'})
        }else{
            setStyles({color : '#00801acb'})
        }
    },[NextBottleTime])
     
    useEffect(()=>{
        setNextBottleTime(`${String(Math.floor(Math.abs(diff) / (1000 * 60 * 60))).padStart(2, '0')}:${String(Math.floor((Math.abs(diff) % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, '0')}:${String(Math.floor((Math.abs(diff) % (1000 * 60)) / 1000)).padStart(2, '0')}`)
    },[lastBottleConsumed])

  return (
    <div className='col-11 col-md-3 staticsComp'>
        <h5 className='mt-2 mb-0 text-center'>Next bottle of milk</h5>
        <hr />
        <div className='d-flex align-items-center justify-content-center h-50'>
            <p className='nextBottleTime text-center' style={styles}>{NextBottleTime}</p>
        </div>

    </div>
  )
}

export default NextMilkBottle