# Script for populating the database. You can run it as:
#
#     mix run priv/repo/seeds.exs
#
# Inside the script, you can read and write to any of your
# repositories directly:
#
#     Hello.Repo.insert!(%Hello.SomeSchema{})
#
# We recommend using the bang functions (`insert!`, `update!`
# and so on) as they will fail if something goes wrong.


##
# emailAddress: admin@test.com
# password: Password123!
##
Hello.Repo.insert!(
  %Hello.User{firstName: "Admin", lastName: "Test", emailAddress: "admin@test.com", password: "Password123!", isAdmin: true }
)

##
# emailAddress: bob@gmail.com
# password: Password123!
##
Hello.Repo.insert!(
  %Hello.User{firstName: "Bob", lastName: "Test", emailAddress: "bob@gmail.com", password: "Password123!", isAdmin: true }
)
