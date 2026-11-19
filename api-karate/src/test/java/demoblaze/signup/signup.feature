@signup
Feature: Signup - registro de usuarios en demoblaze

  Background:
    * url baseUrl
    * def newUser = call read('classpath:demoblaze/helpers/data-generator.js') defaultPassword

  @smoke
  Scenario: Crear un nuevo usuario
    Given path 'signup'
    And request { username: '#(newUser.username)', password: '#(newUser.password)' }
    When method post
    Then status 200
    # cuando el registro sale bien la api responde un string json vacio (""), sin id ni mensaje.
    # karate lo recibe como texto plano, por eso se parsea antes de comparar
    And match JSON.parse(response) == ''

  Scenario: Intentar crear un usuario ya existente
    * def created = call read('classpath:demoblaze/helpers/create-user.feature')
    Given path 'signup'
    And request { username: '#(created.user.username)', password: '#(created.user.password)' }
    When method post
    Then status 200
    And match response == { errorMessage: 'This user already exist.' }

  Scenario Outline: No registra si falta <caso>
    Given path 'signup'
    And request <body>
    When method post
    Then status 200
    And match response == { errorMessage: 'Bad parameter, missing username or password' }

    Examples:
      | caso         | body                                 |
      | el username  | { password: '#(newUser.password)' }  |
      | el password  | { username: '#(newUser.username)' }  |
      | todo el body | {}                                   |
