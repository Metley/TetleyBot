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

client.on('MessageReactionAdd', function(user) {    
    if(message.channel.id !== '426359385963626506') return;
    
    if (message.content === '-Lugia') {
        user.addRole(users.guild.roles.find('name', 'Lugia'));
    } else if (message.content === '-Tyranitar') {
      user.addRole(users.guild.role.find('name', 'Tyranitar'));
    } else {
        return;   
    }
});

client.on('messageReactionRemove', function(user) {    
    if(message.channel.id !== '426359385963626506') return;
    
    if (message.content === '-Lugia') {
        user.removeRole(users.guild.roles.find('name', 'Lugia'));
    } else if (message.content === '-Tyranitar') {
        user.removeRole(users.guild.role.find('name', 'Tyranitar'));
    } else {
        return;   
    }
});


client.login(process.env.BOT_TOKEN);
