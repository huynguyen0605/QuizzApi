module.exports = {
    attributes: {
        name: {type: 'string', required: true},
        description: {type: 'string', defaultsTo: ''},
        isActive: {type: 'boolean', defaultsTo: true}
    },
};