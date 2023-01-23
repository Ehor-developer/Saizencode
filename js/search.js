////サイゼリヤのメニュー番号解読ツール////
//XMLHttpRequestオブジェクトでCSVを読み取るプログラム
var csv_data = function (path) {
    var csv_data_menu = new Array();
    var data = new XMLHttpRequest();

    data.open("GET", path, false);
    data.send(null);

    var LF = String.fromCharCode(10);
    var lines = data.responseText.split(LF);

    for (var i = 0; i < lines.length; ++i) {
        var cells = lines[i].split(",");
        if (cells.length != 1) {
            csv_data_menu.push(cells);
        }
    }
    return csv_data_menu;
};


var CSV_read = function (USER_Menu_Data, src) {
    var dst = new Array();

    for (var i = 0; i < src.length; i++)
        if (src[i][0].indexOf(USER_Menu_Data) !== -1) {
            dst.push(src[i]);
        }
    return dst;
}

//検索時時に実行するプログラム//
//検索時に表示変更//
function search() {
    var csv_data_menu = csv_data("data/database.csv");
    let search_input = document.getElementById('search');
    var USER_Menu_Data = search_input.value
    var data_2_menu = CSV_read(USER_Menu_Data, csv_data_menu);
    const menu_data_user = data_2_menu.toString().split(',');
    if (menu_data_user[0] === "") {
        let box = document.getElementById('menu-box').style.display = "block";
        document.getElementById('search-num').innerHTML = "該当するメニューはありませんでした。" + menu_data_user[0]
        document.getElementById('menu-name').innerHTML = ""
        document.getElementById('money').innerHTML = ""
    }
    else {
        // 配列をHTMLにする
        let box = document.getElementById('menu-box').style.display = "block";
        document.getElementById('search-num').innerHTML = "メニュー番号:" + menu_data_user[0]
        document.getElementById('menu-name').innerHTML = "メニュー名：" + menu_data_user[1]
        document.getElementById('money').innerHTML = "値段：" + menu_data_user[2] + "円"
    }
};
