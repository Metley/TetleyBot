const Discord = require("discord.js");
const client = new Discord.Client();
const schedule = require('node-schedule');
const gyms = require ("./gym.json");
const staffs = require ("./staff.json");
const SQLite = require("better-sqlite3");
const sql = new SQLite('./trainerdb.sqlite');
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

    //if(message.content.indexOf('!') !== 0) return;
    //if(message.channel.id !== '424656070892322826') return;
	
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
	
	if((message.content == '!printList')&&(message.author.id == '327162272990363648')){
		console.log('Printing');
		for(var i = 0; i < reactList.length; i++){
			var person = reactList[i].split('%');
			message.channel.send('**User:** `'+person[1]+ '` **Reactions:** `'+person[2]+'`');
		}
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
	//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
	if((command == '!secret') &&(message.author.id == '327162272990363648')){
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
			message.channel.send('Secret1: '+trainerdb.badge1+'\nSecret2: '+trainerdb.badge2+'\nSecret3: '+trainerdb.badge3);
		}else{
			message.channel.send('Secret1: ❌'+'\nSecret2: ❌'+'\nSecret3: ❌');
		}
		
	}
	if((command == '!give') &&(message.author.id == '327162272990363648')){
		var person = args.shift().toLowerCase();
		var badge = args.join(" ").toLowerCase();
		var user = message.mentions.users.first();
		var id = message.member.guild.member(user).id;
		var guild = message.guild.id;
		var blank = '❌';
		var obtain = '✅';
		let trainerdb;
    		trainerdb = client.getTrainerdb.get(id, guild);
    		
		if (!trainerdb) {
      			trainerdb = { id: `${guild}-${id}`, user: id, guild: guild, badge1: blank, badge2: blank, badge3: blank, badge4: blank, badge5: blank, badge6: blank, badge7: blank, badge8: blank }
    		}
		switch(badge){
					case '1':
						trainerdb.badge1 = obtain;
						break;
					case '2':
						trainerdb.badge2 = obtain;
						break;
					case '3':
						trainerdb.badge3 = obtain;
						break;
					case '4':
						trainerdb.badge4 = obtain;
						break;
					case '5':
						trainerdb.badge5 = obtain;
						break;
					case '6':
						trainerdb.badge6 = obtain;
						break;
					case '7':
						trainerdb.badge7 = obtain;
						break;
					case '8':
						trainerdb.badge8 = obtain;
						break;
					default:
						message.channel.send('Bleh');
				}
		
    	
    		client.setTrainerdb.run(trainerdb);
	}
	
	
	
	/*
	if((command == '!give') &&(message.author.id == '327162272990363648')){
		var person = args.shift().toLowerCase();
		var badge = args.join(" ").toLowerCase();
		var user = message.mentions.users.first();
		var id = message.member.guild.member(user).id;
		var badgedb = badgesdb.badgedb;
		var found = false;
		
		//var yourjsonfile = fs.readFileSync("badgedb.json");
    		//var ftpr = JSON.parse(yourjsonfile);
    		for (let i = 0; i < badgedb.length; i++) {
  			if (id == badgedb[i].id) {
				switch(badge){
					case '1':
						badgedb.badge1 = badge;
						break;
					case '2':
						badgedb.badge2 = badge;
						break;
					case '3':
						badgedb.badge3 = badge;
						break;
					case '4':
						badgedb.badge4 = badge;
						break;
					case '5':
						badgedb.badge5 = badge;
						break;
					case '6':
						badgedb.badge6 = badge;
						break;
					case '7':
						badgedb.badge7 = badge;
						break;
					case '8':
						badgedb.badge8 = badge;
						break;
					default:
						message.channel.send('Bleh');
				}
				found = true;
			}
		}
		if(!found){
			var obj = {
				id: id,
				badge1: null,
				badge2: null,
				badge3: null,
				badge4: null,
				badge5: null,
				badge6: null,
				badge7: null,
				badge8: null,
			};
			
			switch(badge){
					case '1':
						obj.badge1 = badge;
						break;
					case '2':
						obj.badge2 = badge;
						break;
					case '3':
						obj.badge3 = badge;
						break;
					case '4':
						obj.badge4 = badge;
						break;
					case '5':
						obj.badge5 = badge;
						break;
					case '6':
						obj.badge6 = badge;
						break;
					case '7':
						obj.badge7 = badge;
						break;
					case '8':
						obj.badge8 = badge;
						break;
					default:
						message.channel.send('Bleh');
				}
			
			
			badgesdb.badgedb.push();
		}
		
		fs.writeFile ("badgedb.json", JSON.stringify(badgesdb.badgedb), function(err) {
    			if (err) throw err;
    			console.log('complete');
		    }
		);	
		
		
		console.log('yo whatup');
		message.channel.send('whatup '+person+ ' '+id);
		
	}
	
	
	if((message.content == '!secret')&&(message.author.id == '327162272990363648')){
		console.log('command printSecret');
		var badgedb = badgesdb.badgedb;
    		
		
		
		for(var badge in badgedb){
    			console.log(badgedb[badge].id);
			message.channel.send(badgedb[badge].id +"\n" +badgedb[badge].badge1+"\n" +badgedb[badge].badge2+"\n" +badgedb[badge].badge3);
		}
	}
	*/
	
	
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



client.login(process.env.BOT_TOKEN);
