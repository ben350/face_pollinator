//testing sweeping an area with the quadcopter for faces
//finishes once it finds the required number of faces
//or does a certain number of turns

var Copterface = require('./lib/copterface');
var arDrone = require('ar-drone');
var client = arDrone.createClient();
var NUM_FACES = 1;

//---------------configuration--------
client.config('general:navdata_demo', 'FALSE');
client.config('video:video_channel', '1');
var pngStream = client.getPngStream();
var faces = null;
// some variable for future calculations
// var maxX = 160;
// var maxY = 90;

//client.takeoff();

//--------start getting the stream--------
var copterface = Copterface(pngStream,function(info){

	faces = info.rects;

	while (faces.length!= 0){
		console.log("moving forward");
	}
	console.log(info);
	if( faces.length != 0){
		console.log("Xcoord: " +faces[0].x);
		console.log("Ycoord: " +faces[0].y);
		console.log("LANDING");
		//client.land();
		// more movement stuff 
		// if ( faces[0].x > (maxX/2) ){
		// 	console.log("moving RIGHT");
		// } else {
		// 	console.log("moving LEFT");
		// }

		// if ( faces[0].y > (maxY/2) ){
		// 	console.log("moving FORWARD");
		// } else {
		// 	console.log("moving BACKWARD");
		// }
	}
});

copterface.start();
