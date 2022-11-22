radio.onReceivedValue(function (name, value) {
    if (name == "speed") {
        Rover.Move(value)
    }
    if (name == "left") {
        Rover.MotorRunDual(0, 250)
    }
    if (name == "STOP") {
        serial.writeString("robot STOP")
        Rover.MotorStopAll(MotorActions.Stop)
        Rover.MotorRunDual(0, 0)
        Rover.Move(0)
    }
})
let Z = 0
let Y = 0
let X = 0
radio.setGroup(1)
Rover.MotorRunDual(0, 250)
basic.forever(function () {
    X = pins.analogReadPin(AnalogPin.P4)
    Y = pins.analogReadPin(AnalogPin.P0)
    serial.writeLine("" + convertToText(X) + ("\",\"" + convertToText(Y)))
    Z = X * -1 + 1024
    basic.clearScreen()
    if (Y > 700) {
        radio.sendValue("speed", Y)
        serial.writeString("forward")
    }
    if (X < 200) {
        radio.sendValue("left", X)
        serial.writeString("turned left")
    }
    if (300 > Y) {
        radio.sendValue("speed", -250)
    }
    if (X < 600 && X > 400 && (Y < 600 && Y > 400)) {
        serial.writeString("STOP")
        radio.sendValue("STOP", 0)
    }
    led.plot(Z / 205, Y / 205)
})
