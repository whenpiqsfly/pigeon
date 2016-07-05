// Import models
var mongoose = require('mongoose');
var mongooseAutoIncrement = require('mongoose-auto-increment');

var connection = mongoose.connect(process.env.MONGOLAB_URI); // connect to our database
mongooseAutoIncrement.initialize(connection);

var Flow        = require('../app/models/flow');
var Sequence    = require('../app/models/sequence');
var Transition  = require('../app/models/transition');
var User        = require('../app/models/user');
var Video       = require('../app/models/video');

var ObjectId = mongoose.Types.ObjectId;

mongoose.connection.on('connected', function () {

    console.log('Mongoose default connection open to ' + process.env.MONGOLAB_URI);
    
    var testUser     = new User(
        {
            _id     : 0,
            local   : {
                email    : 'david.lien+test01@gmail.com',
                password : User.generateHash('test'),
            }
        }
    );
    testUser.save(function(err) {
        console.log('failed to create test user: ' + err);
        process.exit(1);
    });
    
    var videos = [
        {
            _id               : 0,
            name              : '1. Sun Salutation',
            description       : 'Sun Salutation',
            type              : 'Opening',
            duration_ms       : 5*1000,
            thumbnail_uri     : 'http://www.hathayogalesson.com/sunsalnew22G.gif',
            video_uri         : 'http://www.hathayogalesson.com/sunsalnew22G.gif',
            user_id           : testUser.id
        },
        {
            _id               : 1,
            name              : '2. Upauishta Konasana',
            description       : 'Seated Angle (Butterfly) Pose',
            type              : 'Pose',
            duration_ms       : 3*1000,
            thumbnail_uri     : 'http://www.hathayogalesson.com/seatedangleposeG.gif',
            video_uri         : 'http://www.hathayogalesson.com/seatedangleposeG.gif',
            user_id           : testUser.id
        },
        {
            _id               : 2,
            name              : '3. Halasana',
            description       : 'Plough Pose',
            type              : 'Pose',
            duration_ms       : 2*1000,
            thumbnail_uri     : 'http://www.hathayogalesson.com/plough.gif',
            video_uri         : 'http://www.hathayogalesson.com/plough.gif',
            user_id           : testUser.id
        },
        {
            _id               : 3,
            name              : 'Transition 2-3',
            description       : 'Test transition from 2 to 3',
            type              : 'Transition',
            duration_ms       : 1*1000,
            thumbnail_uri     : 'http://www.hathayogalesson.com/plough.gif',
            video_uri         : 'http://www.hathayogalesson.com/plough.gif',
            user_id           : testUser.id
        }
    ];
    Video.insertMany(videos,function(err, docs) {
        if (err) {
            console.log('failed to create test videos: ' + err);
        }
    });
    
    var transitions = [
        {
            video_id          : 3,
            from_video_id     : 1,
            to_video_id       : 2
        }
    ];
    Transition.insertMany(transitions,function(err, docs) {
        if (err) {
            console.log('failed to create test transitions: ' + err);
        }
    });
    
    
    var testFlow = new Flow({
        _id               : 0,
        name              : 'Simple Flow',
        description       : 'A simple set of test constraints',
        duration_ms       : 15*1000,
        flow_segments     : [
            {
                name          : 'Intro',
                duration_ms   : 5*1000,
                video_ids     : [0]
            },
            {
                name          : 'Main',
                duration_ms   : 10*1000
            }
        ],
        user_id           : testUser.id
    });
    testFlow.save(function(err) {
        console.log('failed to create test flow: ' + err);
    });
    
    
    var testSequence = new Sequence({
        _id               : 0,
        name              : 'Simple Sequence',
        description       : 'A simple sequence of test poses',
        duration_ms       : 11*1000,
        
        sequence_segments : [
            {
                name          : 'Intro',
                duration_ms   : 5*1000,
                video_ids     : [0]
            },
            {
                name          : 'Main',
                duration_ms   : 6*1000,
                video_ids     : [1,3,2]
            }
        ],
        flow_id           : testFlow.id,
        user_id           : testUser.id
    });
    testSequence.save(function(err) {
        console.log('failed to create test sequence: ' + err);
    });
    
});
