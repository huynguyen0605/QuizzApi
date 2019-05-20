var currentQuizzList = [];
var currentQuizzIndex = 0;
var currentPoint = 0;
var startTime = 0;
module.exports = {
    setCurrentQuizzList: function (quizzList) {
        currentQuizzList = quizzList;
    },
    setCurrentQuizzIndex: function (index) {
        currentQuizz = index;
    },
    getQuizzByIndex: function (index) {
        return currentQuizzList[index];
    },
    getCurrentQuizzIndex: function () {
        return currentQuizzIndex;
    },
    getCurrentPoint: function () {
        return currentPoint
    },
    increaseCurrentPoint: function () {
        currentPoint += 1
    },
    increaseQuizzNum: function () {
        currentQuizzIndex += 1;
    },
    setStartTime: function (startTime) {
        startTime = startTime;
    },
    getStartTime: function () {
        return startTime
    },
    reset: function () {
        currentQuizzList = [];
        currentQuizzIndex = 0;
        currentPoint = 0;
        startTime = 0;
    }
}