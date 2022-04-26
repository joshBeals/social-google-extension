class SocialActions {
    constructor() {
        this.ComPort;
        this.CurrentUser;

        this.LastUsername = "";
        this.SharedData = null;
        this.lastMsg;
        this.UserTag = "._7UhW9";
        this.StartStory = false;

        this.msg_user = "";
        this.tag_dict = {};
        this.account_dict = {};
        this.that = this;
        this.image_src = "";
        this.story_set = false;
        this.likeCount = 0;

        this.DisplayFollowersNum = 10;
        this.DisplayLikesNum = 20;

        

        this.follow_count_num = 0;
        this.following_count_num = 0;
        this.linkedin_data = [];
        this.instagram_data = [];
        this.last_ten_min = 1000000;
        this.last_ten_max = 0;
        this.user_email = "";
        this.postedInst = false;
        this.follow_speed = 0;
        this.emailed = false;
        this.enable_get_followers = false;
        this.unfollow_speed = 0;
        this.story_speed = 0;
        this.unfollowInstoo = false;
        this.post_stats = false;
        this.tiktok_data = [];
        this.tiktok_data = [];
        this.hoursLeft = 8;
        this.twitter_data = [];
        this.like_speed = 0;
        this.follower_data = [];
        this.daily_data = [];
        this.blacklist = [];
        this.filters = [];
        this.minPhotos = 1;
        this.minFollowers = 100;
        this.minFollowing = 100;
        this.maxFollowers = 100000;
        this.maxFollowing = 100000;
        this.EnableFilters = false;
        this.update_interval = false;
        this.IdealTargets = [];
        this.addIdeal = true;
        this.follower_growth = 0;
        this.set_update = false;
        this.collectSelfFollowers = false;
        this.tiktok_speed = 0;
        this.twitter_speed = 0;
        this.facebook_speed = 0;

        this.unfollow_mode = false;
        this.DMMode = true;

        this.StartTime = "";
        this.AutoActions = [];
        this.analytics = [];
        this.startDate = "";
        this.chart_data;
        this.analytics_chart;
        this.stopDate = "";
        this.cal_events = [];
        this.activity_log = "";
        this.instooData = [];
        this.schedule_list = "";
        this.user_followers = [];
        this.calendar;
        this.chart3;
        this.chart;
        this.chart2;
        this.canvas;
        this.Duration = 8;
        this.logged_in = false;
        this.startedTutorial = false;
        this.myCollectJob = {};
        this.maxStories = 1000;
        this.user_plan;
        this.comment_speed = 0;
        this.global_settings = {};
        this.global_accounts = [];
        this.gotAnalytics = false;
        this.global_tags = [];
        this.global_locations = [];
        this.started = false;
        this.paid_sub = false;
        this.my_followers = [];
        this.first = false;
        this.cloud_backup = false;
        this.start_license = 0;
        this.last_follow_count = 0;
        this.clicks = {};

        this.StartReact = false;
        this.StartSchedule = false;
        this.reacts = [];

        this.follow_val = false;
        this.like_val = false;
        this.comment_val = false;
        this.unfollow_val = false;
        this.user_cloud = true;
        this.UnfollowedPoolSize = 0;
        this.FollowedPoolSize = 0;
        this.LikePoolSize = 0;
        this.StoryPoolSize = 0;
        this.CommentPoolSize = 0;
        this.last_day = 0;
        this.day = 0;
        this.bar_follow;
        this.maxLikes = 1000;
        this.maxFollows = 1000;
        this.maxUnfollows = 1000;
        this.maxComments = 10;
        this.bar_like;
        this.bar_story;
        this.bar_comment;
        this.bar_unfollow;
        this.hashtag_dict = {};
        this.account_dict = {};
        this.counted_dict = {};
        this.clicks_dict = {};
        this.email_name;
        this.speed_limit = 100;
        this.UnfollowAfterDays;
        this.cloud_db;

        this.live_snapshots = [];
        this.live_tags = [];
        this.like_accounts = [];

        this.selectedAccount = "";
        this.loadedAccounts = false;
        this.updated_cloud = false;
    }

    OnStoryMedia = (user) => {
        let userRow =
            `
            <tr>
            <td><a href='https://www.instagram.com/` +
            user.username +
            `/' target='_blank'><img class='backup_picture img-rounded' width='64' height='64'    src='` +
            user.user_pic_url +
            `'/></a></td>
            <td class='align-mid-vertical text-instafollow-td'>` +
            user.username +
            `</td><td class='text-instafollow-td align-mid-vertical'>` +
            user.full_name +
            `(@` +
            user.target +
            `)</td>
            </tr>
            `;

        let follow_block = $("#story-block");
        let follow_table = $(follow_block).find("tbody");
        $(follow_table).prepend(userRow);

        let table_rows = $(follow_table).find("tr");
        let num_rows = table_rows.length;
        if (num_rows > this.DisplayFollowersNum) {
            let start_delete = num_rows - (num_rows - this.DisplayFollowersNum);
            $(table_rows).slice(start_delete).remove();
        }
    }

    onFollowedUser = (user, social) => {
        let userRow =
            `
            <tr>
            <td><a href='` +
            user.url +
            `' target='_blank'><img class='backup_picture img-rounded' width='64' height='64'    src='` +
            user.img +
            `'/></a></td>
            <td class='align-mid-vertical text-instafollow-td'>` +
            user.username +
            `</td><td class='text-instafollow-td align-mid-vertical'>` +
            user.username +
            `</td>
            </tr>
            `;

        let follow_block = $(`#follow-block-${social}`);
        let follow_table = $(follow_block).find("tbody");
        $(follow_table).prepend(userRow);

        let table_rows = $(follow_table).find("tr");
        let num_rows = table_rows.length;
        if (num_rows > this.DisplayFollowersNum) {
            let start_delete = num_rows - (num_rows - this.DisplayFollowersNum);
            $(table_rows).slice(start_delete).remove();
        }
    }

    OnUnfollowedUser = (user) => {
        var userRow =
            `
            <tr>
            <td><a href='https://www.instagram.com/` +
            user.username +
            `/' target='_blank'><img class='backup_picture img-rounded' width='64' height='64'    src='` +
            user.user_pic_url +
            `'/></a></td>
            <td class='align-mid-vertical text-instafollow-td'>` +
            user.username +
            `</td>
            </tr>
            `;

        var unfollow_block = $("#unfollow-block");
        var unfollow_table = $(unfollow_block).find("tbody");
        $(unfollow_table).prepend(userRow);

        var table_rows = $(unfollow_table).find("tr");
        var num_rows = table_rows.length;
        if (num_rows > this.DisplayFollowersNum) {
            var start_delete = num_rows - (num_rows - this.DisplayFollowersNum);
            $(table_rows).slice(start_delete).remove();
        }
    }

    OnLikedMedia = (media, social) => {
        this.likeCount++;
        var mediaRow =
            `
        <tr>
        <td><a href='` +
            media.url +
            `' target='_blank'><img class='backup_picture img-rounded' width='64' height='64'   src='` +
            media.img +
            `'/></a></td>
        <td class='align-mid-vertical text-instafollow-td'>` +
            media.username +
            `</td>
        </tr>
        `;

        var like_bock = $(`#like-${social}-block`);
        var like_table = $(like_bock).find("tbody");
        $(like_table).prepend(mediaRow);

        var table_rows = $(like_table).find("tr");
        var num_rows = table_rows.length;
        if (num_rows > this.DisplayLikesNum) {
            var start_delete = num_rows - (num_rows - this.DisplayLikesNum);
            $(table_rows).slice(start_delete).remove();
        }
    }

    UpdateFollowStatus = (AllUsers) => {
        var FollowedUsers = AllUsers.FollowedUsers;
        var UnfollowedUsers = AllUsers.UnfollowedUsers;
    
        var follow_block = $("#follow-block");
        var follow_table = $(follow_block).find("tbody");
        $(follow_table).empty()
    
        var unfollow_block = $("#unfollow-block");
        var unfollow_table = $(unfollow_block).find("tbody");
        $(unfollow_table).empty();
    
        for (var i = 0; i < FollowedUsers.length; i++) {
            OnFollowedUser(FollowedUsers[i]);
        }
    
        for (var i = 0; i < UnfollowedUsers.length; i++) {
            OnUnfollowedUser(UnfollowedUsers[i]);
        }
    }

    SendMessage = (tag, msgTag, msg) => {
        let sendObj = {
            Tag: tag,
        };
        sendObj[msgTag] = msg;
        if (typeof this.ComPort != "undefined") {
            this.ComPort.postMessage(sendObj);
        }
    }

    UpdateMediaStatus = (Status) => {
        if (mode == "crm") {
            var like_block = $("#crm-table");
            linkedin_data = Status.linkedin_data;
            instagram_data = Status.instagram_data;
            var target_dic = {};
            var like_table = $(like_block).find("tbody");
            $(like_table).empty();
            var html = "<br><br><table style='  border: 1px solid black; padding:10px; width:100%;'><tr><td></td><td>Contact</td><td>Email</td><td>Sales</td><td>Target</td><td>Website</td><td>Twitter</td><td>Birthday</td><td>Connected</td></tr>";
            for (var i = 0; i < linkedin_data.length; i++) {
                if (typeof linkedin_data[i] != "undefined")
                    html += "<tr><td><img width='100px' src='" + linkedin_data[i].img + "'></img></td><td><a target='_blank' rel='noopener noreferrer' href='https://linkedin" + linkedin_data[i].url.split("linkedin")[1] + "'>" + linkedin_data[i].username + "</a></td><td><a href='#' onclick='editEmail(" + i + ")'>" + linkedin_data[i].email + "</a></td><td><a href='#' onclick='editSales(" + i + ")'>" + linkedin_data[i].sales + "</a></td><td><a href='#' onclick='editTargret(" + i + ")'>" + linkedin_data[i].target + "</a></td><td><a href='#' onclick='editWebsite(" + i + ")'>" + linkedin_data[i].website + "</a></td><td><a href='#' onclick='editTwitter(" + i + ")'>" + linkedin_data[i].twitter + "</a></td><td><a href='#' onclick='editBirthday(" + i + ")'>" + linkedin_data[i].birthday + "</a></td><td><a href='#' onclick='editConnected(" + i + ")'>" + linkedin_data[i].connected + "</a></td></tr>";
                if (linkedin_data[i].target in target_dic) {
                    target_dic[linkedin_data[i].target].leads++;
                    target_dic[linkedin_data[i].target].sales += parseInt(linkedin_data[i].sales);
                    if (linkedin_data[i].connected != "none") {
                        target_dic[linkedin_data[i].target].connected++;
                    }
                } else {
                    var did_connect = 0;
                    if (linkedin_data[i].connected != "none") {
                        did_connect = 1;
                    }
    
    
                    target_dic[linkedin_data[i].target] = {
                        leads: 1,
                        sales: parseInt(linkedin_data[i].sales),
                        connected: did_connect
                    };
                }
            }
    
            for (var i = 0; i < instagram_data.length; i++) {
                if (typeof instagram_data[i] != "undefined")
                    html += "<tr><td><img width='100px' src='" + instagram_data[i].img + "'></img></td><td><a target='_blank' rel='noopener noreferrer' href='" + instagram_data[i].url + "'>" + instagram_data[i].username + "</a></td><td><a href='#' onclick='editInstaEmail(" + i + ")'>" + instagram_data[i].email + "</a></td><td><a href='#' onclick='editInstaSales(" + i + ")'>" + instagram_data[i].sales + "</a></td><td><a href='#' onclick='editInstaTargret(" + i + ")'>" + instagram_data[i].target + "</a></td><td><a href='#' onclick='editInstaWebsite(" + i + ")'>" + instagram_data[i].website + "</a></td><td><a href='#' onclick='editInstaTwitter(" + i + ")'>" + instagram_data[i].twitter + "</a></td><td><a href='#' onclick='editInstaBirthday(" + i + ")'>" + instagram_data[i].birthday + "</a></td><td><a href='#' onclick='editInstaConnected(" + i + ")'>" + instagram_data[i].connected + "</a></td></tr>";
                if (instagram_data[i].target in target_dic) {
                    target_dic[instagram_data[i].target].leads++;
                    target_dic[instagram_data[i].target].sales += parseInt(instagram_data[i].sales);
                    if (instagram_data[i].connected != "none") {
                        target_dic[instagram_data[i].target].connected++;
                    }
                } else {
    
                    var did_connect = 0;
                    if (instagram_data[i].connected != "none") {
                        did_connect = 1;
                    }
    
                    target_dic[instagram_data[i].target] = {
                        leads: 1,
                        sales: parseInt(instagram_data[i].sales),
                        connected: did_connect
                    };
                }
            }
            html += "</table><script>function editInstaConnected(num){ window.postMessage({mode: 'Instaconnected' ,edit: num} , '*');} function editInstaBirthday(num){ window.postMessage({mode: 'Instabirthday' ,edit: num} , '*');}function editInstaTwitter(num){ window.postMessage({mode: 'Instatwitter' ,edit: num} , '*');} function editInstaWebsite(num){ window.postMessage({mode: 'Instawebsite' ,edit: num} , '*');} function editInstaTarget(num){ window.postMessage({mode: 'Instatarget' ,edit: num} , '*');} function editInstaSales(num){ window.postMessage({mode: 'Instasales' ,edit: num} , '*');}function editInstaEmail(num){ window.postMessage({mode: 'Instaemail' ,edit: num} , '*');}function editConnected(num){ window.postMessage({mode: 'connected' ,edit: num} , '*');} function editBirthday(num){ window.postMessage({mode: 'birthday' ,edit: num} , '*');}function editTwitter(num){ window.postMessage({mode: 'twitter' ,edit: num} , '*');} function editWebsite(num){ window.postMessage({mode: 'website' ,edit: num} , '*');} function editTarget(num){ window.postMessage({mode: 'target' ,edit: num} , '*');} function editSales(num){ window.postMessage({mode: 'sales' ,edit: num} , '*');}function editEmail(num){ window.postMessage({mode: 'email' ,edit: num} , '*');}</script>";
          
    
            $(like_block).prepend(html);
    
    
            var target_block = $("#target-table");
            var target_table = $(target_block).find("tbody");
            $(target_table).empty();
            var html_target = "<br><br><table style='  border: 1px solid black; padding:10px; width:100%;'><tr><td>Target</td><td>Sales</td><td>Leads</td><td>Gained Followers</td></tr>";
            for (var key in target_dic) {
                if (target_dic.hasOwnProperty(key)) {
                    html_target += "<tr><td>" + key + "</td><td>" + target_dic[key].sales + "</td><td> " + target_dic[key].leads + "</td><td>" + target_dic[key].connected + "</td></tr>";
                }
    
            }
            html_target += "</table>";
    
            $(target_block).html(html_target);
    
        } else
        if (mode == "instagram") {
            var like_block = $("#like-block");
            var like_table = $(like_block).find("tbody");
            $(like_table).empty();
    
            for (var i = 0; i < Status.LikedMedias.length; i++) {
                OnLikedMedia(Status.LikedMedias[i]);
            }
            var story_block = $("#story-block");
            var story_table = $(story_block).find("tbody");
            $(story_table).empty();
    
            for (var i = 0; i < Status.StoryMedia.length; i++) {
    
                OnStoryMedia(Status.StoryMedia[i]);
            }
    
    
            var comment_block = $("#comment-block");
            var comment_table = $(comment_block).find("tbody");
            $(comment_table).empty();
    
            for (var i = 0; i < Status.CommentedMedias.length; i++) {
                OnCommentedMedia(Status.CommentedMedias[i]);
            }
    
    
    
    
            var tag_block = $("#collect-tags-block");
            var tag_table = $(tag_block).find("tbody");
            $(tag_table).empty();
            var added_tags = [];
            for (var i = 0; i < Status.Tags.length; i++) {
                var index = global_tags.indexOf(Status.Tags[i].tag_name + "<br>");
                if (index == -1) {
                    global_tags.push(Status.Tags[i].tag_name + "<br>");
                }
    
                var user = Status.Tags[i].tag_name;
                if (true) {
                    added_tags.push(user);
    
                    var userRow = `
        <tr><td style="vertical-align: middle;">
        <button class="btn-danger remove-tag-collect" user_id='` + user + `'><i class="fas fa-times"></i></button></td>
        <td>#</td>
        <td class='align-mid-vertical text-instafollow-td'>` + user + `</td>
        
        </tr>
        `;
                    $(tag_table).prepend(userRow);
                }
            }
            var tag_block2 = $("#collect-locations-block");
            var tag_table2 = $(tag_block2).find("tbody");
            $(tag_table2).empty();
            for (var i = 0; i < Status.Locations.length; i++) {
                if (index == -1) {
                }
    
                var user = Status.Locations[i].tag_name;
                if (true) {
                    added_tags.push(user);
    
                    var userRow = `
        <tr><td style="vertical-align: middle;">
        <button class="btn-danger remove-location-collect" user_id='` + user + `'><i class="fas fa-times"></i></button></td>
        
        <td class='align-mid-vertical text-instafollow-td'>` + user + `</td>
        
        </tr>
        `;
                    $(tag_table2).prepend(userRow);
                }
            }
    
           var tag_block3 = $("#collect-comments-block");
            var tag_table3 = $(tag_block3).find("tbody");
            $(tag_table3).empty();
            for (var i = 0; i < Status.Comments.length; i++) {
                if (index == -1) {
                }
    
                var user = Status.Comments[i].tag_name;
                if (true) {
                    added_tags.push(user);
    
                    var userRow = `
        <tr><td style="vertical-align: middle;">
        <button class="btn-danger remove-comment-collect" user_id="` + user + `"><i class="fas fa-times"></i></button></td>
        
        <td class='align-mid-vertical text-instafollow-td'>` + user + `</td>
        
        </tr>
        `;
                    $(tag_table3).prepend(userRow);
                }
            }
    
     
        } else if (mode == "twitter") {
            var like_block = $("#like-twitter-block");
            var like_table = $(like_block).find("tbody");
            $(like_table).empty();
    
            for (var i = 0; i < Status.LikedMediaTwitter.length; i++) {
                if (Status.LikedMediaTwitter[i]) {
                    OnLikedMediaTwitter(Status.LikedMediaTwitter[i]);
                }
            }
            var follow_block = $("#follow-block-twitter");
            var follow_table = $(follow_block).find("tbody");
            $(follow_table).empty()
    
            for (var i = 0; i < Status.FollowedPoolTwitter.length; i++) {
                if (Status.FollowedPoolTwitter[i]) {
                    OnFollowedUserTwitter(Status.FollowedPoolTwitter[i]);
                }
            }
    
            var tag_block = $("#collect-tags-block");
            var tag_table = $(tag_block).find("tbody");
            $(tag_table).empty();
            var added_tags = [];
            for (var i = 0; i < Status.TagPoolTwitter.length; i++) {
                var index = global_tags.indexOf(Status.TagPoolTwitter[i].tag_name + "<br>");
                if (index == -1) {
                    global_tags.push(Status.TagPoolTwitter[i].tag_name + "<br>");
                }
    
                var user = Status.TagPoolTwitter[i].tag_name;
                if (true) {
                    added_tags.push(user);
    
                    var userRow = `
        <tr><td style="vertical-align: middle;">
        <button class="btn-danger remove-tag-collect" user_id='` + user + `'><i class="fas fa-times"></i></button></td>
        <td></td>
        <td class='align-mid-vertical text-instafollow-td'>` + user + `</td>
        
        </tr>
        `;
                    $(tag_table).prepend(userRow);
                }
            }
    
        } else if (mode == "tiktok") {
            var like_block = $("#like-tiktok-block");
            var like_table = $(like_block).find("tbody");
            $(like_table).empty();
    
            for (var i = 0; i < Status.LikedMediaTikTok.length; i++) {
                OnLikedMediaTikTok(Status.LikedMediaTikTok[i]);
            }
            var follow_block = $("#follow-block-tiktok");
            var follow_table = $(follow_block).find("tbody");
            $(follow_table).empty()
    
            for (var i = 0; i < Status.FollowedPoolTikTok.length; i++) {
                OnFollowedUserTikTok(Status.FollowedPoolTikTok[i]);
            }
    
            var tag_block = $("#collect-tags-block");
            var tag_table = $(tag_block).find("tbody");
            $(tag_table).empty();
            var added_tags = [];
            for (var i = 0; i < Status.TagsTikTok.length; i++) {
                var index = global_tags.indexOf(Status.TagsTikTok[i].tag_name + "<br>");
                if (index == -1) {
                    global_tags.push(Status.TagsTikTok[i].tag_name + "<br>");
                }
    
                var user = Status.TagsTikTok[i].tag_name;
                if (true) {
                    added_tags.push(user);
    
                    var userRow = `
        <tr><td style="vertical-align: middle;">
        <button class="btn-danger remove-tag-collect" user_id='` + user + `'><i class="fas fa-times"></i></button></td>
        <td>#</td>
        <td class='align-mid-vertical text-instafollow-td'>` + user + `</td>
        
        </tr>
        `;
                    $(tag_table).prepend(userRow);
                }
            }
    
        } else if (mode == "facebook") {
            var like_block = $("#like-facebook-block");
            var like_table = $(like_block).find("tbody");
            $(like_table).empty();
    
            for (var i = 0; i < Status.LikedMediafacebook.length; i++) {
                OnLikedMediafacebook(Status.LikedMediafacebook[i]);
            }
            var follow_block = $("#follow-block-facebook");
            var follow_table = $(follow_block).find("tbody");
            $(follow_table).empty()
    
            for (var i = 0; i < Status.FollowedPoolfacebook.length; i++) {
                OnFollowedUserfacebook(Status.FollowedPoolfacebook[i]);
            }
    
            var tag_block = $("#collect-tags-block");
            var tag_table = $(tag_block).find("tbody");
            $(tag_table).empty();
            console.log(Status);
            var added_tags = [];
            for (var i = 0; i < Status.Tagsfacebook.length; i++) {
                var index = global_tags.indexOf(Status.Tagsfacebook[i].tag_name + "<br>");
                if (index == -1) {
                    global_tags.push(Status.Tagsfacebook[i].tag_name + "<br>");
                }
    
                var user = Status.Tagsfacebook[i].tag_name;
                if (true) {
                    added_tags.push(user);
    
                    var userRow = `
        <tr><td style="vertical-align: middle;">
        <button class="btn-danger remove-tag-collect" user_id='` + user + `'><i class="fas fa-times"></i></button></td>
        <td>#</td>
        <td class='align-mid-vertical text-instafollow-td'>` + user + `</td>
        
        </tr>
        `;
                    $(tag_table).prepend(userRow);
    
                }
            }
    
    
    
            var tag_block = $("#collect-accounts-block");
            var tag_table = $(tag_block).find("tbody");
            $(tag_table).empty();
            console.log(Status);
            var added_tags = [];
            for (var i = 0; i < Status.AccountPoolfacebook.length; i++) {
                var index = global_tags.indexOf(Status.AccountPoolfacebook[i].tag_name + "<br>");
                if (index == -1) {
                    global_tags.push(Status.AccountPoolfacebook[i].tag_name + "<br>");
                }
    
                var user = Status.AccountPoolfacebook[i].tag_name;
                if (true) {
                    added_tags.push(user);
    
                    var userRow = `
        <tr><td style="vertical-align: middle;">
        <button class="btn-danger remove-tag-collect" user_id='` + user + `'><i class="fas fa-times"></i></button></td>
        <td>#</td>
        <td class='align-mid-vertical text-instafollow-td'>` + user + `</td>
        
        </tr>
        `;
                    $(tag_table).prepend(userRow);
    
    
                }
    
            }
    
        } else if (mode == "pinterest") {
            var like_block = $("#like-pinterest-block");
            var like_table = $(like_block).find("tbody");
            $(like_table).empty();
    
            for (var i = 0; i < Status.LikedMediaPinterest.length; i++) {
                OnLikedMediaPinterest(Status.LikedMediaPinterest[i]);
            }
            var follow_block = $("#follow-block-pinterest");
            var follow_table = $(follow_block).find("tbody");
            $(follow_table).empty()
    
            for (var i = 0; i < Status.FollowedPoolPinterest.length; i++) {
                OnFollowedUserPinterest(Status.FollowedPoolPinterest[i]);
            }
    
            var tag_block = $("#collect-tags-block");
            var tag_table = $(tag_block).find("tbody");
            $(tag_table).empty();
            var added_tags = [];
            for (var i = 0; i < Status.TagsPinterest.length; i++) {
                var index = global_tags.indexOf(Status.TagsPinterest[i].tag_name + "<br>");
                if (index == -1) {
                    global_tags.push(Status.TagsPinterest[i].tag_name + "<br>");
                }
    
                var user = Status.TagsPinterest[i].tag_name;
                if (true) {
                    added_tags.push(user);
    
                    var userRow = `
        <tr><td style="vertical-align: middle;">
        <button class="btn-danger remove-tag-collect" user_id='` + user + `'><i class="fas fa-times"></i></button></td>
        <td>#</td>
        <td class='align-mid-vertical text-instafollow-td'>` + user + `</td>
        
        </tr>
        `;
                    $(tag_table).prepend(userRow);
                }
            }
    
        } else if (mode == "linkedin") {
            var like_block = $("#like-linkedin-block");
            var like_table = $(like_block).find("tbody");
            $(like_table).empty();
    
            for (var i = 0; i < Status.linkedin_data.length; i++) {
                OnLikedMediaLinkedin(Status.linkedin_data[i]);
            }
            var tag_block = $("#collect-tags-block");
            var tag_table = $(tag_block).find("tbody");
            $(tag_table).empty();
            var added_tags = [];
            for (var i = 0; i < Status.TagPoolLinkedin.length; i++) {
                var index = global_tags.indexOf(Status.TagPoolLinkedin[i].tag_name + "<br>");
                if (index == -1) {
                    global_tags.push(Status.TagPoolLinkedin[i].tag_name + "<br>");
                }
    
                var user = Status.TagPoolLinkedin[i].tag_name;
                if (true) {
                    added_tags.push(user);
    
                    var userRow = `
        <tr><td style="vertical-align: middle;">
        <button class="btn-danger remove-tag-collect" user_id='` + user + `'><i class="fas fa-times"></i></button></td>
        <td>#</td>
        <td class='align-mid-vertical text-instafollow-td'>` + user + `</td>
        
        </tr>
        `;
                    $(tag_table).prepend(userRow);
                }
            }
    
        } else if (mode == "tinder") {
    
            var tag_block3 = $("#collect-comments-block");
            var tag_table3 = $(tag_block3).find("tbody");
            $(tag_table3).empty();
            for (var i = 0; i < Status.CommentsTinder.length; i++) {
         
    
                var user = Status.CommentsTinder[i].tag_name;
                if (true) {
    
                    var userRow = `
        <tr><td style="vertical-align: middle;">
        <button class="btn-danger remove-comment-collect" user_id="` + user + `"><i class="fas fa-times"></i></button></td>
        
        <td class='align-mid-vertical text-instafollow-td'>` + user + `</td>
        
        </tr>
        `;
                    $(tag_table3).prepend(userRow);
                }
            }
    
        }
    }
}

export default SocialActions;
