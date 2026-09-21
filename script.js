(function () {
  const posts = [
    {
      id: 'post1',
      title: 'Building an Automated SOC Workflow with Shuffle',
      date: 'April 20, 2025',
      readTime: '7 min read',
      excerpt: 'How I wired Wazuh, Shuffle, VirusTotal, and TheHive together to automate malware triage and incident reporting.',
      content: `
        <p>Alert fatigue is real. When you're staring at hundreds of SIEM alerts a day, the last thing you want is to manually copy-paste hashes into VirusTotal. That's where automation comes in.</p>
        <p>I built a workflow using <strong>Shuffle</strong> (an open-source SOAR platform) that listens for Wazuh alerts, extracts file hashes, checks them against VirusTotal and other threat intel sources, and automatically creates cases in TheHive.</p>
        <h2>Why Shuffle?</h2>
        <p>Shuffle is open-source, self-hostable, and has a clean visual workflow editor. It integrates with almost everything via its app ecosystem — Wazuh, VirusTotal, TheHive, Slack, Gmail, and more.</p>
        <blockquote>"Automate the boring stuff so you can focus on the threats that actually matter."</blockquote>
        <h2>The workflow, step by step</h2>
        <p><strong>1.</strong> Wazuh detects a suspicious file and fires an alert via webhook.<br>
        <strong>2.</strong> Shuffle extracts the SHA256 hash from the alert.<br>
        <strong>3.</strong> The hash is submitted to VirusTotal for reputation check.<br>
        <strong>4.</strong> If malicious, an incident is created in TheHive with all context.<br>
        <strong>5.</strong> Slack and email notifications go out to the SOC team in real time.</p>
        <p>The whole thing runs in seconds and cuts triage time from ~10 minutes to under 30 seconds. The GitHub repo is linked on my portfolio — feel free to fork it.</p>
      `
    },
    {
      id: 'post2',
      title: 'Deploying a Home SOC Lab with Wazuh and OpenSearch',
      date: 'April 5, 2025',
      readTime: '6 min read',
      excerpt: 'A practical guide to setting up Wazuh, OpenSearch, MISP, and TheHive in Docker for hands-on SOC practice.',
      content: `
        <p>You can't learn SOC operations from theory alone. You need a lab where you can generate alerts, tune rules, and practice incident response without any real-world consequences.</p>
        <p>My lab runs on a single Proxmox host with Docker containers for <strong>Wazuh</strong> (SIEM + EDR), <strong>OpenSearch</strong> (log storage and dashboards), <strong>MISP</strong> (threat intel), and <strong>TheHive</strong> (case management).</p>
        <h2>Architecture overview</h2>
        <p>Wazuh agents run on my Windows and Linux VMs. They ship logs to the Wazuh manager, which forwards to OpenSearch. MISP feeds threat intel into Wazuh via its API. TheHive receives alerts from Wazuh and lets me practice case triage.</p>
        <h2>Key lessons</h2>
        <p><strong>Isolate your network.</strong> Use a host-only or internal bridge — never expose your lab to the internet.</p>
        <p><strong>Start with default rules, then tune.</strong> Wazuh's default ruleset is a great baseline, but you'll want to write custom Sigma rules for your simulated attacks.</p>
        <p><strong>Simulate attacks.</strong> Use Atomic Red Team to generate MITRE-mapped activity, then see how your detection rules perform.</p>
      `
    },
    {
      id: 'post3',
      title: 'Lumma Stealer: Detection and Analysis',
      date: 'March 18, 2025',
      readTime: '5 min read',
      excerpt: 'How I built a signature-based detection prototype for Lumma Stealer using OpenSearch and MISP threat intel.',
      content: `
        <p>Lumma Stealer is an information stealer that's been making the rounds in phishing campaigns. It targets browser credentials, crypto wallets, and system information, then exfiltrates via Telegram or HTTP.</p>
        <p>For my OSAMD project, I built a detection prototype that identifies Lumma Stealer execution using a combination of file hashes, process behavior, and network indicators.</p>
        <h2>Detection approach</h2>
        <p><strong>Static:</strong> IOCs from MISP — known malicious hashes and domains — are matched against incoming logs in OpenSearch.</p>
        <p><strong>Behavioral:</strong> Sysmon events for process creation, network connections, and file writes are correlated. Lumma often spawns suspicious child processes from Office apps and reaches out to Telegram API endpoints.</p>
        <p><strong>Alerting:</strong> When a match is found, a Slack message and email go out with the full context — hostname, user, process tree, and hash.</p>
        <h2>What I learned</h2>
        <p>Detection is a balance between sensitivity and noise. Too many rules and you drown in false positives. Too few, and you miss real threats. Start simple, measure, and iterate.</p>
      `
    },
    {
      id: 'post4',
      title: 'From Zero to SOC: My Journey into Blue Team',
      date: 'March 2, 2025',
      readTime: '6 min read',
      excerpt: 'How I went from IT student to SOC analyst — the labs, certifications, and lessons that actually mattered.',
      content: `
        <p>Two years ago, I didn't know what a SIEM was. Today, I'm working as a SOC analyst, building detection rules and automating incident response. Here's what I learned along the way.</p>
        <h2>Start with the fundamentals</h2>
        <p>Networking (TCP/IP, DNS, HTTP), operating systems (Windows and Linux), and basic security concepts (CIA triad, defense in depth) are non-negotiable. You can't detect what you don't understand.</p>
        <h2>Build a lab. Break things.</h2>
        <p>Set up Wazuh or Security Onion. Install Sysmon on a Windows VM. Run Atomic Red Team tests. Watch the alerts fire. Tune the rules. Repeat.</p>
        <blockquote>"The best SOC analysts are the ones who never stop being curious."</blockquote>
        <h2>Certifications that helped</h2>
        <p>ISC2 CC gave me a solid foundation. LetsDefend's SOC path and Blue Team Junior Analyst taught me practical skills. Security Blue Team's labs were great for hands-on practice.</p>
        <h2>Soft skills matter too</h2>
        <p>Incident response is a team sport. Learn to write clearly, communicate findings to non-technical stakeholders, and stay calm under pressure. These skills are just as important as technical ones.</p>
      `
    }
  ];

  const homePage = document.getElementById('homePage');
  const blogPage = document.getElementById('blogPage');
  const postPage = document.getElementById('postPage');

  const postTitle = document.getElementById('postTitle');
  const postDate = document.getElementById('postDate');
  const postReadTime = document.getElementById('postReadTime');
  const postContent = document.getElementById('postContent');

  const navHome = document.getElementById('navHome');
  const navBlog = document.getElementById('navBlog');
  const logoLink = document.getElementById('logoLink');
  const heroBlogBtn = document.getElementById('heroBlogBtn');
  const viewAllBlogs = document.getElementById('viewAllBlogs');
  const backToHomeFromBlog = document.getElementById('backToHomeFromBlog');
  const backToBlogFromPost = document.getElementById('backToBlogFromPost');

  const homeBlogPreview = document.getElementById('homeBlogPreview');
  const blogList = document.getElementById('blogList');

  function renderHomePreview() {
    homeBlogPreview.innerHTML = '';
    posts.slice(0, 3).forEach(post => {
      const a = document.createElement('a');
      a.href = '#';
      a.className = 'blog-preview-card';
      a.dataset.postId = post.id;
      a.innerHTML = `
        <div class="blog-title">${post.title}</div>
        <div class="blog-meta">
          <span>${post.date}</span>
          <span>${post.readTime}</span>
        </div>
        <div class="blog-excerpt">${post.excerpt}</div>
      `;
      a.addEventListener('click', (e) => {
        e.preventDefault();
        showPost(post.id);
      });
      homeBlogPreview.appendChild(a);
    });
  }

  function renderBlogList() {
    blogList.innerHTML = '';
    posts.forEach(post => {
      const a = document.createElement('a');
      a.href = '#';
      a.className = 'blog-card';
      a.dataset.postId = post.id;
      a.innerHTML = `
        <div class="blog-title">${post.title}</div>
        <div class="blog-meta">
          <span>${post.date}</span>
          <span>${post.readTime}</span>
        </div>
        <div class="blog-excerpt">${post.excerpt}</div>
      `;
      a.addEventListener('click', (e) => {
        e.preventDefault();
        showPost(post.id);
      });
      blogList.appendChild(a);
    });
  }

  function setActiveNav(navId) {
    [navHome, navBlog].forEach(el => el.classList.remove('active'));
    if (navId === 'home') navHome.classList.add('active');
    if (navId === 'blog') navBlog.classList.add('active');
  }

  function showHome(e) {
    if (e) e.preventDefault();
    homePage.classList.remove('hidden');
    blogPage.classList.add('hidden');
    postPage.classList.add('hidden');
    setActiveNav('home');
    history.pushState(null, '', window.location.pathname);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function showBlogList(e) {
    if (e) e.preventDefault();
    homePage.classList.add('hidden');
    blogPage.classList.remove('hidden');
    postPage.classList.add('hidden');
    setActiveNav('blog');
    renderBlogList();
    history.pushState(null, '', '#blog');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function showPost(postId, fromHash = false) {
    const post = posts.find(p => p.id === postId);
    if (!post) return;

    postTitle.textContent = post.title;
    postDate.textContent = post.date;
    postReadTime.textContent = post.readTime;
    postContent.innerHTML = post.content;

    homePage.classList.add('hidden');
    blogPage.classList.add('hidden');
    postPage.classList.remove('hidden');

    setActiveNav('blog');

    if (!fromHash) {
      history.pushState(null, '', `#${postId}`);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function handleRoute() {
    const hash = window.location.hash.substring(1);

    if (hash === 'blog') {
      homePage.classList.add('hidden');
      blogPage.classList.remove('hidden');
      postPage.classList.add('hidden');
      setActiveNav('blog');
      renderBlogList();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (hash && posts.some(p => p.id === hash)) {
      showPost(hash, true);
    } else {
      homePage.classList.remove('hidden');
      blogPage.classList.add('hidden');
      postPage.classList.add('hidden');
      setActiveNav('home');
    }
  }

  navHome.addEventListener('click', showHome);
  navBlog.addEventListener('click', showBlogList);
  logoLink.addEventListener('click', showHome);
  heroBlogBtn.addEventListener('click', showBlogList);
  viewAllBlogs.addEventListener('click', showBlogList);
  backToHomeFromBlog.addEventListener('click', showHome);
  backToBlogFromPost.addEventListener('click', (e) => {
    e.preventDefault();
    showBlogList();
  });

  window.addEventListener('hashchange', handleRoute);

  renderHomePreview();
  renderBlogList();
  handleRoute();
})();