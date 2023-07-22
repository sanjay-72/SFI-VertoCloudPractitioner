
# <p align="right">🚀<a  target = "_blank" href = "https://fruitful.social/">Visit now</a></p> FruitFul

### All in one solution for Indian Agriculture industry - 2023
This is the solution developed by our team Verto Cloud Practitioners in Solving for India - 2023 Hackathon conducted by Geeks For Geeks in corporation with Google Cloud and AMD. We kept on updating the app for all the rounds. We won the Instutional Round in April '23, the Regional Round(North-India) in May '23 and looking for our place in National Round in June '23.

![end devices](https://github.com/sanjay-72/SFI-VertoCloudPractitioner/assets/94333583/2b2e8cda-6740-4c6c-a28c-323915b9a7fc)

Document link : <a href="https://docs.google.com/document/d/1y9t6MsnguiRjqG6XbdPPva-CGq5xhKVKIHsgqhPy3H4/edit?usp=sharing">FruitFul-Report</a>



## Problem
Farmers in India realize only about 8-10% of their final harvest, compared to upwards of 30% in developed markets. This depreciation is due to complexities in the conventional supply chain. 
For an e-commerce platform of agricultural products buyers are having only reviews as the base for buying a product which is not effective in case of agricultural products.

## Our solution

We made FruitFul, a MERN-based full-stack web application which acts as a platform that connects farmers, traders, and common people. In addition to this, we are introducing a completely new dimension(Organic Quality Sensing) for the buyers online to see how good the product is.

This application is not a biased solution to a particular problem in agro tech. This is made to solve most of the problems which can be solved in one go. So that 
farmers can find this helpful because they can do many things in one app like they can see the market status, and sell their products and even IOT is embedded 
in it is making this an all-rounder solution for many of the problems that are faced by many people right now in agro tech.

# High level Architecture (Market)
![Market Architecture](https://github.com/sanjay-72/SFI-VertoCloudPractitioner/assets/94333583/e19a2fcb-37a0-47ec-a92d-a986c4704044)

# High level Architecture (i-Smart)
![i-Smart Architecture](https://github.com/sanjay-72/SFI-VertoCloudPractitioner/assets/94333583/834e08d5-f138-4278-b0c5-a2d657167bc3)


# Features
1. Secured HTTPs protocal is used with domain name.
2. OTP verification for new users.
3. IOT integration in i-Smart portal.
4. Live weather data in i-Smart portal.
5. Farmers can create accounts and sell their products directly.
6. AI based crop suggestions for better yielding.
7. Payment gateway integration.
8. Stylish email delivery system is implemented for market and iot.
9. Secret and highly secured admin portal (Not accessible to normal users).
10. IOT caluclator for cost estimation and direct request.

# Network Model
![Network Model](https://github.com/sanjay-72/SFI-VertoCloudPractitioner/assets/94333583/8d006a90-e185-462c-8f53-39c8be423df8)

# User Authentication
![User Authentication](https://github.com/sanjay-72/SFI-VertoCloudPractitioner/assets/94333583/b3883978-0eba-47ca-95ab-c796f176ecdb)

# Accessing secret admin portal
![Accessing admin portal](https://github.com/sanjay-72/SFI-VertoCloudPractitioner/assets/94333583/5c9c5f78-9517-48e7-b31f-3d99b5c94c35)

# Admin Privileges
![Admin Privileges](https://github.com/sanjay-72/SFI-VertoCloudPractitioner/assets/94333583/7a3d006a-5cd6-4dbf-bcd5-a2a3c9681a35)

# Technologies, frameworks and libraries used
1. NodeJS - for creating server-side web application.
2. ExpressJS - it is a framework of NodeJS used for running the application.
3. MongoDB - as a data storage.
4. BCrypt - as a password hasher tool.
5. PassportJS - for authentication.
6. EJS - for templating.
7. HTML - for writing the content on the web page.
8. CSS - for styling the html content.
9. ThingSpeak - Used as IOT tool for collecting data for monitoring the farm.

# Services involved
1. Name.com - Name.com is our domain name provider for <a  target = "_blank" href = "https://fruitful.social/">fruitful.social</a> domain.
2. Cloud DNS - DNS zone is created for our domain in GCP to direct request to instance group.
3. SSL - We took a google managed SSL certificate to make our requests secured.
4. Load Balancers - For balancing load among all the servers.
5. Stripe - Handles all the payment related tasks.
6. ThingSpeak - IOT cloud data storage and visualisations.
7. OpenAI - for crop suggestions.
8. Twilio - Used for mobile verification of new customers.
9. NodeMailer - For sending acknowledgements to customers and notifying admin for any actions.
10. OpenWeather - For getting location specific weather details.


## <p align="center">Everything is explained in depth in video and document please take a look at them.</p>

Document link : <a href="https://docs.google.com/document/d/1y9t6MsnguiRjqG6XbdPPva-CGq5xhKVKIHsgqhPy3H4/edit?usp=sharing">FruitFul-Report</a>
