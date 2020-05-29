window.onload = function(){
    console.log('Heyo')
    chrome.storage.local.get([window.location.href], function(result) {
        if (result[window.location.href] != null){
            console.log('Restoring you web page...')
            document.getElementsByTagName('html')[0].innerHTML = result[window.location.href]
        }
    });
}

chrome.runtime.sendMessage({
    from: 'content',
    subject: 'showPageAction',
  });
  
  chrome.runtime.onMessage.addListener((msg, sender, response) => {

    if ((msg.from === 'popup') && (msg.subject === 'DOMInfo')) {
        var already_saved = false
        if (result[window.location.href] != null){
            already_saved = true
        }
        var pageInfo = {
        url: window.location.href,
        already_saved = already_saved,
        html: document.getElementsByTagName('html')[0].innerHTML,
        total: document.querySelectorAll('*').length
      };

      response(pageInfo);
    }
  });

chrome.runtime.onMessage.addListener(
function(request, sender, sendResponse) {
    if (request.request == "save"){
        var current_page = {}
        current_page[window.location.href] = document.getElementsByTagName('html')[0].innerHTML
        chrome.storage.local.set(current_page, function() {
            console.log('Page got saved!');
        });
        sendResponse({farewell: "saved"});
        window.location.reload()
    }
    else if (request.request == "delete"){
        chrome.storage.local.remove(window.location.href, function() {
            console.log('Page got deleted from database!');
        });
        sendResponse({farewell: "deleted"});
    }
});