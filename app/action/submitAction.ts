import axios from "axios";

export default async function submitAction(formData: FormData) {
  const mobileNos = formData.get("phone-nos");
  const ytUrl = formData.get("yt-url");
  const tId = formData.get("template-id");

  const records = String(mobileNos)
    .split(",")
    .map((no) => ({
      PhoneNumber: no.trim(),
      TemplateId: String(tId).trim(),
      YoutubeLink: String(ytUrl).trim(),
    }));

  console.log("Sending Data:", records);

  const googleAppsScriptURL =
    "https://script.google.com/macros/s/AKfycbzHDFa5QEoDN9n5br6YFF2w4vpy2OujzkHaJk2t-AIYLzJysbwZMbViXmQvO0PVl9U41w/exec";


    // const googleResponse = await fetch(googleAppsScriptURL, {
    //   method: "POST",
    //   headers: { "Content-Type": "application/x-www-form-urlencoded" }, // ✅ Correct Content-Type
    //   body: JSON.stringify({ data: records }), // ✅ Wrap data in an object for better parsing
    // });

    axios.post(googleAppsScriptURL, records,
        { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
    ).then((res) => {
        console.log(res.data)
    }).catch((err) => {
        console.log({err})
    })
}
