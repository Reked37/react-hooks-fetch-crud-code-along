import React, { useState, useEffect } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";

function ShoppingList() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [items, setItems] = useState([]);

  useEffect(()=>{
    fetch("http://localhost:4000/items")
    .then(res=>res.json())
    .then(data=>setItems(data))
  }, [])

  function handleAddItem(newItem){
    setItems([...items, newItem])
  }

  function handleCategoryChange(category) {
    setSelectedCategory(category);
  }
  
  function handleUpdateItem(updatedItem){
    const newItem= items.map((item)=>{
      if(item.id === updatedItem.id){
        return updatedItem
      }else{return item}
    });
    setItems(newItem)
  }

  function handleDeleteItem(deletedItem){
    console.log(deletedItem)
    const removeItem=items.filter((item)=> item.id !==deletedItem.id)
    setItems(removeItem)
  }

  const itemsToDisplay = items.filter((item) => {
    if (selectedCategory === "All") return true;

    return item.category === selectedCategory;
  });

  return (
    <div className="ShoppingList">
      <ItemForm onAddItem={handleAddItem}/>
      <Filter
        category={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <Item key={item.id} item={item} onUpdateItem={handleUpdateItem} 
          onDeletedItem={handleDeleteItem}/>
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
