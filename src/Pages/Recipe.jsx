import React from 'react'
import { useState } from 'react';


export default function Recipe() {

  const [recipe, setRecipe] = useState([]);
  const [newRecipe, setNewRecipe] = useState({});
  const [editingRecipe, setEditingRecipe] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredRecipe, setFilteredRecipe] = useState([]);

  const handleAddRecipe = async () => {
    try {
      const response = await fetch('https://localhost:3000/recipes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newRecipe),
      });
  
      const data = await response.json();
      setRecipe([...recipe, data]);
      setNewRecipe({});
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div>
      <div style={{
        alignItems: "center",
      }}>

        <h1 style={{ display: "flex", color: "black", alignItems: "center", justifyContent: "center", marginTop: "5%" }}>Recipes</h1>

        <div style={{display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginLeft: "25%",
          marginTop: "5%",
          width: "50%",
          height: "30%",
          borderRadius: "5px",
          boxShadow: "0 5px 10px rgba(2, 2, 2, 2.1)",
          backgroundColor: "#DDDCD6",}}>

        <form style={{
          marginTop: "2%",
        }}>

          <div style={{marginBottom: "10px"}}>
            <input type="text" style={{ width: "120%", height: "5vh" }}
                   value={newRecipe.title}
                   onChange={(event) => setNewRecipe({ ...newRecipe, name: event.target.value })}
                   placeholder='Name of the Food' />
          </div>
          <br />

          <div>
            <input type="text" style={{ width: "120%", height: "5vh" }}
              value={newRecipe.description}
              onChange={(event) => setNewRecipe({ ...newRecipe, recipes: event.target.value })}
              placeholder='Add Recipes' />
          </div>
          <br />

          
          <br />

          <button className='add-btn' type="submit" onClick={handleAddRecipe}>Add Task</button>

        </form>
        </div>
        



      <div>
  <h1
    style={{
      display: "flex",
      color: "black",
      alignItems: "center",
      justifyContent: "center",
      marginTop: "5%",
    }}
  >
    Recipe List
  </h1>

  {/* <input type="text" value={searchTerm} onChange={handleSearch} placeholder="Search by ID" style={{
        width: "23%",
        height: "20px",
        padding: "10px",
        fontSize: "16px",
        border: "1px solid #ccc",
        borderRadius: "5px",
        marginLeft: "37.5%",
        marginBottom: "20px",
        
      }}/> */}

  <ul
    style={{
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-between",
      padding: "6%",
    }}
  >
    {Array.isArray(recipe) ? (
      recipe.map((recipeItem) => (
        <li key={recipeItem.id} style={{ margin: "7.5%" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              padding: "15px",
              width: "30%",
              height: "30%",
              borderRadius: "5px",
              boxShadow: "0 5px 10px rgba(2, 2, 2, 2.1)",
              backgroundColor: "grey",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
            }}
          >
            <h2>{recipeItem.name}</h2>
            <p>{recipeItem.recipes}</p>
          

            <button onClick={() => setEditingRecipe(recipeItem)}>Edit</button>
            {/* <button onClick={() => handleDeleteTodo(todoItem.id)}>Delete</button> */}

            {editingRecipe === recipeItem && (
              <form>
                <label>
                  Name of the Food:
                  <input
                    type="text"
                    value={editingRecipe.name}
                    // onChange={(event) => handleEditTaskChange(event, 'title')}
                  />
                </label>
                <br />
                <label>
                  Recipes:
                  <input
                    type="text"
                    value={editingRecipe.recipes}
                    // onChange={(event) => handleEditTaskChange(event, 'description')}
                  />
                </label>
                <br />
                
                <br />

                {/* <button type="submit" onClick={() => handleUpdateTodo(editingTodo)}>
                  Update
                </button> */}
              </form>
            )}
          </div>
        </li>
      ))
    ) : (
      <p>No todo items found.</p>
    )}
  </ul>
</div>
      </div>
    </div>
    </>
  )
}
