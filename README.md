# Didomi Initial Interview 
This is the initial project created for Didomi Interview for the 
position of Quality Assurance Engineer.

# Tech stack 
- JavaScript
- Cypress
- Gherkin approach
- Node 12.20.1

# Dependencies
- Cypress - testing framework
- Cypress Cucumber Preprocessor - gherkin package
- Multiple Cucumber Html Reporter - reporter generator 

# Setup
Navigate to the project folder and run `npm install`

Run tests with `npx cypress run` command

Open up a Cypress Dashboard instance with `npx cypress open`

# Reporting
In order to generate a report of a last run, you need to run the command `node cucumberHTMLReport.js`

After you run the command, `index.html` file will be generated, under `reports/cucumberHtmlReport.html` folder. You can open up that file in any browser, in order to see the generated report.

# Testing Strategy
Testing Strategy presentation can be found [here](https://docs.google.com/presentation/d/1qVa0ib6ib4Gwn_5L3flgnpwxQG_GCcXkNyrmnwnlEN4/edit?usp=sharing). 