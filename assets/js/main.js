document.addEventListener("DOMContentLoaded", () => {

    /*
    ==========================================
    HEADER
    ==========================================
    */

    const header = document.querySelector(".site-header");

    if (header) {

        window.addEventListener("scroll", () => {

            if (window.scrollY > 40) {
                header.classList.add("scrolled");
            } else {
                header.classList.remove("scrolled");
            }

        }, { passive: true });

    }



    /*
    ==========================================
    MENU MOBILE
    ==========================================
    */

    const menuButton = document.getElementById("menuButton");
    const navLinks = document.getElementById("navLinks");

    if (menuButton && navLinks) {

        const closeMenu = () => {
            navLinks.classList.remove("open");
            navLinks.inert = true;
            menuButton.classList.remove("active");
            menuButton.setAttribute("aria-expanded", "false");
            menuButton.setAttribute("aria-label", "Abrir menu");
        };

        menuButton.addEventListener("click", () => {

            const isOpen = navLinks.classList.toggle("open");

            navLinks.inert = !isOpen;
            menuButton.classList.toggle("active", isOpen);
            menuButton.setAttribute("aria-label", isOpen ? "Fechar menu" : "Abrir menu");

            menuButton.setAttribute(
                "aria-expanded",
                isOpen ? "true" : "false"
            );

        });


        navLinks.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", closeMenu);
        });
        document.addEventListener("keydown", event => {
            if (event.key === "Escape" && navLinks.classList.contains("open")) {
                closeMenu();
                menuButton.focus();
            }
        });
        document.addEventListener("click", event => {
            if (navLinks.classList.contains("open") &&
                !navLinks.contains(event.target) && !menuButton.contains(event.target)) closeMenu();
        });
        window.matchMedia("(min-width: 981px)").addEventListener("change", event => {
            if (event.matches) closeMenu();
        });

    }



    /*
    ==========================================
    CURSOR GLOW
    ==========================================
    */

    const cursorGlow = document.querySelector(".cursor-glow");

    if (
        cursorGlow &&
        window.matchMedia("(pointer: fine)").matches &&
        !window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {

        document.body.classList.add("has-pointer");

        document.addEventListener("mousemove", event => {

            cursorGlow.style.transform =
                `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;

        });

    }



    /*
    ==========================================
    TILT 3D
    ==========================================
    */

    const tiltElements =
        document.querySelectorAll(".tilt-element");

    const canHover =
        window.matchMedia("(hover: hover)").matches;


    if (canHover && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {

        tiltElements.forEach(element => {

            element.addEventListener("mousemove", event => {

                const rect =
                    element.getBoundingClientRect();

                const x =
                    event.clientX - rect.left;

                const y =
                    event.clientY - rect.top;


                const centerX =
                    rect.width / 2;

                const centerY =
                    rect.height / 2;


                const rotateX =
                    ((y - centerY) / centerY) * -4;

                const rotateY =
                    ((x - centerX) / centerX) * 4;


                element.style.transform =
                    `perspective(1000px)
                     rotateX(${rotateX}deg)
                     rotateY(${rotateY}deg)
                     translateY(-4px)`;

            });


            element.addEventListener("mouseleave", () => {

                element.style.transform =
                    "";

            });

        });

    }



    /*
    ==========================================
    SCROLL REVEAL
    ==========================================
    */

    const revealElements = document.querySelectorAll(
        ".service-card, .project-card, .number-item, .process-item, .founder-card, .faq-item, .section-heading, .section-title"
    );


    if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {

        const observer =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (entry.isIntersecting) {

                            entry.target.classList.add("visible");

                            observer.unobserve(
                                entry.target
                            );

                        }

                    });

                },
                {
                    threshold: 0.12,
                    rootMargin: "0px 0px -50px 0px"
                }
            );


        revealElements.forEach(element => {

            element.classList.add("reveal");

            observer.observe(element);

        });

    } else {

        revealElements.forEach(element => {

            element.classList.add("visible");

        });

    }



    /*
    ==========================================
    PROCESS LINE / FLOW LINE
    ==========================================
    */

    const lineTracks =
        document.querySelectorAll(".process-track, .flow-track");


    if ("IntersectionObserver" in window) {

        const trackObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (entry.isIntersecting) {

                            entry.target.classList.add(
                                "visible"
                            );

                        }

                    });

                },
                {
                    threshold: 0.2
                }
            );


        lineTracks.forEach(track => {

            trackObserver.observe(track);

        });

    } else {

        lineTracks.forEach(track => {

            track.classList.add("visible");

        });

    }



    /*
    ==========================================
    SMOOTH SCROLL
    ==========================================
    */

    document.querySelectorAll(
        'a[href^="#"]'
    ).forEach(link => {

        link.addEventListener("click", event => {

            const targetId =
                link.getAttribute("href");

            if (
                !targetId ||
                targetId === "#"
            ) {
                return;
            }


            const target =
                document.querySelector(targetId);


            if (!target) {
                return;
            }


            event.preventDefault();


            const headerHeight =
                header
                    ? header.offsetHeight
                    : 0;


            const targetPosition =
                target.getBoundingClientRect().top +
                window.scrollY -
                headerHeight;


            window.scrollTo({
                top: targetPosition,
                behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth"
            });

        });

    });



    /*
    ==========================================
    PARALLAX DOS ELEMENTOS DO HERO
    ==========================================
    */

    const heroScene =
        document.querySelector(".hero-visual");


    if (
        heroScene &&
        canHover
    ) {

        document.addEventListener(
            "mousemove",
            event => {

                const x =
                    (event.clientX / window.innerWidth - 0.5);

                const y =
                    (event.clientY / window.innerHeight - 0.5);


                heroScene.style.transform =
                    `rotateY(${x * 5}deg)
                     rotateX(${y * -5}deg)`;

            }
        );

    }



    /*
    ==========================================
    REDUZIR ANIMAÇÕES
    ==========================================
    */

    const reducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        );


    if (reducedMotion.matches) {

        document.documentElement.classList.add(
            "reduced-motion"
        );

    }



    /*
    ==========================================
    FAQ
    ==========================================
    */

    const faqItems =
        document.querySelectorAll(".faq-item");


    faqItems.forEach(item => {

        item.addEventListener("toggle", () => {

            if (!item.open) {
                return;
            }


            faqItems.forEach(otherItem => {

                if (
                    otherItem !== item &&
                    otherItem.open
                ) {

                    otherItem.open = false;

                }

            });

        });

    });



    /*
    ==========================================
    ACTIVE NAV
    ==========================================
    */

    const sections =
        document.querySelectorAll(
            "section[id]"
        );

    const navItems =
        document.querySelectorAll(
            ".nav-links a"
        );


    if (
        sections.length &&
        navItems.length &&
        "IntersectionObserver" in window
    ) {

        const sectionObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (!entry.isIntersecting) {
                            return;
                        }


                        const id =
                            entry.target.id;


                        navItems.forEach(link => {

                            link.classList.remove(
                                "active"
                            );


                            if (
                                link.getAttribute("href") ===
                                `#${id}`
                            ) {

                                link.classList.add(
                                    "active"
                                );

                            }

                        });

                    });

                },
                {
                    threshold: 0.25
                }
            );


        sections.forEach(section => {

            sectionObserver.observe(section);

        });

    }

});