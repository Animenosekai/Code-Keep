document.getElementById('saveit').onclick = function(){
    console.log('Hey')
    var current_page = {}
    current_page[window.location.href] = document.getElementsByTagName('html')[0].innerHTML
    chrome.storage.local.set(current_page, function() {
        console.log('Page got saved!');
    });
}