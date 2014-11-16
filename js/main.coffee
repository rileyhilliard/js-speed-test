if window.performance.now
  console.log "Using high performance timer"
  getTimestamp = ->
    window.performance.now()
else
  if window.performance.webkitNow
    console.log "Using webkit high performance timer"
    getTimestamp = ->
      window.performance.webkitNow()
  else
    console.log "Using low performance timer"
    getTimestamp = ->
      +new Date()

class Test
  constructor: (@func, @params, @intervals=10000) ->

  run: () ->
    console.log('starting test...')
    totalTime = 0
    i = 0
    lastVal = 0
    while i < @intervals
      start = getTimestamp()
      # alert @name + " moved #{meters}m."
      @func(@params)
      finished = getTimestamp()
      totalTime += finished - start
      x = Math.floor(totalTime)
      if x % 1000 == 0 and x != lastVal
        lastVal = x
        console.log(totalTime+'ms elapsed  @ interval '+i)
      i++
    averageTime = totalTime / @intervals
    console.log('The Test Took: ' + totalTime / 1000 +' seconds to run '+i+' test intervals')
    console.log('The tested function took ', averageTime+'ms to run on average.')

obj = {
  i:
    t:
      b: 0
}

testToRun = (intervals)->


testing = new Test(testToRun, 1000)

testing.run()
