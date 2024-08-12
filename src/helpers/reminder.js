const { error } = require("console");
const fs = require("fs");

module.exports = (client) => {
  client.reminderCmd = async () => {
    try {
      const cmdsJSON = JSON.parse(
        fs.readFileSync("./src/commands.json", "utf8")
      );

      const repliedMessages = new Set();

      client.on("messageCreate", async (message) => {
        if (message.author.bot) return;
        if (repliedMessages.has(message.id)) return;

        let userID = message.mentions.users.first() ? message.mentions.users.first().id : message.author.id;

        const messageLowercase = message.content.toLowerCase().split(" ")[0];
        if (messageLowercase.startsWith("?")) {
          await message.delete();

          if (cmdsJSON.hasOwnProperty(messageLowercase)) {
            let returnMessage = cmdsJSON[messageLowercase];

            if (returnMessage.includes("{userID}")) {
              returnMessage = returnMessage.replace("{userID}", `<@${userID}>`);
            }

            await message.channel.send(returnMessage);

            repliedMessages.add(message.id);
            setTimeout(() => repliedMessages.delete(message.id), 10000);
          } else {
            return;
            // await message.channel.send(
            //   `${message.content} is not a valid command.`
            // );
            // repliedMessages.add(message.id);
            // setTimeout(() => repliedMessages.delete(message.id), 10000);
          }
        }
      });
    } catch (err) {
      console.error(error);
    }
  };
};
