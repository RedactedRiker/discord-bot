require("dotenv").config();

const { TOKEN } = process.env;
const {
  Client,
  Collection,
  GatewayIntentBits,
  Partials,
} = require("discord.js");
const fs = require("fs");

const client = new Client({
  intents: [
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.MessageContent,
  ],
  partials: [Partials.Channel],
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

client.login(TOKEN);
