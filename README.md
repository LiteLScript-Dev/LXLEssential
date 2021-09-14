# LXLEssential
 一个优秀的LiteXLoader基础插件，基于Lua编程语言进行构建。

# 目前已实现的功能
- [x] Home（家）
- [x] Warp（地标）
- [x] Menu（菜单）
- [x] TPA（玩家传送）
- [x] Back（回死亡点）
- [x] Give clock（进服给钟）
- [x] Hitokoto（进服欢迎语）
- [ ] Suicide（自杀）
- [ ] Custom configuration（）
# 开始使用LXLEssential
## 安装指导
1. 下载本插件；
2. 将本插件解压到您的BDS插件目录 (``./plugins/``)；
3. 启动BDS。

## 配置指导
插件加载后会在``./plugins/LXLEssential``内生成相关配置文件。以下是配置文件详解：
* setting.json
```json
{
    "home":{
        "enable":true,  \\是否启用Home功能
        "max":5,        \\每个玩家Home的最大数量
        "expend":{
            "enable":true,  \\添加Home是否需要花费
            "money":200     \\花费金额
        }
    },
    "warp":{
        "enable":true,      \\是否启用Warp功能
        "expend":{
            "enable":true,  \\是否需要花费
            "money":200     \\花费金额
        }
    },
    "back":{
        "enable":true,      \\是否启用Back功能
        "expend":{
            "enable":true,  \\Back是否需要花费
            "money":200     \\花费金额
       }
    },
    "tpa":{
        "enable":true,  \\是否启用TPA功能
        "wait_time":30,     \\传送超时时间
        "expend":{
            "enable":true,      \\TPA是否需要花费
            "money":200     \\花费金额
        }
    },
    "give_clock":{
        "enable":true   \\是否启用进服给钟功能
    },
    "hitokoto":{
        "enable":true   \\是否启用进服欢迎语（一言）功能
    }
}
```

* 菜单配置文件``../menu/main.json``
```json
{
    "title": "LXLEssential Menu",    \\菜单标题
    "type": "form",     \\类型，无需改动
    "content": "选择你要进行的骚操作：",    \\菜单副标题
    "buttons": [
        {
         "image": {
          "enable":true,       \\按钮图片是否启用
          "data":"textures/items/netherite_sword"       \\图片目录
            },
            "text": "我的领地",     \\按钮文字
            "command": "myland",    \\按钮指令，如果type为form，请填写下级菜单的文件名（无需写后缀）
            "type": "form"      \\按钮类型，default为执行指令，form为弹出下级菜单
        },
        {
         "image": {
          "enable":true,
          "data":"textures/items/diamond"
            },
            "text": "我的钱包",
            "command": "wallet",
            "type": "default"
        }
    ]
}
```
## 使用方法
玩家在游戏内输入指令即可使用相关功能。
功能|指令
-|-
Home|/home
Warp|/warp
Menu|/m
TPA|/tpa
Back|/back
Give clock|/clock
Hitokoto|无，进服时自动触发
Suicide|/suicide