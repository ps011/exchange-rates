import { Autocomplete, InputAdornment, TextField } from "@mui/material";
import { Currency } from "../lib/constants";
import Image from "next/image";

interface SelectCurrencyProps {
  onChange: (e: Currency) => void;
  currencyList: Currency[];
  currency: Currency;
}

export function SelectCurrency({
  onChange,
  currencyList,
  currency,
}: SelectCurrencyProps) {
  const filterOptions = (
    options: Currency[],
    { inputValue }: { inputValue: string },
  ): Currency[] => {
    return options.filter(
      (o: Currency) =>
        o.name.toLowerCase().includes(inputValue.toLowerCase()) ||
        o.code.toLowerCase().includes(inputValue.toLowerCase()),
    );
  };

  const isOptionEqualToValue = (option: Currency, value: Currency) => {
    return option.code === value.code;
  };

  const renderOption = (props: Object, option: Currency) => (
    <li
      className="mx-2 my-4"
      key={option.code}
      role="listitem"
      data-testid={`option-${option.code}`}
      {...props}
    >
      <span className="flex items-center">
        <Image
          src={option.flag}
          width={35}
          height={35}
          className="mr-3"
          alt="flag"
        />
        <p className="my-0 font-josefin text-left">{option.name}</p>
      </span>
    </li>
  );

  return (
    <Autocomplete
      classes={{ inputRoot: "dark:bg-white" }}
      options={currencyList}
      value={currency}
      renderOption={renderOption}
      getOptionLabel={(option) => option.name}
      isOptionEqualToValue={isOptionEqualToValue}
      filterOptions={filterOptions}
      data-testid="select-currency"
      onChange={(_e, v: Currency) => onChange(v)}
      renderInput={(params) => {
        const { InputProps } = params;
        params.InputProps = {
          ...InputProps,
          startAdornment: (
            <InputAdornment position="start">
              <Image src={currency.flag} width={35} height={35} alt="flag" />
            </InputAdornment>
          ),
        };
        // TODO: Fix the type error
        // @ts-ignore
        return <TextField className="text-black" {...params} />;
      }}
      disableClearable
      disablePortal
    />
  );
}
