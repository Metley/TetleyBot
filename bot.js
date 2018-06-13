const Discord = require("discord.js");
const client = new Discord.Client();
const schedule = require('node-schedule');
const gyms = require ("./gym.json");
const staffs = require ("./staff.json");


client.on("message", async message => {

    //if(message.content.indexOf('!') !== 0) return;
    //if(message.channel.id !== '424656070892322826') return;
	
    const args = message.content.split(' ');
    const command = args.shift().toLowerCase();
        
	

   		
    if((message.content == '!test')&&(message.author.id == '327162272990363648')){
		message.guild.channels.find("name", "general").send('hello');
    }
	
	if((message.content.toLowerCase().includes('more eggs'))&&(message.channel.id == '426757841580195850')){
		message.react('LegendaryEgg:418884815064924173').then(console.log).catch(console.error);
    	}
	
	if((message.content.toLowerCase().includes('@everyone'))&&(checkStaff(message.author.id) == 'fart')){
		message.react('🚫').then(console.log).catch(console.error);
    	}
	
	if((command == '!nicknamelist')&&(message.author.id == '327162272990363648')){
		var gymdb = gyms.gym;
		message.channel.send("**__" +"Gym Nickname List:"+"__**").then(msg => {msg.delete(300000)}).catch((err) => {console.error(err)});
		for(var gym in gymdb){
			message.channel.send("`" +gymdb[gym].gymname +" - " +gymdb[gym].nickname+"`").then(msg => {msg.delete(300000)}).catch((err) => {console.error(err)});
		}
		
	}
	
	if((command == '!flipcoin') &&(checkStaff(message.author.id) != 'fart')){
		if(Math.floor((Math.random() * 2) + 1) == 1){
			message.channel.send("heads");
		} else {
			message.channel.send("tails");
		}
	}
	
	
	if(command == '!find'){
		var gyminput = args.join(" ").toLowerCase();
		var gymdb = gyms.gym;
		var found = 0;
		var ncheck = true;
		for(var gym in gymdb){
			if(gymdb[gym].nickname.toLowerCase().includes(gyminput)){
			   message.channel.send("**Gym Name:** " +gymdb[gym].gymname 
									       +"\n**Nickname:** " +gymdb[gym].nickname
									      +"\n**Gym Location:** " +gymdb[gym].gymlocation
									      +"\n**EX Eligible:** " +gymdb[gym].exeligible
									      +"\n**Nearby Intersection:** "+gymdb[gym].nearbyintersection
									      +"\n**Notes:** "+gymdb[gym].notes)
				.then(msg => {msg.delete(900000)}).catch((err) => {console.error(err)});
				found = 1
				ncheck = false
				break;
			}
		}
		if(ncheck){
			for(var gym in gymdb){
				if(gymdb[gym].gymname.toLowerCase().includes(gyminput)){
				   message.channel.send("**Gym Name:** " +gymdb[gym].gymname 
										       +"\n**Nickname:** " +gymdb[gym].nickname
										      +"\n**Gym Location:** " +gymdb[gym].gymlocation
										      +"\n**EX Eligible:** " +gymdb[gym].exeligible
										      +"\n**Nearby Intersection:** "+gymdb[gym].nearbyintersection
										      +"\n**Notes:** "+gymdb[gym].notes)
					.then(msg => {msg.delete(900000)}).catch((err) => {console.error(err)});
					found = 1
					break;
				}
			}
		}
	
		if(found == 0){
			message.channel.send("Gym Not Found").then(msg => {msg.delete(30000)}).catch((err) => {console.error(err)});
		}
		
		if(message.channel.id == '444267666811650058'){
			if(gyminput.includes('sock')){
        			message.react('🇸').then(async function (){
					await message.react('🇴').then(console.log).catch(console.error);
					await message.react('🇨').then(console.log).catch(console.error);
					await message.react('🇰').then(console.log).catch(console.error);
				}).catch(console.error);  
}
			//delete after 5min
			message.delete(300000).catch((err) => {console.error(err)});
		}

 	}
	
	if(command == '!postx'){
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
	
	if(command == '!post'){
		var gyminput = args.join(" ").toLowerCase();
		var locations = gyminput.split('+');
		var gymdb = gyms.gym;
		var output = '';
		var found = 0;
		var ncheck = true;
		
		for(var i=0; i<locations.length; i++){
			ncheck = true;
			for(var gym in gymdb){
				if(gymdb[gym].nickname.toLowerCase().includes(locations[i])){
					var qrole = message.channel.guild.roles.get('name', gymdb[gym].quadrant);
				   output += qrole +" \n"+"**" +gymdb[gym].gymname +": **" 
					   +gymdb[gym].gymlocation+"\n**Notes:** "+gymdb[gym].notes+"\n\n";
					found = 1;
					ncheck = false;
					break;
				}
			}
			if(ncheck){
				for(var gym in gymdb){
					if(gymdb[gym].gymname.toLowerCase().includes(locations[i])){
						var qrole = message.channel.guild.roles.get('name', gymdb[gym].quadrant);
					   output += qrole +" \n"+"**" +gymdb[gym].gymname +": **" 
						   +gymdb[gym].gymlocation+"\n**Notes:** "+gymdb[gym].notes+"\n\n";
						found = 1;
						break;
					}
				}	
			}
		}
		
		if(output.length == 0){
			output = "Gyms Not Found";
		}
		
		message.channel.send(''+output).then(msg => {msg.delete(5400000)}).catch((err) => {console.error(err)});	
		
		if(message.channel.id == '444267666811650058'){
			//delete after 5min
			message.delete(300000).catch((err) => {console.error(err)});
		}
 	}
	
	if(command == '!exsheet'){
		message.channel.send("Sheet: http://goo.gl/xauVqj");
	}
	
	if(command == '!exmap'){
		message.channel.send("Map: https://goo.gl/GNG44U");
	}
	
	

});

function checkStaff(person){
	var staffdb = staffs.staff;
	
	for(var staff in staffdb){
		if(staffdb[staff].id == person){
			return staffdb[staff].title;
		}
	}
	return 'fart';
}


client.login(process.env.BOT_TOKEN);
