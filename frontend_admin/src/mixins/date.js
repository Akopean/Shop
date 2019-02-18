import moment from 'moment';
import Vue from 'vue';

export default {
    filters: {
        toISOString(str) {
            return moment(str).toISOString();
        },
        formatDate(str, format = null, outputFormat = 'YYYY-MM-DD HH:mm:ss') {

            if (format == null) {
                return moment(str).format(outputFormat);
            }

            return moment(str, format).format(outputFormat);
        },
        diffForHumans(str) {
            return moment(str).from(moment());
        },
    },
};
