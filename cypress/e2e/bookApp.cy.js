beforeEach(() => {
  //cy.viewport(
  //  Cypress.env("viewportWidthLaptop"),
  //  Cypress.env("viewportHeightLaptop")
  //);

  cy.visit("/");
});

describe("entry testing", () => {
  const email = "test@test.com";
  const password = "test";
  it("successfull entry", () => {
    cy.login(email, password);
    cy.get(".pt-2").contains(`Добро пожаловать ${email}`).should("be.visible");
  });
  it("enter with an empty username", () => {
    cy.login(null, password);
    cy.get("#mail")
      .then((foundItem) => foundItem[0].checkValidity())
      .should("be.false");
    cy.get("#mail")
      .then((foundItem) => foundItem[0].validationMessage)
      .should("contain", "Заполните это поле");
  });

  it("invalid email format", () => {
    const wrongEmail = "wrongMail";
    cy.login(wrongEmail, password);
    cy.get("#mail")
      .then((foundItem) => foundItem[0].checkValidity())
      .should("be.false");
    cy.get("#mail")
      .then((foundItem) => foundItem[0].validationMessage)
      .should(
        "contain",
        `Адрес электронной почты должен содержать символ "@". В адресе "${wrongEmail}" отсутствует символ "@".`
      );
  });
  it("invalid email format - dot issue ", () => {
    const wrongEmail = "wrongMail@.com";
    cy.login(wrongEmail, password);
    cy.get("#mail")
      .then((foundItem) => foundItem[0].checkValidity())
      .should("be.false");
    cy.get("#mail")
      .then((foundItem) => foundItem[0].validationMessage)
      .should("contain", `Недопустимое положение символа "." в адресе ".com".`);
  });
  it("enter with invalid email", () => {
    const wrongEmail = "wrongMail@gmail.com";
    cy.login(wrongEmail, password);
    cy.get(".text-danger")
      .then((foundItem) => foundItem[0].textContent)
      .should("contain", "Неправильая почта или пароль");
  });
  it("enter with invalid password", () => {
    const wrongPass = "wrongPass";
    cy.login(email, wrongPass);
    cy.get(".text-danger")
      .then((foundItem) => foundItem[0].textContent)
      .should("contain", "Неправильая почта или пароль");
  });
});
describe("adding books", () => {
  const email = "test@test.com";
  const password = "test";
  it("add new book", () => {
    const title = "Записки юного врача";
    cy.login(email, password);
    cy.get(".btn-warning").click();
    cy.get("#title").type(title);
    cy.get("#description").type("содержательная книга");
    cy.get("#authors").type("Булгаков М.А.");
    cy.get("#favorite").click();
    cy.get("[type=submit]").click();
    cy.get(".card-title")
      .then((item) => item[0].textContent)
      .should("contain", title);
  });
  it("delete book from favourite", () => {
    cy.login(email, password);
    cy.get("h4").click();
    const btn = cy.get(".btn-secondary");
    if (btn) {
      btn.click();
    }
    cy.get(".ml-auto a").should(
      "contain",
      "Please add some book to favorit on home page!"
    );
  });
  it("add to favourite", () => {
    cy.login(email, password);
    cy.get("h4").click();
    cy.get(".ml-auto a").click();
    cy.get(".btn-success").first().click();
    cy.get("h4").click();
    cy.get(".card").should("have.length", 1);
    cy.get(".btn-secondary").should("contain", "Delete from favorite");
    cy.get(".btn-secondary").click();
  });
});
