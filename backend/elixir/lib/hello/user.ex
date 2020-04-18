defmodule Hello.User do
  use Ecto.Schema
  import Ecto.Changeset

  alias Hello.Repo

  schema "users" do
    field :firstName, :string
    field :lastName, :string
    field :emailAddress, :string
    field :password, :string
    field :isAdmin, :boolean

    timestamps()
  end

  def update_user(id, isAdmin) do
    # TODO
  end

  def load_users() do
    Hello.Repo.all(Hello.User)
  end

end
