require('dotenv').config();
const contentful = require("contentful");
const isPreview = process.env.CTFL_PREVIEW_MODE === "true";

const client = contentful.createClient({
    space: process.env.CTFL_SPACE,
    accessToken: isPreview ? process.env.CTFL_PREVIEW_TOKEN : process.env.CTFL_ACCESS_TOKEN,
    host: isPreview ? "preview.contentful.com" : "cdn.contentful.com" // Use Preview API host if preview mode is enabled
});

module.exports = async () => {
    return client.getEntries({ content_type: 'brand' }).then(function(response) {
            console.log('brand:');
            console.log(response);
            console.log('============');

            const brand = response.items
                .map(function(brand) {
                    return brand.fields;
                });
            return brand[0];
        })

        .catch(console.error);
};