

const express = require('express');
const router = express.Router();
const minersSchema = require('../schemas/minersSchema');

router.get('/api/data', async (req, res) => {
    try {
        const data = await minersSchema.find();
        res.json(data); 
    } catch(error) {
        console.log('Error fetching Data: ', error);
        res.status(500).json({message: 'Internal server error'})
    }
});

module.exports = router;

