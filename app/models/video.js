var mongoose = require('mongoose');
var mongooseAutoIncrement = require('mongoose-auto-increment');

// Video defines metadata for a video
// A video can be a pose, transition, opening, or ending
var videoSchema = mongoose.Schema({

    created_at        : { type: Date, default: Date.now },
    updated_at        : { type: Date, default: Date.now },
    name              : String,
    description       : String,
    type              : {
        type          : String,
        enum          : ['Pose', 'Transition', 'Opening', 'Ending']
    },
    duration_ms       : Number,
    thumbnail_uri     : String,
    video_uri         : String,
    user_id           : {
        type          : Number,
        ref           : 'User'
    },
    tags       : [ String ]
}, { strict: 'throw'});

videoSchema.plugin(mongooseAutoIncrement.plugin, 'Video');
module.exports = mongoose.model('Video', videoSchema);
