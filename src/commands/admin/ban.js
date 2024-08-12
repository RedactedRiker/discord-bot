const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ban")
    .setDescription("Bans a member from the server.")
    .addUserOption((option) =>
      option
        .setName("target")
        .setDescription("The member to ban")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("reason")
        .setDescription("Reason for the ban")
        .setRequired(false)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),
  async execute(interaction, client) {
    const target = interaction.options.getUser("target");
    const reason =
      interaction.options.getString("reason") || "No reason provided";
    const member = interaction.guild.members.cache.get(target.id);

    if (!member) {
      return interaction.reply({
        content: "Member not found in the server.",
        ephemeral: true,
      });
    }

    if (!member.bannable) {
      return interaction.reply({
        content:
          `Unable to ban **${member}**. They may have a higher role or I lack permissions.`,
        ephemeral: true,
      });
    }

    await member.ban({ reason });

    return interaction.reply({
      content: `${target.tag} has been banned.\nReason: ${reason}`,
      // ephemeral: true,
    });
  },
};
