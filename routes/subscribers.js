const express = require('express');
const router = express.Router();

const Subscriber = require('../models/subscriber');

// middleware to fetch subscriber from id
const getSubscriber = async (req, res, next) => {
	let subscriber;
	try {
		subscriber = await Subscriber.findById(req.params.id);
		if (subscriber == null) {
			return res.status(404).json({
				message: `Failed to find subscriber with id ${req.params.id}`,
			});
		}
	} catch (err) {
		return res.status(500).json({
			message: err.message,
		});
	}
	res.subscriber = subscriber;
	next();
};

// get all subscribers
router.get('/', async (req, res) => {
	try {
		const subscribers = await Subscriber.find();
		res.status(200).json(subscribers);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

// get subscriber by id
router.get('/:id', getSubscriber, (req, res) => {
	res.status(200).json(res.subscriber);
});

// create subscriber
router.post('/', async (req, res) => {
	const subscriber = new Subscriber({
		name: req.body.name,
		subscriberToChannel: req.body.subscriberToChannel,
	});
	try {
		const newSubscriber = await subscriber.save();
		res.status(201).json(newSubscriber);
	} catch (err) {
		res.status(400).json({
			message: err.message,
		});
	}
});

// delete subscriber by id
router.delete('/:id', getSubscriber, async (req, res) => {
	try {
		await res.subscriber.remove();
		res.status(200).json(res.subscriber);
	} catch (err) {
		res.status(500).json({
			message: err.message,
		});
	}
});

// update subscriber by id
router.patch('/:id', getSubscriber, async (req, res) => {
	if (req.body.name != null) {
		res.subscriber.name = req.body.name;
	}
	if (req.body.subscriberToChannel != null) {
		res.subscriber.subscriberToChannel = req.body.subscriberToChannel;
	}
	try {
		const updatedSubscriber = await res.subscriber.save();
		if (updatedSubscriber == null) {
			return res.status(500).json({
				message: `Failed to update subscriber with id ${req.params.id}`,
			});
		}
		res.status(200).json(updatedSubscriber);
	} catch (err) {
		res.status(400).json({
			message: err.message,
		});
	}
});

module.exports = router;
