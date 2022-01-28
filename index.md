# LXLEssential

LXLEssential是一个综合性的多功能[LiteXLoader](https://lxl.litebds.com/)插件，为服务器提供多种实用的命令。

## 简介

LXLEssential提供超过数十个有用的命令给几乎所有装载了[LiteXLoader](https://lxl.litebds.com/)的服务器

![](https://img.shields.io/badge/licence-AGPLv3-blue)


# 💾安装

下载方法有三种：
 - [从更新源下载](https://liteldev-lxl.coding.net/p/lxlessential/d/LXLEssential/git/raw/main/LXLEssential.js?download=false)
 - [从Github下载](https://github.com/LiteLDev-LXL/LXLEssential)
 - [从Minebbs下载](https://www.minebbs.com/resources/lxlessential.2836/)

1. 关闭服务器
2. 打开plugins文件夹
3. 放入LXLEssentials核心
4. 启动服务器
5. 安装完成！

# 🔨配置文件

LXLEssential是由多个组件组成的，你一般不需要/想要所有的组件，如果你不知道每个组件是干什么的,那么查看如下配置文件
``` json
{
	"home": {  //家园系统
		"enable": true,  //是否启用
		"cost": {
			"enable": false, //是否花费经济
			"money": 100  //花费的金额
		},
		"max": 15  //最大家的数量
	},
	"tpa": {
		"enable": true,
		"cost": {
			"enable": false,
			"money": 100
		},
		"timeout": 15  //tpa超时时间
	},
	"warp": {
		"enable": true,
		"cost": {
			"enable": false,
			"money": 100
		}
	},
	"back": {
		"enable": true,
		"cost": {
			"enable": false,
			"money": 100
		}
	},
	"tpr": {
		"enable": false,
		"cost": {
			"enable": true,
			"money": 100
		}
	},
	"economy": {
		"enable": true,
		"type": 1,  //经济模式，0为计分板，1为LLMoney
		"rate": 0.1,  //转载汇率，例如0.1为收取10%的手续费，0为全额转账
		"boardname": "money"  //如果是计分板的经济模式，需要填写计分板名称
	},
	"tool": {  //工具模块
		"getpos": {  //获取玩家坐标
			"enable": true, 
			"level": 0  //命令等级，0全体，1管理员
		},
		"kickall": {  //使服务器进入维护模式
			"enable": true
		},
		"suicide": {  //自杀
			"enable": true,
			"cost": {
				"enable": true,
				"money": 100 
			}
		},
		"notice": {  //公告系统
			"enable": true
		},
		"shop": {  //服务器商店
			"sell": {  //回收商店
				"enable": true
			},
			"buy": {  //出售商店
				"enable": true
			}
		}
	},
	"version": "3789",  //配置文件版本，随版本变更
	"lang": "zh_CN"  //语言文件模式，可选zh_CN,en_US
}
```

# 🎯命令

LXLEssential有众多命令，前提是你从配置文件中开启这些功能

 - [tpa](#tpa)
 - [back](#back)
 - [gohome](#home)
 - [sethome](#sethome)
 - [delhome](#delhome)
 - [gowarp](#gowarp)
 - [setwarp](#setwarp)
 - [delwarp](#delwarp)
 - [tpr](#tpr)
 - [pay](#pay)
 - [payoff](#payoff)
 - [balance](#balance)
 - [balancetop](#balancetop)
 - [getpos](#getpos)
 - [suicide](#suicide)
 - [notice](#notice)
 - [setnotice](#setnotice)
 - [sell](#sell)
 - [setsell](#setsell)
 - [price](#price)

## tpa