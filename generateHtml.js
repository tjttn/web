const fs = require("fs");
const { parseNews } = require("./parser");

async function generateHtml() {
  const news = await parseNews();

  let newsHtml = news.map(item => `
    <div class="news-card">
      <div class="news-date">${item.date}</div>
      <h2 class="news-title">${item.title}</h2>
      <p class="news-description">${item.description}</p>
      <a href="${item.link}" target="_blank">Читать полностью</a>
    </div>
  `).join("\n");

  const html = `
<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <title>Новости ЛГТУ</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <h1>Последние новости ЛГТУ</h1>
  <div id="news-container">
    ${newsHtml}
  </div>
</body>
</html>
  `;

  fs.writeFileSync("index.html", html);
  console.log("index.html успешно создан!");
}

generateHtml();