require("dotenv").config();
const { TOKEN } = process.env;
const { Client, Collection, IntentsBitField } = require("discord.js");
const fs = require("fs");
const path = require("path");

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildModeration,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.DirectMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

client.commands = new Collection();
client.commandArray = [];

const functionFiles = fs
  .readdirSync(`./src/functions`)
  .filter((file) => file.endsWith(".js"));

for (const file of functionFiles) {
  require(`./src/functions/${file}`)(client);
}

const helperFiles = fs
  .readdirSync(`./src/helpers`)
  .filter((file) => file.endsWith(".js"));

for (const file of helperFiles) {
  require(`./src/helpers/${file}`)(client);
}

// Call functions
client.handleEvents();
client.handleCommands();

// Helpers
client.reminderCmd();
A
client.login(TOKEN);