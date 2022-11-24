input.onPinPressed(TouchPin.P1, function () {
    radio.sendValue("love", 0)
})
radio.onReceivedValue(function (name, value) {
    if (name == "speed") {
        if (value < 0) {
            Rover.setRGBLED(Rover.ledIndex(LEDIndex.LED2_3), Rover.rgb(159, 128, 33))
        } else {
            Rover.setRGBLED(Rover.ledIndex(LEDIndex.LED1_4), Rover.rgb(159, 128, 33))
        }
        Rover.Move(value)
    }
    if (name == "left") {
        Rover.setRGBLED(Rover.ledIndex(LEDIndex.LED1), Rover.rgb(159, 128, 33))
        Rover.MotorRunDual(0, 250)
    }
    if (name == "STOP") {
        serial.writeString("robot STOP")
        Rover.setALLRGB(Rover.colors(RoverColors.Black))
        Rover.MotorStopAll(MotorActions.Stop)
        Rover.MotorRunDual(0, 0)
        Rover.Move(0)
    }
    if (name == "rite") {
        serial.writeString("rite")
        Rover.setRGBLED(Rover.ledIndex(LEDIndex.LED4), Rover.rgb(159, 128, 33))
        Rover.MotorRunDual(250, 0)
    }
    if (name == "love") {
        basic.showIcon(IconNames.Heart)
        basic.pause(1000)
    }
})
let Z = 0
let Y = 0
let X = 0
radio.setGroup(1)
basic.forever(function () {
    X = pins.analogReadPin(AnalogPin.P4)
    Y = pins.analogReadPin(AnalogPin.P0)
    serial.writeLine("" + convertToText(X) + ("\",\"" + convertToText(Y)))
    Z = X * -1 + 1024
    basic.clearScreen()
    if (Y > 700) {
        radio.sendValue("speed", 500)
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
    if (X > 700) {
        serial.writeString("rite")
        radio.sendValue("rite", 0)
    }
    led.plot(Z / 205, Y / 205)
})
