import {Metadata, NextPage} from "next";
import axios from "axios";
import React from "react";
import Link from "next/link";
import {FaHome} from "react-icons/fa";

interface Props {
    searchParams: {
        area: string;
        keyword: string;
    };
}

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
    return {
        title: `Results for ${searchParams.area}`,
    };
}

const Page: NextPage<Props> = async ({searchParams}: Props) => {
    const { area, keyword } = searchParams;
    const baseURL: string = process.env.FRONTEND_PUBLIC_API_BASE_URL || "";
    let data: string = "";
    console.log("area", area)
    console.log("keyword", keyword)
    try {
        const response = await axios.get(`${baseURL}/tabelog/search`, {
            params: {area, keyword},
        });
        data = response.data;
    } catch (error) {
        console.error('Error fetching data', error);
    }
    return (

        <div className="container mx-auto p-4">
            <div className={"my-10 py-10 bg-blue-50"}>
                <h1 className="text-3xl font-bold text-center mb-4">Results for {area}</h1>
                <div className={"flex items-center justify-center"}>
                    <button
                        className={"h-14 flex items-center justify-center px-2 py-1 ml-2 rounded-lg text-xl hover:opacity-70 bg-blue-500 hover:bg-blue-700 text-white font-bold focus:outline-none focus:shadow-outline"}>
                        <FaHome className="size-6" />
                        <Link href={"/"} className={"ml-2 mt-1 text-white hover:text-white"}>HOME</Link>
                    </button>
                </div>
            </div>
            {data ? (
                <div dangerouslySetInnerHTML={{__html: data}}/>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    )
}
export default Page;