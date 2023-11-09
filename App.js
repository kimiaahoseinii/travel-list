import { useState } from "react";
import Logo from "./Logo";
import Form from "./Form";
import { PackingList } from "./PackingList";
import { Stats } from "./Stats";


const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: true },
  { id: 2, description: "Charge", quantity: 1, packed: false }
];



export default function App(){
  const [items , setItems] = useState([])

  //چون ایتم ها ابجکت هستند پس مقدار پیش فرض انها هم توی استیت باید ابجکت باشه

function handleAddItems (item){
  setItems((items)=> [...items , item])
  }
  //items = ایتم های قبلی هست که کپی گرفتیم
  //item = ایتم های جدید هست که میخوایم اضافه کنیم


  function handleDeleteItem (id){
setItems(items=>items.filter(item=> item.id !== id))
  }

  function handleToggleItem (id){
    setItems((items) =>items.map((item) => item.id === id ? {...item ,packed :! item.packed } : item))
  }

  function handleClearList()
  {
    const confirmed = window.confirm("Are you sure you want to delete all items?")
   if(confirmed) setItems([])
  }

return(
<div className="app">
  <Logo/>
  <Form onAddItems = {handleAddItems}/>
<PackingList items={items}
 onDeleteItem = {handleDeleteItem} 
 onToggleItems ={handleToggleItem}
 onClearList={handleClearList}
 />
<Stats items={items}/>
</div>
)
}




