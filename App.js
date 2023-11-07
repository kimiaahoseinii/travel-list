import { useState } from "react";

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

return(
<div className="app">
  <Logo/>
  <Form onAddItems = {handleAddItems}/>
<PackingList items={items} onDeleteItem = {handleDeleteItem} onToggleItems ={handleToggleItem}/>
<Stats items={items}/>
</div>
)
}

function Logo(){

  return <h1>🎋Far Away 💼</h1>
}


function Form({onAddItems}){
  const[description , setDescription] = useState("")
const[quantity, setQuantity] = useState(1)


  function handleSubmit(e){
e.preventDefault()

  const newItem = {
    description, quantity , packed : false,
    id:Date.now(),

  }
  console.log(newItem);
  onAddItems (newItem)

  setDescription("");
  setQuantity(1)
  }




  return <form className="add-form" onSubmit={handleSubmit}>
    <h3>what do you need for your 😍 trip?</h3>
<select value={quantity} onChange={(e) =>setQuantity(e.target.value)}>
{Array.from({length:20} , (_,i) => i + 1).map(num =><option value={num} key={num}>

  {num}
</option>)

}
</select>

<input type="text" placeholder="item..." value={description}
onChange={(e)=>setDescription(e.target.value)}
/>
<button>Add</button>

  </form>
}
function PackingList({items , onDeleteItem ,onToggleItems}){

  return (
  <div className="list">
  <ul>
    
    {items.map((item)=><Item item={item} key={item.id} onDeleteItem={onDeleteItem} onToggleItems={onToggleItems}/>)}

  </ul>
  </div>)
}

function Item({item , onDeleteItem ,onToggleItems}){
return(
  <li>
    <input type="checkbox"  value={item.packed} onChange={() =>onToggleItems(item.id)}/>
    <span style={item.packed ? {textDecoration:"line-through"} : {}}> 
      
    {item.quantity} {item.description}
    
    </span>
   <button onClick={()=> onDeleteItem(item.id)}>❌</button>
    
    
    </li>
)
}

function Stats({items}){

if(!items.length)
return(
  <p className="stats">

    <em>Start adding some items to your packing list 🚀</em>
  </p>
)

  const numItems= items.length ;
  const numPacked = items.filter((item) => item.packed).length;
  const percentage = Math.round((numPacked / numItems) * 100)
  return <footer className="stats">
 <em> 
  {percentage === 100 ? "you got everything! ready to go ✈" :
  `👜  you have ${numItems} items on your list, and you already packed ${numPacked}(${percentage}%)`
}
  </em>
  </footer>
}