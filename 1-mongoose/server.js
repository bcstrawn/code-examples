var mongoose = require('mongoose');
var forEach = require('../forEach.js');
var Schema = mongoose.Schema;
mongoose.connect('mongodb://localhost/test');

var getModels = function() {
	var models = {};

	var CatSchema = new Schema({name: String});
	models.Cat = mongoose.model('Cat', CatSchema);

	var PersonSchema = new Schema({
		name: String,
		pet: { type: Schema.Types.ObjectId, ref: 'Cat' }
	});
	models.Person = mongoose.model('Person', PersonSchema);

	return models;
};

var getModelsFromObject = function() {
	var personModel = {
		name: {
			type: String
		}
	};

	var models = {};

	var CatSchema = new Schema({name: String});
	models.Cat = mongoose.model('Cat', CatSchema);

	var PersonSchema = new Schema({
		name: personModel.name.type,
		pet: { type: Schema.Types.ObjectId, ref: 'Cat' }
	});
	models.Person = mongoose.model('Person', PersonSchema);

	return models;
};

var printSchema = function() {
	console.log(new Schema({name: String, age: Number}));
};

var populateDb = function(models) {
	var kitty = new models.Cat({ name: 'Billy' });

	kitty.save(function(err) {
		if (err) throw err;

		var person = new models.Person({ name: 'Bill', pet: kitty._id });

		person.save(function(err) {
			if (err) throw err;

			console.log(person);
		});
	});
};

var getNames = function(models) {
	models.Person.find({}, 'name', function(err, people) {
		if (err) throw err;

		var names = forEach.select(people, function(person) {
			return person.name;
		});
		console.log(names);
	});
};

var getPerson = function(models) {
	models.Person
	.findOne({ name: 'Bill2' }, 'name')
	// .populate('pet')
	.exec(function (err, person) {
		if (err) throw err;

		// console.log('The pet is %s', person.pet.name);
		// console.log(JSON.stringify(person, null, 2));
		/*for (var field in person) {
			if (person.hasOwnProperty(field))
			console.log(field, ':', person[field]);
		}*/
		console.log(person._doc);
		
		/*person.name = 'Bill2';
		person.save();*/
	});
};

var updateGuy = function(models) {
	var newGuy = new models.Person({
		_id: "52bb56cbca5e3bcc14000002",
		name: "bobo"
	});

	newGuy.save(function(err, thing) {
		if (err) throw err;
		console.log(thing);
	});
};

var useString = function(models) {
	models.Person.findOne(
		{ _id: "52b9130ea1728fc419000002" },
		function(err, person) {
			if (err) throw err;

			console.log(person.name);
		}
	);
};

var models = getModels();
// populateDb(models);
//useString(models);
// getPerson(models);
// printSchema();
// getNames(models);
updateGuy(models);


/*kitty.save(function (err) {
	if (err) throw err;
	console.log('meow');
});*/