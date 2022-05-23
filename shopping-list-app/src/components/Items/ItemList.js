import './ItemList.css';

const ItemList = props => {
    return (
        <section className='item-list'>
            <h2>Shopping List</h2>
            <ul>
                {props.items.map(item => (
                    <li key={item.id} onClick={props.onRemoveItem.bind(this,item.id)}>
                        <span>{item.title}</span>
                        <span>{"x" + item.amount}</span>
                    </li>
                ))}
            </ul>
        </section>
    )
}

export default ItemList;