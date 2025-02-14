import {Metadata, NextPage} from "next";
import axios from "axios";
import React from "react";
import Client from "@/app/result/[area]/tabelog/client";

type Props = {
    searchParams: {
        area: string;
        keyword: string;
    };
};

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
    return {
        title: `Results for ${searchParams.area}`,
    };
}

const fetchData = async (area: string, keyword: string): Promise<string> => {
    const baseURL: string = process.env.API_BASE_URL || "";
    try {
        const response = await axios.get(`${baseURL}/tabelog/search`, {
            params: { area, keyword },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching data', error);
        throw new Error('Error fetching data');
    }
};


const Page: NextPage<Props> = async ({searchParams}: Props) => {
    const { area, keyword } = searchParams;
    let data: string;
    try {
        data = await fetchData(area, keyword);
    } catch (error) {
        data = 'Error fetching data';
    }

    return (
        <Client area={area} keyword={keyword} data={data} />
    )
}
export default Page;