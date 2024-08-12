const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const fs = require("fs");

module.exports = (client) => {
  client.handleCommands = async () => {
    const commandFolders = fs.readdirSync("./src/commands");
    const { commands, commandArray } = client;
    for (const folder of commandFolders) {
      const commandFiles = fs
        .readdirSync(`./src/commands/${folder}`)
        .filter((file) => file.endsWith(".js"));

      for (const file of commandFiles) {
        const command = require(`../commands/${folder}/${file}`);
        commands.set(command.data.name, command);
        commandArray.push(command.data.toJSON());
      }
    }

    const clientId = "1271707077030580285";
    const rest = new REST({ version: "9" }).setToken(process.env.TOKEN);
    try {
      console.log("Refreshing slash commands.");

      await rest.put(Routes.applicationCommands(clientId), {
        body: commandArray,
      });

      console.log("Successfully refreshed slash commands.");
    } catch (error) {
      console.error(error);
    }
  };
};
