@login
Feature: Login - autenticacion de usuarios en demoblaze

  Background:
    * url baseUrl
    # un solo usuario para todo el feature, asi login no depende de que corra antes signup
    * def created = callonce read('classpath:demoblaze/helpers/create-user.feature')
    * def user = created.user

  @smoke
  Scenario: Login con usuario y password correctos
    Given path 'login'
    And request { username: '#(user.username)', password: '#(user.password)' }
    When method post
    Then status 200
    # la respuesta es un string json: "Auth_token: <token>"
    * def body = JSON.parse(response)
    And match body == '#regex Auth_token: .+'
    * def token = body.replace('Auth_token: ', '')
    * print 'token generado:', token

  Scenario: Login con password incorrecto
    Given path 'login'
    And request { username: '#(user.username)', password: '#(user.wrongPassword)' }
    When method post
    Then status 200
    And match response == { errorMessage: 'Wrong password.' }

  Scenario: Login con un usuario que no existe
    * def ghost = call read('classpath:demoblaze/helpers/data-generator.js') defaultPassword
    Given path 'login'
    And request { username: '#(ghost.username)', password: '#(ghost.password)' }
    When method post
    Then status 200
    And match response == { errorMessage: 'User does not exist.' }

  Scenario Outline: No hace login si falta <caso>
    Given path 'login'
    And request <body>
    When method post
    Then status 200
    # ojo: a diferencia de signup, aca el mensaje siempre dice "missing username", falte lo que falte
    And match response == { errorMessage: 'Bad parameter, missing username' }

    Examples:
      | caso        | body                             |
      | el username | { password: '#(user.password)' } |
      | el password | { username: '#(user.username)' } |
