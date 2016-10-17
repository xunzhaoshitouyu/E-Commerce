// 送至地区js
$('#header .city').get(0).innerHTML = $('#state .selected').get(0).innerHTML; //加载页面之后动态给“送至”添加地区
$('#state a').click(function() {
    $(this).attr('class', 'selected'); //给点击元素添加新类名
    $('#state a').not($(this)).attr('class', 'unselected'); //给所有非当前元素添加未选中的类名
    $('#header .city').get(0).innerHTML = $('#state .selected').get(0).innerHTML; //将选中的元素的内容赋值给“送至”后面的内容
})

//给获取到的搜索栏下促销信息的a标签添加事件
$('#querypro a').click(function() {
    $(this).attr('class', 'selected'); //给点击元素添加新类名
    $('#querypro a').not($(this)).attr('class', 'unselected'); //给所有非当前元素添加未选中的类名
})

//头部促销图片关闭按钮的关闭事件
$('.headclose').click(function() {
    $('#headerpro').fadeOut(800);
})

//刷新页面随机出现图片
function rpPic() {
    var num = Math.floor(Math.random() * 2);
    if (num == 0) {
        $('#hdproimg1 img').attr({ src: 'img/headpro.jpg' });
        $('#headerpro').css('background', '#35a7fe');
    } else {
        $('#hdproimg1 img').attr('src', 'img/headpro1.jpg');
        $('#headerpro').css('background', '#790dd4');
    }
}
rpPic();

//左侧导航栏的鼠标悬浮事件
$('#undernav li').mouseover(function() {
    var bdt = $(document).scrollTop();
    var i = $('#undernav li').index(this);
    if (bdt > ($('.cutline').offset().top + 2)) {
        $('#undernav .jydq').eq(i).css({
            top: (bdt - $('.cutline').offset().top - 2) + 'px'
        })
    }
    $('#undernav .jydq').eq(i).css({
        display: 'block'
    })
})

//左侧导航栏的鼠标移除事件
$('#undernav li').mouseout(function() {
    var i = $('#undernav li').index(this);
    $('#undernav .jydq').eq(i).css({
        display: 'none',
        top: ''
    })
})

//大图透明度切换
var mppis = $('#mppics img');
var mpl = $('.mpundnum li');
var num = 0;
var mpptim = null;
var flag = true;

//图片切换
function move() {
    if (flag) {
        num++;
        flag = false;
        if (num == mppis.length) {
            num = 0;
        }
        if (num == -1) {
            num = mppis.length - 1;
        }
        mppis.eq(num).fadeIn(1000);
        mpl.eq(num).attr('class', 'mpnuml').siblings().removeAttr('class');
        mppis.not(mppis.eq(num)).fadeOut(1000, function() {
            flag = true;
        });
    }
}
//鼠标悬浮事件
$('#mainpic').mouseover(function() {
    clearInterval(mpptim);
    $('#mainpic .mpbtnlef').css('display', 'block');
    $('#mainpic .mpbtnrig').css('display', 'block');
})
$('#mainpic').mouseout(function() {
        $('#mainpic .mpbtnlef').css('display', '');
        $('#mainpic .mpbtnrig').css('display', '');
        mpptim = setInterval(move, 2000);
    })
    //左右按钮点击事件
$('#mainpic .mpbtnrig').click(function() {

    clearInterval(mpptim);
    if (flag) {
        move();
    }
})
$('#mainpic .mpbtnlef').click(function() {
        clearInterval(mpptim);
        if (flag) {
            num -= 2;
            move();
        }
    })
    //鼠标悬浮在下标上的效果
mpl.mouseover(function() {
    clearInterval(mpptim);
    if (flag) {
        num = mpl.index(this) - 1;
        console.log(num);
        move();
    }
})
mpptim = setInterval(move, 2000);

//右侧图标悬浮效果
var ads = js.getidcla('jkicon', 'cwww');
var cws = js.getidcla('jkicon', 'cw-icon');
var d2 = document.getElementById("mc-inner");
var ps = document.getElementById("mc-inner").getElementsByTagName('p');
var cwtim = null;
var cwtim1 = null;
var mcitop = 214;
var mcitop1 = 45;
var adsn;
for (i = 0; i < 4; i++) {
    ads[i].onmouseover = function() {
        for (i = 0; i < 4; i++) {
            if (ads[i] == this) {
                chacol();
                if (ads[i].style.paddingTop == '0px') {
                    ads[i].style.borderTop = '1px solid #c81623';
                }
                ps[i].style.display = 'block';
                adsn = i;
                cwtim = setInterval(function() {
                    mcitop -= 4.5;
                    d2.style.top = mcitop + 'px';
                    if (mcitop <= 28) {
                        d2.style.top = '28px';
                        clearInterval(cwtim);
                    }
                }, 10)

                cwtim1 = setInterval(function() {
                    mcitop1--;
                    if (mcitop1 == 0) {
                        ads[adsn].style.borderTop = '1px solid #c81623';
                        ads[0].style.borderBottom = '1px solid #aaa';
                        ads[1].style.borderBottom = '1px solid #aaa';
                        ads[2].style.borderBottom = '1px solid #aaa';
                        ads[3].style.borderBottom = '1px solid #aaa';
                        cws[0].style.top = '-28px';
                        cws[1].style.top = '-28px';
                        cws[2].style.top = '-28px';
                        cws[3].style.top = '-28px';
                        clearInterval(cwtim1);
                    }
                    for (i = 0; i < ads.length; i++) {
                        ads[i].style.paddingTop = mcitop1;
                    }
                }, 10)
            } else {
                ps[i].style.display = '';
            }
        }

    }
}

function chacol() {
    for (j = 0; j < 4; j++) {
        ads[j].style.borderTop = '';
    }
}

//右下角固定菜单栏鼠标悬浮事件
$('#rbfix li').mouseover(function() {
    var i = $('#rbfix li').index(this);
    $('#rbfix a').eq(i).css({ 'borderRadius': '0', 'backgroundColor': '#C81623' });
    $('#rbfix span').eq(i).css('borderRadius', '3px 0 0 3px');
    $('#rbfix span').eq(i).animate({
        left: '-62px'
    }, 200)
})

$('#rbfix li').mouseout(function(e) {
    var obj = e.toElement || e.relatedTarget;
    var pa = this;
    if (pa.contains(obj)) {
        return false
    } else {
        var i = $('#rbfix li').index(this);
        $('#rbfix span').eq(i).animate({
            left: '3px'
        }, 200, function() {
            $('#rbfix span').eq(i).css('borderRadius', '0');
            $('#rbfix a').eq(i).css({ 'borderRadius': '3px 0 0 3px', 'backgroundColor': '#7a6e6e' });
        })
    }
})

//返回顶部点击事件
$('#rbfix li').eq(6).click(function() {
    $(document).scrollTop('0');
})

//今日推荐大图滚动
var todrecpic = document.getElementById('todrecpic'); //获取推荐图片的父级
var repic = todrecpic.getElementsByTagName('img'); //获取推荐图片的内容
var tjnum = 4;
todrecpic.scrollLeft = (repic[0].offsetWidth + 1) * 4; //今日推荐的图片一次性切换4张，且每张图片之间有1px的空隙
$('#todpfa').mouseover(function() {
    $('.tjbtnl').css({ 'display': 'block' });
    $('.tjbtnr').css({ 'display': 'block' });
})
$('#todpfa').mouseout(function() {
    $('.tjbtnl').css({ 'display': '' });
    $('.tjbtnr').css({ 'display': '' });
})

$('.tjbtnr').click(function() {
    tjmove();
})
$('.tjbtnl').click(function() {
    tjnum -= 2 * 4;
    tjmove();
})

function tjmove() {
    tjnum += 4;
    if (tjnum < 0) {
        tjnum = repic.length - 2 * 4;
    }
    $('#todrecpic').animate({ 'scrollLeft': (repic[0].offsetWidth + 1) * tjnum }, 1000, function() {
        if (tjnum == repic.length - 4) {
            tjnum = 4;
            todrecpic.scrollLeft = (repic[0].offsetWidth + 1) * tjnum;
        }
    })
}

//猜你喜欢红线移动事件
$('#gueyl').mouseover(function(e) {
    var obj = e.fromElement || e.relatedTarget; //获取事件源
    var pa = this;
    if (pa.contains(obj)) { //阻止子级集成父级事件
        return false
    } else {
        setTimeout(function() {
            $('.guerline').css('left', '0');
            $('.guerline').animate({ 'left': '845px' }, 1000, 'easeOutCubic');
        }, 400);
    }
})

//左侧楼层固定导航栏显示
$('#lbfix').css({ 'top': ($(window).height() - $('#lbfix').height()) / 2 + 'px' })

//tab切换封装函数
function tabcha(tab, tnb, aft, sed, useld) {
    var ful = $(tnb).children();
    $(tab).mouseover(function() {
        var i = $(tab).index(this);
        $(this).attr('class', aft).siblings().removeAttr('class');
        ful.eq(i).attr('class', sed).siblings().attr('class', useld)
    })
}

//一楼tab切换
tabcha("#onftab li", '#fzxmr', 'onftbl', 'fzxmseld', 'fzxmunsel')

//一楼大图滚动
function fbigphd(obj, lnm, obo, btl, btr, lun, stp) {
    var imw = $(lnm).eq(0).width();
    $(obj).scrollLeft(imw); //今日推荐的图片一次性切换4张，且每张图片之间有1px的空隙
    var tjnum = 1;
    var indn = 0; //控制下标移动
    var tjtim1 = null;
    var flag = true; //标记一次滑动是否完成，如果未完成不允许进行下一次操作
    $(obo).mouseover(function() {
        clearInterval(tjtim1);
        $(obo + '>' + 'p').css({ 'display': 'block' });
    })
    $(obo).mouseout(function() {
        $(obo + '>' + 'p').css({ 'display': '' });
        tjtim1 = setInterval(tjmove, 2000);

    })

    function tjmove() {
        if (flag) {
            tjnum++;
            indn++;
            flag = false;
            if (tjnum == $(lnm).length) {
                tjnum = 1;
                $(obj).scrollLeft();
            }
            if (tjnum < 0) {
                tjnum = $(lnm).length - 2;
            }
            if (indn == $(lnm).length - 2) {
                indn = 0;
            }
            if (indn == -1) {
                indn = $(lnm).length - 3;
            }
            $(obj).animate({ scrollLeft: imw * tjnum }, 500, function() {
                flag = true;
                if (tjnum == 0) {
                    tjnum = $(lnm).length - 2;
                    $(obj).scrollLeft($(lnm).eq(0).width() * tjnum);
                }
                if (tjnum == $(lnm).length - 1) {
                    tjnum = 1;
                    $(obj).scrollLeft($(lnm).eq(0).width() * tjnum)
                }
            })
            $(stp).eq(indn).attr('class', lun).siblings().removeAttr('class', lun);
        }

    }
    tjtim1 = setInterval(tjmove, 2000);

    //左右按钮点击事件
    $(btr).click(function() {
        clearInterval(tjtim1);
        if (flag) {
            tjmove();
        }
    })
    $(btl).click(function() {
        clearInterval(tjtim1);
        if (flag) {
            tjnum -= 2;
            indn -= 2;
            tjmove();
        }
    })

    //鼠标放到小圆形按钮的效果
    $(stp).mouseover(function() {
        if (flag) {
            var i = $(stp).index(this);
            tjnum = i;
            indn = i - 1;
            tjmove();
        }
    })
}

fbigphd('#fmrtw', '#fmrtw img', '#fmrtwf', '#fmrtwf .fmobl', '#fmrtwf .fmobr', 'fmobrl', '#fmrtwf li')

// 二楼大图滑动
function tfbhd(obj, lnm, obo, btl, btr, lun, stp) {
    var pic = $(obj); //获取图片的父级
    var repic = $(lnm); //获取图片的内容
    pic.each(function(i) {
        pic.eq(i).scrollLeft(repic.eq(0).width());
    })
    var tjnum = 1;
    var indn = 0; //控制下标移动
    var tjtim1 = null;
    var flag = true; //标记一次滑动是否完成，如果未完成不允许进行下一次操作
    $(obo).mouseover(function() {
        clearInterval(tjtim1);
        $(obo + '>p').css({ 'display': 'block' });
    })
    $(obo).mouseout(function() {
        $(obo + '>p').css({ 'display': '' });
        tjtim1 = setInterval(tjmove, 2000);
    })

    function tjmove() {
        if (flag) {
            tjnum++;
            indn++;
            flag = false;
            if (tjnum == repic.length) {
                tjnum = 1;
                pic.each(function(i) {
                    pic.eq(i).scrollLeft(repic.eq(0).width());
                })
            }
            if (tjnum < 0) {
                tjnum = repic.length - 2;
            }
            if (indn == repic.length - 2) {
                indn = 0;
            }
            if (indn == -1) {
                indn = repic.length - 3;
            }
            pic.each(function(i) {
                pic.eq(i).animate({ scrollLeft: repic.eq(0).width() * tjnum }, 500, function() {
                    // if (i == 1) { //如果没有这个判断会有问题
                    if (tjnum == 0) {
                        tjnum = repic.length - 2;
                    }
                    if (tjnum == repic.length - 1) {
                        tjnum = 1;
                    }
                    pic.each(function(i) {
                        pic.eq(i).scrollLeft(repic.eq(0).width() * tjnum);
                    })
                    flag = true;
                    // }
                })
            })
            $(stp).eq(indn).attr('class', lun).siblings().removeAttr('class', lun);
        }

    }
    //左右按钮点击事件
    $(btr).click(function() {
        clearInterval(tjtim1);
        if (flag) {
            tjmove();
        }
    })
    $(btl).click(function() {
        clearInterval(tjtim1);
        if (flag) {
            tjnum -= 2;
            indn -= 2;
            tjmove();
        }
    })

    //鼠标放到小圆形按钮的效果
    $(stp).mouseover(function() {
        if (flag) {
            var i = $(stp).index(this);
            tjnum = i;
            indn = i - 1;
            tjmove();
        }
    })
    tjtim1 = setInterval(tjmove, 2000);
}

tfbhd('#gmrontf,#gmronbf', '#gmrontf img', '#ghmzron', '#ghmzron .gmfbl', '#ghmzron .gmfbr', 'fmobrl', '#ghmzron li')

//二楼tab切换
tabcha("#twftab li", '#ghmzr', 'onftbl', 'ghmzseld', 'ghmzunsel')

// 三楼大图滚动
fbigphd('#strontf', '#strontf img', '#sjtxron', '#sjtxron .stfbl', '#sjtxron .stfbr', 'fmobrl', '#sjtxron li')
    //三楼tab切换
tabcha("#thftab li", '#sjtxr', 'onftbl', 'sjtxseld', 'sjtxunsel')

// 四楼大图滚动
fbigphd('#jdrontf', '#jdrontf img', '#jydqron', '#jydqron .stfbl', '#jydqron .stfbr', 'fmobrl', '#jydqron li')
    //四楼tab切换
tabcha("#foftab li", '#jydqr', 'onftbl', 'sjtxseld', 'sjtxunsel')

// 五楼大图滚动
fbigphd('#dsrontf', '#dsrontf img', '#dnsmron', '#dnsmron .stfbl', '#dnsmron .stfbr', 'fmobrl', '#dnsmron li')
    //五楼tab切换
tabcha("#fiftab li", '#dnsmr', 'onftbl', 'sjtxseld', 'sjtxunsel')

// 六楼大图滚动
tfbhd('#yjrontf,#yjronbf', '#yjrontf img', '#ydjsron', '#ydjsron .yjrobl', '#ydjsron .yjrobr', 'fmobrl', '#ydjsron li')
    //六楼tab切换
tabcha("#siftab li", '#ydjsr', 'onftbl', 'ydjsseld', 'ydjsunsel')

// 七楼大图滚动
tfbhd('#jsrontf,#jsronbf', '#jsrontf img', '#jjshron', '#jjshron .jsrobl', '#jjshron .jsrobr', 'fmobrl', '#jjshron li')
    //七楼tab切换
tabcha("#seftab li", '#jjshr', 'onftbl', 'jjshseld', 'jjshunsel')

// 八楼大图滚动
tfbhd('#mwrontf,#mwronbf', '#mwrontf img', '#mywjron', '#mywjron .mwrobl', '#mywjron .mwrobr', 'fmobrl', '#mywjron li')
    //八楼tab切换
tabcha("#eiftab li", '#mywjr', 'onftbl', 'mywjseld', 'mywjunsel')

// 九楼大图滚动
tfbhd('#sbrontf,#sbronbf', '#sbrontf img', '#spbjron', '#spbjron .sbrobl', '#spbjron .sbrobr', 'fmobrl', '#spbjron li')
    //九楼tab切换
tabcha("#niftab li", '#spbjr', 'onftbl', 'spbjseld', 'spbjunsel')

// 十楼大图滚动
fbigphd('#tyrontf', '#tyrontf img', '#tsyxron', '#tsyxron .tyfbl', '#tsyxron .tyfbr', 'fmobrl', '#tsyxron li')
    //十楼tab切换
tabcha("#teftab li", '#tsyxr', 'onftbl', 'tsyxseld', 'tsyxunsel')

// 十一楼大图滚动
fbigphd('#zyrontf', '#zyrontf img', '#zcypron', '#zcypron .stfbl', '#zcypron .stfbr', 'fmobrl', '#zcypron li')
    //十一楼tab切换
tabcha("#elftab li", '#zcypr', 'onftbl', 'sjtxseld', 'sjtxunsel')

// 十二楼大图滚动
fbigphd('#sfrontf', '#sfrontf img', '#shfwron', '#shfwron .stfbl', '#shfwron .stfbr', 'fmobrl', '#shfwron li')
fbigphd('#sfrontf1', '#sfrontf img', '#shfwron1', '#shfwron1 .stfbl', '#shfwron1 .stfbr', 'fmobrl', '#shfwron1 li')

//热门晒单滑动事件
function rtbmove(obj, obo) {
    var repic = $(obj).children(); //获取图片的内容
    var todpf = $(obo);
    todpf.scrollTop(repic.eq(0).outerHeight() + 30); //今日推荐的图片一次性切换4张，且每张图片之间有1px的空隙
    var tjnum = 1;
    var tjtim1 = null;
    var flag = true; //标记一次滑动是否完成，如果未完成不允许进行下一次操作
    todpf.mouseover(function() {
        clearInterval(tjtim1);
    })
    todpf.mouseout(function() {
        tjtim1 = setInterval(tjmove, 2000);
    })

    function tjmove() {
        if (flag) {
            tjnum++;
            flag = false;
            todpf.animate({ scrollTop: (repic.eq(0).outerHeight() + 30) * tjnum }, 300, function() {
                if (tjnum == 6) {
                    tjnum = 0;
                }
                todpf.scrollTop((repic.eq(0).outerHeight() + 30) * tjnum);
                flag = true;
            })
        }
    }

    tjtim1 = setInterval(tjmove, 2000);
}

rtbmove('#rmsdc', '#rmsd');

//左侧导航栏
var floors = $('.fltit'); //获得所有楼层
var twefb = document.getElementById('twefb'); //获取十二楼最底部的div
var lbfix = $('#lbfix'); //获取左侧导航栏
var lbfcs = $('#lbfix').children(); //获取左侧导航栏下面的子元素
var floorn = ['服饰', '美妆', '手机', '家电', '数码', '运动', '居家', '母婴', '食品', '图书', '车品', '服务'] //将左侧导航栏的每层楼名存到数组中
var flnums = $('.flnum');

//鼠标移入左侧导航栏触发事件
lbfcs.mouseover(function() {
    var i = lbfcs.index(this);
    lbfcs.eq(i).html(floorn[i]).css({ 'fontSize': '12px', 'fontFamily': '宋体' });
    lbfcs.not(lbfcs.eq(i)).css({ 'fontSize': '', 'fontFamily': '' })
})
lbfcs.mouseout(function() {
    var i = lbfcs.index(this);
    if (lbfcs.eq(i).attr('class') != 'lbfseled') {
        lbfcs.eq(i).html(i + 1 + 'F').css({ 'fontSize': '', 'fontFamily': '' });
    }
})

//滚动条移动触发左侧导航栏事件
window.onscroll = window.onload = function() {
    var sct = $(document).scrollTop(); //获取滚动条距顶部的距离
    var sch = $(window).height(); //获取屏幕高度
    floors.each(function(i) {
        if (i < 11) {
            if (sct + sch >= floors.eq(i).offset().top && floors.eq(i + 1).offset().top - sct > +sch / 2) {
                lbfix.css({ 'display': 'block', 'top': (sch - lbfix.outerHeight()) / 2 + 'px' });
                lbfcs.eq(i).html(floorn[i]).attr('class', 'lbfseled').siblings().removeAttr('class');
                lbfcs.each(function(j) {
                    if (i != j) {
                        lbfcs.eq(j).html(j + 1 + 'F');
                    }
                })
                flnums.eq(i).css({ 'background': 'url(img/product_home_1.0.0.png) 0 0 no-repeat' });
                flnums.not(flnums.eq(i)).css({ 'background': 'url(img/floor1new.png) 0 0 no-repeat' });
                return false;
            } else {
                lbfix.css({ 'display': '', 'top': '' });
                lbfcs.eq(i).html('').removeAttr('class');
            }
        } else if (i == 11) {
            if (floors.eq(i).offset().top - sct <= sch / 2 && $('#twefb').offset().top - sct > -66) {
                lbfix.css({ 'display': 'block', 'top': (sch - lbfix.outerHeight()) / 2 + 'px' });
                lbfcs.eq(i).html(floorn[i]).attr('class', 'lbfseled').siblings().removeAttr('class');
                lbfcs.each(function(j) {
                    if (i != j) {
                        lbfcs.eq(j).html(j + 1 + 'F');
                    }
                })
                flnums.eq(i).css({ 'background': 'url(img/product_home_1.0.0.png) 0 0 no-repeat' });
                flnums.not(flnums.eq(i)).css({ 'background': 'url(img/floor1new.png) 0 0 no-repeat' });
                return false;
            } else {
                lbfix.css({ 'display': '', 'top': '' });
                lbfcs.eq(i).html('').removeAttr('class');
            }
        }
    })
}

//调整浏览器大小的时候固定导航栏高度变化
window.onresize = function() {
    var sch = $(window).height(); //获取屏幕高度
    if (lbfix.css('display') == 'block') {
        lbfix.css('top', (sch - lbfix.outerHeight()) / 2 + 'px');
    }
}

//点击楼层按钮时，滚动条滑动到点击楼层
lbfcs.click(function() {
    var i = lbfcs.index(this);
    var sct = $(document.body).scrollTop();
    $(document.body).animate({
        'scrollTop': flnums.eq(i).offset().top
    }, 1000, 'easeOutCubic')
})

//点击换一批
var hypn = 0;
$('#gueyl .guechange').click(function() {
        hypn++;
        if (hypn == 3) {
            hypn = 0;
        }
        $('#guepic').scrollLeft(1006 * hypn);
    })
    //搜索框自动出文字
$('#queryte').keyup(function() {
    $.ajax({
        type: 'GET',
        url: 'baidu.php',
        async: true,
        data: { keyword: $('#queryte').val() },
        success: function(data) {
            var rpn = eval('(' + data + ')').s;
            var result = '';
            for (i = 0; i < rpn.length; i++) {
                result += '<div class="queresled">' + rpn[i] + '</div>';
            }
            $('#queres').html(result);
        }
    })
})