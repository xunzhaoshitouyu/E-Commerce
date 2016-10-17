var query = document.getElementById("queryte"); //获取搜索框
var hasa = document.getElementById('state').getElementsByTagName('a'); //顶部地区数组
var city = js.getidcla('header', 'city')[0]; //获取顶部默认显示的地区的元素
var sele = js.getidcla('state', 'selected')[0];
var qpra = document.getElementById('querypro').getElementsByTagName('a'); //获取搜索栏下面的a标签
var hdclose = js.getidcla('headerpro', 'headclose')[0]; //获取头部下面促销图片的关闭按钮
var hdproimg = document.getElementById('hdproimg1').getElementsByTagName('img')[0] //获取头部下面促销图片父级div
var hdpro = document.getElementById("headerpro"); //获取头部下面促销图片
var opac = 1; //控制头部下面促销图片隐藏时渐变
var timer = null;
var navlis = document.getElementById("undernav").getElementsByTagName('li');
var navds = js.getidcla('undernav', 'jydq');
var cut = js.getcla('cutline')[0]; //获取左侧导航栏上面的横线
city.innerHTML = sele.innerHTML; //动态的给默认地区元素添加内容
for (i = 0; i < hasa.length; i++) { //给获取到的地区数组添加点击事件
    hasa[i].onclick = function() {
        for (i = 0; i < hasa.length; i++) {
            hasa[i].className = 'unselected';
            if (hasa[i] == this) {
                hasa[i].className = 'selected';
                city.innerHTML = hasa[i].innerHTML;
            }
        }
    }
}
//给获取到的搜索栏下促销信息的a标签添加事件
for (i = 0; i < qpra.length; i++) {
    qpra[i].onclick = function() {
        for (i = 0; i < qpra.length; i++) {
            if (qpra[i] == this) {
                qpra[i].className = 'selected';
            } else {
                qpra[i].className = 'unselected';
            }
        }
    }
}
//头部促销图片关闭按钮的关闭事件
hdclose.onclick = function() {
        timer = setInterval(hdpclo, 50);

        function hdpclo() {
            opac -= 0.1;
            hdpro.style.opacity = opac;
            if (opac <= 0.5) {
                hdpro.style.display = 'none';
                clearInterval(timer);
            }
        }
    }
    //刷新页面随机出现图片
function rpPic() {
    var num = Math.floor(Math.random() * 2);
    if (num == 0) {
        hdproimg.src = 'img/headpro.jpg';
        hdpro.style.background = '#35a7fe';
    } else {
        hdproimg.src = 'img/headpro1.jpg';
        hdpro.style.background = '#790dd4';
    }
}
//rpPic();
//左侧导航栏的鼠标悬浮事件
for (i = 0; i < navlis.length; i++) {
    navlis[i].onmouseover = function() {
            var bdt = document.documentElement.scrollTop || document.pageYOffset || document.body.scrollTop;
            for (i = 0; i < navlis.length; i++) {
                if (this == navlis[i]) {
                    if (bdt > (cut.offsetTop + 2)) {
                        navds[i].style.top = (bdt - cut.offsetTop - 2) + 'px';
                    }
                    navds[i].style.display = 'block';
                } else {
                    navds[i].style.display = 'none';
                    navds[i].style.top = '';
                }
            }
        }
        //左侧导航栏的鼠标移除事件
    navlis[i].onmouseout = function() {
        for (i = 0; i < navlis.length; i++) {
            if (this == navlis[i]) {
                navds[i].style.display = 'none';
                navds[i].style.top = '';
            }
        }
    }
}
//大图滚动
var mpp = document.getElementById("mppics");
var mapc = document.getElementById("mainpic");
var mpbl = js.getidcla('mainpic', 'mpbtnlef');
var mpbr = js.getidcla('mainpic', 'mpbtnrig');
var mppis = document.getElementById("mppics").getElementsByTagName('img');
var mpimh = mppis[0].clientHeight;
var mpl = document.getElementById("mainpic").getElementsByTagName('li');
var num = 0;
var mpptim = null;
var mpptim1 = null;
var flag = true;

//图片切换
function move() {
    if (flag) {
        num++;
        flag = false;
        clearInterval(mpptim1);
        if (num == mppis.length) {
            num = 0;
        }
        if (num == -1) {
            num = mppis.length - 1;
        }
        for (i = 0; i < mppis.length; i++) {
            mppis[i].style.zIndex = '0';
        }
        mppis[num].style.zIndex = '1';
        var n1 = 0;
        mpptim1 = setInterval(function() {
            n1 += 0.05;
            if (n1 > 1) {
                n1 = 1;
                flag = true;
                clearInterval(mpptim1);
                for (i = 0; i < mppis.length; i++) {
                    mppis[i].style.opacity = '0';
                }
            }
            mppis[num].style.opacity = n1;
        }, 25)
        btncol(num);
    }
}
//下标切换
function btncol(n) {
    for (i = 0; i < mpl.length; i++) {
        mpl[i].className = '';
    }
    mpl[n].className = 'mpnuml'
}
//鼠标悬浮事件
mapc.onmouseover = function() {
    clearInterval(mpptim);
    mpbl[0].style.display = 'block';
    mpbr[0].style.display = 'block';
}
mapc.onmouseout = function() {
        mpbl[0].style.display = '';
        mpbr[0].style.display = '';
        mpptim = setInterval(move, 2000);
    }
    //左右按钮点击事件
mpbr[0].onclick = function() {
    clearInterval(mpptim);
    if (flag) {
        move();
    }
}
mpbl[0].onclick = function() {
        clearInterval(mpptim);
        if (flag) {
            num -= 2;
            move();
        }
    }
    //鼠标悬浮在下标上的效果
for (i = 0; i < mpl.length; i++) {
    mpl[i].onmouseover = function() {
        clearInterval(mpptim);
        if (flag) {
            for (i = 0; i < mpl.length; i++) {
                if (mpl[i] == this) {
                    num = i - 1;
                    move();
                }
            }
        }
    }
}
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
var rbl = document.getElementById("rbfix").getElementsByTagName('li');
var rbsp = document.getElementById("rbfix").getElementsByTagName('span');
var rbas = document.getElementById("rbfix").getElementsByTagName('a');

function rb(obo, obt, obr, afb, bfb) {
    var rbtim = null;
    var rbtim1 = null;
    var rbn;
    var rbn1;

    function getrbl(obj, nm) {
        if (obj.currentStyle) {
            return obj.currentStyle[nm];
        } else {
            return getComputedStyle(obj, null)[nm];
        }
    }
    obo.onmouseover = function() {
        clearInterval(rbtim1);
        obr.style.background = afb;
        var rbnum = getrbl(obt, 'left').slice(0, -2);
        rbn = i;
        rbtim = setInterval(function() {
            obr.style.borderRadius = '0';
            obt.style.borderRadius = '3px 0 0 3px';
            rbnum--;
            obt.style.left = rbnum + 'px';
            if (rbnum <= -62) {
                obt.style.left = '-62px';
                clearInterval(rbtim);
            }
        }, 2)
    }

    obo.onmouseout = function() {
        clearInterval(rbtim);
        obr.style.background = bfb;
        var rbnum = getrbl(obt, 'left').slice(0, -2);
        rbtim1 = setInterval(function() {
            rbnum++;
            obt.style.left = rbnum + 'px';
            if (rbnum >= 3) {
                obt.style.left = '3px';
                obr.style.borderRadius = '3px 0 0 3px';
                obt.style.borderRadius = '0';
                clearInterval(rbtim1);
            }
        }, 2)
    }
}

rb(rbl[0], rbsp[0], rbas[0], '#C81623 url(img/toolbars.png) -88px -175px no-repeat', '#7a6e6e url(img/toolbars.png) -88px -175px no-repeat');
rb(rbl[1], rbsp[1], rbas[1], '#C81623 url(img/toolbars.png) -50px 0 no-repeat', '#7a6e6e url(img/toolbars.png) -50px 0 no-repeat');
rb(rbl[2], rbsp[2], rbas[2], '#C81623 url(img/toolbars.png) -50px -50px no-repeat', '#7a6e6e url(img/toolbars.png) -50px -50px no-repeat');
rb(rbl[3], rbsp[3], rbas[3], '#C81623 url(img/toolbars.png) -50px -100px no-repeat', '#7a6e6e url(img/toolbars.png) -50px -100px no-repeat');
rb(rbl[4], rbsp[4], rbas[4], '#C81623 url(img/toolbars.png) -190px -150px no-repeat', '#7a6e6e url(img/toolbars.png) -190px -150px no-repeat');
rb(rbl[5], rbsp[5], rbas[5], '#C81623 url(img/toolbars.png) -50px -150px no-repeat', '#7a6e6e url(img/toolbars.png) -50px -150px no-repeat');
rb(rbl[6], rbsp[6], rbas[6], '#C81623 url(img/toolbars.png) -50px -250px no-repeat', '#7a6e6e url(img/toolbars.png) -50px -250px no-repeat');
rb(rbl[7], rbsp[7], rbas[7], '#C81623 url(img/toolbars.png) -50px -300px no-repeat', '#7a6e6e url(img/toolbars.png) -50px -300px no-repeat');

//返回顶部点击事件
rbl[6].onclick = function() {
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
}

//大图滑动封装函数(必须手动执行，且没有下面显示当前滑动的图片下标)
function bigphd(obj, lnm, obo, btl, btr, n, stp, time) {
    var todrecpic = document.getElementById(obj); //获取推荐图片的父级
    var repic = todrecpic.getElementsByTagName(lnm); //获取推荐图片的内容
    var btnl = js.getidcla(obo, btl)[0];
    var btnr = js.getidcla(obo, btr)[0];
    var todpf = document.getElementById("todpfa");
    todrecpic.scrollLeft = (repic[0].offsetWidth + 1) * n; //今日推荐的图片一次性切换4张，且每张图片之间有1px的空隙
    var tjnum = n;
    var tjtim = null;

    todpf.onmouseover = function() {
        btnl.style.display = 'block';
        btnr.style.display = 'block';
    }
    todpf.onmouseout = function() {
        btnl.style.display = '';
        btnr.style.display = '';
    }

    function tjmove() {
        tjnum += n;
        if (tjnum == repic.length) {
            tjnum = n;
            todrecpic.scrollLeft = (repic[0].offsetWidth + 1) * tjnum;
        }
        if (tjnum < 0) {
            tjnum = repic.length - 2 * n;
        }
        var tjsc = todrecpic.scrollLeft;
        var tjec = (repic[0].offsetWidth + 1) * tjnum;
        var maxStep = stp;
        var everyStep = (tjec - tjsc) / maxStep;
        var step = 0;

        function tjtomove() {
            step++;
            todrecpic.scrollLeft += everyStep;
            if (step == maxStep) {
                if (tjnum == 0) {
                    tjnum = 4 * n;
                    todrecpic.scrollLeft = (repic[0].offsetWidth + 1) * tjnum;
                }
                if (tjnum == repic.length - n) {
                    tjnum = n;
                    todrecpic.scrollLeft = (repic[0].offsetWidth + 1) * tjnum;
                }
                clearInterval(tjtim);
            }
        }
        tjtim = setInterval(tjtomove, time);
    }
    btnr.onclick = function() {
        clearInterval(tjtim);
        tjmove();
    }
    btnl.onclick = function() {
        clearInterval(tjtim);
        tjnum -= 2 * n;
        tjmove();
    }
}

bigphd('todrecpic', 'img', 'todrecom', 'tjbtnl', 'tjbtnr', 4, 20, 20);

//猜你喜欢红线移动事件
var gueline = js.getidcla('gueyl', 'guerline')[0];
var gueyl = document.getElementById('gueyl');
var guetim = null;
gueyl.onmouseenter = function() {
    var guel = gueline.offsetLeft;
    var guenum = 0;
    setTimeout(function() {
        gueline.style.left = '0';
        guetim = setInterval(function() {
            guenum += 5;
            gueline.style.left = guenum + 'px';
            if (guenum >= 845) {
                gueline.style.left = '845px';
                clearInterval(guetim);
            }
        }, 1)
    }, 500);
}

//左侧楼层固定导航栏显示
var bdh = document.documentElement.clientHeight;
var lbfix = document.getElementById('lbfix');
lbfix.style.top = (bdh - lbfix.offsetHeight) / 2 + 'px';

//tab切换封装函数
function tabcha(tab, tn, tnb, aft, sed, useld) {
    var fls = document.getElementById(tab).getElementsByTagName("li");
    var ful = document.getElementById(tnb).children;
    for (i = 0; i < fls.length; i++) {
        fls[i].onmouseover = function() {
            for (i = 0; i < fls.length; i++) {
                if (fls[i] == this) {
                    fls[i].className = aft;
                    ful[i].className = sed;
                } else {
                    fls[i].className = '';
                    ful[i].className = useld;
                }
            }
        }
    }
}

//一楼tab切换
tabcha("onftab", 'li', 'fzxmr', 'onftbl', 'fzxmseld', 'fzxmunsel')

//一楼大图滑动(可以自动滑动也可以点击控制，还可以鼠标移动控制)
function fbigphd(obj, lnm, obo, btl, btr, lun, stp, time) { //传入的参数依次是图片的父级的父级id，img，最外层id，左按钮classname，右按钮classname，下标切换的classname，完成步数，每步隔多长时间执行一次
    var todrecpic = document.getElementById(obj); //获取图片的父级
    var repic = todrecpic.getElementsByTagName(lnm); //获取图片的内容
    var todpf = document.getElementById(obo);
    var lis = todpf.getElementsByTagName('li');
    var btnl = js.getidcla(obo, btl)[0];
    var btnr = js.getidcla(obo, btr)[0];
    todrecpic.scrollLeft = repic[0].offsetWidth; //今日推荐的图片一次性切换4张，且每张图片之间有1px的空隙
    var tjnum = 1;
    var indn = 0; //控制下标移动
    var tjtim = null;
    var tjtim1 = null;
    var flag = true; //标记一次滑动是否完成，如果未完成不允许进行下一次操作
    todpf.onmouseover = function() {
        btnl.style.display = 'block';
        btnr.style.display = 'block';
        clearInterval(tjtim1);
    }
    todpf.onmouseout = function() {
        btnl.style.display = '';
        btnr.style.display = '';
        tjtim1 = setInterval(tjmove, 2000);
    }

    function tjmove() {
        if (flag) {
            clearInterval(tjtim);
            tjnum++;
            indn++;
            flag = false;
            if (tjnum == repic.length) {
                tjnum = 1;
                todrecpic.scrollLeft = repic[0].offsetWidth;
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
            var tjsc = todrecpic.scrollLeft;
            var tjec = repic[0].offsetWidth * tjnum;
            var maxStep = stp;
            var everyStep = (tjec - tjsc) / maxStep;
            var step = 0;
            bigbcol(indn);

            function tjtomove() {
                step++;
                todrecpic.scrollLeft += everyStep;
                if (step == maxStep) {
                    if (tjnum == 0) {
                        tjnum = repic.length - 2;
                        todrecpic.scrollLeft = repic[0].offsetWidth * tjnum;
                    }
                    if (tjnum == repic.length - 1) {
                        tjnum = 1;
                        todrecpic.scrollLeft = repic[0].offsetWidth * tjnum;
                    }
                    clearInterval(tjtim);
                    flag = true;
                }
            }
            tjtim = setInterval(tjtomove, time);
        }

    }
    btnr.onclick = function() {
        clearInterval(tjtim1);
        if (flag) {
            tjmove();
        }
    }
    btnl.onclick = function() {
        clearInterval(tjtim1);
        if (flag) {
            tjnum -= 2;
            indn -= 2;
            tjmove();
        }
    }

    //下标切换
    function bigbcol(n) {
        for (i = 0; i < lis.length; i++) {
            lis[i].className = '';
        }
        lis[n].className = lun;
    }

    //鼠标悬浮在下标时切换图片
    for (i = 0; i < lis.length; i++) {
        lis[i].onmouseover = function() {
            clearInterval(tjtim1);
            if (flag) {
                for (i = 0; i < lis.length; i++) {
                    if (lis[i] == this) {
                        tjnum = i;
                        indn = i - 1;
                        tjmove();
                    }
                }
            }
        }
    }
    tjtim1 = setInterval(tjmove, 2000);
}
fbigphd('fmrtw', 'img', 'fmrtwf', 'fmobl', 'fmobr', 'fmobrl', 20, 20)

// 二楼大图滑动
function tfbhd(obj, obj1, lnm, obo, btl, btr, lun, stp, time) { //传入的参数依次是图片的父级的父级id，img，最外层id，左按钮classname，右按钮classname，下标切换的classname，完成步数，每步隔多长时间执行一次
    var pic = document.getElementById(obj); //获取图片的父级
    var pic1 = document.getElementById(obj1); //获取图片的父级
    var repic = pic.getElementsByTagName(lnm); //获取图片的内容
    var tpf = document.getElementById(obo);
    var lis = tpf.getElementsByTagName('li');
    var btnl = js.getidcla(obo, btl)[0];
    var btnr = js.getidcla(obo, btr)[0];
    pic.scrollLeft = repic[0].offsetWidth; //获取图片内容
    pic1.scrollLeft = repic[0].offsetWidth;
    var tjnum = 1;
    var indn = 0; //控制下标移动
    var tjtim = null;
    var tjtim1 = null;
    var flag = true; //标记一次滑动是否完成，如果未完成不允许进行下一次操作
    tpf.onmouseover = function() {
        clearInterval(tjtim1);
        btnl.style.display = 'block';
        btnr.style.display = 'block';
    }
    tpf.onmouseout = function() {
        btnl.style.display = '';
        btnr.style.display = '';
        tjtim1 = setInterval(tjmove, 2000);
    }

    function tjmove() {
        if (flag) {
            clearInterval(tjtim);
            tjnum++;
            indn++;
            flag = false;
            if (tjnum == repic.length) {
                tjnum = 1;
                pic.scrollLeft = repic[0].offsetWidth;
                pic1.scrollLeft = repic[0].offsetWidth;
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
            var tjsc = pic.scrollLeft;
            var tjec = repic[0].offsetWidth * tjnum;
            var maxStep = stp;
            var everyStep = (tjec - tjsc) / maxStep;
            var step = 0;
            bigbcol(indn);

            function tjtomove() {
                step++;
                pic.scrollLeft += everyStep;
                pic1.scrollLeft += everyStep;
                if (step == maxStep) {
                    if (tjnum == 0) {
                        tjnum = repic.length - 2;
                        pic.scrollLeft = repic[0].offsetWidth * tjnum;
                        pic1.scrollLeft = repic[0].offsetWidth * tjnum;
                    }
                    if (tjnum == repic.length - 1) {
                        tjnum = 1;
                        pic.scrollLeft = repic[0].offsetWidth * tjnum;
                        pic1.scrollLeft = repic[0].offsetWidth * tjnum;
                    }
                    clearInterval(tjtim);
                    flag = true;
                }
            }
            tjtim = setInterval(tjtomove, time);
        }

    }
    btnr.onclick = function() {
        clearInterval(tjtim1);
        if (flag) {
            tjmove();
        }
    }
    btnl.onclick = function() {
        clearInterval(tjtim1);
        if (flag) {
            tjnum -= 2;
            indn -= 2;
            tjmove();
        }
    }

    //下标切换
    function bigbcol(n) {
        for (i = 0; i < lis.length; i++) {
            lis[i].className = '';
        }
        lis[n].className = lun;
    }

    //鼠标悬浮在下标时切换图片
    for (i = 0; i < lis.length; i++) {
        lis[i].onmouseover = function() {
            clearInterval(tjtim1);
            if (flag) {
                for (i = 0; i < lis.length; i++) {
                    if (lis[i] == this) {
                        tjnum = i;
                        indn = i - 1;
                        tjmove();
                    }
                }
            }
        }
    }
    tjtim1 = setInterval(tjmove, 2000);
}

tfbhd('gmrontf', 'gmronbf', 'img', 'ghmzron', 'gmfbl', 'gmfbr', 'fmobrl', 113, 1)

//二楼tab切换
tabcha("twftab", 'li', 'ghmzr', 'onftbl', 'ghmzseld', 'ghmzunsel')


//三楼大图滚动
function thfbhd(obj, lnm, obo, btl, btr, lun, stp, time) { //传入的参数依次是图片的父级的父级id，img，最外层id，左按钮classname，右按钮classname，下标切换的classname，完成步数，每步隔多长时间执行一次
    var todrecpic = document.getElementById(obj); //获取图片的父级
    var repic = todrecpic.getElementsByTagName(lnm); //获取图片的内容
    var todpf = document.getElementById(obo);
    var lis = todpf.getElementsByTagName('li');
    var btnl = js.getidcla(obo, btl)[0];
    var btnr = js.getidcla(obo, btr)[0];
    todrecpic.scrollLeft = repic[0].offsetWidth; //今日推荐的图片一次性切换4张，且每张图片之间有1px的空隙
    var tjnum = 1;
    var indn = 0; //控制下标移动
    var tjtim = null;
    var tjtim1 = null;
    var flag = true; //标记一次滑动是否完成，如果未完成不允许进行下一次操作
    todpf.onmouseover = function() {
        btnl.style.display = 'block';
        btnr.style.display = 'block';
        clearInterval(tjtim1);
    }
    todpf.onmouseout = function() {
        btnl.style.display = '';
        btnr.style.display = '';
        tjtim1 = setInterval(tjmove, 2000);
    }

    function tjmove() {
        if (flag) {
            clearInterval(tjtim);
            tjnum++;
            indn++;
            flag = false;
            if (tjnum == repic.length) {
                tjnum = 1;
                todrecpic.scrollLeft = repic[0].offsetWidth;
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
            var tjsc = todrecpic.scrollLeft;
            var tjec = repic[0].offsetWidth * tjnum;
            var maxStep = stp;
            var everyStep = (tjec - tjsc) / maxStep;
            var step = 0;
            bigbcol(indn);

            function tjtomove() {
                step++;
                todrecpic.scrollLeft += everyStep;
                if (step == maxStep) {
                    if (tjnum == 0) {
                        tjnum = repic.length - 2;
                        todrecpic.scrollLeft = repic[0].offsetWidth * tjnum;
                    }
                    if (tjnum == repic.length - 1) {
                        tjnum = 1;
                        todrecpic.scrollLeft = repic[0].offsetWidth * tjnum;
                    }
                    clearInterval(tjtim);
                    flag = true;
                }
            }
            tjtim = setInterval(tjtomove, time);
        }

    }
    btnr.onclick = function() {
        clearInterval(tjtim1);
        if (flag) {
            tjmove();
        }
    }
    btnl.onclick = function() {
        clearInterval(tjtim1);
        if (flag) {
            tjnum -= 2;
            indn -= 2;
            tjmove();
        }
    }

    //下标切换
    function bigbcol(n) {
        for (i = 0; i < lis.length; i++) {
            lis[i].className = '';
        }
        lis[n].className = lun;
    }

    //鼠标悬浮在下标时切换图片
    for (i = 0; i < lis.length; i++) {
        lis[i].onmouseover = function() {
            clearInterval(tjtim1);
            if (flag) {
                for (i = 0; i < lis.length; i++) {
                    if (lis[i] == this) {
                        tjnum = i;
                        indn = i - 1;
                        tjmove();
                    }
                }
            }
        }
    }
    tjtim1 = setInterval(tjmove, 2000);
}
thfbhd('strontf', 'img', 'sjtxron', 'stfbl', 'stfbr', 'fmobrl', 20, 20)

//三楼tab切换
tabcha("thftab", 'li', 'sjtxr', 'onftbl', 'sjtxseld', 'sjtxunsel')

//四楼大图滚动
thfbhd('jdrontf', 'img', 'jydqron', 'stfbl', 'stfbr', 'fmobrl', 20, 20)

//四楼tab切换
tabcha("foftab", 'li', 'jydqr', 'onftbl', 'sjtxseld', 'sjtxunsel')

//五楼大图滚动
thfbhd('dsrontf', 'img', 'dnsmron', 'stfbl', 'stfbr', 'fmobrl', 20, 20)

//五楼tab切换
tabcha("fiftab", 'li', 'dnsmr', 'onftbl', 'sjtxseld', 'sjtxunsel')

//六楼大图滚动
tfbhd('yjrontf', 'yjronbf', 'img', 'ydjsron', 'yjrobl', 'yjrobr', 'fmobrl', 113, 1)

//六楼tab切换
tabcha("siftab", 'li', 'ydjsr', 'onftbl', 'ydjsseld', 'ydjsunsel')

//七楼大图滚动
tfbhd('jsrontf', 'jsronbf', 'img', 'jjshron', 'jsrobl', 'jsrobr', 'fmobrl', 113, 1)

//七楼tab切换
tabcha("seftab", 'li', 'jjshr', 'onftbl', 'jjshseld', 'jjshunsel')

//八楼大图滚动
tfbhd('mwrontf', 'mwronbf', 'img', 'mywjron', 'mwrobl', 'mwrobr', 'fmobrl', 113, 1)

//八楼tab切换
tabcha("eiftab", 'li', 'mywjr', 'onftbl', 'mywjseld', 'mywjunsel')

//九楼大图滚动
tfbhd('sbrontf', 'sbronbf', 'img', 'spbjron', 'sbrobl', 'sbrobr', 'fmobrl', 113, 1)

//九楼tab切换
tabcha("niftab", 'li', 'spbjr', 'onftbl', 'spbjseld', 'spbjunsel')

//十楼大图滚动
thfbhd('tyrontf', 'img', 'tsyxron', 'tyfbl', 'tyfbr', 'fmobrl', 20, 20)

//十楼tab切换
tabcha("teftab", 'li', 'tsyxr', 'onftbl', 'tsyxseld', 'tsyxunsel')

//十一楼大图滚动
thfbhd('zyrontf', 'img', 'zcypron', 'stfbl', 'stfbr', 'fmobrl', 20, 20)

//十一楼tab切换
tabcha("elftab", 'li', 'zcypr', 'onftbl', 'sjtxseld', 'sjtxunsel')

//十二楼大图滚动
thfbhd('sfrontf', 'img', 'shfwron', 'stfbl', 'stfbr', 'fmobrl', 79, 10)
thfbhd('sfrontf1', 'img', 'shfwron1', 'stfbl', 'stfbr', 'fmobrl', 79, 10)


//热门晒单滑动事件
function rtbmove(obj, obo, stp, time) { //传入的参数依次是图片的父级的父级id，img，最外层id，左按钮classname，右按钮classname，下标切换的classname，完成步数，每步隔多长时间执行一次
    var todrecpic = document.getElementById(obj); //获取图片的父级
    var repic = todrecpic.children; //获取图片的内容
    var todpf = document.getElementById(obo);
    todpf.scrollTop = repic[0].offsetHeight + 30; //今日推荐的图片一次性切换4张，且每张图片之间有1px的空隙
    var tjnum = 1;
    var tjtim = null;
    var tjtim1 = null;
    var flag = true; //标记一次滑动是否完成，如果未完成不允许进行下一次操作
    todpf.onmouseover = function() {
        clearInterval(tjtim1);
    }
    todpf.onmouseout = function() {
        tjtim1 = setInterval(tjmove, 2000);
    }

    function tjmove() {
        if (flag) {
            clearInterval(tjtim);
            tjnum++;
            flag = false;
            var tjsc = todpf.scrollTop;
            var tjec = (repic[0].offsetHeight + 30) * tjnum;
            var maxStep = stp;
            var everyStep = (tjec - tjsc) / maxStep;
            var step = 0;

            function tjtomove() {
                step++;
                todpf.scrollTop += everyStep;
                if (step == maxStep) {
                    if (tjnum == 6) {
                        tjnum = 0;
                        todpf.scrollTop = (repic[0].offsetHeight + 30) * tjnum;
                    }
                    clearInterval(tjtim);
                    flag = true;
                }
            }
            tjtim = setInterval(tjtomove, time);
        }

    }

    tjtim1 = setInterval(tjmove, 2000);
}

rtbmove('rmsdc', 'rmsd', 20, 20);

var onf = document.getElementById('onefl'); //获取一楼
var twf = document.getElementById('twofl'); //获取二楼
var thf = document.getElementById('thrfl'); //获取三楼
var fof = document.getElementById('foufl'); //获取四楼
var fif = document.getElementById('fivfl'); //获取五楼
var sif = document.getElementById('sixfl'); //获取六楼
var sef = document.getElementById('sevfl'); //获取七楼
var eif = document.getElementById('eigfl'); //获取八楼
var nif = document.getElementById('ninfl'); //获取九楼
var tef = document.getElementById('tenfl'); //获取十楼
var elf = document.getElementById('elefl'); //获取十一楼
var twef = document.getElementById('twefl'); //获取十二楼
var twefb = document.getElementById('twefb'); //获取十二楼最底部的div
var lbfix = document.getElementById('lbfix'); //获取左侧导航栏
var lbfcs = lbfix.children; //获取左侧导航栏下面的子元素
var floorn = ['服饰', '美妆', '手机', '家电', '数码', '运动', '居家', '母婴', '食品', '图书', '车品', '服务'] //将左侧导航栏的每层楼名存到数组中
var flnums = document.getElementsByClassName('flnum');
//鼠标移入左侧导航栏触发事件
for (var i = 0; i < lbfcs.length; i++) {
    lbfcs[i].onmouseover = function() {
        for (i = 0; i < lbfcs.length; i++) {
            if (lbfcs[i] == this) {
                lbfcs[i].innerHTML = floorn[i];
                lbfcs[i].style.fontSize = '12px';
                lbfcs[i].style.fontFamily = '宋体';
            } else if (lbfcs[i].className == 'lbfseled') {
                lbfcs[i].innerHTML = floorn[i];
            } else {
                lbfcs[i].innerHTML = i + 1 + 'F';
            }
        }
    }
    lbfcs[i].onmouseout = function() {
        for (i = 0; i < lbfcs.length; i++) {
            if (lbfcs[i].className == 'lbfseled') {
                lbfcs[i].innerHTML = floorn[i];
            } else {
                lbfcs[i].innerHTML = i + 1 + 'F';
                lbfcs[i].style.fontSize = '';
                lbfcs[i].style.fontFamily = '';
            }
        }
    }
}

//滚动条移动触发左侧导航栏事件
window.onscroll = window.onload = function() {
        var sct = document.documentElement.scrollTop || document.body.scrollTop; //获取滚动条距顶部的距离
        var sch = document.documentElement.clientHeight || document.body.clientHeight; //获取屏幕高度
        if (sct + sch >= onf.offsetTop && twf.offsetTop - sct > +sch / 2) {
            lbfix.style.display = 'block';
            lbfix.style.top = (sch - lbfix.offsetHeight) / 2 + 'px';
            for (i = 0; i < lbfcs.length; i++) {
                lbfcs[i].innerHTML = i + 1 + 'F';
                lbfcs[i].className = '';
                flnums[i].style.background = 'url(img/floor1new.png) 0 0 no-repeat'
            }
            lbfcs[0].innerHTML = floorn[0];
            lbfcs[0].className = 'lbfseled';
            flnums[0].style.background = 'url(img/product_home_1.0.0.png) 0 0 no-repeat'
        } else if (twf.offsetTop - sct <= sch / 2 && thf.offsetTop - sct > sch / 2) {
            lbfix.style.display = 'block';
            lbfix.style.top = (sch - lbfix.offsetHeight) / 2 + 'px';
            for (i = 0; i < lbfcs.length; i++) {
                lbfcs[i].innerHTML = i + 1 + 'F';
                lbfcs[i].className = '';
                flnums[i].style.background = 'url(img/floor1new.png) 0 0 no-repeat'
            }
            lbfcs[1].innerHTML = floorn[1];
            lbfcs[1].className = 'lbfseled';
            flnums[1].style.background = 'url(img/product_home_1.0.0.png) 0 0 no-repeat'
        } else if (thf.offsetTop - sct <= sch / 2 && fof.offsetTop - sct > sch / 2) {
            lbfix.style.display = 'block';
            lbfix.style.top = (sch - lbfix.offsetHeight) / 2 + 'px';
            for (i = 0; i < lbfcs.length; i++) {
                lbfcs[i].innerHTML = i + 1 + 'F';
                lbfcs[i].className = '';
                flnums[i].style.background = 'url(img/floor1new.png) 0 0 no-repeat'
            }
            lbfcs[2].innerHTML = floorn[2];
            lbfcs[2].className = 'lbfseled';
            flnums[2].style.background = 'url(img/product_home_1.0.0.png) 0 0 no-repeat'
        } else if (fof.offsetTop - sct <= sch / 2 && fif.offsetTop - sct > sch / 2) {
            lbfix.style.display = 'block';
            lbfix.style.top = (sch - lbfix.offsetHeight) / 2 + 'px';
            for (i = 0; i < lbfcs.length; i++) {
                lbfcs[i].innerHTML = i + 1 + 'F';
                lbfcs[i].className = '';
                flnums[i].style.background = 'url(img/floor1new.png) 0 0 no-repeat'
            }
            lbfcs[3].innerHTML = floorn[3];
            lbfcs[3].className = 'lbfseled';
            flnums[3].style.background = 'url(img/product_home_1.0.0.png) 0 0 no-repeat'
        } else if (fif.offsetTop - sct <= sch / 2 && sif.offsetTop - sct > sch / 2) {
            lbfix.style.display = 'block';
            lbfix.style.top = (sch - lbfix.offsetHeight) / 2 + 'px';
            for (i = 0; i < lbfcs.length; i++) {
                lbfcs[i].innerHTML = i + 1 + 'F';
                lbfcs[i].className = '';
                flnums[i].style.background = 'url(img/floor1new.png) 0 0 no-repeat'
            }
            lbfcs[4].innerHTML = floorn[4];
            lbfcs[4].className = 'lbfseled';
            flnums[4].style.background = 'url(img/product_home_1.0.0.png) 0 0 no-repeat'
        } else if (sif.offsetTop - sct <= sch / 2 && sef.offsetTop - sct > sch / 2) {
            lbfix.style.display = 'block';
            lbfix.style.top = (sch - lbfix.offsetHeight) / 2 + 'px';
            for (i = 0; i < lbfcs.length; i++) {
                lbfcs[i].innerHTML = i + 1 + 'F';
                lbfcs[i].className = '';
                flnums[i].style.background = 'url(img/floor1new.png) 0 0 no-repeat'
            }
            lbfcs[5].innerHTML = floorn[5];
            lbfcs[5].className = 'lbfseled';
            flnums[5].style.background = 'url(img/product_home_1.0.0.png) 0 0 no-repeat'
        } else if (sef.offsetTop - sct <= sch / 2 && eif.offsetTop - sct > sch / 2) {
            lbfix.style.display = 'block';
            lbfix.style.top = (sch - lbfix.offsetHeight) / 2 + 'px';
            for (i = 0; i < lbfcs.length; i++) {
                lbfcs[i].innerHTML = i + 1 + 'F';
                lbfcs[i].className = '';
                flnums[i].style.background = 'url(img/floor1new.png) 0 0 no-repeat'
            }
            lbfcs[6].innerHTML = floorn[6];
            lbfcs[6].className = 'lbfseled';
            flnums[6].style.background = 'url(img/product_home_1.0.0.png) 0 0 no-repeat'
        } else if (eif.offsetTop - sct <= sch / 2 && nif.offsetTop - sct > sch / 2) {
            lbfix.style.display = 'block';
            lbfix.style.top = (sch - lbfix.offsetHeight) / 2 + 'px';
            for (i = 0; i < lbfcs.length; i++) {
                lbfcs[i].innerHTML = i + 1 + 'F';
                lbfcs[i].className = '';
                flnums[i].style.background = 'url(img/floor1new.png) 0 0 no-repeat'
            }
            lbfcs[7].innerHTML = floorn[7];
            lbfcs[7].className = 'lbfseled';
            flnums[7].style.background = 'url(img/product_home_1.0.0.png) 0 0 no-repeat'
        } else if (nif.offsetTop - sct <= sch / 2 && tef.offsetTop - sct > sch / 2) {
            lbfix.style.display = 'block';
            lbfix.style.top = (sch - lbfix.offsetHeight) / 2 + 'px';
            for (i = 0; i < lbfcs.length; i++) {
                lbfcs[i].innerHTML = i + 1 + 'F';
                lbfcs[i].className = '';
                flnums[i].style.background = 'url(img/floor1new.png) 0 0 no-repeat'
            }
            lbfcs[8].innerHTML = floorn[8];
            lbfcs[8].className = 'lbfseled';
            flnums[8].style.background = 'url(img/product_home_1.0.0.png) 0 0 no-repeat'
        } else if (tef.offsetTop - sct <= sch / 2 && elf.offsetTop - sct > sch / 2) {
            lbfix.style.display = 'block';
            lbfix.style.top = (sch - lbfix.offsetHeight) / 2 + 'px';
            for (i = 0; i < lbfcs.length; i++) {
                lbfcs[i].innerHTML = i + 1 + 'F';
                lbfcs[i].className = '';
                flnums[i].style.background = 'url(img/floor1new.png) 0 0 no-repeat'
            }
            lbfcs[9].innerHTML = floorn[9];
            lbfcs[9].className = 'lbfseled';
            flnums[9].style.background = 'url(img/product_home_1.0.0.png) 0 0 no-repeat'
        } else if (elf.offsetTop - sct <= sch / 2 && twef.offsetTop - sct > sch / 2) {
            lbfix.style.display = 'block';
            lbfix.style.top = (sch - lbfix.offsetHeight) / 2 + 'px';
            for (i = 0; i < lbfcs.length; i++) {
                lbfcs[i].innerHTML = i + 1 + 'F';
                lbfcs[i].className = '';
                flnums[i].style.background = 'url(img/floor1new.png) 0 0 no-repeat'
            }
            lbfcs[10].innerHTML = floorn[10];
            lbfcs[10].className = 'lbfseled';
            flnums[10].style.background = 'url(img/product_home_1.0.0.png) 0 0 no-repeat'
        } else if (twef.offsetTop - sct <= sch / 2 && twefb.offsetTop - sct > -66) {
            lbfix.style.display = 'block';
            lbfix.style.top = (sch - lbfix.offsetHeight) / 2 + 'px';
            for (i = 0; i < lbfcs.length; i++) {
                lbfcs[i].innerHTML = i + 1 + 'F';
                lbfcs[i].className = '';
                flnums[i].style.background = 'url(img/floor1new.png) 0 0 no-repeat'
            }
            lbfcs[11].innerHTML = floorn[11];
            lbfcs[11].className = 'lbfseled';
            flnums[11].style.background = 'url(img/product_home_1.0.0.png) 0 0 no-repeat'
        } else {
            lbfix.style.display = '';
            lbfix.style.top = '';
            for (i = 0; i < lbfcs.length; i++) {
                lbfcs[i].innerHTML = '';
                lbfcs[i].className = '';
                lbfcs[i].style = '';
            }
        }
    }
    //调整浏览器大小的时候固定导航栏高度变化
window.onresize = function() {
    var sch = document.documentElement.clientHeight || document.body.clientHeight; //获取屏幕高度
    if (lbfix.style.display == 'block') {
        lbfix.style.top = (sch - lbfix.offsetHeight) / 2 + 'px';
    }
}

//点击楼层按钮时，滚动条滑动到点击楼层
for (i = 0; i < lbfcs.length; i++) {
    lbfcs[i].onclick = function() {
        var lbtim = null;
        var sct = document.documentElement.scrollTop || document.body.scrollTop;
        for (i = 0; i < lbfcs.length; i++) {
            if (lbfcs[i] == this) {
                var dis = flnums[i].offsetTop - sct;
                var maxStep = 20;
                var everyStep = dis / maxStep;
                var step = 0;
                lbtim = setInterval(function() {
                    step++;
                    document.documentElement.scrollTop = Tween.Cubic.easeOut(step, sct, dis, maxStep);
                    document.body.scrollTop = Tween.Cubic.easeOut(step, sct, dis, maxStep);
                    if (step == maxStep) {
                        clearInterval(lbtim);
                    }
                }, 50)
            }
        }
    }
}


//tween算法
/*
 * Tween.js
 * t: current time（当前时间）
 * b: beginning value（初始值）
 * c: change in value（变化量）
 * d: duration（持续时间）
 */
var Tween = {
    Linear: function(t, b, c, d) {
        return c * t / d + b;
    },
    Quad: {
        easeIn: function(t, b, c, d) {
            return c * (t /= d) * t + b;
        },
        easeOut: function(t, b, c, d) {
            return -c * (t /= d) * (t - 2) + b;
        },
        easeInOut: function(t, b, c, d) {
            if ((t /= d / 2) < 1) return c / 2 * t * t + b;
            return -c / 2 * ((--t) * (t - 2) - 1) + b;
        }
    },
    Cubic: {
        easeIn: function(t, b, c, d) {
            return c * (t /= d) * t * t + b;
        },
        easeOut: function(t, b, c, d) {
            return c * ((t = t / d - 1) * t * t + 1) + b;
        },
        easeInOut: function(t, b, c, d) {
            if ((t /= d / 2) < 1) return c / 2 * t * t * t + b;
            return c / 2 * ((t -= 2) * t * t + 2) + b;
        }
    },
    Quart: {
        easeIn: function(t, b, c, d) {
            return c * (t /= d) * t * t * t + b;
        },
        easeOut: function(t, b, c, d) {
            return -c * ((t = t / d - 1) * t * t * t - 1) + b;
        },
        easeInOut: function(t, b, c, d) {
            if ((t /= d / 2) < 1) return c / 2 * t * t * t * t + b;
            return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
        }
    },
    Quint: {
        easeIn: function(t, b, c, d) {
            return c * (t /= d) * t * t * t * t + b;
        },
        easeOut: function(t, b, c, d) {
            return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
        },
        easeInOut: function(t, b, c, d) {
            if ((t /= d / 2) < 1) return c / 2 * t * t * t * t * t + b;
            return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
        }
    },
    Sine: {
        easeIn: function(t, b, c, d) {
            return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
        },
        easeOut: function(t, b, c, d) {
            return c * Math.sin(t / d * (Math.PI / 2)) + b;
        },
        easeInOut: function(t, b, c, d) {
            return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
        }
    },
    Expo: {
        easeIn: function(t, b, c, d) {
            return (t == 0) ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
        },
        easeOut: function(t, b, c, d) {
            return (t == d) ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
        },
        easeInOut: function(t, b, c, d) {
            if (t == 0) return b;
            if (t == d) return b + c;
            if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
            return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
        }
    },
    Circ: {
        easeIn: function(t, b, c, d) {
            return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
        },
        easeOut: function(t, b, c, d) {
            return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
        },
        easeInOut: function(t, b, c, d) {
            if ((t /= d / 2) < 1) return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
            return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
        }
    },
    Elastic: {
        easeIn: function(t, b, c, d, a, p) {
            var s;
            if (t == 0) return b;
            if ((t /= d) == 1) return b + c;
            if (typeof p == "undefined") p = d * .3;
            if (!a || a < Math.abs(c)) {
                s = p / 4;
                a = c;
            } else {
                s = p / (2 * Math.PI) * Math.asin(c / a);
            }
            return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
        },
        easeOut: function(t, b, c, d, a, p) {
            var s;
            if (t == 0) return b;
            if ((t /= d) == 1) return b + c;
            if (typeof p == "undefined") p = d * .3;
            if (!a || a < Math.abs(c)) {
                a = c;
                s = p / 4;
            } else {
                s = p / (2 * Math.PI) * Math.asin(c / a);
            }
            return (a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b);
        },
        easeInOut: function(t, b, c, d, a, p) {
            var s;
            if (t == 0) return b;
            if ((t /= d / 2) == 2) return b + c;
            if (typeof p == "undefined") p = d * (.3 * 1.5);
            if (!a || a < Math.abs(c)) {
                a = c;
                s = p / 4;
            } else {
                s = p / (2 * Math.PI) * Math.asin(c / a);
            }
            if (t < 1) return -.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
            return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * .5 + c + b;
        }
    },
    Back: {
        easeIn: function(t, b, c, d, s) {
            if (typeof s == "undefined") s = 1.70158;
            return c * (t /= d) * t * ((s + 1) * t - s) + b;
        },
        easeOut: function(t, b, c, d, s) {
            if (typeof s == "undefined") s = 1.70158;
            return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
        },
        easeInOut: function(t, b, c, d, s) {
            if (typeof s == "undefined") s = 1.70158;
            if ((t /= d / 2) < 1) return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
            return c / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
        }
    },
    Bounce: {
        easeIn: function(t, b, c, d) {
            return c - Tween.Bounce.easeOut(d - t, 0, c, d) + b;
        },
        easeOut: function(t, b, c, d) {
            if ((t /= d) < (1 / 2.75)) {
                return c * (7.5625 * t * t) + b;
            } else if (t < (2 / 2.75)) {
                return c * (7.5625 * (t -= (1.5 / 2.75)) * t + .75) + b;
            } else if (t < (2.5 / 2.75)) {
                return c * (7.5625 * (t -= (2.25 / 2.75)) * t + .9375) + b;
            } else {
                return c * (7.5625 * (t -= (2.625 / 2.75)) * t + .984375) + b;
            }
        },
        easeInOut: function(t, b, c, d) {
            if (t < d / 2) {
                return Tween.Bounce.easeIn(t * 2, 0, c, d) * .5 + b;
            } else {
                return Tween.Bounce.easeOut(t * 2 - d, 0, c, d) * .5 + c * .5 + b;
            }
        }
    }
}
Math.tween = Tween;

//点击换一批

var guepic = document.getElementById('guepic');
var gueps = guepic.getElementsByTagName('img');
var hyp = js.getidcla('gueyl', 'guechange')[0];
var hypn = 0;
hyp.onclick = function() {
    hypn++;
    if (hypn == 3) {
        hypn = 0;
    }
    guepic.scrollLeft = 1006 * hypn;
}

window.onload = function() {
        rpPic();
    }
    //搜索框自动出文字
var queres = document.getElementById('queres');
query.onkeyup = function() {
    var req = new XMLHttpRequest();
    req.open('get', 'baidu.php?keyword=' + query.value, true);
    req.send(null);
    req.onreadystatechange = function() {
        if (req.readyState == 4) {
            if (req.status == 200) {
                var rpn = eval('(' + req.responseText + ')').s;
                console.log(req.responseText);
                var result = '';
                for (i = 0; i < rpn.length; i++) {
                    result += '<div class="queresled">' + rpn[i] + '</div>';
                }
                queres.innerHTML = result;
            }
        }
    }
}