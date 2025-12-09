jQuery(function () {
    function timer(clockID, exp_date) {
      var countDownDate = new Date(exp_date).getTime();
      var x = setInterval(function () {
        var now = (new Date).getTime();
        var distance = countDownDate - now;
        var days = Math.floor(distance / 864e5);
        var hours = Math.floor(distance % 864e5 / 36e5);
        var minutes = Math.floor(distance % 36e5 / 6e4);
        var seconds = Math.floor(distance % 6e4 / 1e3);
        var days = days < 10 ? "0" + days : days;
        var hours = hours < 10 ? "0" + hours : hours;
        var minutes = minutes < 10 ? "0" + minutes : minutes;
        var seconds = seconds < 10 ? "0" + seconds : seconds;
        document.getElementById("days").innerHTML = days;
        document.getElementById("hours").innerHTML = hours;
        document.getElementById("mins").innerHTML = minutes;
        document.getElementById("secs").innerHTML = seconds;
        if (distance < 0) {
          clearInterval(x);
          document.getElementById(clockID).innerHTML = "EXPIRED";
        }
      }, 1e3);
    }
    var back_top = jQuery(".backtop");
    jQuery(window).scroll(function () {
      if (jQuery(this).scrollTop() > 500) {
        back_top.addClass("show_icon");
      } else {
        back_top.removeClass("show_icon");
      }
    });
    if (jQuery("#progressbar").length > 0) {
      jQuery("#progressbar").progressbar({value: 70});
    }
    if (jQuery("#progressbar2").length > 0) {
      jQuery("#progressbar2").progressbar({value: 70});
    }
    if (jQuery("#horizontalTab").length > 0) {
      jQuery("#horizontalTab").easyResponsiveTabs({type: "default", width: "auto", fit: true, activate: function () {
        var $tab = jQuery(this);
        var $info = jQuery("#tabInfo");
        var $name = jQuery("span", $info);
        $name.text($tab.text());
        $info.show();
      }});
    }
    if (jQuery("#chart1").length > 0) {
      var ctx = document.getElementById("chart1");
      var myChart = new Chart(ctx, {type: "pie", data: {labels: ["Public Pre Sale", "Reserved Fund", "Advisor Team", "Sold Globaly", "Financial"], datasets: [{label: "# of Votes", data: [10, 8, 12, 50, 20], backgroundColor: ["#4845b4", "#4fc489", "#0ba1d6", "#efe943", "#e9734a"], borderWidth: 0, hoverOffset: false}]}, options: {legend: {display: false}}});
    }
    if (jQuery("#chart2").length > 0) {
      var ctx = document.getElementById("chart2");
      var myChart = new Chart(ctx, {type: "pie", data: {labels: ["Top Cummunity", "Reserved Fund", "Advisor Team", "Sold Globaly", "Financial"], datasets: [{label: "# of Votes", data: [20, 50, 25, 15, 7], backgroundColor: ["#4845b4", "#4fc489", "#0ba1d6", "#efe943", "#e9734a"], borderWidth: 0}]}, options: {legend: {display: false}}});
    }
    if (jQuery("#clock").length > 0) {
      var exp_date = "Dec 30, 2023 15:37:20";
      timer("clock", exp_date);
    }
    if (jQuery("#clock2").length > 0) {
      var exp_date = "Dec 25, 2023 10:17:25";
      timer("clock2", exp_date);
    }
    if (jQuery("#clock3").length > 0) {
      var exp_date = "Dec 20, 2023 20:50:40";
      timer("clock3", exp_date);
    }
    if (jQuery(".timeline").length > 0) {
      timeline(document.querySelectorAll(".timeline"), {forceVerticalMode: 767, mode: "horizontal", verticalStartPosition: "left", visibleItems: 4});
    }
    if (jQuery(".video-button").length > 0) {
      jQuery(".video-button").modalVideo({youtube: {autoplay: 1, controls: 1}, ratio: "16:9"});
    }
    if (jQuery(".client-logos-slider").length > 0) {
      jQuery(".client-logos-slider").owlCarousel({items: 6, margin: 0, loop: true, autoplay: true, mouseDrag: true, touchDrag: true, navText: ['<i class="fas fa-angle-left"></i>', '<i class="fas fa-angle-right"></i>'], nav: false, dotsEach: false, smartSpeed: 750, dots: false, lazyLoad: true, responsive: {0: {items: 2}, 480: {items: 3}, 767: {items: 4}, 991: {items: 5}, 992: {items: 6}}});
    }
    if (jQuery(".wow").length > 0) {
      jQuery(function () {
        var wow = new WOW({boxClass: "wow", animateClass: "animated", offset: 0, mobile: false, live: true, scrollContainer: null});
        wow.init();
      });
    }
  }); 
   
  