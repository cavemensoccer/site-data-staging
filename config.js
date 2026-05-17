window.SOCCER_CONFIG = {
    ROSTER_BASES: {
        'all': "https://docs.google.com/spreadsheets/d/e/2PACX-1vQHzykcI145UBYrqi8tU7KpV4fngoANkemMUon3uucPygw-feM0V96h--82t0BXVtcUlRB7CtY8PO-X/pub?output=csv"
    },
    ROSTER_META_GIDS: {
        'all': "1671352040"
    },
    SCHEDULE_BASES: {
        'jv-varsity': "https://docs.google.com/spreadsheets/d/e/2PACX-1vTxe3iw-uPzxU4mucH6zAsq3hRjfYXCrBYE9i335ER8-KV7I539cmgO5N4zsXmeCTG8laS1qj3KsCo9/pub?output=csv",
        'fresh-soph': "https://docs.google.com/spreadsheets/d/e/2PACX-1vQXeYrzcVH3btKqa5N08bzaZdWvhdGkQltVex6-Fevz5kZbzoSaCwxpE-1lj_TlMkQ0UKMOKtuC5pQD/pub?output=csv"
    },
    SCHEDULE_META_GIDS: {
        'jv-varsity': "1671352040",
        'fresh-soph': "1805648060"
    },
    DOC_URLS: {
        'coaching-from-sideline': "https://docs.google.com/document/d/e/2PACX-1vRiyHoWWXt_b3FOMsFqLsDXwwexBRkyd-LfgK0VdqlmllPJUPoGuufB2F91bSmS0g/pub",
        'pay-team-fees': "https://docs.google.com/document/d/e/2PACX-1vRQ1zcjbnlY0D5216xnT2kl8CEHGlMQY3_npI0uWVj5CM1GSt1vqxsD0a2Prcq5Hg/pub"
    },
    SLOGANS: [
        "P.R.O.U.D. to be a Caveman!",
        "2024 State Champions!",
        "2025 State Champions!",
        "Back2Back State Champions!",
        "The Energy Bus!"
    ]
};

/**
 * Shared utility to select a random team slogan.
 */
window.getRandomSlogan = function() {
    const slogans = window.SOCCER_CONFIG.SLOGANS;
    return slogans[Math.floor(Math.random() * slogans.length)];
};

/**
 * Shared utility to parse CSV lines correctly, respecting quotes and commas.
 */
window.parseCSVLine = function(line) {
    const result = [];
    let cur = '';
    let inQuotes = false;
    for (let i = 0; i < line.length; i++) {
        const char = line[i];
        if (char === '"') {
            inQuotes = !inQuotes;
        } else if (char === ',' && !inQuotes) {
            result.push(cur.trim());
            cur = '';
        } else {
            cur += char;
        }
    }
    result.push(cur.trim());
    return result;
};
