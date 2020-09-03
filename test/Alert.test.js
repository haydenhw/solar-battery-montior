const { VoltageAlert, VoltageAlertManager } = require('../src/alerts/Alerts')

describe('VoltageAlertManager', () => {
  test('Should trigger one and only one alert', () => {
    const presentVoltage = 12.4
    const alertManager = new VoltageAlertManager()
    const alertOne = new VoltageAlert(12.3, true)
    const alertTwo = new VoltageAlert(12.5, true)

    alertOne.trigger = jest.fn()
    alertTwo.trigger = jest.fn()
    alertManager.addAlert(alertOne)
    alertManager.addAlert(alertTwo)
    alertManager.handleVoltageUpdate(presentVoltage)

    expect(alertOne.trigger).not.toBeCalled()
    expect(alertTwo.trigger).toBeCalled()
  })

  test('Should trigger an alert', () => {
    const presentVoltage = 12.2
    const alertManager = new VoltageAlertManager()
    const alertOne = new VoltageAlert(12.3, true)

    alertOne.trigger = jest.fn()
    alertManager.addAlert(alertOne)
    alertManager.handleVoltageUpdate(presentVoltage)

    expect(alertOne.trigger).toBeCalled()
  })

  test('Should have list of alerts of length 2', () => {
    const alertManager = new VoltageAlertManager()
    const alertOne = new VoltageAlert(12.3, true)
    const alertTwo = new VoltageAlert(12.4, true)

    alertManager.addAlert(alertOne)
    alertManager.addAlert(alertTwo)

    expect(alertManager.getAlerts()).toHaveLength(2)
  })

  test('Should call trigger method if new voltage is less than threshold', () => {
    const testVoltage = 12.3
    const alertOne = new VoltageAlert(12.4, true)
    alertOne.trigger = jest.fn()
    alertOne.triggerIfNewVoltageExceedsThreshold(testVoltage)
    expect(alertOne.trigger).toBeCalledTimes(1)
  })
})



