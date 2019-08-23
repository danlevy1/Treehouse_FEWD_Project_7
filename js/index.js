// Global Variables
let primaryButtonColor = '#7477bf';
let secondaryButtonColor = '#b2b2b2';

// Load content when DOM is ready
window.addEventListener('DOMContentLoaded', () => {
    setUpTrafficChart();
    setUpDialyTrafficChart();
    setUpMobileUsersChart();
    setUpLocalStorage();
    setUpSettingsSwitches();
    setUpTimezoneSelectMenu();
    setUpSettingsSaveButton();
    setUpAlertBanner();
    setUpSendMessageButton();
    setUpAlertBellButton();
    setUpNotifications();
});


/**
 * Sets up the traffic line chart and displays it
 */
function setUpTrafficChart() {

    const trafficDatasets = {
        hourly: [
            35,
            50,
            15,
            10,
            25,
            30,
            40,
            55,
            45,
            25,
            45,
            50
        ],
    
        daily: [
            105,
            90,
            85,
            75,
            80,
            95,
            100,
            105,
            85,
            70,
            90,
            100
        ],
    
        weekly: [
            750,
            1250,
            1000,
            1500,
            2000,
            1500,
            1750,
            1250,
            1750,
            2250,
            1750,
            2250
        ],
    
        monthly: [
            4535,
            5755,
            9425,
            5620,
            8665,
            7345,
            8285,
            5735,
            5005,
            4820,
            6820,
            8520
        ]
    };

    const xAxisLabels = {
        hourly: [
            '12-1',
            '2-3',
            '4-5',
            '6-7',
            '8-9',
            '10-11',
            '12-1',
            '2-3',
            '4-5',
            '6-7',
            '8-9',
            '10-11',
        ],

        daily: [
            '1',
            '2',
            '3',
            '4',
            '5',
            '6',
            '7',
            '8',
            '9',
            '10',
            '11',
            '12'
        ],

        weekly: [
            '8-14',
            '15-21',
            '22-28',
            '28-3',
            '4-10',
            '11-17',
            '18-24',
            '24-30',
            '1-7',
            '8-14',
            '15-21',
            '21-28'
        ],

        monthly: [
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec'
        ]
    }

    const trafficLineChartCanvas = document.querySelector("#traffic-chart");
    const trafficLineChart = new Chart(trafficLineChartCanvas, {
        // Line chart type
        type: "line",

        // Line chart data
        data: {
            // x-axis labels
            labels: [
                '8-14',
                '15-21',
                '22-28',
                '28-3',
                '4-10',
                '11-17',
                '18-24',
                '24-30',
                '1-7',
                '8-14',
                '15-21',
                '21-28'
            ],

            // Traffic data set
            datasets: [
                {
                    label: "Weekly Traffic",
                    backgroundColor: "rgba(116, 119, 191, 0.2)",
                    borderWidth: 1,
                    borderColor: "rgba(116, 119, 191, 1)",
                    pointBorderWidth: 1,
                    pointRadius: 5,
                    pointBackgroundColor: "rgba(255, 255, 255, 1)",
                    lineTension: 0,
                    data: [
                        750,
                        1250,
                        1000,
                        1500,
                        2000,
                        1500,
                        1750,
                        1250,
                        1750,
                        2250,
                        1750,
                        2250
                    ]
                }
            ]
        },

        // Line chart options
        // chart.data.options.scales.yAxes[0].ticks
        options: {
            responsive: true,
            // aspectRatio: 3,
            legend: {
                display: false
            },
            layout: {
                padding: {
                    top: 20
                }
            },
            scales: {
                yAxes: [
                    {
                        ticks: {
                            beginAtZero: true,
                            min: 500,
                            max: 2500,
                            stepSize: 500
                        }
                    },
                ]
            }
        }
    });

    // Adds a click event listener to each time selection button
    const trafficTimeSelectionButtons = document.querySelectorAll('#traffic-time-selection li');
    trafficTimeSelectionButtons.forEach(button => {
        button.addEventListener('click', () => {
            updateTrafficChart(trafficLineChart, button, trafficDatasets, xAxisLabels);
        })
    });
}

/**
 * Updates traffic line chart with new data based on time selection
 * @param {*} chart The traffic chart element
 * @param {*} timeSelectionButton The time selection button element that was clicked
 * @param {*} data All traffic chart data
 * @param {*} xAxisLabels All traffic chart x-axis labels
 */
function updateTrafficChart(chart, timeSelectionButton, data, xAxisLabels) {
    // Removes active styles from old selection button
    document.querySelector('#traffic-selector-active').id = '';

    // Adds active styles to new selection button
    timeSelectionButton.id = 'traffic-selector-active';

    // Updates chart with new data
    switch (timeSelectionButton.textContent) {
        case 'Hourly':
            displayNewTrafficChartData(chart, data.hourly, xAxisLabels.hourly, 0, 60, 10);
            break;
        case 'Daily':
            displayNewTrafficChartData(chart, data.daily, xAxisLabels.daily, 60, 120, 20);
            break;
        case 'Weekly':
            displayNewTrafficChartData(chart, data.weekly, xAxisLabels.weekly, 500, 2500, 500);
            break;
        default:
            displayNewTrafficChartData(chart, data.monthly, xAxisLabels.monthly, 4500, 9500, 1000);
            break;
    }
}

/**
 * Updates traffic chart and re-displays it
 * @param {*} chart The traffic chart element
 * @param {*} data An array of data for the chart
 * @param {*} xAxisLabels X-axis labels for the chart
 * @param {*} minTick Minimum y-axis tick
 * @param {*} maxTick Maximum y-axis tick
 * @param {*} tickStepSize Y-axis tick step size
 */
function displayNewTrafficChartData(chart, data, xAxisLabels, minTick, maxTick, tickStepSize) {
    // Updates chart data and x-axis labels
    for (let i = 0; i < 12; i ++) {
        chart.data.datasets[0].data[i] = data[i];
        chart.data.labels[i] = xAxisLabels[i];
    }

    // Updates y-axis labels
    const yAxisTicks = chart.options.scales.yAxes[0].ticks;
    yAxisTicks.min = minTick;
    yAxisTicks.max = maxTick;
    yAxisTicks.stepSize = tickStepSize;

    // Updates and re-displays the chart
    chart.update();
}

/**
 * Sets up the daily traffic bar chart and displays it
 */
function setUpDialyTrafficChart() {
    const dailyTrafficBarChartCanvas = document.querySelector("#daily-traffic-chart");
    new Chart(dailyTrafficBarChartCanvas, {
        type: "bar",
        data: {
            labels: ["S", "M", "T", "W", "T", "F", "S"],
            datasets: [
                {
                    label: "Daily Traffic",
                    backgroundColor: "rgba(116, 119, 191, 1)",
                    borderWidth: 1,
                    borderColor: "rgba(116, 119, 191, 1)",
                    pointBorderWidth: 1,
                    pointRadius: 5,
                    pointBackgroundColor: "rgba(255, 255, 255, 1)",
                    lineTension: 0,
                    data: [75, 100, 175, 125, 225, 200, 100]
                }
            ]
        },
        options: {
            responsive: true,
            legend: {
                display: false
            },
            layout: {
                padding: {
                    top: 20
                }
            },
            scales: {
                xAxes: [
                    {
                        barPercentage: 0.6
                    }
                ],
                yAxes: [
                    {
                        ticks: {
                            beginAtZero: true,
                            min: 50,
                            max: 250,
                            stepSize: 50
                        }
                    }
                ]
            }
        }
    });
}

/**
 * Sets up the mobile users doughnut chart and displays it
 */
function setUpMobileUsersChart() {
    const mobileUsersDoughnutChartCanvas = document.querySelector("#mobile-users-chart");
    new Chart(mobileUsersDoughnutChartCanvas, {
        type: "doughnut",
        data: {
            labels: ["Phones", "Tablets", "Desktop"],
            datasets: [
                {
                    label: "Mobile Users",
                    data: [75, 25, 25],
                    backgroundColor: ['#7477bf', '#81c98f', '#74b1bf']
                }
            ]
        },
        options: {
            responsive: true,
            legend: {
                position: 'right'
            },
            layout: {
                padding: {
                    top: 20
                }
            },
            rotation: 0.1 * Math.PI
        }
    });
}

/**
 * Sets settings in local storage if first visit
 * Otherwise, sets the settings on the page
 */
function setUpLocalStorage() {

    // Sets up settings on-off switches
    if (window.localStorage.getItem('sendEmailNotifications') === null) {
        window.localStorage.setItem('sendEmailNotifications', 'true');
        window.localStorage.setItem('setProfilePublic', 'true');
    } else {
        setUpSettingsSwitches();
    }

    // Sets up settings timezone select menu
    const timezone = window.localStorage.getItem('timezone');
    if (timezone !== null) {
        document.querySelector('option[disabled]').selected = false;

        const selectedTimezone = document.querySelector(`option[value='${timezone}']`);
        selectedTimezone.selected = true;
        selectedTimezone.parentElement.style.color = '#666666';
    }
}

/**
 * Sets on-off switches based on settings
 */
function setUpSettingsSwitches() {
    const emailCheckbox = document.querySelector('#send-email-notif-checkbox');
    const profileCheckbox = document.querySelector('#set-profile-public-checkbox');

    // Sets up local storage for email notification switch
    if (window.localStorage.getItem('sendEmailNotifications') === 'true') {
        emailCheckbox.checked = true;
    } else {
        emailCheckbox.checked = false;
        onOffSwitchChanged(emailCheckbox);
    }
    
    // Sets up local storage for public profile switch
    if (window.localStorage.getItem('setProfilePublic') === 'true') {
        profileCheckbox.checked = true;
    } else {
        profileCheckbox.checked = false;
        onOffSwitchChanged(profileCheckbox);
    }

    // Adds event listener when email notification switch is clicked
    emailCheckbox.addEventListener('click', () => {
        onOffSwitchChanged(emailCheckbox);
    });
    
    // Adds event listener when public profile switch is clicked
    profileCheckbox.addEventListener('click', () => {
        onOffSwitchChanged(profileCheckbox);
    });
}

/**
 * Updates local storage based on switch state
 * @param {*} switchCheckbox The checkbox element that was clicked
 * @param {*} storageKey The local storage key to modify
 */
function updateSwitchSetting(switchCheckbox, storageKey) {
    if (switchCheckbox.checked) {
        window.localStorage.setItem(storageKey, 'true');
    } else {
        window.localStorage.setItem(storageKey, 'false');
    }
    onOffSwitchChanged(switchCheckbox);
}

/**
 * Uodates the on-off switch that was clicked
 * @param {*} switchCheckbox The on-off switch element that was clicked
 */
function onOffSwitchChanged(switchCheckbox) {
    const switchContainer = switchCheckbox.parentElement;
    const onText = switchContainer.querySelector('.on-off-switch-text-on');
    const offText = switchContainer.querySelector('.on-off-switch-text-off');
    if (switchCheckbox.checked) {
        switchContainer.style.backgroundColor = primaryButtonColor;
        onText.style.display = 'block';
        offText.style.display = 'none';
    } else {
        switchContainer.style.backgroundColor = secondaryButtonColor;
        onText.style.display = 'none';
        offText.style.display = 'block';
    }
}

/**
 * Changes the color of the select input when a non-disabled option is selected
 */
function setUpTimezoneSelectMenu() {
    const timezoneSelectMenu = document.querySelector('#timezone-select');

    timezoneSelectMenu.addEventListener('change', () => {
        const selectedOption = timezoneSelectMenu.options[timezoneSelectMenu.selectedIndex];
        if (selectedOption.disabled) {
            timezoneSelectMenu.style.color = '#bababa';
        } else {
            timezoneSelectMenu.style.color = '#666666';
        }
    });
}

/**
 * Saves settings when settings save button is clicked
 */
function setUpSettingsSaveButton() {
    document.querySelector('#settings-option-btns-save').addEventListener('click', settingsSaveButtonClicked);
}

/**
 * Update settings in local storage
 */
function settingsSaveButtonClicked() {
    const emailCheckbox = document.querySelector('#send-email-notif-checkbox');
    const profileCheckbox = document.querySelector('#set-profile-public-checkbox');

    updateSwitchSetting(emailCheckbox, 'sendEmailNotifications');
    updateSwitchSetting(profileCheckbox, 'setProfilePublic');

    const timezoneSelectMenu = document.querySelector('#timezone-select');
    const selectedOption = timezoneSelectMenu.options[timezoneSelectMenu.selectedIndex];
    window.localStorage.setItem('timezone', selectedOption.value);
}


/**
 * Sets up the alert banner
 */
function setUpAlertBanner() {
    const alertBanner = document.querySelector('#alert-banner-container');
    const alertBannerCloseButton = document.querySelector('#alert-banner-close-btn');
    // Removes the alert banner from the HTML document when it is closed
    alertBannerCloseButton.addEventListener('click', () => {
        alertBanner.parentElement.removeChild(alertBanner);
        // alertBanner.style.animation = 'alert-banner-open .5s ease-out forwards';
    });
}

/**
 * Adds an event listener when the send message button is clicked
 */
function setUpSendMessageButton() {
    const messageSendButton = document.querySelector('#message-user-submit-btn');
    messageSendButton.addEventListener('click', checkUserMessage);
}


/**
 * Checks that a valid user was entered and a message was entered
 * Displays an alert (success or error)
 */
function checkUserMessage() {
    const userField = document.querySelector('#message-user-search');
    const userFieldList = document.querySelector('#user-list').options;
    const messageField = document.querySelector('#message-user-message');
    let userFound = false;

    if (userField.value.length === 0) {
        // No user selected
        displayAlert('error', 'No User Selected', 'Please enter a user whom you whish to message.');
        return;
    } else {
        // Checks if a valid user was selected 
        const selectedUser = userField.value;
        Array.from(userFieldList).forEach(nameElement => {
            if (selectedUser === nameElement.value) {
                userFound = true;
            }
        });
        if (!userFound) {
            // User entered was not a valid user
            displayAlert('error', 'Invalid User Selected', 'Please enter a valid user whom you whish to message.');
            return;
        }
    }
    
    if (messageField.value.length === 0) {
        // No message entered
        displayAlert('error', 'No Message Entered', 'Please enter a message to send.');
    } else {
        // Success
        displayAlert('success', 'Success', 'Your message has been sent.');
    }
}

/**
 * Displays an alert at the top of the screen
 * @param {*} type Alert type string ('success' or 'error')
 * @param {*} title Alert title
 * @param {*} message Alert message
 */
function displayAlert(type, title, message) {
    // Creates the alert container
    const alertContainer = document.createElement('div');
    alertContainer.classList = 'alert alert-' + type;

    // Creates the alert title
    const alertTitle = document.createElement('h2');
    alertTitle.className = 'alert-title';
    alertTitle.textContent = title;
    alertContainer.appendChild(alertTitle);

    // Creates the alert message
    const alertMessage = document.createElement('p');
    alertMessage.className = 'alert-message';
    alertMessage.textContent = message;
    alertContainer.appendChild(alertMessage);

    // Creates the alert close button
    const closeButton = document.createElement('img');
    closeButton.className = 'alert-close-btn';
    closeButton.src = 'icons/icon-close-fa.svg';
    closeButton.alt = "Close Button";
    closeButton.addEventListener('click', () => {
        bodyElement.removeChild(alertContainer);
    });
    alertContainer.appendChild(closeButton);

    // Appends the alert to the body element
    const bodyElement = document.querySelector('body');
    bodyElement.appendChild(alertContainer);
}


/**
 * Adds an event listener when the alert bell button is clicked
 */
function setUpAlertBellButton() {
    document.querySelector('#alert-icon').addEventListener('click', showHideNotifications);
}


/**
 * Shows notifications if they are hidden and vice versa
 */
function showHideNotifications() {
    const notificationsContainer = document.querySelector('#notifications');
    if (notificationsContainer.style.display === 'none') {
        notificationsContainer.style.display = 'block';
    } else {
        notificationsContainer.style.display = 'none';
    }
}

/**
 * Creates notification elements but hides them until the notification bell is clicked on
 */
function setUpNotifications() {
    const notificationsContainer = document.createElement('div');
    notificationsContainer.id = 'notifications';
    notificationsContainer.style.display = 'none';

    // Notification 1
    const notificationContainer1 = document.createElement('div');
    notificationContainer1.className = 'notification';
    notificationsContainer.appendChild(notificationContainer1);
    
    const notificationTitle1 = document.createElement('h3');
    notificationTitle1.className = 'notification-title'
    notificationTitle1.textContent = "Notification 1"
    notificationContainer1.appendChild(notificationTitle1);

    const notificationMessage1 = document.createElement('p');
    notificationMessage1.className = 'notification-message';
    notificationMessage1.textContent = "This is the first test notification";
    notificationContainer1.appendChild(notificationMessage1);

    // Notification 2
    const notificationContainer2 = document.createElement('div');
    notificationContainer2.className = 'notification';
    notificationsContainer.appendChild(notificationContainer2);
    
    const notificationTitle2 = document.createElement('h3');
    notificationTitle2.className = 'notification-title'
    notificationTitle2.textContent = "Notification 2"
    notificationContainer2.appendChild(notificationTitle2);

    const notificationMessage2 = document.createElement('p');
    notificationMessage2.className = 'notification-message';
    notificationMessage2.textContent = "This is the second test notification";
    notificationContainer2.appendChild(notificationMessage2);

    const bodyElement = document.querySelector('body');
    bodyElement.appendChild(notificationsContainer);
}