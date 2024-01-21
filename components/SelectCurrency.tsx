import {Autocomplete, TextField} from "@mui/material";
import {useMemo} from "react";

interface Currency {
    label: string;
    value: string;
    selected?: boolean;
}

interface SelectCurrencyProps {
    onChange: (e: Currency) => void;
    currencyList: Currency[];
    currency: string;
}

export function SelectCurrency({onChange, currencyList, currency}: SelectCurrencyProps) {
    const selectedValue = useMemo(
        () => currencyList.filter((c) => c.value === currency)[0],
        [currencyList],
    );
    function filterOptions(options: Currency[], {inputValue}: { inputValue: string }): Currency[] {
        return options.filter((o: Currency) => o.label.toLowerCase().includes(inputValue.toLowerCase()) || o.value.toLowerCase().includes(inputValue.toLowerCase()));
    }

    function getOptionLabel(option: Currency) {
        return option.label;
    }

    return (
        <Autocomplete
            classes={{inputRoot: "dark:bg-white"}}
            options={currencyList}
            value={selectedValue}
            getOptionLabel={getOptionLabel}
            filterOptions={filterOptions}
            onChange={(_e, v) => onChange(v)}
            renderInput={(params) => <TextField className="text-black" {...params} label="Currency"/>}
        />
    )
}