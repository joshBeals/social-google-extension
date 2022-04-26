// Import Classes
import User from './models/User.js'; 
import Socials from './models/Socials.js'; 
import './controllers/onMessageReceived.js';

// Instantiate Classes
const user = new User();
const socials = new Socials();

window.chartColors = {
    red: 'rgb(255, 99, 132)',
    orange: 'rgb(255, 159, 64)',
    yellow: 'rgb(255, 205, 86)',
    green: 'rgb(75, 192, 192)',
    blue: 'rgb(54, 162, 235)',
    purple: 'rgb(153, 102, 255)',
    grey: 'rgb(201, 203, 207)'
};

var CurrentUser;
var ComPort;
var follow_count_num = 0;
var following_count_num = 0;
var linkedin_data = [];
var instagram_data = [];
var user_stats = [];
var last_ten_min = 1000000;
var last_ten_max = 0;
var DisplayFollowersNum = 10;
var DisplayLikesNum = 20;
var user_email = "";
var dashboardMode = 0;
var postedInst = false;
var follow_speed = 0;
var emailed = false;
var enable_get_followers = false;
var unfollow_speed = 0;
var story_speed = 0;
var unfollowInstoo = false;
var post_stats = false;
var tiktok_data = [];
var tiktok_data = [];
var hoursLeft = 8;
var twitter_data = [];
var like_speed = 0;
var follower_data = [];
var daily_data = [];
var blacklist = [];
var filters = [];
var minPhotos = 1;
var minFollowers = 100;
var minFollowing = 100;
var maxFollowers = 100000;
var maxFollowing = 100000;
var EnableFilters = false;
var update_interval = false;
var IdealTargets = [];
var addIdeal = true;
var follower_growth = 0;
var set_update = false;
var collectSelfFollowers = false;
var tiktok_speed = 0;
var twitter_speed = 0;
var facebook_speed = 0;

var unfollow_mode = false;
var DMMode = true;

var mode = "instagram";
var StartTime = "";
var AutoActions = [];
var analytics = [];
var startDate = "";
var chart_data;
var analytics_chart;
var stopDate = "";
var cal_events = [];
var activity_log = "";
var instooData = [];
var schedule_list = "";
var user_followers = [];
var calendar;
var chart3;
var chart;
var chart2;
var canvas;
var Duration = 8;
var logged_in = false;
var startedTutorial = false;
var likeCount = 0;
var myCollectJob = {};
var maxStories = 1000;
var user_plan;
var comment_speed = 0;
var global_settings = {};
var global_accounts = [];
var gotAnalytics = false;
var global_tags = [];
var global_locations = [];
var started = false;
var paid_sub = false;
var my_followers = [];
var first = false;
var cloud_backup = false;
var start_license = 0;
var last_follow_count = 0;
var clicks = {};
var version = "";

var StartReact = false;
var StartSchedule = false;
var reacts = [];

var follow_val = false;
var like_val = false;
var comment_val = false;
var unfollow_val = false;
var user_cloud = true;
var UnfollowedPoolSize = 0;
var FollowedPoolSize = 0;
var LikePoolSize = 0;
var StoryPoolSize = 0;
var CommentPoolSize = 0;
var last_day = 0;
var day = 0;
var bar_follow;
var maxLikes = 1000;
var maxFollows = 1000;
var maxUnfollows = 1000;
var maxComments = 10;
var bar_like;
var bar_story;
var bar_comment;
var bar_unfollow;
var hashtag_dict = {};
var account_dict = {};
var counted_dict = {};
var clicks_dict = {};
var email_name;
var speed_limit = 100;
var UnfollowAfterDays;
var cloud_db;

var live_snapshots = [];
var live_tags = [];
var like_accounts = [];

var selectedAccount = "";
var loadedAccounts = false;
var updated_cloud = false;
var lastProcessedHour = -1;

window.dataLayer = window.dataLayer || [];


// socials.SendMessage("minFollowing", "minFollowing", 100);


$(document).on('change', '#minPhoto', function(event) {
    d = document.getElementById("minPhoto").value;
    socials.SendMessage("minPhoto", "minPhoto", d);
});

$(document).on('change', '#maxFollower', function(event) {
    d = document.getElementById("maxFollower").value;
    socials.SendMessage("maxFollowers", "maxFollowers", d);
});

$(document).on('change', '#minFollower', function(event) {
    d = document.getElementById("minFollower").value;
    socials.SendMessage("minFollowers", "minFollowers", d);
});

$(document).on('change', '#minFollowing', function(event) {
    d = document.getElementById("minFollowing").value;
    socials.SendMessage("minFollowing", "minFollowing", d);


});

$(document).on('change', '#maxFollowing', function(event) {
    d = document.getElementById("maxFollowing").value;
    socials.SendMessage("maxFollowing", "maxFollowing", d);
});

$(document).on('click', '#whitelist-user', function(event) {
    let user = prompt("Please enter the username exactly");
    if (user) {
        let split_users = user.split(",");
        for (let kk = 0; kk < split_users.length; kk++) {
            socials.SendMessage("AddUserToWhitelistName", "username", split_users[kk].split(',').join('').split(' ').join('').split('@').join(''));
        }

        $("#add-user-results").empty();
        $("#add-user-search").val("");
    }

});

$(document).ready(function() {

    $("#userLogin").show();
  
    socials.CreateComPort();

    $("#starttiktok").parent().removeClass("hide");

    $("#startinstagram").parent().addClass("active");
    $("#starttiktok").parent().removeClass("active");
    $(document).on('click', '.remove-user-whitelist', function(event) {

        RemoveWhitelistedUser(this);

    });
    $("#userLogin").click(function() {
        socials.SendMessage("userLogin", "", "");

    });
    socials.SendMessage("GetUserStats", "", "");

    setInterval(function() {
        if(hoursLeft > 0){
        socials.SendMessage("refreshStats", "", "");
    }
        if (roughSizeOfObject(cloud_db) < 15000000) {


          
            
        }

    }, 1000 * 60 * 60)

    setInterval(function() {

        if (update_interval) {
            updated_cloud = true;
            update_interval = false;
        }

    }, 1000 * 60)




    $(document).on('click', '.add-whitelist-user', function(event) {




        AddUserToWhitelist(this);
    });
    $(document).on('click', '#whitelist-clear', function(event) {
        socials.SendMessage("ClearWhite", "", "");

    });
    $("#cloud-backup").click(function() {

        alert("Settings saved to cloud!");
        if (roughSizeOfObject(cloud_db) < 15000000) {
           
        }

    });
    $("#cloud-clear").click(function() {
        socials.SendMessage("ResetAll", "", "");

        alert("Cloud backup cleared!");
      

        socials.SendMessage("ResetAll", "", "");

    });




    version = chrome.runtime.getManifest().version;

    $('#version').attr('name', version);
    $("#sidebar-wrapper").show();
    setTimeout(function() {
        var buttons = document.getElementsByTagName('div');
        for (var kk = 0; kk < buttons.length; kk++) {

            buttons[kk].classList.remove("hide");
        }
        version = chrome.runtime.getManifest().version;

        $('#version').attr('name', version);
        $("#sidebar-wrapper").show();

    }, 5000);
    setTimeout(function() {
        var buttons = document.getElementsByTagName('div');
        for (var kk = 0; kk < buttons.length; kk++) {

            buttons[kk].classList.remove("hide");
        }
        version = chrome.runtime.getManifest().version;

        $('#version').attr('name', version);
        $("#sidebar-wrapper").show();

    }, 10000);



    $(".backup_picture").on("error", function() {
        $(this).attr('src', 'icon.png');
    });
    let user_plan = $("#plan").attr("name");
    $("#sidebar-mosaic").click(function() {
        var win = window.open('https://tagmosaic.com', '_blank');
        win.focus();
    });
    $("#overlay").show();

    $("#sidebar-home-tinder2").click(function() {
        $(".content-wrapper").empty();
        $(".content-wrapper").load("views/tinder.html", function() {

            dashboardMode = 3;

            var data2 = [];
            if ($("#data2").attr("name") && $("#data2").attr("name").length > 2) {
                data2 = [];
            }
            var chart_data = null;
            chart_data = [];
            var minimum = 10000;
            var labels = [];
            var min = 10000000;
            var max = 0;


            for (var index = 0; index < data2.length; index++) {
                var obj = data2[index];
                if (CurrentUser && obj.user_id == CurrentUser.user_id) {
                    chart_data.push(
                        parseInt(obj.followers)
                    );
                    if (obj.followers > max) {
                        max = obj.followers;
                    }

                    if (obj.followers < min) {
                        min = obj.followers;
                    }
                    labels.push(index);
                    if (parseInt(obj.followers) < minimum) {
                        minimum = parseInt(obj.followers);
                    }
                }
            }
            if (chart_data.length > 1) {
                $('#growth').html('You grown ' + max - min + ' followers using Instoo');
            }
            let config = {
                type: 'line',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Instagram Followers',
                        backgroundColor: window.chartColors.red,
                        borderColor: window.chartColors.red,
                        data: chart_data,
                        fill: false,
                    }]
                },
                options: {
                    maintainAspectRatio: false,

                    responsive: true,
                    title: {
                        display: false,
                        text: 'Followers'
                    },
                    tooltips: {
                        mode: 'index',
                        intersect: false,
                    },
                    hover: {
                        mode: 'nearest',
                        intersect: true
                    },
                    scales: {
                        xAxes: [{
                            display: true,
                            scaleLabel: {
                                display: true,
                                labelString: 'Hour'
                            }
                        }],
                        yAxes: [{
                            display: true,
                            scaleLabel: {
                                display: true,
                                labelString: 'Followers'
                            }
                        }]
                    }
                }
            };



            mode = "tinder";
            gotAnalytics = false;


            version = chrome.runtime.getManifest().version;

            setTimeout(function() {
   


                if (CurrentUser && CurrentUser.username) {

                    $(".img-current-user").attr("src", CurrentUser.user_pic_url);
                    $(".img-current-user").show();

                }
            }, 240000);


            $('#version').attr('name', version);
            if (user_plan == "lifetime" || user_plan == "linkstories" || user_plan == "instoo2" || user_plan == "linkyear" || user_plan == "instoogold" || user_plan == "instooyearly" || user_plan == "instoopro" || user_plan == "instoogold2") {
                speed_limit = 300;

                $("#customRange1").attr("max", speed_limit);
                $("#customRange2").attr("max", speed_limit);
                $("#customRange3").attr("max", speed_limit);


            }

            $('#media_accounts').tagsinput({
                trimValue: true
            });

            $('#media_tags').tagsinput({
                trimValue: true
            });
            $('#media_tags2').tagsinput({
                trimValue: true
            });

            $('#comment_tags').tagsinput({
                trimValue: true,
                delimiter: ']',
                confirmKeys: [13]
            });

            $('#location_tags').tagsinput({
                trimValue: true
            });



            $('#my-btns .btn').on('click', function(event) {

                var val = $(this).find('input').val();
                if (val == "Fast") {
                    $("#fast").addClass('active');
                    $("#slow").removeClass('active');
                    $("#medium").removeClass('active');

                    if (paid_sub) {

                        socials.SendMessage("SetSpeedTinder", "Speed", 1);

                    } else {
                        buySub();
                    }
                }

                if (val == "Slow") {
                    $("#slow").addClass('active');
                    $("#fast").removeClass('active');
                    $("#medium").removeClass('active');
                    socials.SendMessage("SetSpeedTinder", "Speed", 8);


                }

                if (val == "Medium") {
                    $("#medium").addClass('active');
                    $("#slow").removeClass('active');
                    $("#fast").removeClass('active');
                    socials.SendMessage("SetSpeedTinder", "Speed", 2);


                }

            });

            socials.SendMessage("RequestMediaStatus", "Num", DisplayLikesNum);



            $("#comment_tags").on('itemAdded', function(event) {


                var tagsinputWidth = 200; 
                var tagWidth = $('#comment_tags').parent().find('.bootstrap-tagsinput span.tag').last().width(); 
                if (tagWidth > tagsinputWidth) {
                    var tagsText = event.item; 
                    var res = tagsText.substr(0, 5); 
                    $('#comment_tags').parent().find('.bootstrap-tagsinput span.tag').last().html(res + "..." + '<i class="fas fa-times"></i>');
                }


                var tags = event.item;
                var split_tags = tags;

                socials.SendMessage("AddCommentToListTinder", "TagName", tags);
             

                socials.SendMessage("RequestMediaStatus", "Num", DisplayLikesNum);

            });

            $("#comment_tags").on('itemRemoved', function(event) {


                var tags = event.item;
                var split_tags = tags;

                for (var kk = 0; kk < split_tags.length; kk++) {

                    socials.SendMessage("RemoveCommentFromListTinder", "TagName", split_tags[kk]);
                    var index = global_tags.indexOf(split_tags[kk]);
                    if (index > -1) {
                        global_tags.splice(index, 1);
                    }
                }

                socials.SendMessage("RequestMediaStatus", "Num", DisplayLikesNum);

            });


            $("#customRangeTinderComments").change(function() {
                if (paid_sub === false) {
                    if (parseInt($("#customRangeTinderComments").val()) > 1000) {
                        var input = document.getElementById("customRangeTinderComments");
                        input.value = 1000;

                    }
                }

                var follow_tinder_speed = parseInt($("#customRangeTinderComments").val());

                $("#comment_tinder_set").html("DMs/day: " + $("#customRangeTinderComments").val());


                socials.SendMessage("UpdateTinderCommentLimit", "limit", follow_tinder_speed);




            });


            $("#customRangeTinderLikes").change(function() {
                if (paid_sub == false) {
                    if (parseInt($("#customRangeTinderLikes").val()) > 1000) {
                        var input = document.getElementById("customRangeTinderLikes");
                        input.value = 1000;

                    }
                }


                var follow_tinder_speed = parseInt($("#customRange1").val());
                var like_tinder_speed = parseInt($("#customRangeTinderLikes").val());


                $("#like_tinder_set").html("Likes/day: " + $("#customRangeTinderLikes").val());

                socials.SendMessage("UpdateTinderLikeLimit", "limit", like_tinder_speed);

            });

            socials.SendMessage("RequestFollowStatus", "Num", DisplayFollowersNum);
            $("#slow").click(function() {
                var user_plan = $("#plan").attr("name");

                socials.SendMessage("SetSpeedTinder", "Num", 3);
                $("#slow").addClass('active');
                $("#fast").removeClass('active');
                $("#medium").removeClass('active');

            });
            $("#medium").click(function() {
                var user_plan = $("#plan").attr("name");




                socials.SendMessage("SetSpeedTinder", "Num", 2);
                $("#medium").addClass('active');
                $("#slow").removeClass('active');
                $("#fast").removeClass('active');

            });
            $("#fast").click(function() {
                var user_plan = $("#plan").attr("name");

                socials.SendMessage("SetSpeedTinder", "Num", 1);



                $("#fast").addClass('active');
                $("#slow").removeClass('active');
                $("#medium").removeClass('active');

            });

            $("#set-follow-tinder-check").click(function() {
                socials.SendMessage("SetFollowTinder", "Value", $(this).is(':checked'));

            });
            $("#set-like-tinder-check").click(function() {
                socials.SendMessage("SetLikeTinder", "Value", $(this).is(':checked'));

            });
            $("#set-follow-check").click(function() {
                $("#set-unfollow-check").prop("checked", false);
                SetUnfollowValue(false);
                SetFollowValue($(this).is(':checked'));
                if ($(this).is(':checked')) {
                    SetStoryValue($(this).is(':checked'));
                    $("#set-story-check").prop("checked", true);
                }
            });
            $("#set-like-check").click(function() {

                SetLikeValue($(this).is(':checked'));
                if ($(this).is(':checked')) {
                    SetStoryValue($(this).is(':checked'));
                    $("#set-story-check").prop("checked", true);
                }

            });


            $("#set-story-check").click(function() {
                SetStoryValue($(this).is(':checked'));


                if ($(this).is(':checked') != true) {
                    $("#set-like-check").prop("checked", false);
                    SetLikeValue(false);
                    $("#set-follow-check").prop("checked", false);
                    SetFollowValue(false);

                    $("#set-unfollow-check").prop("checked", false);
                    SetUnfollowValue(false);
                    $("#set-comment-check").prop("checked", false);
                    SetCommentValue(false);
                }

            });
            $("#set-comment-check").click(function() {
                SetCommentValue($(this).is(':checked'));

                if ($(this).is(':checked')) {
                    SetStoryValue($(this).is(':checked'));
                    $("#set-story-check").prop("checked", status.StartLike);
                }

            });
            $(document).on('click', '.remove-user-collect', function() {
                RemoveCollectJobUser(this);

            });
            $(document).on('click', '.remove-tag-collect', function() {
                RemoveCollectJobTagTikTok(this);
            });
            $(document).on('click', '.remove-location-collect', function() {
                RemoveLocationJobTag(this);
            });
            $(document).on('click', '.remove-comment-collect', function() {

                $(this).closest("tr").remove();
                socials.SendMessage("RemoveCommentFromList", "TagName", $(this).attr("user_id"));
                socials.SendMessage("RequestMediaStatus", "Num", DisplayLikesNum);
            });




            $("#set-unfollow-check").click(function() {
                $("#set-follow-check").prop("checked", false);
                SetFollowValue(false);

                SetUnfollowValue($(this).is(':checked'));
                if ($(this).is(':checked')) {
                    SetStoryValue($(this).is(':checked'));
                    $("#set-story-check").prop("checked", true);
                }

            });

            SetActiveSidebarItem("#sidebar-home");


            socials.SendMessage("RequestSettings", "", "");

            $("#customRange1").val(maxFollows);
            $("#customRange2").val(maxUnfollows);
            $("#customRange3").val(maxLikes);
            $("#customRange4").val(maxComments);
            $("#customRange5").val(maxStories);
            $("#follow_set").html("Follows/day: " + maxFollows);
            $("#unfollow_set").html("Unfollows/day: " + maxUnfollows);
            $("#like_set").html("Likes/day: " + maxLikes);
            $("#story_set").html("Stories/day: " + maxStories);
            $("#comment_set").html("DMs/day: " + maxComments);


            SetActiveSidebarItem("#sidebar-home-tinder2");

        });
    });
    $("#sidebar-home-crm").click(function() {
        $(".content-wrapper").empty();
        $(".content-wrapper").load("views/crm.html", function() {

            dashboardMode = 6;
            $("#validateInstagramFollowers").click(function() {

                socials.SendMessage("validateInstagramFollowers", "Num", "DisplayLikesNum");

            });

            $("#validateFollowers").click(function() {
                var followers_list = prompt("Enter a comma seperated list of followers to rank targets[dogs, dogsofinstagram, dog]:");
                var splits = followers_list.split(",");
                for (var kk = 0; kk < splits.length; kk++) {
                    splits[kk] = splits[kk].split(" ").join("").split("#").join("").split("@").join("");
                }


                for (var kk = 0; kk < instagram_data.length; kk++) {

                    if (splits.includes(instagram_data[kk].username)) {
                        instagram_data[kk].connected = "yes";
                    }
                }
                for (var kk = 0; kk < linkedin_data.length; kk++) {
                    if (splits.includes(linkedin_data[kk].username)) {
                        linkedin_data[kk].connected = "yes";
                    }
                }




                socials.SendMessage("UpdateInstagramData", "instagram_data", instagram_data);
                socials.SendMessage("UpdateLinkedinData", "linkedin_data", linkedin_data);

            });


            $("#validateSales").click(function() {
                var sales_list = prompt("Enter a comma seperated list of sales to rank targets(dogs, 10, dogsofinstagram, 20, dog, 30):");
                var splits = sales_list.split(",");
                for (var kk = 0; kk < splits.length; kk++) {
                    splits[kk] = splits[kk].split(" ").join("").split("#").join("").split("@").join("");
                }
                for (var kk = 0; kk < instagram_data.length; kk++) {
                    if (splits.includes(instagram_data[kk].username)) {
                        instagram_data[kk].sales += parseFloat(splits[splits.indexOf(instagram_data[kk].username) + 1]);
                    }
                }
                for (var kk = 0; kk < linkedin_data.length; kk++) {
                    if (splits.includes(linkedin_data[kk].username)) {
                        linkedin_data[kk].sales += parseFloat(splits[splits.indexOf(linkedin_data[kk].username) + 1]);
                    }
                }


                socials.SendMessage("UpdateInstagramData", "instagram_data", instagram_data);
                socials.SendMessage("UpdateLinkedinData", "linkedin_data", linkedin_data);
            });
            mode = "crm";
            gotAnalytics = false;


            socials.SendMessage("RequestMediaStatus", "Num", DisplayLikesNum);


            SetActiveSidebarItem("#sidebar-home-crm");

        });
    });




    $("#sidebar-home-link2").click(function() {
        $(".content-wrapper").empty();
        $(".content-wrapper").load("views/linkedin.html", function() {

            dashboardMode = 5;

            var data2 = [];
            if ($("#data2").attr("name") && $("#data2").attr("name").length > 2) {
                data2 = [];
            }
            var chart_data = null;
            chart_data = [];
            var minimum = 10000;
            var labels = [];
            var min = 10000000;
            var max = 0;


            for (var index = 0; index < data2.length; index++) {
                var obj = data2[index];
                if (CurrentUser && obj.user_id == CurrentUser.user_id) {
                    chart_data.push(
                        parseInt(obj.followers)
                    );
                    if (obj.followers > max) {
                        max = obj.followers;
                    }

                    if (obj.followers < min) {
                        min = obj.followers;
                    }
                    labels.push(index);
                    if (parseInt(obj.followers) < minimum) {
                        minimum = parseInt(obj.followers);
                    }
                }
            }
            if (chart_data.length > 1) {
                $('#growth').html('You grown ' + max - min + ' followers using Instoo');
            }
            let config = {
                type: 'line',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Instagram Followers',
                        backgroundColor: window.chartColors.red,
                        borderColor: window.chartColors.red,
                        data: chart_data,
                        fill: false,
                    }]
                },
                options: {
                    maintainAspectRatio: false,

                    responsive: true,
                    title: {
                        display: false,
                        text: 'Followers'
                    },
                    tooltips: {
                        mode: 'index',
                        intersect: false,
                    },
                    hover: {
                        mode: 'nearest',
                        intersect: true
                    },
                    scales: {
                        xAxes: [{
                            display: true,
                            scaleLabel: {
                                display: true,
                                labelString: 'Hour'
                            }
                        }],
                        yAxes: [{
                            display: true,
                            scaleLabel: {
                                display: true,
                                labelString: 'Followers'
                            }
                        }]
                    }
                }
            };


            mode = "linkedin";
            gotAnalytics = false;


            version = chrome.runtime.getManifest().version;

            setTimeout(function() {

                if (CurrentUser && CurrentUser.username) {

                    $(".img-current-user").attr("src", CurrentUser.user_pic_url);
                    $(".img-current-user").show();

                }
            }, 240000);


            $('#version').attr('name', version);
            if (user_plan == "lifetime" || user_plan == "linkstories" || user_plan == "instoo2" || user_plan == "linkyear" || user_plan == "instoogold" || user_plan == "instooyearly" || user_plan == "instoopro" || user_plan == "instoogold2") {
                speed_limit = 300;

                $("#customRange1").attr("max", speed_limit);
                $("#customRange2").attr("max", speed_limit);
                $("#customRange3").attr("max", speed_limit);


            }

           


            $('#my-btns .btn').on('click', function(event) {

                var val = $(this).find('input').val();
                if (val == "Fast") {
                    $("#fast").addClass('active');
                    $("#slow").removeClass('active');
                    $("#medium").removeClass('active');

                    if (paid_sub) {

                        socials.SendMessage("SetSpeedLinkedin", "Speed", 1);

                    } else {
                        buySub();
                    }
                }

                if (val == "Slow") {
                    $("#slow").addClass('active');
                    $("#fast").removeClass('active');
                    $("#medium").removeClass('active');
                    socials.SendMessage("SetSpeedLinkedin", "Speed", 8);


                }

                if (val == "Medium") {
                    $("#medium").addClass('active');
                    $("#slow").removeClass('active');
                    $("#fast").removeClass('active');
                    socials.SendMessage("SetSpeedLinkedin", "Speed", 2);


                }

            });
            $('#media_accounts').tagsinput({
                trimValue: true
            });

            $('#media_tags').tagsinput({
                trimValue: true
            });
            $('#media_tags2').tagsinput({
                trimValue: true
            });

            $('#comment_tags').tagsinput({
                trimValue: true,
                delimiter: ']',
                confirmKeys: [13]
            });

            $('#location_tags').tagsinput({
                trimValue: true
            });

            socials.SendMessage("RequestMediaStatus", "Num", DisplayLikesNum);


            $("#media_tags").on('itemAdded', function(event) {

                var tagsinputWidth = 200; // Width of Bootstrap Tags Input.
                var tagWidth = $('#media_tags').parent().find('.bootstrap-tagsinput span.tag').last().width(); // To get the Width of individual Tag.
                if (tagWidth > tagsinputWidth) {
                    var tagsText = event.item; // To Get Tags Value
                    var res = tagsText.substr(0, 5); // Here I'm displaying only first 5 Characters.(You can give any number)
                    $('#media_tags').parent().find('.bootstrap-tagsinput span.tag').last().html(res + "..." + '<i class="fas fa-times"></i>');
                }


                var tags = event.item;
                var split_tags = tags.split("#");

                for (var kk = 0; kk < split_tags.length; kk++) {
                    if (split_tags[kk].split('#').join('').split(',').join('').split(" ").join("%20").length > 0) {
                        socials.SendMessage("AddTagToListLinkedin", "TagName", split_tags[kk].split('#').join('').split(',').join('').split(" ").join("%20"));
                        global_tags.push(split_tags[kk].split('#').join('').split(',').join('').split(' ').join(''));
                    }
                }

                socials.SendMessage("RequestMediaStatus", "Num", DisplayLikesNum);

            });


            $("#comment_tags").on('itemAdded', function(event) {


                var tagsinputWidth = 200; 
                var tagWidth = $('#comment_tags').parent().find('.bootstrap-tagsinput span.tag').last().width(); 
                if (tagWidth > tagsinputWidth) {
                    var tagsText = event.item; 
                    var res = tagsText.substr(0, 5); 
                    $('#comment_tags').parent().find('.bootstrap-tagsinput span.tag').last().html(res + "..." + '<i class="fas fa-times"></i>');
                }


                var tags = event.item;
                var split_tags = tags;

                socials.SendMessage("AddCommentToListLinkedin", "TagName", tags);
                socials.SendMessage("RequestMediaStatus", "Num", DisplayLikesNum);

            });

            $("#comment_tags").on('itemRemoved', function(event) {


                var tags = event.item;
                var split_tags = tags;

                for (var kk = 0; kk < split_tags.length; kk++) {

                    socials.SendMessage("RemoveCommentFromList", "TagName", split_tags[kk]);
                    var index = global_tags.indexOf(split_tags[kk]);
                    if (index > -1) {
                        global_tags.splice(index, 1);
                    }
                }

                socials.SendMessage("RequestMediaStatus", "Num", DisplayLikesNum);

            });
            $("#media_tags").on('itemRemoved', function(event) {


                var tags = event.item;
                var split_tags = tags.split("#");
                for (var kk = 0; kk < split_tags.length; kk++) {

                    socials.SendMessage("RemoveTagFromListLinkedin", "TagName", split_tags[kk].split('#').join(''));
                    var index = global_tags.indexOf(split_tags[kk].split('#').join(''));
                    if (index > -1) {
                        global_tags.splice(index, 1);
                    }
                }

                socials.SendMessage("RequestMediaStatus", "Num", DisplayLikesNum);

            });


            $("#customRangeLinkedinFollows").change(function() {
                if (paid_sub === false) {
                    if (parseInt($("#customRangeLinkedinFollows").val()) > 1000) {
                        var input = document.getElementById("customRangeLinkedinFollows");
                        input.value = 1000;

                    }
                }

                var follow_Linkedin_speed = parseInt($("#customRangeLinkedinFollows").val());
                var like_Linkedin_speed = parseInt($("#customRange3").val());

                $("#follow_Linkedin_set").html("Follows/day: " + $("#customRangeLinkedinFollows").val());


                socials.SendMessage("UpdateLinkedinFollowLimit", "limit", follow_Linkedin_speed);




            });


            $("#customRangeLinkedinLikes").change(function() {
                if (paid_sub == false) {
                    if (parseInt($("#customRangeLinkedinLikes").val()) > 1000) {
                        var input = document.getElementById("customRangeLinkedinLikes");
                        input.value = 1000;

                    }
                }


                var follow_Linkedin_speed = parseInt($("#customRange1").val());
                var like_Linkedin_speed = parseInt($("#customRangeLinkedinLikes").val());


                $("#like_Linkedin_set").html("Likes/day: " + $("#customRangeLinkedinLikes").val());

                socials.SendMessage("UpdateLinkedinLikeLimit", "limit", like_Linkedin_speed);

            });

            socials.SendMessage("RequestFollowStatus", "Num", DisplayFollowersNum);

            $("#export_linkedin").click(function() {
                var json = linkedin_data
                for (var kk = 0; kk < json.length; kk++) {
                    json[kk].html = "";
                }


                var fields = Object.keys(json)
                var replacer = function(key, value) {
                    return value === null ? '' : value
                }
                var csv = json.map(function(row) {
                    return fields.map(function(fieldName) {
                        return JSON.stringify(row[fieldName], replacer)
                    }).join(',')
                })
                csv.unshift(fields.join(',')) // add header column
                csv = csv.join('\r\n');
                socials.SendMessage("DownloadJson", "url", linkedin_data);

            });
            $("#slow").click(function() {
                var user_plan = $("#plan").attr("name");

                socials.SendMessage("SetSpeedLinkedin", "Num", 3);
                $("#slow").addClass('active');
                $("#fast").removeClass('active');
                $("#medium").removeClass('active');

            });
            $("#medium").click(function() {
                var user_plan = $("#plan").attr("name");




                socials.SendMessage("SetSpeedLinkedin", "Num", 2);
                $("#medium").addClass('active');
                $("#slow").removeClass('active');
                $("#fast").removeClass('active');

            });
            $("#fast").click(function() {
                var user_plan = $("#plan").attr("name");

                socials.SendMessage("SetSpeedLinkedin", "Num", 1);



                $("#fast").addClass('active');
                $("#slow").removeClass('active');
                $("#medium").removeClass('active');

            });

            $("#set-follow-Linkedin-check").click(function() {
                socials.SendMessage("SetFollowLinkedin", "Value", $(this).is(':checked'));

            });
            $("#set-like-Linkedin-check").click(function() {
                socials.SendMessage("SetLikeLinkedin", "Value", $(this).is(':checked'));

            });
            $("#set-follow-check").click(function() {
                $("#set-unfollow-check").prop("checked", false);
                SetUnfollowValue(false);
                SetFollowValue($(this).is(':checked'));
                if ($(this).is(':checked')) {
                    SetStoryValue($(this).is(':checked'));
                    $("#set-story-check").prop("checked", true);
                }
            });
            $("#set-like-check").click(function() {

                SetLikeValue($(this).is(':checked'));
                if ($(this).is(':checked')) {
                    SetStoryValue($(this).is(':checked'));
                    $("#set-story-check").prop("checked", true);
                }

            });

            $("#set-Linkedin-check").click(function() {
                SetLinkedinValue($(this).is(':checked'));
                $("#errors").html("<div class='alert alert-success alert-dismissible' role='alert'><button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button> To automate Linkedin, open Linkedin.com in a new tab, then log in. Instoo will use your hashtags to like/follow automatically, so add some hashtags.<br> Linkedin is growing 2x faster than Instagram, so it's a useful platform to crosspromote both. Simply add a link to your Instagram in Linkedin bios/videos, or add Linkedin links in Instagram. Let us know how this new feature works for you! :)<br></div>");

            });

            $("#set-story-check").click(function() {
                SetStoryValue($(this).is(':checked'));


                if ($(this).is(':checked') != true) {
                    $("#set-like-check").prop("checked", false);
                    SetLikeValue(false);
                    $("#set-follow-check").prop("checked", false);
                    SetFollowValue(false);

                    $("#set-unfollow-check").prop("checked", false);
                    SetUnfollowValue(false);
                    $("#set-comment-check").prop("checked", false);
                    SetCommentValue(false);
                }

            });
            $("#set-comment-check").click(function() {
                SetCommentValue($(this).is(':checked'));

                if ($(this).is(':checked')) {
                    SetStoryValue($(this).is(':checked'));
                    $("#set-story-check").prop("checked", status.StartLike);
                }

            });
            $(document).on('click', '.remove-user-collect', function() {
                RemoveCollectJobUser(this);

            });
            $(document).on('click', '.remove-tag-collect', function() {
                RemoveCollectJobTagLinkedin(this);
            });
            $(document).on('click', '.remove-location-collect', function() {
                RemoveLocationJobTag(this);
            });
            $(document).on('click', '.remove-comment-collect', function() {

                $(this).closest("tr").remove();
                socials.SendMessage("RemoveCommentFromList", "TagName", $(this).attr("user_id"));
                socials.SendMessage("RequestMediaStatus", "Num", DisplayLikesNum);
            });




            $("#set-unfollow-check").click(function() {
                $("#set-follow-check").prop("checked", false);
                SetFollowValue(false);

                SetUnfollowValue($(this).is(':checked'));
                if ($(this).is(':checked')) {
                    SetStoryValue($(this).is(':checked'));
                    $("#set-story-check").prop("checked", true);
                }

            });

            SetActiveSidebarItem("#sidebar-home");


            socials.SendMessage("RequestSettings", "", "");

            $("#customRange1").val(maxFollows);
            $("#customRange2").val(maxUnfollows);
            $("#customRange3").val(maxLikes);
            $("#customRange4").val(maxComments);
            $("#customRange5").val(maxStories);
            $("#follow_set").html("Follows/day: " + maxFollows);
            $("#unfollow_set").html("Unfollows/day: " + maxUnfollows);
            $("#like_set").html("Likes/day: " + maxLikes);
            $("#story_set").html("Stories/day: " + maxStories);
            $("#comment_set").html("DMs/day: " + maxComments);

            //getFollowers();

            SetActiveSidebarItem("#sidebar-home-link2");

        });
    });


    $("#sidebar-home-tiktok").click(function() {
        $(".content-wrapper").empty();
        $(".content-wrapper").load("views/tiktok.html", function() {

            dashboardMode = 1;

            var data2 = [];
            if ($("#data2").attr("name") && $("#data2").attr("name").length > 2) {
                data2 = [];
            }
            var chart_data = null;
            chart_data = [];
            var minimum = 10000;
            var labels = [];
            var min = 10000000;
            var max = 0;


            for (var index = 0; index < data2.length; index++) {
                var obj = data2[index];
                if (CurrentUser && obj.user_id == CurrentUser.user_id) {
                    chart_data.push(
                        parseInt(obj.followers)
                    );
                    if (obj.followers > max) {
                        max = obj.followers;
                    }

                    if (obj.followers < min) {
                        min = obj.followers;
                    }
                    labels.push(index);
                    if (parseInt(obj.followers) < minimum) {
                        minimum = parseInt(obj.followers);
                    }
                }
            }
            if (chart_data.length > 1) {
                $('#growth').html('You grown ' + max - min + ' followers using Instoo');
            }
            let config = {
                type: 'line',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Instagram Followers',
                        backgroundColor: window.chartColors.red,
                        borderColor: window.chartColors.red,
                        data: chart_data,
                        fill: false,
                    }]
                },
                options: {
                    maintainAspectRatio: false,

                    responsive: true,
                    title: {
                        display: false,
                        text: 'Followers'
                    },
                    tooltips: {
                        mode: 'index',
                        intersect: false,
                    },
                    hover: {
                        mode: 'nearest',
                        intersect: true
                    },
                    scales: {
                        xAxes: [{
                            display: true,
                            scaleLabel: {
                                display: true,
                                labelString: 'Hour'
                            }
                        }],
                        yAxes: [{
                            display: true,
                            scaleLabel: {
                                display: true,
                                labelString: 'Followers'
                            }
                        }]
                    }
                }
            };


            mode = "tiktok";
            gotAnalytics = false;


            version = chrome.runtime.getManifest().version;

            setTimeout(function() {


                if (CurrentUser && CurrentUser.username) {

                    $(".img-current-user").attr("src", CurrentUser.user_pic_url);
                    $(".img-current-user").show();

                }
            }, 240000);


            $('#version').attr('name', version);
            if (user_plan == "lifetime" || user_plan == "linkstories" || user_plan == "instoo2" || user_plan == "linkyear" || user_plan == "instoogold" || user_plan == "instooyearly" || user_plan == "instoopro" || user_plan == "instoogold2") {
                speed_limit = 300;

                $("#customRange1").attr("max", speed_limit);
                $("#customRange2").attr("max", speed_limit);
                $("#customRange3").attr("max", speed_limit);


            }

            $('#media_accounts').tagsinput({
                trimValue: true
            });

            $('#media_tags').tagsinput({
                trimValue: true
            });
            $('#media_tags2').tagsinput({
                trimValue: true
            });

            $('#comment_tags').tagsinput({
                trimValue: true,
                delimiter: ']',
                confirmKeys: [13]
            });

            $('#location_tags').tagsinput({
                trimValue: true
            });



            $('#my-btns .btn').on('click', function(event) {

                var val = $(this).find('input').val();
                if (val == "Fast") {
                    $("#fast").addClass('active');
                    $("#slow").removeClass('active');
                    $("#medium").removeClass('active');

                    if (paid_sub) {

                        socials.SendMessage("SetSpeedTikTok", "Speed", 1);

                    } else {
                        buySub();
                    }
                }

                if (val == "Slow") {
                    $("#slow").addClass('active');
                    $("#fast").removeClass('active');
                    $("#medium").removeClass('active');
                    socials.SendMessage("SetSpeedTikTok", "Speed", 8);


                }

                if (val == "Medium") {
                    $("#medium").addClass('active');
                    $("#slow").removeClass('active');
                    $("#fast").removeClass('active');
                    socials.SendMessage("SetSpeedTikTok", "Speed", 2);


                }

            });

            socials.SendMessage("RequestMediaStatus", "Num", DisplayLikesNum);


            $("#media_tags").on('itemAdded', function(event) {

                var tagsinputWidth = 200; // Width of Bootstrap Tags Input.
                var tagWidth = $('#media_tags').parent().find('.bootstrap-tagsinput span.tag').last().width(); // To get the Width of individual Tag.
                if (tagWidth > tagsinputWidth) {
                    //If Width of the Tag is more than the width of Container then we crop text of the Tag
                    var tagsText = event.item; // To Get Tags Value
                    var res = tagsText.substr(0, 5); // Here I'm displaying only first 5 Characters.(You can give any number)
                    $('#media_tags').parent().find('.bootstrap-tagsinput span.tag').last().html(res + "..." + '<i class="fas fa-times"></i>');
                }


                var tags = event.item;
                var split_tags = tags.split("#");

                for (var kk = 0; kk < split_tags.length; kk++) {
                    if (split_tags[kk].split('#').join('').split(',').join('').split(' ').join('').length > 0) {
                        socials.SendMessage("AddTagToListTikTok", "TagName", split_tags[kk].split('#').join('').split(',').join('').split(' ').join(''));
                        global_tags.push(split_tags[kk].split('#').join('').split(',').join('').split(' ').join(''));
                    }
                }

                socials.SendMessage("RequestMediaStatus", "Num", DisplayLikesNum);

            });


            $("#comment_tags").on('itemAdded', function(event) {


                var tagsinputWidth = 200; // Width of Bootstrap Tags Input.
                var tagWidth = $('#comment_tags').parent().find('.bootstrap-tagsinput span.tag').last().width(); // To get the Width of individual Tag.
                if (tagWidth > tagsinputWidth) {
                    //If Width of the Tag is more than the width of Container then we crop text of the Tag
                    var tagsText = event.item; // To Get Tags Value
                    var res = tagsText.substr(0, 5); // Here I'm displaying only first 5 Characters.(You can give any number)
                    $('#comment_tags').parent().find('.bootstrap-tagsinput span.tag').last().html(res + "..." + '<i class="fas fa-times"></i>');
                }


                var tags = event.item;
                var split_tags = tags;

                socials.SendMessage("AddCommentToListTikTok", "TagName", tags);

                socials.SendMessage("RequestMediaStatus", "Num", DisplayLikesNum);

            });

            $("#comment_tags").on('itemRemoved', function(event) {


                var tags = event.item;
                var split_tags = tags;

                for (var kk = 0; kk < split_tags.length; kk++) {

                    socials.SendMessage("RemoveCommentFromList", "TagName", split_tags[kk]);
                    var index = global_tags.indexOf(split_tags[kk]);
                    if (index > -1) {
                        global_tags.splice(index, 1);
                    }
                }

                socials.SendMessage("RequestMediaStatus", "Num", DisplayLikesNum);

            });
            $("#media_tags").on('itemRemoved', function(event) {


                var tags = event.item;
                var split_tags = tags.split("#");
                for (var kk = 0; kk < split_tags.length; kk++) {

                    socials.SendMessage("RemoveTagFromListTikTok", "TagName", split_tags[kk].split('#').join(''));
                    var index = global_tags.indexOf(split_tags[kk].split('#').join(''));
                    if (index > -1) {
                        global_tags.splice(index, 1);
                    }
                }

                socials.SendMessage("RequestMediaStatus", "Num", DisplayLikesNum);

            });


            $("#customRangeTikTokFollows").change(function() {
                if (paid_sub === false) {
                    if (parseInt($("#customRangeTikTokFollows").val()) > 1000) {
                        var input = document.getElementById("customRangeTikTokFollows");
                        input.value = 1000;

                    }
                }

                var follow_tiktok_speed = parseInt($("#customRangeTikTokFollows").val());
                var like_tiktok_speed = parseInt($("#customRange3").val());

                $("#follow_tiktok_set").html("Follows/day: " + $("#customRangeTikTokFollows").val());


                socials.SendMessage("UpdateTikTokFollowLimit", "limit", follow_tiktok_speed);




            });


            $("#customRangeTikTokLikes").change(function() {
                if (paid_sub == false) {
                    if (parseInt($("#customRangeTikTokLikes").val()) > 1000) {
                        var input = document.getElementById("customRangeTikTokLikes");
                        input.value = 1000;

                    }
                }


                var follow_tiktok_speed = parseInt($("#customRange1").val());
                var like_tiktok_speed = parseInt($("#customRangeTikTokLikes").val());


                $("#like_tiktok_set").html("Likes/day: " + $("#customRangeTikTokLikes").val());

                socials.SendMessage("UpdateTikTokLikeLimit", "limit", like_tiktok_speed);

            });

            socials.SendMessage("RequestFollowStatus", "Num", DisplayFollowersNum);
            $("#slow").click(function() {
                var user_plan = $("#plan").attr("name");

                socials.SendMessage("SetSpeedTikTok", "Num", 3);
                $("#slow").addClass('active');
                $("#fast").removeClass('active');
                $("#medium").removeClass('active');

            });
            $("#medium").click(function() {
                var user_plan = $("#plan").attr("name");




                socials.SendMessage("SetSpeedTikTok", "Num", 2);
                $("#medium").addClass('active');
                $("#slow").removeClass('active');
                $("#fast").removeClass('active');

            });
            $("#fast").click(function() {
                var user_plan = $("#plan").attr("name");

                socials.SendMessage("SetSpeedTikTok", "Num", 1);



                $("#fast").addClass('active');
                $("#slow").removeClass('active');
                $("#medium").removeClass('active');

            });

            $("#set-follow-tiktok-check").click(function() {
                socials.SendMessage("SetFollowTikTok", "Value", $(this).is(':checked'));

            });
            $("#set-like-tiktok-check").click(function() {
                socials.SendMessage("SetLikeTikTok", "Value", $(this).is(':checked'));

            });
            $("#set-follow-check").click(function() {
                $("#set-unfollow-check").prop("checked", false);
                SetUnfollowValue(false);
                SetFollowValue($(this).is(':checked'));
                if ($(this).is(':checked')) {
                    SetStoryValue($(this).is(':checked'));
                    $("#set-story-check").prop("checked", true);
                }
            });
            $("#set-like-check").click(function() {

                SetLikeValue($(this).is(':checked'));
                if ($(this).is(':checked')) {
                    SetStoryValue($(this).is(':checked'));
                    $("#set-story-check").prop("checked", true);
                }

            });

            $("#set-tiktok-check").click(function() {
                SetTikTokValue($(this).is(':checked'));
                $("#errors").html("<div class='alert alert-success alert-dismissible' role='alert'><button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button> To automate TikTok, open tiktok.com in a new tab, then log in. Instoo will use your hashtags to like/follow automatically, so add some hashtags.<br> Tiktok is growing 2x faster than Instagram, so it's a useful platform to crosspromote both. Simply add a link to your Instagram in Tiktok bios/videos, or add TikTok links in Instagram. Let us know how this new feature works for you! :)<br></div>");

            });

            $("#set-story-check").click(function() {
                SetStoryValue($(this).is(':checked'));


                if ($(this).is(':checked') != true) {
                    $("#set-like-check").prop("checked", false);
                    SetLikeValue(false);
                    $("#set-follow-check").prop("checked", false);
                    SetFollowValue(false);

                    $("#set-unfollow-check").prop("checked", false);
                    SetUnfollowValue(false);
                    $("#set-comment-check").prop("checked", false);
                    SetCommentValue(false);
                }

            });
            $("#set-comment-check").click(function() {
                SetCommentValue($(this).is(':checked'));

                if ($(this).is(':checked')) {
                    SetStoryValue($(this).is(':checked'));
                    $("#set-story-check").prop("checked", status.StartLike);
                }

            });
            $(document).on('click', '.remove-user-collect', function() {
                RemoveCollectJobUser(this);

            });
            $(document).on('click', '.remove-tag-collect', function() {
                RemoveCollectJobTagTikTok(this);
            });
            $(document).on('click', '.remove-location-collect', function() {
                RemoveLocationJobTag(this);
            });
            $(document).on('click', '.remove-comment-collect', function() {

                $(this).closest("tr").remove();
                socials.SendMessage("RemoveCommentFromList", "TagName", $(this).attr("user_id"));
                socials.SendMessage("RequestMediaStatus", "Num", DisplayLikesNum);
            });




            $("#set-unfollow-check").click(function() {
                $("#set-follow-check").prop("checked", false);
                SetFollowValue(false);

                SetUnfollowValue($(this).is(':checked'));
                if ($(this).is(':checked')) {
                    SetStoryValue($(this).is(':checked'));
                    $("#set-story-check").prop("checked", true);
                }

            });

            SetActiveSidebarItem("#sidebar-home");


            socials.SendMessage("RequestSettings", "", "");

            $("#customRange1").val(maxFollows);
            $("#customRange2").val(maxUnfollows);
            $("#customRange3").val(maxLikes);
            $("#customRange4").val(maxComments);
            $("#customRange5").val(maxStories);
            $("#follow_set").html("Follows/day: " + maxFollows);
            $("#unfollow_set").html("Unfollows/day: " + maxUnfollows);
            $("#like_set").html("Likes/day: " + maxLikes);
            $("#story_set").html("Stories/day: " + maxStories);
            $("#comment_set").html("DMs/day: " + maxComments);


            SetActiveSidebarItem("#sidebar-home-tiktok");

        });
    });

    $("#sidebar-home-facebook").click(function() {
        $(".content-wrapper").empty();
        $(".content-wrapper").load("views/facebook.html", function() {

            dashboardMode = 7;

            var data2 = [];
            if ($("#data2").attr("name") && $("#data2").attr("name").length > 2) {
                data2 = [];
            }
            var chart_data = null;
            chart_data = [];
            var minimum = 10000;
            var labels = [];
            var min = 10000000;
            var max = 0;


            for (var index = 0; index < data2.length; index++) {
                var obj = data2[index];
                if (CurrentUser && obj.user_id == CurrentUser.user_id) {
                    chart_data.push(
                        parseInt(obj.followers)
                    );
                    if (obj.followers > max) {
                        max = obj.followers;
                    }

                    if (obj.followers < min) {
                        min = obj.followers;
                    }
                    labels.push(index);
                    if (parseInt(obj.followers) < minimum) {
                        minimum = parseInt(obj.followers);
                    }
                }
            }
            if (chart_data.length > 1) {
                $('#growth').html('You grown ' + max - min + ' followers using Instoo');
            }
            let config = {
                type: 'line',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Instagram Followers',
                        backgroundColor: window.chartColors.red,
                        borderColor: window.chartColors.red,
                        data: chart_data,
                        fill: false,
                    }]
                },
                options: {
                    maintainAspectRatio: false,

                    responsive: true,
                    title: {
                        display: false,
                        text: 'Followers'
                    },
                    tooltips: {
                        mode: 'index',
                        intersect: false,
                    },
                    hover: {
                        mode: 'nearest',
                        intersect: true
                    },
                    scales: {
                        xAxes: [{
                            display: true,
                            scaleLabel: {
                                display: true,
                                labelString: 'Hour'
                            }
                        }],
                        yAxes: [{
                            display: true,
                            scaleLabel: {
                                display: true,
                                labelString: 'Followers'
                            }
                        }]
                    }
                }
            };

           

            mode = "facebook";
            gotAnalytics = false;


            version = chrome.runtime.getManifest().version;

            setTimeout(function() {
             


                if (CurrentUser && CurrentUser.username) {

                    $(".img-current-user").attr("src", CurrentUser.user_pic_url);
                    $(".img-current-user").show();

                }
            }, 240000);


            $('#version').attr('name', version);
            if (user_plan == "lifetime" || user_plan == "linkstories" || user_plan == "instoo2" || user_plan == "linkyear" || user_plan == "instoogold" || user_plan == "instooyearly" || user_plan == "instoopro" || user_plan == "instoogold2") {
                speed_limit = 300;

                $("#customRange1").attr("max", speed_limit);
                $("#customRange2").attr("max", speed_limit);
                $("#customRange3").attr("max", speed_limit);


            }

            $('#media_accounts').tagsinput({
                trimValue: true
            });

            $('#media_tags').tagsinput({
                trimValue: true
            });
            $('#media_tags2').tagsinput({
                trimValue: true
            });

            $('#comment_tags').tagsinput({
                trimValue: true,
                delimiter: ']',
                confirmKeys: [13]
            });

            $('#location_tags').tagsinput({
                trimValue: true
            });



            $('#my-btns .btn').on('click', function(event) {

                var val = $(this).find('input').val();
                if (val == "Fast") {
                    $("#fast").addClass('active');
                    $("#slow").removeClass('active');
                    $("#medium").removeClass('active');

                    if (paid_sub) {

                        socials.SendMessage("SetSpeedfacebook", "Speed", 1);

                    } else {
                        buySub();
                    }
                }

                if (val == "Slow") {
                    $("#slow").addClass('active');
                    $("#fast").removeClass('active');
                    $("#medium").removeClass('active');
                    socials.SendMessage("SetSpeedfacebook", "Speed", 8);


                }

                if (val == "Medium") {
                    $("#medium").addClass('active');
                    $("#slow").removeClass('active');
                    $("#fast").removeClass('active');
                    socials.SendMessage("SetSpeedfacebook", "Speed", 2);


                }

            });

            socials.SendMessage("RequestMediaStatus", "Num", DisplayLikesNum);


            $("#media_tags").on('itemAdded', function(event) {

                var tagsinputWidth = 200; // Width of Bootstrap Tags Input.
                var tagWidth = $('#media_tags').parent().find('.bootstrap-tagsinput span.tag').last().width(); // To get the Width of individual Tag.
                if (tagWidth > tagsinputWidth) {
                    //If Width of the Tag is more than the width of Container then we crop text of the Tag
                    var tagsText = event.item; // To Get Tags Value
                    var res = tagsText.substr(0, 5); // Here I'm displaying only first 5 Characters.(You can give any number)
                    $('#media_tags').parent().find('.bootstrap-tagsinput span.tag').last().html(res + "..." + '<i class="fas fa-times"></i>');
                }


                var tags = event.item;
                var split_tags = tags.split("#");

                for (var kk = 0; kk < split_tags.length; kk++) {
                    if (split_tags[kk].split('#').join('').split(',').join('').split(' ').join('').length > 0) {
                        socials.SendMessage("AddTagToListfacebook", "TagName", split_tags[kk].split('#').join('').split(',').join('').split(' ').join(''));
                        global_tags.push(split_tags[kk].split('#').join('').split(',').join('').split(' ').join(''));
                    }
                }

                socials.SendMessage("RequestMediaStatus", "Num", DisplayLikesNum);

            });


            $("#media_accounts").on('itemAdded', function(event) {
                console.log("CODES THAT RUS 2");

                var tagsinputWidth = 200; // Width of Bootstrap Tags Input.
                var tagWidth = $('#media_accounts').parent().find('.bootstrap-tagsinput span.tag').last().width(); // To get the Width of individual Tag.
                if (tagWidth > tagsinputWidth) {
                    //If Width of the Tag is more than the width of Container then we crop text of the Tag
                    var tagsText = event.item; // To Get Tags Value
                    var res = tagsText.substr(0, 5); // Here I'm displaying only first 5 Characters.(You can give any number)
                    $('#media_accounts').parent().find('.bootstrap-tagsinput span.tag').last().html(res + "..." + '<i class="fas fa-times"></i>');
                }


                var tags = event.item;
                var split_tags = tags.split("#");

                for (var kk = 0; kk < split_tags.length; kk++) {
                    if (split_tags[kk].split('#').join('').split(',').join('').split(' ').join('').length > 0) {
                        socials.SendMessage("AddAccountToListfacebook", "TagName", split_tags[kk].split('#').join('').split(',').join('').split(' ').join(''));
                        global_tags.push(split_tags[kk].split('#').join('').split(',').join('').split(' ').join(''));
                    }
                }

                socials.SendMessage("RequestMediaStatus", "Num", DisplayLikesNum);

            });

            $("#comment_tags").on('itemAdded', function(event) {


                var tagsinputWidth = 200; // Width of Bootstrap Tags Input.
                var tagWidth = $('#comment_tags').parent().find('.bootstrap-tagsinput span.tag').last().width(); // To get the Width of individual Tag.
                if (tagWidth > tagsinputWidth) {
                    //If Width of the Tag is more than the width of Container then we crop text of the Tag
                    var tagsText = event.item; // To Get Tags Value
                    var res = tagsText.substr(0, 5); // Here I'm displaying only first 5 Characters.(You can give any number)
                    $('#comment_tags').parent().find('.bootstrap-tagsinput span.tag').last().html(res + "..." + '<i class="fas fa-times"></i>');
                }


                var tags = event.item;
                var split_tags = tags;

                socials.SendMessage("AddCommentToListfacebook", "TagName", tags);

                socials.SendMessage("RequestMediaStatus", "Num", DisplayLikesNum);

            });

            $("#comment_tags").on('itemRemoved', function(event) {


                var tags = event.item;
                var split_tags = tags;

                for (var kk = 0; kk < split_tags.length; kk++) {

                    socials.SendMessage("RemoveCommentFromList", "TagName", split_tags[kk]);
                    var index = global_tags.indexOf(split_tags[kk]);
                    if (index > -1) {
                        global_tags.splice(index, 1);
                    }
                }

                socials.SendMessage("RequestMediaStatus", "Num", DisplayLikesNum);

            });
            $("#media_tags").on('itemRemoved', function(event) {


                var tags = event.item;
                var split_tags = tags.split("#");
                for (var kk = 0; kk < split_tags.length; kk++) {

                    socials.SendMessage("RemoveTagFromListfacebook", "TagName", split_tags[kk].split('#').join(''));
                    var index = global_tags.indexOf(split_tags[kk].split('#').join(''));
                    if (index > -1) {
                        global_tags.splice(index, 1);
                    }
                }

                socials.SendMessage("RequestMediaStatus", "Num", DisplayLikesNum);

            });


            $("#customRangefacebookFollows").change(function() {
                if (paid_sub === false) {
                    if (parseInt($("#customRangefacebookFollows").val()) > 1000) {
                        var input = document.getElementById("customRangefacebookFollows");
                        input.value = 1000;

                    }
                }

                var follow_facebook_speed = parseInt($("#customRangefacebookFollows").val());
                var like_facebook_speed = parseInt($("#customRange3").val());

                $("#follow_facebook_set").html("Friends/day: " + $("#customRangefacebookFollows").val());


                socials.SendMessage("UpdatefacebookFollowLimit", "limit", follow_facebook_speed);




            });


            $("#customRangefacebookLikes").change(function() {
                if (paid_sub == false) {
                    if (parseInt($("#customRangefacebookLikes").val()) > 1000) {
                        var input = document.getElementById("customRangefacebookLikes");
                        input.value = 1000;

                    }
                }


                var follow_facebook_speed = parseInt($("#customRange1").val());
                var like_facebook_speed = parseInt($("#customRangefacebookLikes").val());


                $("#like_facebook_set").html("Likes/day: " + $("#customRangefacebookLikes").val());

                socials.SendMessage("UpdatefacebookLikeLimit", "limit", like_facebook_speed);

            });

            socials.SendMessage("RequestFollowStatus", "Num", DisplayFollowersNum);
            $("#slow").click(function() {
                var user_plan = $("#plan").attr("name");

                socials.SendMessage("SetSpeedfacebook", "Num", 3);
                $("#slow").addClass('active');
                $("#fast").removeClass('active');
                $("#medium").removeClass('active');

            });
            $("#medium").click(function() {
                var user_plan = $("#plan").attr("name");




                socials.SendMessage("SetSpeedfacebook", "Num", 2);
                $("#medium").addClass('active');
                $("#slow").removeClass('active');
                $("#fast").removeClass('active');

            });
            $("#fast").click(function() {
                var user_plan = $("#plan").attr("name");

                socials.SendMessage("SetSpeedfacebook", "Num", 1);



                $("#fast").addClass('active');
                $("#slow").removeClass('active');
                $("#medium").removeClass('active');

            });

            $("#set-follow-facebook-check").click(function() {
                socials.SendMessage("SetFollowfacebook", "Value", $(this).is(':checked'));

            });
            $("#set-like-facebook-check").click(function() {
                socials.SendMessage("SetLikefacebook", "Value", $(this).is(':checked'));

            });
            $("#set-follow-check").click(function() {
                $("#set-unfollow-check").prop("checked", false);
                SetUnfollowValue(false);
                SetFollowValue($(this).is(':checked'));
                if ($(this).is(':checked')) {
                    SetStoryValue($(this).is(':checked'));
                    $("#set-story-check").prop("checked", true);
                }
            });
            $("#set-like-check").click(function() {

                SetLikeValue($(this).is(':checked'));
                if ($(this).is(':checked')) {
                    SetStoryValue($(this).is(':checked'));
                    $("#set-story-check").prop("checked", true);
                }

            });

            $("#set-facebook-check").click(function() {
                SetfacebookValue($(this).is(':checked'));
                $("#errors").html("<div class='alert alert-success alert-dismissible' role='alert'><button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button> To automate facebook, open facebook.com in a new tab, then log in. Instoo will use your hashtags to like/follow automatically, so add some hashtags.<br> facebook is growing 2x faster than Instagram, so it's a useful platform to crosspromote both. Simply add a link to your Instagram in facebook bios/videos, or add facebook links in Instagram. Let us know how this new feature works for you! :)<br></div>");

            });

            $("#set-story-check").click(function() {
                SetStoryValue($(this).is(':checked'));


                if ($(this).is(':checked') != true) {
                    $("#set-like-check").prop("checked", false);
                    SetLikeValue(false);
                    $("#set-follow-check").prop("checked", false);
                    SetFollowValue(false);

                    $("#set-unfollow-check").prop("checked", false);
                    SetUnfollowValue(false);
                    $("#set-comment-check").prop("checked", false);
                    SetCommentValue(false);
                }

            });
            $("#set-comment-check").click(function() {
                SetCommentValue($(this).is(':checked'));

                if ($(this).is(':checked')) {
                    SetStoryValue($(this).is(':checked'));
                    $("#set-story-check").prop("checked", status.StartLike);
                }

            });
            $(document).on('click', '.remove-user-collect', function() {
                RemoveCollectJobUser(this);

            });
            $(document).on('click', '.remove-tag-collect', function() {
                RemoveCollectJobTagfacebook(this);
            });
            $(document).on('click', '.remove-location-collect', function() {
                RemoveLocationJobTag(this);
            });
            $(document).on('click', '.remove-comment-collect', function() {

                $(this).closest("tr").remove();
                socials.SendMessage("RemoveCommentFromList", "TagName", $(this).attr("user_id"));
                socials.SendMessage("RequestMediaStatus", "Num", DisplayLikesNum);
            });




            $("#set-unfollow-check").click(function() {
                $("#set-follow-check").prop("checked", false);
                SetFollowValue(false);

                SetUnfollowValue($(this).is(':checked'));
                if ($(this).is(':checked')) {
                    SetStoryValue($(this).is(':checked'));
                    $("#set-story-check").prop("checked", true);
                }

            });

            SetActiveSidebarItem("#sidebar-home");


            socials.SendMessage("RequestSettings", "", "");

            $("#customRange1").val(maxFollows);
            $("#customRange2").val(maxUnfollows);
            $("#customRange3").val(maxLikes);
            $("#customRange4").val(maxComments);
            $("#customRange5").val(maxStories);
            $("#follow_set").html("Follows/day: " + maxFollows);
            $("#unfollow_set").html("Unfollows/day: " + maxUnfollows);
            $("#like_set").html("Likes/day: " + maxLikes);
            $("#story_set").html("Stories/day: " + maxStories);
            $("#comment_set").html("DMs/day: " + maxComments);

            //getFollowers();

            SetActiveSidebarItem("#sidebar-home-facebook");

        });
    });


    $("#sidebar-home-pinterest").click(function() {
        $(".content-wrapper").empty();
        $(".content-wrapper").load("views/pinterest.html", function() {

            dashboardMode = 6;

            var data2 = [];
            if ($("#data2").attr("name") && $("#data2").attr("name").length > 2) {
                data2 = [];
            }
            var chart_data = null;
            chart_data = [];
            var minimum = 10000;
            var labels = [];
            var min = 10000000;
            var max = 0;


            for (var index = 0; index < data2.length; index++) {
                var obj = data2[index];
                if (CurrentUser && obj.user_id == CurrentUser.user_id) {
                    chart_data.push(
                        parseInt(obj.followers)
                    );
                    if (obj.followers > max) {
                        max = obj.followers;
                    }

                    if (obj.followers < min) {
                        min = obj.followers;
                    }
                    labels.push(index);
                    if (parseInt(obj.followers) < minimum) {
                        minimum = parseInt(obj.followers);
                    }
                }
            }
            if (chart_data.length > 1) {
                $('#growth').html('You grown ' + max - min + ' followers using Instoo');
            }
            let config = {
                type: 'line',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Instagram Followers',
                        backgroundColor: window.chartColors.red,
                        borderColor: window.chartColors.red,
                        data: chart_data,
                        fill: false,
                    }]
                },
                options: {
                    maintainAspectRatio: false,

                    responsive: true,
                    title: {
                        display: false,
                        text: 'Followers'
                    },
                    tooltips: {
                        mode: 'index',
                        intersect: false,
                    },
                    hover: {
                        mode: 'nearest',
                        intersect: true
                    },
                    scales: {
                        xAxes: [{
                            display: true,
                            scaleLabel: {
                                display: true,
                                labelString: 'Hour'
                            }
                        }],
                        yAxes: [{
                            display: true,
                            scaleLabel: {
                                display: true,
                                labelString: 'Followers'
                            }
                        }]
                    }
                }
            };

            mode = "pinterest";
            gotAnalytics = false;


            version = chrome.runtime.getManifest().version;

            setTimeout(function() {


                if (CurrentUser && CurrentUser.username) {

                    $(".img-current-user").attr("src", CurrentUser.user_pic_url);
                    $(".img-current-user").show();

                }
            }, 240000);


            $('#version').attr('name', version);
            if (user_plan == "lifetime" || user_plan == "linkstories" || user_plan == "instoo2" || user_plan == "linkyear" || user_plan == "instoogold" || user_plan == "instooyearly" || user_plan == "instoopro" || user_plan == "instoogold2") {
                speed_limit = 300;

                $("#customRange1").attr("max", speed_limit);
                $("#customRange2").attr("max", speed_limit);
                $("#customRange3").attr("max", speed_limit);


            }

            $('#media_accounts').tagsinput({
                trimValue: true
            });

            $('#media_tags').tagsinput({
                trimValue: true
            });
            $('#media_tags2').tagsinput({
                trimValue: true
            });

            $('#comment_tags').tagsinput({
                trimValue: true,
                delimiter: ']',
                confirmKeys: [13]
            });

            $('#location_tags').tagsinput({
                trimValue: true
            });



            $('#my-btns .btn').on('click', function(event) {

                var val = $(this).find('input').val();
                if (val == "Fast") {
                    $("#fast").addClass('active');
                    $("#slow").removeClass('active');
                    $("#medium").removeClass('active');

                    if (paid_sub) {

                        socials.SendMessage("SetSpeedPinterest", "Speed", 1);

                    } else {
                        buySub();
                    }
                }

                if (val == "Slow") {
                    $("#slow").addClass('active');
                    $("#fast").removeClass('active');
                    $("#medium").removeClass('active');
                    socials.SendMessage("SetSpeedPinterest", "Speed", 8);


                }

                if (val == "Medium") {
                    $("#medium").addClass('active');
                    $("#slow").removeClass('active');
                    $("#fast").removeClass('active');
                    socials.SendMessage("SetSpeedPinterest", "Speed", 2);


                }

            });

            socials.SendMessage("RequestMediaStatus", "Num", DisplayLikesNum);


            $("#media_tags").on('itemAdded', function(event) {

                var tagsinputWidth = 200; // Width of Bootstrap Tags Input.
                var tagWidth = $('#media_tags').parent().find('.bootstrap-tagsinput span.tag').last().width(); // To get the Width of individual Tag.
                if (tagWidth > tagsinputWidth) {
                    //If Width of the Tag is more than the width of Container then we crop text of the Tag
                    var tagsText = event.item; // To Get Tags Value
                    var res = tagsText.substr(0, 5); // Here I'm displaying only first 5 Characters.(You can give any number)
                    $('#media_tags').parent().find('.bootstrap-tagsinput span.tag').last().html(res + "..." + '<i class="fas fa-times"></i>');
                }


                var tags = event.item;
                var split_tags = tags.split("#");

                for (var kk = 0; kk < split_tags.length; kk++) {
                    if (split_tags[kk].split('#').join('').split(',').join('').split(' ').join('').length > 0) {
                        socials.SendMessage("AddTagToListPinterest", "TagName", split_tags[kk].split('#').join('').split(',').join('').split(' ').join(''));
                        global_tags.push(split_tags[kk].split('#').join('').split(',').join('').split(' ').join(''));
                    }
                }

                socials.SendMessage("RequestMediaStatus", "Num", DisplayLikesNum);

            });


            $("#comment_tags").on('itemAdded', function(event) {


                var tagsinputWidth = 200; // Width of Bootstrap Tags Input.
                var tagWidth = $('#comment_tags').parent().find('.bootstrap-tagsinput span.tag').last().width(); // To get the Width of individual Tag.
                if (tagWidth > tagsinputWidth) {
                    //If Width of the Tag is more than the width of Container then we crop text of the Tag
                    var tagsText = event.item; // To Get Tags Value
                    var res = tagsText.substr(0, 5); // Here I'm displaying only first 5 Characters.(You can give any number)
                    $('#comment_tags').parent().find('.bootstrap-tagsinput span.tag').last().html(res + "..." + '<i class="fas fa-times"></i>');
                }


                var tags = event.item;
                var split_tags = tags;

                socials.SendMessage("AddCommentToListPinterest", "TagName", tags);
       

                socials.SendMessage("RequestMediaStatus", "Num", DisplayLikesNum);

            });

            $("#comment_tags").on('itemRemoved', function(event) {


                var tags = event.item;
                var split_tags = tags;

                for (var kk = 0; kk < split_tags.length; kk++) {

                    socials.SendMessage("RemoveCommentFromList", "TagName", split_tags[kk]);
                    var index = global_tags.indexOf(split_tags[kk]);
                    if (index > -1) {
                        global_tags.splice(index, 1);
                    }
                }

                socials.SendMessage("RequestMediaStatus", "Num", DisplayLikesNum);

            });
            $("#media_tags").on('itemRemoved', function(event) {


                var tags = event.item;
                var split_tags = tags.split("#");
                for (var kk = 0; kk < split_tags.length; kk++) {

                    socials.SendMessage("RemoveTagFromListPinterest", "TagName", split_tags[kk].split('#').join(''));
                    var index = global_tags.indexOf(split_tags[kk].split('#').join(''));
                    if (index > -1) {
                        global_tags.splice(index, 1);
                    }
                }

                socials.SendMessage("RequestMediaStatus", "Num", DisplayLikesNum);

            });


            $("#customRangePinterestFollows").change(function() {
                if (paid_sub === false) {
                    if (parseInt($("#customRangePinterestFollows").val()) > 1000) {
                        var input = document.getElementById("customRangePinterestFollows");
                        input.value = 1000;

                    }
                }

                var follow_pinterest_speed = parseInt($("#customRangePinterestFollows").val());
                var like_pinterest_speed = parseInt($("#customRange3").val());

                $("#follow_pinterest_set").html("Follows/day: " + $("#customRangePinterestFollows").val());


                socials.SendMessage("UpdatePinterestFollowLimit", "limit", follow_pinterest_speed);




            });


            $("#customRangePinterestLikes").change(function() {
                if (paid_sub == false) {
                    if (parseInt($("#customRangePinterestLikes").val()) > 1000) {
                        var input = document.getElementById("customRangePinterestLikes");
                        input.value = 1000;

                    }
                }


                var follow_pinterest_speed = parseInt($("#customRange1").val());
                var like_pinterest_speed = parseInt($("#customRangePinterestLikes").val());


                $("#like_pinterest_set").html("Likes/day: " + $("#customRangePinterestLikes").val());

                socials.SendMessage("UpdatePinterestLikeLimit", "limit", like_pinterest_speed);

            });

            socials.SendMessage("RequestFollowStatus", "Num", DisplayFollowersNum);
            $("#slow").click(function() {
                var user_plan = $("#plan").attr("name");

                socials.SendMessage("SetSpeedPinterest", "Num", 3);
                $("#slow").addClass('active');
                $("#fast").removeClass('active');
                $("#medium").removeClass('active');

            });
            $("#medium").click(function() {
                var user_plan = $("#plan").attr("name");




                socials.SendMessage("SetSpeedPinterest", "Num", 2);
                $("#medium").addClass('active');
                $("#slow").removeClass('active');
                $("#fast").removeClass('active');

            });
            $("#fast").click(function() {
                var user_plan = $("#plan").attr("name");

                socials.SendMessage("SetSpeedPinterest", "Num", 1);



                $("#fast").addClass('active');
                $("#slow").removeClass('active');
                $("#medium").removeClass('active');

            });

            $("#set-follow-pinterest-check").click(function() {
                socials.SendMessage("SetFollowPinterest", "Value", $(this).is(':checked'));

            });
            $("#set-like-pinterest-check").click(function() {
                socials.SendMessage("SetLikePinterest", "Value", $(this).is(':checked'));

            });
            $("#set-follow-check").click(function() {
                $("#set-unfollow-check").prop("checked", false);
                SetUnfollowValue(false);
                SetFollowValue($(this).is(':checked'));
                if ($(this).is(':checked')) {
                    SetStoryValue($(this).is(':checked'));
                    $("#set-story-check").prop("checked", true);
                }
            });
            $("#set-like-check").click(function() {

                SetLikeValue($(this).is(':checked'));
                if ($(this).is(':checked')) {
                    SetStoryValue($(this).is(':checked'));
                    $("#set-story-check").prop("checked", true);
                }

            });



            $("#set-story-check").click(function() {
                SetStoryValue($(this).is(':checked'));


                if ($(this).is(':checked') != true) {
                    $("#set-like-check").prop("checked", false);
                    SetLikeValue(false);
                    $("#set-follow-check").prop("checked", false);
                    SetFollowValue(false);

                    $("#set-unfollow-check").prop("checked", false);
                    SetUnfollowValue(false);
                    $("#set-comment-check").prop("checked", false);
                    SetCommentValue(false);
                }

            });
            $("#set-comment-check").click(function() {
                SetCommentValue($(this).is(':checked'));

                if ($(this).is(':checked')) {
                    SetStoryValue($(this).is(':checked'));
                    $("#set-story-check").prop("checked", status.StartLike);
                }

            });
            $(document).on('click', '.remove-user-collect', function() {
                RemoveCollectJobUser(this);

            });
            $(document).on('click', '.remove-tag-collect', function() {
                RemoveCollectJobTagPinterest(this);
            });
            $(document).on('click', '.remove-location-collect', function() {
                RemoveLocationJobTag(this);
            });
            $(document).on('click', '.remove-comment-collect', function() {

                $(this).closest("tr").remove();
                socials.SendMessage("RemoveCommentFromList", "TagName", $(this).attr("user_id"));
                socials.SendMessage("RequestMediaStatus", "Num", DisplayLikesNum);
            });




            $("#set-unfollow-check").click(function() {
                $("#set-follow-check").prop("checked", false);
                SetFollowValue(false);

                SetUnfollowValue($(this).is(':checked'));
                if ($(this).is(':checked')) {
                    SetStoryValue($(this).is(':checked'));
                    $("#set-story-check").prop("checked", true);
                }

            });

            SetActiveSidebarItem("#sidebar-home");


            socials.SendMessage("RequestSettings", "", "");

            $("#customRange1").val(maxFollows);
            $("#customRange2").val(maxUnfollows);
            $("#customRange3").val(maxLikes);
            $("#customRange4").val(maxComments);
            $("#customRange5").val(maxStories);
            $("#follow_set").html("Follows/day: " + maxFollows);
            $("#unfollow_set").html("Unfollows/day: " + maxUnfollows);
            $("#like_set").html("Likes/day: " + maxLikes);
            $("#story_set").html("Stories/day: " + maxStories);
            $("#comment_set").html("DMs/day: " + maxComments);

            //getFollowers();

            SetActiveSidebarItem("#sidebar-home-pinterest");

        });
    });



    $("#sidebar-home-tw").click(function() {
        $(".content-wrapper").empty();
        $(".content-wrapper").load("views/twitter.html", function() {

            dashboardMode = 2;

            var data2 = [];
            if ($("#data2").attr("name") && $("#data2").attr("name").length > 2) {
                data2 = [];
            }
            var chart_data = null;
            chart_data = [];
            var minimum = 10000;
            var labels = [];
            var min = 10000000;
            var max = 0;


            for (var index = 0; index < data2.length; index++) {
                var obj = data2[index];
                if (CurrentUser && obj.user_id == CurrentUser.user_id) {
                    chart_data.push(
                        parseInt(obj.followers)
                    );
                    if (obj.followers > max) {
                        max = obj.followers;
                    }

                    if (obj.followers < min) {
                        min = obj.followers;
                    }
                    labels.push(index);
                    if (parseInt(obj.followers) < minimum) {
                        minimum = parseInt(obj.followers);
                    }
                }
            }
            if (chart_data.length > 1) {
                $('#growth').html('You grown ' + max - min + ' followers using Instoo');
            }
            let config = {
                type: 'line',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Instagram Followers',
                        backgroundColor: window.chartColors.red,
                        borderColor: window.chartColors.red,
                        data: chart_data,
                        fill: false,
                    }]
                },
                options: {
                    maintainAspectRatio: false,

                    responsive: true,
                    title: {
                        display: false,
                        text: 'Followers'
                    },
                    tooltips: {
                        mode: 'index',
                        intersect: false,
                    },
                    hover: {
                        mode: 'nearest',
                        intersect: true
                    },
                    scales: {
                        xAxes: [{
                            display: true,
                            scaleLabel: {
                                display: true,
                                labelString: 'Hour'
                            }
                        }],
                        yAxes: [{
                            display: true,
                            scaleLabel: {
                                display: true,
                                labelString: 'Followers'
                            }
                        }]
                    }
                }
            };


            mode = "twitter";
            gotAnalytics = false;


            version = chrome.runtime.getManifest().version;

            setTimeout(function() {

                if (CurrentUser && CurrentUser.username) {

                    $(".img-current-user").attr("src", CurrentUser.user_pic_url);
                    $(".img-current-user").show();

                }
            }, 240000);


            $('#version').attr('name', version);
            if (user_plan == "lifetime" || user_plan == "linkstories" || user_plan == "instoo2" || user_plan == "linkyear" || user_plan == "instoogold" || user_plan == "instooyearly" || user_plan == "instoopro" || user_plan == "instoogold2") {
                speed_limit = 300;

                $("#customRange1").attr("max", speed_limit);
                $("#customRange2").attr("max", speed_limit);
                $("#customRange3").attr("max", speed_limit);


            }

            $('#media_accounts').tagsinput({
                trimValue: true
            });

            $('#media_tags').tagsinput({
                trimValue: true
            });
            $('#media_tags2').tagsinput({
                trimValue: true
            });

            $('#comment_tags').tagsinput({
                trimValue: true,
                delimiter: ']',
                confirmKeys: [13]
            });

            $('#location_tags').tagsinput({
                trimValue: true
            });



            $('#my-btns .btn').on('click', function(event) {

                var val = $(this).find('input').val();
                if (val == "Fast") {
                    $("#fast").addClass('active');
                    $("#slow").removeClass('active');
                    $("#medium").removeClass('active');

                    if (paid_sub) {

                        socials.SendMessage("SetSpeedTwitter", "Speed", 1);

                    } else {
                        buySub();
                    }
                }

                if (val == "Slow") {
                    $("#slow").addClass('active');
                    $("#fast").removeClass('active');
                    $("#medium").removeClass('active');
                    socials.SendMessage("SetSpeedTwitter", "Speed", 8);


                }

                if (val == "Medium") {
                    $("#medium").addClass('active');
                    $("#slow").removeClass('active');
                    $("#fast").removeClass('active');
                    socials.SendMessage("SetSpeedTwitter", "Speed", 2);


                }

            });

            socials.SendMessage("RequestMediaStatus", "Num", DisplayLikesNum);


            $("#media_tags").on('itemAdded', function(event) {

                var tagsinputWidth = 200; // Width of Bootstrap Tags Input.
                var tagWidth = $('#media_tags').parent().find('.bootstrap-tagsinput span.tag').last().width(); // To get the Width of individual Tag.
                if (tagWidth > tagsinputWidth) {
                    //If Width of the Tag is more than the width of Container then we crop text of the Tag
                    var tagsText = event.item; // To Get Tags Value
                    var res = tagsText.substr(0, 5); // Here I'm displaying only first 5 Characters.(You can give any number)
                    $('#media_tags').parent().find('.bootstrap-tagsinput span.tag').last().html(res + "..." + '<i class="fas fa-times"></i>');
                }


                var tags = event.item;
                var split_tags = tags.split("#");

                for (var kk = 0; kk < split_tags.length; kk++) {
                    if (split_tags[kk].split('#').join('').split(',').join('').split(' ').join('%20').length > 0) {
                        socials.SendMessage("AddTagToListTwitter", "TagName", split_tags[kk].split('#').join('').split(',').join('').split(' ').join('%20'));
                        global_tags.push(split_tags[kk].split('#').join('').split(',').join('').split(' ').join('%20'));
                    }
                }

                socials.SendMessage("RequestMediaStatus", "Num", DisplayLikesNum);

            });


            $("#comment_tags").on('itemAdded', function(event) {


                var tagsinputWidth = 200; // Width of Bootstrap Tags Input.
                var tagWidth = $('#comment_tags').parent().find('.bootstrap-tagsinput span.tag').last().width(); // To get the Width of individual Tag.
                if (tagWidth > tagsinputWidth) {
                    //If Width of the Tag is more than the width of Container then we crop text of the Tag
                    var tagsText = event.item; // To Get Tags Value
                    var res = tagsText.substr(0, 5); // Here I'm displaying only first 5 Characters.(You can give any number)
                    $('#comment_tags').parent().find('.bootstrap-tagsinput span.tag').last().html(res + "..." + '<i class="fas fa-times"></i>');
                }


                var tags = event.item;
                var split_tags = tags;

                socials.SendMessage("AddCommentToListTwitter", "TagName", tags);


                socials.SendMessage("RequestMediaStatus", "Num", DisplayLikesNum);

            });

            $("#comment_tags").on('itemRemoved', function(event) {


                var tags = event.item;
                var split_tags = tags;

                for (var kk = 0; kk < split_tags.length; kk++) {

                    socials.SendMessage("RemoveCommentFromList", "TagName", split_tags[kk]);
                    var index = global_tags.indexOf(split_tags[kk]);
                    if (index > -1) {
                        global_tags.splice(index, 1);
                    }
                }

                socials.SendMessage("RequestMediaStatus", "Num", DisplayLikesNum);

            });
            $("#media_tags").on('itemRemoved', function(event) {


                var tags = event.item;
                var split_tags = tags.split("#");
                for (var kk = 0; kk < split_tags.length; kk++) {

                    socials.SendMessage("RemoveTagFromListTwitter", "TagName", split_tags[kk].split('#').join(''));
                    var index = global_tags.indexOf(split_tags[kk].split('#').join(''));
                    if (index > -1) {
                        global_tags.splice(index, 1);
                    }
                }

                socials.SendMessage("RequestMediaStatus", "Num", DisplayLikesNum);

            });


            $("#customRangeTwitterFollows").change(function() {
                if (paid_sub === false) {
                    if (parseInt($("#customRangeTwitterFollows").val()) > 1000) {
                        var input = document.getElementById("customRangeTwitterFollows");
                        input.value = 1000;

                    }
                }

                var follow_Twitter_speed = parseInt($("#customRangeTwitterFollows").val());
                var like_Twitter_speed = parseInt($("#customRange3").val());

                $("#follow_Twitter_set").html("Retweets/day: " + $("#customRangeTwitterFollows").val());


                socials.SendMessage("UpdateTwitterFollowLimit", "limit", follow_Twitter_speed);




            });


            $("#customRangeTwitterLikes").change(function() {
                if (paid_sub == false) {
                    if (parseInt($("#customRangeTwitterLikes").val()) > 1000) {
                        var input = document.getElementById("customRangeTwitterLikes");
                        input.value = 1000;

                    }
                }


                var follow_Twitter_speed = parseInt($("#customRange1").val());
                var like_Twitter_speed = parseInt($("#customRangeTwitterLikes").val());


                $("#like_Twitter_set").html("Likes/day: " + $("#customRangeTwitterLikes").val());

                socials.SendMessage("UpdateTwitterLikeLimit", "limit", like_Twitter_speed);

            });

            socials.SendMessage("RequestFollowStatus", "Num", DisplayFollowersNum);
            $("#slow").click(function() {
                var user_plan = $("#plan").attr("name");

                socials.SendMessage("SetSpeedTwitter", "Num", 3);
                $("#slow").addClass('active');
                $("#fast").removeClass('active');
                $("#medium").removeClass('active');

            });
            $("#medium").click(function() {
                var user_plan = $("#plan").attr("name");




                socials.SendMessage("SetSpeedTwitter", "Num", 2);
                $("#medium").addClass('active');
                $("#slow").removeClass('active');
                $("#fast").removeClass('active');

            });
            $("#fast").click(function() {
                var user_plan = $("#plan").attr("name");

                socials.SendMessage("SetSpeedTwitter", "Num", 1);



                $("#fast").addClass('active');
                $("#slow").removeClass('active');
                $("#medium").removeClass('active');

            });

            $("#set-follow-twitter-check").click(function() {
                socials.SendMessage("SetFollowTwitter", "Value", $(this).is(':checked'));
                ////////////console.log();

            });
            $("#set-like-twitter-check").click(function() {
                socials.SendMessage("SetLikeTwitter", "Value", $(this).is(':checked'));

            });
            $("#set-follow-check").click(function() {
                $("#set-unfollow-check").prop("checked", false);
                SetUnfollowValue(false);
                SetFollowValue($(this).is(':checked'));
                if ($(this).is(':checked')) {
                    SetStoryValue($(this).is(':checked'));
                    $("#set-story-check").prop("checked", true);
                }
            });
            $("#set-like-check").click(function() {

                SetLikeValue($(this).is(':checked'));
                if ($(this).is(':checked')) {
                    SetStoryValue($(this).is(':checked'));
                    $("#set-story-check").prop("checked", true);
                }

            });

            $("#set-twitter-check").click(function() {
                SetTwitterValue($(this).is(':checked'));
                $("#errors").html("<div class='alert alert-success alert-dismissible' role='alert'><button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button> To automate Twitter, open Twitter.com in a new tab, then log in. Instoo will use your hashtags to like/follow automatically, so add some hashtags.<br> Twitter is growing 2x faster than Instagram, so it's a useful platform to crosspromote both. Simply add a link to your Instagram in Twitter bios/videos, or add Twitter links in Instagram. Let us know how this new feature works for you! :)<br></div>");

            });

            $("#set-story-check").click(function() {
                SetStoryValue($(this).is(':checked'));


                if ($(this).is(':checked') != true) {
                    $("#set-like-check").prop("checked", false);
                    SetLikeValue(false);
                    $("#set-follow-check").prop("checked", false);
                    SetFollowValue(false);

                    $("#set-unfollow-check").prop("checked", false);
                    SetUnfollowValue(false);
                    $("#set-comment-check").prop("checked", false);
                    SetCommentValue(false);
                }

            });
            $("#set-comment-check").click(function() {
                SetCommentValue($(this).is(':checked'));

                if ($(this).is(':checked')) {
                    SetStoryValue($(this).is(':checked'));
                    $("#set-story-check").prop("checked", status.StartLike);
                }

            });
            $(document).on('click', '.remove-user-collect', function() {
                RemoveCollectJobUser(this);

            });
            $(document).on('click', '.remove-tag-collect', function() {
                RemoveCollectJobTagTwitter(this);
            });
            $(document).on('click', '.remove-location-collect', function() {
                RemoveLocationJobTag(this);
            });
            $(document).on('click', '.remove-comment-collect', function() {

                $(this).closest("tr").remove();
                socials.SendMessage("RemoveCommentFromList", "TagName", $(this).attr("user_id"));
                //  var index = global_tags.indexOf(user_id);
                socials.SendMessage("RequestMediaStatus", "Num", DisplayLikesNum);
                //  socials.SendMessage("RemoveCommentFromList", "TagName", );
            });




            $("#set-unfollow-check").click(function() {
                $("#set-follow-check").prop("checked", false);
                SetFollowValue(false);

                SetUnfollowValue($(this).is(':checked'));
                if ($(this).is(':checked')) {
                    SetStoryValue($(this).is(':checked'));
                    $("#set-story-check").prop("checked", true);
                }

            });

            SetActiveSidebarItem("#sidebar-home");


            socials.SendMessage("RequestSettings", "", "");

            $("#customRange1").val(maxFollows);
            $("#customRange2").val(maxUnfollows);
            $("#customRange3").val(maxLikes);
            $("#customRange4").val(maxComments);
            $("#customRange5").val(maxStories);
            $("#follow_set").html("Follows/day: " + maxFollows);
            $("#unfollow_set").html("Unfollows/day: " + maxUnfollows);
            $("#like_set").html("Likes/day: " + maxLikes);
            $("#story_set").html("Stories/day: " + maxStories);
            $("#comment_set").html("DMs/day: " + maxComments);


            SetActiveSidebarItem("#sidebar-home-tw");

        });
    });
    $("#sidebar-home").click(function() {
        $(".content-wrapper").empty();
        $(".content-wrapper").load("views/home.html", function() {


            dashboardMode = 0;

            $("#tiktoksettings").hide();


            mode = "instagram";
            var data2 = user_stats;
            console.log(data2);
            var chart_data = null;
            chart_data = [];
            follower_data = data2;
            var min = 10000000;
            var max = 0;
            var counter = 0;
            if (started) {
                var minimum = 10000;
                var labels = [];
                for (var index = data2.length - 1; index > data2.length - 100; index--) {
                    if (index >= 0) {
                        var obj = data2[index];
                        if (CurrentUser && obj.user_id == CurrentUser.user_id && (chart_data.length < 2 || Math.abs(parseInt(obj.followers) - chart_data[chart_data.length - 1]) < 200)) {
                            chart_data.push(
                                parseInt(obj.followers)
                            );
                            if (obj.followers > max) {
                                max = obj.followers;
                            }

                            if (obj.followers < min) {
                                min = obj.followers;
                            }
                            labels.push(counter);
                            counter++;
                            if (parseInt(obj.followers) < minimum) {
                                minimum = parseInt(obj.followers);
                            }
                        }
                    }
                }
                chart_data.reverse();

                if (chart_data.length > 1) {
                    $('#growth').html(max - min);
                    if (max - min > 100) {
                    }
                }
                let config = {
                    type: 'line',
                    data: {
                        labels: labels,
                        datasets: [{
                            label: 'Instagram Followers',
                            backgroundColor: window.chartColors.red,
                            borderColor: window.chartColors.red,
                            data: chart_data,
                            fill: false,
                        }]
                    },
                    options: {
                        maintainAspectRatio: false,

                        responsive: true,
                        title: {
                            display: false,
                            text: 'Followers'
                        },
                        tooltips: {
                            mode: 'index',
                            intersect: false,
                        },
                        hover: {
                            mode: 'nearest',
                            intersect: true
                        },
                        scales: {
                            xAxes: [{
                                display: true,
                                scaleLabel: {
                                    display: true,
                                    labelString: 'Hour'
                                }
                            }],
                            yAxes: [{
                                display: true,
                                scaleLabel: {
                                    display: true,
                                    labelString: 'Folowers'
                                }
                            }]
                        }
                    }
                };

                let ctx = document.getElementById('canvas').getContext('2d');
                ctx.height = 250;

                let myLine = new Chart(ctx, config);
            }
            gotAnalytics = false;

            version = chrome.runtime.getManifest().version;

            setTimeout(function() {

                if (CurrentUser && CurrentUser.username) {

                    $(".img-current-user").attr("src", CurrentUser.user_pic_url);
                    $(".img-current-user").show();

                }
            }, 240000);


            $('#version').attr('name', version);
            if (user_plan == "lifetime" || user_plan == "linkstories" || user_plan == "instoo2" || user_plan == "linkyear" || user_plan == "instoogold" || user_plan == "instooyearly" || user_plan == "instoopro" || user_plan == "instoogold2") {
                speed_limit = 1000;

                $("#customRange1").attr("max", speed_limit);
                $("#customRange2").attr("max", speed_limit);
                $("#customRange3").attr("max", speed_limit);


            } else {


            }


            $('#media_accounts').tagsinput({
                trimValue: true
            });

            $('#media_tags').tagsinput({
                trimValue: true
            });
            $('#media_tags2').tagsinput({
                trimValue: true
            });


            $("#finalstep").click(function() {
                $("#set-story-check").prop("checked", true);
                $("#set-follow-check").prop("checked", true);
                $("#set-like-check").prop("checked", true);

                SetStoryValue(true);
                SetLikeValue(true);
                SetFollowValue(true);

            });
            $('#comment_tags').tagsinput({
                trimValue: true,
                delimiter: ']',
                confirmKeys: [13]
            });

            $('#location_tags').tagsinput({
                trimValue: true
            });



            $('#my-btns .btn').on('click', function(event) {

                var val = $(this).find('input').val();
                if (val == "Fast") {
                    $("#fast").addClass('active');
                    $("#slow").removeClass('active');
                    $("#medium").removeClass('active');

                    if (paid_sub) {

                        socials.SendMessage("SetSpeed", "Speed", 1);

                    } else {
                        buySub();
                    }
                }

                if (val == "Slow") {
                    $("#slow").addClass('active');
                    $("#fast").removeClass('active');
                    $("#medium").removeClass('active');
                    socials.SendMessage("SetSpeed", "Speed", 8);


                }

                if (val == "Medium") {
                    $("#medium").addClass('active');
                    $("#slow").removeClass('active');
                    $("#fast").removeClass('active');
                    socials.SendMessage("SetSpeed", "Speed", 2);


                }

            });



            $(".backup_picture").on("error", function() {
                $(this).attr('src', 'icon.png');
            });



            if (comment_val == true || like_val == true || follow_val == true || unfollow_val == true) {
                $("#progress").attr("src", "img/disk.gif");
            } else {
                $("#progress").attr("src", "img/icon.gif");
            }

            if (paid_sub) {
                $("#sub_msg").hide();
            }
            if (paid_sub) {
                $(".sub-user").hide();

                $("#purchase").hide();
                $("#upgrade").hide();

                $("#customRange1").attr("max", speed_limit);
                $("#customRange2").attr("max", speed_limit);
                $("#customRange3").attr("max", speed_limit);
            } else {


                $("#customRange1").attr("max", speed_limit);
                $("#customRange2").attr("max", speed_limit);
                $("#customRange3").attr("max", speed_limit);

            }

            SetActiveSidebarItem("#sidebar-likes_comments");

            socials.SendMessage("RequestMediaStatus", "Num", DisplayLikesNum);



            $("#location_tags").on('itemAdded', function(event) {


                var tagsinputWidth = 200; // Width of Bootstrap Tags Input.
                var tagWidth = $('#location_tags').parent().find('.bootstrap-tagsinput span.tag').last().width(); // To get the Width of individual Tag.
                if (tagWidth > tagsinputWidth) {
                    //If Width of the Tag is more than the width of Container then we crop text of the Tag
                    var tagsText = event.item; // To Get Tags Value
                    var res = tagsText.substr(0, 5); // Here I'm displaying only first 5 Characters.(You can give any number)
                    $('#location_tags').parent().find('.bootstrap-tagsinput span.tag').last().html(res + "..." + '<i class="fas fa-times"></i>');
                }


                var tags = event.item;
                var split_tags = tags.split("#");

                for (var kk = 0; kk < split_tags.length; kk++) {
                    if (split_tags[kk].split('#').join('').split(',').join('').split(' ').join('').length > 0) {
                        socials.SendMessage("AddLocationToList", "TagName", split_tags[kk].split('#').join('').split(',').join('').split(' ').join(''));
                        global_locations.push(split_tags[kk].split('#').join('').split(',').join('').split(' ').join(''));
                    }
                }

                socials.SendMessage("RequestMediaStatus", "Num", DisplayLikesNum);

            });



            $("#media_tags").on('itemAdded', function(event) {

                var tagsinputWidth = 200; // Width of Bootstrap Tags Input.
                var tagWidth = $('#media_tags').parent().find('.bootstrap-tagsinput span.tag').last().width(); // To get the Width of individual Tag.
                if (tagWidth > tagsinputWidth) {
                    //If Width of the Tag is more than the width of Container then we crop text of the Tag
                    var tagsText = event.item; // To Get Tags Value
                    var res = tagsText.substr(0, 5); // Here I'm displaying only first 5 Characters.(You can give any number)
                    $('#media_tags').parent().find('.bootstrap-tagsinput span.tag').last().html(res + "..." + '<i class="fas fa-times"></i>');
                }


                var tags = event.item;
                var split_tags = tags.split(",");

                for (var kk = 0; kk < split_tags.length; kk++) {
                    if (split_tags[kk].split('#').join('').split(',').join('').split(' ').join('').length > 0) {
                        socials.SendMessage("AddTagToList", "TagName", split_tags[kk].split('#').join('').split(',').join('').split(' ').join(''));
                        global_tags.push(split_tags[kk].split('#').join('').split(',').join('').split(' ').join(''));
                    }
                }

                socials.SendMessage("RequestMediaStatus", "Num", DisplayLikesNum);

            });

            $("#media_tags2").on('itemAdded', function(event) {


                var tags = event.item;
                var split_tags = tags.split(",");

                for (var kk = 0; kk < split_tags.length; kk++) {
                    if (split_tags[kk].split('#').join('').split(',').join('').split(' ').join('').length > 0) {
                        socials.SendMessage("AddTagToList", "TagName", split_tags[kk].split('#').join('').split(',').join('').split(' ').join(''));
                    }
                }

                socials.SendMessage("RequestMediaStatus", "Num", DisplayLikesNum);

            });

            $("#comment_tags").on('itemAdded', function(event) {


                var tagsinputWidth = 200; // Width of Bootstrap Tags Input.
                var tagWidth = $('#comment_tags').parent().find('.bootstrap-tagsinput span.tag').last().width(); // To get the Width of individual Tag.
                if (tagWidth > tagsinputWidth) {
                    var tagsText = event.item; // To Get Tags Value
                    var res = tagsText.substr(0, 5); // Here I'm displaying only first 5 Characters.(You can give any number)
                    $('#comment_tags').parent().find('.bootstrap-tagsinput span.tag').last().html(res + "..." + '<i class="fas fa-times"></i>');
                }


                var tags = event.item;
                var split_tags = tags;
                socials.SendMessage("AddCommentToList", "TagName", tags);
              

                socials.SendMessage("RequestMediaStatus", "Num", DisplayLikesNum);

            });

            $("#comment_tags").on('itemRemoved', function(event) {


                var tags = event.item;
                var split_tags = tags;

                for (var kk = 0; kk < split_tags.length; kk++) {

                    socials.SendMessage("RemoveCommentFromList", "TagName", split_tags[kk]);
                    var index = global_tags.indexOf(split_tags[kk]);
                    if (index > -1) {
                        global_tags.splice(index, 1);
                    }
                }

                socials.SendMessage("RequestMediaStatus", "Num", DisplayLikesNum);

            });
            $("#media_tags").on('itemRemoved', function(event) {


                var tags = event.item;
                var split_tags = tags.split("#");

                for (var kk = 0; kk < split_tags.length; kk++) {

                    socials.SendMessage("RemoveTagFromList", "TagName", split_tags[kk].split('#').join(''));
                    var index = global_tags.indexOf(split_tags[kk].split('#').join(''));
                    if (index > -1) {
                        global_tags.splice(index, 1);
                    }
                }

                socials.SendMessage("RequestMediaStatus", "Num", DisplayLikesNum);

            });
            $("#media_tags2").on('itemRemoved', function(event) {


                var tags = event.item;
                var split_tags = tags.split("#");

                for (var kk = 0; kk < split_tags.length; kk++) {

                    socials.SendMessage("RemoveTagFromList", "TagName", split_tags[kk].split('#').join(''));
                    var index = global_tags.indexOf(split_tags[kk].split('#').join(''));
                    if (index > -1) {
                        global_tags.splice(index, 1);
                    }
                }

                socials.SendMessage("RequestMediaStatus", "Num", DisplayLikesNum);

            });

            $("#media_accounts").on('itemAdded', function(event) {
                socials.SendMessage("AddAccountToList", "TagName", event.item);

                console.log("CODES THAT RUS 1");

                var tagsinputWidth = 200; // Width of Bootstrap Tags Input.
                var tagWidth = $('#media_accounts').parent().find('.bootstrap-tagsinput span.tag').last().width(); // To get the Width of individual Tag.
                if (tagWidth > tagsinputWidth) {
                    //If Width of the Tag is more than the width of Container then we crop text of the Tag
                    var tagsText = event.item; // To Get Tags Value
                    var res = tagsText.substr(0, 5); // Here I'm displaying only first 5 Characters.(You can give any number)
                    $('#media_accounts').parent().find('.bootstrap-tagsinput span.tag').last().html(res + "..." + '<i class="fas fa-times"></i>');
                }



                var account_name;


                var tags = event.item;
                var split_tags = tags.split(",");

                for (var kk = 0; kk < split_tags.length; kk++) {
                    if (split_tags[kk].split(',').join('').split(' ').join('').split('@').join('').length > 0) {

                        account_name = split_tags[kk].split(',').join('').split(' ').join('').split('@').join('');

                        global_accounts.push(account_name);
                        if (account_name.match(/^[0-9a-z._]+$/) || account_name.includes(".") || account_name.includes("_")) {
                            if (account_name.includes("https://")) {
                                account_name = account_name.split("/")[3];
                            }
                            socials.SendMessage("CollectFromAccount", "account_name", account_name);
                        }



                    }
                }


            });




            $("#media_accounts").on('itemRemoved', function(event) {
                socials.SendMessage("RemoveAccountFromList", "TagName", event.item);
                var index = global_accounts.indexOf(event.item);
                if (index > -1) {
                    global_accounts.splice(index, 1);
                }
                var index = global_tags.indexOf(event.item);
                if (index > -1) {
                    global_tags.splice(index, 1);
                }
                var account_name = event.item;





            });




            $("#customRange5").change(function() {
                if (paid_sub === false) {
                    if (parseInt($("#customRange5").val()) > 10000) {
                        var input = document.getElementById("customRange5");
                        input.value = 10000;

                    }
                }
                follow_speed = parseInt($("#customRange1").val());
                unfollow_speed = parseInt($("#customRange2").val());
                like_speed = parseInt($("#customRange3").val());
                story_speed = parseInt($("#customRange5").val());
                comment_speed = parseInt($("#customRange4").val());


                $("#story_set").html("Stories/day: " + $("#customRange5").val());


                var settings = {
                    FollowSettings: {},
                    UnfollowSettings: {},
                    LikeSettings: {},
                    CommentSettings: {},
                    CollectFollowers: {},
                    CollectFollowings: {},
                    StorySettings: {},
                    TikTokSettings: {}
                };
                settings.FollowSettings = {
                    TimeMin: 0,
                    TimeMax: 0,
                    ErrorTime: 0
                };
                settings.UnfollowSettings = {
                    TimeMin: 0,
                    TimeMax: 0,
                    ErrorTime: 0
                };
                settings.CollectFollowers = {
                    TimeMin: 0,
                    TimeMax: 0,
                    ErrorTime: 0
                };
                settings.CollectFollowings = {
                    TimeMin: 0,
                    TimeMax: 0,
                    ErrorTime: 0
                };
                settings.LikeSettings = {
                    TimeMin: 0,
                    TimeMax: 0,
                    ErrorTime: 0
                };
                settings.CommentSettings = {
                    TimeMin: 0,
                    TimeMax: 0,
                    ErrorTime: 0
                };
                settings.StorySettings = {
                    TimeMin: 0,
                    TimeMax: 0,
                    ErrorTime: 0
                };

                settings.TikTokSettings = {
                    TimeMin: 0,
                    TimeMax: 0,
                    ErrorTime: 0
                };
                settings.FollowSettings.TimeMin = follow_speed;
                settings.FollowSettings.TimeMax = follow_speed + 10;
                settings.FollowSettings.ErrorTime = 400;

                settings.UnfollowSettings.TimeMin = unfollow_speed;
                settings.UnfollowSettings.TimeMax = unfollow_speed + 10;
                settings.UnfollowSettings.ErrorTime = 400;


                settings.CommentSettings.TimeMin = comment_speed;
                settings.CommentSettings.TimeMax = 450;
                settings.CommentSettings.ErrorTime = 1800;

                settings.LikeSettings.TimeMin = like_speed;
                settings.LikeSettings.TimeMax = like_speed + 10;
                settings.LikeSettings.ErrorTime = 400;

                settings.StorySettings.TimeMin = story_speed;
                settings.StorySettings.TimeMax = story_speed + 10;
                settings.StorySettings.ErrorTime = 400;
                settings.CollectFollowers.Pool = 1000;
                settings.CollectFollowers.Interval = 100;
                settings.CollectFollowers.ErrorTime = 200;

                settings.CollectFollowings.Pool = 1000;
                settings.CollectFollowings.Interval = 100;
                settings.CollectFollowings.ErrorTime = 200;


                settings.TikTokSettings.TimeMin = tiktok_speed;
                settings.TikTokSettings.TimeMax = tiktok_speed + 10;
                settings.TikTokSettings.ErrorTime = 400;

                settings.UnfollowAfterDays = UnfollowAfterDays;



                socials.SendMessage("UpdateSettings", "Settings", settings);


                settings.FollowSettings.TimeMin = Math.floor((16 * 60 * 60) / parseInt(settings.FollowSettings.TimeMin));
                settings.FollowSettings.TimeMax = Math.floor((16 * 60 * 60) / parseInt(settings.FollowSettings.TimeMin)) + 10;
                settings.FollowSettings.ErrorTime = 200;

                settings.UnfollowSettings.TimeMin = Math.floor((16 * 60 * 60) / parseInt(settings.UnfollowSettings.TimeMin));
                settings.UnfollowSettings.TimeMax = Math.floor((16 * 60 * 60) / parseInt(settings.UnfollowSettings.TimeMin)) + 10;
                settings.UnfollowSettings.ErrorTime = 200;

                settings.CommentSettings.TimeMin = comment_speed;
                settings.CommentSettings.TimeMax = 450;
                settings.CommentSettings.ErrorTime = 1800;

                settings.LikeSettings.TimeMin = Math.floor((16 * 60 * 60) / parseInt(settings.LikeSettings.TimeMin));
                settings.LikeSettings.TimeMax = like_speed + 10;
                settings.LikeSettings.ErrorTime = 200;

                settings.StorySettings.TimeMin = Math.floor((16 * 60 * 60) / parseInt(settings.StorySettings.TimeMin));
                settings.StorySettings.TimeMax = story_speed + 10;
                settings.StorySettings.ErrorTime = 200;
                global_settings = settings;

            });
            $("#customRange4").change(function() {
                if (paid_sub === false) {
                    if (parseInt($("#customRange4").val()) > 1000) {
                        var input = document.getElementById("customRange4");
                        input.value = 1000;

                    }
                }
                follow_speed = parseInt($("#customRange1").val());
                unfollow_speed = parseInt($("#customRange2").val());
                like_speed = parseInt($("#customRange3").val());
                story_speed = parseInt($("#customRange5").val());
                comment_speed = parseInt($("#customRange4").val());


                $("#comment_set").html("DMs/day: " + $("#customRange4").val());


                var settings = {
                    FollowSettings: {},
                    UnfollowSettings: {},
                    LikeSettings: {},
                    CommentSettings: {},
                    CollectFollowers: {},
                    CollectFollowings: {},
                    StorySettings: {},
                    TikTokSettings: {}
                };
                settings.FollowSettings = {
                    TimeMin: 0,
                    TimeMax: 0,
                    ErrorTime: 0
                };
                settings.UnfollowSettings = {
                    TimeMin: 0,
                    TimeMax: 0,
                    ErrorTime: 0
                };
                settings.CollectFollowers = {
                    TimeMin: 0,
                    TimeMax: 0,
                    ErrorTime: 0
                };
                settings.CollectFollowings = {
                    TimeMin: 0,
                    TimeMax: 0,
                    ErrorTime: 0
                };
                settings.LikeSettings = {
                    TimeMin: 0,
                    TimeMax: 0,
                    ErrorTime: 0
                };
                settings.CommentSettings = {
                    TimeMin: 0,
                    TimeMax: 0,
                    ErrorTime: 0
                };
                settings.StorySettings = {
                    TimeMin: 0,
                    TimeMax: 0,
                    ErrorTime: 0
                };

                settings.TikTokSettings = {
                    TimeMin: 0,
                    TimeMax: 0,
                    ErrorTime: 0
                };
                settings.FollowSettings.TimeMin = follow_speed;
                settings.FollowSettings.TimeMax = follow_speed + 10;
                settings.FollowSettings.ErrorTime = 400;

                settings.UnfollowSettings.TimeMin = unfollow_speed;
                settings.UnfollowSettings.TimeMax = unfollow_speed + 10;
                settings.UnfollowSettings.ErrorTime = 400;


                settings.CommentSettings.TimeMin = comment_speed;
                settings.CommentSettings.TimeMax = 450;
                settings.CommentSettings.ErrorTime = 1800;

                settings.LikeSettings.TimeMin = like_speed;
                settings.LikeSettings.TimeMax = like_speed + 10;
                settings.LikeSettings.ErrorTime = 400;

                settings.StorySettings.TimeMin = story_speed;
                settings.StorySettings.TimeMax = story_speed + 10;
                settings.StorySettings.ErrorTime = 400;
                settings.CollectFollowers.Pool = 1000;
                settings.CollectFollowers.Interval = 100;
                settings.CollectFollowers.ErrorTime = 200;

                settings.CollectFollowings.Pool = 1000;
                settings.CollectFollowings.Interval = 100;
                settings.CollectFollowings.ErrorTime = 200;


                settings.TikTokSettings.TimeMin = tiktok_speed;
                settings.TikTokSettings.TimeMax = tiktok_speed + 10;
                settings.TikTokSettings.ErrorTime = 400;

                settings.UnfollowAfterDays = UnfollowAfterDays;



                socials.SendMessage("UpdateSettings", "Settings", settings);


                settings.FollowSettings.TimeMin = Math.floor((16 * 60 * 60) / parseInt(settings.FollowSettings.TimeMin));
                settings.FollowSettings.TimeMax = Math.floor((16 * 60 * 60) / parseInt(settings.FollowSettings.TimeMin)) + 10;
                settings.FollowSettings.ErrorTime = 200;

                settings.UnfollowSettings.TimeMin = Math.floor((16 * 60 * 60) / parseInt(settings.UnfollowSettings.TimeMin));
                settings.UnfollowSettings.TimeMax = Math.floor((16 * 60 * 60) / parseInt(settings.UnfollowSettings.TimeMin)) + 10;
                settings.UnfollowSettings.ErrorTime = 200;

                settings.CommentSettings.TimeMin = comment_speed;
                settings.CommentSettings.TimeMax = 450;
                settings.CommentSettings.ErrorTime = 1800;

                settings.LikeSettings.TimeMin = Math.floor((16 * 60 * 60) / parseInt(settings.LikeSettings.TimeMin));
                settings.LikeSettings.TimeMax = like_speed + 10;
                settings.LikeSettings.ErrorTime = 200;

                settings.StorySettings.TimeMin = Math.floor((16 * 60 * 60) / parseInt(settings.StorySettings.TimeMin));
                settings.StorySettings.TimeMax = story_speed + 10;
                settings.StorySettings.ErrorTime = 200;
                global_settings = settings;

            });

            $("#customRange1").change(function() {
                if (paid_sub === false) {
                    if (parseInt($("#customRange1").val()) > 1000) {
                        var input = document.getElementById("customRange1");
                        input.value = 1000;

                    }
                }

                follow_speed = parseInt($("#customRange1").val());
                unfollow_speed = parseInt($("#customRange2").val());
                like_speed = parseInt($("#customRange3").val());
                story_speed = parseInt($("#customRange5").val());
                comment_speed = parseInt($("#customRange4").val());

                $("#follow_set").html("Follows/day: " + $("#customRange1").val());


                var settings = {
                    FollowSettings: {},
                    UnfollowSettings: {},
                    LikeSettings: {},
                    CommentSettings: {},
                    CollectFollowers: {},
                    CollectFollowings: {},
                    StorySettings: {},
                    TikTokSettings: {}
                };
                settings.FollowSettings = {
                    TimeMin: 0,
                    TimeMax: 0,
                    ErrorTime: 0
                };
                settings.UnfollowSettings = {
                    TimeMin: 0,
                    TimeMax: 0,
                    ErrorTime: 0
                };
                settings.CollectFollowers = {
                    TimeMin: 0,
                    TimeMax: 0,
                    ErrorTime: 0
                };
                settings.CollectFollowings = {
                    TimeMin: 0,
                    TimeMax: 0,
                    ErrorTime: 0
                };
                settings.LikeSettings = {
                    TimeMin: 0,
                    TimeMax: 0,
                    ErrorTime: 0
                };
                settings.CommentSettings = {
                    TimeMin: 0,
                    TimeMax: 0,
                    ErrorTime: 0
                };
                settings.StorySettings = {
                    TimeMin: 0,
                    TimeMax: 0,
                    ErrorTime: 0
                };
                settings.TikTokSettings = {
                    TimeMin: 0,
                    TimeMax: 0,
                    ErrorTime: 0
                };
                settings.FollowSettings.TimeMin = follow_speed;
                settings.FollowSettings.TimeMax = follow_speed + 10;
                settings.FollowSettings.ErrorTime = 400;

                settings.UnfollowSettings.TimeMin = unfollow_speed;
                settings.UnfollowSettings.TimeMax = unfollow_speed + 10;
                settings.UnfollowSettings.ErrorTime = 400;

                settings.CommentSettings.TimeMin = comment_speed;
                settings.CommentSettings.TimeMax = 450;
                settings.CommentSettings.ErrorTime = 1800;

                settings.LikeSettings.TimeMin = like_speed;
                settings.LikeSettings.TimeMax = like_speed + 10;
                settings.LikeSettings.ErrorTime = 400;


                settings.StorySettings.TimeMin = story_speed;
                settings.StorySettings.TimeMax = story_speed + 10;
                settings.StorySettings.ErrorTime = 400;

                settings.CollectFollowers.Pool = 1000;
                settings.CollectFollowers.Interval = 100;
                settings.CollectFollowers.ErrorTime = 200;

                settings.CollectFollowings.Pool = 1000;
                settings.CollectFollowings.Interval = 100;
                settings.CollectFollowings.ErrorTime = 200;


                settings.TikTokSettings.TimeMin = tiktok_speed;
                settings.TikTokSettings.TimeMax = tiktok_speed + 10;
                settings.TikTokSettings.ErrorTime = 400;
                settings.UnfollowAfterDays = UnfollowAfterDays;



                socials.SendMessage("UpdateSettings", "Settings", settings);

                settings.FollowSettings.TimeMin = Math.floor((16 * 60 * 60) / parseInt(settings.FollowSettings.TimeMin));
                settings.FollowSettings.TimeMax = Math.floor((16 * 60 * 60) / parseInt(settings.FollowSettings.TimeMin)) + 10;
                settings.FollowSettings.ErrorTime = 200;

                settings.UnfollowSettings.TimeMin = Math.floor((16 * 60 * 60) / parseInt(settings.UnfollowSettings.TimeMin));
                settings.UnfollowSettings.TimeMax = Math.floor((16 * 60 * 60) / parseInt(settings.UnfollowSettings.TimeMin)) + 10;
                settings.UnfollowSettings.ErrorTime = 200;

                settings.CommentSettings.TimeMin = comment_speed;
                settings.CommentSettings.TimeMax = 450;
                settings.CommentSettings.ErrorTime = 1800;

                settings.LikeSettings.TimeMin = Math.floor((16 * 60 * 60) / parseInt(settings.LikeSettings.TimeMin));
                settings.LikeSettings.TimeMax = like_speed + 10;
                settings.LikeSettings.ErrorTime = 200;

                settings.StorySettings.TimeMin = Math.floor((16 * 60 * 60) / parseInt(settings.StorySettings.TimeMin));
                settings.StorySettings.TimeMax = story_speed + 10;
                settings.StorySettings.ErrorTime = 200;

                global_settings = settings;


            });

            $("#customRange2").change(function() {
                if (paid_sub === false) {
                    if (parseInt($("#customRange2").val()) > 1000) {
                        var input = document.getElementById("customRange2");
                        input.value = 1000;

                    }
                }
                follow_speed = parseInt($("#customRange1").val());
                unfollow_speed = parseInt($("#customRange2").val());
                like_speed = parseInt($("#customRange3").val());
                story_speed = parseInt($("#customRange5").val());
                comment_speed = parseInt($("#customRange4").val());

                $("#unfollow_set").html("Unfollows/day: " + $("#customRange2").val());


                var settings = {
                    FollowSettings: {},
                    UnfollowSettings: {},
                    LikeSettings: {},
                    CommentSettings: {},
                    CollectFollowers: {},
                    CollectFollowings: {},
                    StorySettings: {},
                    TikTokSettings: {}
                };
                settings.FollowSettings = {
                    TimeMin: 0,
                    TimeMax: 0,
                    ErrorTime: 0
                };
                settings.UnfollowSettings = {
                    TimeMin: 0,
                    TimeMax: 0,
                    ErrorTime: 0
                };
                settings.CollectFollowers = {
                    TimeMin: 0,
                    TimeMax: 0,
                    ErrorTime: 0
                };
                settings.CollectFollowings = {
                    TimeMin: 0,
                    TimeMax: 0,
                    ErrorTime: 0
                };
                settings.LikeSettings = {
                    TimeMin: 0,
                    TimeMax: 0,
                    ErrorTime: 0
                };
                settings.CommentSettings = {
                    TimeMin: 0,
                    TimeMax: 0,
                    ErrorTime: 0
                };
                settings.StorySettings = {
                    TimeMin: 0,
                    TimeMax: 0,
                    ErrorTime: 0
                };
                settings.TikTokSettings = {
                    TimeMin: 0,
                    TimeMax: 0,
                    ErrorTime: 0
                };
                settings.FollowSettings.TimeMin = follow_speed;
                settings.FollowSettings.TimeMax = follow_speed + 10;
                settings.FollowSettings.ErrorTime = 200;

                settings.UnfollowSettings.TimeMin = unfollow_speed;
                settings.UnfollowSettings.TimeMax = unfollow_speed + 10;
                settings.UnfollowSettings.ErrorTime = 200;


                settings.CommentSettings.TimeMin = comment_speed;
                settings.CommentSettings.TimeMax = 450;
                settings.CommentSettings.ErrorTime = 1800;

                settings.LikeSettings.TimeMin = like_speed;
                settings.LikeSettings.TimeMax = like_speed + 10;
                settings.LikeSettings.ErrorTime = 200;

                settings.StorySettings.TimeMin = story_speed;
                settings.StorySettings.TimeMax = story_speed + 10;
                settings.StorySettings.ErrorTime = 400;

                settings.CollectFollowers.Pool = 1000;
                settings.CollectFollowers.Interval = 100;
                settings.CollectFollowers.ErrorTime = 200;

                settings.CollectFollowings.Pool = 1000;
                settings.CollectFollowings.Interval = 100;
                settings.CollectFollowings.ErrorTime = 200;


                settings.TikTokSettings.TimeMin = tiktok_speed;
                settings.TikTokSettings.TimeMax = tiktok_speed + 10;
                settings.TikTokSettings.ErrorTime = 400;


                settings.UnfollowAfterDays = UnfollowAfterDays;

                socials.SendMessage("UpdateSettings", "Settings", settings);

                settings.FollowSettings.TimeMin = Math.floor((16 * 60 * 60) / parseInt(settings.FollowSettings.TimeMin));
                settings.FollowSettings.TimeMax = Math.floor((16 * 60 * 60) / parseInt(settings.FollowSettings.TimeMin)) + 10;
                settings.FollowSettings.ErrorTime = 200;

                settings.UnfollowSettings.TimeMin = Math.floor((16 * 60 * 60) / parseInt(settings.UnfollowSettings.TimeMin));
                settings.UnfollowSettings.TimeMax = Math.floor((16 * 60 * 60) / parseInt(settings.UnfollowSettings.TimeMin)) + 10;
                settings.UnfollowSettings.ErrorTime = 200;

                settings.CommentSettings.TimeMin = comment_speed;
                settings.CommentSettings.TimeMax = 450;
                settings.CommentSettings.ErrorTime = 1800;

                settings.LikeSettings.TimeMin = Math.floor((16 * 60 * 60) / parseInt(settings.LikeSettings.TimeMin));
                settings.LikeSettings.TimeMax = like_speed + 10;
                settings.LikeSettings.ErrorTime = 200;

                settings.StorySettings.TimeMin = Math.floor((16 * 60 * 60) / parseInt(settings.StorySettings.TimeMin));
                settings.StorySettings.TimeMax = story_speed + 10;
                settings.StorySettings.ErrorTime = 200;
                global_settings = settings;


            });

            $("#customRange3").change(function() {
                if (paid_sub == false) {
                    if (parseInt($("#customRange3").val()) > 1000) {
                        var input = document.getElementById("customRange3");
                        input.value = 1000;

                    }
                }

                follow_speed = parseInt($("#customRange1").val());
                unfollow_speed = parseInt($("#customRange2").val());
                like_speed = parseInt($("#customRange3").val());
                story_speed = parseInt($("#customRange5").val());
                comment_speed = parseInt($("#customRange4").val());

                $("#like_set").html("Likes/day: " + $("#customRange3").val());

                var settings = {
                    FollowSettings: {},
                    UnfollowSettings: {},
                    LikeSettings: {},
                    CommentSettings: {},
                    CollectFollowers: {},
                    CollectFollowings: {},
                    StorySettings: {},
                    TikTokSettings: {}
                };
                settings.FollowSettings = {
                    TimeMin: 0,
                    TimeMax: 0,
                    ErrorTime: 0
                };
                settings.UnfollowSettings = {
                    TimeMin: 0,
                    TimeMax: 0,
                    ErrorTime: 0
                };
                settings.CollectFollowers = {
                    TimeMin: 0,
                    TimeMax: 0,
                    ErrorTime: 0
                };
                settings.CollectFollowings = {
                    TimeMin: 0,
                    TimeMax: 0,
                    ErrorTime: 0
                };
                settings.LikeSettings = {
                    TimeMin: 0,
                    TimeMax: 0,
                    ErrorTime: 0
                };
                settings.CommentSettings = {
                    TimeMin: 0,
                    TimeMax: 0,
                    ErrorTime: 0
                };
                settings.StorySettings = {
                    TimeMin: 0,
                    TimeMax: 0,
                    ErrorTime: 0
                };

                settings.TikTokSettings = {
                    TimeMin: 0,
                    TimeMax: 0,
                    ErrorTime: 0
                };

                settings.FollowSettings.TimeMin = follow_speed;
                settings.FollowSettings.TimeMax = follow_speed + 10;
                settings.FollowSettings.ErrorTime = 200;

                settings.UnfollowSettings.TimeMin = unfollow_speed;
                settings.UnfollowSettings.TimeMax = unfollow_speed + 10;
                settings.UnfollowSettings.ErrorTime = 200;

                settings.CommentSettings.TimeMin = comment_speed;
                settings.CommentSettings.TimeMax = 450;
                settings.CommentSettings.ErrorTime = 1800;

                settings.LikeSettings.TimeMin = like_speed;
                settings.LikeSettings.TimeMax = like_speed + 10;
                settings.LikeSettings.ErrorTime = 200;


                settings.StorySettings.TimeMin = story_speed;
                settings.StorySettings.TimeMax = story_speed + 10;
                settings.StorySettings.ErrorTime = 400;

                settings.CollectFollowers.Pool = 1000;
                settings.CollectFollowers.Interval = 100;
                settings.CollectFollowers.ErrorTime = 200;

                settings.CollectFollowings.Pool = 1000;
                settings.CollectFollowings.Interval = 100;
                settings.CollectFollowings.ErrorTime = 200;



                settings.TikTokSettings.TimeMin = tiktok_speed;
                settings.TikTokSettings.TimeMax = tiktok_speed + 10;
                settings.TikTokSettings.ErrorTime = 400;



                settings.UnfollowAfterDays = UnfollowAfterDays;

                socials.SendMessage("UpdateSettings", "Settings", settings);


                settings.FollowSettings.TimeMin = Math.floor((16 * 60 * 60) / parseInt(settings.FollowSettings.TimeMin));
                settings.FollowSettings.TimeMax = Math.floor((16 * 60 * 60) / parseInt(settings.FollowSettings.TimeMin)) + 10;
                settings.FollowSettings.ErrorTime = 200;

                settings.UnfollowSettings.TimeMin = Math.floor((16 * 60 * 60) / parseInt(settings.UnfollowSettings.TimeMin));
                settings.UnfollowSettings.TimeMax = Math.floor((16 * 60 * 60) / parseInt(settings.UnfollowSettings.TimeMin)) + 10;
                settings.UnfollowSettings.ErrorTime = 200;

                settings.CommentSettings.TimeMin = comment_speed;
                settings.CommentSettings.TimeMax = 450;
                settings.CommentSettings.ErrorTime = 1800;

                settings.LikeSettings.TimeMin = Math.floor((16 * 60 * 60) / parseInt(settings.LikeSettings.TimeMin));
                settings.LikeSettings.TimeMax = like_speed + 10;
                settings.LikeSettings.ErrorTime = 200;

                settings.StorySettings.TimeMin = Math.floor((16 * 60 * 60) / parseInt(settings.StorySettings.TimeMin));
                settings.StorySettings.TimeMax = story_speed + 10;
                settings.StorySettings.ErrorTime = 200;
                global_settings = settings;

            });

            socials.SendMessage("RequestFollowStatus", "Num", DisplayFollowersNum);
            $("#slow").click(function() {
                var user_plan = $("#plan").attr("name");

                socials.SendMessage("SetSpeed", "Num", 3);
                $("#slow").addClass('active');
                $("#fast").removeClass('active');
                $("#medium").removeClass('active');

            });
            $("#medium").click(function() {
                var user_plan = $("#plan").attr("name");




                socials.SendMessage("SetSpeed", "Num", 2);
                $("#medium").addClass('active');
                $("#slow").removeClass('active');
                $("#fast").removeClass('active');

            });
            $("#fast").click(function() {
                var user_plan = $("#plan").attr("name");


                socials.SendMessage("SetSpeed", "Num", 1);



                $("#fast").addClass('active');
                $("#slow").removeClass('active');
                $("#medium").removeClass('active');
            });
            $("#set-follow-check").click(function() {
                $("#set-unfollow-check").prop("checked", false);
                SetUnfollowValue(false);
                SetFollowValue($(this).is(':checked'));
                follow_val = $(this).is(':checked');
                if (follow_val) {
                    SetStoryValue($(this).is(':checked'));
                    $("#set-story-check").prop("checked", true);
                }
                if (comment_val == true || like_val == true || follow_val == true || unfollow_val == true) {
                    $("#progress").attr("src", "img/disk.gif");
                } else {
                    $("#progress").attr("src", "img/icon.gif");
                }

            });
            $("#set-like-check").click(function() {

                SetLikeValue($(this).is(':checked'));
                like_val = $(this).is(':checked');
                if (like_val) {
                    SetStoryValue($(this).is(':checked'));
                    $("#set-story-check").prop("checked", status.StartLike);
                }

                if (comment_val == true || like_val == true || follow_val == true || unfollow_val == true) {
                    $("#progress").attr("src", "img/disk.gif");
                } else {
                    $("#progress").attr("src", "img/icon.gif");
                }

            });


            $("#set-story-check").click(function() {
                SetStoryValue($(this).is(':checked'));
                like_val = $(this).is(':checked');
                if (comment_val == true || like_val == true || follow_val == true || unfollow_val == true) {
                    $("#progress").attr("src", "img/disk.gif");
                } else {
                    $("#progress").attr("src", "img/icon.gif");
                }

                if (like_val != true) {
                    $("#set-like-check").prop("checked", false);
                    SetLikeValue(false);
                    $("#set-follow-check").prop("checked", false);
                    SetFollowValue(false);

                    $("#set-unfollow-check").prop("checked", false);
                    SetUnfollowValue(false);
                    $("#set-comment-check").prop("checked", false);
                    SetCommentValue(false);
                }

            });
            $("#set-comment-check").click(function() {
                SetCommentValue($(this).is(':checked'));
                comment_val = $(this).is(':checked');
                if (comment_val == true || like_val == true || follow_val == true || unfollow_val == true) {
                    $("#progress").attr("src", "img/disk.gif");
                } else {
                    $("#progress").attr("src", "img/icon.gif");
                }
                if (comment_val) {
                    SetStoryValue($(this).is(':checked'));
                    $("#set-story-check").prop("checked", status.StartLike);
                }

            });
            $(document).on('click', '.remove-user-collect', function() {
                RemoveCollectJobUser(this);

            });
            $(document).on('click', '.remove-tag-collect', function() {
                RemoveCollectJobTag(this);
            });
            $(document).on('click', '.remove-location-collect', function() {
                RemoveLocationJobTag(this);
            });
            $(document).on('click', '.remove-comment-collect', function() {

                var user_id = $(this).attr("user_id");
                $(this).closest("tr").remove();


                socials.SendMessage("RemoveCommentFromList", "TagName", user_id);
                //  var index = global_tags.indexOf(user_id);

                socials.SendMessage("RequestMediaStatus", "Num", DisplayLikesNum);
                //  socials.SendMessage("RemoveCommentFromList", "TagName", );
            });




            $("#set-unfollow-check").click(function() {
                $("#set-follow-check").prop("checked", false);
                SetFollowValue(false);

                SetUnfollowValue($(this).is(':checked'));
                unfollow_val = $(this).is(':checked');
                if (unfollow_val) {
                    SetStoryValue($(this).is(':checked'));
                    $("#set-story-check").prop("checked", true);
                }
                if (comment_val == true || like_val == true || follow_val == true || unfollow_val == true) {
                    $("#progress").attr("src", "img/disk.gif");
                } else {
                    $("#progress").attr("src", "img/icon.gif");
                }

            });

            SetActiveSidebarItem("#sidebar-home");



            if (comment_val == true || like_val == true || follow_val == true || unfollow_val == true) {
                $("#progress").attr("src", "img/disk.gif");
            } else {
                $("#progress").attr("src", "img/icon.gif");
            }


            socials.SendMessage("RequestSettings", "", "");

            $("#customRange1").val(maxFollows);
            $("#customRange2").val(maxUnfollows);
            $("#customRange3").val(maxLikes);
            $("#customRange4").val(maxComments);
            $("#customRange5").val(maxStories);
            $("#follow_set").html("Follows/day: " + maxFollows);
            $("#unfollow_set").html("Unfollows/day: " + maxUnfollows);
            $("#like_set").html("Likes/day: " + maxLikes);
            $("#story_set").html("Stories/day: " + maxStories);
            $("#comment_set").html("DMs/day: " + maxComments);







            $("#startinstagram").parent().addClass("active");

            SetActiveSidebarItem("#sidebar-home");


        });




    });

    function onClick(e) {

        $("#snapshots").html("<h4>Settings Used:</h4> <br>Likes/Day:" + live_snapshots[e.dataPoint.x].LikeSettings.TimeMin + "<br>Follows/day:" + live_snapshots[e.dataPoint.x].FollowSettings.TimeMin + "<br>Unfollows/Day:" + live_snapshots[e.dataPoint.x].UnfollowSettings.TimeMin + "<br>");
        $("#tags").html("<h4>Hashtag Targets:</h4> <br>" + live_tags[e.dataPoint.x]);
        $("#accounts").html("<h4>Account Targets:</h4> <br>" + live_accounts[e.dataPoint.x]);

    }






    $("#sidebar-settings").click(function() {
        $(".content-wrapper").empty();
        $(".content-wrapper").load("views/settings.html", function() {
            var followers_string = "";
            for (var kk = 0; kk < user_followers.length; kk++) {
                followers_string += user_followers[kk] + ", ";

            }
            var ideal_targets_string = "";

            for (var kk = 0; kk < IdealTargets.length; kk++) {
                ideal_targets_string += IdealTargets[kk].username + " followers: " + IdealTargets[kk].followers + "<br> ";

            }

            let element = document.getElementById("minPhoto");
            element.value = minPhotos;

            let element1 = document.getElementById("minFollowing");
            element1.value = minFollowing;

            let element2 = document.getElementById("maxFollowing");
            element2.value = maxFollowing;
            let element3 = document.getElementById("minFollower");
            element3.value = minFollowers;
            let element4 = document.getElementById("maxFollower");
            element4.value = maxFollowers;
            var blacklist_string = "";

            for (var kk = 0; kk < blacklist.length; kk++) {
                blacklist_string += blacklist[kk] + ",  ";

            }


            var filter_string = "";

            for (var kk = 0; kk < filters.length; kk++) {
                filter_string += filters[kk] + ",  ";

            }
            $("#followers_list").html("Followers " + user_followers.length + "/" + follow_count_num + ": " + followers_string + "<br>");
            $("#activity_log").html("<br>Activity Log: <br>" + activity_log);
            $("#blacklist").html("<br>Blacklist of profiles to never re-visit:  <br>" + blacklist_string);
            $("#filters").html("<br>Words to avoid in bio text and photo content:  <br>" + filter_string);

            $("#IdealTargets").html("<br>Ideal Account Targets: <br>" + ideal_targets_string);

            $("#export").click(function() {
                    socials.SendMessage("ExportDatabase", "", "");


                }

            );
            $("#switch-account").click(function() {
                    socials.SendMessage("switch-account", "", "");
                    alert("Please wait 30 seconds while the Instagram tab navigates to your new profile. Make sure to log into the correct account at Instagram.com first. You can also re-install the extension to switch accounts.");


                }

            );
            $(document).on('change', '#import-file-input', function(event) {
                ImportDatabase(event);
            });

            $("#import").click(function() {
                $("#import-file-input").click();
            });

            $("#generateHashtags").click(function() {
                var theme = prompt("Enter the theme of the profile(1 word only).");
                theme = theme.split(" ")[0];


                $.ajax({
                        url: "https://instoo.com/user/getBestTargets",
                        method: "POST",
                        data: {
                            "theme": theme
                        },
                        error: function(request, status, error) {
                            var Error = {};
                            Error.String = "CollectMediaFromAccountError";
                            Error.Request = request;
                            Error.Status = status;
                            Error.AjaxError = error;

                        }
                    })
                    .done(function(dataobj) {

                        $('#hashtagsOutput').append("<h3>Best hashtags based on our logs:" + dataobj + "</h3>");

                    });


            });



            $("#cloud-backup").click(function() {

                alert("Settings saved to cloud!");

                if (roughSizeOfObject(cloud_db) < 15000000) {
                    
                }

            });
            $("#cloud-clear").click(function() {

                alert("Cloud backup cleared!");
         

                socials.SendMessage("ResetAll", "", "");

            });




            $("#add_followers").click(function() {
                var whitelist_users = [];

                for (var kk = 0; kk < user_followers.length; kk++) {
                    whitelist_users.push(user_followers[kk]);

                }
                socials.SendMessage("AddUserToWhitelistNameList", "username", whitelist_users);

            });

            $("#set-backgrounddm-check").click(function() {
                socials.SendMessage("SetDMMode", "mode", $(this).is(':checked'));


            });

            $("#set-enablefilters-check").click(function() {
                socials.SendMessage("SetEnableFilters", "mode", $(this).is(':checked'));


            });
            $("#set-collectfollowers-check").click(function() {
                socials.SendMessage("SetCollectFollowers", "mode", $(this).is(':checked'));
            });
        

            


            $("#white_accounts").on('itemAdded', function(event) {
               

            });




            $("#set-slow-check").click(function() {
                SetFollowValue();
                socials.SendMessage("SetSlowMode", "slow", $(this).is(':checked'));

            });


            $("#set-unfollowinstoo-check").prop("checked", unfollow_mode);
            $("#set-unfollowinstoo-check").click(function() {
                socials.SendMessage("Setunfollowinstoo", "unfollowInstoo", $(this).is(':checked'));

            });

            $("#set-addideal-check").prop("checked", addIdeal);

            $("#set-addideal-check").click(function() {
                socials.SendMessage("Setaddideal", "addideal", $(this).is(':checked'));

            });

         

            $("#set-collectfollowers-check").prop("checked", collectSelfFollowers);

            $("#set-backgrounddm-check").prop("checked", DMMode);
            $("#set-enablefilters-check").prop("checked", EnableFilters);

            $("#set-react-check").prop("checked", StartReact);
            $("#set-react-check").click(function() {
                StartReact = $(this).is(':checked');
                socials.SendMessage("SetReactMode", "reacts", StartReact);
                var result = $('input[type="checkbox"]:checked') // this return collection of items checked
                if (result.length > 0) {
                    reacts = [];
                    result.each(function() {
                        reacts.push($(this).val());
                    });

                    socials.SendMessage("SetReacts", "reacts", reacts);


                }

            });

            $("#set-cloud-check").click(function() {

                if (cloud_backup === false) {
                    buyCloud();
                    $("#set-cloud-check").click();
                } else {
                    user_cloud = $(this).is(':checked');
                }
            });


            $("#set-unfollowmode-check").prop("checked", unfollow_mode);

            $("#set-unfollowmode-check").click(function() {
                enable_get_followers = $(this).is(':checked');
                socials.SendMessage("SetUnfollowMode", "unfollow", $(this).is(':checked'));
            });


            $("#input-unfollow-days").bind('keyup mouseup', function() {
                socials.SendMessage("SetUnfollowDays", "days", $("#input-unfollow-days").val());

            });
            $("#input-unfollow-days").val(UnfollowAfterDays);

            socials.SendMessage("RequestWhitelistStatus", "", "");

            var modal = $('body').siblings("#AddUserToWhitelistModal");
            if (modal.length > 0) {
                modal.remove();
            }
            $('#AddUserToWhitelistModal').insertAfter($('body'));

            socials.SendMessage("RequestWhitelist", "", "");
            $("#whitelist-followings").click(function() {
                WhitelistFollowings($(this).is(':checked'));
            });


            $("#user-search").keyup(function(event) {
                event.preventDefault();

                FilterWhitelistSearch(this);

            });


            $("#add-user-search").keyup(function() {
                NewWhitelistUserSearch(this);
            });


            SetActiveSidebarItem("#sidebar-likes_comments");

            socials.SendMessage("RequestMediaStatus", "Num", DisplayLikesNum);


            socials.SendMessage("RequestSettings", "", "");

            var modal = $('body').siblings("#confirm-reset-modal");
            if (modal.length > 0) {
                modal.remove();
            }
            $('#confirm-reset-modal').insertAfter($('body'));

            $("#default-settings").click(function() {
                socials.SendMessage("ResetPool", "", "");

            });

            $("#save-settings").click(function() {
                SaveSettings();
            });




            $("#export-database").click(function() {
                socials.SendMessage("ExportDatabase", "", "");
            });

            $("#reset-all").click(function() {
                $("#confirm-reset-modal").modal('show');
            });

            $("#confirm-modal-btn-yes").click(function() {
                socials.SendMessage("ResetAll", "", "");
            });

            SetActiveSidebarItem("#sidebar-settings");
        });
    });



   

    $("#sidebar-home").click();

    socials.SendMessage("OpenInstagramFast", "Speed", 1);
})

function SetActiveSidebarItem(sidebar_id) { 
    $("#sidebar-home").addClass("sidebar-item");
    $("#sidebar-home-tiktok").addClass("sidebar-item");
    $("#sidebar-home-facebook").addClass("sidebar-item");

    $("#sidebar-home-tw").addClass("sidebar-item");
    $("#sidebar-home-tinder2").addClass("sidebar-item");
    $("#sidebar-home-link2").addClass("sidebar-item");
    $("#sidebar-home-crm").addClass("sidebar-item");
    $("#sidebar-home-pinterest").addClass("sidebar-item");

    $("#sidebar-whitelist").addClass("sidebar-item");
    $("#sidebar-settings").addClass("sidebar-item");
    $("#sidebar-analytics").addClass("sidebar-item");
    $("#sidebar-upgrades").addClass("sidebar-item");

    $("#sidebar-help").addClass("sidebar-item");
    $("#sidebar-likes_comments").addClass("sidebar-item");

    $("#sidebar-home").removeClass("sidebar-item-active");
    $("#sidebar-home-tiktok").removeClass("sidebar-item-active");
    $("#sidebar-home-facebook").removeClass("sidebar-item-active");

    $("#sidebar-home-tinder2").removeClass("sidebar-item-active");
    $("#sidebar-home-link2").removeClass("sidebar-item-active");
    $("#sidebar-home-crm").removeClass("sidebar-item-active");
    $("#sidebar-home-pinterest").removeClass("sidebar-item-active");

    $("#sidebar-home-tw").removeClass("sidebar-item-active");

    $("#sidebar-whitelist").removeClass("sidebar-item-active");
    $("#sidebar-analytics").removeClass("sidebar-item-active");
    $("#sidebar-upgrades").removeClass("sidebar-item-active");

    $("#sidebar-settings").removeClass("sidebar-item-active");
    $("#sidebar-help").removeClass("sidebar-item-active");
    $("#sidebar-likes_comments").removeClass("sidebar-item-active");

    $(sidebar_id).removeClass("sidebar-item");
    $(sidebar_id).addClass("sidebar-item-active");
}

