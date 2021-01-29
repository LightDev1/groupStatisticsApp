const puppeteer = require('puppeteer');

const parsePosts = async (link, click) => {
    try {
        const browser = await puppeteer.launch({ headless: false, slowMo: 100, devtools: false });
        const page = await browser.newPage();
        await page.setViewport({ width: 1396, height: 720 });
        await page.goto(link, { waitUntil: 'domcontentloaded' });

        for (let i = 0; i < click; i++) {
            const button = await page.$('button.flat_button.secondary_dark.more_link');
            await button.click();
            await page.waitForTimeout(2000);
        }

        const html = await page.evaluate(async () => {
            let response = [];
            const container = document.querySelectorAll('div._post.post.page_block.all.own.post--with-likes.closed_comments.deep_active');

            const groupTitle = document.querySelector('h1.page_name').textContent;
            const groupLogo = document.querySelector('img.post_img').src;
            const followersCount = document.querySelector('span.header_count.fl_l').textContent;

            response.push({
                groupTitle, groupLogo, followersCount,
            });

            const cutLink = (string) => {
                const regExp = /(https?:\/\/[^\s]+)/g;
                const preResult = string.match(regExp);
                const result = preResult[0].slice(0, -2);

                return result;
            };

            container.forEach(post => {
                let text;
                const date = post.querySelector('div.post_date').innerText;
                let image;
                const link = post.querySelector('a.post_link').href;
                const likesCount = post.querySelector('a.like_btn.like._like').dataset.count;
                const sharesCount = post.querySelector('a.like_btn.share._share').dataset.count;

                try {
                    text = post.querySelector('div.wall_post_text').innerText;
                } catch (error) {
                    text = null;
                }

                try {
                    const styleAttr = post.querySelector('a.page_post_thumb_wrap.image_cover.page_post_thumb_last_column.page_post_thumb_last_row').getAttribute('style');
                    image = cutLink(styleAttr);
                } catch (error) {
                    console.log(error);
                    image = null;
                }

                response.push({
                    text, date, image, link, likesCount, sharesCount,
                });
            });

            return response;
        });

        console.log(html.length);

        await browser.close();

        return html;
    } catch (e) {
        console.log(e);
        await browser.close();
    }
};

module.exports = parsePosts;