/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

(function() {
    'use strict';

    // Lazyload images
    Mozilla.LazyLoad.init();

    function trackVideoInteraction(title, state) {
        window.dataLayer.push({
            'event': 'video-interaction',
            'videoTitle': title,
            'interaction': state
        });
    }

    function initVideoEvents() {
        var videos = document.querySelectorAll('video');
        var videoCards = document.querySelectorAll('.card.has-video .card-block-link');

        for (var i = 0; i < videoCards.length; i++) {
            videoCards[i].addEventListener('click', playVideo, false);
        }

        for (var j = 0; j < videos.length; j++) {
            videos[j].addEventListener('play', function() {
                trackVideoInteraction(this.getAttribute('data-ga-label'), 'play');
            }, false);

            videos[j].addEventListener('pause', function() {
                var action = this.currentTime === this.duration ? 'complete' : 'pause';
                trackVideoInteraction(this.getAttribute('data-ga-label'), action);
            }, false);
        }
    }

    function playVideo(e) {
        e.preventDefault();

        var content = $(this).next().find('.card-video-content');
        var title = $(this).find('.card-title').text();
        var video = content.find('video')[0];

        Mozilla.Modal.createModal(this, content, {
            title: title,
            onCreate: function() {
                video.load();
                video.play();
            },
            onDestroy: function() {
                video.pause();
            }
        });
    }

    initVideoEvents();

})();
