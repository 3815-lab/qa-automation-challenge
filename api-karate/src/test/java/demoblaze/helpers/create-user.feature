@ignore
Feature: Helper - registra un usuario nuevo y lo devuelve

  # Uso:
  #   * def created = call read('classpath:demoblaze/helpers/create-user.feature')
  #   * def user = created.user

  Scenario: crear usuario
    * def user = call read('classpath:demoblaze/helpers/data-generator.js') defaultPassword
    Given url baseUrl
    And path 'signup'
    And request { username: '#(user.username)', password: '#(user.password)' }
    When method post
    Then status 200
    And match JSON.parse(response) == ''
