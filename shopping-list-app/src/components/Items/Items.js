import { useState, useEffect } from "react";

import ItemForm from "./ItemForm";
import ItemList from "./ItemList";

const Items = props => {
    //state to keep track of our items
    const [items, setItems] = useState([]);

    //run once when component loads
    useEffect(() => {
        fetch('https://shopping-list-b1281-default-rtdb.firebaseio.com/items.json').then(
        //converts response from json to a JS object
        response => response.json()
        ).then(responseData => {
        const loadedItems = [];
        
        //fill array with the database's data
        for (const key in responseData){
            loadedItems.push({
                id: key,
                title: responseData[key].title,
                amount: responseData[key].amount
            });
        }
        
        //update State with the fetched items
        setItems(loadedItems);

    });
    }, []);

    const addItemHandler = item => {

        //add to database (firebase)
        fetch('https://shopping-list-b1281-default-rtdb.firebaseio.com/items.json', {
            //Sending Data
            method: 'POST',
            //Converts the item object to json
            body: JSON.stringify(item),
            //(This is for firebase to understand)
            headers: {'Content-Type': 'application/json'}
        }).then(response => {
            //convert the response that is in JSON back to a JS object
            return response.json();
        }).then(responseData => {
            //add items from ItemForm to the array (locally) when added to database
            setItems(prevItems => [...prevItems, {id: responseData.name, ...item}]);
        });    
    }

    const removeItemHandler = itemID => {
        fetch(`https://shopping-list-b1281-default-rtdb.firebaseio.com/items/${itemID}.json`, {
            method: 'DELETE',            
        });

        setItems(prevItems =>
            prevItems.filter(item => item.id !== itemID)
        );
    }

    return (
        <>
            <ItemForm onAddItem={addItemHandler} />
            <section>
                <ItemList items={items} onRemoveItem={removeItemHandler}/>
            </section>
        </>
    )  
}

export default Items;