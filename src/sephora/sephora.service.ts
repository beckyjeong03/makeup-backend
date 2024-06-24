import { Injectable } from '@nestjs/common';
import * as puppeteer from 'puppeteer';
import { CreateProductDataDto } from 'src/productdatas/create-productdata.dto';
import { ProductdatasService } from 'src/productdatas/productdatas.service';

@Injectable()
export class SephoraService {
  constructor(private productdatasService: ProductdatasService) {}
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

      // go over the products on the listing and create an object that holds the url value
      const productLinks = await page.$$eval(
        '.css-1322gsb .css-foh208',
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

      const productDetails = [];

      // return productLinks;
      for (const link of productLinks) {
        console.log(link?.url);
        await page.goto(link?.url, { waitUntil: 'networkidle2' });
        await page.waitForSelector('.css-197cabr');
        await page.click('.css-197cabr');
        await page.waitForSelector('.css-1imcv2s');
        const temp = await page.evaluate(() => {
          const textElement = document.querySelector('.css-1imcv2s div');
          return textElement ? textElement.textContent : 'No text found';
        });

        const productDetail = {
          url: link?.url,
          title: link?.title,
          price: link?.price,
          description: temp,
        };
        productDetails.push(productDetail);

        const createProductDataDto: CreateProductDataDto = {
          url: productDetail?.url,
          title: productDetail?.title,
          price: productDetail?.price,
          description: productDetail?.description,
        };
        await this.productdatasService.create(createProductDataDto);
      }
      return productDetails;
    } finally {
      await browser.close();
    }
  }
}
