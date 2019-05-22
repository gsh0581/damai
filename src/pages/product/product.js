require(["../../static/conf/config.js"], function () {
    require(["jquery"], function ($) {
       var tips=  [
           {
               
           }
       ];
        $.ajax({
            url: `https://detail.damai.cn/subpage?itemId=594441602010&dmChannel=pc@damai_pc&dataId=210041053&dataType=2&bizCode=ali.china.damai&scenario=itemsku&privilegeActId=&callback=jsonp88`,
            dataType:'jsonp',
            type: "get",
            jsonpCallback:"jsonp88",
            processData: false, 
            crossDomain: true,
            success: function (data) {
                   
               var res = data.detailViewComponentMap.itemSku;
               let title = `【北京】${res.itemTitle}【网上订票】- 大麦网`;
               $('title').html(title);
               res.itemTitle;
               res.performDesc;
               $('tips').next().attr("data-src",res.itemPic);
               $('.order').find('.title').html(res.itemTitle);
               $('.time').html(`时间：${res.performName}`);
                $('.presell').html(`${res.performTagDesc?res.performTagDesc:''}`);
                $('.presell').next().html(res.performName);
                $('perform__desc__info__active').html(`<p>${res.performDesc}</p>`);  
                let tpl = `
                <img data-v-49c1c56a="" src="https://damai-item.oss-cn-beijing.aliyuncs.com/projQcode/${res.itemId.substr(0,res.itemId.length-2)}/2/${res.itemId}.jpg" alt="" class="service-qrcode-img">
                `;
                $('.service-qrcode').append(tpl);
                for (let i = 0; i < res.skuList.length; i++) {
                    render_sku(res.skuList[i]);
                }
            },
        })
        function render_sku(data){
            let tpl = `<div class="select_right_list_item sku_item">
           <div class="skuname" >${data.skuName}</div></div>`;
            $('.sku').append(tpl);
            if($('.sku_item').length == 1){
                $('.sku_item').addClass("active");
            }
        }
            $('.sku').on("click",'.sku_item',function(e){
                $(".sku").children().removeClass('active');
              $(this).addClass("active");
            })
           
            $('.cafe-c-input-number-input').on('input propertychange',function(){
                var count =$(this).val();
                if(count>6){
                   $(this).val(6);
                }
            })
            $('.cafe-c-input-number-handler-up').on("click",function (e) {
                var t= $('.cafe-c-input-number-input');
                
                t.val(parseInt(t.val())+1);
                if(parseInt(t.val()) >1){
                    $('.cafe-c-input-number-handler-down').removeClass('cafe-c-input-number-handler-disabled');
                }
                var count =t.val();
                if(count>6){
                    $(this).addClass('cafe-c-input-number-handler-disabled');
                   t.val(6);
                }
              //  setTotal();
              })
            $('.cafe-c-input-number-handler-down').on("click",function (e) {
                var t= $('.cafe-c-input-number-input');
                
                t.val(parseInt(t.val())-1);
                if(parseInt(t.val()) <= 1){
                    console.log("!");
                    $(this).addClass('cafe-c-input-number-handler-disabled');
                    t.val(1);

                }else{
                    $(this).removeClass('cafe-c-input-number-handler-disabled');
                }
             // setTotal();
            })
      
       $(window).scroll(function () {  
        var navH = $(".notice-nav").offset().top;
           var scroH = $(this).scrollTop();
           if(scroH>=navH){
               $('.notice-nav-fixed').css('display', 'block');
           }else if(scroH<navH){
            $('.notice-nav-fixed').css('display', 'none');
           }
       })
    })
   
  
})