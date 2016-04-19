var Copterface = require('./lib/copterface');
var arDrone = require('ar-drone');
var client = arDrone.createClient();
client.config('video:video_channel', '1');
var pngStream = client.getPngStream();
client.ftrim();

//state controllers
var NUMFACES = 2;
var keepFlying = true;
var detectFaces = true;
var facesFound = 0;
client.takeoff();
//client.calibrate(0);
//end
client.calibrate(0);

//-------------------testing turning in a right angle left
client
	.after(10000, function(){
		this.stop();
	});


var copterface = Copterface(pngStream,function(info){
	if (detectFaces && (facesFound < NUMFACES)){
		client.front(0.02);
		var faces = info.rects;
		if((faces.length != 0) && keepFlying){
			client.stop();
			client.land();
			keepFlying = false;
			detectFaces = false;
			facesFound = facesFound+1;
			client
				.after(0, function(){
					console.log('ENDING FLIGHT');
					this.stop();
					this.land();
				});
				
			if(facesFound < NUMFACES){
				client
					.after(2000, function(){
						console.log('Taking off again, more faces to be found');
						this.takeoff();
						this.front(0.02);
					})
					.after(1500, function(){
						keepFlying = true;
						detectFaces = true;
					});								
			}		
		}
		console.log(info);
	}
});


copterface.start();
