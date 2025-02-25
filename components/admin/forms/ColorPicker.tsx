"use client";

import { useState, useEffect } from "react";
import { HexColorPicker } from "react-colorful";

interface Props {
    value?: string;
    onPickerChange: (color: string) => void;
}

const ColorPicker = ({ value = "#aabbcc", onPickerChange }: Props) => {
    const [color, setColor] = useState(value);

    useEffect(() => {
        onPickerChange(color);
    }, [color, onPickerChange]);

    return (
        <HexColorPicker
            color={color}
            onChange={(newColor) => setColor(newColor)}
        />
    );
};

export default ColorPicker;
