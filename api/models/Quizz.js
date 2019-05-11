module.exports = {
    attributes: {
        challengeId: {type: 'string', required: true},
        content: {type: 'string', required: true},
        listAnswer: {type: 'string', required: true},
        correctAnswer: {type: 'string', required: true},
        isActive: {type: 'boolean', defaultsTo: true}
    },
};