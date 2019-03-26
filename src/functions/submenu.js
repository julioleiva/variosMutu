/**
Menú de la aplicación
**/
function MontarMenu() {

}

(function () {

    /**
     *  Start submenu behavior
     *
     */
    var initSubmenu = function () {

        // Gestiones item
        var gestiones = document.getElementById('gestiones');
        gestiones.addEventListener("mouseover", function () {
            mouseoverHandler('section-sub-menu', 'btn-menu', 'gestiones', 'gestiones-sub');
        });

        var gestionesSub = document.getElementById('gestiones-sub');
        gestionesSub.addEventListener("mouseleave", function () {
            mouseleaveHandler('gestiones-sub', 'gestiones');
        });

        // Productos item
        var productos = document.getElementById('productos');
        productos.addEventListener("mouseover", function () {
            mouseoverHandler('section-sub-menu', 'btn-menu', 'productos', 'productos-sub');
        });

        var productosSub = document.getElementById('productos-sub');
        productosSub.addEventListener("mouseleave", function () {
            mouseleaveHandler('productos-sub', 'productos');
        });


        // Contratar item
        var contratar = document.getElementById('contratar');
        contratar.addEventListener("click", function () {
            mouseclickHandler('section-sub-menu', 'btn-menu', 'contratar', 'contratar-sub');
        });

        var contratarSub = document.getElementById('contratar-sub');
        contratarSub.addEventListener("mouseleave", function () {
            mouseleaveHandler('contratar-sub', 'contratar');
        });

        // nav options item - the top bar above the menu items
        var navOptions = document.getElementsByClassName('nav-options')[0];
        navOptions.addEventListener("mouseover", function () {

            var btnMenu = document.getElementsByClassName('btn-menu');
            for (var x = 0; x < btnMenu.length; x++) {
                btnMenu[x].classList.remove('hover');
            }

            gestionesSub.style.display = 'none';
            gestiones.classList.remove('hover');

            productosSub.style.display = 'none';
            productos.classList.remove('hover');

            contratarSub.style.display = 'none';
            contratar.classList.remove('hover');

        });

        var homeMenuItem = document.getElementById('home-menu-item');
        homeMenuItem.addEventListener("mouseover", function () {

            var btnMenu = document.getElementsByClassName('btn-menu');
            for (var x = 0; x < btnMenu.length; x++) {
                btnMenu[x].classList.remove('hover');
            }

            gestionesSub.style.display = 'none';
            gestiones.classList.remove('hover');

            productosSub.style.display = 'none';
            productos.classList.remove('hover');

            contratarSub.style.display = 'none';
            contratar.classList.remove('hover');

        });

    };


    /**
     *  Element mouse over behavior handler
     *
     */
    var mouseoverHandler = function (el1, el2, el3, el4) {

        el1 = document.getElementsByClassName(el1);
        for (var x = 0; x < el1.length; x++) {
            debugger;
            el1[x].style.display = 'none';
        }

        el2 = document.getElementsByClassName(el2);
        for (var y = 0; y < el2.length; y++) {
            debugger;
            el2[y].classList.remove('hover');
        }

        el3 = document.getElementById(el3);
        el3.classList.add('hover');

        el4 = document.getElementById(el4);
        el4.style.display = '';

    };

    var mouseclickHandler = function (el1, el2, el3, el4) {

        el1 = document.getElementsByClassName(el1);
        for (var x = 0; x < el1.length; x++) {
            debugger;
            el1[x].style.display = 'visible';
        }

        el2 = document.getElementsByClassName(el2);
        for (var y = 0; y < el2.length; y++) {
            debugger;
            el2[y].classList.remove('hover');
        }

        el3 = document.getElementById(el3);
        el3.classList.add('hover');

        el4 = document.getElementById(el4);
        el4.style.display = 'none';

    };


    /**
     *  Element mouse leave behavior handler
     *
     */
    var mouseleaveHandler = function (el1, el2) {

        el1 = document.getElementById(el1);
        el1.style.display = 'none';

        el2 = document.getElementById(el2);
        el2.classList.remove('hover');

    }

    initSubmenu();

}());

//(function () {


//    /**
//     * Init mobile subemenu behavior
//     *
//     */
//    var initSubmenuMobile = function () {

//        // level 2 toggle
//        var menuItems = document.querySelectorAll('.has-submenu');
//        if (menuItems.length > 0) {
//            for (var x = 0; x < menuItems.length; x++) {
//                var items = menuItems[x].querySelectorAll('.btn-menu');
//                if (items.length > 0) {
//                    for (var z = 0; z < items.length; z++) {
//                        items[z].onclick = function () {
//                            var submenuItems = this.nextElementSibling.querySelectorAll('.sub-menu-h3.segundo-nivel');
//                            for (var y = 0; y < submenuItems.length; y++) {
//                                if (submenuItems[y].classList.contains('active')) {
//                                    submenuItems[y].classList.remove('active');
//                                    submenuItems[y].style.display = 'none';
//                                } else {
//                                    submenuItems[y].classList.add('active');
//                                    submenuItems[y].style.display = 'block';
//                                }
//                            }
//                            return false;
//                        }
//                    }
//                }
//            }
//        }

//        // level 3 toggle
//        var secondLevelMenuItems = document.querySelectorAll('.sub-menu-h3.segundo-nivel');
//        if (secondLevelMenuItems.length > 0) {
//            for (var x = 0; x < secondLevelMenuItems.length; x++) {
//                secondLevelMenuItems[x].onclick = function () {
//                    var sibling = this.nextElementSibling;

//                    if (this.classList.contains('active')) {
//                        this.classList.remove('active');
//                        sibling.style.display = 'none';
//                        return false;
//                    }

//                    for (var y = 0; y < secondLevelMenuItems.length; y++) {
//                        secondLevelMenuItems[y].classList.remove('active');
//                        var thisSiblings = secondLevelMenuItems[y].nextElementSibling;
//                        thisSiblings.style.display = 'none';
//                    }

//                    this.classList.add('active');
//                    sibling.style.display = 'block';

//                    return false;
//                }
//            }
//        }
//    }

//    initSubmenuMobile();

//}());

//(function () {

//    /**
//     * Toggle the mobile menu
//     *
//     */
//    var initMenuMobile = function () {

//        var menuMobile = document.getElementById('button-menu-mobile');

//        menuMobile.onclick = function () {

//            var body = document.getElementsByTagName('body')[0];
//            body.classList.toggle('noScrool');

//            var navbarToggle = document.getElementById('button-menu-mobile');
//            navbarToggle.classList.toggle('change');

//            var productosSub = document.getElementById('productos-sub');
//            productosSub.style.display = 'none';

//            var gestionesSub = document.getElementById('gestiones-sub');
//            gestionesSub.style.display = 'none';

//            var contratarSub = document.getElementById('contratar-sub');
//            contratarSub.style.display = 'none';

//            var items = document.querySelectorAll('.sub-menu-h3.segundo-nivel');
//            if (items.length > 0) {
//                for (var z = 0; z < items.length; z++) {
//                    items[z].classList.remove('active');
//                    var submenuItem = items[z].nextElementSibling;
//                    submenuItem.classList.remove('active');
//                }
//                return false;
//            }
//        }

//    };

//    initMenuMobile();

//}());

