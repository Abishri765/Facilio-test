import { toPlaywrightReport } from "../../utils/Annotations";
import { sendAlertMessage } from "../../utils/bot";
const dataset = JSON.parse(JSON.stringify(require("../tutenlabs/testdata.json")));
export async function verify_pageload(page, dashboard, testname) {

  let card_count = 0;
  let report_count = 0;
  let kpi1_count = 0;
  let kpi2_count = 0;

  try {
    await page.goto(dashboard, {
      waitUntil: "networkidle",
    });

    let widgetlength_01 = await page.locator(`//*[@id="q-app"]/div[1]/div[1]/div[2]/div/div[1]/main/div[1]/div/div[4]/div/div[4]/div[2]/div/div/div[2]/div/div/div`);
    const widgetCount_01 = await widgetlength_01.count();
    console.log(`Number of widgets: ${widgetCount_01}`);

    if (widgetCount_01 === dataset.no_of_widgets) {
      for (let i = 1; i <= widgetCount_01; i++) {
        let widget_01 = await page.locator(`//*[@id="q-app"]/div[1]/div[1]/div[2]/div/div[1]/main/div[1]/div/div[4]/div/div[4]/div[2]/div/div/div[2]/div/div/div[${i}]`);
        let widgetText_01 = await widget_01.innerText();
        console.log(widgetText_01);
        let cardtype = await page.locator(`//*[@id="q-app"]/div[1]/div[1]/div[2]/div/div[1]/main/div[1]/div/div[4]/div/div[4]/div[2]/div/div/div[2]/div/div/div[${i}]/div/div/div[2]/div | //*[@id="q-app"]/div[1]/div[1]/div[2]/div/div[1]/main/div[1]/div/div[4]/div/div[4]/div[2]/div/div/div[2]/div/div/div[${i}]/div/div/div[3]/div/div`);
        let card_name = await cardtype.getAttribute('class');
        if (card_name === "card-wrapper") {
          card_count++;
          console.log(`Number of card_wrapper: ${card_count}`);
        } else if (card_name === "mobile-report") {
          report_count++;
          console.log(`Number of Report card: ${report_count}`);
        } else {
          console.log("There's no attribute in this card");
        }
      }
    } else {
      console.log('no widget list in this dashboard');
    }

    if (card_count === dataset.Kpi_cards) {
      for (let i = 1; i <= card_count; i++) {
        let cardtype = await page.locator(`//*[@id="q-app"]/div[1]/div[1]/div[2]/div/div[1]/main/div[1]/div/div[4]/div/div[4]/div[2]/div/div/div[2]/div/div/div[${i}]/div/div/div[2]/div/div[1]`);
        let card_name = await cardtype.getAttribute('id');
        console.log(`Number of card_name: ${card_name}`)
        switch (card_name) {
          case "kpi_layout1":
            kpi1_count++;
            console.log(`Number of kpi1_card: ${kpi1_count}`);
            break;
          case "kpi_layout2":
            kpi2_count++;
            console.log(`Number of kpi1_card: ${kpi2_count}`);
            break;
          default:
            console.log("There's is no kpi_layout in this dashboard");
        }
      }
    } else {
      console.log('no card wrapper in this list');
    }

    if (kpi1_count === dataset.Kpi1_card_count) {
      for (let i = 1; i <= kpi1_count; i++) {
        let kpi1_header = await page.locator(`(//*[@id="kpi_layout1"]/div/div[@class="f15 bold mB-auto"])[${i}]`);
        const kpi1_headername = await kpi1_header.innerText();
        let kpi1_value = await page.locator(`(//*[@id="kpi_layout1"]/div/div[2]/div[1])[${i}]`);
        const kpi1_card_value = await kpi1_value.innerText();
        let kpi1_site_value = parseInt(kpi1_card_value);
        if (kpi1_site_value >= dataset.Kpi1_card_value) {
          console.log(' Kpi1_Value : pass');
        } else {
          console.log(' Kpi1_Value : fail');
        }
        console.log('Kpi1_Header : ' + kpi1_headername + ', Kpi1_Value : ' + kpi1_site_value);
      }
    } else {
      console.log("There's is no value in kpi1 ");
    }

    if (kpi2_count === dataset.Kpi2_card_count) {
      for (let j = 1; j <= kpi2_count; j++) {
        let kpi2_header = await page.locator(`(//*[@id="kpi_layout2"]/div/div[@class="p20 pB0 f15 bold mB-auto"])[${j}]`);
        const kpi2_headername = await kpi2_header.innerText();
        let kpi2_value = await page.locator(`(//*[@id="kpi_layout2"]/div/div[2]/div[1]/div[1])[${j}]`);
        const textContent = await kpi2_value.innerText();
        const kpi2_site_value = parseInt(textContent);

        if (kpi2_site_value >= dataset.Kpi2_card_value) {
          console.log(' Kpi2_Value : pass');
        } else {
          console.log(' Kpi2_Value : fail');
        }
        let kpi2_percentage = await page.locator(`(//*[@id="kpi2-percentage"])[${j}]`);

        const kpi2_per_value = await kpi2_percentage.textContent();
        const kpi2_card_percent = parseInt(kpi2_per_value);
        if (kpi2_card_percent >= dataset.Kpi2_percentage) {
          console.log(' Kpi2_Percentage : pass');
        } else {
          console.log(' Kpi2_Percentage : fail');
        }
        console.log('Kpi2_Header : ' + kpi2_headername + ', Kpi2_Value : ' + kpi2_site_value + ', Percentage : ' + kpi2_per_value);
      }
    } else {
      console.log("There's is no value in kpi2 ");
    }



  } catch (error) {
    console.log(error);
    console.error(message);
    let message = `${testname} - Widget - widget loaded successfully`;
    await sendAlertMessage(message);
    await toPlaywrightReport(message);
    return -1;
  }














}


