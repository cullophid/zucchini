@example
Feature: Example

  simple example
  @new-game
  Scenario: New Game
    Given I am on the New Game page
      When I fill in "name" with "my game"
      And I fill in "description" with "a game"
      And I click Create Game
      Then I should be on the games list page
    When I am on the New Game page
      And I fill in "name" with "my new game"
      And I fill in "description" with "a new game"
      And I click Create Game
      Then I should be on the games list page
    And I should see the game "my new game"

  @new-game2
  Scenario: Other new game
    Given I am on the New Game page
      When I fill in "name" with "my game"
      And I fill in "description" with "a game"
      And I click Create Game
      Then I should be on the games list page
      And I should see the game "my game"
