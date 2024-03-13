import React, {useContext} from 'react'

import { DataContext } from '../../../API/data';

const MainMinerStats = () => {

  const { data } = useContext(DataContext);

  const miners = data.data; 


  return (
    <div>MainMinerStats
    </div>
  )
}

export default MainMinerStats