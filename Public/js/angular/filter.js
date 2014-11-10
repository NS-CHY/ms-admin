/*字数长度限制过滤器*/
app.filter('limit', function() {
    return function(input, num) {
        var len = input.length;
        if (len > num) {
            return input.substr(0, num) + '…';
        } else {
            return input;
        }
    }
})
app.filter('offset', function() {
    return function(input, start) {
        start = parseInt(start, 10);
        return input.slice(start);
    }
})