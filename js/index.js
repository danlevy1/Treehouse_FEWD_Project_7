// Global Variables
let primaryButtonColor = '#7477bf';
let secondaryButtonColor = '#b2b2b2';

// Traffic Line Chart
const trafficLineChartCanvas = document.querySelector("#traffic-chart");
const trafficLineChart = new Chart(trafficLineChartCanvas, {
    type: "line",
    data: {
        labels: [
            "16-22",
            "23-29",
            "30-5",
            "6-12",
            "13-19",
            "20-26",
            "27-3",
            "4-10",
            "11-17",
            "18-24",
            "25-31"
        ],
        datasets: [
            {
                label: "Traffic",
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

// Daily traffic bar chart
const dailyTrafficBarChartCanvas = document.querySelector("#daily-traffic-chart");
const dailyTrafficBarChart = new Chart(dailyTrafficBarChartCanvas, {
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

// Mobile users doughnut chart
const mobileUsersDoughnutChartCanvas = document.querySelector("#mobile-users-chart");
const mobileUsersDoughnutChart = new Chart(mobileUsersDoughnutChartCanvas, {
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


// On-Off Switch
const onOffSwitches = document.querySelectorAll('.on-off-switch');
const onOffSwitchCheckboxes = document.querySelectorAll('.on-off-switch-checkbox');
const onOffSwitchTextOn = document.querySelectorAll('.on-off-switch-text-on');
const onOffSwitchTextOff = document.querySelectorAll('.on-off-switch-text-off');

for (let i = 0; i < onOffSwitchCheckboxes.length; i ++) {
    onOffSwitchCheckboxes[i].addEventListener('click', () => {
        onOffSwitchChanged(onOffSwitches[i], onOffSwitchCheckboxes[i], onOffSwitchTextOn[i], onOffSwitchTextOff[i])
    });
}

function onOffSwitchChanged(onOffSwitch, checkbox, onText, offText) {
    if (checkbox.checked) {
        onOffSwitch.style.backgroundColor = primaryButtonColor;
        onText.style.display = 'block';
        offText.style.display = 'none';
    } else {
        onOffSwitch.style.backgroundColor = secondaryButtonColor;
        onText.style.display = 'none';
        offText.style.display = 'block';
    }
}


// Timezone select menu
const timezoneSelectMenu = document.querySelector('#timezone-select');
timezoneSelectMenu.addEventListener('change', () => {
    const selectedOption = timezoneSelectMenu.options[timezoneSelectMenu.selectedIndex];
    if (selectedOption.disabled) {
        timezoneSelectMenu.style.color = '#bababa';
    } else {
        timezoneSelectMenu.style.color = '#666666';
    }
});


// Alert Banner
const alertBanner = document.querySelector('#alert-banner-container');
const alertBannerCloseButton = document.querySelector('#alert-banner-close-btn');
alertBannerCloseButton.addEventListener('click', () => {
    alertBanner.parentElement.removeChild(alertBanner);
    // alertBanner.style.animation = 'alert-banner-open .5s ease-out forwards';
});


// Message Alerts
const messageSendButton = document.querySelector('#message-user-submit-btn');
messageSendButton.addEventListener('click', checkMessage);

function checkMessage() {
    const userField = document.querySelector('#message-user-search');
    const messageField = document.querySelector('#message-user-message');
    if (userField.value.length === 0) {
        displayAlert('error', 'No User Selected', 'Please enter a user whom you whish to message.')
    } else if (messageField.value.length === 0) {
        displayAlert('error', 'No Message Entered', 'Please enter a message to send.')
    } else {
        displayAlert('success', 'Success', 'Your message has been sent.');
    }
}

function displayAlert(type, title, message) {
    const bodyElement = document.querySelector('body');
    const alertContainer = document.createElement('div');
    alertContainer.classList = 'alert alert-' + type;

    const alertTitle = document.createElement('h2');
    alertTitle.className = 'alert-title';
    alertTitle.textContent = title;
    alertContainer.appendChild(alertTitle);

    const alertMessage = document.createElement('p');
    alertMessage.className = 'alert-message';
    alertMessage.textContent = message;
    alertContainer.appendChild(alertMessage);

    const closeButton = document.createElement('img');
    closeButton.className = 'alert-close-btn';
    closeButton.src = 'icons/icon-close-fa.svg';
    closeButton.alt = "Close Button"
    closeButton.addEventListener('click', () => {
        bodyElement.removeChild(alertContainer);
    });
    alertContainer.appendChild(closeButton);

    bodyElement.appendChild(alertContainer);
}
