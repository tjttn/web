const axios = require("axios");
const cheerio = require("cheerio");

const URL = "https://www.stu.lipetsk.ru/news";

async function parseNews() {
  try {
    const { data } = await axios.get(URL, {
      headers: { "User-Agent": "Mozilla/5.0" }
    });

    const $ = cheerio.load(data);
    const news = [];

    $(".news-list a.news-card").slice(0, 10).each((i, el) => {
      const title = $(el).find(".news-card__title").text().trim();
      const description = $(el).find(".news-card__description").text().trim();
      const date = $(el).find("time").text().trim();
      const link = "https://www.stu.lipetsk.ru/" + $(el).attr("href");

      news.push({ title, date, description, link });
    });

    console.log("Последние 3 новости:\n");
    news.forEach((item, index) => {
      console.log(`Новость ${index + 1}`);
      console.log("Заголовок:", item.title);
      console.log("Дата:", item.date);
      console.log("Описание:", item.description);
      console.log("Ссылка:", item.link);
      console.log("-------------------------");
    });

    return news;

  } catch (error) {
    console.error("Ошибка парсинга:", error.message);
    return [];
  }
}

module.exports = { parseNews };