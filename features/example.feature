@example
Feature: Example

  simple example

  Scenario: Example
    Given I visit 'google.com'
    When I search for 'ducks'
    Then I should see search results for 'ducks'
