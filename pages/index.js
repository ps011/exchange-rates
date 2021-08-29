import s from './index.module.scss';
import { InputGroup, DropdownButton, Dropdown, FormControl, Button } from 'react-bootstrap';
import { CURRENCIES } from '../constants';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
export async function getStaticProps() {
  const res = await fetch(`https://currencyapi.net/api/v1/rates?key=${process.env.API_KEY}`)
  const rates = await res.json()

  return {
    props: {
      exchangeRates: rates.rates,
    },
    revalidate: 3600,
  }
}

export default function Home({ exchangeRates }) {
  const {query} = useRouter();
  const [sourceCurrency, setSourceCurrency] = useState(query?.src?.toUpperCase() || /*localStorage?.getItem('src') ||*/ 'EUR');
  const [destinationCurrency, setDestinationCurrency] = useState(query?.dest?.toUpperCase() || /*localStorage?.getItem('dest') ||*/ 'INR');
  const [sourceValue, setSourceValue] = useState(1);
  const [destinationValue, setDestinationValue] = useState(0);

  useEffect(() => {
    calculateExchangeRate(sourceValue)
  }, [destinationCurrency])

  const calculateExchangeRate = (e) => {
    if (sourceCurrency !== 'Currency' && destinationCurrency !== 'Currency') {
      setSourceValue(e)
      setDestinationValue(parseFloat(e * (exchangeRates[destinationCurrency] / exchangeRates[sourceCurrency])).toFixed(2))
    } else {
      alert('Please Select Currencies')
    }
  }

  const toggleCurrencies = () => {
    const src = sourceCurrency;
    const srcVal = sourceValue;
    setSourceCurrency(destinationCurrency);
    setDestinationCurrency(src);
    setSourceValue(destinationValue);
    setDestinationValue(srcVal);
  }
  return (
    <div className={s.exchangeContainer}>
      <div className={s.exchangeBox}>
        <h1 className={`text-center ${s.heading}`}>Currency Exchange Rates</h1>
        <div className={`mx-auto ${s.form}`}>
          <InputGroup className={`${s.inputContainer} mb-3 input-group-lg`}>
            <DropdownButton
              as={InputGroup.Prepend}
              variant="primary"
              title={sourceCurrency}
            >
              <div className={s.optionsContainer}>
                {Object.keys(CURRENCIES)
                  .map((currency, index) => (
                    <Dropdown.Item onClick={(e) => {setSourceCurrency(currency); localStorage.setItem('src', currency)}} key={index}>
                      {CURRENCIES[currency]}
                    </Dropdown.Item>)
                  )}
              </div>
            </DropdownButton>
            <FormControl
              type="number"
              value={sourceValue}
              onChange={(e) => calculateExchangeRate(e.target.value)} />
          </InputGroup>
          <InputGroup className={`${s.inputContainer} mb-3 input-group-lg`}>
            <DropdownButton
              as={InputGroup.Prepend}
              variant="primary"
              title={destinationCurrency}
            >
              <div className={s.optionsContainer}>
                {Object.keys(CURRENCIES)
                  .map((currency, index) => (
                    <Dropdown.Item onClick={(e) => {setDestinationCurrency(currency); localStorage.setItem('dest', currency)}} key={index}>
                      {CURRENCIES[currency]}
                    </Dropdown.Item>)
                  )}
              </div>
            </DropdownButton>
            <FormControl
              value={destinationValue}
              disabled />
          </InputGroup>
          <Button variant="dark mt-3" onClick={toggleCurrencies}>Toggle Currencies</Button>
        </div>
        <div className={s.footer}>
          Developed and Maintained by <br /> <Link href="https://ps011.github.io">Prasheel Soni</Link>
        </div>
      </div>
    </div>
  )
}
