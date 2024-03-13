import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { DataContext } from '../../../API/data';
import MinerStatsContainer from './MinerStatsContainer/MinerStatsContainer';


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
        <MinerStatsContainer miner={miner}/>
    );
}

export default MinerStats;
