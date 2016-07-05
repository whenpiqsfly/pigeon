var mongoose = require('mongoose');
var mongooseAutoIncrement = require('mongoose-auto-increment');

// Sequence defines a complete yoga routine
var sequenceSchema = mongoose.Schema({

    created_at        : { type: Date, default: Date.now },
    updated_at        : { type: Date, default: Date.now },
    name              : String,
    description       : String,
    duration_ms       : Number,
    
    // A sequence segment defines a set of poses and transitions
    sequence_segments : [{
        name          : String,
        duration_ms   : Number,
        video_ids     : [{
            type      : Number,
            ref       : 'Video'
        }],
        tags          : [ String ]
    }],
    
    flow_id           : {
        type          : Number,
        ref           : 'Flow'
    },
    user_id           : {
        type          : Number,
        ref           : 'User'
    },
    tags              : [ String ]
}, { strict: 'throw'});

sequenceSchema.plugin(mongooseAutoIncrement.plugin, 'Sequence');
module.exports = mongoose.model('Sequence', sequenceSchema);
