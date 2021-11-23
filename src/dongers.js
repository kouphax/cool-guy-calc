
const GOOD_DONGERS = [
    "( ● ‿ ● )",
    "⊂(▀¯▀⊂)",
    "ᕕ( ՞ ᗜ ՞ )ᕗ",
    "ᕦ( ̿ ﹏ ̿ )ᕤ",
    "s( ^ ‿ ^)-b",
    "(◉◞౪◟◉)",
    "(ง ͠° ل͜ °)ง",
    "(° ͜ʖ°)",
    "(▀̿̿Ĺ̯̿̿▀̿ ̿)",
    "♫ ┌༼ຈل͜ຈ༽┘ ♪",
    "( ‾ʖ̫‾)",
    "( ͡° ͜ʖ ͡°)",
    "( ＾◡＾)",
    "ԅ(ˆ⌣ˆԅ)",
    "(ᵔᴥᵔ)",
    "ಠ‿ಠ",
    "( ◕ ◡ ◕ )",
    "~(╯▽╰)~",
    "~( ＾◡＾)~",
    "┌( ͝° ͜ʖ͡°)ᕤ",
    "ヽ༼ – ل͜ – ༽ﾉ",
    "( ͡ᵔ ͜ʖ ͡ᵔ )",
    "(͡◔ ͜ʖ ͡◔)",
    "(=^-ω-^=)",
    "~(˘◡˘~)",
    "༼ᕗຈل͜ຈ༽ᕗ",
    "(º◡º)っ",
    "╰( ͡’◟◯ ͡’)╯",
    "ヽ(”`▽´)ﾉ",
    "(งಠل͜ಠ)ง",
    "(っಠ‿ಠ)っ",
    "ᕙ(▀̿̿Ĺ̯̿̿▀̿ ̿) ᕗ",
    "(ง ͡ʘ ͜ʖ ͡ʘ)ง",
];

const BAD_DONGERS = [
    "( ͡↑ ͜ʖ ͡↑)",
    "╰[ ⁰﹏⁰ ]╯",
    "ლ(ಥ Д ಥ )ლ",
    "s( ^ ‸ ^)-p",
    "ᕙ(◉෴◉)ᕗ",
    "༼ ºل͟º༽",
    "ʕ ͝°ل͟ ͝°ʔ",
    "(⊙＿⊙’)",
    "(╥﹏╥)",
    "乁( •_• )ㄏ",
    "(∩╹□╹∩)",
    "(•_•)",
    "(‘ºل͟º)",
    "(つ 益 )つ",
    "╭∩╮( ° ͜ʖ͡°)╭∩╮",
    "ಠل͟ಠ",
    "(╯_ʖ╰)",
    "◕_◕",
    "( ͝°_ʖ͡°)",
    "ヽ(`Д´)ﾉ",
    "(۞_۞)",
    "(̿ಠ ̿Ĺ̯̿̿ಠ ̿)̄",
    "(ᓄಠ_ಠ)ᓄ",
    "(ºل͟º)",
    "ノ(;Ĺ̯̿̿ ;ノ)",
];

const ALL_DONGERS = GOOD_DONGERS.concat(BAD_DONGERS)

export function randomDonger() {
    return random(ALL_DONGERS)
}

export function randomGoodDonger() {
    return random(GOOD_DONGERS);
}

export function randomBadDonger() {
    return random(BAD_DONGERS);
}

function random(array) {
    return array[Math.floor(Math.random() * array.length)];
}