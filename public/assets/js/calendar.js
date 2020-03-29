$(document).ready(function(){
    // FOR TOOLTIP 
    $('[data-toggle="tooltip"]').tooltip();

    // FOR CALENDAR 
    var day = "";
    var mon = new Date().getMonth();
    var year = new Date().getFullYear();
    
    var currentDate = new Date();
    var date = new Date(year, mon);

    var dayOfWeek;
    var highlighted = 0;
    var count = 0;
    var selectedDates ={};

    function firstDay() { 
      return new Date(date.getFullYear(), date.getMonth(), 1); 
    } 

    function daysInMonth() { 
      return new Date(date.getFullYear(), date.getMonth()+1, 0).getDate(); 
    } 

    var month = new Array();
    month[0] = "January";
    month[1] = "February";
    month[2] = "March";
    month[3] = "April";
    month[4] = "May";
    month[5] = "June";
    month[6] = "July";
    month[7] = "August";
    month[8] = "September";
    month[9] = "October";
    month[10] = "November";
    month[11] = "December";

    var week = new Array();
    week[0] = "S";
    week[1] = "M";
    week[2] = "T";
    week[3] = "W";
    week[4] = "H";
    week[5] = "F";
    week[6] = "S";

    $("#cal-left").click(function(){
      if (mon == 0){
        mon = 11;
        year--;
      } else {
        mon--;
      }
      date = new Date(year, mon);
      printDate(month[mon], year);
      $("#cal-body").html("");
      calendarLoop();
    });

    $("#cal-right").click(function(){
      if (mon == 11){
        mon = 0;
        year++;
      } else {
        mon++;
      }
      date = new Date(year, mon);
      printDate(month[mon], year);
      $("#cal-body").html("");
      calendarLoop();
    });

    function printDate(getmonth, getyear) {
      var n = getmonth + " " + getyear;
      $("#cal-title").text(n);
    }

    // Loop for calendar days
    function calendarLoop() {
      var dayincrement = 1;

      for (i = 0; i < 6; i++) {
        var row = document.createElement("tr");

        for (j = 0; j < 7; j++) {
          var dayContainer;
          var dayContainerText;
          if (i === 0 && j < firstDay().getDay()) {
            dayContainer = document.createElement("td");
            dayContainerText = document.createTextNode("");
            dayContainer.appendChild(dayContainerText);
            row.appendChild(dayContainer)
          } else if (dayincrement > daysInMonth()) {
            break;
          } else {
            dayContainer = document.createElement("td");
            var date = new Date(year, mon, dayincrement);
            dayContainerText = document.createTextNode(dayincrement);
            if((date < currentDate) || (date.getDay() == 0 || date.getDay() == 6)) {
              dayContainer.style.fontWeight  = "200";
              dayContainer.style.fontColor = "#ffffff";
            }                 
            dayContainer.appendChild(dayContainerText);
            row.appendChild(dayContainer);
            dayincrement++;
          }
        }

        $("#cal-body").append(row);
      }
    }
    printDate(month[date.getMonth()], date.getFullYear());
    calendarLoop();

    var selected = null;

    $("table").delegate("td", "click", function(){
      date = new Date(year, mon, parseInt($(this).text()));
      if (date <= currentDate){
        alert('You can only choose a day that is starting from tomorrow!');
      } else if (date.getDay() == 0 || date.getDay() == 6) {
        alert('You cannot choose Saturday nor Sunday!');
      } else {
        if(selected !== null){
          selected.setAttribute("style", "font-weight: 500; color: #00703c;")
        }
        selected = this;
        this.setAttribute("style", "font-weight: bolder; color: #00703c;");
        day = $(this).text();
      }
    });
    
    // FOR TIME AND DESTINATION 
    var time = "";
    var destination = "";

    $(".timelist-body").click(function(){
      $(".timelist-body").css('color', 'black');
      $(".timelist-body").css('font-weight', 'normal');
      this.setAttribute("style", "font-weight: bolder; color: #00703c;");

      if (this.id == "mnllgn"){
        destination = "MNL > LGN";
      } else if (this.id == "lgnmnl"){
        destination = "LGN > MNL";
      }
      
      time = $(this).text();
      var alertstring = 'You chose ' + time + ' on ' + month[date.getMonth()] + ' ' + day + ', ' + date.getFullYear() +  ' and route is ' + destination
      var formattedDate = date.getMonth()+1 + "/" + day + "/" + date.getFullYear();

      alert(alertstring);

      var rider = $("#rider-user").val();

      $("#summary-user").text(rider);
      $("#summary-date").text(formattedDate);
      $("#summary-time").text(time);
      $("#summary-destination").text(destination);
    });

    $("#submit").click(function(){
      window.location.href = "reserve-success-admin";
    });

    // Highlight date

  })