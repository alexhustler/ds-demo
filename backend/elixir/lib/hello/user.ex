defmodule Hello.User do
  use Ecto.Schema
  import Ecto.Changeset

  schema "users" do
    field :firstName, :string
    field :lastName, :string
    field :emailAddress, :string
    field :password, :string
    field :isAdmin, :boolean

    timestamps()
  end

  @doc false
  def changeset(user, attrs) do
    user
    |> cast(attrs, [:title])
    |> validate_required([:title])
  end
end
