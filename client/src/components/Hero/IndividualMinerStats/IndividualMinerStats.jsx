import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { DataContext } from '../../../API/data';
import IndividualStats from './IndividualStats/IndividualStats';
import IndividualMinerTable from './IndividualMinerTable/IndividualMinerTable';
import IndividialMinerHashrateChart from './IndividialMinerHashrateChart/IndividialMinerChart';
import IndividualMinerRevenueChart from './IndividualMinerRevenueChart/IndividualMinerRevenueChart';
import classes from './IndividualMinerStats.module.css'


const MinerStats = () => {
    const { minerId } = useParams(); // Extract minerId from URL
    const { data } = useContext(DataContext); // Assuming data is an array of miners

    // Find the specific miner from your data
    // Assuming your data structure is an array of miner objects
    const miner = data.find(m => m.minerId === minerId);

    // Check if miner data exists
    if (!miner) {
        return <div>Miner not found</div>;
    }

    return (
        <div className={classes['container']}>
            <div className={classes['stats-container']}>
                <IndividualStats miner={miner}/>
                <IndividualMinerTable miner={miner}/>
            </div>
            <div className={classes['chart-container']}>
                <IndividialMinerHashrateChart/>
                <IndividualMinerRevenueChart/>
            </div>
            
        </div>
    );
}

export default MinerStats;
