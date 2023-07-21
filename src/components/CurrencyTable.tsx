import { observer } from 'mobx-react-lite';
import '../styles/components/CurrencyTable.sass';
import { Context } from '..';
import { useContext, useEffect } from 'react';

const CurrencyTable = observer(() => {

    const {store} = useContext(Context);

    useEffect(() => {
        if (localStorage.getItem('from')) {
            store.setAmount(Number(localStorage.getItem('amount')));
            store.setFrom(String(localStorage.getItem('from')));
            store.setTo(String(localStorage.getItem('to')));
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        store.getCurrenciesToConver();   
        // store.getCurrencyForLastMonth(); недоступно по подписке  
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [store.from, store.to, store.amount, store.date])

    const showOwn = () => {
        document.querySelector('#own-tab')?.classList.add('tabs__item_active');
        document.querySelector('#last-tab')?.classList.remove('tabs__item_active');
        document.querySelector('#own')?.classList.add('table_active');
        document.querySelector('#last')?.classList.remove('table_active');
    }

    const showLast = () => {
        document.querySelector('#own-tab')?.classList.remove('tabs__item_active');
        document.querySelector('#last-tab')?.classList.add('tabs__item_active');
        document.querySelector('#own')?.classList.remove('table_active');
        document.querySelector('#last')?.classList.add('table_active');
    }

    return (
        <>
            <div className="wrapper">
                <div className="tabs">
                    <div onClick={showOwn} id='own-tab' className="tabs__item tabs__item_active">Own property</div>
                    <div onClick={showLast} id='last-tab' className="tabs__item">Last month</div>
                </div>
                <table id='own' className="table table_active">
                    <thead>
                        <tr>
                            <th>From</th>
                            <th>Amount</th>
                            <th>To</th>
                            <th>Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {store.currenciesToConver?.map((element) => (
                            <tr key={element[0]}>
                                <td>{store.from}</td>
                                <td>{store.amount}</td>
                                <td>{element[0]}</td>
                                <td>{+element[1] * store.amount}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <table id='last' className="table">
                    <thead>
                        <tr>
                            <th>From</th>
                            <th>Amount</th>
                            <th>To</th>
                            <th>Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {store.currencyForLastMonth?.map((element) => (
                            <tr key={element[0]}>
                                <td>{store.from}</td>
                                <td>{store.amount}</td>
                                <td>{element[0]}</td>
                                <td>{+element[1] * store.amount}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>           
        </>
    )
})

export default CurrencyTable;