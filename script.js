
    /* --------------------------
       Small helpers & DOM ready
       -------------------------- */
    const $ = sel => document.querySelector(sel);

    // Set year
    document.getElementById('year').textContent = new Date().getFullYear();

    /* --------------------------
       Theme toggle + persist
       -------------------------- */
    const themeToggle = $('#themeToggle');
    const root = document.documentElement;

    function setTheme(theme){
      if(theme === 'dark') {
        root.setAttribute('data-theme', 'dark');
        themeToggle.textContent = '☀️';
      } else {
        root.removeAttribute('data-theme');
        themeToggle.textContent = '🌙';
      }
      localStorage.setItem('theme', theme);
    }

    // initialize
    const saved = localStorage.getItem('theme') || (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    setTheme(saved === 'dark' ? 'dark' : 'light');

    themeToggle.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
      setTheme(current === 'dark' ? 'light' : 'dark');
    });

    /* --------------------------
       Mobile hamburger (simple)
       -------------------------- */
    const hamb = $('#hamb');
    hamb && hamb.addEventListener('click', () => {
      const nav = document.querySelector('nav ul');
      if(!nav) return;
      nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
    });

    // hide mobile nav on link click
    document.querySelectorAll('nav a').forEach(a=>{
      a.addEventListener('click', ()=> {
        const nav = document.querySelector('nav ul');
        if(window.innerWidth <= 980 && nav) nav.style.display = 'none';
      });
    });

    /* --------------------------
       Reveal on scroll (IntersectionObserver)
       -------------------------- */
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if(entry.isIntersecting){
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {threshold: 0.12});

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    /* --------------------------
       Contact form (simple)
       -------------------------- */
    const contactForm = $('#contactForm');
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = $('#name').value.trim();
      const email = $('#email').value.trim();
      const message = $('#message').value.trim();
      if(!name || !email || !message) return alert('Please fill all fields.');
      // placeholder behavior — replace with real submission logic
      alert(`Thanks ${name}! Your message was sent (demo).`);
      contactForm.reset();
    });

    /* --------------------------
       Keyboard shortcut: P -> scroll to projects
       -------------------------- */
    window.addEventListener('keydown', (e) => {
      if(e.key.toLowerCase() === 'p') {
        document.getElementById('projects').scrollIntoView({behavior:'smooth'});
      }
    });

    /* --------------------------
       Download resume (demo)
       -------------------------- */
    function downloadResume(e){
      e && e.preventDefault();
      // In real project, put your resume file in public folder and link it.
      // This demo will create a small text file to download.
      const blob = new Blob([`Praveen Kumar\nFront-End Developer\nEmail: praveenpkg.com`], {type: 'text/plain'});
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url; a.download = 'Praveen-Kumar-Resume.txt';
      document.body.appendChild(a); a.click(); a.remove();
      URL.revokeObjectURL(url);
    }

    window.downloadResume = downloadResume;

    /* --------------------------
       Tiny UI nicety: links smooth offset (account for fixed header)
       -------------------------- */
    document.querySelectorAll('a[href^="#"]').forEach(a => {
      a.addEventListener('click', function(ev){
        const target = document.querySelector(this.getAttribute('href'));
        if(!target) return;
        ev.preventDefault();
        const y = target.getBoundingClientRect().top + window.scrollY - (parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 68) + 8;
        window.scrollTo({top: y, behavior:'smooth'});
      });
    });
