--[[
 *
 * LXLEssential
 *
 * Copyright (C) 2021 LXLDev
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 *
]]


dir = './plugins/LXLEssential'
if(file.exists(dir)==false)then 
    file.mkdir(dir)
    file.mkdir(dir..'/data/')
    file.writeTo(dir..'/data/home.json','{}')
    file.writeTo(dir..'/data/warp.json','{}')
    file.mkdir(dir..'/menu')
    local c = [[
{
    "home":{
        "enable":true,
        "max":5,
        "expend":{
            "enable":true,
            "money":200
        }
    },
    "warp":{
        "enable":true,
        "expend":{
            "enable":true,
            "money":200
        }
    },
    "back":{
        "enable":true,
        "expend":{
            "enable":true,
            "money":200
       }
    },
    "tpa":{
        "enable":true,
        "wait_time":30,
        "expend":{
            "enable":true,
            "money":200
        }
    }
}
]]
    file.writeTo(dir..'/setting.json',c)
    local m = [[
{
    "title": "GUI 菜单",
    "type": "form",
    "content": "欢迎使用菜单",
    "buttons": [
        {
         "image": {
          "enable":false,
          "data":"textures/items/apple"
            },
            "text": "基础菜单",
            "command": "ess",
            "type": "form"
        }
    ]
}]]
    file.writeTo(dir.."/menu/main.json",m)
end
local cfg = data.parseJson(file.readFrom(dir..'/setting.json'))
local homes = data.parseJson(file.readFrom(dir..'/data/home.json'))
local warps = data.parseJson(file.readFrom(dir..'/data/warp.json'))
local tpa_tmp = {}
local online = {}
local back_tmp = {}
local menu_temp = {ifuse={},page={}}
--#region 配置文件
--[[
{
    "home":{
        "enable":true,
        "max":5,
        "expend":{
            "enable":true,
            "money":200
        }
    },
    "warp":{
        "enable":true,
        "expend":{
            "enable":true,
            "money":200
        }
    },
    "back":{
        "enable":true,
        "expend":{
            "enable":true,
            "money":200
       }
    },
    "tpa":{
        "enable":true,
        "wait_time":30,
        "expend":{
            "enable":true,
            "money":200
        }
    }
}
]]
--#endregion

--#region 公共方法部分,建议折叠

function get_money(pl)
	if(mode ==0)then
		return pl:getScore("money")
	elseif (mode ==1 ) then
		return money.get(pl.xuid)
	end
end

function add_money(pl,sc)
	if(mode==0)then
		pl:addScore('money',sc)
	elseif (mode ==1) then
		money.add(pl.xuid,sc)
	end
end

function remove_money(pl,sc)
	if(mode==0)then
		pl:setScore("money",pl:getScore("money")-sc)
	elseif (mode ==1) then
		money.reduce(pl.xuid,sc)
	end
end

function value_include(tab,va)
    for k,v in pairs(tab) do
        if v == va then    return true    end
    end
    return false
end
function get_all_home(pln)
    local t = {}
    for k,v in pairs(homes[pln])do
        table.insert(t,k)
    end
    return t
end

function get_all_warp()
    local t = {}
    for k,v in pairs(warps)do
        table.insert(t,k)
    end
    return t
end

function get_all_players()
    local t = {}
    for k,v in pairs(mc.getOnlinePlayers())do
        table.insert(t,v.realName)
    end
    return t
end


function save_home()
    file.writeTo(dir..'/data/home.json',data.toJson(homes))
end
function save_warp()
    file.writeTo(dir..'/data/warp.json',data.toJson(warps))
end
--#endregion

--#region HOME部分
function home_mainf()
    local f = mc.newSimpleForm()
	f:setTitle('家面板')
	f:setContent('chose...')
	f:addButton('添加一个家')
	f:addButton('删除家')
    f:addButton('传送到家')
	return f
end
function home_main(pl,arg)
    if(arg~=mil)then
        if(arg ==0)then
            pl:sendForm(home_addf(),home_add)
        elseif (arg ==1) then
            pl:sendForm(home_delf(pl),home_del)
        elseif (arg ==2) then
            pl:sendForm(home_tpf(pl.realName),home_tp)
        end
    end
end

function home_addf()
    local f = mc.newCustomForm()
	f:setTitle('添加一个家 ')
	f:addInput('给家取个名字')
	return f
end
function home_add(pl,arg)
    if(arg~=nil)then
        if(homes[pl.realName][arg[1]] ~= nil)then
            pl:tell('[HOME] 你已经有一个同名的家了!')
            return
        end
        if(#homes[pl.realName] == cfg.home.max)then
            pl:tell('[HOME] 你的家的数量达到最大值了')
            return
        end
        local t = {}
        t.x = pl.pos.x
        t.y = pl.pos.y
        t.z = pl.pos.z
        t.dimid = pl.pos.dimid
        homes[pl.realName][arg[1]] = t
        save_home()
        pl:tell(arg[1]..' 添加成功')
    end
end
function home_delf(pl)
    local f = mc.newCustomForm()
	f:setTitle('删除一个家 ')
    f:addDropdown('选择要删除的家',get_all_home(pl.realName))
    return f
end
function home_del(pl,arg)
    if(arg ~= nil)then
        if(get_all_home(pl.realName)[arg[1]+1] ~= nil)then
            homes[pl.realName][get_all_home(pl.realName)[arg[1]+1]] = nil
            save_home()
            pl:tell('[HOME] 删除成功')
        end
    end
end
function home_tpf(pln)
    local f = mc.newSimpleForm()
	f:setTitle('家面板')
	f:setContent('chose...')
    for k,v in pairs(get_all_home(pln))do
        f:addButton(v)
    end
    return f
end
function home_tp(pl,arg)
    if(arg ~= nil)then
        local p = homes[pl.realName][get_all_home(pl.realName)[arg+1]]
        pl:teleport(p.x,p.y,p.z,p.dimid)
        pl:tell('[HOME] 传送成功')
    end
end
if(cfg.home.enable)then
    mc.regPlayerCmd('home','home',function (pl,arg)
        if(homes[pl.realName] == nil)then homes[pl.realName] = {} end
        pl:sendForm(home_mainf(),home_main)
    end)
end

--#endregion

--#region WARP部分
function warp_mainf()
    local f = mc.newSimpleForm()
	f:setTitle('地标面板')
	f:setContent('选择...')
	f:addButton('添加地标')
	f:addButton('删除地标')
    f:addButton('传送到地标')
	return f
end

function warp_main(pl,dt)
    if(dt~=nil)then
        if dt==0 then
            if(pl:isOP())then
                pl:sendForm(warp_addf(),warp_add)       
            end
        elseif dt==1 then
            if(pl:isOP())then
                pl:sendForm(warp_delf(),warp_del)       
            end
        elseif dt==2 then
            pl:sendForm(warp_tpf(),warp_tp)
        end
    end
end

function warp_addf()
    local f = mc.newCustomForm()
	f:setTitle('添加一个地标 ')
	f:addInput('给地标取个名字')
	return f
end

function warp_add(pl,arg)
    if(arg~=nil)then
        if(warps[arg[1]] ~= nil)then
            pl:tell('[WARP] 已经有一个同名的地标了!')
            return
        end
        local t = {}
        t.x = pl.pos.x
        t.y = pl.pos.y
        t.z = pl.pos.z
        t.dimid = pl.pos.dimid
        warps[arg[1]] = t
        save_warp()
        pl:tell(arg[1]..' 添加成功')
    end
end

function warp_delf()
    local f = mc.newCustomForm()
	f:setTitle('删除一个地标')
    f:addDropdown('选择要删除的地标',get_all_warp())
    return f
end
function warp_del(pl,arg)
    if(arg ~= nil)then
        if(get_all_warp()[arg[1]+1] ~= nil)then
            warps[get_all_warp[arg[1]+1]] = nil
            save_warp()
            pl:tell('[WARP] 删除成功')
        end
    end
end

function warp_tpf()
    local f = mc.newSimpleForm()
	f:setTitle('地标面板')
	f:setContent('chose...')
    for k,v in pairs(get_all_warp())do
        f:addButton(v)
    end
    return f
end
function warp_tp(pl,arg)
    if(arg ~= nil)then
        local p = warps[get_all_warp()[arg+1]]
        pl:teleport(p.x,p.y,p.z,p.dimid)
        pl:tell('[WARP] 传送成功')
    end
end
if(cfg.warp.enable)then
    mc.regPlayerCmd("warp","warp",function (pl, arg)
        pl:sendForm(warp_mainf(),warp_main)
    end)
end

--#endregion

--#region TPA部分
function tpa_mainf()
    local f = mc.newCustomForm()
	f:setTitle('TPA 面板')
    local o = get_all_players()
    online = o
    f:addDropdown('选择要传送的玩家',o)
    f:addDropdown("选择传送模式",{"传送自己到玩家","传送玩家到自己"})
    return f
end

function tpa_select(pl,arg)
    if(tpa_tmp[pl.realName] ~=nil)then
        --print(tostring(arg))
        local c = tpa_tmp[pl.realName]
        if(tostring(arg) == "false")then
            c.player:tell("[TPA] 你的传送请求被拒绝了")
            tpa_tmp[pl.realName] = nil
            return
        end
        local topl = c.player
        if(c.mode ==0)then
            topl:teleport(pl.pos)
            topl:tell("[TPA] 您的传送请求已被接受")
        else
            pl:teleport(topl.pos)
            topl:tell("[TPA] 您的传送请求已被接受")
        end
        tpa_tmp[pl.realName] = nil
    else
        pl:tell("[TPA] 这个传送请求已经超时了！")
    end
end


function tpa_main(pl,dt)
    if(dt~=nil)then
        local topl = mc.getPlayer(online[dt[1]+1])
        if(topl.realName == pl.realName)then pl:tell("[TPA] 不能传送自己！") return end
        if tpa_tmp[topl.realName]~=nil then
            pl:tell("[TPA] 对方有一个待处理的传送请求，请稍等")
            return
        end
        if(dt[2] == 0)then         
            tpa_tmp[topl.realName] = {player=pl,mode=0}
            pl:tell("[TPA] 传送请求已发送")
            topl:tell("[TPA] 您有一个待处理的传送请求\n玩家"..pl.realName.."想传送到你身边")
            topl:sendModalForm("您有一个待处理的传送请求","玩家"..pl.realName.."想传送到你身边","允许","拒绝",tpa_select)
            setTimeout(function ()
                if(tpa_tmp[topl.realName] ~=nil)then
                    local c = tpa_tmp[topl.realName]
                    c.player:tell("[TPA] 您的传送请求已超时")
                    tpa_tmp[topl.realName] = nil
                end
            end,30000)
        elseif dt[2] ==1 then
            tpa_tmp[topl.realName] = {player=pl,mode=1}
            pl:tell("[TPA] 传送请求已发送")
            topl:tell("您有一个待处理的传送请求\n玩家"..pl.realName.."想让你传送到他身边")
            topl:sendModalForm("您有一个待处理的传送请求","玩家"..pl.realName.."想让你传送到他身边","允许","拒绝",tpa_select)
            setTimeout(function ()
                if(tpa_tmp[topl.realName] ~=nil)then
                    local c = tpa_tmp[topl.realName]
                    c.player:tell("[TPA] 您的传送请求已超时")
                    tpa_tmp[topl.realName] = nil
                end
            end,30000)
        end
    end
end
if(cfg.tpa.enable)then
    mc.regPlayerCmd("tpa","tpa",function (pl,arg)
        pl:sendForm(tpa_mainf(),tpa_main)
    end)
end

--#endregion

--#region BACK部分
mc.listen("onPlayerDie",function (pl)
    back_tmp[pl.realName] = pl.pos
    pl:tell("[BACK] 可以用/back来返回死亡点!")
end)
if(cfg.back.enable)then
    mc.regPlayerCmd("back","back to death point",function (pl,arg)
        if(back_tmp[pl.realName] ~=nil)then
            local d = back_tmp[pl.realName]
            pl:teleport(d.x,d.y,d.z,d.dimid)
            pl:tell("[BACK] 已返回上一死亡点")
        else
            pl:tell("[BACK] 找不到死亡点！")
        end
    end)
end

--#endregion

--#region TPR部分
mc.regPlayerCmd("tpr","random teleport",function (pl,arg)
    local x,z = math.random(math.floor(pl.pos.x)-5000,math.floor(pl.pos.x)+5000),math.random(math.floor(pl.pos.z)-5000,math.floor(pl.pos.z)+5000)
    pl:teleport(x,125,z,pl.pos.dimid)
    mc.runcmdEx("effect \""..pl.realName.."\" slow_falling 15 15 true")
    pl:tell("[TPR] 随机传送成功！")
end)
--#endregion

--#region 菜单部分

function get_menu(page)
    if(file.exists(dir.."/menu/"..page..".json") == false)then
        local errf = mc.newSimpleForm()
        errf:setTitle("配置文件未找到")
        errf:setContent("无法找到文件"..dir.."/menu/"..page..".json")
		return errf
    end
    local fi = data.parseJson(file.readFrom(dir.."/menu/"..page..".json"))
    local f = mc.newSimpleForm()
    f:setTitle(fi.title)
    f:setContent(fi.content)
    for k,v in pairs(fi.buttons)do
        if v.image.enable then
            f:addButton(v.text,v.image.data)
        else
            f:addButton(v.text)
        end
    end
    return f
end
function menu_replace(pl,text)
    return tostring(string.gsub(text,"@s","\""..pl.realName.."\""))
end

function menu_select(pl,arg)
    if(arg~=nil)then
        local fi = data.parseJson(file.readFrom(dir.."/menu/"..menu_temp.page[pl.realName]..".json"))
        local se = fi.buttons[arg+1]
        if se.type == "default" then
            pl:runcmd(se.command)
        elseif se.type=="cmd"  then
            mc.runcmdEx(menu_replace(pl,se.command))
        elseif se.type == "form" then
            menu_temp.page[pl.realName] = se.command
            pl:sendForm(get_menu(menu_temp.page[pl.realName]),menu_select)
        elseif se.type == "opform" then
            if(pl:isOP())then
                menu_temp.page[pl.realName] = se.command
                pl:sendForm(get_menu(menu_temp.page[pl.realName]),menu_select)
            else
                pl:tell("§c[警告]§r 您不是OP，无权打开此菜单！")
            end
        end
    end
end

mc.listen("onUseItemOn",function (pl,it,bl)
    if it.type ~="minecraft:clock" then
        return true
    end
    if menu_temp.ifuse[pl.realName] == nil then
        menu_temp.ifuse[pl.realName] = false
    end
    if menu_temp.ifuse[pl.realName]==false then
        menu_temp.page[pl.realName] = "main"
        pl:sendForm(get_menu("main"),menu_select)
        menu_temp.ifuse[pl.realName] = true
        setTimeout(function ()
            menu_temp.ifuse[pl.realName] = false
        end
    ,500)
    end
    return false
end)

mc.regPlayerCmd("m","menu",function (pl,arg)
    menu_temp.page[pl.realName] = "main"
    pl:sendForm(get_menu("main"),menu_select)
end)
--#endregion

--#region 导出函数
lxl.export(get_all_home,"lxless_get_all_home")
lxl.export(get_all_warp,"lxless_get_all_warp")
--#endregion

log("[LXLEssential] init!")
log("[LXLEssential] version beta 1.3.8")
log("[LXLEssential] github -> https://github.com/LiteLDev-LXL/LXLEssential")
