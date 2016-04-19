// this file is for testing some functions for parrot ar drone

var Copterface = require('./lib/copterface');
var arDrone = require('ar-drone');
client = arDrone.createClient()
//getting infor from the
client.config('general:navdata_demo', 'FALSE');
//configuring the client to make the stream input from the drone bottom camera
client.config('video:video_channel', '1');
var pngStream = client.getPngStream();

//starting the face detection stuff
var copterface = Copterface(pngStream,function(info){
	console.log(info);
	//testing to see if there ar
});

//making the ar-drone fly
client.takeoff();

//--------------------testing calibration function
//this code should calibrate the magnetometer(device number - 0)
client.calibrate(0);

//-------------------testing turning in a right angle left
client
	.after(10000, function(){
		this.stop();
		this.front(0.05);
	})
	.after(5420, function(){
		this.land();
	});
	// .after(1000, function(){
		// console.log('turning left');
		// this.counterClockwise(0.05);
	
	// });

