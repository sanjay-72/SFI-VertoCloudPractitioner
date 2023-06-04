
# <p align="right">🚀<a  target = "_blank" href = "https://fruitful.social/">Visit now</a></p> FruitFul

### All in one solution for Indian Agriculture industry - 2023
This is the solution developed by our team Verto Cloud Practitioners in Solving for India - 2023 Hackathon conducted by Geeks For Geeks in corporation with Google Cloud and AMD. We kept on updating the app for all the rounds. We won the Instutional Round in April '23, the Regional Round(North-India) in May '23 and looking for our place in National Round in June '23.


Document link : <a href="https://docs.google.com/document/d/1y9t6MsnguiRjqG6XbdPPva-CGq5xhKVKIHsgqhPy3H4/edit?usp=sharing">FruitFul-Report</a>

![end devices](https://github.com/sanjay-72/SFI-VertoCloudPractitioner/assets/94333583/4b317486-5792-440a-9931-0fc324d94481)


## Problem
Farmers in India realize only about 8-10% of their final harvest, compared to upwards of 30% in developed markets. This depreciation is due to complexities in the 
conventional supply chain which is benefitting many people indirectly other than farmers and even the government is trying to regulate this supply chain 
using Rythu-Bazaars. 

In addition to this, there is no unified IOT platform for the farmers to monitor their farm and plan necessary things in case of any bad weather conditions. 

## Our solution

We are presenting FruitFul, a MERN-based full-stack web application which acts as a platform that connects farmers, traders, and common people. In addition to this, we also have customized IOT features for registered farmers to help them monitor their farm to increase the yielding by following the best practices.

This application is not a biased solution to a particular problem in agro tech. This is made to solve most of the problems which can be solved in one go. So that 
farmers can find this helpful because they can do many things in one app like they can see the market status, and sell their products and even IOT is embedded 
in it is making this an all-rounder solution for many of the problems that are faced by many people right now in agro tech.

# High level Architecture (Market)
![Market Architecture](https://github.com/sanjay-72/SFI-VertoCloudPractitioner/assets/94333583/e19a2fcb-37a0-47ec-a92d-a986c4704044)

# High level Architecture (i-Smart)
![i-Smart Architecture](https://github.com/sanjay-72/SFI-VertoCloudPractitioner/assets/94333583/8a4fb38f-3e9f-4691-b626-ea4964ce5c42)

# Features
1. Secured HTTPs protocal is used with domain name.
2. OTP verification for new users.
3. IOT integration in i-Smart portal.
4. Live weather data in i-Smart portal.
5. Farmers can create accounts and sell their products directly.
6. They can remove and update their list of products.
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
7. Twilio - Used for mobile verification of new customers.
8. NodeMailer - For sending acknowledgements to customers and notifying admin for any actions.
9. OpenWeather - For getting location specific weather details.


## <p align="center">Everything is explained in depth in video and document please take a look at them.</p>

Document link : <a href="https://docs.google.com/document/d/1y9t6MsnguiRjqG6XbdPPva-CGq5xhKVKIHsgqhPy3H4/edit?usp=sharing">FruitFul-Report</a>
