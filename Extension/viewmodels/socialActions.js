import SocialEvents from "../models/SocialEvents.js";
import Social from "../models/Socials.js";

const social = new Social();
const socialEvents = new SocialEvents();

class SocialActions extends Social {
    constructor() {
        super();
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
        if (num_rows > social.DisplayFollowersNum) {
            let start_delete =
                num_rows - (num_rows - social.DisplayFollowersNum);
            $(table_rows).slice(start_delete).remove();
        }
    };

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
        if (num_rows > social.DisplayFollowersNum) {
            let start_delete =
                num_rows - (num_rows - social.DisplayFollowersNum);
            $(table_rows).slice(start_delete).remove();
        }
    };

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
        if (num_rows > social.DisplayFollowersNum) {
            var start_delete =
                num_rows - (num_rows - social.DisplayFollowersNum);
            $(table_rows).slice(start_delete).remove();
        }
    };

    OnLikedMedia = (media, social) => {
        social.likeCount++;
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
        if (num_rows > social.DisplayLikesNum) {
            var start_delete = num_rows - (num_rows - social.DisplayLikesNum);
            $(table_rows).slice(start_delete).remove();
        }
    };

    UpdateFollowStatus = (AllUsers) => {
        var FollowedUsers = AllUsers.FollowedUsers;
        var UnfollowedUsers = AllUsers.UnfollowedUsers;

        var follow_block = $("#follow-block");
        var follow_table = $(follow_block).find("tbody");
        $(follow_table).empty();

        var unfollow_block = $("#unfollow-block");
        var unfollow_table = $(unfollow_block).find("tbody");
        $(unfollow_table).empty();

        for (var i = 0; i < FollowedUsers.length; i++) {
            OnFollowedUser(FollowedUsers[i]);
        }

        for (var i = 0; i < UnfollowedUsers.length; i++) {
            OnUnfollowedUser(UnfollowedUsers[i]);
        }
    };

    UpdateMediaStatus = (Status) => {
        if (this.mode == "crm") {
            var like_block = $("#crm-table");
            linkedin_data = Status.linkedin_data;
            instagram_data = Status.instagram_data;
            var target_dic = {};
            var like_table = $(like_block).find("tbody");
            $(like_table).empty();
            var html =
                "<br><br><table style='  border: 1px solid black; padding:10px; width:100%;'><tr><td></td><td>Contact</td><td>Email</td><td>Sales</td><td>Target</td><td>Website</td><td>Twitter</td><td>Birthday</td><td>Connected</td></tr>";
            for (var i = 0; i < linkedin_data.length; i++) {
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
                    var did_connect = 0;
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

            for (var i = 0; i < instagram_data.length; i++) {
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
                    var did_connect = 0;
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

            $(like_block).prepend(html);

            var target_block = $("#target-table");
            var target_table = $(target_block).find("tbody");
            $(target_table).empty();
            var html_target =
                "<br><br><table style='  border: 1px solid black; padding:10px; width:100%;'><tr><td>Target</td><td>Sales</td><td>Leads</td><td>Gained Followers</td></tr>";
            for (var key in target_dic) {
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
        } else if (this.mode == "instagram") {
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
                var index = global_tags.indexOf(
                    Status.Tags[i].tag_name + "<br>"
                );
                if (index == -1) {
                    global_tags.push(Status.Tags[i].tag_name + "<br>");
                }

                var user = Status.Tags[i].tag_name;
                if (true) {
                    added_tags.push(user);

                    var userRow =
                        `
        <tr><td style="vertical-align: middle;">
        <button class="btn-danger remove-tag-collect" user_id='` +
                        user +
                        `'><i class="fas fa-times"></i></button></td>
        <td>#</td>
        <td class='align-mid-vertical text-instafollow-td'>` +
                        user +
                        `</td>
        
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

                    var userRow =
                        `
        <tr><td style="vertical-align: middle;">
        <button class="btn-danger remove-location-collect" user_id='` +
                        user +
                        `'><i class="fas fa-times"></i></button></td>
        
        <td class='align-mid-vertical text-instafollow-td'>` +
                        user +
                        `</td>
        
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

                    var userRow =
                        `
        <tr><td style="vertical-align: middle;">
        <button class="btn-danger remove-comment-collect" user_id="` +
                        user +
                        `"><i class="fas fa-times"></i></button></td>
        
        <td class='align-mid-vertical text-instafollow-td'>` +
                        user +
                        `</td>
        
        </tr>
        `;
                    $(tag_table3).prepend(userRow);
                }
            }
        } else if (this.mode == "twitter") {
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
            $(follow_table).empty();

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
                var index = global_tags.indexOf(
                    Status.TagPoolTwitter[i].tag_name + "<br>"
                );
                if (index == -1) {
                    global_tags.push(
                        Status.TagPoolTwitter[i].tag_name + "<br>"
                    );
                }

                var user = Status.TagPoolTwitter[i].tag_name;
                if (true) {
                    added_tags.push(user);

                    var userRow =
                        `
        <tr><td style="vertical-align: middle;">
        <button class="btn-danger remove-tag-collect" user_id='` +
                        user +
                        `'><i class="fas fa-times"></i></button></td>
        <td></td>
        <td class='align-mid-vertical text-instafollow-td'>` +
                        user +
                        `</td>
        
        </tr>
        `;
                    $(tag_table).prepend(userRow);
                }
            }
        } else if (this.mode == "tiktok") {
            var like_block = $("#like-tiktok-block");
            var like_table = $(like_block).find("tbody");
            $(like_table).empty();

            for (var i = 0; i < Status.LikedMediaTikTok.length; i++) {
                OnLikedMediaTikTok(Status.LikedMediaTikTok[i]);
            }
            var follow_block = $("#follow-block-tiktok");
            var follow_table = $(follow_block).find("tbody");
            $(follow_table).empty();

            for (var i = 0; i < Status.FollowedPoolTikTok.length; i++) {
                OnFollowedUserTikTok(Status.FollowedPoolTikTok[i]);
            }

            var tag_block = $("#collect-tags-block");
            var tag_table = $(tag_block).find("tbody");
            $(tag_table).empty();
            var added_tags = [];
            for (var i = 0; i < Status.TagsTikTok.length; i++) {
                var index = global_tags.indexOf(
                    Status.TagsTikTok[i].tag_name + "<br>"
                );
                if (index == -1) {
                    global_tags.push(Status.TagsTikTok[i].tag_name + "<br>");
                }

                var user = Status.TagsTikTok[i].tag_name;
                if (true) {
                    added_tags.push(user);

                    var userRow =
                        `
        <tr><td style="vertical-align: middle;">
        <button class="btn-danger remove-tag-collect" user_id='` +
                        user +
                        `'><i class="fas fa-times"></i></button></td>
        <td>#</td>
        <td class='align-mid-vertical text-instafollow-td'>` +
                        user +
                        `</td>
        
        </tr>
        `;
                    $(tag_table).prepend(userRow);
                }
            }
        } else if (this.mode == "facebook") {
            var like_block = $("#like-facebook-block");
            var like_table = $(like_block).find("tbody");
            $(like_table).empty();

            for (var i = 0; i < Status.LikedMediafacebook.length; i++) {
                OnLikedMediafacebook(Status.LikedMediafacebook[i]);
            }
            var follow_block = $("#follow-block-facebook");
            var follow_table = $(follow_block).find("tbody");
            $(follow_table).empty();

            for (var i = 0; i < Status.FollowedPoolfacebook.length; i++) {
                OnFollowedUserfacebook(Status.FollowedPoolfacebook[i]);
            }

            var tag_block = $("#collect-tags-block");
            var tag_table = $(tag_block).find("tbody");
            $(tag_table).empty();
            console.log(Status);
            var added_tags = [];
            for (var i = 0; i < Status.Tagsfacebook.length; i++) {
                var index = global_tags.indexOf(
                    Status.Tagsfacebook[i].tag_name + "<br>"
                );
                if (index == -1) {
                    global_tags.push(Status.Tagsfacebook[i].tag_name + "<br>");
                }

                var user = Status.Tagsfacebook[i].tag_name;
                if (true) {
                    added_tags.push(user);

                    var userRow =
                        `
        <tr><td style="vertical-align: middle;">
        <button class="btn-danger remove-tag-collect" user_id='` +
                        user +
                        `'><i class="fas fa-times"></i></button></td>
        <td>#</td>
        <td class='align-mid-vertical text-instafollow-td'>` +
                        user +
                        `</td>
        
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
                var index = global_tags.indexOf(
                    Status.AccountPoolfacebook[i].tag_name + "<br>"
                );
                if (index == -1) {
                    global_tags.push(
                        Status.AccountPoolfacebook[i].tag_name + "<br>"
                    );
                }

                var user = Status.AccountPoolfacebook[i].tag_name;
                if (true) {
                    added_tags.push(user);

                    var userRow =
                        `
        <tr><td style="vertical-align: middle;">
        <button class="btn-danger remove-tag-collect" user_id='` +
                        user +
                        `'><i class="fas fa-times"></i></button></td>
        <td>#</td>
        <td class='align-mid-vertical text-instafollow-td'>` +
                        user +
                        `</td>
        
        </tr>
        `;
                    $(tag_table).prepend(userRow);
                }
            }
        } else if (this.mode == "pinterest") {
            var like_block = $("#like-pinterest-block");
            var like_table = $(like_block).find("tbody");
            $(like_table).empty();

            for (var i = 0; i < Status.LikedMediaPinterest.length; i++) {
                OnLikedMediaPinterest(Status.LikedMediaPinterest[i]);
            }
            var follow_block = $("#follow-block-pinterest");
            var follow_table = $(follow_block).find("tbody");
            $(follow_table).empty();

            for (var i = 0; i < Status.FollowedPoolPinterest.length; i++) {
                OnFollowedUserPinterest(Status.FollowedPoolPinterest[i]);
            }

            var tag_block = $("#collect-tags-block");
            var tag_table = $(tag_block).find("tbody");
            $(tag_table).empty();
            var added_tags = [];
            for (var i = 0; i < Status.TagsPinterest.length; i++) {
                var index = global_tags.indexOf(
                    Status.TagsPinterest[i].tag_name + "<br>"
                );
                if (index == -1) {
                    global_tags.push(Status.TagsPinterest[i].tag_name + "<br>");
                }

                var user = Status.TagsPinterest[i].tag_name;
                if (true) {
                    added_tags.push(user);

                    var userRow =
                        `
        <tr><td style="vertical-align: middle;">
        <button class="btn-danger remove-tag-collect" user_id='` +
                        user +
                        `'><i class="fas fa-times"></i></button></td>
        <td>#</td>
        <td class='align-mid-vertical text-instafollow-td'>` +
                        user +
                        `</td>
        
        </tr>
        `;
                    $(tag_table).prepend(userRow);
                }
            }
        } else if (this.mode == "linkedin") {
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
                var index = global_tags.indexOf(
                    Status.TagPoolLinkedin[i].tag_name + "<br>"
                );
                if (index == -1) {
                    global_tags.push(
                        Status.TagPoolLinkedin[i].tag_name + "<br>"
                    );
                }

                var user = Status.TagPoolLinkedin[i].tag_name;
                if (true) {
                    added_tags.push(user);

                    var userRow =
                        `
        <tr><td style="vertical-align: middle;">
        <button class="btn-danger remove-tag-collect" user_id='` +
                        user +
                        `'><i class="fas fa-times"></i></button></td>
        <td>#</td>
        <td class='align-mid-vertical text-instafollow-td'>` +
                        user +
                        `</td>
        
        </tr>
        `;
                    $(tag_table).prepend(userRow);
                }
            }
        } else if (this.mode == "tinder") {
            var tag_block3 = $("#collect-comments-block");
            var tag_table3 = $(tag_block3).find("tbody");
            $(tag_table3).empty();
            for (var i = 0; i < Status.CommentsTinder.length; i++) {
                var user = Status.CommentsTinder[i].tag_name;
                if (true) {
                    var userRow =
                        `
        <tr><td style="vertical-align: middle;">
        <button class="btn-danger remove-comment-collect" user_id="` +
                        user +
                        `"><i class="fas fa-times"></i></button></td>
        
        <td class='align-mid-vertical text-instafollow-td'>` +
                        user +
                        `</td>
        
        </tr>
        `;
                    $(tag_table3).prepend(userRow);
                }
            }
        }
    };

    UpdateAccountsDict(status) {
        this.account_dict = status;
    }

    UpdateTagsDict(status) {
        this.hashtag_dict = status;
    }

    UpdateStatus(status) {
        this.hoursLeft = status.hoursLeft;

        if (this.updated_cloud) {
            if (roughSizeOfObject(cloud_db) < 15000000) {
            }
            this.updated_cloud = false;
        }
        if (
            this.emailed == false &&
            this.follow_count_num < 1000 &&
            this.follow_count_num != 0
        ) {
            social.social.SendMessage("SetSpeed", "Num", 2);

            $("#fast").removeClass("active");
            $("#slow").removeClass("active");
            $("#medium").addClass("active");

            $("#errors").html(
                "<div class='alert alert-success alert-dismissible' role='alert'><button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button> Instoo has detected you have a smaller account with under 1,000 followers. Speeds will naturally ramp up to 2x faster after you pass 1,000 followers.<br><br></div>"
            );
        }
        if (
            this.emailed == false &&
            this.following_count_num < 200 &&
            this.following_count_num != 0
        ) {
            $("#fast").removeClass("active");
            $("#slow").addClass("active");
            $("#medium").removeClass("active");

            social.SendMessage("SetSpeed", "Num", 8);
            $("#errors").html(
                "<div class='alert alert-success alert-dismissible' role='alert'><button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button> Instoo has detected you have a smaller account, following under 200 users(meaning users you follow). Please pause Instoo and manually follow over 200, since Instoo allows medium(4x faster speeds) after 200. You should post photos regularly, and use the account by liking/following until you pass 200 followers and following. This takes most users a few days. Then it takes most users 1-2 months on medium mode to reach 1,000 followers, which allows fast mode. Contact the live chat to request target research from our account manager to help start. <br><br></div>"
            );
            alert(
                "Instoo has detected you have a smaller account, following under 200 users(meaning users you follow). Please pause Instoo and manually follow over 200, since Instoo allows medium(4x faster speeds) after 200. You should post photos regularly, and use the account by liking/following until you pass 200 followers and following. This takes most users a few days. Then it takes most users 1-2 months on medium mode to reach 1,000 followers, which allows fast mode. Contact the live chat to request target research from our account manager to help start. "
            );

            socialEvents.SetFollowValue(false);
            socialEvents.SetUnfollowValue(false);
            socialEvents.SetStoryValue(false);
            $("#set-story-check").prop("checked", false);

            $("#set-follow-check").prop("checked", false);
            $("#set-unfollow-check").prop("checked", false);
            $("#set-story-check").prop("checked", false);
            $("#set-like-check").prop("checked", false);
            $("#set-comment-check").prop("checked", false);
            if (this.emailed == false) {
                this.emailed = true;
            }
        }

        console.log(status);
        this.user_stats = status.user_stats;
        this.reacts = status.reacts;
        this.StartReact = status.StartReact;
        this.EnableFilters = status.EnableFilters;
        this.unfollow_mode = status.unfollow_mode;
        this.activity_log = status.activity_log;
        this.blacklist = status.blacklist;
        this.filters = status.filters;
        this.minFollowing = status.minFollowing;
        this.maxFollowing = status.maxFollowing;
        this.minPhotos = status.minPhotos;
        this.minFollowers = status.minFollowers;
        this.maxFollowers = status.maxFollowers;

        this.user_followers = status.user_followers;
        this.analytics = status.true_analytics;
        this.IdealTargets = status.IdealTargets;
        this.DMMode = status.backgroundDMs;
        this.addIdeal = status.addIdeal;
        this.unfollowInstoo = status.unfollowInstoo;
        this.collectSelfFollowers = status.collectSelfFollowers;
        if (status.UserPool.length > 1000 || status.MediaPool.length > 1000) {
            social.SendMessage("ClearMemory", "story", "");
        }

        this.UnfollowedPoolSize = status.UnfollowedPoolSize;
        this.FollowedPoolSize = status.FollowedPoolSize;
        this.LikePoolSize = status.LikePoolSize;
        this.StoryPoolSize = status.StoryPoolSize;
        this.CommentPoolSize = status.CommentPoolSize;

        if (this.dashboardMode == 1) {
            $("#follow-pool-tiktok-num").text(status.FollowedPoolTikTokSize);
            $("#like-pool-tiktok-num").text(status.LikedPoolTikTokSize);
            $("#tiktok-pool-num").text(status.TikTokSize);
            $("#customRangeTikTokFollows").val(status.MaxTikTokFollows);
            $("#customRangeTikTokLikes").val(status.MaxTikTokLikes);

            $("#follow_tiktok_set").html(
                "Follows/day: " + status.MaxTikTokFollows
            );
            $("#like_tiktok_set").html("Likes/day: " + status.MaxTikTokLikes);

            $("#set-follow-tiktok-check").prop(
                "checked",
                status.StartTikTokFollow
            );
            $("#set-like-tiktok-check").prop("checked", status.StartTikTokLike);
        } else if (this.dashboardMode == 7) {
            $("#follow_facebook_set").html(
                "Friends/day: " + status.MaxfacebookFollows
            );
            $("#like_facebook_set").html(
                "Likes/day: " + status.MaxfacebookLikes
            );

            $("#follow-pool-facebook-num").text(
                status.FollowedPoolfacebook.length
            );
            $("#like-pool-facebook-num").text(status.LikedPoolfacebookSize);
            $("#facebook-pool-num").text(status.facebookSize);
            $("#customRangefacebookFollows").val(status.MaxfacebookFollows);
            $("#customRangefacebookLikes").val(status.MaxfacebookLikes);

            $("#set-follow-facebook-check").prop(
                "checked",
                status.StartfacebookFollow
            );
            $("#set-like-facebook-check").prop(
                "checked",
                status.StartfacebookLike
            );
        } else if (this.dashboardMode == 6) {
            $("#follow-pool-pinterest-num").text(
                status.FollowedPoolPinterestSize
            );
            $("#like-pool-pinterest-num").text(status.LikedPoolPinterestSize);
            $("#pinterest-pool-num").text(status.PinterestSize);
            $("#customRangePinterestFollows").val(status.MaxPinterestFollows);
            $("#customRangePinterestLikes").val(status.MaxPinterestLikes);

            $("#follow_pinterest_set").html(
                "Follows/day: " + status.MaxPinterestFollows
            );
            $("#like_pinterest_set").html(
                "Likes/day: " + status.MaxPinterestLikes
            );

            $("#set-follow-pinterest-check").prop(
                "checked",
                status.StartPinterestFollow
            );
            $("#set-like-pinterest-check").prop(
                "checked",
                status.StartPinterestLike
            );
        } else if (this.dashboardMode == 0) {
            $("#user-pool-num").text(status.UserPoolSize);
            $("#follow-pool-num").text(status.FollowedPoolSize);
            $("#unfollow-pool-num").text(status.UnfollowedPoolSize);
            $("#like-pool-num").text(status.LikePoolSize);

            $("#story-pool-num").text(status.StoryCount);
            $("#comment-pool-num").text(status.CommentPoolSize);

            $("#customRange1").val(status.maxFollows);
            $("#customRange2").val(status.maxUnfollows);
            $("#customRange3").val(status.maxLikes);
            $("#customRange4").val(status.maxComments);
            $("#customRange5").val(status.maxStories);
            $("#follow_set").html("Follows/day: " + status.maxFollows);
            $("#unfollow_set").html("Unfollows/day: " + status.maxUnfollows);
            $("#like_set").html("Likes/day: " + status.maxLikes);
            $("#story_set").html("Stories/day: " + status.maxStories);
            $("#comment_set").html("DMs/day: " + status.maxComments);

            $("#set-follow-check").prop("checked", status.StartFollow);
            $("#set-unfollow-check").prop("checked", status.StartUnfollow);
            $("#set-story-check").prop("checked", status.StartStory);
            $("#set-like-check").prop("checked", status.StartLike);
            $("#set-comment-check").prop("checked", status.StartComment);
        } else if (this.dashboardMode == 2) {
            $("#follow-pool-twitter-num").text(
                status.FollowedPoolTwitter.length
            );
            $("#like-pool-twitter-num").text(status.LikedMediaTwitter.length);
            $("#customRangeTwitterFollows").val(status.MaxTwitterFollows);
            $("#customRangeTwitterLikes").val(status.MaxTwitterLikes);

            $("#follow_twitter_set").html(
                "Retweets/day: " + status.MaxTwitterFollows
            );
            $("#like_twitter_set").html("Likes/day: " + status.MaxTwitterLikes);

            $("#set-follow-twitter-check").prop(
                "checked",
                status.StartTwitterFollow
            );
            $("#set-like-twitter-check").prop(
                "checked",
                status.StartTwitterLike
            );
        } else if (this.dashboardMode == 3) {
            $("#like-pool-tinder-num").text(status.LikedMediaTinder.length);
            $("#customRangeTinderLikes").val(status.MaxTinderLikes);
            $("#customRangeTinderComments").val(status.maxTinderComments);
            $("#comment_tinder_set").html(
                "DMs/day: " + status.maxTinderComments
            );

            $("#like_tinder_set").html("Likes/day: " + status.MaxTinderLikes);
            $("#set-comment-tinder-check").prop("checked", status.StartComment);

            $("#set-like-tinder-check").prop("checked", status.StartTinderLike);
        } else if (this.dashboardMode == 5) {
            linkedin_data = status.linkedin_data;
            $("#follow-pool-linkedin-num").text(
                status.FollowedPoolLinkedin.length
            );

            $("#like-pool-linkedin-num").text(status.linkedin_data.length);
            $("#customRangeLinkedinLikes").val(status.MaxLinkedinLikes);
            $("#customRangeLinkedinFollows").val(status.maxLinkedinFollows);
            $("#follow_linkedin_set").html(
                "Connections/day: " + status.MaxLinkedinFollows
            );

            $("#like_linkedin_set").html(
                "Leads/day: " + status.MaxLinkedinLikes
            );
            $("#set-follow-Linkedin-check").prop(
                "checked",
                status.StartLinkedinFollow
            );

            $("#set-like-Linkedin-check").prop(
                "checked",
                status.StartLinkedinLike
            );
        }
        if (status.CurrentUser) {
            $("#overlay").hide();

            $(".img-current-user").attr("src", status.CurrentUser.user_pic_url);
            $(".img-current-user").show();
            if (
                typeof CurrentUser != "undefined" &&
                CurrentUser.username != status.CurrentUser.username &&
                status.CurrentUser.username.length > 0
            ) {
                social.SendMessage(
                    "LoadAccount",
                    "account",
                    status.CurrentUser.username
                );
            }
            this.CurrentUser = status.CurrentUser;

            if (this.CurrentUser.username.length > 0 && this.postedInst == false) {
                postedInst = true;
                user_email = $("#email").attr("name");
                var user_plan = $("#plan").attr("name");

                $.post(
                    "https://instoo.com/user/postInst",
                    {
                        email: user_email,
                        username: this.CurrentUser.username,
                    },
                    function (returnedData) {
                        if (
                            returnedData &&
                            returnedData.length > 1 &&
                            user_plan != "lifetime"
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
            }

            $("#accounts").val(this.CurrentUser.username);

            if (this.started == false) {
                $("#errors").html("");
                var user_plan = "lifetime";

                if (status.CurrentUser.user_id) {
                    var data2 = status.user_stats;
                    if (
                        $("#data2").attr("name") &&
                        $("#data2").attr("name").length > 2
                    ) {
                        data2 = [];
                    }
                    var chart_data = null;
                    chart_data = [];
                    this.follower_data = data2;
                    var min = 10000000;
                    var max = 0;

                    var dailys = [];
                    this.daily_data = dailys;
                    var minimum = 10000;
                    var labels = [];
                    var counter = 0;
                    var minimum = 10000;
                    var labels = [];
                    for (
                        var index = data2.length - 1;
                        index > data2.length - 100;
                        index--
                    ) {
                        if (index >= 0) {
                            var obj = data2[index];
                            if (
                                CurrentUser &&
                                obj.user_id == CurrentUser.user_id &&
                                (chart_data.length < 2 ||
                                    Math.abs(
                                        parseInt(obj.followers) -
                                            chart_data[chart_data.length - 1]
                                    ) < 200)
                            ) {
                                chart_data.push(parseInt(obj.followers));
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
                        $("#growth").html(max - min);
                        if (max - min > 100) {
                        }
                    }
                    let config = {
                        type: "line",
                        data: {
                            labels: labels,
                            datasets: [
                                {
                                    label: "Instagram Followers",
                                    backgroundColor: window.chartColors.red,
                                    borderColor: window.chartColors.red,
                                    data: chart_data,
                                    fill: false,
                                },
                            ],
                        },
                        options: {
                            maintainAspectRatio: false,

                            responsive: true,
                            title: {
                                display: false,
                                text: "Followers",
                            },
                            tooltips: {
                                mode: "index",
                                intersect: false,
                            },
                            hover: {
                                mode: "nearest",
                                intersect: true,
                            },
                            scales: {
                                xAxes: [
                                    {
                                        display: true,
                                        scaleLabel: {
                                            display: true,
                                            labelString: "Hour",
                                        },
                                    },
                                ],
                                yAxes: [
                                    {
                                        display: true,
                                        scaleLabel: {
                                            display: true,
                                            labelString: "Folowers",
                                        },
                                    },
                                ],
                            },
                        },
                    };

                    let ctx = document
                        .getElementById("canvas")
                        .getContext("2d");
                    ctx.height = 250;

                    let myLine = new Chart(ctx, config);
                }

                this.started = true;
                if (status.hoursLeft > 0) {
                    setTimeout(function () {
                        this.hoursLeft = 0;
                        $("#set-follow-check").prop("checked", false);
                        socialEvents.SetFollowValue(false);
                        $("#set-like-check").prop("checked", false);
                        socialEvents.SetLikeValue(false);
                        $("#set-unfollow-check").prop("checked", false);
                        socialEvents.SetUnfollowValue(false);
                        $("#set-unfollow-check").prop("checked", false);
                        socialEvents.SetUnfollowValue(false);
                        social.SendMessage("ZeroHour", "Database", "obj");

                        SetStoryValue(false);
                        $("#set-story-check").prop("checked", false);

                        $("#errors").html(
                            "<div class='alert alert-success alert-dismissible' role='alert'><button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button>Congrats! Instoo has run for a full day. All actions turned off after 8 hours automatically. Turn it on again tomorrow to grow constantly daily =)</div>"
                        );
                        var data2 = [];
                        if (
                            $("#data2").attr("name") &&
                            $("#data2").attr("name").length > 2
                        ) {
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
                            if (
                                CurrentUser &&
                                obj.user_id == CurrentUser.user_id
                            ) {
                                chart_data.push(parseInt(obj.followers));
                            }
                        }

                        for (
                            var kk = chart_data.length - 1;
                            kk > chart_data.length - 11;
                            kk--
                        ) {
                            if (chart_data[kk] < last_ten_min) {
                                last_ten_min = chart_data[kk];
                            }
                            if (chart_data[kk] > last_ten_max) {
                                last_ten_max = chart_data[kk];
                            }
                        }

                        var email_msg = "";
                        if (
                            StoryPoolSize > 0 &&
                            Math.abs(last_ten_max - last_ten_min) > 5 &&
                            Math.abs(last_ten_max - last_ten_min) != 10000000 &&
                            Math.abs(last_ten_max - last_ten_min) < 1000
                        ) {
                            if (user_plan == "lifetime") {
                                email_msg =
                                    "Based on your activity logs, it appears you figured out how to use Instoo properly. We recommend a/b testing targets and photos to optimize your growth rate to 30-50 per day. Also increase your followers and following counter over 1000 to be able to use fast mode. If you have free time anytime, please consider leaving a short review: https://appsumo.com/instoo/#reviews";
                            } else {
                                email_msg =
                                    "Based on your activity logs, it appears you figured out how to use Instoo properly. We recommend a/b testing targets and photos to optimize your growth rate to 30-50 per day. Also increase your followers and following counter over 1000 to be able to use fast mode.";
                            }
                        }

                        if (
                            Math.abs(last_ten_max - last_ten_min) < 5 &&
                            StoryPoolSize > 100 &&
                            Math.abs(last_ten_max - last_ten_min) == 0
                        ) {
                            email_msg =
                                "Based on your activity logs, you did not gain followers despite running all day. We recommend changing targets and posting more photos with the same theme. Contact the live chat for help researching targets.";
                        }

                        if (
                            Math.abs(last_ten_max - last_ten_min) < 5 &&
                            StoryPoolSize == 0 &&
                            activity_log.length == 0
                        ) {
                            email_msg =
                                "Based on your activity logs, the bot did not actually run over 8 hours due to some setup issue. Please make sure to add 20 account targets, then enable the likes and follows switch. Then check the chrome is not de-activating the instagram tab by leaving it in focus for 1 hour. If chrome deactivates the tab, make sure to disable javascript throttling, and run Instoo in a chrome based browser by itself to multitask in chrome yourself. Contact the live chat for help researching targets.";
                        }

                        if (
                            Math.abs(last_ten_max - last_ten_min) < 5 &&
                            LikePoolSize > 0 &&
                            StoryPoolSize / LikePoolSize > 10
                        ) {
                            email_msg =
                                "Based on your activity logs, you ran many stories but few likes. It is possible chrome is de-activating the tab to save CPU. To test this theory, lease Instagram in focus while Instoo runs for 1 hour. You can run Instoo in another chrome based browser to solve this problem. Contact the live chat for help researching targets.";
                        }

                        if (
                            Math.abs(last_ten_max - last_ten_min) < 5 &&
                            StoryPoolSize > 0 &&
                            LikePoolSize == 0 &&
                            FollowedPoolSize == 0
                        ) {
                            email_msg =
                                "Based on your activity logs, only stories ran. Please check this article to fix: https://help.instoo.com/kb/337/690/stories-only-working-but-not-likesfollowsunfollows. Contact the live chat for help researching targets.";
                        }

                        if (
                            Math.abs(last_ten_max - last_ten_min) < 5 &&
                            StoryPoolSize > 0 &&
                            LikePoolSize > 0 &&
                            FollowedPoolSize == 0
                        ) {
                            email_msg =
                                "Based on your activity logs, only stories + likes ran. We highly recommend using follows as well to trigger the Instagram promotion algorithm and achieve the average growth rates on fast mode. Contact the live chat for help researching targets.";
                        }

                        if (last_ten_min != 100000 && last_ten_max != 0) {
                        } else {
                        }
                    }, status.hoursLeft * 60 * 60 * 1000);
                } else {
                    $("#set-follow-check").prop("checked", false);
                    socialEvents.SetFollowValue(false);
                    $("#set-like-check").prop("checked", false);
                    socialEvents.SetLikeValue(false);
                    $("#set-unfollow-check").prop("checked", false);
                    socialEvents.SetUnfollowValue(false);
                    $("#set-unfollow-check").prop("checked", false);
                    socialEvents.SetUnfollowValue(false);

                    socialEvents.SetStoryValue(false);
                    $("#set-story-check").prop("checked", false);

                    $("#errors").html(
                        "<div class='alert alert-success alert-dismissible' role='alert'><button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button>Congrats! Instoo has run for a full day. All actions turned off after 8 hours automatically. Turn it on again tomorrow to grow constantly daily =) Click 'reset limits' on the settings page if the daily 8 hour counter has not reset today accidentally.</div>"
                    );
                }
                console.log("Hours left: " + status.hoursLeft * 60 * 60 * 1000);
                console.log(this.hoursLeft);
                console.log(status.hoursLeft);
                this.hoursLeft = status.hoursLeft;
                var loaded = false;

                var obj = [];
                social.SendMessage("loadLocal", "Database", "obj");

                this.getFollowers();
            }
        }

        this.UpdateCollectJobStatus(status.AccountTargets);
        if (
            status.StoryTime.Time / status.StoryTime.Max < -0.05 &&
            $("#set-story-check").is(":checked")
        ) {
            $("#errors").html(
                "<div class='alert alert-danger alert-dismissible' role='alert'><button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button>You have not added any targets. Please add some account targets.</div>"
            );
        }
        if (status.StartStory) {
            $("#container").html(
                status.StoryTime.Time.toFixed(0) +
                    " seconds till next action<br>" +
                    this.hoursLeft +
                    " Hours Left Today"
            );
        }

        if (
            this.mode == "twitter" &&
            (status.StartTwitterLike || status.StartTwitterFollow)
        ) {
            $("#container").html(
                status.TwitterTime.Time.toFixed(0) +
                    " seconds till next action<br>" +
                    this.hoursLeft +
                    " Hours Left Today"
            );
        }

        if (
            this.mode == "tiktok" &&
            (status.StartTikTokLike || status.StartTikTokFollow)
        ) {
            $("#container").html(
                status.TikTokTime.Time.toFixed(0) +
                    " seconds till next action<br>" +
                    this.hoursLeft +
                    " Hours Left Today"
            );
        }

        if (
            this.mode == "facebook" &&
            (status.StartfacebookLike || status.StartfacebookFollow)
        ) {
            $("#container").html(
                status.facebookTime.Time.toFixed(0) +
                    " seconds till next action<br>" +
                    this.hoursLeft +
                    " Hours Left Today"
            );
        }

        var d = new Date();
    }

    NewWhitelistUserSearch(input) {
        var text = $(input).val().toLowerCase();
        var Request = {};
        Request.Text = text;
        Request.Count = 20;
        social.SendMessage("RequestFilteredFollowings", "Request", Request);
    }

    FilterWhitelistSearch(input) {
        var text = $(input).val().toLowerCase();
        var whitelist_block = $("#whitelisted-users");
        $(whitelist_block)
            .find("tr")
            .each(function () {
                if (
                    $(this).text().toLowerCase().indexOf(text) < 0 &&
                    text != ""
                ) {
                    $(this).hide();
                } else {
                    $(this).show();
                }
            });
    }

    ClearWhitelistTable() {
        $("#whitelisted-users").empty();
    }
    
    AddUserToWhitelist(input) {
        var user_id = $(input).attr("user_id");
        $(input).closest("li").remove();
    
        social.SendMessage("AddUserToWhitelist", "user_id", user_id);
    }
    
    ProcessFilteredFollowings(users) {
        var filter_users_block = $("#add-user-results");
        filter_users_block.empty();
        for (var i = 0; i < users.length; i++) {
            var user = users[i];
            var userRow = `
        <li class="add-whitelist-user" user_id=` + user.user_id + `>
        <div class="row">
        <div class="col-md-2"> ` + i + `. <a href='https://www.instagram.com/` + user.username + `/' target='_blank'><img class='backup_picture img-rounded' width='64'  height='64' src='` + user.user_pic_url + `'/></a></div>
        <div class='col-md-5 align-mid-vertical text-instafollow-td'>` + user.username + `</div><div class='col-md-5 text-instafollow-td align-mid-vertical'>` + user.full_name + `</div>
        </div>
        </li>
        `;
    
            $(filter_users_block).append(userRow);
        }
    }
    
    AddedWhitelistUsers(users) {
        var whitelist_block = $("#whitelisted-users");
        for (var i = 0; i < users.length; i++) {
            var user = users[i];
            var userRow = `
        <tr>
        <td> ` + i + `. <a href='https://www.instagram.com/` + user.username + `/' target='_blank'><img class='backup_picture img-rounded' width='64' height='64'    src='` + user.user_pic_url + `'/></a></td>
        <td class='align-mid-vertical text-instafollow-td'>` + user.username + `</td><td class='text-instafollow-td align-mid-vertical'>` + user.full_name + `</td>
        <td style="vertical-align: middle;">
        <button class="btn-danger remove-user-whitelist" user_id=` + user.user_id + `><i class="fas fa-times"></i></button></td>
        </tr>
        `;
            $(whitelist_block).prepend(userRow);
        }
    
        this.FilterWhitelistSearch($("#user-search"));
    }
    
    SetWhitelistStatus(status) {
        $("#whitelist-followings").prop("checked", status.Enabled);
    
    }
    
    RemoveWhitelistedUser(button) {
        var user_id = $(button).attr("user_id");
        $(button).closest("tr").remove();
    
        social.SendMessage("RemoveWhitelistUser", "user_id", user_id);
    }
    
    RemoveCollectJobTagLinkedin(button) {
        var user_id = $(button).attr("user_id");
        $(button).closest("tr").remove();
    
    
        social.SendMessage("RemoveTagFromListLinkedin", "TagName", user_id);
        var index = global_tags.indexOf(user_id);
        if (index > -1) {
            global_tags.splice(index, 1);
        }
        social.SendMessage("RequestMediaStatus", "Num", DisplayLikesNum);
    
    
    }
    
    RemoveCollectJobTagPinterest(button) {
        var user_id = $(button).attr("user_id");
        $(button).closest("tr").remove();
    
    
        social.SendMessage("RemoveTagFromListPinterest", "TagName", user_id);
        var index = global_tags.indexOf(user_id);
        if (index > -1) {
            global_tags.splice(index, 1);
        }
        social.SendMessage("RequestMediaStatus", "Num", DisplayLikesNum);
    
    
    }
    
    RemoveCollectJobTagTikTok(button) {
        var user_id = $(button).attr("user_id");
        $(button).closest("tr").remove();
    
    
        social.SendMessage("RemoveTagFromListTikTok", "TagName", user_id);
        var index = global_tags.indexOf(user_id);
        if (index > -1) {
            global_tags.splice(index, 1);
        }
        social.SendMessage("RequestMediaStatus", "Num", DisplayLikesNum);
    
    
    }
    
    RemoveCollectJobTagfacebook(button) {
        var user_id = $(button).attr("user_id");
        $(button).closest("tr").remove();
    
    
        social.SendMessage("RemoveTagFromListfacebook", "TagName", user_id);
        var index = global_tags.indexOf(user_id);
        if (index > -1) {
            global_tags.splice(index, 1);
        }
        social.SendMessage("RequestMediaStatus", "Num", DisplayLikesNum);
    
    
    }
    
    RemoveCollectJobTagTwitter(button) {
        var user_id = $(button).attr("user_id");
        $(button).closest("tr").remove();
    
    
        social.SendMessage("RemoveTagFromListTwitter", "TagName", user_id);
        var index = global_tags.indexOf(user_id);
        if (index > -1) {
            global_tags.splice(index, 1);
        }
        social.SendMessage("RequestMediaStatus", "Num", DisplayLikesNum);
    
    
    }
    
    UpdateCollectJobStatus(Jobs) {
        var collect_block = $("#collect-users-block");
        var collect_table = $(collect_block).find("tbody");
        $(collect_table).empty();
        var added_tags = [];
        ////////console.log(Jobs);
        for (var i = 0; i < Jobs.length; i++) {
            var user = Jobs[i];
    
            if (user != null) {
                added_tags.push(user);
    
                var index = global_accounts.indexOf(user + "<br>");
                if (index == -1) {
                    global_accounts.push(user + "<br>");
                }
    
                var userRow = `
        <tr><td style="vertical-align: middle;">
        <button class="btn-danger remove-user-collect" user_id='` + user + `'><i class="fas fa-times"></i></button></td>
        <td class='align-mid-vertical text-instafollow-td'><a href='https://www.instagram.com/` + user + `/' target='_blank'>@
        ` + user + `</a></td>
        
        </tr>
        `;
                $(collect_table).prepend(userRow);
            }
        }
    }
    
    UpdateCollectTags(Jobs) {
        var tag_block = $("#collect-tags-block");
        var tag_table = $(tag_block).find("tbody");
        $(tag_table).empty();
        var added_tags = [];
        for (var i = 0; i < Jobs.length; i++) {
            var index = global_tags.indexOf(Jobs[i].tag_name + "<br>");
            if (index == -1) {
                global_tags.push(Jobs[i].tag_name + "<br>");
            }
    
            var user = Jobs[i].tag_name;
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
    }

    getFollowers() {
        if (this.CurrentUser && this.CurrentUser.username) {
    
            $(".img-current-user").attr("src", this.CurrentUser.user_pic_url);
    
            $(".img-current-user").show();
    
    
            if (this.gotAnalytics == false) {
                this.gotAnalytics = true;
                this.chart_data = [];
                this.live_snapshots = [];
                this.live_tags = [];
                this.live_accounts = [];
                var ranked_accounts = "";
                var limits = 1000;
                if (this.paid_sub) {
                    limits = 1000;
                    var ranked_data = [];
                    var totals = 0;
    
                }
    
                var d = new Date();
                var currentHour = d.getHours();
    
                var d_num = Date.parse(d);
                d_num = Math.floor(d_num / (1000 * 60 * 60));
                var dat = {
                    followers: this.follow_count_num,
                    hour: d_num,
                    user_id: this.CurrentUser.user_id,
                    mode: this.mode
                };
                if (this.follow_count_num != 0) {
                 var data = {
                    followers: this.follow_count_num,
                    hour: d_num,
                    user_id: this.CurrentUser.user_id,
                    mode: "instagram"
                };
    
                social.SendMessage("PostStats", "data", data);
    
                }
    
            }
            var account_name = this.CurrentUser.username;
           
    
    
        }
    
    }

    SetSettings(settings) {

        $("#input-follow-time-min").val(settings.FollowSettings.TimeMin);
        $("#input-follow-time-max").val(settings.FollowSettings.TimeMax);
        $("#input-follow-error-time").val(settings.FollowSettings.ErrorTime);
    
        $("#input-unfollow-time-min").val(settings.UnfollowSettings.TimeMin);
        $("#input-unfollow-time-max").val(settings.UnfollowSettings.TimeMax);
        $("#input-unfollow-error-time").val(settings.UnfollowSettings.ErrorTime);
    
        $("#input-user-pool-num").val(settings.CollectFollowers.Pool);
        $("#input-user-collect-time").val(settings.CollectFollowers.Interval);
        $("#input-user-error-time").val(settings.CollectFollowers.ErrorTime);
    
        $("#input-following-pool-num").val(settings.CollectFollowings.Pool);
        $("#input-following-collect-time").val(settings.CollectFollowings.Interval);
        $("#input-following-error-time").val(settings.CollectFollowings.ErrorTime);
    
        $("#input-unfollow-days").val(settings.UnfollowAfterDays);
        $("#set-slow-check").prop("checked", settings.slow);
        $("#set-cloud-check").prop("checked", this.user_cloud && this.cloud_backup);
      
    
    }

    SaveSettings() {
        var settings = {};
        settings.FollowSettings = {};
        settings.UnfollowSettings = {};
        settings.CollectFollowers = {};
        settings.CollectFollowings = {};
        settings.LikeSettings = {};
        settings.CommentSettings = {};
    
        settings.FollowSettings.TimeMin = this.follow_speed;
        settings.FollowSettings.TimeMax = this.follow_speed + 10;
        settings.FollowSettings.ErrorTime = 200;
    
        settings.UnfollowSettings.TimeMin = this.unfollow_speed;
        settings.UnfollowSettings.TimeMax = this.unfollow_speed + 10;
        settings.UnfollowSettings.ErrorTime = 200;
    
        settings.CommentSettings.TimeMin = this.comment_speed;
        settings.CommentSettings.TimeMax = 450;
        settings.CommentSettings.ErrorTime = 1800;
    
        settings.LikeSettings.TimeMin = this.like_speed;
        settings.LikeSettings.TimeMax = this.like_speed + 10;
        settings.LikeSettings.ErrorTime = 200;
    
        settings.StorySettings.TimeMin = this.story_speed;
        settings.StorySettings.TimeMax = this.story_speed + 10;
        settings.StorySettings.ErrorTime = 400;
    
        settings.CollectFollowers.Pool = 1000;
        settings.CollectFollowers.Interval = 100;
        settings.CollectFollowers.ErrorTime = 200;
    
        settings.CollectFollowings.Pool = 1000;
        settings.CollectFollowings.Interval = 100;
        settings.CollectFollowings.ErrorTime = 200;
    
        settings.TikTokSettings.TimeMin = this.tiktok_speed;
        settings.TikTokSettings.TimeMax = this.tiktok_speed + 10;
        settings.TikTokSettings.ErrorTime = 400;
    
    
        settings.CollectFollowers.Pool = $("#input-user-pool-num").val();
        settings.CollectFollowers.Interval = $("#input-user-collect-time").val();
        settings.CollectFollowers.ErrorTime = $("#input-user-error-time").val();
    
        settings.CollectFollowings.Pool = $("#input-following-pool-num").val();
        settings.CollectFollowings.Interval = $("#input-following-collect-time").val();
        settings.CollectFollowings.ErrorTime = $("#input-following-error-time").val();
        this.UnfollowAfterDays = $("#input-unfollow-days").val();
        settings.UnfollowAfterDays = $("#input-unfollow-days").val();
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        settings.Day = dd;
        this.day = dd;
    
        social.SendMessage("UpdateSettings", "Settings", settings);
    }
}

export default SocialActions;
