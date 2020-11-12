chrome.runtime.onMessage.addListener(function(request, sender) {
  if (request.action == "getSource") {
    // ポップアップにソース表示
    message.innerText = request.source;

    const htmlSource = request.source;
    // txtファイルとしてローカルダウンロード
    // function download(data, type) {
    //   var data = htmlSource;
    //   var file = new Blob([data], {type: type});
    //   var a = document.createElement("a"),
    //       url = URL.createObjectURL(file);
    //   a.href = url;
    //   a.download = "htmlSource.txt";
    //   document.body.appendChild(a);
    //   a.click();
    //   setTimeout(function() {
    //     document.body.removeChild(a);
    //     window.URL.revokeObjectURL(url);
    //   }, 0);
    // }

    // ダミーコピーイベント
    function triggerDummyCopyEvent(){
      document.execCommand("copy");
    }

    // ダミーコピーイベントにクリップボード処理をバインド
    document.addEventListener('copy', function(e){
      // コピーテキストを書き換え
      e.clipboardData.setData('text/plain', htmlSource);
      // 元のイベントが起こるのをキャンセル
      e.preventDefault();
    });

    triggerDummyCopyEvent();

    // W3C HTMLを開く(拡張機能の検証の際はここを消しましょう)
    window.open('https://validator.w3.org/#validate_by_input');

  }
});

function onWindowLoad() {

  var message = document.querySelector('#message');

  chrome.tabs.executeScript(null, {
    file: "getPagesSource.js"
  }
  // エラーメッセージの表示
  // ,function() {
  //   if (chrome.runtime.lastError) {
  //     message.innerText = 'There was an error injecting script :' + chrome.runtime.lastError.message;
  //   }
  // }
  );

}

window.onload = onWindowLoad;