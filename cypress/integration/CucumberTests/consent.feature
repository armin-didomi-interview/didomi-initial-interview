Feature: Consent Functionality
  Consent Feature Tests

  Scenario Outline: Verify Consent is functioning properly

    Given User is navigated to Didomi website
    And Consent is shown properly
    When User "<acceptsOrDeclines>" consent by clicking on proper button
    Then Consent is closed out and user is navigated to the landing page
    Examples:
      | acceptsOrDeclines  |
      | accepts            |
      | declines           |
