window.onload = function(){
    chrome.storage.local.get(['list_of_saved_pages'], function(list){
        if (Object.keys(list).length == 0){
            console.log('List of pages not set yet.')
            document.getElementById('list_of_saved_pages').innerHTML = "You haven't saved any page yet!"
        }else{
            var list_of_pages = []
            list_of_pages = list['list_of_saved_pages']
            for (i in list_of_pages){
                list_item = document.createElement('li')
                list_item.innerHTML = list_of_pages[i]
                document.getElementById('list_of_saved_pages').appendChild(list_item)
            }
        }
    })
    var clearEverything = document.getElementById('clear_everything')
    clearEverything.addEventListener('click', function(){
        clear_everything()
    })
}

function clear_everything(){
    chrome.storage.local.clear(function(){
        console.log('Cleared!')
        document.getElementById('list_of_saved_pages').innerHTML = 'Cleared everything!'
    })
}