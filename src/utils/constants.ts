import { TIngredient } from "./types";

export const testIngredient: TIngredient = {
    _id: "12345",
    name: "Beef Patty",
    type: "main",
    proteins: 20,
    fat: 15,
    carbohydrates: 5,
    calories: 250,
    price: 100,
    image: "https://example.com/images/beef-patty.png",
    image_mobile: "https://example.com/images/beef-patty-mobile.png",
    image_large: "https://example.com/images/beef-patty-large.png",
    __v: 0,
    uniqueId: "unique-12345"
};

export const testBun: TIngredient = {
    _id: "67890",
    name: "Sesame Bun",
    type: "bun",
    proteins: 8,
    fat: 3,
    carbohydrates: 30,
    calories: 150,
    price: 50,
    image: "https://example.com/images/sesame-bun.png",
    image_mobile: "https://example.com/images/sesame-bun-mobile.png",
    image_large: "https://example.com/images/sesame-bun-large.png",
    __v: 0,
    uniqueId: "unique-67890"
};

export const testSauce: TIngredient = {
    _id: "11223",
    name: "Spicy Sauce",
    type: "sauce",
    proteins: 1,
    fat: 2,
    carbohydrates: 10,
    calories: 50,
    price: 20,
    image: "https://example.com/images/spicy-sauce.png",
    image_mobile: "https://example.com/images/spicy-sauce-mobile.png",
    image_large: "https://example.com/images/spicy-sauce-large.png",
    __v: 0,
    uniqueId: "unique-11223"
};