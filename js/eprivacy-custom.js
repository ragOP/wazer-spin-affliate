class EPrivacyHtmlElement extends HTMLElement {
  googleConsentModeTags = [
    {
      tag: "ad_user_data",
      category: "Essential Only"
    },
    {
      tag: "analytics_storage",
      category: "Analytics"
    },
    {
      tag: "ad_personalization",
      category: "Functional"
    },
    {
      tag: "ad_storage",
      category: "Marketing"
    },
  ];

  constructor() {
    super();
    this.defaultOptions = {
      environment: "production",
      language: "en",
      name: "Default",
      placeholders: [],
      nonOptionalCategories: ["Essential Only"],
      linkedUrls: [],
      colorPalette: {
        brand: {
          primary: "#a350ca",
          background: "#FFFFFF",
        },
        button: {
          primary: "#a350ca",
          secondary: "#FFFFFF",
        },
        toggle: {
          active: "#a350ca",
          inactive: "#939393",
          containerInactive: "#EFEFEF",
        },
        text: {
          primary: "rgba(0,0,0,0.7)",
          secondary: "rgba(0,0,0,0.87)",
          tertiary: "#000000",
          anchor: "#a350ca",
        },
      }
    };
  }

  static get observedAttributes() { return ['data-lang', 'data-theme','data-show']; }

  connectedCallback() {
    try{
      const overrideOptions = {}
      try {
        this.setLanguageAttribute(overrideOptions);
        this.setThemeAttribute(overrideOptions);
        this.setEnvironmentAttribute(overrideOptions);
        this.setPlaceholderAttribute(overrideOptions);
        this.setLinkedUrlsAttribute(overrideOptions);
      } catch(err) {
        console.error('Unable to retrieve element from DOM', err);
      }
      const mergedOptions = { ...this.defaultOptions, ...overrideOptions };

      window.eprivacy_language = mergedOptions.language;
      window.eprivacy_clientName = mergedOptions.name;

      this.injectEnsightenScript(mergedOptions);

      this.toggleModal();
      this.toggleBanner();
      this.registerModalLaunchEvent();

      this.attachElementsToDom(this, mergedOptions);

      this.attachShadow({ mode: "open" }); // sets and returns 'this.shadowRoot'
      // Create a shadow root
      this.shadowRoot.append();
    } catch(err) {
      console.error("Unable to create webcomponent", err);
    }
  }

  setPlaceholderAttribute(overrideOptions){
    const placeholderAttributeString = this.getAttribute('data-placeholder');
    if (placeholderAttributeString) {
      overrideOptions.placeholders = JSON.parse(placeholderAttributeString);
    }
  }

  setLinkedUrlsAttribute(overrideOptions){
    const linkedUrlsAttributeString = this.getAttribute('data-linked-urls');
    if (linkedUrlsAttributeString) {
      overrideOptions.linkedUrls = JSON.parse(linkedUrlsAttributeString);
    }
  }

  setEnvironmentAttribute(overrideOptions) {
    const envAttr = this.getAttribute('data-env');
    if (envAttr) {
      overrideOptions.environment = envAttr;
    }
  }

  setThemeAttribute(overrideOptions) {
    const themeAttributeString = this.getAttribute('data-theme');
    if (themeAttributeString) {
      overrideOptions.colorPalette = JSON.parse(themeAttributeString);
    }
  }

  setLanguageAttribute(overrideOptions) {
    const langAttr = this.getAttribute('data-lang');
    if (langAttr) {
      overrideOptions.language = langAttr;
    }
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue == newValue) return;

    let overrideOptions = {};

    if (name == 'data-lang') {
      overrideOptions['language'] = newValue;
    }
    if (name == 'data-theme') {
      overrideOptions['colorPalette'] = JSON.parse(newValue);
      this.buildCss(overrideOptions);
    }
    if (name == 'data-show' && newValue == 'true') {
      this.relaunchModal();
    }
  }

  relaunchModal() {
    this.toggleModal(true);
    this.toggleBanner(false);
  }

  registerModalLaunchEvent() {
    window.addEventListener('eprivacy-launch-modal', () => {
      this.relaunchModal();
    });
  }

  attachElementsToDom(elementInstance, options ) {
    let generationTimeout = setInterval(function () {
      if ("undefined" !== typeof Bootstrapper) {
        clearInterval(generationTimeout);

        elementInstance.injectDomainLinker(options);
        elementInstance.injectDomElements(options, elementInstance);
        elementInstance.buildCss(options);
        elementInstance.setPreferencesGoogleConsent();
      }
    }, 10);
  }

  //-------Start: Ensighten
  injectEnsightenScript(options) {
    let scriptReference = document.createElement("script");
    scriptReference.type = "text/javascript";
    scriptReference.src = this.getScriptNameBasedOnEnvironment(options);

    document.head.appendChild(scriptReference);
  };

  injectDomainLinker(options) {
    Bootstrapper.privacy = Bootstrapper.privacy || {};
    Bootstrapper.privacy.linker = (function () {
      var e = {},
          d = {
            enableDebug: !1,
            linked_domains: [],
            query_key: "ens_consent",
            debug: function () {
              var e;
              d.enableDebug &&
              window.console &&
              window.console.log &&
              (((e = arguments)[0] = "Privacy Linker: " + e[0]),
                  window.console.log.apply(this, e));
            },
            getQueryParam: function (e) {
              for (
                  var n = (n = window.location.search.replace(/^\?/, "")).split(
                          "&"
                      ),
                      t = 0;
                  t < n.length;
                  t++
              ) {
                var o = n[t].split("=");
                if (e === o[0]) return decodeURIComponent(o[1]);
              }
            },
            initEventListeners: function () {
              if (0 < d.linked_domains.length) {
                d.debug("Setting up linker event listeners...");
                for (
                    var e = document,
                        n = ["mousedown", "mouseup", "keyup", "submit"],
                        t = 0;
                    t < n.length;
                    t++
                ) {
                  var o = n[t];
                  e.addEventListener
                      ? e.addEventListener(o, d.addURLConsent, !1)
                      : e.attachEvent && e.attachEvent("on" + o, d.addURLConsent);
                }
              }
            },
            encodeConsent: function (e) {
              var n,
                  t = [];
              for (n in e)
                e.hasOwnProperty(n) && t.push(n + "=" + JSON.stringify(e[n]));
              return (t = btoa(t.join(";"))), d.debug("Encoded consent: " + t), t;
            },
            decodeConsent: function (e) {
              var n = {},
                  t = "";
              try {
                t = atob(e);
              } catch (e) {
                return (
                    d.debug(
                        "Error reading Ensighten consent string - not valid consent string"
                    ),
                        !1
                );
              }
              if (t) {
                t = t.split(";");
                for (var o = 0; o < t.length; o++) {
                  var i = t[o].split("=");
                  n[i[0]] = JSON.parse(i[1]);
                }
              }
              return d.debug("Decoded consent", n), n;
            },
            readURLConsent: function () {
              var e = d.getQueryParam(d.query_key);
              if(e) {
                if ((d.debug("Read URL consent: " + e), e))
                  return d.decodeConsent(e);
              } else {
                var f = sessionStorage.getItem(d.query_key);
                sessionStorage.removeItem(d.query_key);
                if ((d.debug("Read URL consent: " + f), f))
                  return d.decodeConsent(f);
              }
            },
            getConsent: function () {
              for (
                  var e = window.gateway.options.clientName,
                      n = window.gateway.consentCookies.getCookie,
                      t = [
                        "BANNER_LOADED",
                        "BANNER_VIEWED",
                        "MODAL_LOADED",
                        "MODAL_VIEWED",
                      ],
                      o = window.gateway.consentCookies.getCookieTypes(),
                      i = {},
                      t = t.concat(o),
                      r = 0;
                  r < t.length;
                  r++
              ) {
                var a = t[r],
                    s = n(a);
                s && (i[a] = s);
              }
              return (
                  window.localStorage &&
                  ((o = window.localStorage.getItem(
                      e + "_ENSIGHTEN_ALLOWED_URLS"
                  )),
                      (e = window.localStorage.getItem(
                          e + "_ENSIGHTEN_BLOCKED_URLS"
                      )),
                  o && (i.ALLOWED_URLS = JSON.parse(o)),
                  e && (i.BLOCKED_URLS = JSON.parse(e))),
                      d.debug("Consent retrieved", i),
                      i
              );
            },
            buildConsentString: function () {
              var e = d.getConsent(),
                  e = d.query_key + "=" + d.encodeConsent(e);
              return d.debug("Build consent string: " + e), e;
            },
            addURLConsent: function (e) {
              var n = (o =
                      (e = e || window.event).target || e.srcElement).closest("a"),
                  t = o.closest("form"),
                  o = n || t || o,
                  i = n ? o.getAttribute("href") || o.href : t ? o.action : "",
                  e = new RegExp(d.linked_domains.join("|"), "i");

              if (i.includes(d.query_key)) {
                return;
              }

              i &&
              !/^(#|javascript:)/i.test(i) &&
              e.test(o.host) &&
              ((i = (e = i.split("#"))[0]),
                  (i += (~i.indexOf("?") ? "&" : "?") + d.buildConsentString()),
                  (i += e[1] || ""),
                  n ? (o.href = i) : t && (o.action = i),
                  d.debug("Adding URL consent to link/form: " + i));
            },
            setConsent: function (e) {
              for (var n in e)
                if (e.hasOwnProperty(n))
                  switch (n) {
                    case "ALLOWED_URLS":
                      for (var t = e[n] || [], o = 0; o < t.length; o++)
                        window.gateway.allowTag(t[o]);
                      break;
                    case "BLOCKED_URLS":
                      for (t = e[n] || [], o = 0; o < t.length; o++)
                        window.gateway.blockTag(t[o]);
                      break;
                    default:
                      window.gateway.consentCookies.setCookie(n, e[n]);
                  }
            },
          };
      return (
          (e.setDomains = function (e) {
            d.linked_domains = e ? e.split(",") : [];
          }),
              (e.setDebug = function (e) {
                d.enableDebug = e;
              }),
              (e.buildConsentString = function (e) {
                return d.buildConsentString();
              }),
              (e.init = function () {
                var e = d.readURLConsent();
                e && d.setConsent(e), d.initEventListeners();
              }),
              e
      );
    })();
    if (options.linkedUrls.length > 0) {
      Bootstrapper.privacy.linker.setDomains(options.linkedUrls.join(","));
    }

    Bootstrapper.privacy.linker.init();
  };

  injectDomElements(options, elementInstance) {
    let ensightenObject = this.getEnvironment();
    if (ensightenObject !== null && ensightenObject !== undefined) {
      this.removeDomElements();
      this.generateBanner(ensightenObject, options, elementInstance);
      this.generateModal(ensightenObject, options);
    }
  };

  getEnvironment() {
    return Bootstrapper.gateway.getActiveEnvironment();
  };

  getCurrentPreferences() {
    return Bootstrapper.gateway.getUserPreferences();
  };

  isPreferenceEnabled(preference) {
    return this.getCurrentPreferences()[preference];
  };

  acceptAll(options) {
    let cookieTypes = Bootstrapper.gateway.getCookieTypes();
    let cookieObj = {};

    for (let i = 0; i < cookieTypes.length; i++) {
      cookieObj[cookieTypes[i].replace(" ", "_")] = "1";
    }
    Bootstrapper.gateway.setCookies(cookieObj);
    Bootstrapper.gateway.updatePreferences();

    this.updateGoogleConsent(cookieObj);
    this.toggleModal(false);
    this.toggleBanner(false);

    this.emitAcceptanceHostEvent();

    this.injectDomElements(options);
  };

  saveSettings(options) {
    let cookieTypes = Bootstrapper.gateway.getCookieTypes();
    let cookieObj = {};

    for (let i = 0; i < cookieTypes.length; i++) {
      cookieObj[cookieTypes[i].replace(" ", "_")] = document.getElementsByName(
          cookieTypes[i]
      )[0].checked
          ? "1"
          : "0";
    }

    Bootstrapper.gateway.setCookies(cookieObj);
    Bootstrapper.gateway.updatePreferences();

    this.updateGoogleConsent(cookieObj);
    this.toggleModal(false);
    this.toggleBanner(false);

    this.emitAcceptanceHostEvent();

    this.injectDomElements(options);
  };

  emitAcceptanceHostEvent() {
    window.dispatchEvent(new CustomEvent('eprivacy_accepted', {}));
  }

  shouldShowBanner() {
    let cookieTypes = Bootstrapper.gateway.getCookieTypes();
    let showBanner = false;
    for (var i = 0; i < cookieTypes.length; i++) {
      if (
          Bootstrapper.gateway.getCookie(cookieTypes[i]) === "" ||
          Bootstrapper.gateway.getCookie(cookieTypes[i]) === undefined
      ) {
        showBanner = true;
      }
    }

    return showBanner;
  };
  //-------End: Ensighten

  //-------Start: General

  toggleBanner(show) {
    let bannerContainer = document.querySelector(".eprivacy-banner-container");
    if (show) {
      bannerContainer.style.display = "flex";
    } else {
      bannerContainer.style.display = "none";
    }
  };

  applyPlaceholderReplacements(text, placeholders) {
    if (placeholders === undefined || placeholders.length === 0) {
      return text;
    }

    for (let i = 0; i < placeholders.length; i++) {
      text = text.replace(
          `{{ ${placeholders[i].key} }}`,
          placeholders[i].value
      );
    }

    return text;
  };

  toCamelCase(str) {
    return str
        .replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
          return index === 0 ? word.toLowerCase() : word.toUpperCase();
        })
        .replace(/\s+/g, "");
  };

  removeDomElements() {
    let banner = document.querySelector(".eprivacy-banner-container");
    let modal = document.querySelector(".eprivacy-modal-container");

    if (banner !== undefined && banner != null) {
      banner.remove();
    }

    if (modal !== undefined && modal != null) {
      modal.remove();
    }
  };
  //-------End: General

  //-------Start: Banner
  generateBanner(ensightenObject, options, elementInstance) {
    let mainContainer = document.createElement("div");
    mainContainer.classList.add("eprivacy-banner-container", "brand-content");
    mainContainer.setAttribute("data-auto", "cookieConsentBanner");
    mainContainer.innerHTML = this.applyPlaceholderReplacements(
        ensightenObject.translation.notificationBannerContent,
        options.placeholders
    );

    document.body.appendChild(mainContainer);

    this.addManageCookiesEvent(mainContainer, elementInstance);
    this.addAcceptAllCookiesEvent(mainContainer, options,elementInstance);
    if (this.shouldShowBanner()) {
      Bootstrapper.gateway.setCookie("BANNER_LOADED", "1");
      Bootstrapper.gateway.setCookie("BANNER_VIEWED", "1");
      this.toggleBanner(true);
    } else {
      this.emitAcceptanceHostEvent();
    }
  };

  addManageCookiesEvent(mainContainer, elementInstance) {
    let button = mainContainer.querySelector("#banner-manage-button");
    button.setAttribute("data-auto", "manageCookies");
    if (button !== undefined) {
      button.onclick = function () {
        elementInstance.toggleModal(true);
      };
    }
  };

  addAcceptAllCookiesEvent(mainContainer, options, elementInstance) {
    let button = mainContainer.querySelector("#banner-accept-all-button");
    button.setAttribute("data-auto", "acceptAllCookies");
    if (button !== undefined) {
      button.onclick = function () {
        elementInstance.acceptAll(options);
      };
    }
  };

  generateBannerActionsManage(options) {
    let manageButton = document.createElement("button");
    manageButton.classList.add("secondary-button");
    manageButton.classList.add("secondary-banner-button");
    manageButton.innerText = options.banner.buttons.manage;

    return manageButton;
  };

  generateBannerActionsAcceptAll(options) {
    let acceptAllButton = document.createElement("button");
    acceptAllButton.classList.add("primary-button");
    acceptAllButton.classList.add("primary-banner-button");
    acceptAllButton.innerText = options.banner.buttons.acceptAll;

    return acceptAllButton;
  };
  //-------End: Banner

  getScriptNameBasedOnEnvironment(options) {
    switch (options.environment.toLowerCase()) {
      case "debug":
        return "https://nexus.src-play.com/betway/dos-playground/Bootstrap.js";
      case "development":
        return "//nexus.src-play.com/betway/dos-playground/Bootstrap.js";
      case "stage":
        return "https://nexus.src-play.com/betway/dos-beta/Bootstrap.js";
      case "beta":
        return "https://nexus.src-play.com/betway/dos-beta/Bootstrap.js";
      case "production":
        return "https://nexus.src-play.com/betway/dos-prod/Bootstrap.js";
      default:
        return "https://nexus.src-play.com/betway/dos-prod/Bootstrap.js";
    }
  };

  generateModal(ensightenObject, options) {
    let modalWrapper = document.createElement("div");
    modalWrapper.classList.add("eprivacy-modal-container", "brand-modal");

    modalWrapper.appendChild(
        this.generateModalHeader(ensightenObject, options)
    );
    modalWrapper.appendChild(this.generateCategories(ensightenObject, options));
    modalWrapper.appendChild(this.generateButtons(ensightenObject, options, this));
    modalWrapper.appendChild(this.generateCloseButton(this));

    document.body.appendChild(modalWrapper);
    document.body.appendChild(this.generateBackdrop());
    Bootstrapper.gateway.setCookie("MODAL_LOADED", "1");

    document.querySelectorAll('.eprivacy-modal-container .eprivacy-modal-subheader a').forEach(
        (link) => {
          link.addEventListener('click', e => {
            this.toggleModal();
          });
        }
    );
  };

  generateModalHeader(ensightenObject, options) {
    let modalHeaderContainer = document.createElement("div");
    let modalHeader = document.createElement("h2");
    let modalSubHeader = document.createElement("p");

    modalHeader.classList.add("eprivacy-modal-header");
    modalHeader.setAttribute("data-auto", "privacySettingHeader");
    modalHeader.innerHTML = this.applyPlaceholderReplacements(
        ensightenObject.translation.consentTitle,
        options.placeholders
    );

    modalSubHeader.classList.add("eprivacy-modal-subheader");
    modalSubHeader.setAttribute("data-auto", "privacySettingSubHeader");
    modalSubHeader.innerHTML = this.applyPlaceholderReplacements(
        ensightenObject.translation.consentDescription,
        options.placeholders
    );

    modalHeaderContainer.classList.add("eprivacy-modal-header-container");
    modalHeaderContainer.appendChild(modalHeader);
    modalHeaderContainer.appendChild(modalSubHeader);

    return modalHeaderContainer;
  };

  generateCategories(ensightenObject, options) {
    let categoryContainer = document.createElement("div");
    categoryContainer.classList.add("eprivacy-modal-category-container");

    let items = ensightenObject.translation.cookies;
    for (let property in items) {
      categoryContainer.appendChild(
          this.generateCategoryItem(property, items[property], options)
      );
      categoryContainer.appendChild(document.createElement("hr"));
    }

    return categoryContainer;
  };

  generateCategoryItem(preference, translations, options) {
    let categoryItemContainer = document.createElement("div");
    let heading = document.createElement("h3");
    let description = document.createElement("div");
    let isChecked = this.isPreferenceEnabled(preference);

    heading.classList.add("eprivacy-modal-category-item-header");
    heading.setAttribute("data-auto", this.toCamelCase(preference));
    heading.innerHTML = translations.title;

    description.classList.add("eprivacy-modal-category-item-description");
    description.innerHTML = translations.description;

    categoryItemContainer.classList.add("eprivacy-modal-category-item");
    categoryItemContainer.appendChild(
        this.generateCategoryToggle(
            categoryItemContainer,
            preference,
            isChecked,
            options
        )
    );
    categoryItemContainer.appendChild(heading);
    categoryItemContainer.appendChild(description);

    if (!isChecked || isChecked == "0") {
      categoryItemContainer.classList.add("inactive");
    }

    return categoryItemContainer;
  };

  generateCategoryToggle(
      categoryItemContainer,
      preference,
      isChecked,
      options
  ) {
    let toggleContainer = document.createElement("div");
    let input = document.createElement("input");
    let swtch = document.createElement("span");
    let toggle = document.createElement("span");

    input.type = "checkbox";
    input.checked = isChecked == 0 ? false : true;
    input.name = preference;
    input.classList.add("eprivacy-modal-toggle-input");

    swtch.classList.add("eprivacy-modal-toggle-switch");

    toggle.classList.add("eprivacy-modal-toggle-toggle");

    toggleContainer.classList.add("eprivacy-modal-toggle");
    toggleContainer.setAttribute(
        "data-auto",
        this.toCamelCase(preference) + "Toggle"
    );
    toggleContainer.appendChild(input);
    toggleContainer.appendChild(swtch);
    toggleContainer.appendChild(toggle);

    if (!options.nonOptionalCategories.includes(preference)) {
      toggleContainer.onclick = function () {
        let childInputReference = toggleContainer.querySelector("input");
        if (childInputReference.checked === false) {
          childInputReference.checked = true;
          categoryItemContainer.classList.remove("inactive");
        } else {
          childInputReference.checked = false;
          categoryItemContainer.classList.add("inactive");
        }
      };
    } else {
      toggleContainer.classList.add("disabled");
    }

    return toggleContainer;
  };

  generateButtons(ensightenObject, options, elementInstance) {
    let buttonContainer = document.createElement("div");

    buttonContainer.classList.add("eprivacy-modal-button-container");
    buttonContainer.appendChild(
        this.generateModalAcceptAllButton(ensightenObject, options, elementInstance)
    );
    buttonContainer.appendChild(
        this.generateModalSaveSettingsButton(ensightenObject, options, elementInstance)
    );

    return buttonContainer;
  };

  generateModalAcceptAllButton(ensightenObject, options, elementInstance) {
    let button = document.createElement("button");
    button.classList.add("secondary-banner-button");
    button.setAttribute("data-auto", "acceptAll");
    button.innerHTML = ensightenObject.translation.cancel; //THIS IS ENSIGHTEN OBJECT NAMING TO ALLOW FOR TRANSLATIONS
    button.onclick = function () {
      elementInstance.acceptAll(options);
    };

    return button;
  };

  generateModalSaveSettingsButton(ensightenObject, options, elementInstance) {
    let button = document.createElement("button");
    button.classList.add("primary-banner-button");
    button.setAttribute("data-auto", "saveSettings");
    button.innerHTML = ensightenObject.translation.save; //THIS IS ENSIGHTEN OBJECT NAMING TO ALLOW FOR TRANSLATIONS
    button.onclick = function () {
      elementInstance.saveSettings(options);
    };

    return button;
  };

  generateCloseButton(instance) {
    let close = document.createElement("div");
    close.classList.add("eprivacy-modal-close");
    close.setAttribute("data-auto", "closeCookieSettings");
    close.innerHTML = "&#x2715";
    close.onclick = function () {
      instance.toggleModal(false);
    };

    return close;
  };

  generateBackdrop() {
    let backdrop = document.createElement("div");
    backdrop.classList.add("eprivacy-backdrop");
    backdrop.onclick = function () {
      this.toggleModal(false);
    };

    return backdrop;
  };

  updateGoogleConsent(eprivacyCookieObject) {
    let consentValues = {};

    for (let property in eprivacyCookieObject) {

      let matchedApprovedTags = this.googleConsentModeTags.filter(a => a.category === property && eprivacyCookieObject[property] === '1');
      let googleConsentModeUpdate = {};

      for (let i = 0; i < matchedApprovedTags.length; i++) {
        googleConsentModeUpdate[matchedApprovedTags[i].tag] = 'granted';
      }

      if (Object.keys(googleConsentModeUpdate).length > 0) {
        consentValues = { ...consentValues, ...googleConsentModeUpdate };
      }
    }

    this.setGoogleConsentMode('consent', 'update', consentValues)
  }

  setGoogleConsentMode() {
    window.dataLayer = window.dataLayer || [];
    dataLayer.push(arguments);
  }

  setPreferencesGoogleConsent() {
    const currentPreferences = this.getCurrentPreferences();

    if (currentPreferences !== undefined) {
      this.updateGoogleConsent(currentPreferences);
    }
  }

  toggleModal(show) {
    let modalContainer = document.querySelector(".eprivacy-modal-container");
    let backdrop = document.querySelector(".eprivacy-backdrop");
    if (typeof Bootstrapper != "undefined" && Bootstrapper.gateway) {
      if (show) {
        Bootstrapper.gateway.setCookie("MODAL_VIEWED", "1");
        modalContainer.style.display = "block";
        backdrop.style.display = "block";
        document.body.style.overflow = "hidden"

      } else {
        Bootstrapper.gateway.setCookie("MODAL_CLOSED", "1");
        modalContainer.style.display = "none";
        backdrop.style.display = "none";
        document.body.style.overflow = "visible"
      }
    }
  };

  toggleBanner(show) {
    let bannerContainer = document.querySelector(".eprivacy-banner-container");
    if (bannerContainer) {
      if (show) {
        bannerContainer.style.display = "flex";
      } else {
        bannerContainer.style.display = "none";
      }
    }
  };

  buildCss(options) {
    let styles = `
        /*FONT IMPORT*/
        @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500&display=swap');
        /*VARIABLES*/
        :root {
            --brand-color-primary: ${options.colorPalette.brand.primary};
            --brand-color-background: ${options.colorPalette.brand.background};

            --button-color-primary: ${options.colorPalette.button.primary};
            --button-color-secondary: ${options.colorPalette.button.secondary};

            --toggle-color-active: ${options.colorPalette.toggle.active};
            --toggle-color-inactive: ${options.colorPalette.toggle.inactive};
            --toggle-color-container-inactive: ${options.colorPalette.toggle.containerInactive};

            --text-color-primary: ${options.colorPalette.text.primary};
            --text-color-secondary: ${options.colorPalette.text.secondary};
            --text-color-tertiary: ${options.colorPalette.text.tertiary};
            --text-color-anchor: ${options.colorPalette.text.anchor};
        }

        /*BUTTON CSS OVERRIDES*/
        .eprivacy-banner-actions-container button,
        .eprivacy-modal-button-container button {
            border-radius: 5px;
            padding: 10px 20px 10px 20px;
            font-weight: 500;
            font-size: 14px;
            line-height: 14px;
            height: 36px;
            text-align: center;
            text-transform: uppercase;
            outline: none;
            cursor: pointer;
        }

        .eprivacy-banner-actions-container .primary-banner-button,
        .eprivacy-banner-actions-container .primary-button,
        .eprivacy-modal-button-container .primary-banner-button {
            border: 1px solid var(--button-color-primary);
            background: var(--button-color-primary);
            color: var(--button-color-secondary);
        }

        .eprivacy-banner-actions-container .secondary-banner-button,
        .eprivacy-banner-actions-container .secondary-button,
        .eprivacy-modal-button-container .secondary-banner-button{
            margin-right: 1.5em;
            border: 1px solid var(--button-color-primary);
            background: var(--button-color-primary);
            color: var(--button-color-secondary);
        }

        /*BANNER*/
        .eprivacy-banner-container {
            display: none;
            bottom: 0;
            width: 60%;
            padding: 1em 1.5em 1em 1.5em;
            background-color: var(--brand-color-background);
            border-radius: 5px;
            box-shadow: 0 16px 24px 2px rgba(0,0,0, 0.14),
                0 6px 30px 5px rgba(0,0,0,0.12),
                0 8px 10px -5px rgba(0,0,0,0.20);
            margin-bottom: 1.5em;
            font-weight: 400;
            font-size: 0.875rem;
            line-height: 22px;
            color: var(--text-color-primary);
            width: 60%;
            font-family: Roboto, 'Helvetica Neue', Helvetica, Arial;
            position: fixed;
            z-index: 9997;
            left: 50%;
            transform: translate(-50%, -50%);
            margin: 0 auto;
        }

        .eprivacy-banner-container a {
            color: var(--text-color-primary);
        }

        .eprivacy-banner-content-container {
            display: flex;
            align-items: center;
            flex-grow: 1;
            margin-right: 5em;
        }

        .eprivacy-banner-content-container a {
            color: var(--text-color-anchor);
        }

        .eprivacy-banner-actions-container {
            display: flex;
            white-space: nowrap;
        }

        /*MODAL*/
        .eprivacy-modal-container {
            display: none;
            border: none;
            position: fixed;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            width: 80%;
            max-width: 760px;
            border-radius: 5px;
            box-shadow: 5px 5px 5px grey;
            background-color: var(--brand-color-background);
            box-shadow: 0 16px 24px 2px rgba(0,0,0, 0.14), 0 6px 30px 5px rgba(0,0,0,0.12), 0 8px 10px -5px rgba(0,0,0,0.20);
            padding: 0px;
            z-index: 999999999;
            font-family: Roboto, 'Helvetica Neue', Helvetica, Arial;
            max-height: 90vh;
            overflow-x: hidden;
            overflow-y: scroll;
            scrollbar-width: thin;
        }

        .eprivacy-modal-container::-webkit-scrollbar {
            width: 5px;
        }

        .eprivacy-modal-container .eprivacy-modal-close {
            position: fixed;
            height: 24px;
            width: 24px;
            text-align: center;
            font-size: 24px;
            line-height: 24px;
            right: 8px;
            top: 8px;
            cursor: pointer;
            color: var(--text-color-secondary);
        }

        .eprivacy-modal-container .eprivacy-modal-header {
            text-align: left;
            font-weight: 500;
            font-size: 1.25rem;
            line-height: 24px;
            color: var(--text-color-secondary);
            margin: 0px;
            width: 100%;
            position: relative;
            padding: 32px 24px 16px 24px;
            text-align: left;
            text-transform: capitalize;
        }

        .eprivacy-modal-container .eprivacy-modal-subheader {
            font-weight: 400;
            font-size: 0.875rem;
            line-height: 22px;
            color: var(--text-color-secondary);
            margin: 0px;
            padding: 8px 24px;
        }

        .eprivacy-modal-container .eprivacy-modal-subheader a {
            color: var(--text-color-anchor);
        }

        .eprivacy-modal-container input[type='checkbox'] {
            position: absolute !important;
            height: 1px;
            width: 1px;
            overflow: hidden;
            clip: rect(1px, 1px, 1px, 1px);
            white-space: nowrap;
        }

        .eprivacy-modal-container input[type='checkbox']:not(:focus):not(:active) {
        }

        .eprivacy-modal-container input[type='checkbox']:checked ~ .eprivacy-modal-toggle-toggle {
            background: var(--toggle-color-active);
            left: 18px;
            transition: .5s;
        }

        .eprivacy-modal-container input[type='checkbox']:checked ~ .eprivacy-modal-toggle-switch {
            background: var(--toggle-color-active);
            opacity: 0.5;
            transition: .5s;
        }

        .eprivacy-modal-container .eprivacy-modal-toggle-switch {
            display: block;
            width: 40px;
            height: 22px;
            background: var(--toggle-color-inactive);
            border-radius: 10px;
            position: absolute;
            top: 0;
            transition: .5s;
        }

        .eprivacy-modal-container .eprivacy-modal-toggle-toggle {
            width: 20px;
            height: 20px;
            top: 1px;
            left: 1px;
            border-radius: 50%;
            background: var(--brand-color-background);
            position: absolute;
            box-shadow: 0 1px 2px rgba(0, 0, 0, 0.4);
            transition: .5s;
        }

        .eprivacy-modal-container .eprivacy-modal-toggle {
            display: flex;
            align-content: end;
            outline: none !important;
            border: none !important;
            width: 40px;
            margin: 0px;
            height: 20px;
            text-align: center;
            position: relative;
            float: right;
            cursor: pointer;
        }

        .eprivacy-modal-container .eprivacy-modal-toggle.disabled {
            opacity: 0.5;
            cursor: default;
        }

        .eprivacy-modal-category-container hr {
            margin: 0px;
            border-color: var(--brand-color-background);
            border-style: solid;
        }

        .eprivacy-modal-category-container .eprivacy-modal-category-item {
            padding: 16px 24px;
        }

        .eprivacy-modal-category-container .eprivacy-modal-category-item.inactive {
            background-color: var(--toggle-color-container-inactive);
        }

        .eprivacy-modal-category-container .eprivacy-modal-category-item h3 {
            font-weight: 500;
            font-size: 1rem;
            line-height: 24px;
            color: var(--text-color-secondary);
            margin: 0px;
            display: flex;
            flex-grow: 1;
            align-content: start;
            text-transform:capitalize;
        }

        .eprivacy-modal-category-item .eprivacy-modal-category-item-description {
            font-size: 0.75rem;
            margin-top: 16px;
            font-weight: 400;
            color: var(--text-color-secondary);
            line-height:22px;
        }

        .eprivacy-modal-button-container {
            clear: both;
            padding: 24px;
            white-space: nowrap;
            float: right;
        }

        .eprivacy-modal-button-container .secondary-banner-button {
            margin-right: 1em;
        }

        .eprivacy-backdrop {
            width: 100%;
            height: 100%;
            background-color: rgba(0,0,0, 0.5);
            z-index: 99999998;
            position: fixed;
            left: 0;
            top: 0;
            display: none;
        }
        /*desktop updated */
        .eprivacy-banner-actions-container{
          align-items:center;
        }
        /* smaller screens - 1360px */
        @media(max-width:1360px){
          .eprivacy-banner-actions-container{
            flex-direction: column;
          }

          .eprivacy-banner-content-container{
            margin-right:0;
            margin-bottom: 10px;
            padding-right: 10px;
          }

          .eprivacy-banner-actions-container .secondary-button, 
          .eprivacy-modal-button-container .secondary-banner-button {
            margin-right: 0;
          }

          .eprivacy-banner-actions-container .secondary-banner-button,
          .eprivacy-banner-actions-container .secondary-button,
          .eprivacy-modal-button-container .secondary-banner-button{
              margin-bottom: 1em;
          }

          .eprivacy-banner-actions-container button {
            width: 100%;
          }
        }
        /* ipad/tablet/mobile screens - 991px > 479px */
        @media(max-width:991px){
          .eprivacy-banner-container {
            width: 100%;
            padding: 1em 0;
            flex-direction: row;
            max-width: 100vw;
            transform: none;
            left: 0;
          }

          .eprivacy-banner-content-container {
            padding: 0 1em;
          }

          .eprivacy-banner-actions-container {
            flex-wrap: wrap;
            justify-content: flex-end;
            margin-left: 1rem;
            padding: 0 1em;
          }

          .eprivacy-banner-actions-container .secondary-banner-button,
          .eprivacy-banner-actions-container .secondary-button {
              margin-right: 0;
          }

          .eprivacy-banner-actions-container button {
            width: 100%;
          }
        }
        @media(max-width:479px){
          .eprivacy-banner-container{
            width: 100%;
            flex-wrap: wrap;
            border-radius: 0;
            position: fixed;
            bottom: 0;
            left: 0;
            transform: unset;
          }
          .eprivacy-banner-actions-container{
            width: 100%;
            flex-direction: row;
            flex-wrap: nowrap;
            justify-content: space-around;
            align-items: center;
            white-space:normal;
            margin-left: 0;
          }
          .eprivacy-modal-button-container button,
          .eprivacy-banner-actions-container button{
            height:auto;
            width: calc(50% - 1rem); 
            padding-left: 0;
            padding-right: 0;
          }
          .eprivacy-banner-actions-container .secondary-banner-button,
          .eprivacy-banner-actions-container .secondary-button,
          .eprivacy-modal-button-container .secondary-banner-button{
              margin: 0;
          }
          .eprivacy-modal-container {
            top: 0;
            transform: translate(-50%, 0);
            width: 100%;
            z-index: 999999991;
            max-height: 100%;
            overflow-y: scroll;
          }
          .eprivacy-modal-button-container{
            display:flex;
            justify-content: space-around;
            white-space:normal;
            padding:16px;
            float: none;
          }
          .eprivacy-modal-button-container button{
            padding-right:15px;
            padding-left:15px;
          }
          .eprivacy-modal-category-container .eprivacy-modal-category-item{
            padding:16px;
          }
          .eprivacy-modal-container .eprivacy-modal-subheader,
          .eprivacy-modal-container .eprivacy-modal-header{
            padding-left:16px;
            padding-right:16px;
          }
        }

        @media (max-width: 991px) and (orientation: landscape) and (-webkit-min-device-pixel-ratio: 2)  {
          .eprivacy-modal-container {
            left: 0;
            top: 0;
            transform: none;
            width: 100vw;
            height: 100vh;
            max-width:100%;
            max-height: 100vh;
          }
 
          .eprivacy-modal-button-container .secondary-banner-button {
            margin-right: 1rem;
          }
        }

        .arabic .eprivacy-banner-content-container {
          text-align: right;
          direction: rtl;
          font-family: webfont, Scheherazade, "Al Bayan", "Traditional Arabic", sans-serif;
        }
    `;

    const styleSheetCollection = document.querySelectorAll('style');
    const css = [...styleSheetCollection].find((styleSheet) => styleSheet.id == "e-privacy-styles");

    if(css) {
      document.head.removeChild(css);
    }

    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.id = "e-privacy-styles";
    styleSheet.innerText = styles;
    document.head.appendChild(styleSheet);
  };
}

// Define the new element
customElements.define("e-privacy", EPrivacyHtmlElement);