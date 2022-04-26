import SocialActions from './SocialExtension.js';

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

    CreateComPort(OnMessageReceive) {
        this.ComPort = chrome.runtime.connect({
            name: "instafollow213index",
        });
        this.ComPort.onMessage.addListener(OnMessageReceive);
    }

    SendMessage = (tag, msgTag, msg) => {
        let sendObj = {
            Tag: tag,
        };
        sendObj[msgTag] = msg;
        if (typeof this.ComPort != "undefined") {
            this.ComPort.postMessage(sendObj);
        }
    };
}

export default Socials;
