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

  const googleAppsScriptURL = process.env.NEXT_PUBLIC_SCRIPT_URL;

  if (googleAppsScriptURL) {
    try {
      const res = await axios.post(
        googleAppsScriptURL,
        JSON.stringify({ data: records }),
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        }
      );
      return res.data;
    } catch (err) {
      console.log({ err });
      throw new Error("Failed to added record");
    }
  }
}
