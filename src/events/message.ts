import { event, Events } from '../utils/events.js';

export default event(Events.MessageCreate, ({ log }, msg) => {
  if(msg.content === 'millao'){
    return msg.reply('Pugllao')
  }

  if(msg.content === 'No entiendo'){
    return msg.reply('No entiendo compañero 😔')
  }
  if(msg.content === 'cris ql'){
    return msg.reply('No insultes al Cris, ¿no ves que tiene depresión?')
  }
});
