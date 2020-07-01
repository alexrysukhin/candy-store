$(document).ready(function(){
   
   // $('.bxslider').bx.Slider();
   // //////ИНДЕНТИФИКАТОР.....
   $('.s-tab-trigger').on('click', function(){
      $('.cooks__list').hide(2000);
      console.log(a)
   });

   //////////ТАБЫЫЫ/////

   (function(){
      $('.js-tab-trigger').on('click', function(){

         var $this = $(this);
         var tabNamber = $(this).attr('data-tab');
         var tab = $('.js-tab-content[data-tab="'+ tabNamber + '"]');
         var item = $this.closest('.cooks__item');
         var a = 1;
         
         
            item
               .addClass('active')
               .siblings()
               .removeClass('active');
            
         $('.js-tab-content.active').removeClass('active');
   
         tab.addClass('active');
         console.log(a);
      });
   }());
  

   ///////Маска-input
   jQuery(function($){
      $("#phone").mask("+7(99) 999-9999");
      
   });
   
   
   
   // $('.js-tab-trigger').on('click', function(){
   //       // let tabName = $(this).attr('data-tab');

   //       console.log('click');
   // });







      $('.question__trigger').on('click', function(e){
         e.preventDefault();
         var
          $this = $(this),
          container = $this.closest('.question__list'),
          item = $this.closest('.question__item'),
          currentContent = item.find('.question__garmoshka'),
          duration = 500;

            console.log('click');
         
         if( !item.hasClass('active')) {

            item
               .addClass('active')
               .siblings()
               .removeClass('active')
               .find('.question__garmoshka')
               .slideUp()
            currentContent.slideDown(duration);
         }else{
            item.removeClass('active');
            currentContent.slideUp();
         }
         
      });
   

});
 