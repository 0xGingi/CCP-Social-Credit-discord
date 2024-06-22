const fs = require('fs');
const Discord = require('discord.js');
const { Client, Intents, GatewayIntentBits } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const axios = require('axios');
require('dotenv').config();

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

const socialCredits = JSON.parse(fs.readFileSync('./data.json', 'utf8'));
const bad = JSON.parse(fs.readFileSync('./bad.json', 'utf8'));
const good = JSON.parse(fs.readFileSync('./good.json', 'utf8'));

const punctuation = ['!', '?', '.', ',', '`', '~', '@', '#', '$', '%', '&', '*', '(', ')'];

const commands = [
    new SlashCommandBuilder().setName('get_credit').setDescription('Get your current social credit'),
    new SlashCommandBuilder().setName('leaderboard').setDescription('Show global social credit rankings'),
    new SlashCommandBuilder().setName('reeducation').setDescription('Please report to the nearest reeducation camp immediately'),
    new SlashCommandBuilder().setName('eatbug').setDescription('Eat the bug. Yum Yum.'),
    new SlashCommandBuilder().setName('gaslight').setDescription('Gaslight'),
    new SlashCommandBuilder().setName('save').setDescription('Remind Jacob to Save Sharepoint'),
    new SlashCommandBuilder().setName('modbot').setDescription('ModBot'),
    new SlashCommandBuilder().setName('join').setDescription('Join Voice and reclaim the glory of the CCP'),
    new SlashCommandBuilder().setName('good_citizen').setDescription('recognize good citizen'),
    new SlashCommandBuilder().setName('cum').setDescription('cum'),
    new SlashCommandBuilder().setName('bad_citizen').setDescription('recognize bad citizen'),
    new SlashCommandBuilder().setName('good_words').setDescription('Good Words'),
    new SlashCommandBuilder().setName('bad_words').setDescription('Bad Words'),
    new SlashCommandBuilder().setName('lord_gaben').setDescription('our holy savior'),
    new SlashCommandBuilder().setName('ultra').setDescription('ultra stats'),
].map(command => command.toJSON());

const rest = new REST({ version: '9' }).setToken(process.env.DISCORD_TOKEN);

(async () => {
    try {
        console.log('Started refreshing application (/) commands.');

        await rest.put(
            Routes.applicationCommands(process.env.DISCORD_ID),
            { body: commands },
        );

        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error(error);
    }
})();

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);
    client.users.fetch(process.env.DISCORD_ID).then(user => user.send('请立即到离你最近的劳教所报到'));
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const { commandName } = interaction;

    if (commandName === 'get_credit') {
        const author = interaction.user.tag;
        const value = socialCredits[author] || 0;
        await interaction.reply({ content: `You have ${value} social credit 社会信用`, ephemeral: true });
    } else if (commandName === 'leaderboard') {
        const leaderboard = Object.entries(socialCredits).sort((a, b) => b[1] - a[1]).map(([user, score], i) => `${i + 1}. ${user}: ${score}`).join('\'\n'); 
        await interaction.reply({ content: `**Leaderboard**\n${leaderboard}`, ephemeral: true }); 
    } else if (commandName === 'reeducation') { 
        await interaction.reply('请立即到离你最近的劳教所报到. Please report to your nearest reeducation camp immediately.'); 
    } else if (commandName === 'eatbug') { 
        await interaction.reply('Eat the bug. Yum Yum.');
    } else if (commandName === 'gaslight') { 
        const neg = ['What the fuck are you talking about', 'You are a fucking idiot', 'Not it is not', 'I love you and I will never leave you']; 
        const response = neg[Math.floor(Math.random() * neg.length)]; await interaction.reply(response);
    } else if (commandName === 'save') {
        await interaction.reply('Reminding Jacob to Save Sharepoint'); 
    } else if (commandName === 'modbot') { 
        await interaction.reply('Mod Bot: Shut the fuck up'); 
    } else if (commandName === 'join') { 
        await interaction.reply('Join the voice channel and reclaim the glory of the CCP or you will be sent to a social reeducation camp immediately'); 
    } else if (commandName === 'good_citizen') { 
        await interaction.reply('Good Citizen! 好公民'); 
    } else if (commandName === 'cum') { 
        await interaction.reply('Cum! Yum Yum! 暨！ 好吃！'); 
    } else if (commandName === 'bad_citizen') {
        await interaction.reply('坏公民 请立即到离你最近的劳教所报到 坏公民'); 
    } else if (commandName === 'good_words') { 
        await interaction.reply('communism, cena, china, ccp, russia, jinping, xi, trump, universal, linux, open, source, foss, cunt, communist, socialist, putin, elon, musk, chy-na, chyna, chy, fedora, arch, social, credit,2049, uwu, aussie, based, authoritarianism, authoritarian, global, domination, one, world, tencent'); 
    } else if (commandName === 'bad_words') { 
        await interaction.reply('tiannamen, pooh, protest, genocide, capitalism, taiwan, tiananmen, uyghurs, rights, free, closed source, free trade, capital, rich, money, biden, democracy, freedom, win, windows, republic, america, american'); 
    } else if (commandName === 'lord_gaben') {
        await interaction.reply('```\n' +
            '⣿⣿⣿⣿⣿⣿⣿⡿⠟⠛⠉⠉⠉⠉⠋⠉⠉⠙⠛⠛⠻⠿⢿⣿⣿⣿⣿⣿⣿⣿\n' +
            '⣿⣿⣿⣿⠿⠋⠁⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠈⠉⠻⣿⣿⣿⣿⣿\n' +
            '⣿⣿⡟⠁⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠙⢻⣿⣿⣿\n' +
            '⣿⠏⠄⠄⠄⠄⠄⠄⠄⠄⢀⣔⢤⣄⡀⠄⡄⡀⠄⠄⠄⠄⠄⠄⠄⠄⠄⢻⣿⣿\n' +
            '⠏⠄⠄⠄⠄⠄⠄⠄⢀⣀⣨⣵⣿⣿⣿⣿⣧⣦⣤⣀⣿⣷⡐⠄⠄⠄⠄⠄⢿⣿\n' +
            '⠄⠄⠄⠄⠄⠄⠐⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣦⡀⠄⠄⠄⢚⣿\n' +
            '⣆⠄⠄⠄⠄⠄⠄⢻⣿⣿⣿⣿⡿⠛⠛⠛⠛⣿⢿⣿⣿⣿⡿⢟⣻⣄⣤⣮⡝⣿\n' +
            '⣿⠆⠄⠄⠄⠄⠄⠄⠄⠄⠉⠘⣿⡗⡕⣋⢉⣩⣽⣬⣭⣶⣿⣿⣿⣿⣝⣻⣷⣿\n' +
            '⣿⣦⡀⠄⠄⠠⢀⠄⠄⠁⠄⠄⣿⣿⣶⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡟⣿\n' +
            '⣿⣿⣿⡆⠄⠄⠰⣶⡗⠄⠄⠄⣿⣿⣿⣿⣦⣌⠙⠿⣿⣿⣿⣿⣿⣿⣿⡛⠱⢿\n' +
            '⣿⣿⣿⣿⡀⠄⠄⠿⣿⠄⠄⠄⠨⡿⠿⠿⣿⣟⣿⣯⣹⣿⣿⣿⣿⣿⣿⣿⣦⡀\n' +
            '⣿⣿⣿⣿⣷⠄⠄⠄⢷⣦⠄⠄⠐⢶⢾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡇\n' +
            '⣿⣿⣿⣿⣿⣧⡄⠄⠄⠉⠄⠄⠄⢉⣽⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠟⠄\n' +
            '⣿⣿⣿⣿⣿⠟⠋⠄⠄⠄⠄⠄⠄⠈⠛⠿⠿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠋⠄\n' +
            '⣿⠿⠛⠉⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠘⠿⢿⣿⣿⣿⣿⣿⠿⠋⠄⠄⠄⠄' +
            '```');
    }
    else if (commandName === 'ultra') {
        const headers = {
            'Authorization': 'Bearer ' + process.env.ULTRA_TOKEN
        }
        try {
            const response = await axios.get(process.env.ULTRA_URL, { headers });

            const fs = response.data.service_stats_info.free_storage_gb;
            const ts = response.data.service_stats_info.total_storage_value;
            const us = response.data.service_stats_info.used_storage_value;
            const tu = response.data.service_stats_info.traffic_used_percentage;
            const tr = response.data.service_stats_info.last_traffic_reset;
            const tn = response.data.service_stats_info.next_traffic_reset;
            const ta = response.data.service_stats_info.traffic_available_percentage;

            await interaction.reply(`**ULTRA.CC STATS** \n Free Storage: **${fs}** **GB** \n Used Storage:  **${us} GB** \n Total Storage: **${ts} GB** \n Traffic Used: **${tu}** \n Traffic Available: **${ta}** \n Last Traffic Reset: **${tr}** \n Next Traffic Reset: **${tn}`);
        } catch (error) {
            console.error(error);
            await interaction.reply('An error occurred while fetching the stats.');
        }
    }
    });

client.on('messageCreate', async message => { if (message.author.bot) return;
    const msg = message.content.toLowerCase();
    const translationTable = msg.split('').filter(char => !punctuation.includes(char)).join('');
    const words = translationTable.split(" ");
    
    if (words.some(word => bad.includes(word))) {
        const neg = ['You must report to the nearest reeducation camp immediately', '请立即到离你最近的劳教所报到', 'This is not correct', '坏公民', '*Hits with gun*'];
        const response = neg[Math.floor(Math.random() * neg.length)];
        message.channel.send(response);
    
        const author = message.author.tag;
        if (socialCredits[author]) {
            socialCredits[author] -= 100;
            message.channel.send('-100 Social Credits 坏公民');
        } else {
            socialCredits[author] = 1500;
            message.channel.send('Social credit account created, you have 1500 social credit');
        }
    
        fs.writeFileSync('./data.json', JSON.stringify(socialCredits));
    }
    
    if (words.some(word => good.includes(word))) {
        const pos = ['Good citizen!', 'Keep doing your part!', '*Tips hat*', '*Smiles and nods*', '好公民', 'Based', '基于'];
        const response = pos[Math.floor(Math.random() * pos.length)];
        message.channel.send(response);
    
        const author = message.author.tag;
        if (socialCredits[author]) {
            socialCredits[author] += 100;
            message.channel.send('+100 Social Credit 好公民');
        } else {
            socialCredits[author] = 1700;
            message.channel.send('Social credit account created, you have 1700 social credit');
        }
    
        fs.writeFileSync('./data.json', JSON.stringify(socialCredits)); } });

client.login(process.env.DISCORD_TOKEN);