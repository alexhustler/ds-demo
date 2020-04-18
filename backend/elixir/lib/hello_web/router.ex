defmodule HelloWeb.Router do
  use HelloWeb, :router

  pipeline :api do
    plug :accepts, ["json"]
    plug :fetch_session
  end

  scope "/api", HelloWeb do
    pipe_through :api

    get "/admin/users", AdminController, :getUsers
    put "/admin/users", AdminController, :updateUser

    post "/authentication/validate", AuthenticationController, :validate
    post "/authentication/login", AuthenticationController, :login
    post "/authentication/logout", AuthenticationController, :logout
  end
end
