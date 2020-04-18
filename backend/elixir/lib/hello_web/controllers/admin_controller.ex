defmodule HelloWeb.AdminController do
  use HelloWeb, :controller

  alias Hello.User

  def updateUser(conn, _params) do
    User.update_user(0, false)
    json conn, []
  end

  def getUsers(conn, _params) do
    users = User.load_users()
    json conn, Enum.map(
      users,
      fn user -> %{
        firstName: user.firstName,
        lastName: user.lastName,
        isAdmin: user.isAdmin,
        emailAddress: user.emailAddress,
      } end
    )
  end
end
