const report = require('multiple-cucumber-html-reporter');

report.generate({
    jsonDir: './cypress/cucumber-json',
    reportPath: './reports/cucumberHtmlReport.html',
    metadata:{
        browser: {
            name: 'chrome',
            version: '92'
        },
        device: 'local',
        platform: {
            name: 'osx',
            version: '11.5.2'
        }
    },
    customData: {
        title: 'Didomi Test Report',
        data: [
            {label: 'Project', value: 'Didomi Interview'},
            {label: 'Release', value: '1.0.0'},
            {label: 'Cycle', value: 'Interview Cycle'},
            {label: 'Execution Start Time', value: new Intl.DateTimeFormat('en', {day: '2-digit',
                    month: '2-digit', year: '2-digit', weekday: 'short', hour: '2-digit',
                    minute: '2-digit', second: '2-digit'}).format(Date.now())},
            {label: 'Execution End Time', value: new Intl.DateTimeFormat('en', {day: '2-digit',
                    month: '2-digit', year: '2-digit', weekday: 'short', hour: '2-digit',
                    minute: '2-digit', second: '2-digit'}).format(Date.now())}
        ]
    }
});