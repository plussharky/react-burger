import { BASE_URL } from '../../src/utils/api-config'

function dragBunToContainer(bunType = "top") {
  cy.get("[data-testId=category-bun]").as("bunCategory");

  cy.get("@bunCategory")
    .find("[data-testId=ingredient-card]")
    .last()
    .should("be.visible")
    .as("bun");

  cy.get("@bun")
    .find("[data-testId=ingredient-card-name]")
    .invoke("text")
    .then((bunName) => {
      cy.get("@bun").trigger("dragstart");

      cy.get(`[data-testId=container-bun-${bunType}-empty]`).trigger("drop");

      cy.get(`[data-testId=container-bun-${bunType}-full]`).should("contain", bunName);
    });
}

function dragIngredientToContainer() {
  cy.get("[data-testId=category-main]").as("mainCategory");

  cy.get("@mainCategory")
    .find("[data-testId=ingredient-card]")
    .last()
    .as("main");

  cy.get("@main")
    .find("[data-testId=ingredient-card-name]")
    .invoke("text")
    .then((mainName) => {
      cy.get("@main").trigger("dragstart");
      cy.get("[data-testId=container-ingredient-empty]")
        .should("be.visible")
        .trigger("drop");

      cy.get("[data-testId=container-ingredient-full]").should(
        "contain",
        mainName
      );
    });
}

describe("openning modals is correctly", function () {
  beforeEach(function () {
    cy.intercept("GET", `${BASE_URL}/auth/user`, { fixture: "user.json"});
    cy.intercept("POST", `${BASE_URL}/orders`, { fixture: "order.json"});

    window.localStorage.setItem(
      "accessToken",
      JSON.stringify("test-accessToken")
    );

    cy.visit("http://localhost:3000");
  });

  it("should open modal with ingedient details", function () {
    cy.get("[class^=ingredient-card_card]").first().as("product");
    cy.get("@product").click();
    cy.contains("Детали ингредиента");
  });

  it("should close modal with ingedient details after click close button", function () {
    cy.get("[class^=ingredient-card_card]").first().as("product");
    cy.get("@product").click();

    cy.get("[data-testId=modal-close-button]").as("close-button");
    cy.get("@close-button").click();
    cy.contains("Детали ингредиента").should("not.exist");;
  });


  it("should drag a bun to the top bun container", function () {
    dragBunToContainer("top");
  });

  it("should drag a bun to the bottom bun container", function () {
    dragBunToContainer("bottom");
  });

  it("should drag a ingredient to the ingredient container", function () {
    dragIngredientToContainer();
  });

  it("should make order when burger is assembled", function () {
    dragBunToContainer();
    dragIngredientToContainer();

    cy.get("[class*=burger-constructor_button]").click();

    cy.contains("Ваш заказ начали готовить");
  });
});
