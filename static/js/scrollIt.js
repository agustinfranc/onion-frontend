/**
 * ScrollIt
 * ScrollIt.js(scroll•it•dot•js) makes it easy to make long, vertically scrolling pages.
 *
 * Latest version: https://github.com/cmpolis/scrollIt.js
 *
 * License <https://github.com/cmpolis/scrollIt.js/blob/master/LICENSE.txt>
 */
;(function ($) {
  'use strict'

  const pluginName = 'ScrollIt'
  const pluginVersion = '1.0.3'

  /*
   * OPTIONS
   */
  const defaults = {
    upKey: 38,
    downKey: 40,
    easing: 'linear',
    scrollTime: 600,
    activeClass: 'active',
    onPageChange: null,
    topOffset: 0,
  }

  $.scrollIt = function (options) {
    /*
     * DECLARATIONS
     */
    const settings = $.extend(defaults, options)
    let active = 0
    const lastIndex = $('[data-scroll-index]:last').attr('data-scroll-index')

    /*
     * METHODS
     */

    /**
     * navigate
     *
     * sets up navigation animation
     */
    const navigate = function (ndx) {
      if (ndx < 0 || ndx > lastIndex) return

      const targetTop =
        $('[data-scroll-index=' + ndx + ']').offset().top +
        settings.topOffset +
        1
      $('html,body').animate(
        {
          scrollTop: targetTop,
          easing: settings.easing,
        },
        settings.scrollTime
      )
    }

    /**
     * doScroll
     *
     * runs navigation() when criteria are met
     */
    const doScroll = function (e) {
      const target =
        $(e.target).closest('[data-scroll-nav]').attr('data-scroll-nav') ||
        $(e.target).closest('[data-scroll-goto]').attr('data-scroll-goto')
      navigate(parseInt(target))
    }

    /**
     * keyNavigation
     *
     * sets up keyboard navigation behavior
     */
    const keyNavigation = function (e) {
      const key = e.which
      if (
        $('html,body').is(':animated') &&
        (key == settings.upKey || key == settings.downKey)
      ) {
        return false
      }
      if (key == settings.upKey && active > 0) {
        navigate(parseInt(active) - 1)
        return false
      } else if (key == settings.downKey && active < lastIndex) {
        navigate(parseInt(active) + 1)
        return false
      }
      return true
    }

    /**
     * updateActive
     *
     * sets the currently active item
     */
    const updateActive = function (ndx) {
      if (settings.onPageChange && ndx && active != ndx)
        settings.onPageChange(ndx)

      active = ndx
      $('[data-scroll-nav]').removeClass(settings.activeClass)
      $('[data-scroll-nav=' + ndx + ']').addClass(settings.activeClass)
    }

    /**
     * watchActive
     *
     * watches currently active item and updates accordingly
     */
    const watchActive = function () {
      const winTop = $(window).scrollTop()

      const visible = $('[data-scroll-index]').filter(function (ndx, div) {
        return (
          winTop >= $(div).offset().top + settings.topOffset &&
          winTop <
            $(div).offset().top + settings.topOffset + $(div).outerHeight()
        )
      })
      const newActive = visible.first().attr('data-scroll-index')
      updateActive(newActive)
    }

    /*
     * runs methods
     */
    $(window).on('scroll', watchActive).scroll()

    $(window).on('keydown', keyNavigation)

    $('body').on(
      'click',
      '[data-scroll-nav], [data-scroll-goto]',
      function (e) {
        e.preventDefault()
        doScroll(e)
      }
    )
  }
})(jQuery)
