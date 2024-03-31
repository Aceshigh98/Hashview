import React from 'react'
import classes from './IndividualStats.module.css';
import { MdDriveFileRenameOutline } from "react-icons/md";
import { GrStatusGood } from "react-icons/gr";
import { GrStatusWarning } from "react-icons/gr";
import { HiIdentification } from "react-icons/hi2";

const MinerStatsContainer = ({miner}) => {
    

  return (
            <div className={classes['stats']}>
                <h1>Miner Details</h1>
                <div className={classes['stats-inner']}>
                    {/* Display miner details. Modify as needed based on your data structure */}
                    <div className={classes['stats-inner-div']}>
                        
                        <div className={classes['details']}>
                            <h3>{miner.minerId}</h3>
                            <p>Miner ID</p>
                        </div>
                        
                        <div className={classes['icon']}>
                            <HiIdentification className={classes['icon-inner']}/>
                        </div>             
                    </div> 
                    <div className={classes['stats-inner-div']}>
                        
                        <div className={classes['details']}>
                            <h3>{miner.workerName}</h3>
                            <p>Worker Name</p>
                        </div>
                        
                        <div className={classes['icon']}>
                            <MdDriveFileRenameOutline className={classes['icon-inner']}/>
                        </div>
                    </div> 
                    <div className={classes['stats-inner-div']}>
                        <div className={classes['details']}>
                            <h3>{miner.status}</h3>
                            <p>Status</p>
                        </div>
                        <div className={classes['icon']}>
                            {miner.status === 'Active' ? <GrStatusGood className={classes['icon-inner-active']}/> : <GrStatusWarning className={classes['icon-inner-inactive']}/>}
                        </div> 
                    </div>  
                {/* Add more details about the miner here */}
                </div>
                
            </div>
  )
}

export default MinerStatsContainer