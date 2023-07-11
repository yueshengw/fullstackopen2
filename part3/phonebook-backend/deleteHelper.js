require("dotenv").config();
const name = process.argv[2];
if (name) {
	const mongoose = require("mongoose");

	mongoose.set("strictQuery", false);
	mongoose.connect(process.env.MONGODB_URI).catch(() => {
		console.log("Connection failed");
	});
	const Person = new mongoose.model("Person", new mongoose.Schema({
		name: String,
		number: String
	}));
	console.log("name: '"+name+"'");
	Person.find({})
		.then(findResult => {
			console.log("before:",findResult.length);
			Person.deleteMany({ "name": name })
				.then(deleteResult => {
					console.log("after:",findResult.length - deleteResult.deletedCount);
					mongoose.connection.close();
				});
		});
}
