window.onload = function(){
    console.log('Hey Heeeeey!')
    var changed_pages = {}
    chrome.storage.local.get([window.location.href], function(result) {
        changes_pages = result.key;
    });
    console.log('Restoring you web page...')
    document.getElementsByTagName('html')[0].innerHTML = changed_pages[window.location.href]["html"]
}
