# DLSU Arrows Express Line 1 Reservation [x22g5]
This is a web application that allows students and faculty members to make a reservation for the Arrows Express Line 1 shuttle service of DLSU.

## Features
### Universal
* Log-in
* Sign-up
* Make reservations
* View reservations
* Delete reservations
* View and edit profile information
### Rider
* Priority system
* Note: Must signup first to populate the database
### Administrator
* Edit reservations
* Accept or reject pending reservations
* Note: If an Administrator wants to edit a rider's status,
        the admin must only enter "Approved, Rejected, or Pending" specifically

## Setting up

### Prerequisites
``````
Git
MongoDB
Node.js
``````

### Installing
A step-by-step process on how to run the web application

1. Open Terminal or Command Prompt

2. Clone repository
``````
git clone https://github.com/ccapdev1920T2/x22g5.git
``````

3. Install npm packages
``````
npm install
``````

4. Run add_data.js (creates database and admin user)
``````
node add_data.js

The following will be added to the database: 
username: arren_antioquia
password: hatdog
firstname: Dr.Arren
email: arren_antioquia@dlsu.edu.ph
lastname: Antioquia
``````

5. Run index.js
``````
node index.js
``````

6. Open browser and access application
``````
localhost:3000
``````

7. Or, you can access the web application through Heroku
``````
https://arrows-express.herokuapp.com
``````

## Built with
* Bootstrap
* FontAwesome
* Node.js
* AngularJS
* MongoDB

## Authors

* Pauline Carandang
* Aileen Sabellon
* Stephen Salamante

## Acknowledgement

A legendary Doctor once said "bibigyan ko ng 4.0 yung group 5" 
