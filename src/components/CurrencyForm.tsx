import { useEffect, useState } from 'react';
import '../styles/components/CurrencyForm.sass';
import icon from '../icons/rotate.png';

interface currency {
    iso: string,
    currency_name: string,
    currency_symbol: string
}

interface currencies {
    currencies: Array<currency> 
}

const CurrencyForm = ({setValues}: any) => {

    const [from, setFrom] = useState<string>('USD');
    const [to, setTo] = useState<string>('UAH');
    const [amount, setAmount] = useState<number>(1);
    const [currencies, setCurrencies] = useState<Array<currency>>();

    useEffect(() => {
        const fetchData = async () => {
            const account_id = '7xmedia115714449';
            const api_key = '71s7k6b0va1bp4a297bkpmcuvr';
            const url = `https://xecdapi.xe.com/v1/currencies`;
      
            const headers = new Headers();
            headers.append('Authorization', `Basic ${btoa(`${account_id}:${api_key}`)}`);
      
            fetch(url, {headers})
            .then(res => res.body?.getReader())
            .then(res => res?.read())
            .then(res => {
                const decoder = new TextDecoder();
                const data = decoder.decode(res?.value);
                const parse: currencies = JSON.parse(data);     
                setCurrencies(parse.currencies);        
            })
        }
        fetchData()
        
    }, [])

    const handleSetValues = (event: any) => {
        event.preventDefault();
        const values = {
            from: from,
            to: to,
            amount: amount
        }
        setValues(values);
    }

    const handleSetValuesToAll = (event: any) => {
        event.preventDefault();
        const values = {
            from: from,
            to: '*',
            amount: amount
        }
        setValues(values);
    }

    const [rotates, setRotates] = useState(1);
    
    const convert = () => {
        const iconImg: HTMLElement | null = document.querySelector('.icon');
        if (iconImg) {
            iconImg.style.transform = `rotate(-${180 * rotates}deg)`;  
        }
        setRotates(rotates + 1);
        const temp = from;
        setFrom(to);
        setTo(temp);
    }

    return (
        <form className="form"> 
            <div className="form__wrapper">
                <div className='form__item'>
                    <label htmlFor="amount">Amount</label>
                    <input onChange={(event) => setAmount(+(event.target.value))} value={amount} type="number" id="amount"/>
                </div>
                <div className='form__item'>
                    <label htmlFor="from">From</label>
                    <select onChange={(event) => setFrom(event.target.value)} value={from} name="from" id="from">
                        {currencies?.map((element) => (
                            <option key={element.iso} value={element.iso}>{element.iso} – {element.currency_name}</option>
                        ))}
                    </select>
                </div>
                <div className='form__item'>
                    <img onClick={convert} className='icon' src={icon} alt="conver"/>
                    <label htmlFor="to">To</label>
                    <select onChange={(event) => setTo(event.target.value)} value={to} name="to" id="to">
                        {currencies?.map((element) => (
                            <option key={element.iso} value={element.iso}>{element.iso} – {element.currency_name}</option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="btns">
                <button onClick={handleSetValues}>Convert</button>
                <button onClick={handleSetValuesToAll}>Convert to all</button>
            </div>          
        </form>
    )
}

export default CurrencyForm;