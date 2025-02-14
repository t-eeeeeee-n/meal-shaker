import {Metadata, NextPage} from "next";
import axios from "axios";
import React from "react";
import Client from "@/app/result/location/client";
import {Shop} from "@/types";

type PageProps = {
    searchParams: {
        latitude: string;
        longitude: string;
        genre: string;
    };
};

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: `Results for location`,
    };
}

const fetchData = async (params: Record<string, string>) => {
    const baseURL: string = process.env.API_BASE_URL || "";

    try {
        // 複数件取得
        // return await axios.get(`${baseURL}/hotpepper/location/search`, { params: params });
        // 1件取得
        return await axios.get(`${baseURL}/hotpepper/location/search/one`, { params: params });
    } catch (error: any) {
        console.error('Error fetching data', error.message || error);
        throw new Error('Error fetching data');
    }
};


const Page: NextPage<PageProps> = async ({ searchParams }: PageProps) => {

    let shops: Shop[] = [];
    let numberOfResults: number = 0;
    let response;
    try {
        response = await fetchData(searchParams);
    } catch (error) {
        console.error('Error fetching data', error);
        throw new Error('Error fetching data');
    }
    if(response){
        shops = response.data.shop;
        numberOfResults = response.data.results_available;
    }

    return <Client
        shops={shops}
        numberOfResults={numberOfResults}
        searchParams={searchParams}
    />;
};
export default Page;