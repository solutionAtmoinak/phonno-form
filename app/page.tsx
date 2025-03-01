'use client'

import { useRef } from "react";
import { toast } from "sonner";
import submitAction from "./action/submitAction";


import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

import { Label } from "@/components/ui/label"
import { RefreshCw, Save } from "lucide-react"
import { useFormStatus } from "react-dom"
import Field from "./components/Field";


export default function Home() {

  const formRef = useRef<HTMLFormElement>(null)

  const action = async (formData: FormData) => {
    try {
      const res = await submitAction(formData)
      toast(res)
    } catch (error) {
      console.log({ error })
      toast('Upload Failed')
    } finally {
      formRef.current?.reset()
    }
  }

  return (
    <main className="p-4 md:p-8">
      <form ref={formRef} action={action} className="grid col-span-1 md:grid-cols-2 gap-4 p-6 shadow rounded bg-white dark:bg-slate-900">
        <FormElement />
      </form>
    </main>
  )
}

const FormElement = () => {

  const { pending } = useFormStatus()

  return (
    <>
      <div className="col-span-1 md:col-span-2">
        <Label htmlFor="phone-nos" className="mb-2">Phone Numbers <span className="text-red-500">*</span></Label>
        <Textarea id='phone-nos' name="phone-nos" required placeholder="Eg: Phone No 1, Phone No 2 ...." />
      </div>
      <Field
        id="yt-url" name="yt-url"
        placeholder="Youtube Url"
        label="Link"
        required
        type="url"
      />
      <Field
        id="template-id" name="template-id"
        placeholder="Template Id"
        required
        type="number"
      />
      <div className="col-span-1 md:col-span-2 ml-auto mt-auto">
        <Button type="submit" className="flex gap-x-2">
          {pending ? <RefreshCw className="animate-spin" /> : <Save />}
          {pending ? 'Saving...' : 'Save'}
        </Button>
      </div>
    </>
  )
}
