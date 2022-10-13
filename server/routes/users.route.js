const express = require('express');
const router = express.Router();

const db = require('../models/db')

//	GET all
router.get('/', (req, res) => {
	
	const response = {};
	const sql = "SELECT * FROM users";
	db.query(sql, (err, result) => {
		if(err) {
			response.status = 0;
			response.message = 'server error';
			res.status(500).json(response);
			return;
		}
		response.status = 1;
		response.data = result;
		res.status(200).json(response);
	});
});


//	GET one
router.get('/:id', (req, res) => {
	
	let id = req.params.id;

	if(isNaN(id)) {
		res.status(400).json({status: 0, message: 'invalid userid'});
		return;
	}

	const response = {};
	const sql = "SELECT * FROM users WHERE userid = ?";
	db.query(sql, parseInt(id), (err, result) => {
		if(err) {
			response.status = 0;
			response.message = 'server error';
			res.status(500).json(response);
			return;
		}
		if (result.length > 0) {
			response.status = 1;
			response.data = result;
			res.status(200).json(response);
		}
		else if(result.length <= 0) {
			response.status = 0;
			response.message = 'user doesnot exists';
			res.status(404).json(response);
		}
	});
});



// POST
router.post('/', (req, res) => {
	res.json(req.body)
});

// PATCH
router.patch('/', (req, res) => {
	res.json(req.body)
});


// Export router
module.exports = router;