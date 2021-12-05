//LiteXLoader Dev Helper
/// <reference path="c:\Users\Lition\.vscode\extensions\moxicat.lxldevhelper-0.1.4/Library/JS/Api.js" /> 



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
 *  API:https://cdn.jsdelivr.net/gh/LiteLDev-LXL/LXLEssential/LXLEssential.js
 */

const version = '1.3.8.0';
const lang_version = 1.2;
const dir_path = './plugins/LXLEssential/';
const lang_dir = dir_path+'lang/';
const data_path = dir_path + "data.json";
const config_path = dir_path + "config.json";
const divicedb_path = dir_path+"divice";
const offlineMoney_path = dir_path+'offlineMoney.json';
const xuiddb_path = dir_path+"xuiddb.json";

if (File.exists(dir_path) == false) {
    File.mkdir(dir_path);
}

var db = {home:{},warp:{}};

var cfg = {
    home:{
        enable:true,
        cost:{
            enable:true,
            money:100
        },
        max:5
    },
    tpa:{
        enable:true,
        cost:{
            enable:true,
            money:100
        },
        timeout:15
    },
    warp:{
        enable:true,
        cost:{
            enable:true,
            money:100
        }
    },
    back:{
        enable:true,
        cost:{
            enable:true,
            money:100
        }
    },
    tpr:{
        enable:true,
        cost:{
            enable:true,
            money:100
        }
    },
    economy:{
        enable:true,
        type:0,
        boardname:"money"
    },
    tool:{
        getpos:{
            enable:true,
            level:1
        },
        kickall:{
            enable:true
        }
    },
    version:"2782",
    lang:'zh_CN'
};

if (File.exists(config_path) == false) { 
    File.writeTo(config_path, JSON.stringify(cfg, null, '\t'));
}

if (File.exists(data_path) == false) { 
    File.writeTo(data_path, JSON.stringify(db, null, '\t'));
}

if (File.exists(offlineMoney_path) == false) { 
    File.writeTo(offlineMoney_path, JSON.stringify({}, null, '\t'));
}

if (File.exists(xuiddb_path) == false) { 
    File.writeTo(xuiddb_path, JSON.stringify({}, null, '\t'));
}

const langtype = {
    home: 'HOME',
    tpa:'TPA',
    warp: 'WARP',
    tpr:'TPR',
    back:"BACK",
    economy:'ECONOMY',
    tool:'TOOL'
}

cfg = JSON.parse(file.readFrom(config_path));
db = JSON.parse(file.readFrom(data_path));
var GMoney = JSON.parse(file.readFrom(offlineMoney_path));
var divicedb = new KVDatabase(divicedb_path);
var xuiddb = JSON.parse(file.readFrom(xuiddb_path));

if(cfg.version != '3782'){
    log('[LXLEssential] config.json too old！！');
    throw new Error('配置文件版本过低，请删除config.json重新生成！！')
}

if(file.exists(lang_dir+cfg.lang+'.ini')==false){
    log('[LXLEssential] 无法找到语言文件！！');
    log('[LXLEssential] unable to find the lang pack！！');
    //return;
}

var lang = new IniConfigFile(lang_dir+cfg.lang+'.ini');

if(lang.getFloat('BASIC','version') < lang_version){
    log('[LXLEssential] 语言文件版本过低！！请更新！！');
    log('[LXLEssential] The language file version is too low!!! Please update!!!');
}

function xuid2name(xuid){
    return xuiddb[xuid]==undefined?xuid:xuiddb[xuid];
}

function save_xuiddb(){
    File.writeTo(xuiddb_path, JSON.stringify(xuiddb, null, '\t'));
}

function save_GMoney(){
    File.writeTo(offlineMoney_path, JSON.stringify(GMoney, null, '\t'));
}

function set_GMoney(xuid,m){
    GMoney[xuid] = m;
    save_GMoney();
}

function add_GMoney(xuid,m){
    if(GMoney[xuid]=undefined)
        GMoney[xuid] = 0;
    GMoney[xuid]+=m;
    save_GMoney();
}

function get_GMoney(xuid){
    return GMoney[xuid]==undefined?0:GMoney[xuid];
}

function init(){
    log('[LXLEssential] init!');
    log('[LXLEssential] v'+version);
    log('[LXLEssential] author:lition');
}

function getNewFile(){
    network.httpGet('https://cdn.jsdelivr.net/gh/LiteLDev-LXL/LXLEssential/LXLEssential.js',(c,d)=>{
        if(c==200){
            file.writeTo('./plugins/LXLEssential.js',d);
            //log('[LXLEssential] 自动更新获取完成');
        }
    });
}

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
    switch (cfg.economy.type) {
        case 0:
            pl.reduceScore(cfg.economy.boardname, m);
            break;
        case 1:
            money.reduce(pl.xuid, m);
            break;
    }
}

function add_money(pl,m){
    switch (cfg.economy.type) {
        case 0:
            pl.addScore(cfg.economy.boardname, m);
            break;
        case 1:
            money.add(pl.xuid, m);
            break;
    }
}

function tran_money(pl1,pl2,m){
    switch(cfg.economy.type){
        case 0:
            remove_money(pl1,m);
            add_money(pl2,m);
            break;
        case 1:
            money.trans(pl1.xuid,pl2.xuid,m);
            break;
    }
}

function getLang(type,str,holder={}){
    var rt =lang.getStr(type,str,str);
    for(var i in holder){
        rt = rt.replace(i,holder[i]);
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


function SAVE(){
    File.writeTo(data_path, JSON.stringify(db, null, '\t'));
}

function parsePOS(pos){
    return {x:pos.x,y:pos.y,z:pos.z,did:pos.dimid};
}

function add_home(xuid,name,pos){
    db.home[xuid][name] = pos;
    SAVE();
}

function home_exist(xuid,name){
    return db.home[xuid][name] != undefined;
}

function del_home(xuid,name){
    delete db.home[xuid][name];
    SAVE();
}

function get_homes(xuid){
    return db.home[xuid];
}

function get_home(xuid,name){
    return db.home[xuid][name];
}

function add_warp(name,pos){
    db.warp[name] = pos;
    SAVE();
}

function remove_warp(name){
    delete db.warp[name];
    SAVE();
}

function warp_exits(name){
    return db.warp[name] != undefined;
}

if(cfg.home.enable){
    mc.regPlayerCmd('sethome',getLang(langtype.home,'sethome_command_describe'),(pl,arg)=>{
        pl.sendForm(sethomeF(),sethome);
    });
    mc.regPlayerCmd('delhome',getLang(langtype.home,'delhome_command_describe'),(pl,arg)=>{
        pl.sendForm(delhomeF(pl.xuid),delhome);
    });
    mc.regPlayerCmd('gohome',getLang(langtype.home,'gohome_command_describe'),(pl,arg)=>{
        pl.sendForm(delhomeF(pl.xuid),go_home);
    });
}



function sethome(pl,dt){
    if(dt == null) return;
    if(home_exist(pl.xuid,dt[0])){
        pl.tell(getLang(langtype.home,'home_already_exist'));
        return;
    }
    if(Object.keys(get_homes(pl.xuid)).length == cfg.home.max){
        pl.tell(getLang(langtype.home,'home_message_max'))
        return;
    }
    if(cfg.home.cost.enable){
        if(get_money(pl) < cfg.home.cost.money){
            pl.tell(getLang(langtype.economy,'economy_money_not_enough'));
            return;
        }
        remove_money(pl,cfg.home.cost.money);
    }
    add_home(pl.xuid,dt[0],parsePOS(pl.pos));
    pl.tell(getLang(langtype.home,'home_message_add_success'))
}

function sethomeF(){
    var fm = mc.newCustomForm().setTitle(getLang(langtype.home,'HOME'));
    fm.addInput(getLang(langtype.home,'home_form_input_name'));
    return fm;
}

function delhomeF(xuid){
    var homes = get_homes(xuid);
    var fm = mc.newSimpleForm();
    fm.setContent(getLang(langtype.home,'home_form_chose'))
    for(var k in homes){
        fm.addButton(k);
    }
    return fm;
}

function delhome(pl,dt){
    if(dt==null) return;
    var hname = Object.keys(get_homes(pl.xuid))[dt];
    del_home(pl.xuid,hname);
    pl.tell(getLang(langtype.home,'home_message_del_success'));
}

function go_home(pl,dt){
    if(dt==null) return;
    var hname = Object.keys(get_homes(pl.xuid))[dt];
    var hm = get_home(pl.xuid,hname);
    pl.teleport(hm.x,hm.y,hm.z,hm.did);
    pl.tell(getLang(langtype.home,'home_message_to_home',{"%home%":hname}));
}

if(cfg.warp.enable){
    mc.regPlayerCmd('setwarp',getLang(langtype.warp,'setwarp_command_describe'),(pl,dt)=>{
        pl.sendForm(set_warpF(),set_warp);
    },1);
    mc.regPlayerCmd('delwarp',getLang(langtype.warp,'delwarp_command_describe'),(pl,dt)=>{
        pl.sendForm(del_warpF(),del_warp);
    },1);
    mc.regPlayerCmd('gowarp',getLang(langtype.warp,'gowarp_command_describe'),(pl,dt)=>{
        pl.sendForm(del_warpF(),go_warp);
    });
}

function set_warpF(){
    var fm = mc.newCustomForm();
    fm.addInput(getLang(langtype.warp,'warp_form_input_name'));
    return fm;
}

function del_warpF(){
    var fm = mc.newSimpleForm().setContent(getLang(langtype.warp,'warp_form_chose'));
    Object.keys(db.warp).forEach(s=>fm.addButton(s));
    return fm;
}


function set_warp(pl,dt){
    if(dt==null)return;
    if(warp_exits(dt[0])){
        pl.tell(getLang(langtype.warp,'warpc_message_already_exist'));
        return;
    }
    add_warp(dt[0],parsePOS(pl.pos));
    pl.tell(getLang(langtype.warp,'warp_message_add_success'));
}

function del_warp(pl,dt){
    if(dt==null)return;
    var wpname = Object.keys(db.warp)[dt];
    remove_warp(wpname);
    pl.tell(getLang(langtype.warp,'warp_message_del_success'));
}

function go_warp(pl,dt){
    if(dt==null)return;
    var wpname = Object.keys(db.warp)[dt];
    var w = db.warp[wpname];
    pl.teleport(w.x,w.y,w.z,w.did);
    pl.tell(getLang(langtype.warp,'warp_message_to_warp',{"%warp%":wpname}));
}

mc.listen('onJoin',(pl)=>{
    xuiddb[pl.xuid] = pl.realName;
    save_xuiddb();
    playerList.push(pl.realName);if(db.home[pl.xuid]==undefined) db.home[pl.xuid]={};
    if(divicedb.get(pl.xuid) == null){
        divicedb.set(pl.xuid,{});
    }
    var diviceit = divicedb.get(pl.xuid);
    var dv = pl.getDevice();
    diviceit[system.getTimeStr()] = {type:0,ip:dv.ip,os:dv.os,id : dv.clientId};
    divicedb.set(pl.xuid,diviceit);
});
mc.listen('onLeft',(pl)=>{
    playerList.remove(pl.realName);
    var diviceit = divicedb.get(pl.xuid);
    var dv = pl.getDevice();
    diviceit[system.getTimeStr()] = {type:1,ip:dv.ip,os:dv.os,id : dv.clientId};
    divicedb.set(pl.xuid,diviceit);
    set_GMoney(pl.xuid,get_money(pl));
    save_GMoney();
});

var timeout = {};

function tpaf(){
    var fm = mc.newCustomForm();
    fm.addDropdown(getLang(langtype.tpa,'tpa_form_chose'),playerList);
    fm.addDropdown(getLang(langtype.tpa,'tpa_form_type'),[getLang(langtype.tpa,'tpa_form_type_to'),getLang(langtype.tpa,'tpa_form_type_here')]);
    return fm;
}

function tpa(pl,dt){
    if(dt==null) return;
    if(playerList[dt[0]] == pl.realName){
        pl.tell(getLang(langtype.tpa,'tpa_message_not_tp_self'));
        return;
    }
    askTP(dt[1],mc.getPlayer(playerList[dt[0]]).xuid,pl.realName);
    pl.tell(getLang(langtype.tpa,'tpa_request_send'));
}

var tpal = new Map();

function askTP(mode,targrt_xuid,apply_name){
    if(tpal.has(targrt_xuid)){
        if(tpal.get(targrt_xuid)==false){
            mc.getPlayer(apply_name).tell(getLang(langtype.tpa,'tpa_message_refuse'));
            return;
        }
    }
    for(var i in timeout){
        if(timeout[i] == targrt_xuid){
            mc.getPlayer(apply_name).tell(getLang(langtype.tpa,'tpa_message_watting_other'));
            return;
        }
    }
    timeout[apply_name] =  targrt_xuid;
    setTimeout(()=>{if(timeout[apply_name] != undefined){
        mc.getPlayer(apply_name).tell(getLang(langtype.tpa,'tpa_message_time_out'));
        delete timeout[apply_name];
    }},cfg.tpa.timeout*1000);
    var askt = mode==0?getLang(langtype.tpa,'tpa_message_other_tpa_you',{"%player%":apply_name}):getLang(langtype.tpa,'tpa_message_you_tpa_other',{"%player%":apply_name})
    mc.getPlayer(targrt_xuid).sendModalForm('TPA',askt,getLang(langtype.tpa,'tpa_form_accept'),getLang(langtype.tpa,'tpa_form_refuse'),(pl,dt)=>{
        if(timeout[apply_name] == undefined) return;
        if(timeout[apply_name] != undefined) delete timeout[apply_name];
        var topl = mc.getPlayer(apply_name);
        if(dt){
            topl.tell(getLang(langtype.tpa,'tpa_message_accept'));
            switch(mode){       
                case 1:
                    pl.teleport(topl.pos);                   
                    break;
                case 0:
                    topl.teleport(pl.pos);
                    break;
            }
        }else{
            topl.tell(getLang(langtype.tpa,'tpa_message_refuse'));
        }
    });
}


if(cfg.tpa.enable){
    mc.regPlayerCmd('tpa',getLang(langtype.tpa,'tpa_command_describe'),(pl,rg)=>{
        if(timeout[pl.realName] != undefined){
            pl.tell(getLang(langtype.tpa,'tpa_message_watting_me'));
            return;
        }
        if(cfg.tpa.cost.enable){
            if(get_money(pl) < cfg.tpa.cost.money){
                pl.tell(getLang(langtype.economy,'economy_money_not_enough'));
                return;
            }
        }
        remove_money(pl,cfg.tpa.cost.money);
        pl.sendForm(tpaf(),tpa);
    });
    mc.regPlayerCmd('tpaall',getLang(langtype.tpa,'tpaall_command_describe'),(pl,arg)=>{
        mc.getOnlinePlayers().forEach(p=>{
            if(p.xuid != pl.xuid)
                askTP(1,p.xuid,pl.realName);
        });
        pl.tell(getLang(langtype.tpa,'tpaall_message_senddone'));
    });
    mc.regPlayerCmd('tptoggle',getLang(langtype.tpa,'tptoggle_commad_describe'),(pl,arg)=>{
        if(tpal.has(pl.xuid)){
            if(tpal.get(pl.xuid) == false){
                tpal.set(pl.xuid,true);
                pl.tell(getLang(langtype.tpa,'tptoggle_message_true'))
            }else{
                tpal.set(pl.xuid,false);
                pl.tell(getLang(langtype.tpa,'tptoggle_message_false'));
            }
        }else{
            tpal.set(pl.xuid,false);
            pl.tell(getLang(langtype.tpa,'tptoggle_message_false'));
        }
    });
}


if(cfg.back.enable){
    var back = new Map();
    mc.regPlayerCmd('back',getLang(langtype.back,'back_command_describe'),(pl,arg)=>{
        if(cfg.back.cost.enable){
            if(get_money(pl) < cfg.back.cost.money){
                pl.tell(getLang(langtype.economy,'economy_money_not_enough'));
                return;
            }
            remove_money(pl,cfg.back.cost.money);
        }
        if(back.has(pl.xuid)){
            pl.teleport(back.get(pl.xuid));
            pl.tell(getLang(langtype.back,'back_message_success'));
        }else{
            pl.tell(getLang(langtype.back,'back_message_point_not_found'));
        }
    });
    mc.listen('onPlayerDie',(pl)=>{back.set(pl.xuid,pl.pos)});
}

function randomNum(minNum,maxNum){ 
    switch(arguments.length){ 
        case 1: 
            return parseInt(Math.random()*minNum+1,10); 
        case 2: 
            return parseInt(Math.random()*(maxNum-minNum+1)+minNum,10); 
        default: 
            return 0; 
    } 
} 



if(cfg.tpr.enable){
    mc.regPlayerCmd('tpr',getLang(langtype.tpr,'tpr_command_describe'),(pl=>{
        if(cfg.tpr.cost.enable){
            if(get_money(pl) < cfg.tpr.cost.money){
                pl.tell(getLang(langtype.economy,'economy_money_not_enough'));
                return;
            }
            remove_money(pl,cfg.tpr.cost.money);
        }
        var x = randomNum(pl.pos.x+5000,pl.pos-5000);
        var z = randomNum(pl.pos.z+5000,pl.pos.z-5000);
        var y = [128,100,200][pl.pos.dimid];
        pl.teleport(x,y,z,pl.pos.dimid);
        mc.runcmdEx("effect \""+pl.realName+"\" slow_falling 15 15 true");
        pl.tell(getLang(langtype.tpr,'tpr_message_success'));
    }));
}


function payf(pl){
    var sy = get_money(pl);
    var fm = mc.newCustomForm();
    fm.setTitle(getLang(langtype.economy,'pay_command_describe'));
    fm.addLabel(getLang(langtype.economy,'pay_form_self_money',{"%money%":sy.toString()}));
    fm.addDropdown(getLang(langtype.economy,'pay_form_chose'),playerList);
    fm.addInput(getLang(langtype.economy,'pay_form_input_money'));
    return fm;
}

function payofff(pl){
    var sd = get_money(pl);
    var fm=mc.newCustomForm();
    var gm=[];Object.keys(GMoney).forEach(id=>{gm.push(xuid2name(gm))});
    fm.addDropdown(getLang(langtype.economy,'payoff_form_chose'),gm);
    fm.addInput(getLang(langtype.economy,'payoff_form_input'),getLang(langtype.economy,'pay_form_self_money',{"%money%":sd}));
    return fm;
}

function payoff(pl,dt){
    if(dt==null)return;
    var xuid = Object.keys(GMoney)[dt[0]];
    if(xuid==pl.xuid){
        pl.tell(getLang(langtype.economy,'payoff_message_connot_pay_self'));
        return;
    }
    var um = Number(dt[1]);
    if(isNaN(um) || um<1){
        pl.tell(getLang(langtype.economy,'payoff_message_input_error'));
        return;
    }
    if(um<get_money(pl)){
        pl.tell(getLang(langtype.economy,'economy_money_not_enough'));
        return;
    }
    remove_money(pl,um);
    add_GMoney(xuid,um);
    pl.tell(getLang(langtype.economy,'payoff_message_pay_success',{"%player%":xuid2name(xuid),'&money&':um}));
}

function pay(pl,dt){
    if(dt==null) return;
    var topl = mc.getPlayer(playerList[dt[1]]);
    if(topl.xuid ==pl.xuid){
        pl.tell(getLang(langtype.economy,'pay_message_connot_pay_self'));
        return;
    }
    if(isNaN(Number(dt[2])) == false){
        pl.tell(getLang(langtype.economy,'pay_message_input_error'))
        return;
    }
    if(Number(dt[2]) < 1){
        pl.tell(getLang(langtype.economy,'pay_message_input_error'))
        return;
    }
    if(Number(dt[2]) > get_money(pl)){
        pl.tell(getLang(langtype.economy,'economy_money_not_enough'));
        return;
    }
    tran_money(pl,topl,Number(dt[2]));
    pl.tell(getLang(langtype.economy,'pay_message_pay_success',{'%player%':topl.name,'%money%':Number(dt[2])}));
    topl.tell(getLang(langtype.economy,'pay_message_receive',{'%player%':pl.name,'%money%':Number(dt[2])}));
}

function plush_all_money(){
    mc.getOnlinePlayers().forEach(pl=>{
        set_GMoney(pl.xuid,get_money(pl));
    });
}

function balancetop(pl){
    plush_all_money();
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
        xuids.forEach(xuid=>dt+=getLang(langtype.economy,'balance_message_feedback',{'%player%':xuid2name(xuid),'%money%':get_GMoney(xuid)})+'\n');
        pl.tell(dt);
}

if(cfg.economy.enable){
    mc.regPlayerCmd('pay',getLang(langtype.economy,'pay_command_describe'),(pl,arg)=>{
        pl.sendForm(payf(pl.xuid),pay);
    });
    mc.regPlayerCmd('balance',getLang(langtype.economy,'balance_command_describe'),(pl,arg)=>{
        pl.tell(getLang(langtype.economy,'balance_message_feedback',{'%player%':pl.realName,'%money%':get_money(pl)}));
    });
    mc.regPlayerCmd('balancetop',getLang(langtype.economy,'balancetop_command_describe'),(pl,arg)=>{
        balancetop(pl);
    });
    mc.regPlayerCmd('payoff',getLang(langtype.economy,'payoff_command_describe'),(pl,arg)=>{
        pl.sendForm(payofff(pl),payoff);
    });
}

function getposf(){
    var fm = mc.newSimpleForm();
    playerList.forEach(s=>fm.addButton(s));
    return fm;
}

function getpos(pl,dt){
    if(dt==null)return;
    var tpl = mc.getPlayer(playerList[dt]);
    pl.tell(getLang(langtype.tool,'getpos_message_feedback',{'%player%':tpl.name,'%x%':tpl.pos.x,'%y%':tpl.pos.y,'%z%':tpl.pos.z,"%dim%":tpl.pos.dim}))
}

if(cfg.tool.getpos.enable){
    mc.regPlayerCmd('getpos',getLang(langtype.tool,'gtepos_command_describe'),(pl,arg)=>{
        pl.sendForm(getposf(),getpos);
    },cfg.tool.getpos.level);
}

if(cfg.tool.kickall.enable){
    mc.regPlayerCmd('kickall',getLang(langtype.tool,'kickall_command_discribe'),(pl,arg)=>{
        mc.getOnlinePlayers().forEach(p=>{
            if(p.isOP()==false)
                p.kick(getLang(langtype.tool,'kickall_message_when_kick'));
        })
    },1);
}



init();