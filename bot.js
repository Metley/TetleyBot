const Discord = require("discord.js");
const client = new Discord.Client();
const schedule = require('node-schedule');
const gyms = require ("./gym.json");


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
	
	if(command === "purge") {
		// This command removes all messages from all users in the channel, up to 100.
		
		// get the delete count, as an actual number.
		const deleteCount = parseInt(args[0], 10);
		
		// Ooooh nice, combined conditions. <3
		if(!deleteCount || deleteCount < 2 || deleteCount > 100)
		  return message.reply("Please provide a number between 2 and 100 for the number of messages to delete");
		
		// So we get our messages, and delete them. Simple enough, right?
		const fetched = await message.channel.fetchMessages({count: deleteCount});
		message.channel.bulkDelete(fetched)
		  .catch(error => message.reply(`Couldn't delete messages because of: ${error}`));
	}

});


client.login(process.env.BOT_TOKEN);
