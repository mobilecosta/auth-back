import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import '@testing-library/jest-dom';
import Login from "./Login";
import * as nextRouter from 'next/navigation';

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("Login Component", () => {
  let mockPush: jest.Mock;

  beforeEach(() => {
    mockPush = jest.fn();
    (nextRouter.useRouter as jest.Mock).mockReturnValue({ push: mockPush });
  });

  it("renders the login form correctly", () => {
    render(<Login />);

    expect(screen.getByLabelText(/usuário/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/senha/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
  });

  it("redirects to home when login is successful", async () => {
    render(<Login />);

    fireEvent.change(screen.getByLabelText(/usuário/i), {
      target: { value: "testuser" },
    });
    fireEvent.change(screen.getByLabelText(/senha/i), {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    await waitFor(() => expect(mockPush).toHaveBeenCalledWith("/home"));
  });

  it("shows an error message when login fails", async () => {
    render(<Login />);

    fireEvent.change(screen.getByLabelText(/usuário/i), {
      target: { value: "wronguser" },
    });
    fireEvent.change(screen.getByLabelText(/senha/i), {
      target: { value: "wrongpassword" },
    });

    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    await waitFor(() =>
      expect(screen.getByRole("alert")).toHaveTextContent(
        "Usuário ou senha inválidos."
      )
    );
  });
});
