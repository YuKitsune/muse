import 'reflect-metadata';
import {Container} from 'inversify';
import {TYPES} from './types.js';
import Bot from './bot.js';
import {Client, GatewayIntentBits} from 'discord.js';
import ConfigProvider from './services/config.js';

// Managers
import PlayerManager from './managers/player.js';

// Services
import AddQueryToQueue from './services/add-query-to-queue.js';
import GetSongs from './services/get-songs.js';
import YoutubeAPI from './services/youtube-api.js';
import SpotifyAPI from './services/spotify-api.js';

// Comands
import Command from './commands';
import Clear from './commands/clear.js';
import Disconnect from './commands/disconnect.js';
import ForwardSeek from './commands/fseek.js';
import Move from './commands/move.js';
import NowPlaying from './commands/now-playing.js';
import Pause from './commands/pause.js';
import Play from './commands/play.js';
import QueueCommand from './commands/queue.js';
import Remove from './commands/remove.js';
import Resume from './commands/resume.js';
import Seek from './commands/seek.js';
import Shuffle from './commands/shuffle.js';
import Skip from './commands/skip.js';
import Next from './commands/next.js';
import Stop from './commands/stop.js';
import Unskip from './commands/unskip.js';
import ThirdParty from './services/third-party.js';
import FileCacheProvider from './services/file-cache.js';
import KeyValueCacheProvider from './services/key-value-cache.js';
import Loop from './commands/loop';

const container = new Container();

// Intents
const intents: GatewayIntentBits[] = [];
intents.push(GatewayIntentBits.Guilds); // To listen for guildCreate event
intents.push(GatewayIntentBits.GuildMessageReactions); // To listen for message reactions (messageReactionAdd event)
intents.push(GatewayIntentBits.GuildVoiceStates); // To listen for voice state changes (voiceStateUpdate event)

// Bot
container.bind<Bot>(TYPES.Bot).to(Bot).inSingletonScope();
container.bind<Client>(TYPES.Client).toConstantValue(new Client({intents}));

// Managers
container.bind<PlayerManager>(TYPES.Managers.Player).to(PlayerManager).inSingletonScope();

// Services
container.bind<GetSongs>(TYPES.Services.GetSongs).to(GetSongs).inSingletonScope();
container.bind<AddQueryToQueue>(TYPES.Services.AddQueryToQueue).to(AddQueryToQueue).inSingletonScope();
container.bind<YoutubeAPI>(TYPES.Services.YoutubeAPI).to(YoutubeAPI).inSingletonScope();
container.bind<SpotifyAPI>(TYPES.Services.SpotifyAPI).to(SpotifyAPI).inSingletonScope();

// Commands
[
  Clear,
  Disconnect,
  ForwardSeek,
  Move,
  NowPlaying,
  Pause,
  Play,
  QueueCommand,
  Remove,
  Resume,
  Seek,
  Shuffle,
  Skip,
  Next,
  Stop,
  Unskip,
  Loop,
].forEach(command => {
  container.bind<Command>(TYPES.Command).to(command).inSingletonScope();
});

// Config values
container.bind(TYPES.Config).toConstantValue(new ConfigProvider());

// Static libraries
container.bind(TYPES.ThirdParty).to(ThirdParty);

container.bind(TYPES.FileCache).to(FileCacheProvider);
container.bind(TYPES.KeyValueCache).to(KeyValueCacheProvider);

export default container;
