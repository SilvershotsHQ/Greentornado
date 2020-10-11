export const SERVER_IPS = {
    ["Europe" /* EUROPE */]: "172.105.251.170",
    ["North America" /* NORTH_AMERICA */]: "198.58.99.71",
    ["Asia" /* ASIA */]: "139.162.111.196",
};
export const SHORT_REGION_NAMES = {
    ["Europe" /* EUROPE */]: "EU",
    ["North America" /* NORTH_AMERICA */]: "NA",
    ["Asia" /* ASIA */]: "AS",
};
export const COLOR_EMOTES = {
    [0]: "crewmate_red:761211569635459092",
    [1]: "crewmate_blue:761211569546985502",
    [2]: "crewmate_green:761211569744904232",
    [3]: "crewmate_pink:761211569379999806",
    [4]: "crewmate_orange:761211569606361127",
    [5]: "crewmate_yellow:761211569950294046",
    [6]: "crewmate_black:761211569597710356",
    [7]: "crewmate_white:761211569950162985",
    [8]: "crewmate_purple:761211569282744332",
    [9]: "crewmate_brown:761211569467818015",
    [10]: "crewmate_cyan:761211569744510976",
    [11]: "crewmate_lime:761211569555636226",
};
export const DEAD_COLOR_EMOTES = {
    [0]: "crewmate_red_dead:761987905370980372",
    [1]: "crewmate_blue_dead:761987905375174676",
    [2]: "crewmate_green_dead:761987905358397470",
    [3]: "crewmate_pink_dead:761987905363116052",
    [4]: "crewmate_orange_dead:761987905392345098",
    [5]: "crewmate_yellow_dead:761987905391951923",
    [6]: "crewmate_black_dead:761987905362984970",
    [7]: "crewmate_white_dead:761987905082097705",
    [8]: "crewmate_purple_dead:761987905244889119",
    [9]: "crewmate_brown_dead:761987905500610628",
    [10]: "crewmate_cyan_dead:761987905459322901",
    [11]: "crewmate_lime_dead:761987905064402985",
};
export const BOT_INVITE_LINK = "https://discord.com/api/oauth2/authorize?client_id=755520374510321745&permissions=21261521&scope=bot";
export const COLOR_EMOTE_IDS = Object.values(COLOR_EMOTES).map(x => x.split(":")[1]);
export const EMOTE_IDS_TO_COLOR = {};
Object.entries(COLOR_EMOTES).forEach(x => (EMOTE_IDS_TO_COLOR[x[1].split(":")[1]] = +x[0]));
export const GROUPING_DISABLED_EMOJI = "<:impostor_grouping_disabled:761985590123954176>";
export const GROUPING_ENABLED_EMOJI = "<:impostor_grouping_enabled:761985589784215565>";
export const GROUPING_TOGGLE_EMOJI = "toggle_impostor_grouping:761987527493943326";
export const LEAVE_EMOJI = "leave_lobby:762751494495666207";