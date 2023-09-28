import moment from 'moment';

Date.prototype.toISOString = function () {
    return moment(this).format('YYYY-MM-DD HH:mm:ss');
};

moment.defaultFormat = 'YYYY-MM-DD HH:mm:ss';