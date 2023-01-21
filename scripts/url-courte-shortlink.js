const { shorten } = require('@dhar/url-courte')

hexo.extend.helper.register('getShortLink', function(permalink){
  const url = new URL(permalink)

  let category, year, month, day, title
  try {
    [, category, year, month, day, title] = url.pathname.match(/^\/([a-z]+)\/([0-9]{4})\/([0-9]{2})\/([0-9]{2})\/([-\w]+)\/$/)
  }
  catch (e) {
    throw new Error('Invalid URL: ' + url.pathname)
  }

  const shortURL = new URL(this.config.theme_config.shortlink_domain || this.config.url)
  let ordinal = 1
  const publishDate = new Date(`${year}-${month}-${day}`)

  this.site.posts.filter((data, i) => {
      return data.date.isSame(publishDate, 'day');
  }).forEach((post, i) => {
    if (post.permalink == permalink) {
      ordinal = i + 1
    }
  })
  // console.log('>>>', this.site.posts.find({date:publishDate}))
  shortURL.pathname = shorten(category, publishDate, ordinal)

  return shortURL.toString()
});