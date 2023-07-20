import '../styles/components/CurrencyTable.sass';

interface currenciesTo {
    currenciesTo: string[] | undefined
}

const CurrencyTable = ({currenciesTo}: currenciesTo) => {
    return (
        <>
            <table className="table">
                <thead>
                    <tr>
                        <th>From</th>
                        <th>Amount</th>
                        <th>Date</th>
                        <th>To</th>
                        <th>Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {currenciesTo?.map((element) => (
                        <tr>
                            <td>{element[0]}</td>
                            <td>{element[1]}</td>
                            <td>{element[2]}</td>
                            <td>{element[3]}</td>
                            <td>{element[4]}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}

export default CurrencyTable;