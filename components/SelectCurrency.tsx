import {Autocomplete, InputAdornment, TextField} from "@mui/material";
import {Currency} from "../constants";

interface SelectCurrencyProps {
    onChange: (e: Currency) => void;
    currencyList: Currency[];
    currency: Currency;
}

export function SelectCurrency({onChange, currencyList, currency}: SelectCurrencyProps) {
    const filterOptions = (options: Currency[], {inputValue}: { inputValue: string }): Currency[] => {
        return options.filter((o: Currency) => (
            o.name.toLowerCase().includes(inputValue.toLowerCase()) ||
            o.code.toLowerCase().includes(inputValue.toLowerCase()))
        );
    }

    const isOptionEqualToValue = (option: Currency, value: Currency) => {
        return option.code === value.code;
    };

    const renderOption = (_props, option: Currency) => (
        <li className="mx-2 my-4" key={option.code} role="listitem">
            <span className="flex items-center">
                <img src={option.flag} className="mr-2" alt="flag"/>
                <p className="my-0 font-josefin">{option.name}</p>
            </span>
        </li>
    )


    return (
        <Autocomplete
            classes={{inputRoot: "dark:bg-white"}}
            options={currencyList}
            value={currency}
            renderOption={renderOption}
            getOptionLabel={(option) => option.name}
            isOptionEqualToValue={isOptionEqualToValue}
            filterOptions={filterOptions}
            onChange={(_e, v: Currency) => onChange(v)}
            renderInput={(params) => {
                const {InputProps} = params;
                params.InputProps = {
                    ...InputProps, startAdornment: (
                        <InputAdornment position="start">
                            <img src={currency.flag} alt="flag"/>
                        </InputAdornment>
                    )
                };
                // TODO: Fix the type error
                // @ts-ignore
                return <TextField className="text-black" {...params} />
            }
            }
            disableClearable
            disablePortal
        />
    )
}