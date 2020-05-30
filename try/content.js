window.onload = function(){
    console.log('Heyo')
    chrome.storage.local.get([window.location.href], function(result) {
        if (result[window.location.href] != null){
            console.log('Restoring you web page...')
            document.getElementsByTagName('html')[0].innerHTML = result[window.location.href]
        }
    });
    /****
    chrome.storage.local.get(['list_of_saved_pages'], function(list){
        console.log(list)
    })
    */
}

chrome.runtime.sendMessage({
    from: 'content',
    subject: 'showPageAction',
  });

var already_saved_boolean = false
chrome.runtime.onMessage.addListener((msg, sender, response) => {

    if ((msg.from === 'popup') && (msg.subject === 'DOMInfo')) {
        chrome.storage.local.get(['list_of_saved_pages'], function(list){
            already_saved_boolean = false
            if (Object.keys(list).length == 0){
                console.log('List of pages not set yet.')
            }else{
                var list_of_pages = []
                list_of_pages = list['list_of_saved_pages']
                already_saved_boolean = list_of_pages.includes(window.location.href)
            }
        })
        var pageInfo = {
            url: window.location.href,
            already_saved: already_saved_boolean,
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

        chrome.storage.local.get(['list_of_saved_pages'], function(list){
            if (Object.keys(list).length == 0){
                console.log('List of pages not set yet.')
                var list_of_saved_pages = []
                list_of_saved_pages.push(window.location.href)
                chrome.storage.local.set({'list_of_saved_pages': list_of_saved_pages}, function(){
                    console.log('List of saved pages set with a new entry.')
                    console.log(list_of_saved_pages)
                })
            }else{
                var list_of_pages = []
                list_of_pages = list['list_of_saved_pages']
                if (list_of_pages.includes(window.location.href)){
                    list_of_pages = list_of_pages.filter(e => e !== window.location.href)
                }
                list_of_pages.push(window.location.href)
                chrome.storage.local.set({'list_of_saved_pages': list_of_pages}, function(){
                    console.log('Page added to the list of saved pages')
                    console.log(list_of_pages)
                })
            }
        })
    
        sendResponse({farewell: "saved"});
        window.location.reload()
    }
    else if (request.request == "delete"){
        chrome.storage.local.remove(window.location.href, function() {
            console.log('Page got deleted from database!');
        });
        sendResponse({farewell: "deleted"});

        chrome.storage.local.get(['list_of_saved_pages'], function(list){
            console.log(list)
            console.log(Object.keys(list).length)
            if (Object.keys(list).length == 0){
                console.log('List of pages not set yet.')
            }else{
                var list_of_pages = []
                list_of_pages = list['list_of_saved_pages']
                if (list_of_pages.includes(window.location.href)){
                    list_of_pages = list_of_pages.filter(e => e !== window.location.href)
                    chrome.storage.local.set({'list_of_saved_pages': list_of_pages}, function(){
                        console.log('Page removed the list of saved pages')
                        console.log(list_of_pages)
                    })
                }else{
                    console.log("The site isn't in the list of saved pages yet.")
                }
            }
        })
        window.location.reload()
    }
});