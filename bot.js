const Discord = require("discord.js");
const client = new Discord.Client();
const schedule = require('node-schedule');
const gyms = require ("./gym.json");
const staffs = require ("./staff.json");
var reactList = [];


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
		message.channel.send('hello <a:Pokeball:526561021750673418>');
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
			console.log('${tId} == ${id}');
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
			var react = id+"%"+name+"%1";
			reactList.push(react);
			console.log("Added a new Person to List");
		}
		
	} else {
		var react = id+"%"+name+"%1";
		reactList.push(react);
		console.log("Added a new Person to List and List is Empty");
	}
	
}



client.login(process.env.BOT_TOKEN);
