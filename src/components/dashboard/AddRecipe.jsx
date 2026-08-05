"use client";

import { imageUploader } from "@/lib/imageUpload";
import {
  Button,
  Input,
  Label,
  Modal,
  Select,
  SelectItem,
  Surface,
  Textarea,
  TextField,
} from "@heroui/react";
import { useState } from "react";
import { addRecipe } from "@/lib/actions/recipe";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

export function AddRecipe() {
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const [ingredients, setIngredients] = useState([""]);
  const [instructions, setInstructions] = useState([""]);
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
        preparationTime: formData.get("preparationTime"),

        ingredients: ingredients.filter((item) => item.trim() !== ""),
        instructions: instructions.filter((item) => item.trim() !== ""),

        userId: user?.id,
        userName: user?.name,
        userEmail: user?.email,
      };

      const result = await addRecipe(recipeData);

      if (result.success) {
        toast.success("Recipe added successfully!");
        e.target.reset();
        setIngredients([""]);
        setInstructions([""]);
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

  return (
    <Modal isOpen={isOpen} onOpenChange={setIsOpen}>
      <Button variant="secondary">Add Recipe</Button>
      <Modal.Backdrop>
        <Modal.Container placement="auto">
          <Modal.Dialog className="sm:max-w-md">
            <Modal.CloseTrigger />
            <Modal.Header>
              <Modal.Heading>Add Recipe</Modal.Heading>
            </Modal.Header>
            <Modal.Body className="p-6">
              <Surface variant="default">
                <form onSubmit={onSubmit} className="space-y-5">
                  {/* Recipe Name */}
                  <TextField name="recipeName" variant="secondary">
                    <Label>Recipe Name</Label>
                    <Input placeholder="Enter recipe name" />
                  </TextField>

                  {/* Recipe Image */}
                  <div className="space-y-2">
                    <Label>Recipe Image</Label>
                    <Input
                      name="recipeImage"
                      type="file"
                      accept="image/*"
                      variant="bordered"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Category</Label>
                    <select
                      name="category"
                      className="w-full rounded-xl border border-default-200 bg-default-100 px-3 py-2"
                    >
                      <option value="">Select Category</option>
                      <option value="Breakfast">Breakfast</option>
                      <option value="Lunch">Lunch</option>
                      <option value="Dinner">Dinner</option>
                      <option value="Dessert">Dessert</option>
                      <option value="Snack">Snack</option>
                      <option value="Drink">Drink</option>
                    </select>
                  </div>

                  <TextField name="cuisineType" variant="secondary">
                    <Label>Cuisine Type</Label>
                    <Input placeholder="e.g. Bangladeshi, Italian, Chinese" />
                  </TextField>

                  <div className="space-y-2">
                    <Label>Difficulty Level</Label>
                    <select
                      name="difficultyLevel"
                      className="w-full rounded-xl border border-default-200 bg-default-100 px-3 py-2"
                    >
                      <option value="">Select Difficulty</option>
                      <option value="Easy">Easy</option>
                      <option value="Medium">Medium</option>
                      <option value="Hard">Hard</option>
                    </select>
                  </div>

                  <TextField name="preparationTime" variant="secondary">
                    <Label>Preparation Time</Label>
                    <Input placeholder="e.g. 30 Minutes" />
                  </TextField>

                  {ingredients.map((item, index) => (
                    <Input
                      key={index}
                      value={item}
                      placeholder={`Ingredient ${index + 1}`}
                      onChange={(e) => {
                        const newIngredients = [...ingredients];
                        newIngredients[index] = e.target.value;
                        setIngredients(newIngredients);
                      }}
                    />
                  ))}

                  {instructions.map((step, index) => (
                    <Input
                      key={index}
                      value={step}
                      placeholder={`Step ${index + 1}`}
                      onChange={(e) => {
                        const newSteps = [...instructions];
                        newSteps[index] = e.target.value;
                        setInstructions(newSteps);
                      }}
                    />
                  ))}

                  <Modal.Footer>
                    <Button slot="close" variant="light">
                      Cancel
                    </Button>

                    <Button
                      color="primary"
                      type="submit"
                      isDisabled={isSubmitting}
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
