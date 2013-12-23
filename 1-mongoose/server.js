var mongoose = require('mongoose');
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

var populateDb = function() {
	var kitty = new Cat({ name: 'Billy2' });

	kitty.save(function(err) {
		if (err) throw err;

		var person = new Person({ name: 'Bill2', pet: kitty._id });

		person.save(function(err) {
			if (err) throw err;

			console.log(person);
		});
	});
};


var getPerson = function(models) {
	models.Person
	.findOne({ name: 'Bill2' })
	.populate('pet')
	.exec(function (err, person) {
		if (err) throw err;

		console.log('The pet is %s', person.pet.name);
		// prints "The creator is Aaron"
	})
};

var models = getModels();
getPerson(models);



/*kitty.save(function (err) {
	if (err) throw err;
	console.log('meow');
});*/