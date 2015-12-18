@example
Feature: Example

  simple example

  Scenario: Angular
    Given I visit 'angularjs'
    When I type in the name 'Andreas'
    Then I should see the text 'Hello Andreas!'


  Scenario: React
    Given I visit 'reactjs'
    When I add todo task 'Hello World!'
    Then I should see the task 'Hello World!'

  Scenario: google
    Given I visit 'google.com'
    When I search for 'stuff'
    Then I should see a list of 'stuff'
