const Discord = require("discord.js");
const client = new Discord.Client();
const schedule = require('node-schedule');
var count = 1;


client.on("message", async message => {

    if (message.content == '!startclock') {
        message.channel.sendMessage('Clock has started');
        var j = schedule.scheduleJob('15 * * * *', function () {
            message.guild.channels.find("name", "general").send("There has been " + count + " days without a channel wipe!");
            count++;
        });
    }

    if (message.content == '!resetclock') {
        message.channel.sendMessage('Wipe has occured time to reset. 😢');
        count = 1;
    }

});


client.login(process.env.BOT_TOKEN);
