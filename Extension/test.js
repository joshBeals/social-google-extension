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
window.chartColors = {
    red: 'rgb(255, 99, 132)',
    orange: 'rgb(255, 159, 64)',
    yellow: 'rgb(255, 205, 86)',
    green: 'rgb(75, 192, 192)',
    blue: 'rgb(54, 162, 235)',
    purple: 'rgb(153, 102, 255)',
    grey: 'rgb(201, 203, 207)'
};

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

window.dataLayer = window.dataLayer || [];
(function(global) {
    var MONTHS = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ];

    var COLORS = [
        '#4dc9f6',
        '#f67019',
        '#f53794',
        '#537bc4',
        '#acc236',
        '#166a8f',
        '#00a950',
        '#58595b',
        '#8549ba'
    ];

    var Samples = global.Samples || (global.Samples = {});
    var Color = global.Color;

    Samples.utils = {
        srand: function(seed) {
            this._seed = seed;
        },

        rand: function(min, max) {
            var seed = this._seed;
            min = min === undefined ? 0 : min;
            max = max === undefined ? 1 : max;
            this._seed = (seed * 9301 + 49297) % 233280;
            return min + (this._seed / 233280) * (max - min);
        },

        numbers: function(config) {
            var cfg = config || {};
            var min = cfg.min || 0;
            var max = cfg.max || 1;
            var from = cfg.from || [];
            var count = cfg.count || 8;
            var decimals = cfg.decimals || 8;
            var continuity = cfg.continuity || 1;
            var dfactor = Math.pow(10, decimals) || 0;
            var data = [];
            var i, value;

            for (i = 0; i < count; ++i) {
                value = (from[i] || 0) + this.rand(min, max);
                if (this.rand() <= continuity) {
                    data.push(Math.round(dfactor * value) / dfactor);
                } else {
                    data.push(null);
                }
            }

            return data;
        },

        labels: function(config) {
            var cfg = config || {};
            var min = cfg.min || 0;
            var max = cfg.max || 100;
            var count = cfg.count || 8;
            var step = (max - min) / count;
            var decimals = cfg.decimals || 8;
            var dfactor = Math.pow(10, decimals) || 0;
            var prefix = cfg.prefix || '';
            var values = [];
            var i;

            for (i = min; i < max; i += step) {
                values.push(prefix + Math.round(dfactor * i) / dfactor);
            }

            return values;
        },

        months: function(config) {
            var cfg = config || {};
            var count = cfg.count || 12;
            var section = cfg.section;
            var values = [];
            var i, value;

            for (i = 0; i < count; ++i) {
                value = MONTHS[Math.ceil(i) % 12];
                values.push(value.substring(0, section));
            }

            return values;
        },

        color: function(index) {
            return COLORS[index % COLORS.length];
        },

        transparentize: function(color, opacity) {
            var alpha = opacity === undefined ? 0.5 : 1 - opacity;
            return Color(color).alpha(alpha).rgbString();
        }
    };

    // DEPRECATED
    window.randomScalingFactor = function() {
        return Math.round(Samples.utils.rand(-100, 100));
    };
    Samples.utils.srand(Date.now());
}(this));


class Globals {

    hello() {
        return 'social';
    }

}

let social = new Social();

console.log(social.hello());