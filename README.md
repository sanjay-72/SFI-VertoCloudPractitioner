
# <p align="right">🚀<a  target = "_blank" href = "https://github.com/sanjay-72/SFI-VertoCloudPractitioner/">Visit now</a></p> FruitFul

### A direct sell trading platform connecting the farmers and traders
This is solution developed by Verto Cloud Practitioner team in Solving for India Hackathon - 2023 held by Geeks For Geeks in corporation with Google 
Cloud Platform and AMD.

Document link : <a href="https://docs.google.com/document/d/1y9t6MsnguiRjqG6XbdPPva-CGq5xhKVKIHsgqhPy3H4/edit?usp=sharing">FruitFul-Report</a>

Video Demo link : 

![end devices](https://user-images.githubusercontent.com/94420508/229655286-cca22d3c-75dd-469d-a581-bbed0687e9c7.jpg)

## Problem
Farmers in India realize only about 8-10% of their final harvest, compared to upwards of 30% in developed markets. This depreciation is due to complexities in the 
conventional supply chain which is benefitting many people indirectly other than farmers and even the government is trying to regulate this supply chain 
using Rythu-Bazaars. 

In addition to this, there is no unified IOT platform for the farmers to monitor their farm and plan necessary things in case of any bad weather conditions. 

## Our solution

We are presenting FruitFul, a MERN-based full-stack web application which acts as a platform that connects farmers, traders, and common people in addition to 
customized IOT features for the farmers to help them monitor their farm to increase the yielding by following the best practices.

This application is not a biased solution to a particular problem in agro tech. This is made to solve most of the problems that can be solved in one go. So that 
farmers can find this helpful because they can do many things in one app like they can see the market status, and sell their products and even IOT is embedded 
in it making this an all-rounder solution for many of the problems that are faced by many people right now in agro tech.

### Technologies, frameworks and libraries used
1. NodeJS - for creating server-side web application.
2. ExpressJS - it is a framework of NodeJS used for running the application.
3. MongoDB - as a data storage.
4. BCrypt - as a password hasher tool.
5. PassportJS - for authentication.
6. EJS - for templating.
7. HTML - for writing the content on the web page.
8. CSS - for styling the html content.
9. ThingSpeak - Used as IOT tool for collecting data for monitoring the farm.


# High level Architecture

![FruitFul High level Architecture](https://user-images.githubusercontent.com/94420508/229657895-0a7a6111-f802-4668-9a53-e20b041eaf94.jpeg)

1. Firstly, any user can access the home page without logging in but, when they need to access market page or IOT page then they must login.
2. Any user can firstly register in the FruitFul and then can login.
3. There are simple validation techniques used for email, age and password to maintain data integrity and security. ![Login Difference](https://user-images.githubusercontent.com/94420508/229661705-51506c3e-c829-4ca7-a55b-c41ca506ebbf.jpeg)
4. Once they are logged in, the main page shows the user's name and they can access market. 
5. In Sell/Buy page they can see the list of products that are available for trade by farmers.
6. In same page if the user want to sell any product they can directly click sell online button provided on the navigation bar.
7. Products entered in that page will be directly shown in market place.
8. After lisiting the product online if the user want to remove products then he can go to "my products" page and can directly remove the product.
9. Once the user is authenticated then they can access IOT page but, they don't have any devices registered because the devices has to be manually entered to database.
10. For demonstration purpose we entered few sensory data to IOT page for our own account which is shown in video page.

# Internal Architecture

![Internal Architecture](https://user-images.githubusercontent.com/94420508/229662738-f091086f-cec3-4030-893e-eea576ae7b2e.jpeg)

# Features
1. Secured and responsive design.
2. Simple in architecture.
3. Easy to understand and use.
4. Farmers can create accounts and sell their products.
5. Farmers can add products directly.
6. They can remove and update their list of products.
7. Buyers can buy products directly after the creation of the account.
8. All the crucial info like database urls and secrets are stored safely.
9. Customized IOT can be implemented for the farmers.
10. Buyers can contact farmers easily.

Everything is explained in depth in video and document please take a look at them.
