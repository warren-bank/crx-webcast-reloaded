// Title: chromecast assets
var Chromecast_config = {
    playback: {
        autoPlay: false
    },
    analytics: {
        enable: false,
        cuid: 'visualon' // customer specified user ID for Analytics Agent.
    },
    cast: {
        receiverAppId: 'B5BCD208'
    },
    logs: {
        logToConsole: false
    }
};

var Chromecast_stream = {
    links: [{
        uri: null
    }]
};

var External_Subtitle_info = {
    uri: null, // .srt
    lang: 'english',
    default: true
};
