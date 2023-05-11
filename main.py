import os
import discord
import random
import re
from dotenv import load_dotenv
import json

intents = discord.Intents.default()
intents.message_content = True

goodness = ''

suggestion = ''

load_dotenv()
TOKEN = os.getenv('DISCORD_TOKEN')
DISID = os.getenv('DISCORD_ID')
bot = discord.Bot(intents=intents)

with open('data.json', 'r') as fp:
    social_credits = json.load(fp)

##Opening the JSON files containing the "Good" or "bad" words
with open('bad.json', 'r') as fp:
    bad = json.load(fp)

with open('good.json', 'r') as fp:
    good = json.load(fp)

punctuation = ['!', '?', '.', ',', '`', '~', '@', '#', '$', '%', '&', '*', '(', ')']

user = bot.fetch_user(DISID)

@bot.event
async def on_ready():
    print(f"Logged in as {bot.user}")
    user = await bot.fetch_user(DISID)
    await user.send('请立即到离你最近的劳教所报到')


##Word suggest commands
@bot.slash_command(name="suggest_good", description="Suggest new good words to detect!")
async def suggest(ctx, suggestion = discord.Option(name='suggestion')):
    goodness = 'good '
    suggestion = suggestion
    suggestions = suggestion
    await ctx.response.send_message('You suggested %s' % suggestion, ephemeral=True)
    user = await bot.fetch_user(DISID)
    await user.send('Good Suggestion: %s' % suggestions)

@bot.slash_command(name="suggest_bad", description="Suggest new bad words to detect!")
async def suggest(ctx, suggestion = discord.Option(name='suggestion')):
    goodness = 'bad'
    suggestion = suggestion
    suggestions = suggestion
    await ctx.response.send_message('You suggested %s' % suggestion, ephemeral=True)
    user = await bot.fetch_user(DISID)
    await user.send('Bad Suggestion: %s' % suggestions)



##Credit Command
@bot.slash_command(name="get_credit", description="Get your current social credit")
async def get_credit(ctx):
    auth = str(ctx.author)
    value = social_credits.get(auth)
    print(auth)
    await ctx.respond('You have %s social credit 社会信用' % (value), ephemeral=True)

##Leaderboard command
@bot.slash_command(name="leaderboard", description="Show global social credit rankings")
async def leaderboard(ctx):
    leaderb0 = dict(sorted(social_credits.items(), key=lambda item: item[1], reverse=True))
    leaderb1 = str(leaderb0)
    leaderb2 = leaderb1.replace('{', '%temp%').replace('{','}').replace('%temp%','')
    leaderb3 = leaderb2.replace('}', '%temp%').replace('{', '}').replace('%temp%', '')
    Leaderb = leaderb3.split(",")
    print(Leaderb)
    embed = discord.Embed(title="Leaderboard", description="The overall social credit rankings", color=discord.Colour.red())
    embed.add_field(name='排行榜', value="\n".join('%01d %s' % (i, s) for i, s in enumerate(Leaderb, 1)))
    await ctx.respond(embed=embed)

##Re-educaiton camp
@bot.slash_command(name="reeducation", description="Please report to the nearest reeducation camp immediately")
async def reeducation(ctx):
    await ctx.respond('请立即到离你最近的劳教所报到. Please report to your nearest reeducation camp immediately.')

##eatbug
@bot.slash_command(name="eatbug", description="Eat the bug. Yum Yum.")
async def eatbug(ctx):
    await ctx.respond('吃虫子百胜 Eat the bug. Yum Yum.')

##Gaslight
@bot.slash_command(name="gaslight", description="Gaslight")
async def gaslight(ctx):
    neg = [
        'What the fuck are you talking about',
        'You are a fucking idiot',
        'Not it is not',
        'I love you and I will never leave you'
    ]
    responce = random.choice(neg)
    await ctx.respond(responce)

##save
@bot.slash_command(name="save", description="Remind Jacob to Save Sharepoint")
async def eatbug(ctx):
    await ctx.respond('Reminding Jacob to Save Sharepoint')

#good_citizen
@bot.slash_command(name="good_citizen", description="recognize good citizen")
async def goodcitizen(ctx):
    await ctx.respond('Good Citizen! 好公民')

#bad_citizen
@bot.slash_command(name="bad_citizen", description="recognize bad citizen")
async def badcitizen(ctx):
    await ctx.respond('坏公民 请立即到离你最近的劳教所报到 坏公民')

#lord_gaben
@bot.slash_command(name="lord_gaben", description="our holy savior")
async def lordgaben(ctx):
    await ctx.respond('''
⣿⣿⣿⣿⣿⣿⣿⡿⠟⠛⠉⠉⠉⠉⠋⠉⠉⠙⠛⠛⠻⠿⢿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⠿⠋⠁⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠈⠉⠻⣿⣿⣿⣿⣿
⣿⣿⡟⠁⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠙⢻⣿⣿⣿
⣿⠏⠄⠄⠄⠄⠄⠄⠄⠄⢀⣔⢤⣄⡀⠄⡄⡀⠄⠄⠄⠄⠄⠄⠄⠄⠄⢻⣿⣿
⠏⠄⠄⠄⠄⠄⠄⠄⢀⣀⣨⣵⣿⣿⣿⣿⣧⣦⣤⣀⣿⣷⡐⠄⠄⠄⠄⠄⢿⣿
⠄⠄⠄⠄⠄⠄⠐⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣦⡀⠄⠄⠄⢚⣿
⣆⠄⠄⠄⠄⠄⠄⢻⣿⣿⣿⣿⡿⠛⠛⠛⠛⣿⢿⣿⣿⣿⡿⢟⣻⣄⣤⣮⡝⣿
⣿⠆⠄⠄⠄⠄⠄⠄⠄⠄⠉⠘⣿⡗⡕⣋⢉⣩⣽⣬⣭⣶⣿⣿⣿⣿⣝⣻⣷⣿
⣿⣦⡀⠄⠄⠠⢀⠄⠄⠁⠄⠄⣿⣿⣶⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡟⣿
⣿⣿⣿⡆⠄⠄⠰⣶⡗⠄⠄⠄⣿⣿⣿⣿⣦⣌⠙⠿⣿⣿⣿⣿⣿⣿⣿⡛⠱⢿
⣿⣿⣿⣿⡀⠄⠄⠿⣿⠄⠄⠄⠨⡿⠿⠿⣿⣟⣿⣯⣹⣿⣿⣿⣿⣿⣿⣿⣦⡀
⣿⣿⣿⣿⣷⠄⠄⠄⢷⣦⠄⠄⠐⢶⢾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡇
⣿⣿⣿⣿⣿⣧⡄⠄⠄⠉⠄⠄⠄⢉⣽⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠟⠄
⣿⣿⣿⣿⣿⠟⠋⠄⠄⠄⠄⠄⠄⠈⠛⠿⠿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠋⠄
⣿⠿⠛⠉⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠘⠿⢿⣿⣿⣿⣿⣿⠿⠋⠄⠄⠄⠄''')

@bot.event
async def on_message(message): #usual check it's not the bot yada yada
    with open ('data.json', 'r') as fp:
        scdiff = json.load(fp)
    if message.author == bot.user:
        return
    if message.author.bot:
        return
    lower = message.content.lower()
    msg = lower  #splitting words and getting rid of punctuation
    translation_table = str.maketrans('', '', ''.join(punctuation))
    msg = msg.translate(translation_table)
    words = re.split("\s", msg)
    if (set(bad) & set(words)): #bad response
        neg = [
            'You must report to the nearest reeducation camp immediately',
            '请立即到离你最近的劳教所报到',
            'This is not correct',
            '坏公民',
            '*Hits with gun*',
        ]
        response = random.choice(neg)
        await message.channel.send(response)
        authr = str(message.author)
        print(authr)
        with open ('data.json', 'r') as fp:
            scdiff = json.load(fp)
        print(scdiff) #Credit application
        if authr in scdiff:
            value = social_credits.get(authr)
            print(value)
            value = value - 100
            social_credits.update({authr: value})
            scdiff = social_credits
            print(scdiff)
            await message.channel.send('-100 Social Credits 坏公民')
            with open('data.json', 'w') as fp:
                json.dump(scdiff, fp)
            return
        else:
            value = 1500
            social_credits.update({authr: value})
            scdiff = social_credits
            await message.channel.send('Social credit account created, you have 1500 social credit')
            print(scdiff)
            with open('data.json', 'w') as fp:
                json.dump(scdiff, fp)
    if (set(good) & set(words)): #good response
        pos = [
            'Good citizen!',
            'Keep doing your part!',
            '*Tips hat*',
            '*Smiles and nods*',
            '好公民'
        ]
        response = random.choice(pos)
        await message.channel.send(response)
        authr = str(message.author)
        print(authr)
        scdiff = social_credits    #this section is the applying of social credit
        print(scdiff)
        if authr in scdiff:
            value = social_credits.get(authr)
            print(value)
            value = value + 100
            social_credits.update({authr: value})
            scdiff = social_credits
            print(scdiff)
            await message.channel.send('+100 Social Credit 好公民')
            with open('data.json', 'w') as fp:
                json.dump(scdiff, fp)
            return
        else:
            value = 1700
            social_credits.update({authr: value})
            scdiff = social_credits
            await message.channel.send('Social credit account created, you have 1700 social credit')
            with open('data.json', 'w') as fp:
                json.dump(scdiff, fp)
            print(scdiff)
            return


bot.run(TOKEN) #社会信用体系启动
