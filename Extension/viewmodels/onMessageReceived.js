import SocialEvents from '../models/SocialEvents.js';
import Socials from '../models/Socials.js'; 
import SocialActions from './socialActions.js';

const socials = new Socials();
const socialActions = new SocialActions();
const socialEvents = new SocialEvents();

export default function OnMessageReceive(msg) {
    if (msg.Tag == "UserFollowComplete") {
        socials.OnFollowedUser(msg.User);
    } else if (msg.Tag == "ReloadCharts") {
        instagram_data = msg.data.instagram_data;
        linkedin_data = msg.data.linkedin_data;
        let target_dic = {};

        let like_block = $("#crm-table");
        let like_table = $(like_block).find("tbody");
        $(like_table).empty();
        let html =
            "<br><br><table style='  border: 1px solid black; padding:10px; width:100%;'><tr><td></td><td>Contact</td><td>Email</td><td>Sales</td><td>Target</td><td>Website</td><td>Twitter</td><td>Birthday</td><td>Connected</td></tr>";
        for (let i = 0; i < linkedin_data.length; i++) {
            if (typeof linkedin_data[i] != "undefined")
                html +=
                    "<tr><td><img width='100px' src='" +
                    linkedin_data[i].img +
                    "'></img></td><td><a target='_blank' rel='noopener noreferrer' href='https://linkedin" +
                    linkedin_data[i].url.split("linkedin")[1] +
                    "'>" +
                    linkedin_data[i].username +
                    "</a></td><td><a href='#' onclick='editEmail(" +
                    i +
                    ")'>" +
                    linkedin_data[i].email +
                    "</a></td><td><a href='#' onclick='editSales(" +
                    i +
                    ")'>" +
                    linkedin_data[i].sales +
                    "</a></td><td><a href='#' onclick='editTargret(" +
                    i +
                    ")'>" +
                    linkedin_data[i].target +
                    "</a></td><td><a href='#' onclick='editWebsite(" +
                    i +
                    ")'>" +
                    linkedin_data[i].website +
                    "</a></td><td><a href='#' onclick='editTwitter(" +
                    i +
                    ")'>" +
                    linkedin_data[i].twitter +
                    "</a></td><td><a href='#' onclick='editBirthday(" +
                    i +
                    ")'>" +
                    linkedin_data[i].birthday +
                    "</a></td><td><a href='#' onclick='editConnected(" +
                    i +
                    ")'>" +
                    linkedin_data[i].connected +
                    "</a></td></tr>";
            if (linkedin_data[i].target in target_dic) {
                target_dic[linkedin_data[i].target].leads++;
                target_dic[linkedin_data[i].target].sales += parseInt(
                    linkedin_data[i].sales
                );
                if (linkedin_data[i].connected != "none") {
                    target_dic[linkedin_data[i].target].connected++;
                }
            } else {
                let did_connect = 0;
                if (linkedin_data[i].connected != "none") {
                    did_connect = 1;
                }

                target_dic[linkedin_data[i].target] = {
                    leads: 1,
                    sales: parseInt(linkedin_data[i].sales),
                    connected: did_connect,
                };
            }
        }

        for (let i = 0; i < instagram_data.length; i++) {
            if (typeof instagram_data[i] != "undefined")
                html +=
                    "<tr><td><img width='100px' src='" +
                    instagram_data[i].img +
                    "'></img></td><td><a target='_blank' rel='noopener noreferrer' href='" +
                    instagram_data[i].url +
                    "'>" +
                    instagram_data[i].username +
                    "</a></td><td><a href='#' onclick='editInstaEmail(" +
                    i +
                    ")'>" +
                    instagram_data[i].email +
                    "</a></td><td><a href='#' onclick='editInstaSales(" +
                    i +
                    ")'>" +
                    instagram_data[i].sales +
                    "</a></td><td><a href='#' onclick='editInstaTargret(" +
                    i +
                    ")'>" +
                    instagram_data[i].target +
                    "</a></td><td><a href='#' onclick='editInstaWebsite(" +
                    i +
                    ")'>" +
                    instagram_data[i].website +
                    "</a></td><td><a href='#' onclick='editInstaTwitter(" +
                    i +
                    ")'>" +
                    instagram_data[i].twitter +
                    "</a></td><td><a href='#' onclick='editInstaBirthday(" +
                    i +
                    ")'>" +
                    instagram_data[i].birthday +
                    "</a></td><td><a href='#' onclick='editInstaConnected(" +
                    i +
                    ")'>" +
                    instagram_data[i].connected +
                    "</a></td></tr>";
            if (instagram_data[i].target in target_dic) {
                target_dic[instagram_data[i].target].leads++;
                target_dic[instagram_data[i].target].sales += parseInt(
                    instagram_data[i].sales
                );
                if (instagram_data[i].connected != "none") {
                    target_dic[instagram_data[i].target].connected++;
                }
            } else {
                let did_connect = 0;
                if (instagram_data[i].connected != "none") {
                    did_connect = 1;
                }

                target_dic[instagram_data[i].target] = {
                    leads: 1,
                    sales: parseInt(instagram_data[i].sales),
                    connected: did_connect,
                };
            }
        }
        html +=
            "</table><script>function editInstaConnected(num){ window.postMessage({mode: 'Instaconnected' ,edit: num} , '*');} function editInstaBirthday(num){ window.postMessage({mode: 'Instabirthday' ,edit: num} , '*');}function editInstaTwitter(num){ window.postMessage({mode: 'Instatwitter' ,edit: num} , '*');} function editInstaWebsite(num){ window.postMessage({mode: 'Instawebsite' ,edit: num} , '*');} function editInstaTarget(num){ window.postMessage({mode: 'Instatarget' ,edit: num} , '*');} function editInstaSales(num){ window.postMessage({mode: 'Instasales' ,edit: num} , '*');}function editInstaEmail(num){ window.postMessage({mode: 'Instaemail' ,edit: num} , '*');}function editConnected(num){ window.postMessage({mode: 'connected' ,edit: num} , '*');} function editBirthday(num){ window.postMessage({mode: 'birthday' ,edit: num} , '*');}function editTwitter(num){ window.postMessage({mode: 'twitter' ,edit: num} , '*');} function editWebsite(num){ window.postMessage({mode: 'website' ,edit: num} , '*');} function editTarget(num){ window.postMessage({mode: 'target' ,edit: num} , '*');} function editSales(num){ window.postMessage({mode: 'sales' ,edit: num} , '*');}function editEmail(num){ window.postMessage({mode: 'email' ,edit: num} , '*');}</script>";
        $(like_block).html(html);

        let target_block = $("#target-table");
        let target_table = $(target_block).find("tbody");
        $(target_table).empty();
        let html_target =
            "<br><br><table style='  border: 1px solid black; padding:10px; width:100%;'><tr><td>Target</td><td>Sales</td><td>Leads</td><td>Gained Followers</td></tr>";
        for (let key in target_dic) {
            if (target_dic.hasOwnProperty(key)) {
                html_target +=
                    "<tr><td>" +
                    key +
                    "</td><td>" +
                    target_dic[key].sales +
                    "</td><td> " +
                    target_dic[key].leads +
                    "</td><td>" +
                    target_dic[key].connected +
                    "</td></tr>";
            }
        }
        html_target += "</table>";

        $(target_block).html(html_target);
    } else if (msg.Tag == "setLanguage") {
        $("#errors").prepend(
            "<div class='alert alert-success alert-dismissible' role='alert'><button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button>Instoo has detected that the langauge at instagram.com is not set to English. Please follow these steps: <br>1) Click your profile picture in the top right corner, then click Profile. <br>2) Click Edit Profile.<br>3) Click Language at the very bottom of the page and select a new language.<br>4) Select English. It's in small gray text on the last line of the page to make it easy.</div>"
        );
    } else if (msg.Tag == "UserFollowCompleteTikTok") {
        socialActions.OnFollowedUser(msg.User, "tiktok");
    } else if (msg.Tag == "UserFollowCompletefacebook") {
        socialActions.OnFollowedUser(msg.User, "facebook");
    } else if (msg.Tag == "UserFollowCompletePinterest") {
        socialActions.OnFollowedUser(msg.User, "pinterest");
    } else if (msg.Tag == "UserFollowCompleteLinkedin") {
        socialActions.OnFollowedUser(msg.User, "linkedin");
    } else if (msg.Tag == "RefreshPage") {
        window.location.reload(true);
    } else if (msg.Tag == "UserFollowCompleteTwitter") {
        socialActions.OnFollowedUser(msg.User, "twitter");
    } else if (msg.Tag == "UserLikeCompleteTikTok") {
        socialActions.OnLikedMedia(msg.User);
    } else if (msg.Tag == "UserLikeCompletefacebook") {
        socialActions.OnLikedMedia(msg.User);
    } else if (msg.Tag == "UserLikeCompletePinterest") {
        socialActions.OnLikedMedia(msg.User);
    } else if (msg.Tag == "UserLikeCompleteLinkedin") {
        socialActions.OnLikedMedia(msg.User);
    } else if (msg.Tag == "UserLikeCompleteTinder") {
        socialActions.OnLikedMedia(msg.User);
    } else if (msg.Tag == "UserLikeCompleteTwitter") {
        socialActions.OnLikedMedia(msg.User);
    } else if (msg.Tag == "DispatchFollowStatus") {
        socialActions.UpdateFollowStatus(msg.AllUsers);
    } else if (msg.Tag == "SetPhoto") {
        $(".img-current-user").attr("src", msg.user.profile_pic_url);
        socials.CurrentUser = msg.user;

        user_email = $("#email").attr("name");
        let user_plan = $("#plan").attr("name");

        $.post(
            "https://instoo.com/user/postInst",
            {
                email: user_email,
                username: socials.CurrentUser.username,
            },
            function (returnedData) {
                if (
                    returnedData &&
                    returnedData.length > 1 &&
                    socials.CurrentUser.username != "nala_awoon" &&
                    !user_email.includes("ikeda.group")
                ) {
                    $("#trial").show();
                    socialEvents.SetFollowValue(false);
                    socialEvents.SetUnfollowValue(false);
                    socialEvents.SetStoryValue(false);
                    $("#set-story-check").prop("checked", false);

                    $("#set-follow-check").prop("checked", false);
                    $("#set-unfollow-check").prop("checked", false);
                    $("#set-story-check").prop("checked", false);
                    $("#set-like-check").prop("checked", false);
                    $("#set-comment-check").prop("checked", false);
                }
            }
        );
    } else if (msg.Tag == "LoadCloud") {
        started = true;
        let loaded = false;
        let obj = [];

        socials.SendMessage("loadLocal", "Database", "obj");
    } else if (msg.Tag == "RecentFollowers") {
        let recentFollowers = msg.ExtractedUsers;
        instooData = [];
        for (let kk = 0; kk < recentFollowers.length; kk++) {
            let found = checkObject(
                recentFollowers[kk].user_id,
                instooData
            );
            if (found.length > 0) {
            }
        }
    } else if (msg.Tag == "RankedID") {
    } else if (msg.Tag == "LoopingTargets") {
        $("#errors").prepend(
            "<div class='alert alert-success alert-dismissible' role='alert'><button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button>Instoo is looping your targets(" +
                msg.Media +
                "), which means they do not actively gain followers fast enough.<br><b> If you have 20+ account targets, please remove these. You should add 20 more account targets with under 100k followers.</b><br> Bot auto-turned off to avoid looping the same targets. The first day after adding new targets, make sure they actively gain relevant followers. It will tell you which target all profiles came from on the Instagram tab and Instoo tab,so you can remove irrelevant ones. </div>"
        );

        $("#set-story-check").prop("checked", false);
        $("#set-follow-check").prop("checked", false);
        $("#set-like-check").prop("checked", false);

        socialEvents.SetStoryValue(false);
        socialEvents.SetLikeValue(false);
        socialEvents.SetFollowValue(false);
    } else if (msg.Tag == "userData") {
        $("#follow_count").html(
            "followers: " + msg.User.edge_followed_by.count
        );
        follow_count_num = msg.User.edge_followed_by.count;
        if (follow_count_num < 1000) {
            socials.SendMessage("SetSpeed", "Num", 2);

            $("#fast").removeClass("active");
            $("#slow").removeClass("active");
            $("#medium").addClass("active");
        }

        if (follow_count_num < 200) {
            socials.SendMessage("SetSpeed", "Num", 8);

            $("#fast").removeClass("active");
            $("#slow").addClass("active");
            $("#medium").removeClass("active");
        }
        let account_id = msg.User.id;

        let UserData = {
            username: msg.User.username,
            user_id: msg.User.id,
            full_name: msg.User.full_name,
            user_pic_url: msg.User.profile_pic_url,
        };

        let CollectJob = {};
        CollectJob.user_id = account_id;
        CollectJob.cursor_key = null;
        CollectJob.user = UserData;
        myCollectJob = CollectJob;
        socials.SendMessage("myCollectJob", "Job", CollectJob);
    } else if (msg.Tag == "gotStats") {
        follow_count_num = parseInt(
            msg.followers.followers
                .split(",")
                .join("")
                .split(".")
                .join("")
                .split(" ")
                .join("")
        );
        following_count_num = parseInt(
            msg.followers.following
                .split(",")
                .join("")
                .split(".")
                .join("")
                .split(" ")
                .join("")
        );

        let d = new Date();
        let currentHour = d.getHours();
        if (follow_count_num < 1000) {
            socials.SendMessage("SetSpeed", "Num", 2);

            $("#fast").removeClass("active");
            $("#slow").removeClass("active");
            $("#medium").addClass("active");
        }

        if (follow_count_num < 200) {
            socials.SendMessage("SetSpeed", "Num", 3);

            $("#fast").removeClass("active");
            $("#slow").addClass("active");
            $("#medium").removeClass("active");
        }
        let d_num = Date.parse(d);
        d_num = Math.floor(d_num / (1000 * 60 * 60));
        let dat = {
            followers: follow_count_num,
            hour: d_num,
            user_id: msg.followers.socials.CurrentUser.user_id,
            mode: mode,
        };
        if (follow_count_num > 10) {
            let data = {
                followers: follow_count_num,
                hour: d_num,
                user_id: socials.CurrentUser.user_id,
                mode: "instagram",
            };

            socials.SendMessage("PostStats", "data", data);
        }
    } else if (msg.Tag == "SendUserHeader") {
        socials.SendMessage("GotUserHeader", "User", socials.CurrentUser);
    } else if (msg.Tag == "BackupCloud") {
        if (enable_get_followers) {
        }
        if (true) {
        }
    } else if (msg.Tag == "StatusUpdate") {
        socialActions.UpdateStatus(msg.Status);
    } else if (msg.Tag == "SkipFollowStory") {
        $("#errors").html(
            "<div class='alert alert-success alert-dismissible' role='alert'><button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button>" +
                msg.text +
                " </div>"
        );
    } else if (msg.Tag == "UpdateStory") {
    } else if (msg.Tag == "GotDatabase") {
        GotDatabase(msg.Database);
    } else if (msg.Tag == "SendFollowers") {
        socialActions.UpdateFollowers(msg.Status);
    } else if (msg.Tag == "blocked") {
        window.location.href = "https://instoo.com/pause";

        $("#set-story-check").prop("checked", false);
        $("#set-follow-check").prop("checked", false);
        $("#set-like-check").prop("checked", false);

        socialEvents.SetStoryValue(false);
        socialEvents.SetLikeValue(false);
        socialEvents.SetFollowValue(false);
    } else if (msg.Tag == "SendAccountsDict") {
        socialActions.UpdateAccountsDict(msg.Accounts);
    } else if (msg.Tag == "SendTagsDict") {
        socialActions.UpdateTagsDict(msg.Hashtags);
    } else if (msg.Tag == "UserUnfollowComplete") {
        socialActions.OnUnfollowedUser(msg.User);
    } else if (msg.Tag == "OnLikedMediaComplete") {
        socialActions.OnLikedMedia(msg.Media);
    } else if (msg.Tag == "OnStoryMediaComplete") {
        socialActions.OnStoryMedia(msg.Media);
    } else if (msg.Tag == "Pause") {
        $("#set-follow-check").prop("checked", false);
        $("#set-unfollow-check").prop("checked", false);
        $("#set-story-check").prop("checked", false);
        $("#set-like-check").prop("checked", false);
        $("#set-comment-check").prop("checked", false);

        // OnStoryMedia(msg.Media);
    } else if (msg.Tag == "OnCommentedMediaComplete") {
        socialActions.OnCommentedMedia(msg.Media);
    } else if (msg.Tag == "Settings") {
        socialActions.SetSettings(msg.Settings);
    } else if (msg.Tag == "AddedWhitelistUsers") {
        socialActions.ClearWhitelistTable();
        socialActions.AddedWhitelistUsers(msg.Users);
    } else if (msg.Tag == "UpdatedWhitelistUsers") {
        AddedWhitelistUsers(msg.Users);
    } else if (msg.Tag == "UserLoggedIn") {
        socials.logged_in = true;
        socials.loadedAccounts = false;

        socials.SendMessage("RequestFollowStatus", "Num", socials.DisplayFollowersNum);
        $("#overlay").hide();
        if (paid_sub) {
            socials.SendMessage("SetPaidMode", "paid", true);
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

        if (
            comment_val == true ||
            like_val == true ||
            follow_val == true ||
            unfollow_val == true
        ) {
            $("#progress").attr("src", "img/disk.gif");
        } else {
            $("#progress").attr("src", "img/icon.gif");
        }
    } else if (msg.Tag == "UserLoggedOut") {
        socials.logged_in = false;
        socials.loadedAccounts = false;
        if (
            !(socials.mode == "twitter") &&
            !(socials.mode == "tiktok") &&
            !$("#set-story-check").is(":checked") &&
            !$("#set-like-check").is(":checked") &&
            !$("#set-follow-check").is(":checked") &&
            !$("#set-unfollow-check").is(":checked") &&
            !$("#set-comment-check").is(":checked")
        ) {
            $("#overlay").show();
        }
        setTimeout(function () {
            if (!socials.logged_in) {
                socials.SendMessage("OpenInstagram", "Speed", 1);
            }
        }, 10000);
    } else if (msg.Tag == "ReceiveFilteredFollowings") {
        socialActions.ProcessFilteredFollowings(msg.Users);
    } else if (msg.Tag == "RankTargets") {
        socialActions.RankTargets(msg.recents);
    } else if (msg.Tag == "ReceiveWhitelistStatus") {
        socialActions.SetWhitelistStatus(msg.Status);
    } else if (msg.Tag == "UpdateMediaStatus") {
        socialActions.UpdateMediaStatus(msg.Status);
    } else if (msg.Tag == "Error" && msg.type == "FollowError") {
        $("#errors").html(
            "<div class='alert alert-danger alert-dismissible' role='alert'><button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button><strong>Follow Usage Limit Warning!</strong> The bot is slowing down on follows for 30 minutes. Log out at Instagram.com to delete your cookies. If socials message persists, test Instagram.com to check if you have a 3 day block, and wait if you do. We recommend using the story viewer, since it has much higher limits. </div>"
        );
    } else if (msg.Tag == "Error" && msg.type == "UnfollowError") {
        $("#errors").html(
            "<div class='alert alert-danger alert-dismissible' role='alert'><button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button><strong>Unfollow Usage Limit Warning!</strong> The bot is slowing down on unfollows for 30 minutes.  Log out at Instagram.com to delete your cookies. If socials message persists, test Instagram.com to check if you have a 3 day block, and wait if you do. We recommend using the story viewer, since it has much higher limits. </div>"
        );
    } else if (msg.Tag == "Error" && msg.type == "LikeError") {
        $("#errors").html(
            "<div class='alert alert-danger alert-dismissible' role='alert'><button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button><strong>Likes Usage Limit Warning!</strong> The bot is sleeping on likes for 30 minutes.  Log out at Instagram.com to delete your cookies. If socials message persists, test Instagram.com to check if you have a 3 day block, and wait if you do. We recommend using the story viewer, since it has much higher limits. </div>"
        );
    } else if (msg.Tag == "Error" && msg.type == "StoryError") {
        $("#errors").html(
            "<div class='alert alert-success alert-dismissible' role='alert'><button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button>Randomly sleeping on story viewing for a bit to appear human. Hang tight for 2-30 minutes.</div>"
        );
    } else if (msg.Tag == "Error" && msg.type == "CommentError") {
        $("#errors").html(
            "<div class='alert alert-danger alert-dismissible' role='alert'><button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button><strong>Comments Usage Limit Warning!</strong> The bot is sleeping on comments for 30 minutes.  Log out at Instagram.com to delete your cookies. If socials message persists, test Instagram.com to check if you have a 3 day block, and wait if you do. We recommend using the story viewer, since it has much higher limits. </div>"
        );
    }
}