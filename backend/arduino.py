
import serial

ser = serial.Serial("/dev/ttyACM0")

while(True):
    ser.write(b'a')



