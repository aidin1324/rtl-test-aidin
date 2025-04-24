import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import { FeedbackForm } from "../component/FeedBackForm"; 

describe("FeedbackForm", () => {

  it("должен отображать заголовок 'Обратная связь'", () => {
    render(<FeedbackForm />);
    expect(screen.getByRole("heading", { name: /обратная связь/i })).toBeInTheDocument();
  });

  it("должен позволять вводить имя и сообщение", async () => {
    const user = userEvent.setup();
    render(<FeedbackForm />);

    const nameInput = screen.getByLabelText(/имя/i);
    const messageTextarea = screen.getByLabelText(/сообщение/i);

    await user.type(nameInput, "Тестовое Имя");
    await user.type(messageTextarea, "Тестовое сообщение");

    expect(nameInput).toHaveValue("Тестовое Имя");
    expect(messageTextarea).toHaveValue("Тестовое сообщение");
  });

  it("должен отображать сообщение подтверждения при валидной отправке", async () => {
    const user = userEvent.setup();
    render(<FeedbackForm />);

    const nameInput = screen.getByLabelText(/имя/i);
    const messageTextarea = screen.getByLabelText(/сообщение/i);
    const submitButton = screen.getByRole("button", { name: /отправить/i });

    await user.type(nameInput, "Валидное Имя");
    await user.type(messageTextarea, "Валидное сообщение");
    await user.click(submitButton);

    const confirmationMessage = await screen.findByText(
      /спасибо, Валидное Имя! Ваше сообщение отправлено./i,
      {},
      { timeout: 2000 } 
    );
    expect(confirmationMessage).toBeInTheDocument();
  });

  it("не должен отображать сообщение подтверждения при пустом имени или сообщении", async () => {
    const user = userEvent.setup();
    render(<FeedbackForm />);

    const submitButton = screen.getByRole("button", { name: /отправить/i });

    await user.click(submitButton);

    await new Promise(resolve => setTimeout(resolve, 1600));
    const confirmationMessage = screen.queryByText(/спасибо,.*! Ваше сообщение отправлено./i);
    expect(confirmationMessage).not.toBeInTheDocument();

    const nameInput = screen.getByLabelText(/имя/i);
    await user.type(nameInput, "Имя есть");
    await user.click(submitButton);
    await new Promise(resolve => setTimeout(resolve, 1600));
    const confirmationMessage2 = screen.queryByText(/спасибо,.*! Ваше сообщение отправлено./i);
    expect(confirmationMessage2).not.toBeInTheDocument();
  });

   it("кнопка 'Отправить' должна существовать и быть активной", () => {
    render(<FeedbackForm />);
    const submitButton = screen.getByRole("button", { name: /отправить/i });
    expect(submitButton).toBeInTheDocument();
    expect(submitButton).toBeEnabled(); 
  });

  it("не должен отображать сообщение подтверждения, если введены только пробелы", async () => {
    const user = userEvent.setup();
    render(<FeedbackForm />);

    const nameInput = screen.getByLabelText(/имя/i);
    const messageTextarea = screen.getByLabelText(/сообщение/i);
    const submitButton = screen.getByRole("button", { name: /отправить/i });

    await user.type(nameInput, "   ");
    await user.type(messageTextarea, "   "); 
    await user.click(submitButton);


    await new Promise(resolve => setTimeout(resolve, 1600));
    const confirmationMessage = screen.queryByText(/спасибо,.*! Ваше сообщение отправлено./i);
    expect(confirmationMessage).not.toBeInTheDocument();
  });
});