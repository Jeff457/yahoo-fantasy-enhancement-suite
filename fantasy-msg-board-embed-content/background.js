const RUN_CMD = "run";

chrome.commands.onCommand.addListener((command) => {
  if (command === RUN_CMD) {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, command);
    });
  }
});
