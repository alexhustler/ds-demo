defmodule HelloWeb.AuthenticationController do
  use HelloWeb, :controller

  def validate(conn, _params) do
    isAuthenticated = get_session(conn, :isAuthenticated)
    if isAuthenticated do
      conn
      |> put_status(200)
      |> json(%{message: "success"})
    else
      conn
      |> put_status(401)
      |> json(%{error: %{code: 401, message: "Not authenticated"}})
    end
  end

  def login(conn, _params) do
    users = []
    json conn, users
  end

  def logout(conn, _params) do
    users = []
    json conn, users
  end
end
