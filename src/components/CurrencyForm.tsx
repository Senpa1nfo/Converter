import { useContext, useState } from 'react';
import '../styles/components/CurrencyForm.sass';
import icon from '../icons/rotate.png';
import { Context } from '..';
import { observer } from 'mobx-react-lite';

const CurrencyForm = observer(() => {

    const {store} = useContext(Context);

    const handleSetValuesToAll = (event: any) => {
        event.preventDefault();
        store.setTo('');
    }

    const [rotates, setRotates] = useState(1);
    
    const convert = () => {
        const iconImg: HTMLElement | null = document.querySelector('.icon');
        if (iconImg) {
            iconImg.style.transform = `rotate(-${180 * rotates}deg)`;  
        }
        setRotates(rotates + 1);
        const temp = store.from;
        store.setFrom(store.to);
        store.setTo(temp);
    }

    return (
        <form className="form"> 
            <div className="form__wrapper">
                <div className='form__item'>
                    <label htmlFor="amount">Amount</label>
                    <input onChange={(event) => store.setAmount(+(event.target.value))} value={store.amount} type="number" id="amount"/>
                </div>
                <div className='form__item'>
                    <label htmlFor="from">From</label>
                    <select onChange={(event) => store.setFrom(event.target.value)} value={store.from} name="from" id="from">
                        <option value="USD">USD – United States dollar</option>
                    </select>
                </div>
                <div className='form__item'>
                    {/* <img onClick={convert} className='icon' src={icon} alt="conver"/> */}
                    <label htmlFor="to">To</label>
                    <select onChange={(event) => store.setTo(event.target.value)} value={store.to} name="to" id="to">
                        <option value="EUR">EUR – Euro</option>
                        <option value="UAH">UAH – Ukrainian hryvnia</option>
                    </select>
                </div>
            </div>
            <div className="btns">
                <input onChange={(event) => store.setDate(event.target.value)} value={store.date} type="date" name="date" id="date" />
                <button onClick={handleSetValuesToAll}>Convert to all</button>
            </div>          
        </form>
    )
})

export default CurrencyForm;