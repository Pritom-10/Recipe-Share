
"use client";

import { imageUploader } from "@/lib/imageUpload";
import { Button, Input, Label, Modal, Surface, TextField } from "@heroui/react";
import { useState } from "react";
import { addRecipe } from "@/lib/actions/recipe";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { ChefHat, ImagePlus, Plus, Trash2, X } from "lucide-react";

export function AddRecipe() {
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const [ingredients, setIngredients] = useState([""]);
  const [instructions, setInstructions] = useState([""]);
  const [imagePreview, setImagePreview] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const resetForm = (formEl) => {
    formEl?.reset();
    setIngredients([""]);
    setInstructions([""]);
    setImagePreview(null);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.target);

    try {
      let imageUrl = "";

      const imageFile = formData.get("recipeImage");

      if (imageFile && imageFile.size > 0) {
        const imageRes = await imageUploader(imageFile);
        imageUrl = imageRes.url;
      }

      const recipeData = {
        recipeName: formData.get("recipeName"),
        recipeImage: imageUrl,
        category: formData.get("category"),
        cuisineType: formData.get("cuisineType"),
        difficultyLevel: formData.get("difficultyLevel"),
        preparationTime: Number(formData.get("preparationTime")) || 0,

        ingredients: ingredients.filter((item) => item.trim() !== ""),
        instructions: instructions.filter((item) => item.trim() !== ""),

        userId: user?.id,
        userName: user?.name,
        userEmail: user?.email,
        like: 0,
      };

      const { data } = await authClient.token();
      const token = data?.token;

      const result = await addRecipe(recipeData, token);

      if (result.success) {
        toast.success("Recipe added successfully!");
        resetForm(e.target);
        setIsOpen(false);
      } else {
        toast.error(result.error || "Something went wrong");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  const addIngredient = () => setIngredients([...ingredients, ""]);
  const removeIngredient = (index) =>
    setIngredients(ingredients.filter((_, i) => i !== index));

  const addInstruction = () => setInstructions([...instructions, ""]);
  const removeInstruction = (index) =>
    setInstructions(instructions.filter((_, i) => i !== index));

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={setIsOpen}>
      <Button
        variant="secondary"
        className="!bg-gradient-to-r !from-orange-500 !to-rose-500 !text-white !border-0 shadow-md hover:shadow-lg"
      >
        <ChefHat className="w-4 h-4 mr-1.5" />
        Add Recipe
      </Button>

      <Modal.Backdrop>
        <Modal.Container placement="auto">
          <Modal.Dialog className="sm:max-w-lg dark:bg-gray-900 dark:text-white">
            <Modal.CloseTrigger />
            <Modal.Header className="border-b border-gray-100 pb-4 dark:border-gray-800">
              <Modal.Heading className="text-xl font-bold flex items-center gap-2">
                <ChefHat className="w-5 h-5 text-orange-500" />
                Add New Recipe
              </Modal.Heading>
            </Modal.Header>

            <Modal.Body className="p-6 max-h-[75vh] overflow-y-auto dark:bg-gray-900">
              <Surface variant="default" className="dark:bg-gray-900 dark:text-white">
                <form onSubmit={onSubmit} className="space-y-6">
                  <TextField name="recipeName" variant="secondary" isRequired>
                    <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Recipe Name
                    </Label>
                    <Input
                      placeholder="e.g. Chicken Biryani (Dum Style)"
                      className="rounded-xl dark:bg-gray-800 dark:text-white dark:border-gray-700 dark:placeholder-gray-400"
                    />
                  </TextField>

                 
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Recipe Image
                    </Label>
                    <label className="flex flex-col items-center justify-center gap-2 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-2xl p-4 cursor-pointer hover:border-orange-300 transition-colors bg-gray-50 dark:bg-gray-800/50">
                      {imagePreview ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={imagePreview}
                          alt="preview"
                          className="w-full h-40 object-cover rounded-xl"
                        />
                      ) : (
                        <>
                          <ImagePlus className="w-8 h-8 text-gray-400 dark:text-gray-500" />
                          <span className="text-sm text-gray-400 dark:text-gray-300">
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
                      <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Category
                      </Label>
                      <select
                        name="category"
                        required
                        className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
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
                      <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Difficulty
                      </Label>
                      <select
                        name="difficultyLevel"
                        required
                        className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
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
                      <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Cuisine
                      </Label>
                      <Input
                        placeholder="e.g. Indian"
                        className="rounded-xl dark:bg-gray-800 dark:text-white dark:border-gray-700 dark:placeholder-gray-400"
                      />
                    </TextField>

                    <TextField
                      name="preparationTime"
                      variant="secondary"
                      isRequired
                    >
                      <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Prep Time (min)
                      </Label>
                      <Input
                        type="number"
                        placeholder="e.g. 80"
                        className="rounded-xl dark:bg-gray-800 dark:text-white dark:border-gray-700 dark:placeholder-gray-400"
                      />
                    </TextField>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Ingredients
                    </Label>
                    {ingredients.map((item, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Input
                          value={item}
                          placeholder={`Ingredient ${index + 1}`}
                          className="rounded-xl flex-1 dark:bg-gray-800 dark:text-white dark:border-gray-700 dark:placeholder-gray-400"
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
                            className="p-2 text-gray-400 hover:text-rose-500 dark:text-gray-500 dark:hover:text-rose-400 transition-colors"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={addIngredient}
                      className="flex items-center gap-1.5 text-sm font-medium text-orange-600 hover:text-orange-700 dark:text-orange-400 dark:hover:text-orange-300 mt-1"
                    >
                      <Plus className="w-4 h-4" />
                      Add Ingredient
                    </button>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Instructions
                    </Label>
                    {instructions.map((step, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <span className="flex-shrink-0 w-7 h-7 mt-0.5 rounded-full bg-orange-100 text-orange-600 text-xs font-bold flex items-center justify-center dark:bg-orange-900/40 dark:text-orange-300">
                          {index + 1}
                        </span>
                        <textarea
                          value={step}
                          placeholder={`Step ${index + 1}`}
                          rows={2}
                          className="flex-1 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 resize-none dark:placeholder-gray-400"
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
                            className="p-2 text-gray-400 hover:text-rose-500 dark:text-gray-500 dark:hover:text-rose-400 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={addInstruction}
                      className="flex items-center gap-1.5 text-sm font-medium text-orange-600 hover:text-orange-700 dark:text-orange-400 dark:hover:text-orange-300 mt-1"
                    >
                      <Plus className="w-4 h-4" />
                      Add Step
                    </button>
                  </div>

                  <Modal.Footer className="border-t border-gray-100 pt-4 dark:border-gray-800">
                    <Button slot="close" variant="light">
                      Cancel
                    </Button>

                    <Button
                      type="submit"
                      isDisabled={isSubmitting}
                      className="!bg-gradient-to-r !from-orange-500 !to-rose-500 !text-white !border-0"
                    >
                      {isSubmitting ? "Adding..." : "Add Recipe"}
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
}