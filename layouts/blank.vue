<template>
    <nuxt />
</template>

<script>
export default {
  data() {
    return {
      title: 'Onion',
    }
  },
  head() {
    return {
      titleTemplate: this.title,
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        {
          hid: 'description',
          name: 'description',
          content: 'My custom description',
        },
      ],
      script: [
        { src: "js/pixel.js" },
        { src: "js/vendor/modernizr-3.5.0.min.js" },
        { src: "js/vendor/jquery-1.12.4.min.js" },
        { src: "js/popper.min.js" },
        { src: "js/bootstrap.min.js" },
        { src: "js/owl.carousel.min.js" },
        { src: "js/isotope.pkgd.min.js" },
        { src: "js/waypoints.min.js" },
        { src: "js/jquery.counterup.min.js" },
        { src: "js/imagesloaded.pkgd.min.js" },
        { src: "js/scrollIt.js" },
        { src: "js/jquery.scrollUp.min.js" },
        { src: "js/wow.min.js" },
        { src: "js/nice-select.min.js" },
        { src: "js/jquery.slicknav.min.js" },
        { src: "js/jquery.magnific-popup.min.js" },
        { src: "js/plugins.js" },
        { src: "js/gijgo.min.js" },
        { src: "js/main.js" },
      ],
      link: [
        { rel:"stylesheet", href:"css/bootstrap.min.css" },
        { rel:"stylesheet", href:"css/owl.carousel.min.css" },
        { rel:"stylesheet", href:"css/magnific-popup.css" },
        { rel:"stylesheet", href:"css/font-awesome.min.css" },
        { rel:"stylesheet", href:"css/themify-icons.css" },
        { rel:"stylesheet", href:"css/nice-select.css" },
        { rel:"stylesheet", href:"css/flaticon.css" },
        { rel:"stylesheet", href:"css/gijgo.css" },
        { rel:"stylesheet", href:"css/animate.min.css" },
        { rel:"stylesheet", href:"css/slick.css" },
        { rel:"stylesheet", href:"css/slicknav.css" },
        { rel:"stylesheet", href:"css/style.css" },
      ]
    }
  },
}
</script>

<style>
</style>