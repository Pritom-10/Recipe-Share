// app/dashboard/customer/my-recipes/EditRecipeModal.jsx
"use client";

import { imageUploader } from "@/lib/imageUpload";
import { Button, Input, Label, Modal, Surface, TextField } from "@heroui/react";
import { useState } from "react";
import { updateRecipe } from "@/lib/actions/recipe";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { ImagePlus, Plus, X } from "lucide-react";

const EditRecipeModal = ({ recipe, isOpen, onOpenChange, onUpdated }) => {
  const [recipeName, setRecipeName] = useState(recipe.recipeName || "");
  const [category, setCategory] = useState(recipe.category || "");
  const [cuisineType, setCuisineType] = useState(recipe.cuisineType || "");
  const [difficultyLevel, setDifficultyLevel] = useState(
    recipe.difficultyLevel || "",
  );
  const [preparationTime, setPreparationTime] = useState(
    recipe.preparationTime || "",
  );

  const [ingredients, setIngredients] = useState(
    recipe.ingredients?.length ? recipe.ingredients : [""],
  );
  const [instructions, setInstructions] = useState(
    recipe.instructions?.length ? recipe.instructions : [""],
  );
  const [imagePreview, setImagePreview] = useState(recipe.recipeImage || null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const addIngredient = () => setIngredients([...ingredients, ""]);
  const removeIngredient = (index) =>
    setIngredients(ingredients.filter((_, i) => i !== index));

  const addInstruction = () => setInstructions([...instructions, ""]);
  const removeInstruction = (index) =>
    setInstructions(instructions.filter((_, i) => i !== index));

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.target);

    try {
      let imageUrl = recipe.recipeImage || "";

      const imageFile = formData.get("recipeImage");
      if (imageFile && imageFile.size > 0) {
        const imageRes = await imageUploader(imageFile);
        imageUrl = imageRes.url;
      }

      const updateData = {
        recipeName,
        recipeImage: imageUrl,
        category,
        cuisineType,
        difficultyLevel,
        preparationTime: Number(preparationTime) || 0,
        ingredients: ingredients.filter((item) => item.trim() !== ""),
        instructions: instructions.filter((item) => item.trim() !== ""),
      };

      const { data } = await authClient.token();
      const token = data?.token;

      const result = await updateRecipe(recipe._id, updateData, token);

      if (result.success) {
        toast.success("রেসিপি আপডেট হয়েছে!");
        onUpdated({ ...recipe, ...updateData });
        onOpenChange(false);
      } else {
        toast.error(result.error || "কিছু একটা সমস্যা হয়েছে");
      }
    } catch (error) {
      console.error(error);
      toast.error("কিছু একটা সমস্যা হয়েছে");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <Modal.Backdrop>
        <Modal.Container placement="auto">
          <Modal.Dialog className="sm:max-w-lg">
            <Modal.CloseTrigger />
            <Modal.Header className="border-b border-gray-100 pb-4">
              <Modal.Heading className="text-xl font-bold">
                Edit Recipe
              </Modal.Heading>
            </Modal.Header>

            <Modal.Body className="p-6 max-h-[75vh] overflow-y-auto">
              <Surface variant="default">
                <form onSubmit={onSubmit} className="space-y-6">
                  <TextField name="recipeName" variant="secondary" isRequired>
                    <Label className="text-sm font-medium text-gray-700">
                      Recipe Name
                    </Label>
                    <Input
                      value={recipeName}
                      onChange={(e) => setRecipeName(e.target.value)}
                      className="rounded-xl"
                    />
                  </TextField>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">
                      Recipe Image
                    </Label>
                    <label className="flex flex-col items-center justify-center gap-2 border-2 border-dashed border-gray-200 rounded-2xl p-4 cursor-pointer hover:border-orange-300 transition-colors bg-gray-50">
                      {imagePreview ? (
                        <img
                          src={imagePreview}
                          alt="preview"
                          className="w-full h-40 object-cover rounded-xl"
                        />
                      ) : (
                        <>
                          <ImagePlus className="w-8 h-8 text-gray-400" />
                          <span className="text-sm text-gray-400">
                            Click to upload an image
                          </span>
                        </>
                      )}
                      <input
                        name="recipeImage"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                      />
                    </label>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-gray-700">
                        Category
                      </Label>
                      <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        required
                        className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                      >
                        <option value="">Select</option>
                        <option value="Breakfast">Breakfast</option>
                        <option value="Lunch">Lunch</option>
                        <option value="Dinner">Dinner</option>
                        <option value="Main Course">Main Course</option>
                        <option value="Dessert">Dessert</option>
                        <option value="Snack">Snack</option>
                        <option value="Drink">Drink</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-gray-700">
                        Difficulty
                      </Label>
                      <select
                        value={difficultyLevel}
                        onChange={(e) => setDifficultyLevel(e.target.value)}
                        required
                        className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                      >
                        <option value="">Select</option>
                        <option value="Easy">Easy</option>
                        <option value="Medium">Medium</option>
                        <option value="Hard">Hard</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <TextField
                      name="cuisineType"
                      variant="secondary"
                      isRequired
                    >
                      <Label className="text-sm font-medium text-gray-700">
                        Cuisine
                      </Label>
                      <Input
                        value={cuisineType}
                        onChange={(e) => setCuisineType(e.target.value)}
                        className="rounded-xl"
                      />
                    </TextField>

                    <TextField
                      name="preparationTime"
                      variant="secondary"
                      isRequired
                    >
                      <Label className="text-sm font-medium text-gray-700">
                        Prep Time (min)
                      </Label>
                      <Input
                        type="number"
                        value={preparationTime}
                        onChange={(e) => setPreparationTime(e.target.value)}
                        className="rounded-xl"
                      />
                    </TextField>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">
                      Ingredients
                    </Label>
                    {ingredients.map((item, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Input
                          value={item}
                          placeholder={`Ingredient ${index + 1}`}
                          className="rounded-xl flex-1"
                          onChange={(e) => {
                            const updated = [...ingredients];
                            updated[index] = e.target.value;
                            setIngredients(updated);
                          }}
                        />
                        {ingredients.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeIngredient(index)}
                            className="p-2 text-gray-400 hover:text-rose-500"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={addIngredient}
                      className="flex items-center gap-1.5 text-sm font-medium text-orange-600 hover:text-orange-700 mt-1"
                    >
                      <Plus className="w-4 h-4" />
                      Add Ingredient
                    </button>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">
                      Instructions
                    </Label>
                    {instructions.map((step, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <span className="flex-shrink-0 w-7 h-7 mt-0.5 rounded-full bg-orange-100 text-orange-600 text-xs font-bold flex items-center justify-center">
                          {index + 1}
                        </span>
                        <textarea
                          value={step}
                          rows={2}
                          className="flex-1 rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 resize-none"
                          onChange={(e) => {
                            const updated = [...instructions];
                            updated[index] = e.target.value;
                            setInstructions(updated);
                          }}
                        />
                        {instructions.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeInstruction(index)}
                            className="p-2 text-gray-400 hover:text-rose-500"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={addInstruction}
                      className="flex items-center gap-1.5 text-sm font-medium text-orange-600 hover:text-orange-700 mt-1"
                    >
                      <Plus className="w-4 h-4" />
                      Add Step
                    </button>
                  </div>

                  <Modal.Footer className="border-t border-gray-100 pt-4">
                    <Button slot="close" variant="light">
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      isDisabled={isSubmitting}
                      className="!bg-gradient-to-r !from-orange-500 !to-rose-500 !text-white !border-0"
                    >
                      {isSubmitting ? "Saving..." : "Save Changes"}
                    </Button>
                  </Modal.Footer>
                </form>
              </Surface>
            </Modal.Body>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
};

export default EditRecipeModal;