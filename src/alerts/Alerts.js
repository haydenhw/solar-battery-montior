class VoltageAlertManager {
  constructor() {
    this.alerts = []
  }

  addAlert(alert) {
    this.alerts.push(alert)
    // sort alerts by threshold
  }

  getAlerts() {
    return this.alerts
  }

  triggerAlertsWithThresholdsBelowVoltage(voltage) {
    // TODO write a comment about how this method works in terms of alert priority
    for (const alert of this.alerts) {
      if (alert.triggersAtVoltage(voltage)) {
        alert.trigger()
        return
      }
    }
  }

  handleVoltageUpdate(voltage) {
    this.triggerAlertsWithThresholdsBelowVoltage(voltage)
  }
}


class VoltageAlert {
  constructor(threshold, triggersBelowThreshold) {
    this.threshold = threshold
    this.triggersBelowThreshold = triggersBelowThreshold
    this.triggersAboveThreshold = !triggersBelowThreshold
  }

  isAboveThreshold(voltage) {
    return voltage > this.threshold
  }

  isBelowThreshold(voltage) {
    return voltage < this.threshold
  }

  triggersAtVoltage(voltage) {
    return (
      this.triggersBelowThreshold && this.isBelowThreshold(voltage) ||
      this.triggersAboveThreshold && this.isAboveThreshold(voltage)
    );
  }

  // TODO delete this method if not needed ?
  triggerIfNewVoltageExceedsThreshold(voltage) {
    if (this.triggersAtVoltage(voltage)) {
      this.trigger()
    }
  }

  trigger() {
    // send email/SMS/desktop notifications, etc ...
  }
}

const voltageAlertManager = new VoltageAlertManager()
Object.freeze(voltageAlertManager)

module.exports = {
  voltageAlertManager,
  VoltageAlert
}
