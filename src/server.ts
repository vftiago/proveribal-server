import { connect } from "mongodb";

connect("mongodb://localhost:27017/proverbial", function(err, client) {
	if (err) throw err;

	const db = client.db();

	db
		.collection("proverbs")
		.find({ lang: "en" })
		.toArray(function(err, result) {
			if (err) throw err;

			console.log(result);
		});
});
