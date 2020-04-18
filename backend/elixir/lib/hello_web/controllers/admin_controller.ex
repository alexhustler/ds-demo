defmodule HelloWeb.AdminController do
  use HelloWeb, :controller

  def updateUser(conn, _params) do
    users = []
    json conn, users
  end

  def getUsers(conn, _params) do
    Repo.all(User)
    json conn, users
  end
end
