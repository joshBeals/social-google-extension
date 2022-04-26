import SocialActions from './SocialActions.js';

class Socials extends SocialActions {
    constructor() {
        super();
    }

    scrollTop(starter) {
        if (starter > 0) {
            window.scrollTo(0, document.body.scrollHeight);
            setTimeout(function () {
                scrollTop(starter - 1);
            }, 300);
        }
    }

    CreateComPort() {
        this.ComPort = chrome.runtime.connect({
            name: "instafollow213index",
        });
        this.ComPort.onMessage.addListener(this.OnMessageReceive);
    }



    

}

export default Socials;
