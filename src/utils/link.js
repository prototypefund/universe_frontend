let link = function(){
    this.validateYoutubeUrl = function(url){
        if (url != undefined || url != '') {
            let regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/;
            let match = url.match(regExp);
            if (match && match[2].length == 11) {
                return match[2]
            }
            else {
                return false
            }
        }
    }
}

export default new link();