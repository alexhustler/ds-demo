module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(
      /**
       * username: admin@test.com
       * password: Password123!
       */
      'INSERT INTO users \
        (emailAddress, firstName, lastName, password, isAdmin, createdAt, updatedAt, deletedAt) values \
        ("admin@test.com", "Local", "Admin", "$2b$10$iFqGf/.bj7ABziNiLaotxeiRnskdDeDaaorJ32YFPNT4JX28fLrfO", 1, "2019-02-18 13:54:16", "2019-02-18 13:54:16", NULL);'
    );
    await queryInterface.sequelize.query(
      /**
       * username: bob@gmail.com
       * password: Password123!
       */
      'INSERT INTO users \
        (emailAddress, firstName, lastName, password, isAdmin, createdAt, updatedAt, deletedAt) values \
        ("bob@gmail.com", "Bob", "Jones", "$2b$10$iFqGf/.bj7ABziNiLaotxeiRnskdDeDaaorJ32YFPNT4JX28fLrfO", 0, "2019-02-18 13:54:16", "2019-02-18 13:54:16", NULL);'
    );
  },
  down: () => {},
};
