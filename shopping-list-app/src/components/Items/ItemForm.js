import { useState } from "react";

import Card from "../UI/Card";
import './ItemForm.css';

const ItemForm = props => {

    const [enteredName, setEnteredName] = useState("");
    const [enteredAmount, setEnteredAmount] = useState("");

    const submitHandler = event => {
        //when form is submitted, send data to Items component
        event.preventDefault();
        props.onAddItem({title: enteredName, amount: enteredAmount});
        setEnteredName("");
        setEnteredAmount("");
    }

    return (
        <section className='item-form'>
            <Card>
                <form onSubmit={submitHandler}>
                    <div className='form-control'>
                        <label>Name</label>
                        <input type="text" id="title" value={enteredName} onChange={event => setEnteredName(event.target.value)} />
                    </div>
                    <div className="form-control">
                        <label>Amount</label>
                        <input type="number" id="amount" value={enteredAmount} onChange={event => setEnteredAmount(event.target.value)} />
                    </div>
                    <div className="item-form__actions">
                        <button type="submit">Add Item</button>
                    </div>
                </form>
            </Card>
        </section>
    )
}

export default ItemForm;