#include "ThingSpeak.h"
#include <ESP8266WiFi.h>

// Replace your wifi credentials here
const char* ssid = "UserName"; // Replace with your Wifi Name
const char* password = "Password"; // Replace with your wifi Password

// Change your channel number here
unsigned long channel = 2065105; // Replace with your own ThingSpeak Account Channle ID

// 1, 2, 3 and 4 are channel fields. You don't need to change if you are following this tutorial. However, you can modify it according to your application
unsigned int led1 = 1;
unsigned int led2 = 2;
unsigned int led3 = 3;
unsigned int led4 = 4;

WiFiClient client;

void setup() {
  Serial.begin(115200);
  delay(100);

  pinMode(D1, OUTPUT);
  pinMode(D2, OUTPUT);
  pinMode(D3, OUTPUT);
  pinMode(D4, OUTPUT);
  digitalWrite(D1, 0);
  digitalWrite(D2, 0);
  digitalWrite(D3, 0);
  digitalWrite(D4, 0);

  // We start by connecting to a WiFi network
  Serial.println();
  Serial.println();
  Serial.print("Connecting to ");
  Serial.println(ssid);

  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println("");
  Serial.println("WiFi connected");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());
  Serial.print("Netmask: ");
  Serial.println(WiFi.subnetMask());
  Serial.print("Gateway: ");
  Serial.println(WiFi.gatewayIP());
  ThingSpeak.begin(client);
}

void loop() {

  // Get the last data of the fields
  int led_1 = ThingSpeak.readFloatField(channel, led1);
  int led_2 = ThingSpeak.readFloatField(channel, led2);
  int led_3 = ThingSpeak.readFloatField(channel, led3);
  int led_4 = ThingSpeak.readFloatField(channel, led4);

  if (led_1 == 1) {
    digitalWrite(D1, 1);
    Serial.println("D1 is On..!");
  }
  else if (led_1 == 0) {
    digitalWrite(D1, 0);
    Serial.println("D1 is Off..!");
  }

  if (led_2 == 1) {
    digitalWrite(D2, 1);
    Serial.println("D2 is On..!");
  }
  else if (led_2 == 0) {
    digitalWrite(D2, 0);
    Serial.println("D2 is Off..!");
  }

  if (led_3 == 1) {
    digitalWrite(D3, 1);
    Serial.println("D3 is On..!");
  }
  else if (led_3 == 0) {
    digitalWrite(D3, 0);
    Serial.println("D3 is Off..!");
  }

  if (led_4 == 1) {
    digitalWrite(D4, 1);
    Serial.println("D4 is On..!");
  }
  else if (led_4 == 0) {
    digitalWrite(D4, 0);
    Serial.println("D4 is Off..!");
  }

  Serial.println(led_1);
  Serial.println(led_2);
  Serial.println(led_3);
  Serial.println(led_4);
  delay(5000);
}

