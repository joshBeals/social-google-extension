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

        this.mode = "instagram";

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
}

export default SocialActions;
