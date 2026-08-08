import markdownIt from 'markdown-it';
import { load as loadYaml } from 'js-yaml';

const md = new markdownIt();

export default function (eleventyConfig) {
  eleventyConfig.addDataExtension('yml,yaml', (contents) => loadYaml(contents));

  eleventyConfig.addPassthroughCopy('assets');
  eleventyConfig.addPassthroughCopy('favicon.ico');
  eleventyConfig.addPassthroughCopy('CNAME');

  // `npm run dev` rebuilds assets/ with watchers outside Eleventy. Serving passthrough
  // files from source keeps the dev server from handing back a stale copy in _site/,
  // and the watch list reloads the browser without paying for a full rebuild.
  eleventyConfig.setServerPassthroughCopyBehavior('passthrough');
  eleventyConfig.setServerOptions({ watch: ['assets/**/*'] });

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
