import { Injectable } from '@nestjs/common';
import * as puppeteer from 'puppeteer';

@Injectable()
export class SephoraService {
  async getProducts(products: string) {
    const browser = await puppeteer.launch({
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-accelerated-2d-canvas',
        '--no-first-run',
        '--no-zygote',
        '--disable-gpu',
      ],
    });
    try {
      const page = await browser.newPage();
      await page.setUserAgent(
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.150 Safari/537.36',
      );
      await page.setExtraHTTPHeaders({
        'Accept-Language': 'en-US,en;q=0.9',
      });

      page.setDefaultNavigationTimeout(2 * 60 * 1000);
      await Promise.all([
        page.waitForNavigation(),
        page.goto('https://www.sephora.com/ca/en/', {
          waitUntil: 'networkidle2',
          timeout: 0, // Wait indefinitely for the page to load, consider a reasonable timeout in production
        }),
      ]);
      await page.type('#site_search_input', products);
      await Promise.all([
        page.waitForNavigation(),
        page.keyboard.press('Enter'),
      ]);
      return await page.$$eval(
        '.css-1322gsb .css-foh208, .css-1322gsb .css-1qe8tjm',
        (resultItems) => {
          return resultItems.map((resultItem) => {
            const url = resultItem.querySelector('a')?.href;
            const title =
              resultItem.querySelector('.ProductTile-name')?.textContent;
            const price = resultItem.querySelector('.css-0')?.textContent;
            return { url, title, price };
          });
        },
      );
    } finally {
      await browser.close();
    }
  }
}
