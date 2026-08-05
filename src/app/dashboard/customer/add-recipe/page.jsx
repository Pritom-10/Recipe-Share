import { AddRecipe } from "@/components/dashboard/AddRecipe";


const AddRecipePage = async () => {
  

  return (
    <div>
      <div className="flex justify-between items-center my-5">
        <h1 className="text-3xl font-bold">Recipes</h1>
        <AddRecipe />
      </div>

      
    </div>
  );
};

export default AddRecipePage;