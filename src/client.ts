import { Client, Collection, GatewayIntentBits } from 'discord.js';
import { registerEvents } from './utils/events.js';
import Events from './events/index.js';
import { Keys } from './key.js';
import { commands } from './events/commands/index.js';
import { deployCommands } from './deploy-commands.js';

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

// Este evento se dispara cuando el bot se ha conectado correctamente a Discord
client.once('ready', async () => {
  console.log("[Event: ready] Discord bot is ready! 🤖");

  // Obtener todas las guilds (servidores) a las que está unido el bot
  const guilds = client.guilds.cache;

  // Recargar los comandos en cada servidor
  guilds.forEach(async (guild) => {
    await deployCommands({ guildId: guild.id });
  });
});

registerEvents(client, Events);

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) {
    return;
  }
  const { commandName } = interaction;
  if (commands[commandName as keyof typeof commands]) {
    commands[commandName as keyof typeof commands].execute(interaction);
  }
});

client.login(Keys.clientToken).catch((err) => {
  console.log('[Login Error] ', err);
  process.exit(1);
});
