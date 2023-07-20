import { useEffect, useState } from "react";
import CurrencyTable from "./components/CurrencyTable";
import CurrencyForm from "./components/CurrencyForm";

function App() {

  const [values, setValues] = useState({from: 'USD', to: 'UAH', amount: '1',});
  const [currenciesTo, setCurrenciesTo] = useState<Array<string>>();

  useEffect(() => {
    const fetchData = async () => {
      const account_id = '7xmedia115714449';
      const api_key = '71s7k6b0va1bp4a297bkpmcuvr';
      const url = `https://xecdapi.xe.com/v1/convert_from.csv/?from=${values.from}&to=${values.to}&amount=${values.amount}`;

      const headers = new Headers();
      headers.append('Authorization', `Basic ${btoa(`${account_id}:${api_key}`)}`);

      fetch(url, {headers})
      .then(res => res.body?.getReader())
      .then(res => res?.read())
      .then(res => {
        const decoder = new TextDecoder();
        const data = decoder.decode(res?.value);
        const temp: any = [];
        data.split('\n').forEach((element, index) => {
          if (index !== 0 && index !== 1) {
            temp.push(element.split(','));
          }
        })
        setCurrenciesTo(temp);        
      })
    }
    fetchData();

  }, [values.amount, values.from, values.to])

  const getValues = (values: any) => {
    setValues(values);
  }

  return (
    <>
      <CurrencyForm setValues={getValues}></CurrencyForm>
      <CurrencyTable currenciesTo={currenciesTo}></CurrencyTable>
    </>
  );
}

export default App;
