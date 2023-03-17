import videojs from "video.js";

class VideoJSPlayer {
    constructor(container, options) {
        this.container = container;
        this._readyPromise =
            Promise.resolve(container)
                .then(container => {
                    return new Promise((resolve, reject) => {
                        try {
                            const player = videojs(container, options);
                            player.src({
                                type: "application/x-mpegURL",
                                // type: "video/x-flv",
                                src: options.src
                            });
                            player.ready(function () {
                                resolve(this);
                            })
                        } catch (e) {
                            reject(e);
                        }
                    })
                })
                .then(player => {
                    this.player = player;
                    return this;
                })
    }
    get readyPromise() {
        return this._readyPromise;
    }
    play() {
        if (this.player) {
            this.player.play();
        }
    }

    destroy() {
        if (this.player) this.player.dispose();
    }
}

export default VideoJSPlayer;