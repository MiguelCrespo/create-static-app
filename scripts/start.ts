import * as path from 'path';
import * as fs from 'fs-extra';
import * as cheerio from 'cheerio';

const paths = {
  indexHtml: path.join(__dirname, '../index.html'),
}

const readIndexHtml = async (path: string) => {
  return fs.readFile(path, 'utf-8');
};

const getScripts = ($: CheerioStatic) => {
  const scripts = $('script[src]');
  const scriptsProcessed: any = [];

  scripts.each((index: number, el: CheerioElement) => {
    const attribs = el.attribs;

    scriptsProcessed.push({
      src: attribs.src,
      isAsync: typeof attribs['async'] !== 'undefined',
    });
  });

  return scriptsProcessed;
}

const main = async () => {
  const content = await readIndexHtml(paths.indexHtml);
  const $ = cheerio.load(content);

  const scripts = getScripts($);
  console.log('Scripts: ', scripts);
}

main();
