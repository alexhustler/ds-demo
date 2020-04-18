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
    # TODO check credentials
    put_session(conn, 'isAuthenticated', 'true')
    json conn, []
  end

  def logout(conn, _params) do
    put_session(conn, 'isAuthenticated', 'false')
    # TODO destroy sesison
    json conn, []
  end
end
