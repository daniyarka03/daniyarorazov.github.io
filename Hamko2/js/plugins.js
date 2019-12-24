// Avoid `console` errors in browsers that lack a console.
(function() {
    var method;
    var noop = function () {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeline', 'timelineEnd', 'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());

// Place any jQuery/helper plugins in here.


/*
playback timings (ms):
  captures_list: 77.365
  exclusion.robots: 0.213
  exclusion.robots.policy: 0.199
  RedisCDXSource: 1.482
  esindex: 0.014
  PetaboxLoader3.resolve: 57.533 (2)
  load_resource: 107.66
  CDXLines.iter: 15.836 (3)
  LoadShardBlock: 55.069 (3)
  PetaboxLoader3.datanode: 73.433 (5)
*/