import {Autocomplete, TextField} from "@mui/material";
import {Currency} from "../lib/exchange-rates-api";

interface SelectCurrencyProps {
    onChange: (e: Currency) => void;
    currencyList: Currency[];
    currency: Currency;
}

export function SelectCurrency({onChange, currencyList, currency}: SelectCurrencyProps) {
    const filterOptions = (options: Currency[], {inputValue}: { inputValue: string }): Currency[] => {
        return options.filter((o: Currency) => o.label.toLowerCase().includes(inputValue.toLowerCase()) || o.value.toLowerCase().includes(inputValue.toLowerCase()));
    }

    const isOptionEqualToValue = (option: Currency, value: Currency) => {
        return option.value === value.value;
    };

    return (
        <Autocomplete
            classes={{inputRoot: "dark:bg-white"}}
            options={currencyList}
            value={currency}
            isOptionEqualToValue={isOptionEqualToValue}
            filterOptions={filterOptions}
            onChange={(_e, v) => onChange(v as Currency)}
            renderInput={(params) => <TextField className="text-black" {...params}/>}
            disableClearable
        />
    )
}