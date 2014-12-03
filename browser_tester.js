(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        require(['lib/utc_date'], factory);
    } else if (typeof exports === 'object') {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
        // like Node.
        factory(require('lib/utc_date'));
    } else {
        // Browser globals (root is window)
        factory(root.UTCDate);
    }
})(this, function (UTCDate) {
    var iters = 1000000,
        units = ['FullYear', 'Month', 'Date',
            'Hours', 'Minutes', 'Seconds', 'Milliseconds'],
        num_assertions = 0,
        log_div = document.getElementById('main');

    function logToDiv(msg) {
        var line = document.createElement('div');
        line.innerHTML = msg;
        log_div.appendChild(line);
    }

    function cloneDate(d) {
        return new Date(+d);
    }

    function cloneUTCDate(d) {
        return new UTCDate.fromUnixMs(+d);
    }

    function reportIters(iter, iters) {
        logToDiv("" + iter + " / " + iters);
        // console.log("" + iter + " / " + iters);
    }

    function report(msg) {
        logToDiv(msg);
        // console.log(msg);
    }

    function assert(prop, what, time_ms, unit, value) {
        ++ num_assertions;
        if (num_assertions % 1000000 === 0) {
            report("num_assertions " + num_assertions / 1e6 + " / " + (iters * units.length * 240 * 2) / 1e6);
        }
        if (prop) {
            return;
        }

        var d1 = new Date(time_ms);
        var d2 = UTCDate.fromUnixMs(time_ms);
        d1['setUTC' + unit](d1['getUTC' + unit]() + value);
        d2['setUTC' + unit](d2['getUTC' + unit]() + value);
        window.d1 = d1;
        window.d2 = d2;
        throw new Error(what + " " + time_ms + " " + unit + " " + value + " " +d1.toISOString() + " " + d2.toISOString());
    }



    function doShit(from, to) {
        var unix_ms = 1398357868938,  // 2014-04-24T16:44:28.938Z
            i,
            time_ms,
            unit,
            ui,
            value,
            d1, d2, d1t, d2t;

        if (from >= iters) {
            return;
        }
        for (i = from; i < to; ++i) {
            time_ms = unix_ms + 599999 * i;
            d1 = new Date(time_ms);
            d2 = new UTCDate(d1.getUTCFullYear(), d1.getUTCMonth(),
                d1.getUTCDate(), d1.getUTCHours(), d1.getUTCMinutes(),
                d1.getUTCSeconds(), d1.getUTCMilliseconds());

            if (i % 1000 === 0) {
                reportIters(i, iters);
            }

            assert(+d1 === +d2, "initial", time_ms, null, null);

            for (ui = 0; ui < units.length; ++ui) {
                unit = units[ui];

                for (value = -120; value <= 120; ++value) {
                    d1t = cloneDate(d1);
                    d2t = cloneUTCDate(d2);

                    d1t['setUTC' + unit](d1t['getUTC' + unit]() + value);
                    d2t['setUTC' + unit](d2t['getUTC' + unit]() + value);

                    assert(+d1t === +d2t, "valueOf", time_ms, unit, value);
                    assert(d1t.toISOString() === d2t.toISOString(), "isoStr", time_ms, unit, value);
                }
            }
        }

        setTimeout(function () { doShit(to, to + 200); }, 50);
    }

    setTimeout(function () { doShit(0, 200); }, 3000);
});
