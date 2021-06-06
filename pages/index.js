import s from './index.module.scss';
import { InputGroup, DropdownButton, Dropdown, FormControl, Button } from 'react-bootstrap';
import { CURRENCIES } from '../constants';
import { useState } from 'react';

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

  const [sourceCurrency, setSourceCurrency] = useState('Select Currency');
  const [destinationCurrency, setDestinationCurrency] = useState('Select Currency');
  const [sourceValue, setSourceValue] = useState(0);
  const [destinationValue, setDestinationValue] = useState(0);

  const calculateExchangeRate = (e) => {
    if (sourceCurrency !== 'Select Currency' && destinationCurrency !== 'Select Currency') {
      setSourceValue(e.target.value)
      setDestinationValue(e.target.value * (exchangeRates[destinationCurrency] / exchangeRates[sourceCurrency]))
    } else {
      alert('Please Select Currencies')
    }
  }

  return (
    <div className={s.exchangeContainer}>
      <div className={s.exchangeBox}>
        <h1 className={`text-center ${s.heading}`}>Currency Exchange Rates</h1>
        <div className={`w-50 mx-auto ${s.form}`}>
          <InputGroup className={`${s.inputContainer} mb-3 input-group-lg`}>
            <DropdownButton
              as={InputGroup.Prepend}
              variant="primary"
              title={sourceCurrency}
            >
              <div className={s.optionsContainer}>
                {Object.keys(CURRENCIES)
                  .map((currency, index) => (
                    <Dropdown.Item onClick={(e) => setSourceCurrency(e.target.text)} key={index}>
                      {currency}
                    </Dropdown.Item>)
                  )}
              </div>
            </DropdownButton>
            <FormControl
              type="number"
              value={sourceValue}
              onChange={(e) => calculateExchangeRate(e)} />
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
                    <Dropdown.Item onClick={(e) => setDestinationCurrency(e.target.text)} key={index}>
                      {currency}
                    </Dropdown.Item>)
                  )}
              </div>
            </DropdownButton>
            <FormControl
              value={destinationValue}
              disabled />
          </InputGroup>
        </div>
      </div>
    </div>
  )
}
