module.exports = {
    attributes: {
        challengeId: {type: 'string', required: true},
        userId: {type: 'string', required: true},
        score: {type: 'number', defaultsTo: 0},
        bestScore: {type: 'number', defaultsTo: 0},
        startTime: {type: 'number', required: true},
        bestTime: {type: 'number', defaultsTo: 2000000000},
    },
};