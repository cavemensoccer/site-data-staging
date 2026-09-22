window.SOCCER_CONFIG = {
    ROSTER_BASES: {
        'all': "https://docs.google.com/spreadsheets/d/e/2PACX-1vSfTv6z907TRUDwrFXiSfbzKDogyK78EbHgYeRADZWv0-mHkEXelzGXrm-TJ5WeOhR3DM_MeDsFaN1J/pub?output=csv"
    },
    ROSTER_META_GIDS: {
        'all': "1671352040"
    },
    SCHEDULE_BASES: {
        'jv-varsity': "https://docs.google.com/spreadsheets/d/e/2PACX-1vQB6Etw0mOQrr6FqV5XDgMpD1N7I3luQJEn8jSxkovumRM-_0XAJI8Os9AOkV21JP0CzqhBpcs5vqIt/pub?output=csv",
        'fresh-soph': "https://docs.google.com/spreadsheets/d/e/2PACX-1vSzOwaCdx7xhGN8S0OouQi6ctmFRg2goB35Q3Wilb3jPtVCja4rFgDV3XaNHYGpfTOtRNhkcnfAxk-6/pub?output=csv"
    },
    SCHEDULE_META_GIDS: {
        'jv-varsity': "1671352040",
        'fresh-soph': "1805648060"
    },
    DOC_URLS: {
        'coaching-from-sideline': "https://docs.google.com/document/d/e/2PACX-1vS9J3zgTSEneQSSItZZkTwBrixJIePBEs-8I42X8OAU5zLW8flyNYfhUKuRCeSsSQ/pub",
        'pay-team-fees': "https://docs.google.com/document/d/e/2PACX-1vTsSSB8R_Tt94UaCz9XD5PC-kWhU7vmave5GCbEYSiw-6K8n8WIRsDctVA43jPwyA/pub"
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
