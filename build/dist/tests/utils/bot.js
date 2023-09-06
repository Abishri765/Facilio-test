const os = require("os");

async function sendAlertToWorkspace(workspaceId, alertMessage) {
  try {
    const url = `https://graph.workplace.com/me/messages?recipient={'thread_key':${workspaceId}}&messaging_type=RESPONSE&message={'text':'${alertMessage}'}&access_token=DQVJ1LWZAyekZA1M1duMXB0WE9Jc1dlUGw5T3lMRzBUclJaWmJRcE9sakVqdmk5QmcybDRXb0RxRi10bWtUMTFGTDUyZA0lxUmxQUnltTFBYTDJHVFFNbmJDYVFoU3RMNk9wNnYwSlM3aEJ5ZAWVDeFk5aS13OVVkU2NFLU9BRGtOelhLYzF6VFl4QmNuZAHNvN3N4VnBiRUtHYU5TRU5VNnVWWGZARMGF4VUdEWmlCM0lMa183ckhWUjJoU1d2WlJhNzY5ck9haHBR`;

    const response = await fetch(url, { method: "POST" });
    const responseData = await response.json();

    console.log(responseData);
  } catch (error) {
    console.log("Error occurred during sending message");
    console.log(error);
  }
}

//testing: 5945732545547182
//Production: 5993669367380049

export async function sendAlertMessage(alertMessage, module) {
  const workspaceIds = {
    "default_group": "5993669367380049",
    "workorder": "9351190914951107",
  };
  let workspaceId = module ? workspaceIds[module] : workspaceIds.default_group;

  try {
    if (os.hostname().includes("ip-") && process.env.AWS_EXECUTION_ENV) {
      await sendAlertToWorkspace(workspaceId, alertMessage);
    }
  } catch (error) {
    console.log("Error occured during sending message");
    console.log(error);
  }
}
