export async function timestamp(page){
    await page.goto('https://worldtimeapi.org/api/timezone/Asia/Kolkata');
    page.reload();
    const response = await page.waitForResponse((res) => {
        if (res.url().includes("https://worldtimeapi.org/api/timezone/Asia/Kolkata")) {
            return res.url().startsWith("https://worldtimeapi.org/api/timezone/Asia/Kolkata");
        }
    });

    // Parse the response data and check if the username is valid
    const data = await response.json();
    const abbreviation = data.abbreviation;
    const timezone = data.timezone;
    const datetime = new Date(data.datetime);
    const time = datetime.toLocaleTimeString('en-US', { timeZone: timezone });
    const date = datetime.toLocaleDateString('en-IN');
    console.log(`${abbreviation} ${timezone} ${time} ${date}`);
};