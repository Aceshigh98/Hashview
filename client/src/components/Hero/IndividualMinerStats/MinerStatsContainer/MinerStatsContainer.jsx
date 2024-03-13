import React from 'react'
import classes from './MinerStatsContainer.module.css';

const MinerStatsContainer = ({miner}) => {
  return (
            <div className={classes['stats']}>
                <h1>Miner Details</h1>
                <div className={classes['stats-inner']}>
                    {/* Display miner details. Modify as needed based on your data structure */}
                    <div>
                        <h3>{miner.minerId}</h3>
                        <p>Miner ID</p>
                    </div> 
                    <div>
                        <h3>{miner.workerName}</h3>
                        <p>Worker Name</p>
                    </div> 
                    <div>
                        <h3>{miner.status}</h3>
                        <p>Status</p>
                    </div>  
                {/* Add more details about the miner here */}
                </div>
                
            </div>
  )
}

export default MinerStatsContainer