        $(function () {
            $.mask.definitions['~'] = "[+-]";
            $("#m_PhoneNumber").mask("(999) 999-9999? x99999");
            //$("#m_PhoneNumber").mask("+99-9999-9999");
        });

        $('video').videoSub({
            containerClass: 'videosub-container',
            barClass: 'videosub-bar',
            useBarDefaultStyle: true
        });

        $('video').videoSub();

/* workaround to add video events for MooTools (http://www.chipwreck.de/blog/2010/03/02/html-5-video-mootools/), updated for MooTools 1.3*/
var media_events = {
   loadstart: 2, progress: 2, suspend: 2, abort: 2,
   error: 2, emptied: 2, stalled: 2, play: 2, pause: 2,
   loadedmetadata: 2, loadeddata: 2, waiting: 2, playing: 2,
   canplay: 2, canplaythrough: 2, seeking: 2, seeked: 2,
   timeupdate: 2, ended: 2, ratechange: 2, durationchange: 2, volumechange: 2
}
Element.NativeEvents = Object.merge(Element.NativeEvents, media_events);

var media_properties = [
  'videoWidth', 'videoHeight', 'readyState', 'autobuffer',
  'error', 'networkState', 'currentTime', 'duration', 'paused', 'seeking',
  'ended', 'autoplay', 'loop',  'controls', 'volume', 'muted',
  'startTime', 'buffered', 'defaultPlaybackRate', 'playbackRate', 'played', 'seekable'    
];

// check for video tags and show subtitle track if the browser doesn't know how
function videosub() {
	// detect media element track support in browser via the existence of the addtrack method
	var myVideo = document.getElementsByTagName('video')[0];
	tracksupport = typeof myVideo.addtrack == "function" ? true : false;
	if (!tracksupport) {												// browser has no clue, let's help
		// first find all video tags
		videos = $$(document.getElementsByTagName('video'));
		videos.each(function(el) {
			// find track tag (this should be extended to allow multiple tracks and trackgroups) and get URL of srt file
			subtitlesrc = el.getChildren('track').get('src');
			if (subtitlesrc != '') {									// we have a track tag and assume it's subtitles (should be extended to parse role)
				var videowidth = el.get('width');						// set subtitle div as wide as video
				var fontsize = 12;
				if (videowidth > 400) {
					fontsize = fontsize + Math.ceil((videowidth - 400) / 100);
				}

				var videocontainer = new Element('div', {				// new container for video and subtitle
					'styles': {
						'position': 'relative'
					}
				});

				videocontainer.wraps(el);								// wrap the existing video into the new container

				var subcontainer = new Element('div', {					// subtitle bar
					'styles': {
						'position': 'absolute',
						'bottom': '34px',
						'width': (videowidth-50)+'px',
						'padding': '0 25px 0 25px',
						'text-align': 'center',
						'background-color': 'transparent',
						'color': '#ffffff',
						'font-family': 'Helvetica, Arial, sans-serif',
						'font-size': fontsize+'px',
						'font-weight': 'bold',
						'text-shadow': '#000000 1px 1px 0px'
					}
				});
				subcontainer.addClass('videosubbar');
				subcontainer.inject(videocontainer , 'bottom');
	
				// called on AJAX load onComplete (to work around element reference issues and closures)
				el.update = function(req) { 
					el.subtitles = new Array();
					records = req.split('\n\n');
					var r = 0;
					records.each(function(record) {
						el.subtitles[r] = new Array();
						el.subtitles[r++] = record.split('\n');
					});
				}
					
				// load the subtitle file
				el.myRequest = new Request({
					method: 'get', 
					url: subtitlesrc,
					onComplete: el.update
				});
				el.myRequest.send();
	
				el.subcount = 0;

				// add event handler to be called when play button is pressed
				el.addEvent('play', function(an_event){
					el.subcount = 0;
				});

				// add event handler to be called when video is done
				el.addEvent('ended', function(an_event){
					el.subcount = 0;
				});

				// add event handler to be called when the video timecode has jumped
				el.addEvent('seeked', function(an_event){
					el.subcount = 0;
					while (videosub_timecode_max(el.subtitles[el.subcount][1]) < this.currentTime.toFixed(1)) {
						el.subcount++;
						if (el.subcount > el.subtitles.length-1) {
							el.subcount = el.subtitles.length-1;
							break;
						}
					}
				});

				// add event handler to be called while video is playing
				el.addEvent('timeupdate', function(an_event){
					var subtitle = '';
					// check if the next subtitle is in the current time range
					if (this.currentTime.toFixed(1) > videosub_timecode_min(el.subtitles[el.subcount][1])  &&  this.currentTime.toFixed(1) < videosub_timecode_max(el.subtitles[el.subcount][1])) {
						subtitle = el.subtitles[el.subcount][2];
					}
					// is there a next timecode?
					if (this.currentTime.toFixed(1) > videosub_timecode_max(el.subtitles[el.subcount][1])  && el.subcount < (el.subtitles.length-1)) {
						el.subcount++;
					}
					// update subtitle div	
					this.getNext('div').set('html', subtitle);
				});
			}
		});
	}
}

function videosub_timecode_min(tc) {
	tcpair = tc.split(' --> ');
	return videosub_tcsecs(tcpair[0]);
}

function videosub_timecode_max(tc) {
	tcpair = tc.split(' --> ');
	return videosub_tcsecs(tcpair[1]);
}

function videosub_tcsecs(tc) {
	tc1 = tc.split(',');
	tc2 = tc1[0].split(':');
	secs = Math.floor(tc2[0]*60*60) + Math.floor(tc2[1]*60) + Math.floor(tc2[2]);
	return secs;
}

window.addEvent('load',videosub);				

        
            (function ($) {
                $.fn.extend({

                    dragout: function () {
                        var files = this;
                        if (files.length > 0) {
                            var use_data = (typeof files[0].dataset === "undefined") ? false : true;
                            $(files).each(function () {
                                var url = use_data ? this.dataset.downloadurl : this.getAttribute("data-downloadurl");
                                this.addEventListener("dragstart", function (e) {
                                    e.dataTransfer.setData("DownloadURL", url);
                                }, false);
                            });
                        }
                    }
                });
            })(jQuery);