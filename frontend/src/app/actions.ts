'use server'

import { redirect } from "next/navigation";

export const search = async (formData: FormData) => {
    const area = (formData.get('area') || "").toString();
    const keyword = (formData.get('keyword') || "").toString();
    redirect(`/${encodeURIComponent(area)}/result?area=${encodeURIComponent(area)}&keyword=${encodeURIComponent(keyword)}`);
}