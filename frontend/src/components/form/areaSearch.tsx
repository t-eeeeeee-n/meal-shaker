"use client"

import {GetLargeArea, GetMiddleArea, GetSmallArea, GetResultFromArea} from "@/app/actions";
import React, {useState} from "react";
import {Area, Genre} from "@/types";
import Button from "@/components/button";
import SelectableField from "@/components/form/selectableField";

type AreaSearchProps = {
    largeServiceAreas: Area[];
    genres: Genre[];
}

const AreaSearch = ({ largeServiceAreas, genres }: AreaSearchProps) => {

    const [largeArea, setLargeArea] = useState<Area[]>([]);
    const [middleArea, setMiddleArea] = useState<Area[]>([]);
    const [smallArea, setSmallArea] = useState<Area[]>([]);
    const [selectedValues, setSelectedValues] = useState({ largeServiceArea: "", largeArea: "", middleArea: "", smallArea: "", genre: "" });
    const [loading, setLoading] = useState(false);

    const handleRegionChange = async (event: { target: { value: any; }; }) => {
        const areaCode = event.target.value;
        setSelectedValues(prev => ({ ...prev, largeServiceArea: areaCode, largeArea: "", middleArea: "", smallArea: "" }));
        setLargeArea([]);
        setMiddleArea([]);
        setSmallArea([]);
        if (areaCode) {
            try {
                const response = await GetLargeArea(areaCode);
                setLargeArea(response);
            } catch (error) {
                console.error('Error fetching large area data:', error);
            }
        }
    };

    const handleLargeAreaChange = async (event: { target: { value: any; }; }) => {
        const areaCode = event.target.value;
        setSelectedValues(prev => ({ ...prev, largeArea: areaCode, middleArea: "", smallArea: "" }));
        setMiddleArea([]);
        setSmallArea([]);
        if (areaCode) {
            try {
                const response = await GetMiddleArea(areaCode);
                setMiddleArea(response);
            } catch (error) {
                console.error('Error fetching middle area data:', error);
            }
        }
    };

    const handleMiddleAreaChange = async (event: { target: { value: any; }; }) => {
        const areaCode = event.target.value;
        setSelectedValues(prev => ({ ...prev, middleArea: areaCode, smallArea: "" }));
        setSmallArea([]);
        if (areaCode) {
            try {
                const response = await GetSmallArea(areaCode);
                setSmallArea(response);

                const test = [...response.map((item: { name: any; }) => item.name)];
                console.log(test)
            } catch (error) {
                console.error('Error fetching small area data:', error);
            }
        }
    };

    const handleSmallAreaChange = (event: { target: { value: any; }; }) => {
        const areaCode = event.target.value;
        setSelectedValues(prev => ({ ...prev, smallArea: areaCode }));
    };

    const handleGenreChange = (event: { target: { value: any; }; }) => {
        const genreCode = event.target.value;
        setSelectedValues(prev => ({ ...prev, genre: genreCode }));
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setLoading(true);

        const formData = new FormData(event.target as HTMLFormElement);
        // ランダムに largeServiceArea を選択
        if (!selectedValues.largeServiceArea) {
            const randomIndex = Math.floor(Math.random() * largeServiceAreas.length);
            const randomLargeServiceArea = largeServiceAreas[randomIndex].code;
            formData.set('largeServiceArea', randomLargeServiceArea);
        }
        // ランダムに genre を選択
        if (!selectedValues.genre) {
            const randomIndex = Math.floor(Math.random() * genres.length);
            const randomGenres = genres[randomIndex].code;
            formData.set('genre', randomGenres);
        }

        await GetResultFromArea(formData);
    };


    return (
        <form onSubmit={handleSubmit}>
            <SelectableField
                label="地方"
                name="largeServiceArea"
                options={largeServiceAreas}
                value={selectedValues.largeServiceArea}
                onChange={handleRegionChange}
            />
            {largeArea.length > 0 && (
                <SelectableField
                    label="都道府県"
                    name="largeArea"
                    options={largeArea}
                    value={selectedValues.largeArea}
                    onChange={handleLargeAreaChange}
                />
            )}
            {middleArea.length > 0 && (
                <SelectableField
                    label="地域"
                    name="middleArea"
                    options={middleArea}
                    value={selectedValues.middleArea}
                    onChange={handleMiddleAreaChange}
                />
            )}
            {smallArea.length > 0 && (
                <SelectableField
                    label="地区"
                    name="smallArea"
                    options={smallArea}
                    value={selectedValues.smallArea}
                    onChange={handleSmallAreaChange}
                />
            )}
            <SelectableField
                label="ジャンル"
                name="genre"
                options={genres}
                value={selectedValues.genre}
                onChange={handleGenreChange}
            />
            <div className={"flex items-center justify-center"}>
                <Button
                    type="submit"
                    loading={loading}
                    text="Search"
                    className="bg-amber-500 hover:bg-amber-700 text-white font-semibold"
                />
            </div>
        </form>
    )
}

export default AreaSearch;