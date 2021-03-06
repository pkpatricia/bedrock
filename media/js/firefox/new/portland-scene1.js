/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

(function($) {
    'use strict';

    $('.download-link').each(function(i, link) {
        if (link.href.indexOf('download/thanks/') > -1) {
            link.href += location.search;
        }
    });

    // use custom adjust link for Android/iOS
    $('.os_android .download-link, .os_ios .download-link').attr('href', 'https://mzl.la/2GmmCEL');
})(window.jQuery);
