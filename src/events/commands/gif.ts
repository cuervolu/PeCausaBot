import { CommandInteraction, SlashCommandBuilder } from 'discord.js';
declare const fetch: any;
import { Keys } from '../../key.js';

/**
 * Tiempo de cooldown en segundos para el comando "gif".
 * @type {number}
 */
const cooldownTime = 10;

/**
 * Objeto para rastrear el tiempo de la última ejecución del comando para cada usuario.
 * @type {Map<string, number>}
 */
const cooldowns = new Map<string, number>();

export const data = new SlashCommandBuilder()
  .setName('gif')
  .setDescription('Envía una imagen de un gif en base a un parámetro')
  .addStringOption((option) =>
    option.setName('valor').setDescription('Valor a buscar').setRequired(true)
  );

/**
 * Ejecuta el comando "gif" para enviar una imagen de un gif en base al parámetro proporcionado.
 * @param {CommandInteraction} interaction - La interacción del comando.
 * @returns {Promise<void>} - Una promesa que se resuelve después de enviar la respuesta.
 */
export async function execute(
  interaction: CommandInteraction
) {
  try {
    // Verificar si el usuario tiene un cooldown activo para el comando
    const cooldownUser = cooldowns.get(interaction.user.id);
    if (cooldownUser) {
      const now = Date.now() / 1000;
      const timeRemaining = cooldownUser + cooldownTime - now;

      if (timeRemaining > 0) {
        return interaction.reply(
          `Debes esperar ${timeRemaining.toFixed(
            1
          )} segundos antes de usar el comando de nuevo, compañero 🚬🗿.`
        );
      }
    }

    const optionsWithGetString = interaction.options as any;
    const valor = optionsWithGetString.getString('valor');
    if (!valor) {
      return interaction.reply('El valor del parámetro no puede estar vacío, pe causa.');
    }

    const url = `http://api.giphy.com/v1/gifs/search?q=${encodeURIComponent(
      valor
    )}&api_key=${Keys.giphyKey}&limit=100`;

    const res = await fetch(url);

    if (!res.ok) {
      throw new Error('Error al obtener la respuesta de la API de Giphy.');
    }

    const json = await res.json();

    if (!json.data || json.data.length === 0) {
      return interaction.reply('No se encontraron resultados para el valor proporcionado, por la ctm.');
    }

    const randomIndex = Math.floor(Math.random() * json.data.length);
    const gifUrl = json.data[randomIndex].url;

    await interaction.reply(gifUrl);

    // Registrar el tiempo de la última ejecución del comando para el usuario
    cooldowns.set(interaction.user.id, Date.now() / 1000);
  } catch (error) {
    console.error('Error en el comando "gif":', error);
    await interaction.reply('Ocurrió un error al procesar la solicitud, pe causa TuT.');
  }
}
