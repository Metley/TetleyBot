const Discord = require("discord.js");
const client = new Discord.Client();
const schedule = require('node-schedule');
var count = 1;


client.on("message", async message => {

    if (message.content == '!startclock') {
        message.channel.sendMessage('Clock has started');
        var j = schedule.scheduleJob('15 * * * *', function () {
            message.guild.channels.find("name", "general").send("There has been " + count + " days without a problem");
            count++;
        });
    }

    if (message.content == '!resetclock') {
        message.channel.sendMessage('Clock has been Reset. 😢');
        count = 0;
    }

});


client.login(process.env.BOT_TOKEN);
