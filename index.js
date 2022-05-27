const Discord = require('discord.js');
const client = new Discord.Client({ intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MESSAGES]});
const { clientId, token } = require('./config.json');
const { endings } = require('./dictionary.json');
const axios = require('axios');

// https://discordapp.com/oauth2/authorize?&client_id=979867421903061092&scope=bot&permissions=8

client.once('ready', c => {
  console.log(`Logged in as ${c.user.tag}!`);
});

client.on('messageCreate', msg => {
  if(msg.author.id == clientId){
    return;
  }
  if(msg.content === '!fact'){
    console.log(`Fact requested by ${msg.author.id}`);
    axios.get('https://catfact.ninja/fact')
      .then(response => {
        //msg.channel.send
        let fact = response.data.fact;
        fact = fact.replace(/.$/,"!");
        if(Math.random()*10 < 6){
          fact += ' ' + endings[Math.floor(Math.random()*endings.length)];
        }
        msg.reply(fact);
      })
      .catch(error => {
        console.log('Error with GET request: ', error);
      })
  }
  if(msg.content.substring(0,8) === 'meow'){
      const reply = 'meow!' + '!'.repeat((msg.content.match(/!/g) || []).length);
      msg.reply(reply);
  }
});

client.login(token);
