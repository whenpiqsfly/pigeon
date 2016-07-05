var mongoose = require('mongoose');
var mongooseAutoIncrement = require('mongoose-auto-increment');

// Transition Defines an allowed transition between Poses
var transitionSchema = mongoose.Schema({

    created_at        : { type: Date, default: Date.now },
    updated_at        : { type: Date, default: Date.now },
    video_id          : {
        type          : Number,
        ref           : 'Video',
        required      : true,
        unique        : true
    },
    from_video_id     : {
        type          : Number,
        ref           : 'Video'
    },
    to_video_id       : {
        type          : Number,
        ref           : 'Video'
    },
    tags       : [ String ]
}, { strict: 'throw', _id: false});

transitionSchema.plugin(mongooseAutoIncrement.plugin, 'Transition');
module.exports = mongoose.model('Transition', transitionSchema);
