/*
    File Name: script.js
    by Tolga Can
    RT-Theme 16
*/

/* ******************************************************************************* */
  /* TWITTER */
  var twitter_user_name = 'arqrush'; //your twitter username 
  var tweet_count_footer = 1; //number of tweets to show - of footer twitter widget
  var tweet_count_sidebar = 3; //number of tweets to show - of sidebar/content twitter widget
  var loading_text  = 'Loading Tweets...'; // the loading text
  
  /* FLICKR */
  var flickr_user_id = '36587311@N08'; //your flickr user id
  var flickr_thumbnail_count = 8; //the thumbmail number to show
  
  /* CYCLE SLIDER */
  var rttheme_slider_timeout=7000; //miliseconds 7000 = 7 seconds
  var rttheme_slider_effect="fade";

  /* NIVO SLIDER */
  var rttheme_nivo_slider_timeout=7000; //miliseconds 7000 = 7 seconds 

/* ******************************************************************************* */ 



// Accordion Slider
jQuery(document).ready(function(){
	
	//slider holder
	var accordion_slider_holder = "#accordion_slider";
	
	//size of the slides
	var SlideCount = $(accordion_slider_holder+' li').length; 
	
	//width of slides
	var SlideWidth = ( 940 - ((SlideCount-1)*20) ) / SlideCount;
	
	$(accordion_slider_holder+' li').css( 'width', SlideWidth+"px" );
	
	//extend kwicks
	$(accordion_slider_holder+' li').rt_accordion_effect();
	
	//start kwicks
	if ($(accordion_slider_holder+' li').length>1){
	    $(accordion_slider_holder).kwicks({
		    max : 700,
		    spacing : 20,
		    duration: 500
	    }); 
	}
});
		

// Nivo Slider
jQuery(document).ready(function(){
	if (jQuery('#nivo_slider').length>0){
	    jQuery('#nivo_slider').nivoSlider({ 
	    	 effect: 'boxRain',
			 pauseTime:8*1000, // How long each slide will show	
			 captionOpacity:1,
			 controlNav: false 	  
		});
	}
});


//Cycle Slider
jQuery(document).ready(function(){
	jQuery('#cycle_slider').cycle({ 
		fx:     			'scrollUp',  // Effect 
		timeout:  		8*1000,  // Timeout value (ms) 
		easing: 			'backout', 
		pager:  			'#numbers', 
		cleartype:  		1,
		after:   			onAfter,
		before:  			onBefore,
		pause:           	true,     // true to enable "pause on hover"
		pauseOnPagerHover: 	true,   // true to pause when hovering over pager link					
		pagerAnchorBuilder: function(idx) { 
			return '<a href="#" title=""><img src="images/pixel.gif" width="8" heigth="8"></a>'; 
		}
	});
});
			
//Photo Slider
jQuery(document).ready(function(){ 
    if (jQuery('.photo_gallery_cycle ul').length>0){
        jQuery(".photo_gallery_cycle ul").cycle({ 
            fx:     'fade', 
            timeout:  rttheme_slider_timeout,
            pager:  '.slider_buttons', 
            cleartype:  1,
            pause:           true,     // true to enable "pause on hover"
            pauseOnPagerHover: true,   // true to pause when hovering over pager link						
                pagerAnchorBuilder: function(idx) { 
                    return '<a href="#" title=""><img src="images/pixel.gif" width="8" heigth="8"></a>'; 
                }
        });
    }
});


//remove no-js - javascript is enabled
jQuery(document).ready(function() {
	jQuery("html").removeClass="no-js";
});

//100% background
jQuery(window).load(function() {
	jQuery("#background").fullBg();
});
 
// Kwicks extention for RT-Theme
(function($){
    
    $.fn.rt_accordion_effect= function() {
			 
		// If the browser is IE 7-6
		var BSversion = $.browser;
		
		if ( BSversion.msie ) { 
		  var browserNmae = "IE";
		}
		
		var browserVersion = BSversion.version.slice(0,1);
	   
		 if (browserNmae=="IE" && browserVersion<9){
		    
			 $(this).find('ul li .desc_accordion').stop().animate({ "top":"-500" }, 50);
		  
			 $('ul li').bind("mouseover", function() {
				$(this).find('.desc_accordion').stop().css({  "visibility":"visible", "opacity":"1", "display":"inline-block"});
				$(this).find('.desc_accordion').stop().animate({ "top":"70"}, 500);  	
			 });
		 
			 $('ul li').bind("mouseleave", function() {
				  $(this).find('.desc_accordion').stop().css({ "opacity":"0" , "display":"none"}, 50);	
			 });
		    
		 }else {
		    
			 $('ul li .desc_accordion').stop().css({  "visibility":"visible", "opacity":"0",  "display":"inline-block"});
			 
			 $('ul .kwicks-border').mouseover(function(){
				
				$(this).find('.desc_accordion').stop().animate({ "opacity":"1"}, 800, "easeIn");    		  
			 }).mouseout(function(){
				$(this).find('.desc_accordion').stop().animate({ "opacity":"0" }, 50, "easeIn");	
			 });
		    
		 }
		 
		this.each(function() {
			
			var kwicks_layer  = $(this);
		 
			
			//slide image classname
			var slide_image_classname= $(this).find('div.kwicks-image').attr("id");
		   
			//slide image url
			var slide_image_url= $('.'+slide_image_classname).attr("src");
		 
			
			//kwicks slide background image 
			$('#'+slide_image_classname).css('background-image','url('+slide_image_url+')');
 
		});  
	}; 
	
})(jQuery);


//Helper functions for jQuery Cycle
function onBefore(curr, next, opts, fwd) {
	jQuery(next).find('.desc').css({'top':'-110px','opacity':'0'}); 
} 

function onAfter(curr, next, opts, fwd) {
    jQuery(next).find('.desc').animate({'top':'40px','opacity':'1'},800,'easeOutBack');
} 

//drop down menu
jQuery(document).ready(function() {
  
	// If the browser is IE 7-6
	var ua = jQuery.browser;
	if ( ua.msie && ua.version.slice(0,1) < 8 ) { // IE7-6
		 jQuery("#navigation li").parents().each(function() {
			var p = jQuery(this);
			var pos = p.css("position"); 
			    p.hover(function() {
					  jQuery(this).addClass("on-top");
				   },
				   function() {
					  jQuery(this).removeClass("on-top");
				   });
		 });
	}
				
	jQuery("#navigation ul li").each(function()
	{
	 
	 if(jQuery(this).children('ul').length>0){//add sub menu class
	   jQuery(this).addClass('hasSubMenu').text();
	 } 
	 
		jQuery(this).hover(function()
		{
		    var position = jQuery(this).position();
		    var width = jQuery(this).find("a:first-child").width();
		    
			jQuery(this).find('ul:first').stop().css({
				left:width+15,
				top:position.top,
				height:"auto",
				overflow:"hidden",
				zIndex:"1000",
				position:"absolute",
				display:"none"
				}).slideDown(200, function() {
					jQuery(this).css({
					height:"auto",
					overflow:"visible"
				});
		 
		    });
			  
		},
		    
		function()
		{	
			jQuery(this).find('ul:first').stop().slideUp(200, function()
			{	
				  jQuery(this).css({
				  display:"none",
				  overflow:"hidden"
				  });
			});
		});	
	});  
	   
     jQuery("#navigation ul ul ").css({display: ""}); 
	
	jQuery("#navigation2  li").each(function()
	{
		jQuery(this).hover(function()
		{
		    var position = jQuery(this).position();
		    var width = jQuery(this).find("a:first-child").width();
		    
			jQuery(this).find('ul:first').stop().css({
			
				 height:"auto",
				 overflow:"hidden",
				 zIndex:"1000",
				 position:"absolute",
				 display:"none"
				 }).slideDown(200, function()
			{
			jQuery(this).css({
				 height:"auto",
				 overflow:"visible"
			}); 
		});
			  
		},
		    
		function()
		{	
			jQuery(this).find('ul:first').stop().slideUp(200, function()
			{	
				  jQuery(this).css({
				  display:"none",
				  overflow:"hidden"
				  });
			});
		});	
	});

}); 
 

//RT Portfolio Effect
jQuery(document).ready(function() {
     
	var portfolio_item=jQuery("a.imgeffect"); 
 		
	portfolio_item.each(function(){
		var imageClass = jQuery(this).attr("class"); // get the class
		var theImage = jQuery(this).html(); 	// save the image
		jQuery(this).find("img").addClass("active");
		jQuery(this).append('<span class="imagemask '+imageClass+'">'+theImage+'</span>'); //create new image within span
		jQuery(this).find('span').parents('img').remove(); //remove image 
	});
		
	jQuery('a.imgeffect .active').remove(); //remove image 
	
	portfolio_item.mouseover(function(){

		portfolio_item.each(function(){
		    jQuery(this).stop().animate({ opacity:"0.5"}, 300, "easeIn");
		});
		
		jQuery(this).stop().animate({ opacity:"1"}, 100, "easeIn");
		jQuery(this).find('img').stop().animate({ top:"-22px" }, 100, "easeIn");
		
		if(jQuery(this).parents().hasClass('blog_list')){
		  jQuery(this).find('.imagemask').stop().animate({ "padding-top":"22px" }, 100, "easeIn");		 
		} 

	}).mouseout(function(){
		portfolio_item.each(function(){
		    jQuery(this).stop().animate({ opacity:"1"}, 200, "easeIn");
		});
		
		jQuery(this).find('.imagemask').stop().animate({ "padding-top":"0px" }, 100, "easeIn");
		jQuery(this).find('img').stop().animate({ top:"0" }, 100, "easeIn"); 	
	});    

});


// Tabs
jQuery(function() {// perform JavaScript after the document is scriptable.
    jQuery("ul.tabs").tabs("> .pane", {effect: 'fade'});
    
    jQuery(".accordion").tabs(".pane", {tabs: '.title', effect: 'slide'});
    jQuery(".scrollable").scrollable();


    jQuery(".items.big_image img").click(function() {
    
       // see if same thumb is being clicked
       if (jQuery(this).hasClass("active")) { return; }
    
       // calclulate large image's URL based on the thumbnail URL (flickr specific)
       var url = jQuery(this).attr("alt");
	 
    
       // get handle to element that wraps the image and make it semi-transparent
       var wrap = jQuery("#image_wrap").fadeTo("medium", 0.5);
    
       // the large image from www.flickr.com
       var img = new Image();
    
    
       // call this function after it's loaded
       img.onload = function() {
    
          // make wrapper fully visible
          wrap.fadeTo("fast", 1);
    
          // change the image
          wrap.find("img").attr("src", url);
    
       };
    
       // begin loading the image from www.flickr.com
       img.src = url;
    
       // activate item
       jQuery(".items img").removeClass("active");
       jQuery(this).addClass("active");
    
    // when page loads simulate a "click" on the first image
    }).filter(":first").click();

});

//Slide to top
jQuery(document).ready(function(){
    jQuery(".line span.top").click(function() {
        jQuery('html, body').animate( { scrollTop: 0 }, 'slow' );
    });
});
 

//Fade effect for photo galleries and flickr
jQuery(window).load(function() {
     
	var flickrItems=jQuery(".flickr_thumbs img");
	
	flickrItems.mouseover(function(){
		
		flickrItems.each(function(){
		    jQuery(this).stop().animate({ opacity:"0.4"}, 300, "easeIn");
		});
		
		jQuery(this).stop().animate({ opacity:"1"}, 100, "easeIn");
		
	}).mouseout(function(){
		flickrItems.each(function(){
		    jQuery(this).stop().animate({ opacity:"1"}, 200, "easeIn");
		});
	});    

}); 

//RT form field - text back function
jQuery(document).ready(function() {

var form_inputs=jQuery(".showtextback input[type='text'], .showtextback textarea");

	form_inputs.each(function(){
	
		jQuery(this).focus( function()
		{
			val = jQuery(this).val();
			if (jQuery(this).attr("alt") != "0"){
			    jQuery(this).attr("alt",jQuery(this).attr("value")); 
			    jQuery(this).attr("value","");
			}
		});
	
		jQuery(this).blur( function(){
			if (jQuery(this).attr("alt") != "0"){
				val = jQuery(this).val(); 
				if (val == '' || val == jQuery(this).attr("alt")){
				    jQuery(this).attr("value",jQuery(this).attr("alt"));
				}
			}
		});
	
		jQuery(this).keypress( function(){  
			jQuery(this).attr("alt","0");	    
		});                 
	});  
         
}); 


//RT Featured Slider
jQuery(document).ready(function() {
     if (jQuery('.sldr_1 ul').length>0){
	   jQuery('.sldr_1').rt_feature_slider({
		  duration: 500,
		  effect: 'slide'	   
	   });
	}
});

//Carousel for product images
jQuery(document).ready(function() {
    if (jQuery('#product_thumbnails').length>0){
	   jQuery('#product_thumbnails').jcarousel({});
    }
}); 



//Effect for product images in carousel
jQuery(document).ready(function() {
     
	var carousel_item=jQuery(".jcarousel-skin-rt a");
	
	carousel_item.mouseover(function(){  
	   jQuery(this).find('img').stop().animate({ opacity:"0.6"}, 200, "easeIn");
	    
	}).mouseout(function(){
	   jQuery(this).find('img').stop().animate({ opacity:"1"}, 100, "easeIn");
	   
	});    
}); 

//Blog Post Types Effect
jQuery(document).ready(function() { 
	var blog_posts=jQuery(".box.blog");
	
	blog_posts.mouseover(function(){
		jQuery(this).find(".post_type").css({ display:"block"});
		jQuery(this).find(".post_type").stop().animate({ opacity:"1"}, 200, "easeIn");
	}),blog_posts.mouseout(function(){
		jQuery(this).find(".post_type").stop().animate({ opacity:"0"}, 200, "easeIn");
		jQuery(this).find(".post_type").css({ display:"none"});
	});

}); 

//tool tips  
jQuery(document).ready(function(){
	jQuery('.j_ttip,.j_ttip2').colorTip({color:'black'});
});


//social media icons  
(function($){ 
    $.fn.rt_social_media_effect= function(options) {
		// If the browser is IE 7-6
		var BSversion = $.browser;
		
		if ( BSversion.msie ) { 
		  var browserNmae = "IE";
		}
		
		var browserVersion = BSversion.version.slice(0,1);		 

		if (browserNmae=="IE" && browserVersion<9){
			return false;
		}
		
		var $this    = $(this);
		var settings = $.extend({}, $.fn.rt_social_media_effect.defaults, options);		
		
		//default settings
		settings = jQuery.extend({
		speed: 200,
		opacity:"0.8",
		effect: 'easeIn'
		}, options);	
						
		$this.on('mouseenter',function(){
			$(this).find("a").stop().animate({position:"relative",marginTop:"-3px"}, settings.speed, settings.effect);	
			$(this).find("img").stop().animate({opacity:settings.opacity}, settings.speed, settings.effect);	
		})

		$this.on('mouseleave',function(){
			$(this).find("a").stop().animate({marginTop:"0"}, settings.speed, settings.effect);	
			$(this).find("img").stop().animate({opacity:"1"}, settings.speed, settings.effect);	
		})		
	}; 
	
})(jQuery); 

jQuery(document).ready(function() {
	jQuery('.social_media_icons li').rt_social_media_effect({	
		speed: 100,
		opacity:"0.7",
		effect: 'easeIn'		
	});
});
 

//pretty photo
jQuery(document).ready(function(){
	jQuery('a[data-gal]').each(function() {
	    jQuery(this).attr('rel', jQuery(this).data('gal'));
	});  	
	jQuery("a[rel^='prettyPhoto']").prettyPhoto({animationSpeed:'slow',slideshow:false,overlay_gallery: false,social_tools:false,deeplinking:false});
}); 


//validate contact form
jQuery(document).ready(function(){

      // show a simple loading indicator
      var loader = jQuery('<img src="images/loading.gif" alt="..." />')
              .appendTo(".loading")
              .hide();
      jQuery().ajaxStart(function() {
              loader.show();
      }).ajaxStop(function() {
              loader.hide();
      }).ajaxError(function(a, b, e) {
              throw e;
      });
      
      jQuery.validator.messages.required = "";
      var v = jQuery("#validate_form").validate({
              submitHandler: function(form) {
                      jQuery(form).ajaxSubmit({
                              target: "#result"
                      });
              }
      });
      
      jQuery("#reset").click(function() {
              v.resetForm();
      });
 });




//Tweets
$(document).ready(function(){
  
  if ($('.tweet_list_footer').length>0){
    jQuery('.tweet_list_footer').tweet({
	 count: tweet_count_footer,
	 username: ''+twitter_user_name+'',
	 loading_text: loading_text
    });
  }

  if ($('.sidebar_tweets').length>0){
    jQuery('.sidebar_tweets').tweet({
	 count: tweet_count_sidebar,
	 username: ''+twitter_user_name+'',
	 loading_text: loading_text
    });
  }
  
});

//Flickr
$(document).ready(function(){
	if ($('.flickr_thumbs').length>0){
		$(".flickr_thumbs").jflickrfeed({
			limit: flickr_thumbnail_count,
			qstrings: {id: flickr_user_id }, 
			itemTemplate: '<li><span class="border"><a href="{{image_b}}"><img src="{{image_s}}" alt="{{title}}" /></a></span></li>'
		});
 	}
});