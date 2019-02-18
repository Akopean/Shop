import _ from 'lodash';
import moment from 'moment';

export default {
    computed: {
        Shop() {
            return {
                name:  process.env.VUE_APP_NAME,
                url:  process.env.VUE_APP_API_URL,
                apiUrl:  process.env.VUE_APP_API_URL,
                apiVersion:  process.env.VUE_APP_API_VERSION,
                dateFormat:  process.env.VUE_APP_DATE_FORMAT,
            }
        }
    },

    methods: {
        /**
         * Determine if the given date is in the future.
         */
        dateInTheFuture(date) {
            return moment().diff(moment(date + ' Z'), 'minutes') < 0;
        },

        /**
         * Show the time ago format for the given time.
         */
        timeAgo(time) {
            return moment(time + ' Z').utc().local().fromNow();
        },

        /**
         * Show the time in local time.
         */
        localTime(time) {
            return moment(time + ' Z').utc().local().format('MMMM Do YYYY, h:mm:ss A');
        },

        /**
         * Truncate the given string.
         */
        truncate(string, length = 70) {
            return _.truncate(string, {
                'length': length,
                'separator': /,? +/
            });
        },

        /**
         * Creates a debounced function that delays invoking a callback.
         */
        debouncer: _.debounce(callback => callback(), 500),

        /**
         * Convert string to slug.
         *
         * src: https://gist.github.com/mathewbyrne/1280286
         */
        slugify(text, separator) {
            text = text.toString().toLowerCase().trim();

            const sets = [
                {to: 'a', from: '[ÀÁÂÃÄÅÆĀĂĄẠẢẤẦẨẪẬẮẰẲẴẶ]'},
                {to: 'c', from: '[ÇĆĈČ]'},
                {to: 'd', from: '[ÐĎĐÞ]'},
                {to: 'e', from: '[ÈÉÊËĒĔĖĘĚẸẺẼẾỀỂỄỆ]'},
                {to: 'g', from: '[ĜĞĢǴ]'},
                {to: 'h', from: '[ĤḦ]'},
                {to: 'i', from: '[ÌÍÎÏĨĪĮİỈỊ]'},
                {to: 'j', from: '[Ĵ]'},
                {to: 'ij', from: '[Ĳ]'},
                {to: 'k', from: '[Ķ]'},
                {to: 'l', from: '[ĹĻĽŁ]'},
                {to: 'm', from: '[Ḿ]'},
                {to: 'n', from: '[ÑŃŅŇ]'},
                {to: 'o', from: '[ÒÓÔÕÖØŌŎŐỌỎỐỒỔỖỘỚỜỞỠỢǪǬƠ]'},
                {to: 'oe', from: '[Œ]'},
                {to: 'p', from: '[ṕ]'},
                {to: 'r', from: '[ŔŖŘ]'},
                {to: 's', from: '[ßŚŜŞŠ]'},
                {to: 't', from: '[ŢŤ]'},
                {to: 'u', from: '[ÙÚÛÜŨŪŬŮŰŲỤỦỨỪỬỮỰƯ]'},
                {to: 'w', from: '[ẂŴẀẄ]'},
                {to: 'x', from: '[ẍ]'},
                {to: 'y', from: '[ÝŶŸỲỴỶỸ]'},
                {to: 'z', from: '[ŹŻŽ]'},
                {to: '-', from: '[·/_,:;\']'}
            ];

            sets.forEach(set => {
                text = text.replace(new RegExp(set.from,'gi'), set.to);
            });

            text = text.toString().toLowerCase()
                .replace(/\s+/g, '-')         // Replace spaces with -
                .replace(/&/g, '-and-')       // Replace & with 'and'
                .replace(/[^\w-]+/g, '')     // Remove all non-word chars
                .replace(/--+/g, '-')        // Replace multiple - with single -
                .replace(/^-+/, '')           // Trim - from start of text
                .replace(/-+$/, '');          // Trim - from end of text

            if ((typeof separator !== 'undefined') && (separator !== '-')) {
                text = text.replace(/-/g, separator);
            }

            return text;
        }
    }
};
