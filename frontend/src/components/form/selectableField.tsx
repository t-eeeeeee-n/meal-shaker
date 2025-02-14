"use client";

import React, { useState } from "react";

type SelectableFieldProps = {
    label: string;
    name: string;
    options: { code: string; name: string; }[];
    value: string;
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
};

const SelectableField: React.FC<SelectableFieldProps> = ({ label, name, options, value, onChange }) => {
    const [showField, setShowField] = useState(false);

    const handleToggleField = () => {
        if (showField) {
            // フィールドが非表示になるときに値をデフォルトに戻す
            const event = { target: { value: "" } } as React.ChangeEvent<HTMLSelectElement>;
            onChange(event);
        }
        setShowField(!showField);
    };

    return (
        <div className="mb-4 flex items-center justify-center">
            <label className="block text-gray-700 text-sm font-bold w-16" htmlFor={name}>{label}</label>
            {showField && (
                <select
                    id={name}
                    name={name}
                    className="shadow border rounded w-48 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    onChange={onChange}
                    value={value}
                >
                    <option value=""></option>
                    {options.map((option) => (
                        <option key={option.code} value={option.code}>
                            {option.name}
                        </option>
                    ))}
                </select>
            )}
            <div className="flex justify-center ml-2">
                <button
                    type="button"
                    onClick={handleToggleField}
                    className="shadow border rounded-3xl py-2 px-4 bg-white focus:outline-none focus:shadow-outline"
                >
                    {showField ? <span>-</span> : <span>+</span>}
                </button>
            </div>
        </div>
    );
};

export default SelectableField;