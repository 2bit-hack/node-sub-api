# node-sub-api

A [Node.js](https://nodejs.org/en/) RESTful API made using [Express](https://expressjs.com/), [MongoDB](https://www.mongodb.com/), and [Mongoose](https://mongoosejs.com/)
It stores and retrieves YouTube subscriber data
and supports GET/, GET/:id/, POST/, PATCH/:id/, and DELETE/:id/ routes

## Schema

```
    name: {
		type: String,
		required: true,
	},
	subscriberToChannel: {
		type: String,
		required: true,
	},
	subscribeDate: {
		type: Date,
		required: true,
		default: Date.now,
	}
```

## Usage

```
git clone https://github.com/2bit-hack/node-sub-api.git
npm install
touch .env
// export DATABASE_URL=mongodb://path/to/database
npm start run
```
