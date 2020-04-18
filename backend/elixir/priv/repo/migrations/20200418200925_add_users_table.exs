defmodule Hello.Repo.Migrations.AddUsersTable do
  use Ecto.Migration

  def change do
    create table(:users) do
      add :firstName, :string
      add :lastName, :string
      add :emailAddress, :string
      add :password, :string
      add :isAdmin, :boolean

      timestamps()
    end

  end
end
