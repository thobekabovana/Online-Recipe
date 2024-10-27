import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const RecipeForm = () => {
  const [recipeName, setRecipeName] = useState('');
  const [ingredients, setIngredients] = useState(['']);
  const [instructions, setInstructions] = useState(['']);
  const [category, setCategory] = useState('');
  const [prepTime, setPrepTime] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleIngredientChange = (index, value) => {
    const newIngredients = [...ingredients];
    newIngredients[index] = value;
    setIngredients(newIngredients);
  };

  const handleInstructionChange = (index, value) => {
    const newInstructions = [...instructions];
    newInstructions[index] = value;
    setInstructions(newInstructions);
  };

  const addIngredient = () => {
    setIngredients([...ingredients, '']);
  };

  const addInstruction = () => {
    setInstructions([...instructions, '']);
  };

  const validateForm = () => {
    if (!recipeName || !category || !prepTime) {
      setError('All fields are required.');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return; 

    setLoading(true);
    setError(''); 

    const recipeData = {
      recipeName,
      ingredients: JSON.stringify(ingredients),
      instructions: JSON.stringify(instructions),
      category,
      prepTime,
    };

    try {
      const response = await fetch('http://localhost:3000/recipes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(recipeData),
      });

      if (response.ok) {
        // Reset form
        setRecipeName('');
        setIngredients(['']);
        setInstructions(['']);
        setCategory('');
        setPrepTime('');
        navigate('/recipe'); 
      } else {
        setError('Error submitting recipe. Please try again.');
      }
    } catch (error) {
      setError('Error: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form 
    className="max-w-xl mx-auto p-8 bg-black text-gray-100 shadow-xl rounded-2xl mt-12 space-y-6"
    onSubmit={handleSubmit}
  >
    <h2 className="text-3xl font-extrabold text-center tracking-wide">Add New Recipe</h2>
  
    {error && (
      <p className="bg-red-500 text-white py-2 px-4 rounded-lg text-center">
        {error}
      </p>
    )}
  
  <Link to="/display">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Recipes
        </button>
      </Link>

    <div>
      <label className="block text-gray-300 mb-1">Recipe Name</label>
      <input
        type="text"
        className="w-full p-3 bg-gray-800 text-gray-100 border border-gray-700 rounded-lg focus:ring-2 focus:ring-white"
        value={recipeName}
        onChange={(e) => setRecipeName(e.target.value)}
        required
      />
    </div>
  
    <div>
      <label className="block text-gray-300 mb-1">Ingredients</label>
      {ingredients.map((ingredient, index) => (
        <input
          key={index}
          type="text"
          className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg mb-2 text-gray-100 focus:ring-2 focus:ring-gray-400"
          value={ingredient}
          onChange={(e) => handleIngredientChange(index, e.target.value)}
          placeholder={`Ingredient ${index + 1}`}
          required
        />
      ))}
      <button 
        type="button" 
        className="mt-2 text-white underline hover:text-gray-400"
        onClick={addIngredient}
      >
        + Add Ingredient
      </button>
    </div>
  
    <div>
      <label className="block text-gray-300 mb-1">Instructions</label>
      {instructions.map((instruction, index) => (
        <input
          key={index}
          type="text"
          className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg mb-2 text-gray-100 focus:ring-2 focus:ring-gray-400"
          value={instruction}
          onChange={(e) => handleInstructionChange(index, e.target.value)}
          placeholder={`Step ${index + 1}`}
          required
        />
      ))}
      <button 
        type="button" 
        className="mt-2 text-white underline hover:text-gray-400"
        onClick={addInstruction}
      >
        + Add Instruction
      </button>
    </div>
  
    <div>
      <label className="block text-gray-300 mb-1">Category</label>
      <select
        className="w-full p-3 bg-gray-900 border border-gray-700 rounded-lg focus:ring-2 focus:ring-gray-400 text-gray-100"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        required
      >
        <option value="">Select Category</option>
        <option value="dessert">Dessert</option>
        <option value="maincourse">Main Course</option>
        <option value="appetizer">Appetizer</option>
      </select>
    </div>
  
    <div>
      <label className="block text-gray-300 mb-1">Preparation Time</label>
      <input
        type="text"
        className="w-full p-3 bg-gray-800 text-gray-100 border border-gray-700 rounded-lg focus:ring-2 focus:ring-gray-400"
        value={prepTime}
        onChange={(e) => setPrepTime(e.target.value)}
        placeholder="e.g., 30 minutes"
        required
      />
    </div>
  
    <button
      type="submit"
      className={`w-full py-3 bg-gray-700 text-white font-semibold rounded-lg hover:bg-gray-600 transition duration-200 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
      disabled={loading}
    >
      {loading ? 'Submitting...' : 'Submit Recipe'}
    </button>
  </form>
  
  );
};

export default RecipeForm;
