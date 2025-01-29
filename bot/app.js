import { Telegraf, Markup } from "telegraf";

const token = "7668450099:AAEKau2UpSQbsD3n-tSBvI40b2_d7bfqa-Y";
const webAppUrl = "https://ural-tap.vercel.app/";

const bot = new Telegraf(token);

bot.command("start", (ctx) => {
	ctx.reply(
		"Hello! Press to start the app",
		Markup.inlineKeyboard([
			Markup.button.webApp("Open mini app", `${webAppUrl}?ref=${ctx.payload}`),
		])
	);
});

bot.launch();
