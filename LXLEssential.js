//LiteXLoader Dev Helper
/// <reference path="c:\Users\Lition\.vscode\extensions\moxicat.lxldevhelper-0.1.8/Library/JS/Api.js" /> 
/*
 * 
 *
 __        __    __  __        ________                                           __      __            __ 
|  \      |  \  |  \|  \      |        \                                         |  \    |  \          |  \
| $$      | $$  | $$| $$      | $$$$$$$$  _______   _______   ______   _______  _| $$_    \$$  ______  | $$
| $$       \$$\/  $$| $$      | $$__     /       \ /       \ /      \ |       \|   $$ \  |  \ |      \ | $$
| $$        >$$  $$ | $$      | $$  \   |  $$$$$$$|  $$$$$$$|  $$$$$$\| $$$$$$$\\$$$$$$  | $$  \$$$$$$\| $$
| $$       /  $$$$\ | $$      | $$$$$    \$$    \  \$$    \ | $$    $$| $$  | $$ | $$ __ | $$ /      $$| $$
| $$_____ |  $$ \$$\| $$_____ | $$_____  _\$$$$$$\ _\$$$$$$\| $$$$$$$$| $$  | $$ | $$|  \| $$|  $$$$$$$| $$
| $$     \| $$  | $$| $$     \| $$     \|       $$|       $$ \$$     \| $$  | $$  \$$  $$| $$ \$$    $$| $$
 \$$$$$$$$ \$$   \$$ \$$$$$$$$ \$$$$$$$$ \$$$$$$$  \$$$$$$$   \$$$$$$$ \$$   \$$   \$$$$  \$$  \$$$$$$$ \$$                                                        
 * 
 * 
 *  hi, this is LXLEssential
 *  my Github is https://github.com/LiteLDev-LXL/LXLEssential
 *  you can take issuse here or fork the plugin and pull requests
 *  do not change the plugin bacause all the message can change at the lang file
 *  thank you for use my plugin
 *  if you have any problem , find me at https://discord.gg/XRUgWkvp 
 * update:https://raw.githubusercontent.com/LiteLDev-LXL/LXLEssential/main/LXLEssential.js
 */

const version = '1.3.9.6';
const lang_version = 1.5;
const dir_path = './plugins/LXLEssential/';
const lang_dir = dir_path + 'lang/';
const data_path = dir_path + "data.json";
const config_path = dir_path + "config.json";
const offlineMoney_path = dir_path + 'offlineMoney.json';
const xuiddb_path = dir_path + "xuiddb.json";
const error_path = dir_path + "errors/";
const notice_path = dir_path+'notice.json';
const log_path = dir_path + "log.txt";
const update_path = dir_path+'update.json';

function checkDir(path){
    if (File.exists(path) == false) {
        File.mkdir(path);
    }
}
function checkFile(path,thing){
    if (File.exists(path) == false) {
        File.writeTo(path,thing);
    }
}

checkDir(dir_path);
checkDir(error_path);
checkDir(lang_dir);
var db = { home: {}, warp: {} };

var cfg = {
    home: {
        enable: true,
        cost: {
            enable: true,
            money: 100
        },
        max: 5
    },
    tpa: {
        enable: true,
        cost: {
            enable: true,
            money: 100
        },
        timeout: 15
    },
    warp: {
        enable: true,
        cost: {
            enable: true,
            money: 100
        }
    },
    back: {
        enable: true,
        cost: {
            enable: true,
            money: 100
        }
    },
    tpr: {
        enable: true,
        cost: {
            enable: true,
            money: 100
        }
    },
    economy: {
        enable: true,
        type: 0,
        rate: 0.1,
        boardname: "money"
    },
    tool: {
        getpos: {
            enable: true,
            level: 1
        },
        kickall: {
            enable: true
        },
        suicide:{
            enable:true,
            cost: {
                enable: true,
                money: 100
            }
        },
        notice:{
            enable:true
        }
    },
    version: "3786",
    lang: 'zh_CN'
};


checkFile(config_path, JSON.stringify(cfg, null, '\t'))
checkFile(data_path, JSON.stringify(db, null, '\t'))
checkFile(offlineMoney_path,JSON.stringify({}, null, '\t'))
checkFile(xuiddb_path,JSON.stringify({}, null, '\t'))
checkFile(notice_path,JSON.stringify({v:0,page:['这是一篇测试公告'],done:{}}));
checkFile(update_path,JSON.stringify({v:version,done:[],msg:[]}));

const langtype = {
    home: 'HOME',
    tpa: 'TPA',
    warp: 'WARP',
    tpr: 'TPR',
    back: "BACK",
    economy: 'ECONOMY',
    tool: 'TOOL'
}

var GMoney;
var xuiddb;
var notice;
var update;

function init() {
    try{
        var tmpcfg = JSON.parse(file.readFrom(config_path));
        db = JSON.parse(file.readFrom(data_path));
        GMoney = JSON.parse(file.readFrom(offlineMoney_path));
        xuiddb = JSON.parse(file.readFrom(xuiddb_path));
        notice = JSON.parse(file.readFrom(notice_path));
        update = JSON.parse(file.readFrom(update_path));
        if (tmpcfg.version != cfg.version) {
            logFile('config.json too old！！');
            //throw new Error('配置文件版本过低，请删除config.json重新生成！！');
            for (var i in tmpcfg) {
                if (i != "version") {
                    logFile(`自动更新配置文件项：${i}`);
                    switch(typeof tmpcfg[i]){
                        case "string":
                            cfg[i] = tmpcfg[i];
                            log(`update ${i} >> ${tmpcfg[i]}`);
                            break;
                        case "object":
                            for(var it in tmpcfg[i]){
                                switch(typeof tmpcfg[i][it]){
                                    case "object":
                                        for(var item in tmpcfg[i][it]){
                                            log(`update ${item} >> ${tmpcfg[i][it][item]}`);
                                            cfg[i][it][item] = tmpcfg[i][it][item];
                                        }
                                        break;
                                    default:
                                        cfg[i][it] = tmpcfg[i][it];
                                        break;
                                }
                            }
                            break;
                    }
                }
            }
            logFile(`配置文件更新完毕，${tmpcfg.version} >> ${cfg.version}`);
            File.writeTo(config_path, JSON.stringify(cfg, null, '\t'));
        } else {
            cfg = tmpcfg;
        }
        log('init!');
        log('v' + version);
        log('author:lition');
    }catch(err){
        colorLog('red','配置文件初始化失败，使用默认配置');
        getError(err);
        //file.writeTo('error.txt',JSON.stringify({err:{name:err.name,stack:err.stack},cfg:file.readFrom(config_path)},null,'\t'));
    }
}

function setUpdate(v,msg){
    update.msg = msg;
    if(update.v != v){
        update.v = v;
    }
    save_update();
}

function doneUpdate(v){
    update.done.push(v);
    save_update();
}

function save_update(){
    file.writeTo(update_path,JSON.stringify(update));
}

function getError(err){
    colorLog('red',err.stack);
    let now = system.getTimeObj();
    let fi = `${error_path}${now.Y+'-'+now.M+'-'+now.D+'-'+now.h+'-'+now.m}.txt`;
    file.writeTo(fi,JSON.stringify({err:{name:err.name,stack:err.stack},cfg:file.readFrom(config_path).replaceAll('\n','').replaceAll('\t',''),version,time:system.getTimeStr()},null,'\t'));
    colorLog('red','错误信息已输出到'+fi);
    colorLog('red','请加入925057221反馈给开发者');
}


if (file.exists(lang_dir + cfg.lang + '.ini') == false) {
    logFile('无法找到语言文件！！');
    logFile('unable to find the lang pack！！');
    getLangFile();
    //return;
}

var lang = new IniConfigFile(lang_dir + cfg.lang + '.ini');

if (lang_version.toString() != lang.getStr('BASIC', 'version')) {
    logFile('语言文件版本过低！！请更新！！');
    logFile('The language file version is too low!!! Please update!!!');
    getLangFile();
}

function logFile(msg) {
    log(msg);
    file.writeLine(log_path, `[${system.getTimeStr()}] ${msg}`)
}

function xuid2name(xuid) {
    return xuiddb[xuid] == undefined ? xuid : xuiddb[xuid];
}

function name2xuid(n) {
    if (Object.values(xuiddb).indexOf(n) == -1) {
        logFile(`未能找到玩家${n}的xuid数据`);
        return n;
    }
    return Object.keys(xuiddb)[Object.values(xuiddb).indexOf(n)];
}

function save_xuiddb() {
    File.writeTo(xuiddb_path, JSON.stringify(xuiddb, null, '\t'));
}

function save_notice(){
    file.writeTo(notice_path,JSON.stringify(notice,null,'\t'));
}

function save_GMoney() {
    File.writeTo(offlineMoney_path, JSON.stringify(GMoney, null, '\t'));
}

function set_GMoney(xuid, m) {
    GMoney[xuid] = m;
    save_GMoney();
}

function add_GMoney(xuid, m) {
    if (GMoney[xuid] = undefined)
        GMoney[xuid] = 0;
    GMoney[xuid] += m;
    save_GMoney();
}

function get_GMoney(xuid) {
    return GMoney[xuid] == undefined ? 0 : GMoney[xuid];
}

function add_notice_view(xuid,v){
    if(notice.done[v] ==undefined) notice.done[v] = [];
    notice.done[v].push(xuid);
    save_notice();
}

function getLangFile(show=false) {
    network.httpGet(`https://liteldev-lxl.coding.net/p/lxlessential/d/LXLEssential/git/raw/main/lang/${cfg.lang}.ini?download=false`, (c, d) => {
        if (c == 200) {
            file.writeTo('./plugins/LXLEssential/lang/' + cfg.lang + '.ini', d);
            logFile(`lang文件自动下载完成，即将重载插件`);
            mc.runcmd("lxl reload LXLEssential.js");
        }else{
            if(show)
                log('语言包下载失败，code：'+c);
        }
    });
}

function getNewFile(show=false) {
    network.httpGet('https://liteldev-lxl.coding.net/p/lxlessential/d/LXLEssential/git/raw/main/LXLEssential.js?download=false', (c, d) => {
        if (c == 200) {
            if (file.exists(dir_path + ".noupdate") == false) {
                file.writeTo('./plugins/LXLEssential.js', d);
                mc.runcmd("lxl reload LXLEssential.js");
            }else{
                logFile('您关闭了自动更新，更新检测退出');
            }
        }if(show)
            log('自动更新失败，code：'+c);
    });
}
function getUpdate(show = false) {
    network.httpGet('https://liteldev-lxl.coding.net/p/lxlessential/d/LXLEssential/git/raw/main/api.json?download=false', (c, d) => {
        if (c == 200) {
            var dt = JSON.parse(d);
            setUpdate(dt.latest,dt.msg);
            if (dt.latest != version) {
                logFile(`获取到新版本：${dt.latest}，自动更新中...`);
                getNewFile(show);
            } else {
                if (show)
                    logFile("当前即为最新版本。");
            }
        }else{
            if(show)
                log('更新检测失败，code：'+c);
        }
    });
}

getUpdate();
setInterval(getUpdate, 10 * 60 * 1000);

function get_money(pl) {
    switch (cfg.economy.type) {
        case 0:
            return pl.getScore(cfg.economy.boardname);
        case 1:
            return money.get(pl.xuid);
        default:
            return 0;
    }
}

function remove_money(pl, m) {
    if(typeof m != "number")return false;
    logFile(`移除玩家${pl.realName}的经济：${m}`);
    switch (cfg.economy.type) {
        case 0:
            pl.reduceScore(cfg.economy.boardname, m);
            return true;
        case 1:
            money.reduce(pl.xuid, m);
            return true;
    }
}

function add_money(pl, m) {
    if(typeof m != "number")return false;
    logFile(`添加玩家${pl.realName}的经济：${m}`);
    switch (cfg.economy.type) {
        case 0:
            pl.addScore(cfg.economy.boardname, m);
            return true;
        case 1:
            money.add(pl.xuid, m);
            return true;
    }
}

function tran_money(pl1, pl2, m) {
    logFile(`玩家${pl1.realName}转账到玩家${pl2.realName}的经济：${m}`);
    switch (cfg.economy.type) {
        case 0:
            remove_money(pl1, m);
            add_money(pl2, m);
            break;
        case 1:
            money.trans(pl1.xuid, pl2.xuid, m);
            break;
    }
}

function getLang(type, str, holder = {}) {
    var rt = lang.getStr(type, str, str);
    for (var i in holder) {
        rt = rt.replaceAll(i, holder[i]);
    }
    return rt;
}

var playerList = [];

Array.prototype.remove = function (val) {
    var index = this.indexOf(val);
    if (index > -1) {
        this.splice(index, 1);
    }
};


function SAVE() {
    File.writeTo(data_path, JSON.stringify(db, null, '\t'));
}

function parsePOS(pos) {
    return { x: pos.x, y: pos.y, z: pos.z, did: pos.dimid };
}

function add_home(xuid, name, pos) {
    logFile(`${xuid2name(xuid)}添加HOME${name}`);
    db.home[xuid][name] = pos;
    SAVE();
}

function home_exist(xuid, name) {
    return db.home[xuid][name] != undefined;
}

function del_home(xuid, name) {
    logFile(`${xuid2name(xuid)}移除HOME${name}`);
    delete db.home[xuid][name];
    SAVE();
}

function get_homes(xuid) {
    return db.home[xuid];
}

function get_home(xuid, name) {
    return db.home[xuid][name];
}

function add_warp(name, pos) {
    logFile(`添加WARP${name}`);
    db.warp[name] = pos;
    SAVE();
}

function remove_warp(name) {
    delete db.warp[name];
    SAVE();
}

function warp_exits(name) {
    return db.warp[name] != undefined;
}

if (cfg.home.enable) {
    mc.regPlayerCmd('sethome', getLang(langtype.home, 'sethome_command_describe'), (pl, arg) => {
        pl.sendForm(sethomeF(), sethome);
    });
    mc.regPlayerCmd('delhome', getLang(langtype.home, 'delhome_command_describe'), (pl, arg) => {
        pl.sendForm(delhomeF(pl.xuid), delhome);
    });
    mc.regPlayerCmd('gohome', getLang(langtype.home, 'gohome_command_describe'), (pl, arg) => {
        pl.sendForm(delhomeF(pl.xuid), go_home);
    });
}



function sethome(pl, dt) {
    if (dt == null) return;
    if (home_exist(pl.xuid, dt[0])) {
        pl.tell(getLang(langtype.home, 'home_already_exist'));
        return;
    }
    if (Object.keys(get_homes(pl.xuid)).length == cfg.home.max) {
        pl.tell(getLang(langtype.home, 'home_message_max'))
        return;
    }
    if (cfg.home.cost.enable) {
        if (get_money(pl) < cfg.home.cost.money) {
            pl.tell(getLang(langtype.economy, 'economy_money_not_enough'));
            return;
        }
        remove_money(pl, cfg.home.cost.money);
    }
    add_home(pl.xuid, dt[0], parsePOS(pl.pos));
    pl.tell(getLang(langtype.home, 'home_message_add_success'))
}

function sethomeF() {
    var fm = mc.newCustomForm().setTitle(getLang(langtype.home, 'HOME'));
    fm.addInput(getLang(langtype.home, 'home_form_input_name'));
    return fm;
}

function delhomeF(xuid) {
    var homes = get_homes(xuid);
    var fm = mc.newSimpleForm();
    fm.setContent(getLang(langtype.home, 'home_form_chose'))
    for (var k in homes) {
        fm.addButton(k);
    }
    return fm;
}

function delhome(pl, dt) {
    if (dt == null) return;
    try{
        var hname = Object.keys(get_homes(pl.xuid))[dt];
        del_home(pl.xuid, hname);
        pl.tell(getLang(langtype.home, 'home_message_del_success'));
    }catch(err){
        getError(err);
    }

}

function go_home(pl, dt) {
    if (dt == null) return;
    try{
        var hname = Object.keys(get_homes(pl.xuid))[dt];
        var hm = get_home(pl.xuid, hname);
        pl.teleport(hm.x, hm.y, hm.z, hm.did);
        pl.tell(getLang(langtype.home, 'home_message_to_home', { "%home%": hname }));
    }catch(err){
        getError(err);
    }
}

if (cfg.warp.enable) {
    mc.regPlayerCmd('setwarp', getLang(langtype.warp, 'setwarp_command_describe'), (pl, dt) => {
        pl.sendForm(set_warpF(), set_warp);
    }, 1);
    mc.regPlayerCmd('delwarp', getLang(langtype.warp, 'delwarp_command_describe'), (pl, dt) => {
        pl.sendForm(del_warpF(), del_warp);
    }, 1);
    mc.regPlayerCmd('gowarp', getLang(langtype.warp, 'gowarp_command_describe'), (pl, dt) => {
        pl.sendForm(del_warpF(), go_warp);
    });
}

function set_warpF() {
    var fm = mc.newCustomForm();
    fm.addInput(getLang(langtype.warp, 'warp_form_input_name'));
    return fm;
}

function del_warpF() {
    var fm = mc.newSimpleForm().setContent(getLang(langtype.warp, 'warp_form_chose'));
    Object.keys(db.warp).forEach(s => fm.addButton(s));
    return fm;
}


function set_warp(pl, dt) {
    if (dt == null) return;
    if (warp_exits(dt[0])) {
        pl.tell(getLang(langtype.warp, 'warpc_message_already_exist'));
        return;
    }
    add_warp(dt[0], parsePOS(pl.pos));
    pl.tell(getLang(langtype.warp, 'warp_message_add_success'));
}

function del_warp(pl, dt) {
    if (dt == null) return;
    var wpname = Object.keys(db.warp)[dt];
    remove_warp(wpname);
    pl.tell(getLang(langtype.warp, 'warp_message_del_success'));
}

function go_warp(pl, dt) {
    if (dt == null) return;
    var wpname = Object.keys(db.warp)[dt];
    var w = db.warp[wpname];
    pl.teleport(w.x, w.y, w.z, w.did);
    pl.tell(getLang(langtype.warp, 'warp_message_to_warp', { "%warp%": wpname }));
}

mc.listen('onJoin', (pl) => {
    xuiddb[pl.xuid] = pl.realName;
    save_xuiddb();
    playerList.push(pl.realName);
    if (db.home[pl.xuid] == undefined) db.home[pl.xuid] = {};
    if(update.done.indexOf(version)==-1){
        if(pl.isOP()){
            pl.sendForm(mc.newCustomForm().setTitle('LXLEssential - update').addLabel(update.msg.join('\n')),(pl)=>{
                doneUpdate(version);
            });
        }
    }
});
mc.listen('onLeft', (pl) => {
    playerList.remove(pl.realName);
    set_GMoney(pl.xuid, get_money(pl));
    save_GMoney();
});

var timeout = {};

function tpaf() {
    var fm = mc.newCustomForm();
    fm.addDropdown(getLang(langtype.tpa, 'tpa_form_chose'), playerList);
    fm.addDropdown(getLang(langtype.tpa, 'tpa_form_type'), [getLang(langtype.tpa, 'tpa_form_type_to'), getLang(langtype.tpa, 'tpa_form_type_here')]);
    return fm;
}

function tpa(pl, dt) {
    if (dt == null) return;
    if (playerList[dt[0]] == pl.realName) {
        pl.tell(getLang(langtype.tpa, 'tpa_message_not_tp_self'));
        return;
    }
    askTP(dt[1], mc.getPlayer(playerList[dt[0]]).xuid, pl.realName);
    pl.tell(getLang(langtype.tpa, 'tpa_request_send'));
}

var tpal = new Map();

function askTP(mode, targrt_xuid, apply_name) {
    if (tpal.has(targrt_xuid)) {
        if (tpal.get(targrt_xuid) == false) {
            mc.getPlayer(apply_name).tell(getLang(langtype.tpa, 'tpa_message_refuse'));
            return;
        }
    }
    if(Object.values(timeout).indexOf(targrt_xuid)!=-1){
        mc.getPlayer(apply_name).tell(getLang(langtype.tpa, 'tpa_message_watting_other'));
        return;
    }
    timeout[apply_name] = targrt_xuid;
    setTimeout(() => {
        if (timeout[apply_name] != undefined) {
            mc.getPlayer(apply_name).tell(getLang(langtype.tpa, 'tpa_message_time_out'));
            delete timeout[apply_name];
        }
    }, cfg.tpa.timeout * 1000);
    var askt = mode == 0 ? getLang(langtype.tpa, 'tpa_message_other_tpa_you', { "%player%": apply_name }) : getLang(langtype.tpa, 'tpa_message_you_tpa_other', { "%player%": apply_name })
    mc.getPlayer(targrt_xuid).sendModalForm('TPA', askt, getLang(langtype.tpa, 'tpa_form_accept'), getLang(langtype.tpa, 'tpa_form_refuse'), (pl, dt) => {
        if (timeout[apply_name] == undefined) return;
        if (timeout[apply_name] != undefined) delete timeout[apply_name];
        var topl = mc.getPlayer(apply_name);
        if (dt) {
            topl.tell(getLang(langtype.tpa, 'tpa_message_accept'));
            switch (mode) {
                case 1:
                    pl.teleport(topl.pos);
                    break;
                case 0:
                    topl.teleport(pl.pos);
                    break;
            }
        } else {
            topl.tell(getLang(langtype.tpa, 'tpa_message_refuse'));
        }
    });
}


if (cfg.tpa.enable) {
    mc.regPlayerCmd('tpa', getLang(langtype.tpa, 'tpa_command_describe'), (pl, rg) => {
        if (timeout[pl.realName] != undefined) {
            pl.tell(getLang(langtype.tpa, 'tpa_message_watting_me'));
            return;
        }
        if (cfg.tpa.cost.enable) {
            if (get_money(pl) < cfg.tpa.cost.money) {
                pl.tell(getLang(langtype.economy, 'economy_money_not_enough'));
                return;
            }
        }
        remove_money(pl, cfg.tpa.cost.money);
        pl.sendForm(tpaf(), tpa);
    });
    mc.regPlayerCmd('tpaall', getLang(langtype.tpa, 'tpaall_command_describe'), (pl, arg) => {
        mc.getOnlinePlayers().forEach(p => {
            if (p.xuid != pl.xuid)
                askTP(1, p.xuid, pl.realName);
        });
        pl.tell(getLang(langtype.tpa, 'tpaall_message_senddone'));
    });
    mc.regPlayerCmd('tptoggle', getLang(langtype.tpa, 'tptoggle_commad_describe'), (pl, arg) => {
        if (tpal.has(pl.xuid)) {
            if (tpal.get(pl.xuid) == false) {
                tpal.set(pl.xuid, true);
                pl.tell(getLang(langtype.tpa, 'tptoggle_message_true'))
            } else {
                tpal.set(pl.xuid, false);
                pl.tell(getLang(langtype.tpa, 'tptoggle_message_false'));
            }
        } else {
            tpal.set(pl.xuid, false);
            pl.tell(getLang(langtype.tpa, 'tptoggle_message_false'));
        }
    });
}


if (cfg.back.enable) {
    var back = new Map();
    mc.regPlayerCmd('back', getLang(langtype.back, 'back_command_describe'), (pl, arg) => {
        if (cfg.back.cost.enable) {
            if (get_money(pl) < cfg.back.cost.money) {
                pl.tell(getLang(langtype.economy, 'economy_money_not_enough'));
                return;
            }
            remove_money(pl, cfg.back.cost.money);
        }
        if (back.has(pl.xuid)) {
            pl.teleport(back.get(pl.xuid));
            pl.tell(getLang(langtype.back, 'back_message_success'));
        } else {
            pl.tell(getLang(langtype.back, 'back_message_point_not_found'));
        }
    });
    mc.listen('onPlayerDie', (pl) => { back.set(pl.xuid, pl.pos) });
}

function randomNum(minNum, maxNum) {
    switch (arguments.length) {
        case 1:
            return parseInt(Math.random() * minNum + 1, 10);
        case 2:
            return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
        default:
            return 0;
    }
}



if (cfg.tpr.enable) {
    mc.regPlayerCmd('tpr', getLang(langtype.tpr, 'tpr_command_describe'), (pl, arg) => {
        if (cfg.tpr.cost.enable) {
            if (get_money(pl) < cfg.tpr.cost.money) {
                pl.tell(getLang(langtype.economy, 'economy_money_not_enough'));
                return;
            }
            remove_money(pl, cfg.tpr.cost.money);
        }
        var x = randomNum(pl.pos.x + 5000, pl.pos - 5000);
        var z = randomNum(pl.pos.z + 5000, pl.pos.z - 5000);
        var y = [128, 100, 200][pl.pos.dimid];
        pl.teleport(x, y, z, pl.pos.dimid);
        mc.runcmdEx("effect \"" + pl.realName + "\" slow_falling 15 15 true");
        pl.tell(getLang(langtype.tpr, 'tpr_message_success'));
    });
}


function payf(pl) {
    var sy = get_money(pl);
    var fm = mc.newCustomForm();
    fm.setTitle(getLang(langtype.economy, 'pay_command_describe'));
    fm.addLabel(getLang(langtype.economy, 'pay_form_self_money', { "%money%": sy.toString() }));
    fm.addDropdown(getLang(langtype.economy, 'pay_form_chose',{"%rate%":cfg.economy.rate*100+'%%'}), playerList);
    fm.addInput(getLang(langtype.economy, 'pay_form_input_money'));
    fm.addDropdown(getLang(langtype.economy,'pay_form_rate'),[getLang(langtype.economy,'pay_form_rate_me'),getLang(langtype.economy,'pay_form_rate_other')]);
    return fm;
}

function payofff(pl) {
    var sd = get_money(pl);
    var fm = mc.newCustomForm();
    var gm = []
        ; Object.keys(GMoney).forEach(id => { gm.push(xuid2name(id)) });
    fm.addDropdown(getLang(langtype.economy, 'payoff_form_chose'), gm);
    fm.addInput(getLang(langtype.economy, 'payoff_form_input'), getLang(langtype.economy, 'pay_form_self_money', { "%money%": sd }));
    return fm;
}

function payoff(pl, dt) {
    if (dt == null) return;
    var xuid = Object.keys(GMoney)[dt[0]];
    if (xuid == pl.xuid) {
        pl.tell(getLang(langtype.economy, 'payoff_message_connot_pay_self'));
        return;
    }
    var um = Number(dt[1]);
    if (isNaN(um) || um < 1) {
        pl.tell(getLang(langtype.economy, 'payoff_message_input_error'));
        return;
    }
    if (um < get_money(pl)) {
        pl.tell(getLang(langtype.economy, 'economy_money_not_enough'));
        return;
    }
    remove_money(pl, um);
    add_GMoney(xuid, um);
    pl.tell(getLang(langtype.economy, 'payoff_message_pay_success', { "%player%": xuid2name(xuid), '&money&': um }));
}

function pay(pl, dt) {
    if (dt == null) return;
    var topl = mc.getPlayer(playerList[dt[1]]);
    if (topl.xuid == pl.xuid) {
        pl.tell(getLang(langtype.economy, 'pay_message_connot_pay_self'));
        return;
    }
    if (isNaN(Number(dt[2])) || Number(dt[2]) < 1) {
        pl.tell(getLang(langtype.economy, 'pay_message_input_error'))
        return;
    }
    if (Number(dt[2]) > get_money(pl)) {
        pl.tell(getLang(langtype.economy, 'economy_money_not_enough'));
        return;
    }
    let my = Number(dt[2]);
    let rate = Math.floor(my * cfg.economy.rate);
    switch(dt[3]){
        case 0:
            remove_money(pl,rate);
            break;
        case 1:
            my -= rate;
            break;       
    }
    tran_money(pl, topl, my);
    pl.tell(getLang(langtype.economy, 'pay_message_pay_success', { '%player%': topl.name, '%money%': my }));
    topl.tell(getLang(langtype.economy, 'pay_message_receive', { '%player%': pl.name, '%money%': my }));
}

function flush_all_money() {
    mc.getOnlinePlayers().forEach(pl => {
        set_GMoney(pl.xuid, get_money(pl));
    });
}

function balancetop(pl) {
    flush_all_money();
    var dt = '';
    const sort_values = Object.values(GMoney).sort((a, b) => a - b)
    //  console.log(sort_values)
    const sort_dict = {}
    for (let i of sort_values.reverse()) {
        for (let key in GMoney) {
            //  console.log(i,key)
            if (GMoney[key] === i) {
                sort_dict[key] = i;
                delete GMoney[key];
            }
        }
    }
    GMoney = sort_dict;
    var xuids = Object.keys(GMoney);
    xuids.forEach(xuid => dt += getLang(langtype.economy, 'balance_message_feedback', { '%player%': xuid2name(xuid), '%money%': get_GMoney(xuid) }) + '\n');
    pl.sendForm(mc.newSimpleForm().setContent(dt),()=>{});
}

if (cfg.economy.enable) {
    mc.regPlayerCmd('pay', getLang(langtype.economy, 'pay_command_describe'), (pl, arg) => {
        pl.sendForm(payf(pl), pay);
    });
    mc.regPlayerCmd('balance', getLang(langtype.economy, 'balance_command_describe'), (pl, arg) => {
        pl.tell(getLang(langtype.economy, 'balance_message_feedback', { '%player%': pl.realName, '%money%': get_money(pl) }));
    });
    mc.regPlayerCmd('balancetop', getLang(langtype.economy, 'balancetop_command_describe'), (pl, arg) => {
        balancetop(pl);
    });
    mc.regPlayerCmd('payoff', getLang(langtype.economy, 'payoff_command_describe'), (pl, arg) => {
        pl.sendForm(payofff(pl), payoff);
    });
}

function getposf() {
    var fm = mc.newSimpleForm();
    playerList.forEach(s => fm.addButton(s));
    return fm;
}

function getpos(pl, dt) {
    if (dt == null) return;
    var tpl = mc.getPlayer(playerList[dt]);
    pl.tell(getLang(langtype.tool, 'getpos_message_feedback', { '%player%': tpl.name, '%x%': tpl.pos.x, '%y%': tpl.pos.y, '%z%': tpl.pos.z, "%dim%": tpl.pos.dim }))
}

if (cfg.tool.getpos.enable) {
    mc.regPlayerCmd('getpos', getLang(langtype.tool, 'gtepos_command_describe'), (pl, arg) => {
        pl.sendForm(getposf(), getpos);
    }, cfg.tool.getpos.level);
}

if (cfg.tool.kickall.enable) {
    mc.regPlayerCmd('kickall', getLang(langtype.tool, 'kickall_command_discribe'), (pl, arg) => {
        mc.getOnlinePlayers().forEach(p => {
            if (p.isOP() == false)
                p.kick(getLang(langtype.tool, 'kickall_message_when_kick'));
        });
    }, 1);
}

if(cfg.tool.suicide.enable){
    mc.regPlayerCmd('suicide',getLang(langtype.tool,'suicide_command_describe'),(pl,arg)=>{
        if(cfg.tool.suicide.cost.enable){
            if (cfg.tool.suicide.cost.money > get_money(pl)) {
                pl.tell(getLang(langtype.economy, 'economy_money_not_enough'));
                return;
            }
            remove_money(pl,cfg.tool.suicide.cost.money);
        }
        pl.kill();
    });
}

function setNoticeForm(){
    var fm = mc.newCustomForm();
    fm.addDropdown(getLang(langtype.tool,'notice_setform_drop_chose'),[getLang(langtype.tool,'notice_setform_drop_add'),getLang(langtype.tool,'notice_setform_drop_remove')]);
    fm.addDropdown(getLang(langtype.tool,'notice_setform_drop_chose_del'),notice.page);
    fm.addInput(getLang(langtype.tool,'notice_setform_input'));
    return fm;
}

function setNoticeFunc(pl,dt){
    if(dt==null)return;
    switch(dt[0]){
        case 0:
            notice.v+=1;
            notice.page.push(dt[2]);
            save_notice();
            break;
        case 1:
            notice.page.remove(notice.page[dt[1]]);
            notice.v+=1;
            save_notice();
            break;
    }
    pl.tell(getLang(langtype.tool,'notice_message_setdone'));
}

if(cfg.tool.notice.enable){
    mc.regPlayerCmd('setnotice',getLang(langtype.tool,'setnotice_command_describe'),(pl,arg)=>{
        pl.sendForm(setNoticeForm(),setNoticeFunc);
    },1);
    mc.regPlayerCmd('notice',getLang(langtype.tool,'notice_command_describe'),(pl,arg)=>{
        pl.sendForm(mc.newCustomForm().setTitle(getLang(langtype.tool,'notice_form_title')).addLabel(notice.page.join('\n')),(pl2,dt)=>{})
    })
    mc.listen('onJoin',(pl)=>{
        if(notice.done[notice.v]==undefined) notice.done[notice.v]=[];
        if(notice.done[notice.v].indexOf(pl.xuid)==-1){
            pl.sendForm(mc.newCustomForm().setTitle(getLang(langtype.tool,'notice_form_title')).addLabel(notice.page.join('\n')),(pl2,dt)=>{
                add_notice_view(pl2.xuid,notice.v);
            })
        };
    });
}

init();

lxl.export(get_home, "lxless:getHome");
lxl.export(get_homes, "lxless:getHomes");
lxl.export(get_GMoney, "lxless:getOfflineMoney");
lxl.export(xuid2name, "lxless:xuid2name");
lxl.export(name2xuid, "lxless:name2xuid");
lxl.export(() => {
    return db.warp
}, "lxless:getWarps")
lxl.export((nm) => {
    if (nm)
        return db.warp[nm];
    else
        return null;
}, "lxless:getWarp");
lxl.export(() => {
    return playerList;
}, "lxless:getOnlinePlayers");
lxl.export((xuid, num) => {
    var pl = mc.getPlayer(xuid);
    if (pl == null || isNaN(Number(num))) return false;
    add_money(pl, num);
    return true;
}, "lxless:addMoney");
lxl.export((xuid) => {
    return get_money(mc.getPlayer(xuid));
}, "lxless:getMoney");
lxl.export((xuid, num) => {
    var pl = mc.getPlayer(xuid);
    if (pl == null || isNaN(Number(num))) return false;
    remove_money(pl, num);
    return true;
}, "lxless:removeMoney");
lxl.export((xuid, num) => {
    if (isNaN(Number(num))) return false;
    set_GMoney(xuid, num);
    return true;
}, "lxless:setOfflineMoney");


mc.regConsoleCmd("lxless", "LXLEssential", (arg) => {
    if (arg.length == 0) {
        log("命令参数不足");
        return;
    }
    switch (arg[0]) {
        case "xuid2name":
            let re = xuid2name(arg[1]);
            if (re == arg[1]) log("未找到此xuid对应的玩家");
            else log(re);
            break;
        case "name2xuid":
            log(name2xuid(arg[1]));
            break;
        case "update":
            log("正在检测更新...");
            getUpdate(true);
            break;
        case "getoffmoney":
            log(get_GMoney(name2xuid(arg[1])));
            break;
        case "getmoney":
            if(mc.getPlayer(arg[1])==null){
                log(`玩家 ${arg[1]} 不在线`)
            }else{
                log(get_money(mc.getPlayer(arg[1])));
            }
            break;
        case "reload":
            mc.runcmd("lxl reload LXLEssential.js");
            break;
        case "version":
            log(version)
            break;
        default:
            log("未知命令");
            break;
    }
})