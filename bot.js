const Discord = require("discord.js");
const client = new Discord.Client();
const schedule = require('node-schedule');
const gyms = require ("./gym.json");
var count = 1;


client.on("message", async message => {

    if(message.content.indexOf('!') !== 0) return;
    //if(message.channel.id !== '424656070892322826') return;
	
    const args = message.content.split(' ');
    const command = args.shift();
        

   		
    if(message.content == '!test'){
	message.guild.channels.find("name", "general").send('hello');
     }
	
	
	if(command == '!find'){
		var gyminput = args.join(" ").toLowerCase();
		var gymdb = gyms.gym;
		for(var gym in gymdb){
			if(gymdb[gym].gymname.toLowerCase().includes(gyminput)){
			   message.guild.channels.find("name", "general").send("**Gym Name:** " +gymdb[gym].gymname 
									       +"\n**Gym Location:** " +gymdb[gym].gymlocation
									      +"\n**EX Eligible:** " +gymdb[gym].exeligible
									      +"\n**Nearby Intersection:** "+gymdb[gym].nearbyintersection
									      +"\n**Notes:** "+gymdb[gym].notes);
			break;
			   }
		}

 	}

});


client.login(process.env.BOT_TOKEN);
