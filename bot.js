const Discord = require("discord.js");
const client = new Discord.Client();
const schedule = require('node-schedule');
const gyms = require ("./gym.json");
const staffs = require ("./staff.json");
const gymleaders = require ("./gymleader.json");
const SQLite = require("better-sqlite3");
const sql = new SQLite('./trainerdb.sqlite');
const { Client, RichEmbed } = require('discord.js');
//const badgesdb = require ("./badgedb.json");
//const fs = require('fs');
var reactList = [];
//var obj = {badgedb: []};
var badges = ['Boulder Badge','Cascade Badge','Thunder Badge','Rainbow Badge','Soul Badge','Marsh Badge','Marsh Badge','Earth Badge'];



client.on("ready", () => {
	// Check if the table "points" exists.
	const table = sql.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'trainerdb';").get();
	if (!table['count(*)']) {
		// If the table isn't there, create it and setup the database correctly.
		sql.prepare("CREATE TABLE trainerdb (id TEXT PRIMARY KEY, user TEXT, guild TEXT, badge1 TEXT, badge2 TEXT, badge3 TEXT, badge4 TEXT, badge5 TEXT, badge6 TEXT, badge7 TEXT, badge8 TEXT);").run();
		// Ensure that the "id" row is always unique and indexed.
		sql.prepare("CREATE UNIQUE INDEX idx_trainerdb_id ON trainerdb (id);").run();
		sql.pragma("synchronous = 1");
		sql.pragma("journal_mode = wal");
	}
 
	// And then we have two prepared statements to get and set the score data.
	client.getTrainerdb = sql.prepare("SELECT * FROM trainerdb WHERE user = ? AND guild = ?");
	client.setTrainerdb = sql.prepare("INSERT OR REPLACE INTO trainerdb (id, user, guild, badge1, badge2, badge3, badge4, badge5, badge6, badge7, badge8) VALUES (@id, @user, @guild, @badge1, @badge2, @badge3, @badge4, @badge5, @badge6, @badge7, @badge8);");
  
});


client.on("message", async message => {
	
    const args = message.content.split(' ');
    const command = args.shift().toLowerCase();
	
	//raremons-sightings
	if(message.channel.id == '459901951035834368'){
		message.delete(3600000).catch((err) => {console.error(err)});
	}
	//gym-finder
	if(message.channel.id == '444267666811650058'){
		message.delete(3600000).catch((err) => {console.error(err)});
	}
	//egg-spot
	if(message.channel.id == ''){
		message.delete(6300000).catch((err) => {console.error(err)});
	}
	//raid lobbies
        if((message.channel.id == '') || (message.channel.id == '') || (message.channel.id == '') || (message.channel.id == '')){
		message.delete(6300000).catch((err) => {console.error(err)});
	}
	

   		
    if((message.content == '!test')&&(message.author.id == '327162272990363648')){
		message.channel.send('hello <:Pokeball:418848782952955944>');
    }
	
	if((message.content.toLowerCase().includes('more eggs'))&&(message.channel.id == '426757841580195850')){
		message.react('LegendaryEgg:418884815064924173').then(console.log).catch(console.error);
    	}
	
	if((message.content.toLowerCase().includes('oh my god'))&&(message.author.id == '232527414696083456')){
		message.react('🇴').then(async function (){
					await message.react('🇲').then(console.log).catch(console.error);
					await message.react('🇬').then(console.log).catch(console.error);
				}).catch(console.error);  
    	}
	/*
	if(message.content.toLowerCase().includes('lunatone')){
		message.react('❗').then(async function (){
					await message.react('🇰').then(console.log).catch(console.error);
					await message.react('🇪').then(console.log).catch(console.error);
					await message.react('🇻').then(console.log).catch(console.error);
					await message.react('🇮').then(console.log).catch(console.error);
					await message.react('🇳').then(console.log).catch(console.error);
					await message.react('🌛').then(console.log).catch(console.error);
				}).catch(console.error);  
    	}
	*/
	
	if((message.content.toLowerCase().includes('@everyone'))&&(checkStaff(message.author.id) == 'fart')){
		message.react('🚫').then(console.log).catch(console.error);
    	}
	
	if((command == '!nicknamelist')&&(message.author.id == '327162272990363648')){
		var gymdb = gyms.gym;
		message.channel.send("**__" +"Gym Shortcuts:"+"__**");
		message.channel.send("\n "+"These shortcut phrases can be used with ``!find`` or ``!post`` in order to simplify posting directions for raids."+"\n ");
		for(var gym in gymdb){
			message.channel.send(gymdb[gym].gymname +" - `" +gymdb[gym].nickname+"`");
		}
		
	}
  
	if((command == '!gymdatabase')&&(message.author.id == '327162272990363648')){
		var gymdb = gyms.gym;
    	var num = 1;
		message.channel.send("**__" +"Gym Database:"+"__**+\n ");
		for(var gym in gymdb){
			var exloc = (((gymdb[gym].exeligible) == 'Yes') ? '<:EXRaid:418885952967147520>' : ' ');
			message.channel.send("__**#"+num+" "+gymdb[gym].gymname +" "+exloc+"**__ \n" +gymdb[gym].gymlocation);
			num++;
		}
		
	}
	
	if((command == '!flipcoin') &&(checkStaff(message.author.id) != 'fart')){
		if(Math.floor((Math.random() * 2) + 1) == 1){
			message.channel.send("heads");
		} else {
			message.channel.send("tails");
		}
	}
	
	
  
	if((command == '!talk')&&(message.author.id == '327162272990363648')){    
		var channel = args.shift().toLowerCase().replace(/<#|>/g, '');
		var textinput = args.join(" ").toLowerCase();
    
		if (!(message.guild.channels.exists('id', channel))) { 
			message.reply(`The ${channel} channel does not exist.`).catch(console.error);
			return; //prevents the rest of the code from being executed
		}
    
		message.guild.channels.get(channel).send(textinput);
		
		message.delete(5000).catch((err) => {console.error(err)});
	}
	
	if((message.content == '!resetList')&&(message.author.id == '327162272990363648')){
		console.log('Reseting');
		reactList.length = 0;
	}
	/*
	if ((message.content == '!startReactCounter')&&(message.author.id == '327162272990363648')) {
        	message.channel.send('Counter has Started');
       	 	var j = schedule.scheduleJob('15 02 * * *', function () {
			console.log('Job Start');
            		for(var i = 0; i < reactList.length; i++){
				console.log('Printing');
				var person = reactList[i].split('%');
				message.channel.send('**User:** `'+person[1]+ '` **Reactions:** `'+person[2]+'`');
			}
			reactList.length = 0;
			console.log('Job Finish');
        	});
    	}
	*/
  
  
	if((command == '!clearchat')&&(message.author.id == '327162272990363648')&&(message.channel.id == '444267666811650058')){
		const deleteCount = parseInt(args[0], 10);
    
		if(!deleteCount || deleteCount < 2 || deleteCount > 100)
			return message.reply("Please provide a number between 2 and 100 for the number of messages to delete");
    
		const fetched = await message.channel.fetchMessages({limit: deleteCount});
		message.channel.bulkDelete(fetched).catch(error => message.reply(`Couldn't delete messages because of: ${error}`));
  	}
	
	//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
	//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@Start of Gym Badges@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
	//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
	
	if((command == '!printBadgedb')&&(message.author.id == '327162272990363648')){
		var guild = message.guild.id;
		//const allpeople = sql.prepare("SELECT * FROM scores WHERE trainerdb = ?;").all(message.guild.id);
		message.channel.send('Attempting');
		let trainerdb;
		trainerdb = client.printTrainerdb.get(guild);
    
		for(var trainer in trainerdb) {
			message.channel.send(trainer.id +" - "+ trainer.user +" - "+ trainer.guild +" - "+ trainer.badge1 +" - "+trainer.badge2 +" - "+trainer.badge3 +" - "+trainer.badge4 +" - "+trainer.badge5 +" - "+trainer.badge6 +" - "+trainer.badge7 +" - "+trainer.badge8);
		}
	}
	
	if((message.content == '!printList')&&(message.author.id == '327162272990363648')){
		console.log('Printing');
		for(var i = 0; i < reactList.length; i++){
			var person = reactList[i].split('%');
			//message.channel.send('**User:** `'+person[1]+ '` **Reactions:** `'+person[2]+'`');
		}
		const allpeople = sql.prepare("SELECT * FROM trainerdb WHERE guild = ?;").all(message.guild.id);
    
		const embed = new Discord.RichEmbed()
			.setTitle("Database")
			.setAuthor(client.user.username, client.user.avatarURL)
			.setDescription("Trainer Database!")
			.setColor(0x00AE86);
    
		for(const data of allpeople) {
			//embed.addField(client.users.get(data.user).username, `${data.badge1} - ${data.badge2} - ${data.badge3} - ${data.badge4} - ${data.badge5} - ${data.badge6} - ${data.badge7} - ${data.badge8}`, true);
			//message.channel.send(trainer.id +" - "+ trainer.user +" - "+ trainer.guild +" - "+ trainer.badge1 +" - "+trainer.badge2 +" - "+trainer.badge3 +" - "+trainer.badge4 +" - "+trainer.badge5 +" - "+trainer.badge6 +" - "+trainer.badge7 +" - "+trainer.badge8);
			message.channel.send(message.member.guild.member(data.user).displayName+` - ${data.user} - ${data.badge1} - ${data.badge2} - ${data.badge3} - ${data.badge4} - ${data.badge5} - ${data.badge6} - ${data.badge7} - ${data.badge8}`);
		}
		//return message.channel.send({embed});
	}
  
	if((command == '!badge') ){
		//var person = args.shift().toLowerCase();
		var user = message.mentions.users.first();
		var id;
		var guild;
		
		if(!user){
			id = message.author.id;
			guild = message.guild.id;
		} else {
			id = message.member.guild.member(user).id;
			guild = message.member.guild.member(user).guild.id;
		}
		
		let trainerdb;
    		trainerdb = client.getTrainerdb.get(id, guild);
		
		if(trainerdb){
			message.channel.send('Boulder Badge: '+trainerdb.badge1+'\nCascade Badge: '+trainerdb.badge2+'\nThunder Badge: '+trainerdb.badge3+'\nRainbow Badge: '+trainerdb.badge4+'\nSoul Badge: '+trainerdb.badge5+'\nMarsh Badge: '+trainerdb.badge6+'\nVolcano Badge: '+trainerdb.badge7+'\nEarth Badge: '+trainerdb.badge8);
		}else{
			message.channel.send('Boulder Badge: ❌'+'\nCascade Badge: ❌'+'\nThunder Badge: ❌'+'\nRainbow Badge: ❌'+'\nSoul Badge: ❌'+'\nMarsh Badge: ❌'+'\nVolcano Badge: ❌'+'\nEarth Badge: ❌');
		}
		
	}
  
	if((command == '!give')){
		var person = args.shift().toLowerCase();
		var badge = args.join(" ").toLowerCase();
		var user = message.mentions.users.first();
		var id = null;
		var guild = message.guild.id;
		var blank = '❌';
		var obtain = '✅';
		
    
    if((checkGymLeader(message.author.id) == badge) || (checkGymLeader(message.author.id) == 'master')){
       
		if(!user){
			message.channel.send("Trainer not Found!").then(msg => {msg.delete(30000)}).catch((err) => {console.error(err)});
			return;
		}else{
			id = message.member.guild.member(user).id;
		}
      
		let trainerdb;
    	trainerdb = client.getTrainerdb.get(id, guild);

		if (!trainerdb) {
			trainerdb = { id: `${guild}-${id}`, user: id, guild: guild, badge1: blank, badge2: blank, badge3: blank, badge4: blank, badge5: blank, badge6: blank, badge7: blank, badge8: blank }
        }
		switch(badge){
            case 'boulder badge':
				trainerdb.badge1 = obtain;
				break;
            case 'cascade badge':
				trainerdb.badge2 = obtain;
				break;
            case 'thunder badge':
				trainerdb.badge3 = obtain;
				break;
            case 'rainbow badge':
				trainerdb.badge4 = obtain;
				break;
            case 'soul badge':
				trainerdb.badge5 = obtain;
				break;
            case 'marsh badge':
				trainerdb.badge6 = obtain;
				break;
            case 'volcano badge':
				trainerdb.badge7 = obtain;
				break;
            case 'earth badge':
				trainerdb.badge8 = obtain;
				break;
            default:
				message.channel.send('Badge not Found!');
				return;
          }

          client.setTrainerdb.run(trainerdb);
      }
    
	}
	
  if((command == '!take') &&(message.author.id == '327162272990363648')){
		var person = args.shift().toLowerCase();
		var badge = args.join(" ").toLowerCase();
		var user = message.mentions.users.first();
		var id = null;
		var guild = message.guild.id;
		var blank = '❌';
		var obtain = '✅';
		
    
    if((checkGymLeader(message.author.id) == badge) || (checkGymLeader(message.author.id) == 'master')){
       
		if(!user){
			message.channel.send("Trainer not Found!").then(msg => {msg.delete(30000)}).catch((err) => {console.error(err)});
			return;
		}else{
			id = message.member.guild.member(user).id;
		}
      
		let trainerdb;
    		trainerdb = client.getTrainerdb.get(id, guild);

		if (!trainerdb){
            trainerdb = { id: `${guild}-${id}`, user: id, guild: guild, badge1: blank, badge2: blank, badge3: blank, badge4: blank, badge5: blank, badge6: blank, badge7: blank, badge8: blank }
        }
		switch(badge){
            case 'boulder badge':
				trainerdb.badge1 = blank;
				break;
            case 'cascade badge':
				trainerdb.badge2 = blank;
				break;
            case 'thunder badge':
				trainerdb.badge3 = blank;
				break;
            case 'rainbow badge':
				trainerdb.badge4 = blank;
				break;
            case 'soul badge':
				trainerdb.badge5 = blank;
				break;
            case 'marsh badge':
				trainerdb.badge6 = blank;
				break;
            case 'volcano badge':
				trainerdb.badge7 = blank;
				break;
            case 'earth badge':
				trainerdb.badge8 = blank;
				break;
            default:
				message.channel.send('Badge not Found!');
          }

          client.setTrainerdb.run(trainerdb);
      }
    
	}
	
		
	//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
	//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@End of Gym Badges@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
	//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
	
	if((command == '!createquadrants')&&(message.author.id == '327162272990363648')){
		message.guild.channels.find("name", "quadrant-assignment").send('Adding a 👍 reaction to the Quadrant will subsribe you to receive notifications on all raids happening in that area. \nRemoving your reaction will unscrible you from any further notification, if your reacion is missing simply react and removing again should work:').catch((err) => {console.error(err)});
		message.guild.channels.find("name", "quadrant-assignment").send('-QuadrantA').catch((err) => {console.error(err)});
		message.guild.channels.find("name", "quadrant-assignment").send('-QuadrantB').catch((err) => {console.error(err)});
		message.guild.channels.find("name", "quadrant-assignment").send('-QuadrantC').catch((err) => {console.error(err)});
		message.guild.channels.find("name", "quadrant-assignment").send('-QuadrantD').catch((err) => {console.error(err)});
		message.guild.channels.find("name", "quadrant-assignment").send('-QuadrantE').catch((err) => {console.error(err)});
		
	}
	
	
	if(command == '!find'){
		var gyminput = args.join(" ").toLowerCase();
		var gymdb = gyms.gym;
		var found = 0;
		var ncheck = true;
		logOutput(message);
		
		for(var gym in gymdb){
			if(gymdb[gym].nickname.toLowerCase().includes(gyminput)){
			   message.channel.send("**Gym Name:** " +gymdb[gym].gymname 
									       +"\n**Nickname:** " +gymdb[gym].nickname
									      +"\n**District:** " +gymdb[gym].quadrant
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
										      +"\n**District:** " +gymdb[gym].quadrant
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
		logOutput(message);
		
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
		logOutput(message);
		
		for(var i=0; i<locations.length; i++){
			ncheck = true;
			for(var gym in gymdb){
				if(gymdb[gym].nickname.toLowerCase().includes(locations[i])){
					var qrole = message.channel.guild.roles.find('name', gymdb[gym].quadrant);
					if((message.channel.id == '340201846687793163')||(message.channel.id == '363433686710091777')){
						output += qrole.toString() +" \n";
					}
				   output += "**" +gymdb[gym].gymname +": **" 
					   +gymdb[gym].gymlocation+"\n**Notes:** "+gymdb[gym].notes+"\n\n";
					found = 1;
					ncheck = false;
					break;
				}
			}
			if(ncheck){
				for(var gym in gymdb){
					if(gymdb[gym].gymname.toLowerCase().includes(locations[i])){
						var qrole = message.channel.guild.roles.find('name', gymdb[gym].quadrant);
						if((message.channel.id == '340201846687793163')||(message.channel.id == '363433686710091777')){
							output += qrole.toString() +" \n";
						}
					   output += "**" +gymdb[gym].gymname +": **" 
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
		message.channel.send("http://bit.ly/2tzvfHc");
	}
	
	if(command == '!exmap'){
		message.channel.send("http://bit.ly/2yzpGhu");
	}
	
	

});

client.on("messageReactionAdd", (messageReaction, user) => {   
	/*
	if(messageReaction.message.channel.id == 456520132672356372){
		if(messageReaction.emoji.id = '👍'){
			switch(messageReaction.message.content){
				case '-QuadrantA':
					messageReaction.message.member.guild.member(user).addRole('442648644190076938').catch(console.error);
					break;
				case '-QuadrantB':
					messageReaction.message.member.guild.member(user).addRole('442648852009582612').catch(console.error);
					break;
				case '-QuadrantC':
					messageReaction.message.member.guild.member(user).addRole('442648940635226113').catch(console.error);
					break;
				case '-QuadrantD':
					messageReaction.message.member.guild.member(user).addRole('442649028417814538').catch(console.error);
					break;	
				case '-QuadrantE':
					messageReaction.message.member.guild.member(user).addRole('456474024063533068').catch(console.error);
					break;	
			}
		}
	}
	
	if((messageReaction.message.channel.id == 340201846687793163) || (messageReaction.message.channel.id == 363433686710091777) || (messageReaction.message.channel.id == 522655995940438018)){
		if((messageReaction.emoji.id = ':one:') || (messageReaction.emoji.id = ':two:') || (messageReaction.emoji.id = ':three:') || (messageReaction.emoji.id = ':four:') || (messageReaction.emoji.id = ':five:') || (messageReaction.emoji.id = ':six:')){
			countRaidReactions(messageReaction, user);
		}
	}
   */
});

client.on('messageReactionRemove', function(messageReaction, user) {    
		
	if(messageReaction.message.channel.id == 456520132672356372){
		if(messageReaction.emoji.id = '👍'){
			switch(messageReaction.message.content){
				case '-QuadrantA':
					messageReaction.message.member.guild.member(user).removeRole('442648644190076938').catch(console.error);
					break;
				case '-QuadrantB':
					messageReaction.message.member.guild.member(user).removeRole('442648852009582612').catch(console.error);
					break;
				case '-QuadrantC':
					messageReaction.message.member.guild.member(user).removeRole('442648940635226113').catch(console.error);
					break;
				case '-QuadrantD':
					messageReaction.message.member.guild.member(user).removeRole('442649028417814538').catch(console.error);
					break;	
				case '-QuadrantE':
					messageReaction.message.member.guild.member(user).removeRole('456474024063533068').catch(console.error);
					break;	
			}
		}
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

function checkGymLeader(person){
	var gymleaderdb = gymleaders.gymleader;
	
	for(var gymleader in gymleaderdb){
		if(gymleaderdb[gymleader].id == person){
			return gymleaderdb[gymleader].title;
		}
	}
	return 'fart';
}

function logOutput(message){
	message.guild.channels.find("name", "tetley-test").send('**User:** `'+message.member.displayName+ '` **Channel:** `'+message.channel.name+ '` **Search:** `'+message.content+'`');		
		
}

function countRaidReactions(messageReaction, user){
	var id = messageReaction.message.member.guild.member(user).id;
	var name = messageReaction.message.member.guild.member(user).displayName;
	var newEntry = true;
	
	if(reactList.length != 0){
		var tId;
		var tName;
		var tNum;
		
		for(var i = 0; i < reactList.length; i++){
			var person = reactList[i].split('%');
			tId = person[0];
			tName = person[1];
			tNum = person[2];
			console.log('Entered For Loop');
			if(tId == id){
				tNum++;
				var react = tId+"%"+tName+"%"+tNum;
				reactList[i] = react;
				console.log("Update Values");
				newEntry = false;
				
				if(i != 0){
					var temp = reactList[(i-1)].split('%');
					if(tNum > temp[2]){
						var react = react[i];
						reactList[i] = reactList[(i-1)];
						reactList[(i-1)] = react;
					}
				}
			}
		}
		if(newEntry){
			console.log(id+' '+name+' ' );
			var react = id+"%"+name+"%1";
			reactList.push(react);
			console.log("Added a new Person to List");
		}
		
	} else {
		console.log(id+' '+name+' ' );
		var react = id+"%"+name+"%1";
		reactList.push(react);
		console.log("Added a new Person to List and List is Empty");
	}
	
}



client.login(process.env.TOKEN);
