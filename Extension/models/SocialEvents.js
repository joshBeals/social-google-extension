import Socials from "./Socials.js";

class SocialEvents {
    constructor() { 
        this.social = new Socials();
    }
    ResetSettings() {
        this.social.SendMessage("ResetSettings", "", "");
    }
    
    SetFollowValue(value) {
        this.social.SendMessage("SetFollowValue", "Value", value);
    }
    
    SetCommentValue(value) {
        this.social.SendMessage("SetCommentValue", "Value", value);
    }
    
    
    SetLikeValue(value) {
        this.social.SendMessage("SetLikeValue", "Value", value);
    }
    
    SetStoryValue(value) {
        this.social.SendMessage("SetStoryValue", "Value", value);
    }
    
    SetUnfollowValue(value) {
        this.social.SendMessage("SetUnfollowValue", "Value", value);
    }
    
    WhitelistFollowings(start) {
        this.social.SendMessage("WhitelistFollowings", "Start", start);
    }

    UpdateFollowers(status) {
        this.social.my_followers = my_followers.concat(status);
        this.social.SendMessage("SendMyFollowers", "followers", my_followers);
    }
}

export default SocialEvents;