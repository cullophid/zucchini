@example
Feature: Example

  simple example

  Scenario: Example
    Given I visit 'https://angularjs.org'
    When I type in the name 'Andreas'
    Then I should see the text 'Hello Andreas!'
