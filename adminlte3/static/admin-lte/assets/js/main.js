(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let header = select('#header')
    let offset = header.offsetHeight

    if (!header.classList.contains('header-scrolled')) {
      offset -= 16
    }

    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos - offset,
      behavior: 'smooth'
    })
  }

  /**
   * Header fixed top on scroll
   */
  let selectHeader = select('#header')
  if (selectHeader) {
    let headerOffset = selectHeader.offsetTop
    let nextElement = selectHeader.nextElementSibling
    const headerFixed = () => {
      if ((headerOffset - window.scrollY) <= 0) {
        selectHeader.classList.add('fixed-top')
        nextElement.classList.add('scrolled-offset')
      } else {
        selectHeader.classList.remove('fixed-top')
        nextElement.classList.remove('scrolled-offset')
      }
    }
    window.addEventListener('load', headerFixed)
    onscroll(document, headerFixed)
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Mobile nav dropdowns activate
   */
  on('click', '.navbar .dropdown > a', function(e) {
    if (select('#navbar').classList.contains('navbar-mobile')) {
      e.preventDefault()
      this.nextElementSibling.classList.toggle('dropdown-active')
    }
  }, true)

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()

      let navbar = select('#navbar')
      if (navbar.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Preloader
   */
  let preloader = select('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove()
    });
  }

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Skills animation
   */
  let skilsContent = select('.skills-content');
  if (skilsContent) {
    new Waypoint({
      element: skilsContent,
      offset: '80%',
      handler: function(direction) {
        let progress = select('.progress .progress-bar', true);
        progress.forEach((el) => {
          el.style.width = el.getAttribute('aria-valuenow') + '%'
        });
      }
    })
  }

  /**
   * Testimonials slider
   */
  new Swiper('.testimonials-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 20
      },

      1200: {
        slidesPerView: 3,
        spaceBetween: 20
      }
    }
  });

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item'
      });

      let portfolioFilters = select('#portfolio-flters li', true);

      on('click', '#portfolio-flters li', function(e) {
        e.preventDefault();
        portfolioFilters.forEach(function(el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        portfolioIsotope.on('arrangeComplete', function() {
          AOS.refresh()
        });
      }, true);
    }

  });

  /**
   * Initiate portfolio lightbox 
   */
  const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
  });

  /**
   * Portfolio details slider
   */
  new Swiper('.portfolio-details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Animation on scroll
   */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    })
  });

})()

function plotFromCSV() {
    //const CSV = "https://raw.githubusercontent.com/DishaCoder/CSV/main/df_top_10.csv";
    const CSV = "https://raw.githubusercontent.com/DishaCoder/CSV/main/WMS_dataset.csv";
    d3.csv(CSV, function (rows) {
        console.log(rows);
        console.log("Data Columns = ", rows.columns);
        processData(rows);
    });
}

function processData(row) {
    console.log(row);
    let x = [];
    let y1 = [];
    let y2 = [];
    let phosphorus = [];
    let nitrogen = [];
    let years = [];
    let i = 0;

    while (i < row.length) {
        phosphorus[i] = row[i]["TotalPhosphorus"];
        nitrogen[i] = row[i]["TotalNitrogen"];
        years[i] = row[i]["Year"];

        x.push(years[i]);   //(row["Year"][i]>yearTo && row["Year"][i]<yearFrom) ? row["Year"] : null);               //(row["Year"]);
        y1.push(phosphorus[i]);
        y2.push(nitrogen[i]);
        i += 1;
    }
    console.log("phosphorus",phosphorus);

//    while (i < row.length) {
//        y = years[i];
//        p = phosphorus[i];
//        n = nitrogen[i];
//        x.push(y);   //(row["Year"][i]>yearTo && row["Year"][i]<yearFrom) ? row["Year"] : null);               //(row["Year"]);
//        y1.push(p);
//        y2.push(n);
//        i += 1;
//    }

    console.log("X", x);
    console.log("Y1", y1);
    makePlotlyP(x, y1);
    makePlotlyN(x, y2);

}

function makePlotlyP(x, y1) {

    let traces = [
        {
            x: x,
            y: y1,
            name: "Nitrogen",
            mode: "markers",
            type: "bar",
             bar: {
                 color: "#387fba",
                 width: 3
             }
        },
    ];

    let layout = {
        title: ("TotalPhosphorus").concat(" (mg/L)"),
        yaxis: {
            // autotick: true,
            // autorange: true,
            title: "TotalPhosphorus"
            
        },
        xaxis: {
            title: "Years",
            tickmode: 'linear',

        },
    };

    //https://plot.ly/javascript/configuration-options/
    let config = {
        responsive: true,
        // staticPlot: true,
        // editable: true
    };

    Plotly.newPlot("plotP", traces, layout, config);
}
function makePlotlyN(x, y2) {

    let traces = [
        {
            x: x,
            y: y2,
            name: "Nitrogen",
            mode: "markers",
            type: "bar",
             bar: {
                 color: "#387fba",
                 width: 3
             }
        },
    ];

    let layout = {
        title: ("TotalNitrogen").concat(" (mg/L)"),
        yaxis: {
            // autotick: true,
            // autorange: true,
            title: "TotalNitrogen"
          
        },
        xaxis: {
            title: "Years",
            tickmode: 'linear'
        },
    };

    //https://plot.ly/javascript/configuration-options/
    let config = {
        responsive: true,
        // staticPlot: true,
        // editable: true
    };

    Plotly.newPlot("plotN", traces, layout, config);
}

plotFromCSV();


