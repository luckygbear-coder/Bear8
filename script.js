/* =============== 易經 64 卦資料（簡版） =============== */
/*
  index(0-63) 對應六爻：底爻為 bit0，六爻為 bit5，1=陽，0=陰
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

/* 🌱 白話版顯示（主題＋五大面向小提醒） */
function renderModern(hex, topic) {
  var summaryEl = document.getElementById("modern-summary");
  var topicEl = document.getElementById("modern-topic");
  var adviceEl = document.getElementById("modern-advice");
  if (!summaryEl || !topicEl || !adviceEl) return;

  summaryEl.textContent =
    "總體卦意：\n" + hex.shortMeaning + " " + trendText(hex.trend);

  topicEl.textContent = topicExplain(hex, topic);

  var txt = adviceText(hex, topic);
  txt += "\n\n🔍 其他面向小提醒：\n" + multiTopicAnalysis(hex);

  adviceEl.textContent = txt;
}

/* ===== 批次新增：第 1〜8 卦 ===== */

hexagrams[0] = createHex(
  1,
  "乾為天",
  "Qián",
  "強勢、主動、突破、自我成長的卦。象徵大能量與創造力。",
  "大吉",
  "乾：元，亨，利，貞。",
  "象曰：天行健，君子以自強不息。",
  "乾卦是最陽、最強的開始。代表力量上升、主動出擊、勇敢前進、創造新局。"
);

hexagrams[1] = createHex(
  2,
  "坤為地",
  "Kūn",
  "柔順、承接、穩定、孕育的力量。象徵大地般的支持與包容。",
  "小吉",
  "坤：元，亨，利牝馬之貞。",
  "象曰：地勢坤，君子以厚德載物。",
  "坤卦提醒你：放慢、接住、配合，就是最強的力量。以柔克剛、以穩為勝。"
);

hexagrams[2] = createHex(
  3,
  "水雷屯",
  "Tún",
  "開端不順、卡住、狀況多，但充滿成長空間的開始。",
  "提醒",
  "屯：元亨利貞。勿用有攸往，利建侯。",
  "象曰：雲雷，屯。君子以經綸。",
  "屯卦象徵「開始的混亂」。不要急，重點是整理資源、找隊友、建立基礎。"
);

hexagrams[3] = createHex(
  4,
  "山水蒙",
  "Méng",
  "學習、探索、啟蒙的卦。代表你還在摸索，需要指引。",
  "提醒",
  "蒙：亨。匪我求童蒙，童蒙求我。",
  "象曰：山下出泉，蒙。君子以果行育德。",
  "蒙卦不是不好，而是提醒你：承認自己不懂，願意學，就會快速成長。"
);

hexagrams[4] = createHex(
  5,
  "水天需",
  "Xū",
  "等待時機、沉澱觀望的一卦。事情正在醞釀中。",
  "平",
  "需：有孚，光亨，貞吉。利涉大川。",
  "象曰：雲上於天，需。君子以飲食宴樂。",
  "需卦提醒：目前不適合急著突破，補充能量、觀察時機才是最優策略。"
);

hexagrams[5] = createHex(
  6,
  "天水訟",
  "Sòng",
  "衝突、爭執、對立的卦。提醒要理性處理，不宜硬碰硬。",
  "挑戰",
  "訟：有孚窒惕，中吉，終凶。利見大人，不利涉大川。",
  "象曰：天與水違行，訟。君子以作事謀始。",
  "訟卦不是叫你怕衝突，而是「在衝突爆發前先做好規則與界線」。"
);

hexagrams[6] = createHex(
  7,
  "地水師",
  "Shī",
  "團隊、組織、紀律的一卦。適合建立規劃、帶領夥伴。",
  "小吉",
  "師：貞，丈人吉，無咎。",
  "象曰：地中有水，師。君子以容民畜眾。",
  "師卦教你：不是單打獨鬥的時候。整隊、分工、信任，是成功關鍵。"
);

hexagrams[7] = createHex(
  8,
  "水地比",
  "Bǐ",
  "親近、吸引、合作、結盟的一卦。適合建立關係。",
  "小吉",
  "比：吉。原筮，元永貞，無咎。不寧方來，後夫凶。",
  "象曰：地上有水，比。先王以建萬國，親諸侯。",
  "比卦提醒：人際的距離感很重要。保持真誠，但也看清對方的真心。"
);

/* ===== 批次新增：第 9〜16 卦 ===== */

hexagrams[8] = createHex(
  9,
  "風天小畜",
  "Xiǎo Chù",
  "累積能量、慢慢蓄勢的卦。代表事情進展不快，但正在悄悄變好。",
  "小吉",
  "小畜：亨。密雲不雨，自我西郊。",
  "象曰：風行天上，小畜。君子以懿文德。",
  "小畜表示「小阻礙，但往好方向」。越著急越慢，越放鬆越順。"
);

hexagrams[9] = createHex(
  10,
  "天澤履",
  "Lǚ",
  "提醒小心行事、注意分寸的一卦。像走在薄冰上，需要穩定精準。",
  "提醒",
  "履：虎尾，不咥人，亨。",
  "象曰：上天下澤，履。君子以別上下，定民志。",
  "履卦教你「不踩雷的智慧」。保持禮貌、原則，就能避開危險。"
);

hexagrams[10] = createHex(
  11,
  "地天泰",
  "Tài",
  "通泰順利之卦。象徵天地交泰、貴人相助、萬事順勢。",
  "大吉",
  "泰：小往，大來，吉亨。",
  "象曰：天地交泰，後以財成天地之道。",
  "泰卦是「最美好的流動」。順勢、感恩、擴大格局就會更好。"
);

hexagrams[11] = createHex(
  12,
  "天地否",
  "Pǐ",
  "停滯、阻塞、外在不配合的一卦。暫不宜推動。",
  "挑戰",
  "否：否之匪人，不利君子貞，大往小來。",
  "象曰：天地不交，否。君子以儉德辟難。",
  "否卦提醒「環境不適合」。休息、觀察、等待比硬衝更重要。"
);

hexagrams[12] = createHex(
  13,
  "天火同人",
  "Tóng Rén",
  "合作、人際和諧的卦。適合建立夥伴與連結。",
  "小吉",
  "同人：同人于野，亨。",
  "象曰：天與火，同人。君子以類族辨物。",
  "同人卦表示「真誠合作」。打開心、站在同一邊，就能成功。"
);

hexagrams[13] = createHex(
  14,
  "火天大有",
  "Dà Yǒu",
  "豐盛、收穫、成功的一卦。象徵大成就與大提升。",
  "大吉",
  "大有：元亨。",
  "象曰：火在天上，大有。君子以遏惡揚善。",
  "大有卦代表「最大收穫」。展現才能、 confidently 前進就對了。"
);

hexagrams[14] = createHex(
  15,
  "地山謙",
  "Qiān",
  "謙卦代表內斂與美德。越謙虛越受歡迎、越順利。",
  "小吉",
  "謙：亨，君子有終。",
  "象曰：地中有山，謙。君子以裒多益寡。",
  "謙卦提醒「真正的強大是安靜的」。溫柔但堅定最為有力。"
);

hexagrams[15] = createHex(
  16,
  "雷地豫",
  "Yù",
  "象徵喜悅、期待、鼓舞的卦。動能強、適合展開新行動。",
  "小吉",
  "豫：利建侯行師。",
  "象曰：雷出地奮，豫。君子以先民用。",
  "豫卦是「帶著快樂去行動」。相信自己的直覺，行動會有好結果。"
);

/* ===== 批次新增：第 17〜24 卦 ===== */

hexagrams[16] = createHex(
  17,
  "澤雷隨",
  "Suí",
  "順勢而為、跟著變化走的卦。適合隨機應變。",
  "小吉",
  "隨：元亨利貞。无咎。",
  "象曰：澤中有雷，隨。君子以嚮晦入宴息。",
  "隨卦不是盲從，而是「看懂時機後，做出最輕鬆的選擇」。越彈性越順。"
);

hexagrams[17] = createHex(
  18,
  "山風蠱",
  "Gǔ",
  "清理、修正、整頓的一卦。代表把舊問題處理好，才迎來新開始。",
  "提醒",
  "蠱：元亨，利涉大川。先甲三日，後甲三日。",
  "象曰：山下有風，蠱。君子以振民育德。",
  "蠱卦表示「問題累積已久」，但現在正是修補、清理、重新建立秩序的好時機。"
);

hexagrams[18] = createHex(
  19,
  "地澤臨",
  "Lín",
  "心胸擴展、能量上升的一卦。貴人運強。",
  "小吉",
  "臨：元，亨，利貞。至于八月有凶。",
  "象曰：澤上有地，臨。君子以教思无窮，容保民无疆。",
  "臨卦代表「靠近成功」，力量正在提升，適合展開新計畫。"
);

hexagrams[19] = createHex(
  20,
  "風地觀",
  "Guān",
  "觀察、看清事物本質的一卦。宜冷靜、不要急著下決定。",
  "提醒",
  "觀：盥而不薦。有孚顒若。",
  "象曰：風行地上，觀。先王以省方觀民設教。",
  "觀卦提醒你：先看懂人性、局勢與時機，再行動會更穩。"
);

hexagrams[20] = createHex(
  21,
  "火雷噬嗑",
  "Shì Ké",
  "突破阻礙、解決問題的強勢卦。適合主動處理卡點。",
  "挑戰",
  "噬嗑：亨。利用獄。",
  "象曰：雷電噬嗑。先王以明罰敕法。",
  "噬嗑代表「咬碎障礙」，直接面對問題反而最快解決。"
);

hexagrams[21] = createHex(
  22,
  "山火賁",
  "Bì",
  "外在美、包裝、禮儀、人緣的一卦。適合展現魅力。",
  "小吉",
  "賁：亨。小利有攸往。",
  "象曰：山下有火，賁。君子以明庶政，无敢折獄。",
  "賁卦象徵「外表加分帶來機會」。整理形象或環境會有效提升運勢。"
);

hexagrams[22] = createHex(
  23,
  "山地剝",
  "Bō",
  "衰退、剝落、需要保守的一卦。提醒不要硬衝。",
  "挑戰",
  "剝：不利有攸往。",
  "象曰：山附於地，剝。上以厚下安宅。",
  "剝卦不是壞，只是「該休息」。保持底氣，不要勉強。"
);

hexagrams[23] = createHex(
  24,
  "地雷復",
  "Fù",
  "重新開始、能量回升的一卦。復甦、回頭、重生。",
  "小吉",
  "復：亨。出入无疾。朋來无咎。",
  "象曰：雷在地中，復。先王以至日閉關，商旅不行。",
  "復卦象徵「重新找回初心」。現在非常適合重新出發。"
);

/* ===== 批次新增：第 25〜32 卦 ===== */

hexagrams[24] = createHex(
  25,
  "天雷無妄",
  "Wú Wàng",
  "單純、真誠、不作假的卦。提醒不要過度計算，回到初心。",
  "提醒",
  "無妄：元亨，利貞。其匪正有眚，不利有攸往。",
  "象曰：天下雷行，物與无妄。先王以茂對時育萬物。",
  "無妄卦在說：「不要瞎操心」。做對的事、坦蕩踏實，就算事情慢慢來，也是在走正路。"
);

hexagrams[25] = createHex(
  26,
  "山天大畜",
  "Dà Xù",
  "累積實力、暫時按兵不動的一卦。養精蓄銳，等待突破。",
  "小吉",
  "大畜：利貞，不家食吉。利涉大川。",
  "象曰：天在山中，大畜。君子以多識前言往行，以畜其德。",
  "大畜卦是「存款型」能量：先存實力、存人脈、存信用，將來會有大翻身機會。"
);

hexagrams[26] = createHex(
  27,
  "山雷頤",
  "Yí",
  "照顧自己、飲食與養分的一卦。包含身心的滋養與說話的分寸。",
  "平",
  "頤：貞吉。觀頤，自求口實。",
  "象曰：山下有雷，頤。君子以慎言語，節飲食。",
  "頤卦提醒你：吃什麼、聽什麼、說什麼，都會成為你的「心情養分」。先照顧好自己，再談下一步。"
);

hexagrams[27] = createHex(
  28,
  "澤風大過",
  "Dà Guò",
  "壓力過大、負擔過重的一卦。提醒不要一肩扛太多。",
  "挑戰",
  "大過：棟橈，利有攸往，亨。",
  "象曰：澤滅木，大過。君子以獨立不懼。",
  "大過卦像是「梁柱快被壓彎」。你很撐，但也要學會分工、求助，不要硬撐到垮掉。"
);

hexagrams[28] = createHex(
  29,
  "坎為水",
  "Kǎn",
  "反覆、波動、有風險的一卦。像掉進坑裡，要小心走。",
  "挑戰",
  "坎：習坎，有孚，維心亨，行有尚。",
  "象曰：水洊至，習坎。君子以常德行，習教事。",
  "坎卦不是一定失敗，而是告訴你「路比較難走」。要慢、要穩、要有備案。"
);

hexagrams[29] = createHex(
  30,
  "離為火",
  "Lí",
  "清晰、亮度、洞察力的一卦。適合學習、表達與創意。",
  "小吉",
  "離：利貞，亨。畜牝牛吉。",
  "象曰：明兩作，離。大人以繼明照于四方。",
  "離卦就像打開燈：看清事實、看清人心，也讓別人看見你的光。適合公開、分享、創作。"
);

hexagrams[30] = createHex(
  31,
  "澤山咸",
  "Xián",
  "互相吸引、心被觸動的一卦。感情、人際都很有「被打動」的感覺。",
  "小吉",
  "咸：亨，利貞。取女吉。",
  "象曰：山上有澤，咸。君子以虛受人。",
  "咸卦適合戀愛、談合作，但也提醒要真誠、保持開放心，不是只用手段去吸引別人。"
);

hexagrams[31] = createHex(
  32,
  "雷風恆",
  "Héng",
  "穩定、長久、持續的一卦。重視耐心與長期承諾。",
  "小吉",
  "恆：亨，无咎，利貞。利有攸往。",
  "象曰：雷風，恆。君子以立不易方。",
  "恆卦在說：「慢慢來，但不要停。」不求一次到位，而是一步一步堅持，就會累積成長久的好結果。"
);

/* ===== 批次新增：第 33〜64 卦 ===== */

hexagrams[32] = createHex(
  33,
  "天山遯",
  "Dùn",
  "退一步、避其鋒芒的卦。適合撤退、避開麻煩。",
  "提醒",
  "遯：亨，小利貞。",
  "象曰：天下有山，遯。君子以遠小人，不惡而嚴。",
  "遯卦提醒你：不是逃避，而是「策略性後退」。保護心力，就是智慧。"
);

hexagrams[33] = createHex(
  34,
  "雷天大壯",
  "Dà Zhuàng",
  "力量增強、意志堅定的卦。適合衝刺，但要避免過度強硬。",
  "小吉",
  "大壯：利貞。",
  "象曰：雷在天上，大壯。君子以非禮勿履。",
  "你的能量變強了，但越強越要懂得掌握節奏，不衝動、不逞強。"
);

hexagrams[34] = createHex(
  35,
  "火地晉",
  "Jìn",
  "進步、升遷、光明前景的卦。象徵向上發展。",
  "大吉",
  "晉：康侯用錫馬蕃庶，晝日三接。",
  "象曰：明出地上，晉。君子以自昭明德。",
  "晉卦是「大步向上」。你正被往上看見，請勇敢站到光裡。"
);

hexagrams[35] = createHex(
  36,
  "地火明夷",
  "Míng Yí",
  "壓抑、受傷、能量下降。需要保護自己。",
  "挑戰",
  "明夷：利艱貞。",
  "象曰：明入地中，明夷。君子以蒞眾，用晦而明。",
  "明夷提醒：不是你的問題，而是環境不利。低調、自保、慢慢修養。"
);

hexagrams[36] = createHex(
  37,
  "風火家人",
  "Jiā Rén",
  "家庭、人際、內部秩序的卦。強調角色分工與信任。",
  "小吉",
  "家人：利女貞。",
  "象曰：風自火出，家人。君子以言有物而行有恆。",
  "家人卦提醒你：良好關係靠「溝通＋界線」。講清楚、說明白最重要。"
);

hexagrams[37] = createHex(
  38,
  "火澤睽",
  "Kuí",
  "意見不同、分歧、距離感的卦。適合尋找共同點。",
  "提醒",
  "睽：小事吉。",
  "象曰：上火下澤，睽。君子以同而異。",
  "睽卦不是吵架，而是「觀念不同」。找到共通語言，就能重新靠近。"
);

hexagrams[38] = createHex(
  39,
  "水山蹇",
  "Jiǎn",
  "困難、阻礙、前方不好走。宜停下、調整策略。",
  "挑戰",
  "蹇：利西南，不利東北；利見大人。",
  "象曰：山上有水，蹇。君子以反身修德。",
  "蹇卦說：不是時機不好，而是方向不對。調整方向比硬衝更重要。"
);

hexagrams[39] = createHex(
  40,
  "雷水解",
  "Xiè",
  "問題解除、壓力釋放、轉機到來的卦。",
  "小吉",
  "解：利西南。无所往，其來復吉。",
  "象曰：雷雨作，解。君子以赦過宥罪。",
  "解卦代表「卡關解除」。鬆一口氣後，好事會慢慢開始發生。"
);

hexagrams[40] = createHex(
  41,
  "山澤損",
  "Sǔn",
  "減少、收縮、調整的一卦。要捨去負擔，換來真正的輕鬆。",
  "提醒",
  "損：有孚，元吉，无咎，可貞。",
  "象曰：山下有澤，損。君子以懲忿窒欲。",
  "損卦教你：清掉不需要的東西（人、事、壓力），反而能得到更多。"
);

hexagrams[41] = createHex(
  42,
  "風雷益",
  "Yì",
  "成長、增加、提升的一卦。努力會獲得回報。",
  "大吉",
  "益：利有攸往，利涉大川。",
  "象曰：風雷，益。君子以見善則遷，有過則改。",
  "益卦是「加分卦」。你的付出會被看見，你的善意正在累積好運。"
);

hexagrams[42] = createHex(
  43,
  "澤天夬",
  "Guài",
  "果斷決定、切斷不合適的事物。強勢但必要。",
  "挑戰",
  "夬：揚于王庭，孚號，有厲；告自邑，不利即戎，利有攸往。",
  "象曰：澤上於天，夬。君子以施祿及下，居德則忌。",
  "夬卦叫你：不要再拖。切斷，就是轉機。"
);

hexagrams[43] = createHex(
  44,
  "天風姤",
  "Gòu",
  "突如其來的遇見、巧合、機緣。也可能是突發狀況。",
  "提醒",
  "姤：女壯，勿用取女。",
  "象曰：天下有風，姤。后以施命誥四方。",
  "姤卦提醒：機會來得快，但要辨識「好機會」還是「麻煩」。"
);

hexagrams[44] = createHex(
  45,
  "澤地萃",
  "Cuì",
  "聚集、團隊、群體能量增強。適合合作與社群力量。",
  "小吉",
  "萃：亨。王假有廟。",
  "象曰：澤上於地，萃。君子以除戎器，戒不虞。",
  "萃卦表示聚合、分享、支持。你不是一個人在努力。"
);

hexagrams[45] = createHex(
  46,
  "地風升",
  "Shēng",
  "上升、累積、穩健進步。慢但非常穩。",
  "大吉",
  "升：元亨。用見大人；勿恤；南征吉。",
  "象曰：地中生木，升。君子以順德，積小以高大。",
  "升卦是「小步快跑」。你一步一步都在走上坡，不要低估自己。"
);

hexagrams[46] = createHex(
  47,
  "澤水困",
  "Kùn",
  "困境、壓力、被限制。精神需要休息與轉念。",
  "挑戰",
  "困：亨；貞，大人吉，无咎；有言不信。",
  "象曰：澤无水，困。君子以致命遂志。",
  "困卦不是失敗，而是提醒你：心累了，需要補充能量。"
);

hexagrams[47] = createHex(
  48,
  "水風井",
  "Jǐng",
  "資源穩定、重建基礎的卦。井水象徵永續。",
  "小吉",
  "井：改邑不改井；无喪无得。",
  "象曰：木上有水，井。君子以勞民勸相。",
  "井卦提醒：回到基礎、打好底子，就是最穩的提升方式。"
);

hexagrams[48] = createHex(
  49,
  "澤火革",
  "Gé",
  "改革、轉變、脫胎換骨。需要勇氣。",
  "挑戰",
  "革：已日乃孚。",
  "象曰：澤中有火，革。君子以治曆明時。",
  "革卦表示「大改變正在發生」。不要抗拒，而是順勢更新自己。"
);

hexagrams[49] = createHex(
  50,
  "火風鼎",
  "Dǐng",
  "轉機、正位、地位提升。鼎象徵穩定與榮耀。",
  "大吉",
  "鼎：元吉，亨。",
  "象曰：木上有火，鼎。君子以正位凝命。",
  "鼎卦是「站上更好的位置」。你會被看見、被肯定。"
);

hexagrams[50] = createHex(
  51,
  "震為雷",
  "Zhèn",
  "驚動、突發、震撼的一卦。提醒保持冷靜。",
  "提醒",
  "震：亨。震來虩虩；後笑言啞啞。",
  "象曰：洊雷，震。君子以恐懼修省。",
  "震卦表示變動來得快，但結果是好的。不要被嚇到。"
);

hexagrams[51] = createHex(
  52,
  "艮為山",
  "Gèn",
  "停止、靜止、收心的卦。適合暫停、沉澱、冥想。",
  "平",
  "艮：其背，不獲其身；行其庭，不見其人；无咎。",
  "象曰：兼山，艮。君子以思不出其位。",
  "艮卦提醒：太多事情擠在心裡時，「停一下」就是最好的療癒。"
);

hexagrams[52] = createHex(
  53,
  "風山漸",
  "Jiàn",
  "漸進、慢慢成長的卦。穩健、長期累積。",
  "小吉",
  "漸：女歸吉，利貞。",
  "象曰：山上有風，漸。君子以居賢德善俗。",
  "漸卦說：你走得不快，但非常穩。這是一條通往成功的道路。"
);

hexagrams[53] = createHex(
  54,
  "雷澤歸妹",
  "Guī Mèi",
  "順應環境、被動接受的卦。事情不一定照你方式走。",
  "提醒",
  "歸妹：征凶，無攸利。",
  "象曰：澤上有雷，歸妹。君子以永終知敝。",
  "歸妹卦提醒：現階段不適合主導，先適應情勢會比較順。"
);

hexagrams[54] = createHex(
  55,
  "雷火豐",
  "Fēng",
  "盛大、豐盛、能量最滿的一卦。好但容易太亮。",
  "大吉",
  "豐：亨，王假之。",
  "象曰：雷電皆至，豐。君子以折獄致刑。",
  "豐卦就像舞台最亮的時候，同時也容易被放大檢視。保持謙虛即可。"
);

hexagrams[55] = createHex(
  56,
  "火山旅",
  "Lǚ",
  "漂泊、移動、外出的一卦。提醒保持彈性。",
  "提醒",
  "旅：小亨，旅貞吉。",
  "象曰：山上有火，旅。君子以明慎用刑而不留獄。",
  "旅卦象徵「短暫的地方」。不要依賴外界，多專注自己。"
);

hexagrams[56] = createHex(
  57,
  "巽為風",
  "Xùn",
  "柔順、滲透、影響力的一卦。適合溝通與談判。",
  "小吉",
  "巽：小亨。利有攸往，利見大人。",
  "象曰：隨風，巽。君子以申命行事。",
  "巽卦代表「用柔的力量去影響」。不要硬推，用說的更有效。"
);

hexagrams[57] = createHex(
  58,
  "兌為澤",
  "Duì",
  "喜悅、開心、溫柔的卦。人際互動佳。",
  "小吉",
  "兌：亨，利貞。",
  "象曰：麗澤，兌。君子以朋友講習。",
  "兌卦是快樂的能量。建立好關係、一句好話，運勢都會提升。"
);

hexagrams[58] = createHex(
  59,
  "風水渙",
  "Huàn",
  "解散、疏散、鬆動的一卦。適合鬆綁與釋放壓力。",
  "提醒",
  "渙：亨。王假有廟。",
  "象曰：風行水上，渙。先王以享于帝立廟。",
  "渙卦教你：不要抓太緊。放鬆、放下、放手，事情才會流動。"
);

hexagrams[59] = createHex(
  60,
  "水澤節",
  "Jié",
  "節制、管理、規範的一卦。提醒界線非常重要。",
  "平",
  "節：亨。苦節不可貞。",
  "象曰：澤上有水，節。君子以制數度，議德行。",
  "節卦說：有界線才有自由。適度調整，生活會更順。"
);

hexagrams[60] = createHex(
  61,
  "風天中孚",
  "Zhōng Fú",
  "真誠、信任、心靈一致的一卦。合作運極佳。",
  "大吉",
  "中孚：豚魚吉，利涉大川。",
  "象曰：澤上有風，中孚。君子以議獄緩死。",
  "中孚卦說：只要你是真心的，宇宙會回應你。"
);

hexagrams[61] = createHex(
  62,
  "雷山小過",
  "Xiǎo Guò",
  "小錯、小問題、小調整。適合低調前進。",
  "提醒",
  "小過：亨。利貞。",
  "象曰：山上有雷，小過。君子以行過乎恭。",
  "小過卦教你：做少一點、說少一點，反而會更順。"
);

hexagrams[62] = createHex(
  63,
  "水火既濟",
  "Jì Jì",
  "事情已完成、進入收尾。好但要保持警覺。",
  "小吉",
  "既濟：亨。小利貞。",
  "象曰：水在火上，既濟。君子以思患而豫防之。",
  "既濟卦提醒：成功後反而要更小心，避免掉以輕心。"
);

hexagrams[63] = createHex(
  64,
  "火水未濟",
  "Wèi Jì",
  "未完成、快成功但還差一步。正在過渡期。",
  "提醒",
  "未濟：亨。小狐汔濟，濡其尾，无攸利。",
  "象曰：火在水上，未濟。君子以慎辨物居方。",
  "未濟卦說：現在不適合急著結束。再檢查一次、再穩一下，就是成功。"
);

// 其餘先塞 placeholder（理論上不會用到，但保險）
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

/* =============== 卦象生成 =============== */

// 一爻：6~9（模擬三枚銅錢的結果）
function randomLine() {
  const val = 6 + Math.floor(Math.random() * 4); // 6,7,8,9
  return val;
}

// 6/8 陰；7/9 陽
function isYang(lineVal) {
  return lineVal === 7 || lineVal === 9;
}

// 產生 6 爻（自下而上）
function generateSixLines(mode) {
  const lines = [];
  for (let i = 0; i < 6; i++) {
    if (mode === "quick") {
      const yang = Math.random() < 0.5;
      lines.push(yang ? 7 : 8);
    } else {
      lines.push(randomLine());
    }
  }
  return lines;
}

// 六爻轉 index（0~63）
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

// 判斷是否有動爻（6 或 9）
function hasMovingLine(lines) {
  for (var i = 0; i < lines.length; i++) {
    if (lines[i] === 6 || lines[i] === 9) return true;
  }
  return false;
}

// 依動爻產生「之卦」用的六爻（把動爻反轉）
function getChangedLines(lines) {
  var newLines = [];
  for (var i = 0; i < lines.length; i++) {
    var v = lines[i];
    var moving = v === 6 || v === 9;
    var yang = isYang(v);
    if (!moving) {
      newLines.push(v);
    } else {
      newLines.push(yang ? 8 : 7); // 陽變陰、陰變陽
    }
  }
  return newLines;
}

// 回傳之卦資料（沒有動爻則回傳 null）
function computeDerivedHex(lines) {
  if (!hasMovingLine(lines)) return null;
  var changedLines = getChangedLines(lines);
  var idx = linesToIndex(changedLines);
  return {
    lines: changedLines,
    hex: hexagrams[idx]
  };
}

/* =============== 白話 & 主題解說 =============== */

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

function multiTopicAnalysis(hex) {
  var t = hex.trend;
  var base = hex.shortMeaning;

  var toneGood =
    t === "大吉"
      ? "整體偏順、貴人感強。"
      : t === "小吉"
      ? "整體偏穩，只要照步驟做就好。"
      : t === "挑戰"
      ? "會有壓力，但也帶來成長。"
      : t === "提醒"
      ? "比較像是「先調整自己」的階段。"
      : "屬於中性狀態，關鍵在你的選擇。";

  var love =
    "💗 感情：多留意溝通方式，不是對錯，而是彼此能不能被理解。 " +
    base;

  var career =
    "💼 工作：把大目標拆小步驟，現在最重要的是穩定輸出。 " +
    toneGood;

  var wealth =
    "💰 財運：先顧好基本生活與安全感，再來談投資與冒險。 避免因為情緒做決定。";

  var health =
    "🌿 健康：身心狀態很關鍵，睡眠與飲食是根本。 感到壓力時，允許自己休息，不是偷懶。";

  var social =
    "🤝 人際：選擇讓你自在的圈子，也練習成為別人的「安全感來源」。";

  return love + "\n" + career + "\n" + wealth + "\n" + health + "\n" + social;
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

/* =============== 畫面渲染（卦象與解說） =============== */

function renderLines(lines) {
  var container = document.getElementById("lines-display");
  container.innerHTML = "";

  var labels = ["上爻", "五爻", "四爻", "三爻", "二爻", "初爻"];
  for (var i = 5; i >= 0; i--) {
    var row = document.createElement("div");
    row.className = "line-row";

    var v = lines[i];
    var moving = v === 6 || v === 9;

    var body = document.createElement("div");
    var cls = "line-body ";
    cls += isYang(v) ? "line-yang" : "line-yin";
    if (moving) {
      cls += " line-moving";
    }
    body.className = cls;

    var label = document.createElement("div");
    label.className = "line-label";
    label.textContent = labels[5 - i];

    row.appendChild(label);
    row.appendChild(body);
    container.appendChild(row);
  }
}

function renderHexInfo(hex, derivedHex) {
  var basic = document.getElementById("hex-basic");
  basic.innerHTML = "";

  // 本卦
  var nameEl = document.createElement("div");
  nameEl.className = "hex-name";
  nameEl.textContent = "本卦：" + hex.id + ". " + hex.name;

  var metaEl = document.createElement("div");
  metaEl.className = "hex-meta";
  metaEl.textContent =
    "卦意關鍵：" + hex.shortMeaning + " （整體走向：" + hex.trend + "）";

  basic.appendChild(nameEl);
  basic.appendChild(metaEl);

  // 之卦（如果有動爻）
  if (derivedHex && derivedHex.hex) {
    var d = derivedHex.hex;

    var subTitle = document.createElement("div");
    subTitle.className = "hex-sub-title";
    subTitle.textContent = "之卦（動爻變化後的走向）：";

    var dName = document.createElement("div");
    dName.className = "hex-sub-name";
    dName.textContent = d.id + ". " + d.name;

    var dMeta = document.createElement("div");
    dMeta.className = "hex-sub-meta";
    dMeta.textContent =
      "補充卦意：" + d.shortMeaning + " （走向：" + d.trend + "）";

    basic.appendChild(subTitle);
    basic.appendChild(dName);
    basic.appendChild(dMeta);
  } else {
    var noChange = document.createElement("div");
    noChange.className = "hex-sub-meta";
    noChange.textContent = "本次沒有動爻，本卦就是主要的參考方向。";
    basic.appendChild(noChange);
  }
}

function renderClassic(hex) {
  document.getElementById("classic-gua").textContent =
    "卦辭：\n" + hex.classic.gua;
  document.getElementById("classic-xiang").textContent =
    "象傳：\n" + hex.classic.xiang;
  document.getElementById("classic-note").textContent =
    "熊熊小補充：\n" + hex.classic.note;
}

/* =============== 白話 / 經典切換 =============== */

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

/* =============== 占卜日記 (localStorage) =============== */

const DIARY_KEY = "bearIchingDiaryV1";

function loadDiary() {
  try {
    const raw = localStorage.getItem(DIARY_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) return parsed;
    return [];
  } catch (e) {
    console.error("loadDiary error", e);
    return [];
  }
}

function saveDiary(diary) {
  try {
    localStorage.setItem(DIARY_KEY, JSON.stringify(diary));
  } catch (e) {
    console.error("saveDiary error", e);
  }
}

function addDiaryEntry(mode, topic, question, hex, lines) {
  const diary = loadDiary();

  const entry = {
    time: new Date().toISOString(),
    mode,
    topic,
    question: (question || "").trim(),
    hexId: hex.id,
    hexName: hex.name,
    trend: hex.trend,
    lines: lines.map((v) => (isYang(v) ? 1 : 0)) // 1=陽 0=陰
  };

  diary.unshift(entry);
  if (diary.length > 50) diary.length = 50;
  saveDiary(diary);
  return diary;
}

function formatTime(iso) {
  const d = new Date(iso);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  const hh = String(d.getHours()).padStart(2, "0");
  const mm = String(d.getMinutes()).padStart(2, "0");
  return `${y}/${m}/${day} ${hh}:${mm}`;
}

function topicLabel(topic) {
  switch (topic) {
    case "love":
      return "感情 / 關係";
    case "career":
      return "工作 / 事業";
    case "wealth":
      return "財運 / 金錢";
    case "health":
      return "健康 / 身心";
    case "social":
      return "人際 / 合作";
    default:
      return "整體狀況";
  }
}

/**
 * diary: 陣列
 * onClickEntry: (entry) => {}  點擊某筆日記時要做的事
 */
function renderDiaryList(diary, onClickEntry) {
  const listEl = document.getElementById("diary-list");
  if (!listEl) return;

  listEl.innerHTML = "";

  if (!diary || diary.length === 0) {
    const empty = document.createElement("div");
    empty.textContent = "目前還沒有占卜紀錄，先卜一卦看看吧。";
    empty.style.fontSize = "0.85rem";
    empty.style.color = "#8a6b7a";
    listEl.appendChild(empty);
    return;
  }

  diary.forEach((entry) => {
    const entryDiv = document.createElement("div");
    entryDiv.className = "diary-entry";

    const topRow = document.createElement("div");
    topRow.className = "diary-entry-top";

    const dateEl = document.createElement("div");
    dateEl.className = "diary-date";
    dateEl.textContent = formatTime(entry.time);

    const tagsEl = document.createElement("div");
    tagsEl.className = "diary-tags";

    const modeTag = document.createElement("span");
    modeTag.className = "tag mode-tag";
    modeTag.textContent =
      entry.mode === "coin" ? "三枚銅錢法" : "快速六爻";
    tagsEl.appendChild(modeTag);

    const topicTag = document.createElement("span");
    topicTag.className = "tag topic-tag";
    topicTag.textContent = topicLabel(entry.topic);
    tagsEl.appendChild(topicTag);

    const hexTag = document.createElement("span");
    hexTag.className = "tag hex-tag";
    hexTag.textContent = `${entry.hexId}. ${entry.hexName}`;
    tagsEl.appendChild(hexTag);

    topRow.appendChild(dateEl);
    topRow.appendChild(tagsEl);

    const qEl = document.createElement("div");
    qEl.className = "diary-question";
    const qLabel = document.createElement("span");
    qLabel.className = "diary-label";
    qLabel.textContent = "Q：";
    const qText = document.createElement("span");
    qText.textContent =
      entry.question || "當時沒有輸入文字，但你有在心裡默念問題。";
    qEl.appendChild(qLabel);
    qEl.appendChild(qText);

    const sumEl = document.createElement("div");
    sumEl.className = "diary-summary";
    const sLabel = document.createElement("span");
    sLabel.className = "diary-label";
    sLabel.textContent = "備註：";
    const sText = document.createElement("span");
    sText.textContent = `整體走向：${entry.trend}（點這筆可在上方重新查看第 ${entry.hexId} 卦的詳解）`;
    sumEl.appendChild(sLabel);
    sumEl.appendChild(sText);

    entryDiv.appendChild(topRow);
    entryDiv.appendChild(qEl);
    entryDiv.appendChild(sumEl);

    // ✅ 讓日記可以點擊回放卦象
    if (typeof onClickEntry === "function") {
      entryDiv.style.cursor = "pointer";
      entryDiv.addEventListener("click", function () {
        onClickEntry(entry);
      });
    }

    listEl.appendChild(entryDiv);
  });
}

/* =============== 銅錢動畫（卜卦時顯示） =============== */

var coinAnimEl = null;

function initCoinAnimation() {
  var style = document.createElement("style");
  style.textContent =
    "#coin-anim{position:fixed;left:0;right:0;top:0;bottom:0;display:none;align-items:center;justify-content:center;background:rgba(0,0,0,0.35);z-index:9999;}" +
    "#coin-anim-inner{background:#fff7e6;border-radius:16px;padding:16px 20px;box-shadow:0 4px 12px rgba(0,0,0,0.25);text-align:center;max-width:260px;margin:0 auto;font-size:0.9rem;}" +
    ".coin-row{font-size:2rem;margin-bottom:8px;}" +
    ".coin-anim-coin{display:inline-block;animation:coin-bounce 0.6s ease-in-out infinite alternate;}" +
    ".coin-anim-coin:nth-child(2){animation-delay:0.15s;}" +
    ".coin-anim-coin:nth-child(3){animation-delay:0.3s;}" +
    "@keyframes coin-bounce{0%{transform:translateY(0);}100%{transform:translateY(-8px);}}";
  document.head.appendChild(style);

  coinAnimEl = document.createElement("div");
  coinAnimEl.id = "coin-anim";
  coinAnimEl.innerHTML =
    '<div id="coin-anim-inner">' +
    '<div class="coin-row">' +
    '<span class="coin-anim-coin">🪙</span>' +
    '<span class="coin-anim-coin">🪙</span>' +
    '<span class="coin-anim-coin">🪙</span>' +
    "</div>" +
    '<div>村長熊熊正在幫你擲銅錢…</div>' +
    "</div>";
  document.body.appendChild(coinAnimEl);
}

function playCoinAnimation(callback) {
  if (!coinAnimEl) {
    if (callback) callback();
    return;
  }
  coinAnimEl.style.display = "flex";
  setTimeout(function () {
    coinAnimEl.style.display = "none";
    if (callback) callback();
  }, 1300);
}

/* =============== DOM Ready =============== */

document.addEventListener("DOMContentLoaded", function () {
  var castBtn = document.getElementById("cast-btn");
  var questionInput = document.getElementById("user-question");
  var topicSelect = document.getElementById("topic");
  var resultArea = document.getElementById("result-area");
  var questionDisplay = document.getElementById("question-display");
  var bearTextEl = document.getElementById("bear-text");
  var yearSpan = document.getElementById("year");
  var toggleDiaryBtn = document.getElementById("toggle-diary-btn");
  var diaryList = document.getElementById("diary-list");

  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  setupViewToggle();
  initCoinAnimation();

  // ⭐ 點選日記回放卦象
  function handleDiaryClick(entry) {
    var hexIndex = (entry.hexId || 1) - 1;
    var hex = hexagrams[hexIndex] || hexagrams[0];
    var topic = entry.topic || "overall";
    var question = entry.question || "";
    var qTrim = question.trim();

    questionDisplay.textContent = qTrim
      ? "你當時問的是：\n「" + qTrim + "」"
      : "當時沒有輸入文字，但你有在心裡默念問題。";

    var lines = null;
    if (Array.isArray(entry.lines) && entry.lines.length === 6) {
      // 只存了陰陽，所以用 7/8 還原（不再顯示動爻與之卦）
      lines = entry.lines.map(function (v) {
        return v === 1 ? 7 : 8;
      });
      renderLines(lines);
    } else {
      document.getElementById("lines-display").innerHTML =
        "（這筆紀錄沒有保存六爻圖像，但可以參考卦象解說。）";
    }

    renderHexInfo(hex, null); // 回放不計算之卦，避免和當時不同
    renderModern(hex, topic);
    renderClassic(hex);
    bearTextEl.textContent = bearMessage(hex, topic, question);

    resultArea.classList.remove("hidden");
    resultArea.scrollIntoView({ behavior: "smooth" });
  }

  // 初始載入日記
  var initialDiary = loadDiary();
  renderDiaryList(initialDiary, handleDiaryClick);

  if (toggleDiaryBtn && diaryList) {
    toggleDiaryBtn.addEventListener("click", function () {
      if (diaryList.classList.contains("hidden")) {
        diaryList.classList.remove("hidden");
        toggleDiaryBtn.textContent = "隱藏日記";
      } else {
        diaryList.classList.add("hidden");
        toggleDiaryBtn.textContent = "顯示日記";
      }
    });
  }

  // 真正執行卜卦的函式（本卦＋之卦＋寫日記）
  function performDivination(mode, topic, question) {
    var lines = generateSixLines(mode);
    var derived = computeDerivedHex(lines); // 之卦
    var idx = linesToIndex(lines);
    var hex = hexagrams[idx];

    var q = (question || "").trim();
    questionDisplay.textContent = q
      ? "你問的是：\n「" + q + "」"
      : "你沒有寫下具體問題，但沒關係，請把這一卦當成生活給你的提醒。";

    renderLines(lines);
    renderHexInfo(hex, derived);
    renderModern(hex, topic);
    renderClassic(hex);

    bearTextEl.textContent = bearMessage(hex, topic, question);

    // 新增一筆日記
    var diary = addDiaryEntry(mode, topic, question, hex, lines);
    renderDiaryList(diary, handleDiaryClick);

    resultArea.classList.remove("hidden");
    resultArea.scrollIntoView({ behavior: "smooth" });
  }

  if (castBtn) {
    castBtn.addEventListener("click", function () {
      var checked = document.querySelector('input[name="mode"]:checked');
      var mode = checked ? checked.value : "coin";
      var topic = topicSelect ? topicSelect.value || "overall" : "overall";
      var question = questionInput ? questionInput.value || "" : "";

      if (mode === "coin") {
        playCoinAnimation(function () {
          performDivination(mode, topic, question);
        });
      } else {
        performDivination(mode, topic, question);
      }
    });
  }
});