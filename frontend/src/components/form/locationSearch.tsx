"use client";

import React, {useState} from "react";
import {Genre, Range} from "@/types";
import Button from "@/components/button";
import {GetResultFromLocation} from "@/app/actions";
import SelectableField from "@/components/form/selectableField";

type LocationSearchProps = {
    genres: Genre[];
}

const RangeList: Range[] = [
    {code: "1", name: "300m"},
    {code: "2", name: "500m"},
    {code: "3", name: "1000m"},
    {code: "4", name: "2000m"},
    {code: "5", name: "3000m"},
]

const LocationSearch = ({genres}: LocationSearchProps) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [selectedValues, setSelectedValues] = useState({genre: "", range: ""});

    const handleGenreChange = (event: { target: { value: any; }; }) => {
        const genreCode = event.target.value;
        setSelectedValues(prev => ({ ...prev, genre: genreCode }));
    };

    const handleRangeChange = (event: { target: { value: any } }) => {
        const rangeCode = event.target.value;
        setSelectedValues(prev => ({ ...prev, range: rangeCode }));
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setLoading(true);

        if (navigator.geolocation) {
            try {
                const position = await new Promise<GeolocationPosition>((resolve, reject) => {
                    navigator.geolocation.getCurrentPosition(resolve, reject);
                });

                const { latitude, longitude } = position.coords;

                const formData = new FormData(event.target as HTMLFormElement);

                // ランダムに genre を選択
                // if (!selectedValues.genre) {
                //     const randomIndex = Math.floor(Math.random() * genres.length);
                //     const randomGenre = genres[randomIndex].code;
                //     formData.set('genre', randomGenre);
                // }
                formData.set('latitude', latitude.toString());
                formData.set('longitude', longitude.toString());
                if (selectedValues.range) {
                    formData.set("range", selectedValues.range);
                }

                await GetResultFromLocation(formData);
            } catch (error) {
                console.error('Error getting location:', error);
            }


        } else {
            console.error('Geolocation is not supported by this browser.');
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <SelectableField
                label="ジャンル"
                name="genre"
                options={genres}
                value={selectedValues.genre}
                onChange={handleGenreChange}
            />
            <SelectableField
                label="距離"
                name="range"
                options={RangeList}
                value={selectedValues.range}
                onChange={handleRangeChange}
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
    );
}

export default LocationSearch;