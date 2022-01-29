//LiteXLoader Dev Helper
/// <reference path="c:\Users\Lition\.vscode\extensions\moxicat.lxldevhelper-0.1.8/Library/JS/Api.js" /> 


function update(){
    lxl.listPlugins().forEach(p=>{
        if(p == "LXLEssential.js"){
            lxl.import("lxless:getUpdate")();
        }
    });
    getUpdate("0");
}

setInterval(update, 60*1000*10);

function getNewFile(show=false) {
    network.httpGet('https://liteldev-lxl.coding.net/p/lxlessential/d/LXLEssential/git/raw/main/LXLEssential.js?download=false', (c, d) => {
        if (c == 200) {
            if (file.exists(dir_path + ".noupdate") == false) {
                file.writeTo(update_dir+`LXLEssential(${version}).js`,file.readFrom('./plugins/LXLEssential.js'));
                file.writeTo('./plugins/LXLEssential.js', d);
                mc.runcmd("lxl load ./plugins/LXLEssential.js");
            }else{
                log('您关闭了自动更新，更新检测退出');
            }
        }if(show)
            log('自动更新失败，code：'+c);
    });
}
function getUpdate(v,show = false) {
    network.httpGet('https://liteldev-lxl.coding.net/p/lxlessential/d/LXLEssential/git/raw/main/api.json?download=false', (c, d) => {
        if (c == 200) {
            var dt = JSON.parse(d);
            //lxl.import("lxless:setUpdate")(dt.latest,dt.msg);
            if (dt.latest != v) {
                if(dt.necessary){
                    log(`获取到新版本：${dt.latest}，自动更新中...`);
                    getNewFile(show);
                }else{
                    log("未检测到新版本");
                }
            } else {
                if (show)
                    log("当前即为最新版本。");
            }
        }else{
            if(show)
                log('更新检测失败，code：'+c);
        }
    });
}
