const axios = require("axios");

// Get images from unsplash api
exports.getImagesByKeyword = async (keyword) => {

   let url = `${process.env.UnsplashBaseUrl}?query=${keyword}&per_page=30&client_id=${process.env.UnsplashAccessKey}`;
    try {
        let res = [];
        let json = await axios.get(url);
        if (json.data.results && json.data.results.length > 0) {
            json.data.results.map((img) => {
                res.push({key: keyword, url: img.urls.regular});
            });
        }
        return res;
    } catch (e) {
        console.log(e);
        return null;
    }
};

