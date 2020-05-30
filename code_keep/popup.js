const setDOMInfo = info => {
    document.getElementById('url').textContent = info.url
    document.getElementById('total').textContent = info.total;
    var saveBtn = document.getElementById('save_to_database');
    var deleteBtn = document.getElementById('delete_from_database');
    var openListBtn = document.getElementById('open_list')
    console.log('The page is already saved: ' + info.already_saved)
    if (info.already_saved == false){
        deleteBtn.style.display = 'none'
    }else{
        deleteBtn.style.display = 'block'
    }
    saveBtn.addEventListener('click', function() {
        save();
        deleteBtn.style.display = 'block'
    });
    deleteBtn.addEventListener('click', function() {
        delete_from_database();
    });
    openListBtn.addEventListener('click', function(){
        openList()
    })
};

window.addEventListener('DOMContentLoaded', () => {
  chrome.tabs.query({
    active: true,
    currentWindow: true
  }, tabs => {
    chrome.tabs.sendMessage(
        tabs[0].id,
        {from: 'popup', subject: 'DOMInfo'},
        setDOMInfo);
  });

});


function save(){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {request: "save"}, function(response) {
        });
    });

}

function delete_from_database(){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {request: "delete"}, function(response) {
        });
      });
}

function openList(){
    var _ = chrome.runtime.openOptionsPage()
    //chrome.tabs.create({ 'url': 'chrome://extensions/?options=' + chrome.runtime.id });
}