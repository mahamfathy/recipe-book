import { Ingredient } from './ingredients.models';

export class Recipe {
  public id: number;
  public name: string;
  public description: string;
  public imagePath: string;
  public ingredients: Ingredient[];
  constructor(
    id: number,
    name: string,
    desc: string,
    imagePath: string,
    ingredient: Ingredient[]
  ) {
    this.id = id;
    this.name = name;
    this.description = desc;
    this.imagePath = imagePath;
    this.ingredients = ingredient;
  }
}
