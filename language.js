(function () {
  "use strict";

  var STORAGE_KEY = "accountbook-site-language";
  var page = document.body.dataset.page;
  var originals = new Map();

  var pageMeta = {
    privacy: {
      zh: {
        title: "隐私政策 · 小店会员账本",
        description: "小店会员账本隐私政策：了解会员信息的本地存储、统计分析、加密备份、云盘保存及功能反馈中的个人信息处理。"
      },
      en: {
        title: "Privacy Policy · Customer Balance Ledger",
        description: "Privacy Policy for Customer Balance Ledger, covering local customer data, reports, encrypted backups, cloud storage, and feedback."
      }
    },
    support: {
      zh: {
        title: "支持与反馈 · 小店会员账本",
        description: "小店会员账本支持与反馈：获取会员管理、充值消费、统计及加密备份恢复的使用帮助，或通过邮箱联系开发者。"
      },
      en: {
        title: "Support · Customer Balance Ledger",
        description: "Help for Customer Balance Ledger, including customer management, add funds, purchases, reports, encrypted backups, and contacting support."
      }
    }
  };

  var translations = {
    privacy: {
      ".skip": "Skip to the Privacy Policy",
      ".brand span": "Customer Balance Ledger",
      ".brand": { "aria-label": "Customer Balance Ledger, back to top" },
      ".header-label": "Privacy & Data Protection",
      ".hero": `
        <div class="eyebrow"><span class="dot" aria-hidden="true"></span>Careful records, careful protection</div>
        <h1>Privacy Policy</h1>
        <p class="lead">Your ledger deserves thoughtful protection. This policy explains how Customer Balance Ledger handles customer and transaction information and how you can manage that data.</p>
        <div class="dates"><span>Last updated: <time datetime="2026-11-16">November 16, 2026</time></span><span>Effective: <time datetime="2026-11-16">November 16, 2026</time></span></div>`,
      ".principles": {
        html: `
          <div class="principle">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="6" y="2.5" width="12" height="19" rx="3"/><path d="M10 18h4M9 6h6"/></svg>
            <strong>Everyday records stay on your device</strong><p>Customer, transaction, and report data needs no business server.</p>
          </div>
          <div class="principle">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 2.5 20 6v5.5c0 5-5 8.5-8 10-3-1.5-8-5-8-10V6l8-3.5Z"/><path d="m8.5 12 2.4 2.4 4.6-5"/></svg>
            <strong>Manual backups are encrypted</strong><p>No password is required. Keep the backup file secure.</p>
          </div>
          <div class="principle">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="3"/><path d="m4 7 8 6 8-6"/></svg>
            <strong>You choose when to send feedback</strong><p>Customer records and your ledger are never attached automatically.</p>
          </div>`,
        "aria-label": "Privacy highlights"
      },
      ".toc": {
        html: `
          <p class="toc-label">On this page</p>
          <ol>
            <li><a href="#scope">01 Scope & responsibility</a></li>
            <li><a href="#data">02 Information processed</a></li>
            <li><a href="#use">03 How information is used</a></li>
            <li><a href="#backup">04 Storage & encrypted backups</a></li>
            <li><a href="#feedback">05 Feedback</a></li>
            <li><a href="#services">06 System services & permissions</a></li>
            <li><a href="#rights">07 Managing your information</a></li>
            <li><a href="#security">08 Retention & security</a></li>
            <li><a href="#children">09 Children's information</a></li>
            <li><a href="#website">10 Visiting this website</a></li>
            <li><a href="#changes">11 Policy updates</a></li>
            <li><a href="#contact">12 Contact us</a></li>
          </ol>
          <div class="toc-help"><p>Privacy question?</p><a href="mailto:731652307@qq.com">731652307@qq.com</a></div>`,
        "aria-label": "Privacy Policy contents"
      },
      "#policy": { "aria-label": "Privacy Policy" },
      "#scope": `
        <h2><span class="number">01</span>Scope and Responsibility</h2>
        <p>This policy applies to the local customer management, add-funds and purchase records, reports, backup and restore, and feedback features currently provided by Customer Balance Ledger. The app is provided by the <strong>Customer Balance Ledger developer</strong>, who can be reached at <a href="mailto:731652307@qq.com">731652307@qq.com</a> (referred to as “we” or “us”).</p>
        <p>The app helps businesses record customer stored value and purchases. It <strong>does not process actual payments, transfers, or card transactions, and it does not require an app account</strong>. Everyday recordkeeping works offline. iCloud, file providers, and email services you choose may require an internet connection.</p>
        <p>Each business decides what customer information to record, why to record it, and how long to keep it. Businesses are responsible for giving any required notice, obtaining any required consent, and recording only information necessary for their operations. We do not automatically receive a business's customer records or ledger through the app. Customers who want to access or correct records held by a business should contact that business first.</p>`,
      "#data": `
        <h2><span class="number">02</span>Information We Process</h2>
        <p>The app processes the following information on your device to provide the features you choose:</p>
        <div class="table-wrap">
          <table aria-label="Categories of information processed by the app and their purposes">
            <thead><tr><th scope="col">Category</th><th scope="col">Details and purpose</th></tr></thead>
            <tbody>
              <tr><td>Customer details</td><td>Phone number, optional name, creation time, and an internal identifier generated by the app. The phone number distinguishes customers and prevents duplicate profiles. A name is not required.</td></tr>
              <tr><td>Business and saved items</td><td>Business name and the name, type, amount, bonus amount, enabled status, and creation time of add-funds presets and purchase items, used to make recordkeeping faster.</td></tr>
              <tr><td>Add-funds and purchase entries</td><td>The associated customer; name and phone number at the time of entry; item name; add-funds or purchase type; amount; bonus amount; resulting balance; note; and time. These support record review and on-device reports. One-time amounts are included.</td></tr>
              <tr><td>Backup information</td><td>The time the last backup was saved successfully, used for on-device reminders; the full-ledger backup you export and its key identifier, used for encryption and recovery; and, when restoring older backups that used random keys, an existing legacy key from the system Keychain.</td></tr>
              <tr><td>Feedback you choose to send</td><td>Feedback category, message, optional contact details, app name, app version and build number, and iOS version, used to reply or troubleshoot. When you send email, this also includes information such as the sender address handled by your email provider.</td></tr>
            </tbody>
          </table>
        </div>
        <p>Use care when entering notes or feedback. Do not include identity documents, bank card details, health information, or other sensitive information unrelated to the record or support request. Hide unnecessary customer information before sending screenshots or other materials.</p>`,
      "#use": `
        <h2><span class="number">03</span>How Information Is Used</h2>
        <p>Customer management, balance calculations, entry lookup, date-range reports, item rankings, and item-level analysis are performed on your device. The app keeps a snapshot of relevant details with each entry so you can verify historical records.</p>
        <p>The current version contains no advertising, third-party usage analytics, or advertising tracking SDKs. It does not access advertising identifiers or use customer or ledger information for advertising, profiling, or sale. The app does not automatically upload your ledger to a developer-operated server.</p>
        <p>We receive and use information only after you choose to send feedback, and only to communicate about and resolve the relevant matter. We do not use it for unrelated purposes except as necessary to provide a service you request or comply with applicable legal obligations.</p>`,
      "#backup": `
        <h2><span class="number">04</span>Local Storage and Encrypted Backups</h2>
        <h3>Ledger on your device</h3>
        <p>Customer, business, item, and entry data is stored in a SQLite database inside the app's sandbox and relies on iOS sandboxing and file protection. Backup reminders only check the backup time recorded on the device. <strong>A reminder does not export or upload your ledger automatically.</strong> Real-time ledger sync across devices is not currently provided.</p>
        <h3>Backups you export</h3>
        <p>When you choose “Export full backup,” the app encrypts the full ledger with AES-256-GCM and creates a <code>MemberLedgerBackup.xdbackup</code> file. The system save window first attempts to open the Customer Balance Ledger folder in iCloud Drive. You may instead choose local storage or another file provider. Confirm both the save location and cloud upload status. The developer does not receive the backup.</p>
        <p>You do not set a backup password. The current version uses one fixed key built into the app and shared across devices. Newly exported backups can be restored on a device with a compatible current version of the app and do not depend on iCloud Passwords & Keychain sync. The key is not included in the backup file or uploaded to a developer-operated server.</p>
        <div class="note"><p><strong>Treat a backup as a sensitive file containing customer information.</strong> The shared key can be extracted from the app and does not isolate one user's backups from another's. Anyone who has the backup file may also be able to restore it through the app. Encryption prevents the file from being read directly as plain text, but it does not guarantee that only you can access its contents.</p></div>
        <p><strong>Older random-key backups still require their original key.</strong> The app reads an existing legacy key from the system Keychain only to support these older files. Moving an older file to another device may still require the same Apple Account and iCloud Passwords & Keychain sync. On the original device, update the app and export a new backup to use the fixed key. Older files are not converted automatically, and a backup whose original key has been completely lost still cannot be decrypted.</p>
        <p>You must confirm before restoring. A restore replaces the ledger on the device and cannot merge ledgers. The current version can still import older unencrypted JSON backups. <strong>Existing unencrypted files are not encrypted automatically</strong>; secure or delete those files separately.</p>
        <h3>System device backups</h3>
        <p>Separately from the manual export feature, iOS, iCloud, or computer device backups may include app data according to your system settings. Apple's applicable service terms govern that processing. The app does not represent these system backups as having gone through its own backup-file encryption process.</p>`,
      "#feedback": `
        <h2><span class="number">05</span>Feedback and Email</h2>
        <p>Feedback is optional and is not required for everyday recordkeeping. The app can prepare an email to <a href="mailto:731652307@qq.com">731652307@qq.com</a>, or let you share or copy feedback text through system features. <strong>You must confirm before an email is sent, and you choose the sharing destination.</strong> Copying only places the relevant text on the system clipboard; it does not send anything.</p>
        <p>Prepared feedback includes only the category and message you enter, optional contact information, and app and system version details. It <strong>does not automatically attach customer lists, transaction entries, the database, backup files, or diagnostic logs</strong>. You can review an email before sending it.</p>
        <p>Email and sharing are handled by the service provider you select. The recipient address uses QQ Mail. Feedback we receive is used only to communicate, troubleshoot, and improve the relevant issue. Do not send your entire ledger or unnecessary customer personal information with feedback.</p>`,
      "#services": `
        <h2><span class="number">06</span>System Services, Third Parties, and Permissions</h2>
        <p>The app contains no third-party advertising, analytics, or social-login SDKs. When you use the following optional system features, the relevant provider processes data under its own terms:</p>
        <ul>
          <li><strong>Apple system services:</strong> Handle iCloud Drive, device backups, and, where needed to restore older random-key backups, iCloud Passwords & Keychain. You can manage these services in system settings. See <a href="https://www.apple.com/legal/privacy/">Apple's Privacy Policy</a>.</li>
          <li><strong>File providers:</strong> Access only the file or save location you select when importing or exporting. If you choose another cloud provider, that provider processes the file.</li>
          <li><strong>Email and sharing services:</strong> Process feedback and sender information according to the action you choose and the provider's terms.</li>
        </ul>
        <p>The current version does not request access to Contacts, Location, Camera, Photos, Microphone, or app tracking. It does not read your Apple Account password or proactively read the system clipboard.</p>
        <p>We do not sell, rent, or proactively provide third parties with personal information received through feedback. If processing is required by applicable law or a valid request from a competent authority, we limit it to what the applicable requirement makes necessary. The storage locations and transfer arrangements of system cloud and email services depend on the relevant provider and your settings.</p>`,
      "#rights": `
        <h2><span class="number">07</span>How to Manage Your Information</h2>
        <ul>
          <li><strong>View and export:</strong> A business can view customers, balances, historical entries, and reports in the app and export a complete encrypted backup.</li>
          <li><strong>Correct:</strong> You can edit a customer's current name and phone number and edit saved items. To preserve the basis of historical records, changing current customer details or saved items does not rewrite the name, phone number, item, or amount snapshots in existing entries.</li>
          <li><strong>Delete on-device data:</strong> The current version does not provide controls to delete individual customers or entries or clear the entire ledger. To remove app data from the device, choose “Delete App” in iOS. “Offload App” keeps documents and data and is not the same as deletion. Before acting, confirm whether you need to retain any records or backups.</li>
          <li><strong>Manage separate copies:</strong> Deleting the app does not automatically delete exported backups, cloud files, system device backups, legacy Keychain keys, or sent email. Manage each copy through Files, iCloud, device backup settings, or your email service. The app has no separate control to delete legacy keys, and deleting one may prevent restoration of an older random-key backup.</li>
          <li><strong>Stop optional processing:</strong> You may choose not to use backup or feedback features and may manage related cloud service settings in the system. Stopping a service does not automatically withdraw copies already synced, sent, or saved.</li>
        </ul>
        <p>We cannot remotely access, correct, or delete a ledger stored only on a business's device. A customer making a personal-information request about a business's records should contact that business first. The business is responsible for handling the request under applicable law and explaining current feature limitations.</p>
        <p>For feedback you send directly to us, you may use the email address below to request access, correction, or deletion, or to raise a privacy complaint. We will act promptly after verifying the request. We ask only for information necessary to verify identity and do not require your full ledger. Information that must be retained by law will be handled only to the necessary extent and for the necessary period.</p>`,
      "#security": `
        <h2><span class="number">08</span>Retention and Security</h2>
        <p>The business controls its on-device ledger, and the app does not automatically delete it after a set period. Businesses should choose a retention period based on operational needs and applicable recordkeeping obligations and should avoid retaining unnecessary personal information. Retention of separate backups and system copies depends on your actions and the services you select.</p>
        <p>We retain feedback for as long as needed to reply, investigate the relevant issue, and meet necessary obligations. After those purposes are complete, we delete or remove personal information that is no longer necessary. You may also request deletion. Email providers may retain security logs or backups under their own policies.</p>
        <p>The app uses system sandboxing, file protection, and exported-backup encryption to protect data, but no storage or transmission method can guarantee absolute security. Protect your device passcode, Apple Account, and email account; share backups carefully; and regularly confirm that backup files are complete and usable.</p>`,
      "#children": `
        <h2><span class="number">09</span>Children's Personal Information</h2>
        <p>The app is designed for business recordkeeping and is not directed to children. If a business needs to record a child's personal information for a legitimate business activity, it is responsible for obtaining any legally required consent from a parent or guardian, explaining the purpose, applying appropriate safeguards, and avoiding unnecessary information.</p>
        <p>If you believe feedback sent to us contains a child's personal information without appropriate authorization, contact us at the address below so we can review and address it.</p>`,
      "#website": `
        <h2><span class="number">10</span>Visiting This Privacy Policy Website</h2>
        <p>This website contains no analytics, advertising, or tracking scripts and uses no cookies. It uses browser local storage only to remember a language you select manually, not to identify or track visitors. No login is required, and the site does not load external fonts or advertising resources.</p>
        <p>This site is hosted by GitHub Pages. GitHub may record information such as an IP address for security and related purposes. See the <a href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement">GitHub General Privacy Statement</a>. If you follow an email or other external link, the relevant app or website processes information you choose to provide under its own terms.</p>`,
      "#changes": `
        <h2><span class="number">11</span>Changes to This Policy</h2>
        <p>If app features or personal-information practices change, we will update this policy and the date at the top of the page. If a change materially affects processing purposes, information categories, recipients, or your rights, we will provide notice in the app or by another appropriate method. Where separate consent is required, we will request it before the relevant processing.</p>`,
      "#contact": `
        <h2><span class="number">12</span>Contact Us</h2>
        <p>If you have questions about this policy or our handling of personal information, or want to make a related request, contact:</p>
        <div class="contact">
          <p><strong>Customer Balance Ledger developer</strong></p>
          <a href="mailto:731652307@qq.com?subject=Customer%20Balance%20Ledger%3A%20Privacy%20Request">731652307@qq.com</a>
          <p class="small">Describe your question and how you would like us to reply. Do not attach unnecessary customer records or ledger files.</p>
        </div>`,
      ".footer-inner": `<p>Customer Balance Ledger · Know where your business stands</p><a class="back-top" href="#top">Back to top ↑</a>`
    },
    support: {
      ".skip": "Skip to support content",
      ".brand span": "Customer Balance Ledger",
      ".brand": { "aria-label": "Customer Balance Ledger, back to the top of Support" },
      ".header-nav": {
        html: `<a href="support.html" aria-current="page" data-language-link>Support</a><a href="./" data-language-link>Privacy Policy</a>`,
        "aria-label": "Site navigation"
      },
      ".hero": `
        <div class="eyebrow"><span class="dot" aria-hidden="true"></span>Help and feedback</div>
        <h1>Support</h1>
        <p class="lead">Find help with customer management, add funds, purchases, reports, backups, and recovery, or contact the developer directly.</p>
        <div class="hero-actions"><a class="primary-link" href="mailto:731652307@qq.com?subject=Customer%20Balance%20Ledger%3A%20Support%20and%20Feedback"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="3"/><path d="m4 7 8 6 8-6"/></svg>Contact the developer</a><a class="secondary-link" href="#faq">View FAQs ↓</a></div>
        <div class="dates"><span>Support email: <a href="mailto:731652307@qq.com">731652307@qq.com</a></span><span>Last updated: <time datetime="2026-11-16">November 16, 2026</time></span></div>`,
      ".toc": {
        html: `
          <p class="toc-label">How can we help?</p>
          <ol><li><a href="#getting-started">01 Getting started</a></li><li><a href="#backup">02 Backups & moving devices</a></li><li><a href="#faq">03 FAQs</a></li><li><a href="#contact">04 Contact & feedback</a></li></ol>
          <div class="toc-help"><p>You can also contact us in the app:</p><p>Settings → About → Feedback</p><a href="mailto:731652307@qq.com">731652307@qq.com</a></div>`,
        "aria-label": "Support contents"
      },
      "#help": { "aria-label": "Customer Balance Ledger help" },
      "#getting-started": `
        <h2><span class="number">01</span>Getting Started</h2>
        <p>Customer Balance Ledger helps businesses track customer stored value and purchases. No registration or sign-in is required for everyday use.</p>
        <ol class="steps">
          <li><div><strong>Add a customer</strong><p>Open Customers and add a customer with a valid phone number. A name is optional. Use one customer profile per phone number.</p></div></li>
          <li><div><strong>Record add funds and purchases</strong><p>Select a customer and saved items, review the amount, and confirm the entry. You can create an item directly from the item picker or switch to One-time amount. Add Funds entries can also include a bonus amount.</p></div></li>
          <li><div><strong>Review balances and reports</strong><p>Open a customer to view the current balance and history. Use Ledger to find entries and Reports to review date-range totals, trends, item rankings, and item details.</p></div></li>
          <li><div><strong>Save backups regularly</strong><p>Go to Settings → Export full backup to save an encrypted file. The save window first attempts to open the Customer Balance Ledger folder in iCloud Drive. Confirm the location and verify the upload in Files.</p></div></li>
        </ol>`,
      "#backup": `
        <h2><span class="number">02</span>Backups and Moving to a New Device</h2>
        <p>You save backups manually. The current version uses one fixed key built into the app. <strong>Newly exported backups require no password and do not depend on iCloud Keychain sync.</strong> When moving devices, keep the complete backup file and install a current app version that supports it.</p>
        <ol class="backup-steps">
          <li><strong>Save on the old device:</strong> Update and open the current version, then go to Settings → Export full backup. Prefer the Customer Balance Ledger folder in iCloud Drive, save <code>MemberLedgerBackup.xdbackup</code>, and verify in Files that the upload completed.</li>
          <li><strong>Prepare the new device:</strong> Install the current app and confirm the backup is available in Files. To retrieve it from iCloud Drive, sign in with the Apple Account that stores the file. You can also transfer it through another secure method.</li>
          <li><strong>Import and verify:</strong> Go to Settings → Restore from backup, select the file, confirm the restore, and then verify customers, balances, and entries.</li>
        </ol>
        <div class="note"><p><strong class="notice-title">Restoring replaces the ledger on this device and cannot merge ledgers.</strong>If the new device already has records you need, export its current ledger first. Saving a file does not guarantee that it has uploaded to the cloud. While you still have the old device, consider testing the restore on another device before disposing of it.</p></div>
        <p class="small">Keep the backup secure. The shared key is built into the app and does not isolate one user's backups from another's, so anyone with the file may be able to restore it through the app. Older random-key backups still require their original Keychain key. Export a new backup after updating the app on the original device; older files are not converted automatically.</p>`,
      "#faq": `
        <h2><span class="number">03</span>Frequently Asked Questions</h2>
        <p class="small">Select a question to view the answer.</p>
        <div class="faq-list">
          <details><summary>Do I need an account or a constant internet connection?</summary><div class="answer"><p>No registration or sign-in is required. Everyday customer management, add-funds and purchase entries, and reports work offline. Cloud file access and email feedback may require internet access. Keychain sync for older random-key backups may also require it.</p><p>The app records in-person business activity. The business and customer handle actual payments separately.</p></div></details>
          <details><summary>Why is a phone number rejected or reported as already in use?</summary><div class="answer"><p>Enter a valid phone number. The app accepts international numbers, including a leading <code>+</code>, and removes spaces and hyphens when pasted.</p><p>If the number already exists, search for it in Customers and continue using the existing profile. A name is optional.</p></div></details>
          <details><summary>What if there is no suitable Add Funds preset or purchase item?</summary><div class="answer"><p>In the saved-item picker, select New item. The new item is selected after saving and your other selections remain. You can reuse it later.</p><p>For a one-off entry, choose One-time amount and enter an amount and optional item name. A one-time amount is not automatically saved as a preset.</p></div></details>
          <details><summary>Why are purchase amounts different from Add Funds received?</summary><div class="answer"><p>Add Funds received is money the customer actually pays the business. A purchase amount is deducted from the customer's existing balance. A bonus increases the balance but is not counted as money received.</p><p><strong>Customer balance = total Add Funds received + total bonuses − total purchases.</strong> Review Add Funds and purchases separately in reports. Do not add them together as revenue or subtract one from the other as profit. Selecting multiple items creates a separate entry for each item.</p></div></details>
          <details><summary>When will I see a backup reminder? Does it save automatically?</summary><div class="answer"><p>No reminder appears during the first 24 hours. After that, the app reminds you when there are customers, items, or entries and no backup has ever been saved successfully, or when the last successful backup is more than 24 hours old. An empty ledger does not trigger reminders.</p><p>A reminder does not save or upload anything automatically. Complete the save in the system file window. Canceling does not count as a successful backup.</p></div></details>
          <details><summary>What if an older backup says its key is missing?</summary><div class="answer"><p>New backups from the current version use the app's fixed key and do not require iCloud Keychain. Older random-key backups still require their original key. Use the original Apple Account, enable iCloud Passwords & Keychain, connect to the internet, wait for sync, and try again.</p><p>If you still have the original device, update the app and export a new backup to use the fixed key. Older files are not converted automatically. A random-key backup cannot be decrypted if its key is completely lost, so keep the existing file and device.</p></div></details>
          <details><summary>Why didn't the save window open iCloud Drive?</summary><div class="answer"><p>The save window first attempts to open the Customer Balance Ledger folder in iCloud Drive. It may show another location if no Apple Account is signed in, iCloud Drive is disabled, or the folder is temporarily unavailable.</p><p>Check iCloud Drive in system settings, or select it manually in the save window. The system uploads the file after saving, so verify sync in Files. You may also save locally or use another file provider.</p></div></details>
          <details><summary>Does each exported backup overwrite the previous one?</summary><div class="answer"><p>The default filename is <code>MemberLedgerBackup.xdbackup</code>. If you save in the same folder, follow the system prompt to replace the existing file. To keep multiple versions, change the filename in the save window.</p><p>Confirm that the save completed before leaving the system file window.</p></div></details>
          <details><summary>What if my phone is lost, or I want to use multiple devices?</summary><div class="answer"><p>A complete backup exported by the current version can be restored in a compatible current version on another device and does not require Keychain sync. If the only copy was on the lost device, the developer cannot recover the on-device ledger remotely. Older random-key backups also require their original key.</p><p>Data currently moves through manual backup and restore. Real-time ledger sync across devices is not provided. Back up regularly and verify that files are available and uploaded.</p></div></details>
          <details><summary>What if I cannot send feedback email from the app?</summary><div class="answer"><p>Use Share Feedback or Copy Feedback under Feedback, then send it with another email app to <a href="mailto:731652307@qq.com">731652307@qq.com</a>. You can also write to that address directly.</p></div></details>
        </div>`,
      "#contact": `
        <h2><span class="number">04</span>Contact and Feedback</h2>
        <p>For help with customers, Add Funds and purchase entries, reports, backups, recovery, or feature suggestions, contact the <strong>Customer Balance Ledger developer</strong>.</p>
        <div class="contact">
          <p>Support email</p>
          <a class="email-address" href="mailto:731652307@qq.com">731652307@qq.com</a>
          <p class="small">In the app: Settings → About → Feedback</p>
          <a class="primary-link" href="mailto:731652307@qq.com?subject=Customer%20Balance%20Ledger%3A%20Support%20and%20Feedback"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="3"/><path d="m4 7 8 6 8-6"/></svg>Send feedback email</a>
        </div>
        <h3>What should I include in a support request?</h3>
        <ul class="feedback-list"><li>Describe what you were trying to do, what happened, and the steps to reproduce it.</li><li>Include the app version (Settings → About → Version), device model, and iOS or iPadOS version.</li><li>Before attaching a screenshot, hide customer names, phone numbers, balances, and other personal information.</li></ul>
        <p class="small">Do not send your full ledger, backup file, or customer list. The developer cannot remotely access or change a ledger stored only on your device. See the <a href="./" data-language-link>Privacy Policy</a> for details about personal information.</p>`,
      ".footer-inner": `<p>Customer Balance Ledger · Know where your business stands</p><div class="footer-links"><a href="./" data-language-link>Privacy Policy</a><a class="back-top" href="#top">Back to top ↑</a></div>`
    }
  };

  function rememberOriginal(element) {
    if (!originals.has(element)) {
      var attributes = {};
      Array.prototype.forEach.call(element.attributes, function (attribute) {
        attributes[attribute.name] = attribute.value;
      });
      originals.set(element, { html: element.innerHTML, attributes: attributes });
    }
  }

  function restoreOriginals() {
    originals.forEach(function (original, element) {
      element.innerHTML = original.html;
      Array.prototype.slice.call(element.attributes).forEach(function (attribute) {
        if (!(attribute.name in original.attributes)) element.removeAttribute(attribute.name);
      });
      Object.keys(original.attributes).forEach(function (name) {
        element.setAttribute(name, original.attributes[name]);
      });
    });
  }

  function applyEnglish() {
    var selectors = Object.keys(translations[page]);
    selectors.forEach(function (selector) {
      var element = document.querySelector(selector);
      if (element) rememberOriginal(element);
    });
    selectors.forEach(function (selector) {
      var element = document.querySelector(selector);
      if (!element) return;
      var value = translations[page][selector];
      if (typeof value === "string") {
        element.innerHTML = value;
        return;
      }
      Object.keys(value).forEach(function (key) {
        if (key === "html") element.innerHTML = value[key];
        else element.setAttribute(key, value[key]);
      });
    });
  }

  function updateLanguageLinks(language) {
    document.querySelectorAll("[data-language-link]").forEach(function (link) {
      var url = new URL(link.getAttribute("href"), window.location.href);
      url.searchParams.set("lang", language);
      link.href = url.href;
    });
  }

  function updateSwitch(language) {
    document.querySelectorAll("[data-set-language]").forEach(function (button) {
      var active = button.dataset.setLanguage === language;
      button.setAttribute("aria-pressed", active ? "true" : "false");
      button.classList.toggle("active", active);
    });
  }

  function applyLanguage(language, userInitiated) {
    var selected = language === "zh" ? "zh" : "en";
    restoreOriginals();
    if (selected === "en") applyEnglish();

    document.documentElement.lang = selected === "zh" ? "zh-CN" : "en";
    document.documentElement.dataset.language = selected;
    document.title = pageMeta[page][selected].title;
    document.querySelector('meta[name="description"]').content = pageMeta[page][selected].description;
    updateSwitch(selected);
    updateLanguageLinks(selected);

    if (userInitiated) {
      try { localStorage.setItem(STORAGE_KEY, selected); } catch (error) {}
      var url = new URL(window.location.href);
      url.searchParams.set("lang", selected);
      history.replaceState(null, "", url.href);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }
  }

  document.addEventListener("click", function (event) {
    var button = event.target.closest("[data-set-language]");
    if (button) applyLanguage(button.dataset.setLanguage, true);
  });

  applyLanguage(document.documentElement.dataset.language || "en", false);
  document.documentElement.classList.add("language-ready");
})();
