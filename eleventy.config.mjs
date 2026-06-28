import markdownIt from 'markdown-it';
import { load as loadYaml } from 'js-yaml';

const md = new markdownIt();

export default function (eleventyConfig) {
  eleventyConfig.addDataExtension('yml,yaml', (contents) => loadYaml(contents));

  eleventyConfig.addPassthroughCopy('assets');
  eleventyConfig.addPassthroughCopy('favicon.ico');
  eleventyConfig.addPassthroughCopy('CNAME');

  eleventyConfig.addFilter('markdownify', (str) => md.render(str ?? ''));
  eleventyConfig.addFilter('cgi_escape', (str) => encodeURIComponent(str ?? ''));

  return {
    dir: {
      input: '.',
      includes: '_includes',
      layouts: '_layouts',
      data: '_data',
      output: '_site',
    },
    templateFormats: ['html', 'liquid', 'md'],
    htmlTemplateEngine: 'liquid',
    markdownTemplateEngine: 'liquid',
  };
}
