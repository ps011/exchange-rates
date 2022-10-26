import s from './index.module.scss';
import { InputGroup, Col, FormControl, Button, Row, Container } from 'react-bootstrap';
import { CURRENCIES } from '../constants';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Select from 'react-select';



export async function getStaticProps() {
  const res = await fetch(`https://currencyapi.net/api/v1/rates?key=${process.env.API_KEY}`)
  const rates = await res.json();

  return {
    props: {
      exchangeRates: rates.rates || null,
    },
    revalidate: 3600,
  }
}

export default function Home({ exchangeRates }) {
  const { query } = useRouter();
  let sourceCur, destinationCur = ''
  
  if (typeof window !== "undefined") {
    sourceCur = localStorage.getItem('src') || false;
    destinationCur = localStorage.getItem('dest') || false;
  }
  
  const [sourceCurrency, setSourceCurrency] = useState(query?.src?.toUpperCase() || sourceCur || 'EUR');
  const [destinationCurrency, setDestinationCurrency] = useState(query?.dest?.toUpperCase() || destinationCur || 'INR');
  const [sourceValue, setSourceValue] = useState(1);
  const [destinationValue, setDestinationValue] = useState(0);
  const [currencyList, setCurrencyList] = useState([]);

  useEffect(() => {
    const list = []
    Object.keys(CURRENCIES).map(key => {
      const obj = { label: CURRENCIES[key], value: key };
      list.push(obj);
    });
    setCurrencyList(list);
    setSourceCurrency(localStorage?.getItem('src'));
    setDestinationCurrency(localStorage?.getItem('dest'));
  }, [])

  useEffect(() => {
    calculateExchangeRate(sourceValue)
  }, [destinationCurrency, sourceCurrency])

  const calculateExchangeRate = (e) => {
    if (sourceCurrency !== 'Currency' && destinationCurrency !== 'Currency') {
      setSourceValue(e)
      setDestinationValue(parseFloat(e * (exchangeRates[destinationCurrency] / exchangeRates[sourceCurrency])).toFixed(2))
    } else {
      alert('Please Select Currencies')
    }
  }

  const toggleCurrencies = () => {
    localStorage.setItem('src', sourceCurrency);
    localStorage.setItem('dest', destinationCurrency);
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
            <Container>
              <Row>
                <Col>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Select
                    hideSelectedOptions={false}
                    isClearable={true}
                    onChange={e => {
                      setSourceCurrency(e.value);
                      localStorage.setItem('src', e.value)
                    }}
                    options={currencyList}
                    placeholder={sourceCurrency}
                    tabSelectsValue={false}
                    value={sourceCurrency}
                  />
                </Col>
                <Col>
                  <FormControl
                    type="number"
                    value={sourceValue}
                    onChange={(e) => calculateExchangeRate(e.target.value)} />
                </Col>
              </Row>
            </Container>
          </InputGroup>
          <InputGroup className={`${s.inputContainer} mb-3 input-group-lg`}>
            <Container>
              <Row>
                <Col>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Select
                    hideSelectedOptions={false}
                    isClearable={true}
                    onChange={e => {
                      setDestinationCurrency(e.value);
                      localStorage.setItem('dest', e.value)
                    }}
                    options={currencyList}
                    placeholder={destinationCurrency}
                    tabSelectsValue={false}
                    value={destinationCurrency}
                  />
                </Col>
                <Col>
                  <FormControl
                    value={destinationValue}
                    disabled />
                </Col>
              </Row>
            </Container>
          </InputGroup>
          <Button variant="dark mt-5" onClick={toggleCurrencies}>Toggle Currencies</Button>
        </div>
        <div className={s.footer}>
          Developed and Maintained by <br /> <Link href="https://ps011.github.io">Prasheel Soni</Link>
        </div>
      </div>
    </div >
  )
}
