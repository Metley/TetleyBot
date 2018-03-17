const Discord = require("discord.js");
const client = new Discord.Client();
const schedule = require('node-schedule');
var count = 0;


client.on("message", async message => {

    if (message.content == '!StartClock') {
        message.channel.sendMessage('Clock has started');
        var j = schedule.scheduleJob('01 * * * *', function () {
            message.guild.channels.find("name", "general").send("There has been " + count + " days without a problem");
            count++;
        });
    }

    if (message.content == '!ResetClock') {
        message.channel.sendMessage('Clock has been Reset. '+client.emojis.find("name", "ayy"));
        count = 0;
    }

});


client.login(process.env.BOT_TOKEN);
