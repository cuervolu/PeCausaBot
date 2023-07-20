import { event, Events } from '../utils/events.js';

export default event(Events.ClientReady, ({ log }, client) => {
  return log(`Logged in as ${client.user.username}!`);
});
