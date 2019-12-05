function updateCCView(id, data) {
  $("#" + id).html(data);
}

function show(index, top) {
  var ccView = document.createElement("div");
  this.divccView.appendChild(ccView);
  divccView.appendChild(ccView);
  ccView.id = "ccView" + index.toString();
  ccView.style =
    "font-size:20px;background-color:#000000;z-index:3000;position:fixed;top:" +
    top.toString() +
    ";right:0; padding:2px;";
  ccView.style.color = "#FFFFFF";
}

function getLyrics() {
  dataFL = $(".ytp-caption-segment")
    .eq(0)
    .html();
  dataSL = $(".ytp-caption-segment")
    .eq(1)
    .html();
  return [dataFL, dataSL];
}

chrome.runtime.onMessage.addListener(function(message, sendResponse) {
  if (message.action == "createDiv") {
    sendResponse({ content: "content script finish(createDiv)" });
  }
  if (message.action == "UpdateDiv") {
    updateCCView(message.id, message.ccMessage);
    sendResponse({ content: "content script finish(UpdateDiv)" });
  }
  if (message.action == "getLyrics") {
    data = getLyrics();
    sendResponse({
      content: "content script finish(getLyrics)",
      ccMessage: { dataFL: data[0], dataSL: data[1] }
    });
  }
});
console.log(localStorage.getItem("pageList") + "<<<<<<<<<<<<<<PAGELIST");
var pageList = localStorage.getItem("pageList");
if (pageList != null) {
  chrome.tabs.query(
    {
      active: true,
      currentWindow: true
    },
    function(tabs) {
      pageList.push(tabs[0].id);
      console.log(
        localStorage.getItem("pageList") + "<<<<<<<<<<<<<<PAGELIST after add"
      );
    }
  );
}

var divccView = document.createElement("div");
document.body.appendChild(divccView);
divccView.id = "ccView";
divccView.align = "right";
show(0, 0);
show(1, 20);
