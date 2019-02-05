export function loadFacebookSdk(appId, version) {
    return new Promise(resolve => {
        window.fbAsyncInit = () => {
            FB.init({
                appId,
                version,
                cookie: true
            });
            FB.AppEvents.logPageView();
            resolve('SDK Loaded!');
        };
        (function (d, s, id) {
            const fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) { return; }
            const js = d.createElement(s); js.id = id;
            js.src = '//connect.facebook.net/en_US/sdk.js';
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
    });
}
