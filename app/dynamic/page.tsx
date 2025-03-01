'use client'

import { Button } from "@/components/ui/button";
import { ListPlus, Plus, Save, Upload } from "lucide-react";
import { FormEvent, useState } from "react";
import { toast } from "sonner";
import Field from "../components/Field";

export default function Dynamic() {

  const [Records, setRecords] = useState<StudentRecords[]>([])

  function addOne() {
    if (!!Records.length) {
      const last = Records[Records.length - 1]
      if (!!last.IsSaved) {
        setRecords((r) => [...r, { index: Records.length, IsSaved: false, PhoneNumber: "", TemplateId: "", YoutubeLink: "" }])
      } else {
        toast('Please save last record before adding new one !!')
      }
    } else {
      setRecords([{ index: 0, IsSaved: false, PhoneNumber: "", TemplateId: "", YoutubeLink: "" }])
    }
  }

  function addMany(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    const noOfRecord = formData.get('no-of-records')
    if (!!noOfRecord) {
      if (!!Records.length) {
        const last = Records[Records.length - 1]
        if (!!last.IsSaved) {
          const newRecords = new Array(Number(noOfRecord)).fill(0).map((r, i) => ({ index: Records.length + i, IsSaved: false, PhoneNumber: "", TemplateId: "", YoutubeLink: "" }))
          setRecords((r) => [...r, ...newRecords])
        } else {
          toast('Please save last record before adding new one !!')
        }
      } else {
        setRecords(new Array(Number(noOfRecord)).fill(0).map((r, i) => ({ index: i, IsSaved: false, PhoneNumber: "", TemplateId: "", YoutubeLink: "" })))
      }
    }
  }

  function handelSave(e: FormEvent<HTMLFormElement>, index: number) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    const templateId = formData.get(`template-id-${index}`)
    const phoneNo = formData.get(`phone-no-${index}`)
    const ytUrl = formData.get(`yt-link-${index}`)

    if (templateId && phoneNo && ytUrl) {
      setRecords((prev) =>
        prev.map((r, i) =>
          i === index ? { ...r, templateId: String(templateId), phoneNo: String(phoneNo), ytUrl: String(ytUrl), IsSaved: true } : r
        )
      )
    }
  }

  function handelUnSaved(index: number) {
    setRecords((prev) =>
      prev.map((r, i) =>
        i === index ? { ...r, IsSaved: false } : r
      )
    )
  }

  return (
    <main className="p-4 md:p-8 ">
      <div className="flex gap-x-6 flex-wrap p-4 rounded shadow bg-white dark:bg-slate-900 items-end">
        <form className="flex gap-x-2 items-end" onSubmit={addMany}>
          <Field
            id="no-of-records"
            name="no-of-records"
            placeholder="No of rows ..."
            label="Add Rows"
            type="number"
            required={true}
          />
          <Button type="submit" className="cursor-pointer flex gap-x-2">
            <ListPlus />
            Add
          </Button>
        </form>
        <Button onClick={addOne} className="cursor-pointer flex gap-x-2">
          <Plus />Add 1 Row at bottom
        </Button>
        <Button className="cursor-pointer flex gap-x-2 ml-auto">
          <Upload />
          Upload
        </Button>
      </div>
      {!!Records.length &&
        <div className="mt-8 p-4 rounded shadow bg-white dark:bg-slate-900 max-h-[80vh] overflow-y-auto flex flex-col gap-y-3">
          {Records.map((r, i) => (
            <form key={`entry-${i + 1}`} onSubmit={(e) => handelSave(e, i)} className="grid grid-cols-5 gap-x-3 w-full ">
              <Field
                id={`template-id-${i}`} name={`template-id-${i}`}
                placeholder="Template id"
                type="number"
                required
                onChange={() => handelUnSaved(i)}
              />
              <Field
                id={`phone-no-${i}`} name={`phone-no-${i}`}
                placeholder="Phone Number"
                type="number"
                required
                onChange={() => handelUnSaved(i)}
              />
              <Field
                id={`yt-link-${i}`} name={`yt-link-${i}`}
                label="Link"
                placeholder="Youtube Url.."
                type="url"
                required
                onChange={() => handelUnSaved(i)}
                className="col-span-2"
              />
              {!!r.IsSaved ?
                <p className="text-teal-500 mt-auto ml-auto text-lg font-semibold">Saved !!</p> :
                <Button type="submit" className="flex gap-x-2 mt-auto w-fit ml-auto">
                  <Save />
                  Save
                </Button>
              }
            </form>
          ))}
        </div>
      }
    </main>
  );
}


