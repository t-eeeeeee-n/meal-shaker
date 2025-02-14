'use server'

import { redirect } from "next/navigation";
import axios from "axios";

export const SearchTabelog = async (formData: FormData) => {
    const area = (formData.get('area') || "").toString();
    const keyword = (formData.get('keyword') || "").toString();
    redirect(`/result/${encodeURIComponent(area)}/tabelog?area=${encodeURIComponent(area)}&keyword=${encodeURIComponent(keyword)}`);
}

export const GetResultFromArea = async (formData: FormData) => {
    const largeServiceArea = (formData.get('largeServiceArea') || "").toString();
    const largeArea = (formData.get('largeArea') || "").toString();
    const middleArea = (formData.get('middleArea') || "").toString();
    const smallArea = (formData.get('smallArea') || "").toString();
    const genre = (formData.get('genre') || "").toString();
    const searchParams = new URLSearchParams({
        largeServiceArea,
        largeArea,
        middleArea,
        smallArea,
        genre
    });
    redirect(`/result/area?${searchParams.toString()}`);
}

export const GetResultFromLocation = async (formData: FormData) => {
    const latitude: string = (formData.get('latitude') || "").toString();
    const longitude: string = (formData.get('longitude') || "").toString();
    const genre: string = (formData.get('genre') || "").toString();
    const searchParams = new URLSearchParams({
        latitude,
        longitude,
        genre
    });
    redirect(`/result/location?${searchParams.toString()}`);
}

export const GetLargeServiceArea = async () => {
    const baseURL: string = process.env.API_BASE_URL || "";
    try {
        const response = await axios.get(`${baseURL}/hotpepper/large_service_area`, {});
        return response.data;
    } catch (error) {
        console.error('Error fetching data', error);
        throw new Error('Error fetching data');
    }
}

export const GetLargeArea = async (regionCode: string) => {
    const baseURL: string = process.env.API_BASE_URL || "";
    try {
        const response = await axios.get(`${baseURL}/hotpepper/large_area`, {
            params: {region_code: regionCode}
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching data', error);
        throw new Error('Error fetching data');
    }
}


export const GetMiddleArea = async (largeAreaCode: string) => {
    const baseURL: string = process.env.API_BASE_URL || "";
    try {
        const response = await axios.get(`${baseURL}/hotpepper/middle_area`, {
            params: {large_area_code: largeAreaCode}
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching data', error);
        throw new Error('Error fetching data');
    }
}


export const GetSmallArea = async (middleAreaCode: string) => {
    const baseURL: string = process.env.API_BASE_URL || "";
    try {
        const response = await axios.get(`${baseURL}/hotpepper/small_area`, {
            params: {middle_area_code: middleAreaCode}
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching data', error);
        throw new Error('Error fetching data');
    }
}


export const GetGenres = async () => {
    const baseURL: string = process.env.API_BASE_URL || "";
    try {
        const response = await axios.get(`${baseURL}/hotpepper/genre`, {});
        return response.data;
    } catch (error) {
        console.error('Error fetching data', error);
        throw new Error('Error fetching data');
    }
}