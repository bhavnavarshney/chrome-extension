var contextMenuItem = {
    "id":"spendMoney",
    "title":"Add money to the Budget Approver",
    "contexts":["selection"]
};

function isInt(value) {
    return isNaN(value) && parseInt(Number(value))==value && !isNaN(parseInt(value,10));
}

chrome.contextMenus.create(contextMenuItem);
chrome.contextMenus.onClicked.addListener(function(clickedData){
    if (clickedData.menuItemId=="spendMoney" && clickedData.selection) {
        if (isInt(clickedData.selection)){
            chrome.storage.sync.get(['total','limit'], function(budget){
                var newTotal = 0;
                if (budget.total) {
                    newTotal += parseInt(budget.total)
                }
                newTotal += parseInt(clickedData.selection);
                chrome.storage.sync.set({'total':newTotal}, function(){
                    if (newTotal>=budget.limit) {
                        var notifOptions = {
                            type: 'basic',
                            iconUrl:'icon48.png',
                            title: 'Limit reached',
                            message: 'Oops! Looks like you have reached your limit'
                        };
                        chrome.notifications.create('notif',notifOptions)
                    }
                });
            });
        }
    }
});

chrome.storage.onChanged.addListener(function(changes, storageName){
    chrome.browserAction.setBadgeText({"text":changes.total.newValue.toString()})
});
