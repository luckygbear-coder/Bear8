/* =============== 易經 64 卦資料（簡版） =============== */
/*
  index(0-63) 對應六爻：底爻為 bit0，六爻為 bit5，1=陽，0=陰
  這裡用簡單順序，不是傳統文王卦序，但對「網頁占卜」來說沒關係，
  主要是讓同一組爻象會對應同一筆解說資料。
*/

const hexagrams = [];

// 工具：建立卦資料
function createHex(id, name, pinyin, shortMeaning, trend, classicGua, classicXiang, note) {
  return {
    id,
    name,
    pinyin,
    shortMeaning,
    trend, // "大吉" "小吉" "平" "提醒" "挑戰"
    classic: {
      gua: classicGua,
      xiang: classicXiang,
      note
    }
  };
}

// 先定義前 8 卦（乾坤屯蒙需訟師比）做示範，其餘用 placeholder 填滿 64 格
hexagrams[0] = createHex(
  1,
  "乾為天",
  "Qián",
  "整體能量強、主動、向上，是一卦講「自我突破與承擔」的卦。",
  "大吉",
  "乾：元，亨，利，貞。",
  "象曰：天行健，君子以自強不息。",
  "整體來說，是鼓勵你主動出擊的一卦：抓住時機，展現實力，同時保持正直與長期眼光。"
);

hexagrams[1] = createHex(
  2,
  "坤為地",
  "Kūn",
  "強調包容、承接、配合，是一卦講「柔順之力」與「穩定耕耘」。",
  "小吉",
  "坤：元，亨，利牝馬之貞。",
  "象曰：地勢坤，君子以厚德載物。",
  "適合穩穩打底、累積資源，多用溫柔與耐心，而不是硬碰硬。"
);

hexagrams[2] = createHex(
  3,
  "水雷屯",
  "Tún",
  "剛起步、狀況多，但也充滿成長空間的一卦。",
  "提醒",
  "屯：元亨利貞。勿用有攸往，利建侯。",
  "象曰：雲雷，屯。君子以經綸。",
  "事情剛開始會卡卡的，重點在整理資源、找對夥伴，而不是急著看到成果。"
);

hexagrams[3] = createHex(
  4,
  "山水蒙",
  "Méng",
  "象徵「尚在學習、需要指引」，適合謙虛求教的一卦。",
  "提醒",
  "蒙：亨。匪我求童蒙，童蒙求我。",
  "象曰：山下出泉，蒙。君子以果行育德。",
  "代表有不懂、有迷茫，很正常。關鍵在願不願意主動學習、請教懂的人。"
);

hexagrams[4] = createHex(
  5,
  "水天需",
  "Xū",
  "談等待時機與耐心，事情尚在醞釀中。",
  "平",
  "需：有孚，光亨，貞吉。利涉大川。",
  "象曰：雲上於天，需。君子以飲食宴樂。",
  "暫時還不到一衝就有成果的時候，穩住心情、補好能量再上。"
);

hexagrams[5] = createHex(
  6,
  "天水訟",
  "Sòng",
  "有爭執、對立、誤會的意味，提醒理性處理衝突。",
  "挑戰",
  "訟：有孚窒惕，中吉，終凶。利見大人，不利涉大川。",
  "象曰：天與水違行，訟。君子以作事謀始。",
  "容易遇到意見不合，與其事後收拾，不如一開始就說清楚規則與界線。"
);

hexagrams[6] = createHex(
  7,
  "地水師",
  "Shī",
  "像帶隊打仗，要有紀律、組織與共同目標。",
  "小吉",
  "師：貞，丈人吉，無咎。",
  "象曰：地中有水，師。君子以容民畜眾。",
  "適合團隊合作與系統化的行動，重視領導、秩序與彼此信任。"
);

hexagrams[7] = createHex(
  8,
  "水地比",
  "Bǐ",
  "講的是「親近、結盟」，強調關係與合作的一卦。",
  "小吉",
  "比：吉。原筮，元永貞，無咎。不寧方來，後夫凶。",
  "象曰：地上有水，比。先王以建萬國，親諸侯。",
  "適合拉近關係、尋找盟友，但也要看清楚對方的真心與穩定度。"
);

// 其餘 56 卦先塞入佔位資料（避免出錯）
for (let i = 8; i < 64; i++) {
  hexagrams[i] =
    hexagrams[i] ||
    createHex(
      i + 1,
      `第 ${i + 1} 卦（待補）`,
      "",
      "這一卦的詳細解說還在持續整理中，現在先把它當作一個「提醒自己慢慢觀察現況」的訊號。",
      "平",
      "卦辭原文整理中。",
      "象曰：象意整理中。",
      "之後可以請村長熊熊幫你把這一卦專門寫成完整白話解說。"
    );
}

/* =============== 工具：卦象生成 =============== */

// 產生一爻：6~9 對應 老陰/少陽/少陰/老陽
function randomLine() {
  // 三枚銅錢法的總和：實作上直接用 6~9 隨機即可
  const val = 6 + Math.floor(Math.random() * 4); // 6,7,8,9
  return val;
}

// 將 6~9 轉成陰陽（0/1）
function isYang(lineVal) {
  // 7,9 為陽；6,8 為陰
  return lineVal === 7 || lineVal === 9;
}

// 產生 6 爻（自下而上）
function generateSixLines(mode) {
  const lines = [];
  for (let i = 0; i < 6; i++) {
    if (mode === "quick") {
      // 只產生陰陽，不特別分老陰老陽
      const yang = Math.random() < 0.5;
      lines.push(yang ? 7 : 8); // 用 7 代表陽，8 代表陰
    } else {
      // 三枚銅錢法
      lines.push(randomLine());
    }
  }
  return lines;
}

// 把六爻轉成 0~63 的 index（底爻是最右邊 bit）
function linesToIndex(lines) {
  let idx = 0;
  for (let i = 0; i < 6; i++) {
    const yang = isYang(lines[i]);
    if (yang) {
      idx |= 1 << i;
    }
  }
  return idx % hexagrams.length;
}

/* =============== 白話 & 主題解說生成 =============== */

function trendText(trend) {
  switch (trend) {
    case "大吉":
      return "整體能量偏順，有利於主動出擊與展現自己。";
    case "小吉":
      return "整體氣氛不錯，只要穩穩來，多半會有收穫。";
    case "挑戰":
      return "這一卦比較像是「提醒」：有些地方需要特別留意與調整。";
    case "提醒":
      return "目前還在磨合、學習和整理的階段，適合慢下來調整步伐。";
    default:
      return "整體來說是中性的卦，關鍵在於你怎麼選擇行動。";
  }
}

function topicExplain(hex, topic) {
  const base = hex.shortMeaning;
  const t = hex.trend;

  const trendWord =
    t === "大吉"
      ? "偏順"
      : t === "小吉"
      ? "還不錯"
      : t === "挑戰"
      ? "帶著考驗"
      : t === "提醒"
      ? "需要耐心"
      : "中性";

  switch (topic) {
    case "love":
      return (
        "💗 感情面：\n" +
        `在感情關係上，這一卦的氣氛屬於「${trendWord}」。${base}` +
        " 重要的是誠實表達自己的感受，同時也願意聽聽對方真正的想法。"
      );
    case "career":
      return (
        "💼 工作 / 事業：\n" +
        `在工作上，這一卦提醒你：${base}` +
        " 不用急著一次衝到終點，穩穩處理好眼前的每一步，就能慢慢累積信任與成果。"
      );
    case "wealth":
      return (
        "💰 財運 / 金錢：\n" +
        `在金錢與資源上，這一卦屬於「${trendWord}」。${base}` +
        " 避免衝動消費或投機，專注在長期穩定的規劃會比較有保障。"
      );
    case "health":
      return (
        "🌿 健康 / 身心：\n" +
        `${base}` +
        " 從易經的角度來看，身心的節奏要配合自然：過度用力或過度放任都不適合，適時休息與調整生活作息很重要。"
      );
    case "social":
      return (
        "🤝 人際 / 合作：\n" +
        `${base}` +
        " 在相處上，多一點耐心與換位思考，會比急著爭辯誰對誰錯更有幫助。"
      );
    default:
      return (
        "📌 整體狀況：\n" +
        `${base}` +
        " 現在最重要的，是看見自己在這件事中的角色，並為自己的選擇負起溫柔的責任。"
      );
  }
}

function adviceText(hex, topic) {
  const t = hex.trend;
  let core;
  if (t === "大吉") {
    core = "主動把握機會，勇敢往前走，但記得保持謙卑與感謝。";
  } else if (t === "小吉") {
    core = "腳踏實地、持續投入，比耍小聰明更容易得到穩定的好結果。";
  } else if (t === "挑戰") {
    core = "先穩住情緒，再處理問題。與其硬碰硬，不如調整策略與界線。";
  } else if (t === "提醒") {
    core = "把現在的卡關當成「練習調整步伐」的機會，先整理好自己再決定要不要往前。";
  } else {
    core = "多留意細節，凡事先想一步，再行動一步。";
  }

  const topicTail =
    topic === "love"
      ? "在感情問題上，問問自己：什麼樣的關係模式，是真的讓你覺得安心又做自己？"
      : topic === "career"
      ? "在工作上，試著把壓力拆小塊，一件一件處理，你會比想像中有能力。"
      : topic === "wealth"
      ? "在金錢上，先照顧好基本生活與安全感，再考慮更大的目標。"
      : topic === "health"
      ? "在健康上，從睡眠、飲食與適度運動開始調整，就是很實際的改變。"
      : topic === "social"
      ? "在人際上，保護自己的界線，同時也給彼此一些彈性空間。"
      : "整體來說，先把可以做的那一步做好，再交給時間與宇宙。";

  return "✅ 行動建議：\n" + core + " " + topicTail;
}

/* =============== 熊熊提醒 =============== */

function bearMessage(hex, topic, question) {
  const q = (question || "").trim();
  const qPart = q ? `關於你問的「${q}」，` : "即使你沒有寫下具體問題，";
  const name = hex.name;
  const t = hex.trend;

  if (t === "大吉") {
    return (
      `${qPart}${name} 這一卦在對你微笑。\n` +
      "村長熊熊想說：你已經準備得差不多了，不一定要等到「完全沒不安」才上路，在不勉強自己的前提下，允許自己勇敢一下。"
    );
  } else if (t === "小吉") {
    return (
      `${qPart}${name} 給你的是溫柔但穩定的支持。\n` +
      "也許不是大爆發式的好運，而是一步一步慢慢變好的路，請相信這樣的節奏也很值得。"
    );
  } else if (t === "挑戰") {
    return (
      `${qPart}${name} 像是在說：「我知道你不容易。」\n` +
      "現在的困難不是在否定你，而是在幫你看見：哪些地方需要練習說不、設界線或換一種做法。你不是失敗，而是在升級前的卡關。"
    );
  } else if (t === "提醒") {
    return (
      `${qPart}${name} 想請你先緩一緩。\n` +
      "不要急著做出最終決定，先好好照顧自己的身心，把資訊看清楚，再慢慢選擇，時間會站在你這邊。"
    );
  } else {
    return (
      `${qPart}${name} 給你的是一面小小的鏡子。\n` +
      "請你在做每一個決定前，多問自己一次：這是不是對「現在的我」溫柔又誠實的選擇？只要你願意這樣對待自己，就是在走對的路。"
    );
  }
}

/* =============== 畫面渲染 =============== */

function renderLines(lines) {
  const container = document.getElementById("lines-display");
  container.innerHTML = "";

  const labels = ["上爻", "五爻", "四爻", "三爻", "二爻", "初爻"]; // 由上而下
  for (let i = 5; i >= 0; i--) {
    const row = document.createElement("div");
    row.className = "line-row";

    const body = document.createElement("div");
    body.className =
      "line-body " + (isYang(lines[i]) ? "line-yang" : "line-yin");

    const label = document.createElement("div");
    label.className = "line-label";
    label.textContent = labels[5 - i];

    row.appendChild(label);
    row.appendChild(body);
    container.appendChild(row);
  }
}

function renderHexInfo(hex) {
  const basic = document.getElementById("hex-basic");
  basic.innerHTML = "";

  const nameEl = document.createElement("div");
  nameEl.className = "hex-name";
  nameEl.textContent = `${hex.id}. ${hex.name}`;

  const metaEl = document.createElement("div");
  metaEl.className = "hex-meta";
  metaEl.textContent = `卦意關鍵：${hex.shortMeaning} （整體走向：${hex.trend}）`;

  basic.appendChild(nameEl);
  basic.appendChild(metaEl);
}

function renderModern(hex, topic) {
  document.getElementById("modern-summary").textContent =
    "總體卦意：\n" + hex.shortMeaning + " " + trendText(hex.trend);
  document.getElementById("modern-topic").textContent = topicExplain(
    hex,
    topic
  );
  document.getElementById("modern-advice").textContent = adviceText(
    hex,
    topic
  );
}

function renderClassic(hex) {
  document.getElementById("classic-gua").textContent =
    "卦辭：\n" + hex.classic.gua;
  document.getElementById("classic-xiang").textContent =
    "象傳：\n" + hex.classic.xiang;
  document.getElementById("classic-note").textContent =
    "熊熊小補充：\n" + hex.classic.note;
}

/* =============== 切換白話 / 經典 =============== */

function setupViewToggle() {
  const btnModern = document.getElementById("view-modern");
  const btnClassic = document.getElementById("view-classic");
  const panelModern = document.getElementById("modern-view");
  const panelClassic = document.getElementById("classic-view");

  btnModern.addEventListener("click", () => {
    btnModern.classList.add("active");
    btnClassic.classList.remove("active");
    panelModern.classList.remove("hidden");
    panelClassic.classList.add("hidden");
  });

  btnClassic.addEventListener("click", () => {
    btnClassic.classList.add("active");
    btnModern.classList.remove("active");
    panelClassic.classList.remove("hidden");
    panelModern.classList.add("hidden");
  });
}

/* =============== DOM Ready =============== */

document.addEventListener("DOMContentLoaded", () => {
  const castBtn = document.getElementById("cast-btn");
  const questionInput = document.getElementById("user-question");
  const topicSelect = document.getElementById("topic");
  const resultArea = document.getElementById("result-area");
  const questionDisplay = document.getElementById("question-display");
  const bearTextEl = document.getElementById("bear-text");
  const yearSpan = document.getElementById("year");

  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  setupViewToggle();

  castBtn.addEventListener("click", () => {
    const mode =
      document.querySelector('input[name="mode"]:checked')?.value || "coin";
    const topic = topicSelect.value || "overall";
    const question = questionInput.value || "";

    // 生成六爻
    const lines = generateSixLines(mode);
    const idx = linesToIndex(lines);
    const hex = hexagrams[idx];

    // 顯示問題
    const q = question.trim();
    questionDisplay.textContent = q
      ? `你問的是：\n「${q}」`
      : "你沒有寫下具體問題，但沒關係，請把這一卦當成生活給你的提醒。";

    // 顯示六爻＆卦象
    renderLines(lines);
    renderHexInfo(hex);
    renderModern(hex, topic);
    renderClassic(hex);

    // 熊熊提醒
    bearTextEl.textContent = bearMessage(hex, topic, question);

    // 顯示結果區
    resultArea.classList.remove("hidden");
    resultArea.scrollIntoView({ behavior: "smooth" });
  });
});
