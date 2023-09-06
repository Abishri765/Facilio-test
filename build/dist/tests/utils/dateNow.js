export async function dateNow(){
    const timeApi = "https://worldtimeapi.org/api/timezone/Asia/Kolkata";
    const response = await fetch(timeApi, { method: "GET" });
    const responseData = await response.json();
    const unixtime = responseData.unixtime
    return unixtime;
};
