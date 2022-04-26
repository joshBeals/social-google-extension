class Globals {

    constructor() {
        this.MONTHS = [
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
    
        this.COLORS = [
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
    }

    srand(seed) {
        this._seed = seed;
    }
    
    rand(min, max) {
        let seed = this._seed;
        min = min === undefined ? 0 : min;
        max = max === undefined ? 1 : max;
        this._seed = (seed * 9301 + 49297) % 233280;
        return min + (this._seed / 233280) * (max - min);
    }

    numbers(config) {
        let cfg = config || {};
        let min = cfg.min || 0;
        let max = cfg.max || 1;
        let from = cfg.from || [];
        let count = cfg.count || 8;
        let decimals = cfg.decimals || 8;
        let continuity = cfg.continuity || 1;
        let dfactor = Math.pow(10, decimals) || 0;
        let data = [];
        let i, value;

        for (i = 0; i < count; ++i) {
            value = (from[i] || 0) + this.rand(min, max);
            if (this.rand() <= continuity) {
                data.push(Math.round(dfactor * value) / dfactor);
            } else {
                data.push(null);
            }
        }

        return data;
    }

    labels(config) {
        let cfg = config || {};
        let min = cfg.min || 0;
        let max = cfg.max || 100;
        let count = cfg.count || 8;
        let step = (max - min) / count;
        let decimals = cfg.decimals || 8;
        let dfactor = Math.pow(10, decimals) || 0;
        let prefix = cfg.prefix || '';
        let values = [];
        let i;

        for (i = min; i < max; i += step) {
            values.push(prefix + Math.round(dfactor * i) / dfactor);
        }

        return values;
    }

    months(config) {
        let cfg = config || {};
        let count = cfg.count || 12;
        let section = cfg.section;
        let values = [];
        let i, value;

        for (i = 0; i < count; ++i) {
            value = this.MONTHS[Math.ceil(i) % 12];
            values.push(value.substring(0, section));
        }

        return values;
    }

    color(index) {
        return this.COLORS[index % this.COLORS.length];
    }

    transparentize(color, opacity) {
        let alpha = opacity === undefined ? 0.5 : 1 - opacity;
        return Color(color).alpha(alpha).rgbString();
    }

    hashCode(str) {
        return str.split('').reduce((prevHash, currVal) =>
            (((prevHash << 5) - prevHash) + currVal.charCodeAt(0)) | 0, 0);
    }

    hello() {
        return this.MONTHS;
    }

}

export default Globals;