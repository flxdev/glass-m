$(window).on('load',function(){
	lazyImage();
	// if(conf.firstLoad == false){
		loadState();
	// 	conf.firstLoad = true
	// }

});

document.addEventListener("DOMContentLoaded", function() {
	Menu();
	var searchInput = new SearchForm($(".js-input"));
	promoslider();
	function scaleVideo(){
		if($('.video-container').length){
			// if(isMobile()){
			// 	$('.video-container').find('.video-container-inner').remove();
			// }
			scaleVideoContainer();
			initBannerVideoSize('.video-container .poster img');
			initBannerVideoSize('.video-container .filter');
			initBannerVideoSize('.video-container video');

			$(window).on('resize', function() {
				scaleVideoContainer();
				scaleBannerVideoSize('.video-container .poster img');
				scaleBannerVideoSize('.video-container .filter');
				scaleBannerVideoSize('.video-container video');
			});
		}
	}
	scaleVideo();

	scrollAnimations();
	scrollToEl();

});
// $(window).on('resize',debounce(footerH))
var conf = {
	body: $('body'),
	html: $('html'),
	hidden: 'is-hidden',
	main: $('#barba-wrapper'),
	wrpr: $('.block'),
	footer: $('.footer'),
	arnextcontent: '<button type="button" class="slick-next slick-arrow"><div class="icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19.5 40.1"><style>.starrs0{fill:#1E3E7C;}</style><path d="M4.6 20.4c-.1-.1-.1-.2-.1-.3 0-.1 0-.2.1-.3L19.3 2.6l-.2-.2.2.2c.2-.2.2-.4.2-.6 0-.3-.1-.6-.3-.7L18 .3c-.2-.2-.4-.3-.6-.3-.3 0-.6.1-.7.3L.2 19.4c-.1.2-.2.4-.2.7 0 .2.1.5.2.6l16.4 19.1c.2.2.5.3.7.3.2 0 .5-.1.6-.2l1.2-1c.2-.2.3-.5.3-.7 0-.2-.1-.5-.2-.6L4.6 20.4z" class="starrs0"/></svg></div></button>',
	arnprevcontent: '<button type="button" class="slick-prev slick-arrow"><div class="icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19.5 40.1"><style>.starrs0{fill:#1E3E7C;}</style><path d="M4.6 20.4c-.1-.1-.1-.2-.1-.3 0-.1 0-.2.1-.3L19.3 2.6l-.2-.2.2.2c.2-.2.2-.4.2-.6 0-.3-.1-.6-.3-.7L18 .3c-.2-.2-.4-.3-.6-.3-.3 0-.6.1-.7.3L.2 19.4c-.1.2-.2.4-.2.7 0 .2.1.5.2.6l16.4 19.1c.2.2.5.3.7.3.2 0 .5-.1.6-.2l1.2-1c.2-.2.3-.5.3-.7 0-.2-.1-.5-.2-.6L4.6 20.4z" class="starrs0"/></svg></div></button>',
	firstLoad: false,
};

function Menu() {
	var trigger = $('.js-menu'),
		target = $('.mob-menu'),
		OpenClass = 'active',
		OpenClass2 = 'menu-open';

	trigger.add(target).on('click', function(e) {


		if (!trigger.hasClass('anim')) {

			trigger.addClass('anim');


			

			if(trigger.hasClass(OpenClass)){
				var div = $('.mob-menu-inner');
				if (!div.is(e.target) 
					&& div.has(e.target).length === 0) {
					setTimeout(function(){
						trigger.removeClass(OpenClass);
					},400);
					target.removeClass(OpenClass);
					conf.body.removeClass(OpenClass2);
					window.__prevScrollTop && (window.scroll(0, window.__prevScrollTop));
					window.__prevScrollTop = null;
				}

			}else{
				var top = $(window).scrollTop();
				window.__prevScrollTop = top;
				trigger.addClass(OpenClass);
				conf.body.addClass(OpenClass2);
				target.addClass(OpenClass);
				document.body.style.top = -top + "px";
				window.scroll(0, window.__prevScrollTop);
			}
			setTimeout(function() {
				trigger.removeClass('anim')
			}, 500);
		}
	})
	// $('.mob-menu-inner').click(function(e) {
	// 	e.stopPropagation();
	// });
}
function scaleVideoContainer() {

	var height = $('.video-container').height() + 5;
	var unitHeight = parseInt(height) + 'px';
	$('.homepage-hero-module').css('height',unitHeight);

}

function initBannerVideoSize(element){

	$(element).each(function(){
		$(this).data('height', $(this).height());
		$(this).data('width', $(this).width());
	});

	scaleBannerVideoSize(element);

}

function scaleBannerVideoSize(element){

	var windowWidth = $('.video-container').width(),
	windowHeight = $('.video-container').outerHeight() + 5,
	videoWidth,
	videoHeight;

	$(element).each(function(){
		var videoAspectRatio = $(this).data('height')/$(this).data('width');

		$(this).width(windowWidth);

		if(windowWidth < 1000){
			videoHeight = windowHeight;
			videoWidth = videoHeight / videoAspectRatio;
			$(this).css({'margin-top' : 0, 'margin-left' : -(videoWidth - windowWidth) / 2 + 'px'});

			$(this).width(videoWidth).height(videoHeight);
		}

		$('.homepage-hero-module .video-container video').addClass('fadeIn animated');

	});
}
function SearchForm(el) {
	var this_ = this;

	this_.initEvents = function() {
		var self = this;
		this_.el.on("focus", this_.iFocus);
		this_.el.on("blur", function(event) {
			if (!$(event.relatedTarget).hasClass("search-submit")) {
				this_.iBlur();
			}
		});
		this_.el.on("input", this_.iInput);
		this_.submit.on("click", this_.initSubmit);
		this_.reset.on("click", this_.iReset);
		this.el.on("click", function(){
			var _this = $(this);
			// self.this_.iFocus();
			_this.removeAttr('readonly');
			setTimeout(function(){
				_this.trigger("change click");
				// _this.removeAttr('readonly');
				_this.focus();
			},500);
		});
	};

	this_.iInput = function() {
		this_.iVal = $(this).val();
		if (this_.iVal != 0) {
			this_.reset.addClass(this_.def.resetClass);
			this_.form.addClass(this_.def.active);
			this_.placeHold.hide();
		} else {
			this_.reset.removeClass(this_.def.resetClass);
			this_.form.removeClass(this_.def.active);
			this_.placeHold.show();
		}
	};

	this_.iFocus = function() {
		this_.iVal = this_.el.val();
		this_.parent.addClass(this_.def.open);
		this_.submit.attr("type", "submit");
		if (this_.iVal.length != 0)
			this_.form.addClass(this_.def.active);

	};

	this_.iBlur = function() {
		this_.iVal = this_.el.val();
		if (this_.iVal.length == 0) {
			this_.parent.removeClass(this_.def.open);
			this_.submit.attr("type", "button");
		}
		// this_.el.attr('readonly', "");
	};

	this_.iReset = function() {
		this_.reset.removeClass(this_.def.resetClass);
		this_.form.removeClass(this_.def.active);
		this_.submit.attr("type", "button");
		this_.el.attr("value", "");
		this_.el.val("");
		this_.el.focus();
		this_.placeHold.show();
	}

	this_.initSubmit = function() {
		if (this_.submit.attr("type") !== "submit") {
			this_.el.trigger("focus");
		} else {
			alert("Send form!")
		}
		return false;
	};

	this_.iDetected = function(el) {

		if (this_.iVal.length != 0) {
			this_.iFocus();
			this_.reset.addClass(this_.def.resetClass);
			this_.placeHold.hide();
		}
	};
	this_.generatePlaceeholder = function(){
		var span = document.createElement("span");
		span.classList.add("placeholder");

		var placeholderValue = this.el.data("placeholder");

		span.textContent = placeholderValue;

		$(span).insertAfter(this.el);

		this_.placeHold = $(".placeholder");
	}

	this_.init = function() {
		this_.el = el;
		this_.parent = this_.el.parent();
		this_.iVal = this_.el.val();
		this_.submit = this_.parent.find(".search-submit");
		this_.reset = this_.parent.find(".search-reset");
		this_.form = this_.el.parents("form");

		this_.def = {
			open: "open",
			resetClass: "show",
			active: "not-empty"
		}

		this_.generatePlaceeholder();
		this_.iDetected();
		this_.initEvents();
	};
	if (el.length) {
		this_.init();
	}
}
function promoslider(){
	$(".js-promoslider").each(function() {
		var _this = $(this),
				parent = _this.closest('.promo-slider'),
				slides = _this.find('.promo-slider-item'),
				link = parent.find('.js-promo-link');
		_this.on('init reInit afterChange', function (event, slick, currentSlide, nextSlide) {
			var activeslide = slides.filter('.slick-current'),
				href = activeslide.data('href');
				link.attr('href',href);
		});
		_this.slick({
			accessibility: false,
			arrows: true,
			dots: true,
			fade: true,
			touchMove: false,
			dragable: false,
			infinite: true,
			slidesToShow: 1,
			slidesToScroll: 1,
			appendDots: parent.find('.dots-wrap'),
			speed: 1000,
		});
	});
}

if (!window.Promise) {
  window.Promise = Promise;
}


function lazyImage(){
	// Get all of the images that are marked up to lazy load
	
	var arr = document.querySelectorAll('.js-image');
	var images = [];
	for(var i = 0; i < arr.length; i++){
		images.push(arr[i]);
	}

	var config = {
		rootMargin: '0px 0px',
		threshold: 0.01
	};

	var imageCount = images.length;
	var observer = void 0;
	// If we don't have support for intersection observer, loads the images immediately
	if (!('IntersectionObserver' in window)) {
		for(var i = 0; i < imageCount; i++){
			preloadImage(images[i]);
		}

	} else {
		// It is supported, load the images
		observer = new IntersectionObserver(onIntersection, config);

		for(var i = 0; i< imageCount; i++){
			if (images[i].classList.contains('js-image-handled')) {
				return;
			}

			observer.observe(images[i]);
		}
	}

	/**
	 * Fetchs the image for the given URL
	 * @param {string} url 
	 */
	function fetchImage(url) {

		return new Promise(function (resolve, reject) {
			var image = new Image();
			image.src = url;
			image.onload = resolve;
			image.onerror = reject;
		});
	}

	/**
	 * Preloads the image
	 * @param {object} image 
	 */
	function preloadImage(image) {
		
		var src = image.dataset.src;

		if (!src) {

			return;
		}

		return fetchImage(src).then(function () {

			applyImage(image, src);
		});
	}

	/**
	 * Load all of the images immediately
	 * @param {array} images 
	 */
	function loadImagesImmediately(images) {
		for(var i = 0; i< images.length; i++){
			return preloadImage(images[i]);
		}
		// Array.from(images).forEach(function (image) {
		// 	return preloadImage(image);
		// });
	}

	/**
	 * Disconnect the observer
	 */
	function disconnect() {
		if (!observer) {
			return;
		}

		observer.disconnect();
	}

	/**
	 * On intersection
	 * @param {array} entries 
	 */
	function onIntersection(entries) {
		// Disconnect if we've already loaded all of the images
		if (imageCount === 0) {
			observer.disconnect();
		}

		// Loop through the entries

		entries.forEach(function (entry) {
			// Are we in viewport?
			if (entry.intersectionRatio > 0) {
				imageCount--;

				// Stop watching and load the image
				observer.unobserve(entry.target);
				preloadImage(entry.target);
			}
		});
	}

	/**
	 * Apply the image
	 * @param {object} img 
	 * @param {string} src 
	 */
	function applyImage(img, src) {
		// Prevent this from being lazy loaded a second time.
		img.classList.add('js-image-handled');
		if(img.classList.contains('bg')){

			img.style.backgroundImage = "url("+src+")";
		}else{
			img.src = src;

		}
		img.classList.add('fade-in');
	}	
}
(function () {
	if ( typeof NodeList.prototype.forEach === "function" ) return false;
	NodeList.prototype.forEach = Array.prototype.forEach;
})();
function Ytube() {
	var youtube = document.querySelectorAll( ".youtube-slide" );
	
	for (var i = 0; i < youtube.length; i++) {
		
		var source = "https://img.youtube.com/vi/"+ youtube[i].dataset.embed +"/mqdefault.jpg";
		var parent = $(youtube[i]).parent();
		var image = new Image();
			image.src = source;
			image.addEventListener( "load", function() {
				youtube[ i ].appendChild( image );
			}( i ) );
	
			youtube[i].addEventListener( "click", function() {

				var iframe = document.createElement( "iframe" );

					iframe.setAttribute( "frameborder", "0" );
					iframe.setAttribute( "allowfullscreen", "" );
					// iframe.setAttribute( "wmode", "Opaque" );
					parent.hasClass('prod-eleminner-images') ? iframe.setAttribute( "src", "https://www.youtube.com/embed/"+ this.dataset.embed +"?wmode=opaque&rel=0&showinfo=0&autoplay=1" ) : iframe.setAttribute( "src", "https://www.youtube.com/embed/"+ this.dataset.embed +"?rel=0&showinfo=0" );;
					

					this.innerHTML = "";
					this.appendChild( iframe );
			} );	
	};
	
}
function teamslider(){
	$(".js-team-slider").each(function() {
		var _this = $(this),
				parent = _this.parent();
		_this.slick({
			accessibility: false,
			arrows: false,
			dots: false,
			fade: false,
			touchMove: false,
			dragable: false,
			infinite: true,
			slidesToShow: 2,
			slidesToScroll: 1,
		})
	});
}
function qualitySlider(){
	$(".js-quality-slider").each(function() {
		var _this = $(this),
				parent = _this.parent();
		_this.slick({
			accessibility: false,
			arrows: false,
			dots: false,
			fade: false,
			touchMove: false,
			dragable: false,
			infinite: true,
			slidesToShow: 2,
			slidesToScroll: 1,
		})
	});
}
function moreslider(){
	$(".js-moreslider").each(function() {
		var _this = $(this),
				parent = _this.parent();
		_this.slick({
			accessibility: false,
			arrows: true,
			dots: false,
			fade: false,
			touchMove: false,
			dragable: false,
			infinite: false,
			slidesToShow: 1,
			slidesToScroll: 1,
			appendArrows: parent.find('.slider-nav'),
			prevArrow: conf.arnprevcontent,
			nextArrow: conf.arnextcontent,
		})
	});
}
function ProjectsSlider(){
	$(".js-project-slider").each(function() {
		var _this = $(this),
				parent = _this.closest('.projects-wrap');
		_this.slick({
			accessibility: false,
			arrows: false,
			dots: true,
			touchMove: false,
			dragable: false,
			infinite: true,
			slidesToShow: 1,
			autoplaySpeed: 4500,
			autoplay: true,
			vertical: true,
			slidesToScroll: 1,
			asNavFor: parent.find('.js-project-bg'),
			appendDots: parent.find('.dots-wrap'),
		})
	});
	$(".js-project-bg").each(function() {
		var _this = $(this),
				parent = _this.closest('.projects-wrap');
		_this.slick({
			accessibility: false,
			arrows: false,
			dots: false,
			fade: true,
			touchMove: false,
			dragable: false,
			infinite: false,
			autoplaySpeed: 4500,
			slidesToShow: 1,
			slidesToScroll: 1,
			asNavFor: parent.find('.js-project-slider'),
		})
	});
}
function feedbackslider(){
	$(".js-feedbackslider-main").each(function() {
		var _this = $(this),
				parent = _this.parent();
		_this.slick({
			accessibility: false,
			arrows: true,
			dots: false,
			fade: true,
			touchMove: false,
			dragable: false,
			infinite: false,
			slidesToShow: 1,
			speed: 1000,
			slidesToScroll: 1,
			asNavFor: parent.find('.js-feedbackslider-bg'),
			appendArrows: parent.find('.slider-nav'),
			prevArrow: conf.arnprevcontent,
			nextArrow: conf.arnextcontent,
		});
	});
	$(".js-feedbackslider-bg").each(function() {
		var _this = $(this),
				parent = _this.parent();
		_this.slick({
			accessibility: false,
			arrows: false,
			dots: false,
			fade: true,
			touchMove: false,
			dragable: false,
			infinite: false,
			speed: 1000,
			slidesToShow: 1,
			slidesToScroll: 1,
			asNavFor: parent.find('.js-feedbackslider-main'),
		})
	});
}

function scrollAnimations(){
	inView.offset({
		top: 0,
		bottom: 40,
	});
	inView.threshold(0.1);
	var inimcont = document.querySelectorAll('.anim-cont');
	inView('.anim-cont')
		.on('enter', function(el){
			if(!el.done) {
				el.classList.add('active');
			}
		}).on('exit', function(el){
			el.done = true;
		});
	inView('.projects-wrap')
		.on('enter', function(el){
			if(!el.done) {
				el.classList.add('active');
			}
		}).on('exit', function(el){
			el.done = true;
		});
}

function review(elements){
	this.elems = $(elements);
	this.modal = $('[data-modal="review"]');
	this.targetcont = this.modal.find('.js-review-target');
	this.height = 123;
	this.checkheight();
}
review.prototype = {
	checkheight: function(){
		var self  = this;
		this.elems.each(function(){
			var cont = $(this).find('.review-item-inner');
			var text = cont.find('.js-review-text');
			var h = text.height();
			if(h > self.height){
				cont.addClass('cutted');
				self.initclick($(this))
			}
		});
	},
	initclick: function(item){
		var self  = this;
		var trigger = item.find('.review-trigger');
		trigger.off('click').on('click',function(){
			var content = $(this).closest('.review-item-inner');
			self.targetcont.empty()
			content.clone().appendTo(self.targetcont).removeClass('cutted');
			self.openModal();
		});
	},
	openModal: function(){
		var self  = this;
		this.modal.addClass('active');

		var top = $(window).scrollTop();
		window.__prevScrollTop = top;
		document.body.style.top = -top + "px";
		window.scroll(0, window.__prevScrollTop);
		conf.body.addClass('menu-open');
		// this.modal.on('click', '', function(e) {
		// 	if (!$('.closePopup').is(e.target)) {
		// 		e.stopPropagation();
		// 	}
		// });
		this.modal.find().add(this.modal).off('click').on('click', function(e) {
			var div = $('.modal-container');
			if (!div.is(e.target) 
					&& div.has(e.target).length === 0 || $('.closePopup').is(e.target)) {
				self.closeModal();
			}
		});
	},
	closeModal: function(){
		this.modal.removeClass('active');
		conf.body.removeClass('menu-open');
		window.__prevScrollTop && (window.scroll(0, window.__prevScrollTop));
		window.__prevScrollTop = null;
	}
}

function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

function urldecode(url) {
  return decodeURIComponent(url.replace(/\+/g, ' '));
}
function getString(string) {
  return decodeURIComponent(string.replace(/\+/g, ' '));
}

function ProdinnerHead(){

	var target = $('.js-prod-head');
	var targetNext = target.find('.columns:last-child').find('.prod-nav-link');
	var targetNextText = targetNext.find('.prod-nav-link-text');
	var targetPrev = target.find('.columns:first-child').find('.prod-nav-link');
	var targetPrevText = targetPrev.find('.prod-nav-link-text');
	var vh = $('.page-head').height();
	var cont = $('.barba-container').last();

	var pathType = getCookie('BITRIX_SM_MAIN_CUR_DIR') !== null ? getCookie('BITRIX_SM_MAIN_CUR_DIR').toUpperCase() : false;
	var nextL = getCookie('BITRIX_SM_'+pathType+'_NEXT_LINK');
	var nextText = getCookie('BITRIX_SM_'+pathType+'_NEXT_TEXT');
	var prevL = getCookie('BITRIX_SM_'+pathType+'_PREV_LINK');
	var prevText = getCookie('BITRIX_SM_'+pathType+'_PREV_TEXT');

	if(nextL !== null){
		targetNext.attr('href',nextL);
	
	}else{
		targetNext.attr('href','#');
	}
	if(prevL !== null){
		targetPrev.attr('href',prevL);
	}else{
		targetPrev.attr('href','#');
	}
	target.addClass('active');
}
var debounce = function(t, e, n) {
	var o;
	return function() {
		var i = this
		  , a = arguments
		  , s = function() {
			o = null,
			n || t.apply(i, a)
		}
		  , r = n && !o;
		clearTimeout(o),
		o = setTimeout(s, e),
		r && t.apply(i, a)
	}
};
var sortItem = function(){
	var trigger = $('.js-select-item');
	trigger.each(function(){
		var _ = $(this),
			textCont = _.find('.js-trgt-text'),
			target = _.parent().find('.dropdown-target'),
			item = target.find('.sort-select-item a');
		_.on('click', function(){
			trigger.removeClass('active')
			_.toggleClass('active');

		});
		item.each(function(){
			var _ = $(this);
			_.on('click',function(e){
				var altLext = _.data('text');
				textCont.text(altLext);
				_.parent().addClass('active').siblings().removeClass('active');
				e.preventDefault();
				setTimeout(function(){
					target.removeClass('active');
					trigger.removeClass('active');
				},300);
			});
		})
		$(document).on('click touchstart', function (e){
			if (!trigger.is(e.target)
				&& trigger.has(e.target).length === 0) {
				trigger.removeClass('active');
			}
		});
	});
};

var opts;
function initMap() {
	var trel = $('#map');
	var map;
	opts = {
				zoom: 12,
				fullscreenControl: true,
				scrollwheel: false,
				mapTypeControl: false,

				scaleControl: false,
				// center: centercords,
				streetViewControl: false,
				gestureHandling: 'cooperative',
				zoomControlOptions: {
						position: google.maps.ControlPosition.RIGHT_CENTER
				},
				 styles:[
					{
						"featureType": "administrative",
						"elementType": "labels.text.fill",
						"stylers": [
							{
								"color": "#444444"
							}
						]
					},
					{
						"featureType": "landscape",
						"elementType": "all",
						"stylers": [
							{
								"color": "#ffffff"
							}
						]
					},
					{
						"featureType": "poi",
						"elementType": "all",
						"stylers": [
							{
								"visibility": "simplified"
							},
							{
								"color": "#377041"
							},
							{
								"lightness": "79"
							},
							{
								"saturation": "0"
							}
						]
					},
					{
						"featureType": "poi.attraction",
						"elementType": "all",
						"stylers": [
							{
								"visibility": "off"
							}
						]
					},
					{
						"featureType": "poi.business",
						"elementType": "all",
						"stylers": [
							{
								"visibility": "off"
							}
						]
					},
					{
						"featureType": "road",
						"elementType": "all",
						"stylers": [
							{
								"saturation": -100
							},
							{
								"lightness": 45
							},
							{
								"visibility": "simplified"
							},
							{
								"color": "#f0f0f0"
							}
						]
					},
					{
						"featureType": "road",
						"elementType": "labels",
						"stylers": [
							{
								"visibility": "simplified"
							}
						]
					},
					{
						"featureType": "road",
						"elementType": "labels.text",
						"stylers": [
							{
								"color": "#b0b0b0"
							}
						]
					},
					{
						"featureType": "road.highway",
						"elementType": "all",
						"stylers": [
							{
								"visibility": "simplified"
							}
						]
					},
					{
						"featureType": "road.highway",
						"elementType": "geometry.stroke",
						"stylers": [
							{
								"visibility": "simplified"
							},
							{
								"color": "#b0b0b0"
							}
						]
					},
					{
						"featureType": "road.arterial",
						"elementType": "labels.icon",
						"stylers": [
							{
								"visibility": "off"
							}
						]
					},
					{
						"featureType": "transit",
						"elementType": "all",
						"stylers": [
							{
								"visibility": "simplified"
							},
							{
								"lightness": "29"
							},
							{
								"saturation": "9"
							}
						]
					},
					{
						"featureType": "transit",
						"elementType": "geometry.fill",
						"stylers": [
							{
								"visibility": "off"
							}
						]
					},
					{
						"featureType": "transit",
						"elementType": "geometry.stroke",
						"stylers": [
							{
								"visibility": "off"
							}
						]
					},
					{
						"featureType": "transit",
						"elementType": "labels.text",
						"stylers": [
							{
								"visibility": "simplified"
							},
							{
								"lightness": "0"
							},
							{
								"saturation": "0"
							},
							{
								"gamma": "3.84"
							},
							{
								"color": "#5d5353"
							}
						]
					},
					{
						"featureType": "transit",
						"elementType": "labels.icon",
						"stylers": [
							{
								"visibility": "on"
							}
						]
					},
					{
						"featureType": "water",
						"elementType": "all",
						"stylers": [
							{
								"color": "#cadfe7"
							},
							{
								"visibility": "on"
							}
						]
					}
				]
			}; 
	initialize(trel[0])
}
function initialize(elem){
	var _ = elem;
	var latcord = parseFloat(_.getAttribute('data-lat'));
	var loncord = parseFloat(_.getAttribute('data-lon'));
	var imgpath = _.getAttribute('data-icon');
	var centercords = new google.maps.LatLng(latcord, loncord);
	mapvar = new google.maps.Map(_,opts);
	mapvar.setCenter(centercords)
	var img = {
		url: imgpath,
		size: new google.maps.Size(53, 85),
		origin: new google.maps.Point(0, 0),
		scaledSize: new google.maps.Size(26.5, 42.5),
		anchor: new google.maps.Point(13.25, 21.25),
	};

	var marker = new google.maps.Marker({
		position: centercords,
		map: mapvar,
		icon: img,
		zIndex: 99999
	});
	elem.classList.add('inited');
}
function googleMaps(){
	var script_tag = document.createElement("script");
	if(typeof(google) != "object") {
		script_tag.setAttribute("type", "text/javascript");
		script_tag.setAttribute("src", "https://maps.googleapis.com/maps/api/js?key=AIzaSyDcFkgUmSnM7fy40cDnRn8BB_xu1cp7Ros&callback=initMap");
		document.getElementById("map").appendChild(script_tag);
	} else {
		initialize(document.getElementById("map")) 
	}
};
function scrollToEl(){
	$(".js-scroll-to").on('click', function (e) {
		e.preventDefault();
		e.stopPropagation();
		var elementClick = $(this).data("href");
		var target = $('body').find('[data-id="' + elementClick + '"]');
		var pad = 80;
		var destination;
		if( $(this).hasClass('to-top')){
			destination = 0;
			$("html, body:not(:animated), .out:not(:animated)").animate({scrollTop: destination}, 600);
		}
		if(target.length){
			destination = $(target).offset().top,
			$("html, body:not(:animated), .out:not(:animated)").animate({scrollTop: destination - pad}, 600);
		}

	});
}
function loadState(){
	var li = window.location.pathname;
	var navigationLinkIsActive = document.querySelectorAll('[href="' + li + '"]');
	var navigationLinks = document.querySelectorAll('.js-nav');
	Array.prototype.forEach.call(navigationLinks, function (navigationLink) {
				return navigationLink.classList.remove('active');
	});
	Array.prototype.forEach.call(navigationLinkIsActive, function (navigationLink) {
				return navigationLink.classList.add('active');
	});
}
function tapProject(){
	var parent = $('.row-blue');
	if(parent.length){
		var targets = parent.find('.project-item');
		targets.each(function(){
			var _ = $(this);
			_.off('click').on('click',function(){
				if(!_.hasClass('showed')){
						_.addClass('showed').parent().siblings().find('.project-item').removeClass('showed');
				}
				$(document).on('click',function(e){
					if (!parent.is(e.target) 
						&& parent.has(e.target).length === 0) {
							targets.removeClass('showed')
					}
				})
			});

		});
	}
}
var BarbaWitget = {
	init: function(){
		var scope = this;

		Barba.Pjax.start();
		// Barba.Prefetch.init();
		Barba.Pjax.cacheEnabled = false;
		Barba.Pjax.getTransition = function(){
			return scope.MovePage;
		};
		// Barba.Dispatcher.on('newPageReady', function(currentStatus, oldStatus, container) {

		// }); 
		Barba.Dispatcher.on('newPageReady', function (currentStatus) {
			var link = currentStatus.url.split(window.location.origin)[1].substring(0);
			var navigationLinks = document.querySelectorAll('.js-nav');
			var navigationLinkIsActive = document.querySelectorAll('[href="' + link + '"]');

			Array.prototype.forEach.call(navigationLinks, function (navigationLink) {
						return navigationLink.classList.remove('active');
			});
			Array.prototype.forEach.call(navigationLinkIsActive, function (navigationLink) {
						return navigationLink.classList.add('active');
			});

		});        

		Barba.Dispatcher.on('transitionCompleted', function(currentStatus, prevStatus) {
			scrollAnimations();
			lazyImage();
			scrollToEl();
		});
	},
	MovePage: Barba.BaseTransition.extend({
		start: function(){
			Promise
				.all([this.newContainerLoading, this.fadeOut()])
				.then(this.fadeIn.bind(this));
		},
		fadeOut: function(){
			var deferred = Barba.Utils.deferred();

			$('.js-menu').add('.mob-menu').removeClass('active');
			conf.body.removeClass('menu-open');
			window.__prevScrollTop && (window.scroll(0, window.__prevScrollTop));
			window.__prevScrollTop = null;

			return $(this.oldContainer).animate({
				opacity: 0,
			}, 1000,function(){
			}).addClass('moveDown').promise();

		},
		fadeIn: function(){
			var _this = this;
			var $el = $(this.newContainer);
			$(this.oldContainer).hide();
			$el.addClass('moveUp');
			TweenMax.set($el, {
				force3D:true,
				y: 200,
				onComplete: function () {
					$(window).scrollTop(0,0);
					TweenMax.to($el, .5, {
						y: 0,
						force3D:true,
						autoAlpha: 1,
						onComplete: function () {
							TweenMax.set($el, {clearProps: 'all'});
							$el.removeClass('moveUp');
							_this.done();
						}
					});
				}
			});
		}
	})
};

var IndexPage = Barba.BaseView.extend({
	namespace: "index",
	onEnter: function(){
		promoslider();
		ProjectsSlider();
	},
	onEnterCompleted: function(){
		teamslider();
		// qualitySlider();
	},
	onLeaveComplete: function(){
	}
});

var Production = Barba.BaseView.extend({
	namespace: "Production",
	onEnter: function(){
	},
	onEnterCompleted: function(){
		console.log("onEnterCompleted");

	},
	onLeaveComplete: function(){
		console.log("onLeaveComplete");
	}
});
var ProductionInner = Barba.BaseView.extend({
	namespace: "Production-inner",
	onEnter: function(){
		Ytube();
	},
	onLeave: function(){
		$('.js-prod-head').removeClass('active');
	},
	onEnterCompleted: function(){

		moreslider();
		ProdinnerHead();
	},
	onLeaveComplete: function(){
	}
});
var PojectsPage = Barba.BaseView.extend({
	namespace: "Projects",
	onEnter: function(){
	},
	onEnterCompleted: function(){
		sortItem();
	},
	onLeaveComplete: function(){
	}
});
var contacts = Barba.BaseView.extend({
	namespace: "Contacts",
	onEnter: function(){
	},
	onEnterCompleted: function(){
		 googleMaps();

	},
	onLeaveComplete: function(){
	}
});
var content = Barba.BaseView.extend({
	namespace: "Content",
	onEnter: function(){
		tapProject()
		var revItems = document.querySelectorAll('.review-item');
		if(revItems.length){
			revfunc = new review(revItems);
		}

	},
	onEnterCompleted: function(){
		// initMap();
		feedbackslider();
	},
	onLeaveComplete: function(){
	}
});
var NewsInner = Barba.BaseView.extend({
	namespace: "news-inner",
	onEnter: function(){

	},
	onLeave: function(){
	},
	onEnterCompleted: function(){

		stickinit();
		moreslider();
	},
	onLeaveComplete: function(){
	}
});
IndexPage.init();
Production.init();
ProductionInner.init();
PojectsPage.init();
contacts.init();
content.init();
NewsInner.init();
BarbaWitget.init();


