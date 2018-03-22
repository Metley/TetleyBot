const Discord = require("discord.js");
const client = new Discord.Client();
const schedule = require('node-schedule');
var count = 1;


client.on("message", async message => {
    /*
    if(message.author.id == '327162272990363648'){
        message.react('❄').then(console.log).catch(console.error)   
    }
    */
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
        message.guild.channels.find("name", "general").send('Wipe has occured time to reset. 😢');
        count = 1;
    }

});

client.on('messageReactionAdd', function(messageReaction, user) {    
    
    var member = messageReaction.message.guild.members.get(user.id);
    
     message.guild.channels.find("name", "general").send("reaction seen");
    //if(message.channel.id !== '426359385963626506') return;
    
     message.guild.channels.find("name", "general").send(user.username+"reaction seen after channel check");
    
    if (message.content === '-Lugia') {
        member.addRole('327162272990363648');
         message.guild.channels.find("name", "general").send(user.username+"Tried adding Lugia Role");
        user.addRole(users.guild.roles.find('name', 'Lugia')).catch(console.error);
    } else if (message.content === '-Tyranitar') {
        message.guild.channels.find("name", "general").send(user.username+"Tried adding Tyrantiar Role");
      user.addRole(users.guild.role.find('name', 'Tyranitar')).catch(console.error);
    } else {
        return;   
    }
});

client.on('messageReactionRemove', function(messageReaction, user) {    
    //if(message.channel.id !== '426359385963626506') return;
    
    if (message.content === '-Lugia') {
        message.guild.channels.find("name", "general").send(user.username+"Tried removing Lugia Role");
        user.removeRole(users.guild.roles.find('name', 'Lugia')).catch(console.error);
    } else if (message.content === '-Tyranitar') {
        message.guild.channels.find("name", "general").send(user.username+"Tried removing Tyranitar Role");
        user.removeRole(users.guild.role.find('name', 'Tyranitar')).catch(console.error);
    } else {
        return;   
    }
});


client.login(process.env.BOT_TOKEN);
