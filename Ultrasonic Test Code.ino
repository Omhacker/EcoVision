#define TRIG_PIN 5
#define ECHO_PIN 18
#define THRESHOLD_DISTANCE 10  // Set detection threshold in cm

void setup() {
    Serial.begin(115200);
    pinMode(TRIG_PIN, OUTPUT);
    pinMode(ECHO_PIN, INPUT);
}

void loop() {
    long duration;
    float distance;
    int objectDetected;

    // Clear the trigger pin
    digitalWrite(TRIG_PIN, LOW);
    delayMicroseconds(2);

    // Send a 10-microsecond pulse to trigger the sensor
    digitalWrite(TRIG_PIN, HIGH);
    delayMicroseconds(10);
    digitalWrite(TRIG_PIN, LOW);

    // Read the echo pin duration
    duration = pulseIn(ECHO_PIN, HIGH);

    // Convert to distance (in cm)
    distance = duration * 0.034 / 2;

    // Object detection logic
    if (distance > 0 && distance <= THRESHOLD_DISTANCE) {
        objectDetected = 1;  // Object detected
    } else {
        objectDetected = 0;  // No object detected
    }

    // Display results
    Serial.print("Distance: ");
    Serial.print(distance);
    Serial.print(" cm, Object Detected: ");
    Serial.println(objectDetected);

    delay(500);  // Wait before next measurement
}
