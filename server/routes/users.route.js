// Express
const express = require('express');
const router = express.Router();
// Database
const db = require('../models/db')
// Validator function
const {validate_email, validate_name} = require('./validator');
// Crypto
const crypto = require('crypto');



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
		if(result.length > 0) {
			response.status = 1;
			response.data = result;
			res.status(200).json(response);
			return;
		}
		else {
			response.status = 0;
			response.message = 'users not found';
			res.status(200).json(response);
		}
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
	const sql = "SELECT * FROM users WHERE userid = ? LIMIT 1";
	db.query(sql, parseInt(id), (err, result) => {
		if(err) {
			response.status = 0;
			response.message = 'server error';
			res.status(500).json(response);
			return;
		}
		if(result.length > 0) {
			response.status = 1;
			response.data = result;
			res.status(200).json(response);
		} else {
			response.status = 0;
			response.message = 'user not found';
			res.status(200).json(response);
		}
	});
});



// POST
router.post('/', (req, res) => {
	const name = validate_name(req.body.name);
	const email = validate_email(req.body.email);
	const password = crypto.createHash('sha256').update(req.body.password).digest('hex');

	if(!(name && email && password)) {
		res.status(400).json({status: 0, message: 'invalid inputs'});
		return;
	}

	const response = {};
	const sql = "INSERT INTO users(username, email, password) VALUES(?, ?, ?)";
	db.query(sql, [name, email, password], (err, result) => {
		if(err) {
			response.status = 0;
			response.message = 'server error';
			res.status(500).json(response);
			return;
		}
		response.status = 1;
		response.message = "user created";
		res.status(200).json(response);
	});
});

// PUT
router.put('/:id', (req, res) => {
	
	let id = req.params.id;
	if(isNaN(id)) {
		res.status(400).json({status: 0, message: 'invalid userid'});
		return;
	}

	const response = {};
	const sql = "SELECT * FROM users WHERE userid = ? LIMIT 1";	
	db.query(sql,parseInt(id), (err, result) => {
		if(err) {
			response.status = 0;
			response.message = 'server error';
			console.log(err);
			res.status(500).json(response);
			return;
		}
		if(result.length > 0) {

			const name = validate_name(req.body.name);
			const email = validate_email(req.body.email);
			const password = crypto.createHash('sha256').update(req.body.password).digest('hex');
	
			if(!(name && email && password)) {
				res.status(400).json({status: 0, message: 'invalid inputs'});
				return;
			}
	
			const response = {};
			const sql = "UPDATE users SET username = ?, email = ?, password = ? WHERE userid = ?";
			db.query(sql, [name, email, password, id], (err, result) => {
				if(err) {
					response.status = 0;
					response.message = 'server error';
					res.status(500).json(response);
					return;
				}
				response.status = 1;
				response.message = "user updated";
				res.status(200).json(response);
			});

		}
		else {
			response.status = 0;
			response.message = 'user not found';
			res.status(200).json(response);
		}
	});
});

// DELETE
router.delete('/:id', (req, res) => {
	let id = req.params.id;

	if(isNaN(id)) {
		res.status(400).json({status: 0, message: 'invalid userid'});
		return;
	}

	const response = {};
	const sql = "DELETE FROM users WHERE userid = ?";
	db.query(sql, parseInt(id), (err, result, field) => {
		if(err) {
			response.status = 0;
			response.message = 'server error';
			res.status(500).json(response);
			return;
		}
		if(result.affectedRows == 1) {
			response.status = 1;
			response.message = 'user deleted sucessfully';
			res.status(200).json(response);
		}
		else if (result.affectedRows == 0) {
			response.status = 0;
			response.message = 'invalid user';
			res.status(400).json(response);
		}
	});
});


// Export router
module.exports = router;