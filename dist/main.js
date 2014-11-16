(function() {
  var Test, getTimestamp, obj, testToRun, testing;

  if (window.performance.now) {
    console.log("Using high performance timer");
    getTimestamp = function() {
      return window.performance.now();
    };
  } else {
    if (window.performance.webkitNow) {
      console.log("Using webkit high performance timer");
      getTimestamp = function() {
        return window.performance.webkitNow();
      };
    } else {
      console.log("Using low performance timer");
      getTimestamp = function() {
        return +new Date();
      };
    }
  }

  Test = (function() {
    function Test(func, params, intervals) {
      this.func = func;
      this.params = params;
      this.intervals = intervals != null ? intervals : 10000;
    }

    Test.prototype.run = function() {
      var averageTime, finished, i, lastVal, start, totalTime, x;
      console.log('starting test...');
      totalTime = 0;
      i = 0;
      lastVal = 0;
      while (i < this.intervals) {
        start = getTimestamp();
        this.func(this.params);
        finished = getTimestamp();
        totalTime += finished - start;
        x = Math.floor(totalTime);
        if (x % 1000 === 0 && x !== lastVal) {
          lastVal = x;
          console.log(totalTime + 'ms elapsed  @ interval ' + i);
        }
        i++;
      }
      averageTime = totalTime / this.intervals;
      console.log('The Test Took: ' + totalTime / 1000 + ' seconds to run ' + i + ' test intervals');
      return console.log('The tested function took ', averageTime + 'ms to run on average.');
    };

    return Test;

  })();

  obj = {
    i: {
      t: {
        b: 0
      }
    }
  };

  testToRun = function(intervals) {};

  testing = new Test(testToRun, 1000);

  testing.run();

}).call(this);
