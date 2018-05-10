const Discord = require("discord.js");
const client = new Discord.Client();
const schedule = require('node-schedule');
const gyms = require ("./gym.json");
var count = 1;


client.on("message", async message => {

    if(message.content.indexOf('!') !== 0) return;
    if(message.channel.id !== '424656070892322826') return;
        

    if (message.content == '!startgymclock') {
        message.channel.sendMessage('Clock has started');
        var j = schedule.scheduleJob('15 * * * *', function () {
            message.guild.channels.find("name", "general").send("There has been " + count + " days without a channel wipe!");
            count++;
        });
    }

    if (message.content == '!resetgymclock') {
        //message.channel.sendMessage
        message.guild.channels.find("name", "general").send('Wipe has occured time to reset. ðŸ˜¢');
        count = 1;
    }
	
	
    if(message.content == '!find'){
	message.guild.channels.find("name", "general").send('hello');
	let gymdb = gyms[gym].catch(error => message.guild.channels.find("name", "general").send(`failed to get from json : ${error}`));
	message.guild.channels.find("name", "general").send("Test: " + gymdb);
     }
	if(message.content == '!test'){
		var
		message.guild.channels.find("name", "general").send('test');
		var gymdb = gyms.gym;
		for(var gym in gymdb){
			if(gym.gymname.includes(gyminput){
			   message.guild.channels.find("name", "general").send("GymName: " +gym.gymname 
									       +"\nGymLocation: " +gym.gymlocation);
			break;
			   }
		}
		message.guild.channels.find("name", "general").send("Test: " + gymdb[0].gymname);
 	}	 

});


client.login(process.env.BOT_TOKEN);
