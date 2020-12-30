$(function(){
    $('#savelimit').click(function(){
        var limit = $('#limit').val()
        if (limit) {
            chrome.storage.sync.set({'limit':limit}, function(){
                close();
            });
        }
    });

    $('#resettotal').click(function(){
        chrome.storage.sync.set({'total':0});
        var notifOptions = {
            type: 'basic',
            iconUrl:'icon48.png',
            title: 'Reset total',
            message: 'Total has been reset to 0'
        };
        chrome.notifications.create('totalReset',notifOptions)
    });

    chrome.storage.sync.get('limit',function(budget){
        $('#limit').val(budget.limit)
    });
});