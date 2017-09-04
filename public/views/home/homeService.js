angular.module("app").service("homeService", function($http) {

    this.redditThumbnailConditional = thumbnail => {
        if (thumbnail.slice(0, 3) !== "htt") {
          return "https://i.imgur.com/AdNMWFz.jpg";
        } else {
          return thumbnail;
        }
      };

  this.getArticle = string => {
    return $http
      .get(
        "https://www.reddit.com/search.json?q=" +
          string +
          "&limit=12&t=week&restrict_sr=true&sort=top"
      )
      .then(response => {
        const articleArray = [];
        // console.log(response)
        const results = response.data.data.children;
        console.log(results)
        for (let x of results) {
          const articleObj = {
            title: x.data.title,
            url: x.data.url,
            thumbnail: this.redditThumbnailConditional(x.data.thumbnail),
            redditurl: "https://www.reddit.com" + x.data.permalink
          };
          articleArray.push(articleObj);
        }
        return articleArray;
      });
  };
});
