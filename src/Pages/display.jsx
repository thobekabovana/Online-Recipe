import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import photo from '../assets/images/496-4961271_back-arrow-back-button-icon-png-transparent-png (1).png'


const Display = () => {
  const [recipes, setRecipes] = useState([]);
  const [editRecipe, setEditRecipe] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const categoryColors = {
    dessert: 'bg-gray-200',
    maincourse: 'bg-gray-300',
    appetizer: 'bg-gray-400',
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    const response = await fetch('http://localhost:3000/recipes');
    const data = await response.json();
    setRecipes(data);
  };

  const handleDelete = async (id) => {
    await fetch(`http://localhost:3000/recipes/${id}`, {
      method: 'DELETE',
    });
    fetchRecipes();
  };

  const openEditModal = (recipe) => {
    setEditRecipe({
      ...recipe,
      ingredients: JSON.parse(recipe.ingredients),
      instructions: JSON.parse(recipe.instructions),
    });
    setModalOpen(true);
  };

  const closeEditModal = () => {
    setEditRecipe(null);
    setModalOpen(false);
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    const updatedRecipe = {
      ...editRecipe,
      ingredients: JSON.stringify(editRecipe.ingredients),
      instructions: JSON.stringify(editRecipe.instructions),
    };
    await fetch(`http://localhost:3000/recipes/${editRecipe.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedRecipe),
    });
    fetchRecipes();
    closeEditModal();
  };

  const filteredRecipes = recipes.filter((recipe) =>
    recipe.recipeName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!recipes.length) {
    return <div className="text-black text-center mt-10">Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white min-h-screen">
<div >
  <button
    onClick={() => navigate('/recipe')}
    className="outline-none focus:outline-none inline-flex items-center justify-center p-2 bg-transparent hover:scale-105 transition-transform duration-300"
  >
    <img
      src={photo}
      alt="Recipe Button"
      className="w-12 h-12 object-cover rounded-full"
    />
  </button>
</div>

      <h2 className="text-2xl font-bold text-black mb-4">Submitted Recipes</h2>
      <input
        type="text"
        placeholder="Search recipes..."
        className="mb-4 p-2 w-full border border-gray-500 rounded bg-gray-100 text-black placeholder-gray-500"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRecipes.map((recipe) => (
          <div key={recipe.id} className={`p-4 rounded-lg ${categoryColors[recipe.category]}`}>
            <h3 className="font-bold text-lg text-black">{recipe.recipeName}</h3>
            <p className="mt-2 text-gray-700">Category: {recipe.category}</p>
            <h4 className="mt-2 font-semibold text-black">Ingredients:</h4>
            <ul className="list-disc ml-5 text-gray-800">
              {JSON.parse(recipe.ingredients).map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
            <h4 className="mt-2 font-semibold text-black">Instructions:</h4>
            <ol className="list-decimal ml-5 text-gray-800">
              {JSON.parse(recipe.instructions).map((instruction, index) => (
                <li key={index}>{instruction}</li>
              ))}
            </ol>
            <div className="mt-4 flex space-x-2">
              <button
                onClick={() => openEditModal(recipe)}
                className="bg-green-600 text-white px-4 py-2 rounded"
              >
                Update
              </button>
              <button
                onClick={() => handleDelete(recipe.id)}
                className="bg-red-600 text-white px-4 py-2 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {modalOpen && editRecipe && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-gray-900 p-6 rounded shadow-lg max-w-sm w-full text-white">
            <h2 className="text-xl mb-4">Edit Recipe</h2>
            <form onSubmit={handleEdit}>
              <div className="mb-4">
                <label className="block">Recipe Name:</label>
                <input
                  type="text"
                  className="mt-1 block w-full p-2 border border-gray-500 rounded bg-gray-800 text-white"
                  value={editRecipe.recipeName}
                  onChange={(e) => setEditRecipe({ ...editRecipe, recipeName: e.target.value })}
                />
              </div>
              <div className="mb-4">
                <label className="block">Ingredients (comma-separated):</label>
                <input
                  type="text"
                  className="mt-1 block w-full p-2 border border-gray-500 rounded bg-gray-800 text-white"
                  value={editRecipe.ingredients.join(',')}
                  onChange={(e) =>
                    setEditRecipe({
                      ...editRecipe,
                      ingredients: e.target.value.split(',').map((item) => item.trim()),
                    })
                  }
                />
              </div>
              <div className="mb-4">
                <label className="block">Instructions (comma-separated):</label>
                <input
                  type="text"
                  className="mt-1 block w-full p-2 border border-gray-500 rounded bg-gray-800 text-white"
                  value={editRecipe.instructions.join(',')}
                  onChange={(e) =>
                    setEditRecipe({
                      ...editRecipe,
                      instructions: e.target.value.split(',').map((item) => item.trim()),
                    })
                  }
                />
              </div>
              <div className="mb-4">
                <label className="block">Category:</label>
                <select
                  value={editRecipe.category}
                  onChange={(e) => setEditRecipe({ ...editRecipe, category: e.target.value })}
                  className="mt-1 block w-full p-2 border border-gray-500 rounded bg-gray-800 text-white"
                >
                  <option value="dessert">Dessert</option>
                  <option value="maincourse">Main Course</option>
                  <option value="appetizer">Appetizer</option>
                </select>
              </div>
              <div className="flex space-x-2">
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={closeEditModal}
                  className="bg-gray-600 text-white px-4 py-2 rounded"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Display;
