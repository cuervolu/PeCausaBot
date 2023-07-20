import { CommandInteraction, SlashCommandBuilder } from 'discord.js';
import { getRandomResponseFromFirebase } from '../../utils/firebaseUtils.js';

/**
 * Tiempo de cooldown en segundos para el comando "millao".
 * @type {number}
 */
const cooldownTime = 10;

/**
 * Objeto para rastrear el tiempo de la última ejecución del comando para cada usuario.
 * @type {Map<string, number>}
 */
const cooldowns = new Map<string, number>();

export const data = new SlashCommandBuilder()
  .setName('millao')
  .setDescription('Lanza un insulto hacia el mejor profesor de todo Chile');

/**
 * Ejecuta el comando "millao" para lanzar un insulto aleatorio hacia el mejor profesor de Chile.
 * @param {CommandInteraction} interaction - La interacción del comando.
 * @returns {Promise<void>} - Una promesa que se resuelve después de enviar la respuesta.
 */
export async function execute(interaction: CommandInteraction) {
    try {
      const commandName = 'millao';
  
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
  
      const response = await getRandomResponseFromFirebase(commandName);
  
      // Verificar si response es una cadena no vacía antes de enviar la respuesta
      if (typeof response === 'string' && response.trim() !== '') {
        await interaction.reply(response);
      } 
  
      // Registrar el tiempo de la última ejecución del comando para el usuario
      cooldowns.set(interaction.user.id, Date.now() / 1000);
    } catch (error) {
      console.error('Error al procesar el comando "millao":', error);
      await interaction.reply(
        'Me bugeaste aweonao, intenta nuevamente más tarde.'
      );
    }
  }
  
