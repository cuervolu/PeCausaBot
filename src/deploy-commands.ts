import { REST, Routes } from "discord.js";
import { commands } from "./events/commands/index.js";
import { Keys } from './key.js';
const commandsData = Object.values(commands).map((command) => command.data);

const rest = new REST({ version: "10" }).setToken(Keys.clientToken);

type DeployCommandsProps = {
  guildId: string;
};

export async function deployCommands({ guildId }: DeployCommandsProps) {
  try {
    console.log("Started refreshing application (/) commands.");

    await rest.put(
      Routes.applicationGuildCommands(Keys.clientID, guildId),
      {
        body: commandsData,
      }
    );

    console.log("Successfully reloaded application (/) commands.");
  } catch (error) {
    console.error(error);
  }
}
