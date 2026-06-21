const { Client, GatewayIntentBits } = require('discord.js');
const http = require('http');

// Keep-alive web server for Render
http.createServer((req, res) => {
  res.writeHead(200);
  res.end('Bot is running!');
}).listen(3000);

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
  ]
});

const ROLE_NAME = 'Member';

client.once('ready', () => {
  console.log(`Bot is online as ${client.user.tag}`);
});

client.on('messageCreate', async (message) => {
  if (message.author.bot) return;

  const args = message.content.trim().split(/\s+/);
  const command = args[0].toLowerCase();

  if (command === '?role') {
    if (!message.mentions.members.size) {
      return message.reply('Please mention a member! Example: `?Role @SomeUser`');
    }

    const targetMember = message.mentions.members.first();
    const role = message.guild.roles.cache.find(r => r.name === ROLE_NAME);

    if (!role) {
      return message.reply(`Could not find the role named "${ROLE_NAME}". Check the role name!`);
    }

    if (targetMember.roles.cache.has(role.id)) {
      await
