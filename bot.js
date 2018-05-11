const Discord = require("discord.js");
const client = new Discord.Client();
const schedule = require('node-schedule');
const gyms = require ("./gym.json");


client.on("message", async message => {

    if(message.content.indexOf('!') !== 0) return;
    //if(message.channel.id !== '424656070892322826') return;
	
    const args = message.content.split(' ');
    const command = args.shift().toLowerCase();
        

   		
    if(message.content == '!test'){
		message.guild.channels.find("name", "general").send('hello');
    }
	
	
	if(command == '!find'){
		var gyminput = args.join(" ").toLowerCase();
		var gymdb = gyms.gym;
		var found = 0;
		for(var gym in gymdb){
			if(gymdb[gym].gymname.toLowerCase().includes(gyminput)){
			   message.channel.send("**Gym Name:** " +gymdb[gym].gymname 
									       +"\n**Gym Location:** " +gymdb[gym].gymlocation
									      +"\n**EX Eligible:** " +gymdb[gym].exeligible
									      +"\n**Nearby Intersection:** "+gymdb[gym].nearbyintersection
									      +"\n**Notes:** "+gymdb[gym].notes)
				.then(msg => {msg.delete(900000)}).catch((err) => {console.error(err)});;
				found = 1
				break;
			}
		}
		if(found == 0){
			message.channel.send("Gym Not Found").then(msg => {msg.delete(30000)}).catch((err) => {console.error(err)});;
		}

 	}
	
	if(command == '!post'){
		var gyminput = args.join(" ").toLowerCase();
		var gymdb = gyms.gym;
		var found = 0;
		for(var gym in gymdb){
			if(gymdb[gym].gymname.toLowerCase().includes(gyminput)){
			   message.channel.send("**" +gymdb[gym].gymname 
									       +": **" +gymdb[gym].gymlocation)
				.then(msg => {msg.delete(5400000)}).catch((err) => {console.error(err)});;
				found = 1;
				break;
			}
		}
		if(found == 0){
			message.channel.send("Gym Not Found").then(msg => {msg.delete(30000)}).catch((err) => {console.error(err)});;
		}

 	}
	
	if(command == '!exsheet'){
		message.channel.send("Sheet: http://goo.gl/xauVqj");
	}
	
	if(command == '!exmap'){
		message.channel.send("Map: https://goo.gl/GNG44U");
	}
	
	

});


client.login(process.env.BOT_TOKEN);
