var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
var _a, _b;
import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import React, { Component, createContext, useState, useEffect, useContext, useRef, useCallback, useMemo } from "react";
import { hydrateRoot } from "react-dom/client";
import { useNavigate, Link, useLocation, useSearchParams, useParams, Routes, Route, Navigate, BrowserRouter } from "react-router-dom";
import fastCompare from "react-fast-compare";
import invariant from "invariant";
import shallowEqual from "shallowequal";
import { createClient, AuthError } from "@supabase/supabase-js";
import { Phone, Facebook, Twitter, Instagram, Linkedin, Mail, MapPin, TrendingUp, Plane, X, Edit2, Calendar, ChevronLeft, ChevronRight, Loader2, Users, ChevronDown, Minus, Plus, Search, ArrowRight, Award, Clock, Shield, ArrowLeft, Filter, MessageCircle, AlertCircle, Check, Copy, AlertTriangle, RefreshCw, Sunrise, Sun, Sunset, Moon, Euro, ChevronUp, Star, ArrowDownAZ, Hotel, CheckCircle, Info, HelpCircle, FileText, Cookie, Globe, Briefcase, Calculator, Lock, User, Tag, ExternalLink, Key, XCircle, Trash2, Save, BarChart, RotateCcw, Settings, Database, Table, Code, GitBranch, List, Layout, Beaker, Bug, Share2, Book, Upload, GripVertical, Download, DollarSign, Percent, LogOut, BookOpen, UserPlus } from "lucide-react";
import { v4 } from "uuid";
import { format, subMonths, isBefore, startOfMonth, addMonths, isAfter, endOfMonth, eachDayOfInterval, isSameDay, isToday, parseISO, isValid } from "date-fns";
import { createPortal } from "react-dom";
import axios from "axios";
import Papa from "papaparse";
var TAG_NAMES = /* @__PURE__ */ ((TAG_NAMES2) => {
  TAG_NAMES2["BASE"] = "base";
  TAG_NAMES2["BODY"] = "body";
  TAG_NAMES2["HEAD"] = "head";
  TAG_NAMES2["HTML"] = "html";
  TAG_NAMES2["LINK"] = "link";
  TAG_NAMES2["META"] = "meta";
  TAG_NAMES2["NOSCRIPT"] = "noscript";
  TAG_NAMES2["SCRIPT"] = "script";
  TAG_NAMES2["STYLE"] = "style";
  TAG_NAMES2["TITLE"] = "title";
  TAG_NAMES2["FRAGMENT"] = "Symbol(react.fragment)";
  return TAG_NAMES2;
})(TAG_NAMES || {});
var SEO_PRIORITY_TAGS = {
  link: { rel: ["amphtml", "canonical", "alternate"] },
  script: { type: ["application/ld+json"] },
  meta: {
    charset: "",
    name: ["generator", "robots", "description"],
    property: [
      "og:type",
      "og:title",
      "og:url",
      "og:image",
      "og:image:alt",
      "og:description",
      "twitter:url",
      "twitter:title",
      "twitter:description",
      "twitter:image",
      "twitter:image:alt",
      "twitter:card",
      "twitter:site"
    ]
  }
};
var VALID_TAG_NAMES = Object.values(TAG_NAMES);
var REACT_TAG_MAP = {
  accesskey: "accessKey",
  charset: "charSet",
  class: "className",
  contenteditable: "contentEditable",
  contextmenu: "contextMenu",
  "http-equiv": "httpEquiv",
  itemprop: "itemProp",
  tabindex: "tabIndex"
};
var HTML_TAG_MAP = Object.entries(REACT_TAG_MAP).reduce(
  (carry, [key, value]) => {
    carry[value] = key;
    return carry;
  },
  {}
);
var HELMET_ATTRIBUTE = "data-rh";
var HELMET_PROPS = {
  DEFAULT_TITLE: "defaultTitle",
  DEFER: "defer",
  ENCODE_SPECIAL_CHARACTERS: "encodeSpecialCharacters",
  ON_CHANGE_CLIENT_STATE: "onChangeClientState",
  TITLE_TEMPLATE: "titleTemplate",
  PRIORITIZE_SEO_TAGS: "prioritizeSeoTags"
};
var getInnermostProperty = (propsList, property) => {
  for (let i = propsList.length - 1; i >= 0; i -= 1) {
    const props = propsList[i];
    if (Object.prototype.hasOwnProperty.call(props, property)) {
      return props[property];
    }
  }
  return null;
};
var getTitleFromPropsList = (propsList) => {
  let innermostTitle = getInnermostProperty(
    propsList,
    "title"
    /* TITLE */
  );
  const innermostTemplate = getInnermostProperty(propsList, HELMET_PROPS.TITLE_TEMPLATE);
  if (Array.isArray(innermostTitle)) {
    innermostTitle = innermostTitle.join("");
  }
  if (innermostTemplate && innermostTitle) {
    return innermostTemplate.replace(/%s/g, () => innermostTitle);
  }
  const innermostDefaultTitle = getInnermostProperty(propsList, HELMET_PROPS.DEFAULT_TITLE);
  return innermostTitle || innermostDefaultTitle || void 0;
};
var getOnChangeClientState = (propsList) => getInnermostProperty(propsList, HELMET_PROPS.ON_CHANGE_CLIENT_STATE) || (() => {
});
var getAttributesFromPropsList = (tagType, propsList) => propsList.filter((props) => typeof props[tagType] !== "undefined").map((props) => props[tagType]).reduce((tagAttrs, current) => ({ ...tagAttrs, ...current }), {});
var getBaseTagFromPropsList = (primaryAttributes, propsList) => propsList.filter((props) => typeof props[
  "base"
  /* BASE */
] !== "undefined").map((props) => props[
  "base"
  /* BASE */
]).reverse().reduce((innermostBaseTag, tag) => {
  if (!innermostBaseTag.length) {
    const keys = Object.keys(tag);
    for (let i = 0; i < keys.length; i += 1) {
      const attributeKey = keys[i];
      const lowerCaseAttributeKey = attributeKey.toLowerCase();
      if (primaryAttributes.indexOf(lowerCaseAttributeKey) !== -1 && tag[lowerCaseAttributeKey]) {
        return innermostBaseTag.concat(tag);
      }
    }
  }
  return innermostBaseTag;
}, []);
var warn = (msg) => console && typeof console.warn === "function" && console.warn(msg);
var getTagsFromPropsList = (tagName, primaryAttributes, propsList) => {
  const approvedSeenTags = {};
  return propsList.filter((props) => {
    if (Array.isArray(props[tagName])) {
      return true;
    }
    if (typeof props[tagName] !== "undefined") {
      warn(
        `Helmet: ${tagName} should be of type "Array". Instead found type "${typeof props[tagName]}"`
      );
    }
    return false;
  }).map((props) => props[tagName]).reverse().reduce((approvedTags, instanceTags) => {
    const instanceSeenTags = {};
    instanceTags.filter((tag) => {
      let primaryAttributeKey;
      const keys2 = Object.keys(tag);
      for (let i = 0; i < keys2.length; i += 1) {
        const attributeKey = keys2[i];
        const lowerCaseAttributeKey = attributeKey.toLowerCase();
        if (primaryAttributes.indexOf(lowerCaseAttributeKey) !== -1 && !(primaryAttributeKey === "rel" && tag[primaryAttributeKey].toLowerCase() === "canonical") && !(lowerCaseAttributeKey === "rel" && tag[lowerCaseAttributeKey].toLowerCase() === "stylesheet")) {
          primaryAttributeKey = lowerCaseAttributeKey;
        }
        if (primaryAttributes.indexOf(attributeKey) !== -1 && (attributeKey === "innerHTML" || attributeKey === "cssText" || attributeKey === "itemprop")) {
          primaryAttributeKey = attributeKey;
        }
      }
      if (!primaryAttributeKey || !tag[primaryAttributeKey]) {
        return false;
      }
      const value = tag[primaryAttributeKey].toLowerCase();
      if (!approvedSeenTags[primaryAttributeKey]) {
        approvedSeenTags[primaryAttributeKey] = {};
      }
      if (!instanceSeenTags[primaryAttributeKey]) {
        instanceSeenTags[primaryAttributeKey] = {};
      }
      if (!approvedSeenTags[primaryAttributeKey][value]) {
        instanceSeenTags[primaryAttributeKey][value] = true;
        return true;
      }
      return false;
    }).reverse().forEach((tag) => approvedTags.push(tag));
    const keys = Object.keys(instanceSeenTags);
    for (let i = 0; i < keys.length; i += 1) {
      const attributeKey = keys[i];
      const tagUnion = {
        ...approvedSeenTags[attributeKey],
        ...instanceSeenTags[attributeKey]
      };
      approvedSeenTags[attributeKey] = tagUnion;
    }
    return approvedTags;
  }, []).reverse();
};
var getAnyTrueFromPropsList = (propsList, checkedTag) => {
  if (Array.isArray(propsList) && propsList.length) {
    for (let index = 0; index < propsList.length; index += 1) {
      const prop = propsList[index];
      if (prop[checkedTag]) {
        return true;
      }
    }
  }
  return false;
};
var reducePropsToState = (propsList) => ({
  baseTag: getBaseTagFromPropsList([
    "href"
    /* HREF */
  ], propsList),
  bodyAttributes: getAttributesFromPropsList("bodyAttributes", propsList),
  defer: getInnermostProperty(propsList, HELMET_PROPS.DEFER),
  encode: getInnermostProperty(propsList, HELMET_PROPS.ENCODE_SPECIAL_CHARACTERS),
  htmlAttributes: getAttributesFromPropsList("htmlAttributes", propsList),
  linkTags: getTagsFromPropsList(
    "link",
    [
      "rel",
      "href"
      /* HREF */
    ],
    propsList
  ),
  metaTags: getTagsFromPropsList(
    "meta",
    [
      "name",
      "charset",
      "http-equiv",
      "property",
      "itemprop"
      /* ITEM_PROP */
    ],
    propsList
  ),
  noscriptTags: getTagsFromPropsList("noscript", [
    "innerHTML"
    /* INNER_HTML */
  ], propsList),
  onChangeClientState: getOnChangeClientState(propsList),
  scriptTags: getTagsFromPropsList(
    "script",
    [
      "src",
      "innerHTML"
      /* INNER_HTML */
    ],
    propsList
  ),
  styleTags: getTagsFromPropsList("style", [
    "cssText"
    /* CSS_TEXT */
  ], propsList),
  title: getTitleFromPropsList(propsList),
  titleAttributes: getAttributesFromPropsList("titleAttributes", propsList),
  prioritizeSeoTags: getAnyTrueFromPropsList(propsList, HELMET_PROPS.PRIORITIZE_SEO_TAGS)
});
var flattenArray = (possibleArray) => Array.isArray(possibleArray) ? possibleArray.join("") : possibleArray;
var checkIfPropsMatch = (props, toMatch) => {
  const keys = Object.keys(props);
  for (let i = 0; i < keys.length; i += 1) {
    if (toMatch[keys[i]] && toMatch[keys[i]].includes(props[keys[i]])) {
      return true;
    }
  }
  return false;
};
var prioritizer = (elementsList, propsToMatch) => {
  if (Array.isArray(elementsList)) {
    return elementsList.reduce(
      (acc, elementAttrs) => {
        if (checkIfPropsMatch(elementAttrs, propsToMatch)) {
          acc.priority.push(elementAttrs);
        } else {
          acc.default.push(elementAttrs);
        }
        return acc;
      },
      { priority: [], default: [] }
    );
  }
  return { default: elementsList, priority: [] };
};
var without = (obj, key) => {
  return {
    ...obj,
    [key]: void 0
  };
};
var SELF_CLOSING_TAGS = [
  "noscript",
  "script",
  "style"
  /* STYLE */
];
var encodeSpecialCharacters = (str, encode = true) => {
  if (encode === false) {
    return String(str);
  }
  return String(str).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#x27;");
};
var generateElementAttributesAsString = (attributes) => Object.keys(attributes).reduce((str, key) => {
  const attr = typeof attributes[key] !== "undefined" ? `${key}="${attributes[key]}"` : `${key}`;
  return str ? `${str} ${attr}` : attr;
}, "");
var generateTitleAsString = (type, title, attributes, encode) => {
  const attributeString = generateElementAttributesAsString(attributes);
  const flattenedTitle = flattenArray(title);
  return attributeString ? `<${type} ${HELMET_ATTRIBUTE}="true" ${attributeString}>${encodeSpecialCharacters(
    flattenedTitle,
    encode
  )}</${type}>` : `<${type} ${HELMET_ATTRIBUTE}="true">${encodeSpecialCharacters(
    flattenedTitle,
    encode
  )}</${type}>`;
};
var generateTagsAsString = (type, tags, encode = true) => tags.reduce((str, t) => {
  const tag = t;
  const attributeHtml = Object.keys(tag).filter(
    (attribute) => !(attribute === "innerHTML" || attribute === "cssText")
  ).reduce((string, attribute) => {
    const attr = typeof tag[attribute] === "undefined" ? attribute : `${attribute}="${encodeSpecialCharacters(tag[attribute], encode)}"`;
    return string ? `${string} ${attr}` : attr;
  }, "");
  const tagContent = tag.innerHTML || tag.cssText || "";
  const isSelfClosing = SELF_CLOSING_TAGS.indexOf(type) === -1;
  return `${str}<${type} ${HELMET_ATTRIBUTE}="true" ${attributeHtml}${isSelfClosing ? `/>` : `>${tagContent}</${type}>`}`;
}, "");
var convertElementAttributesToReactProps = (attributes, initProps = {}) => Object.keys(attributes).reduce((obj, key) => {
  const mapped = REACT_TAG_MAP[key];
  obj[mapped || key] = attributes[key];
  return obj;
}, initProps);
var generateTitleAsReactComponent = (_type, title, attributes) => {
  const initProps = {
    key: title,
    [HELMET_ATTRIBUTE]: true
  };
  const props = convertElementAttributesToReactProps(attributes, initProps);
  return [React.createElement("title", props, title)];
};
var generateTagsAsReactComponent = (type, tags) => tags.map((tag, i) => {
  const mappedTag = {
    key: i,
    [HELMET_ATTRIBUTE]: true
  };
  Object.keys(tag).forEach((attribute) => {
    const mapped = REACT_TAG_MAP[attribute];
    const mappedAttribute = mapped || attribute;
    if (mappedAttribute === "innerHTML" || mappedAttribute === "cssText") {
      const content = tag.innerHTML || tag.cssText;
      mappedTag.dangerouslySetInnerHTML = { __html: content };
    } else {
      mappedTag[mappedAttribute] = tag[attribute];
    }
  });
  return React.createElement(type, mappedTag);
});
var getMethodsForTag = (type, tags, encode = true) => {
  switch (type) {
    case "title":
      return {
        toComponent: () => generateTitleAsReactComponent(type, tags.title, tags.titleAttributes),
        toString: () => generateTitleAsString(type, tags.title, tags.titleAttributes, encode)
      };
    case "bodyAttributes":
    case "htmlAttributes":
      return {
        toComponent: () => convertElementAttributesToReactProps(tags),
        toString: () => generateElementAttributesAsString(tags)
      };
    default:
      return {
        toComponent: () => generateTagsAsReactComponent(type, tags),
        toString: () => generateTagsAsString(type, tags, encode)
      };
  }
};
var getPriorityMethods = ({ metaTags, linkTags, scriptTags, encode }) => {
  const meta = prioritizer(metaTags, SEO_PRIORITY_TAGS.meta);
  const link = prioritizer(linkTags, SEO_PRIORITY_TAGS.link);
  const script = prioritizer(scriptTags, SEO_PRIORITY_TAGS.script);
  const priorityMethods = {
    toComponent: () => [
      ...generateTagsAsReactComponent("meta", meta.priority),
      ...generateTagsAsReactComponent("link", link.priority),
      ...generateTagsAsReactComponent("script", script.priority)
    ],
    toString: () => (
      // generate all the tags as strings and concatenate them
      `${getMethodsForTag("meta", meta.priority, encode)} ${getMethodsForTag(
        "link",
        link.priority,
        encode
      )} ${getMethodsForTag("script", script.priority, encode)}`
    )
  };
  return {
    priorityMethods,
    metaTags: meta.default,
    linkTags: link.default,
    scriptTags: script.default
  };
};
var mapStateOnServer = (props) => {
  const {
    baseTag,
    bodyAttributes,
    encode = true,
    htmlAttributes,
    noscriptTags,
    styleTags,
    title = "",
    titleAttributes,
    prioritizeSeoTags
  } = props;
  let { linkTags, metaTags, scriptTags } = props;
  let priorityMethods = {
    toComponent: () => {
    },
    toString: () => ""
  };
  if (prioritizeSeoTags) {
    ({ priorityMethods, linkTags, metaTags, scriptTags } = getPriorityMethods(props));
  }
  return {
    priority: priorityMethods,
    base: getMethodsForTag("base", baseTag, encode),
    bodyAttributes: getMethodsForTag("bodyAttributes", bodyAttributes, encode),
    htmlAttributes: getMethodsForTag("htmlAttributes", htmlAttributes, encode),
    link: getMethodsForTag("link", linkTags, encode),
    meta: getMethodsForTag("meta", metaTags, encode),
    noscript: getMethodsForTag("noscript", noscriptTags, encode),
    script: getMethodsForTag("script", scriptTags, encode),
    style: getMethodsForTag("style", styleTags, encode),
    title: getMethodsForTag("title", { title, titleAttributes }, encode)
  };
};
var server_default = mapStateOnServer;
var instances = [];
var isDocument = !!(typeof window !== "undefined" && window.document && window.document.createElement);
var HelmetData = class {
  constructor(context, canUseDOM) {
    __publicField(this, "instances", []);
    __publicField(this, "canUseDOM", isDocument);
    __publicField(this, "context");
    __publicField(this, "value", {
      setHelmet: (serverState) => {
        this.context.helmet = serverState;
      },
      helmetInstances: {
        get: () => this.canUseDOM ? instances : this.instances,
        add: (instance) => {
          (this.canUseDOM ? instances : this.instances).push(instance);
        },
        remove: (instance) => {
          const index = (this.canUseDOM ? instances : this.instances).indexOf(instance);
          (this.canUseDOM ? instances : this.instances).splice(index, 1);
        }
      }
    });
    this.context = context;
    this.canUseDOM = canUseDOM || false;
    if (!canUseDOM) {
      context.helmet = server_default({
        baseTag: [],
        bodyAttributes: {},
        encodeSpecialCharacters: true,
        htmlAttributes: {},
        linkTags: [],
        metaTags: [],
        noscriptTags: [],
        scriptTags: [],
        styleTags: [],
        title: "",
        titleAttributes: {}
      });
    }
  }
};
var defaultValue = {};
var Context = React.createContext(defaultValue);
var HelmetProvider = (_a = class extends Component {
  constructor(props) {
    super(props);
    __publicField(this, "helmetData");
    this.helmetData = new HelmetData(this.props.context || {}, _a.canUseDOM);
  }
  render() {
    return /* @__PURE__ */ React.createElement(Context.Provider, { value: this.helmetData.value }, this.props.children);
  }
}, __publicField(_a, "canUseDOM", isDocument), _a);
var updateTags = (type, tags) => {
  const headElement = document.head || document.querySelector(
    "head"
    /* HEAD */
  );
  const tagNodes = headElement.querySelectorAll(`${type}[${HELMET_ATTRIBUTE}]`);
  const oldTags = [].slice.call(tagNodes);
  const newTags = [];
  let indexToDelete;
  if (tags && tags.length) {
    tags.forEach((tag) => {
      const newElement = document.createElement(type);
      for (const attribute in tag) {
        if (Object.prototype.hasOwnProperty.call(tag, attribute)) {
          if (attribute === "innerHTML") {
            newElement.innerHTML = tag.innerHTML;
          } else if (attribute === "cssText") {
            if (newElement.styleSheet) {
              newElement.styleSheet.cssText = tag.cssText;
            } else {
              newElement.appendChild(document.createTextNode(tag.cssText));
            }
          } else {
            const attr = attribute;
            const value = typeof tag[attr] === "undefined" ? "" : tag[attr];
            newElement.setAttribute(attribute, value);
          }
        }
      }
      newElement.setAttribute(HELMET_ATTRIBUTE, "true");
      if (oldTags.some((existingTag, index) => {
        indexToDelete = index;
        return newElement.isEqualNode(existingTag);
      })) {
        oldTags.splice(indexToDelete, 1);
      } else {
        newTags.push(newElement);
      }
    });
  }
  oldTags.forEach((tag) => {
    var _a2;
    return (_a2 = tag.parentNode) == null ? void 0 : _a2.removeChild(tag);
  });
  newTags.forEach((tag) => headElement.appendChild(tag));
  return {
    oldTags,
    newTags
  };
};
var updateAttributes = (tagName, attributes) => {
  const elementTag = document.getElementsByTagName(tagName)[0];
  if (!elementTag) {
    return;
  }
  const helmetAttributeString = elementTag.getAttribute(HELMET_ATTRIBUTE);
  const helmetAttributes = helmetAttributeString ? helmetAttributeString.split(",") : [];
  const attributesToRemove = [...helmetAttributes];
  const attributeKeys = Object.keys(attributes);
  for (const attribute of attributeKeys) {
    const value = attributes[attribute] || "";
    if (elementTag.getAttribute(attribute) !== value) {
      elementTag.setAttribute(attribute, value);
    }
    if (helmetAttributes.indexOf(attribute) === -1) {
      helmetAttributes.push(attribute);
    }
    const indexToSave = attributesToRemove.indexOf(attribute);
    if (indexToSave !== -1) {
      attributesToRemove.splice(indexToSave, 1);
    }
  }
  for (let i = attributesToRemove.length - 1; i >= 0; i -= 1) {
    elementTag.removeAttribute(attributesToRemove[i]);
  }
  if (helmetAttributes.length === attributesToRemove.length) {
    elementTag.removeAttribute(HELMET_ATTRIBUTE);
  } else if (elementTag.getAttribute(HELMET_ATTRIBUTE) !== attributeKeys.join(",")) {
    elementTag.setAttribute(HELMET_ATTRIBUTE, attributeKeys.join(","));
  }
};
var updateTitle = (title, attributes) => {
  if (typeof title !== "undefined" && document.title !== title) {
    document.title = flattenArray(title);
  }
  updateAttributes("title", attributes);
};
var commitTagChanges = (newState, cb) => {
  const {
    baseTag,
    bodyAttributes,
    htmlAttributes,
    linkTags,
    metaTags,
    noscriptTags,
    onChangeClientState,
    scriptTags,
    styleTags,
    title,
    titleAttributes
  } = newState;
  updateAttributes("body", bodyAttributes);
  updateAttributes("html", htmlAttributes);
  updateTitle(title, titleAttributes);
  const tagUpdates = {
    baseTag: updateTags("base", baseTag),
    linkTags: updateTags("link", linkTags),
    metaTags: updateTags("meta", metaTags),
    noscriptTags: updateTags("noscript", noscriptTags),
    scriptTags: updateTags("script", scriptTags),
    styleTags: updateTags("style", styleTags)
  };
  const addedTags = {};
  const removedTags = {};
  Object.keys(tagUpdates).forEach((tagType) => {
    const { newTags, oldTags } = tagUpdates[tagType];
    if (newTags.length) {
      addedTags[tagType] = newTags;
    }
    if (oldTags.length) {
      removedTags[tagType] = tagUpdates[tagType].oldTags;
    }
  });
  if (cb) {
    cb();
  }
  onChangeClientState(newState, addedTags, removedTags);
};
var _helmetCallback = null;
var handleStateChangeOnClient = (newState) => {
  if (_helmetCallback) {
    cancelAnimationFrame(_helmetCallback);
  }
  if (newState.defer) {
    _helmetCallback = requestAnimationFrame(() => {
      commitTagChanges(newState, () => {
        _helmetCallback = null;
      });
    });
  } else {
    commitTagChanges(newState);
    _helmetCallback = null;
  }
};
var client_default = handleStateChangeOnClient;
var HelmetDispatcher = class extends Component {
  constructor() {
    super(...arguments);
    __publicField(this, "rendered", false);
  }
  shouldComponentUpdate(nextProps) {
    return !shallowEqual(nextProps, this.props);
  }
  componentDidUpdate() {
    this.emitChange();
  }
  componentWillUnmount() {
    const { helmetInstances } = this.props.context;
    helmetInstances.remove(this);
    this.emitChange();
  }
  emitChange() {
    const { helmetInstances, setHelmet } = this.props.context;
    let serverState = null;
    const state = reducePropsToState(
      helmetInstances.get().map((instance) => {
        const props = { ...instance.props };
        delete props.context;
        return props;
      })
    );
    if (HelmetProvider.canUseDOM) {
      client_default(state);
    } else if (server_default) {
      serverState = server_default(state);
    }
    setHelmet(serverState);
  }
  // componentWillMount will be deprecated
  // for SSR, initialize on first render
  // constructor is also unsafe in StrictMode
  init() {
    if (this.rendered) {
      return;
    }
    this.rendered = true;
    const { helmetInstances } = this.props.context;
    helmetInstances.add(this);
    this.emitChange();
  }
  render() {
    this.init();
    return null;
  }
};
var Helmet = (_b = class extends Component {
  shouldComponentUpdate(nextProps) {
    return !fastCompare(without(this.props, "helmetData"), without(nextProps, "helmetData"));
  }
  mapNestedChildrenToProps(child, nestedChildren) {
    if (!nestedChildren) {
      return null;
    }
    switch (child.type) {
      case "script":
      case "noscript":
        return {
          innerHTML: nestedChildren
        };
      case "style":
        return {
          cssText: nestedChildren
        };
      default:
        throw new Error(
          `<${child.type} /> elements are self-closing and can not contain children. Refer to our API for more information.`
        );
    }
  }
  flattenArrayTypeChildren(child, arrayTypeChildren, newChildProps, nestedChildren) {
    return {
      ...arrayTypeChildren,
      [child.type]: [
        ...arrayTypeChildren[child.type] || [],
        {
          ...newChildProps,
          ...this.mapNestedChildrenToProps(child, nestedChildren)
        }
      ]
    };
  }
  mapObjectTypeChildren(child, newProps, newChildProps, nestedChildren) {
    switch (child.type) {
      case "title":
        return {
          ...newProps,
          [child.type]: nestedChildren,
          titleAttributes: { ...newChildProps }
        };
      case "body":
        return {
          ...newProps,
          bodyAttributes: { ...newChildProps }
        };
      case "html":
        return {
          ...newProps,
          htmlAttributes: { ...newChildProps }
        };
      default:
        return {
          ...newProps,
          [child.type]: { ...newChildProps }
        };
    }
  }
  mapArrayTypeChildrenToProps(arrayTypeChildren, newProps) {
    let newFlattenedProps = { ...newProps };
    Object.keys(arrayTypeChildren).forEach((arrayChildName) => {
      newFlattenedProps = {
        ...newFlattenedProps,
        [arrayChildName]: arrayTypeChildren[arrayChildName]
      };
    });
    return newFlattenedProps;
  }
  warnOnInvalidChildren(child, nestedChildren) {
    invariant(
      VALID_TAG_NAMES.some((name) => child.type === name),
      typeof child.type === "function" ? `You may be attempting to nest <Helmet> components within each other, which is not allowed. Refer to our API for more information.` : `Only elements types ${VALID_TAG_NAMES.join(
        ", "
      )} are allowed. Helmet does not support rendering <${child.type}> elements. Refer to our API for more information.`
    );
    invariant(
      !nestedChildren || typeof nestedChildren === "string" || Array.isArray(nestedChildren) && !nestedChildren.some((nestedChild) => typeof nestedChild !== "string"),
      `Helmet expects a string as a child of <${child.type}>. Did you forget to wrap your children in braces? ( <${child.type}>{\`\`}</${child.type}> ) Refer to our API for more information.`
    );
    return true;
  }
  mapChildrenToProps(children, newProps) {
    let arrayTypeChildren = {};
    React.Children.forEach(children, (child) => {
      if (!child || !child.props) {
        return;
      }
      const { children: nestedChildren, ...childProps } = child.props;
      const newChildProps = Object.keys(childProps).reduce((obj, key) => {
        obj[HTML_TAG_MAP[key] || key] = childProps[key];
        return obj;
      }, {});
      let { type } = child;
      if (typeof type === "symbol") {
        type = type.toString();
      } else {
        this.warnOnInvalidChildren(child, nestedChildren);
      }
      switch (type) {
        case "Symbol(react.fragment)":
          newProps = this.mapChildrenToProps(nestedChildren, newProps);
          break;
        case "link":
        case "meta":
        case "noscript":
        case "script":
        case "style":
          arrayTypeChildren = this.flattenArrayTypeChildren(
            child,
            arrayTypeChildren,
            newChildProps,
            nestedChildren
          );
          break;
        default:
          newProps = this.mapObjectTypeChildren(child, newProps, newChildProps, nestedChildren);
          break;
      }
    });
    return this.mapArrayTypeChildrenToProps(arrayTypeChildren, newProps);
  }
  render() {
    const { children, ...props } = this.props;
    let newProps = { ...props };
    let { helmetData } = props;
    if (children) {
      newProps = this.mapChildrenToProps(children, newProps);
    }
    if (helmetData && !(helmetData instanceof HelmetData)) {
      const data = helmetData;
      helmetData = new HelmetData(data.context, true);
      delete newProps.helmetData;
    }
    return helmetData ? /* @__PURE__ */ React.createElement(HelmetDispatcher, { ...newProps, context: helmetData.value }) : /* @__PURE__ */ React.createElement(Context.Consumer, null, (context) => /* @__PURE__ */ React.createElement(HelmetDispatcher, { ...newProps, context }));
  }
}, __publicField(_b, "defaultProps", {
  defer: true,
  encodeSpecialCharacters: true,
  prioritizeSeoTags: false
}), _b);
const supabaseUrl$1 = "https://aoagsticdrptxxrldast.supabase.co";
const supabaseAnonKey$1 = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFvYWdzdGljZHJwdHh4cmxkYXN0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk5NzY0NjgsImV4cCI6MjA1NTU1MjQ2OH0.rFqjJnrEGbwWL0Hv7pL3daMBsE5w4bCy4q6RoDfN_WY";
const isBrowser$1 = typeof window !== "undefined";
const supabase$1 = createClient(supabaseUrl$1, supabaseAnonKey$1, {
  auth: {
    persistSession: isBrowser$1,
    autoRefreshToken: isBrowser$1,
    detectSessionInUrl: isBrowser$1,
    storage: isBrowser$1 ? {
      getItem: (key) => {
        try {
          const itemStr = localStorage.getItem(key);
          if (!itemStr) return null;
          const item = JSON.parse(itemStr);
          const now = /* @__PURE__ */ new Date();
          if (item.expires && new Date(item.expires) < now) {
            localStorage.removeItem(key);
            return null;
          }
          return item.value;
        } catch (err) {
          console.error("Error reading auth storage:", err);
          localStorage.removeItem(key);
          return null;
        }
      },
      setItem: (key, value) => {
        try {
          const item = {
            value,
            expires: new Date(Date.now() + 12 * 60 * 60 * 1e3)
            // 12 hours
          };
          localStorage.setItem(key, JSON.stringify(item));
        } catch (err) {
          console.error("Error writing to auth storage:", err);
          try {
            localStorage.removeItem(key);
          } catch (cleanupErr) {
            console.error("Error cleaning up storage:", cleanupErr);
          }
        }
      },
      removeItem: (key) => {
        try {
          localStorage.removeItem(key);
        } catch (err) {
          console.error("Error removing from auth storage:", err);
        }
      }
    } : void 0
  },
  realtime: {
    params: {
      eventsPerSecond: 2
    }
  },
  global: {
    headers: {
      "x-application-name": "flight-finder"
    },
    fetch: (url, options = {}) => {
      const fetchWithRetry = async (retriesLeft) => {
        try {
          const response = await fetch(url, {
            ...options,
            // Add timeout
            signal: AbortSignal.timeout(3e4)
            // 30 second timeout
          });
          if (!response.ok && retriesLeft > 0) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response;
        } catch (error) {
          if (retriesLeft === 0) throw error;
          const delay = Math.min(1e3 * 2 ** (3 - retriesLeft), 8e3);
          await new Promise((resolve) => setTimeout(resolve, delay));
          return fetchWithRetry(retriesLeft - 1);
        }
      };
      return fetchWithRetry(3);
    }
  },
  db: {
    schema: "public"
  }
});
async function withErrorHandling(operation, fallback, errorMessage = "Operation failed", maxRetries = 3, retryDelay = 2e3) {
  let retries = 0;
  while (retries < maxRetries) {
    try {
      return await operation();
    } catch (error) {
      retries++;
      console.error(
        `${errorMessage} (Attempt ${retries}/${maxRetries}):`,
        error
      );
      const shouldRetry = error instanceof Error && (error.message.includes("Failed to fetch") || error.message.includes("timeout") || error.message.includes("network") || error.message.includes("connection") || error.message.includes("session_not_found") || error.message.includes("JWT expired"));
      if (shouldRetry && retries < maxRetries) {
        await new Promise(
          (resolve) => setTimeout(resolve, retryDelay * retries)
        );
        if (error.message.includes("session_not_found") || error.message.includes("JWT expired")) {
          try {
            const {
              data: { session },
              error: refreshError
            } = await supabase$1.auth.refreshSession();
            if (!refreshError && session) {
              console.log("Successfully refreshed session");
            }
          } catch (refreshError) {
            console.error("Failed to refresh session:", refreshError);
          }
        }
        continue;
      }
      return fallback;
    }
  }
  return fallback;
}
if (isBrowser$1) {
  supabase$1.auth.onAuthStateChange((event, session) => {
    if (event === "SIGNED_OUT" || event === "USER_DELETED") {
      localStorage.removeItem("supabase.auth.token");
      sessionStorage.removeItem("supabase.auth.token");
    } else if (event === "TOKEN_REFRESHED") {
      console.log("Auth token refreshed successfully");
    }
  });
  setInterval(
    async () => {
      const {
        data: { session },
        error
      } = await supabase$1.auth.getSession();
      if (session && !error) {
        await supabase$1.auth.refreshSession();
      }
    },
    10 * 60 * 1e3
  );
}
const AuthContext = createContext({
  user: null,
  loading: true,
  signOut: async () => {
  },
  error: null
});
function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const { data: { session }, error: sessionError } = await supabase$1.auth.getSession();
        if (sessionError) {
          if (sessionError.message.includes("session_not_found")) {
            await supabase$1.auth.signOut();
            setUser(null);
          } else {
            console.error("Session error:", sessionError);
            setError(sessionError);
          }
        } else {
          setUser((session == null ? void 0 : session.user) ?? null);
        }
        setLoading(false);
        const { data: { subscription } } = supabase$1.auth.onAuthStateChange(async (event, session2) => {
          if (event === "SIGNED_OUT" || event === "USER_DELETED") {
            setUser(null);
            localStorage.removeItem("supabase.auth.token");
            sessionStorage.removeItem("supabase.auth.token");
          } else if (event === "SIGNED_IN" || event === "TOKEN_REFRESHED") {
            setUser((session2 == null ? void 0 : session2.user) ?? null);
          }
          setLoading(false);
          setError(null);
        });
        return () => {
          subscription.unsubscribe();
        };
      } catch (err) {
        console.error("Auth initialization error:", err);
        setLoading(false);
        if (err instanceof Error) {
          setError(err);
        }
      }
    };
    initializeAuth();
  }, []);
  const signOut = async () => {
    try {
      const { data: { session } } = await supabase$1.auth.getSession();
      if (session) {
        const { error: signOutError } = await supabase$1.auth.signOut();
        if (signOutError) throw signOutError;
      }
      localStorage.removeItem("supabase.auth.token");
      sessionStorage.removeItem("supabase.auth.token");
      setUser(null);
      setError(null);
    } catch (err) {
      console.error("Sign out error:", err);
      if (err instanceof Error) {
        setError(err);
      }
    }
  };
  return /* @__PURE__ */ jsx(AuthContext.Provider, { value: { user, loading, signOut, error }, children: !loading && children });
}
const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === void 0) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
function Navbar() {
  const navigate = useNavigate();
  return /* @__PURE__ */ jsx("nav", { className: "bg-white shadow-sm", children: /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center h-16", children: [
    /* @__PURE__ */ jsx(
      "button",
      {
        onClick: () => navigate("/home"),
        className: "flex justify-center items-center",
        children: /* @__PURE__ */ jsx(
          "img",
          {
            alt: "logo",
            src: "https://himatravel.com/wp-content/uploads/2020/11/logo-768x277.png",
            className: "h-10 w-auto object-contain"
          }
        )
      }
    ),
    /* @__PURE__ */ jsxs(
      "a",
      {
        href: "tel:+3550695161381",
        className: "group flex items-center gap-2 px-4 py-1.5 bg-gradient-to-r from-green-600 to-green-500 \n              text-white rounded-lg hover:from-green-700 hover:to-green-600 transition-all duration-300\n              transform hover:scale-[1.02] hover:shadow-md active:scale-[0.98] active:shadow-sm",
        children: [
          /* @__PURE__ */ jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsx(Phone, { className: "w-4 h-4" }),
            /* @__PURE__ */ jsx("div", { className: "absolute inset-0 rounded-full animate-ping opacity-75 bg-white" })
          ] }),
          /* @__PURE__ */ jsx("span", { className: "font-medium tracking-wide group-hover:tracking-wider transition-all duration-300 text-sm", children: "+355 069 516 1381" })
        ]
      }
    )
  ] }) }) });
}
function GlobalFooter() {
  const currentYear = (/* @__PURE__ */ new Date()).getFullYear();
  return /* @__PURE__ */ jsx("footer", { className: "bg-white border-t border-gray-100", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 py-12", children: [
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold mb-4", children: /* @__PURE__ */ jsx("div", { className: "relative w-full h-[70px]", children: /* @__PURE__ */ jsx("img", { alt: "logo", src: "https://himatravel.com/wp-content/uploads/2020/11/logo-768x277.png", className: "max-w-[200px] absolute -left-7" }) }) }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-600 text-sm mb-4", children: "Agjencia juaj e besuar për bileta avioni dhe shërbime turistike që nga viti 2011." }),
        /* @__PURE__ */ jsxs("div", { className: "flex space-x-4", children: [
          /* @__PURE__ */ jsx("a", { href: "https://facebook.com", target: "_blank", rel: "noopener noreferrer", className: "text-gray-400 hover:text-blue-600 transition-colors", children: /* @__PURE__ */ jsx(Facebook, { className: "w-5 h-5" }) }),
          /* @__PURE__ */ jsx("a", { href: "https://twitter.com", target: "_blank", rel: "noopener noreferrer", className: "text-gray-400 hover:text-blue-400 transition-colors", children: /* @__PURE__ */ jsx(Twitter, { className: "w-5 h-5" }) }),
          /* @__PURE__ */ jsx("a", { href: "https://instagram.com", target: "_blank", rel: "noopener noreferrer", className: "text-gray-400 hover:text-pink-600 transition-colors", children: /* @__PURE__ */ jsx(Instagram, { className: "w-5 h-5" }) }),
          /* @__PURE__ */ jsx("a", { href: "https://linkedin.com", target: "_blank", rel: "noopener noreferrer", className: "text-gray-400 hover:text-blue-700 transition-colors", children: /* @__PURE__ */ jsx(Linkedin, { className: "w-5 h-5" }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h4", { className: "text-gray-900 font-semibold mb-4", children: "Lidhje të Shpejta" }),
        /* @__PURE__ */ jsxs("ul", { className: "space-y-2", children: [
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "/about", className: "text-gray-600 hover:text-blue-600 text-sm transition-colors", children: "Rreth Nesh" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "/contact", className: "text-gray-600 hover:text-blue-600 text-sm transition-colors", children: "Na Kontaktoni" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "/careers", className: "text-gray-600 hover:text-blue-600 text-sm transition-colors", children: "Karriera" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "/sitemap", className: "text-gray-600 hover:text-blue-600 text-sm transition-colors", children: "Sitemap" }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h4", { className: "text-gray-900 font-semibold mb-4", children: "Mbështetje" }),
        /* @__PURE__ */ jsxs("ul", { className: "space-y-2", children: [
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "/contact", className: "text-gray-600 hover:text-blue-600 text-sm transition-colors", children: "Na Kontaktoni" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "/privacy", className: "text-gray-600 hover:text-blue-600 text-sm transition-colors", children: "Privatësia" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "/terms", className: "text-gray-600 hover:text-blue-600 text-sm transition-colors", children: "Kushtet e Përdorimit" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "/cookies", className: "text-gray-600 hover:text-blue-600 text-sm transition-colors", children: "Politika e Cookies" }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h4", { className: "text-gray-900 font-semibold mb-4", children: "Kontakt" }),
        /* @__PURE__ */ jsxs("ul", { className: "space-y-3", children: [
          /* @__PURE__ */ jsxs("li", { className: "flex items-center text-sm text-gray-600", children: [
            /* @__PURE__ */ jsx(Phone, { className: "w-4 h-4 mr-2 text-blue-600" }),
            /* @__PURE__ */ jsx("a", { href: "tel:+355694767427", className: "hover:text-blue-600 transition-colors", children: "+355 694 767 427" })
          ] }),
          /* @__PURE__ */ jsxs("li", { className: "flex items-center text-sm text-gray-600", children: [
            /* @__PURE__ */ jsx(Mail, { className: "w-4 h-4 mr-2 text-blue-600" }),
            /* @__PURE__ */ jsx("a", { href: "mailto:kontakt@himatravel.com", className: "hover:text-blue-600 transition-colors", children: "kontakt@himatravel.com" })
          ] }),
          /* @__PURE__ */ jsxs("li", { className: "flex items-start text-sm text-gray-600", children: [
            /* @__PURE__ */ jsx(MapPin, { className: "w-4 h-4 mr-2 mt-1 text-blue-600 flex-shrink-0" }),
            /* @__PURE__ */ jsx("span", { children: "Tiranë, Tek kryqëzimi i Rrugës Muhamet Gjollesha me Myslym Shyrin" })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "pt-8 border-t border-gray-100", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row justify-between items-center gap-4", children: [
      /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-600", children: [
        "© 2011 - ",
        currentYear,
        " Hima Travel. Të gjitha të drejtat e rezervuara."
      ] }),
      /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500 text-center md:text-right", children: "Çmimet dhe disponueshmëria mund të ndryshojnë. Mund të aplikohen kushte shtesë." })
    ] }) })
  ] }) });
}
function HeroSection({ children }) {
  return /* @__PURE__ */ jsxs("div", { className: "relative min-h-screen flex flex-col items-center justify-center px-4 py-16", children: [
    /* @__PURE__ */ jsx(
      "div",
      {
        className: "absolute inset-0 bg-center bg-cover z-0",
        style: {
          backgroundImage: "url('https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?ixlib=rb-1.2.1&auto=format&fit=crop&w=3000&q=80')"
        },
        children: /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-blue-900/30 backdrop-blur-[2px]" })
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "relative z-10 w-full max-w-4xl mx-auto text-center mb-8", children: /* @__PURE__ */ jsx("h1", { className: "text-4xl md:text-5xl font-bold text-white mb-4", children: "Kombinime unike fluturimesh me çmime të pakrahasueshme!" }) }),
    /* @__PURE__ */ jsx("div", { className: "relative z-10 w-full", children })
  ] });
}
function TripTypeSelector({ tripType, onTripTypeChange }) {
  return /* @__PURE__ */ jsxs("div", { className: "inline-flex rounded-lg border border-gray-200 bg-white", children: [
    /* @__PURE__ */ jsx(
      "button",
      {
        className: `px-3 py-2 text-sm font-medium rounded-l-lg ${tripType === "roundTrip" ? "bg-blue-600 text-white" : "text-gray-700 hover:text-gray-900 hover:bg-gray-50"}`,
        onClick: () => onTripTypeChange("roundTrip"),
        children: "Vajtje/Ardhje"
      }
    ),
    /* @__PURE__ */ jsx(
      "button",
      {
        className: `px-3 py-2 text-sm font-medium rounded-r-lg ${tripType === "oneWay" ? "bg-blue-600 text-white" : "text-gray-700 hover:text-gray-900 hover:bg-gray-50"}`,
        onClick: () => onTripTypeChange("oneWay"),
        children: "Vajtje"
      }
    )
  ] });
}
async function searchAirports(query, currentAirport) {
  try {
    const { data, error } = await supabase$1.rpc("search_airports_with_demand", {
      search_query: query,
      current_airport: currentAirport
    });
    if (error) throw error;
    return (data || []).map((airport) => ({
      name: `${airport.name} (${airport.iata_code})`,
      code: airport.iata_code,
      country: airport.state
    }));
  } catch (err) {
    console.error("Error searching airports:", err);
    return [];
  }
}
async function getPopularAirports(currentAirport) {
  try {
    const { data, error } = await supabase$1.from("route_demand_tracking").select(`
        origin,
        destination,
        search_count,
        airports!route_demand_tracking_origin_fkey (
          name,
          city,
          state,
          iata_code
        ),
        destination_airport:airports!route_demand_tracking_destination_fkey (
          name,
          city,
          state,
          iata_code
        )
      `).order("search_count", { ascending: false }).limit(10);
    if (error) throw error;
    if (currentAirport) {
      const relevantRoutes = data.filter(
        (route) => route.origin === currentAirport || route.destination === currentAirport
      ).map((route) => {
        const airport = route.origin === currentAirport ? route.destination_airport : route.airports;
        return {
          name: `${airport.name} (${airport.iata_code})`,
          code: airport.iata_code,
          country: airport.state
        };
      });
      return relevantRoutes;
    }
    const uniqueAirports = /* @__PURE__ */ new Map();
    data.forEach((route) => {
      if (!uniqueAirports.has(route.origin)) {
        uniqueAirports.set(route.origin, {
          name: `${route.airports.name} (${route.airports.iata_code})`,
          code: route.airports.iata_code,
          country: route.airports.state
        });
      }
      if (!uniqueAirports.has(route.destination)) {
        uniqueAirports.set(route.destination, {
          name: `${route.destination_airport.name} (${route.destination_airport.iata_code})`,
          code: route.destination_airport.iata_code,
          country: route.destination_airport.state
        });
      }
    });
    return Array.from(uniqueAirports.values());
  } catch (err) {
    console.error("Error fetching popular airports:", err);
    return [];
  }
}
function CityInput({
  value,
  onChange,
  placeholder,
  icon: Icon,
  label,
  otherAirport,
  excludeCity
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState(value);
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const wrapperRef = useRef(null);
  useEffect(() => {
    setInputValue(value);
  }, [value]);
  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  const loadPopularRoutes = async () => {
    if (!isSearching) {
      setLoading(true);
      try {
        let popularCities = await getPopularAirports(otherAirport);
        if (excludeCity) {
          popularCities = popularCities.filter((city) => city.code !== excludeCity.code);
        }
        setCities(popularCities);
      } catch (err) {
        console.error("Error loading popular routes:", err);
      } finally {
        setLoading(false);
      }
    }
  };
  useEffect(() => {
    const timer = setTimeout(async () => {
      if (inputValue.length >= 2) {
        setLoading(true);
        setIsSearching(true);
        try {
          let results = await searchAirports(
            inputValue.includes("(") ? inputValue.slice(0, inputValue.indexOf("(") - 1) : inputValue,
            otherAirport
          );
          if (excludeCity) {
            results = results.filter((city) => city.code !== excludeCity.code);
          }
          setCities(results);
          if (!inputValue.includes("(")) setIsOpen(true);
          else setIsOpen(false);
        } catch (err) {
          console.error("Error searching airports:", err);
          setCities([]);
        } finally {
          setLoading(false);
          setIsSearching(false);
        }
      } else if (inputValue.length === 0) {
        setIsSearching(false);
        loadPopularRoutes();
      } else {
        setCities([]);
        setIsSearching(false);
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [inputValue, otherAirport]);
  const handleInputFocus = () => {
    if (inputValue.length >= 2) {
      setIsOpen(true);
    } else {
      setIsOpen(true);
      loadPopularRoutes();
    }
  };
  const handleCitySelect = (city) => {
    setInputValue(`${city.name}`);
    onChange(city);
    setIsOpen(false);
    setCities([]);
  };
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    if (e.target.value.length < 2) {
      setIsOpen(false);
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: "relative", ref: wrapperRef, children: [
    /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: label }),
    /* @__PURE__ */ jsxs("div", { className: "relative", children: [
      /* @__PURE__ */ jsx(Icon, { className: "absolute left-3 top-3 text-gray-400", size: 20 }),
      /* @__PURE__ */ jsx(
        "input",
        {
          type: "text",
          className: "w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500",
          placeholder,
          value: inputValue,
          onChange: handleInputChange,
          onFocus: handleInputFocus
        }
      ),
      loading && /* @__PURE__ */ jsx("div", { className: "absolute right-3 top-3", children: /* @__PURE__ */ jsx("div", { className: "animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500" }) })
    ] }),
    isOpen && cities.length > 0 && /* @__PURE__ */ jsxs("div", { className: "absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto", children: [
      !isSearching && /* @__PURE__ */ jsx("div", { className: "px-4 py-2 bg-gray-50 border-b border-gray-100", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-sm text-gray-600", children: [
        /* @__PURE__ */ jsx(TrendingUp, { className: "w-4 h-4" }),
        /* @__PURE__ */ jsx("span", { children: "Destinacionet më të kërkuara" })
      ] }) }),
      cities.map((city) => /* @__PURE__ */ jsxs(
        "button",
        {
          className: "w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center justify-between",
          onClick: () => handleCitySelect(city),
          children: [
            /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("span", { className: "font-medium", children: city.name }) }),
            /* @__PURE__ */ jsx("span", { className: "text-gray-400 text-sm", children: city.country })
          ]
        },
        city.code
      ))
    ] }),
    isOpen && !loading && cities.length === 0 && /* @__PURE__ */ jsx("div", { className: "absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg p-4 text-center text-gray-500", children: "Nuk u gjetën aeroporte" })
  ] });
}
function LocationInputs({
  fromCity,
  setFromCity,
  toCity,
  setToCity
}) {
  return /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
    /* @__PURE__ */ jsx(
      CityInput,
      {
        value: (fromCity == null ? void 0 : fromCity.name) || "",
        onChange: (city) => {
          setFromCity(city);
          if ((toCity == null ? void 0 : toCity.code) === city.code) {
            setToCity(null);
          }
        },
        placeholder: "Nisja Nga?",
        icon: MapPin,
        label: "Nga"
      }
    ),
    /* @__PURE__ */ jsx(
      CityInput,
      {
        value: (toCity == null ? void 0 : toCity.name) || "",
        onChange: (city) => setToCity(city),
        placeholder: "Per Ku?",
        icon: Plane,
        label: "Per",
        excludeCity: fromCity
      }
    )
  ] });
}
async function getCalendarPrices(origin, destination, yearMonth, tripType = "oneWay", isReturn = false) {
  var _a2, _b2, _c;
  try {
    const { data, error } = await supabase$1.from("calendar_prices").select("*").eq("origin", origin).eq("destination", destination).eq("year_month", yearMonth).maybeSingle();
    if (error) throw error;
    const { data: shouldUpdate } = await supabase$1.rpc("should_update_calendar_prices", {
      p_origin: origin,
      p_destination: destination,
      p_year_month: yearMonth
    });
    if (!shouldUpdate && data) {
      const simplePriceGrid2 = {};
      for (const [date, priceData] of Object.entries(data.price_grid)) {
        if (typeof priceData === "object" && "price" in priceData) {
          simplePriceGrid2[date] = priceData.price;
        }
      }
      const { data: adjustedPrices2 } = await supabase$1.rpc("get_calendar_final_prices", {
        p_base_prices: simplePriceGrid2,
        p_trip_type: tripType,
        p_is_return: isReturn
      });
      const finalPriceGrid2 = {};
      for (const [date, price] of Object.entries(adjustedPrices2 || {})) {
        finalPriceGrid2[date] = {
          price: Number(price),
          isDirect: ((_a2 = data.price_grid[date]) == null ? void 0 : _a2.isDirect) || false
        };
      }
      return {
        origin: data.origin,
        destination: data.destination,
        yearMonth: data.year_month,
        priceGrid: finalPriceGrid2,
        lastUpdate: data.last_update,
        hasDirectFlight: data.has_direct_flight
      };
    }
    const response = await fetch(
      `https://sky-scanner3.p.rapidapi.com/flights/price-calendar-web?fromEntityId=${origin}&toEntityId=${destination}&yearMonth=${yearMonth}`,
      {
        method: "GET",
        headers: {
          "x-rapidapi-host": "sky-scanner3.p.rapidapi.com",
          "x-rapidapi-key": "eff37b01a1msh6090de6dea39514p108435jsnf7c09e43a0a5"
        }
      }
    );
    if (!response.ok) {
      throw new Error(`API request failed: ${response.statusText}`);
    }
    const responseData = await response.json();
    if (!responseData.status || !responseData.data) {
      throw new Error("Invalid API response format: Missing status or data");
    }
    if (!((_b2 = responseData.data.PriceGrids) == null ? void 0 : _b2.Grid)) {
      throw new Error("Invalid API response format: Missing price grid data");
    }
    const { priceGrid, hasDirectFlight } = processGridData(responseData.data.PriceGrids.Grid, yearMonth);
    const simplePriceGrid = {};
    for (const [date, priceData] of Object.entries(priceGrid)) {
      simplePriceGrid[date] = priceData.price;
    }
    const { data: adjustedPrices } = await supabase$1.rpc("get_calendar_final_prices", {
      p_base_prices: simplePriceGrid,
      p_trip_type: tripType,
      p_is_return: isReturn
    });
    const finalPriceGrid = {};
    for (const [date, price] of Object.entries(adjustedPrices || {})) {
      finalPriceGrid[date] = {
        price: Number(price),
        isDirect: ((_c = priceGrid[date]) == null ? void 0 : _c.isDirect) || false
      };
    }
    const { error: upsertError } = await supabase$1.from("calendar_prices").upsert({
      origin,
      destination,
      year_month: yearMonth,
      price_grid: priceGrid,
      has_direct_flight: hasDirectFlight,
      last_update: (/* @__PURE__ */ new Date()).toISOString()
    }, {
      onConflict: "origin,destination,year_month"
    });
    if (upsertError) {
      console.error("Error saving prices:", upsertError);
      return null;
    }
    return {
      origin,
      destination,
      yearMonth,
      priceGrid: finalPriceGrid,
      lastUpdate: (/* @__PURE__ */ new Date()).toISOString(),
      hasDirectFlight
    };
  } catch (error) {
    console.error("Error fetching calendar prices:", error);
    return null;
  }
}
function processGridData(grid, yearMonth) {
  const priceGrid = {};
  let hasDirectFlight = false;
  if (!Array.isArray(grid) || grid.length === 0 || !Array.isArray(grid[0])) {
    console.warn("Invalid grid format received");
    return { priceGrid, hasDirectFlight };
  }
  grid[0].forEach((dayData, index) => {
    if (!dayData) return;
    const day = (index + 1).toString().padStart(2, "0");
    const date = `${yearMonth}-${day}`;
    try {
      if (dayData.DirectOutboundAvailable === true && dayData.DirectOutbound && typeof dayData.DirectOutbound.Price === "number" && dayData.DirectOutbound.Price > 0) {
        hasDirectFlight = true;
        priceGrid[date] = {
          price: dayData.DirectOutbound.Price,
          isDirect: true
        };
      } else if (dayData.Direct && typeof dayData.Direct.Price === "number" && dayData.Direct.Price > 0) {
        priceGrid[date] = {
          price: dayData.Direct.Price,
          isDirect: false
        };
      } else if (dayData.Indirect && typeof dayData.Indirect.Price === "number" && dayData.Indirect.Price > 0) {
        priceGrid[date] = {
          price: dayData.Indirect.Price,
          isDirect: false
        };
      }
    } catch (err) {
      console.warn(`Error processing price for ${date}:`, err);
    }
  });
  return { priceGrid, hasDirectFlight };
}
function MobileDatePickerModal({
  isOpen,
  onClose,
  tripType,
  departureDate,
  returnDate,
  onDepartureDateChange,
  onReturnDateChange,
  onTripTypeChange,
  fromCode,
  toCode
}) {
  const [currentMonth, setCurrentMonth] = useState(/* @__PURE__ */ new Date());
  const [selectingReturn, setSelectingReturn] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [departurePrices, setDeparturePrices] = useState({});
  const [returnPrices, setReturnPrices] = useState({});
  const [loadingPrices, setLoadingPrices] = useState(false);
  const [priceError, setPriceError] = useState(null);
  useEffect(() => {
    if (isOpen) {
      setIsClosing(false);
      setSelectingReturn(tripType === "roundTrip" && departureDate !== null && returnDate === null);
      setCurrentMonth(departureDate || returnDate || /* @__PURE__ */ new Date());
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen, departureDate, returnDate, tripType]);
  useEffect(() => {
    const fetchPrices = async () => {
      if (!fromCode || !toCode || !isOpen) return;
      setLoadingPrices(true);
      setPriceError(null);
      try {
        const yearMonth = format(currentMonth, "yyyy-MM");
        const [departureData, returnData] = await Promise.all([
          getCalendarPrices(fromCode, toCode, yearMonth, tripType, false),
          tripType === "roundTrip" ? getCalendarPrices(toCode, fromCode, yearMonth, tripType, true) : null
        ]);
        if (departureData) {
          setDeparturePrices(departureData.priceGrid);
        }
        if (returnData) {
          setReturnPrices(returnData.priceGrid);
        }
      } catch (err) {
        console.error("Error fetching prices:", err);
        setPriceError("Failed to load prices");
      } finally {
        setLoadingPrices(false);
      }
    };
    if (isOpen && fromCode && toCode) {
      fetchPrices();
    }
  }, [currentMonth, fromCode, toCode, isOpen, tripType]);
  const handleClose = useCallback(() => {
    setIsClosing(true);
    const timer = setTimeout(() => {
      onClose();
      setIsClosing(false);
    }, 300);
    return () => clearTimeout(timer);
  }, [onClose]);
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };
    if (isOpen) {
      window.addEventListener("keydown", handleEscape);
      return () => window.removeEventListener("keydown", handleEscape);
    }
  }, [isOpen, handleClose]);
  const handleDateSelect = (date) => {
    if (isBefore(date, /* @__PURE__ */ new Date()) || isAfter(date, addMonths(/* @__PURE__ */ new Date(), 12))) return;
    if (!selectingReturn) {
      onDepartureDateChange(false, date);
      if (returnDate && isBefore(returnDate, date)) {
        onReturnDateChange(true, null);
      }
      if (!returnDate) {
        setSelectingReturn(true);
        setCurrentMonth(date);
      }
    } else {
      if (!departureDate || !isBefore(date, departureDate)) {
        onReturnDateChange(true, date);
      }
    }
  };
  const handleTripTypeChange = (type) => {
    onTripTypeChange(type);
    if (type === "oneWay") {
      onReturnDateChange(true, null);
      setSelectingReturn(false);
    } else {
      setSelectingReturn(departureDate !== null && returnDate === null);
    }
  };
  const handleDateHeaderClick = (isReturn) => {
    if (tripType === "roundTrip") {
      setSelectingReturn(isReturn);
      setCurrentMonth(isReturn ? returnDate || departureDate || /* @__PURE__ */ new Date() : departureDate || /* @__PURE__ */ new Date());
    }
  };
  const getPrice = (date) => {
    return selectingReturn ? returnPrices[date] : departurePrices[date];
  };
  const getTotalPrice = () => {
    var _a2, _b2;
    let total = 0;
    if (departureDate) {
      const departureDateStr = format(departureDate, "yyyy-MM-dd");
      total += ((_a2 = departurePrices[departureDateStr]) == null ? void 0 : _a2.price) || 0;
    }
    if (tripType === "roundTrip" && returnDate) {
      const returnDateStr = format(returnDate, "yyyy-MM-dd");
      total += ((_b2 = returnPrices[returnDateStr]) == null ? void 0 : _b2.price) || 0;
    }
    return total || null;
  };
  const getCurrentPrice = () => {
    var _a2, _b2;
    if (selectingReturn && returnDate) {
      const returnDateStr = format(returnDate, "yyyy-MM-dd");
      return ((_a2 = returnPrices[returnDateStr]) == null ? void 0 : _a2.price) || null;
    } else if (!selectingReturn && departureDate) {
      const departureDateStr = format(departureDate, "yyyy-MM-dd");
      return ((_b2 = departurePrices[departureDateStr]) == null ? void 0 : _b2.price) || null;
    }
    return null;
  };
  const handleClearDates = () => {
    onDepartureDateChange(false, null);
    onReturnDateChange(true, null);
    setSelectingReturn(false);
  };
  if (!isOpen) return null;
  const renderCalendarDays = () => {
    const start = startOfMonth(currentMonth);
    const end = endOfMonth(currentMonth);
    const days = eachDayOfInterval({ start, end });
    const emptyCells = Array(start.getDay() === 0 ? 6 : start.getDay() - 1).fill(null);
    return /* @__PURE__ */ jsxs(Fragment, { children: [
      emptyCells.map((_, index) => /* @__PURE__ */ jsx("div", { className: "h-10 md:h-14" }, `empty-${index}`)),
      days.map((date) => {
        const dateStr = format(date, "yyyy-MM-dd");
        const priceData = getPrice(dateStr);
        const isSelectedDeparture = departureDate && isSameDay(date, departureDate);
        const isSelectedReturn = returnDate && isSameDay(date, returnDate);
        const isSelected = selectingReturn ? isSelectedReturn : isSelectedDeparture;
        const isDisabled = isBefore(date, /* @__PURE__ */ new Date()) || isAfter(date, addMonths(/* @__PURE__ */ new Date(), 12)) || selectingReturn && departureDate && isBefore(date, departureDate);
        const isInRange = departureDate && returnDate && isAfter(date, departureDate) && isBefore(date, returnDate);
        return /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => !isDisabled && handleDateSelect(date),
            disabled: isDisabled,
            className: `
                relative h-10 md:h-14 rounded-lg transition-all duration-200
                ${isDisabled ? "text-gray-300 cursor-not-allowed" : isSelectedDeparture ? "bg-blue-600 text-white shadow-md scale-105" : isSelectedReturn ? "bg-blue-600 text-white shadow-md scale-105" : isInRange ? "bg-blue-50" : "hover:bg-gray-50 active:scale-95"}
              `,
            children: /* @__PURE__ */ jsxs("div", { className: "absolute inset-0 flex flex-col items-center justify-center", children: [
              /* @__PURE__ */ jsx("span", { className: `text-sm ${isToday(date) ? "font-bold" : ""}`, children: format(date, "d") }),
              loadingPrices ? /* @__PURE__ */ jsx(Loader2, { className: "w-3 h-3 animate-spin text-gray-400" }) : priceData ? /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center", children: [
                /* @__PURE__ */ jsxs("span", { className: `text-xs ${isSelected ? "text-blue-100" : isDisabled ? "text-gray-300" : "text-blue-600"}`, children: [
                  priceData.price,
                  "€"
                ] }),
                /* @__PURE__ */ jsx("div", { className: `w-2 h-2 rounded-full mt-0.5 ${priceData.isDirect ? "bg-green-500" : "bg-orange-500"}` })
              ] }) : /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-400", children: "--" })
            ] })
          },
          dateStr
        );
      })
    ] });
  };
  return createPortal(
    /* @__PURE__ */ jsxs("div", { className: "fixed inset-0 z-50 flex items-end md:items-center justify-center", children: [
      /* @__PURE__ */ jsx(
        "div",
        {
          className: `fixed inset-0 bg-black bg-opacity-50 modal-backdrop ${isClosing ? "closing" : ""}`,
          onClick: handleClose
        }
      ),
      /* @__PURE__ */ jsxs(
        "div",
        {
          className: `
          relative w-full md:w-auto md:min-w-[600px] bg-white rounded-t-2xl md:rounded-xl shadow-xl
          flex flex-col h-[85vh] md:h-auto md:max-h-[85vh]
          modal-content ${isClosing ? "closing" : ""}
        `,
          children: [
            /* @__PURE__ */ jsxs("div", { className: "flex-none px-4 pt-4 pb-2 border-b border-gray-200", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-4", children: [
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    onClick: handleClose,
                    className: "p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors",
                    children: /* @__PURE__ */ jsx(X, { className: "w-6 h-6" })
                  }
                ),
                /* @__PURE__ */ jsxs("div", { className: "inline-flex rounded-lg border border-gray-200 bg-white", children: [
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      onClick: () => handleTripTypeChange("roundTrip"),
                      className: `px-4 py-2 text-sm font-medium rounded-l-lg ${tripType === "roundTrip" ? "bg-blue-600 text-white" : "text-gray-700 hover:text-gray-900 hover:bg-gray-50"}`,
                      children: "Round Trip"
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      onClick: () => handleTripTypeChange("oneWay"),
                      className: `px-4 py-2 text-sm font-medium rounded-r-lg ${tripType === "oneWay" ? "bg-blue-600 text-white" : "text-gray-700 hover:text-gray-900 hover:bg-gray-50"}`,
                      children: "One Way"
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxs(
                  "div",
                  {
                    onClick: () => handleDateHeaderClick(false),
                    className: `w-full flex items-center justify-between bg-gray-50 p-3 rounded-lg cursor-pointer ${!selectingReturn && "ring-2 ring-blue-500"}`,
                    children: [
                      /* @__PURE__ */ jsxs("div", { children: [
                        /* @__PURE__ */ jsx("div", { className: "text-sm text-gray-500", children: "Departure date" }),
                        /* @__PURE__ */ jsxs("div", { className: "font-medium flex items-center", children: [
                          departureDate ? format(departureDate, "dd MMM yyyy") : "Select date",
                          /* @__PURE__ */ jsx(Edit2, { className: "w-4 h-4 ml-2 text-blue-600" })
                        ] })
                      ] }),
                      departureDate && /* @__PURE__ */ jsx(
                        "div",
                        {
                          onClick: (e) => {
                            e.stopPropagation();
                            handleClearDates();
                          },
                          className: "p-1 hover:bg-gray-200 rounded-full cursor-pointer",
                          children: /* @__PURE__ */ jsx(Calendar, { className: "w-4 h-4" })
                        }
                      )
                    ]
                  }
                ),
                tripType === "roundTrip" && /* @__PURE__ */ jsxs(
                  "div",
                  {
                    onClick: () => handleDateHeaderClick(true),
                    className: `w-full flex items-center justify-between bg-gray-50 p-3 rounded-lg cursor-pointer ${selectingReturn && "ring-2 ring-blue-500"}`,
                    children: [
                      /* @__PURE__ */ jsxs("div", { children: [
                        /* @__PURE__ */ jsx("div", { className: "text-sm text-gray-500", children: "Return date" }),
                        /* @__PURE__ */ jsxs("div", { className: "font-medium flex items-center", children: [
                          returnDate ? format(returnDate, "dd MMM yyyy") : "Select date",
                          /* @__PURE__ */ jsx(Edit2, { className: "w-4 h-4 ml-2 text-blue-600" })
                        ] })
                      ] }),
                      returnDate && /* @__PURE__ */ jsx(
                        "div",
                        {
                          onClick: (e) => {
                            e.stopPropagation();
                            onReturnDateChange(true, null);
                            setSelectingReturn(true);
                          },
                          className: "p-1 hover:bg-gray-200 rounded-full cursor-pointer",
                          children: /* @__PURE__ */ jsx(Calendar, { className: "w-4 h-4" })
                        }
                      )
                    ]
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex-1 overflow-y-auto px-4 py-2", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-4", children: [
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    onClick: () => setCurrentMonth(subMonths(currentMonth, 1)),
                    disabled: isBefore(startOfMonth(currentMonth), startOfMonth(/* @__PURE__ */ new Date())),
                    className: "p-2 hover:bg-gray-100 rounded-full disabled:opacity-50",
                    children: /* @__PURE__ */ jsx(ChevronLeft, { className: "w-5 h-5" })
                  }
                ),
                /* @__PURE__ */ jsx("div", { className: "text-lg font-semibold", children: format(currentMonth, "MMMM yyyy") }),
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    onClick: () => setCurrentMonth(addMonths(currentMonth, 1)),
                    disabled: isAfter(startOfMonth(currentMonth), startOfMonth(addMonths(/* @__PURE__ */ new Date(), 11))),
                    className: "p-2 hover:bg-gray-100 rounded-full disabled:opacity-50",
                    children: /* @__PURE__ */ jsx(ChevronRight, { className: "w-5 h-5" })
                  }
                )
              ] }),
              /* @__PURE__ */ jsx("div", { className: "grid grid-cols-7 gap-1 mb-2", children: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => /* @__PURE__ */ jsx("div", { className: "text-center text-xs text-gray-500", children: day }, day)) }),
              /* @__PURE__ */ jsx("div", { className: "grid grid-cols-7 gap-1", children: renderCalendarDays() }),
              /* @__PURE__ */ jsxs("div", { className: "mt-4 flex items-center justify-center gap-6 text-sm text-gray-600", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsx("div", { className: "w-2 h-2 rounded-full bg-green-500" }),
                  /* @__PURE__ */ jsx("span", { children: "Direct Flight" })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsx("div", { className: "w-2 h-2 rounded-full bg-orange-500" }),
                  /* @__PURE__ */ jsx("span", { children: "With Stops" })
                ] })
              ] }),
              priceError && /* @__PURE__ */ jsx("div", { className: "mt-4 p-2 bg-yellow-50 border border-yellow-200 rounded-lg text-sm text-yellow-700", children: priceError })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex-none border-t border-gray-200 p-4 bg-white", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-4", children: [
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("div", { className: "text-sm text-gray-500", children: tripType === "roundTrip" && returnDate ? "Total price" : selectingReturn ? "Return flight" : "Departure flight" }),
                  /* @__PURE__ */ jsx("div", { className: "text-sm text-gray-500", children: "price/person" })
                ] }),
                /* @__PURE__ */ jsx("div", { className: "text-xl font-bold text-blue-600", children: loadingPrices ? /* @__PURE__ */ jsx(Loader2, { className: "w-6 h-6 animate-spin" }) : selectingReturn ? getCurrentPrice() ? `${getCurrentPrice()}€` : "--" : getTotalPrice() ? `${getTotalPrice()}€` : "--" })
              ] }),
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: handleClose,
                  className: "w-full py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 active:bg-blue-800 transition-colors",
                  children: "Done"
                }
              )
            ] })
          ]
        }
      )
    ] }),
    document.body
  );
}
function DatePickers({
  tripType,
  departureDate,
  returnDate,
  onDepartureDateChange,
  onReturnDateChange,
  onTripTypeChange,
  fromCode,
  toCode
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleDateClick = useCallback(() => {
    setIsModalOpen(true);
  }, []);
  const handleModalClose = useCallback(() => {
    setIsModalOpen(false);
  }, []);
  const handleDateChange = useCallback((isReturn, date) => {
    if (isReturn) {
      onReturnDateChange(date);
    } else {
      onDepartureDateChange(date);
    }
  }, [onDepartureDateChange, onReturnDateChange]);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Data Nisjes" }),
        /* @__PURE__ */ jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsx(Calendar, { className: "absolute left-3 top-3 text-gray-400", size: 20 }),
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              onClick: handleDateClick,
              className: "w-full pl-10 pr-3 py-2 text-left border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white",
              children: departureDate ? format(departureDate, "dd MMM yyyy") : "Zgjidhni daten e nisjes"
            }
          )
        ] })
      ] }),
      tripType === "roundTrip" && /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Data Kthimit" }),
        /* @__PURE__ */ jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsx(Calendar, { className: "absolute left-3 top-3 text-gray-400", size: 20 }),
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              onClick: handleDateClick,
              className: "w-full pl-10 pr-3 py-2 text-left border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white",
              children: returnDate ? format(returnDate, "dd MMM yyyy") : "Zgjidhni Daten e kthimit"
            }
          )
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx(
      MobileDatePickerModal,
      {
        isOpen: isModalOpen,
        onClose: handleModalClose,
        tripType,
        departureDate,
        returnDate,
        onDepartureDateChange: handleDateChange,
        onReturnDateChange: handleDateChange,
        onTripTypeChange,
        fromCode,
        toCode
      }
    )
  ] });
}
function PassengerSelector({ passengers, onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  const getTotalPassengers = () => {
    const adults = Number(passengers.adults) || 0;
    const children = Number(passengers.children) || 0;
    const infants = Number(passengers.infants) || 0;
    return adults + children + infants;
  };
  const updatePassengers = (type, delta) => {
    const newValue = Math.max(0, (Number(passengers[type]) || 0) + delta);
    if (type === "adults" && newValue === 0) return;
    onChange({
      ...passengers,
      [type]: newValue
    });
  };
  const PassengerTypeControl = ({
    type,
    label,
    value,
    minValue = 0
  }) => /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between py-2", children: [
    /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-700", children: label }),
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          onClick: () => updatePassengers(type, -1),
          disabled: value <= minValue,
          className: `p-1 rounded-full ${value <= minValue ? "text-gray-300 cursor-not-allowed" : "text-gray-600 hover:bg-gray-100"}`,
          children: /* @__PURE__ */ jsx(Minus, { className: "w-4 h-4" })
        }
      ),
      /* @__PURE__ */ jsx("span", { className: "w-4 text-center text-sm font-medium", children: value }),
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          onClick: () => updatePassengers(type, 1),
          className: "p-1 rounded-full text-gray-600 hover:bg-gray-100",
          children: /* @__PURE__ */ jsx(Plus, { className: "w-4 h-4" })
        }
      )
    ] })
  ] });
  return /* @__PURE__ */ jsxs("div", { className: "relative", ref: dropdownRef, children: [
    /* @__PURE__ */ jsxs(
      "button",
      {
        type: "button",
        onClick: () => setIsOpen(!isOpen),
        className: "w-full flex items-center justify-between px-2 py-2 text-sm border border-gray-200 rounded-lg bg-white hover:bg-gray-50",
        children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1", children: [
            /* @__PURE__ */ jsx(Users, { className: "w-4 h-4 text-gray-400" }),
            /* @__PURE__ */ jsx("span", { className: "font-medium", children: getTotalPassengers() })
          ] }),
          /* @__PURE__ */ jsx(ChevronDown, { className: `w-4 h-4 text-gray-400 transition-transform ${isOpen ? "rotate-180" : ""}` })
        ]
      }
    ),
    isOpen && /* @__PURE__ */ jsxs("div", { className: "absolute right-0 z-50 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 p-4", children: [
      /* @__PURE__ */ jsx(
        PassengerTypeControl,
        {
          type: "adults",
          label: "Adults",
          value: Number(passengers.adults) || 0,
          minValue: 1
        }
      ),
      /* @__PURE__ */ jsx(
        PassengerTypeControl,
        {
          type: "children",
          label: "Children (2-11)",
          value: Number(passengers.children) || 0
        }
      ),
      /* @__PURE__ */ jsx(
        PassengerTypeControl,
        {
          type: "infants",
          label: "Infants (0-2)",
          value: Number(passengers.infants) || 0
        }
      )
    ] })
  ] });
}
function SearchButton({ loading, onClick }) {
  return /* @__PURE__ */ jsx(
    "button",
    {
      onClick,
      disabled: loading,
      className: `w-full py-4 rounded-lg font-bold text-lg transition duration-200 ${loading ? "bg-yellow-400/70 cursor-not-allowed" : "bg-yellow-400 hover:bg-yellow-500 text-gray-900"}`,
      children: loading ? /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx("div", { className: "animate-spin rounded-full h-5 w-5 border-b-2 border-gray-900 mr-3 inline-block" }),
        "Searching..."
      ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx(Search, { className: "w-5 h-5 mr-2 inline-block" }),
        "Kerko Fluturime"
      ] })
    }
  );
}
function SearchModule({
  onSearch,
  loading,
  error,
  tripType,
  setTripType,
  fromCity,
  setFromCity,
  toCity,
  setToCity,
  departureDate,
  setDepartureDate,
  returnDate,
  setReturnDate,
  passengers,
  setPassengers,
  directFlightsOnly,
  setDirectFlightsOnly
}) {
  return /* @__PURE__ */ jsx("div", { className: "w-full max-w-4xl mx-auto", children: /* @__PURE__ */ jsxs("div", { className: "bg-white/90 backdrop-blur-sm rounded-xl shadow-xl p-4 md:p-6", children: [
    error && /* @__PURE__ */ jsx("div", { className: "mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-lg", children: error }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-6 md:space-y-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-2", children: [
        /* @__PURE__ */ jsx("div", { className: "flex-1", children: /* @__PURE__ */ jsx(
          TripTypeSelector,
          {
            tripType,
            onTripTypeChange: setTripType
          }
        ) }),
        /* @__PURE__ */ jsx("div", { className: "w-[120px]", children: /* @__PURE__ */ jsx(
          PassengerSelector,
          {
            passengers,
            onChange: setPassengers
          }
        ) })
      ] }),
      /* @__PURE__ */ jsx(
        LocationInputs,
        {
          fromCity,
          setFromCity,
          toCity,
          setToCity
        }
      ),
      /* @__PURE__ */ jsx(
        DatePickers,
        {
          tripType,
          departureDate,
          returnDate,
          onDepartureDateChange: setDepartureDate,
          onReturnDateChange: setReturnDate,
          onTripTypeChange: setTripType,
          fromCode: fromCity == null ? void 0 : fromCity.code,
          toCode: toCity == null ? void 0 : toCity.code
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsx(SearchButton, { loading, onClick: onSearch }),
        /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center", children: /* @__PURE__ */ jsxs("label", { className: "flex items-center space-x-2 cursor-pointer", children: [
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "checkbox",
              checked: directFlightsOnly,
              onChange: (e) => setDirectFlightsOnly(e.target.checked),
              className: "w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            }
          ),
          /* @__PURE__ */ jsx("span", { className: "text-gray-600", children: "Shfaq Vetem Fluturime Direkte" })
        ] }) })
      ] })
    ] })
  ] }) });
}
function PopularRoutes() {
  useNavigate();
  const [routes, setRoutes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    fetchRoutes();
  }, []);
  const fetchRoutes = async () => {
    try {
      const { data: routeData, error: routeError } = await supabase$1.from("search_route_tracking").select("origin, destination, search_count").order("search_count", { ascending: false });
      if (routeError) throw routeError;
      if (!routeData || routeData.length === 0) {
        setRoutes([]);
        return;
      }
      const iataCodes = Array.from(/* @__PURE__ */ new Set([
        ...routeData.map((r) => r.origin),
        ...routeData.map((r) => r.destination)
      ]));
      const { data: airports, error: airportError } = await supabase$1.from("airports").select("iata_code, city").in("iata_code", iataCodes);
      if (airportError) throw airportError;
      const airportMap = /* @__PURE__ */ new Map();
      airports == null ? void 0 : airports.forEach((a) => {
        airportMap.set(a.iata_code, a.city);
      });
      const uniqueRoutes = /* @__PURE__ */ new Map();
      routeData.forEach((route) => {
        const fromCity = airportMap.get(route.origin) || route.origin;
        const toCity = airportMap.get(route.destination) || route.destination;
        const key = `${fromCity}-${toCity}`;
        if (!uniqueRoutes.has(key) || uniqueRoutes.get(key).search_count < route.search_count) {
          uniqueRoutes.set(key, {
            from_city: fromCity,
            to_city: toCity,
            search_count: route.search_count
          });
        }
      });
      setRoutes(Array.from(uniqueRoutes.values()).slice(0, 6));
    } catch (err) {
      console.error("Error fetching popular routes:", err);
      setError(err instanceof Error ? err.message : "Error loading routes");
    } finally {
      setLoading(false);
    }
  };
  if (loading) {
    return /* @__PURE__ */ jsx("div", { className: "bg-white py-12", children: /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center min-h-[200px]", children: /* @__PURE__ */ jsx("div", { className: "animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" }) }) }) });
  }
  if (error) {
    return /* @__PURE__ */ jsx("div", { className: "bg-white py-12", children: /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsx("div", { className: "text-center text-red-600", children: error }) }) });
  }
  return /* @__PURE__ */ jsx("div", { className: "bg-white py-12", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [
    /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-gray-900", children: "Destinacionet më të kërkuara" }),
      /* @__PURE__ */ jsx("p", { className: "mt-2 text-base text-gray-600", children: "Zbuloni destinacionet tona më të kërkuara." })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "mt-8 grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3", children: routes.map((route, idx) => /* @__PURE__ */ jsx(
      "div",
      {
        className: "group bg-gray-50 hover:bg-blue-50 p-4 rounded-lg transition-colors duration-200 w-full text-left",
        children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsx("div", { className: "flex-shrink-0", children: /* @__PURE__ */ jsx(Plane, { className: "w-5 h-5 text-blue-600" }) }),
          /* @__PURE__ */ jsx("div", { className: "flex-1", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 font-medium text-gray-900", children: [
            /* @__PURE__ */ jsx("span", { children: route.from_city }),
            /* @__PURE__ */ jsx(ArrowRight, { className: "w-4 h-4 text-gray-400" }),
            /* @__PURE__ */ jsx("span", { children: route.to_city })
          ] }) })
        ] })
      },
      idx
    )) })
  ] }) });
}
function formatDuration(minutes) {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours}h ${mins}m`;
}
function formatDateForAPI(date) {
  const d = new Date(Date.UTC(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    12,
    0,
    0,
    0
  ));
  return d.toISOString();
}
function parseISODate(dateString) {
  const date = new Date(dateString);
  return new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    12,
    0,
    0,
    0
  );
}
function makeCloneable(data) {
  try {
    return JSON.parse(JSON.stringify(data));
  } catch (err) {
    console.error("Error making data cloneable:", err);
    return {};
  }
}
function formatErrorMessage(error) {
  if (error instanceof Error) {
    return error.message.replace(/^TypeError: /, "").replace(/^Error: /, "").replace(/\s+\(.+\)$/, "").replace("Failed to fetch", "Network connection error. Please check your internet connection.");
  }
  if (error instanceof AuthError) {
    return error.message;
  }
  return "An unexpected error occurred. Please try again.";
}
function SEOHead({
  title,
  description,
  canonicalUrl,
  imageUrl = "https://himatravel.com/wp-content/uploads/2020/11/cropped-logo-1-192x192.png",
  type = "website",
  schema,
  keywords = ["bileta avioni", "flight tickets", "airline tickets"],
  language = "sq",
  children,
  fromCity,
  toCity,
  fromState,
  toState
}) {
  const baseUrl = "https://biletaavioni.himatravel.com";
  const fullUrl = canonicalUrl ? `${baseUrl}${canonicalUrl}` : baseUrl;
  const defaultSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Hima Travel - Bileta Avioni",
    url: baseUrl,
    description: "Bileta avioni me çmimet më të mira. Rezervoni online fluturime direkte dhe me ndalesë për destinacionet tuaja të preferuara."
  };
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `Sa kushton një biletë avioni ${fromCity ? `nga ${fromCity}` : ""} ${toCity ? `për ${toCity}` : ""}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Çmimet për bileta avioni ${fromCity ? `nga ${fromCity}` : ""} ${toCity ? `për ${toCity}` : ""} fillojnë nga 50€ dhe mund të ndryshojnë në varësi të sezonit dhe disponueshmërisë. Rekomandohet rezervimi i hershëm për çmimet më të mira.`
        }
      },
      {
        "@type": "Question",
        name: "Kur është koha më e mirë për të rezervuar bileta avioni?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Koha më e mirë për të rezervuar bileta avioni zakonisht është 2-3 muaj përpara udhëtimit. Për sezonin e lartë (verë, festat e fundvitit), rekomandohet rezervimi 4-6 muaj përpara."
        }
      },
      {
        "@type": "Question",
        name: "A ofron Hima Travel garanci çmimi për bileta avioni?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Po, Hima Travel ofron garanci çmimi për bileta avioni. Nëse gjeni të njëjtin fluturim me çmim më të ulët brenda 24 orëve pas rezervimit, ne do të rimbursojmë diferencën."
        }
      }
    ]
  };
  return /* @__PURE__ */ jsxs(Helmet, { children: [
    /* @__PURE__ */ jsx("html", { lang: language }),
    /* @__PURE__ */ jsx("title", { children: title }),
    /* @__PURE__ */ jsx("meta", { name: "description", content: description }),
    /* @__PURE__ */ jsx("meta", { name: "keywords", content: keywords.join(", ") }),
    /* @__PURE__ */ jsx("link", { rel: "canonical", href: fullUrl }),
    /* @__PURE__ */ jsx("meta", { property: "og:type", content: type }),
    /* @__PURE__ */ jsx("meta", { property: "og:url", content: fullUrl }),
    /* @__PURE__ */ jsx("meta", { property: "og:title", content: title }),
    /* @__PURE__ */ jsx("meta", { property: "og:description", content: description }),
    /* @__PURE__ */ jsx("meta", { property: "og:image", content: imageUrl }),
    /* @__PURE__ */ jsx("meta", { property: "og:site_name", content: "Hima Travel" }),
    /* @__PURE__ */ jsx("meta", { property: "og:locale", content: language === "sq" ? "sq_AL" : "en_US" }),
    /* @__PURE__ */ jsx("meta", { name: "twitter:card", content: "summary_large_image" }),
    /* @__PURE__ */ jsx("meta", { name: "twitter:url", content: fullUrl }),
    /* @__PURE__ */ jsx("meta", { name: "twitter:title", content: title }),
    /* @__PURE__ */ jsx("meta", { name: "twitter:description", content: description }),
    /* @__PURE__ */ jsx("meta", { name: "twitter:image", content: imageUrl }),
    /* @__PURE__ */ jsx("meta", { name: "viewport", content: "width=device-width, initial-scale=1.0" }),
    /* @__PURE__ */ jsx("meta", { name: "theme-color", content: "#2563eb" }),
    /* @__PURE__ */ jsx("meta", { name: "apple-mobile-web-app-capable", content: "yes" }),
    /* @__PURE__ */ jsx("meta", { name: "apple-mobile-web-app-status-bar-style", content: "black-translucent" }),
    /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify(schema || defaultSchema) }),
    /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify(faqSchema) }),
    children
  ] });
}
const supabaseUrl = "https://aoagsticdrptxxrldast.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFvYWdzdGljZHJwdHh4cmxkYXN0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk5NzY0NjgsImV4cCI6MjA1NTU1MjQ2OH0.rFqjJnrEGbwWL0Hv7pL3daMBsE5w4bCy4q6RoDfN_WY";
const isBrowser = typeof window !== "undefined";
const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: isBrowser,
    autoRefreshToken: isBrowser,
    detectSessionInUrl: isBrowser,
    storage: isBrowser ? {
      getItem: (key) => {
        try {
          const itemStr = localStorage.getItem(key);
          if (!itemStr) return null;
          const item = JSON.parse(itemStr);
          const now = /* @__PURE__ */ new Date();
          if (item.expires && new Date(item.expires) < now) {
            localStorage.removeItem(key);
            return null;
          }
          return item.value;
        } catch (err) {
          console.error("Error reading auth storage:", err);
          localStorage.removeItem(key);
          return null;
        }
      },
      setItem: (key, value) => {
        try {
          const item = {
            value,
            expires: new Date(Date.now() + 12 * 60 * 60 * 1e3)
            // 12 hours
          };
          localStorage.setItem(key, JSON.stringify(item));
        } catch (err) {
          console.error("Error writing to auth storage:", err);
          try {
            localStorage.removeItem(key);
          } catch (cleanupErr) {
            console.error("Error cleaning up storage:", cleanupErr);
          }
        }
      },
      removeItem: (key) => {
        try {
          localStorage.removeItem(key);
        } catch (err) {
          console.error("Error removing from auth storage:", err);
        }
      }
    } : void 0
  },
  realtime: {
    params: {
      eventsPerSecond: 2
    }
  },
  global: {
    headers: {
      "x-application-name": "flight-finder"
    },
    fetch: (url, options = {}) => {
      const fetchWithRetry = async (retriesLeft) => {
        try {
          const response = await fetch(url, {
            ...options,
            // Add timeout
            signal: AbortSignal.timeout(3e4)
            // 30 second timeout
          });
          if (!response.ok && retriesLeft > 0) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response;
        } catch (error) {
          if (retriesLeft === 0) throw error;
          const delay = Math.min(1e3 * 2 ** (3 - retriesLeft), 8e3);
          await new Promise((resolve) => setTimeout(resolve, delay));
          return fetchWithRetry(retriesLeft - 1);
        }
      };
      return fetchWithRetry(3);
    }
  },
  db: {
    schema: "public"
  }
});
if (isBrowser) {
  supabase.auth.onAuthStateChange((event, session) => {
    if (event === "SIGNED_OUT" || event === "USER_DELETED") {
      localStorage.removeItem("supabase.auth.token");
      sessionStorage.removeItem("supabase.auth.token");
    } else if (event === "TOKEN_REFRESHED") {
      console.log("Auth token refreshed successfully");
    }
  });
  setInterval(
    async () => {
      const {
        data: { session },
        error
      } = await supabase.auth.getSession();
      if (session && !error) {
        await supabase.auth.refreshSession();
      }
    },
    10 * 60 * 1e3
  );
}
async function fetchSEOData(path) {
  try {
    const { data: connection, error } = await supabase.from("seo_location_connections").select(`
        template_url,
        template_type_id,
        from_location:from_location_id(
          type, city, state, nga_format
        ),
        to_location:to_location_id(
          type, city, state, per_format
        )
      `).eq("template_url", path).eq("status", "active").single();
    if (error || !connection) {
      const pathWithoutSlash = path.endsWith("/") ? path.slice(0, -1) : path;
      const { data: altConnection, error: altError } = await supabase.from("seo_location_connections").select(`
          template_url,
          template_type_id,
          from_location:from_location_id(
            type, city, state, nga_format
          ),
          to_location:to_location_id(
            type, city, state, per_format
          )
        `).eq("template_url", pathWithoutSlash).eq("status", "active").single();
      if (altError || !altConnection) {
        console.error("No SEO data found for path:", path);
        return null;
      }
      const { data: template2 } = await supabase.from("seo_page_templates").select("seo_title, meta_description").eq("template_type_id", altConnection.template_type_id).single();
      if (!template2) return null;
      let title2 = template2.seo_title;
      let description2 = template2.meta_description;
      if (altConnection.from_location.type === "city") {
        title2 = title2.replace(/{nga_city}/g, altConnection.from_location.nga_format || `Nga ${altConnection.from_location.city}`);
        description2 = description2.replace(/{nga_city}/g, altConnection.from_location.nga_format || `Nga ${altConnection.from_location.city}`);
      }
      if (altConnection.to_location.type === "city") {
        title2 = title2.replace(/{per_city}/g, altConnection.to_location.per_format || `Për ${altConnection.to_location.city}`);
        description2 = description2.replace(/{per_city}/g, altConnection.to_location.per_format || `Për ${altConnection.to_location.city}`);
      }
      if (altConnection.from_location.type === "state") {
        title2 = title2.replace(/{nga_state}/g, altConnection.from_location.nga_format || `Nga ${altConnection.from_location.state}`);
        description2 = description2.replace(/{nga_state}/g, altConnection.from_location.nga_format || `Nga ${altConnection.from_location.state}`);
      }
      if (altConnection.to_location.type === "state") {
        title2 = title2.replace(/{per_state}/g, altConnection.to_location.per_format || `Për ${altConnection.to_location.state}`);
        description2 = description2.replace(/{per_state}/g, altConnection.to_location.per_format || `Për ${altConnection.to_location.state}`);
      }
      const schema2 = {
        "@context": "https://schema.org",
        "@type": "Product",
        name: title2,
        description: description2,
        offers: {
          "@type": "AggregateOffer",
          priceCurrency: "EUR",
          lowPrice: "50",
          highPrice: "500",
          offerCount: "100",
          offers: [
            {
              "@type": "Offer",
              url: `https://biletaavioni.himatravel.com${altConnection.template_url}`,
              price: "99",
              priceCurrency: "EUR",
              availability: "https://schema.org/InStock",
              seller: {
                "@type": "Organization",
                name: "Hima Travel"
              }
            }
          ]
        }
      };
      return {
        title: title2,
        description: description2,
        canonicalUrl: altConnection.template_url,
        schema: schema2,
        keywords: [
          "bileta avioni",
          "flight tickets",
          "airline tickets",
          "bileta online",
          "cmime te lira",
          "fluturime",
          "rezervo bileta",
          altConnection.from_location.city || altConnection.from_location.state,
          altConnection.to_location.city || altConnection.to_location.state,
          "fluturime direkte",
          "oferta udhetimi",
          "bileta te lira"
        ],
        language: "sq"
      };
    }
    const { data: template } = await supabase.from("seo_page_templates").select("seo_title, meta_description").eq("template_type_id", connection.template_type_id).single();
    if (!template) return null;
    let title = template.seo_title;
    let description = template.meta_description;
    if (connection.from_location.type === "city") {
      title = title.replace(/{nga_city}/g, connection.from_location.nga_format || `Nga ${connection.from_location.city}`);
      description = description.replace(/{nga_city}/g, connection.from_location.nga_format || `Nga ${connection.from_location.city}`);
    }
    if (connection.to_location.type === "city") {
      title = title.replace(/{per_city}/g, connection.to_location.per_format || `Për ${connection.to_location.city}`);
      description = description.replace(/{per_city}/g, connection.to_location.per_format || `Për ${connection.to_location.city}`);
    }
    if (connection.from_location.type === "state") {
      title = title.replace(/{nga_state}/g, connection.from_location.nga_format || `Nga ${connection.from_location.state}`);
      description = description.replace(/{nga_state}/g, connection.from_location.nga_format || `Nga ${connection.from_location.state}`);
    }
    if (connection.to_location.type === "state") {
      title = title.replace(/{per_state}/g, connection.to_location.per_format || `Për ${connection.to_location.state}`);
      description = description.replace(/{per_state}/g, connection.to_location.per_format || `Për ${connection.to_location.state}`);
    }
    const schema = {
      "@context": "https://schema.org",
      "@type": "Product",
      name: title,
      description,
      offers: {
        "@type": "AggregateOffer",
        priceCurrency: "EUR",
        lowPrice: "50",
        highPrice: "500",
        offerCount: "100",
        offers: [
          {
            "@type": "Offer",
            url: `https://biletaavioni.himatravel.com${connection.template_url}`,
            price: "99",
            priceCurrency: "EUR",
            availability: "https://schema.org/InStock",
            seller: {
              "@type": "Organization",
              name: "Hima Travel"
            }
          }
        ]
      }
    };
    return {
      title,
      description,
      canonicalUrl: connection.template_url,
      schema,
      keywords: [
        "bileta avioni",
        "flight tickets",
        "airline tickets",
        "bileta online",
        "cmime te lira",
        "fluturime",
        "rezervo bileta",
        connection.from_location.city || connection.from_location.state,
        connection.to_location.city || connection.to_location.state,
        "fluturime direkte",
        "oferta udhetimi",
        "bileta te lira"
      ],
      language: "sq"
    };
  } catch (err) {
    console.error("Error fetching SEO data:", err);
    return null;
  }
}
function getDefaultSEOData(pageName) {
  const baseUrl = "https://biletaavioni.himatravel.com";
  const pageData = {
    home: {
      title: "Bileta Avioni | Rezervo Online me Çmimet më të Mira | Hima Travel",
      description: "Rezervoni bileta avioni me çmimet më të mira. Krahasoni fluturime direkte dhe me ndalesë për destinacionet tuaja të preferuara. Rezervo online tani!",
      path: "/"
    },
    results: {
      title: "Rezultatet e Kërkimit | Bileta Avioni | Hima Travel",
      description: "Shikoni rezultatet e kërkimit tuaj për bileta avioni. Krahasoni çmimet, oraret dhe zgjidhni fluturimin që ju përshtatet më mirë.",
      path: "/results"
    },
    about: {
      title: "Rreth Nesh | Hima Travel | Agjenci Udhëtimi në Shqipëri",
      description: "Mësoni më shumë për Hima Travel, një nga agjencitë më të besuara të udhëtimit në Shqipëri që nga viti 2011. Ofrojmë bileta avioni, pushime dhe shërbime turistike.",
      path: "/about"
    },
    contact: {
      title: "Na Kontaktoni | Hima Travel | Bileta Avioni & Pushime",
      description: "Kontaktoni Hima Travel për çdo pyetje ose rezervim. Jemi këtu për t'ju ndihmuar me bileta avioni, pushime dhe shërbime turistike.",
      path: "/contact"
    },
    privacy: {
      title: "Politikat e Privatësisë | Bileta Avioni | Hima Travel",
      description: "Lexoni politikat tona të privatësisë për të kuptuar se si mbrojmë të dhënat tuaja personale dhe si i përdorim ato për të përmirësuar shërbimet tona.",
      path: "/privacy"
    },
    terms: {
      title: "Kushtet e Përdorimit | Bileta Avioni | Hima Travel",
      description: "Kushtet e përdorimit të faqes sonë të internetit dhe shërbimeve të Hima Travel. Informacion i rëndësishëm për rezervimet dhe anullimet.",
      path: "/terms"
    },
    cookies: {
      title: "Politika e Cookies | Bileta Avioni | Hima Travel",
      description: "Informacion mbi përdorimin e cookies në faqen tonë të internetit dhe si mund të menaxhoni preferencat tuaja të cookies.",
      path: "/cookies"
    },
    careers: {
      title: "Mundësi Karriere | Bileta Avioni | Hima Travel | Punë në Turizëm",
      description: "Zbuloni mundësitë e karrierës në Hima Travel. Bashkohuni me ekipin tonë të pasionuar për turizmin dhe udhëtimet.",
      path: "/careers"
    },
    sitemap: {
      title: "Sitemap | Bileta Avioni | Hima Travel | Të Gjitha Faqet",
      description: "Shikoni hartën e faqes sonë të internetit për të gjetur të gjitha faqet dhe shërbimet që ofrojmë në Hima Travel për bileta avioni dhe fluturime.",
      path: "/sitemap"
    }
  };
  const data = pageData[pageName] || {
    title: "Hima Travel | Bileta Avioni & Fluturime | Çmimet më të Mira",
    description: "Bileta avioni me çmimet më të mira. Rezervoni online fluturime direkte dhe me ndalesë për destinacionet tuaja të preferuara. Oferta speciale çdo ditë!",
    path: "/"
  };
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: data.title,
    url: baseUrl + data.path,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${baseUrl}/results?batch_id={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    }
  };
  return {
    title: data.title,
    description: data.description,
    canonicalUrl: data.path,
    schema,
    keywords: [
      "bileta avioni",
      "flight tickets",
      "airline tickets",
      "bileta online",
      "cmime te lira",
      "fluturime",
      "rezervo bileta",
      "oferta udhetimi",
      "bileta te lira",
      "hima travel",
      "agjenci udhetimi",
      "fluturime direkte"
    ],
    language: "sq"
  };
}
function HomePage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [tripType, setTripType] = useState("roundTrip");
  const [fromCity, setFromCity] = useState(null);
  const [toCity, setToCity] = useState(null);
  const [departureDate, setDepartureDate] = useState(null);
  const [returnDate, setReturnDate] = useState(null);
  const [directFlightsOnly, setDirectFlightsOnly] = useState(false);
  const [passengers, setPassengers] = useState({
    adults: 1,
    children: 0,
    infants: 0
  });
  const seoData = getDefaultSEOData("home");
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Hima Travel - Bileta Avioni",
    url: "https://biletaavioni.himatravel.com",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://biletaavioni.himatravel.com/results?batch_id={search_term_string}",
      "query-input": "required name=search_term_string"
    },
    publisher: {
      "@type": "Organization",
      name: "Hima Travel",
      logo: {
        "@type": "ImageObject",
        url: "https://himatravel.com/wp-content/uploads/2020/11/logo-768x277.png"
      },
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+355 694 767 427",
        contactType: "customer service",
        availableLanguage: ["Albanian", "English", "Italian"]
      }
    }
  };
  const handleSearch = async () => {
    try {
      if (!fromCity || !toCity) {
        throw new Error("Please select departure and arrival cities");
      }
      if (!departureDate) {
        throw new Error("Please select a departure date");
      }
      if (tripType === "roundTrip" && !returnDate) {
        throw new Error("Please select a return date for round-trip flights");
      }
      setLoading(true);
      setError(null);
      console.log(`Starting ${tripType} search from ${fromCity.code} to ${toCity.code}`);
      const batchId = v4();
      const searchParams = {
        fromLocation: fromCity.name,
        toLocation: toCity.name,
        fromCode: fromCity.code,
        toCode: toCity.code,
        departureDate: formatDateForAPI(departureDate),
        returnDate: returnDate ? formatDateForAPI(returnDate) : null,
        tripType,
        travelClass: "1",
        stops: "0",
        passengers: {
          adults: passengers.adults,
          children: passengers.children,
          infantsInSeat: 0,
          infantsOnLap: passengers.infants
        }
      };
      const { data: savedSearch, error: saveError } = await supabase$1.from("saved_searches").insert([{
        batch_id: batchId,
        user_id: (user == null ? void 0 : user.id) || null,
        search_params: searchParams,
        results: null,
        cached_results: null,
        cached_until: null,
        price_stability_level: "MEDIUM"
      }]).select().single();
      if (saveError) {
        console.error("Error saving search:", saveError);
        throw new Error("Failed to save search. Please try again.");
      }
      if (!savedSearch) {
        throw new Error("Failed to create search. Please try again.");
      }
      sessionStorage.setItem(`search_${batchId}`, "true");
      if (directFlightsOnly) {
        sessionStorage.setItem(`direct_${batchId}`, "true");
      }
      console.log("Navigating to results with batch ID:", batchId);
      window.scrollTo(0, 0);
      navigate(`/results?batch_id=${batchId}`, {
        replace: true,
        state: { searchParams }
      });
    } catch (err) {
      console.error("Search error:", err);
      setError(err instanceof Error ? err.message : "Failed to search for flights");
      setLoading(false);
    }
  };
  const handleContactAgent = () => {
    window.location.href = "tel:+355695161381";
  };
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-gradient-to-b from-blue-500 to-blue-700", children: [
    /* @__PURE__ */ jsx(
      SEOHead,
      {
        title: seoData.title,
        description: seoData.description,
        canonicalUrl: seoData.canonicalUrl,
        schema,
        keywords: [
          "bileta avioni",
          "flight tickets",
          "airline tickets",
          "bileta online",
          "cmime te lira",
          "fluturime",
          "rezervo bileta",
          "oferta udhetimi",
          "bileta te lira",
          "hima travel",
          "agjenci udhetimi",
          "fluturime direkte",
          "bileta avioni online",
          "bileta avioni te lira",
          "bileta avioni oferta"
        ],
        language: seoData.language
      }
    ),
    /* @__PURE__ */ jsx(HeroSection, { children: /* @__PURE__ */ jsx(
      SearchModule,
      {
        onSearch: handleSearch,
        loading,
        error,
        tripType,
        setTripType,
        fromCity,
        setFromCity,
        toCity,
        setToCity,
        departureDate,
        setDepartureDate,
        returnDate,
        setReturnDate,
        passengers,
        setPassengers,
        directFlightsOnly,
        setDirectFlightsOnly
      }
    ) }),
    /* @__PURE__ */ jsx(PopularRoutes, {}),
    /* @__PURE__ */ jsx("section", { className: "bg-white py-16", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center mb-12", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold text-gray-900 mb-4", children: "Pse të zgjidhni Hima Travel?" }),
        /* @__PURE__ */ jsx("p", { className: "text-lg text-gray-600 max-w-2xl mx-auto", children: "Me mbi 12 vjet eksperiencë në industrinë e udhëtimit, ne ofrojmë shërbimin më të mirë dhe çmimet më konkurruese në treg." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12", children: [
        /* @__PURE__ */ jsxs("div", { className: "bg-gray-50 rounded-xl p-6 text-center transform hover:-translate-y-1 transition-transform duration-300", children: [
          /* @__PURE__ */ jsx("div", { className: "inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4", children: /* @__PURE__ */ jsx(Award, { className: "w-8 h-8 text-blue-600" }) }),
          /* @__PURE__ */ jsx("h3", { className: "text-xl font-semibold text-gray-900 mb-2", children: "Eksperiencë e Gjatë" }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-600", children: "12+ vjet eksperiencë në organizimin e udhëtimeve dhe shitjen e biletave." })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-gray-50 rounded-xl p-6 text-center transform hover:-translate-y-1 transition-transform duration-300", children: [
          /* @__PURE__ */ jsx("div", { className: "inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4", children: /* @__PURE__ */ jsx(Clock, { className: "w-8 h-8 text-blue-600" }) }),
          /* @__PURE__ */ jsx("h3", { className: "text-xl font-semibold text-gray-900 mb-2", children: "24/7 Online" }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-600", children: "Gjeni ofertat me te mira per Bileta Avioni 24/7 Online." })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-gray-50 rounded-xl p-6 text-center transform hover:-translate-y-1 transition-transform duration-300", children: [
          /* @__PURE__ */ jsx("div", { className: "inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4", children: /* @__PURE__ */ jsx(Shield, { className: "w-8 h-8 text-blue-600" }) }),
          /* @__PURE__ */ jsx("h3", { className: "text-xl font-semibold text-gray-900 mb-2", children: "Garanci Çmimi" }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-600", children: "Ofrojmë çmimet më të mira të garantuara për të gjitha destinacionet." })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-gray-50 rounded-xl p-6 text-center transform hover:-translate-y-1 transition-transform duration-300", children: [
          /* @__PURE__ */ jsx("div", { className: "inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4", children: /* @__PURE__ */ jsx(Phone, { className: "w-8 h-8 text-blue-600" }) }),
          /* @__PURE__ */ jsx("h3", { className: "text-xl font-semibold text-gray-900 mb-2", children: "Rezervim i Thjeshtë" }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-600", children: "Proces i shpejtë dhe i thjeshtë rezervimi online ose me telefon." })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-8 max-w-4xl mx-auto", children: [
        /* @__PURE__ */ jsxs("div", { className: "bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-8 text-white text-center", children: [
          /* @__PURE__ */ jsx(Search, { className: "w-12 h-12 mx-auto mb-4" }),
          /* @__PURE__ */ jsx("h3", { className: "text-2xl font-bold mb-4", children: "Kerko Çmimet me te Mira" }),
          /* @__PURE__ */ jsx("p", { className: "mb-6", children: "Perdor modulin e kerkimit per te gjetur ofertat me te mira per destinacionin tend te preferuar." }),
          /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: () => window.scrollTo({ top: 0, behavior: "smooth" }),
              className: "inline-flex items-center px-6 py-3 bg-white text-blue-600 rounded-lg \n                  font-semibold hover:bg-blue-50 transition-colors",
              children: [
                /* @__PURE__ */ jsx(Search, { className: "w-5 h-5 mr-2" }),
                "Kerko Tani"
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-8 text-white text-center", children: [
          /* @__PURE__ */ jsx(Phone, { className: "w-12 h-12 mx-auto mb-4" }),
          /* @__PURE__ */ jsx("h3", { className: "text-2xl font-bold mb-4", children: "Kontakto Agjentët Tanë" }),
          /* @__PURE__ */ jsx("p", { className: "mb-6", children: "Preferon te flasësh me nje nga agjentet tane? Na kontakto direkt ne numrin tone." }),
          /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: handleContactAgent,
              className: "inline-flex items-center px-6 py-3 bg-white text-green-600 rounded-lg \n                  font-semibold hover:bg-green-50 transition-colors",
              children: [
                /* @__PURE__ */ jsx(ArrowRight, { className: "w-5 h-5 mr-2" }),
                "+355 69 516 1381"
              ]
            }
          )
        ] })
      ] })
    ] }) })
  ] });
}
function SearchModal({ isOpen, onClose, searchParams, onSearch }) {
  const initialDepartureDate = searchParams.departureDate ? parseISODate(searchParams.departureDate) : null;
  const initialReturnDate = searchParams.returnDate ? parseISODate(searchParams.returnDate) : null;
  const [localParams, setLocalParams] = useState({
    ...searchParams,
    departureDate: searchParams.departureDate,
    returnDate: searchParams.returnDate
  });
  const [departureDate, setDepartureDate] = useState(initialDepartureDate);
  const [returnDate, setReturnDate] = useState(initialReturnDate);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  if (!isOpen) return null;
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      if (!localParams.fromCode || !localParams.toCode) {
        throw new Error("Please select departure and arrival cities");
      }
      if (!departureDate) {
        throw new Error("Please select a departure date");
      }
      if (localParams.tripType === "roundTrip" && !returnDate) {
        throw new Error("Please select a return date");
      }
      const updatedParams = {
        ...localParams,
        departureDate: departureDate ? formatDateForAPI(departureDate) : "",
        returnDate: returnDate ? formatDateForAPI(returnDate) : null
      };
      onSearch(updatedParams);
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update search");
    } finally {
      setLoading(false);
    }
  };
  return /* @__PURE__ */ jsx("div", { className: "fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4", children: /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto", children: [
    /* @__PURE__ */ jsxs("div", { className: "sticky top-0 bg-white border-b border-gray-200 p-4 flex justify-between items-center", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-xl font-bold text-gray-800", children: "Modify Search" }),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: onClose,
          className: "p-2 hover:bg-gray-100 rounded-full transition-colors",
          children: /* @__PURE__ */ jsx(X, { className: "w-6 h-6" })
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "p-6 space-y-6", children: [
      error && /* @__PURE__ */ jsx("div", { className: "p-4 bg-red-50 border border-red-200 text-red-600 rounded-lg", children: error }),
      /* @__PURE__ */ jsxs("div", { className: "flex gap-4", children: [
        /* @__PURE__ */ jsxs("label", { className: "flex items-center", children: [
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "radio",
              value: "roundTrip",
              checked: localParams.tripType === "roundTrip",
              onChange: (e) => setLocalParams({ ...localParams, tripType: "roundTrip" }),
              className: "mr-2"
            }
          ),
          "Vajtje Ardhje"
        ] }),
        /* @__PURE__ */ jsxs("label", { className: "flex items-center", children: [
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "radio",
              value: "oneWay",
              checked: localParams.tripType === "oneWay",
              onChange: (e) => setLocalParams({ ...localParams, tripType: "oneWay" }),
              className: "mr-2"
            }
          ),
          "Vajtje"
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
        /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(
          CityInput,
          {
            value: localParams.fromLocation,
            onChange: (city) => setLocalParams({
              ...localParams,
              fromLocation: city.name,
              fromCode: city.code
            }),
            placeholder: "From where?",
            icon: Plane,
            label: "From"
          }
        ) }),
        /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(
          CityInput,
          {
            value: localParams.toLocation,
            onChange: (city) => setLocalParams({
              ...localParams,
              toLocation: city.name,
              toCode: city.code
            }),
            placeholder: "Where to?",
            icon: Plane,
            label: "To"
          }
        ) })
      ] }),
      /* @__PURE__ */ jsx(
        DatePickers,
        {
          tripType: localParams.tripType,
          departureDate,
          returnDate,
          onDepartureDateChange: setDepartureDate,
          onReturnDateChange: setReturnDate,
          onTripTypeChange: (type) => setLocalParams({
            ...localParams,
            tripType: type,
            returnDate: type === "oneWay" ? null : localParams.returnDate
          })
        }
      ),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsx(Users, { className: "w-4 h-4" }),
          "Passengers"
        ] }) }),
        /* @__PURE__ */ jsx(
          PassengerSelector,
          {
            passengers: localParams.passengers,
            onChange: (passengers) => setLocalParams({ ...localParams, passengers })
          }
        )
      ] }),
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "submit",
          disabled: loading,
          className: `
              w-full py-3 rounded-lg font-semibold text-white
              ${loading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}
            `,
          children: loading ? "Searching..." : "Search Flights"
        }
      )
    ] })
  ] }) });
}
function SearchHeader({ searchParams, onBack, onSearch, onToggleFilters }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const totalPassengers = React.useMemo(() => {
    const { adults = 0, children = 0, infantsInSeat = 0, infantsOnLap = 0 } = searchParams.passengers;
    return adults + children + infantsInSeat + infantsOnLap;
  }, [searchParams.passengers]);
  useEffect(() => {
    const controlHeader = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > 100) {
        setIsVisible(currentScrollY < lastScrollY);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          controlHeader();
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [lastScrollY]);
  const handleEditClick = () => {
    setIsModalOpen(true);
  };
  const departureDate = searchParams.departureDate ? parseISODate(searchParams.departureDate) : null;
  const returnDate = searchParams.returnDate ? parseISODate(searchParams.returnDate) : null;
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      "div",
      {
        className: `
          bg-white shadow-sm sticky top-0 z-20
          transform transition-transform duration-300 ease-in-out
          md:transform-none
          ${isVisible ? "translate-y-0" : "-translate-y-full"}
        `,
        children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto", children: [
          /* @__PURE__ */ jsx("div", { className: "px-4 py-3 border-b border-gray-100", children: /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: onBack,
              className: "inline-flex items-center text-blue-600 hover:text-blue-700 font-medium",
              children: [
                /* @__PURE__ */ jsx(ArrowLeft, { size: 20, className: "mr-2" }),
                "Back to Search"
              ]
            }
          ) }),
          /* @__PURE__ */ jsxs("div", { className: "px-4 py-4 md:py-6", children: [
            /* @__PURE__ */ jsx("div", { className: "md:hidden", children: /* @__PURE__ */ jsxs("div", { className: "flex", children: [
              /* @__PURE__ */ jsxs(
                "div",
                {
                  className: "flex-1 pr-4 cursor-pointer hover:bg-gray-50 rounded-lg p-2 transition-colors",
                  onClick: handleEditClick,
                  children: [
                    /* @__PURE__ */ jsxs("div", { className: "flex items-center mb-2", children: [
                      /* @__PURE__ */ jsx("div", { className: "text-xl font-bold text-gray-900", children: searchParams.fromCode }),
                      /* @__PURE__ */ jsx(Plane, { className: "w-4 h-4 mx-2 text-blue-600" }),
                      /* @__PURE__ */ jsx("div", { className: "text-xl font-bold text-gray-900", children: searchParams.toCode })
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-1 text-sm text-gray-600", children: [
                      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1.5", children: [
                        /* @__PURE__ */ jsx(Calendar, { className: "w-3.5 h-3.5 text-blue-600" }),
                        departureDate ? format(departureDate, "EEE, d MMM") : "Select date"
                      ] }),
                      searchParams.tripType === "roundTrip" && returnDate && /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1.5", children: [
                        /* @__PURE__ */ jsx(Calendar, { className: "w-3.5 h-3.5 text-blue-600" }),
                        format(returnDate, "EEE, d MMM")
                      ] })
                    ] })
                  ]
                }
              ),
              /* @__PURE__ */ jsx("div", { className: "w-px bg-gray-200 mx-4" }),
              /* @__PURE__ */ jsxs(
                "button",
                {
                  onClick: onToggleFilters,
                  className: "flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 hover:bg-blue-200 \n                    rounded-lg font-medium transition-colors shadow-sm hover:shadow",
                  children: [
                    /* @__PURE__ */ jsx(Filter, { className: "w-5 h-5" }),
                    /* @__PURE__ */ jsx("span", { children: "Filters" })
                  ]
                }
              )
            ] }) }),
            /* @__PURE__ */ jsxs("div", { className: "hidden md:block", children: [
              /* @__PURE__ */ jsxs(
                "div",
                {
                  className: "flex items-center justify-between gap-4 mb-4 cursor-pointer hover:bg-gray-50 p-4 rounded-lg transition-colors",
                  onClick: handleEditClick,
                  children: [
                    /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
                      /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
                        /* @__PURE__ */ jsx("div", { className: "text-2xl font-bold text-gray-900", children: searchParams.fromCode }),
                        /* @__PURE__ */ jsx(Plane, { className: "w-5 h-5 mx-3 text-blue-600" }),
                        /* @__PURE__ */ jsx("div", { className: "text-2xl font-bold text-gray-900", children: searchParams.toCode })
                      ] }),
                      /* @__PURE__ */ jsx("div", { className: "h-8 w-px bg-gray-200 mx-4" }),
                      /* @__PURE__ */ jsxs("div", { className: "text-gray-500", children: [
                        searchParams.fromLocation,
                        " to ",
                        searchParams.toLocation
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-gray-700", children: [
                      /* @__PURE__ */ jsx(Calendar, { className: "w-5 h-5 text-blue-600" }),
                      /* @__PURE__ */ jsxs("span", { children: [
                        departureDate ? format(departureDate, "EEE, d MMM yyyy") : "",
                        searchParams.tripType === "roundTrip" && returnDate && /* @__PURE__ */ jsxs(Fragment, { children: [
                          /* @__PURE__ */ jsx("span", { className: "mx-2", children: "→" }),
                          format(returnDate, "EEE, d MMM yyyy")
                        ] })
                      ] })
                    ] })
                  ]
                }
              ),
              /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-3", children: [
                /* @__PURE__ */ jsx("div", { className: "inline-flex items-center px-3 py-1 bg-blue-50 text-blue-700 rounded-full", children: getTravelClassName(searchParams.travelClass) }),
                /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center px-3 py-1 bg-blue-50 text-blue-700 rounded-full", children: [
                  totalPassengers,
                  " Passenger",
                  totalPassengers > 1 ? "s" : ""
                ] }),
                /* @__PURE__ */ jsx("div", { className: "inline-flex items-center px-3 py-1 bg-blue-50 text-blue-700 rounded-full", children: getStopsText(searchParams.stops) })
              ] })
            ] })
          ] })
        ] })
      }
    ),
    /* @__PURE__ */ jsx(
      SearchModal,
      {
        isOpen: isModalOpen,
        onClose: () => setIsModalOpen(false),
        searchParams,
        onSearch
      }
    )
  ] });
}
function getTravelClassName(classCode) {
  switch (classCode) {
    case "1":
      return "Economy";
    case "2":
      return "Premium Economy";
    case "3":
      return "Business";
    case "4":
      return "First";
    default:
      return "Economy";
  }
}
function getStopsText(stopsCode) {
  switch (stopsCode) {
    case "0":
      return "Any stops";
    case "1":
      return "Nonstop only";
    case "2":
      return "1 stop or fewer";
    case "3":
      return "2 stops or fewer";
    default:
      return "Any stops";
  }
}
function splitFlightSegments(flights, searchParams) {
  if (!(flights == null ? void 0 : flights.length) || searchParams.tripType !== "roundTrip") {
    return {
      outboundFlights: flights || [],
      returnFlights: null
    };
  }
  const fromCode = searchParams.fromCode;
  const toCode = searchParams.toCode;
  let outboundEnd = -1;
  let returnStart = -1;
  for (let i = 0; i < flights.length; i++) {
    if (flights[0].departure_airport.id === fromCode && flights[i].arrival_airport.id === toCode) {
      outboundEnd = i;
      break;
    }
  }
  if (outboundEnd !== -1) {
    for (let i = outboundEnd + 1; i < flights.length; i++) {
      if (flights[i].departure_airport.id === toCode && flights[i].arrival_airport.id === fromCode) {
        returnStart = i;
        break;
      }
    }
  }
  if (process.env.NODE_ENV === "development") {
    console.log("Flight Segments Split:", {
      totalSegments: flights.length,
      outboundEnd,
      returnStart,
      outboundFlights: outboundEnd !== -1 ? flights.slice(0, outboundEnd + 1).map((f) => ({
        flightNumber: f.flight_number,
        from: f.departure_airport.id,
        to: f.arrival_airport.id
      })) : [],
      returnFlights: returnStart !== -1 ? flights.slice(returnStart).map((f) => ({
        flightNumber: f.flight_number,
        from: f.departure_airport.id,
        to: f.arrival_airport.id
      })) : null
    });
  }
  if (outboundEnd !== -1 && returnStart !== -1) {
    return {
      outboundFlights: flights.slice(0, outboundEnd + 1),
      returnFlights: flights.slice(returnStart)
    };
  }
  return {
    outboundFlights: flights,
    returnFlights: null
  };
}
const DEFAULT_COMMISSION_RATES = {
  adult: 20,
  child: 10,
  infant_seat: 10,
  infant_lap: 0
};
const DEFAULT_GROUP_DISCOUNTS = [
  { min_count: 2, rate: 15 },
  { min_count: 3, rate: 13.33 },
  { min_count: 4, rate: 15 },
  { min_count: 5, rate: 15 }
];
function calculateAdultGroupRate(adultCount, groupDiscounts = DEFAULT_GROUP_DISCOUNTS) {
  if (adultCount < 2) return DEFAULT_COMMISSION_RATES.adult;
  const applicableDiscount = groupDiscounts.filter((discount) => discount.min_count <= adultCount).sort((a, b) => b.min_count - a.min_count)[0];
  return (applicableDiscount == null ? void 0 : applicableDiscount.rate) || DEFAULT_COMMISSION_RATES.adult;
}
async function calculateCommission(passengers) {
  try {
    const validPassengers = {
      adults: Number(passengers.adults) || 0,
      children: Number(passengers.children) || 0,
      infantsInSeat: Number(passengers.infantsInSeat) || 0,
      infantsOnLap: Number(passengers.infantsOnLap) || 0
    };
    let rates = DEFAULT_COMMISSION_RATES;
    try {
      const { data: commissionRules, error } = await supabase$1.from("commission_rules").select("passenger_type, rate, group_discount_rules").order("passenger_type");
      if (!error && commissionRules) {
        rates = commissionRules.reduce((acc, rule) => ({
          ...acc,
          [rule.passenger_type]: rule.rate
        }), DEFAULT_COMMISSION_RATES);
      }
    } catch (err) {
      console.warn("Failed to fetch commission rules, using defaults:", err);
    }
    const adultRate = calculateAdultGroupRate(validPassengers.adults);
    const standardBreakdown = {
      adult: {
        count: validPassengers.adults,
        rate: rates.adult,
        total: validPassengers.adults * rates.adult
      },
      child: {
        count: validPassengers.children,
        rate: rates.child,
        total: validPassengers.children * rates.child
      },
      infant_seat: {
        count: validPassengers.infantsInSeat,
        rate: rates.infant_seat,
        total: validPassengers.infantsInSeat * rates.infant_seat
      },
      infant_lap: {
        count: validPassengers.infantsOnLap,
        rate: rates.infant_lap,
        total: validPassengers.infantsOnLap * rates.infant_lap
      }
    };
    const discountedBreakdown = {
      adult: {
        count: validPassengers.adults,
        rate: adultRate,
        total: validPassengers.adults * adultRate
      },
      child: {
        count: validPassengers.children,
        rate: rates.child,
        total: validPassengers.children * rates.child
      },
      infant_seat: {
        count: validPassengers.infantsInSeat,
        rate: rates.infant_seat,
        total: validPassengers.infantsInSeat * rates.infant_seat
      },
      infant_lap: {
        count: validPassengers.infantsOnLap,
        rate: rates.infant_lap,
        total: validPassengers.infantsOnLap * rates.infant_lap
      }
    };
    const standardTotal = Object.values(standardBreakdown).reduce((sum, rate) => sum + rate.total, 0);
    const discountedTotal = Object.values(discountedBreakdown).reduce((sum, rate) => sum + rate.total, 0);
    return {
      totalCommission: standardTotal,
      discountedCommission: discountedTotal,
      breakdown: {
        standard: standardBreakdown,
        discounted: discountedBreakdown
      },
      discountApplied: discountedTotal < standardTotal,
      savings: standardTotal - discountedTotal
    };
  } catch (err) {
    console.error("Error calculating commission:", err);
    return {
      totalCommission: 0,
      discountedCommission: 0,
      breakdown: {
        standard: {
          adult: { count: 0, rate: 0, total: 0 },
          child: { count: 0, rate: 0, total: 0 },
          infant_seat: { count: 0, rate: 0, total: 0 },
          infant_lap: { count: 0, rate: 0, total: 0 }
        },
        discounted: {
          adult: { count: 0, rate: 0, total: 0 },
          child: { count: 0, rate: 0, total: 0 },
          infant_seat: { count: 0, rate: 0, total: 0 },
          infant_lap: { count: 0, rate: 0, total: 0 }
        }
      },
      discountApplied: false,
      savings: 0
    };
  }
}
function formatAlbanianDate(dateString) {
  const date = new Date(dateString);
  const day = date.getDate();
  const months = [
    "Janar",
    "Shkurt",
    "Mars",
    "Prill",
    "Maj",
    "Qershor",
    "Korrik",
    "Gusht",
    "Shtator",
    "Tetor",
    "Nentor",
    "Dhjetor"
  ];
  return `${day} ${months[date.getMonth()]}`;
}
function formatAlbanianTime(dateString) {
  return new Date(dateString).toLocaleTimeString("sq-AL", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false
  });
}
function formatLayoverDuration(minutes) {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours} ore${hours !== 1 ? "" : ""} e ${mins} Minuta`;
}
function getTotalPassengersText(passengers) {
  const parts = [];
  if (passengers.adults > 0) {
    parts.push(`${passengers.adults} te rritur`);
  }
  if (passengers.children > 0) {
    parts.push(`${passengers.children} femije`);
  }
  if (passengers.infantsInSeat > 0) {
    parts.push(`${passengers.infantsInSeat} femije nen 2 vjec me karrige`);
  }
  if (passengers.infantsOnLap > 0) {
    parts.push(`${passengers.infantsOnLap} femije nen 2 vjec pa karrige`);
  }
  return parts.join(" dhe ");
}
async function formatFlightMessage(flight, searchParams, batchId) {
  const { outboundFlights, returnFlights } = splitFlightSegments(flight.flights, searchParams);
  const isRoundTrip = searchParams.tripType === "roundTrip";
  const totalPassengers = getTotalPassengersText(searchParams.passengers);
  await calculateCommission(searchParams.passengers);
  const totalPrice = flight.price;
  let message = "";
  if (outboundFlights.length === 1) {
    const outbound = outboundFlights[0];
    message += `${searchParams.fromLocation} - ${searchParams.toLocation}
`;
    message += `Data: ${formatAlbanianDate(outbound.departure_airport.time)}
`;
    message += `Orari Nisjes - ${formatAlbanianTime(outbound.departure_airport.time)}
`;
    message += `Orari Mberritjes - ${formatAlbanianTime(outbound.arrival_airport.time)}

`;
  } else {
    message += `Nisja Date: ${formatAlbanianDate(outboundFlights[0].departure_airport.time)}

`;
    outboundFlights.forEach((segment, index) => {
      var _a2;
      message += `${segment.departure_airport.name} - ${segment.arrival_airport.name}
`;
      message += `Orari Nisjes - ${formatAlbanianTime(segment.departure_airport.time)} `;
      message += `Mberritja ${formatAlbanianTime(segment.arrival_airport.time)}

`;
      if (index < outboundFlights.length - 1 && ((_a2 = flight.layovers) == null ? void 0 : _a2[index])) {
        message += `Pritje ${formatLayoverDuration(flight.layovers[index].duration)} ne ${flight.layovers[index].name}

`;
      }
    });
  }
  if (isRoundTrip && returnFlights && returnFlights.length > 0) {
    if (returnFlights.length === 1) {
      const returnFlight = returnFlights[0];
      message += `Kthimi

`;
      message += `${searchParams.toLocation} - ${searchParams.fromLocation}
`;
      message += `Data: ${formatAlbanianDate(returnFlight.departure_airport.time)}
`;
      message += `Orari Nisjes - ${formatAlbanianTime(returnFlight.departure_airport.time)}
`;
      message += `Orari Mberritjes - ${formatAlbanianTime(returnFlight.arrival_airport.time)}

`;
    } else {
      message += `Kthimi Date: ${formatAlbanianDate(returnFlights[0].departure_airport.time)}

`;
      returnFlights.forEach((segment, index) => {
        var _a2;
        message += `${segment.departure_airport.name} - ${segment.arrival_airport.name}
`;
        message += `Orari Nisjes - ${formatAlbanianTime(segment.departure_airport.time)} `;
        message += `Mberritja ${formatAlbanianTime(segment.arrival_airport.time)}

`;
        if (index < returnFlights.length - 1 && ((_a2 = flight.layovers) == null ? void 0 : _a2[index + outboundFlights.length])) {
          message += `Pritje ${formatLayoverDuration(flight.layovers[index + outboundFlights.length].duration)} ne ${flight.layovers[index + outboundFlights.length].name}

`;
        }
      });
    }
  }
  message += `Cmimi: ${Math.floor(totalPrice)} Euro / Ne total per ${totalPassengers}
`;
  return message;
}
function WhatsAppButton({ flight, searchParams, batchId, className = "" }) {
  const WHATSAPP_PHONE = "355695161381";
  const handleClick = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      const message = await formatFlightMessage(flight, searchParams, batchId);
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
      const whatsappUrl = isMobile ? `whatsapp://send?phone=${WHATSAPP_PHONE}&text=${encodeURIComponent(message)}` : `https://api.whatsapp.com/send/?phone=${WHATSAPP_PHONE}&text=${encodeURIComponent(message)}`;
      window.location.href = whatsappUrl;
    } catch (err) {
      console.error("Error generating WhatsApp message:", err);
    }
  };
  return /* @__PURE__ */ jsxs(
    "button",
    {
      onClick: handleClick,
      className: `inline-flex items-center px-4 py-2 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition duration-200 ${className}`,
      children: [
        /* @__PURE__ */ jsx(MessageCircle, { className: "w-5 h-5 mr-2" }),
        "Kontakto Tani"
      ]
    }
  );
}
function CopyButton({ flight, searchParams, batchId, className = "" }) {
  const [copied, setCopied] = useState(false);
  const [isAgent, setIsAgent] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);
  const { user } = useAuth();
  const MAX_RETRIES = 3;
  const RETRY_DELAY = 2e3;
  useEffect(() => {
    let mounted = true;
    let retryTimeout;
    const checkIsAgent = async () => {
      if (!mounted) return;
      try {
        setLoading(true);
        setError(null);
        if (!user) {
          setIsAgent(false);
          setLoading(false);
          return;
        }
        const { data } = await withErrorHandling(
          async () => {
            const { data: data2, error: error2 } = await supabase$1.from("sales_agents").select("id, is_active").eq("id", user.id).maybeSingle();
            if (error2) throw error2;
            return { data: data2 };
          },
          { data: null },
          "Failed to check agent status",
          MAX_RETRIES,
          RETRY_DELAY
        );
        if (!mounted) return;
        if (data === null && retryCount < MAX_RETRIES) {
          setRetryCount((prev) => prev + 1);
          retryTimeout = setTimeout(checkIsAgent, RETRY_DELAY * (retryCount + 1));
          return;
        }
        setIsAgent((data == null ? void 0 : data.is_active) ?? false);
        setError(null);
        setLoading(false);
      } catch (err) {
        if (!mounted) return;
        console.error("Error checking agent status:", err);
        setIsAgent(false);
        setError(err instanceof Error ? err.message : "Failed to verify agent status");
        setLoading(false);
        if (retryCount < MAX_RETRIES) {
          setRetryCount((prev) => prev + 1);
          retryTimeout = setTimeout(checkIsAgent, RETRY_DELAY * (retryCount + 1));
        }
      }
    };
    checkIsAgent();
    return () => {
      mounted = false;
      if (retryTimeout) clearTimeout(retryTimeout);
    };
  }, [user, retryCount]);
  const handleCopy = async (e) => {
    e.stopPropagation();
    if (!isAgent) return;
    try {
      const message = await formatFlightMessage(flight, searchParams, batchId);
      await navigator.clipboard.writeText(message);
      setCopied(true);
      setTimeout(() => setCopied(false), 2e3);
    } catch (err) {
      console.error("Error copying message:", err);
      setError("Failed to copy flight details");
    }
  };
  const handleRetry = (e) => {
    e.stopPropagation();
    setRetryCount(0);
    setError(null);
    setLoading(true);
  };
  if (loading) {
    return /* @__PURE__ */ jsxs(
      "button",
      {
        disabled: true,
        onClick: (e) => e.stopPropagation(),
        className: `inline-flex items-center px-4 py-2 bg-gray-100 text-gray-400 rounded-lg font-semibold ${className}`,
        children: [
          /* @__PURE__ */ jsx("div", { className: "animate-spin rounded-full h-5 w-5 border-b-2 border-gray-400 mr-2" }),
          "Checking status..."
        ]
      }
    );
  }
  if (error) {
    return /* @__PURE__ */ jsxs(
      "button",
      {
        onClick: handleRetry,
        className: `inline-flex items-center px-4 py-2 bg-red-50 text-red-600 rounded-lg font-semibold hover:bg-red-100 transition duration-200 ${className}`,
        children: [
          /* @__PURE__ */ jsx(AlertCircle, { className: "w-5 h-5 mr-2" }),
          "Retry"
        ]
      }
    );
  }
  if (!isAgent) return null;
  return /* @__PURE__ */ jsx(
    "button",
    {
      onClick: handleCopy,
      className: `inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition duration-200 ${className}`,
      children: copied ? /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx(Check, { className: "w-5 h-5 mr-2 text-green-500" }),
        "Copied!"
      ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx(Copy, { className: "w-5 h-5 mr-2" }),
        "Copy Details"
      ] })
    }
  );
}
function StopsBadge({ stops, isRoundTrip = false }) {
  const getStopLabel = () => {
    if (stops === 0) return "Direct";
    if (stops === 1) return "1 Stop";
    return `${stops} Stops`;
  };
  const getStopColor = () => {
    if (stops === 0) return "bg-emerald-100 text-emerald-800";
    if (stops === 1) return "bg-amber-100 text-amber-800";
    return "bg-red-100 text-red-800";
  };
  return /* @__PURE__ */ jsxs("div", { className: `inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${getStopColor()}`, children: [
    /* @__PURE__ */ jsx(Plane, { className: "w-3 h-3 mr-1" }),
    getStopLabel(),
    isRoundTrip && stops === 0 && " (both ways)"
  ] });
}
function TimeDisplay({ time, showNextDay = false, isArrival = false }) {
  const date = new Date(time);
  const formattedTime = date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false
  });
  return /* @__PURE__ */ jsxs("div", { className: "relative", children: [
    /* @__PURE__ */ jsx("div", { className: "text-lg font-semibold", children: formattedTime }),
    showNextDay && /* @__PURE__ */ jsx("div", { className: `absolute ${isArrival ? "-right-6" : "-left-6"} top-0 text-xs font-medium text-red-600`, children: "+1" })
  ] });
}
function PriceSection({ basePrice, passengers, totalPrice, priceBreakdown }) {
  const { user } = useAuth();
  const [isAgentOrAdmin, setIsAgentOrAdmin] = React.useState(false);
  const [error, setError] = React.useState(null);
  React.useEffect(() => {
    const checkUserRole = async () => {
      if (!user) {
        setIsAgentOrAdmin(false);
        return;
      }
      try {
        if (user.email === "admin@example.com") {
          setIsAgentOrAdmin(true);
          return;
        }
        const { data } = await withErrorHandling(
          async () => {
            const { data: data2, error: error2 } = await supabase$1.from("sales_agents").select("is_active").eq("id", user.id).maybeSingle();
            if (error2) throw error2;
            return { data: data2 };
          },
          { data: null },
          "Failed to check agent status"
        );
        setIsAgentOrAdmin((data == null ? void 0 : data.is_active) ?? false);
        setError(null);
      } catch (err) {
        console.error("Error checking agent status:", err);
        setIsAgentOrAdmin(false);
        setError(err instanceof Error ? err.message : "Failed to verify agent status");
      }
    };
    checkUserRole();
  }, [user]);
  if (!isAgentOrAdmin) {
    return /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsxs("p", { className: "text-2xl font-bold text-blue-600", children: [
        Math.floor(totalPrice),
        " EUR"
      ] }),
      /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500", children: "Cmimi ne Total" })
    ] });
  }
  return /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
    /* @__PURE__ */ jsx("div", { className: "text-sm text-gray-500", children: "Base Price:" }),
    /* @__PURE__ */ jsxs("p", { className: "text-lg font-semibold", children: [
      Math.floor(basePrice),
      " EUR"
    ] }),
    (priceBreakdown == null ? void 0 : priceBreakdown.commission_amount) > 0 && /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx("div", { className: "text-sm text-gray-500 mt-2", children: "Service Fee:" }),
      /* @__PURE__ */ jsxs("p", { className: "text-lg font-semibold text-blue-600", children: [
        "+",
        Math.floor(priceBreakdown.commission_amount),
        " EUR"
      ] })
    ] }),
    (priceBreakdown == null ? void 0 : priceBreakdown.discounts) && priceBreakdown.discounts.length > 0 && /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx("div", { className: "text-sm text-gray-500 mt-2", children: "Discounts:" }),
      priceBreakdown.discounts.map((discount, index) => /* @__PURE__ */ jsxs("p", { className: "text-lg font-semibold text-green-600", children: [
        "-",
        Math.floor(discount.amount),
        " EUR (",
        discount.type,
        ")"
      ] }, index))
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "border-t border-gray-200 mt-2 pt-2", children: [
      /* @__PURE__ */ jsxs("p", { className: "text-2xl font-bold text-blue-600", children: [
        Math.floor(totalPrice),
        " EUR"
      ] }),
      /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500", children: "Cmimi ne Total" })
    ] }),
    error && /* @__PURE__ */ jsx("div", { className: "mt-2 text-sm text-red-600", children: error })
  ] });
}
function FlightCard({ flight, searchParams, batchId, onSelect }) {
  var _a2;
  const isRoundTrip = searchParams.tripType === "roundTrip";
  const renderFlightSegment = (flights, layovers, isReturn = false) => {
    if (!(flights == null ? void 0 : flights.length)) return null;
    const firstFlight = flights[0];
    const lastFlight = flights[flights.length - 1];
    const stops = flights.length - 1;
    const segmentDuration = flights.reduce((total, f) => total + f.duration, 0);
    const totalDuration = segmentDuration + ((layovers == null ? void 0 : layovers.reduce((total, layover) => total + layover.duration, 0)) || 0);
    const departureDate = new Date(firstFlight.departure_airport.time);
    const arrivalDate = new Date(lastFlight.arrival_airport.time);
    const isNextDay = arrivalDate.getDate() > departureDate.getDate();
    return /* @__PURE__ */ jsxs("div", { className: `flex flex-col ${isReturn ? "mt-4 pt-4 border-t border-gray-100" : ""}`, children: [
      isReturn && /* @__PURE__ */ jsx("div", { className: "text-sm font-medium text-blue-600 mb-2", children: "Return Flight" }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-6", children: [
        /* @__PURE__ */ jsx("div", { className: "flex-shrink-0 w-12", children: /* @__PURE__ */ jsx(
          "img",
          {
            src: firstFlight.airline_logo,
            alt: firstFlight.airline,
            className: "w-8 h-8 object-contain"
          }
        ) }),
        /* @__PURE__ */ jsxs("div", { className: "flex-1 grid grid-cols-3 gap-4", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx(
              TimeDisplay,
              {
                time: firstFlight.departure_airport.time
              }
            ),
            /* @__PURE__ */ jsx("div", { className: "text-sm text-gray-600", children: firstFlight.departure_airport.id })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center", children: [
            /* @__PURE__ */ jsxs("div", { className: "text-sm text-gray-500 flex items-center gap-1", children: [
              /* @__PURE__ */ jsx(Clock, { className: "w-4 h-4" }),
              formatDuration(totalDuration)
            ] }),
            /* @__PURE__ */ jsx(
              StopsBadge,
              {
                stops,
                isRoundTrip: isRoundTrip && !isReturn && !flight.return_flights
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "text-right", children: [
            /* @__PURE__ */ jsx(
              TimeDisplay,
              {
                time: lastFlight.arrival_airport.time,
                showNextDay: isNextDay,
                isArrival: true
              }
            ),
            /* @__PURE__ */ jsx("div", { className: "text-sm text-gray-600", children: lastFlight.arrival_airport.id })
          ] })
        ] })
      ] }),
      layovers && layovers.length > 0 && /* @__PURE__ */ jsx("div", { className: "mt-2 space-y-2", children: layovers.map((layover, idx) => /* @__PURE__ */ jsxs("div", { className: "flex items-center text-sm text-amber-600 bg-amber-50 px-3 py-2 rounded-lg", children: [
        /* @__PURE__ */ jsx(Clock, { className: "w-4 h-4 mr-2" }),
        /* @__PURE__ */ jsxs("span", { children: [
          formatDuration(layover.duration),
          " Ndalese ne ",
          layover.name,
          layover.overnight && " (overnight)"
        ] })
      ] }, idx)) }),
      /* @__PURE__ */ jsx("div", { className: "mt-2 flex flex-wrap gap-2", children: Array.from(new Set(flights.map((f) => f.airline))).map((airline, idx) => /* @__PURE__ */ jsx("div", { className: "inline-flex items-center px-2 py-1 bg-gray-50 rounded-md text-sm text-gray-600", children: airline }, idx)) })
    ] });
  };
  return /* @__PURE__ */ jsxs(
    "div",
    {
      onClick: onSelect,
      className: "bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer overflow-hidden",
      children: [
        /* @__PURE__ */ jsx("div", { className: "p-6", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col lg:flex-row lg:items-start justify-between gap-6", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
            renderFlightSegment(flight.outbound_flights || [], flight.outbound_layovers),
            flight.return_flights && flight.return_flights.length > 0 && renderFlightSegment(flight.return_flights, flight.return_layovers, true)
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "lg:w-64 flex flex-col items-center gap-4 lg:border-l lg:border-gray-100 lg:pl-6", children: [
            /* @__PURE__ */ jsx(
              PriceSection,
              {
                basePrice: (_a2 = flight.price_breakdown) == null ? void 0 : _a2.base_price,
                passengers: searchParams.passengers,
                totalPrice: flight.price
              }
            ),
            /* @__PURE__ */ jsx(
              WhatsAppButton,
              {
                flight,
                searchParams,
                batchId,
                className: "whatsapp-button w-full"
              }
            ),
            /* @__PURE__ */ jsx(
              CopyButton,
              {
                flight,
                searchParams,
                batchId,
                className: "w-full"
              }
            )
          ] })
        ] }) }),
        /* @__PURE__ */ jsx("div", { className: "bg-gray-50 px-6 py-3 border-t border-gray-100", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center text-sm text-gray-600", children: [
          /* @__PURE__ */ jsx("span", { children: searchParams.fromCode }),
          /* @__PURE__ */ jsx(ArrowRight, { className: "w-4 h-4 mx-2" }),
          /* @__PURE__ */ jsx("span", { children: searchParams.toCode }),
          searchParams.tripType === "roundTrip" && /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx(ArrowRight, { className: "w-4 h-4 mx-2 rotate-180" }),
            /* @__PURE__ */ jsx("span", { children: searchParams.fromCode })
          ] })
        ] }) })
      ]
    }
  );
}
function FlightList({
  flights = [],
  searchParams,
  batchId,
  onSelect,
  onBack,
  isSearchComplete = false
}) {
  const flightList = Array.isArray(flights) ? flights : [];
  if (isSearchComplete && flightList.length === 0) {
    return /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg shadow-md p-8 text-center", children: [
      /* @__PURE__ */ jsx(AlertCircle, { className: "mx-auto text-yellow-500 mb-4", size: 48 }),
      /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold text-gray-800 mb-2", children: "No Flights Found" }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-600 mb-4", children: "We couldn't find any flights matching your search criteria. Try adjusting your search parameters." }),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: onBack,
          className: "bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-200",
          children: "Modify Search"
        }
      )
    ] });
  }
  if (flightList.length === 0) {
    return null;
  }
  return /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 gap-4", children: flightList.map((flight, index) => /* @__PURE__ */ jsx(
    FlightCard,
    {
      flight,
      searchParams,
      batchId,
      onSelect: () => onSelect(flight)
    },
    `${flight.flights[0].flight_number}-${index}`
  )) });
}
const LOADING_MESSAGES = [
  "Duke kërkuar fluturimet më të mira për ju...",
  "Duke verifikuar disponueshmërinë e kompanive ajrore...",
  "Duke krahasuar çmimet në të gjitha kompanitë ajrore...",
  "Duke kontrolluar fluturimet direkte...",
  "Duke analizuar opsionet më të mira..."
];
const MILESTONES = [
  { percent: 25, message: "Duke kërkuar fluturimet..." },
  { percent: 50, message: "Duke verifikuar oraret..." },
  { percent: 75, message: "Duke finalizuar çmimet më të mira..." },
  { percent: 100, message: "Pothuajse gati!" }
];
const TRAVEL_FACTS = [
  "A e dinit se fluturimet në mëngjes kanë më pak turbulencë?",
  "Rezervimi 2-3 muaj përpara mund të kursejë deri në 20% të çmimit.",
  "E marta dhe e mërkura janë ditët më të lira për të udhëtuar.",
  "Destinacionet më të lira për të fluturuar ndryshojnë sipas sezonit dhe kërkesës.",
  "Pasagjerët që rezervojnë bileta vajtje-ardhje shpesh përfitojnë tarifa më të ulëta.",
  "Fluturimi me linja ajrore me ndalesa mund të kursejë deri në 30% krahasuar me fluturimet direkte.",
  "Aeroportet më të ngarkuara në botë janë Atlanta, Dubai dhe Londra Heathrow.",
  "Më shumë se 90,000 fluturime ndodhin çdo ditë në botë.",
  "Fluturimet në mesjavë janë shpesh më të lira se ato të fundjavës.",
  "Në shumicen e aeroporteve, kalimi i sigurisë është më i shpejtë në orët e pasdites.",
  "Disa vende kërkojnë që pasaporta juaj të ketë të paktën 6 muaj vlefshmëri përpara hyrjes.",
  "Nëse keni vetëm bagazh dore, mund të kaloni më shpejt në daljen e aeroportit.",
  "Taksitë e prenotuara online janë më të lira se ato të marra direkt nga aeroporti.",
  "Dritaret e avionëve janë të vogla për të reduktuar presionin mbi trupin gjatë fluturimit.",
  "Nëse humbni një bagazh, raportoni menjëherë pasi vonesa mbi 24 orë mund të ndikojë në kompensimin tuaj.",
  "Kombinimi i linjave ajrore të ndryshme mund të jetë më i lirë se një biletë vajtje-ardhje me të njëjtën kompani.",
  "Në Japoni, trenat vonohen mesatarisht vetëm 18 sekonda në vit!",
  "Në Dubai, ekziston një ATM që të jep flori në vend të parave.",
  "Piloti dhe kopiloti hanë vakte të ndryshme për të shmangur helmimet ushqimore.",
  "Mali Everest është kaq i lartë sa disa aeroplanë fluturojnë më poshtë se maja e tij!",
  "Parisi ka më shumë kafene sesa ditë në vit – mbi 1,800!",
  "Në Venedik, mund të marrësh gjobë për ushqyerjen e pëllumbave në sheshin San Marco.",
  "Londra ka mbi 20 tunele sekrete të metrosë të mbyllura për publikun!",
  "Në Islandë, numri i deleve është më i madh se ai i njerëzve!",
  "Në Malajzi ndodhet restoranti më i lartë në botë – Sky Restaurant 2020 në Kuala Lumpur.",
  "Sahara dikur ishte një oqean – miliona vite më parë, kishte ujë dhe jetë detare!",
  "Në Korenë e Jugut, numri 4 është i pafat, prandaj shumë ashensorë nuk kanë katin e katërt!",
  "Në Hong Kong ka më shumë kulla qiell-gërvishtese se në New York!",
  "Në Japoni, ekzistojnë hotele me zero staf njerëzor – gjithçka menaxhohet nga robotë!",
  "Ka një qytet në Norvegji ku dielli nuk perëndon për 76 ditë gjatë verës!",
  "Në Finlandë, mund të gjesh sauna brenda autobusëve dhe madje edhe brenda kabinave telefonike!",
  "Në Indi, ka një tempull të dedikuar për minjtë, dhe ata trajtohen si të shenjtë!",
  "Në San Francisko ka një muze të tërë dedikuar çantave të dorës!",
  "Në Australi, ekziston një rrugë kaq e drejtë dhe e gjatë sa duket sikur nuk ka fund – 146 km pa asnjë kthesë!",
  "Në disa aeroporte, mund të marrësh me qira dhoma gjumi të vogla për një pushim të shpejtë para fluturimit!",
  "Në Tajlandë ndodhet restoranti më i vogël në botë – ka vetëm një tavolinë për dy persona!",
  "Në Indi, treni më i gjatë në botë ka mbi 1,200 metra gjatësi dhe transporton mbi 4,000 pasagjerë në një udhëtim!",
  "Në Islandë, emri yt duhet të miratohet nga një listë zyrtare para se të regjistrohet zyrtarisht!",
  'Në Mongoli, gjysma e popullsisë jeton në çadra tradicionale që quhen "ger"!',
  "Në Hawaii, nuk ka gjarpërinj natyralë – është një nga vendet e pakta pa ta!",
  "Në Kili, mund të vizitosh shkretëtirën Atacama, që është vendi më i thatë në Tokë!",
  "Në Zelandën e Re, numri i deleve është 6-fish më i lartë se ai i njerëzve!",
  "Në Japoni, ka një kafene ku mund të punosh me një sasi të caktuar kafeje falas, por nuk të lejohet të largohesh derisa të përfundosh detyrën tënde!",
  "Në Kanada, ka një liqen që është i mbushur me pika minerale, duke krijuar një pamje sikur është bërë nga mozaikë!",
  "Në Holandë, ka më shumë biçikleta sesa banorë!",
  "Në Afrikën e Jugut, ekziston një restorant brenda një shpelle të vjetër 180,000 vjet!",
  'Në Spanjë, çdo vit mbahet festivali "Tomatina" ku njerëzit luftojnë me domate!',
  "Në Marok, ndodhet një qytet i tërë i lyer me ngjyrë blu – Chefchaouen!",
  "Në Dubai ndodhet ashensori më i shpejtë në botë – të çon në katin e 124 në më pak se 60 sekonda!"
];
function LoadingState({
  message = "Duke kërkuar fluturimet...",
  progress,
  onTimeout,
  onRetry,
  onBack
}) {
  const [timeoutReached, setTimeoutReached] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [messageIndex, setMessageIndex] = useState(0);
  const [travelFact, setTravelFact] = useState(() => {
    const randomIndex = Math.floor(Math.random() * TRAVEL_FACTS.length);
    return TRAVEL_FACTS[randomIndex];
  });
  const TIMEOUT_DURATION = 30;
  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % LOADING_MESSAGES.length);
    }, 3e3);
    return () => clearInterval(interval);
  }, []);
  useEffect(() => {
    const interval = setInterval(() => {
      let newIndex;
      do {
        newIndex = Math.floor(Math.random() * TRAVEL_FACTS.length);
      } while (TRAVEL_FACTS[newIndex] === travelFact);
      setTravelFact(TRAVEL_FACTS[newIndex]);
    }, 5e3);
    return () => clearInterval(interval);
  }, [travelFact]);
  useEffect(() => {
    const startTime = Date.now();
    const timer = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startTime) / 1e3);
      setElapsedTime(elapsed);
      if (elapsed >= TIMEOUT_DURATION && !timeoutReached) {
        setTimeoutReached(true);
        if (onTimeout) onTimeout();
        clearInterval(timer);
      }
    }, 1e3);
    return () => clearInterval(timer);
  }, [onTimeout]);
  const getCurrentMilestone = () => {
    if (!progress) return null;
    return MILESTONES.find((m) => progress <= m.percent);
  };
  if (timeoutReached) {
    return /* @__PURE__ */ jsx("div", { className: "min-h-[400px] flex flex-col items-center justify-center p-8", children: /* @__PURE__ */ jsxs("div", { className: "bg-red-50 border border-red-100 rounded-2xl p-8 max-w-md w-full text-center", children: [
      /* @__PURE__ */ jsx("div", { className: "relative mb-6", children: /* @__PURE__ */ jsx("div", { className: "w-16 h-16 mx-auto bg-red-100 rounded-full flex items-center justify-center", children: /* @__PURE__ */ jsx(AlertTriangle, { className: "w-8 h-8 text-red-600" }) }) }),
      /* @__PURE__ */ jsx("h3", { className: "text-xl font-semibold text-gray-900 mb-2", children: "Na vjen keq, por kërkimi po zgjat shumë" }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-600 mb-6", children: "Ju lutemi provoni përsëri ose ndryshoni parametrat e kërkimit tuaj" }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row gap-3 justify-center", children: [
        /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: onRetry,
            className: "inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors",
            children: [
              /* @__PURE__ */ jsx(RefreshCw, { className: "w-5 h-5 mr-2" }),
              "Provo Përsëri"
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: onBack,
            className: "inline-flex items-center justify-center px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors",
            children: [
              /* @__PURE__ */ jsx(ArrowLeft, { className: "w-5 h-5 mr-2" }),
              "Kthehu Mbrapa"
            ]
          }
        )
      ] })
    ] }) });
  }
  return /* @__PURE__ */ jsxs("div", { className: "min-h-[400px] flex flex-col items-center justify-center p-8", children: [
    /* @__PURE__ */ jsxs("div", { className: "relative mb-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "w-32 h-32 rounded-full bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center", children: [
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-blue-100 rounded-full animate-ping opacity-75" }),
        /* @__PURE__ */ jsx("div", { className: "relative", children: /* @__PURE__ */ jsx(
          Plane,
          {
            className: "w-16 h-16 text-blue-600 animate-pulse transform -rotate-45"
          }
        ) })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "absolute top-1/2 -left-12 w-8 h-8 bg-white rounded-full animate-cloud-1 opacity-80" }),
      /* @__PURE__ */ jsx("div", { className: "absolute top-1/4 -right-12 w-10 h-10 bg-white rounded-full animate-cloud-2 opacity-60" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "text-center mb-8 max-w-md", children: [
      /* @__PURE__ */ jsx("h3", { className: "text-2xl font-semibold text-gray-900 mb-2", children: "Prisni pak!" }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-600 animate-fade-in", children: LOADING_MESSAGES[messageIndex] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "w-full max-w-md mb-8", children: progress !== void 0 && /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx("div", { className: "h-2 bg-gray-100 rounded-full overflow-hidden mb-4", children: /* @__PURE__ */ jsx(
        "div",
        {
          className: "h-full bg-blue-600 transition-all duration-300 ease-out",
          style: { width: `${progress}%` }
        }
      ) }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 gap-2", children: MILESTONES.map((milestone, index) => {
        var _a2;
        const isComplete = progress >= milestone.percent;
        const isCurrent = ((_a2 = getCurrentMilestone()) == null ? void 0 : _a2.percent) === milestone.percent;
        return /* @__PURE__ */ jsxs(
          "div",
          {
            className: `flex items-center gap-2 text-sm ${isComplete ? "text-green-600" : isCurrent ? "text-blue-600" : "text-gray-400"}`,
            children: [
              isComplete ? /* @__PURE__ */ jsx(Check, { className: "w-4 h-4" }) : /* @__PURE__ */ jsx(Clock, { className: "w-4 h-4" }),
              milestone.message
            ]
          },
          index
        );
      }) })
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "text-center mb-8", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center gap-2 text-sm text-gray-600 mb-4", children: [
      /* @__PURE__ */ jsx(Shield, { className: "w-4 h-4 text-green-600" }),
      "Verifikojmë disponueshmërinë në kohë reale"
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "text-sm text-gray-600 max-w-md text-center animate-fade-in", children: /* @__PURE__ */ jsx("div", { className: "bg-blue-50 rounded-lg p-4 border border-blue-100", children: /* @__PURE__ */ jsx("p", { children: travelFact }) }) }),
    elapsedTime > 20 && !timeoutReached && /* @__PURE__ */ jsx("div", { className: "text-sm text-amber-600 animate-pulse mt-4", children: "Kërkimi po merr pak më shumë kohë se zakonisht..." }),
    /* @__PURE__ */ jsxs("div", { className: "text-sm text-gray-500 mt-4", children: [
      TIMEOUT_DURATION - elapsedTime,
      " sekonda të mbetura"
    ] })
  ] });
}
function ErrorState({ message, onBack, onRetry }) {
  return /* @__PURE__ */ jsx("div", { className: "min-h-screen bg-gray-100 p-8", children: /* @__PURE__ */ jsxs("div", { className: "max-w-md mx-auto bg-white rounded-lg shadow-md p-8 text-center", children: [
    /* @__PURE__ */ jsx(AlertCircle, { className: "w-12 h-12 text-red-500 mx-auto mb-4" }),
    /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold text-gray-900 mb-2", children: "Search Error" }),
    /* @__PURE__ */ jsx("p", { className: "text-gray-600 mb-6", children: message }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row gap-4 justify-center", children: [
      /* @__PURE__ */ jsxs(
        "button",
        {
          onClick: onRetry,
          className: "flex items-center justify-center px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors",
          children: [
            /* @__PURE__ */ jsx(RefreshCw, { className: "w-4 h-4 mr-2" }),
            "Try Again"
          ]
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: onBack,
          className: "px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors",
          children: "Back to Search"
        }
      )
    ] })
  ] }) });
}
function FlightDetailModal({ isOpen, onClose, flightOption, searchParams }) {
  var _a2, _b2;
  const [formattedMessage, setFormattedMessage] = useState(null);
  const WHATSAPP_PHONE = "355695161381";
  React.useEffect(() => {
    if (isOpen && flightOption) {
      formatFlightMessage(flightOption, searchParams).then((message) => setFormattedMessage(message)).catch((err) => console.error("Error formatting message:", err));
    }
  }, [isOpen, flightOption, searchParams]);
  const handleContact = () => {
    if (formattedMessage) {
      window.open(`https://api.whatsapp.com/send/?phone=${WHATSAPP_PHONE}&text=${encodeURIComponent(formattedMessage)}`, "_blank");
    }
  };
  if (!isOpen) return null;
  if (!((_a2 = flightOption == null ? void 0 : flightOption.flights) == null ? void 0 : _a2.length)) {
    return /* @__PURE__ */ jsx("div", { className: "fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center", children: /* @__PURE__ */ jsx("div", { className: "bg-white w-full md:max-w-3xl md:w-full max-h-[90vh] rounded-t-xl md:rounded-xl p-8", children: /* @__PURE__ */ jsx("div", { className: "text-center", children: /* @__PURE__ */ jsx("p", { className: "text-gray-600", children: "No flight details available" }) }) }) });
  }
  const FlightSegment = ({
    flights,
    layovers,
    title
  }) => {
    if (!(flights == null ? void 0 : flights.length)) return null;
    const stops = flights.length - 1;
    flights.reduce((total, f) => total + f.duration, 0);
    return /* @__PURE__ */ jsxs("div", { className: "mb-6 last:mb-0", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsx("div", { className: "w-1 h-6 bg-blue-600 rounded-full" }),
          /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold text-gray-900", children: title })
        ] }),
        /* @__PURE__ */ jsx(StopsBadge, { stops })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden", children: [
        /* @__PURE__ */ jsx("div", { className: "bg-gray-50 p-3 border-b border-gray-100", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center gap-2 text-gray-700", children: [
          /* @__PURE__ */ jsx(Calendar, { className: "w-4 h-4 text-blue-600" }),
          /* @__PURE__ */ jsx("span", { className: "text-sm font-medium", children: new Date(flights[0].departure_airport.time).toLocaleDateString("en-US", {
            weekday: "short",
            month: "short",
            day: "numeric",
            year: "numeric"
          }) })
        ] }) }),
        /* @__PURE__ */ jsxs("div", { className: "p-4", children: [
          /* @__PURE__ */ jsx("div", { className: "text-left mb-4", children: /* @__PURE__ */ jsxs("div", { className: "text-lg font-medium text-gray-900", children: [
            flights[0].departure_airport.name,
            " - ",
            flights[flights.length - 1].arrival_airport.name
          ] }) }),
          flights.map((flight, index) => /* @__PURE__ */ jsxs(React.Fragment, { children: [
            /* @__PURE__ */ jsx("div", { className: "flex flex-col gap-4 py-4 first:pt-0 last:pb-0", children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-3 gap-2 md:gap-8", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("div", { className: "text-sm text-gray-500 mb-1", children: "Nisja" }),
                /* @__PURE__ */ jsx("div", { className: "text-xl font-bold", children: new Date(flight.departure_airport.time).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit"
                }) }),
                /* @__PURE__ */ jsxs("div", { className: "text-sm text-gray-600", children: [
                  flight.departure_airport.name,
                  " (",
                  flight.departure_airport.id,
                  ")"
                ] })
              ] }),
              /* @__PURE__ */ jsx("div", { className: "flex flex-col text-left items-start justify-start", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-start gap-2 text-sm text-green-600", children: [
                /* @__PURE__ */ jsx(Clock, { className: "w-4 h-4" }),
                formatDuration(flight.duration)
              ] }) }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("div", { className: "text-sm text-gray-500 mb-1", children: "Mberritja" }),
                /* @__PURE__ */ jsx("div", { className: "text-xl font-bold", children: new Date(flight.arrival_airport.time).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit"
                }) }),
                /* @__PURE__ */ jsxs("div", { className: "text-sm text-gray-600", children: [
                  flight.arrival_airport.name,
                  " (",
                  flight.arrival_airport.id,
                  ")"
                ] })
              ] })
            ] }) }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsx(
                "img",
                {
                  src: flight.airline_logo,
                  alt: flight.airline,
                  className: "w-8 h-8 object-contain"
                }
              ),
              /* @__PURE__ */ jsxs("div", { className: "flex gap-3 items-center", children: [
                /* @__PURE__ */ jsx("div", { className: "font-medium text-gray-900", children: flight.airline }),
                /* @__PURE__ */ jsxs("div", { className: "text-sm text-gray-600", children: [
                  "Fluturimi ",
                  flight.flight_number
                ] })
              ] })
            ] }),
            layovers && index < flights.length - 1 && layovers[index] && /* @__PURE__ */ jsxs("div", { className: "my-4 p-3 bg-amber-50 rounded-lg border border-amber-100", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-amber-700", children: [
                /* @__PURE__ */ jsx(Clock, { className: "w-4 h-4" }),
                /* @__PURE__ */ jsxs("span", { className: "text-sm font-medium", children: [
                  formatDuration(layovers[index].duration),
                  " Ndalese ne ",
                  layovers[index].name
                ] })
              ] }),
              layovers[index].overnight && /* @__PURE__ */ jsx("div", { className: "mt-1 text-sm text-amber-600", children: "⚠️ Overnight layover" })
            ] })
          ] }, index))
        ] })
      ] })
    ] });
  };
  return /* @__PURE__ */ jsx("div", { className: "fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end md:items-center justify-center", children: /* @__PURE__ */ jsxs("div", { className: "bg-white w-full md:rounded-xl md:max-w-3xl md:w-full max-h-[90vh] overflow-y-auto rounded-t-xl", children: [
    /* @__PURE__ */ jsx("div", { className: "sticky top-0 bg-white border-b border-gray-200", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 p-4", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: onClose,
          className: "p-2 hover:bg-gray-100 rounded-full transition-colors",
          children: /* @__PURE__ */ jsx(X, { className: "w-5 h-5" })
        }
      ),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h2", { className: "text-lg font-bold text-gray-900", children: "Detajet e Fluturimit" }),
        /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-600", children: [
          searchParams.fromLocation,
          " → ",
          searchParams.toLocation
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: "p-4", children: [
      /* @__PURE__ */ jsx(
        FlightSegment,
        {
          flights: flightOption.outbound_flights || [],
          layovers: flightOption.outbound_layovers,
          title: searchParams.tripType === "roundTrip" ? "Fluturimi Vajtjes" : "Flight"
        }
      ),
      flightOption.return_flights && flightOption.return_flights.length > 0 && /* @__PURE__ */ jsx(
        FlightSegment,
        {
          flights: flightOption.return_flights,
          layovers: flightOption.return_layovers,
          title: "Fluturimi Kthimit"
        }
      )
    ] }),
    /* @__PURE__ */ jsx("div", { className: "sticky bottom-0 bg-white border-t border-gray-200 p-4", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-3", children: [
      /* @__PURE__ */ jsx(
        PriceSection,
        {
          basePrice: (_b2 = flightOption.price_breakdown) == null ? void 0 : _b2.base_price,
          passengers: searchParams.passengers,
          totalPrice: flightOption.price
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: handleContact,
          className: "w-full bg-green-500 text-white py-3 px-4 rounded-lg font-semibold hover:bg-green-600 transition-colors text-center",
          children: "Kontakto per Rezervim"
        }
      )
    ] }) })
  ] }) });
}
const STOP_OPTIONS = [
  { value: "direct", label: "Direct", roundTripLabel: "Direct (both ways)" },
  { value: "1stop", label: "1 Stop", roundTripLabel: "1 Stop (per leg)" },
  { value: "2plus", label: "2+ Stops", roundTripLabel: "2+ Stops (any leg)" }
];
function StopsFilter({ selectedStops, onChange, isRoundTrip = false }) {
  const handleToggle = (value) => {
    const newStops = selectedStops.includes(value) ? selectedStops.filter((stop) => stop !== value) : [...selectedStops, value];
    onChange(newStops);
  };
  return /* @__PURE__ */ jsx("div", { className: "space-y-3", children: STOP_OPTIONS.map((option) => /* @__PURE__ */ jsxs(
    "label",
    {
      className: "flex items-center group cursor-pointer",
      children: [
        /* @__PURE__ */ jsxs("div", { className: "relative flex items-center", children: [
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "checkbox",
              checked: selectedStops.includes(option.value),
              onChange: () => handleToggle(option.value),
              className: "peer sr-only"
            }
          ),
          /* @__PURE__ */ jsx("div", { className: "w-5 h-5 border-2 border-gray-300 rounded transition-colors peer-checked:border-blue-600 peer-checked:bg-blue-600 group-hover:border-blue-400", children: /* @__PURE__ */ jsx(
            "svg",
            {
              className: "w-3 h-3 mx-auto mt-0.5 text-white opacity-0 peer-checked:opacity-100",
              fill: "none",
              viewBox: "0 0 24 24",
              stroke: "currentColor",
              children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 3, d: "M5 13l4 4L19 7" })
            }
          ) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "ml-3 flex items-center", children: [
          /* @__PURE__ */ jsx(Plane, { className: `w-4 h-4 mr-2 ${selectedStops.includes(option.value) ? "text-blue-600" : "text-gray-400"}` }),
          /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-700", children: isRoundTrip ? option.roundTripLabel : option.label })
        ] })
      ]
    },
    option.value
  )) });
}
const TIME_RANGES = [
  { value: "morning", label: "Morning (06:00 - 11:59)", icon: Sunrise },
  { value: "afternoon", label: "Afternoon (12:00 - 17:59)", icon: Sun },
  { value: "evening", label: "Evening (18:00 - 23:59)", icon: Sunset },
  { value: "night", label: "Night (00:00 - 05:59)", icon: Moon }
];
function TimeRangeFilter({ selectedRanges, onChange }) {
  const handleToggle = (value) => {
    const newRanges = selectedRanges.includes(value) ? selectedRanges.filter((range) => range !== value) : [...selectedRanges, value];
    onChange(newRanges);
  };
  return /* @__PURE__ */ jsx("div", { className: "space-y-3", children: TIME_RANGES.map((range) => {
    const Icon = range.icon;
    const isSelected = selectedRanges.includes(range.value);
    return /* @__PURE__ */ jsxs(
      "label",
      {
        className: "flex items-center group cursor-pointer",
        children: [
          /* @__PURE__ */ jsxs("div", { className: "relative flex items-center", children: [
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "checkbox",
                checked: isSelected,
                onChange: () => handleToggle(range.value),
                className: "peer sr-only"
              }
            ),
            /* @__PURE__ */ jsx("div", { className: "w-5 h-5 border-2 border-gray-300 rounded transition-colors peer-checked:border-blue-600 peer-checked:bg-blue-600 group-hover:border-blue-400", children: /* @__PURE__ */ jsx(
              "svg",
              {
                className: "w-3 h-3 mx-auto mt-0.5 text-white opacity-0 peer-checked:opacity-100",
                fill: "none",
                viewBox: "0 0 24 24",
                stroke: "currentColor",
                children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 3, d: "M5 13l4 4L19 7" })
              }
            ) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "ml-3 flex items-center", children: [
            /* @__PURE__ */ jsx(Icon, { className: `w-4 h-4 mr-2 ${isSelected ? "text-blue-600" : "text-gray-400"}` }),
            /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-700", children: range.label })
          ] })
        ]
      },
      range.value
    );
  }) });
}
function AirlineFilter({ airlines, selectedAirlines, onChange }) {
  const handleToggle = (airline) => {
    const newAirlines = selectedAirlines.includes(airline) ? selectedAirlines.filter((a) => a !== airline) : [...selectedAirlines, airline];
    onChange(newAirlines);
  };
  const handleSelectAll = () => {
    onChange(airlines);
  };
  const handleClearAll = () => {
    onChange([]);
  };
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-3", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsx(Plane, { className: "w-4 h-4 text-gray-400" }),
        /* @__PURE__ */ jsx("span", { className: "text-sm font-medium text-gray-900", children: "Airlines" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-x-3", children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: handleSelectAll,
            className: "text-xs text-blue-600 hover:text-blue-800 font-medium",
            children: "Select All"
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: handleClearAll,
            className: "text-xs text-blue-600 hover:text-blue-800 font-medium",
            children: "Clear All"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "space-y-3 max-h-48 overflow-y-auto pr-2 scrollbar-thin", children: airlines.map((airline) => /* @__PURE__ */ jsxs(
      "label",
      {
        className: "flex items-center group cursor-pointer",
        children: [
          /* @__PURE__ */ jsxs("div", { className: "relative flex items-center", children: [
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "checkbox",
                checked: selectedAirlines.includes(airline),
                onChange: () => handleToggle(airline),
                className: "peer sr-only"
              }
            ),
            /* @__PURE__ */ jsx("div", { className: "w-5 h-5 border-2 border-gray-300 rounded transition-colors peer-checked:border-blue-600 peer-checked:bg-blue-600 group-hover:border-blue-400", children: /* @__PURE__ */ jsx(
              "svg",
              {
                className: "w-3 h-3 mx-auto mt-0.5 text-white opacity-0 peer-checked:opacity-100",
                fill: "none",
                viewBox: "0 0 24 24",
                stroke: "currentColor",
                children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 3, d: "M5 13l4 4L19 7" })
              }
            ) })
          ] }),
          /* @__PURE__ */ jsx("span", { className: "ml-3 text-sm text-gray-700", children: airline })
        ]
      },
      airline
    )) })
  ] });
}
function PriceFilter({ range, min, max, onChange }) {
  const handleMinChange = (e) => {
    const newMin = Math.max(min, Math.min(range.max, Number(e.target.value)));
    onChange({ ...range, min: newMin });
  };
  const handleMaxChange = (e) => {
    const newMax = Math.min(max, Math.max(range.min, Number(e.target.value)));
    onChange({ ...range, max: newMax });
  };
  const getPercentage = (value) => {
    return (value - min) / (max - min) * 100;
  };
  return /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "block text-xs text-gray-500 mb-1", children: "Min Price" }),
        /* @__PURE__ */ jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsx(Euro, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "number",
              min,
              max: range.max,
              value: range.min,
              onChange: handleMinChange,
              className: "w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "block text-xs text-gray-500 mb-1", children: "Max Price" }),
        /* @__PURE__ */ jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsx(Euro, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "number",
              min: range.min,
              max,
              value: range.max,
              onChange: handleMaxChange,
              className: "w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            }
          )
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "relative pt-2", children: [
      /* @__PURE__ */ jsx("div", { className: "h-2 bg-gray-200 rounded-full", children: /* @__PURE__ */ jsx(
        "div",
        {
          className: "absolute h-2 bg-blue-600 rounded-full",
          style: {
            left: `${getPercentage(range.min)}%`,
            right: `${100 - getPercentage(range.max)}%`
          }
        }
      ) }),
      /* @__PURE__ */ jsx(
        "input",
        {
          type: "range",
          min,
          max,
          value: range.min,
          onChange: handleMinChange,
          className: "absolute w-full h-2 appearance-none bg-transparent pointer-events-none",
          style: {
            WebkitAppearance: "none",
            zIndex: 3
          }
        }
      ),
      /* @__PURE__ */ jsx(
        "input",
        {
          type: "range",
          min,
          max,
          value: range.max,
          onChange: handleMaxChange,
          className: "absolute w-full h-2 appearance-none bg-transparent pointer-events-none",
          style: {
            WebkitAppearance: "none",
            zIndex: 4
          }
        }
      )
    ] })
  ] });
}
function FlightFilterPanel({
  flights,
  filters,
  onFilterChange,
  isRoundTrip,
  className = "",
  isOpen = false,
  onClose
}) {
  const [expandedSections, setExpandedSections] = useState(/* @__PURE__ */ new Set(["stops", "price"]));
  const airlines = React.useMemo(() => {
    const uniqueAirlines = /* @__PURE__ */ new Set();
    flights.forEach((flight) => {
      flight.flights.forEach((segment) => {
        uniqueAirlines.add(segment.airline);
      });
    });
    return Array.from(uniqueAirlines).sort();
  }, [flights]);
  const priceRange = React.useMemo(() => {
    if (!flights.length) return { min: 0, max: 1e3 };
    const prices = flights.map((f) => f.price);
    return {
      min: Math.floor(Math.min(...prices)),
      max: Math.ceil(Math.max(...prices))
    };
  }, [flights]);
  const handleReset = () => {
    onFilterChange({
      stops: [],
      departureTime: [],
      returnTime: [],
      airlines: [],
      priceRange: {
        min: priceRange.min,
        max: priceRange.max
      }
    });
  };
  const toggleSection = (sectionId) => {
    setExpandedSections((prev) => {
      const next = new Set(prev);
      if (next.has(sectionId)) {
        next.delete(sectionId);
      } else {
        next.add(sectionId);
      }
      return next;
    });
  };
  const filterSections = [
    {
      id: "stops",
      title: "Stops",
      component: /* @__PURE__ */ jsx(
        StopsFilter,
        {
          selectedStops: filters.stops,
          onChange: (stops) => onFilterChange({ ...filters, stops }),
          isRoundTrip
        }
      ),
      defaultExpanded: true
    },
    {
      id: "departure",
      title: "Departure Time",
      component: /* @__PURE__ */ jsx(
        TimeRangeFilter,
        {
          title: "Departure Time",
          selectedRanges: filters.departureTime,
          onChange: (ranges) => onFilterChange({ ...filters, departureTime: ranges })
        }
      )
    },
    ...isRoundTrip ? [{
      id: "return",
      title: "Return Time",
      component: /* @__PURE__ */ jsx(
        TimeRangeFilter,
        {
          title: "Return Time",
          selectedRanges: filters.returnTime,
          onChange: (ranges) => onFilterChange({ ...filters, returnTime: ranges })
        }
      )
    }] : [],
    {
      id: "airlines",
      title: "Airlines",
      component: /* @__PURE__ */ jsx(
        AirlineFilter,
        {
          airlines,
          selectedAirlines: filters.airlines,
          onChange: (airlines2) => onFilterChange({ ...filters, airlines: airlines2 })
        }
      )
    },
    {
      id: "price",
      title: "Price Range",
      component: /* @__PURE__ */ jsx(
        PriceFilter,
        {
          range: filters.priceRange,
          min: priceRange.min,
          max: priceRange.max,
          onChange: (range) => onFilterChange({ ...filters, priceRange: range })
        }
      ),
      defaultExpanded: true
    }
  ];
  const hasActiveFilters = filters.stops.length > 0 || filters.departureTime.length > 0 || filters.returnTime.length > 0 || filters.airlines.length > 0 || filters.priceRange.min > priceRange.min || filters.priceRange.max < priceRange.max;
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      "div",
      {
        className: `
          fixed lg:relative inset-0 lg:inset-auto z-30 lg:z-auto
          bg-white lg:bg-transparent
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
          ${className}
        `,
        children: /* @__PURE__ */ jsxs("div", { className: "h-full lg:h-auto overflow-y-auto lg:overflow-visible p-6 lg:p-0", children: [
          /* @__PURE__ */ jsxs("div", { className: "lg:hidden flex items-center justify-between mb-6", children: [
            /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold", children: "Filters" }),
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: onClose,
                className: "p-2 hover:bg-gray-100 rounded-full transition-colors",
                children: /* @__PURE__ */ jsx(X, { className: "w-6 h-6" })
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
            hasActiveFilters && /* @__PURE__ */ jsx("div", { className: "flex justify-end", children: /* @__PURE__ */ jsx(
              "button",
              {
                onClick: handleReset,
                className: "text-sm text-blue-600 hover:text-blue-800 font-medium",
                children: "Reset All Filters"
              }
            ) }),
            /* @__PURE__ */ jsx("div", { className: "space-y-4", children: filterSections.map((section) => /* @__PURE__ */ jsxs(
              "div",
              {
                className: "bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden",
                children: [
                  /* @__PURE__ */ jsxs(
                    "button",
                    {
                      onClick: () => toggleSection(section.id),
                      className: "w-full px-4 py-3 flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition-colors",
                      children: [
                        /* @__PURE__ */ jsx("h3", { className: "text-sm font-semibold text-gray-900", children: section.title }),
                        expandedSections.has(section.id) ? /* @__PURE__ */ jsx(ChevronUp, { className: "w-4 h-4 text-gray-500" }) : /* @__PURE__ */ jsx(ChevronDown, { className: "w-4 h-4 text-gray-500" })
                      ]
                    }
                  ),
                  expandedSections.has(section.id) && /* @__PURE__ */ jsx("div", { className: "p-4 border-t border-gray-100", children: section.component })
                ]
              },
              section.id
            )) })
          ] })
        ] })
      }
    ),
    isOpen && /* @__PURE__ */ jsx(
      "div",
      {
        className: "fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden",
        onClick: onClose
      }
    )
  ] });
}
const SORT_OPTIONS = [
  {
    value: "best",
    label: "Best",
    icon: /* @__PURE__ */ jsx(Star, { className: "w-4 h-4 md:w-5 md:h-5" }),
    description: "Balanced score based on price, duration, and convenience"
  },
  {
    value: "cheapest",
    label: "Cheapest",
    icon: /* @__PURE__ */ jsx(ArrowDownAZ, { className: "w-4 h-4 md:w-5 md:h-5" }),
    description: "Lowest price first"
  },
  {
    value: "fastest",
    label: "Fastest",
    icon: /* @__PURE__ */ jsx(Clock, { className: "w-4 h-4 md:w-5 md:h-5" }),
    description: "Shortest duration first"
  }
];
function SortingOptions({ value, onChange }) {
  return /* @__PURE__ */ jsx("div", { className: "bg-white shadow-sm border border-gray-100", children: /* @__PURE__ */ jsx("div", { className: "grid grid-cols-3 divide-x divide-gray-100", children: SORT_OPTIONS.map((option) => /* @__PURE__ */ jsxs(
    "button",
    {
      onClick: () => onChange(option.value),
      title: option.description,
      className: `
              flex items-center justify-center gap-1.5 md:gap-2 px-2 md:px-6 py-2.5 md:py-3
              font-medium text-sm md:text-base transition-all duration-200
              ${value === option.value ? "bg-blue-600 text-white shadow-sm transform scale-[1.02]" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"}
            `,
      children: [
        option.icon,
        /* @__PURE__ */ jsx("span", { className: "whitespace-nowrap", children: option.label })
      ]
    },
    option.value
  )) }) });
}
function ProgressBar({ progress, message }) {
  return /* @__PURE__ */ jsx("div", { className: "bg-blue-50 border-b border-blue-100", children: /* @__PURE__ */ jsx("div", { className: "container mx-auto px-4 py-3", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
    /* @__PURE__ */ jsx("div", { className: "flex-1 h-2 bg-blue-100 rounded-full overflow-hidden", children: /* @__PURE__ */ jsx(
      "div",
      {
        className: "h-full bg-blue-600 transition-all duration-300 ease-out",
        style: { width: `${progress}%` }
      }
    ) }),
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-sm text-blue-700 whitespace-nowrap", children: [
      /* @__PURE__ */ jsx(Loader2, { className: "w-4 h-4 animate-spin" }),
      message
    ] })
  ] }) }) });
}
function ShowMoreButton({ visibleCount, totalCount, onClick }) {
  const remainingCount = totalCount - visibleCount;
  return /* @__PURE__ */ jsxs(
    "button",
    {
      onClick,
      className: "w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 \n        text-white font-medium py-4 rounded-lg shadow-md hover:shadow-lg \n        transform hover:scale-[1.01] transition-all duration-200\n        flex items-center justify-center gap-3",
      children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsx(ChevronDown, { className: "w-5 h-5 animate-bounce" }),
          /* @__PURE__ */ jsxs("span", { className: "text-lg", children: [
            "Show ",
            Math.min(remainingCount, 5),
            " More Flights"
          ] })
        ] }),
        /* @__PURE__ */ jsxs("span", { className: "text-orange-200 text-sm", children: [
          "(",
          visibleCount,
          " of ",
          totalCount,
          ")"
        ] })
      ]
    }
  );
}
function isInTimeRange(time, ranges) {
  if (ranges.length === 0) return true;
  const hour = new Date(time).getHours();
  return ranges.some((range) => {
    switch (range) {
      case "morning":
        return hour >= 6 && hour < 12;
      case "afternoon":
        return hour >= 12 && hour < 18;
      case "evening":
        return hour >= 18 && hour < 24;
      case "night":
        return hour >= 0 && hour < 6;
      default:
        return false;
    }
  });
}
function getStopCount(flights) {
  if (!(flights == null ? void 0 : flights.length)) return 0;
  return flights.length - 1;
}
function matchesStopFilter(flight, stops, isRoundTrip) {
  if (stops.length === 0) return true;
  const outboundStops = flight.outbound_flights ? getStopCount(flight.outbound_flights) : 0;
  const returnStops = flight.return_flights ? getStopCount(flight.return_flights) : 0;
  return stops.some((stop) => {
    switch (stop) {
      case "direct":
        return isRoundTrip ? outboundStops === 0 && returnStops === 0 : outboundStops === 0;
      case "1stop":
        return isRoundTrip ? outboundStops <= 1 && returnStops <= 1 : outboundStops === 1;
      case "2plus":
        return isRoundTrip ? outboundStops >= 2 || returnStops >= 2 : outboundStops >= 2;
      default:
        return false;
    }
  });
}
function matchesAirlineFilter(flight, airlines) {
  if (airlines.length === 0) return true;
  const airlineSet = new Set(airlines);
  return flight.flights.some((segment) => airlineSet.has(segment.airline));
}
function matchesPriceFilter(flight, priceRange) {
  return flight.price >= priceRange.min && flight.price <= priceRange.max;
}
function matchesTimeFilter(flight, timeRanges, isReturn = false) {
  if (timeRanges.length === 0) return true;
  const segments = isReturn ? flight.return_flights : flight.outbound_flights;
  if (!(segments == null ? void 0 : segments.length)) return true;
  return isInTimeRange(segments[0].departure_airport.time, timeRanges);
}
function applyFilters(flights, filters, isRoundTrip = false) {
  new Set(filters.airlines);
  return flights.filter((flight) => {
    if (!matchesPriceFilter(flight, filters.priceRange)) {
      return false;
    }
    if (filters.airlines.length > 0 && !matchesAirlineFilter(flight, filters.airlines)) {
      return false;
    }
    if (!matchesStopFilter(flight, filters.stops, isRoundTrip)) {
      return false;
    }
    if (!matchesTimeFilter(flight, filters.departureTime)) {
      return false;
    }
    if (isRoundTrip && flight.return_flights && filters.returnTime.length > 0) {
      if (!matchesTimeFilter(flight, filters.returnTime, true)) {
        return false;
      }
    }
    return true;
  });
}
const DEFAULT_SETTINGS$1 = {
  direct_flight_bonus: 10,
  // Increased from 5 to 10 to prioritize direct flights
  arrival_time_bonuses: {
    early_morning: { start: 3, end: 10, points: 2 },
    // Reduced from 5 to 2
    morning: { start: 10, end: 15, points: 1 }
    // Reduced from 3 to 1
  },
  departure_time_bonuses: {
    afternoon: { start: 14, end: 18, points: 1 },
    // Reduced from 3 to 1
    evening: { start: 18, end: 24, points: 2 }
    // Reduced from 5 to 2
  },
  stop_penalties: {
    one_stop: -8,
    // Increased penalty from -5 to -8
    two_plus_stops: -15
    // Increased penalty from -10 to -15
  },
  duration_penalties: {
    medium: { hours: 4, points: -2 },
    // Increased penalty from -1 to -2
    long: { hours: 6, points: -4 },
    // Increased penalty from -2 to -4
    very_long: { hours: 6, points: -6 }
    // Increased penalty from -3 to -6
  }
};
let cachedSettings = null;
let lastFetch = 0;
const CACHE_DURATION = 5 * 60 * 1e3;
async function getScoringSettings() {
  const now = Date.now();
  if (cachedSettings && now - lastFetch < CACHE_DURATION) {
    return cachedSettings;
  }
  try {
    const { data, error } = await supabase.from("scoring_settings").select("*").single();
    if (error) throw error;
    if (data == null ? void 0 : data.settings) {
      cachedSettings = data.settings;
      lastFetch = now;
      return data.settings;
    }
  } catch (err) {
    console.warn("Error fetching scoring settings:", err);
  }
  return DEFAULT_SETTINGS$1;
}
async function calculateFlightScore(flight) {
  var _a2, _b2, _c, _d;
  const settings = await getScoringSettings();
  let score = 0;
  const isRoundTrip = flight.return_flights && flight.return_flights.length > 0;
  const origin = (_a2 = flight.flights[0]) == null ? void 0 : _a2.departure_airport.id;
  const destination = (_b2 = flight.flights[0]) == null ? void 0 : _b2.arrival_airport.id;
  const outboundDepartureDate = (_c = flight.flights[0]) == null ? void 0 : _c.departure_airport.time;
  const inboundDepartureDate = isRoundTrip ? ((_d = flight.flights.find((f) => new Date(f.departure_airport.time) > new Date(outboundDepartureDate))) == null ? void 0 : _d.departure_airport.time) || null : null;
  const { outboundFlights, returnFlights } = splitFlightSegments(flight.flights, {
    tripType: isRoundTrip ? "roundTrip" : "oneWay",
    departureDate: outboundDepartureDate,
    returnDate: inboundDepartureDate,
    fromCode: origin,
    toCode: destination
  });
  const outboundStops = outboundFlights.length - 1;
  const returnStops = returnFlights ? returnFlights.length - 1 : 0;
  if (isRoundTrip) {
    if (outboundStops === 0 && returnStops === 0) {
      score += settings.direct_flight_bonus * 2;
      console.log("Applied double direct flight bonus for round-trip:", settings.direct_flight_bonus * 2);
    }
  } else {
    if (outboundStops === 0) {
      score += settings.direct_flight_bonus;
      console.log("Applied direct flight bonus for one-way:", settings.direct_flight_bonus);
    }
  }
  if (isRoundTrip) {
    if (outboundStops === 1) score += settings.stop_penalties.one_stop;
    if (outboundStops >= 2) score += settings.stop_penalties.two_plus_stops;
    if (returnStops === 1) score += settings.stop_penalties.one_stop;
    if (returnStops >= 2) score += settings.stop_penalties.two_plus_stops;
  } else {
    if (outboundStops === 1) score += settings.stop_penalties.one_stop;
    if (outboundStops >= 2) score += settings.stop_penalties.two_plus_stops;
  }
  const processTimeBonuses = (segments) => {
    if (!segments.length) return 0;
    let legScore = 0;
    const firstSegment = segments[0];
    const lastSegment = segments[segments.length - 1];
    const arrivalHour = new Date(lastSegment.arrival_airport.time).getHours();
    const { early_morning, morning } = settings.arrival_time_bonuses;
    if (arrivalHour >= early_morning.start && arrivalHour <= early_morning.end) {
      legScore += early_morning.points;
    } else if (arrivalHour > morning.start && arrivalHour < morning.end) {
      legScore += morning.points;
    }
    const departureHour = new Date(firstSegment.departure_airport.time).getHours();
    const { afternoon, evening } = settings.departure_time_bonuses;
    if (departureHour > afternoon.start && departureHour < afternoon.end) {
      legScore += afternoon.points;
    } else if (departureHour >= evening.start && departureHour <= evening.end) {
      legScore += evening.points;
    }
    return legScore;
  };
  score += processTimeBonuses(outboundFlights);
  if (returnFlights) {
    score += processTimeBonuses(returnFlights);
  }
  const durationHours = flight.total_duration / 60;
  const { medium, long, very_long } = settings.duration_penalties;
  if (durationHours > 2) {
    if (durationHours <= medium.hours) {
      score += medium.points;
    } else if (durationHours <= long.hours) {
      score += long.points;
    } else {
      score += very_long.points;
    }
  }
  const averagePrice = 200;
  if (flight.price < averagePrice) {
    score += 2;
  }
  return score;
}
async function sortFlights(flights, sortBy) {
  const sortedFlights = [...flights];
  switch (sortBy) {
    case "cheapest":
      return sortedFlights.sort((a, b) => a.price - b.price);
    case "fastest":
      return sortedFlights.sort((a, b) => a.total_duration - b.total_duration);
    case "best":
      const scores = await Promise.all(
        sortedFlights.map(async (flight) => ({
          flight,
          score: await calculateFlightScore(flight)
        }))
      );
      return scores.sort((a, b) => b.score - a.score || a.flight.price - b.flight.price).map((item) => item.flight);
    default:
      return sortedFlights;
  }
}
function parseRapidApiResponse(response) {
  var _a2;
  console.log("Parsing RapidAPI response:", response);
  if (!((_a2 = response == null ? void 0 : response.data) == null ? void 0 : _a2.itineraries)) {
    console.log("Invalid response format - missing itineraries");
    return { best_flights: [], other_flights: [] };
  }
  const itineraries = response.data.itineraries;
  const bestFlights = [];
  const otherFlights = [];
  for (const itinerary of itineraries) {
    try {
      const flightOption = convertItineraryToFlightOption(itinerary);
      if (flightOption) {
        const isBestFlight = itinerary.score > 0.8 || itinerary.tags && (itinerary.tags.includes("shortest") || itinerary.tags.includes("cheapest") || itinerary.tags.includes("best_value"));
        if (isBestFlight) {
          bestFlights.push(flightOption);
        } else {
          otherFlights.push(flightOption);
        }
      }
    } catch (err) {
      console.error("Error processing itinerary:", err);
    }
  }
  console.log("Parsed flights:", {
    best: bestFlights.length,
    other: otherFlights.length
  });
  return { best_flights: bestFlights, other_flights: otherFlights };
}
function processLeg(leg) {
  const flights = [];
  const layovers = [];
  let totalDuration = 0;
  leg.segments.forEach((segment, index) => {
    var _a2;
    if (index > 0) {
      const prevSegment = leg.segments[index - 1];
      const layoverStart = new Date(prevSegment.arrival);
      const layoverEnd = new Date(segment.departure);
      const duration = Math.round((layoverEnd.getTime() - layoverStart.getTime()) / 6e4);
      const isOvernight = layoverEnd.getDate() > layoverStart.getDate();
      layovers.push({
        duration,
        name: segment.origin.name,
        id: segment.origin.displayCode,
        overnight: isOvernight
      });
      totalDuration += duration;
    }
    const flight = {
      departure_airport: {
        id: segment.origin.displayCode,
        name: segment.origin.name,
        time: segment.departure
      },
      arrival_airport: {
        id: segment.destination.displayCode,
        name: segment.destination.name,
        time: segment.arrival
      },
      duration: segment.durationInMinutes,
      airline: segment.marketingCarrier.name,
      airline_logo: ((_a2 = leg.carriers.marketing[0]) == null ? void 0 : _a2.logoUrl) || `https://logos.skyscnr.com/images/airlines/favicon/${segment.marketingCarrier.alternateId}.png`,
      flight_number: segment.flightNumber,
      travel_class: "Economy",
      legroom: "Standard",
      extensions: []
    };
    flights.push(flight);
    totalDuration += segment.durationInMinutes;
  });
  return { flights, layovers, duration: totalDuration };
}
function convertItineraryToFlightOption(itinerary) {
  var _a2;
  try {
    const outboundLeg = itinerary.legs[0];
    const returnLeg = itinerary.legs[1];
    const isRoundTrip = !!returnLeg;
    const outbound = processLeg(outboundLeg);
    let return_ = null;
    if (isRoundTrip && returnLeg) {
      return_ = processLeg(returnLeg);
    }
    const totalDuration = outbound.duration + ((return_ == null ? void 0 : return_.duration) || 0);
    const flightOption = {
      flights: [...outbound.flights, ...(return_ == null ? void 0 : return_.flights) || []],
      layovers: [...outbound.layovers, ...(return_ == null ? void 0 : return_.layovers) || []],
      total_duration: totalDuration,
      price: itinerary.price.raw,
      type: isRoundTrip ? "Round trip" : "One way",
      airline_logo: (_a2 = outbound.flights[0]) == null ? void 0 : _a2.airline_logo,
      // Add separate outbound and return flight arrays
      outbound_flights: outbound.flights,
      return_flights: return_ == null ? void 0 : return_.flights,
      // Add separate outbound and return layover arrays
      outbound_layovers: outbound.layovers.length > 0 ? outbound.layovers : void 0,
      return_layovers: (return_ == null ? void 0 : return_.layovers.length) ? return_.layovers : void 0
    };
    console.log("Created flight option:", {
      id: itinerary.id,
      type: flightOption.type,
      outboundSegments: outbound.flights.length,
      outboundLayovers: outbound.layovers.length,
      returnSegments: (return_ == null ? void 0 : return_.flights.length) || 0,
      returnLayovers: (return_ == null ? void 0 : return_.layovers.length) || 0,
      price: flightOption.price
    });
    return flightOption;
  } catch (err) {
    console.error("Error converting itinerary:", err);
    return null;
  }
}
function parseFlightApiResponse(response) {
  var _a2;
  console.time("parseFlightApiResponse");
  console.log("🚀 FlightAPI.io Response:", response);
  if (!((_a2 = response == null ? void 0 : response.itineraries) == null ? void 0 : _a2.length)) {
    console.log("No itineraries found in response");
    return { best_flights: [], other_flights: [] };
  }
  const carrierMap = new Map(
    response.carriers.map((c) => {
      const id = c.id < 0 ? Math.abs(c.id) : c.id;
      return [id, c];
    })
  );
  const placeMap = new Map(response.places.map((p) => [p.id, p]));
  const segmentMap = new Map(response.segments.map((s) => [s.id, s]));
  const legMap = new Map(response.legs.map((l) => [l.id, l]));
  const flightOptions = response.itineraries.map((itinerary) => {
    var _a3, _b2, _c;
    try {
      const legs = itinerary.leg_ids.map((legId) => legMap.get(legId)).filter(Boolean);
      if (!legs.length) {
        console.warn("No legs found for itinerary:", itinerary.id);
        return null;
      }
      const outboundFlights = [];
      const returnFlights = [];
      const outboundLayovers = [];
      const returnLayovers = [];
      let totalDuration = 0;
      legs.forEach((leg, legIndex) => {
        const isReturn = legIndex === 1;
        let prevSegment = null;
        const segments = leg.segment_ids.map((segmentId) => segmentMap.get(segmentId)).filter(Boolean);
        segments.forEach((segment) => {
          if (prevSegment) {
            const layoverStart = new Date(prevSegment.arrival);
            const layoverEnd = new Date(segment.departure);
            const duration = Math.round((layoverEnd.getTime() - layoverStart.getTime()) / 6e4);
            const isOvernight = new Date(segment.departure).getDate() > new Date(prevSegment.arrival).getDate();
            const layoverPlace = placeMap.get(prevSegment.destination_place_id);
            if (layoverPlace) {
              const layover = {
                duration,
                name: layoverPlace.name,
                id: layoverPlace.display_code,
                overnight: isOvernight
              };
              if (isReturn) {
                returnLayovers.push(layover);
              } else {
                outboundLayovers.push(layover);
              }
            }
            totalDuration += duration;
          }
          const carrierId = Math.abs(segment.marketing_carrier_id);
          const carrier = carrierMap.get(carrierId);
          const originPlace = placeMap.get(segment.origin_place_id);
          const destinationPlace = placeMap.get(segment.destination_place_id);
          if (!originPlace || !destinationPlace) {
            console.warn("Missing place data for segment:", segment.id);
            return;
          }
          const flight = {
            departure_airport: {
              id: originPlace.display_code,
              name: originPlace.name,
              time: segment.departure
            },
            arrival_airport: {
              id: destinationPlace.display_code,
              name: destinationPlace.name,
              time: segment.arrival
            },
            duration: segment.duration,
            airline: carrier.name,
            airline_logo: carrier.logo_url || `https://logos.skyscnr.com/images/airlines/favicon/${carrier.display_code}.png`,
            flight_number: segment.marketing_flight_number,
            travel_class: "Economy",
            legroom: "Standard",
            extensions: []
          };
          if (isReturn) {
            returnFlights.push(flight);
          } else {
            outboundFlights.push(flight);
          }
          totalDuration += segment.duration;
          prevSegment = segment;
        });
      });
      const flightOption = {
        flights: [...outboundFlights, ...returnFlights],
        layovers: [...outboundLayovers, ...returnLayovers],
        total_duration: totalDuration,
        price: ((_b2 = (_a3 = itinerary.pricing_options[0]) == null ? void 0 : _a3.price) == null ? void 0 : _b2.amount) || 0,
        type: legs.length > 1 ? "Round trip" : "One way",
        airline_logo: (_c = outboundFlights[0]) == null ? void 0 : _c.airline_logo,
        outbound_flights: outboundFlights,
        return_flights: returnFlights.length > 0 ? returnFlights : void 0,
        outbound_layovers: outboundLayovers.length > 0 ? outboundLayovers : void 0,
        return_layovers: returnLayovers.length > 0 ? returnLayovers : void 0
      };
      console.log("Created flight option:", {
        id: itinerary.id,
        type: flightOption.type,
        outboundSegments: outboundFlights.length,
        outboundLayovers: outboundLayovers.length,
        returnSegments: returnFlights.length,
        returnLayovers: returnLayovers.length,
        totalDuration,
        price: flightOption.price
      });
      return flightOption;
    } catch (err) {
      console.error("Error processing itinerary:", itinerary.id, err);
      return null;
    }
  }).filter((option) => option !== null);
  flightOptions.sort((a, b) => a.price - b.price);
  const bestCount = Math.max(1, Math.ceil(flightOptions.length * 0.3));
  const result = {
    best_flights: flightOptions.slice(0, bestCount),
    other_flights: flightOptions.slice(bestCount)
  };
  console.log("Parsed flight results:", {
    totalFlights: flightOptions.length,
    bestFlights: result.best_flights.length,
    otherFlights: result.other_flights.length
  });
  console.timeEnd("parseFlightApiResponse");
  return result;
}
const signatureCache = /* @__PURE__ */ new Map();
function deduplicateFlights(flights) {
  console.log("Starting deduplication of", flights.length, "flights");
  const uniqueFlights = /* @__PURE__ */ new Map();
  for (const flight of flights) {
    let signature = signatureCache.get(flight.flights[0].flight_number);
    if (!signature) {
      signature = generateFlightSignature(flight);
      signatureCache.set(flight.flights[0].flight_number, signature);
    }
    const existingFlight = uniqueFlights.get(signature);
    if (!existingFlight || flight.price < existingFlight.price) {
      uniqueFlights.set(signature, flight);
    }
  }
  const result = Array.from(uniqueFlights.values());
  console.log("Deduplication complete:", {
    originalCount: flights.length,
    uniqueCount: result.length,
    duplicatesRemoved: flights.length - result.length
  });
  return result;
}
function generateFlightSignature(flight) {
  const segments = flight.flights;
  const firstSegment = segments[0];
  const lastSegment = segments[segments.length - 1];
  return `${firstSegment.departure_airport.id}-${firstSegment.departure_airport.time}-${lastSegment.arrival_airport.id}-${lastSegment.arrival_airport.time}-${segments.length}`;
}
const ongoingSearches = /* @__PURE__ */ new Map();
async function getApiConfig() {
  try {
    const { data, error } = await supabase.from("flight_api_config").select("*").single();
    if (error) {
      console.error("Error fetching API config:", error);
      return {
        active_api: "rapidapi",
        simultaneous_requests: false,
        oneway_api: "rapidapi",
        roundtrip_api: "rapidapi",
        rapidapi_key: "eff37b01a1msh6090de6dea39514p108435jsnf7c09e43a0a5",
        flightapi_key: "6575f4e37c8bf3d205a36818"
      };
    }
    return data;
  } catch (err) {
    console.error("Error fetching API config:", err);
    return {
      active_api: "rapidapi",
      simultaneous_requests: false,
      oneway_api: "rapidapi",
      roundtrip_api: "rapidapi",
      rapidapi_key: "eff37b01a1msh6090de6dea39514p108435jsnf7c09e43a0a5",
      flightapi_key: "6575f4e37c8bf3d205a36818"
    };
  }
}
async function searchWithRapidAPI(params, apiKey) {
  var _a2, _b2;
  const MAX_RETRIES = 2;
  const INITIAL_RETRY_DELAY = 1e3;
  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    try {
      if (attempt > 0) {
        console.log(`RapidAPI retry attempt ${attempt} of ${MAX_RETRIES}`);
        await new Promise((resolve) => setTimeout(resolve, INITIAL_RETRY_DELAY * attempt));
      }
      const endpoint = params.tripType === "roundTrip" ? "flights/search-roundtrip" : "flights/search-one-way";
      const cabinClass = { "1": "economy", "2": "premium_economy", "3": "business", "4": "first" }[params.travelClass] || "economy";
      const stops = params.stops === "1" ? "direct" : params.stops === "2" ? "direct,1stop" : params.stops === "3" ? "direct,1stop,2stops" : "direct,1stop,2stops,3stops";
      const requestParams = {
        fromEntityId: params.fromCode,
        toEntityId: params.toCode,
        departDate: params.departureDate.split("T")[0],
        currency: "EUR",
        stops,
        adults: params.passengers.adults.toString(),
        children: params.passengers.children.toString(),
        infants: (params.passengers.infantsInSeat + params.passengers.infantsOnLap).toString(),
        cabinClass
      };
      if (params.tripType === "roundTrip" && params.returnDate) {
        requestParams.returnDate = params.returnDate.split("T")[0];
      }
      console.log(`RapidAPI Request (attempt ${attempt + 1}):`, {
        endpoint,
        params: requestParams
      });
      const response = await axios.get(
        `https://sky-scanner3.p.rapidapi.com/${endpoint}`,
        {
          params: requestParams,
          headers: {
            "X-RapidAPI-Key": apiKey,
            "X-RapidAPI-Host": "sky-scanner3.p.rapidapi.com"
          },
          timeout: 3e4
          // 30 second timeout
        }
      );
      console.log("RapidAPI Response:", response.data);
      return parseRapidApiResponse(response.data);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.code === "ECONNABORTED" || ((_a2 = err.response) == null ? void 0 : _a2.status) === 429) {
          console.error("RapidAPI error (attempt " + (attempt + 1) + "):", err.message);
          if (attempt < MAX_RETRIES) continue;
          return null;
        }
        console.error("RapidAPI error:", ((_b2 = err.response) == null ? void 0 : _b2.data) || err.message);
        if (attempt < MAX_RETRIES) continue;
        return null;
      }
      console.error("RapidAPI error:", err);
      if (attempt < MAX_RETRIES) continue;
      return null;
    } finally {
    }
  }
  return null;
}
async function searchWithFlightAPI(params, apiKey) {
  var _a2, _b2, _c;
  const MAX_RETRIES = 2;
  const INITIAL_RETRY_DELAY = 1e3;
  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    try {
      if (attempt > 0) {
        console.log(`FlightAPI retry attempt ${attempt} of ${MAX_RETRIES}`);
        await new Promise((resolve) => setTimeout(resolve, INITIAL_RETRY_DELAY * attempt));
      }
      const endpoint = params.tripType === "roundTrip" ? "roundtrip" : "onewaytrip";
      const baseUrl = `https://api.flightapi.io/${endpoint}/${apiKey}`;
      const urlParts = [
        params.fromCode,
        params.toCode,
        params.departureDate.split("T")[0],
        params.tripType === "roundTrip" ? (_a2 = params.returnDate) == null ? void 0 : _a2.split("T")[0] : null,
        params.passengers.adults.toString(),
        params.passengers.children.toString(),
        (params.passengers.infantsInSeat + params.passengers.infantsOnLap).toString(),
        "Economy",
        "EUR"
      ];
      const urlParams = urlParts.filter((part) => part !== null).join("/");
      console.log(`FlightAPI Request URL (attempt ${attempt + 1}):`, `${baseUrl}/${urlParams}`);
      const response = await axios.get(`${baseUrl}/${urlParams}`, {
        timeout: 3e4
      });
      console.log("FlightAPI Response:", response.data);
      return parseFlightApiResponse(response.data);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.code === "ECONNABORTED" || ((_b2 = err.response) == null ? void 0 : _b2.status) === 429) {
          console.error("FlightAPI error (attempt " + (attempt + 1) + "):", err.message);
          if (attempt < MAX_RETRIES) continue;
          return null;
        }
        console.error("FlightAPI error:", ((_c = err.response) == null ? void 0 : _c.data) || err.message);
        if (attempt < MAX_RETRIES) continue;
        return null;
      }
      console.error("FlightAPI error:", err);
      if (attempt < MAX_RETRIES) continue;
      return null;
    } finally {
    }
  }
  return null;
}
async function searchFlights(params, onProgress) {
  const searchKey = `${params.fromCode}-${params.toCode}-${params.departureDate}-${params.returnDate || "oneway"}`;
  if (ongoingSearches.has(searchKey)) {
    return ongoingSearches.get(searchKey);
  }
  const searchPromise = (async () => {
    try {
      if (!params.fromCode || !params.toCode) {
        throw new Error("Please select both departure and arrival airports.");
      }
      if (!params.departureDate) {
        throw new Error("Please select a departure date.");
      }
      if (params.tripType === "roundTrip" && !params.returnDate) {
        throw new Error("Please select a return date for round-trip flights.");
      }
      const apiConfig = await getApiConfig();
      console.log("Using API config:", apiConfig);
      if (apiConfig.active_api === "rapidapi") {
        const result = await searchWithRapidAPI(params, apiConfig.rapidapi_key);
        if (!result) throw new Error("No flights found. Please try again later.");
        onProgress && onProgress({ results: makeCloneable(result), isComplete: true });
        return makeCloneable(result);
      }
      if (apiConfig.active_api === "flightapi") {
        const result = await searchWithFlightAPI(params, apiConfig.flightapi_key);
        if (!result) throw new Error("No flights found. Please try again later.");
        onProgress && onProgress({ results: makeCloneable(result), isComplete: true });
        return makeCloneable(result);
      }
      if (apiConfig.active_api === "both") {
        if (apiConfig.simultaneous_requests) {
          let addUniqueFlights = function(result) {
            const addList = (list) => {
              list.forEach((flight) => {
                const key = flight.flights.map((f) => f.flight_number).join("-");
                if (!seenKeys.has(key)) {
                  seenKeys.add(key);
                  return flight;
                }
                return null;
              });
            };
            mergedResults.best_flights = mergedResults.best_flights.concat(result.best_flights);
            mergedResults.other_flights = mergedResults.other_flights.concat(result.other_flights);
          };
          const mergedResults = { best_flights: [], other_flights: [] };
          const seenKeys = /* @__PURE__ */ new Set();
          let firstResponseReceived = false;
          const rapidPromise = searchWithRapidAPI(params, apiConfig.rapidapi_key).then((result) => {
            if (result) {
              if (!firstResponseReceived) {
                firstResponseReceived = true;
                onProgress && onProgress({ results: makeCloneable(result), isComplete: false });
              }
              addUniqueFlights(result);
            }
          });
          const flightPromise = searchWithFlightAPI(params, apiConfig.flightapi_key).then((result) => {
            if (result) {
              if (!firstResponseReceived) {
                firstResponseReceived = true;
                onProgress && onProgress({ results: makeCloneable(result), isComplete: false });
              }
              addUniqueFlights(result);
            }
          });
          await Promise.all([rapidPromise, flightPromise]);
          const finalResults = {
            best_flights: deduplicateFlights(mergedResults.best_flights),
            other_flights: deduplicateFlights(mergedResults.other_flights)
          };
          onProgress && onProgress({ results: makeCloneable(finalResults), isComplete: true });
          return makeCloneable(finalResults);
        } else {
          const firstResult = await Promise.race([
            searchWithRapidAPI(params, apiConfig.rapidapi_key),
            searchWithFlightAPI(params, apiConfig.flightapi_key)
          ]);
          if (!firstResult) {
            throw new Error("No flights found. Please try again later.");
          }
          onProgress && onProgress({ results: makeCloneable(firstResult), isComplete: true });
          return makeCloneable(firstResult);
        }
      }
      throw new Error("Invalid API configuration");
    } catch (error) {
      console.error("Flight search error:", error);
      throw error;
    } finally {
      ongoingSearches.delete(searchKey);
    }
  })();
  ongoingSearches.set(searchKey, searchPromise);
  return searchPromise;
}
const ongoingRefreshes = /* @__PURE__ */ new Map();
function calculatePriceStability(departureDate) {
  const daysUntilDeparture = Math.ceil(
    (new Date(departureDate).getTime() - Date.now()) / (1e3 * 60 * 60 * 24)
  );
  if (daysUntilDeparture > 60) return "HIGH";
  if (daysUntilDeparture > 30) return "MEDIUM";
  return "LOW";
}
async function updateRouteTracking(params) {
  try {
    const departureDate = new Date(params.departureDate);
    const returnDate = params.returnDate ? new Date(params.returnDate) : null;
    const departureMonth = departureDate.toISOString().slice(0, 7);
    const returnMonth = returnDate ? returnDate.toISOString().slice(0, 7) : null;
    const { error: rpcError } = await supabase.rpc("update_route_tracking", {
      p_origin: params.fromCode,
      p_destination: params.toCode,
      p_departure_date: departureDate.toISOString().split("T")[0],
      p_return_date: (returnDate == null ? void 0 : returnDate.toISOString().split("T")[0]) || null,
      p_user_id: null
      // Pass null for anonymous users
    });
    if (rpcError) {
      console.error("Error in update_route_tracking RPC:", rpcError);
      throw rpcError;
    }
    console.log("Route tracking updated successfully:", {
      outbound: `${params.fromCode} → ${params.toCode} (${departureMonth})`,
      return: returnDate ? `${params.toCode} → ${params.fromCode} (${returnMonth})` : "N/A"
    });
  } catch (err) {
    console.error("Error updating route tracking:", err);
  }
}
async function refreshFlightData(searchParams, batchId, onProgress) {
  const searchKey = `${searchParams.fromCode}-${searchParams.toCode}-${searchParams.departureDate}-${searchParams.returnDate || "oneway"}`;
  if (ongoingRefreshes.has(searchKey)) {
    return ongoingRefreshes.get(searchKey);
  }
  const searchPromise = (async () => {
    var _a2, _b2;
    try {
      if (!searchParams.fromCode || !searchParams.toCode) {
        throw new Error("Please select both departure and arrival airports.");
      }
      if (!searchParams.departureDate) {
        throw new Error("Please select a departure date.");
      }
      if (searchParams.tripType === "roundTrip" && !searchParams.returnDate) {
        throw new Error("Please select a return date for round-trip flights.");
      }
      await updateRouteTracking(searchParams);
      const priceStability = calculatePriceStability(searchParams.departureDate);
      const { data: settings } = await supabase.from("system_settings").select("setting_value").eq("setting_name", "use_incomplete_api").single();
      const useIncompleteApi = (settings == null ? void 0 : settings.setting_value) ?? false;
      const response = await searchFlights(searchParams, async (progress) => {
        if (!progress.results) return;
        const processedResults2 = {
          best_flights: await Promise.all(progress.results.best_flights.map(async (flight) => {
            const { data: pricing } = await supabase.rpc("calculate_flight_price", {
              p_base_price: flight.price,
              p_passengers: searchParams.passengers,
              p_trip_type: searchParams.tripType
            });
            return { ...flight, price: pricing.total_price, price_breakdown: pricing };
          })),
          other_flights: await Promise.all(progress.results.other_flights.map(async (flight) => {
            const { data: pricing } = await supabase.rpc("calculate_flight_price", {
              p_base_price: flight.price,
              p_passengers: searchParams.passengers,
              p_trip_type: searchParams.tripType
            });
            return { ...flight, price: pricing.total_price, price_breakdown: pricing };
          }))
        };
        console.log("Processed flight results:", {
          bestFlights: processedResults2.best_flights.length,
          otherFlights: processedResults2.other_flights.length,
          totalFlights: processedResults2.best_flights.length + processedResults2.other_flights.length
        });
        const serializedResults2 = makeCloneable(processedResults2);
        const { error: updateError2 } = await supabase.from("saved_searches").update({
          results: serializedResults2,
          cached_results: serializedResults2,
          cached_until: new Date(Date.now() + 2 * 60 * 60 * 1e3).toISOString(),
          // 2 hours cache
          last_error: null,
          error_timestamp: null
        }).eq("batch_id", batchId);
        if (updateError2) {
          console.error("Error updating search results:", updateError2);
          throw new Error("Failed to save search results");
        }
        if (onProgress) {
          onProgress({
            ...progress,
            results: serializedResults2
          });
        }
      });
      if (!response || !((_a2 = response.best_flights) == null ? void 0 : _a2.length) && !((_b2 = response.other_flights) == null ? void 0 : _b2.length)) {
        return {
          best_flights: [],
          other_flights: []
        };
      }
      const processedResults = {
        best_flights: await Promise.all(response.best_flights.map(async (flight) => {
          const { data: pricing } = await supabase.rpc("calculate_flight_price", {
            p_base_price: flight.price,
            p_passengers: searchParams.passengers,
            p_trip_type: searchParams.tripType
          });
          return { ...flight, price: pricing.total_price, price_breakdown: pricing };
        })),
        other_flights: await Promise.all(response.other_flights.map(async (flight) => {
          const { data: pricing } = await supabase.rpc("calculate_flight_price", {
            p_base_price: flight.price,
            p_passengers: searchParams.passengers,
            p_trip_type: searchParams.tripType
          });
          return { ...flight, price: pricing.total_price, price_breakdown: pricing };
        }))
      };
      console.log("Final processed results:", {
        bestFlights: processedResults.best_flights.length,
        otherFlights: processedResults.other_flights.length,
        totalFlights: processedResults.best_flights.length + processedResults.other_flights.length
      });
      const serializedResults = makeCloneable(processedResults);
      const cacheExpiration = /* @__PURE__ */ new Date();
      cacheExpiration.setHours(cacheExpiration.getHours() + 2);
      const { error: updateError } = await supabase.from("saved_searches").update({
        results: serializedResults,
        cached_results: serializedResults,
        cached_until: cacheExpiration.toISOString(),
        price_stability_level: priceStability,
        last_error: null,
        error_timestamp: null
      }).eq("batch_id", batchId);
      if (updateError) {
        console.error("Error updating search results:", updateError);
        throw new Error("Failed to save search results");
      }
      return serializedResults;
    } catch (error) {
      const errorMessage = formatErrorMessage(error);
      console.error("Flight search error:", errorMessage);
      await supabase.from("saved_searches").update({
        last_error: errorMessage,
        error_timestamp: (/* @__PURE__ */ new Date()).toISOString()
      }).eq("batch_id", batchId);
      return {
        best_flights: [],
        other_flights: []
      };
    } finally {
      ongoingRefreshes.delete(searchKey);
    }
  })();
  ongoingRefreshes.set(searchKey, searchPromise);
  return searchPromise;
}
function AdSidebar() {
  return /* @__PURE__ */ jsx("div", { className: "hidden lg:block w-64 bg-white rounded-lg shadow-sm p-6 h-fit sticky top-24", children: /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
    /* @__PURE__ */ jsx("div", { className: "mb-6", children: /* @__PURE__ */ jsxs("h2", { className: "text-2xl font-bold", children: [
      /* @__PURE__ */ jsx("span", { className: "text-red-600", children: "Hima" }),
      /* @__PURE__ */ jsx("span", { className: "text-blue-600", children: "Trips" }),
      /* @__PURE__ */ jsx("span", { className: "text-red-600", children: ".com" })
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center gap-2 mb-4", children: [
      /* @__PURE__ */ jsx(Plane, { className: "w-6 h-6 text-red-600" }),
      /* @__PURE__ */ jsx("span", { className: "text-xl font-bold", children: "+" }),
      /* @__PURE__ */ jsx(Hotel, { className: "w-6 h-6 text-blue-600" })
    ] }),
    /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-gray-900 mb-2", children: "Bileta + Hotel" }),
    /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600 mb-6", children: "Kap Ofertat me te mira sot!" }),
    /* @__PURE__ */ jsxs("div", { className: "bg-red-50 rounded-lg p-4 mb-6", children: [
      /* @__PURE__ */ jsx("div", { className: "text-sm text-gray-600 mb-1", children: "Duke nisur nga" }),
      /* @__PURE__ */ jsx("div", { className: "text-2xl font-bold text-red-600 mb-1", children: "40%" }),
      /* @__PURE__ */ jsx("div", { className: "text-xs text-gray-500", children: "Zbritje ne Rezervime te hershme" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-3 text-left mb-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-sm text-gray-700", children: [
        /* @__PURE__ */ jsx(ArrowRight, { className: "w-4 h-4 text-blue-600" }),
        "Cmimet me te mira"
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-sm text-gray-700", children: [
        /* @__PURE__ */ jsx(ArrowRight, { className: "w-4 h-4 text-blue-600" }),
        "Online 24/7"
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-sm text-gray-700", children: [
        /* @__PURE__ */ jsx(ArrowRight, { className: "w-4 h-4 text-blue-600" }),
        "Garancia qe kerkoni"
      ] })
    ] }),
    /* @__PURE__ */ jsx(
      "a",
      {
        href: "https://himatrips.com/",
        target: "_blank",
        rel: "noopener noreferrer",
        className: "block w-full bg-red-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-red-700 transition-colors",
        children: "Perfito Tani"
      }
    )
  ] }) });
}
function MobileAd() {
  const [isExpanded, setIsExpanded] = React.useState(false);
  return /* @__PURE__ */ jsxs("div", { className: "lg:hidden bg-white rounded-lg shadow-sm overflow-hidden mb-6", children: [
    /* @__PURE__ */ jsxs(
      "div",
      {
        className: "p-4 flex items-center justify-between cursor-pointer",
        onClick: () => setIsExpanded(!isExpanded),
        children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
            /* @__PURE__ */ jsxs("h2", { className: "text-lg font-bold", children: [
              /* @__PURE__ */ jsx("span", { className: "text-red-600", children: "Hima" }),
              /* @__PURE__ */ jsx("span", { className: "text-blue-600", children: "Trips" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
              /* @__PURE__ */ jsx(Plane, { className: "w-5 h-5 text-red-600" }),
              /* @__PURE__ */ jsx("span", { className: "mx-1 text-xl", children: "+" }),
              /* @__PURE__ */ jsx(Hotel, { className: "w-5 h-5 text-blue-600" })
            ] })
          ] }),
          isExpanded ? /* @__PURE__ */ jsx(ChevronUp, { className: "w-5 h-5 text-gray-400" }) : /* @__PURE__ */ jsx(ChevronDown, { className: "w-5 h-5 text-gray-400" })
        ]
      }
    ),
    isExpanded && /* @__PURE__ */ jsxs("div", { className: "p-4 pt-0", children: [
      /* @__PURE__ */ jsx("h3", { className: "font-semibold text-gray-900 mb-2", children: "Bileta + Hotel" }),
      /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600 mb-4", children: "Kap Ofertat me te mira sot!" }),
      /* @__PURE__ */ jsxs("div", { className: "bg-red-50 rounded-lg p-3 mb-4", children: [
        /* @__PURE__ */ jsx("div", { className: "text-sm text-gray-600", children: "Duke nisur nga" }),
        /* @__PURE__ */ jsx("div", { className: "text-xl font-bold text-red-600", children: "40%" }),
        /* @__PURE__ */ jsx("div", { className: "text-xs text-gray-500", children: "Zbritje ne Rezervime te hershme" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-2 mb-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1 text-sm text-gray-700", children: [
          /* @__PURE__ */ jsx(ArrowRight, { className: "w-4 h-4 text-blue-600" }),
          "Cmimet me te mira"
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1 text-sm text-gray-700", children: [
          /* @__PURE__ */ jsx(ArrowRight, { className: "w-4 h-4 text-blue-600" }),
          "Online 24/7"
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1 text-sm text-gray-700", children: [
          /* @__PURE__ */ jsx(ArrowRight, { className: "w-4 h-4 text-blue-600" }),
          "Garancia qe kerkoni"
        ] })
      ] }),
      /* @__PURE__ */ jsx(
        "a",
        {
          href: "https://himatrips.com/",
          target: "_blank",
          rel: "noopener noreferrer",
          className: "block w-full bg-red-600 text-white py-2 px-4 rounded-lg font-semibold text-center hover:bg-red-700 transition-colors",
          children: "Perfito Tani"
        }
      )
    ] })
  ] });
}
function ResultsPage() {
  const navigate = useNavigate();
  useLocation();
  const [searchParams] = useSearchParams();
  const batchId = searchParams.get("batch_id");
  const fetchCalledRef = useRef(null);
  const abortControllerRef = useRef(null);
  const searchTimeoutRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchData, setSearchData] = useState(null);
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [searchProgress, setSearchProgress] = useState(null);
  const [filters, setFilters] = useState({
    stops: [],
    departureTime: [],
    returnTime: [],
    airlines: [],
    priceRange: { min: 0, max: 1e4 }
  });
  const [sortBy, setSortBy] = useState("best");
  const [processedFlights, setProcessedFlights] = useState([]);
  const [isFiltersPanelOpen, setIsFiltersPanelOpen] = useState(false);
  const [visibleFlights, setVisibleFlights] = useState(5);
  const FLIGHTS_PER_PAGE = 5;
  const seoData = getDefaultSEOData("results");
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
      fetchCalledRef.current = null;
    };
  }, []);
  useEffect(() => {
    const processFlights = async () => {
      if (!(searchData == null ? void 0 : searchData.searchResults)) {
        setProcessedFlights([]);
        return;
      }
      const allFlights = [
        ...searchData.searchResults.best_flights || [],
        ...searchData.searchResults.other_flights || []
      ];
      const filteredFlights = applyFilters(
        allFlights,
        filters,
        searchData.searchParams.tripType === "roundTrip"
      );
      const sortedFlights = await sortFlights(filteredFlights, sortBy);
      setProcessedFlights(sortedFlights);
      setVisibleFlights(FLIGHTS_PER_PAGE);
    };
    processFlights();
  }, [searchData == null ? void 0 : searchData.searchResults, filters, sortBy, searchData == null ? void 0 : searchData.searchParams.tripType]);
  const fetchSearchData = useCallback(async () => {
    if (!batchId || fetchCalledRef.current === batchId) {
      return;
    }
    console.log(`[${(/* @__PURE__ */ new Date()).toISOString()}] Fetching data for batch: ${batchId}`);
    fetchCalledRef.current = batchId;
    try {
      const { data: settings } = await supabase$1.from("system_settings").select("setting_value").eq("setting_name", "use_incomplete_api").single();
      const useIncompleteApi = (settings == null ? void 0 : settings.setting_value) ?? false;
      const { data: searchData2, error: searchError } = await supabase$1.from("saved_searches").select("*").eq("batch_id", batchId).maybeSingle();
      if (searchError) throw searchError;
      if (!searchData2) {
        throw new Error("Search not found. Please try searching again.");
      }
      if (searchData2.search_params) {
        const params = searchData2.search_params;
        if (params.departureDate) {
          const departureDate = parseISODate(params.departureDate);
          params.departureDate = formatDateForAPI(departureDate);
        }
        if (params.returnDate) {
          const returnDate = parseISODate(params.returnDate);
          params.returnDate = formatDateForAPI(returnDate);
        }
        searchData2.search_params = params;
      }
      const isDirectAccess = !sessionStorage.getItem(`search_${batchId}`);
      const shouldFetchFresh = !isDirectAccess || !searchData2.results;
      setSearchData({
        searchParams: searchData2.search_params,
        searchResults: searchData2.cached_results
      });
      if (shouldFetchFresh && !useIncompleteApi) {
        setRefreshing(true);
        try {
          const refreshedResults = await refreshFlightData(
            searchData2.search_params,
            batchId,
            (progress) => {
              if (progress.isComplete) {
                setSearchData({
                  searchParams: searchData2.search_params,
                  searchResults: progress.results
                });
                setLoading(false);
                setRefreshing(false);
                setSearchProgress(null);
              }
            }
          );
          if (refreshedResults) {
            setSearchData({
              searchParams: searchData2.search_params,
              searchResults: refreshedResults
            });
          }
        } catch (refreshError) {
          console.error("Error refreshing flight data:", refreshError);
          if (searchData2.cached_results) {
            setSearchData({
              searchParams: searchData2.search_params,
              searchResults: searchData2.cached_results
            });
          } else {
            throw refreshError;
          }
        }
      } else if (shouldFetchFresh && useIncompleteApi) {
        setRefreshing(true);
        try {
          const refreshedResults = await refreshFlightData(
            searchData2.search_params,
            batchId,
            (progress) => {
              setSearchProgress({
                progress: progress.progress,
                message: progress.isComplete ? "Search complete!" : `Found ${progress.results.best_flights.length + progress.results.other_flights.length} flights...`,
                isComplete: progress.isComplete,
                totalResults: progress.totalResults
              });
              if (progress.results.best_flights.length > 0 || progress.results.other_flights.length > 0) {
                setSearchData({
                  searchParams: searchData2.search_params,
                  searchResults: progress.results
                });
                setLoading(false);
              }
              if (progress.isComplete) {
                setSearchProgress(null);
                setRefreshing(false);
              }
            }
          );
          if (refreshedResults) {
            setSearchData({
              searchParams: searchData2.search_params,
              searchResults: refreshedResults
            });
          }
        } catch (refreshError) {
          console.error("Error refreshing flight data:", refreshError);
          if (searchData2.cached_results) {
            setSearchData({
              searchParams: searchData2.search_params,
              searchResults: searchData2.cached_results
            });
          } else {
            throw refreshError;
          }
        }
      }
      setLoading(false);
      sessionStorage.removeItem(`search_${batchId}`);
    } catch (err) {
      console.error("Error in fetchSearchData:", err);
      setError(err instanceof Error ? err.message : "Failed to load search results. Please try again.");
      setLoading(false);
      setRefreshing(false);
      setSearchProgress(null);
    }
  }, [batchId]);
  useEffect(() => {
    fetchSearchData();
  }, [fetchSearchData]);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const handleBack = () => {
    navigate("/home");
  };
  const handleRetry = () => {
    fetchCalledRef.current = null;
    setLoading(true);
    setError(null);
    fetchSearchData();
  };
  const handleToggleFilters = () => {
    setIsFiltersPanelOpen(!isFiltersPanelOpen);
  };
  const handleShowMore = () => {
    setVisibleFlights((prev) => Math.min(prev + FLIGHTS_PER_PAGE, processedFlights.length));
  };
  const generateDynamicSEO = () => {
    if (!(searchData == null ? void 0 : searchData.searchParams)) return seoData;
    const { fromLocation, toLocation, tripType, departureDate } = searchData.searchParams;
    const title = `Bileta Avioni ${fromLocation} - ${toLocation} | ${tripType === "roundTrip" ? "Vajtje-Ardhje" : "Vetëm Vajtje"} | Hima Travel`;
    const description = `Rezervoni bileta avioni ${fromLocation.toLowerCase()} - ${toLocation.toLowerCase()} ${tripType === "roundTrip" ? "vajtje-ardhje" : "vetëm vajtje"} me çmimet më të mira. Krahasoni fluturime dhe zgjidhni ofertën më të mirë.`;
    const schema = {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: `Flight results from ${fromLocation} to ${toLocation}`,
      description,
      numberOfItems: processedFlights.length,
      itemListElement: processedFlights.slice(0, 5).map((flight, index) => ({
        "@type": "Offer",
        position: index + 1,
        url: `https://biletaavioni.himatravel.com/results?batch_id=${batchId}`,
        price: flight.price,
        priceCurrency: "EUR",
        availability: "https://schema.org/InStock",
        seller: {
          "@type": "Organization",
          name: "Hima Travel"
        }
      }))
    };
    return {
      title,
      description,
      canonicalUrl: `/results?batch_id=${batchId}`,
      schema,
      keywords: [
        "bileta avioni",
        "flight tickets",
        fromLocation,
        toLocation,
        tripType === "roundTrip" ? "vajtje-ardhje" : "vetëm vajtje",
        "çmime fluturimesh",
        "rezervo online",
        "bileta te lira",
        "fluturime direkte",
        "oferta udhetimi",
        "bileta avioni online",
        "krahasim cmimesh",
        "bileta avioni te lira"
      ],
      language: "sq"
    };
  };
  const dynamicSEO = searchData ? generateDynamicSEO() : seoData;
  if (loading && !(searchData == null ? void 0 : searchData.searchResults)) {
    return /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx(
        SEOHead,
        {
          title: dynamicSEO.title,
          description: dynamicSEO.description,
          canonicalUrl: dynamicSEO.canonicalUrl,
          schema: dynamicSEO.schema,
          keywords: dynamicSEO.keywords,
          language: dynamicSEO.language
        }
      ),
      /* @__PURE__ */ jsx(LoadingState, {})
    ] });
  }
  if (error && !(searchData == null ? void 0 : searchData.searchResults)) {
    return /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx(
        SEOHead,
        {
          title: dynamicSEO.title,
          description: dynamicSEO.description,
          canonicalUrl: dynamicSEO.canonicalUrl,
          schema: dynamicSEO.schema,
          keywords: dynamicSEO.keywords,
          language: dynamicSEO.language
        }
      ),
      /* @__PURE__ */ jsx(
        ErrorState,
        {
          message: error,
          onBack: handleBack,
          onRetry: handleRetry
        }
      )
    ] });
  }
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-gradient-to-b from-blue-50 to-white", children: [
    /* @__PURE__ */ jsx(
      SEOHead,
      {
        title: dynamicSEO.title,
        description: dynamicSEO.description,
        canonicalUrl: dynamicSEO.canonicalUrl,
        schema: dynamicSEO.schema,
        keywords: dynamicSEO.keywords,
        language: dynamicSEO.language
      }
    ),
    /* @__PURE__ */ jsx(
      SearchHeader,
      {
        searchParams: searchData.searchParams,
        onBack: handleBack,
        onToggleFilters: handleToggleFilters
      }
    ),
    (refreshing || searchProgress) && /* @__PURE__ */ jsx(
      ProgressBar,
      {
        progress: (searchProgress == null ? void 0 : searchProgress.progress) || 0,
        message: (searchProgress == null ? void 0 : searchProgress.message) || "Refreshing flight prices..."
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "container mx-auto px-4 py-4 md:py-8", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col lg:flex-row gap-6", children: [
      /* @__PURE__ */ jsx("div", { className: "hidden lg:block w-64", children: /* @__PURE__ */ jsx(
        FlightFilterPanel,
        {
          flights: processedFlights,
          filters,
          onFilterChange: setFilters,
          isRoundTrip: searchData.searchParams.tripType === "roundTrip"
        }
      ) }),
      /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
        /* @__PURE__ */ jsx("div", { className: "lg:hidden", children: /* @__PURE__ */ jsx(MobileAd, {}) }),
        /* @__PURE__ */ jsx("div", { className: "mb-4 md:mb-6", children: /* @__PURE__ */ jsx(
          SortingOptions,
          {
            value: sortBy,
            onChange: setSortBy
          }
        ) }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsx(
            FlightList,
            {
              flights: processedFlights.slice(0, visibleFlights),
              searchParams: searchData.searchParams,
              batchId: batchId || "",
              onSelect: setSelectedFlight,
              onBack: handleBack,
              isSearchComplete: searchProgress == null ? void 0 : searchProgress.isComplete
            }
          ),
          visibleFlights < processedFlights.length && /* @__PURE__ */ jsx(
            ShowMoreButton,
            {
              visibleCount: visibleFlights,
              totalCount: processedFlights.length,
              onClick: handleShowMore
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "hidden lg:block", children: /* @__PURE__ */ jsx(AdSidebar, {}) })
    ] }) }),
    selectedFlight && /* @__PURE__ */ jsx(
      FlightDetailModal,
      {
        isOpen: !!selectedFlight,
        onClose: () => setSelectedFlight(null),
        flightOption: selectedFlight,
        searchParams: searchData.searchParams
      }
    ),
    /* @__PURE__ */ jsx(
      FlightFilterPanel,
      {
        flights: processedFlights,
        filters,
        onFilterChange: setFilters,
        isRoundTrip: searchData.searchParams.tripType === "roundTrip",
        className: "lg:hidden fixed inset-0 z-50 bg-white transform transition-transform duration-300",
        isOpen: isFiltersPanelOpen,
        onClose: () => setIsFiltersPanelOpen(false)
      }
    ),
    /* @__PURE__ */ jsx(
      "button",
      {
        onClick: handleToggleFilters,
        className: "lg:hidden fixed bottom-4 right-4 z-40 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-colors",
        children: /* @__PURE__ */ jsx(Filter, { className: "w-6 h-6" })
      }
    )
  ] });
}
function HeaderComponent({ title, subtitle, className = "" }) {
  return /* @__PURE__ */ jsxs("header", { className: `relative overflow-hidden ${className}`, children: [
    /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-blue-50 to-blue-100 opacity-50" }),
    /* @__PURE__ */ jsx("div", { className: "absolute inset-0", style: {
      backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%234299e1' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
    } }),
    /* @__PURE__ */ jsxs("div", { className: "relative container mx-auto px-4 py-16 md:py-24", children: [
      /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto text-center", children: [
        /* @__PURE__ */ jsx("h1", { className: "text-4xl md:text-5xl lg:text-6xl font-bold text-[#2D3748] mb-6 leading-tight", children: title }),
        /* @__PURE__ */ jsx("h2", { className: "text-lg md:text-xl text-[#4A5568] max-w-3xl mx-auto leading-relaxed", children: subtitle })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 w-32 h-32 md:w-48 md:h-48 bg-gradient-to-br from-blue-400/10 to-blue-600/10 rounded-full -translate-y-1/2 translate-x-1/2" }),
      /* @__PURE__ */ jsx("div", { className: "absolute bottom-0 left-0 w-24 h-24 md:w-40 md:h-40 bg-gradient-to-tr from-blue-400/10 to-blue-600/10 rounded-full translate-y-1/2 -translate-x-1/2" })
    ] })
  ] });
}
function FlightSearchComponent({ fromCity, toCity, className = "" }) {
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedFromCity, setSelectedFromCity] = useState(null);
  const [selectedToCity, setSelectedToCity] = useState(null);
  const [selectedDates, setSelectedDates] = useState({
    departure: "",
    return: ""
  });
  const [tripType, setTripType] = useState("roundTrip");
  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      if (!selectedFromCity || !selectedToCity) {
        throw new Error("Ju lutem zgjidhni qytetin e nisjes dhe destinacionit");
      }
      if (!selectedDates.departure) {
        throw new Error("Ju lutem zgjidhni datën e nisjes");
      }
      if (tripType === "roundTrip" && !selectedDates.return) {
        throw new Error("Ju lutem zgjidhni datën e kthimit");
      }
      const batchId = v4();
      const searchParams = {
        fromLocation: selectedFromCity.name,
        toLocation: selectedToCity.name,
        fromCode: selectedFromCity.code,
        toCode: selectedToCity.code,
        departureDate: formatDateForAPI(new Date(selectedDates.departure)),
        returnDate: selectedDates.return ? formatDateForAPI(new Date(selectedDates.return)) : null,
        tripType,
        travelClass: "1",
        stops: "0",
        passengers: {
          adults: 1,
          children: 0,
          infantsInSeat: 0,
          infantsOnLap: 0
        }
      };
      const { error: saveError } = await supabase$1.from("saved_searches").insert([{
        batch_id: batchId,
        user_id: null,
        search_params: searchParams,
        results: null,
        cached_results: null,
        cached_until: null,
        price_stability_level: "MEDIUM"
      }]);
      if (saveError) throw saveError;
      sessionStorage.setItem(`search_${batchId}`, "true");
      navigate(`/results?batch_id=${batchId}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ndodhi një gabim gjatë kërkimit të fluturimeve");
      console.error("Search error:", err);
    } finally {
      setLoading(false);
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: `bg-white rounded-2xl shadow-lg duration-300 ${className}`, children: [
    /* @__PURE__ */ jsxs("div", { className: "lg:hidden", children: [
      /* @__PURE__ */ jsxs(
        "button",
        {
          onClick: () => setIsExpanded(!isExpanded),
          className: "w-full px-6 py-4 bg-white flex items-center justify-between border-b border-gray-100",
          children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsx(Search, { className: "w-5 h-5 text-[#3182CE]" }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsx("span", { className: "text-[#2D3748] font-medium", children: fromCity }),
                /* @__PURE__ */ jsx(ArrowRight, { className: "w-4 h-4 text-[#4A5568]" }),
                /* @__PURE__ */ jsx("span", { className: "text-[#2D3748] font-medium", children: toCity })
              ] })
            ] }),
            /* @__PURE__ */ jsx("span", { className: "text-sm font-medium text-[#3182CE]", children: isExpanded ? "Mbyll" : "Kërko Fluturime" })
          ]
        }
      ),
      isExpanded && /* @__PURE__ */ jsxs("form", { onSubmit: handleSearch, className: "p-6 space-y-6 bg-white", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex gap-4 p-1 bg-gray-50 rounded-lg", children: [
          /* @__PURE__ */ jsxs("label", { className: "flex-1", children: [
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "radio",
                className: "sr-only peer",
                checked: tripType === "roundTrip",
                onChange: () => setTripType("roundTrip")
              }
            ),
            /* @__PURE__ */ jsx("div", { className: "w-full py-2 text-center text-sm font-medium rounded-md cursor-pointer transition-colors peer-checked:bg-white peer-checked:text-[#3182CE] peer-checked:shadow-sm text-gray-600", children: "Vajtje-Ardhje" })
          ] }),
          /* @__PURE__ */ jsxs("label", { className: "flex-1", children: [
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "radio",
                className: "sr-only peer",
                checked: tripType === "oneWay",
                onChange: () => setTripType("oneWay")
              }
            ),
            /* @__PURE__ */ jsx("div", { className: "w-full py-2 text-center text-sm font-medium rounded-md cursor-pointer transition-colors peer-checked:bg-white peer-checked:text-[#3182CE] peer-checked:shadow-sm text-gray-600", children: "Vetem Vajtje" })
          ] })
        ] }),
        /* @__PURE__ */ jsx(
          CityInput,
          {
            value: (selectedFromCity == null ? void 0 : selectedFromCity.name) || "",
            onChange: setSelectedFromCity,
            placeholder: "Nga ku?",
            icon: MapPin,
            label: "Nga"
          }
        ),
        /* @__PURE__ */ jsx(
          CityInput,
          {
            value: (selectedToCity == null ? void 0 : selectedToCity.name) || "",
            onChange: setSelectedToCity,
            placeholder: "Për ku?",
            icon: Plane,
            label: "Për"
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-[#2D3748] mb-1", children: "Data e Nisjes" }),
            /* @__PURE__ */ jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsx(Calendar, { className: "absolute left-3 top-1/2 -translate-y-1/2 text-[#4A5568]", size: 20 }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "date",
                  value: selectedDates.departure,
                  onChange: (e) => setSelectedDates({ ...selectedDates, departure: e.target.value }),
                  className: "w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3182CE] focus:border-transparent",
                  min: (/* @__PURE__ */ new Date()).toISOString().split("T")[0]
                }
              )
            ] })
          ] }),
          tripType === "roundTrip" && /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-[#2D3748] mb-1", children: "Data e Kthimit" }),
            /* @__PURE__ */ jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsx(Calendar, { className: "absolute left-3 top-1/2 -translate-y-1/2 text-[#4A5568]", size: 20 }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "date",
                  value: selectedDates.return,
                  onChange: (e) => setSelectedDates({ ...selectedDates, return: e.target.value }),
                  className: "w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3182CE] focus:border-transparent",
                  min: selectedDates.departure
                }
              )
            ] })
          ] })
        ] }),
        error && /* @__PURE__ */ jsx("div", { className: "p-4 bg-red-50 border border-red-100 rounded-lg text-sm text-red-600", children: error }),
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "submit",
            disabled: loading,
            className: `
                w-full py-4 rounded-lg font-medium text-white text-base
                transition-all duration-300 transform
                ${loading ? "bg-[#63B3ED] cursor-not-allowed" : "bg-[#3182CE] hover:bg-[#2C5282] active:scale-[0.98]"}
              `,
            children: loading ? /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center", children: [
              /* @__PURE__ */ jsx("div", { className: "animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" }),
              "Duke kerkuar..."
            ] }) : "Kërko Fluturime"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxs("form", { onSubmit: handleSearch, className: "hidden lg:block p-8", children: [
      /* @__PURE__ */ jsx("div", { className: "flex items-center gap-8 mb-8", children: /* @__PURE__ */ jsxs("div", { className: "flex gap-6 p-1 bg-gray-50 rounded-lg", children: [
        /* @__PURE__ */ jsxs("label", { className: "relative", children: [
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "radio",
              className: "sr-only peer",
              checked: tripType === "roundTrip",
              onChange: () => setTripType("roundTrip")
            }
          ),
          /* @__PURE__ */ jsx("div", { className: "px-6 py-2 rounded-md cursor-pointer transition-all duration-200 peer-checked:bg-white peer-checked:text-[#3182CE] peer-checked:shadow-sm text-gray-600", children: "Vajtje-Ardhje" })
        ] }),
        /* @__PURE__ */ jsxs("label", { className: "relative", children: [
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "radio",
              className: "sr-only peer",
              checked: tripType === "oneWay",
              onChange: () => setTripType("oneWay")
            }
          ),
          /* @__PURE__ */ jsx("div", { className: "px-6 py-2 rounded-md cursor-pointer transition-all duration-200 peer-checked:bg-white peer-checked:text-[#3182CE] peer-checked:shadow-sm text-gray-600", children: "Vetem Vajtje" })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 lg:grid-cols-4 gap-6", children: [
        /* @__PURE__ */ jsx(
          CityInput,
          {
            value: (selectedFromCity == null ? void 0 : selectedFromCity.name) || "",
            onChange: setSelectedFromCity,
            placeholder: "Nga ku?",
            icon: MapPin,
            label: "Nga"
          }
        ),
        /* @__PURE__ */ jsx(
          CityInput,
          {
            value: (selectedToCity == null ? void 0 : selectedToCity.name) || "",
            onChange: setSelectedToCity,
            placeholder: "Për ku?",
            icon: Plane,
            label: "Për"
          }
        ),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-[#2D3748] mb-1", children: "Data e Nisjes" }),
          /* @__PURE__ */ jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsx(Calendar, { className: "absolute left-3 top-1/2 -translate-y-1/2 text-[#4A5568]", size: 20 }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "date",
                value: selectedDates.departure,
                onChange: (e) => setSelectedDates({ ...selectedDates, departure: e.target.value }),
                className: "w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3182CE] focus:border-transparent",
                min: (/* @__PURE__ */ new Date()).toISOString().split("T")[0]
              }
            )
          ] })
        ] }),
        tripType === "roundTrip" ? /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-[#2D3748] mb-1", children: "Data e Kthimit" }),
          /* @__PURE__ */ jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsx(Calendar, { className: "absolute left-3 top-1/2 -translate-y-1/2 text-[#4A5568]", size: 20 }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "date",
                value: selectedDates.return,
                onChange: (e) => setSelectedDates({ ...selectedDates, return: e.target.value }),
                className: "w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3182CE] focus:border-transparent",
                min: selectedDates.departure
              }
            )
          ] })
        ] }) : /* @__PURE__ */ jsx("div", { className: "flex items-end", children: /* @__PURE__ */ jsx(
          "button",
          {
            type: "submit",
            disabled: loading,
            className: `
                  w-full py-2 rounded-lg font-medium text-white text-base
                  transition-all duration-300 transform
                  ${loading ? "bg-[#63B3ED] cursor-not-allowed" : "bg-[#3182CE] hover:bg-[#2C5282] active:scale-[0.98]"}
                `,
            children: loading ? "Duke kërkuar..." : "Kërko Fluturime"
          }
        ) })
      ] }),
      error && /* @__PURE__ */ jsx("div", { className: "mt-6 p-4 bg-red-50 border border-red-100 rounded-lg text-sm text-red-600", children: error }),
      tripType === "roundTrip" && /* @__PURE__ */ jsx("div", { className: "mt-8", children: /* @__PURE__ */ jsx(
        "button",
        {
          type: "submit",
          disabled: loading,
          className: `
                w-full py-4 rounded-lg font-medium text-white text-base
                transition-all duration-300 transform
                ${loading ? "bg-[#63B3ED] cursor-not-allowed" : "bg-[#3182CE] hover:bg-[#2C5282] active:scale-[0.98]"}
              `,
          children: loading ? /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center", children: [
            /* @__PURE__ */ jsx("div", { className: "animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" }),
            "Duke kerkuar..."
          ] }) : "Kërko Fluturime"
        }
      ) })
    ] })
  ] });
}
function PricingTableComponent({ fromCity, toCity, prices, title, className = "" }) {
  const monthlyPrices = React.useMemo(() => {
    const pricesByMonth = prices.reduce((acc, price) => {
      const month = format(new Date(price.date), "yyyy-MM");
      if (!acc[month] || price.price < acc[month].price) {
        acc[month] = {
          month,
          airline: price.airline,
          date: price.date,
          price: price.price
        };
      }
      return acc;
    }, {});
    return Object.values(pricesByMonth).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()).slice(0, 4);
  }, [prices]);
  const formatDate = (dateString) => {
    return format(new Date(dateString), "dd MMM yyyy");
  };
  const generateWhatsAppMessage = (price) => {
    const message = [
      "Pershendetje, Me intereson te di per bileta avioni",
      "",
      `${title}`,
      `Data: ${formatDate(price.date)}`,
      `Cmimi: ${price.price}€`
    ].join("\n");
    return encodeURIComponent(message);
  };
  const handleBooking = (price) => {
    const message = generateWhatsAppMessage(price);
    window.open(`https://api.whatsapp.com/send/?phone=355695161381&text=${message}`, "_blank");
  };
  return /* @__PURE__ */ jsxs("div", { className: `bg-white rounded-2xl shadow-lg transform transition-all duration-300 hover:shadow-xl ${className}`, children: [
    /* @__PURE__ */ jsxs("div", { className: "px-8 py-6 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-blue-100/50", children: [
      /* @__PURE__ */ jsxs("h3", { className: "text-xl font-semibold text-[#2D3748]", children: [
        "Biletat me te lira ",
        title
      ] }),
      /* @__PURE__ */ jsx("p", { className: "text-[#4A5568] mt-2", children: "Çmimet dhe disponueshmeria mund te ndryshojne" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "hidden md:block", children: /* @__PURE__ */ jsxs("table", { className: "w-full", children: [
      /* @__PURE__ */ jsx("thead", { className: "bg-gray-50", children: /* @__PURE__ */ jsxs("tr", { children: [
        /* @__PURE__ */ jsx("th", { className: "px-8 py-4 text-left text-sm font-medium text-[#4A5568] uppercase tracking-wider", children: "Linjat" }),
        /* @__PURE__ */ jsx("th", { className: "px-8 py-4 text-left text-sm font-medium text-[#4A5568] uppercase tracking-wider", children: "Data" }),
        /* @__PURE__ */ jsx("th", { className: "px-8 py-4 text-left text-sm font-medium text-[#4A5568] uppercase tracking-wider", children: "Cmimi" }),
        /* @__PURE__ */ jsx("th", { className: "px-8 py-4 text-right text-sm font-medium text-[#4A5568] uppercase tracking-wider", children: "Kontakto" })
      ] }) }),
      /* @__PURE__ */ jsx("tbody", { className: "divide-y divide-gray-100", children: monthlyPrices.map((price, index) => /* @__PURE__ */ jsxs("tr", { className: "group hover:bg-blue-50/50 transition-colors", children: [
        /* @__PURE__ */ jsx("td", { className: "px-8 py-6", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
          /* @__PURE__ */ jsx(Plane, { className: "w-5 h-5 text-[#3182CE] mr-3" }),
          /* @__PURE__ */ jsx("span", { className: "text-[#2D3748] font-medium", children: price.airline })
        ] }) }),
        /* @__PURE__ */ jsx("td", { className: "px-8 py-6", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center text-[#4A5568]", children: [
          /* @__PURE__ */ jsx(Calendar, { className: "w-4 h-4 mr-2 text-[#4A5568]" }),
          formatDate(price.date)
        ] }) }),
        /* @__PURE__ */ jsx("td", { className: "px-8 py-6", children: /* @__PURE__ */ jsxs("span", { className: "text-lg font-semibold text-[#2D3748]", children: [
          price.price,
          "€"
        ] }) }),
        /* @__PURE__ */ jsx("td", { className: "px-8 py-6 text-right", children: /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => handleBooking(price),
            className: "inline-flex items-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm font-medium group-hover:shadow-md",
            children: "Kontakto Tani"
          }
        ) })
      ] }, index)) })
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "md:hidden divide-y divide-gray-100", children: monthlyPrices.map((price, index) => /* @__PURE__ */ jsxs("div", { className: "p-6 hover:bg-blue-50/50 transition-colors", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-start mb-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
          /* @__PURE__ */ jsx(Plane, { className: "w-5 h-5 text-[#3182CE] mr-2" }),
          /* @__PURE__ */ jsx("span", { className: "text-[#2D3748] font-medium", children: price.airline })
        ] }),
        /* @__PURE__ */ jsxs("span", { className: "text-xl font-bold text-[#3182CE]", children: [
          price.price,
          "€"
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center text-[#4A5568] text-sm mb-4", children: [
        /* @__PURE__ */ jsx(Calendar, { className: "w-4 h-4 mr-2" }),
        formatDate(price.date)
      ] }),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => handleBooking(price),
          className: "w-full py-3 bg-green-500 text-white rounded-lg text-sm font-medium hover:bg-green-600 transition-colors shadow-sm hover:shadow-md",
          children: "Kontakto Tani"
        }
      )
    ] }, index)) })
  ] });
}
function StateCityPricingComponent({
  fromLocation,
  toLocation,
  title,
  className = ""
}) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [prices, setPrices] = useState([]);
  useEffect(() => {
    fetchPrices();
  }, [fromLocation, toLocation]);
  const getReadyLocations = async (state) => {
    try {
      const { data, error: error2 } = await supabase$1.from("seo_location_formats").select("city").eq("state", state).eq("type", "city").eq("status", "ready");
      if (error2) throw error2;
      return new Set((data || []).map((d) => d.city).filter(Boolean));
    } catch (err) {
      console.error("Error getting ready locations:", err);
      return /* @__PURE__ */ new Set();
    }
  };
  const getAirportsForLocation = async (location) => {
    try {
      console.log(`Getting airports for location:`, location);
      if (location.type === "city") {
        const { data: airports, error: error2 } = await supabase$1.from("airports").select("iata_code, city, state").eq("city", location.city).eq("state", location.state);
        if (error2) throw error2;
        console.log(`Found ${(airports == null ? void 0 : airports.length) || 0} airports for city ${location.city}`);
        return airports || [];
      } else {
        const readyCities = await getReadyLocations(location.state);
        const { data: airports, error: error2 } = await supabase$1.from("airports").select("iata_code, city, state").eq("state", location.state);
        if (error2) throw error2;
        const filteredAirports = (airports || []).filter(
          (airport) => readyCities.has(airport.city)
        );
        console.log(`Found ${filteredAirports.length} airports in ready cities for state ${location.state}`);
        return filteredAirports;
      }
    } catch (err) {
      console.error("Error getting airports:", err);
      throw new Error(`Failed to get airports for ${location.type === "city" ? location.city : location.state}`);
    }
  };
  const getBestPrice = async (fromIata, toIata) => {
    try {
      const { data, error: error2 } = await supabase$1.from("processed_flight_prices").select("airline, flight_date, total_price").eq("origin", fromIata).eq("destination", toIata).order("total_price", { ascending: true }).limit(1).maybeSingle();
      if (error2) throw error2;
      return data;
    } catch (err) {
      console.error(`Error getting price for ${fromIata}-${toIata}:`, err);
      return null;
    }
  };
  const fetchPrices = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log("Fetching prices for route:", {
        from: `${fromLocation.type}: ${fromLocation.city || fromLocation.state}`,
        to: `${toLocation.type}: ${toLocation.city || toLocation.state}`
      });
      const [fromAirports, toAirports] = await Promise.all([
        getAirportsForLocation(fromLocation),
        getAirportsForLocation(toLocation)
      ]);
      if (!fromAirports.length || !toAirports.length) {
        throw new Error("No valid airports found for this route");
      }
      console.log("Retrieved airports:", {
        from: fromAirports.map((a) => `${a.city} (${a.iata_code})`),
        to: toAirports.map((a) => `${a.city} (${a.iata_code})`)
      });
      const allPrices = [];
      for (const fromAirport of fromAirports) {
        for (const toAirport of toAirports) {
          if (fromAirport.iata_code === toAirport.iata_code) continue;
          const bestPrice = await getBestPrice(fromAirport.iata_code, toAirport.iata_code);
          if (bestPrice) {
            allPrices.push({
              airline: bestPrice.airline,
              flight_date: bestPrice.flight_date,
              total_price: bestPrice.total_price,
              fromCity: fromAirport.city,
              toCity: toAirport.city,
              iataFrom: fromAirport.iata_code,
              iataTo: toAirport.iata_code
            });
          }
        }
      }
      const sortedPrices = allPrices.sort((a, b) => a.total_price - b.total_price).slice(0, 10);
      console.log(`Found ${sortedPrices.length} routes with prices`);
      setPrices(sortedPrices);
    } catch (err) {
      console.error("Error fetching prices:", err);
      setError(err instanceof Error ? err.message : "Failed to load prices");
    } finally {
      setLoading(false);
    }
  };
  const formatDate = (dateString) => {
    try {
      const date = parseISO(dateString);
      if (!isValid(date)) {
        console.warn("Invalid date:", dateString);
        return "Date unavailable";
      }
      return format(date, "dd MMM yyyy");
    } catch (err) {
      console.error("Error formatting date:", err, "Date string:", dateString);
      return "Date unavailable";
    }
  };
  const generateWhatsAppMessage = (price) => {
    try {
      const message = [
        "Pershendetje, Me intereson te di per bileta avioni",
        "",
        `${price.fromCity} - ${price.toCity}`,
        `Data: ${formatDate(price.flight_date)}`,
        `Cmimi: ${price.total_price}€`
      ].join("\n");
      return encodeURIComponent(message);
    } catch (err) {
      console.error("Error generating message:", err);
      return encodeURIComponent("Pershendetje, Me intereson te di per bileta avioni");
    }
  };
  const handleBooking = (price) => {
    const message = generateWhatsAppMessage(price);
    window.open(`https://api.whatsapp.com/send/?phone=355695161381&text=${message}`, "_blank");
  };
  if (loading) {
    return /* @__PURE__ */ jsxs("div", { className: `bg-white rounded-2xl shadow-lg p-8 text-center ${className}`, children: [
      /* @__PURE__ */ jsx(Loader2, { className: "w-8 h-8 text-blue-600 animate-spin mx-auto" }),
      /* @__PURE__ */ jsx("p", { className: "mt-4 text-gray-600", children: "Duke ngarkuar çmimet..." })
    ] });
  }
  if (error) {
    return /* @__PURE__ */ jsx("div", { className: `bg-white rounded-2xl shadow-lg p-8 ${className}`, children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center gap-3 text-red-600", children: [
      /* @__PURE__ */ jsx(AlertCircle, { className: "w-5 h-5" }),
      /* @__PURE__ */ jsx("p", { children: error })
    ] }) });
  }
  if (prices.length === 0) {
    return /* @__PURE__ */ jsx("div", { className: `bg-white rounded-2xl shadow-lg p-8 text-center ${className}`, children: /* @__PURE__ */ jsx("p", { className: "text-gray-600", children: "Nuk u gjeten çmime per kete rruge. Ju lutem beni kerkimin me siper..." }) });
  }
  return /* @__PURE__ */ jsxs("div", { className: `bg-white rounded-2xl shadow-lg transform transition-all duration-300 hover:shadow-xl ${className}`, children: [
    /* @__PURE__ */ jsxs("div", { className: "px-8 py-6 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-blue-100/50", children: [
      /* @__PURE__ */ jsxs("h3", { className: "text-xl font-semibold text-[#2D3748]", children: [
        "Bileta avioni te lira ",
        title
      ] }),
      /* @__PURE__ */ jsx("p", { className: "text-[#4A5568] mt-2", children: "Çmimet online dhe disponueshmeria mund të ndryshojne" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "hidden md:block", children: /* @__PURE__ */ jsxs("table", { className: "w-full", children: [
      /* @__PURE__ */ jsx("thead", { className: "bg-gray-50", children: /* @__PURE__ */ jsxs("tr", { children: [
        /* @__PURE__ */ jsx("th", { className: "px-8 py-4 text-left text-sm font-medium text-[#4A5568] uppercase tracking-wider", children: "Linjat" }),
        /* @__PURE__ */ jsx("th", { className: "px-8 py-4 text-left text-sm font-medium text-[#4A5568] uppercase tracking-wider", children: "Kompanite" }),
        /* @__PURE__ */ jsx("th", { className: "px-8 py-4 text-left text-sm font-medium text-[#4A5568] uppercase tracking-wider", children: "Data" }),
        /* @__PURE__ */ jsx("th", { className: "px-8 py-4 text-left text-sm font-medium text-[#4A5568] uppercase tracking-wider", children: "Cmimi" }),
        /* @__PURE__ */ jsx("th", { className: "px-8 py-4 text-right text-sm font-medium text-[#4A5568] uppercase tracking-wider", children: "Kontakto" })
      ] }) }),
      /* @__PURE__ */ jsx("tbody", { className: "divide-y divide-gray-100", children: prices.map((price, index) => /* @__PURE__ */ jsxs("tr", { className: "group hover:bg-blue-50/50 transition-colors", children: [
        /* @__PURE__ */ jsx("td", { className: "px-8 py-6", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
          /* @__PURE__ */ jsx(Plane, { className: "w-5 h-5 text-[#3182CE] mr-3" }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("span", { className: "text-[#2D3748] font-medium", children: price.fromCity }),
            /* @__PURE__ */ jsx(ArrowRight, { className: "w-4 h-4 mx-2 inline text-gray-400" }),
            /* @__PURE__ */ jsx("span", { className: "text-[#2D3748] font-medium", children: price.toCity })
          ] })
        ] }) }),
        /* @__PURE__ */ jsx("td", { className: "px-8 py-6", children: /* @__PURE__ */ jsx("span", { className: "text-[#4A5568]", children: price.airline }) }),
        /* @__PURE__ */ jsx("td", { className: "px-8 py-6", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center text-[#4A5568]", children: [
          /* @__PURE__ */ jsx(Calendar, { className: "w-4 h-4 mr-2 text-[#4A5568]" }),
          formatDate(price.flight_date)
        ] }) }),
        /* @__PURE__ */ jsx("td", { className: "px-8 py-6", children: /* @__PURE__ */ jsxs("span", { className: "text-lg font-semibold text-[#2D3748]", children: [
          price.total_price,
          "€"
        ] }) }),
        /* @__PURE__ */ jsx("td", { className: "px-8 py-6 text-right", children: /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => handleBooking(price),
            className: "inline-flex items-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm font-medium group-hover:shadow-md",
            children: "Kontakto Tani"
          }
        ) })
      ] }, `${price.iataFrom}-${price.iataTo}-${index}`)) })
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "md:hidden divide-y divide-gray-100", children: prices.map((price, index) => /* @__PURE__ */ jsxs("div", { className: "p-6 hover:bg-blue-50/50 transition-colors", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-start mb-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
          /* @__PURE__ */ jsx(Plane, { className: "w-5 h-5 text-[#3182CE] mr-2" }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("div", { className: "font-medium text-[#2D3748]", children: [
              price.fromCity,
              /* @__PURE__ */ jsx(ArrowRight, { className: "w-4 h-4 mx-2 inline text-gray-400" }),
              price.toCity
            ] }),
            /* @__PURE__ */ jsx("div", { className: "text-[#4A5568] text-sm mt-1", children: price.airline })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("span", { className: "text-xl font-bold text-[#3182CE]", children: [
          price.total_price,
          "€"
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center text-[#4A5568] text-sm mb-4", children: [
        /* @__PURE__ */ jsx(Calendar, { className: "w-4 h-4 mr-2" }),
        formatDate(price.flight_date)
      ] }),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => handleBooking(price),
          className: "w-full py-3 bg-green-500 text-white rounded-lg text-sm font-medium hover:bg-green-600 transition-colors shadow-sm hover:shadow-md",
          children: "Kontakto Tani"
        }
      )
    ] }, `${price.iataFrom}-${price.iataTo}-${index}`)) })
  ] });
}
function StatePricingComponent({
  fromLocation,
  toLocation,
  title,
  className = ""
}) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [prices, setPrices] = useState([]);
  useState(null);
  useState(null);
  useEffect(() => {
    fetchPrices();
  }, [fromLocation, toLocation]);
  const getReadyLocations = async (state) => {
    try {
      const { data, error: error2 } = await supabase$1.from("seo_location_formats").select("city").eq("state", state).eq("type", "city").eq("status", "ready");
      if (error2) throw error2;
      return new Set((data || []).map((d) => d.city).filter(Boolean));
    } catch (err) {
      console.error("Error getting ready locations:", err);
      return /* @__PURE__ */ new Set();
    }
  };
  const getAirportsForState = async (state) => {
    try {
      const readyCities = await getReadyLocations(state);
      const { data: airports, error: error2 } = await supabase$1.from("airports").select("iata_code, city, state, name").eq("state", state);
      if (error2) throw error2;
      return (airports || []).filter((airport) => readyCities.has(airport.city));
    } catch (err) {
      console.error("Error getting airports for state:", err);
      return [];
    }
  };
  const getBestPrice = async (fromIata, toIata) => {
    try {
      const { data, error: error2 } = await supabase$1.from("processed_flight_prices").select("airline, flight_date, total_price, is_direct").eq("origin", fromIata).eq("destination", toIata).order("total_price", { ascending: true }).limit(1).maybeSingle();
      if (error2) throw error2;
      return data;
    } catch (err) {
      console.error(`Error getting price for ${fromIata}-${toIata}:`, err);
      return null;
    }
  };
  const fetchPrices = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log("Fetching state-level prices:", {
        fromState: fromLocation.state,
        toState: toLocation.state
      });
      const [fromAirports, toAirports] = await Promise.all([
        getAirportsForState(fromLocation.state),
        getAirportsForState(toLocation.state)
      ]);
      if (!fromAirports.length || !toAirports.length) {
        throw new Error("No airports found for the selected states");
      }
      console.log("Retrieved airports:", {
        from: fromAirports.map((a) => `${a.city} (${a.iata_code})`),
        to: toAirports.map((a) => `${a.city} (${a.iata_code})`)
      });
      const allPrices = [];
      for (const fromAirport of fromAirports) {
        for (const toAirport of toAirports) {
          if (fromAirport.iata_code === toAirport.iata_code) continue;
          const bestPrice = await getBestPrice(fromAirport.iata_code, toAirport.iata_code);
          if (bestPrice) {
            allPrices.push({
              fromCity: fromAirport.city,
              toCity: toAirport.city,
              fromState: fromAirport.state,
              toState: toAirport.state,
              iataFrom: fromAirport.iata_code,
              iataTo: toAirport.iata_code,
              airline: bestPrice.airline,
              flight_date: bestPrice.flight_date,
              total_price: bestPrice.total_price,
              has_direct_flight: bestPrice.is_direct
            });
          }
        }
      }
      const bestPrices = allPrices.reduce((acc, price) => {
        const key = `${price.fromCity}-${price.toCity}`;
        if (!acc[key] || price.total_price < acc[key].total_price) {
          acc[key] = price;
        }
        return acc;
      }, {});
      const sortedPrices = Object.values(bestPrices).sort((a, b) => a.total_price - b.total_price).slice(0, 10);
      console.log(`Found ${sortedPrices.length} unique city pairs with prices`);
      setPrices(sortedPrices);
    } catch (err) {
      console.error("Error fetching state prices:", err);
      setError(err instanceof Error ? err.message : "Failed to load prices");
    } finally {
      setLoading(false);
    }
  };
  const formatDate = (dateString) => {
    try {
      const date = parseISO(dateString);
      if (!isValid(date)) {
        console.warn("Invalid date:", dateString);
        return "Date unavailable";
      }
      return format(date, "dd MMM yyyy");
    } catch (err) {
      console.error("Error formatting date:", err, "Date string:", dateString);
      return "Date unavailable";
    }
  };
  const generateWhatsAppMessage = (price) => {
    try {
      const message = [
        "Pershendetje, Me intereson te di per bileta avioni",
        "",
        `${price.fromCity} - ${price.toCity}`,
        `Data: ${formatDate(price.flight_date)}`,
        `Cmimi: ${price.total_price}€`
      ].join("\n");
      return encodeURIComponent(message);
    } catch (err) {
      console.error("Error generating message:", err);
      return encodeURIComponent("Pershendetje, Me intereson te di per bileta avioni");
    }
  };
  const handleBooking = (price) => {
    const message = generateWhatsAppMessage(price);
    window.open(`https://api.whatsapp.com/send/?phone=355695161381&text=${message}`, "_blank");
  };
  if (loading) {
    return /* @__PURE__ */ jsxs("div", { className: `bg-white rounded-2xl shadow-lg p-8 text-center ${className}`, children: [
      /* @__PURE__ */ jsx(Loader2, { className: "w-8 h-8 text-blue-600 animate-spin mx-auto" }),
      /* @__PURE__ */ jsx("p", { className: "mt-4 text-gray-600", children: "Duke ngarkuar çmimet..." })
    ] });
  }
  if (error) {
    return /* @__PURE__ */ jsx("div", { className: `bg-white rounded-2xl shadow-lg p-8 ${className}`, children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center gap-3 text-red-600", children: [
      /* @__PURE__ */ jsx(AlertCircle, { className: "w-5 h-5" }),
      /* @__PURE__ */ jsx("p", { children: error })
    ] }) });
  }
  if (prices.length === 0) {
    return /* @__PURE__ */ jsx("div", { className: `bg-white rounded-2xl shadow-lg p-8 text-center ${className}`, children: /* @__PURE__ */ jsx("p", { className: "text-gray-600", children: "Nuk u gjeten çmime per kete rruge. Ju lutem beni kerkimin me siper..." }) });
  }
  return /* @__PURE__ */ jsxs("div", { className: `bg-white rounded-2xl shadow-lg transform transition-all duration-300 hover:shadow-xl ${className}`, children: [
    /* @__PURE__ */ jsxs("div", { className: "px-8 py-6 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-blue-100/50", children: [
      /* @__PURE__ */ jsxs("h3", { className: "text-xl font-semibold text-[#2D3748]", children: [
        "Bileta avioni te lira ",
        title
      ] }),
      /* @__PURE__ */ jsx("p", { className: "text-[#4A5568] mt-2", children: "Çmimet online dhe disponueshmeria mund te ndryshojne" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "hidden md:block", children: /* @__PURE__ */ jsxs("table", { className: "w-full", children: [
      /* @__PURE__ */ jsx("thead", { className: "bg-gray-50", children: /* @__PURE__ */ jsxs("tr", { children: [
        /* @__PURE__ */ jsx("th", { className: "px-8 py-4 text-left text-sm font-medium text-[#4A5568] uppercase tracking-wider", children: "Linjat" }),
        /* @__PURE__ */ jsx("th", { className: "px-8 py-4 text-left text-sm font-medium text-[#4A5568] uppercase tracking-wider", children: "Kompanite" }),
        /* @__PURE__ */ jsx("th", { className: "px-8 py-4 text-left text-sm font-medium text-[#4A5568] uppercase tracking-wider", children: "Data" }),
        /* @__PURE__ */ jsx("th", { className: "px-8 py-4 text-left text-sm font-medium text-[#4A5568] uppercase tracking-wider", children: "Cmimi" }),
        /* @__PURE__ */ jsx("th", { className: "px-8 py-4 text-right text-sm font-medium text-[#4A5568] uppercase tracking-wider", children: "Kontakto" })
      ] }) }),
      /* @__PURE__ */ jsx("tbody", { className: "divide-y divide-gray-100", children: prices.map((price, index) => /* @__PURE__ */ jsxs("tr", { className: "group hover:bg-blue-50/50 transition-colors", children: [
        /* @__PURE__ */ jsx("td", { className: "px-8 py-6", children: /* @__PURE__ */ jsx("div", { className: "flex items-center", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
            /* @__PURE__ */ jsx(MapPin, { className: "w-5 h-5 text-[#3182CE] mr-2" }),
            /* @__PURE__ */ jsx("span", { className: "text-[#2D3748] font-medium", children: price.fromCity }),
            /* @__PURE__ */ jsx(ArrowRight, { className: "w-4 h-4 mx-2 text-gray-400" }),
            /* @__PURE__ */ jsx("span", { className: "text-[#2D3748] font-medium", children: price.toCity })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "text-sm text-gray-500 mt-1", children: price.has_direct_flight ? "Fluturim direkt" : "Me ndalese" })
        ] }) }) }),
        /* @__PURE__ */ jsx("td", { className: "px-8 py-6", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
          /* @__PURE__ */ jsx(Plane, { className: "w-4 h-4 text-[#4A5568] mr-2" }),
          /* @__PURE__ */ jsx("span", { className: "text-[#4A5568]", children: price.airline })
        ] }) }),
        /* @__PURE__ */ jsx("td", { className: "px-8 py-6", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center text-[#4A5568]", children: [
          /* @__PURE__ */ jsx(Calendar, { className: "w-4 h-4 mr-2 text-[#4A5568]" }),
          formatDate(price.flight_date)
        ] }) }),
        /* @__PURE__ */ jsx("td", { className: "px-8 py-6", children: /* @__PURE__ */ jsxs("span", { className: "text-lg font-semibold text-[#2D3748]", children: [
          price.total_price,
          "€"
        ] }) }),
        /* @__PURE__ */ jsx("td", { className: "px-8 py-6 text-right", children: /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => handleBooking(price),
            className: "inline-flex items-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm font-medium group-hover:shadow-md",
            children: "Kontakto Tani"
          }
        ) })
      ] }, `${price.iataFrom}-${price.iataTo}-${index}`)) })
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "md:hidden divide-y divide-gray-100", children: prices.map((price, index) => /* @__PURE__ */ jsxs("div", { className: "p-6 hover:bg-blue-50/50 transition-colors", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-start mb-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
            /* @__PURE__ */ jsx(MapPin, { className: "w-5 h-5 text-[#3182CE] mr-2" }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsxs("div", { className: "font-medium text-[#2D3748]", children: [
                price.fromCity,
                /* @__PURE__ */ jsx(ArrowRight, { className: "w-4 h-4 mx-2 inline text-gray-400" }),
                price.toCity
              ] }),
              /* @__PURE__ */ jsx("div", { className: "text-[#4A5568] text-sm mt-1", children: price.airline })
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "text-sm text-gray-500 mt-2", children: price.has_direct_flight ? "Fluturim direkt" : "Me ndalese" })
        ] }),
        /* @__PURE__ */ jsxs("span", { className: "text-xl font-bold text-[#3182CE]", children: [
          price.total_price,
          "€"
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center text-[#4A5568] text-sm mb-4", children: [
        /* @__PURE__ */ jsx(Calendar, { className: "w-4 h-4 mr-2" }),
        formatDate(price.flight_date)
      ] }),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => handleBooking(price),
          className: "w-full py-3 bg-green-500 text-white rounded-lg text-sm font-medium hover:bg-green-600 transition-colors shadow-sm hover:shadow-md",
          children: "Kontakto Tani"
        }
      )
    ] }, `${price.iataFrom}-${price.iataTo}-${index}`)) })
  ] });
}
function RouteInfoComponent({
  fromCity,
  toCity,
  airlines,
  duration,
  isDirect,
  title,
  className = ""
}) {
  return /* @__PURE__ */ jsxs("div", { className: `bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-xl ${className}`, children: [
    /* @__PURE__ */ jsx("div", { className: "px-8 py-6 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-blue-100/50", children: /* @__PURE__ */ jsxs("h3", { className: "text-xl font-semibold text-[#2D3748]", children: [
      "Informacion per fluturimin ",
      title
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "p-8", children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "space-y-8", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h4", { className: "text-sm font-medium text-[#4A5568] mb-4", children: "Kompanite Ajrore" }),
          /* @__PURE__ */ jsx("div", { className: "space-y-3", children: airlines.map((airline, index) => /* @__PURE__ */ jsxs(
            "div",
            {
              className: "flex items-center bg-gray-50 p-4 rounded-xl hover:bg-blue-50 transition-colors",
              children: [
                /* @__PURE__ */ jsx(Plane, { className: "w-5 h-5 text-[#3182CE] mr-3" }),
                /* @__PURE__ */ jsx("span", { className: "text-[#2D3748] font-medium", children: airline })
              ]
            },
            index
          )) })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h4", { className: "text-sm font-medium text-[#4A5568] mb-4", children: "Kohezgjatja e Fluturimit" }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center bg-gray-50 p-4 rounded-xl", children: [
            /* @__PURE__ */ jsx(Clock, { className: "w-5 h-5 text-[#3182CE] mr-3" }),
            /* @__PURE__ */ jsx("span", { className: "text-[#2D3748] font-medium", children: duration })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h4", { className: "text-sm font-medium text-[#4A5568] mb-4", children: "Lloji i Fluturimit" }),
          /* @__PURE__ */ jsxs("div", { className: `flex items-center p-6 rounded-xl ${isDirect ? "bg-green-50" : "bg-amber-50"}`, children: [
            /* @__PURE__ */ jsx("div", { className: "p-3 bg-white rounded-lg shadow-sm mr-4", children: /* @__PURE__ */ jsx(CheckCircle, { className: "w-6 h-6 text-green-600" }) }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("p", { className: "font-medium text-green-900", children: "Fluturim Direkt ose me ndalese" }),
              /* @__PURE__ */ jsx("p", { className: "text-sm text-green-700 mt-1", children: "Merrni ofertat me te mira duke kontaktuar tani." })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mt-8 bg-blue-50 rounded-xl p-6", children: [
          /* @__PURE__ */ jsx("h4", { className: "font-medium text-[#2D3748] mb-4", children: "Informacion i Rendesishëm" }),
          /* @__PURE__ */ jsxs("ul", { className: "space-y-3", children: [
            /* @__PURE__ */ jsxs("li", { className: "flex items-center text-[#4A5568]", children: [
              /* @__PURE__ */ jsx("span", { className: "w-1.5 h-1.5 bg-[#3182CE] rounded-full mr-3" }),
              "Çmimet mund te ndryshojne bazuar në daten e zgjedhur"
            ] }),
            /* @__PURE__ */ jsxs("li", { className: "flex items-center text-[#4A5568]", children: [
              /* @__PURE__ */ jsx("span", { className: "w-1.5 h-1.5 bg-[#3182CE] rounded-full mr-3" }),
              "Disponueshmeria varet nga sezoni"
            ] }),
            /* @__PURE__ */ jsxs("li", { className: "flex items-center text-[#4A5568]", children: [
              /* @__PURE__ */ jsx("span", { className: "w-1.5 h-1.5 bg-[#3182CE] rounded-full mr-3" }),
              "Rekomandohet rezervimi i hershem"
            ] })
          ] })
        ] })
      ] })
    ] }) })
  ] });
}
function StateRouteInfoComponent({
  fromLocation,
  toLocation,
  title,
  className = ""
}) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [routeInfo, setRouteInfo] = useState(null);
  useEffect(() => {
    fetchRouteInfo();
  }, [fromLocation, toLocation]);
  const getReadyLocations = async (state) => {
    try {
      const { data, error: error2 } = await supabase$1.from("seo_location_formats").select("city").eq("state", state).eq("type", "city").eq("status", "ready");
      if (error2) throw error2;
      return new Set((data || []).map((d) => d.city).filter(Boolean));
    } catch (err) {
      console.error("Error getting ready locations:", err);
      return /* @__PURE__ */ new Set();
    }
  };
  const getAirportsForState = async (state) => {
    try {
      const readyCities = await getReadyLocations(state);
      const { data: airports, error: error2 } = await supabase$1.from("airports").select("iata_code, city, state, name").eq("state", state);
      if (error2) throw error2;
      return (airports || []).filter((airport) => readyCities.has(airport.city));
    } catch (err) {
      console.error("Error getting airports for state:", err);
      return [];
    }
  };
  const fetchRouteInfo = async () => {
    try {
      setLoading(true);
      setError(null);
      const [fromAirports, toAirports] = await Promise.all([
        getAirportsForState(fromLocation.state),
        getAirportsForState(toLocation.state)
      ]);
      if (!fromAirports.length || !toAirports.length) {
        throw new Error("No airports found for the selected states");
      }
      const airlines = /* @__PURE__ */ new Set();
      let hasDirectFlights = false;
      let totalDuration = 0;
      let routeCount = 0;
      for (const fromAirport of fromAirports) {
        for (const toAirport of toAirports) {
          if (fromAirport.iata_code === toAirport.iata_code) continue;
          const { data: flights } = await supabase$1.from("processed_flight_prices").select("airline, is_direct, duration").eq("origin", fromAirport.iata_code).eq("destination", toAirport.iata_code);
          if (flights == null ? void 0 : flights.length) {
            flights.forEach((flight) => {
              airlines.add(flight.airline);
              if (flight.is_direct) hasDirectFlights = true;
              if (flight.duration) {
                totalDuration += flight.duration;
                routeCount++;
              }
            });
          }
        }
      }
      const averageDuration = routeCount > 0 ? `${Math.round(totalDuration / routeCount / 60)}h ${Math.round(totalDuration / routeCount % 60)}m` : "2h 0m";
      setRouteInfo({
        airlines: Array.from(airlines),
        hasDirectFlights,
        averageDuration,
        fromAirports,
        toAirports
      });
    } catch (err) {
      console.error("Error fetching route info:", err);
      setError(err instanceof Error ? err.message : "Failed to load route information");
    } finally {
      setLoading(false);
    }
  };
  const handleContact = () => {
    const message = encodeURIComponent(
      `Pershendetje! Me intereson te di per fluturime nga ${fromLocation.state} ne ${toLocation.state}. Faleminderit!`
    );
    window.open(`https://api.whatsapp.com/send/?phone=355695161381&text=${message}`, "_blank");
  };
  if (loading) {
    return /* @__PURE__ */ jsxs("div", { className: `bg-white rounded-2xl shadow-lg p-8 text-center ${className}`, children: [
      /* @__PURE__ */ jsx("div", { className: "animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto" }),
      /* @__PURE__ */ jsx("p", { className: "mt-4 text-gray-600", children: "Duke ngarkuar informacionin..." })
    ] });
  }
  if (error || !routeInfo) {
    return /* @__PURE__ */ jsx("div", { className: `bg-white rounded-2xl shadow-lg p-8 text-center ${className}`, children: /* @__PURE__ */ jsx("p", { className: "text-red-600", children: error || "Nuk u gjet informacion per kete rruge" }) });
  }
  return /* @__PURE__ */ jsxs("div", { className: `bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-xl ${className}`, children: [
    /* @__PURE__ */ jsx("div", { className: "px-8 py-6 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-blue-100/50", children: /* @__PURE__ */ jsxs("h3", { className: "text-xl font-semibold text-[#2D3748]", children: [
      "Informacion per fluturimet ",
      title
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "p-8", children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "space-y-8", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h4", { className: "text-sm font-medium text-[#4A5568] mb-4", children: "Kompanite Ajrore" }),
          /* @__PURE__ */ jsx("div", { className: "space-y-3", children: routeInfo.airlines.map((airline, index) => /* @__PURE__ */ jsxs(
            "div",
            {
              className: "flex items-center bg-gray-50 p-4 rounded-xl hover:bg-blue-50 transition-colors",
              children: [
                /* @__PURE__ */ jsx(Plane, { className: "w-5 h-5 text-[#3182CE] mr-3" }),
                /* @__PURE__ */ jsx("span", { className: "text-[#2D3748] font-medium", children: airline })
              ]
            },
            index
          )) })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h4", { className: "text-sm font-medium text-[#4A5568] mb-4", children: "Aeroportet e Disponueshme" }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsxs("div", { className: "text-sm text-[#4A5568] mb-2", children: [
                "Nga ",
                fromLocation.state,
                ":"
              ] }),
              /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-2", children: routeInfo.fromAirports.map((airport) => /* @__PURE__ */ jsxs("div", { className: "bg-gray-50 p-3 rounded-lg", children: [
                /* @__PURE__ */ jsx("div", { className: "font-medium text-[#2D3748]", children: airport.city }),
                /* @__PURE__ */ jsx("div", { className: "text-sm text-[#4A5568]", children: airport.iata_code })
              ] }, airport.iata_code)) })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsxs("div", { className: "text-sm text-[#4A5568] mb-2", children: [
                "Ne ",
                toLocation.state,
                ":"
              ] }),
              /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-2", children: routeInfo.toAirports.map((airport) => /* @__PURE__ */ jsxs("div", { className: "bg-gray-50 p-3 rounded-lg", children: [
                /* @__PURE__ */ jsx("div", { className: "font-medium text-[#2D3748]", children: airport.city }),
                /* @__PURE__ */ jsx("div", { className: "text-sm text-[#4A5568]", children: airport.iata_code })
              ] }, airport.iata_code)) })
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h4", { className: "text-sm font-medium text-[#4A5568] mb-4", children: "Rezervoni me Specialistet Tane" }),
          /* @__PURE__ */ jsx("div", { className: "bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200", children: /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-4", children: [
            /* @__PURE__ */ jsx("div", { className: "p-3 bg-white rounded-lg shadow-sm", children: /* @__PURE__ */ jsx(CheckCircle, { className: "w-6 h-6 text-blue-600" }) }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h5", { className: "font-medium text-[#2D3748] mb-2", children: "Pse te rezervoni me ne?" }),
              /* @__PURE__ */ jsxs("ul", { className: "space-y-3", children: [
                /* @__PURE__ */ jsxs("li", { className: "flex items-center text-[#4A5568]", children: [
                  /* @__PURE__ */ jsx("span", { className: "w-1.5 h-1.5 bg-[#3182CE] rounded-full mr-3" }),
                  "Çmime ekskluzive dhe oferta speciale"
                ] }),
                /* @__PURE__ */ jsxs("li", { className: "flex items-center text-[#4A5568]", children: [
                  /* @__PURE__ */ jsx("span", { className: "w-1.5 h-1.5 bg-[#3182CE] rounded-full mr-3" }),
                  "Asistence 24/7 gjate gjithe udhetimit"
                ] }),
                /* @__PURE__ */ jsxs("li", { className: "flex items-center text-[#4A5568]", children: [
                  /* @__PURE__ */ jsx("span", { className: "w-1.5 h-1.5 bg-[#3182CE] rounded-full mr-3" }),
                  "Eksperience 15+ vjeçare ne treg"
                ] }),
                /* @__PURE__ */ jsxs("li", { className: "flex items-center text-[#4A5568]", children: [
                  /* @__PURE__ */ jsx("span", { className: "w-1.5 h-1.5 bg-[#3182CE] rounded-full mr-3" }),
                  "Garanci cmimi me te mire"
                ] })
              ] })
            ] })
          ] }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mt-8 bg-green-50 rounded-xl p-6 border border-green-200", children: [
          /* @__PURE__ */ jsxs("h4", { className: "font-medium text-[#2D3748] mb-4 flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(Info, { className: "w-5 h-5 text-green-600" }),
            "Kontaktoni Tani"
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsx("p", { className: "text-green-800", children: "Specialistet tane jane gati t'ju ndihmojne me:" }),
            /* @__PURE__ */ jsxs("ul", { className: "space-y-2 text-green-700", children: [
              /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsx(ArrowRight, { className: "w-4 h-4" }),
                "Keshillim per datat me te pershtatshme"
              ] }),
              /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsx(ArrowRight, { className: "w-4 h-4" }),
                "Informacion per bagazhet"
              ] }),
              /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsx(ArrowRight, { className: "w-4 h-4" }),
                "Zgjidhje alternative udhetimi"
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "mt-6 space-y-3", children: [
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: handleContact,
                  className: "w-full py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors shadow-sm hover:shadow-md flex items-center justify-center gap-2",
                  children: /* @__PURE__ */ jsx("span", { children: "Kontakto ne WhatsApp" })
                }
              ),
              /* @__PURE__ */ jsx(
                "a",
                {
                  href: "tel:+355695161381",
                  className: "w-full py-3 bg-white text-green-700 border border-green-300 rounded-lg font-medium hover:bg-green-50 transition-colors text-center flex items-center justify-center gap-2",
                  children: /* @__PURE__ */ jsx("span", { children: "+355 69 516 1381" })
                }
              )
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mt-8 bg-gray-50 rounded-xl p-6", children: [
          /* @__PURE__ */ jsx("h4", { className: "font-medium text-[#2D3748] mb-4", children: "Detaje te Fluturimit" }),
          /* @__PURE__ */ jsxs("ul", { className: "space-y-3", children: [
            /* @__PURE__ */ jsxs("li", { className: "flex items-center text-[#4A5568]", children: [
              /* @__PURE__ */ jsx(Clock, { className: "w-4 h-4 text-[#3182CE] mr-2" }),
              "Kohezgjatja mesatare: ",
              routeInfo.averageDuration
            ] }),
            /* @__PURE__ */ jsxs("li", { className: "flex items-center text-[#4A5568]", children: [
              /* @__PURE__ */ jsx(Plane, { className: "w-4 h-4 text-[#3182CE] mr-2" }),
              routeInfo.airlines.length,
              " kompani ajrore"
            ] }),
            /* @__PURE__ */ jsxs("li", { className: "flex items-center text-[#4A5568]", children: [
              /* @__PURE__ */ jsx(MapPin, { className: "w-4 h-4 text-[#3182CE] mr-2" }),
              routeInfo.fromAirports.length + routeInfo.toAirports.length,
              " aeroporte"
            ] })
          ] })
        ] })
      ] })
    ] }) })
  ] });
}
function FAQComponent({ fromCity, toCity, questions, title, className = "" }) {
  const [expandedIndex, setExpandedIndex] = useState(null);
  const toggleQuestion = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };
  const generateWhatsAppMessage = () => {
    const message = [
      "Pershendetje!",
      "",
      "Ju lutem mund te me ndihmoni me informacion per bilete avioni?",
      "",
      `Nga: ${fromCity}`,
      `Per: ${toCity}`,
      "",
      "Faleminderit!"
    ].join("\n");
    return encodeURIComponent(message);
  };
  const handleContact = () => {
    const message = generateWhatsAppMessage();
    window.open(`https://api.whatsapp.com/send/?phone=355695161381&text=${message}`, "_blank");
  };
  return /* @__PURE__ */ jsxs("div", { className: `bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-xl ${className}`, children: [
    /* @__PURE__ */ jsxs("div", { className: "px-8 py-6 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-blue-100/50", children: [
      /* @__PURE__ */ jsxs("h3", { className: "text-xl font-semibold text-[#2D3748]", children: [
        "Pyetjet me te shpeshta per fluturimin ",
        title
      ] }),
      /* @__PURE__ */ jsx("p", { className: "text-[#4A5568] mt-2", children: "Gjeni pergjigjet per pyetjet tuaja me te shpeshta" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "divide-y divide-gray-100", children: questions.map((faq, index) => /* @__PURE__ */ jsxs("div", { className: "group", children: [
      /* @__PURE__ */ jsxs(
        "button",
        {
          onClick: () => toggleQuestion(index),
          className: "w-full px-8 py-5 flex items-center justify-between hover:bg-gray-50 transition-colors",
          children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center pr-4", children: [
              /* @__PURE__ */ jsx("div", { className: "p-2 bg-blue-50 rounded-lg mr-4 group-hover:bg-blue-100 transition-colors", children: /* @__PURE__ */ jsx(HelpCircle, { className: "w-5 h-5 text-[#3182CE]" }) }),
              /* @__PURE__ */ jsx("span", { className: "text-left font-medium text-[#2D3748] group-hover:text-[#1A365D]", children: faq.question })
            ] }),
            /* @__PURE__ */ jsx(
              ChevronDown,
              {
                className: `w-5 h-5 text-[#4A5568] transform transition-transform duration-300 ${expandedIndex === index ? "rotate-180" : ""}`
              }
            )
          ]
        }
      ),
      /* @__PURE__ */ jsx(
        "div",
        {
          className: `
                overflow-hidden transition-all duration-300 ease-in-out
                ${expandedIndex === index ? "max-h-96" : "max-h-0"}
              `,
          children: /* @__PURE__ */ jsx("div", { className: "px-8 py-6 bg-gray-50", children: /* @__PURE__ */ jsx("div", { className: "pl-11 text-[#4A5568] leading-relaxed", children: faq.answer }) })
        }
      )
    ] }, index)) }),
    /* @__PURE__ */ jsx("div", { className: "px-8 py-6 bg-gradient-to-r from-blue-50 to-blue-100/50 mt-4", children: /* @__PURE__ */ jsxs("p", { className: "text-[#2D3748]", children: [
      "Nuk gjeni pergjigjen qe kerkoni?",
      " ",
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: handleContact,
          className: "font-medium text-[#3182CE] hover:text-[#2C5282] underline decoration-2 decoration-blue-200 hover:decoration-blue-400 transition-all",
          children: "Na kontaktoni"
        }
      )
    ] }) })
  ] });
}
function StateFAQComponent({
  fromLocation,
  toLocation,
  title,
  className = ""
}) {
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [routeStats, setRouteStats] = useState(null);
  useEffect(() => {
    fetchRouteStats();
  }, [fromLocation, toLocation]);
  const fetchRouteStats = async () => {
    try {
      const [fromCities, toCities] = await Promise.all([
        getReadyCities(fromLocation.state),
        getReadyCities(toLocation.state)
      ]);
      const [fromAirports, toAirports] = await Promise.all([
        getStateAirports(fromLocation.state, fromCities),
        getStateAirports(toLocation.state, toCities)
      ]);
      const stats = await getRouteStatistics(fromAirports, toAirports);
      setRouteStats(stats);
    } catch (err) {
      console.error("Error fetching route stats:", err);
    }
  };
  const getReadyCities = async (state) => {
    const { data } = await supabase$1.from("seo_location_formats").select("city").eq("state", state).eq("type", "city").eq("status", "ready");
    return (data || []).map((d) => d.city).filter(Boolean);
  };
  const getStateAirports = async (state, cities) => {
    const { data } = await supabase$1.from("airports").select("iata_code, city").eq("state", state).in("city", cities);
    return data || [];
  };
  const getRouteStatistics = async (fromAirports, toAirports) => {
    let minPrice = Infinity;
    let maxPrice = 0;
    let totalDuration = 0;
    let routeCount = 0;
    const airlines = /* @__PURE__ */ new Set();
    let hasDirectFlights = false;
    const popularFromCities = /* @__PURE__ */ new Map();
    const popularToCities = /* @__PURE__ */ new Map();
    for (const fromAirport of fromAirports) {
      for (const toAirport of toAirports) {
        const { data: flights } = await supabase$1.from("processed_flight_prices").select("total_price, duration, airline, is_direct").eq("origin", fromAirport.iata_code).eq("destination", toAirport.iata_code);
        if (flights == null ? void 0 : flights.length) {
          flights.forEach((flight) => {
            minPrice = Math.min(minPrice, flight.total_price);
            maxPrice = Math.max(maxPrice, flight.total_price);
            if (flight.duration) {
              totalDuration += flight.duration;
              routeCount++;
            }
            if (flight.airline) airlines.add(flight.airline);
            if (flight.is_direct) hasDirectFlights = true;
            popularFromCities.set(fromAirport.city, (popularFromCities.get(fromAirport.city) || 0) + 1);
            popularToCities.set(toAirport.city, (popularToCities.get(toAirport.city) || 0) + 1);
          });
        }
      }
    }
    const getTopCities = (cityMap) => Array.from(cityMap.entries()).sort((a, b) => b[1] - a[1]).slice(0, 3).map(([city]) => city);
    return {
      minPrice: minPrice === Infinity ? 0 : minPrice,
      maxPrice: maxPrice === 0 ? 0 : maxPrice,
      avgDuration: routeCount > 0 ? `${Math.round(totalDuration / routeCount / 60)}h ${Math.round(totalDuration / routeCount % 60)}m` : "2h 0m",
      airlines: Array.from(airlines),
      directFlights: hasDirectFlights,
      popularCities: {
        from: getTopCities(popularFromCities),
        to: getTopCities(popularToCities)
      }
    };
  };
  const generateFAQs = () => {
    if (!routeStats) return [];
    const faqs = [
      {
        question: `Sa kushton nje bilete avioni ${title} ?`,
        answer: routeStats.minPrice > 0 ? `Çmimet per fluturime nga ${title} fillojne nga ${routeStats.minPrice}€ dhe mund te arrijne deri ne ${routeStats.maxPrice}€, ne varesi te sezonit dhe disponueshmerise. Qytetet me te kerkuara per nisje jane ${routeStats.popularCities.from.join(", ")}, ndersa destinacionet kryesore jane ${routeStats.popularCities.to.join(", ")}.` : `Çmimet ndryshojne ne varesi te sezonit dhe disponueshmerise. Kontaktoni me stafin tone per çmimet aktuale.`
      },
      {
        question: `Cilat jane qytetet kryesore per fluturime ${title}?`,
        answer: `Nga ${fromLocation.state}, fluturimet me te shpeshta nisen nga qytetet ${routeStats.popularCities.from.join(", ")}. Ne ${toLocation.state}, destinacionet kryesore jane ${routeStats.popularCities.to.join(", ")}. Secili qytet ofron opsione te ndryshme per udhetaret.`
      },
      {
        question: `Sa zgjat fluturimi nga ${title}?`,
        answer: `Kohezgjatja mesatare e fluturimit eshte rreth ${routeStats.avgDuration}. ${routeStats.directFlights ? "Ka fluturime direkte te disponueshme ne disa rute." : "Shumica e fluturimeve kane nje ose me shume ndalesa."}`
      },
      {
        question: `Cilat kompani ajrore operojne fluturime midis ${title}?`,
        answer: routeStats.airlines.length > 0 ? `Kompanite kryesore qe operojne ne kete rruge jane ${routeStats.airlines.join(", ")}. Secila kompani ofron sherbime dhe çmime te ndryshme.` : `Disa nga kompanite kryesore ajrore operojne fluturime midis ketyre destinacioneve. Kontaktoni me stafin tone per informacion te detajuar.`
      },
      {
        question: "Kur duhet te rezervoj bileten time?",
        answer: "Rekomandohet te rezervoni bileten tuaj te pakten 2-3 muaj perpara per te gjetur çmimet me te mira. Gjate sezonit te larte (vere dhe festa), eshte mire te rezervoni edhe me heret."
      },
      {
        question: "A mund te rezervoj bileta per grup?",
        answer: "Po, ofrojme rezervime per grupe te çdo madhesie. Per grupet mbi 5 persona, mund te perfitoni nga çmimet tona speciale. Kontaktoni direkt me stafin tone per nje oferte te personalizuar."
      }
    ];
    return faqs;
  };
  const handleContact = () => {
    const message = encodeURIComponent(
      `Pershendetje! Me intereson te di per fluturime ${title}. Faleminderit!`
    );
    window.open(`https://api.whatsapp.com/send/?phone=355695161381&text=${message}`, "_blank");
  };
  return /* @__PURE__ */ jsxs("div", { className: `bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-xl ${className}`, children: [
    /* @__PURE__ */ jsxs("div", { className: "px-8 py-6 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-blue-100/50", children: [
      /* @__PURE__ */ jsxs("h3", { className: "text-xl font-semibold text-[#2D3748]", children: [
        "Pyetjet me te shpeshta per fluturimet ",
        title
      ] }),
      /* @__PURE__ */ jsx("p", { className: "text-[#4A5568] mt-2", children: "Gjeni pergjigjet per pyetjet tuaja me te shpeshta" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "divide-y divide-gray-100", children: generateFAQs().map((faq, index) => /* @__PURE__ */ jsxs("div", { className: "group", children: [
      /* @__PURE__ */ jsxs(
        "button",
        {
          onClick: () => setExpandedIndex(expandedIndex === index ? null : index),
          className: "w-full px-8 py-5 flex items-center justify-between hover:bg-gray-50 transition-colors",
          children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center pr-4", children: [
              /* @__PURE__ */ jsx("div", { className: "p-2 bg-blue-50 rounded-lg mr-4 group-hover:bg-blue-100 transition-colors", children: /* @__PURE__ */ jsx(HelpCircle, { className: "w-5 h-5 text-[#3182CE]" }) }),
              /* @__PURE__ */ jsx("span", { className: "text-left font-medium text-[#2D3748] group-hover:text-[#1A365D]", children: faq.question })
            ] }),
            /* @__PURE__ */ jsx(
              ChevronDown,
              {
                className: `w-5 h-5 text-[#4A5568] transform transition-transform duration-300 ${expandedIndex === index ? "rotate-180" : ""}`
              }
            )
          ]
        }
      ),
      /* @__PURE__ */ jsx(
        "div",
        {
          className: `
                overflow-hidden transition-all duration-300 ease-in-out
                ${expandedIndex === index ? "max-h-96" : "max-h-0"}
              `,
          children: /* @__PURE__ */ jsx("div", { className: "px-8 py-6 bg-gray-50", children: /* @__PURE__ */ jsx("div", { className: "pl-11 text-[#4A5568] leading-relaxed", children: faq.answer }) })
        }
      )
    ] }, index)) }),
    /* @__PURE__ */ jsx("div", { className: "px-8 py-6 bg-gradient-to-r from-blue-50 to-blue-100/50 mt-4", children: /* @__PURE__ */ jsxs("p", { className: "text-[#2D3748]", children: [
      "Nuk gjeni pergjigjen qe kerkoni?",
      " ",
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: handleContact,
          className: "font-medium text-[#3182CE] hover:text-[#2C5282] underline decoration-2 decoration-blue-200 hover:decoration-blue-400 transition-all",
          children: "Na kontaktoni"
        }
      )
    ] }) })
  ] });
}
async function fetchRelatedRoutes(from, to) {
  try {
    console.log("Fetching related routes for:", { from, to });
    const { data: fromLocation } = await supabase$1.from("seo_location_formats").select("id").eq("type", from.type).eq("state", from.state).eq(from.type === "city" ? "city" : "state", from.type === "city" ? from.city : from.state).single();
    if (!fromLocation) {
      console.error("Source location not found");
      return [];
    }
    const { data: routes, error } = await supabase$1.from("seo_location_connections").select(`
        id,
        template_url,
        from_location:from_location_id(
          id,
          type,
          city,
          state,
          nga_format
        ),
        to_location:to_location_id(
          id,
          type,
          city,
          state,
          per_format
        )
      `).eq("status", "active").eq("from_location_id", fromLocation.id).limit(6);
    if (error) {
      console.error("Supabase Query Error:", error);
      throw error;
    }
    console.log("Found routes:", routes);
    return routes;
  } catch (error) {
    console.error("Error fetching related routes:", error);
    return [];
  }
}
function RelatedDestinationsComponent({
  fromLocation,
  toLocation,
  title,
  className = ""
}) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [relatedRoutes, setRelatedRoutes] = useState([]);
  useEffect(() => {
    if (!fromLocation || !toLocation) {
      setError("Invalid location data");
      setLoading(false);
      return;
    }
    loadRelatedRoutes();
  }, [fromLocation, toLocation]);
  const loadRelatedRoutes = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log("Loading related routes for:", {
        from: `${fromLocation.type}: ${fromLocation.city || fromLocation.state}`,
        to: `${toLocation.type}: ${toLocation.city || toLocation.state}`
      });
      const routes = await fetchRelatedRoutes({
        type: fromLocation.type,
        city: fromLocation.city || void 0,
        state: fromLocation.state
      }, {
        type: toLocation.type,
        city: toLocation.city || void 0,
        state: toLocation.state
      });
      console.log("Found related routes:", routes);
      setRelatedRoutes(routes || []);
    } catch (err) {
      console.error("Error loading related routes:", err);
      setError(err instanceof Error ? err.message : "Failed to load related destinations");
    } finally {
      setLoading(false);
    }
  };
  const getLocationName = (location, isFrom) => {
    if (!location) return "";
    if (isFrom) {
      return location.nga_format || (location.type === "city" ? `nga ${location.city}` : `nga ${location.state}`);
    } else {
      return location.per_format || (location.type === "city" ? `per ${location.city}` : `per ${location.state}`);
    }
  };
  if (loading) {
    return /* @__PURE__ */ jsxs("div", { className: `bg-white rounded-2xl shadow-lg p-8 text-center ${className}`, children: [
      /* @__PURE__ */ jsx(Loader2, { className: "w-8 h-8 text-blue-600 animate-spin mx-auto" }),
      /* @__PURE__ */ jsx("p", { className: "mt-4 text-gray-600", children: "Duke ngarkuar destinacionet e ngjashme..." })
    ] });
  }
  if (error) {
    return /* @__PURE__ */ jsx("div", { className: `bg-white rounded-2xl shadow-lg p-8 ${className}`, children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center gap-3 text-red-600", children: [
      /* @__PURE__ */ jsx(AlertCircle, { className: "w-5 h-5" }),
      /* @__PURE__ */ jsx("p", { children: error })
    ] }) });
  }
  if (relatedRoutes.length === 0) {
    return /* @__PURE__ */ jsx("div", { className: `bg-white rounded-2xl shadow-lg p-8 text-center ${className}`, children: /* @__PURE__ */ jsx("p", { className: "text-gray-600", children: "Nuk u gjeten destinacione te ngjashme." }) });
  }
  return /* @__PURE__ */ jsxs("div", { className: `bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-xl ${className}`, children: [
    /* @__PURE__ */ jsxs("div", { className: "px-8 py-6 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-blue-100/50", children: [
      /* @__PURE__ */ jsxs("h3", { className: "text-xl font-semibold text-[#2D3748]", children: [
        "Destinacione te ngjashme me fluturimin ",
        title
      ] }),
      /* @__PURE__ */ jsx("p", { className: "text-[#4A5568] mt-2", children: "Eksploro me shume opsione fluturimi" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 p-8", children: relatedRoutes.map((route) => {
      const fromName = getLocationName(route.from_location, true);
      const toName = getLocationName(route.to_location, false);
      return /* @__PURE__ */ jsx(
        "a",
        {
          href: route.template_url,
          className: "group block bg-gray-50 rounded-xl p-6 hover:bg-blue-50 transition-all duration-300 transform hover:-translate-y-1",
          children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
            /* @__PURE__ */ jsx("div", { className: "p-3 bg-white rounded-lg shadow-sm group-hover:bg-blue-100 transition-colors", children: /* @__PURE__ */ jsx(Plane, { className: "w-6 h-6 text-[#3182CE]" }) }),
            /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-[#2D3748] font-medium", children: [
                /* @__PURE__ */ jsx("span", { className: "truncate", children: fromName }),
                /* @__PURE__ */ jsx(ArrowRight, { className: "w-4 h-4 text-[#4A5568] flex-shrink-0" }),
                /* @__PURE__ */ jsx("span", { className: "truncate", children: toName })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "text-sm text-[#3182CE] mt-2 group-hover:text-[#2C5282] flex items-center gap-1", children: [
                "Shiko çmimet",
                /* @__PURE__ */ jsx(ArrowRight, { className: "w-4 h-4 transition-transform group-hover:translate-x-1" })
              ] })
            ] })
          ] })
        },
        route.id
      );
    }) }),
    /* @__PURE__ */ jsx("div", { className: "md:hidden divide-y divide-gray-100", children: relatedRoutes.map((route) => {
      const fromName = getLocationName(route.from_location, true);
      const toName = getLocationName(route.to_location, false);
      return /* @__PURE__ */ jsxs(
        "a",
        {
          href: route.template_url,
          className: "flex items-center justify-between p-6 hover:bg-blue-50/50 transition-colors",
          children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
              /* @__PURE__ */ jsx("div", { className: "p-2 bg-blue-50 rounded-lg", children: /* @__PURE__ */ jsx(Plane, { className: "w-5 h-5 text-[#3182CE]" }) }),
              /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-[#2D3748] font-medium", children: [
                /* @__PURE__ */ jsx("span", { children: fromName }),
                /* @__PURE__ */ jsx(ArrowRight, { className: "w-4 h-4 text-[#4A5568]" }),
                /* @__PURE__ */ jsx("span", { children: toName })
              ] }) })
            ] }),
            /* @__PURE__ */ jsx(ArrowRight, { className: "w-5 h-5 text-[#3182CE]" })
          ]
        },
        route.id
      );
    }) }),
    /* @__PURE__ */ jsxs("div", { className: "px-8 py-6 bg-gradient-to-r from-blue-50 to-blue-100/50 mt-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-4", children: [
        /* @__PURE__ */ jsx(TrendingUp, { className: "w-5 h-5 text-[#3182CE]" }),
        /* @__PURE__ */ jsx("h4", { className: "font-medium text-[#2D3748]", children: "Linjat me te Kerkuara" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4", children: relatedRoutes.slice(0, 3).map((route) => {
        const fromName = getLocationName(route.from_location, true);
        const toName = getLocationName(route.to_location, false);
        return /* @__PURE__ */ jsxs(
          "a",
          {
            href: route.template_url,
            className: "flex items-center text-[#3182CE] hover:text-[#2C5282] transition-colors",
            children: [
              /* @__PURE__ */ jsx("span", { className: "w-1.5 h-1.5 bg-[#3182CE] rounded-full mr-2" }),
              /* @__PURE__ */ jsxs("span", { className: "text-sm", children: [
                fromName,
                " → ",
                toName
              ] })
            ]
          },
          route.id
        );
      }) })
    ] })
  ] });
}
function FooterComponent({
  seoText,
  links,
  fromCity,
  toCity,
  className = ""
}) {
  var _a2, _b2;
  const groupedLinks = links.reduce((acc, link) => {
    const category = link.category || "Other";
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(link);
    return acc;
  }, {});
  return /* @__PURE__ */ jsx("footer", { className: `bg-white border-t border-gray-100 ${className}`, children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 py-12", children: [
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 mb-4", children: [
          /* @__PURE__ */ jsx(Plane, { className: "w-6 h-6 text-blue-600" }),
          /* @__PURE__ */ jsxs("h3", { className: "text-lg font-bold", children: [
            /* @__PURE__ */ jsx("span", { className: "text-blue-600", children: "Hima" }),
            /* @__PURE__ */ jsx("span", { className: "text-gray-900", children: "Travel" })
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "prose prose-sm text-gray-600", children: /* @__PURE__ */ jsx("p", { children: seoText }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h4", { className: "text-gray-900 font-semibold mb-4", children: "Linjat me te kerkuara" }),
        /* @__PURE__ */ jsx("ul", { className: "space-y-2", children: (_a2 = groupedLinks["Popular"]) == null ? void 0 : _a2.map((link, index) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs(
          "a",
          {
            href: link.url,
            className: "text-gray-600 hover:text-blue-600 text-sm transition-colors flex items-center",
            children: [
              /* @__PURE__ */ jsx(ArrowRight, { className: "w-4 h-4 mr-2" }),
              link.text
            ]
          }
        ) }, index)) })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h4", { className: "text-gray-900 font-semibold mb-4", children: "Lidhje të Shpejta" }),
        /* @__PURE__ */ jsx("ul", { className: "space-y-2", children: (_b2 = groupedLinks["Quick"]) == null ? void 0 : _b2.map((link, index) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
          "a",
          {
            href: link.url,
            className: "text-gray-600 hover:text-blue-600 text-sm transition-colors",
            children: link.text
          }
        ) }, index)) })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h4", { className: "text-gray-900 font-semibold mb-4", children: "Na Kontaktoni" }),
        /* @__PURE__ */ jsxs("ul", { className: "space-y-3", children: [
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs(
            "a",
            {
              href: "tel:+355695161381",
              className: "flex items-center text-sm text-gray-600 hover:text-blue-600 transition-colors",
              children: [
                /* @__PURE__ */ jsx(Phone, { className: "w-4 h-4 mr-2 text-blue-600" }),
                "+355 69 516 1381"
              ]
            }
          ) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs(
            "a",
            {
              href: "mailto:info@flightfinder.com",
              className: "flex items-center text-sm text-gray-600 hover:text-blue-600 transition-colors",
              children: [
                /* @__PURE__ */ jsx(Mail, { className: "w-4 h-4 mr-2 text-blue-600" }),
                "kontakt@himatravel.com"
              ]
            }
          ) }),
          /* @__PURE__ */ jsxs("li", { className: "flex items-start", children: [
            /* @__PURE__ */ jsx(MapPin, { className: "w-4 h-4 mr-2 mt-1 text-blue-600 flex-shrink-0" }),
            /* @__PURE__ */ jsxs("span", { className: "text-sm text-gray-600", children: [
              "Rr.Myslym Shyri, Kryeqzimi me Muhamet Gjolleshen, Tirane",
              /* @__PURE__ */ jsx("br", {}),
              "Shqiperi"
            ] })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "border-t border-gray-100 pt-8", children: /* @__PURE__ */ jsx("div", { className: "prose prose-sm max-w-none text-gray-500", children: fromCity && toCity && /* @__PURE__ */ jsx("div", { className: "bg-gray-50 rounded-lg p-4 mb-4", children: /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3", children: [
      /* @__PURE__ */ jsx(Info, { className: "w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs("h5", { className: "text-sm font-medium text-gray-900 mb-2", children: [
          "Informacion per Fluturimin ",
          fromCity,
          " - ",
          toCity
        ] }),
        /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-600", children: [
          "Gjeni dhe rezervoni fluturime nga ",
          fromCity,
          " ne ",
          toCity,
          " me çmimet me te mira. Krahasoni ofertat nga kompanite ajrore te ndryshme dhe zgjidhni opsionin me te pershtatshem per ju."
        ] })
      ] })
    ] }) }) }) }),
    /* @__PURE__ */ jsx("div", { className: "border-t border-gray-100 mt-8 pt-8", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row justify-between items-center gap-4", children: [
      /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-500", children: [
        "© ",
        (/* @__PURE__ */ new Date()).getFullYear(),
        " HimaTravel. Te gjitha te drejtat e rezervuara."
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-6", children: [
        /* @__PURE__ */ jsx("a", { href: "/privacy", className: "text-sm text-gray-500 hover:text-gray-700", children: "Privatesia" }),
        /* @__PURE__ */ jsx("a", { href: "/terms", className: "text-sm text-gray-500 hover:text-gray-700", children: "Kushtet e Perdorimit" }),
        /* @__PURE__ */ jsx("a", { href: "/cookies", className: "text-sm text-gray-500 hover:text-gray-700", children: "Cookies" })
      ] })
    ] }) })
  ] }) });
}
function SEOPage() {
  const { params } = useParams();
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [templateData, setTemplateData] = useState(null);
  const [components, setComponents] = useState([]);
  const [locationData, setLocationData] = useState(null);
  const [flightPrices, setFlightPrices] = useState([]);
  const [priceTitle, setPriceTitle] = useState(null);
  const [seoData, setSeoData] = useState(null);
  useEffect(() => {
    fetchPageData();
  }, [params, location.pathname]);
  const fetchPageData = async () => {
    try {
      setLoading(true);
      setError(null);
      const currentPath = window.location.pathname;
      console.log("Fetching data for path:", currentPath);
      const seoData2 = await fetchSEOData(currentPath);
      if (seoData2) {
        setSeoData(seoData2);
      }
      let connection;
      const { data: initialConnection, error: connError } = await supabase$1.from("seo_location_connections").select(`
          *,
          from_location:from_location_id(
            id, type, city, state, nga_format
          ),
          to_location:to_location_id(
            id, type, city, state, per_format
          ),
          template_type:template_type_id(
            id, name, slug
          )
        `).eq("template_url", currentPath).eq("status", "active").single();
      if (connError || !initialConnection) {
        const pathWithoutSlash = currentPath.replace(/\/$/, "");
        console.log("Trying path without trailing slash:", pathWithoutSlash);
        const { data: altConnection, error: altError } = await supabase$1.from("seo_location_connections").select(`
            *,
            from_location:from_location_id(
              id, type, city, state, nga_format
            ),
            to_location:to_location_id(
              id, type, city, state, per_format
            ),
            template_type:template_type_id(
              id, name, slug
            )
          `).eq("template_url", pathWithoutSlash).eq("status", "active").single();
        if (altError || !altConnection) {
          console.error("Page data not found for:", currentPath);
          setError("Page data not found");
          setLoading(false);
          return;
        }
        console.log("Using alternative connection:", altConnection);
        connection = altConnection;
      } else {
        connection = initialConnection;
      }
      setLocationData({
        from_location: connection.from_location,
        to_location: connection.to_location
      });
      const fromIata = await getIataCode(connection.from_location.city);
      const toIata = await getIataCode(connection.to_location.city);
      console.log("Retrieved IATA codes:", fromIata, "->", toIata);
      if (fromIata && toIata) {
        console.log("Fetching prices for route:", fromIata, "->", toIata);
        const { data: prices, error: pricesError } = await supabase$1.from("processed_flight_prices").select("airline, flight_date, total_price").eq("origin", fromIata).eq("destination", toIata).order("total_price", { ascending: true }).limit(10);
        if (pricesError) {
          console.error("Error fetching prices:", pricesError);
          throw pricesError;
        }
        console.log("Retrieved prices:", (prices == null ? void 0 : prices.length) || 0, "results");
        setFlightPrices(prices || []);
      }
      const { data: template, error: templateError } = await supabase$1.from("seo_page_templates").select("*").eq("template_type_id", connection.template_type.id).single();
      if (templateError) throw templateError;
      if (!template) throw new Error("Template not found");
      const { data: templateComponents, error: componentsError } = await supabase$1.from("seo_template_components").select("*").eq("template_id", template.id).eq("status", "active").order("display_order");
      if (componentsError) throw componentsError;
      const formattedTitle = replacePlaceholders(template.seo_title, {
        from_location: connection.from_location,
        to_location: connection.to_location
      });
      setPriceTitle(replacePlaceholders("{nga_city} {per_state}", {
        from_location: connection.from_location,
        to_location: connection.to_location
      }));
      const formattedDescription = replacePlaceholders(template.meta_description, {
        from_location: connection.from_location,
        to_location: connection.to_location
      });
      setTemplateData({
        seo_title: formattedTitle,
        meta_description: formattedDescription,
        template_type: connection.template_type
      });
      setComponents(templateComponents || []);
    } catch (err) {
      console.error("Error fetching page data:", err);
      setError(err instanceof Error ? err.message : "Failed to load page");
    } finally {
      setLoading(false);
    }
  };
  const getIataCode = async (city) => {
    if (!city) return null;
    try {
      const { data, error: error2 } = await supabase$1.from("airports").select("iata_code").eq("city", city);
      if (error2) throw error2;
      if (!(data == null ? void 0 : data.length)) return null;
      return data[0].iata_code || null;
    } catch (err) {
      console.error(`Error getting IATA code for ${city}:`, err);
      return null;
    }
  };
  const replacePlaceholders = (text, locationData2) => {
    if (!text) return "";
    let result = text;
    result = result.replace(
      /{nga_city}/g,
      locationData2.from_location.nga_format || `Nga ${locationData2.from_location.city}`
    );
    result = result.replace(
      /{per_city}/g,
      locationData2.to_location.per_format || `Për ${locationData2.to_location.city}`
    );
    result = result.replace(
      /{nga_state}/g,
      locationData2.from_location.nga_format || `Nga ${locationData2.from_location.state}`
    );
    result = result.replace(
      /{per_state}/g,
      locationData2.to_location.per_format || `Për ${locationData2.to_location.state}`
    );
    return result;
  };
  const renderComponent = (component) => {
    if (!locationData) return null;
    const fromCity = locationData.from_location.city || locationData.from_location.state;
    const toCity = locationData.to_location.city || locationData.to_location.state;
    switch (component.component_name) {
      case "SEOHead":
        return /* @__PURE__ */ jsx(
          SEOHead,
          {
            title: (seoData == null ? void 0 : seoData.title) || (templateData == null ? void 0 : templateData.seo_title) || "",
            description: (seoData == null ? void 0 : seoData.description) || (templateData == null ? void 0 : templateData.meta_description) || "",
            canonicalUrl: window.location.pathname,
            schema: seoData == null ? void 0 : seoData.schema,
            keywords: seoData == null ? void 0 : seoData.keywords,
            language: (seoData == null ? void 0 : seoData.language) || "sq",
            fromCity: locationData.from_location.city,
            toCity: locationData.to_location.city,
            fromState: locationData.from_location.state,
            toState: locationData.to_location.state,
            imageUrl: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&q=80",
            type: "article"
          }
        );
      case "HeaderComponent":
        return /* @__PURE__ */ jsx(
          HeaderComponent,
          {
            title: (templateData == null ? void 0 : templateData.seo_title) || "",
            subtitle: (templateData == null ? void 0 : templateData.meta_description) || "",
            className: "mb-8"
          }
        );
      case "FlightSearchComponent":
        return /* @__PURE__ */ jsx(
          FlightSearchComponent,
          {
            fromCity,
            toCity,
            className: "mb-8"
          }
        );
      case "PricingTableComponent":
        return /* @__PURE__ */ jsx(
          PricingTableComponent,
          {
            fromCity,
            toCity,
            prices: flightPrices.map((price) => ({
              airline: price.airline,
              date: price.flight_date,
              price: price.total_price
            })),
            title: priceTitle,
            className: "mb-8"
          }
        );
      case "StateCityPricingComponent":
        return /* @__PURE__ */ jsx(
          StateCityPricingComponent,
          {
            fromLocation: locationData.from_location,
            toLocation: locationData.to_location,
            title: priceTitle,
            className: "mb-8"
          }
        );
      case "StatePricingComponent":
        return /* @__PURE__ */ jsx(
          StatePricingComponent,
          {
            fromLocation: locationData.from_location,
            toLocation: locationData.to_location,
            title: priceTitle,
            className: "mb-8"
          }
        );
      case "RouteInfoComponent":
        return /* @__PURE__ */ jsx(
          RouteInfoComponent,
          {
            fromCity,
            toCity,
            airlines: Array.from(new Set(flightPrices.map((p) => p.airline))),
            duration: "1h 40m",
            title: priceTitle,
            isDirect: true,
            className: "mb-8"
          }
        );
      case "StateRouteInfoComponent":
        return /* @__PURE__ */ jsx(
          StateRouteInfoComponent,
          {
            fromLocation: locationData.from_location,
            toLocation: locationData.to_location,
            title: priceTitle,
            className: "mb-8"
          }
        );
      case "FAQComponent":
        const minPrice = Math.min(...flightPrices.map((p) => p.total_price));
        const maxPrice = Math.max(...flightPrices.map((p) => p.total_price));
        return /* @__PURE__ */ jsx(
          FAQComponent,
          {
            fromCity,
            toCity,
            questions: [
              {
                question: `Sa kushton një biletë ${priceTitle}?`,
                answer: `Çmimet për fluturime ${priceTitle} fillojnë nga ${minPrice}€ dhe mund të arrijnë deri në ${maxPrice}€, në varësi të sezonit dhe disponueshmërisë.`
              },
              {
                question: `si mund te rezervojme bileta ${priceTitle}?`,
                answer: `Biletat ${priceTitle} mund ti rezervoni duke kontaktuar me stafin tone.`
              },
              {
                question: `Cilat kompani ajrore operojnë në këtë rrugë?`,
                answer: `Kompanitë kryesore që operojnë fluturime ${priceTitle} janë ${Array.from(new Set(flightPrices.map((p) => p.airline))).join(", ")}.`
              },
              {
                question: `A ka fluturime direkte ${priceTitle}?`,
                answer: `Kontaktoni me stafin tone tone per tu informuar rreth fluturimeve per bileta avioni ${priceTitle}.`
              },
              {
                question: `Kur duhet të rezervoj biletën time?`,
                answer: `Rekomandohet të rezervoni biletën tuaj të paktën 2-3 muaj përpara për të gjetur çmimet më të mira. Gjatë sezonit të lartë (verë dhe festa), është mirë të rezervoni edhe më herët.`
              }
            ],
            title: priceTitle,
            className: "mb-8"
          }
        );
      case "StateFAQComponent":
        return /* @__PURE__ */ jsx(
          StateFAQComponent,
          {
            fromLocation: locationData.from_location,
            toLocation: locationData.to_location,
            title: priceTitle,
            className: "mb-8"
          }
        );
      case "RelatedDestinationsComponent":
        return /* @__PURE__ */ jsx(
          RelatedDestinationsComponent,
          {
            fromLocation: locationData.from_location,
            toLocation: locationData.to_location,
            title: priceTitle,
            className: "mb-8"
          }
        );
      case "FooterComponent":
        return /* @__PURE__ */ jsx(
          FooterComponent,
          {
            fromCity,
            toCity,
            seoText: `Rezervoni biletat tuaja për fluturime të lira nga ${fromCity} në ${toCity}. Ne ofrojmë çmimet më të mira dhe shërbimin më të mirë për udhëtarët tanë.`,
            links: [
              {
                text: "Tirana - London",
                url: "/bileta-avioni-tirana-ne-london",
                category: "Popular"
              },
              {
                text: "Tirana - Paris",
                url: "/bileta-avioni-tirana-ne-paris",
                category: "Popular"
              },
              { text: "FAQ", url: "/pyetjet-e-bera-shpesh", category: "Quick" }
            ],
            className: "mt-12"
          }
        );
      default:
        return null;
    }
  };
  if (loading) {
    return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-[#F7FAFC]", children: [
      /* @__PURE__ */ jsx(Navbar, {}),
      /* @__PURE__ */ jsx("div", { className: "container mx-auto px-4 py-8", children: /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center min-h-[400px]", children: /* @__PURE__ */ jsx(Loader2, { className: "w-8 h-8 text-blue-600 animate-spin" }) }) }),
      /* @__PURE__ */ jsx(GlobalFooter, {})
    ] });
  }
  if (error || !templateData || !locationData) {
    return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-[#F7FAFC]", children: [
      /* @__PURE__ */ jsx(Navbar, {}),
      /* @__PURE__ */ jsx("div", { className: "container mx-auto px-4 py-8", children: /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-xl shadow-sm p-8", children: [
        /* @__PURE__ */ jsx("h1", { className: "text-3xl font-semibold text-[#2D3748] mb-4", children: "Page Not Found" }),
        /* @__PURE__ */ jsx("p", { className: "text-[#4A5568]", children: error || "The requested page could not be found." })
      ] }) }),
      /* @__PURE__ */ jsx(GlobalFooter, {})
    ] });
  }
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: templateData.seo_title,
    description: templateData.meta_description,
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "EUR",
      lowPrice: Math.min(...flightPrices.map((p) => p.total_price) || [50]),
      highPrice: Math.max(...flightPrices.map((p) => p.total_price) || [500]),
      offerCount: flightPrices.length || 10,
      offers: flightPrices.slice(0, 3).map((price) => ({
        "@type": "Offer",
        price: price.total_price,
        priceCurrency: "EUR",
        availability: "https://schema.org/InStock",
        url: window.location.href,
        validFrom: (/* @__PURE__ */ new Date()).toISOString(),
        priceValidUntil: new Date((/* @__PURE__ */ new Date()).setDate((/* @__PURE__ */ new Date()).getDate() + 7)).toISOString()
      }))
    },
    areaServed: {
      "@type": "City",
      name: locationData.to_location.city || locationData.to_location.state
    },
    provider: {
      "@type": "Organization",
      name: "Hima Travel",
      url: "https://biletaavioni.himatravel.com"
    }
  };
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `Sa kushton një biletë avioni ${priceTitle}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Çmimet për bileta avioni ${priceTitle} fillojnë nga ${Math.min(...flightPrices.map((p) => p.total_price) || [50])}€ dhe mund të ndryshojnë në varësi të sezonit dhe disponueshmërisë.`
        }
      },
      {
        "@type": "Question",
        name: "Kur është koha më e mirë për të rezervuar bileta avioni?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Koha më e mirë për të rezervuar bileta avioni zakonisht është 2-3 muaj përpara udhëtimit. Për sezonin e lartë (verë, festat e fundvitit), rekomandohet rezervimi 4-6 muaj përpara."
        }
      },
      {
        "@type": "Question",
        name: "A ofron Hima Travel garanci çmimi për bileta avioni?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Po, Hima Travel ofron garanci çmimi për bileta avioni. Nëse gjeni të njëjtin fluturim me çmim më të ulët brenda 24 orëve pas rezervimit, ne do të rimbursojmë diferencën."
        }
      }
    ]
  };
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Hima Travel",
        item: "https://biletaavioni.himatravel.com"
      },
      {
        "@type": "ListItem",
        position: 2,
        name: locationData.from_location.type === "city" ? "Bileta Avioni" : "Fluturime",
        item: locationData.from_location.type === "city" ? "https://biletaavioni.himatravel.com/bileta-avioni" : "https://biletaavioni.himatravel.com/fluturime"
      },
      {
        "@type": "ListItem",
        position: 3,
        name: templateData.seo_title,
        item: window.location.href
      }
    ]
  };
  const keywords = [
    "bileta avioni",
    "fluturime",
    "cmime te lira",
    "rezervo online",
    locationData.from_location.city || locationData.from_location.state,
    locationData.to_location.city || locationData.to_location.state,
    `bileta ${locationData.from_location.city || locationData.from_location.state}`,
    `fluturime ${locationData.from_location.city || locationData.from_location.state}`,
    `bileta avioni ${locationData.from_location.city || locationData.from_location.state}`,
    `bileta avioni ${locationData.to_location.city || locationData.to_location.state}`,
    `${locationData.from_location.city || locationData.from_location.state} ${locationData.to_location.city || locationData.to_location.state}`,
    "oferta udhetimi",
    "bileta te lira"
  ].filter(Boolean);
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-[#F7FAFC] font-['Inter']", children: [
    /* @__PURE__ */ jsxs(Helmet, { children: [
      /* @__PURE__ */ jsx("title", { children: templateData.seo_title }),
      /* @__PURE__ */ jsx("meta", { name: "description", content: templateData.meta_description }),
      /* @__PURE__ */ jsx("meta", { name: "keywords", content: keywords.join(", ") }),
      /* @__PURE__ */ jsx("link", { rel: "canonical", href: window.location.href }),
      /* @__PURE__ */ jsx("meta", { property: "og:type", content: "website" }),
      /* @__PURE__ */ jsx("meta", { property: "og:url", content: window.location.href }),
      /* @__PURE__ */ jsx("meta", { property: "og:title", content: templateData.seo_title }),
      /* @__PURE__ */ jsx("meta", { property: "og:description", content: templateData.meta_description }),
      /* @__PURE__ */ jsx("meta", { property: "og:image", content: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&q=80" }),
      /* @__PURE__ */ jsx("meta", { property: "og:locale", content: "sq_AL" }),
      /* @__PURE__ */ jsx("meta", { property: "og:site_name", content: "Hima Travel - Bileta Avioni" }),
      /* @__PURE__ */ jsx("meta", { name: "twitter:card", content: "summary_large_image" }),
      /* @__PURE__ */ jsx("meta", { name: "twitter:title", content: templateData.seo_title }),
      /* @__PURE__ */ jsx("meta", { name: "twitter:description", content: templateData.meta_description }),
      /* @__PURE__ */ jsx("meta", { name: "twitter:image", content: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&q=80" }),
      /* @__PURE__ */ jsx("meta", { name: "geo.region", content: "AL" }),
      /* @__PURE__ */ jsx("meta", { name: "geo.placename", content: locationData.from_location.city || locationData.from_location.state }),
      /* @__PURE__ */ jsx("meta", { name: "author", content: "Hima Travel" }),
      /* @__PURE__ */ jsx("meta", { name: "robots", content: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" }),
      /* @__PURE__ */ jsx("meta", { name: "revisit-after", content: "7 days" }),
      /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify(structuredData) }),
      /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify(faqSchema) }),
      /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify(breadcrumbSchema) })
    ] }),
    /* @__PURE__ */ jsx(Navbar, {}),
    /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8", children: components.sort((a, b) => a.display_order - b.display_order).map((component) => /* @__PURE__ */ jsx(React.Fragment, { children: renderComponent(component) }, component.component_name)) }),
    /* @__PURE__ */ jsx(GlobalFooter, {})
  ] });
}
function SEOPreview() {
  const [previewData] = useState({
    city: "Tirana",
    state: "Albania",
    nga_city: "Nga Tirana",
    per_city: "Për Romë",
    nga_state: "Nga Shqipëria",
    per_state: "Për Itali"
  });
  const samplePrices = [
    {
      airline: "Wizz Air",
      date: "2025-07-15",
      price: 79
    },
    {
      airline: "Ryanair",
      date: "2025-07-18",
      price: 85
    },
    {
      airline: "Air Albania",
      date: "2025-07-20",
      price: 95
    }
  ];
  const sampleRouteInfo = {
    airlines: ["Wizz Air", "Ryanair", "Air Albania"],
    duration: "1h 40m",
    isDirect: true
  };
  const sampleFAQs = [
    {
      question: "Sa kushton një biletë nga Tirana në Romë?",
      answer: "Çmimet për fluturime nga Tirana në Romë fillojnë nga 79€ dhe mund të arrijnë deri në 150€, në varësi të sezonit dhe disponueshmërisë. Rekomandohet rezervimi i hershëm për të siguruar çmimet më të mira."
    },
    {
      question: "Sa zgjat fluturimi nga Tirana në Romë?",
      answer: "Fluturimi direkt nga Tirana në Romë zgjat rreth 1 orë e 40 minuta. Kohëzgjatja mund të ndryshojë nëse zgjidhni një fluturim me ndalesa."
    },
    {
      question: "Cilat kompani ajrore operojnë në këtë rrugë?",
      answer: "Kompanitë kryesore që operojnë fluturime nga Tirana në Romë janë Wizz Air, Ryanair dhe Air Albania. Secila kompani ofron shërbime dhe çmime të ndryshme."
    },
    {
      question: "A ka fluturime direkte nga Tirana në Romë?",
      answer: "Po, ka fluturime direkte nga Tirana në Romë. Këto fluturime operohen rregullisht nga disa kompani ajrore dhe janë zgjedhja më e përshtatshme për udhëtarët."
    },
    {
      question: "Kur duhet të rezervoj biletën time?",
      answer: "Rekomandohet të rezervoni biletën tuaj të paktën 2-3 muaj përpara për të gjetur çmimet më të mira. Gjatë sezonit të lartë (verë dhe festa), është mirë të rezervoni edhe më herët."
    }
  ];
  const sampleDestinations = [
    {
      city1: "Tirana",
      city2: "Milan",
      link: "/bileta-avioni-tirana-ne-milan"
    },
    {
      city1: "Tirana",
      city2: "Paris",
      link: "/bileta-avioni-tirana-ne-paris"
    },
    {
      city1: "Rome",
      city2: "Barcelona",
      link: "/bileta-avioni-rome-ne-barcelona"
    },
    {
      city1: "Tirana",
      city2: "London",
      link: "/bileta-avioni-tirana-ne-london"
    },
    {
      city1: "Rome",
      city2: "Vienna",
      link: "/bileta-avioni-rome-ne-vienna"
    },
    {
      city1: "Tirana",
      city2: "Istanbul",
      link: "/bileta-avioni-tirana-ne-istanbul"
    }
  ];
  const sampleFooterLinks = [
    {
      text: "Tirana - London",
      url: "/bileta-avioni-tirana-ne-london",
      category: "Popular"
    },
    {
      text: "Tirana - Paris",
      url: "/bileta-avioni-tirana-ne-paris",
      category: "Popular"
    },
    {
      text: "Tirana - Istanbul",
      url: "/bileta-avioni-tirana-ne-istanbul",
      category: "Popular"
    },
    {
      text: "Linjat Ajrore",
      url: "/linjat-ajrore",
      category: "Quick"
    },
    {
      text: "FAQ",
      url: "/pyetjet-e-bera-shpesh",
      category: "Quick"
    },
    {
      text: "Kontakti",
      url: "/kontakt",
      category: "Quick"
    }
  ];
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-gray-50", children: [
    /* @__PURE__ */ jsxs("div", { className: "bg-white border-b border-gray-200 px-4 py-5 sm:px-6", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-lg font-medium leading-6 text-gray-900", children: "SEO Components Preview" }),
      /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-gray-500", children: "Preview and test SEO components with dynamic placeholders" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto py-6 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg shadow mb-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "px-4 py-5 border-b border-gray-200 sm:px-6", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-lg font-medium text-gray-900", children: "Flight Search Component" }),
          /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-gray-500", children: "Tests the flight search form with dynamic city placeholders" })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "p-4 sm:p-6", children: /* @__PURE__ */ jsx(
          FlightSearchComponent,
          {
            fromCity: previewData.nga_city,
            toCity: previewData.per_city
          }
        ) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg shadow mb-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "px-4 py-5 border-b border-gray-200 sm:px-6", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-lg font-medium text-gray-900", children: "Route Information Component" }),
          /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-gray-500", children: "Tests the route information display with sample data" })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "p-4 sm:p-6", children: /* @__PURE__ */ jsx(
          RouteInfoComponent,
          {
            fromCity: previewData.nga_city,
            toCity: previewData.per_city,
            airlines: sampleRouteInfo.airlines,
            duration: sampleRouteInfo.duration,
            isDirect: sampleRouteInfo.isDirect
          }
        ) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg shadow mb-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "px-4 py-5 border-b border-gray-200 sm:px-6", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-lg font-medium text-gray-900", children: "FAQ Component" }),
          /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-gray-500", children: "Tests the FAQ accordion with sample questions" })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "p-4 sm:p-6", children: /* @__PURE__ */ jsx(
          FAQComponent,
          {
            fromCity: previewData.nga_city,
            toCity: previewData.per_city,
            questions: sampleFAQs
          }
        ) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg shadow mb-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "px-4 py-5 border-b border-gray-200 sm:px-6", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-lg font-medium text-gray-900", children: "Related Destinations Component" }),
          /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-gray-500", children: "Tests the related destinations display with sample routes" })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "p-4 sm:p-6", children: /* @__PURE__ */ jsx(
          RelatedDestinationsComponent,
          {
            fromCity: previewData.nga_city,
            toCity: previewData.per_city,
            destinations: sampleDestinations
          }
        ) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg shadow mb-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "px-4 py-5 border-b border-gray-200 sm:px-6", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-lg font-medium text-gray-900", children: "Pricing Table Component" }),
          /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-gray-500", children: "Tests the pricing table with sample flight data" })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "p-4 sm:p-6", children: /* @__PURE__ */ jsx(
          PricingTableComponent,
          {
            fromCity: previewData.nga_city,
            toCity: previewData.per_city,
            prices: samplePrices
          }
        ) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg shadow mb-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "px-4 py-5 border-b border-gray-200 sm:px-6", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-lg font-medium text-gray-900", children: "Header Component" }),
          /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-gray-500", children: "Tests different title and subtitle combinations with placeholders" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "px-4 py-5 sm:p-6", children: [
          /* @__PURE__ */ jsxs("div", { className: "mb-12 border-b border-gray-100 pb-12", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-sm font-medium text-gray-500 mb-4", children: "City to City Example" }),
            /* @__PURE__ */ jsx(
              HeaderComponent,
              {
                title: `Bileta Avioni ${previewData.nga_city} në ${previewData.per_city}`,
                subtitle: "Rezervoni fluturimet tuaja me çmimet më të mira të garantuara!"
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mb-12 border-b border-gray-100 pb-12", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-sm font-medium text-gray-500 mb-4", children: "State to State Example" }),
            /* @__PURE__ */ jsx(
              HeaderComponent,
              {
                title: `Fluturime ${previewData.nga_state} në ${previewData.per_state}`,
                subtitle: "Gjeni dhe krahasoni çmimet më të mira për udhëtimin tuaj!"
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h3", { className: "text-sm font-medium text-gray-500 mb-4", children: "City to State Example" }),
            /* @__PURE__ */ jsx(
              HeaderComponent,
              {
                title: `Bileta Avioni ${previewData.nga_city} në ${previewData.per_state}`,
                subtitle: "Rezervoni online me çmimet më të ulëta të garantuara!"
              }
            )
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg shadow mb-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "px-4 py-5 border-b border-gray-200 sm:px-6", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-lg font-medium text-gray-900", children: "Footer Component" }),
          /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-gray-500", children: "Tests the SEO footer with dynamic links and content" })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "p-4 sm:p-6", children: /* @__PURE__ */ jsx(
          FooterComponent,
          {
            fromCity: previewData.nga_city,
            toCity: previewData.per_city,
            seoText: `Rezervoni biletat tuaja për fluturime të lira nga ${previewData.nga_city} në ${previewData.per_city}. Ne ofrojmë çmimet më të mira dhe shërbimin më të mirë për udhëtarët tanë.`,
            links: sampleFooterLinks
          }
        ) })
      ] })
    ] })
  ] });
}
function ContactPage() {
  const contactSchema = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    name: "Hima Travel - Bileta Avioni",
    description: "Kontaktoni Hima Travel për bileta avioni me çmimet më të mira. Rezervoni fluturime direkte dhe me ndalesë për destinacionet tuaja të preferuara.",
    url: "https://biletaavioni.himatravel.com/contact",
    logo: "https://himatravel.com/wp-content/uploads/2020/11/logo-768x277.png",
    telephone: "+355 694 767 427",
    email: "kontakt@himatravel.com",
    openingHours: "Mo-Sa 09:00-19:00",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Rr.Myslym Shyri, Kryeqzimi me Muhamet Gjolleshen",
      addressLocality: "Tiranë",
      addressRegion: "Tiranë",
      postalCode: "1001",
      addressCountry: "AL"
    },
    hasMap: "https://www.google.com/maps/place/Hima+Travel+Agjensi+Udhetimi+%26+Turistike+-+Bileta+Avioni+Tirane",
    sameAs: [
      "https://facebook.com/himatravel",
      "https://instagram.com/himatravel"
    ],
    areaServed: {
      "@type": "Country",
      name: "Albania"
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+355 694 767 427",
      contactType: "customer service",
      areaServed: "AL",
      availableLanguage: ["Albanian", "English", "Italian"]
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-gray-50", children: [
    /* @__PURE__ */ jsx(
      SEOHead,
      {
        title: "Na Kontaktoni | Bileta Avioni | Rezervime Online | Hima Travel",
        description: "Kontaktoni Hima Travel për bileta avioni me çmimet më të mira. Rezervoni fluturime direkte dhe me ndalesë për destinacionet tuaja të preferuara. Agjenci udhëtimi në Tiranë dhe Durrës.",
        canonicalUrl: "/contact",
        schema: contactSchema,
        keywords: [
          "bileta avioni",
          "kontakt bileta avioni",
          "rezervime bileta avioni",
          "agjenci udhetimi",
          "bileta avioni online",
          "cmime te lira",
          "fluturime",
          "rezervo bileta",
          "kontakt hima travel",
          "bileta avioni tirane",
          "bileta avioni durres",
          "fluturime direkte",
          "oferta udhetimi"
        ],
        language: "sq"
      }
    ),
    /* @__PURE__ */ jsx(Navbar, {}),
    /* @__PURE__ */ jsx("main", { className: "container mx-auto px-4 py-12", children: /* @__PURE__ */ jsxs("div", { className: "max-w-5xl mx-auto", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center mb-12", children: [
        /* @__PURE__ */ jsx("h1", { className: "text-3xl md:text-4xl font-bold text-gray-900 mb-4", children: "Na Kontaktoni për Bileta Avioni" }),
        /* @__PURE__ */ jsx("p", { className: "text-lg text-gray-600", children: "Jemi këtu për t'ju ndihmuar me çdo pyetje ose rezervim për bileta avioni" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-8 mb-12", children: [
        /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold text-gray-900 mb-4", children: "Zyra në Tiranë - Bileta Avioni" }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-4 mb-6", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3", children: [
              /* @__PURE__ */ jsx(MapPin, { className: "w-5 h-5 text-blue-600 flex-shrink-0 mt-1" }),
              /* @__PURE__ */ jsx("p", { className: "text-gray-600", children: "Tiranë, Tek kryqëzimi i Rrugës Muhamet Gjollesha me Myslym Shyrin" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsx(Phone, { className: "w-5 h-5 text-blue-600" }),
              /* @__PURE__ */ jsx("a", { href: "tel:+355694767427", className: "text-blue-600 hover:text-blue-800 transition-colors", children: "+355 694 767 427" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsx(Clock, { className: "w-5 h-5 text-blue-600" }),
              /* @__PURE__ */ jsx("span", { className: "text-gray-600", children: "E Hënë - E Shtunë: 09:00 - 19:00" })
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "w-full h-[300px] rounded-lg overflow-hidden", children: /* @__PURE__ */ jsx(
            "iframe",
            {
              src: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4053.628431047907!2d19.80204687678945!3d41.32344189995802!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x135031aa439cd9f9%3A0x3adc4758df5bcb79!2sHima%20Travel%20Agjensi%20Udhetimi%20%26%20Turistike%20-%20Bileta%20Avioni%20Tirane!5e1!3m2!1sen!2s!4v1741726786173!5m2!1sen!2s",
              width: "100%",
              height: "100%",
              style: { border: 0 },
              allowFullScreen: true,
              loading: "lazy",
              referrerPolicy: "no-referrer-when-downgrade",
              title: "Hima Travel Tiranë - Bileta Avioni"
            }
          ) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold text-gray-900 mb-4", children: "Zyra në Durrës - Bileta Avioni" }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-4 mb-6", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3", children: [
              /* @__PURE__ */ jsx(MapPin, { className: "w-5 h-5 text-blue-600 flex-shrink-0 mt-1" }),
              /* @__PURE__ */ jsx("p", { className: "text-gray-600", children: "Rruga Aleksander Goga, Përballë Shkollës Eftali Koci" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsx(Phone, { className: "w-5 h-5 text-blue-600" }),
              /* @__PURE__ */ jsx("a", { href: "tel:+355699868907", className: "text-blue-600 hover:text-blue-800 transition-colors", children: "+355 699 868 907" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsx(Clock, { className: "w-5 h-5 text-blue-600" }),
              /* @__PURE__ */ jsx("span", { className: "text-gray-600", children: "E Hënë - E Shtunë: 09:00 - 19:00" })
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "w-full h-[300px] rounded-lg overflow-hidden", children: /* @__PURE__ */ jsx(
            "iframe",
            {
              src: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d348.09744179985995!2d19.445203970239138!3d41.3227227708329!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x134fdb581e5f506d%3A0x4d645fcf267865b9!2sBileta%20Avioni%20-%20Agjenci%20Udh%C3%ABtimi%20Hima%20Travel!5e1!3m2!1sen!2s!4v1741726913501!5m2!1sen!2s",
              width: "100%",
              height: "100%",
              style: { border: 0 },
              allowFullScreen: true,
              loading: "lazy",
              referrerPolicy: "no-referrer-when-downgrade",
              title: "Hima Travel Durrës - Bileta Avioni"
            }
          ) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-xl shadow-sm p-8 text-center", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-2xl font-semibold text-gray-900 mb-6", children: "Kontaktoni me Ne për Bileta Avioni" }),
        /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-8", children: [
          /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsx("div", { className: "inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-2", children: /* @__PURE__ */ jsx(Mail, { className: "w-6 h-6 text-blue-600" }) }),
            /* @__PURE__ */ jsx("h3", { className: "text-lg font-medium text-gray-900", children: "Email për Bileta Avioni" }),
            /* @__PURE__ */ jsx(
              "a",
              {
                href: "mailto:kontakt@himatravel.com",
                className: "text-blue-600 hover:text-blue-800 transition-colors",
                children: "kontakt@himatravel.com"
              }
            ),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600", children: "Dërgoni kërkesën tuaj për bileta avioni dhe do t'ju përgjigjemi brenda 24 orëve" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsx("div", { className: "inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-2", children: /* @__PURE__ */ jsx(Phone, { className: "w-6 h-6 text-blue-600" }) }),
            /* @__PURE__ */ jsx("h3", { className: "text-lg font-medium text-gray-900", children: "Telefon për Bileta Avioni" }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsx(
                "a",
                {
                  href: "tel:+355694767427",
                  className: "block text-blue-600 hover:text-blue-800 transition-colors",
                  children: "+355 694 767 427 (Tiranë)"
                }
              ),
              /* @__PURE__ */ jsx(
                "a",
                {
                  href: "tel:+355699868907",
                  className: "block text-blue-600 hover:text-blue-800 transition-colors",
                  children: "+355 699 868 907 (Durrës)"
                }
              )
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600", children: "Telefononi për rezervime të menjëhershme të biletave të avionit" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mt-12 text-left", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-xl font-semibold text-gray-900 mb-6 text-center", children: "Pyetje të Shpeshta për Bileta Avioni" }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "bg-gray-50 rounded-lg p-4", children: [
              /* @__PURE__ */ jsx("h4", { className: "font-medium text-gray-900 mb-2", children: "Si mund të rezervoj një biletë avioni?" }),
              /* @__PURE__ */ jsx("p", { className: "text-gray-600", children: "Mund të rezervoni bileta avioni duke na kontaktuar në telefon, email, ose duke vizituar zyrat tona në Tiranë dhe Durrës. Gjithashtu mund të përdorni platformën tonë online për të kërkuar dhe rezervuar bileta." })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "bg-gray-50 rounded-lg p-4", children: [
              /* @__PURE__ */ jsx("h4", { className: "font-medium text-gray-900 mb-2", children: "Sa kohë përpara duhet të rezervoj biletën e avionit?" }),
              /* @__PURE__ */ jsx("p", { className: "text-gray-600", children: "Rekomandojmë të rezervoni bileta avioni 2-3 muaj përpara udhëtimit për çmimet më të mira. Për sezonin e lartë (verë, festat e fundvitit), është mirë të rezervoni 4-6 muaj përpara." })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "bg-gray-50 rounded-lg p-4", children: [
              /* @__PURE__ */ jsx("h4", { className: "font-medium text-gray-900 mb-2", children: "A ofron Hima Travel garanci çmimi për bileta avioni?" }),
              /* @__PURE__ */ jsx("p", { className: "text-gray-600", children: "Po, Hima Travel ofron garanci çmimi për bileta avioni. Nëse gjeni të njëjtin fluturim me çmim më të ulët brenda 24 orëve pas rezervimit, ne do të rimbursojmë diferencën." })
            ] })
          ] })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx(GlobalFooter, {})
  ] });
}
function PrivacyPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Politikat e Privatësisë | Bileta Avioni | Hima Travel",
    description: "Informacion mbi mbrojtjen e të dhënave personale gjatë rezervimit të biletave të avionit. Mësoni se si Hima Travel mbron privatësinë tuaj kur rezervoni bileta avioni online.",
    url: "https://biletaavioni.himatravel.com/privacy",
    publisher: {
      "@type": "Organization",
      name: "Hima Travel",
      logo: {
        "@type": "ImageObject",
        url: "https://himatravel.com/wp-content/uploads/2020/11/cropped-logo-1-192x192.png"
      }
    },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Hima Travel",
          item: "https://biletaavioni.himatravel.com"
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Politikat e Privatësisë",
          item: "https://biletaavioni.himatravel.com/privacy"
        }
      ]
    },
    // Add FAQ schema for better SEO
    mainEntity: [
      {
        "@type": "Question",
        name: "Si mbrohen të dhënat e mia personale kur rezervoj bileta avioni?",
        acceptedAnswer: {
          "@type": "Answer",
          text: 'Të dhënat tuaja grumbullohen, përpunohen dhe ruhen nga Hima Travel & Tours në përputhje të plotë me parashikimet e ligjit nr. 9887 datë 10.03.2008 "Për Mbrojtjen e të Dhënave Personale".'
        }
      },
      {
        "@type": "Question",
        name: "A janë të sigurta pagesat për bileta avioni në platformën tuaj?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Po, të gjitha transaksionet për bileta avioni në platformën tonë janë të siguruara me protokolle të avancuara të sigurisë dhe enkriptimit për të mbrojtur të dhënat tuaja financiare."
        }
      }
    ]
  };
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-gray-50", children: [
    /* @__PURE__ */ jsxs(Helmet, { children: [
      /* @__PURE__ */ jsx("title", { children: "Politikat e Privatësisë | Bileta Avioni | Rezervime Online | Hima Travel" }),
      /* @__PURE__ */ jsx("meta", { name: "description", content: "Informacion mbi mbrojtjen e të dhënave personale gjatë rezervimit të biletave të avionit. Mësoni se si Hima Travel mbron privatësinë tuaj kur rezervoni bileta avioni online me çmimet më të mira." }),
      /* @__PURE__ */ jsx("meta", { name: "keywords", content: "bileta avioni, privatësi, mbrojtja e të dhënave, rezervime online, fluturime, bileta avioni online, cmime te lira, hima travel, privatësi bileta avioni, të dhëna personale, rezervim bileta, fluturime direkte, bileta avioni të lira, oferta fluturime" }),
      /* @__PURE__ */ jsx("link", { rel: "canonical", href: "https://biletaavioni.himatravel.com/privacy" }),
      /* @__PURE__ */ jsx("meta", { property: "og:type", content: "website" }),
      /* @__PURE__ */ jsx("meta", { property: "og:url", content: "https://biletaavioni.himatravel.com/privacy" }),
      /* @__PURE__ */ jsx("meta", { property: "og:title", content: "Politikat e Privatësisë | Bileta Avioni | Hima Travel" }),
      /* @__PURE__ */ jsx("meta", { property: "og:description", content: "Informacion mbi mbrojtjen e të dhënave personale gjatë rezervimit të biletave të avionit. Mësoni se si Hima Travel mbron privatësinë tuaj kur rezervoni bileta avioni online." }),
      /* @__PURE__ */ jsx("meta", { property: "og:image", content: "https://himatravel.com/wp-content/uploads/2020/11/cropped-logo-1-192x192.png" }),
      /* @__PURE__ */ jsx("meta", { property: "og:locale", content: "sq_AL" }),
      /* @__PURE__ */ jsx("meta", { property: "og:site_name", content: "Hima Travel - Bileta Avioni" }),
      /* @__PURE__ */ jsx("meta", { name: "twitter:card", content: "summary" }),
      /* @__PURE__ */ jsx("meta", { name: "twitter:title", content: "Politikat e Privatësisë | Bileta Avioni | Hima Travel" }),
      /* @__PURE__ */ jsx("meta", { name: "twitter:description", content: "Informacion mbi mbrojtjen e të dhënave personale gjatë rezervimit të biletave të avionit. Mësoni se si Hima Travel mbron privatësinë tuaj kur rezervoni bileta avioni online." }),
      /* @__PURE__ */ jsx("meta", { name: "twitter:image", content: "https://himatravel.com/wp-content/uploads/2020/11/cropped-logo-1-192x192.png" }),
      /* @__PURE__ */ jsx("meta", { name: "author", content: "Hima Travel" }),
      /* @__PURE__ */ jsx("meta", { name: "robots", content: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" }),
      /* @__PURE__ */ jsx("meta", { name: "revisit-after", content: "30 days" }),
      /* @__PURE__ */ jsx("meta", { name: "language", content: "Albanian" }),
      /* @__PURE__ */ jsx("meta", { name: "geo.region", content: "AL" }),
      /* @__PURE__ */ jsx("meta", { name: "geo.placename", content: "Tiranë" }),
      /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify(structuredData) })
    ] }),
    /* @__PURE__ */ jsx(Navbar, {}),
    /* @__PURE__ */ jsx("main", { className: "container mx-auto px-4 py-12", children: /* @__PURE__ */ jsx("div", { className: "max-w-4xl mx-auto", children: /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-xl shadow-sm p-8 mb-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 mb-6", children: [
        /* @__PURE__ */ jsx("div", { className: "p-3 bg-blue-100 rounded-full", children: /* @__PURE__ */ jsx(Shield, { className: "w-8 h-8 text-blue-600" }) }),
        /* @__PURE__ */ jsx("h1", { className: "text-3xl font-bold text-gray-900", children: "Politikat e Privatësisë për Bileta Avioni" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "prose prose-lg max-w-none", children: [
        /* @__PURE__ */ jsxs("p", { children: [
          "Hima Travel & Tours, ju informon se, me qëllim për t'ju ofruar një shërbim sa më të mirë dhe përgjigje të shpejtë ndaj kërkesave tuaja për ",
          /* @__PURE__ */ jsx("strong", { children: "bileta avioni" }),
          ", në platformën onlinë në faqet tona të internetit, kërkohet që klientët apo përdoruesit të japin disa të dhëna personale në formen e aplikimit online për të proceduar me rezervimin e ",
          /* @__PURE__ */ jsx("strong", { children: "biletave të avionit" }),
          "."
        ] }),
        /* @__PURE__ */ jsxs("p", { children: [
          "Hima Travel & Tours disponon faqen zyrtare të internetit www.himatravel.com. Nëpërmjet këtyre faqeve, kompania u vjen në ndihmë klientëve të interesuar për ",
          /* @__PURE__ */ jsx("strong", { children: "bileta avioni" }),
          ", paketa turistike apo cdo lloj shërbimi udhëtimi."
        ] }),
        /* @__PURE__ */ jsxs("p", { children: [
          'Të dhënat tuaja grumbullohen, përpunohen dhe ruhen nga Hima Travel & Tours në përputhje të plotë me parashikimet e ligjit nr. 9887 datë 10.03.2008 "Për Mbrojtjen e të Dhënave Personale". Këto veprime do të kryhen sipas parimit të respektimit dhe garantimit të të drejtave dhe lirive themelore të njeriut dhe në veçanti të drejtës së ruajtjes së jetës private gjatë rezervimit të ',
          /* @__PURE__ */ jsx("strong", { children: "biletave të avionit" }),
          "."
        ] }),
        /* @__PURE__ */ jsxs("p", { children: [
          "Dhënia e të dhënave tuaja personale nuk është e detyrueshme, por është kusht i domosdoshëm për të proceduar rezervimin e ",
          /* @__PURE__ */ jsx("strong", { children: "biletave të avionit online" }),
          "."
        ] }),
        /* @__PURE__ */ jsx("h2", { children: "1. Përkufizimi i termave për rezervimin e biletave të avionit" }),
        /* @__PURE__ */ jsx("p", { children: "Në këtë marrëveshje, termat e mëposhtëm do të kenë këtë kuptim:" }),
        /* @__PURE__ */ jsxs("ul", { children: [
          /* @__PURE__ */ jsxs("li", { children: [
            /* @__PURE__ */ jsx("strong", { children: "Agjenci:" }),
            " Person juridik i regjistruar i cili kryen veprimtarinë e ofrimit, gjetjes dhe mundësimit të udhëtimeve turistike, ",
            /* @__PURE__ */ jsx("strong", { children: "biletave të avionit" }),
            " në mënyra të ndryshme transporti si dhe bileta për aktivitete sportive ose kulturore për klientët, në këmbim të pagesës."
          ] }),
          /* @__PURE__ */ jsxs("li", { children: [
            /* @__PURE__ */ jsx("strong", { children: "Cookie:" }),
            " Një pjesë informacioni e dërguar nga një faqe interneti dhe që ruhet në browserin e përdoruesit ndërkohë që përdoruesi sheh faqen e internetit për ",
            /* @__PURE__ */ jsx("strong", { children: "bileta avioni" }),
            ". Çdo herë që një përdorues hap një faqe interneti, browseri dërgon një cookie në serverin e përdoruesit për ta lajmëruar atë për aktivitetin e tij të mëparshëm."
          ] })
        ] }),
        /* @__PURE__ */ jsx("h2", { children: "2. Përdorimi i cookie për bileta avioni" }),
        /* @__PURE__ */ jsxs("ul", { children: [
          /* @__PURE__ */ jsxs("li", { children: [
            "Faqet e internetit që i përkasin agjencisë, i përdorin cookie për të dalluar vizitorët e faqes njëri nga tjetri. Disa cookie janë të domosdoshëm për mirëfunksionimin e faqeve të internetit të agjencisë, për të lejuar përdoruesit e faqes të bëjnë rezervime online të ",
            /* @__PURE__ */ jsx("strong", { children: "biletave të avionit" }),
            " dhe për të mundësuar stafin e agjencisë të marrë e të përpunojë kërkesat e klientëve."
          ] }),
          /* @__PURE__ */ jsxs("li", { children: [
            "Disa lloje të tjera cookie e ndihmojnë stafin e agjencisë të mundësojë një përvojë të mirë për klientët kur këta vizitojnë faqen e internetit për ",
            /* @__PURE__ */ jsx("strong", { children: "bileta avioni" }),
            ". Cookie japin edhe informacion mbi ofertat e agjencisë për ",
            /* @__PURE__ */ jsx("strong", { children: "bileta avioni" }),
            "."
          ] }),
          /* @__PURE__ */ jsxs("li", { children: [
            "Cookie përdoren gjithashtu, për të reklamuar ",
            /* @__PURE__ */ jsx("strong", { children: "bileta avioni" }),
            " në faqen e internetit të agjencisë."
          ] })
        ] }),
        /* @__PURE__ */ jsx("h2", { children: "3. Deklaratë mbi privatësinë për bileta avioni" }),
        /* @__PURE__ */ jsxs("p", { children: [
          "Hima Travel & Tours respekton rëndësinë e privatësisë së klientëve të saj që kërkojnë ",
          /* @__PURE__ */ jsx("strong", { children: "bileta avioni" }),
          ". Kjo deklaratë përcakton bazën mbi të cilën mblidhen dhe përpunohen të dhënat e çdo klienti."
        ] }),
        /* @__PURE__ */ jsx("h3", { children: "3.1. Mbledhja dhe Ruajtja e të Dhënave për Bileta Avioni" }),
        /* @__PURE__ */ jsxs("p", { children: [
          "Hima Travel & Tours siguron çdo klient se të dhënat që mbërrijnë në backoffice apo që klienti nënshkruan personalisht në zyrë, janë të siguruara me anë të një sistemi të sigurtë dhe këto të dhëna përdoren vetëm për efekt të garantimit të rezervimit të ",
          /* @__PURE__ */ jsx("strong", { children: "biletave të avionit" }),
          " të klientit."
        ] }),
        /* @__PURE__ */ jsx("h3", { children: "3.2. Të dhënat që mblidhen për bileta avioni" }),
        /* @__PURE__ */ jsx("p", { children: "Të dhënat e mëposhtme të klientëve mblidhen nga faqja e internetit:" }),
        /* @__PURE__ */ jsxs("ul", { children: [
          /* @__PURE__ */ jsxs("li", { children: [
            "Informacioni që klienti jep në mënyrë që të kryhet rezervimi i ",
            /* @__PURE__ */ jsx("strong", { children: "biletave të avionit" })
          ] }),
          /* @__PURE__ */ jsxs("li", { children: [
            "Informacioni që klienti jep në mënyrë që të bëhet pjesë e një konkursi që reklamohet në faqen e internetit, kur plotëson një pyetësor ose kur raporton një problem me ",
            /* @__PURE__ */ jsx("strong", { children: "bileta avioni" })
          ] }),
          /* @__PURE__ */ jsxs("li", { children: [
            "Detaje të transfertave bankare që klienti kryen për të përfunduar një rezervim ",
            /* @__PURE__ */ jsx("strong", { children: "bilete avioni" })
          ] }),
          /* @__PURE__ */ jsxs("li", { children: [
            "Nëse klienti kontakton stafin e agjencisë, stafi mund të ruajë adresën e e-mail për komunikime të mëtejshme lidhur me ",
            /* @__PURE__ */ jsx("strong", { children: "bileta avioni" })
          ] })
        ] }),
        /* @__PURE__ */ jsx("h2", { children: "4. Ruajtja dhe transferimi i të dhënave për bileta avioni" }),
        /* @__PURE__ */ jsxs("ul", { children: [
          /* @__PURE__ */ jsxs("li", { children: [
            "Të dhënat e mbledhura nga agjencia vetëm për qëllime rezervimi ",
            /* @__PURE__ */ jsx("strong", { children: "biletash avioni" }),
            " dhe të lëna me vullnet të lirë nga subjekti i të dhënave mund të transferohen ose të ruhen në një vend jashtë Zonës Ekonomike Europiane."
          ] }),
          /* @__PURE__ */ jsxs("li", { children: [
            "Hima Travel & Tours në bazë të kontratave dhe marrëveshjeve që ka me furnitorë globalë, do të transferojë në database të tyre të dhënat e klientëve, të cilët rezervojnë ",
            /* @__PURE__ */ jsx("strong", { children: "bileta avioni" }),
            " nëpërmjet faqeve online të kompanisë."
          ] }),
          /* @__PURE__ */ jsx("li", { children: "Të gjitha të dhënat e mbledhura nga agjencia do të ruhen në serverat e sigurtë të Hima Travel & Tours." })
        ] }),
        /* @__PURE__ */ jsx("h2", { children: "5. Anullimi i përpunimit të të dhënave për bileta avioni" }),
        /* @__PURE__ */ jsx("p", { children: "Klienti ka të drejtë të kërkojë nga agjencia të njihet me informacionin që mund të jëtë mbledhur për të dhe më pas të mos përpunojë të dhënat personale për qëllime marketingu apo arsye të ndryshme me anë të e-mail ose një kërkese drejtuar kompanisë në adresën e kontaktit." }),
        /* @__PURE__ */ jsx("h2", { children: "6. Pëlqimi mbi mbrojtjen e të dhënave personale për bileta avioni" }),
        /* @__PURE__ */ jsxs("p", { children: [
          "Duke vazhduar përdorimin e faqeve të internetit të Hima Travel & Tours për ",
          /* @__PURE__ */ jsx("strong", { children: "bileta avioni" }),
          ", klienti jep pëlqimin e tij mbi mbledhjen dhe përpunimin e të dhënave nga ana e agjencisë. Të dhënat personale do të ruhen për aq kohë sa ç'është e nevojshme sipas qëllimit kryesor të mbledhjes së tyre."
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-blue-50 rounded-lg p-6 mt-8", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold text-gray-900 mb-4", children: "Kontakt për Privatësinë e Biletave të Avionit" }),
          /* @__PURE__ */ jsxs("p", { className: "text-gray-700", children: [
            "Nëse keni pyetje, vërejtje, kërkesa apo ankesa në lidhje me përdorimin e këtyre të dhënave nga ana e Hima Travel & Tours për ",
            /* @__PURE__ */ jsx("strong", { children: "bileta avioni" }),
            ", atëherë lutemi të na drejtoheni me shkrim në adresën e mëposhtme:"
          ] }),
          /* @__PURE__ */ jsxs("p", { className: "mt-4 text-gray-700", children: [
            /* @__PURE__ */ jsx("strong", { children: "Personi Përgjegjës për Privatësinë:" }),
            /* @__PURE__ */ jsx("br", {}),
            "Hima Travel & Tours",
            /* @__PURE__ */ jsx("br", {}),
            "Rruga Muhamet Gjollesha, përballë hyrjes së rrugës Myslym Shyri",
            /* @__PURE__ */ jsx("br", {}),
            "Tiranë, Albania"
          ] })
        ] })
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsx(GlobalFooter, {})
  ] });
}
function TermsPage() {
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-gray-50", children: [
    /* @__PURE__ */ jsx(Navbar, {}),
    /* @__PURE__ */ jsx("main", { className: "container mx-auto px-4 py-12", children: /* @__PURE__ */ jsx("div", { className: "max-w-4xl mx-auto", children: /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-xl shadow-sm p-8 mb-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 mb-6", children: [
        /* @__PURE__ */ jsx("div", { className: "p-3 bg-blue-100 rounded-full", children: /* @__PURE__ */ jsx(FileText, { className: "w-8 h-8 text-blue-600" }) }),
        /* @__PURE__ */ jsx("h1", { className: "text-3xl font-bold text-gray-900", children: "Kushtet e Perdorimit" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "prose prose-lg max-w-none", children: [
        /* @__PURE__ */ jsx("p", { children: "Duke përdorur faqen e internetit të Hima Travel & Tours, ju pranoni të respektoni këto kushte të përdorimit. Ju lutemi t'i lexoni me kujdes para se të përdorni faqen tonë." }),
        /* @__PURE__ */ jsx("h2", { children: "1. Përdorimi i Faqes" }),
        /* @__PURE__ */ jsx("p", { children: "Faqja e internetit e Hima Travel & Tours është krijuar për t'ju ndihmuar të gjeni dhe të rezervoni bileta avioni dhe shërbime të tjera udhëtimi. Duke përdorur këtë faqe, ju pranoni:" }),
        /* @__PURE__ */ jsxs("ul", { children: [
          /* @__PURE__ */ jsx("li", { children: "Të jepni informacion të saktë dhe të plotë gjatë procesit të rezervimit" }),
          /* @__PURE__ */ jsx("li", { children: "Të përdorni faqen vetëm për qëllime të ligjshme" }),
          /* @__PURE__ */ jsx("li", { children: "Të mos ndërhyni në sigurinë e faqes ose të sistemeve tona" }),
          /* @__PURE__ */ jsx("li", { children: "Të mos përdorni faqen për qëllime komerciale pa autorizimin tonë" })
        ] }),
        /* @__PURE__ */ jsx("h2", { children: "2. Rezervimet dhe Pagesat" }),
        /* @__PURE__ */ jsx("p", { children: "Kur bëni një rezervim përmes Hima Travel & Tours:" }),
        /* @__PURE__ */ jsxs("ul", { children: [
          /* @__PURE__ */ jsx("li", { children: "Çmimet janë të shprehura në monedhën e treguar dhe përfshijnë taksat e aplikueshme" }),
          /* @__PURE__ */ jsx("li", { children: "Rezervimi juaj konfirmohet vetëm pas pagesës së plotë" }),
          /* @__PURE__ */ jsx("li", { children: "Disa tarifa dhe kushte specifike mund të aplikohen nga kompanitë ajrore" }),
          /* @__PURE__ */ jsx("li", { children: "Jeni përgjegjës për sigurimin e dokumenteve të nevojshme të udhëtimit" })
        ] }),
        /* @__PURE__ */ jsx("h2", { children: "3. Politikat e Anulimit" }),
        /* @__PURE__ */ jsx("p", { children: "Kushtet e anulimit ndryshojnë sipas llojit të biletës dhe kompanisë ajrore:" }),
        /* @__PURE__ */ jsxs("ul", { children: [
          /* @__PURE__ */ jsx("li", { children: "Disa bileta mund të jenë të parimbursueshme" }),
          /* @__PURE__ */ jsx("li", { children: "Ndryshimet e rezervimit mund të kenë tarifa shtesë" }),
          /* @__PURE__ */ jsx("li", { children: "Anulimi duhet të bëhet sipas afateve të përcaktuara" }),
          /* @__PURE__ */ jsx("li", { children: "Rimbursimi, nëse është i mundur, do të bëhet sipas politikave të kompanisë ajrore" })
        ] }),
        /* @__PURE__ */ jsx("h2", { children: "4. Përgjegjësitë" }),
        /* @__PURE__ */ jsx("p", { children: "Hima Travel & Tours vepron si ndërmjetës midis jush dhe ofruesve të shërbimeve:" }),
        /* @__PURE__ */ jsxs("ul", { children: [
          /* @__PURE__ */ jsx("li", { children: "Nuk jemi përgjegjës për ndryshimet e orareve nga kompanitë ajrore" }),
          /* @__PURE__ */ jsx("li", { children: "Nuk garantojmë disponueshmërinë e çmimeve të shfaqura" }),
          /* @__PURE__ */ jsx("li", { children: "Rekomandojmë të kontrolloni kushtet specifike të biletës para rezervimit" }),
          /* @__PURE__ */ jsx("li", { children: "Jemi të përkushtuar të ofrojmë informacionin më të saktë të mundshëm" })
        ] }),
        /* @__PURE__ */ jsx("h2", { children: "5. Të Drejtat e Pronësisë Intelektuale" }),
        /* @__PURE__ */ jsx("p", { children: "Të gjitha materialet në këtë faqe interneti, përfshirë por pa u kufizuar në tekst, imazhe, logo dhe kod, janë pronë e Hima Travel & Tours dhe mbrohen nga ligjet e të drejtave të autorit." }),
        /* @__PURE__ */ jsx("h2", { children: "6. Ndryshimet në Kushtet e Përdorimit" }),
        /* @__PURE__ */ jsx("p", { children: "Hima Travel & Tours rezervon të drejtën të ndryshojë këto kushte në çdo kohë. Ndryshimet do të hyjnë në fuqi menjëherë pas publikimit në faqen tonë të internetit." }),
        /* @__PURE__ */ jsx("h2", { children: "7. Ligji i Aplikueshëm" }),
        /* @__PURE__ */ jsx("p", { children: "Këto kushte përdorimi rregullohen dhe interpretohen në përputhje me ligjet e Republikës së Shqipërisë." }),
        /* @__PURE__ */ jsxs("div", { className: "bg-yellow-50 rounded-lg p-6 mt-8", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold text-gray-900 mb-4", children: "Kontakt për Kushtet e Përdorimit" }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-700", children: "Për çdo pyetje ose paqartësi në lidhje me këto kushte përdorimi, ju lutemi na kontaktoni:" }),
          /* @__PURE__ */ jsxs("div", { className: "mt-4 text-gray-700", children: [
            /* @__PURE__ */ jsx("strong", { children: "Hima Travel & Tours" }),
            /* @__PURE__ */ jsx("br", {}),
            "Rruga Muhamet Gjollesha",
            /* @__PURE__ */ jsx("br", {}),
            "Përballë hyrjes së rrugës Myslym Shyri",
            /* @__PURE__ */ jsx("br", {}),
            "Tiranë, Shqipëri",
            /* @__PURE__ */ jsx("br", {}),
            "Email: kontakt@himatravel.com"
          ] })
        ] })
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsx(GlobalFooter, {})
  ] });
}
function CookiesPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Politikat e Cookies | Bileta Avioni | Hima Travel",
    description: "Informacion mbi përdorimin e cookies në faqen tonë të internetit për bileta avioni dhe si mund të menaxhoni preferencat tuaja të cookies.",
    url: "https://biletaavioni.himatravel.com/cookies",
    publisher: {
      "@type": "Organization",
      name: "Hima Travel",
      logo: {
        "@type": "ImageObject",
        url: "https://himatravel.com/wp-content/uploads/2020/11/cropped-logo-1-192x192.png"
      }
    },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Hima Travel",
          item: "https://biletaavioni.himatravel.com"
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Politikat e Cookies",
          item: "https://biletaavioni.himatravel.com/cookies"
        }
      ]
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-gray-50", children: [
    /* @__PURE__ */ jsxs(Helmet, { children: [
      /* @__PURE__ */ jsx("title", { children: "Politikat e Cookies | Bileta Avioni | Hima Travel" }),
      /* @__PURE__ */ jsx("meta", { name: "description", content: "Informacion mbi përdorimin e cookies në faqen tonë të internetit për bileta avioni dhe si mund të menaxhoni preferencat tuaja të cookies për rezervime online." }),
      /* @__PURE__ */ jsx("meta", { name: "keywords", content: "bileta avioni, cookies policy, politika e cookies, rezervime online, fluturime, bileta avioni online, cmime te lira, hima travel, privatësi bileta avioni" }),
      /* @__PURE__ */ jsx("link", { rel: "canonical", href: "https://biletaavioni.himatravel.com/cookies" }),
      /* @__PURE__ */ jsx("meta", { property: "og:type", content: "website" }),
      /* @__PURE__ */ jsx("meta", { property: "og:url", content: "https://biletaavioni.himatravel.com/cookies" }),
      /* @__PURE__ */ jsx("meta", { property: "og:title", content: "Politikat e Cookies | Bileta Avioni | Hima Travel" }),
      /* @__PURE__ */ jsx("meta", { property: "og:description", content: "Informacion mbi përdorimin e cookies në faqen tonë të internetit për bileta avioni dhe si mund të menaxhoni preferencat tuaja të cookies." }),
      /* @__PURE__ */ jsx("meta", { property: "og:image", content: "https://himatravel.com/wp-content/uploads/2020/11/cropped-logo-1-192x192.png" }),
      /* @__PURE__ */ jsx("meta", { property: "og:locale", content: "sq_AL" }),
      /* @__PURE__ */ jsx("meta", { name: "twitter:card", content: "summary" }),
      /* @__PURE__ */ jsx("meta", { name: "twitter:title", content: "Politikat e Cookies | Bileta Avioni | Hima Travel" }),
      /* @__PURE__ */ jsx("meta", { name: "twitter:description", content: "Informacion mbi përdorimin e cookies në faqen tonë të internetit për bileta avioni dhe si mund të menaxhoni preferencat tuaja të cookies." }),
      /* @__PURE__ */ jsx("meta", { name: "twitter:image", content: "https://himatravel.com/wp-content/uploads/2020/11/cropped-logo-1-192x192.png" }),
      /* @__PURE__ */ jsx("meta", { name: "author", content: "Hima Travel" }),
      /* @__PURE__ */ jsx("meta", { name: "robots", content: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" }),
      /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify(structuredData) })
    ] }),
    /* @__PURE__ */ jsx(Navbar, {}),
    /* @__PURE__ */ jsx("main", { className: "container mx-auto px-4 py-12", children: /* @__PURE__ */ jsx("div", { className: "max-w-4xl mx-auto", children: /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-xl shadow-sm p-8 mb-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 mb-6", children: [
        /* @__PURE__ */ jsx("div", { className: "p-3 bg-blue-100 rounded-full", children: /* @__PURE__ */ jsx(Cookie, { className: "w-8 h-8 text-blue-600" }) }),
        /* @__PURE__ */ jsx("h1", { className: "text-3xl font-bold text-gray-900", children: "Politikat e Cookies për Bileta Avioni" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "prose prose-lg max-w-none", children: [
        /* @__PURE__ */ jsx("p", { children: "Kjo politikë e cookies shpjegon se çfarë janë cookies dhe si i përdorim ato në faqen tonë të internetit për bileta avioni. Duke përdorur faqen tonë, ju pranoni përdorimin e cookies në përputhje me këtë politikë." }),
        /* @__PURE__ */ jsx("h2", { children: "Çfarë janë Cookies?" }),
        /* @__PURE__ */ jsx("p", { children: "Cookies janë skedarë të vegjël teksti që ruhen në pajisjen tuaj (kompjuter, tablet, telefon celular) kur vizitoni faqen tonë të internetit për bileta avioni. Ato na ndihmojnë të sigurojmë funksionimin e duhur të faqes, të përmirësojmë performancën dhe t'ju ofrojmë një përvojë më të personalizuar gjatë kërkimit dhe rezervimit të biletave avioni." }),
        /* @__PURE__ */ jsx("h2", { children: "Si i Përdorim Cookies për Bileta Avioni" }),
        /* @__PURE__ */ jsx("p", { children: "Ne përdorim cookies për qëllimet e mëposhtme:" }),
        /* @__PURE__ */ jsx("h3", { children: "Cookies të Domosdoshme për Bileta Avioni" }),
        /* @__PURE__ */ jsxs("ul", { children: [
          /* @__PURE__ */ jsx("li", { children: "Për të mundësuar funksionimin bazë të faqes së biletave të avionit" }),
          /* @__PURE__ */ jsx("li", { children: "Për të ruajtur statusin e sesionit tuaj të hyrjes gjatë kërkimit të fluturimeve" }),
          /* @__PURE__ */ jsx("li", { children: "Për të mbajtur mend zgjedhjet tuaja gjatë kërkimit të biletave avioni (destinacione, data, pasagjerë)" }),
          /* @__PURE__ */ jsx("li", { children: "Për të siguruar funksionalitetin e shportës së rezervimeve të biletave avioni" })
        ] }),
        /* @__PURE__ */ jsx("h3", { children: "Cookies Analitike për Bileta Avioni" }),
        /* @__PURE__ */ jsxs("ul", { children: [
          /* @__PURE__ */ jsx("li", { children: "Për të kuptuar si përdoret faqja jonë e biletave të avionit" }),
          /* @__PURE__ */ jsx("li", { children: "Për të matur efektivitetin e reklamave tona për bileta avioni" }),
          /* @__PURE__ */ jsx("li", { children: "Për të analizuar trendet e kërkimit të fluturimeve dhe destinacioneve" }),
          /* @__PURE__ */ jsx("li", { children: "Për të përmirësuar shërbimet tona të biletave avioni bazuar në sjelljen e përdoruesve" })
        ] }),
        /* @__PURE__ */ jsx("h3", { children: "Cookies të Marketingut për Bileta Avioni" }),
        /* @__PURE__ */ jsxs("ul", { children: [
          /* @__PURE__ */ jsx("li", { children: "Për t'ju shfaqur reklama relevante për bileta avioni" }),
          /* @__PURE__ */ jsx("li", { children: "Për të matur suksesin e fushatave tona të marketingut për fluturime" }),
          /* @__PURE__ */ jsx("li", { children: "Për t'ju ofruar përmbajtje të personalizuar për bileta avioni" }),
          /* @__PURE__ */ jsx("li", { children: "Për të ndjekur preferencat tuaja të udhëtimit dhe destinacionet e preferuara" })
        ] }),
        /* @__PURE__ */ jsx("h2", { children: "Menaxhimi i Cookies për Bileta Avioni" }),
        /* @__PURE__ */ jsx("p", { children: "Shumica e shfletuesve të internetit ju lejojnë të kontrolloni cookies përmes preferencave të tyre. Ju mund të:" }),
        /* @__PURE__ */ jsxs("ul", { children: [
          /* @__PURE__ */ jsx("li", { children: "Shikoni cookies të ruajtura në shfletuesin tuaj gjatë kërkimit të biletave avioni" }),
          /* @__PURE__ */ jsx("li", { children: "Fshini të gjitha ose disa cookies të lidhura me bileta avioni" }),
          /* @__PURE__ */ jsx("li", { children: "Bllokoni cookies nga faqe të caktuara të biletave avioni" }),
          /* @__PURE__ */ jsx("li", { children: "Bllokoni cookies të palëve të treta që ndjekin preferencat tuaja të udhëtimit" }),
          /* @__PURE__ */ jsx("li", { children: "Bllokoni të gjitha cookies, duke përfshirë ato të nevojshme për rezervimin e biletave avioni" }),
          /* @__PURE__ */ jsx("li", { children: "Fshini të gjitha cookies kur mbyllni shfletuesin pas kërkimit të fluturimeve" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-yellow-50 rounded-lg p-6 my-8", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold text-gray-900 mb-2", children: "Kujdes për Bileta Avioni!" }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-700", children: "Bllokimi i të gjitha cookies mund të ndikojë në funksionalitetin e faqes sonë të biletave avioni. Disa veçori të faqes, si ruajtja e preferencave të kërkimit të fluturimeve ose shporta e rezervimeve, mund të mos funksionojnë siç duhet nëse çaktivizoni cookies." })
        ] }),
        /* @__PURE__ */ jsx("h2", { children: "Cookies të Palëve të Treta për Bileta Avioni" }),
        /* @__PURE__ */ jsx("p", { children: "Ne përdorim shërbime nga palë të treta që mund të vendosin cookies në pajisjen tuaj gjatë kërkimit të biletave avioni. Këto përfshijnë:" }),
        /* @__PURE__ */ jsxs("ul", { children: [
          /* @__PURE__ */ jsx("li", { children: "Google Analytics për analizën e trafikut të faqes së biletave avioni" }),
          /* @__PURE__ */ jsx("li", { children: "Shërbimet e reklamimit për reklama të personalizuara të fluturimeve dhe ofertave speciale" }),
          /* @__PURE__ */ jsx("li", { children: "Platforma të mediave sociale për përmbajtje të integruar lidhur me bileta avioni" }),
          /* @__PURE__ */ jsx("li", { children: "Shërbime pagese për procesimin e pagesave të biletave avioni" })
        ] }),
        /* @__PURE__ */ jsx("h2", { children: "Përditësimet e Politikës së Cookies për Bileta Avioni" }),
        /* @__PURE__ */ jsx("p", { children: "Ne mund të përditësojmë këtë politikë herë pas here për të reflektuar ndryshimet në përdorimin tonë të cookies për bileta avioni. Ndryshimet do të hyjnë në fuqi sapo të publikohen në faqen tonë të internetit." }),
        /* @__PURE__ */ jsxs("div", { className: "bg-blue-50 rounded-lg p-6 mt-8", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold text-gray-900 mb-4", children: "Kontakt për Politikën e Cookies të Biletave Avioni" }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-700", children: "Nëse keni pyetje në lidhje me përdorimin e cookies në faqen tonë të biletave avioni, ju lutemi na kontaktoni:" }),
          /* @__PURE__ */ jsxs("div", { className: "mt-4 text-gray-700", children: [
            /* @__PURE__ */ jsx("strong", { children: "Hima Travel & Tours" }),
            /* @__PURE__ */ jsx("br", {}),
            "Rruga Muhamet Gjollesha",
            /* @__PURE__ */ jsx("br", {}),
            "Përballë hyrjes së rrugës Myslym Shyri",
            /* @__PURE__ */ jsx("br", {}),
            "Tiranë, Shqipëri",
            /* @__PURE__ */ jsx("br", {}),
            "Email: kontakt@himatravel.com"
          ] })
        ] })
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsx(GlobalFooter, {})
  ] });
}
function AboutPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    name: "Hima Travel",
    description: "Agjenci udhëtimi e specializuar në bileta avioni me çmimet më të mira. Ofrojmë bileta avioni, pushime dhe shërbime turistike që nga viti 2011.",
    url: "https://biletaavioni.himatravel.com/about",
    logo: "https://himatravel.com/wp-content/uploads/2020/11/logo-768x277.png",
    telephone: "+355 694 767 427",
    email: "kontakt@himatravel.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Rruga Muhamet Gjollesha, përballë hyrjes së rrugës Myslym Shyri",
      addressLocality: "Tiranë",
      addressRegion: "Tiranë",
      postalCode: "1001",
      addressCountry: "AL"
    },
    openingHours: "Mo-Sa 09:00-19:00",
    priceRange: "€€",
    sameAs: [
      "https://facebook.com/himatravel",
      "https://instagram.com/himatravel"
    ]
  };
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-gray-50", children: [
    /* @__PURE__ */ jsx(
      SEOHead,
      {
        title: "Rreth Nesh | Bileta Avioni Online | Hima Travel | Agjenci Udhëtimi",
        description: "Hima Travel, agjencia juaj e besueshme për bileta avioni me çmimet më të mira që nga viti 2011. Ofrojmë bileta avioni, pushime dhe shërbime turistike të personalizuara për çdo udhëtim.",
        canonicalUrl: "/about",
        schema,
        keywords: [
          "bileta avioni",
          "agjenci udhetimi",
          "bileta avioni online",
          "cmime bileta avioni",
          "hima travel",
          "fluturime",
          "bileta avioni te lira",
          "agjenci udhetimi tirane",
          "rezervime bileta avioni",
          "oferta udhetimi",
          "bileta avioni shqiperi",
          "fluturime direkte",
          "bileta avioni me oferte"
        ],
        language: "sq"
      }
    ),
    /* @__PURE__ */ jsx(Navbar, {}),
    /* @__PURE__ */ jsx("main", { className: "container mx-auto px-4 py-12", children: /* @__PURE__ */ jsx("div", { className: "max-w-4xl mx-auto", children: /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-xl shadow-sm p-8 mb-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 mb-6", children: [
        /* @__PURE__ */ jsx("div", { className: "p-3 bg-blue-100 rounded-full", children: /* @__PURE__ */ jsx(Globe, { className: "w-8 h-8 text-blue-600" }) }),
        /* @__PURE__ */ jsx("h1", { className: "text-3xl font-bold text-gray-900", children: "Rreth Hima Travel - Ekspertët e Biletave të Avionit" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "prose prose-lg max-w-none", children: [
        /* @__PURE__ */ jsxs("p", { className: "lead text-xl text-gray-600 mb-8", children: [
          "Që nga viti 2011, Hima Travel është bërë një nga agjencitë më të besuara të udhëtimit në Shqipëri, duke ofruar",
          " ",
          /* @__PURE__ */ jsx("strong", { children: "bileta avioni" }),
          ", pushime të organizuara, udhëtime me guida dhe rezervime hoteliere për mijëra klientë çdo vit. Me përvojë mbi një dekadë, ne jemi të përkushtuar për të ofruar shërbime cilësore,",
          " ",
          /* @__PURE__ */ jsx("strong", { children: "çmime konkurruese për bileta avioni" }),
          " dhe eksperienca të paharrueshme për udhëtarët tanë."
        ] }),
        /* @__PURE__ */ jsxs("section", { className: "mb-12", children: [
          /* @__PURE__ */ jsxs("h2", { className: "text-2xl font-bold text-gray-900 mb-6 flex items-center", children: [
            /* @__PURE__ */ jsx(Star, { className: "w-6 h-6 text-yellow-500 mr-2" }),
            "Pse të Zgjidhni Hima Travel për Bileta Avioni?"
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
            /* @__PURE__ */ jsxs("div", { className: "bg-blue-50 rounded-lg p-5 flex items-start", children: [
              /* @__PURE__ */ jsx(Clock, { className: "w-6 h-6 text-blue-600 mr-3 mt-1 flex-shrink-0" }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("h3", { className: "font-semibold text-gray-900 mb-2", children: "Eksperiencë 12+ Vjeçare" }),
                /* @__PURE__ */ jsx("p", { className: "text-gray-600", children: "Ekspertë në bileta avioni dhe shërbime turistike që nga viti 2011, me mijëra klientë të kënaqur." })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "bg-blue-50 rounded-lg p-5 flex items-start", children: [
              /* @__PURE__ */ jsx(Shield, { className: "w-6 h-6 text-blue-600 mr-3 mt-1 flex-shrink-0" }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("h3", { className: "font-semibold text-gray-900 mb-2", children: "Garanci Çmimi për Bileta Avioni" }),
                /* @__PURE__ */ jsx("p", { className: "text-gray-600", children: "Ofrojmë çmimet më të mira të garantuara për bileta avioni në të gjitha destinacionet." })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "bg-blue-50 rounded-lg p-5 flex items-start", children: [
              /* @__PURE__ */ jsx(CheckCircle, { className: "w-6 h-6 text-blue-600 mr-3 mt-1 flex-shrink-0" }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("h3", { className: "font-semibold text-gray-900 mb-2", children: "Shërbim i Personalizuar" }),
                /* @__PURE__ */ jsx("p", { className: "text-gray-600", children: "Çdo klient trajtohet individualisht me kujdes të veçantë për nevojat e tyre të udhëtimit." })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "bg-blue-50 rounded-lg p-5 flex items-start", children: [
              /* @__PURE__ */ jsx(Calendar, { className: "w-6 h-6 text-blue-600 mr-3 mt-1 flex-shrink-0" }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("h3", { className: "font-semibold text-gray-900 mb-2", children: "Rezervime Fleksibël" }),
                /* @__PURE__ */ jsx("p", { className: "text-gray-600", children: "Mundësi për ndryshime dhe anulime të biletave të avionit sipas politikave të kompanive ajrore." })
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("section", { className: "mb-12", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-gray-900 mb-6", children: "Destinacionet Kryesore për Bileta Avioni" }),
          /* @__PURE__ */ jsx("p", { className: "mb-6", children: "Hima Travel është specialist në organizimin e udhëtimeve dhe gjetjen e biletave të avionit me çmimet më të mira për destinacionet më të kërkuara në botë. Rrjeti ynë i gjerë i partnerëve na lejon të ofrojmë bileta avioni me çmime konkurruese për çdo destinacion." }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "bg-blue-50 rounded-lg p-4", children: [
              /* @__PURE__ */ jsx("h3", { className: "font-semibold mb-2", children: "🇮🇹 Itali - Bileta Avioni" }),
              /* @__PURE__ */ jsx("p", { className: "text-sm", children: "Romë, Milano, Venecia - fluturime direkte dhe me ndalesë me çmimet më të mira." })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "bg-blue-50 rounded-lg p-4", children: [
              /* @__PURE__ */ jsx("h3", { className: "font-semibold mb-2", children: "🇬🇧 Angli - Bileta Avioni" }),
              /* @__PURE__ */ jsx("p", { className: "text-sm", children: "Londër, Manchester - oferta speciale për bileta avioni gjatë gjithë vitit." })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "bg-blue-50 rounded-lg p-4", children: [
              /* @__PURE__ */ jsx("h3", { className: "font-semibold mb-2", children: "🇩🇪 Gjermani - Bileta Avioni" }),
              /* @__PURE__ */ jsx("p", { className: "text-sm", children: "Frankfurt, Mynih, Berlin - bileta avioni me çmime të favorshme për çdo buxhet." })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "bg-blue-50 rounded-lg p-4", children: [
              /* @__PURE__ */ jsx("h3", { className: "font-semibold mb-2", children: "🇹🇷 Turqi - Bileta Avioni" }),
              /* @__PURE__ */ jsx("p", { className: "text-sm", children: "Stamboll, Antalia - fluturime direkte dhe oferta për pushime all-inclusive." })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "bg-blue-50 rounded-lg p-4", children: [
              /* @__PURE__ */ jsx("h3", { className: "font-semibold mb-2", children: "🇬🇷 Greqi - Bileta Avioni" }),
              /* @__PURE__ */ jsx("p", { className: "text-sm", children: "Athinë, Selanik, ishujt - bileta avioni dhe paketa pushimesh për verë." })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "bg-blue-50 rounded-lg p-4", children: [
              /* @__PURE__ */ jsx("h3", { className: "font-semibold mb-2", children: "🇺🇸 SHBA - Bileta Avioni" }),
              /* @__PURE__ */ jsx("p", { className: "text-sm", children: "New York, Chicago, Los Angeles - bileta avioni me çmimet më konkurruese në treg." })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("section", { className: "bg-white rounded-xl border border-gray-100 p-8 mb-12", children: [
          /* @__PURE__ */ jsxs("h2", { className: "text-2xl font-bold text-gray-900 mb-6 flex items-center", children: [
            /* @__PURE__ */ jsx(Plane, { className: "w-6 h-6 text-blue-600 mr-2" }),
            "Shërbimet Tona për Bileta Avioni dhe Më Shumë"
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-4", children: [
              /* @__PURE__ */ jsx("div", { className: "p-2 bg-blue-100 rounded-lg", children: /* @__PURE__ */ jsx(Plane, { className: "w-6 h-6 text-blue-600" }) }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("h3", { className: "font-semibold mb-2", children: "Bileta Avioni Online dhe në Zyrë" }),
                /* @__PURE__ */ jsx("p", { className: "text-gray-600", children: "Rezervime për bileta avioni në të gjithë botën me çmimet më të mira të garantuara." })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-4", children: [
              /* @__PURE__ */ jsx("div", { className: "p-2 bg-blue-100 rounded-lg", children: /* @__PURE__ */ jsx(Globe, { className: "w-6 h-6 text-blue-600" }) }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("h3", { className: "font-semibold mb-2", children: "Paketa Turistike me Guidë" }),
                /* @__PURE__ */ jsx("p", { className: "text-gray-600", children: "Udhëtime të organizuara në grup ose private me bileta avioni të përfshira." })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-4", children: [
              /* @__PURE__ */ jsx("div", { className: "p-2 bg-blue-100 rounded-lg", children: /* @__PURE__ */ jsx(MapPin, { className: "w-6 h-6 text-blue-600" }) }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("h3", { className: "font-semibold mb-2", children: "Hotele & Resorte" }),
                /* @__PURE__ */ jsx("p", { className: "text-gray-600", children: "Akomodime të përzgjedhura me vlerësime të larta, të kombinuara me bileta avioni." })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-4", children: [
              /* @__PURE__ */ jsx("div", { className: "p-2 bg-blue-100 rounded-lg", children: /* @__PURE__ */ jsx(CheckCircle, { className: "w-6 h-6 text-blue-600" }) }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("h3", { className: "font-semibold mb-2", children: "Viza & Siguracione Udhëtimi" }),
                /* @__PURE__ */ jsx("p", { className: "text-gray-600", children: "Asistencë për dokumentacionin e nevojshëm për udhëtim dhe bileta avioni." })
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("section", { className: "bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-8", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-gray-900 mb-6", children: "Na Kontaktoni për Bileta Avioni" }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-8", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h3", { className: "font-semibold mb-4", children: "Zyra në Tiranë - Bileta Avioni" }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-2 text-gray-600", children: [
                /* @__PURE__ */ jsxs("p", { className: "flex items-start", children: [
                  /* @__PURE__ */ jsx(MapPin, { className: "w-5 h-5 text-blue-600 mr-2 flex-shrink-0" }),
                  /* @__PURE__ */ jsx("span", { children: "Tek kryqëzimi i Rrugës Muhamet Gjollesha me Myslym Shyrin, Tiranë" })
                ] }),
                /* @__PURE__ */ jsxs("p", { className: "flex items-center", children: [
                  /* @__PURE__ */ jsx(Clock, { className: "w-5 h-5 text-blue-600 mr-2" }),
                  /* @__PURE__ */ jsx("span", { children: "E Hënë - E Shtunë: 09:00 - 19:00" })
                ] }),
                /* @__PURE__ */ jsxs("p", { className: "flex items-center", children: [
                  /* @__PURE__ */ jsx(Plane, { className: "w-5 h-5 text-blue-600 mr-2" }),
                  /* @__PURE__ */ jsx("span", { children: "Tel: +355 694 767 427" })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h3", { className: "font-semibold mb-4", children: "Zyra në Durrës - Bileta Avioni" }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-2 text-gray-600", children: [
                /* @__PURE__ */ jsxs("p", { className: "flex items-start", children: [
                  /* @__PURE__ */ jsx(MapPin, { className: "w-5 h-5 text-blue-600 mr-2 flex-shrink-0" }),
                  /* @__PURE__ */ jsx("span", { children: "Rruga Aleksander Goga, Përballë Shkollës Eftali Koci, Durrës" })
                ] }),
                /* @__PURE__ */ jsxs("p", { className: "flex items-center", children: [
                  /* @__PURE__ */ jsx(Clock, { className: "w-5 h-5 text-blue-600 mr-2" }),
                  /* @__PURE__ */ jsx("span", { children: "E Hënë - E Shtunë: 09:00 - 19:00" })
                ] }),
                /* @__PURE__ */ jsxs("p", { className: "flex items-center", children: [
                  /* @__PURE__ */ jsx(Plane, { className: "w-5 h-5 text-blue-600 mr-2" }),
                  /* @__PURE__ */ jsx("span", { children: "Tel: +355 699 868 907" })
                ] })
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("section", { className: "mt-12", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-gray-900 mb-6", children: "Pyetje të Shpeshta për Bileta Avioni" }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg border border-gray-200 p-5", children: [
              /* @__PURE__ */ jsx("h3", { className: "font-semibold text-gray-900 mb-2", children: "Kur është koha më e mirë për të rezervuar bileta avioni?" }),
              /* @__PURE__ */ jsx("p", { className: "text-gray-600", children: "Rekomandojmë rezervimin e biletave të avionit 2-3 muaj përpara udhëtimit për çmimet më të mira. Për sezonin e lartë (verë, festat e fundvitit), është mirë të rezervoni 4-6 muaj përpara." })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg border border-gray-200 p-5", children: [
              /* @__PURE__ */ jsx("h3", { className: "font-semibold text-gray-900 mb-2", children: "A mund të anuloj ose ndryshoj biletën time të avionit?" }),
              /* @__PURE__ */ jsx("p", { className: "text-gray-600", children: "Mundësia për anulim ose ndryshim varet nga kushtet e biletës së avionit. Disa bileta lejojnë ndryshime me një tarifë shtesë, ndërsa të tjera mund të jenë jo të rimbursueshme. Kontaktoni agjentët tanë për asistencë të personalizuar." })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg border border-gray-200 p-5", children: [
              /* @__PURE__ */ jsx("h3", { className: "font-semibold text-gray-900 mb-2", children: "Si mund të gjej bileta avioni me çmimet më të mira?" }),
              /* @__PURE__ */ jsx("p", { className: "text-gray-600", children: "Për të gjetur bileta avioni me çmimet më të mira, rekomandojmë të jeni fleksibël me datat, të rezervoni herët, të përdorni platformën tonë online për të krahasuar çmimet, ose të kontaktoni direkt me agjentët tanë që mund t'ju ofrojnë oferta ekskluzive." })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg border border-gray-200 p-5", children: [
              /* @__PURE__ */ jsx("h3", { className: "font-semibold text-gray-900 mb-2", children: "A ofron Hima Travel garanci çmimi për bileta avioni?" }),
              /* @__PURE__ */ jsx("p", { className: "text-gray-600", children: "Po, Hima Travel ofron garanci çmimi për bileta avioni. Nëse gjeni të njëjtin fluturim me çmim më të ulët brenda 24 orëve pas rezervimit, ne do të rimbursojmë diferencën." })
            ] })
          ] })
        ] })
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsx(GlobalFooter, {})
  ] });
}
function CareersPage() {
  const handleApply = () => {
    const subject = encodeURIComponent("Aplikim për Punë - Hima Travel");
    const body = encodeURIComponent("Përshëndetje,\n\nPo aplikoj për pozicionin...");
    window.location.href = `mailto:kontakt@himatravel.com?subject=${subject}&body=${body}`;
  };
  const jobPostingSchema = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: "Këshilltar/e Udhëtimesh & Rezervimesh Bileta Avioni",
    description: "Kërkojmë një këshilltar/e udhëtimesh me përvojë në shitjen e biletave të avionit dhe paketave turistike. Duhet të keni njohuri të mira të gjuhëve të huaja dhe aftësi të shkëlqyera komunikuese.",
    datePosted: (/* @__PURE__ */ new Date()).toISOString(),
    validThrough: new Date((/* @__PURE__ */ new Date()).setMonth((/* @__PURE__ */ new Date()).getMonth() + 3)).toISOString(),
    employmentType: "FULL_TIME",
    hiringOrganization: {
      "@type": "Organization",
      name: "Hima Travel",
      sameAs: "https://himatravel.com",
      logo: "https://himatravel.com/wp-content/uploads/2020/11/logo-768x277.png"
    },
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Rr.Myslym Shyri, Kryeqzimi me Muhamet Gjolleshen",
        addressLocality: "Tiranë",
        addressRegion: "Tiranë",
        postalCode: "1001",
        addressCountry: "AL"
      }
    },
    baseSalary: {
      "@type": "MonetaryAmount",
      currency: "EUR",
      value: {
        "@type": "QuantitativeValue",
        minValue: 400,
        maxValue: 800,
        unitText: "MONTH"
      }
    },
    skills: "Bileta avioni, Rezervime hotelesh, Paketa turistike, Komunikim, Shitje"
  };
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-gray-50", children: [
    /* @__PURE__ */ jsx(
      SEOHead,
      {
        title: "Mundësi Karriere | Bileta Avioni | Hima Travel | Punë në Turizëm",
        description: "Zbuloni mundësitë e karrierës në Hima Travel. Bashkohuni me ekipin tonë të specializuar në bileta avioni dhe shërbime turistike. Apliko tani për pozicione në shitje, marketing dhe rezervime.",
        canonicalUrl: "/careers",
        schema: jobPostingSchema,
        keywords: [
          "bileta avioni",
          "punë në turizëm",
          "karrierë hima travel",
          "punë agjenci udhëtimi",
          "këshilltar udhëtimi",
          "specialist bileta avioni",
          "punë në tiranë",
          "punë në agjenci turistike",
          "punë në rezervime",
          "punë në shitje bileta avioni"
        ],
        language: "sq"
      }
    ),
    /* @__PURE__ */ jsx(Navbar, {}),
    /* @__PURE__ */ jsxs("main", { children: [
      /* @__PURE__ */ jsxs("div", { className: "relative bg-blue-600 text-white py-16 md:py-24", children: [
        /* @__PURE__ */ jsxs("div", { className: "absolute inset-0 overflow-hidden", children: [
          /* @__PURE__ */ jsx(
            "img",
            {
              src: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&q=80",
              alt: "Travel background",
              className: "w-full h-full object-cover opacity-20"
            }
          ),
          /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-800 mix-blend-multiply" })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "relative container mx-auto px-4", children: /* @__PURE__ */ jsxs("div", { className: "max-w-3xl", children: [
          /* @__PURE__ */ jsx("h1", { className: "text-4xl md:text-5xl font-bold mb-6", children: "Bashkohu me Hima Travel – Ekspertët e Biletave të Avionit" }),
          /* @__PURE__ */ jsx("p", { className: "text-xl text-blue-100 mb-8", children: "Je pasionant për udhëtimet dhe ke përvojë në shitjen e biletave të avionit? Kërkojmë njerëz me eksperiencë, energji dhe kreativitet për t'u bërë pjesë e ekipit tonë!" }),
          /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: handleApply,
              className: "inline-flex items-center px-6 py-3 bg-white text-blue-600 rounded-lg \n                  font-semibold hover:bg-blue-50 transition-colors duration-200 transform hover:scale-105",
              children: [
                /* @__PURE__ */ jsx(Plane, { className: "w-5 h-5 mr-2" }),
                "Apliko Tani"
              ]
            }
          )
        ] }) })
      ] }),
      /* @__PURE__ */ jsx("section", { className: "py-16 bg-white", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "text-center mb-12", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold text-gray-900 mb-4", children: "Në Hima Travel, nuk është vetëm punë – është një eksperiencë!" }),
          /* @__PURE__ */ jsx("p", { className: "text-lg text-gray-600 max-w-3xl mx-auto", children: "Bëhu pjesë e një ekipi që ofron shërbimin më të mirë për bileta avioni dhe paketa turistike në Shqipëri." })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 lg:grid-cols-4 gap-8", children: [
          /* @__PURE__ */ jsxs("div", { className: "bg-blue-50 rounded-xl p-6 transform hover:-translate-y-1 transition-transform duration-200", children: [
            /* @__PURE__ */ jsx(Globe, { className: "w-12 h-12 text-blue-600 mb-4" }),
            /* @__PURE__ */ jsx("h3", { className: "text-xl font-semibold text-gray-900 mb-2", children: "Agjenci e Njohur" }),
            /* @__PURE__ */ jsx("p", { className: "text-gray-600", children: "Jemi një nga agjencitë më të njohura në Shqipëri për bileta avioni që nga viti 2011" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "bg-blue-50 rounded-xl p-6 transform hover:-translate-y-1 transition-transform duration-200", children: [
            /* @__PURE__ */ jsx(Users, { className: "w-12 h-12 text-blue-600 mb-4" }),
            /* @__PURE__ */ jsx("h3", { className: "text-xl font-semibold text-gray-900 mb-2", children: "Ambient Dinamik" }),
            /* @__PURE__ */ jsx("p", { className: "text-gray-600", children: "Ambienti ynë është dinamik, kreativ dhe me mundësi zhvillimi në fushën e biletave të avionit" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "bg-blue-50 rounded-xl p-6 transform hover:-translate-y-1 transition-transform duration-200", children: [
            /* @__PURE__ */ jsx(Briefcase, { className: "w-12 h-12 text-blue-600 mb-4" }),
            /* @__PURE__ */ jsx("h3", { className: "text-xl font-semibold text-gray-900 mb-2", children: "Ekspertë Biletash Avioni" }),
            /* @__PURE__ */ jsx("p", { className: "text-gray-600", children: "Puno me ekspertët më të mirë të biletave të avionit dhe udhëto në destinacionet më të njohura" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "bg-blue-50 rounded-xl p-6 transform hover:-translate-y-1 transition-transform duration-200", children: [
            /* @__PURE__ */ jsx(Calculator, { className: "w-12 h-12 text-blue-600 mb-4" }),
            /* @__PURE__ */ jsx("h3", { className: "text-xl font-semibold text-gray-900 mb-2", children: "Pagë Konkurruese" }),
            /* @__PURE__ */ jsx("p", { className: "text-gray-600", children: "Pagë e konkurrueshme & bonuse për performancën në shitjen e biletave të avionit" })
          ] })
        ] })
      ] }) }),
      /* @__PURE__ */ jsx("section", { className: "py-16 bg-gray-50", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold text-gray-900 mb-12 text-center", children: "Pozicionet e Hapura për Bileta Avioni" }),
        /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-8 max-w-5xl mx-auto", children: [
          /* @__PURE__ */ jsx("div", { className: "bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow", children: /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-4", children: [
            /* @__PURE__ */ jsx("div", { className: "p-3 bg-blue-100 rounded-lg", children: /* @__PURE__ */ jsx(Briefcase, { className: "w-6 h-6 text-blue-600" }) }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h3", { className: "text-xl font-semibold text-gray-900 mb-2", children: "Këshilltar/e Biletash Avioni & Rezervimesh" }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-2 text-gray-600 mb-4", children: [
                /* @__PURE__ */ jsx("p", { children: "• Eksperiencë në shitjen e biletave të avionit dhe paketave turistike" }),
                /* @__PURE__ */ jsx("p", { children: "• Njohuri të gjuhëve të huaja (anglisht, italisht)" }),
                /* @__PURE__ */ jsx("p", { children: "• Aftësi të shkëlqyera komunikuese dhe shitëse" }),
                /* @__PURE__ */ jsx("p", { children: "• Njohuri të sistemeve të rezervimit të biletave të avionit" })
              ] }),
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: handleApply,
                  className: "text-blue-600 font-medium hover:text-blue-800",
                  children: "Apliko për këtë pozicion →"
                }
              )
            ] })
          ] }) }),
          /* @__PURE__ */ jsx("div", { className: "bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow", children: /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-4", children: [
            /* @__PURE__ */ jsx("div", { className: "p-3 bg-blue-100 rounded-lg", children: /* @__PURE__ */ jsx(Award, { className: "w-6 h-6 text-blue-600" }) }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h3", { className: "text-xl font-semibold text-gray-900 mb-2", children: "Specialist Marketingu për Bileta Avioni" }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-2 text-gray-600 mb-4", children: [
                /* @__PURE__ */ jsx("p", { children: "• Eksperiencë në menaxhimin e fushatave për bileta avioni" }),
                /* @__PURE__ */ jsx("p", { children: "• Aftësi për të krijuar përmbajtje vizuale për oferta fluturimesh" }),
                /* @__PURE__ */ jsx("p", { children: "• Njohuri të Facebook, Instagram dhe Google Ads" }),
                /* @__PURE__ */ jsx("p", { children: "• Eksperiencë në SEO për faqe biletash avioni" })
              ] }),
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: handleApply,
                  className: "text-blue-600 font-medium hover:text-blue-800",
                  children: "Apliko për këtë pozicion →"
                }
              )
            ] })
          ] }) }),
          /* @__PURE__ */ jsx("div", { className: "bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow", children: /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-4", children: [
            /* @__PURE__ */ jsx("div", { className: "p-3 bg-blue-100 rounded-lg", children: /* @__PURE__ */ jsx(Calculator, { className: "w-6 h-6 text-blue-600" }) }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h3", { className: "text-xl font-semibold text-gray-900 mb-2", children: "Specialist Finance për Bileta Avioni" }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-2 text-gray-600 mb-4", children: [
                /* @__PURE__ */ jsx("p", { children: "• Menaxhimi i detyrave financiare për shitjen e biletave të avionit" }),
                /* @__PURE__ */ jsx("p", { children: "• Kontroll i detajuar në CRM dhe sistemet e rezervimit" }),
                /* @__PURE__ */ jsx("p", { children: "• Monitorimi i arkës dhe transaksioneve të biletave" }),
                /* @__PURE__ */ jsx("p", { children: "• Eksperiencë në kontabilitet dhe financa" })
              ] }),
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: handleApply,
                  className: "text-blue-600 font-medium hover:text-blue-800",
                  children: "Apliko për këtë pozicion →"
                }
              )
            ] })
          ] }) }),
          /* @__PURE__ */ jsx("div", { className: "bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-sm p-6 text-white", children: /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-4", children: [
            /* @__PURE__ */ jsx("div", { className: "p-3 bg-white/20 rounded-lg backdrop-blur-sm", children: /* @__PURE__ */ jsx(Plane, { className: "w-6 h-6 text-white" }) }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h3", { className: "text-xl font-semibold mb-2", children: "Apliko për Pozicion në Bileta Avioni" }),
              /* @__PURE__ */ jsx("p", { className: "text-blue-100 mb-4", children: "Nuk gjeni pozicionin e duhur? Na tregoni për aftësitë tuaja dhe se si mund të kontribuoni në suksesin e shitjes së biletave të avionit." }),
              /* @__PURE__ */ jsxs(
                "button",
                {
                  onClick: handleApply,
                  className: "inline-flex items-center px-4 py-2 bg-white text-blue-600 rounded-lg \n                        font-medium hover:bg-blue-50 transition-colors",
                  children: [
                    /* @__PURE__ */ jsx(Plane, { className: "w-4 h-4 mr-2" }),
                    "Dërgo Aplikimin"
                  ]
                }
              )
            ] })
          ] }) })
        ] })
      ] }) }),
      /* @__PURE__ */ jsx("section", { className: "py-16 bg-white", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold text-gray-900 mb-12 text-center", children: "Përfitimet e Punës me Bileta Avioni" }),
        /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-3 gap-8 max-w-5xl mx-auto", children: [
          /* @__PURE__ */ jsxs("div", { className: "bg-blue-50 rounded-xl p-6", children: [
            /* @__PURE__ */ jsx("div", { className: "w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4", children: /* @__PURE__ */ jsx(Plane, { className: "w-6 h-6 text-blue-600" }) }),
            /* @__PURE__ */ jsx("h3", { className: "text-xl font-semibold text-gray-900 mb-2", children: "Udhëtime me Çmime Speciale" }),
            /* @__PURE__ */ jsx("p", { className: "text-gray-600", children: "Stafi ynë përfiton çmime speciale për bileta avioni dhe paketa turistike për vete dhe familjarët." })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "bg-blue-50 rounded-xl p-6", children: [
            /* @__PURE__ */ jsx("div", { className: "w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4", children: /* @__PURE__ */ jsx(Users, { className: "w-6 h-6 text-blue-600" }) }),
            /* @__PURE__ */ jsx("h3", { className: "text-xl font-semibold text-gray-900 mb-2", children: "Trajnime Profesionale" }),
            /* @__PURE__ */ jsx("p", { className: "text-gray-600", children: "Ofrojmë trajnime të vazhdueshme për sistemet e rezervimit të biletave të avionit dhe teknikat e shitjes." })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "bg-blue-50 rounded-xl p-6", children: [
            /* @__PURE__ */ jsx("div", { className: "w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4", children: /* @__PURE__ */ jsx(Award, { className: "w-6 h-6 text-blue-600" }) }),
            /* @__PURE__ */ jsx("h3", { className: "text-xl font-semibold text-gray-900 mb-2", children: "Bonuse Bazuar në Performancë" }),
            /* @__PURE__ */ jsx("p", { className: "text-gray-600", children: "Sistem bonusesh bazuar në shitjet e biletave të avionit dhe kënaqësinë e klientëve." })
          ] })
        ] })
      ] }) }),
      /* @__PURE__ */ jsx("section", { className: "py-16 bg-gray-50", children: /* @__PURE__ */ jsx("div", { className: "container mx-auto px-4", children: /* @__PURE__ */ jsxs("div", { className: "max-w-3xl mx-auto text-center", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold text-gray-900 mb-8", children: "Si të Aplikosh për Bileta Avioni?" }),
        /* @__PURE__ */ jsxs("div", { className: "bg-blue-50 rounded-xl p-8 mb-8", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-xl font-semibold text-gray-900 mb-4", children: "Dërgo CV dhe Letër Motivimi" }),
          /* @__PURE__ */ jsx("div", { className: "flex justify-center mb-6", children: /* @__PURE__ */ jsxs(
            "a",
            {
              href: "mailto:kontakt@himatravel.com",
              className: "inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg \n                      font-semibold hover:bg-blue-700 transition-colors",
              children: [
                /* @__PURE__ */ jsx(Mail, { className: "w-5 h-5 mr-2" }),
                "kontakt@himatravel.com"
              ]
            }
          ) }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-600", children: "Ose na vizito në zyrat tona për një bisedë të lirë rreth mundësive në fushën e biletave të avionit!" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-6", children: [
          /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-xl p-6 shadow-sm", children: [
            /* @__PURE__ */ jsx("h4", { className: "font-semibold text-gray-900 mb-2", children: "Zyra në Tiranë" }),
            /* @__PURE__ */ jsx("p", { className: "text-gray-600", children: "Kryqëzimi i Rrugës Muhamet Gjollesha me Myslym Shyrin" }),
            /* @__PURE__ */ jsxs("p", { className: "text-blue-600 mt-2", children: [
              /* @__PURE__ */ jsx(Phone, { className: "w-4 h-4 inline mr-1" }),
              " +355 694 767 427"
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-xl p-6 shadow-sm", children: [
            /* @__PURE__ */ jsx("h4", { className: "font-semibold text-gray-900 mb-2", children: "Zyra në Durrës" }),
            /* @__PURE__ */ jsx("p", { className: "text-gray-600", children: "Rruga Aleksandër Goga, përballë Shkollës Eftali Koçi" }),
            /* @__PURE__ */ jsxs("p", { className: "text-blue-600 mt-2", children: [
              /* @__PURE__ */ jsx(Phone, { className: "w-4 h-4 inline mr-1" }),
              " +355 699 868 907"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "mt-12", children: /* @__PURE__ */ jsx("p", { className: "text-xl text-blue-600 font-medium", children: "Nëse je gati për një karrierë në fushën e biletave të avionit, Hima Travel është vendi i duhur për ty! 🚀" }) })
      ] }) }) }),
      /* @__PURE__ */ jsx("section", { className: "py-16 bg-white", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 max-w-4xl", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold text-gray-900 mb-12 text-center", children: "Pyetje të Shpeshta për Karrierën në Bileta Avioni" }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsx("div", { className: "border border-gray-200 rounded-lg overflow-hidden", children: /* @__PURE__ */ jsxs("details", { className: "group", children: [
            /* @__PURE__ */ jsxs("summary", { className: "flex justify-between items-center p-4 cursor-pointer bg-white hover:bg-gray-50", children: [
              /* @__PURE__ */ jsx("h3", { className: "text-lg font-medium text-gray-900", children: "Çfarë kualifikimesh nevojiten për të punuar me bileta avioni?" }),
              /* @__PURE__ */ jsx(ChevronDown, { className: "w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform" })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "p-4 bg-gray-50", children: /* @__PURE__ */ jsx("p", { className: "text-gray-600", children: "Për të punuar me bileta avioni, zakonisht kërkohet një diplomë në turizëm ose fushë të ngjashme, njohuri të sistemeve të rezervimit (Amadeus, Sabre, etj.), aftësi të mira komunikimi dhe njohuri të gjuhëve të huaja. Eksperienca e mëparshme në agjenci udhëtimi është një avantazh i madh." }) })
          ] }) }),
          /* @__PURE__ */ jsx("div", { className: "border border-gray-200 rounded-lg overflow-hidden", children: /* @__PURE__ */ jsxs("details", { className: "group", children: [
            /* @__PURE__ */ jsxs("summary", { className: "flex justify-between items-center p-4 cursor-pointer bg-white hover:bg-gray-50", children: [
              /* @__PURE__ */ jsx("h3", { className: "text-lg font-medium text-gray-900", children: "A ofron Hima Travel trajnime për sistemet e rezervimit të biletave?" }),
              /* @__PURE__ */ jsx(ChevronDown, { className: "w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform" })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "p-4 bg-gray-50", children: /* @__PURE__ */ jsx("p", { className: "text-gray-600", children: "Po, Hima Travel ofron trajnime të plota për të gjitha sistemet e rezervimit të biletave të avionit që përdorim. Edhe nëse nuk keni përvojë të mëparshme me këto sisteme, por keni aftësi të mira dhe dëshirë për të mësuar, ne do t'ju trajnojmë plotësisht." }) })
          ] }) }),
          /* @__PURE__ */ jsx("div", { className: "border border-gray-200 rounded-lg overflow-hidden", children: /* @__PURE__ */ jsxs("details", { className: "group", children: [
            /* @__PURE__ */ jsxs("summary", { className: "flex justify-between items-center p-4 cursor-pointer bg-white hover:bg-gray-50", children: [
              /* @__PURE__ */ jsx("h3", { className: "text-lg font-medium text-gray-900", children: "Si funksionon sistemi i bonuseve për shitjen e biletave të avionit?" }),
              /* @__PURE__ */ jsx(ChevronDown, { className: "w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform" })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "p-4 bg-gray-50", children: /* @__PURE__ */ jsx("p", { className: "text-gray-600", children: "Sistemi ynë i bonuseve bazohet në numrin e biletave të avionit të shitura dhe vlerën e tyre. Çdo punonjës ka objektiva mujore dhe për çdo biletë mbi objektivin, fiton një bonus shtesë. Gjithashtu, kemi bonuse speciale për shitjen e biletave në destinacione të caktuara ose gjatë periudhave të pikut." }) })
          ] }) }),
          /* @__PURE__ */ jsx("div", { className: "border border-gray-200 rounded-lg overflow-hidden", children: /* @__PURE__ */ jsxs("details", { className: "group", children: [
            /* @__PURE__ */ jsxs("summary", { className: "flex justify-between items-center p-4 cursor-pointer bg-white hover:bg-gray-50", children: [
              /* @__PURE__ */ jsx("h3", { className: "text-lg font-medium text-gray-900", children: "A mund të aplikoj nëse nuk kam përvojë në shitjen e biletave të avionit?" }),
              /* @__PURE__ */ jsx(ChevronDown, { className: "w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform" })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "p-4 bg-gray-50", children: /* @__PURE__ */ jsx("p", { className: "text-gray-600", children: "Ndërsa përvoja në shitjen e biletave të avionit është e preferuar, ne shpesh pranojmë kandidatë pa përvojë specifike nëse kanë aftësi të forta komunikimi, njohuri të gjuhëve të huaja dhe pasion për industrinë e udhëtimit. Ofrojmë trajnime të plota për të gjithë punonjësit e rinj." }) })
          ] }) })
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ jsx(GlobalFooter, {})
  ] });
}
function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    var _a2;
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const { data, error: signInError } = await supabase$1.auth.signInWithPassword({
        email: email.toLowerCase().trim(),
        password: password.trim()
      });
      if (signInError) {
        throw new Error("Invalid email or password");
      }
      if (!data.user) {
        throw new Error("Authentication failed");
      }
      if (data.user.email !== "admin@example.com") {
        await supabase$1.auth.signOut();
        throw new Error("Unauthorized access");
      }
      const { data: userData, error: userError } = await supabase$1.auth.getUser();
      if (userError || !userData.user) {
        throw new Error("Failed to verify admin status");
      }
      const isAdmin = ((_a2 = userData.user.user_metadata) == null ? void 0 : _a2.role) === "admin";
      if (!isAdmin) {
        await supabase$1.auth.signOut();
        throw new Error("Unauthorized access");
      }
      navigate("/admin");
    } catch (err) {
      console.error("Login error:", err);
      setError(err instanceof Error ? err.message : "An error occurred during login");
      await supabase$1.auth.signOut();
    } finally {
      setLoading(false);
    }
  };
  return /* @__PURE__ */ jsx("div", { className: "min-h-screen bg-gray-50 flex items-center justify-center p-4", children: /* @__PURE__ */ jsx("div", { className: "max-w-md w-full", children: /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg shadow-md p-8", children: [
    /* @__PURE__ */ jsx("div", { className: "flex justify-center mb-8", children: /* @__PURE__ */ jsx("div", { className: "bg-blue-100 p-3 rounded-full", children: /* @__PURE__ */ jsx(Lock, { className: "w-8 h-8 text-blue-600" }) }) }),
    /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold text-center text-gray-900 mb-8", children: "Admin Login" }),
    error && /* @__PURE__ */ jsx("div", { className: "mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg", children: error }),
    /* @__PURE__ */ jsxs("form", { onSubmit: handleLogin, className: "space-y-6", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Email" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "email",
            value: email,
            onChange: (e) => setEmail(e.target.value),
            className: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500",
            required: true
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Password" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "password",
            value: password,
            onChange: (e) => setPassword(e.target.value),
            className: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500",
            required: true
          }
        )
      ] }),
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "submit",
          disabled: loading,
          className: `w-full py-3 rounded-lg font-semibold text-white ${loading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}`,
          children: loading ? "Please wait..." : "Sign In"
        }
      )
    ] })
  ] }) }) });
}
const ITEMS_PER_PAGE = 10;
function AdminClientSearches() {
  const [searches, setSearches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [lastCursor, setLastCursor] = useState(null);
  const [cursors, setCursors] = useState({});
  const navigate = useNavigate();
  const fetchTotalCount = useCallback(async () => {
    const { data, error: error2 } = await supabase$1.from("saved_searches_stats").select("total_count").single();
    if (error2) {
      console.error("Error fetching total count:", error2);
      return 0;
    }
    return (data == null ? void 0 : data.total_count) || 0;
  }, []);
  const fetchSearches = useCallback(async (cursor) => {
    try {
      setLoading(true);
      setError(null);
      const totalCount2 = await fetchTotalCount();
      setTotalCount(totalCount2);
      let query = supabase$1.from("saved_searches").select(`
          batch_id,
          user_id,
          search_params,
          price_stability_level,
          cached_until,
          created_at
        `).order("created_at", { ascending: false }).limit(ITEMS_PER_PAGE);
      if (cursor) {
        query = query.lt("created_at", cursor);
      }
      const { data, error: error2 } = await query;
      if (error2) throw error2;
      if (data && data.length > 0) {
        setSearches(data);
        const newCursor = data[data.length - 1].created_at;
        setLastCursor(newCursor);
        setCursors((prev) => ({ ...prev, [currentPage]: newCursor }));
      }
    } catch (err) {
      console.error("Error fetching searches:", err);
      setError("Failed to load searches. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [currentPage, fetchTotalCount]);
  useEffect(() => {
    const cursor = cursors[currentPage - 1];
    fetchSearches(cursor);
  }, [currentPage, fetchSearches]);
  const handlePageChange = useCallback((page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  }, []);
  const handleRetry = useCallback(() => {
    const cursor = cursors[currentPage - 1];
    fetchSearches(cursor);
  }, [currentPage, fetchSearches]);
  const getStabilityColor = useCallback((level) => {
    switch (level) {
      case "HIGH":
        return "bg-green-100 text-green-800";
      case "MEDIUM":
        return "bg-yellow-100 text-yellow-800";
      case "LOW":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  }, []);
  const handleViewResults = useCallback((batchId) => {
    navigate(`/results?batch_id=${batchId}`);
  }, [navigate]);
  const formatUserId = useCallback((userId) => {
    if (!userId) return "Anonymous";
    return `${userId.slice(0, 8)}...`;
  }, []);
  const formatDate = useCallback((dateString) => {
    if (!dateString) return "N/A";
    try {
      return format(parseISO(dateString), "dd MMM yyyy");
    } catch (err) {
      console.error("Error formatting date:", err);
      return "Invalid Date";
    }
  }, []);
  const formatDateTime = useCallback((dateString) => {
    if (!dateString) return "N/A";
    try {
      return format(parseISO(dateString), "dd MMM yyyy HH:mm");
    } catch (err) {
      console.error("Error formatting datetime:", err);
      return "Invalid Date";
    }
  }, []);
  const Pagination = useMemo(() => {
    const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);
    return /* @__PURE__ */ jsxs("div", { className: "px-6 py-4 flex items-center justify-between border-t border-gray-200", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex-1 flex justify-between sm:hidden", children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => handlePageChange(currentPage - 1),
            disabled: currentPage === 1,
            className: `relative inline-flex items-center px-4 py-2 text-sm font-medium rounded-md ${currentPage === 1 ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "bg-white text-gray-700 hover:bg-gray-50"}`,
            children: "Previous"
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => handlePageChange(currentPage + 1),
            disabled: currentPage === totalPages,
            className: `relative inline-flex items-center px-4 py-2 text-sm font-medium rounded-md ${currentPage === totalPages ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "bg-white text-gray-700 hover:bg-gray-50"}`,
            children: "Next"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "hidden sm:flex-1 sm:flex sm:items-center sm:justify-between", children: [
        /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-700", children: [
          "Showing",
          " ",
          /* @__PURE__ */ jsx("span", { className: "font-medium", children: Math.min((currentPage - 1) * ITEMS_PER_PAGE + 1, totalCount) }),
          " ",
          "to",
          " ",
          /* @__PURE__ */ jsx("span", { className: "font-medium", children: Math.min(currentPage * ITEMS_PER_PAGE, totalCount) }),
          " ",
          "of ",
          /* @__PURE__ */ jsx("span", { className: "font-medium", children: totalCount }),
          " results"
        ] }) }),
        /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs("nav", { className: "relative z-0 inline-flex rounded-md shadow-sm -space-x-px", children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => handlePageChange(currentPage - 1),
              disabled: currentPage === 1,
              className: `relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 text-sm font-medium ${currentPage === 1 ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "bg-white text-gray-500 hover:bg-gray-50"}`,
              children: /* @__PURE__ */ jsx(ChevronLeft, { className: "h-5 w-5" })
            }
          ),
          Array.from({ length: Math.min(5, totalPages) }).map((_, index) => {
            let pageNum;
            if (totalPages <= 5) {
              pageNum = index + 1;
            } else if (currentPage <= 3) {
              pageNum = index + 1;
            } else if (currentPage >= totalPages - 2) {
              pageNum = totalPages - 4 + index;
            } else {
              pageNum = currentPage - 2 + index;
            }
            return /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => handlePageChange(pageNum),
                className: `relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium ${currentPage === pageNum ? "z-10 bg-blue-50 border-blue-500 text-blue-600" : "bg-white text-gray-500 hover:bg-gray-50"}`,
                children: pageNum
              },
              pageNum
            );
          }),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => handlePageChange(currentPage + 1),
              disabled: currentPage === totalPages,
              className: `relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 text-sm font-medium ${currentPage === totalPages ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "bg-white text-gray-500 hover:bg-gray-50"}`,
              children: /* @__PURE__ */ jsx(ChevronRight, { className: "h-5 w-5" })
            }
          )
        ] }) })
      ] })
    ] });
  }, [currentPage, totalCount, handlePageChange]);
  if (loading) {
    return /* @__PURE__ */ jsxs("div", { className: "min-h-[400px] flex flex-col items-center justify-center p-8", children: [
      /* @__PURE__ */ jsx("div", { className: "relative mb-8", children: /* @__PURE__ */ jsxs("div", { className: "w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center", children: [
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-blue-100 rounded-full animate-ping opacity-75" }),
        /* @__PURE__ */ jsx(Loader2, { className: "w-8 h-8 text-blue-600 animate-spin" })
      ] }) }),
      /* @__PURE__ */ jsx("h3", { className: "text-xl font-semibold text-gray-900 mb-2", children: "Loading searches..." })
    ] });
  }
  if (error) {
    return /* @__PURE__ */ jsx("div", { className: "min-h-[400px] flex flex-col items-center justify-center p-8", children: /* @__PURE__ */ jsxs("div", { className: "bg-red-50 border border-red-200 rounded-lg p-6 text-center max-w-md", children: [
      /* @__PURE__ */ jsx(AlertCircle, { className: "w-12 h-12 text-red-500 mx-auto mb-4" }),
      /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold text-red-700 mb-2", children: "Error Loading Searches" }),
      /* @__PURE__ */ jsx("p", { className: "text-red-600 mb-4", children: error }),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: handleRetry,
          className: "bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors",
          children: "Try Again"
        }
      )
    ] }) });
  }
  return /* @__PURE__ */ jsx("div", { className: "min-h-screen bg-gray-50 p-8", children: /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto", children: /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg shadow-md overflow-hidden", children: [
    /* @__PURE__ */ jsxs("div", { className: "px-6 py-4 border-b border-gray-200 flex justify-between items-center", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold text-gray-800", children: "Client Searches" }),
        /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-600 mt-1", children: [
          "Showing page ",
          currentPage,
          " of ",
          Math.ceil(totalCount / ITEMS_PER_PAGE)
        ] })
      ] }),
      /* @__PURE__ */ jsxs(
        "button",
        {
          onClick: handleRetry,
          className: "inline-flex items-center px-3 py-1 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors",
          children: [
            /* @__PURE__ */ jsx(RefreshCw, { className: "w-4 h-4 mr-1" }),
            "Refresh"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "min-w-full divide-y divide-gray-200", children: [
      /* @__PURE__ */ jsx("thead", { className: "bg-gray-50", children: /* @__PURE__ */ jsxs("tr", { children: [
        /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Route & Date" }),
        /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Search ID" }),
        /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Price Stability" }),
        /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Cache Status" }),
        /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Created At" }),
        /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Actions" })
      ] }) }),
      /* @__PURE__ */ jsx("tbody", { className: "bg-white divide-y divide-gray-200", children: searches.map((search) => /* @__PURE__ */ jsxs("tr", { className: "hover:bg-gray-50", children: [
        /* @__PURE__ */ jsxs("td", { className: "px-6 py-4 whitespace-nowrap", children: [
          /* @__PURE__ */ jsx("div", { className: "flex items-center", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center text-sm text-gray-900", children: [
            /* @__PURE__ */ jsx(MapPin, { className: "w-4 h-4 text-gray-400 mr-1" }),
            search.search_params.fromCode,
            /* @__PURE__ */ jsx(Plane, { className: "w-4 h-4 text-blue-500 mx-2" }),
            search.search_params.toCode
          ] }) }),
          /* @__PURE__ */ jsxs("div", { className: "text-sm text-gray-500 mt-1", children: [
            /* @__PURE__ */ jsx(Calendar, { className: "w-4 h-4 inline mr-1" }),
            formatDate(search.search_params.departureDate),
            search.search_params.returnDate && /* @__PURE__ */ jsxs(Fragment, { children: [
              " → ",
              formatDate(search.search_params.returnDate)
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("td", { className: "px-6 py-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "text-sm text-gray-900 font-mono", children: [
            search.batch_id.substring(0, 8),
            "..."
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "text-sm text-gray-500 flex items-center", children: [
            /* @__PURE__ */ jsx(User, { className: "w-4 h-4 mr-1" }),
            formatUserId(search.user_id)
          ] })
        ] }),
        /* @__PURE__ */ jsx("td", { className: "px-6 py-4", children: /* @__PURE__ */ jsxs("span", { className: `inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStabilityColor(search.price_stability_level)}`, children: [
          /* @__PURE__ */ jsx(Tag, { className: "w-3 h-3 mr-1" }),
          search.price_stability_level
        ] }) }),
        /* @__PURE__ */ jsx("td", { className: "px-6 py-4", children: search.cached_until ? /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("div", { className: "text-sm text-gray-900", children: new Date(search.cached_until) > /* @__PURE__ */ new Date() ? /* @__PURE__ */ jsx("span", { className: "text-green-600", children: "Valid until" }) : /* @__PURE__ */ jsx("span", { className: "text-red-600", children: "Expired at" }) }),
          /* @__PURE__ */ jsxs("div", { className: "text-sm text-gray-500", children: [
            /* @__PURE__ */ jsx(Clock, { className: "w-4 h-4 inline mr-1" }),
            formatDateTime(search.cached_until)
          ] })
        ] }) : /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-500", children: "Not cached" }) }),
        /* @__PURE__ */ jsx("td", { className: "px-6 py-4 text-sm text-gray-500", children: formatDateTime(search.created_at) }),
        /* @__PURE__ */ jsx("td", { className: "px-6 py-4 text-sm text-gray-500", children: /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: () => handleViewResults(search.batch_id),
            className: "inline-flex items-center px-3 py-1 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-colors",
            children: [
              /* @__PURE__ */ jsx(ExternalLink, { className: "w-4 h-4 mr-1" }),
              "View Results"
            ]
          }
        ) })
      ] }, search.batch_id)) })
    ] }) }),
    Pagination
  ] }) }) });
}
function SalesAgentModal({ isOpen, onClose, agent }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    if (agent) {
      setName(agent.name);
      setEmail(agent.email);
      setPhoneNumber(agent.phone_number || "");
      setPassword("");
    } else {
      setName("");
      setEmail("");
      setPhoneNumber("");
      setPassword("");
    }
  }, [agent]);
  if (!isOpen) return null;
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      if (agent) {
        const { error: updateError } = await supabase$1.from("sales_agents").update({
          name,
          phone_number: phoneNumber || null
        }).eq("id", agent.id);
        if (updateError) throw updateError;
      } else {
        const { data: authData, error: authError } = await supabase$1.auth.signUp({
          email,
          password,
          options: {
            data: {
              name,
              phone_number: phoneNumber,
              role: "agent"
            }
          }
        });
        if (authError) throw authError;
        if (!authData.user) throw new Error("Failed to create user");
        const { error: profileError } = await supabase$1.from("sales_agents").insert([
          {
            id: authData.user.id,
            name,
            email,
            phone_number: phoneNumber || null,
            is_active: true
          }
        ]);
        if (profileError) throw profileError;
      }
      onClose(true);
    } catch (err) {
      console.error("Error saving agent:", err);
      setError(err instanceof Error ? err.message : "Failed to save agent");
    } finally {
      setLoading(false);
    }
  };
  return /* @__PURE__ */ jsx("div", { className: "fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4", children: /* @__PURE__ */ jsx("div", { className: "bg-white rounded-xl max-w-md w-full", children: /* @__PURE__ */ jsxs("div", { className: "p-6", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mb-6", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold", children: agent ? "Edit Agent" : "Add New Agent" }),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => onClose(false),
          className: "p-2 hover:bg-gray-100 rounded-full transition-colors",
          children: /* @__PURE__ */ jsx(X, { className: "w-5 h-5" })
        }
      )
    ] }),
    error && /* @__PURE__ */ jsx("div", { className: "mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg", children: error }),
    /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Full Name" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "text",
            value: name,
            onChange: (e) => setName(e.target.value),
            className: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500",
            required: true
          }
        )
      ] }),
      !agent && /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Email" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "email",
              value: email,
              onChange: (e) => setEmail(e.target.value),
              className: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500",
              required: true
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Password" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "password",
              value: password,
              onChange: (e) => setPassword(e.target.value),
              className: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500",
              required: true,
              minLength: 8
            }
          ),
          /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-gray-500", children: "Must be at least 8 characters long" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Phone Number" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "tel",
            value: phoneNumber,
            onChange: (e) => setPhoneNumber(e.target.value),
            className: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          }
        )
      ] }),
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "submit",
          disabled: loading,
          className: `w-full py-3 rounded-lg font-semibold text-white ${loading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}`,
          children: loading ? "Please wait..." : agent ? "Save Changes" : "Add Agent"
        }
      )
    ] })
  ] }) }) });
}
function ChangePasswordModal({ isOpen, onClose, agentId, agentEmail }) {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  if (!isOpen) return null;
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }
    if (newPassword.length < 8) {
      setError("Password must be at least 8 characters long");
      setLoading(false);
      return;
    }
    try {
      const { error: updateError } = await supabase$1.auth.updateUser({
        password: newPassword
      });
      if (updateError) throw updateError;
      setSuccess(true);
      setNewPassword("");
      setConfirmPassword("");
      setTimeout(() => {
        onClose();
      }, 2e3);
    } catch (err) {
      console.error("Error updating password:", err);
      setError("Failed to update password. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  return /* @__PURE__ */ jsx("div", { className: "fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4", children: /* @__PURE__ */ jsx("div", { className: "bg-white rounded-xl max-w-md w-full", children: /* @__PURE__ */ jsxs("div", { className: "p-6", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mb-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
        /* @__PURE__ */ jsx(Key, { className: "w-6 h-6 text-blue-600 mr-2" }),
        /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold", children: "Change Password" })
      ] }),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: onClose,
          className: "p-2 hover:bg-gray-100 rounded-full transition-colors",
          children: /* @__PURE__ */ jsx(X, { className: "w-5 h-5" })
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("p", { className: "text-gray-600 mb-4", children: [
      "Change password for agent: ",
      /* @__PURE__ */ jsx("span", { className: "font-medium", children: agentEmail })
    ] }),
    error && /* @__PURE__ */ jsx("div", { className: "mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg", children: error }),
    success && /* @__PURE__ */ jsx("div", { className: "mb-4 p-3 bg-green-50 border border-green-200 text-green-600 rounded-lg", children: "Password updated successfully!" }),
    /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "New Password" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "password",
            value: newPassword,
            onChange: (e) => setNewPassword(e.target.value),
            className: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500",
            required: true,
            minLength: 8
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Confirm New Password" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "password",
            value: confirmPassword,
            onChange: (e) => setConfirmPassword(e.target.value),
            className: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500",
            required: true,
            minLength: 8
          }
        )
      ] }),
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "submit",
          disabled: loading,
          className: `w-full py-3 rounded-lg font-semibold text-white ${loading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}`,
          children: loading ? "Updating..." : "Update Password"
        }
      )
    ] })
  ] }) }) });
}
function ConfirmDialog({
  isOpen,
  title,
  message,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  confirmVariant = "primary",
  onConfirm,
  onCancel
}) {
  if (!isOpen) return null;
  const confirmButtonClasses = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white",
    danger: "bg-red-600 hover:bg-red-700 text-white"
  };
  return /* @__PURE__ */ jsx("div", { className: "fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4", children: /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg max-w-md w-full p-6", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center mb-4", children: [
      /* @__PURE__ */ jsx("div", { className: "bg-yellow-100 p-2 rounded-full mr-3", children: /* @__PURE__ */ jsx(AlertTriangle, { className: "w-6 h-6 text-yellow-600" }) }),
      /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold text-gray-900", children: title })
    ] }),
    /* @__PURE__ */ jsx("p", { className: "text-gray-600 mb-6", children: message }),
    /* @__PURE__ */ jsxs("div", { className: "flex justify-end space-x-3", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: onCancel,
          className: "px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors",
          children: cancelLabel
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: onConfirm,
          className: `px-4 py-2 rounded-lg transition-colors ${confirmButtonClasses[confirmVariant]}`,
          children: confirmLabel
        }
      )
    ] })
  ] }) });
}
function SalesAgentManagement() {
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [agentToDelete, setAgentToDelete] = useState(null);
  const [agentForPasswordChange, setAgentForPasswordChange] = useState(null);
  useEffect(() => {
    fetchAgents();
  }, []);
  const fetchAgents = async () => {
    try {
      const { data, error: error2 } = await supabase$1.from("sales_agents").select("*").order("created_at", { ascending: false });
      if (error2) throw error2;
      setAgents(data || []);
    } catch (err) {
      setError("Failed to load sales agents");
      console.error("Error fetching agents:", err);
    } finally {
      setLoading(false);
    }
  };
  const handleAddAgent = () => {
    setSelectedAgent(null);
    setIsModalOpen(true);
  };
  const handleEditAgent = (agent) => {
    setSelectedAgent(agent);
    setIsModalOpen(true);
  };
  const handleChangePassword = (agent) => {
    setAgentForPasswordChange(agent);
    setIsPasswordModalOpen(true);
  };
  const handleDeleteAgent = (agent) => {
    setAgentToDelete(agent);
    setIsDeleteDialogOpen(true);
  };
  const confirmDelete = async () => {
    if (!agentToDelete) return;
    try {
      const { error: error2 } = await supabase$1.from("sales_agents").delete().eq("id", agentToDelete.id);
      if (error2) throw error2;
      setAgents(agents.filter((agent) => agent.id !== agentToDelete.id));
      setIsDeleteDialogOpen(false);
      setAgentToDelete(null);
    } catch (err) {
      console.error("Error deleting agent:", err);
      setError("Failed to delete agent");
    }
  };
  const handleToggleStatus = async (agent) => {
    try {
      const { error: error2 } = await supabase$1.from("sales_agents").update({ is_active: !agent.is_active }).eq("id", agent.id);
      if (error2) throw error2;
      setAgents(agents.map(
        (a) => a.id === agent.id ? { ...a, is_active: !agent.is_active } : a
      ));
    } catch (err) {
      console.error("Error toggling agent status:", err);
      setError("Failed to update agent status");
    }
  };
  const handleModalClose = (refreshNeeded) => {
    setIsModalOpen(false);
    if (refreshNeeded) {
      fetchAgents();
    }
  };
  if (loading) {
    return /* @__PURE__ */ jsx("div", { className: "min-h-screen bg-gray-50 p-8", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center", children: [
      /* @__PURE__ */ jsx("div", { className: "animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" }),
      /* @__PURE__ */ jsx("span", { className: "ml-2 text-gray-600", children: "Loading agents..." })
    ] }) });
  }
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-gray-50 p-8", children: [
    /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto", children: /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg shadow-md overflow-hidden", children: [
      /* @__PURE__ */ jsxs("div", { className: "px-6 py-4 border-b border-gray-200 flex justify-between items-center", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
          /* @__PURE__ */ jsx(Users, { className: "w-6 h-6 text-blue-600 mr-2" }),
          /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold text-gray-800", children: "Sales Agents" })
        ] }),
        /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: handleAddAgent,
            className: "flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors",
            children: [
              /* @__PURE__ */ jsx(Plus, { className: "w-5 h-5 mr-2" }),
              "Add Agent"
            ]
          }
        )
      ] }),
      error && /* @__PURE__ */ jsx("div", { className: "m-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-lg", children: error }),
      /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "min-w-full divide-y divide-gray-200", children: [
        /* @__PURE__ */ jsx("thead", { className: "bg-gray-50", children: /* @__PURE__ */ jsxs("tr", { children: [
          /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Name" }),
          /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Email" }),
          /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Phone" }),
          /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Status" }),
          /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Actions" })
        ] }) }),
        /* @__PURE__ */ jsx("tbody", { className: "bg-white divide-y divide-gray-200", children: agents.map((agent) => /* @__PURE__ */ jsxs("tr", { className: "hover:bg-gray-50", children: [
          /* @__PURE__ */ jsx("td", { className: "px-6 py-4 whitespace-nowrap", children: /* @__PURE__ */ jsx("div", { className: "text-sm font-medium text-gray-900", children: agent.name }) }),
          /* @__PURE__ */ jsx("td", { className: "px-6 py-4 whitespace-nowrap", children: /* @__PURE__ */ jsx("div", { className: "text-sm text-gray-500", children: agent.email }) }),
          /* @__PURE__ */ jsx("td", { className: "px-6 py-4 whitespace-nowrap", children: /* @__PURE__ */ jsx("div", { className: "text-sm text-gray-500", children: agent.phone_number || "-" }) }),
          /* @__PURE__ */ jsx("td", { className: "px-6 py-4 whitespace-nowrap", children: /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: () => handleToggleStatus(agent),
              className: `inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${agent.is_active ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`,
              children: [
                agent.is_active ? /* @__PURE__ */ jsx(CheckCircle, { className: "w-4 h-4 mr-1" }) : /* @__PURE__ */ jsx(XCircle, { className: "w-4 h-4 mr-1" }),
                agent.is_active ? "Active" : "Inactive"
              ]
            }
          ) }),
          /* @__PURE__ */ jsx("td", { className: "px-6 py-4 whitespace-nowrap", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-3", children: [
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => handleEditAgent(agent),
                className: "text-blue-600 hover:text-blue-800",
                title: "Edit agent",
                children: /* @__PURE__ */ jsx(Edit2, { className: "w-5 h-5" })
              }
            ),
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => handleChangePassword(agent),
                className: "text-yellow-600 hover:text-yellow-800",
                title: "Change password",
                children: /* @__PURE__ */ jsx(Key, { className: "w-5 h-5" })
              }
            ),
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => handleDeleteAgent(agent),
                className: "text-red-600 hover:text-red-800",
                title: "Delete agent",
                children: /* @__PURE__ */ jsx(Trash2, { className: "w-5 h-5" })
              }
            )
          ] }) })
        ] }, agent.id)) })
      ] }) })
    ] }) }),
    /* @__PURE__ */ jsx(
      SalesAgentModal,
      {
        isOpen: isModalOpen,
        onClose: handleModalClose,
        agent: selectedAgent
      }
    ),
    agentForPasswordChange && /* @__PURE__ */ jsx(
      ChangePasswordModal,
      {
        isOpen: isPasswordModalOpen,
        onClose: () => {
          setIsPasswordModalOpen(false);
          setAgentForPasswordChange(null);
        },
        agentId: agentForPasswordChange.id,
        agentEmail: agentForPasswordChange.email
      }
    ),
    /* @__PURE__ */ jsx(
      ConfirmDialog,
      {
        isOpen: isDeleteDialogOpen,
        title: "Delete Sales Agent",
        message: "Are you sure you want to delete this sales agent? This action cannot be undone.",
        confirmLabel: "Delete",
        confirmVariant: "danger",
        onConfirm: confirmDelete,
        onCancel: () => setIsDeleteDialogOpen(false)
      }
    )
  ] });
}
function CommissionRulesManagement() {
  const [rules, setRules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingRule, setEditingRule] = useState(null);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  useEffect(() => {
    fetchRules();
  }, []);
  const fetchRules = async () => {
    try {
      const { data, error: error2 } = await supabase$1.from("commission_rules").select("*").order("passenger_type");
      if (error2) throw error2;
      setRules(data || []);
    } catch (err) {
      console.error("Error fetching commission rules:", err);
      setError("Failed to load commission rules");
    } finally {
      setLoading(false);
    }
  };
  const handleEdit = (rule) => {
    setEditingRule({ ...rule });
  };
  const handleCancelEdit = () => {
    setEditingRule(null);
    setError(null);
  };
  const handleSave = async () => {
    if (!editingRule) return;
    setSaving(true);
    setError(null);
    setSuccess(false);
    try {
      const { error: updateError } = await supabase$1.from("commission_rules").update({
        rate: editingRule.rate,
        group_discount_rules: editingRule.group_discount_rules
      }).eq("id", editingRule.id);
      if (updateError) throw updateError;
      setSuccess(true);
      setRules(rules.map(
        (rule) => rule.id === editingRule.id ? editingRule : rule
      ));
      setTimeout(() => {
        setEditingRule(null);
        setSuccess(false);
      }, 2e3);
    } catch (err) {
      console.error("Error updating commission rule:", err);
      setError("Failed to update commission rule");
    } finally {
      setSaving(false);
    }
  };
  const formatPassengerType = (type) => {
    return type.split("_").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
  };
  if (loading) {
    return /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center p-8", children: [
      /* @__PURE__ */ jsx("div", { className: "animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" }),
      /* @__PURE__ */ jsx("span", { className: "ml-2 text-gray-600", children: "Loading commission rules..." })
    ] });
  }
  return /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg shadow-md overflow-hidden", children: [
    /* @__PURE__ */ jsxs("div", { className: "px-6 py-4 border-b border-gray-200", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold text-gray-800", children: "Commission Rules" }),
      /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600 mt-1", children: "Manage commission rates and group discount rules" })
    ] }),
    error && /* @__PURE__ */ jsxs("div", { className: "m-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center text-red-700", children: [
      /* @__PURE__ */ jsx(AlertTriangle, { className: "w-5 h-5 mr-2" }),
      error
    ] }),
    success && /* @__PURE__ */ jsx("div", { className: "m-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700", children: "Commission rule updated successfully!" }),
    /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "min-w-full divide-y divide-gray-200", children: [
      /* @__PURE__ */ jsx("thead", { className: "bg-gray-50", children: /* @__PURE__ */ jsxs("tr", { children: [
        /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Passenger Type" }),
        /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Base Rate (EUR)" }),
        /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Group Discounts" }),
        /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Actions" })
      ] }) }),
      /* @__PURE__ */ jsx("tbody", { className: "bg-white divide-y divide-gray-200", children: rules.map((rule) => /* @__PURE__ */ jsxs("tr", { className: "hover:bg-gray-50", children: [
        /* @__PURE__ */ jsx("td", { className: "px-6 py-4 whitespace-nowrap", children: /* @__PURE__ */ jsx("div", { className: "text-sm font-medium text-gray-900", children: formatPassengerType(rule.passenger_type) }) }),
        /* @__PURE__ */ jsx("td", { className: "px-6 py-4 whitespace-nowrap", children: (editingRule == null ? void 0 : editingRule.id) === rule.id ? /* @__PURE__ */ jsx(
          "input",
          {
            type: "number",
            min: "0",
            step: "0.01",
            value: editingRule.rate,
            onChange: (e) => setEditingRule({
              ...editingRule,
              rate: parseFloat(e.target.value)
            }),
            className: "w-24 px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          }
        ) : /* @__PURE__ */ jsx("div", { className: "text-sm text-gray-900", children: rule.rate }) }),
        /* @__PURE__ */ jsx("td", { className: "px-6 py-4", children: rule.group_discount_rules ? /* @__PURE__ */ jsx("div", { className: "text-sm text-gray-600", children: rule.group_discount_rules.thresholds.map((threshold, idx) => /* @__PURE__ */ jsxs("div", { children: [
          threshold.min_count,
          "+ passengers: ",
          threshold.rate,
          "%"
        ] }, idx)) }) : /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-500", children: "No group discounts" }) }),
        /* @__PURE__ */ jsx("td", { className: "px-6 py-4 whitespace-nowrap", children: (editingRule == null ? void 0 : editingRule.id) === rule.id ? /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2", children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: handleSave,
              disabled: saving,
              className: "text-green-600 hover:text-green-800",
              title: "Save changes",
              children: /* @__PURE__ */ jsx(Save, { className: "w-5 h-5" })
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: handleCancelEdit,
              className: "text-gray-600 hover:text-gray-800",
              title: "Cancel",
              children: /* @__PURE__ */ jsx(X, { className: "w-5 h-5" })
            }
          )
        ] }) : /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => handleEdit(rule),
            className: "text-blue-600 hover:text-blue-800",
            title: "Edit rule",
            children: /* @__PURE__ */ jsx(Edit2, { className: "w-5 h-5" })
          }
        ) })
      ] }, rule.id)) })
    ] }) })
  ] });
}
function RoutePopularity() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [routes, setRoutes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMonth, setSelectedMonth] = useState(() => {
    const now = /* @__PURE__ */ new Date();
    return format(now, "yyyy-MM");
  });
  useEffect(() => {
    fetchRouteStats();
  }, [selectedMonth]);
  const fetchRouteStats = async () => {
    try {
      setLoading(true);
      setError(null);
      const { data, error: fetchError } = await supabase$1.from("search_route_tracking").select("*").eq("month", selectedMonth).order("search_count", { ascending: false });
      if (fetchError) throw fetchError;
      const processedRoutes = processRouteData(data || []);
      setRoutes(processedRoutes);
    } catch (err) {
      console.error("Error fetching route stats:", err);
      setError("Failed to load route statistics");
    } finally {
      setLoading(false);
    }
  };
  const processRouteData = (data) => {
    const routeGroups = data.reduce((acc, curr) => {
      const key = `${curr.origin}-${curr.destination}`;
      if (!acc[key]) {
        acc[key] = {
          ...curr,
          top_dates: [{
            date: curr.departure_date,
            count: curr.search_count
          }]
        };
      } else {
        acc[key].search_count += curr.search_count;
        acc[key].top_dates.push({
          date: curr.departure_date,
          count: curr.search_count
        });
        if (new Date(curr.last_search_at) > new Date(acc[key].last_search_at)) {
          acc[key].last_search_at = curr.last_search_at;
        }
      }
      return acc;
    }, {});
    return Object.values(routeGroups).map((route) => ({
      ...route,
      top_dates: route.top_dates.sort((a, b) => b.count - a.count).slice(0, 3)
    }));
  };
  const filteredRoutes = routes.filter((route) => {
    const searchLower = searchTerm.toLowerCase();
    return route.origin.toLowerCase().includes(searchLower) || route.destination.toLowerCase().includes(searchLower);
  });
  const getMonthOptions = () => {
    const options = [];
    const now = /* @__PURE__ */ new Date();
    for (let i = 0; i < 12; i++) {
      const date = new Date(now.getFullYear(), now.getMonth() + i, 1);
      const value = format(date, "yyyy-MM");
      const label = format(date, "MMMM yyyy");
      options.push({ value, label });
    }
    return options;
  };
  if (loading) {
    return /* @__PURE__ */ jsx("div", { className: "min-h-[400px] flex items-center justify-center", children: /* @__PURE__ */ jsx(Loader2, { className: "w-8 h-8 text-blue-600 animate-spin" }) });
  }
  if (error) {
    return /* @__PURE__ */ jsx("div", { className: "bg-red-50 border border-red-200 rounded-lg p-4 text-red-700", children: error });
  }
  return /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg shadow-md overflow-hidden", children: [
    /* @__PURE__ */ jsxs("div", { className: "px-6 py-4 border-b border-gray-200", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold text-gray-800", children: "Route Popularity" }),
      /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600 mt-1", children: "Track the most searched flight routes and popular travel dates" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "p-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row gap-4 mb-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
          /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Search Routes" }),
          /* @__PURE__ */ jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 text-gray-400", size: 20 }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                value: searchTerm,
                onChange: (e) => setSearchTerm(e.target.value),
                placeholder: "Search by airport code...",
                className: "w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "md:w-64", children: [
          /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Month" }),
          /* @__PURE__ */ jsx(
            "select",
            {
              value: selectedMonth,
              onChange: (e) => setSelectedMonth(e.target.value),
              className: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500",
              children: getMonthOptions().map((option) => /* @__PURE__ */ jsx("option", { value: option.value, children: option.label }, option.value))
            }
          )
        ] })
      ] }),
      filteredRoutes.length === 0 ? /* @__PURE__ */ jsxs("div", { className: "text-center py-8", children: [
        /* @__PURE__ */ jsx(Search, { className: "w-12 h-12 text-gray-400 mx-auto mb-3" }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-600", children: "No routes found for the selected criteria" })
      ] }) : /* @__PURE__ */ jsx("div", { className: "grid gap-4", children: filteredRoutes.map((route) => /* @__PURE__ */ jsx(
        "div",
        {
          className: "bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors",
          children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row md:items-center gap-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-lg font-medium", children: [
                /* @__PURE__ */ jsx(Plane, { className: "w-5 h-5 text-blue-600" }),
                /* @__PURE__ */ jsx("span", { children: route.origin }),
                /* @__PURE__ */ jsx(ArrowRight, { className: "w-4 h-4 text-gray-400" }),
                /* @__PURE__ */ jsx("span", { children: route.destination })
              ] }),
              /* @__PURE__ */ jsx("div", { className: "mt-2 flex flex-wrap gap-2", children: route.top_dates.map((date, idx) => /* @__PURE__ */ jsxs(
                "div",
                {
                  className: "inline-flex items-center px-2 py-1 bg-white rounded-md text-sm",
                  children: [
                    /* @__PURE__ */ jsx(Calendar, { className: "w-4 h-4 text-gray-400 mr-1" }),
                    format(new Date(date.date), "dd MMM"),
                    /* @__PURE__ */ jsx("span", { className: "ml-2 px-1.5 py-0.5 bg-blue-100 text-blue-700 rounded", children: date.count })
                  ]
                },
                idx
              )) })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-6 md:gap-8", children: [
              /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
                /* @__PURE__ */ jsx("div", { className: "text-2xl font-bold text-blue-600", children: route.search_count }),
                /* @__PURE__ */ jsx("div", { className: "text-sm text-gray-500", children: "Total Searches" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "text-right", children: [
                /* @__PURE__ */ jsx("div", { className: "text-sm font-medium", children: "Last Search" }),
                /* @__PURE__ */ jsx("div", { className: "text-sm text-gray-500", children: format(new Date(route.last_search_at), "dd MMM HH:mm") })
              ] })
            ] })
          ] })
        },
        route.id
      )) })
    ] })
  ] });
}
const UPDATE_INTERVALS$1 = [
  { value: 3, label: "Every 3 hours" },
  { value: 6, label: "Every 6 hours" },
  { value: 12, label: "Every 12 hours" },
  { value: 24, label: "Every 24 hours" }
];
function UpdateFrequencySettings() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [routes, setRoutes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMonth, setSelectedMonth] = useState(format(/* @__PURE__ */ new Date(), "yyyy-MM"));
  useEffect(() => {
    fetchRouteSettings();
  }, [selectedMonth]);
  const fetchRouteSettings = async () => {
    try {
      setLoading(true);
      setError(null);
      const { data, error: fetchError } = await supabase$1.from("route_demand_tracking").select("*").eq("year_month", selectedMonth).order("search_count", { ascending: false });
      if (fetchError) throw fetchError;
      setRoutes(data || []);
    } catch (err) {
      console.error("Error fetching route settings:", err);
      setError("Failed to load update frequency settings");
    } finally {
      setLoading(false);
    }
  };
  const handleIntervalChange = async (routeId, hours) => {
    try {
      setSaving(true);
      setError(null);
      setSuccess(false);
      const { error: updateError } = await supabase$1.from("route_demand_tracking").update({ update_interval: hours }).eq("id", routeId);
      if (updateError) throw updateError;
      setRoutes(routes.map(
        (route) => route.id === routeId ? { ...route, update_interval: hours } : route
      ));
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3e3);
    } catch (err) {
      console.error("Error updating interval:", err);
      setError("Failed to update interval");
    } finally {
      setSaving(false);
    }
  };
  const handleToggleIgnore = async (routeId, ignored) => {
    try {
      setSaving(true);
      setError(null);
      setSuccess(false);
      const { error: updateError } = await supabase$1.from("route_demand_tracking").update({ is_ignored: ignored }).eq("id", routeId);
      if (updateError) throw updateError;
      setRoutes(routes.map(
        (route) => route.id === routeId ? { ...route, is_ignored: ignored } : route
      ));
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3e3);
    } catch (err) {
      console.error("Error updating ignore status:", err);
      setError("Failed to update status");
    } finally {
      setSaving(false);
    }
  };
  const filteredRoutes = routes.filter((route) => {
    const searchLower = searchTerm.toLowerCase();
    return route.origin.toLowerCase().includes(searchLower) || route.destination.toLowerCase().includes(searchLower);
  });
  if (loading) {
    return /* @__PURE__ */ jsx("div", { className: "min-h-[400px] flex items-center justify-center", children: /* @__PURE__ */ jsx(Loader2, { className: "w-8 h-8 text-blue-600 animate-spin" }) });
  }
  return /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg shadow-md overflow-hidden", children: [
    /* @__PURE__ */ jsxs("div", { className: "px-6 py-4 border-b border-gray-200", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold text-gray-800", children: "Update Frequency Settings" }),
      /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600 mt-1", children: "Configure how often flight prices should be refreshed for each route" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "p-6", children: [
      error && /* @__PURE__ */ jsxs("div", { className: "mb-6 bg-red-50 border border-red-200 rounded-lg p-4 text-red-700 flex items-center", children: [
        /* @__PURE__ */ jsx(AlertCircle, { className: "w-5 h-5 mr-2" }),
        error
      ] }),
      success && /* @__PURE__ */ jsx("div", { className: "mb-6 bg-green-50 border border-green-200 rounded-lg p-4 text-green-700", children: "Settings updated successfully!" }),
      /* @__PURE__ */ jsxs("div", { className: "mb-6 grid grid-cols-1 md:grid-cols-2 gap-4", children: [
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "text",
            value: searchTerm,
            onChange: (e) => setSearchTerm(e.target.value),
            placeholder: "Search routes by airport code...",
            className: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          }
        ),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "month",
            value: selectedMonth,
            onChange: (e) => setSelectedMonth(e.target.value),
            className: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          }
        )
      ] }),
      /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "min-w-full divide-y divide-gray-200", children: [
        /* @__PURE__ */ jsx("thead", { className: "bg-gray-50", children: /* @__PURE__ */ jsxs("tr", { children: [
          /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Route" }),
          /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Search Count" }),
          /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Demand Level" }),
          /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Update Interval" }),
          /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Status" }),
          /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Last Update" })
        ] }) }),
        /* @__PURE__ */ jsx("tbody", { className: "bg-white divide-y divide-gray-200", children: filteredRoutes.map((route) => /* @__PURE__ */ jsxs("tr", { className: "hover:bg-gray-50", children: [
          /* @__PURE__ */ jsx("td", { className: "px-6 py-4 whitespace-nowrap", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
            /* @__PURE__ */ jsx("span", { className: "font-medium", children: route.origin }),
            /* @__PURE__ */ jsx("span", { className: "mx-2", children: "→" }),
            /* @__PURE__ */ jsx("span", { className: "font-medium", children: route.destination })
          ] }) }),
          /* @__PURE__ */ jsx("td", { className: "px-6 py-4 whitespace-nowrap", children: /* @__PURE__ */ jsxs("div", { className: "text-sm", children: [
            route.search_count,
            " searches"
          ] }) }),
          /* @__PURE__ */ jsx("td", { className: "px-6 py-4 whitespace-nowrap", children: /* @__PURE__ */ jsx("span", { className: `inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${route.demand_level === "HIGH" ? "bg-green-100 text-green-800" : route.demand_level === "MEDIUM" ? "bg-yellow-100 text-yellow-800" : "bg-gray-100 text-gray-800"}`, children: route.demand_level }) }),
          /* @__PURE__ */ jsx("td", { className: "px-6 py-4 whitespace-nowrap", children: /* @__PURE__ */ jsx(
            "select",
            {
              value: route.update_interval,
              onChange: (e) => handleIntervalChange(route.id, parseInt(e.target.value)),
              disabled: route.is_ignored || saving,
              className: "px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100",
              children: UPDATE_INTERVALS$1.map((interval) => /* @__PURE__ */ jsx("option", { value: interval.value, children: interval.label }, interval.value))
            }
          ) }),
          /* @__PURE__ */ jsx("td", { className: "px-6 py-4 whitespace-nowrap", children: /* @__PURE__ */ jsx("div", { className: "flex items-center", children: /* @__PURE__ */ jsxs("label", { className: "inline-flex items-center cursor-pointer", children: [
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "checkbox",
                checked: !route.is_ignored,
                onChange: (e) => handleToggleIgnore(route.id, !e.target.checked),
                disabled: saving,
                className: "sr-only peer"
              }
            ),
            /* @__PURE__ */ jsx("div", { className: "relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600" }),
            /* @__PURE__ */ jsx("span", { className: "ml-3 text-sm font-medium text-gray-700", children: route.is_ignored ? "Disabled" : "Active" })
          ] }) }) }),
          /* @__PURE__ */ jsx("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-500", children: route.last_price_update ? format(new Date(route.last_price_update), "dd MMM HH:mm") : "Never" })
        ] }, route.id)) })
      ] }) }),
      filteredRoutes.length === 0 && /* @__PURE__ */ jsxs("div", { className: "text-center py-8", children: [
        /* @__PURE__ */ jsx(Clock, { className: "w-12 h-12 text-gray-400 mx-auto mb-3" }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-600", children: "No routes found" })
      ] })
    ] })
  ] });
}
function RouteTrackingDashboard() {
  const [activeTab, setActiveTab] = useState("popularity");
  return /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex gap-4 border-b border-gray-200", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => setActiveTab("popularity"),
          className: `px-4 py-2 text-sm font-medium border-b-2 -mb-px transition-colors ${activeTab === "popularity" ? "border-blue-600 text-blue-600" : "border-transparent text-gray-500 hover:text-gray-700"}`,
          children: "Route Popularity"
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => setActiveTab("frequency"),
          className: `px-4 py-2 text-sm font-medium border-b-2 -mb-px transition-colors ${activeTab === "frequency" ? "border-blue-600 text-blue-600" : "border-transparent text-gray-500 hover:text-gray-700"}`,
          children: "Update Frequency"
        }
      )
    ] }),
    activeTab === "popularity" ? /* @__PURE__ */ jsx(RoutePopularity, {}) : /* @__PURE__ */ jsx(UpdateFrequencySettings, {})
  ] });
}
function ManualApiSearch() {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [selectedMonth, setSelectedMonth] = useState(format(/* @__PURE__ */ new Date(), "yyyy-MM"));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);
  const [success, setSuccess] = useState(false);
  const getMonthOptions = () => {
    const options = [];
    const now = /* @__PURE__ */ new Date();
    for (let i = 0; i < 12; i++) {
      const date = addMonths(now, i);
      options.push({
        value: format(date, "yyyy-MM"),
        label: format(date, "MMMM yyyy")
      });
    }
    return options;
  };
  const handleSearch = async () => {
    var _a2, _b2;
    if (!origin || !destination) {
      setError("Please enter both origin and destination airports");
      return;
    }
    setLoading(true);
    setError(null);
    setResult(null);
    setSuccess(false);
    try {
      console.log("Fetching calendar prices for:", {
        origin: origin.toUpperCase(),
        destination: destination.toUpperCase(),
        yearMonth: selectedMonth
      });
      const response = await fetch(
        `https://sky-scanner3.p.rapidapi.com/flights/price-calendar-web?fromEntityId=${origin.toUpperCase()}&toEntityId=${destination.toUpperCase()}&yearMonth=${selectedMonth}`,
        {
          method: "GET",
          headers: {
            "x-rapidapi-host": "sky-scanner3.p.rapidapi.com",
            "x-rapidapi-key": "eff37b01a1msh6090de6dea39514p108435jsnf7c09e43a0a5"
          }
        }
      );
      if (!response.ok) {
        throw new Error(`API request failed: ${response.statusText}`);
      }
      const data = await response.json();
      console.log("API Response:", data);
      if (!data.status || !((_b2 = (_a2 = data.data) == null ? void 0 : _a2.PriceGrids) == null ? void 0 : _b2.Grid)) {
        throw new Error("Invalid API response format");
      }
      const priceGrid = {};
      let hasDirectFlight = false;
      data.data.PriceGrids.Grid[0].forEach((dayData, index) => {
        var _a3, _b3;
        if (!dayData) return;
        const day = (index + 1).toString().padStart(2, "0");
        const date = `${selectedMonth}-${day}`;
        if (dayData.DirectOutboundAvailable === true && dayData.DirectOutbound && typeof dayData.DirectOutbound.Price === "number" && dayData.DirectOutbound.Price > 0) {
          hasDirectFlight = true;
          priceGrid[date] = {
            price: dayData.DirectOutbound.Price,
            isDirect: true
          };
        } else if (((_a3 = dayData.Direct) == null ? void 0 : _a3.Price) > 0) {
          priceGrid[date] = {
            price: dayData.Direct.Price,
            isDirect: false
          };
        } else if (((_b3 = dayData.Indirect) == null ? void 0 : _b3.Price) > 0) {
          priceGrid[date] = {
            price: dayData.Indirect.Price,
            isDirect: false
          };
        }
      });
      const { error: saveError } = await supabase$1.from("calendar_prices").upsert({
        origin: origin.toUpperCase(),
        destination: destination.toUpperCase(),
        year_month: selectedMonth,
        price_grid: priceGrid,
        has_direct_flight: hasDirectFlight,
        last_update: (/* @__PURE__ */ new Date()).toISOString()
      }, {
        onConflict: "origin,destination,year_month"
      });
      if (saveError) throw saveError;
      setResult({
        yearMonth: selectedMonth,
        priceGrid,
        lastUpdate: (/* @__PURE__ */ new Date()).toISOString(),
        hasDirectFlight
      });
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3e3);
    } catch (err) {
      console.error("Search error:", err);
      setError(err instanceof Error ? err.message : "Failed to fetch prices");
    } finally {
      setLoading(false);
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg shadow-md overflow-hidden", children: [
    /* @__PURE__ */ jsxs("div", { className: "px-6 py-4 border-b border-gray-200", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold text-gray-800", children: "Manual API Search" }),
      /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600 mt-1", children: "Test flight price API integration and save results to the database" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "p-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4 mb-6", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Origin Airport" }),
          /* @__PURE__ */ jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsx(Plane, { className: "absolute left-3 top-1/2 -translate-y-1/2 text-gray-400", size: 20 }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                value: origin,
                onChange: (e) => setOrigin(e.target.value.toUpperCase()),
                placeholder: "e.g., TIA",
                className: "w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500",
                maxLength: 3
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Destination Airport" }),
          /* @__PURE__ */ jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsx(Plane, { className: "absolute left-3 top-1/2 -translate-y-1/2 text-gray-400", size: 20 }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                value: destination,
                onChange: (e) => setDestination(e.target.value.toUpperCase()),
                placeholder: "e.g., FCO",
                className: "w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500",
                maxLength: 3
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Month" }),
          /* @__PURE__ */ jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsx(Calendar, { className: "absolute left-3 top-1/2 -translate-y-1/2 text-gray-400", size: 20 }),
            /* @__PURE__ */ jsx(
              "select",
              {
                value: selectedMonth,
                onChange: (e) => setSelectedMonth(e.target.value),
                className: "w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500",
                children: getMonthOptions().map((option) => /* @__PURE__ */ jsx("option", { value: option.value, children: option.label }, option.value))
              }
            )
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "flex justify-end mb-6", children: /* @__PURE__ */ jsx(
        "button",
        {
          onClick: handleSearch,
          disabled: loading,
          className: `inline-flex items-center px-4 py-2 rounded-lg font-medium ${loading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"} text-white`,
          children: loading ? /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx(Loader2, { className: "w-5 h-5 mr-2 animate-spin" }),
            "Searching..."
          ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx(Search, { className: "w-5 h-5 mr-2" }),
            "Search Prices"
          ] })
        }
      ) }),
      error && /* @__PURE__ */ jsxs("div", { className: "mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center text-red-700", children: [
        /* @__PURE__ */ jsx(AlertTriangle, { className: "w-5 h-5 mr-2" }),
        error
      ] }),
      success && /* @__PURE__ */ jsx("div", { className: "mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700", children: "Prices saved successfully!" }),
      result && /* @__PURE__ */ jsxs("div", { className: "mt-6", children: [
        /* @__PURE__ */ jsx("div", { className: "flex items-center justify-between mb-4", children: /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold text-gray-800", children: "Search Results" }) }),
        /* @__PURE__ */ jsx("div", { className: `mb-4 p-4 rounded-lg ${result.hasDirectFlight ? "bg-green-50 text-green-700 border border-green-200" : "bg-yellow-50 text-yellow-700 border border-yellow-200"}`, children: /* @__PURE__ */ jsx("div", { className: "font-medium", children: result.hasDirectFlight ? "✈️ Direct flights available on this route" : "🛑 No direct flights available" }) }),
        /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "min-w-full divide-y divide-gray-200", children: [
          /* @__PURE__ */ jsx("thead", { className: "bg-gray-50", children: /* @__PURE__ */ jsxs("tr", { children: [
            /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Date" }),
            /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Price (EUR)" }),
            /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Direct Flight" })
          ] }) }),
          /* @__PURE__ */ jsx("tbody", { className: "bg-white divide-y divide-gray-200", children: Object.entries(result.priceGrid).sort(([a], [b]) => a.localeCompare(b)).map(([date, data]) => /* @__PURE__ */ jsxs("tr", { className: "hover:bg-gray-50", children: [
            /* @__PURE__ */ jsx("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-900", children: format(new Date(date), "dd MMM yyyy") }),
            /* @__PURE__ */ jsxs("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-900", children: [
              data.price.toFixed(2),
              "€"
            ] }),
            /* @__PURE__ */ jsx("td", { className: "px-6 py-4 whitespace-nowrap text-sm", children: /* @__PURE__ */ jsx("span", { className: `inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${data.isDirect ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}`, children: data.isDirect ? "Yes" : "No" }) })
          ] }, date)) })
        ] }) }),
        /* @__PURE__ */ jsxs("div", { className: "mt-4 text-sm text-gray-500", children: [
          "Last updated: ",
          format(new Date(result.lastUpdate), "dd MMM yyyy HH:mm:ss")
        ] })
      ] })
    ] })
  ] });
}
function ApiModeControl() {
  const [useIncompleteApi, setUseIncompleteApi] = useState(true);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [settingId, setSettingId] = useState(null);
  useEffect(() => {
    fetchSetting();
  }, []);
  const fetchSetting = async () => {
    try {
      const { data, error: error2 } = await supabase$1.from("system_settings").select("id, setting_value").eq("setting_name", "use_incomplete_api").single();
      if (error2) throw error2;
      if (data) {
        setSettingId(data.id);
        setUseIncompleteApi(data.setting_value);
      }
    } catch (err) {
      console.error("Error fetching API mode setting:", err);
      setError("Failed to load API mode setting");
    } finally {
      setLoading(false);
    }
  };
  const handleSave = async () => {
    setSaving(true);
    setError(null);
    setSuccess(false);
    try {
      const { error: saveError } = await supabase$1.from("system_settings").upsert({
        id: settingId || void 0,
        // Only include id if we have one
        setting_name: "use_incomplete_api",
        setting_value: useIncompleteApi,
        description: "Use incomplete API endpoint for flight search results",
        updated_at: (/* @__PURE__ */ new Date()).toISOString()
      }, {
        onConflict: "setting_name"
      });
      if (saveError) throw saveError;
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3e3);
    } catch (err) {
      console.error("Error saving API mode setting:", err);
      setError("Failed to save API mode setting");
    } finally {
      setSaving(false);
    }
  };
  if (loading) {
    return /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center p-8", children: /* @__PURE__ */ jsx(Loader2, { className: "w-6 h-6 text-blue-600 animate-spin" }) });
  }
  return /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg shadow-md overflow-hidden", children: [
    /* @__PURE__ */ jsxs("div", { className: "px-6 py-4 border-b border-gray-200", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold text-gray-800", children: "API Mode Settings" }),
      /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600 mt-1", children: "Configure how flight search results are fetched from the API" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "p-6", children: [
      error && /* @__PURE__ */ jsxs("div", { className: "mb-6 bg-red-50 border border-red-200 rounded-lg p-4 flex items-center text-red-700", children: [
        /* @__PURE__ */ jsx(AlertTriangle, { className: "w-5 h-5 mr-2" }),
        error
      ] }),
      success && /* @__PURE__ */ jsx("div", { className: "mb-6 bg-green-50 border border-green-200 rounded-lg p-4 text-green-700", children: "Settings saved successfully!" }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("label", { className: "flex items-center", children: [
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "checkbox",
                checked: useIncompleteApi,
                onChange: (e) => setUseIncompleteApi(e.target.checked),
                className: "w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              }
            ),
            /* @__PURE__ */ jsx("span", { className: "ml-2 text-gray-700", children: "Use Incomplete API Mode" })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-gray-500", children: "When enabled, the system will use the incomplete API endpoint which provides real-time updates as results come in. When disabled, only the initial results will be shown." })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "flex justify-end", children: /* @__PURE__ */ jsx(
          "button",
          {
            onClick: handleSave,
            disabled: saving,
            className: `
                flex items-center px-4 py-2 rounded-lg font-medium text-white
                ${saving ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}
              `,
            children: saving ? /* @__PURE__ */ jsxs(Fragment, { children: [
              /* @__PURE__ */ jsx(Loader2, { className: "w-5 h-5 mr-2 animate-spin" }),
              "Saving..."
            ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
              /* @__PURE__ */ jsx(Save, { className: "w-5 h-5 mr-2" }),
              "Save Changes"
            ] })
          }
        ) })
      ] })
    ] })
  ] });
}
function FlightApiConfig() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [config, setConfig] = useState({
    active_api: "rapidapi",
    simultaneous_requests: false,
    oneway_api: "rapidapi",
    roundtrip_api: "rapidapi",
    rapidapi_key: "",
    flightapi_key: ""
  });
  const [stats, setStats] = useState(null);
  useEffect(() => {
    fetchConfig();
    fetchStats();
  }, []);
  const fetchConfig = async () => {
    try {
      const { data, error: error2 } = await supabase$1.from("flight_api_config").select("*").limit(1).maybeSingle();
      if (error2) throw error2;
      if (data) setConfig(data);
    } catch (err) {
      console.error("Error fetching API config:", err);
      setError("Failed to load API configuration");
    } finally {
      setLoading(false);
    }
  };
  const fetchStats = async () => {
    try {
      const { data, error: error2 } = await supabase$1.from("flight_api_stats").select("*").limit(1).maybeSingle();
      if (error2) throw error2;
      if (data) setStats(data);
    } catch (err) {
      console.error("Error fetching API stats:", err);
    }
  };
  const handleSave = async () => {
    setSaving(true);
    setError(null);
    setSuccess(false);
    try {
      const { data: existingConfig } = await supabase$1.from("flight_api_config").select("id").limit(1).maybeSingle();
      let saveError;
      if (existingConfig == null ? void 0 : existingConfig.id) {
        const { error: error2 } = await supabase$1.from("flight_api_config").update(config).eq("id", existingConfig.id);
        saveError = error2;
      } else {
        const { error: error2 } = await supabase$1.from("flight_api_config").insert([config]);
        saveError = error2;
      }
      if (saveError) throw saveError;
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3e3);
    } catch (err) {
      console.error("Error saving API config:", err);
      setError(err instanceof Error ? err.message : "Failed to save configuration");
    } finally {
      setSaving(false);
    }
  };
  if (loading) {
    return /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center p-8", children: /* @__PURE__ */ jsx(Loader2, { className: "w-8 h-8 text-blue-600 animate-spin" }) });
  }
  return /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg shadow-md overflow-hidden", children: [
    /* @__PURE__ */ jsxs("div", { className: "px-6 py-4 border-b border-gray-200", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold text-gray-800", children: "Flight API Configuration" }),
      /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600 mt-1", children: "Configure and monitor flight search API integrations" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "p-6", children: [
      error && /* @__PURE__ */ jsxs("div", { className: "mb-6 bg-red-50 border border-red-200 rounded-lg p-4 flex items-center text-red-700", children: [
        /* @__PURE__ */ jsx(AlertCircle, { className: "w-5 h-5 mr-2" }),
        error
      ] }),
      success && /* @__PURE__ */ jsx("div", { className: "mb-6 bg-green-50 border border-green-200 rounded-lg p-4 text-green-700", children: "Configuration saved successfully!" }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Active Flight Search API" }),
          /* @__PURE__ */ jsxs(
            "select",
            {
              value: config.active_api,
              onChange: (e) => setConfig({ ...config, active_api: e.target.value }),
              className: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500",
              children: [
                /* @__PURE__ */ jsx("option", { value: "rapidapi", children: "RapidAPI Only" }),
                /* @__PURE__ */ jsx("option", { value: "flightapi", children: "FlightAPI.io Only" }),
                /* @__PURE__ */ jsx("option", { value: "both", children: "Both APIs" })
              ]
            }
          )
        ] }),
        config.active_api === "both" && /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("label", { className: "flex items-center", children: [
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "checkbox",
                checked: config.simultaneous_requests,
                onChange: (e) => setConfig({ ...config, simultaneous_requests: e.target.checked }),
                className: "w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              }
            ),
            /* @__PURE__ */ jsx("span", { className: "ml-2 text-gray-700", children: "Enable simultaneous API requests" })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-gray-500", children: "When enabled, requests will be sent to both APIs simultaneously" })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "One-Way Search API" }),
          /* @__PURE__ */ jsxs(
            "select",
            {
              value: config.oneway_api,
              onChange: (e) => setConfig({ ...config, oneway_api: e.target.value }),
              className: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500",
              children: [
                /* @__PURE__ */ jsx("option", { value: "rapidapi", children: "RapidAPI" }),
                /* @__PURE__ */ jsx("option", { value: "flightapi", children: "FlightAPI.io" }),
                /* @__PURE__ */ jsx("option", { value: "both", children: "Both" })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Round-Trip Search API" }),
          /* @__PURE__ */ jsxs(
            "select",
            {
              value: config.roundtrip_api,
              onChange: (e) => setConfig({ ...config, roundtrip_api: e.target.value }),
              className: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500",
              children: [
                /* @__PURE__ */ jsx("option", { value: "rapidapi", children: "RapidAPI" }),
                /* @__PURE__ */ jsx("option", { value: "flightapi", children: "FlightAPI.io" }),
                /* @__PURE__ */ jsx("option", { value: "both", children: "Both" })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "RapidAPI Key" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "password",
                value: config.rapidapi_key,
                onChange: (e) => setConfig({ ...config, rapidapi_key: e.target.value }),
                className: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "FlightAPI.io Key" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "password",
                value: config.flightapi_key,
                onChange: (e) => setConfig({ ...config, flightapi_key: e.target.value }),
                className: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              }
            )
          ] })
        ] }),
        stats && /* @__PURE__ */ jsxs("div", { className: "mt-8", children: [
          /* @__PURE__ */ jsxs("h3", { className: "text-lg font-medium text-gray-900 mb-4 flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(BarChart, { className: "w-5 h-5 text-blue-600" }),
            "API Usage Statistics"
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-6", children: [
            /* @__PURE__ */ jsxs("div", { className: "bg-gray-50 rounded-lg p-4", children: [
              /* @__PURE__ */ jsx("h4", { className: "font-medium text-gray-900 mb-3", children: "RapidAPI" }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
                  /* @__PURE__ */ jsx("span", { className: "text-gray-600", children: "Total Requests:" }),
                  /* @__PURE__ */ jsx("span", { className: "font-medium", children: stats.rapidapi.total_requests })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
                  /* @__PURE__ */ jsx("span", { className: "text-gray-600", children: "Avg Response Time:" }),
                  /* @__PURE__ */ jsxs("span", { className: "font-medium", children: [
                    stats.rapidapi.avg_response_time,
                    "ms"
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
                  /* @__PURE__ */ jsx("span", { className: "text-gray-600", children: "Error Rate:" }),
                  /* @__PURE__ */ jsxs("span", { className: "font-medium", children: [
                    stats.rapidapi.error_rate,
                    "%"
                  ] })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "bg-gray-50 rounded-lg p-4", children: [
              /* @__PURE__ */ jsx("h4", { className: "font-medium text-gray-900 mb-3", children: "FlightAPI.io" }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
                  /* @__PURE__ */ jsx("span", { className: "text-gray-600", children: "Total Requests:" }),
                  /* @__PURE__ */ jsx("span", { className: "font-medium", children: stats.flightapi.total_requests })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
                  /* @__PURE__ */ jsx("span", { className: "text-gray-600", children: "Avg Response Time:" }),
                  /* @__PURE__ */ jsxs("span", { className: "font-medium", children: [
                    stats.flightapi.avg_response_time,
                    "ms"
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
                  /* @__PURE__ */ jsx("span", { className: "text-gray-600", children: "Error Rate:" }),
                  /* @__PURE__ */ jsxs("span", { className: "font-medium", children: [
                    stats.flightapi.error_rate,
                    "%"
                  ] })
                ] })
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "flex justify-end", children: /* @__PURE__ */ jsx(
          "button",
          {
            onClick: handleSave,
            disabled: saving,
            className: `
                flex items-center px-4 py-2 rounded-lg font-medium text-white
                ${saving ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}
              `,
            children: saving ? /* @__PURE__ */ jsxs(Fragment, { children: [
              /* @__PURE__ */ jsx(Loader2, { className: "w-5 h-5 mr-2 animate-spin" }),
              "Saving..."
            ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
              /* @__PURE__ */ jsx(Save, { className: "w-5 h-5 mr-2" }),
              "Save Changes"
            ] })
          }
        ) })
      ] })
    ] })
  ] });
}
function SystemSettings() {
  return /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsx(FlightApiConfig, {}),
    /* @__PURE__ */ jsx(ApiModeControl, {})
  ] });
}
const DEFAULT_SETTINGS = {
  direct_flight_bonus: 5,
  arrival_time_bonuses: {
    early_morning: { start: 3, end: 10, points: 5 },
    morning: { start: 10, end: 15, points: 3 }
  },
  departure_time_bonuses: {
    afternoon: { start: 14, end: 18, points: 3 },
    evening: { start: 18, end: 24, points: 5 }
  },
  stop_penalties: {
    one_stop: -5,
    two_plus_stops: -10
  },
  duration_penalties: {
    medium: { hours: 4, points: -1 },
    long: { hours: 6, points: -2 },
    very_long: { hours: 6, points: -3 }
  }
};
function FlightScoringSettings() {
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  useEffect(() => {
    fetchSettings();
  }, []);
  const fetchSettings = async () => {
    try {
      const { data, error: error2 } = await supabase$1.from("scoring_settings").select("*").single();
      if (error2) throw error2;
      if (data) {
        setSettings(data.settings);
      }
    } catch (err) {
      console.error("Error fetching scoring settings:", err);
      setError("Failed to load scoring settings");
    } finally {
      setLoading(false);
    }
  };
  const handleSave = async () => {
    setSaving(true);
    setError(null);
    setSuccess(false);
    try {
      const { error: saveError } = await supabase$1.from("scoring_settings").upsert({
        id: "default",
        settings,
        updated_at: (/* @__PURE__ */ new Date()).toISOString()
      });
      if (saveError) throw saveError;
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3e3);
    } catch (err) {
      console.error("Error saving scoring settings:", err);
      setError("Failed to save scoring settings");
    } finally {
      setSaving(false);
    }
  };
  const handleReset = () => {
    setSettings(DEFAULT_SETTINGS);
  };
  if (loading) {
    return /* @__PURE__ */ jsx("div", { className: "min-h-[400px] flex items-center justify-center", children: /* @__PURE__ */ jsx("div", { className: "animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" }) });
  }
  return /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg shadow-md overflow-hidden", children: [
    /* @__PURE__ */ jsxs("div", { className: "px-6 py-4 border-b border-gray-200", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold text-gray-800", children: "Flight Scoring Settings" }),
      /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600 mt-1", children: "Configure the scoring parameters used to rank and sort flights" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "p-6", children: [
      error && /* @__PURE__ */ jsxs("div", { className: "mb-6 bg-red-50 border border-red-200 rounded-lg p-4 flex items-center text-red-700", children: [
        /* @__PURE__ */ jsx(AlertTriangle, { className: "w-5 h-5 mr-2" }),
        error
      ] }),
      success && /* @__PURE__ */ jsx("div", { className: "mb-6 bg-green-50 border border-green-200 rounded-lg p-4 text-green-700", children: "Settings saved successfully!" }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-8", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h3", { className: "text-lg font-medium text-gray-900 mb-4", children: "Direct Flight Bonus" }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "number",
                value: settings.direct_flight_bonus,
                onChange: (e) => setSettings({
                  ...settings,
                  direct_flight_bonus: Number(e.target.value)
                }),
                className: "w-24 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              }
            ),
            /* @__PURE__ */ jsx("span", { className: "text-gray-600", children: "points" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h3", { className: "text-lg font-medium text-gray-900 mb-4", children: "Arrival Time Bonuses" }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Early Morning (03:00 - 10:00)" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "number",
                  value: settings.arrival_time_bonuses.early_morning.points,
                  onChange: (e) => setSettings({
                    ...settings,
                    arrival_time_bonuses: {
                      ...settings.arrival_time_bonuses,
                      early_morning: {
                        ...settings.arrival_time_bonuses.early_morning,
                        points: Number(e.target.value)
                      }
                    }
                  }),
                  className: "w-24 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Morning (10:01 - 14:59)" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "number",
                  value: settings.arrival_time_bonuses.morning.points,
                  onChange: (e) => setSettings({
                    ...settings,
                    arrival_time_bonuses: {
                      ...settings.arrival_time_bonuses,
                      morning: {
                        ...settings.arrival_time_bonuses.morning,
                        points: Number(e.target.value)
                      }
                    }
                  }),
                  className: "w-24 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                }
              )
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h3", { className: "text-lg font-medium text-gray-900 mb-4", children: "Stop Penalties" }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "One Stop" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "number",
                  value: settings.stop_penalties.one_stop,
                  onChange: (e) => setSettings({
                    ...settings,
                    stop_penalties: {
                      ...settings.stop_penalties,
                      one_stop: Number(e.target.value)
                    }
                  }),
                  className: "w-24 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Two or More Stops" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "number",
                  value: settings.stop_penalties.two_plus_stops,
                  onChange: (e) => setSettings({
                    ...settings,
                    stop_penalties: {
                      ...settings.stop_penalties,
                      two_plus_stops: Number(e.target.value)
                    }
                  }),
                  className: "w-24 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                }
              )
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h3", { className: "text-lg font-medium text-gray-900 mb-4", children: "Duration Penalties" }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Medium (2-4 hours)" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "number",
                  value: settings.duration_penalties.medium.points,
                  onChange: (e) => setSettings({
                    ...settings,
                    duration_penalties: {
                      ...settings.duration_penalties,
                      medium: {
                        ...settings.duration_penalties.medium,
                        points: Number(e.target.value)
                      }
                    }
                  }),
                  className: "w-24 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Long (4-6 hours)" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "number",
                  value: settings.duration_penalties.long.points,
                  onChange: (e) => setSettings({
                    ...settings,
                    duration_penalties: {
                      ...settings.duration_penalties,
                      long: {
                        ...settings.duration_penalties.long,
                        points: Number(e.target.value)
                      }
                    }
                  }),
                  className: "w-24 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Very Long (6+ hours)" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "number",
                  value: settings.duration_penalties.very_long.points,
                  onChange: (e) => setSettings({
                    ...settings,
                    duration_penalties: {
                      ...settings.duration_penalties,
                      very_long: {
                        ...settings.duration_penalties.very_long,
                        points: Number(e.target.value)
                      }
                    }
                  }),
                  className: "w-24 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                }
              )
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-8 flex items-center justify-end gap-4", children: [
        /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: handleReset,
            className: "px-4 py-2 text-gray-700 hover:text-gray-900 flex items-center gap-2",
            children: [
              /* @__PURE__ */ jsx(RotateCcw, { className: "w-5 h-5" }),
              "Reset to Defaults"
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: handleSave,
            disabled: saving,
            className: `
              flex items-center gap-2 px-6 py-2 rounded-lg font-medium text-white
              ${saving ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}
            `,
            children: [
              /* @__PURE__ */ jsx(Save, { className: "w-5 h-5" }),
              saving ? "Saving..." : "Save Changes"
            ]
          }
        )
      ] })
    ] })
  ] });
}
const MODULES = [
  {
    title: "Core Search",
    icon: Search,
    features: [
      "Location selection with autocomplete",
      "Date picker with price calendar",
      "Passenger management",
      "Trip type selection"
    ]
  },
  {
    title: "Results Display",
    icon: Filter,
    features: [
      "Progressive loading",
      "Detailed flight cards",
      "Interactive modals",
      "Price breakdown"
    ]
  },
  {
    title: "Filtering System",
    icon: Clock,
    features: [
      "Stop count filtering",
      "Time range selection",
      "Airline filtering",
      "Price range filtering"
    ]
  },
  {
    title: "Sorting Module",
    icon: Star,
    features: [
      "Best (custom scoring)",
      "Cheapest (price-based)",
      "Fastest (duration-based)"
    ]
  },
  {
    title: "Admin Panel",
    icon: Settings,
    features: [
      "Search monitoring",
      "User management",
      "System settings",
      "Route tracking"
    ]
  },
  {
    title: "Agent Tools",
    icon: Users,
    features: [
      "Commission tracking",
      "Booking tools",
      "Route analysis",
      "Performance metrics"
    ]
  }
];
function ModuleOverview() {
  return /* @__PURE__ */ jsxs("div", { className: "space-y-8", children: [
    /* @__PURE__ */ jsxs("div", { className: "max-w-3xl", children: [
      /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold text-gray-900 mb-2", children: "System Overview" }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-600 mb-4", children: "The flight search and booking system is built with a modular architecture, focusing on performance, scalability, and user experience. Each module is designed to handle specific functionality while maintaining loose coupling with other components." })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: MODULES.map((module, index) => {
      const Icon = module.icon;
      return /* @__PURE__ */ jsxs(
        "div",
        {
          className: "bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow",
          children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-4", children: [
              /* @__PURE__ */ jsx("div", { className: "p-2 bg-blue-50 rounded-lg", children: /* @__PURE__ */ jsx(Icon, { className: "w-6 h-6 text-blue-600" }) }),
              /* @__PURE__ */ jsx("h4", { className: "text-lg font-semibold text-gray-900", children: module.title })
            ] }),
            /* @__PURE__ */ jsx("ul", { className: "space-y-2", children: module.features.map((feature, idx) => /* @__PURE__ */ jsxs("li", { className: "flex items-center text-gray-600", children: [
              /* @__PURE__ */ jsx("span", { className: "w-2 h-2 bg-blue-600 rounded-full mr-3" }),
              feature
            ] }, idx)) })
          ]
        },
        index
      );
    }) })
  ] });
}
const TABLES = [
  {
    name: "saved_searches",
    description: "Stores user search parameters and results with caching support",
    columns: [
      { name: "batch_id", type: "uuid", description: "Primary key, unique identifier for the search" },
      { name: "user_id", type: "uuid", description: "Foreign key to auth.users, nullable for anonymous searches" },
      { name: "search_params", type: "jsonb", description: "Search parameters including dates, locations, passengers" },
      { name: "results", type: "jsonb", description: "Latest search results" },
      { name: "cached_results", type: "jsonb", description: "Cached results for faster retrieval" },
      { name: "cached_until", type: "timestamptz", description: "Cache expiration timestamp" },
      { name: "price_stability_level", type: "text", description: "HIGH, MEDIUM, or LOW based on date proximity" },
      { name: "created_at", type: "timestamptz", description: "Record creation timestamp" },
      { name: "updated_at", type: "timestamptz", description: "Last update timestamp" }
    ],
    policies: [
      "Anyone can create searches",
      "Anyone can read searches by batch_id",
      "Users can update their searches"
    ]
  },
  {
    name: "calendar_prices",
    description: "Monthly price data for routes with caching and tracking",
    columns: [
      { name: "id", type: "uuid", description: "Primary key" },
      { name: "origin", type: "text", description: "Origin airport code" },
      { name: "destination", type: "text", description: "Destination airport code" },
      { name: "year_month", type: "text", description: "Month in YYYY-MM format" },
      { name: "price_grid", type: "jsonb", description: "Daily prices in grid format" },
      { name: "last_update", type: "timestamptz", description: "Last price update timestamp" },
      { name: "created_at", type: "timestamptz", description: "Record creation timestamp" },
      { name: "updated_at", type: "timestamptz", description: "Last modification timestamp" }
    ],
    policies: [
      "Public read access to prices",
      "Admin can manage prices"
    ]
  },
  {
    name: "route_update_settings",
    description: "Configuration for route price update frequency and tracking",
    columns: [
      { name: "id", type: "uuid", description: "Primary key" },
      { name: "origin", type: "text", description: "Origin airport code" },
      { name: "destination", type: "text", description: "Destination airport code" },
      { name: "update_interval", type: "integer", description: "Hours between updates (3, 6, 12, or 24)" },
      { name: "is_ignored", type: "boolean", description: "Flag to skip updates for this route" },
      { name: "search_count", type: "integer", description: "Total number of searches for this route" },
      { name: "last_update", type: "timestamptz", description: "Last successful update timestamp" }
    ],
    policies: [
      "Public read access",
      "Admin can manage settings"
    ]
  },
  {
    name: "scoring_settings",
    description: "Configuration for flight scoring and ranking algorithm",
    columns: [
      { name: "id", type: "text", description: 'Primary key, defaults to "default"' },
      { name: "settings", type: "jsonb", description: "Scoring parameters and weights" },
      { name: "updated_by", type: "uuid", description: "Admin who last updated settings" },
      { name: "updated_at", type: "timestamptz", description: "Last update timestamp" }
    ],
    policies: [
      "Public read access",
      "Admin only write access"
    ]
  },
  {
    name: "sales_agents",
    description: "Sales agent profiles and commission tracking",
    columns: [
      { name: "id", type: "uuid", description: "Primary key, references auth.users" },
      { name: "name", type: "text", description: "Agent full name" },
      { name: "email", type: "text", description: "Agent email address" },
      { name: "phone_number", type: "text", description: "Contact number" },
      { name: "is_active", type: "boolean", description: "Account status" },
      { name: "created_at", type: "timestamptz", description: "Account creation date" }
    ],
    policies: [
      "Agents can read own profile",
      "Agents can update own non-sensitive data",
      "Admin has full access"
    ]
  }
];
const TRIGGERS = [
  {
    name: "update_updated_at",
    description: "Automatically updates the updated_at timestamp on record changes",
    tables: ["saved_searches", "calendar_prices", "route_update_settings", "scoring_settings"]
  },
  {
    name: "sync_route_demand_trigger",
    description: "Updates route demand tracking when search patterns change",
    tables: ["search_route_tracking"]
  }
];
const FUNCTIONS = [
  {
    name: "calculate_route_demand",
    description: "Calculates demand level based on search volume",
    returnType: "text",
    returns: "HIGH, MEDIUM, or LOW"
  },
  {
    name: "get_calendar_commission",
    description: "Calculates commission for flight prices",
    returnType: "numeric",
    returns: "Commission amount in EUR"
  }
];
function DatabaseDocs() {
  return /* @__PURE__ */ jsxs("div", { className: "space-y-8", children: [
    /* @__PURE__ */ jsxs("div", { className: "max-w-3xl", children: [
      /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold text-gray-900 mb-2", children: "Database Structure" }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-600 mb-4", children: "The system uses Supabase (PostgreSQL) for data storage, with Row Level Security (RLS) policies ensuring data access control. The database is designed for performance and scalability, with built-in caching and tracking mechanisms." }),
      /* @__PURE__ */ jsxs("div", { className: "bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6", children: [
        /* @__PURE__ */ jsxs("h4", { className: "flex items-center text-blue-800 font-medium mb-2", children: [
          /* @__PURE__ */ jsx(Shield, { className: "w-5 h-5 mr-2" }),
          "Security Features"
        ] }),
        /* @__PURE__ */ jsxs("ul", { className: "space-y-2 text-blue-700", children: [
          /* @__PURE__ */ jsxs("li", { className: "flex items-center", children: [
            /* @__PURE__ */ jsx("span", { className: "w-2 h-2 bg-blue-600 rounded-full mr-3" }),
            "Row Level Security (RLS) on all tables"
          ] }),
          /* @__PURE__ */ jsxs("li", { className: "flex items-center", children: [
            /* @__PURE__ */ jsx("span", { className: "w-2 h-2 bg-blue-600 rounded-full mr-3" }),
            "Role-based access control (admin, agent, user)"
          ] }),
          /* @__PURE__ */ jsxs("li", { className: "flex items-center", children: [
            /* @__PURE__ */ jsx("span", { className: "w-2 h-2 bg-blue-600 rounded-full mr-3" }),
            "Automatic timestamps for auditing"
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsxs("h4", { className: "text-lg font-medium text-gray-900 flex items-center gap-2", children: [
        /* @__PURE__ */ jsx(Database, { className: "w-5 h-5 text-blue-600" }),
        "Tables"
      ] }),
      TABLES.map((table, index) => /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg border border-gray-200 overflow-hidden", children: [
        /* @__PURE__ */ jsxs("div", { className: "px-6 py-4 border-b border-gray-200 bg-gray-50", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsx(Table, { className: "w-5 h-5 text-blue-600" }),
            /* @__PURE__ */ jsx("h4", { className: "text-lg font-semibold text-gray-900", children: table.name })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-600 mt-1", children: table.description })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "p-6", children: [
          /* @__PURE__ */ jsxs("div", { className: "mb-4", children: [
            /* @__PURE__ */ jsx("h5", { className: "text-sm font-medium text-gray-700 mb-2", children: "RLS Policies" }),
            /* @__PURE__ */ jsx("ul", { className: "space-y-1", children: table.policies.map((policy, idx) => /* @__PURE__ */ jsxs("li", { className: "flex items-center text-sm text-gray-600", children: [
              /* @__PURE__ */ jsx(Lock, { className: "w-4 h-4 mr-2 text-green-600" }),
              policy
            ] }, idx)) })
          ] }),
          /* @__PURE__ */ jsxs("table", { className: "w-full", children: [
            /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { className: "text-left text-sm font-medium text-gray-500", children: [
              /* @__PURE__ */ jsx("th", { className: "pb-3", children: "Column" }),
              /* @__PURE__ */ jsx("th", { className: "pb-3", children: "Type" }),
              /* @__PURE__ */ jsx("th", { className: "pb-3", children: "Description" })
            ] }) }),
            /* @__PURE__ */ jsx("tbody", { className: "text-sm", children: table.columns.map((column, idx) => /* @__PURE__ */ jsxs("tr", { className: "border-t border-gray-100", children: [
              /* @__PURE__ */ jsx("td", { className: "py-3 font-medium text-gray-900", children: column.name }),
              /* @__PURE__ */ jsx("td", { className: "py-3 text-gray-600", children: column.type }),
              /* @__PURE__ */ jsx("td", { className: "py-3 text-gray-600", children: column.description })
            ] }, idx)) })
          ] })
        ] })
      ] }, index))
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxs("h4", { className: "text-lg font-medium text-gray-900 flex items-center gap-2", children: [
        /* @__PURE__ */ jsx(Key, { className: "w-5 h-5 text-blue-600" }),
        "Triggers"
      ] }),
      TRIGGERS.map((trigger, index) => /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg border border-gray-200 p-4", children: [
        /* @__PURE__ */ jsx("h5", { className: "font-medium text-gray-900 mb-2", children: trigger.name }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-600 text-sm mb-2", children: trigger.description }),
        /* @__PURE__ */ jsxs("div", { className: "text-sm text-gray-500", children: [
          "Applied to: ",
          trigger.tables.join(", ")
        ] })
      ] }, index))
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxs("h4", { className: "text-lg font-medium text-gray-900 flex items-center gap-2", children: [
        /* @__PURE__ */ jsx(Code, { className: "w-5 h-5 text-blue-600" }),
        "Functions"
      ] }),
      FUNCTIONS.map((func, index) => /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg border border-gray-200 p-4", children: [
        /* @__PURE__ */ jsx("h5", { className: "font-medium text-gray-900 mb-2", children: func.name }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-600 text-sm mb-2", children: func.description }),
        /* @__PURE__ */ jsxs("div", { className: "text-sm text-gray-500", children: [
          "Returns: ",
          /* @__PURE__ */ jsx("span", { className: "font-mono", children: func.returnType }),
          " (",
          func.returns,
          ")"
        ] })
      ] }, index))
    ] })
  ] });
}
const API_ENDPOINTS = [
  {
    method: "GET",
    path: "/flights/search-one-way",
    description: "Search for one-way flights with real-time pricing",
    params: [
      { name: "fromEntityId", type: "string", required: true, description: "Origin airport code (e.g., TIA)" },
      { name: "toEntityId", type: "string", required: true, description: "Destination airport code (e.g., FCO)" },
      { name: "departDate", type: "string", required: true, description: "Departure date (YYYY-MM-DD)" },
      { name: "currency", type: "string", required: true, description: "Price currency (EUR)" },
      { name: "stops", type: "string", required: false, description: "Stop preferences (direct,1stop,2stops)" },
      { name: "adults", type: "string", required: true, description: "Number of adult passengers" },
      { name: "children", type: "string", required: false, description: "Number of child passengers" },
      { name: "infants", type: "string", required: false, description: "Number of infant passengers" },
      { name: "cabinClass", type: "string", required: false, description: "Cabin class (economy, premium_economy, business, first)" }
    ]
  },
  {
    method: "GET",
    path: "/flights/search-roundtrip",
    description: "Search for round-trip flights with real-time pricing",
    params: [
      { name: "fromEntityId", type: "string", required: true, description: "Origin airport code (e.g., TIA)" },
      { name: "toEntityId", type: "string", required: true, description: "Destination airport code (e.g., FCO)" },
      { name: "departDate", type: "string", required: true, description: "Departure date (YYYY-MM-DD)" },
      { name: "returnDate", type: "string", required: true, description: "Return date (YYYY-MM-DD)" },
      { name: "currency", type: "string", required: true, description: "Price currency (EUR)" },
      { name: "stops", type: "string", required: false, description: "Stop preferences (direct,1stop,2stops)" },
      { name: "adults", type: "string", required: true, description: "Number of adult passengers" },
      { name: "children", type: "string", required: false, description: "Number of child passengers" },
      { name: "infants", type: "string", required: false, description: "Number of infant passengers" },
      { name: "cabinClass", type: "string", required: false, description: "Cabin class (economy, premium_economy, business, first)" }
    ]
  },
  {
    method: "GET",
    path: "/flights/search-incomplete",
    description: "Get partial search results for progressive loading",
    params: [
      { name: "sessionId", type: "string", required: true, description: "Search session ID from initial search" },
      { name: "currency", type: "string", required: true, description: "Price currency (EUR)" }
    ]
  },
  {
    method: "GET",
    path: "/flights/price-calendar-web",
    description: "Get monthly price calendar for a route",
    params: [
      { name: "fromEntityId", type: "string", required: true, description: "Origin airport code" },
      { name: "toEntityId", type: "string", required: true, description: "Destination airport code" },
      { name: "yearMonth", type: "string", required: true, description: "Month to fetch (YYYY-MM)" }
    ]
  }
];
const FEATURES = [
  {
    title: "Progressive Loading",
    description: "Results are loaded incrementally for better user experience",
    details: [
      "Initial results returned quickly",
      "Background polling for additional results",
      "Real-time updates as new flights are found",
      "Configurable polling interval and timeout"
    ]
  },
  {
    title: "Caching Strategy",
    description: "Multi-level caching system for optimal performance",
    details: [
      "Route-based price caching",
      "Demand-based cache invalidation",
      "Configurable cache duration",
      "Fallback to cached results on API errors"
    ]
  },
  {
    title: "Error Handling",
    description: "Robust error handling and retry mechanisms",
    details: [
      "Automatic retries for transient errors",
      "Rate limit handling",
      "Graceful degradation",
      "Detailed error logging"
    ]
  }
];
function ApiDocs() {
  return /* @__PURE__ */ jsxs("div", { className: "space-y-8", children: [
    /* @__PURE__ */ jsxs("div", { className: "max-w-3xl", children: [
      /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold text-gray-900 mb-2", children: "API Integration" }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-600 mb-4", children: "The system integrates with the SkyScanner API for real-time flight searches, with additional caching and progressive loading features for optimal performance." }),
      /* @__PURE__ */ jsxs("div", { className: "bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6", children: [
        /* @__PURE__ */ jsxs("h4", { className: "flex items-center text-blue-800 font-medium mb-2", children: [
          /* @__PURE__ */ jsx(Shield, { className: "w-5 h-5 mr-2" }),
          "Authentication"
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-blue-700 mb-2", children: "All API requests require authentication using RapidAPI headers:" }),
        /* @__PURE__ */ jsxs("div", { className: "bg-white rounded p-3 font-mono text-sm text-blue-800", children: [
          /* @__PURE__ */ jsx("div", { children: "X-RapidAPI-Host: sky-scanner3.p.rapidapi.com" }),
          /* @__PURE__ */ jsx("div", { children: "X-RapidAPI-Key: [your-api-key]" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6 mb-8", children: FEATURES.map((feature, index) => /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg border border-gray-200 p-6", children: [
      /* @__PURE__ */ jsx("h4", { className: "text-lg font-medium text-gray-900 mb-2", children: feature.title }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-600 text-sm mb-4", children: feature.description }),
      /* @__PURE__ */ jsx("ul", { className: "space-y-2", children: feature.details.map((detail, idx) => /* @__PURE__ */ jsxs("li", { className: "flex items-center text-sm text-gray-600", children: [
        /* @__PURE__ */ jsx("span", { className: "w-2 h-2 bg-blue-600 rounded-full mr-3" }),
        detail
      ] }, idx)) })
    ] }, index)) }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsxs("h4", { className: "text-lg font-medium text-gray-900 flex items-center gap-2", children: [
        /* @__PURE__ */ jsx(Code, { className: "w-5 h-5 text-blue-600" }),
        "Endpoints"
      ] }),
      API_ENDPOINTS.map((endpoint, index) => /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg border border-gray-200 overflow-hidden", children: [
        /* @__PURE__ */ jsxs("div", { className: "px-6 py-4 border-b border-gray-200 bg-gray-50", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsx("span", { className: "px-2 py-1 bg-green-100 text-green-700 rounded text-sm font-mono", children: endpoint.method }),
            /* @__PURE__ */ jsx(ArrowRight, { className: "w-4 h-4 text-gray-400" }),
            /* @__PURE__ */ jsx("span", { className: "font-mono text-gray-700", children: endpoint.path })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-600 mt-2", children: endpoint.description })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "p-6", children: [
          /* @__PURE__ */ jsx("h5", { className: "text-sm font-medium text-gray-700 mb-3", children: "Parameters" }),
          /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "w-full", children: [
            /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { className: "text-left text-sm font-medium text-gray-500", children: [
              /* @__PURE__ */ jsx("th", { className: "pb-3 pr-6", children: "Parameter" }),
              /* @__PURE__ */ jsx("th", { className: "pb-3 pr-6", children: "Type" }),
              /* @__PURE__ */ jsx("th", { className: "pb-3 pr-6", children: "Required" }),
              /* @__PURE__ */ jsx("th", { className: "pb-3", children: "Description" })
            ] }) }),
            /* @__PURE__ */ jsx("tbody", { className: "text-sm", children: endpoint.params.map((param, idx) => /* @__PURE__ */ jsxs("tr", { className: "border-t border-gray-100", children: [
              /* @__PURE__ */ jsx("td", { className: "py-3 pr-6 font-mono text-gray-900", children: param.name }),
              /* @__PURE__ */ jsx("td", { className: "py-3 pr-6 text-gray-600", children: param.type }),
              /* @__PURE__ */ jsx("td", { className: "py-3 pr-6", children: param.required ? /* @__PURE__ */ jsx("span", { className: "text-red-600", children: "Required" }) : /* @__PURE__ */ jsx("span", { className: "text-gray-500", children: "Optional" }) }),
              /* @__PURE__ */ jsx("td", { className: "py-3 text-gray-600", children: param.description })
            ] }, idx)) })
          ] }) })
        ] })
      ] }, index))
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "bg-yellow-50 border border-yellow-200 rounded-lg p-6", children: [
      /* @__PURE__ */ jsxs("h4", { className: "flex items-center text-yellow-800 font-medium mb-3", children: [
        /* @__PURE__ */ jsx(Clock, { className: "w-5 h-5 mr-2" }),
        "Rate Limiting"
      ] }),
      /* @__PURE__ */ jsx("p", { className: "text-yellow-700 mb-4", children: "The API has rate limiting in place to ensure fair usage. When limits are reached:" }),
      /* @__PURE__ */ jsxs("ul", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxs("li", { className: "flex items-center text-yellow-700", children: [
          /* @__PURE__ */ jsx(RefreshCw, { className: "w-4 h-4 mr-2" }),
          "Automatic retry with exponential backoff"
        ] }),
        /* @__PURE__ */ jsxs("li", { className: "flex items-center text-yellow-700", children: [
          /* @__PURE__ */ jsx(RefreshCw, { className: "w-4 h-4 mr-2" }),
          "Fallback to cached results when available"
        ] }),
        /* @__PURE__ */ jsxs("li", { className: "flex items-center text-yellow-700", children: [
          /* @__PURE__ */ jsx(RefreshCw, { className: "w-4 h-4 mr-2" }),
          "User-friendly error messages"
        ] })
      ] })
    ] })
  ] });
}
const DATA_FLOWS = [
  {
    title: "Search Initiation",
    icon: Search,
    steps: [
      "User submits search form with flight parameters",
      "Search parameters validated and normalized",
      "Unique batch ID generated for tracking",
      "Search parameters and batch ID stored in saved_searches table",
      "User redirected to results page with batch ID"
    ],
    code: `// Search parameters validation and storage
const batchId = uuidv4();
await supabase.from('saved_searches').insert([{
  batch_id: batchId,
  user_id: user?.id || null,
  search_params: searchParams,
  price_stability_level: 'MEDIUM'
}]);`
  },
  {
    title: "Results Fetching",
    icon: Database,
    steps: [
      "Check for cached results using batch ID",
      "If cache valid, return cached results immediately",
      "Otherwise, initiate API search with SkyScanner",
      "Process incoming results progressively",
      "Update route tracking statistics",
      "Cache results for future use"
    ],
    code: `// Progressive results loading
const refreshedResults = await refreshFlightData(
  searchParams, 
  batchId,
  (progress) => {
    setSearchProgress({
      progress: progress.progress,
      message: progress.isComplete 
        ? 'Search complete!'
        : \`Found \${progress.results.length} flights...\`
    });
    // Update UI with partial results
    setSearchData({
      searchParams,
      searchResults: progress.results
    });
  }
);`
  },
  {
    title: "Data Processing Pipeline",
    icon: RefreshCw,
    steps: [
      "Raw API response parsed into internal flight model",
      "Flights split into outbound/return segments",
      "Price calculations with commission",
      "Flight scoring based on multiple factors",
      "Results cached with expiration time"
    ],
    code: `// Flight data processing
const processedResults = {
  best_flights: parseSkyResponse(data).map(flight => ({
    ...flight,
    type: searchParams.tripType,
    score: calculateFlightScore(flight)
  })),
  cached_until: new Date(Date.now() + 2 * 60 * 60 * 1000)
};`
  },
  {
    title: "Filtering & Sorting",
    icon: Filter,
    steps: [
      "Apply user-selected filters (stops, time, airlines)",
      "Sort results based on selected criteria",
      'Calculate flight scores for "Best" sorting',
      "Apply price range filtering",
      "Update UI with filtered results"
    ],
    code: `// Apply filters and sorting
const filteredFlights = applyFilters(
  allFlights, 
  filters,
  searchParams.tripType === 'roundTrip'
);
const sortedFlights = await sortFlights(filteredFlights, sortBy);`
  },
  {
    title: "Caching Strategy",
    icon: Database,
    steps: [
      "Check route demand level from tracking data",
      "Set cache duration based on demand (3-24 hours)",
      "Store results in calendar_prices for reuse",
      "Update route_update_settings with new interval",
      "Handle cache invalidation on price changes"
    ],
    code: `// Cache management
const shouldUpdate = await supabase.rpc(
  'should_update_calendar_prices',
  { origin, destination, year_month }
);
if (shouldUpdate) {
  await updateCalendarPrices(origin, destination);
}`
  },
  {
    title: "Scoring System",
    icon: Star,
    steps: [
      "Load scoring settings from database",
      "Apply direct flight bonus (+10 points)",
      "Calculate time-based bonuses",
      "Apply stop and duration penalties",
      "Sort results by final score"
    ],
    code: `// Flight scoring
const score = await calculateFlightScore(flight);
// Example factors:
// - Direct flight: +10
// - Morning arrival: +5
// - One stop: -8
// - Long duration: -4`
  }
];
function DataFlowDocs() {
  return /* @__PURE__ */ jsxs("div", { className: "space-y-8", children: [
    /* @__PURE__ */ jsxs("div", { className: "max-w-3xl", children: [
      /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold text-gray-900 mb-2", children: "Data Flow" }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-600 mb-4", children: "The flight search system uses a multi-stage data flow with progressive loading, caching, and real-time updates. This documentation outlines the complete journey of data through the system, from search initiation to final display." }),
      /* @__PURE__ */ jsxs("div", { className: "bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6", children: [
        /* @__PURE__ */ jsxs("h4", { className: "flex items-center text-blue-800 font-medium mb-2", children: [
          /* @__PURE__ */ jsx(GitBranch, { className: "w-5 h-5 mr-2" }),
          "Key Components"
        ] }),
        /* @__PURE__ */ jsxs("ul", { className: "space-y-2 text-blue-700", children: [
          /* @__PURE__ */ jsxs("li", { className: "flex items-center", children: [
            /* @__PURE__ */ jsx("span", { className: "w-2 h-2 bg-blue-600 rounded-full mr-3" }),
            "Progressive loading with real-time updates"
          ] }),
          /* @__PURE__ */ jsxs("li", { className: "flex items-center", children: [
            /* @__PURE__ */ jsx("span", { className: "w-2 h-2 bg-blue-600 rounded-full mr-3" }),
            "Multi-level caching system"
          ] }),
          /* @__PURE__ */ jsxs("li", { className: "flex items-center", children: [
            /* @__PURE__ */ jsx("span", { className: "w-2 h-2 bg-blue-600 rounded-full mr-3" }),
            "Demand-based update intervals"
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "space-y-6", children: DATA_FLOWS.map((flow, index) => {
      const Icon = flow.icon;
      return /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg border border-gray-200 overflow-hidden", children: [
        /* @__PURE__ */ jsx("div", { className: "px-6 py-4 border-b border-gray-200 bg-gray-50", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsx(Icon, { className: "w-5 h-5 text-blue-600" }),
          /* @__PURE__ */ jsx("h4", { className: "text-lg font-semibold text-gray-900", children: flow.title })
        ] }) }),
        /* @__PURE__ */ jsx("div", { className: "p-6", children: /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
          /* @__PURE__ */ jsx("div", { className: "space-y-4", children: flow.steps.map((step, idx) => /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsx("div", { className: "flex-shrink-0 w-8 h-8 bg-blue-50 rounded-full flex items-center justify-center", children: /* @__PURE__ */ jsx("span", { className: "text-sm font-medium text-blue-600", children: idx + 1 }) }),
            /* @__PURE__ */ jsx(ArrowRight, { className: "w-4 h-4 text-gray-400 flex-shrink-0" }),
            /* @__PURE__ */ jsx("div", { className: "text-gray-600", children: step })
          ] }, idx)) }),
          /* @__PURE__ */ jsx("div", { className: "mt-4", children: /* @__PURE__ */ jsxs("div", { className: "bg-gray-800 rounded-lg overflow-hidden", children: [
            /* @__PURE__ */ jsx("div", { className: "px-4 py-2 bg-gray-700", children: /* @__PURE__ */ jsx("div", { className: "text-sm text-gray-300", children: "Example Code" }) }),
            /* @__PURE__ */ jsx("pre", { className: "p-4 text-sm text-gray-300 overflow-x-auto", children: /* @__PURE__ */ jsx("code", { children: flow.code }) })
          ] }) })
        ] }) })
      ] }, index);
    }) })
  ] });
}
const SCORING_FACTORS = [
  {
    title: "Direct Flight Bonus",
    icon: Plane,
    description: "Direct flights receive a significant bonus to prioritize convenience",
    points: [
      "+10 points for direct one-way flights",
      "+20 points for direct round-trip flights (both legs must be direct)"
    ]
  },
  {
    title: "Time-based Bonuses",
    icon: Clock,
    description: "Flights at preferred times receive additional points",
    points: [
      "+5 points for early morning arrival (6-10 AM)",
      "+3 points for morning arrival (10 AM-3 PM)",
      "+3 points for afternoon departure (2-6 PM)",
      "+5 points for evening departure (6 PM-12 AM)"
    ]
  },
  {
    title: "Stop Penalties",
    icon: Plane,
    description: "Penalties applied based on number of stops",
    points: [
      "-8 points for one stop",
      "-15 points for two or more stops",
      "For round-trips, penalties are applied per leg"
    ]
  },
  {
    title: "Duration Penalties",
    icon: Clock,
    description: "Longer flights receive penalties based on duration",
    points: [
      "-2 points for medium duration (4-6 hours)",
      "-4 points for long duration (6-8 hours)",
      "-6 points for very long duration (8+ hours)"
    ]
  }
];
const SCORING_EXAMPLES = [
  {
    title: "One-Way Direct Flight Example",
    description: "TIA → FCO, Direct Morning Flight",
    calculation: [
      "Direct flight bonus: +10",
      "Morning arrival (9 AM): +5",
      "Afternoon departure (2 PM): +3",
      "Duration 2 hours: No penalty",
      "Total Score: 18 points"
    ]
  },
  {
    title: "Round-Trip Direct Flight Example",
    description: "TIA → FCO → TIA, Both Direct",
    calculation: [
      "Direct flight bonus (both legs): +20",
      "Outbound morning arrival: +5",
      "Outbound afternoon departure: +3",
      "Return evening arrival: +5",
      "Return morning departure: +3",
      "Total duration 5 hours: -2",
      "Total Score: 34 points"
    ]
  }
];
function ScoringDocs() {
  return /* @__PURE__ */ jsxs("div", { className: "space-y-8", children: [
    /* @__PURE__ */ jsxs("div", { className: "max-w-3xl", children: [
      /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold text-gray-900 mb-2", children: "Flight Scoring System" }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-600", children: 'The flight scoring system uses multiple factors to rank flights based on convenience, duration, and timing. This helps provide the most relevant results to users when sorting by "Best" option.' })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: SCORING_FACTORS.map((factor, index) => {
      const Icon = factor.icon;
      return /* @__PURE__ */ jsxs(
        "div",
        {
          className: "bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow",
          children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-4", children: [
              /* @__PURE__ */ jsx("div", { className: "p-2 bg-blue-50 rounded-lg", children: /* @__PURE__ */ jsx(Icon, { className: "w-6 h-6 text-blue-600" }) }),
              /* @__PURE__ */ jsx("h4", { className: "text-lg font-semibold text-gray-900", children: factor.title })
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-gray-600 mb-4", children: factor.description }),
            /* @__PURE__ */ jsx("div", { className: "space-y-2", children: Array.isArray(factor.points) ? factor.points.map((point, idx) => /* @__PURE__ */ jsxs("div", { className: "flex items-center text-sm text-gray-600", children: [
              /* @__PURE__ */ jsx("span", { className: "w-2 h-2 bg-blue-600 rounded-full mr-3" }),
              point
            ] }, idx)) : /* @__PURE__ */ jsxs("div", { className: "flex items-center text-sm text-gray-600", children: [
              /* @__PURE__ */ jsx("span", { className: "w-2 h-2 bg-blue-600 rounded-full mr-3" }),
              factor.points
            ] }) })
          ]
        },
        index
      );
    }) }),
    /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg border border-gray-200 p-6", children: [
      /* @__PURE__ */ jsx("h4", { className: "text-lg font-semibold text-gray-900 mb-4", children: "One-Way vs Round-Trip Scoring" }),
      /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsx("h5", { className: "font-medium text-gray-800", children: "One-Way Flights" }),
          /* @__PURE__ */ jsxs("ul", { className: "space-y-2 text-sm text-gray-600", children: [
            /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-2", children: [
              /* @__PURE__ */ jsx("span", { className: "w-2 h-2 bg-blue-600 rounded-full mt-1.5 flex-shrink-0" }),
              /* @__PURE__ */ jsx("span", { children: "Direct flight bonus (+10) applied when flight has exactly one segment" })
            ] }),
            /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-2", children: [
              /* @__PURE__ */ jsx("span", { className: "w-2 h-2 bg-blue-600 rounded-full mt-1.5 flex-shrink-0" }),
              /* @__PURE__ */ jsx("span", { children: "Time bonuses calculated based on single departure and arrival" })
            ] }),
            /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-2", children: [
              /* @__PURE__ */ jsx("span", { className: "w-2 h-2 bg-blue-600 rounded-full mt-1.5 flex-shrink-0" }),
              /* @__PURE__ */ jsx("span", { children: "Stop penalties based on total segments minus one" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsx("h5", { className: "font-medium text-gray-800", children: "Round-Trip Flights" }),
          /* @__PURE__ */ jsxs("ul", { className: "space-y-2 text-sm text-gray-600", children: [
            /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-2", children: [
              /* @__PURE__ */ jsx("span", { className: "w-2 h-2 bg-blue-600 rounded-full mt-1.5 flex-shrink-0" }),
              /* @__PURE__ */ jsx("span", { children: "Double direct flight bonus (+20) if both legs are direct" })
            ] }),
            /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-2", children: [
              /* @__PURE__ */ jsx("span", { className: "w-2 h-2 bg-blue-600 rounded-full mt-1.5 flex-shrink-0" }),
              /* @__PURE__ */ jsx("span", { children: "Time bonuses applied separately to outbound and return legs" })
            ] }),
            /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-2", children: [
              /* @__PURE__ */ jsx("span", { className: "w-2 h-2 bg-blue-600 rounded-full mt-1.5 flex-shrink-0" }),
              /* @__PURE__ */ jsx("span", { children: "Stop penalties calculated independently for each leg" })
            ] })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsx("h4", { className: "text-lg font-semibold text-gray-900", children: "Scoring Examples" }),
      /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-2 gap-6", children: SCORING_EXAMPLES.map((example, index) => /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg border border-gray-200 p-6", children: [
        /* @__PURE__ */ jsx("h5", { className: "font-medium text-gray-800 mb-2", children: example.title }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600 mb-4", children: example.description }),
        /* @__PURE__ */ jsx("div", { className: "space-y-2", children: example.calculation.map((step, idx) => /* @__PURE__ */ jsxs("div", { className: "flex items-center text-sm text-gray-600", children: [
          /* @__PURE__ */ jsx("span", { className: "w-2 h-2 bg-blue-600 rounded-full mr-3" }),
          step
        ] }, idx)) })
      ] }, index)) })
    ] })
  ] });
}
const UI_COMPONENTS = [
  {
    title: "Search Module",
    icon: Search,
    description: "Main search interface with location and date selection",
    features: [
      "City autocomplete with airport codes",
      "Date picker with price calendar",
      "Passenger selection dropdown",
      "Trip type toggle"
    ]
  },
  {
    title: "Filter Panel",
    icon: Filter,
    description: "Comprehensive filtering options for search results",
    features: [
      "Stop count filter",
      "Time range selection",
      "Airline filter",
      "Price range slider"
    ]
  },
  {
    title: "Flight Cards",
    icon: List,
    description: "Displays flight information in an easy-to-read format",
    features: [
      "Flight times and duration",
      "Airline information",
      "Stop details",
      "Price breakdown"
    ]
  },
  {
    title: "Layout Components",
    icon: Layout,
    description: "Core layout components used throughout the application",
    features: [
      "Responsive navigation",
      "Modal dialogs",
      "Loading states",
      "Error boundaries"
    ]
  }
];
function UiDocs() {
  return /* @__PURE__ */ jsxs("div", { className: "space-y-8", children: [
    /* @__PURE__ */ jsxs("div", { className: "max-w-3xl", children: [
      /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold text-gray-900 mb-2", children: "UI Components" }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-600", children: "The application uses a component-based architecture with Tailwind CSS for styling. Below are the main UI components and their features." })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: UI_COMPONENTS.map((component, index) => {
      const Icon = component.icon;
      return /* @__PURE__ */ jsxs(
        "div",
        {
          className: "bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow",
          children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-4", children: [
              /* @__PURE__ */ jsx("div", { className: "p-2 bg-blue-50 rounded-lg", children: /* @__PURE__ */ jsx(Icon, { className: "w-6 h-6 text-blue-600" }) }),
              /* @__PURE__ */ jsx("h4", { className: "text-lg font-semibold text-gray-900", children: component.title })
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-gray-600 mb-4", children: component.description }),
            /* @__PURE__ */ jsx("div", { className: "space-y-2", children: component.features.map((feature, idx) => /* @__PURE__ */ jsxs("div", { className: "flex items-center text-sm text-gray-600", children: [
              /* @__PURE__ */ jsx("span", { className: "w-2 h-2 bg-blue-600 rounded-full mr-3" }),
              feature
            ] }, idx)) })
          ]
        },
        index
      );
    }) }),
    /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg border border-gray-200 p-6", children: [
      /* @__PURE__ */ jsx("h4", { className: "text-lg font-semibold text-gray-900 mb-4", children: "Design System" }),
      /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
        /* @__PURE__ */ jsx("h5", { className: "font-medium text-gray-800 mb-4", children: "Color Palette" }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsx("div", { className: "h-12 bg-blue-600 rounded-lg" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600", children: "Primary Blue" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsx("div", { className: "h-12 bg-gray-100 rounded-lg" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600", children: "Background Gray" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsx("div", { className: "h-12 bg-green-500 rounded-lg" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600", children: "Success Green" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsx("div", { className: "h-12 bg-red-600 rounded-lg" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600", children: "Error Red" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
        /* @__PURE__ */ jsx("h5", { className: "font-medium text-gray-800 mb-4", children: "Typography" }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold text-gray-900", children: "Heading 1" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500", children: "2xl / Bold / Gray-900" })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold text-gray-800", children: "Heading 2" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500", children: "xl / Semibold / Gray-800" })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("p", { className: "text-base text-gray-600", children: "Body Text" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500", children: "base / Regular / Gray-600" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h5", { className: "font-medium text-gray-800 mb-4", children: "Spacing System" }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsx("div", { className: "h-4 w-4 bg-blue-200 rounded" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600", children: "4 - Tight" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsx("div", { className: "h-6 w-6 bg-blue-200 rounded" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600", children: "6 - Default" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsx("div", { className: "h-8 w-8 bg-blue-200 rounded" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600", children: "8 - Relaxed" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsx("div", { className: "h-12 w-12 bg-blue-200 rounded" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600", children: "12 - Loose" })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg border border-gray-200 p-6", children: [
      /* @__PURE__ */ jsx("h4", { className: "text-lg font-semibold text-gray-900 mb-4", children: "Responsive Design" }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h5", { className: "font-medium text-gray-800 mb-2", children: "Mobile First" }),
          /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600", children: "All components are designed with a mobile-first approach, using Tailwind's responsive prefixes (sm:, md:, lg:) to enhance layouts at larger breakpoints." })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h5", { className: "font-medium text-gray-800 mb-2", children: "Breakpoints" }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-2 text-sm text-gray-600", children: [
            /* @__PURE__ */ jsx("p", { children: "sm: 640px - Tablet portrait" }),
            /* @__PURE__ */ jsx("p", { children: "md: 768px - Tablet landscape" }),
            /* @__PURE__ */ jsx("p", { children: "lg: 1024px - Desktop" }),
            /* @__PURE__ */ jsx("p", { children: "xl: 1280px - Large desktop" })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg border border-gray-200 p-6", children: [
      /* @__PURE__ */ jsx("h4", { className: "text-lg font-semibold text-gray-900 mb-4", children: "Best Practices" }),
      /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-6", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h5", { className: "font-medium text-gray-800 mb-2", children: "Component Guidelines" }),
          /* @__PURE__ */ jsxs("ul", { className: "space-y-2 text-sm text-gray-600", children: [
            /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsx("span", { className: "w-2 h-2 bg-blue-600 rounded-full" }),
              /* @__PURE__ */ jsx("span", { children: "Keep components focused and single-purpose" })
            ] }),
            /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsx("span", { className: "w-2 h-2 bg-blue-600 rounded-full" }),
              /* @__PURE__ */ jsx("span", { children: "Use TypeScript for prop type safety" })
            ] }),
            /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsx("span", { className: "w-2 h-2 bg-blue-600 rounded-full" }),
              /* @__PURE__ */ jsx("span", { children: "Implement error boundaries for stability" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h5", { className: "font-medium text-gray-800 mb-2", children: "Future Improvements" }),
          /* @__PURE__ */ jsxs("ul", { className: "space-y-2 text-sm text-gray-600", children: [
            /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsx("span", { className: "w-2 h-2 bg-blue-600 rounded-full" }),
              /* @__PURE__ */ jsx("span", { children: "Component testing with React Testing Library" })
            ] }),
            /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsx("span", { className: "w-2 h-2 bg-blue-600 rounded-full" }),
              /* @__PURE__ */ jsx("span", { children: "Storybook documentation" })
            ] }),
            /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsx("span", { className: "w-2 h-2 bg-blue-600 rounded-full" }),
              /* @__PURE__ */ jsx("span", { children: "Accessibility improvements" })
            ] })
          ] })
        ] })
      ] })
    ] })
  ] });
}
const AUTH_ROLES = [
  {
    name: "Admin",
    description: "Full system access with ability to manage all settings and users",
    permissions: [
      "Manage system settings",
      "View all user data",
      "Manage sales agents",
      "Configure commission rules",
      "Access analytics dashboard"
    ]
  },
  {
    name: "Sales Agent",
    description: "Access to booking and commission management features",
    permissions: [
      "View flight search results",
      "Access commission information",
      "Create bookings",
      "View own performance metrics",
      "Use WhatsApp integration"
    ]
  },
  {
    name: "Anonymous",
    description: "Basic search functionality without authentication",
    permissions: [
      "Search flights",
      "View public flight results",
      "Access cached prices",
      "View basic route information"
    ]
  }
];
const SECURITY_FEATURES = [
  {
    title: "Row Level Security",
    icon: Shield,
    description: "Database-level security ensuring users can only access authorized data",
    details: [
      "Automatic filtering based on user ID",
      "Role-based access policies",
      "Granular permission control"
    ]
  },
  {
    title: "User Authentication",
    icon: Users,
    description: "Secure authentication flow using Supabase Auth",
    details: [
      "Email/password authentication",
      "Secure password hashing",
      "Session management",
      "Token-based authentication"
    ]
  },
  {
    title: "Access Control",
    icon: Lock,
    description: "Role-based access control system",
    details: [
      "Role-based route protection",
      "Component-level access control",
      "API endpoint protection",
      "Database policy enforcement"
    ]
  },
  {
    title: "API Security",
    icon: Key,
    description: "Secure API access and data transmission",
    details: [
      "API key management",
      "Rate limiting",
      "Request validation",
      "CORS configuration"
    ]
  }
];
function AuthDocs() {
  return /* @__PURE__ */ jsxs("div", { className: "space-y-8", children: [
    /* @__PURE__ */ jsxs("div", { className: "max-w-3xl", children: [
      /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold text-gray-900 mb-2", children: "Authentication & Authorization" }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-600 mb-4", children: "The system implements a comprehensive security model using Supabase Auth and Row Level Security (RLS) to ensure secure access control and data protection." })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg border border-gray-200 p-6", children: [
      /* @__PURE__ */ jsx("h4", { className: "text-lg font-semibold text-gray-900 mb-4", children: "User Roles" }),
      /* @__PURE__ */ jsx("div", { className: "grid gap-6", children: AUTH_ROLES.map((role, index) => /* @__PURE__ */ jsxs("div", { className: "border-b border-gray-100 last:border-0 pb-6 last:pb-0", children: [
        /* @__PURE__ */ jsx("h5", { className: "font-medium text-gray-800 mb-2", children: role.name }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600 mb-4", children: role.description }),
        /* @__PURE__ */ jsx("div", { className: "space-y-2", children: role.permissions.map((permission, idx) => /* @__PURE__ */ jsxs("div", { className: "flex items-center text-sm text-gray-600", children: [
          /* @__PURE__ */ jsx("span", { className: "w-2 h-2 bg-blue-600 rounded-full mr-3" }),
          permission
        ] }, idx)) })
      ] }, index)) })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: SECURITY_FEATURES.map((feature, index) => {
      const Icon = feature.icon;
      return /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg border border-gray-200 p-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-4", children: [
          /* @__PURE__ */ jsx("div", { className: "p-2 bg-blue-50 rounded-lg", children: /* @__PURE__ */ jsx(Icon, { className: "w-6 h-6 text-blue-600" }) }),
          /* @__PURE__ */ jsx("h4", { className: "text-lg font-semibold text-gray-900", children: feature.title })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600 mb-4", children: feature.description }),
        /* @__PURE__ */ jsx("div", { className: "space-y-2", children: feature.details.map((detail, idx) => /* @__PURE__ */ jsxs("div", { className: "flex items-center text-sm text-gray-600", children: [
          /* @__PURE__ */ jsx("span", { className: "w-2 h-2 bg-blue-600 rounded-full mr-3" }),
          detail
        ] }, idx)) })
      ] }, index);
    }) }),
    /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg border border-gray-200 p-6", children: [
      /* @__PURE__ */ jsx("h4", { className: "text-lg font-semibold text-gray-900 mb-4", children: "Authentication Flow" }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h5", { className: "font-medium text-gray-800 mb-2", children: "Sign Up Process" }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-2 text-sm text-gray-600", children: [
            /* @__PURE__ */ jsx("p", { children: "1. User submits registration form with email and password" }),
            /* @__PURE__ */ jsx("p", { children: "2. Supabase Auth creates new user account" }),
            /* @__PURE__ */ jsx("p", { children: "3. User profile created in public.users table" }),
            /* @__PURE__ */ jsx("p", { children: "4. For agents, additional profile created in sales_agents table" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h5", { className: "font-medium text-gray-800 mb-2", children: "Sign In Process" }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-2 text-sm text-gray-600", children: [
            /* @__PURE__ */ jsx("p", { children: "1. User submits login credentials" }),
            /* @__PURE__ */ jsx("p", { children: "2. Supabase Auth validates credentials" }),
            /* @__PURE__ */ jsx("p", { children: "3. JWT token generated with user role and permissions" }),
            /* @__PURE__ */ jsx("p", { children: "4. Client stores session in local storage" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h5", { className: "font-medium text-gray-800 mb-2", children: "Session Management" }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-2 text-sm text-gray-600", children: [
            /* @__PURE__ */ jsx("p", { children: "1. JWT token used for all authenticated requests" }),
            /* @__PURE__ */ jsx("p", { children: "2. Token refresh handled automatically by Supabase client" }),
            /* @__PURE__ */ jsx("p", { children: "3. Session expiry after 12 hours of inactivity" }),
            /* @__PURE__ */ jsx("p", { children: "4. Automatic sign out on token expiration" })
          ] })
        ] })
      ] })
    ] })
  ] });
}
const AGENT_FEATURES = [
  {
    title: "Commission Management",
    icon: Calculator,
    description: "Comprehensive commission calculation and tracking system",
    features: [
      "Automatic commission calculation based on passenger types",
      "Group booking discounts",
      "Commission history tracking",
      "Real-time commission preview"
    ]
  },
  {
    title: "WhatsApp Integration",
    icon: MessageCircle,
    description: "Direct communication with clients through WhatsApp",
    features: [
      "One-click message generation",
      "Flight details formatting",
      "Automated pricing updates",
      "Booking reference tracking"
    ]
  },
  {
    title: "Performance Analytics",
    icon: BarChart,
    description: "Detailed insights into agent performance and earnings",
    features: [
      "Monthly earnings overview",
      "Booking conversion rates",
      "Client retention metrics",
      "Route performance analysis"
    ]
  }
];
const COMMISSION_RULES = [
  {
    type: "Standard Rates",
    rules: [
      { passenger: "Adult", rate: "€20 per passenger" },
      { passenger: "Child (2-11)", rate: "€10 per passenger" },
      { passenger: "Infant (seat)", rate: "€10 per passenger" },
      { passenger: "Infant (lap)", rate: "€0 per passenger" }
    ]
  },
  {
    type: "Group Discounts",
    rules: [
      { passengers: "2-3 adults", rate: "€15 per passenger" },
      { passengers: "4-5 adults", rate: "€13.33 per passenger" },
      { passengers: "6+ adults", rate: "€12 per passenger" }
    ]
  },
  {
    type: "Round-Trip Discounts",
    rules: [
      { description: "One-way flights", rate: "€20 commission" },
      { description: "Round-trip flights", rate: "€10 per leg (€20 total)" }
    ]
  }
];
function AgentDocs() {
  return /* @__PURE__ */ jsxs("div", { className: "space-y-8", children: [
    /* @__PURE__ */ jsxs("div", { className: "max-w-3xl", children: [
      /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold text-gray-900 mb-2", children: "Agent Tools & Commission" }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-600 mb-4", children: "Comprehensive suite of tools for sales agents to manage bookings, track commissions, and communicate with clients efficiently." })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: AGENT_FEATURES.map((feature, index) => {
      const Icon = feature.icon;
      return /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg border border-gray-200 p-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-4", children: [
          /* @__PURE__ */ jsx("div", { className: "p-2 bg-blue-50 rounded-lg", children: /* @__PURE__ */ jsx(Icon, { className: "w-6 h-6 text-blue-600" }) }),
          /* @__PURE__ */ jsx("h4", { className: "text-lg font-semibold text-gray-900", children: feature.title })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600 mb-4", children: feature.description }),
        /* @__PURE__ */ jsx("div", { className: "space-y-2", children: feature.features.map((item, idx) => /* @__PURE__ */ jsxs("div", { className: "flex items-center text-sm text-gray-600", children: [
          /* @__PURE__ */ jsx("span", { className: "w-2 h-2 bg-blue-600 rounded-full mr-3" }),
          item
        ] }, idx)) })
      ] }, index);
    }) }),
    /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg border border-gray-200 p-6", children: [
      /* @__PURE__ */ jsx("h4", { className: "text-lg font-semibold text-gray-900 mb-6", children: "Commission Structure" }),
      /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-3 gap-6", children: COMMISSION_RULES.map((section, index) => /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h5", { className: "font-medium text-gray-800 mb-4", children: section.type }),
        /* @__PURE__ */ jsx("div", { className: "space-y-3", children: section.rules.map((rule, idx) => /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center text-sm", children: [
          /* @__PURE__ */ jsx("span", { className: "text-gray-600", children: rule.passenger || rule.passengers || rule.description }),
          /* @__PURE__ */ jsx("span", { className: "font-medium text-gray-900", children: rule.rate })
        ] }, idx)) })
      ] }, index)) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg border border-gray-200 p-6", children: [
      /* @__PURE__ */ jsx("h4", { className: "text-lg font-semibold text-gray-900 mb-4", children: "Commission Calculation Example" }),
      /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-6", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h5", { className: "font-medium text-gray-800 mb-3", children: "Family Booking (One-way)" }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-2 text-sm text-gray-600", children: [
            /* @__PURE__ */ jsx("p", { children: "• 2 Adults: 2 × €15 = €30 (group rate)" }),
            /* @__PURE__ */ jsx("p", { children: "• 1 Child: 1 × €10 = €10" }),
            /* @__PURE__ */ jsx("p", { children: "• 1 Infant (seat): 1 × €10 = €10" }),
            /* @__PURE__ */ jsx("p", { className: "mt-4 font-medium text-gray-900", children: "Total Commission: €50" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h5", { className: "font-medium text-gray-800 mb-3", children: "Group Booking (Round-trip)" }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-2 text-sm text-gray-600", children: [
            /* @__PURE__ */ jsx("p", { children: "• 4 Adults: 4 × €13.33 × 2 = €106.64" }),
            /* @__PURE__ */ jsx("p", { children: "• Round-trip discount applied" }),
            /* @__PURE__ */ jsx("p", { children: "• Per-leg commission: €53.32" }),
            /* @__PURE__ */ jsx("p", { className: "mt-4 font-medium text-gray-900", children: "Total Commission: €106.64" })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg border border-gray-200 p-6", children: [
      /* @__PURE__ */ jsx("h4", { className: "text-lg font-semibold text-gray-900 mb-4", children: "WhatsApp Integration" }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h5", { className: "font-medium text-gray-800 mb-2", children: "Message Format" }),
          /* @__PURE__ */ jsx("div", { className: "bg-gray-50 p-4 rounded-lg text-sm text-gray-600", children: /* @__PURE__ */ jsx("pre", { className: "whitespace-pre-wrap", children: `🛫 Flight Details
From: [Origin] ([Code])
To: [Destination] ([Code])
Date: [Departure Date & Time]
Duration: [Total Duration]
Stops: [Number of Stops]
Price: [Total Price] EUR
Booking Reference: [ID]` }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-6", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h5", { className: "font-medium text-gray-800 mb-2", children: "Features" }),
            /* @__PURE__ */ jsxs("ul", { className: "space-y-2 text-sm text-gray-600", children: [
              /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsx("span", { className: "w-2 h-2 bg-blue-600 rounded-full" }),
                /* @__PURE__ */ jsx("span", { children: "Automatic price updates" })
              ] }),
              /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsx("span", { className: "w-2 h-2 bg-blue-600 rounded-full" }),
                /* @__PURE__ */ jsx("span", { children: "Real-time availability check" })
              ] }),
              /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsx("span", { className: "w-2 h-2 bg-blue-600 rounded-full" }),
                /* @__PURE__ */ jsx("span", { children: "Booking tracking integration" })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h5", { className: "font-medium text-gray-800 mb-2", children: "Best Practices" }),
            /* @__PURE__ */ jsxs("ul", { className: "space-y-2 text-sm text-gray-600", children: [
              /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsx("span", { className: "w-2 h-2 bg-blue-600 rounded-full" }),
                /* @__PURE__ */ jsx("span", { children: "Verify prices before sending" })
              ] }),
              /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsx("span", { className: "w-2 h-2 bg-blue-600 rounded-full" }),
                /* @__PURE__ */ jsx("span", { children: "Include booking reference" })
              ] }),
              /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsx("span", { className: "w-2 h-2 bg-blue-600 rounded-full" }),
                /* @__PURE__ */ jsx("span", { children: "Follow up within 24 hours" })
              ] })
            ] })
          ] })
        ] })
      ] })
    ] })
  ] });
}
const TRACKING_FEATURES = [
  {
    title: "Route Demand Analysis",
    icon: TrendingUp,
    description: "Track and analyze route popularity and search patterns",
    features: [
      "Real-time search volume tracking",
      "Popular dates identification",
      "Seasonal trend analysis",
      "Demand-based pricing insights"
    ]
  },
  {
    title: "Performance Metrics",
    icon: BarChart,
    description: "Comprehensive analytics for route performance",
    features: [
      "Conversion rate tracking",
      "Price fluctuation analysis",
      "Search-to-booking ratio",
      "Route profitability metrics"
    ]
  },
  {
    title: "Update Management",
    icon: RefreshCw,
    description: "Intelligent price update scheduling system",
    features: [
      "Demand-based update intervals",
      "Automated price refresh",
      "Cache management",
      "Update history tracking"
    ]
  }
];
const UPDATE_INTERVALS = [
  {
    level: "HIGH",
    interval: "3 hours",
    criteria: "Routes with 30+ searches per day",
    features: [
      "Frequent price updates",
      "Real-time availability checks",
      "Priority cache refresh",
      "Immediate price alerts"
    ]
  },
  {
    level: "MEDIUM",
    interval: "6 hours",
    criteria: "10-29 searches per day",
    features: [
      "Regular price updates",
      "Standard availability checks",
      "Normal cache duration",
      "Daily price alerts"
    ]
  },
  {
    level: "LOW",
    interval: "12 hours",
    criteria: "Less than 10 searches per day",
    features: [
      "Less frequent updates",
      "Extended cache duration",
      "Background processing",
      "Weekly price alerts"
    ]
  }
];
const TRACKING_METRICS = [
  {
    name: "Search Volume",
    description: "Number of searches per route per day",
    calculation: "Total daily searches / route",
    thresholds: [
      "High: >30 searches",
      "Medium: 10-29 searches",
      "Low: <10 searches"
    ]
  },
  {
    name: "Price Stability",
    description: "Measure of price fluctuation over time",
    calculation: "Standard deviation of prices over 7 days",
    thresholds: [
      "High: <5% variation",
      "Medium: 5-15% variation",
      "Low: >15% variation"
    ]
  },
  {
    name: "Cache Efficiency",
    description: "Effectiveness of price caching system",
    calculation: "Cache hits / total requests × 100",
    thresholds: [
      "High: >90% hit rate",
      "Medium: 70-90% hit rate",
      "Low: <70% hit rate"
    ]
  }
];
function TrackingDocs() {
  return /* @__PURE__ */ jsxs("div", { className: "space-y-8", children: [
    /* @__PURE__ */ jsxs("div", { className: "max-w-3xl", children: [
      /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold text-gray-900 mb-2", children: "Route Tracking & Analytics" }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-600 mb-4", children: "Comprehensive system for monitoring route performance, analyzing search patterns, and optimizing price update intervals based on demand." })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: TRACKING_FEATURES.map((feature, index) => {
      const Icon = feature.icon;
      return /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg border border-gray-200 p-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-4", children: [
          /* @__PURE__ */ jsx("div", { className: "p-2 bg-blue-50 rounded-lg", children: /* @__PURE__ */ jsx(Icon, { className: "w-6 h-6 text-blue-600" }) }),
          /* @__PURE__ */ jsx("h4", { className: "text-lg font-semibold text-gray-900", children: feature.title })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600 mb-4", children: feature.description }),
        /* @__PURE__ */ jsx("div", { className: "space-y-2", children: feature.features.map((item, idx) => /* @__PURE__ */ jsxs("div", { className: "flex items-center text-sm text-gray-600", children: [
          /* @__PURE__ */ jsx("span", { className: "w-2 h-2 bg-blue-600 rounded-full mr-3" }),
          item
        ] }, idx)) })
      ] }, index);
    }) }),
    /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg border border-gray-200 p-6", children: [
      /* @__PURE__ */ jsx("h4", { className: "text-lg font-semibold text-gray-900 mb-6", children: "Update Intervals" }),
      /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-3 gap-6", children: UPDATE_INTERVALS.map((interval, index) => /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsx(Clock, { className: "w-5 h-5 text-blue-600" }),
          /* @__PURE__ */ jsxs("h5", { className: "font-medium text-gray-800", children: [
            interval.level,
            " Demand"
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-2 text-sm", children: [
          /* @__PURE__ */ jsxs("p", { className: "text-blue-600 font-medium", children: [
            "Every ",
            interval.interval
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-600", children: interval.criteria })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "space-y-2", children: interval.features.map((feature, idx) => /* @__PURE__ */ jsxs("div", { className: "flex items-center text-sm text-gray-600", children: [
          /* @__PURE__ */ jsx("span", { className: "w-2 h-2 bg-blue-600 rounded-full mr-3" }),
          feature
        ] }, idx)) })
      ] }, index)) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg border border-gray-200 p-6", children: [
      /* @__PURE__ */ jsx("h4", { className: "text-lg font-semibold text-gray-900 mb-6", children: "Tracking Metrics" }),
      /* @__PURE__ */ jsx("div", { className: "space-y-6", children: TRACKING_METRICS.map((metric, index) => /* @__PURE__ */ jsxs("div", { className: "pb-6 border-b border-gray-100 last:border-0 last:pb-0", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 mb-3", children: [
          /* @__PURE__ */ jsx(BarChart, { className: "w-5 h-5 text-blue-600" }),
          /* @__PURE__ */ jsx("h5", { className: "font-medium text-gray-800", children: metric.name })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-3 gap-6", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h6", { className: "text-sm font-medium text-gray-700 mb-2", children: "Description" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600", children: metric.description })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h6", { className: "text-sm font-medium text-gray-700 mb-2", children: "Calculation" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600", children: metric.calculation })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h6", { className: "text-sm font-medium text-gray-700 mb-2", children: "Thresholds" }),
            /* @__PURE__ */ jsx("div", { className: "space-y-1", children: metric.thresholds.map((threshold, idx) => /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600", children: threshold }, idx)) })
          ] })
        ] })
      ] }, index)) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg border border-gray-200 p-6", children: [
      /* @__PURE__ */ jsx("h4", { className: "text-lg font-semibold text-gray-900 mb-4", children: "Data Flow & Processing" }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h5", { className: "font-medium text-gray-800 mb-3", children: "Search Tracking" }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-2 text-sm text-gray-600", children: [
            /* @__PURE__ */ jsx("p", { children: "1. User performs flight search" }),
            /* @__PURE__ */ jsx("p", { children: "2. Search parameters recorded in tracking system" }),
            /* @__PURE__ */ jsx("p", { children: "3. Route demand level calculated" }),
            /* @__PURE__ */ jsx("p", { children: "4. Update interval adjusted based on demand" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h5", { className: "font-medium text-gray-800 mb-3", children: "Price Updates" }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-2 text-sm text-gray-600", children: [
            /* @__PURE__ */ jsx("p", { children: "1. Check route demand level" }),
            /* @__PURE__ */ jsx("p", { children: "2. Determine update interval" }),
            /* @__PURE__ */ jsx("p", { children: "3. Queue price refresh if needed" }),
            /* @__PURE__ */ jsx("p", { children: "4. Update cache and notify systems" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h5", { className: "font-medium text-gray-800 mb-3", children: "Analytics Processing" }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-2 text-sm text-gray-600", children: [
            /* @__PURE__ */ jsx("p", { children: "1. Aggregate search data hourly" }),
            /* @__PURE__ */ jsx("p", { children: "2. Calculate performance metrics" }),
            /* @__PURE__ */ jsx("p", { children: "3. Generate trend reports" }),
            /* @__PURE__ */ jsx("p", { children: "4. Update dashboards" })
          ] })
        ] })
      ] })
    ] })
  ] });
}
const IMPLEMENTED_TESTS = [
  {
    title: "Frontend Component Tests",
    description: "Tests for React components using Vitest and React Testing Library",
    suites: [
      {
        name: "FlightCard Tests",
        file: "FlightCard.test.tsx",
        cases: [
          "Renders flight details correctly",
          "Handles click events properly",
          "Displays correct duration",
          "Shows route summary"
        ]
      },
      {
        name: "FlightFilterPanel Tests",
        file: "FlightFilterPanel.test.tsx",
        cases: [
          "Renders all filter sections",
          "Shows return time filter only for round trips",
          "Handles filter changes correctly",
          "Shows reset button when filters are active"
        ]
      },
      {
        name: "FlightList Tests",
        file: "FlightList.test.tsx",
        cases: [
          "Renders flight cards correctly",
          "Shows empty state when no flights",
          "Handles back button click"
        ]
      }
    ]
  },
  {
    title: "Business Logic Tests",
    description: "Tests for core business logic and data processing",
    suites: [
      {
        name: "Flight Filters Tests",
        file: "flightFilters.test.ts",
        cases: [
          "Filters by stops correctly",
          "Filters by departure time correctly",
          "Filters by airline correctly",
          "Filters by price range correctly",
          "Combines multiple filters correctly"
        ]
      },
      {
        name: "Flight Scoring Tests",
        file: "flightScoring.test.ts",
        cases: [
          "Sorts by price correctly",
          "Sorts by duration correctly",
          "Sorts by best score correctly",
          "Provides detailed score description"
        ]
      }
    ]
  },
  {
    title: "Settings & Configuration Tests",
    description: "Tests for system settings and configuration components",
    suites: [
      {
        name: "FlightScoringSettings Tests",
        file: "FlightScoringSettings.test.tsx",
        cases: [
          "Loads settings correctly",
          "Handles input changes",
          "Shows success message on save",
          "Resets to default values"
        ]
      },
      {
        name: "SortingOptions Tests",
        file: "SortingOptions.test.tsx",
        cases: [
          "Renders all sorting options",
          "Highlights selected option",
          "Calls onChange when option clicked",
          "Shows tooltips with descriptions"
        ]
      }
    ]
  }
];
const FUTURE_TESTS = [
  {
    title: "Authentication & Authorization",
    icon: Bug,
    tests: [
      "User registration flow validation",
      "Role-based access control tests",
      "Session management and token refresh",
      "Password reset functionality",
      "Agent account activation process"
    ]
  },
  {
    title: "Commission Management",
    icon: CheckCircle,
    tests: [
      "Commission calculation for different passenger types",
      "Group booking discount application",
      "Round-trip commission rules",
      "Commission history tracking",
      "Agent performance metrics calculation"
    ]
  },
  {
    title: "Error Handling & Recovery",
    icon: AlertTriangle,
    tests: [
      "API failure recovery scenarios",
      "Cache invalidation and refresh",
      "Network timeout handling",
      "Rate limit handling",
      "Fallback behavior testing"
    ]
  }
];
function TestDocs() {
  return /* @__PURE__ */ jsxs("div", { className: "space-y-8", children: [
    /* @__PURE__ */ jsxs("div", { className: "max-w-3xl", children: [
      /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold text-gray-900 mb-2", children: "Test Cases & Future Testing Ideas" }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-600 mb-4", children: "Comprehensive overview of implemented test cases and planned future test coverage to ensure system reliability and functionality." })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsx("h4", { className: "text-lg font-semibold text-gray-900", children: "Implemented Test Cases" }),
      IMPLEMENTED_TESTS.map((category, index) => /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg border border-gray-200 p-6", children: [
        /* @__PURE__ */ jsx("h5", { className: "font-medium text-gray-800 mb-2", children: category.title }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600 mb-4", children: category.description }),
        /* @__PURE__ */ jsx("div", { className: "space-y-6", children: category.suites.map((suite, idx) => /* @__PURE__ */ jsxs("div", { className: "border-t border-gray-100 pt-4 first:border-0 first:pt-0", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 mb-3", children: [
            /* @__PURE__ */ jsx(Beaker, { className: "w-5 h-5 text-blue-600" }),
            /* @__PURE__ */ jsx("h6", { className: "font-medium text-gray-700", children: suite.name }),
            /* @__PURE__ */ jsxs("span", { className: "text-sm text-gray-500", children: [
              "(",
              suite.file,
              ")"
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-2", children: suite.cases.map((testCase, caseIdx) => /* @__PURE__ */ jsxs("div", { className: "flex items-center text-sm text-gray-600", children: [
            /* @__PURE__ */ jsx("span", { className: "w-2 h-2 bg-green-600 rounded-full mr-3" }),
            testCase
          ] }, caseIdx)) })
        ] }, idx)) })
      ] }, index))
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsx("h4", { className: "text-lg font-semibold text-gray-900", children: "Future Testing Ideas" }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: FUTURE_TESTS.map((category, index) => {
        const Icon = category.icon;
        return /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg border border-gray-200 p-6", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-4", children: [
            /* @__PURE__ */ jsx("div", { className: "p-2 bg-blue-50 rounded-lg", children: /* @__PURE__ */ jsx(Icon, { className: "w-6 h-6 text-blue-600" }) }),
            /* @__PURE__ */ jsx("h5", { className: "font-medium text-gray-800", children: category.title })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "space-y-2", children: category.tests.map((test, idx) => /* @__PURE__ */ jsxs("div", { className: "flex items-center text-sm text-gray-600", children: [
            /* @__PURE__ */ jsx("span", { className: "w-2 h-2 bg-blue-600 rounded-full mr-3" }),
            test
          ] }, idx)) })
        ] }, index);
      }) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg border border-gray-200 p-6", children: [
      /* @__PURE__ */ jsx("h4", { className: "text-lg font-semibold text-gray-900 mb-4", children: "Testing Tools & Best Practices" }),
      /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-6", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h5", { className: "font-medium text-gray-800 mb-3", children: "Testing Stack" }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center text-sm text-gray-600", children: [
              /* @__PURE__ */ jsx("span", { className: "w-2 h-2 bg-blue-600 rounded-full mr-3" }),
              /* @__PURE__ */ jsx("span", { children: "Vitest for test runner and assertions" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center text-sm text-gray-600", children: [
              /* @__PURE__ */ jsx("span", { className: "w-2 h-2 bg-blue-600 rounded-full mr-3" }),
              /* @__PURE__ */ jsx("span", { children: "React Testing Library for component testing" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center text-sm text-gray-600", children: [
              /* @__PURE__ */ jsx("span", { className: "w-2 h-2 bg-blue-600 rounded-full mr-3" }),
              /* @__PURE__ */ jsx("span", { children: "JSDOM for browser environment simulation" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center text-sm text-gray-600", children: [
              /* @__PURE__ */ jsx("span", { className: "w-2 h-2 bg-blue-600 rounded-full mr-3" }),
              /* @__PURE__ */ jsx("span", { children: "MSW for API mocking" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h5", { className: "font-medium text-gray-800 mb-3", children: "Best Practices" }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center text-sm text-gray-600", children: [
              /* @__PURE__ */ jsx("span", { className: "w-2 h-2 bg-blue-600 rounded-full mr-3" }),
              /* @__PURE__ */ jsx("span", { children: "Write tests before implementing features (TDD)" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center text-sm text-gray-600", children: [
              /* @__PURE__ */ jsx("span", { className: "w-2 h-2 bg-blue-600 rounded-full mr-3" }),
              /* @__PURE__ */ jsx("span", { children: "Focus on user behavior over implementation" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center text-sm text-gray-600", children: [
              /* @__PURE__ */ jsx("span", { className: "w-2 h-2 bg-blue-600 rounded-full mr-3" }),
              /* @__PURE__ */ jsx("span", { children: "Maintain test isolation and independence" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center text-sm text-gray-600", children: [
              /* @__PURE__ */ jsx("span", { className: "w-2 h-2 bg-blue-600 rounded-full mr-3" }),
              /* @__PURE__ */ jsx("span", { children: "Keep coverage above 80% for critical paths" })
            ] })
          ] })
        ] })
      ] })
    ] })
  ] });
}
const DATABASE_TABLES = [
  {
    name: "seo_enabled_states",
    description: "Stores which states have SEO features enabled",
    key_columns: [
      { name: "state_name", description: "Name of the state/country" },
      { name: "status", description: "Whether SEO features are enabled for this state" }
    ]
  },
  {
    name: "seo_location_formats",
    description: 'Stores custom "Nga" and "Për" formats for cities and states',
    key_columns: [
      { name: "type", description: "Location type (city or state)" },
      { name: "city", description: "City name (for city type)" },
      { name: "state", description: "State name" },
      { name: "nga_format", description: 'Custom "Nga" format' },
      { name: "per_format", description: 'Custom "Për" format' },
      { name: "status", description: "ready/pending/disabled" }
    ]
  },
  {
    name: "seo_location_connections",
    description: "Defines valid route connections between locations",
    key_columns: [
      { name: "from_location_id", description: "Source location ID" },
      { name: "to_location_id", description: "Destination location ID" },
      { name: "status", description: "active/inactive" }
    ]
  },
  {
    name: "seo_template_types",
    description: "Defines different types of SEO templates",
    key_columns: [
      { name: "name", description: "Template type name" },
      { name: "slug", description: "URL-friendly identifier" },
      { name: "status", description: "active/inactive" }
    ]
  },
  {
    name: "seo_page_templates",
    description: "Stores template configurations for each type",
    key_columns: [
      { name: "template_type_id", description: "Reference to template type" },
      { name: "url_structure", description: "URL pattern with placeholders" },
      { name: "seo_title", description: "Title pattern with placeholders" },
      { name: "meta_description", description: "Description pattern with placeholders" }
    ]
  },
  {
    name: "seo_template_components",
    description: "Configures components used in each template",
    key_columns: [
      { name: "template_id", description: "Reference to page template" },
      { name: "component_name", description: "React component name" },
      { name: "display_order", description: "Component rendering order" },
      { name: "status", description: "active/inactive" }
    ]
  }
];
const TEMPLATE_TYPES = [
  {
    name: "City → City",
    slug: "city-city",
    example: "Tirana → Rome",
    url_pattern: "/bileta-avioni-{nga_city}-ne-{per_city}/"
  },
  {
    name: "State → State",
    slug: "state-state",
    example: "Albania → Italy",
    url_pattern: "/fluturime-{nga_state}-ne-{per_state}/"
  }
];
const COMPONENTS = [
  {
    name: "HeaderComponent",
    description: "Page title and subtitle with location placeholders",
    placeholders: ["{nga_city}", "{per_city}", "{nga_state}", "{per_state}"]
  },
  {
    name: "FlightSearchComponent",
    description: "Search form pre-filled with route details",
    features: ["Date selection", "Passenger count", "Direct flight toggle"]
  },
  {
    name: "PricingTableComponent",
    description: "Shows cheapest flights for the route",
    features: ["Monthly price overview", "Airline information", "Direct vs. connecting flights"]
  },
  {
    name: "RouteInfoComponent",
    description: "Detailed information about the route",
    features: ["Flight duration", "Operating airlines", "Route frequency"]
  },
  {
    name: "FAQComponent",
    description: "Common questions about the route",
    features: ["Dynamic pricing FAQs", "Route-specific information", "Booking guidance"]
  },
  {
    name: "RelatedDestinationsComponent",
    description: "Suggests similar routes",
    features: ["Popular alternatives", "Nearby destinations", "Price comparisons"]
  }
];
const WORKFLOW = [
  {
    step: 1,
    title: "State Selection",
    description: "Enable SEO features for specific states/countries",
    details: [
      "Select states where SEO pages should be generated",
      "Only cities within enabled states can have SEO pages",
      "State enablement triggers city discovery"
    ]
  },
  {
    step: 2,
    title: "Location Configuration",
    description: "Configure formats for cities and states",
    details: [
      'Set custom "Nga" and "Për" formats',
      "Mark locations as ready when configured",
      "Status controls template generation"
    ]
  },
  {
    step: 3,
    title: "Route Connections",
    description: "Define valid routes between locations",
    details: [
      "Automatically generated for ready locations",
      "Manual connection management available",
      "Prevents invalid connections (same city/state)"
    ]
  },
  {
    step: 4,
    title: "Template Generation",
    description: "Automatic creation of SEO pages",
    details: [
      "Templates created for valid connections",
      "Components ordered by configuration",
      "Dynamic content based on route data"
    ]
  }
];
function SEODocs() {
  return /* @__PURE__ */ jsxs("div", { className: "space-y-8", children: [
    /* @__PURE__ */ jsxs("div", { className: "max-w-3xl", children: [
      /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold text-gray-900 mb-2", children: "SEO System Documentation" }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-600", children: "Comprehensive guide to the SEO page generation system, including database structure, template configuration, and automated workflows." })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg border border-gray-200 p-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 mb-4", children: [
        /* @__PURE__ */ jsx(Database, { className: "w-5 h-5 text-blue-600" }),
        /* @__PURE__ */ jsx("h4", { className: "text-lg font-medium text-gray-900", children: "Database Structure" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "space-y-6", children: DATABASE_TABLES.map((table, index) => /* @__PURE__ */ jsxs("div", { className: "border-t border-gray-100 pt-4 first:border-0 first:pt-0", children: [
        /* @__PURE__ */ jsx("h5", { className: "font-medium text-gray-800 mb-2", children: table.name }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600 mb-3", children: table.description }),
        /* @__PURE__ */ jsx("div", { className: "bg-gray-50 rounded-lg p-3", children: /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 gap-2 text-sm", children: table.key_columns.map((col, idx) => /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("span", { className: "font-mono text-blue-600", children: col.name }),
          /* @__PURE__ */ jsx("span", { className: "text-gray-600 block", children: col.description })
        ] }, idx)) }) })
      ] }, index)) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg border border-gray-200 p-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 mb-4", children: [
        /* @__PURE__ */ jsx(Layout, { className: "w-5 h-5 text-blue-600" }),
        /* @__PURE__ */ jsx("h4", { className: "text-lg font-medium text-gray-900", children: "Template Types" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: TEMPLATE_TYPES.map((type, index) => /* @__PURE__ */ jsxs("div", { className: "bg-gray-50 rounded-lg p-4", children: [
        /* @__PURE__ */ jsx("h5", { className: "font-medium text-gray-800 mb-2", children: type.name }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-2 text-sm", children: [
          /* @__PURE__ */ jsxs("p", { className: "text-gray-600", children: [
            "Example: ",
            type.example
          ] }),
          /* @__PURE__ */ jsxs("p", { children: [
            /* @__PURE__ */ jsx("span", { className: "text-gray-500", children: "URL Pattern: " }),
            /* @__PURE__ */ jsx("code", { className: "bg-gray-100 px-2 py-1 rounded text-blue-600", children: type.url_pattern })
          ] })
        ] })
      ] }, index)) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg border border-gray-200 p-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 mb-4", children: [
        /* @__PURE__ */ jsx(Code, { className: "w-5 h-5 text-blue-600" }),
        /* @__PURE__ */ jsx("h4", { className: "text-lg font-medium text-gray-900", children: "Template Components" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "grid gap-6", children: COMPONENTS.map((component, index) => /* @__PURE__ */ jsxs("div", { className: "border-t border-gray-100 pt-4 first:border-0 first:pt-0", children: [
        /* @__PURE__ */ jsx("h5", { className: "font-medium text-gray-800 mb-2", children: component.name }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600 mb-3", children: component.description }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
          component.placeholders && /* @__PURE__ */ jsx("div", { className: "flex gap-2 flex-wrap", children: component.placeholders.map((placeholder, idx) => /* @__PURE__ */ jsx("code", { className: "bg-blue-50 text-blue-700 px-2 py-1 rounded text-sm", children: placeholder }, idx)) }),
          component.features && /* @__PURE__ */ jsx("ul", { className: "grid grid-cols-2 gap-2", children: component.features.map((feature, idx) => /* @__PURE__ */ jsxs("li", { className: "flex items-center text-sm text-gray-600", children: [
            /* @__PURE__ */ jsx("span", { className: "w-1.5 h-1.5 bg-blue-600 rounded-full mr-2" }),
            feature
          ] }, idx)) })
        ] })
      ] }, index)) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg border border-gray-200 p-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 mb-4", children: [
        /* @__PURE__ */ jsx(Settings, { className: "w-5 h-5 text-blue-600" }),
        /* @__PURE__ */ jsx("h4", { className: "text-lg font-medium text-gray-900", children: "Configuration Workflow" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "space-y-6", children: WORKFLOW.map((step, index) => /* @__PURE__ */ jsxs("div", { className: "flex gap-4", children: [
        /* @__PURE__ */ jsx("div", { className: "flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center", children: /* @__PURE__ */ jsx("span", { className: "text-blue-600 font-medium", children: step.step }) }),
        /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
          /* @__PURE__ */ jsx("h5", { className: "font-medium text-gray-800 mb-2", children: step.title }),
          /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600 mb-3", children: step.description }),
          /* @__PURE__ */ jsx("ul", { className: "space-y-1", children: step.details.map((detail, idx) => /* @__PURE__ */ jsxs("li", { className: "flex items-center text-sm text-gray-600", children: [
            /* @__PURE__ */ jsx(ArrowRight, { className: "w-4 h-4 text-blue-600 mr-2" }),
            detail
          ] }, idx)) })
        ] })
      ] }, index)) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg border border-gray-200 p-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 mb-4", children: [
        /* @__PURE__ */ jsx(Share2, { className: "w-5 h-5 text-blue-600" }),
        /* @__PURE__ */ jsx("h4", { className: "text-lg font-medium text-gray-900", children: "Route Connections" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600", children: "Route connections define valid paths between locations for which SEO pages should be generated. The system automatically manages these connections based on location status and prevents invalid combinations." }),
        /* @__PURE__ */ jsxs("div", { className: "bg-yellow-50 border border-yellow-100 rounded-lg p-4", children: [
          /* @__PURE__ */ jsx("h5", { className: "font-medium text-yellow-800 mb-2", children: "Invalid Connections" }),
          /* @__PURE__ */ jsxs("ul", { className: "space-y-2 text-sm text-yellow-700", children: [
            /* @__PURE__ */ jsxs("li", { className: "flex items-center", children: [
              /* @__PURE__ */ jsx("span", { className: "w-1.5 h-1.5 bg-yellow-500 rounded-full mr-2" }),
              "Same city to itself (e.g., Tirana → Tirana)"
            ] }),
            /* @__PURE__ */ jsxs("li", { className: "flex items-center", children: [
              /* @__PURE__ */ jsx("span", { className: "w-1.5 h-1.5 bg-yellow-500 rounded-full mr-2" }),
              "City to its own state (e.g., Tirana → Albania)"
            ] }),
            /* @__PURE__ */ jsxs("li", { className: "flex items-center", children: [
              /* @__PURE__ */ jsx("span", { className: "w-1.5 h-1.5 bg-yellow-500 rounded-full mr-2" }),
              "Connections involving disabled or pending locations"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-blue-50 border border-blue-100 rounded-lg p-4", children: [
          /* @__PURE__ */ jsx("h5", { className: "font-medium text-blue-800 mb-2", children: "Automatic Management" }),
          /* @__PURE__ */ jsxs("ul", { className: "space-y-2 text-sm text-blue-700", children: [
            /* @__PURE__ */ jsxs("li", { className: "flex items-center", children: [
              /* @__PURE__ */ jsx("span", { className: "w-1.5 h-1.5 bg-blue-500 rounded-full mr-2" }),
              "Connections auto-generated when locations marked as ready"
            ] }),
            /* @__PURE__ */ jsxs("li", { className: "flex items-center", children: [
              /* @__PURE__ */ jsx("span", { className: "w-1.5 h-1.5 bg-blue-500 rounded-full mr-2" }),
              "Bi-directional connections created automatically"
            ] }),
            /* @__PURE__ */ jsxs("li", { className: "flex items-center", children: [
              /* @__PURE__ */ jsx("span", { className: "w-1.5 h-1.5 bg-blue-500 rounded-full mr-2" }),
              "Templates generated only for active connections"
            ] })
          ] })
        ] })
      ] })
    ] })
  ] });
}
const SECTIONS = [
  { id: "modules", title: "Module Overview", icon: Book, component: ModuleOverview },
  { id: "auth", title: "Authentication", icon: Shield, component: AuthDocs },
  { id: "agents", title: "Agent Tools", icon: Users, component: AgentDocs },
  { id: "tracking", title: "Route Tracking", icon: TrendingUp, component: TrackingDocs },
  { id: "database", title: "Database Integration", icon: Database, component: DatabaseDocs },
  { id: "api", title: "API Endpoints", icon: Code, component: ApiDocs },
  { id: "dataflow", title: "Data Flow", icon: GitBranch, component: DataFlowDocs },
  { id: "scoring", title: "Scoring Logic", icon: Star, component: ScoringDocs },
  { id: "ui", title: "UI Components", icon: Settings, component: UiDocs },
  { id: "testing", title: "Test Cases", icon: Beaker, component: TestDocs },
  { id: "seo", title: "SEO System", icon: Globe, component: SEODocs }
];
function AdminDocumentation() {
  var _a2;
  const [activeSection, setActiveSection] = useState("modules");
  const ActiveComponent = ((_a2 = SECTIONS.find((s) => s.id === activeSection)) == null ? void 0 : _a2.component) || ModuleOverview;
  return /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg shadow-md overflow-hidden", children: [
    /* @__PURE__ */ jsxs("div", { className: "px-6 py-4 border-b border-gray-200", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold text-gray-800", children: "Documentation" }),
      /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600 mt-1", children: "Comprehensive documentation for the flight search and booking system" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex", children: [
      /* @__PURE__ */ jsx("div", { className: "w-64 border-r border-gray-200 p-4", children: /* @__PURE__ */ jsx("nav", { className: "space-y-1", children: SECTIONS.map((section) => {
        const Icon = section.icon;
        return /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: () => setActiveSection(section.id),
            className: `
                    w-full flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium
                    ${activeSection === section.id ? "bg-blue-50 text-blue-700" : "text-gray-600 hover:bg-gray-50"}
                  `,
            children: [
              /* @__PURE__ */ jsx(Icon, { className: "w-5 h-5" }),
              section.title
            ]
          },
          section.id
        );
      }) }) }),
      /* @__PURE__ */ jsx("div", { className: "flex-1 p-6", children: /* @__PURE__ */ jsx(ActiveComponent, {}) })
    ] })
  ] });
}
function AirportModal({ isOpen, onClose, airport, onSave }) {
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [iataCode, setIataCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    if (airport) {
      setName(airport.name);
      setCity(airport.city);
      setState(airport.state);
      setIataCode(airport.iata_code);
    } else {
      setName("");
      setCity("");
      setState("");
      setIataCode("");
    }
  }, [airport]);
  if (!isOpen) return null;
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      if (airport) {
        const { error: updateError } = await supabase$1.from("airports").update({
          name,
          city,
          state,
          iata_code: iataCode.toUpperCase()
        }).eq("id", airport.id);
        if (updateError) throw updateError;
      } else {
        const { error: createError } = await supabase$1.from("airports").insert([{
          name,
          city,
          state,
          iata_code: iataCode.toUpperCase()
        }]);
        if (createError) throw createError;
      }
      onSave();
      onClose();
    } catch (err) {
      console.error("Error saving airport:", err);
      setError(err instanceof Error ? err.message : "Failed to save airport");
    } finally {
      setLoading(false);
    }
  };
  return /* @__PURE__ */ jsx("div", { className: "fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4", children: /* @__PURE__ */ jsx("div", { className: "bg-white rounded-xl max-w-md w-full", children: /* @__PURE__ */ jsxs("div", { className: "p-6", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mb-6", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold", children: airport ? "Edit Airport" : "Add New Airport" }),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: onClose,
          className: "p-2 hover:bg-gray-100 rounded-full transition-colors",
          children: /* @__PURE__ */ jsx(X, { className: "w-5 h-5" })
        }
      )
    ] }),
    error && /* @__PURE__ */ jsx("div", { className: "mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg", children: error }),
    /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Airport Name" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "text",
            value: name,
            onChange: (e) => setName(e.target.value),
            className: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500",
            required: true
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "City" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "text",
            value: city,
            onChange: (e) => setCity(e.target.value),
            className: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500",
            required: true
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "State/Country" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "text",
            value: state,
            onChange: (e) => setState(e.target.value),
            className: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500",
            required: true
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "IATA Code" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "text",
            value: iataCode,
            onChange: (e) => setIataCode(e.target.value.toUpperCase()),
            className: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase",
            maxLength: 3,
            required: true
          }
        ),
        /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-gray-500", children: "3-letter IATA airport code" })
      ] }),
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "submit",
          disabled: loading,
          className: `w-full py-3 rounded-lg font-semibold text-white ${loading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}`,
          children: loading ? "Saving..." : airport ? "Save Changes" : "Add Airport"
        }
      )
    ] })
  ] }) }) });
}
function AirportsManagement() {
  const [airports, setAirports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedAirport, setSelectedAirport] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [airportToDelete, setAirportToDelete] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [importing, setImporting] = useState(false);
  useEffect(() => {
    fetchAirports();
  }, []);
  const fetchAirports = async () => {
    try {
      const { data, error: error2 } = await supabase$1.from("airports").select("*").order("iata_code");
      if (error2) throw error2;
      setAirports(data || []);
    } catch (err) {
      console.error("Error fetching airports:", err);
      setError("Failed to load airports");
    } finally {
      setLoading(false);
    }
  };
  const handleFileUpload = async (event) => {
    var _a2;
    const file = (_a2 = event.target.files) == null ? void 0 : _a2[0];
    if (!file) return;
    setImporting(true);
    setError(null);
    try {
      const text = await file.text();
      Papa.parse(text, {
        header: true,
        skipEmptyLines: true,
        complete: async (results) => {
          try {
            const airports2 = results.data.map((row) => ({
              name: row["Airport Name"] || row.name,
              city: row.City || row.city,
              state: row.State || row.state,
              iata_code: row["IATA Code"] || row.iata_code
            }));
            const { error: importError } = await supabase$1.from("airports").upsert(airports2, {
              onConflict: "iata_code"
            });
            if (importError) throw importError;
            await fetchAirports();
          } catch (err) {
            console.error("Error importing airports:", err);
            setError("Failed to import airports");
          } finally {
            setImporting(false);
          }
        },
        error: (error2) => {
          console.error("CSV parsing error:", error2);
          setError("Failed to parse CSV file");
          setImporting(false);
        }
      });
    } catch (err) {
      console.error("Error reading file:", err);
      setError("Failed to read file");
      setImporting(false);
    }
  };
  const handleDelete = async () => {
    if (!airportToDelete) return;
    try {
      const { error: error2 } = await supabase$1.from("airports").delete().eq("id", airportToDelete.id);
      if (error2) throw error2;
      setAirports(airports.filter((airport) => airport.id !== airportToDelete.id));
      setIsDeleteDialogOpen(false);
      setAirportToDelete(null);
    } catch (err) {
      console.error("Error deleting airport:", err);
      setError("Failed to delete airport");
    }
  };
  const filteredAirports = airports.filter(
    (airport) => airport.name.toLowerCase().includes(searchTerm.toLowerCase()) || airport.city.toLowerCase().includes(searchTerm.toLowerCase()) || airport.state.toLowerCase().includes(searchTerm.toLowerCase()) || airport.iata_code.toLowerCase().includes(searchTerm.toLowerCase())
  );
  if (loading) {
    return /* @__PURE__ */ jsx("div", { className: "min-h-[400px] flex items-center justify-center", children: /* @__PURE__ */ jsx(Loader2, { className: "w-8 h-8 text-blue-600 animate-spin" }) });
  }
  return /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg shadow-md overflow-hidden", children: [
    /* @__PURE__ */ jsx("div", { className: "px-6 py-4 border-b border-gray-200", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
        /* @__PURE__ */ jsx(Plane, { className: "w-6 h-6 text-blue-600 mr-2" }),
        /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold text-gray-800", children: "Airports" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex gap-3", children: [
        /* @__PURE__ */ jsxs("label", { className: "flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 cursor-pointer transition-colors", children: [
          /* @__PURE__ */ jsx(Upload, { className: "w-5 h-5 mr-2" }),
          "Import CSV",
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "file",
              accept: ".csv",
              className: "hidden",
              onChange: handleFileUpload,
              disabled: importing
            }
          )
        ] }),
        /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: () => {
              setSelectedAirport(null);
              setIsModalOpen(true);
            },
            className: "flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors",
            children: [
              /* @__PURE__ */ jsx(Plus, { className: "w-5 h-5 mr-2" }),
              "Add Airport"
            ]
          }
        )
      ] })
    ] }) }),
    error && /* @__PURE__ */ jsxs("div", { className: "m-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center text-red-700", children: [
      /* @__PURE__ */ jsx(AlertTriangle, { className: "w-5 h-5 mr-2" }),
      error
    ] }),
    importing && /* @__PURE__ */ jsxs("div", { className: "m-6 p-4 bg-blue-50 border border-blue-200 rounded-lg flex items-center text-blue-700", children: [
      /* @__PURE__ */ jsx(Loader2, { className: "w-5 h-5 mr-2 animate-spin" }),
      "Importing airports..."
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "p-6", children: [
      /* @__PURE__ */ jsx("div", { className: "mb-6", children: /* @__PURE__ */ jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 text-gray-400", size: 20 }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "text",
            value: searchTerm,
            onChange: (e) => setSearchTerm(e.target.value),
            placeholder: "Search airports...",
            className: "w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          }
        )
      ] }) }),
      /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "min-w-full divide-y divide-gray-200", children: [
        /* @__PURE__ */ jsx("thead", { className: "bg-gray-50", children: /* @__PURE__ */ jsxs("tr", { children: [
          /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "IATA Code" }),
          /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Airport Name" }),
          /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "City" }),
          /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "State/Country" }),
          /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Actions" })
        ] }) }),
        /* @__PURE__ */ jsx("tbody", { className: "bg-white divide-y divide-gray-200", children: filteredAirports.map((airport) => /* @__PURE__ */ jsxs("tr", { className: "hover:bg-gray-50", children: [
          /* @__PURE__ */ jsx("td", { className: "px-6 py-4 whitespace-nowrap font-medium text-gray-900", children: airport.iata_code }),
          /* @__PURE__ */ jsx("td", { className: "px-6 py-4 whitespace-nowrap text-gray-600", children: airport.name }),
          /* @__PURE__ */ jsx("td", { className: "px-6 py-4 whitespace-nowrap text-gray-600", children: airport.city }),
          /* @__PURE__ */ jsx("td", { className: "px-6 py-4 whitespace-nowrap text-gray-600", children: airport.state }),
          /* @__PURE__ */ jsx("td", { className: "px-6 py-4 whitespace-nowrap", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-3", children: [
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => {
                  setSelectedAirport(airport);
                  setIsModalOpen(true);
                },
                className: "text-blue-600 hover:text-blue-800",
                title: "Edit airport",
                children: /* @__PURE__ */ jsx(Edit2, { className: "w-5 h-5" })
              }
            ),
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => {
                  setAirportToDelete(airport);
                  setIsDeleteDialogOpen(true);
                },
                className: "text-red-600 hover:text-red-800",
                title: "Delete airport",
                children: /* @__PURE__ */ jsx(Trash2, { className: "w-5 h-5" })
              }
            )
          ] }) })
        ] }, airport.id)) })
      ] }) })
    ] }),
    /* @__PURE__ */ jsx(
      AirportModal,
      {
        isOpen: isModalOpen,
        onClose: () => {
          setIsModalOpen(false);
          setSelectedAirport(null);
        },
        airport: selectedAirport,
        onSave: fetchAirports
      }
    ),
    /* @__PURE__ */ jsx(
      ConfirmDialog,
      {
        isOpen: isDeleteDialogOpen,
        title: "Delete Airport",
        message: `Are you sure you want to delete ${airportToDelete == null ? void 0 : airportToDelete.name}? This action cannot be undone.`,
        confirmLabel: "Delete",
        confirmVariant: "danger",
        onConfirm: handleDelete,
        onCancel: () => setIsDeleteDialogOpen(false)
      }
    )
  ] });
}
function StateSelection() {
  const [states, setStates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [saving, setSaving] = useState(null);
  const ITEMS_PER_PAGE2 = 10;
  useEffect(() => {
    fetchStates();
  }, []);
  const fetchStates = async () => {
    try {
      setLoading(true);
      setError(null);
      const { data: uniqueStates, error: statesError } = await supabase$1.from("airports").select("state").order("state");
      if (statesError) throw statesError;
      const { data: enabledStates, error: enabledError } = await supabase$1.from("seo_enabled_states").select("state_name");
      if (enabledError) throw enabledError;
      const enabledSet = new Set((enabledStates == null ? void 0 : enabledStates.map((s) => s.state_name)) || []);
      const uniqueStatesList = Array.from(
        new Set((uniqueStates == null ? void 0 : uniqueStates.map((s) => s.state)) || [])
      ).map((state) => ({
        state_name: state,
        is_enabled: enabledSet.has(state)
      }));
      setStates(uniqueStatesList);
    } catch (err) {
      console.error("Error fetching states:", err);
      setError("Failed to load states. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  const handleToggle = async (state) => {
    try {
      setSaving(state.state_name);
      setError(null);
      if (state.is_enabled) {
        const { error: deleteError } = await supabase$1.from("seo_enabled_states").delete().eq("state_name", state.state_name);
        if (deleteError) throw deleteError;
        const { error: formatsError } = await supabase$1.from("seo_location_formats").delete().eq("state", state.state_name);
        if (formatsError) throw formatsError;
      } else {
        const { error: insertError } = await supabase$1.from("seo_enabled_states").insert([{ state_name: state.state_name }]).select().single();
        if (insertError) throw insertError;
        const { data: cities, error: citiesError } = await supabase$1.from("airports").select("city, state").eq("state", state.state_name);
        if (citiesError) throw citiesError;
        const uniqueCityPairs = Array.from(
          new Set((cities || []).map((c) => `${c.city}-${c.state}`))
        ).map((pair) => {
          const [city, state2] = pair.split("-");
          return { city, state: state2 };
        });
        const stateFormat = {
          type: "state",
          city: null,
          state: state.state_name,
          nga_format: `Nga ${state.state_name}`,
          per_format: `Për ${state.state_name}`,
          status: "pending"
        };
        const cityFormats = uniqueCityPairs.map((pair) => ({
          type: "city",
          city: pair.city,
          state: pair.state,
          nga_format: `Nga ${pair.city}`,
          per_format: `Për ${pair.city}`,
          status: "pending"
        }));
        for (const format2 of [stateFormat, ...cityFormats]) {
          const { error: formatError } = await supabase$1.from("seo_location_formats").upsert(format2, {
            onConflict: "type,city,state"
          });
          if (formatError) {
            console.error("Error inserting format:", formatError);
          }
        }
      }
      setStates(states.map(
        (s) => s.state_name === state.state_name ? { ...s, is_enabled: !s.is_enabled } : s
      ));
    } catch (err) {
      console.error("Error toggling state:", err);
      setError("Failed to update state. Please try again.");
    } finally {
      setSaving(null);
    }
  };
  const filteredStates = states.filter(
    (state) => state.state_name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const totalPages = Math.ceil(filteredStates.length / ITEMS_PER_PAGE2);
  const paginatedStates = filteredStates.slice(
    (currentPage - 1) * ITEMS_PER_PAGE2,
    currentPage * ITEMS_PER_PAGE2
  );
  if (loading) {
    return /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center p-8", children: /* @__PURE__ */ jsx(Loader2, { className: "w-8 h-8 text-blue-600 animate-spin" }) });
  }
  return /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxs("div", { className: "relative", children: [
      /* @__PURE__ */ jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 text-gray-400", size: 20 }),
      /* @__PURE__ */ jsx(
        "input",
        {
          type: "text",
          value: searchTerm,
          onChange: (e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          },
          placeholder: "Search states...",
          className: "w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        }
      )
    ] }),
    error && /* @__PURE__ */ jsxs("div", { className: "p-4 bg-red-50 border border-red-200 rounded-lg flex items-center text-red-700", children: [
      /* @__PURE__ */ jsx(AlertCircle, { className: "w-5 h-5 mr-2" }),
      error
    ] }),
    /* @__PURE__ */ jsx("div", { className: "bg-white rounded-lg border border-gray-200 overflow-hidden", children: /* @__PURE__ */ jsxs("table", { className: "min-w-full divide-y divide-gray-200", children: [
      /* @__PURE__ */ jsx("thead", { className: "bg-gray-50", children: /* @__PURE__ */ jsxs("tr", { children: [
        /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "State" }),
        /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider", children: "SEO Status" })
      ] }) }),
      /* @__PURE__ */ jsx("tbody", { className: "bg-white divide-y divide-gray-200", children: paginatedStates.map((state) => /* @__PURE__ */ jsxs("tr", { className: "hover:bg-gray-50", children: [
        /* @__PURE__ */ jsx("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-900", children: state.state_name }),
        /* @__PURE__ */ jsx("td", { className: "px-6 py-4 whitespace-nowrap text-right", children: /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => handleToggle(state),
            disabled: saving === state.state_name,
            className: "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
            style: {
              backgroundColor: state.is_enabled ? "#2563eb" : "#d1d5db"
            },
            children: /* @__PURE__ */ jsx(
              "span",
              {
                className: `pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${state.is_enabled ? "translate-x-5" : "translate-x-0"}`
              }
            )
          }
        ) })
      ] }, state.state_name)) })
    ] }) }),
    totalPages > 1 && /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-700", children: [
        "Showing",
        " ",
        /* @__PURE__ */ jsx("span", { className: "font-medium", children: Math.min((currentPage - 1) * ITEMS_PER_PAGE2 + 1, filteredStates.length) }),
        " ",
        "to",
        " ",
        /* @__PURE__ */ jsx("span", { className: "font-medium", children: Math.min(currentPage * ITEMS_PER_PAGE2, filteredStates.length) }),
        " ",
        "of ",
        /* @__PURE__ */ jsx("span", { className: "font-medium", children: filteredStates.length }),
        " states"
      ] }) }),
      /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => setCurrentPage((page) => Math.max(1, page - 1)),
            disabled: currentPage === 1,
            className: `px-3 py-1 rounded ${currentPage === 1 ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-300"}`,
            children: "Previous"
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => setCurrentPage((page) => Math.min(totalPages, page + 1)),
            disabled: currentPage === totalPages,
            className: `px-3 py-1 rounded ${currentPage === totalPages ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-300"}`,
            children: "Next"
          }
        )
      ] })
    ] })
  ] });
}
function LocationFormats() {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [saving, setSaving] = useState(null);
  const [editingCell, setEditingCell] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const ITEMS_PER_PAGE2 = 10;
  useEffect(() => {
    fetchLocations();
  }, []);
  const fetchLocations = async () => {
    try {
      setLoading(true);
      setError(null);
      const { data: enabledStates, error: statesError } = await supabase$1.from("seo_enabled_states").select("state_name");
      if (statesError) throw statesError;
      if (!(enabledStates == null ? void 0 : enabledStates.length)) {
        setLocations([]);
        return;
      }
      const { data: cities, error: citiesError } = await supabase$1.from("airports").select("city, state").in("state", enabledStates.map((s) => s.state_name)).order("city");
      if (citiesError) throw citiesError;
      const { data: formats, error: formatsError } = await supabase$1.from("seo_location_formats").select("*");
      if (formatsError) throw formatsError;
      const formatMap = new Map(
        (formats == null ? void 0 : formats.map((f) => [
          f.type === "city" ? `city-${f.city}-${f.state}` : `state-${f.state}`,
          f
        ])) || []
      );
      const statesList = enabledStates.map(({ state_name }) => {
        const format2 = formatMap.get(`state-${state_name}`);
        return {
          id: format2 == null ? void 0 : format2.id,
          type: "state",
          city: null,
          state: state_name,
          nga_format: (format2 == null ? void 0 : format2.nga_format) || null,
          per_format: (format2 == null ? void 0 : format2.per_format) || null,
          status: (format2 == null ? void 0 : format2.status) || "pending",
          template_created: (format2 == null ? void 0 : format2.template_created) || false,
          template_url: (format2 == null ? void 0 : format2.template_url) || null
        };
      });
      const uniqueCityKeys = /* @__PURE__ */ new Set();
      const citiesList = [];
      (cities || []).forEach((cityObj) => {
        const cityKey = `${cityObj.city}-${cityObj.state}`;
        if (!uniqueCityKeys.has(cityKey)) {
          uniqueCityKeys.add(cityKey);
          const format2 = formatMap.get(`city-${cityObj.city}-${cityObj.state}`);
          citiesList.push({
            id: format2 == null ? void 0 : format2.id,
            type: "city",
            city: cityObj.city,
            state: cityObj.state,
            nga_format: (format2 == null ? void 0 : format2.nga_format) || null,
            per_format: (format2 == null ? void 0 : format2.per_format) || null,
            status: (format2 == null ? void 0 : format2.status) || "pending",
            template_created: (format2 == null ? void 0 : format2.template_created) || false,
            template_url: (format2 == null ? void 0 : format2.template_url) || null
          });
        }
      });
      setLocations([
        ...statesList.sort((a, b) => a.state.localeCompare(b.state)),
        ...citiesList.sort((a, b) => a.city.localeCompare(b.city))
      ]);
    } catch (err) {
      console.error("Error fetching locations:", err);
      setError("Failed to load locations. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  const handleStatusChange = async (location, newStatus) => {
    try {
      const savingId = location.type === "city" ? location.city : location.state;
      setSaving(savingId);
      setError(null);
      const updatedLocation = {
        ...location,
        status: newStatus,
        // Set default formats if changing to ready and formats are not set
        nga_format: newStatus === "ready" && !location.nga_format ? `Nga ${location.type === "city" ? location.city : location.state}` : location.nga_format,
        per_format: newStatus === "ready" && !location.per_format ? `per ${location.type === "city" ? location.city : location.state}` : location.per_format
      };
      const { data: savedFormat, error: saveError } = await supabase$1.from("seo_location_formats").update({
        nga_format: updatedLocation.nga_format,
        per_format: updatedLocation.per_format,
        status: updatedLocation.status
      }).eq("id", location.id).select().single();
      if (saveError) throw saveError;
      if (!savedFormat) throw new Error("Failed to save location format");
      if (newStatus === "ready") {
        const { data: readyLocations, error: readyError } = await supabase$1.from("seo_location_formats").select("*").eq("status", "ready").neq("id", location.id);
        if (readyError) throw readyError;
        const { data: templateTypes, error: typesError } = await supabase$1.from("seo_template_types").select(`
          id,
          slug,
          templates:seo_page_templates(
            id,
            template_type_id,
            url_structure
          )
        `).eq("status", "active");
        if (typesError) throw typesError;
        const templateTypeMap = /* @__PURE__ */ new Map();
        templateTypes == null ? void 0 : templateTypes.forEach((type) => {
          if (type.templates) {
            templateTypeMap.set(type.slug, {
              id: type.id,
              url_structure: type.templates.url_structure
            });
          }
        });
        const connections = [];
        for (const otherLocation of readyLocations || []) {
          if (location.id === otherLocation.id || location.type === "city" && otherLocation.type === "state" && location.state === otherLocation.state || location.type === "state" && otherLocation.type === "city" && location.state === otherLocation.state) {
            continue;
          }
          const templateKey = `${location.type}-${otherLocation.type}`;
          const templateType = templateTypeMap.get(templateKey);
          if (!templateType) continue;
          let forwardUrl = templateType.url_structure;
          forwardUrl = forwardUrl.replace(
            "{nga_city}",
            location.nga_format || `nga-${location.city}`
          );
          forwardUrl = forwardUrl.replace(
            "{nga_state}",
            location.nga_format || `nga-${location.state}`
          );
          forwardUrl = forwardUrl.replace(
            "{per_city}",
            otherLocation.per_format || `per-${otherLocation.city}`
          );
          forwardUrl = forwardUrl.replace(
            "{per_state}",
            otherLocation.per_format || `per-${otherLocation.state}`
          );
          let reverseUrl = templateType.url_structure;
          reverseUrl = reverseUrl.replace(
            "{nga_city}",
            otherLocation.nga_format || `nga-${otherLocation.city}`
          );
          reverseUrl = reverseUrl.replace(
            "{nga_state}",
            otherLocation.nga_format || `nga-${otherLocation.state}`
          );
          reverseUrl = reverseUrl.replace(
            "{per_city}",
            location.per_format || `per-${location.city}`
          );
          reverseUrl = reverseUrl.replace(
            "{per_state}",
            location.per_format || `per-${location.state}`
          );
          const cleanForwardUrl = forwardUrl.toLowerCase().replace(/\s+/g, "-").replace(/[^\w\-\/]/g, "").replace(/\-+/g, "-").replace(/^\-+|\-+$/g, "");
          const cleanReverseUrl = reverseUrl.toLowerCase().replace(/\s+/g, "-").replace(/[^\w\-\/]/g, "").replace(/\-+/g, "-").replace(/^\-+|\-+$/g, "");
          connections.push({
            from_location_id: location.id,
            to_location_id: otherLocation.id,
            status: "active",
            template_type_id: templateType.id,
            template_url: cleanForwardUrl
          });
          connections.push({
            from_location_id: otherLocation.id,
            to_location_id: location.id,
            status: "active",
            template_type_id: templateType.id,
            template_url: cleanReverseUrl
          });
        }
        const BATCH_SIZE = 50;
        for (let i = 0; i < connections.length; i += BATCH_SIZE) {
          const batch = connections.slice(i, i + BATCH_SIZE);
          const { error: insertError } = await supabase$1.from("seo_location_connections").upsert(batch, {
            onConflict: "from_location_id,to_location_id"
          });
          if (insertError) throw insertError;
        }
      }
      setLocations(
        (prevLocations) => prevLocations.map(
          (loc) => loc.id === location.id ? { ...updatedLocation, id: savedFormat.id } : loc
        )
      );
    } catch (err) {
      console.error("Error saving location format:", err);
      setError("Failed to save location format. Please try again.");
    } finally {
      setSaving(null);
    }
  };
  const handleCellClick = (location, field) => {
    if (location.type === "city" && field === "state") return;
    const id = location.id || `${location.type}-${location.city}-${location.state}`;
    setEditingCell({ id, field });
    setEditValue(location[field] || "");
  };
  const handleCellBlur = async (location) => {
    if (!editingCell) return;
    try {
      const savingId = location.type === "city" ? location.city : location.state;
      setSaving(savingId);
      setError(null);
      const updatedLocation = {
        ...location,
        [editingCell.field]: editValue || null
      };
      let savedFormat;
      if (location.id) {
        const { data, error: updateError } = await supabase$1.from("seo_location_formats").update({
          nga_format: updatedLocation.nga_format,
          per_format: updatedLocation.per_format,
          status: updatedLocation.status
        }).eq("id", location.id).select().single();
        if (updateError) throw updateError;
        if (!data) throw new Error("Failed to update location format");
        savedFormat = data;
      } else {
        const { data, error: insertError } = await supabase$1.from("seo_location_formats").insert({
          type: updatedLocation.type,
          city: updatedLocation.city,
          state: updatedLocation.state,
          nga_format: updatedLocation.nga_format,
          per_format: updatedLocation.per_format,
          status: updatedLocation.status
        }).select().single();
        if (insertError) throw insertError;
        if (!data) throw new Error("Failed to insert location format");
        savedFormat = data;
      }
      setLocations(
        (prev) => prev.map(
          (loc) => loc.type === location.type && (loc.type === "city" && loc.city === location.city || loc.type === "state" && loc.state === location.state) ? { ...updatedLocation, id: savedFormat.id } : loc
        )
      );
      setEditingCell(null);
    } catch (err) {
      console.error("Error saving location format:", err);
      setError("Failed to save location format. Please try again.");
    } finally {
      setSaving(null);
    }
  };
  const filteredLocations = locations.filter((location) => {
    const searchableText = location.type === "city" ? `${location.city} ${location.state}` : location.state;
    const matchesSearch = searchableText.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || location.status === statusFilter;
    const matchesType = typeFilter === "all" || location.type === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });
  const totalPages = Math.ceil(filteredLocations.length / ITEMS_PER_PAGE2);
  const paginatedLocations = filteredLocations.slice(
    (currentPage - 1) * ITEMS_PER_PAGE2,
    currentPage * ITEMS_PER_PAGE2
  );
  if (loading) {
    return /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center p-8", children: /* @__PURE__ */ jsx(Loader2, { className: "w-8 h-8 text-blue-600 animate-spin" }) });
  }
  if (locations.length === 0) {
    return /* @__PURE__ */ jsxs("div", { className: "text-center py-8", children: [
      /* @__PURE__ */ jsx("div", { className: "w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4", children: /* @__PURE__ */ jsx(AlertCircle, { className: "w-8 h-8 text-yellow-600" }) }),
      /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold text-gray-900 mb-2", children: "No Locations Available" }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-600", children: 'Please enable some states in the "Select States for SEO" tab first.' })
    ] });
  }
  return /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row gap-4", children: [
      /* @__PURE__ */ jsx("div", { className: "flex-1", children: /* @__PURE__ */ jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsx(
          Search,
          {
            className: "absolute left-3 top-1/2 -translate-y-1/2 text-gray-400",
            size: 20
          }
        ),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "text",
            value: searchTerm,
            onChange: (e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            },
            placeholder: "Search locations...",
            className: "w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          }
        )
      ] }) }),
      /* @__PURE__ */ jsx("div", { className: "md:w-48", children: /* @__PURE__ */ jsxs(
        "select",
        {
          value: typeFilter,
          onChange: (e) => {
            setTypeFilter(e.target.value);
            setCurrentPage(1);
          },
          className: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500",
          children: [
            /* @__PURE__ */ jsx("option", { value: "all", children: "All Types" }),
            /* @__PURE__ */ jsx("option", { value: "state", children: "States Only" }),
            /* @__PURE__ */ jsx("option", { value: "city", children: "Cities Only" })
          ]
        }
      ) }),
      /* @__PURE__ */ jsx("div", { className: "md:w-64", children: /* @__PURE__ */ jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsx(
          Filter,
          {
            className: "absolute left-3 top-1/2 -translate-y-1/2 text-gray-400",
            size: 20
          }
        ),
        /* @__PURE__ */ jsxs(
          "select",
          {
            value: statusFilter,
            onChange: (e) => {
              setStatusFilter(e.target.value);
              setCurrentPage(1);
            },
            className: "w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500",
            children: [
              /* @__PURE__ */ jsx("option", { value: "all", children: "All Statuses" }),
              /* @__PURE__ */ jsx("option", { value: "ready", children: "✅ OK to be used" }),
              /* @__PURE__ */ jsx("option", { value: "pending", children: "⏳ Waiting for configuration" }),
              /* @__PURE__ */ jsx("option", { value: "disabled", children: "❌ Not needed" })
            ]
          }
        )
      ] }) })
    ] }),
    error && /* @__PURE__ */ jsxs("div", { className: "p-4 bg-red-50 border border-red-200 rounded-lg flex items-center text-red-700", children: [
      /* @__PURE__ */ jsx(AlertCircle, { className: "w-5 h-5 mr-2" }),
      error
    ] }),
    /* @__PURE__ */ jsx("div", { className: "bg-white rounded-lg border border-gray-200 overflow-hidden", children: /* @__PURE__ */ jsxs("table", { className: "min-w-full divide-y divide-gray-200", children: [
      /* @__PURE__ */ jsx("thead", { className: "bg-gray-50", children: /* @__PURE__ */ jsxs("tr", { children: [
        /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Name" }),
        /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Type" }),
        /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "State" }),
        /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Nga Format" }),
        /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Per Format" }),
        /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Status" }),
        /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Template" })
      ] }) }),
      /* @__PURE__ */ jsx("tbody", { className: "bg-white divide-y divide-gray-200", children: paginatedLocations.map((location) => {
        const uniqueId = location.id || `${location.type}-${location.city || ""}-${location.state}`;
        const isEditing = (editingCell == null ? void 0 : editingCell.id) === uniqueId;
        const isSaving = saving === (location.type === "city" ? location.city : location.state);
        return /* @__PURE__ */ jsxs("tr", { className: "hover:bg-gray-50", children: [
          /* @__PURE__ */ jsx("td", { className: "px-6 py-4 whitespace-nowrap text-sm", children: /* @__PURE__ */ jsx(
            "span",
            {
              className: `font-${location.type === "state" ? "medium" : "normal"}`,
              children: location.type === "city" ? location.city : location.state
            }
          ) }),
          /* @__PURE__ */ jsx("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-500", children: location.type === "state" ? "State" : "City" }),
          /* @__PURE__ */ jsx("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-900", children: location.state }),
          /* @__PURE__ */ jsx(
            "td",
            {
              className: "px-6 py-4 whitespace-nowrap text-sm cursor-pointer hover:bg-gray-100",
              onClick: () => handleCellClick(location, "nga_format"),
              children: isEditing && (editingCell == null ? void 0 : editingCell.field) === "nga_format" ? /* @__PURE__ */ jsx(
                "input",
                {
                  type: "text",
                  value: editValue,
                  onChange: (e) => setEditValue(e.target.value),
                  onBlur: () => handleCellBlur(location),
                  className: "w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500",
                  autoFocus: true
                }
              ) : /* @__PURE__ */ jsx("span", { className: "text-gray-900", children: location.nga_format || `Nga ${location.type === "city" ? location.city : location.state}` })
            }
          ),
          /* @__PURE__ */ jsx(
            "td",
            {
              className: "px-6 py-4 whitespace-nowrap text-sm cursor-pointer hover:bg-gray-100",
              onClick: () => handleCellClick(location, "per_format"),
              children: isEditing && (editingCell == null ? void 0 : editingCell.field) === "per_format" ? /* @__PURE__ */ jsx(
                "input",
                {
                  type: "text",
                  value: editValue,
                  onChange: (e) => setEditValue(e.target.value),
                  onBlur: () => handleCellBlur(location),
                  className: "w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500",
                  autoFocus: true
                }
              ) : /* @__PURE__ */ jsx("span", { className: "text-gray-900", children: location.per_format || `per ${location.type === "city" ? location.city : location.state}` })
            }
          ),
          /* @__PURE__ */ jsx("td", { className: "px-6 py-4 whitespace-nowrap", children: /* @__PURE__ */ jsxs(
            "select",
            {
              value: location.status,
              onChange: (e) => handleStatusChange(location, e.target.value),
              disabled: isSaving,
              className: `
                        px-3 py-1 rounded-full text-sm font-medium
                        ${location.status === "ready" ? "bg-green-100 text-green-800" : location.status === "pending" ? "bg-yellow-100 text-yellow-800" : "bg-red-100 text-red-800"}
                      `,
              children: [
                /* @__PURE__ */ jsx("option", { value: "ready", children: "✅ OK to be used" }),
                /* @__PURE__ */ jsx("option", { value: "pending", children: "⏳ Waiting" }),
                /* @__PURE__ */ jsx("option", { value: "disabled", children: "❌ Not needed" })
              ]
            }
          ) }),
          /* @__PURE__ */ jsx("td", { className: "px-6 py-4 whitespace-nowrap", children: location.template_created ? /* @__PURE__ */ jsxs(
            "a",
            {
              href: location.template_url || "#",
              target: "_blank",
              rel: "noopener noreferrer",
              className: "inline-flex items-center gap-1 text-blue-600 hover:text-blue-800",
              children: [
                /* @__PURE__ */ jsx(ExternalLink, { className: "w-4 h-4" }),
                "View Template"
              ]
            }
          ) : /* @__PURE__ */ jsx("span", { className: "text-gray-500", children: "Not Created" }) })
        ] }, uniqueId);
      }) })
    ] }) }),
    totalPages > 1 && /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-700", children: [
        "Showing",
        " ",
        /* @__PURE__ */ jsx("span", { className: "font-medium", children: Math.min((currentPage - 1) * ITEMS_PER_PAGE2 + 1, filteredLocations.length) }),
        " ",
        "to",
        " ",
        /* @__PURE__ */ jsx("span", { className: "font-medium", children: Math.min(currentPage * ITEMS_PER_PAGE2, filteredLocations.length) }),
        " ",
        "of ",
        /* @__PURE__ */ jsx("span", { className: "font-medium", children: filteredLocations.length }),
        " locations"
      ] }) }),
      /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => setCurrentPage((page) => Math.max(1, page - 1)),
            disabled: currentPage === 1,
            className: `px-3 py-1 rounded ${currentPage === 1 ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-300"}`,
            children: "Previous"
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => setCurrentPage((page) => Math.min(totalPages, page + 1)),
            disabled: currentPage === totalPages,
            className: `px-3 py-1 rounded ${currentPage === totalPages ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-300"}`,
            children: "Next"
          }
        )
      ] })
    ] })
  ] });
}
function TemplateTypeModal({ isOpen, onClose, template, onSave }) {
  const [name, setName] = useState((template == null ? void 0 : template.name) || "");
  const [description, setDescription] = useState((template == null ? void 0 : template.description) || "");
  const [status, setStatus] = useState((template == null ? void 0 : template.status) || "active");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    if (template) {
      setName(template.name);
      setDescription(template.description);
      setStatus(template.status);
    } else {
      setName("");
      setDescription("");
      setStatus("active");
    }
  }, [template]);
  if (!isOpen) return null;
  const generateSlug = (name2) => {
    return name2.toLowerCase().replace(/[→]/g, "-").replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "").replace(/-+/g, "-").replace(/^-|-$/g, "");
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const slug = (template == null ? void 0 : template.slug) || generateSlug(name);
      if (template == null ? void 0 : template.id) {
        const { error: updateError } = await supabase$1.from("seo_template_types").update({
          name,
          description,
          status,
          updated_at: (/* @__PURE__ */ new Date()).toISOString()
        }).eq("id", template.id);
        if (updateError) throw updateError;
      } else {
        const { error: insertError } = await supabase$1.from("seo_template_types").insert([{
          name,
          slug,
          description,
          status
        }]);
        if (insertError) throw insertError;
      }
      onSave();
      onClose();
    } catch (err) {
      console.error("Error saving template:", err);
      setError(err instanceof Error ? err.message : "Failed to save template");
    } finally {
      setLoading(false);
    }
  };
  return /* @__PURE__ */ jsx("div", { className: "fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4", children: /* @__PURE__ */ jsx("div", { className: "bg-white rounded-xl max-w-md w-full", children: /* @__PURE__ */ jsxs("div", { className: "p-6", children: [
    /* @__PURE__ */ jsx("h2", { className: "text-xl font-bold mb-4", children: template ? "Edit Template Type" : "Add Template Type" }),
    error && /* @__PURE__ */ jsx("div", { className: "mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg", children: error }),
    /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Name" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "text",
            value: name,
            onChange: (e) => setName(e.target.value),
            className: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500",
            placeholder: "e.g., State → State",
            required: true
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Description" }),
        /* @__PURE__ */ jsx(
          "textarea",
          {
            value: description,
            onChange: (e) => setDescription(e.target.value),
            className: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500",
            rows: 3,
            required: true
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Status" }),
        /* @__PURE__ */ jsxs(
          "select",
          {
            value: status,
            onChange: (e) => setStatus(e.target.value),
            className: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500",
            children: [
              /* @__PURE__ */ jsx("option", { value: "active", children: "Active" }),
              /* @__PURE__ */ jsx("option", { value: "inactive", children: "Inactive" })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex justify-end gap-3 pt-4", children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            onClick: onClose,
            className: "px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg",
            children: "Cancel"
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "submit",
            disabled: loading,
            className: `px-4 py-2 rounded-lg text-white ${loading ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"}`,
            children: loading ? "Saving..." : template ? "Save Changes" : "Add Template"
          }
        )
      ] })
    ] })
  ] }) }) });
}
function TemplateTypes() {
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE2 = 10;
  useEffect(() => {
    fetchTemplates();
  }, []);
  const fetchTemplates = async () => {
    try {
      setLoading(true);
      setError(null);
      const { data, error: error2 } = await supabase$1.from("seo_template_types").select("*").order("created_at", { ascending: false });
      if (error2) throw error2;
      setTemplates(data || []);
    } catch (err) {
      console.error("Error fetching templates:", err);
      setError("Failed to load templates");
    } finally {
      setLoading(false);
    }
  };
  const handleDelete = async (template) => {
    if (!confirm("Are you sure you want to delete this template?")) return;
    try {
      const { error: deleteError } = await supabase$1.from("seo_template_types").delete().eq("id", template.id);
      if (deleteError) throw deleteError;
      await fetchTemplates();
    } catch (err) {
      console.error("Error deleting template:", err);
      setError("Failed to delete template");
    }
  };
  const filteredTemplates = templates.filter(
    (template) => template.name.toLowerCase().includes(searchTerm.toLowerCase()) || template.description.toLowerCase().includes(searchTerm.toLowerCase()) || template.slug.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const paginatedTemplates = filteredTemplates.slice(
    (currentPage - 1) * ITEMS_PER_PAGE2,
    currentPage * ITEMS_PER_PAGE2
  );
  if (loading) {
    return /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center p-8", children: /* @__PURE__ */ jsx(Loader2, { className: "w-8 h-8 text-blue-600 animate-spin" }) });
  }
  return /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxs("div", { className: "relative flex-1 max-w-md", children: [
        /* @__PURE__ */ jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 text-gray-400", size: 20 }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "text",
            value: searchTerm,
            onChange: (e) => setSearchTerm(e.target.value),
            placeholder: "Search templates...",
            className: "w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs(
        "button",
        {
          onClick: () => {
            setSelectedTemplate(void 0);
            setIsModalOpen(true);
          },
          className: "flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700",
          children: [
            /* @__PURE__ */ jsx(Plus, { className: "w-5 h-5 mr-2" }),
            "Add Template"
          ]
        }
      )
    ] }),
    error && /* @__PURE__ */ jsxs("div", { className: "p-4 bg-red-50 border border-red-200 rounded-lg flex items-center text-red-700", children: [
      /* @__PURE__ */ jsx(AlertCircle, { className: "w-5 h-5 mr-2" }),
      error
    ] }),
    /* @__PURE__ */ jsx("div", { className: "bg-white rounded-lg border border-gray-200 overflow-hidden", children: /* @__PURE__ */ jsxs("table", { className: "min-w-full divide-y divide-gray-200", children: [
      /* @__PURE__ */ jsx("thead", { className: "bg-gray-50", children: /* @__PURE__ */ jsxs("tr", { children: [
        /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Name" }),
        /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Slug" }),
        /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Description" }),
        /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Status" }),
        /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Actions" })
      ] }) }),
      /* @__PURE__ */ jsx("tbody", { className: "bg-white divide-y divide-gray-200", children: paginatedTemplates.map((template) => /* @__PURE__ */ jsxs("tr", { className: "hover:bg-gray-50", children: [
        /* @__PURE__ */ jsx("td", { className: "px-6 py-4 whitespace-nowrap", children: /* @__PURE__ */ jsx("div", { className: "text-sm font-medium text-gray-900", children: template.name }) }),
        /* @__PURE__ */ jsx("td", { className: "px-6 py-4 whitespace-nowrap", children: /* @__PURE__ */ jsx("div", { className: "text-sm text-gray-500", children: template.slug }) }),
        /* @__PURE__ */ jsx("td", { className: "px-6 py-4", children: /* @__PURE__ */ jsx("div", { className: "text-sm text-gray-500", children: template.description }) }),
        /* @__PURE__ */ jsx("td", { className: "px-6 py-4 whitespace-nowrap", children: /* @__PURE__ */ jsx("span", { className: `inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${template.status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}`, children: template.status === "active" ? "Active" : "Inactive" }) }),
        /* @__PURE__ */ jsx("td", { className: "px-6 py-4 whitespace-nowrap text-right text-sm font-medium", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-end space-x-3", children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => {
                setSelectedTemplate(template);
                setIsModalOpen(true);
              },
              className: "text-blue-600 hover:text-blue-900",
              children: /* @__PURE__ */ jsx(Edit2, { className: "w-4 h-4" })
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => handleDelete(template),
              className: "text-red-600 hover:text-red-900",
              children: /* @__PURE__ */ jsx(Trash2, { className: "w-4 h-4" })
            }
          )
        ] }) })
      ] }, template.id)) })
    ] }) }),
    filteredTemplates.length > ITEMS_PER_PAGE2 && /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-700", children: [
        "Showing",
        " ",
        /* @__PURE__ */ jsx("span", { className: "font-medium", children: Math.min((currentPage - 1) * ITEMS_PER_PAGE2 + 1, filteredTemplates.length) }),
        " ",
        "to",
        " ",
        /* @__PURE__ */ jsx("span", { className: "font-medium", children: Math.min(currentPage * ITEMS_PER_PAGE2, filteredTemplates.length) }),
        " ",
        "of ",
        /* @__PURE__ */ jsx("span", { className: "font-medium", children: filteredTemplates.length }),
        " templates"
      ] }) }),
      /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => setCurrentPage((page) => Math.max(1, page - 1)),
            disabled: currentPage === 1,
            className: `px-3 py-1 rounded ${currentPage === 1 ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-300"}`,
            children: "Previous"
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => setCurrentPage(
              (page) => Math.min(Math.ceil(filteredTemplates.length / ITEMS_PER_PAGE2), page + 1)
            ),
            disabled: currentPage >= Math.ceil(filteredTemplates.length / ITEMS_PER_PAGE2),
            className: `px-3 py-1 rounded ${currentPage >= Math.ceil(filteredTemplates.length / ITEMS_PER_PAGE2) ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-300"}`,
            children: "Next"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsx(
      TemplateTypeModal,
      {
        isOpen: isModalOpen,
        onClose: () => setIsModalOpen(false),
        template: selectedTemplate,
        onSave: fetchTemplates
      }
    )
  ] });
}
const AVAILABLE_COMPONENTS = [
  { name: "SEOHead", label: "SEO Meta Tags" },
  { name: "HeaderComponent", label: "Header" },
  { name: "FlightSearchComponent", label: "Flight Search" },
  { name: "PricingTableComponent", label: "City-City Pricing" },
  { name: "StateCityPricingComponent", label: "State-City Pricing" },
  { name: "StatePricingComponent", label: "State Pricing" },
  { name: "RouteInfoComponent", label: "City Route Information" },
  { name: "StateRouteInfoComponent", label: "State Route Information" },
  { name: "FAQComponent", label: "City FAQ Section" },
  { name: "StateFAQComponent", label: "State FAQ Section" },
  { name: "RelatedDestinationsComponent", label: "Related Destinations" },
  { name: "FooterComponent", label: "Footer" }
];
function TemplateComponentsPanel({ templateId, onUpdate }) {
  const [components, setComponents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [draggedIndex, setDraggedIndex] = useState(null);
  useEffect(() => {
    if (templateId) {
      fetchComponents();
    } else {
      setComponents(
        AVAILABLE_COMPONENTS.map((c, idx) => ({
          id: `temp-${idx}`,
          component_name: c.name,
          display_order: idx + 1,
          status: "inactive"
        }))
      );
      setLoading(false);
    }
  }, [templateId]);
  const fetchComponents = async () => {
    try {
      setLoading(true);
      setError(null);
      const { data, error: error2 } = await supabase$1.from("seo_template_components").select("*").eq("template_id", templateId).order("display_order");
      if (error2) throw error2;
      const existingComponents = new Set(data == null ? void 0 : data.map((c) => c.component_name));
      const missingComponents = AVAILABLE_COMPONENTS.filter((c) => !existingComponents.has(c.name));
      if (missingComponents.length > 0 && templateId) {
        const { error: insertError } = await supabase$1.from("seo_template_components").insert(
          missingComponents.map((c, idx) => ({
            template_id: templateId,
            component_name: c.name,
            display_order: ((data == null ? void 0 : data.length) || 0) + idx + 1,
            status: "inactive"
          }))
        );
        if (insertError) throw insertError;
        const { data: updatedData, error: refetchError } = await supabase$1.from("seo_template_components").select("*").eq("template_id", templateId).order("display_order");
        if (refetchError) throw refetchError;
        setComponents(updatedData || []);
      } else {
        setComponents(data || []);
      }
    } catch (err) {
      console.error("Error fetching components:", err);
      setError("Failed to load template components");
    } finally {
      setLoading(false);
    }
  };
  const handleDragStart = (index) => {
    setDraggedIndex(index);
  };
  const handleDragOver = (e, index) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;
    const newComponents = [...components];
    const draggedComponent = newComponents[draggedIndex];
    newComponents.splice(draggedIndex, 1);
    newComponents.splice(index, 0, draggedComponent);
    newComponents.forEach((c, idx) => {
      c.display_order = idx + 1;
    });
    setComponents(newComponents);
    setDraggedIndex(index);
  };
  const handleDragEnd = async () => {
    if (draggedIndex === null) return;
    setDraggedIndex(null);
    if (!templateId) return;
    try {
      setSaving(true);
      const updates = components.map((component) => ({
        id: component.id,
        template_id: templateId,
        component_name: component.component_name,
        display_order: component.display_order,
        status: component.status
      }));
      const { error: error2 } = await supabase$1.from("seo_template_components").upsert(updates);
      if (error2) throw error2;
      if (onUpdate) onUpdate();
    } catch (err) {
      console.error("Error updating component order:", err);
      setError("Failed to update component order");
      await fetchComponents();
    } finally {
      setSaving(false);
    }
  };
  const toggleComponentStatus = async (componentId, currentStatus) => {
    if (!templateId) return;
    try {
      setSaving(true);
      setError(null);
      const newStatus = currentStatus === "active" ? "inactive" : "active";
      const { error: error2 } = await supabase$1.from("seo_template_components").update({ status: newStatus }).eq("id", componentId).eq("template_id", templateId);
      if (error2) throw error2;
      setComponents(components.map(
        (c) => c.id === componentId ? { ...c, status: newStatus } : c
      ));
      if (onUpdate) onUpdate();
    } catch (err) {
      console.error("Error toggling component status:", err);
      setError("Failed to update component status");
    } finally {
      setSaving(false);
    }
  };
  if (loading) {
    return /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center p-8", children: /* @__PURE__ */ jsx(Loader2, { className: "w-8 h-8 text-blue-600 animate-spin" }) });
  }
  return /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsx("h3", { className: "text-lg font-medium text-gray-900", children: "Template Components" }),
      saving && /* @__PURE__ */ jsxs("div", { className: "flex items-center text-sm text-blue-600", children: [
        /* @__PURE__ */ jsx(Loader2, { className: "w-4 h-4 mr-2 animate-spin" }),
        "Saving changes..."
      ] })
    ] }),
    error && /* @__PURE__ */ jsxs("div", { className: "p-4 bg-red-50 border border-red-200 rounded-lg flex items-center text-red-700", children: [
      /* @__PURE__ */ jsx(AlertCircle, { className: "w-5 h-5 mr-2" }),
      error
    ] }),
    !templateId && /* @__PURE__ */ jsx("div", { className: "p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-yellow-700", children: "Save the template first to enable component management." }),
    /* @__PURE__ */ jsx("div", { className: "bg-white rounded-lg border border-gray-200", children: components.map((component, index) => {
      const componentInfo = AVAILABLE_COMPONENTS.find((c) => c.name === component.component_name);
      if (!componentInfo) return null;
      return /* @__PURE__ */ jsxs(
        "div",
        {
          draggable: !!templateId,
          onDragStart: () => handleDragStart(index),
          onDragOver: (e) => handleDragOver(e, index),
          onDragEnd: handleDragEnd,
          className: `
                flex items-center gap-4 p-4 border-b border-gray-100 last:border-0
                ${draggedIndex === index ? "bg-blue-50" : "hover:bg-gray-50"}
                ${templateId ? "cursor-move" : "cursor-not-allowed opacity-75"}
              `,
          children: [
            /* @__PURE__ */ jsx("div", { className: "text-gray-400", children: /* @__PURE__ */ jsx(GripVertical, { className: "w-5 h-5" }) }),
            /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
              /* @__PURE__ */ jsx("div", { className: "font-medium text-gray-900", children: componentInfo.label }),
              /* @__PURE__ */ jsx("div", { className: "text-sm text-gray-500", children: component.component_name })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsxs("div", { className: "text-sm text-gray-500", children: [
                "Order: ",
                component.display_order
              ] }),
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: () => toggleComponentStatus(component.id, component.status),
                  disabled: saving || !templateId,
                  className: `
                    flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium
                    ${!templateId ? "opacity-50 cursor-not-allowed" : ""}
                    ${component.status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}
                  `,
                  children: component.status === "active" ? /* @__PURE__ */ jsxs(Fragment, { children: [
                    /* @__PURE__ */ jsx(Check, { className: "w-4 h-4" }),
                    "Active"
                  ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
                    /* @__PURE__ */ jsx(X, { className: "w-4 h-4" }),
                    "Inactive"
                  ] })
                }
              )
            ] })
          ]
        },
        component.id
      );
    }) }),
    /* @__PURE__ */ jsx("div", { className: "text-sm text-gray-500", children: templateId ? "Drag and drop components to reorder. Click the status button to enable/disable components." : "Save the template to enable component management." })
  ] });
}
function TemplateConfigurations() {
  const [templateTypes, setTemplateTypes] = useState([]);
  const [selectedType, setSelectedType] = useState("");
  const [template, setTemplate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [previewData, setPreviewData] = useState({
    city: "Tirana",
    state: "Albania",
    nga_city: "Nga Tirana",
    per_city: "Për Tirana",
    nga_state: "Nga Albania",
    per_state: "Për Albania"
  });
  useEffect(() => {
    fetchTemplateTypes();
  }, []);
  useEffect(() => {
    if (selectedType) {
      fetchTemplate(selectedType);
    }
  }, [selectedType]);
  const fetchTemplateTypes = async () => {
    try {
      const { data, error: error2 } = await supabase$1.from("seo_template_types").select("*").order("name");
      if (error2) throw error2;
      setTemplateTypes(data || []);
      if (data == null ? void 0 : data[0]) {
        setSelectedType(data[0].id);
      }
    } catch (err) {
      console.error("Error fetching template types:", err);
      setError("Failed to load template types");
    } finally {
      setLoading(false);
    }
  };
  const fetchTemplate = async (typeId) => {
    try {
      setLoading(true);
      const { data, error: error2 } = await supabase$1.from("seo_page_templates").select("*").eq("template_type_id", typeId).single();
      if (error2 && error2.code !== "PGRST116") throw error2;
      if (data) {
        setTemplate(data);
      } else {
        setTemplate({
          id: "",
          template_type_id: typeId,
          url_structure: "",
          seo_title: "",
          meta_description: ""
        });
      }
    } catch (err) {
      console.error("Error fetching template:", err);
      setError("Failed to load template");
    } finally {
      setLoading(false);
    }
  };
  const handleSave = async () => {
    if (!template) return;
    try {
      setSaving(true);
      setError(null);
      setSuccess(false);
      const { error: saveError } = await supabase$1.from("seo_page_templates").upsert({
        template_type_id: selectedType,
        url_structure: template.url_structure,
        seo_title: template.seo_title,
        meta_description: template.meta_description
      }, {
        onConflict: "template_type_id"
      });
      if (saveError) throw saveError;
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3e3);
    } catch (err) {
      console.error("Error saving template:", err);
      setError("Failed to save template");
    } finally {
      setSaving(false);
    }
  };
  const replacePlaceholders = (text) => {
    return text.replace(/{nga_city}/g, previewData.nga_city || "").replace(/{per_city}/g, previewData.per_city || "").replace(/{nga_state}/g, previewData.nga_state || "").replace(/{per_state}/g, previewData.per_state || "");
  };
  if (loading) {
    return /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center p-8", children: /* @__PURE__ */ jsx(Loader2, { className: "w-8 h-8 text-blue-600 animate-spin" }) });
  }
  return /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Template Type" }),
      /* @__PURE__ */ jsx(
        "select",
        {
          value: selectedType,
          onChange: (e) => setSelectedType(e.target.value),
          className: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500",
          children: templateTypes.map((type) => /* @__PURE__ */ jsx("option", { value: type.id, children: type.name }, type.id))
        }
      )
    ] }),
    /* @__PURE__ */ jsx("div", { className: "bg-blue-50 border border-blue-100 rounded-lg p-4", children: /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3", children: [
      /* @__PURE__ */ jsx(HelpCircle, { className: "w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h4", { className: "text-sm font-medium text-blue-900 mb-2", children: "Available Placeholders" }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-blue-700", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("code", { className: "bg-blue-100 px-1.5 py-0.5 rounded", children: "{nga_city}" }),
            /* @__PURE__ */ jsx("span", { className: "ml-2", children: "Nga format for cities" })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("code", { className: "bg-blue-100 px-1.5 py-0.5 rounded", children: "{per_city}" }),
            /* @__PURE__ */ jsx("span", { className: "ml-2", children: "Për format for cities" })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("code", { className: "bg-blue-100 px-1.5 py-0.5 rounded", children: "{nga_state}" }),
            /* @__PURE__ */ jsx("span", { className: "ml-2", children: "Nga format for states" })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("code", { className: "bg-blue-100 px-1.5 py-0.5 rounded", children: "{per_state}" }),
            /* @__PURE__ */ jsx("span", { className: "ml-2", children: "Për format for states" })
          ] })
        ] })
      ] })
    ] }) }),
    error && /* @__PURE__ */ jsxs("div", { className: "p-4 bg-red-50 border border-red-200 rounded-lg flex items-center text-red-700", children: [
      /* @__PURE__ */ jsx(AlertCircle, { className: "w-5 h-5 mr-2" }),
      error
    ] }),
    success && /* @__PURE__ */ jsx("div", { className: "p-4 bg-green-50 border border-green-200 rounded-lg text-green-700", children: "Template saved successfully!" }),
    template && /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "URL Structure" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "text",
            value: template.url_structure,
            onChange: (e) => setTemplate({ ...template, url_structure: e.target.value }),
            placeholder: "/bileta-avioni-{nga_city}-ne-{per_city}/",
            className: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          }
        ),
        /* @__PURE__ */ jsxs("p", { className: "mt-1 text-sm text-gray-500", children: [
          "Preview: ",
          replacePlaceholders(template.url_structure)
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "SEO Title" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "text",
            value: template.seo_title,
            onChange: (e) => setTemplate({ ...template, seo_title: e.target.value }),
            placeholder: "Bileta Avioni {nga_city} në {per_city} | Rezervo Online",
            className: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          }
        ),
        /* @__PURE__ */ jsxs("p", { className: "mt-1 text-sm text-gray-500", children: [
          "Preview: ",
          replacePlaceholders(template.seo_title)
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Meta Description" }),
        /* @__PURE__ */ jsx(
          "textarea",
          {
            value: template.meta_description,
            onChange: (e) => setTemplate({ ...template, meta_description: e.target.value }),
            placeholder: "Rezervoni biletën tuaj {nga_city} në {per_city} me çmimet më të mira...",
            rows: 4,
            className: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          }
        ),
        /* @__PURE__ */ jsxs("p", { className: "mt-1 text-sm text-gray-500", children: [
          "Preview: ",
          replacePlaceholders(template.meta_description)
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "pt-6 border-t border-gray-200", children: /* @__PURE__ */ jsx(
        TemplateComponentsPanel,
        {
          templateId: template.id,
          onUpdate: () => setSuccess(true)
        }
      ) }),
      /* @__PURE__ */ jsxs("div", { className: "flex justify-end gap-3", children: [
        /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: () => {
              setTemplate({
                ...template,
                url_structure: "",
                seo_title: "",
                meta_description: ""
              });
            },
            className: "flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg",
            children: [
              /* @__PURE__ */ jsx(RefreshCw, { className: "w-5 h-5 mr-2" }),
              "Reset"
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: handleSave,
            disabled: saving,
            className: `flex items-center px-6 py-2 rounded-lg text-white ${saving ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"}`,
            children: [
              /* @__PURE__ */ jsx(Save, { className: "w-5 h-5 mr-2" }),
              saving ? "Saving..." : "Save Template"
            ]
          }
        )
      ] })
    ] })
  ] });
}
function RouteConnectionModal({ isOpen, onClose, connection, onSave }) {
  const [fromLocation, setFromLocation] = useState("");
  const [toLocation, setToLocation] = useState("");
  const [status, setStatus] = useState("active");
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    if (isOpen) {
      fetchLocations();
      if (connection) {
        setFromLocation(connection.from_location_id);
        setToLocation(connection.to_location_id);
        setStatus(connection.status);
      } else {
        setFromLocation("");
        setToLocation("");
        setStatus("active");
      }
    }
  }, [isOpen, connection]);
  const fetchLocations = async () => {
    try {
      const { data, error: error2 } = await supabase$1.from("seo_location_formats").select("*").eq("status", "ready").order("state, city");
      if (error2) throw error2;
      setLocations(data || []);
    } catch (err) {
      console.error("Error fetching locations:", err);
      setError("Failed to load locations");
    }
  };
  const generateTemplateUrl = (fromLoc, toLoc) => {
    const baseUrl = fromLoc.type === "city" && toLoc.type === "city" ? "bileta-avioni" : "fluturime";
    const fromPart = fromLoc.nga_format || `nga ${fromLoc.type === "city" ? fromLoc.city : fromLoc.state}`;
    const toPart = toLoc.per_format || `per ${toLoc.type === "city" ? toLoc.city : toLoc.state}`;
    return `/${baseUrl}/${fromPart}-${toPart}/`.toLowerCase().replace(/\s+/g, "-").replace(/[^\w\-\/]+/g, "").replace(/\-+/g, "-").replace(/^\-+|\-+$/g, "");
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      if (fromLocation === toLocation) {
        throw new Error("Cannot connect a location to itself");
      }
      const fromLoc = locations.find((l) => l.id === fromLocation);
      const toLoc = locations.find((l) => l.id === toLocation);
      if (!fromLoc || !toLoc) {
        throw new Error("Invalid locations selected");
      }
      const { data: templateType } = await supabase$1.from("seo_template_types").select("id").eq("slug", `${fromLoc.type}-${toLoc.type}`).eq("status", "active").single();
      if (!templateType) {
        throw new Error("No template type found for this connection");
      }
      const template_url = generateTemplateUrl(fromLoc, toLoc);
      if (connection == null ? void 0 : connection.id) {
        const { error: updateError } = await supabase$1.from("seo_location_connections").update({
          status,
          template_type_id: templateType.id,
          template_url,
          updated_at: (/* @__PURE__ */ new Date()).toISOString()
        }).eq("id", connection.id);
        if (updateError) throw updateError;
      } else {
        const { error: insertError } = await supabase$1.from("seo_location_connections").insert([{
          from_location_id: fromLocation,
          to_location_id: toLocation,
          status,
          template_type_id: templateType.id,
          template_url
        }]);
        if (insertError) throw insertError;
      }
      onSave();
      onClose();
    } catch (err) {
      console.error("Error saving connection:", err);
      setError(err instanceof Error ? err.message : "Failed to save connection");
    } finally {
      setLoading(false);
    }
  };
  if (!isOpen) return null;
  return /* @__PURE__ */ jsx("div", { className: "fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4", children: /* @__PURE__ */ jsx("div", { className: "bg-white rounded-xl max-w-md w-full", children: /* @__PURE__ */ jsxs("div", { className: "p-6", children: [
    /* @__PURE__ */ jsx("h2", { className: "text-xl font-bold mb-4", children: connection ? "Edit Route Connection" : "Add Route Connection" }),
    error && /* @__PURE__ */ jsx("div", { className: "mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg", children: error }),
    /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "From Location" }),
        /* @__PURE__ */ jsxs(
          "select",
          {
            value: fromLocation,
            onChange: (e) => setFromLocation(e.target.value),
            disabled: !!connection,
            className: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500",
            required: true,
            children: [
              /* @__PURE__ */ jsx("option", { value: "", children: "Select location" }),
              locations.map((loc) => /* @__PURE__ */ jsx("option", { value: loc.id, children: loc.nga_format || `nga ${loc.type === "city" ? loc.city : loc.state}` }, loc.id))
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "To Location" }),
        /* @__PURE__ */ jsxs(
          "select",
          {
            value: toLocation,
            onChange: (e) => setToLocation(e.target.value),
            disabled: !!connection,
            className: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500",
            required: true,
            children: [
              /* @__PURE__ */ jsx("option", { value: "", children: "Select location" }),
              locations.filter((loc) => loc.id !== fromLocation).map((loc) => /* @__PURE__ */ jsx("option", { value: loc.id, children: loc.per_format || `per ${loc.type === "city" ? loc.city : loc.state}` }, loc.id))
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Status" }),
        /* @__PURE__ */ jsxs(
          "select",
          {
            value: status,
            onChange: (e) => setStatus(e.target.value),
            className: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500",
            children: [
              /* @__PURE__ */ jsx("option", { value: "active", children: "Active" }),
              /* @__PURE__ */ jsx("option", { value: "inactive", children: "Inactive" })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex justify-end gap-3 pt-4", children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            onClick: onClose,
            className: "px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg",
            children: "Cancel"
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "submit",
            disabled: loading,
            className: `px-4 py-2 rounded-lg text-white ${loading ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"}`,
            children: loading ? "Saving..." : connection ? "Save Changes" : "Add Connection"
          }
        )
      ] })
    ] })
  ] }) }) });
}
function RouteConnections() {
  const [connections, setConnections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedConnection, setSelectedConnection] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [existingConnections, setExistingConnections] = useState(/* @__PURE__ */ new Set());
  const ITEMS_PER_PAGE2 = 10;
  useEffect(() => {
    fetchConnections();
  }, []);
  const fetchConnections = async () => {
    try {
      setLoading(true);
      setError(null);
      const { data: connectionsData, error: connectionsError } = await supabase$1.from("seo_location_connections").select(`
          *,
          from_location:from_location_id(
            id, type, city, state, status, nga_format
          ),
          to_location:to_location_id(
            id, type, city, state, status, per_format
          ),
          template_type:template_type_id(
            id, name, slug
          )
        `).order("created_at", { ascending: false });
      if (connectionsError) throw connectionsError;
      const existingSet = /* @__PURE__ */ new Set();
      connectionsData == null ? void 0 : connectionsData.forEach((conn) => {
        existingSet.add(`${conn.from_location_id}-${conn.to_location_id}`);
      });
      setExistingConnections(existingSet);
      const processedConnections = await Promise.all((connectionsData || []).map(async (connection) => {
        if (!connection.template_type_id) return connection;
        const { data: templateData } = await supabase$1.from("seo_page_templates").select("url_structure").eq("template_type_id", connection.template_type_id).single();
        if (templateData) {
          let url = templateData.url_structure;
          url = url.replace("{nga_city}", connection.from_location.nga_format || `nga-${connection.from_location.city}`);
          url = url.replace("{per_city}", connection.to_location.per_format || `per-${connection.to_location.city}`);
          url = url.replace("{nga_state}", connection.from_location.nga_format || `nga-${connection.from_location.state}`);
          url = url.replace("{per_state}", connection.to_location.per_format || `per-${connection.to_location.state}`);
          return {
            ...connection,
            template_url: url.toLowerCase().replace(/\s+/g, "-")
          };
        }
        return connection;
      }));
      setConnections(processedConnections);
    } catch (err) {
      console.error("Error fetching connections:", err);
      setError("Failed to load route connections");
    } finally {
      setLoading(false);
    }
  };
  const handleDelete = async (connection) => {
    if (!confirm("Are you sure you want to delete this connection?")) return;
    try {
      const { error: deleteError } = await supabase$1.from("seo_location_connections").delete().eq("id", connection.id);
      if (deleteError) throw deleteError;
      existingConnections.delete(`${connection.from_location_id}-${connection.to_location_id}`);
      setExistingConnections(new Set(existingConnections));
      await fetchConnections();
    } catch (err) {
      console.error("Error deleting connection:", err);
      setError("Failed to delete connection");
    }
  };
  const handleToggleStatus = async (connection) => {
    try {
      const newStatus = connection.status === "active" ? "inactive" : "active";
      const { error: updateError } = await supabase$1.from("seo_location_connections").update({
        status: newStatus,
        updated_at: (/* @__PURE__ */ new Date()).toISOString()
      }).eq("id", connection.id);
      if (updateError) throw updateError;
      await fetchConnections();
    } catch (err) {
      console.error("Error updating connection status:", err);
      setError("Failed to update connection status");
    }
  };
  const filteredConnections = connections.filter((connection) => {
    const fromLocation = connection.from_location.type === "city" ? connection.from_location.city : connection.from_location.state;
    const toLocation = connection.to_location.type === "city" ? connection.to_location.city : connection.to_location.state;
    const searchString = `${fromLocation} ${connection.from_location.state} ${toLocation} ${connection.to_location.state}`.toLowerCase();
    return searchString.includes(searchTerm.toLowerCase());
  });
  const paginatedConnections = filteredConnections.slice(
    (currentPage - 1) * ITEMS_PER_PAGE2,
    currentPage * ITEMS_PER_PAGE2
  );
  if (loading) {
    return /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center p-8", children: /* @__PURE__ */ jsx(Loader2, { className: "w-8 h-8 text-blue-600 animate-spin" }) });
  }
  return /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxs("div", { className: "relative flex-1 max-w-md", children: [
        /* @__PURE__ */ jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 text-gray-400", size: 20 }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "text",
            value: searchTerm,
            onChange: (e) => setSearchTerm(e.target.value),
            placeholder: "Search routes...",
            className: "w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs(
        "button",
        {
          onClick: () => {
            setSelectedConnection(void 0);
            setIsModalOpen(true);
          },
          className: "flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700",
          children: [
            /* @__PURE__ */ jsx(Plus, { className: "w-5 h-5 mr-2" }),
            "Add Route"
          ]
        }
      )
    ] }),
    error && /* @__PURE__ */ jsxs("div", { className: "p-4 bg-red-50 border border-red-200 rounded-lg flex items-center text-red-700", children: [
      /* @__PURE__ */ jsx(AlertCircle, { className: "w-5 h-5 mr-2" }),
      error
    ] }),
    /* @__PURE__ */ jsx("div", { className: "bg-white rounded-lg border border-gray-200 overflow-hidden", children: /* @__PURE__ */ jsxs("table", { className: "min-w-full divide-y divide-gray-200", children: [
      /* @__PURE__ */ jsx("thead", { className: "bg-gray-50", children: /* @__PURE__ */ jsxs("tr", { children: [
        /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "From" }),
        /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "To" }),
        /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Template Type" }),
        /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Status" }),
        /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Actions" })
      ] }) }),
      /* @__PURE__ */ jsx("tbody", { className: "bg-white divide-y divide-gray-200", children: paginatedConnections.map((connection) => {
        var _a2;
        return /* @__PURE__ */ jsxs("tr", { className: "hover:bg-gray-50", children: [
          /* @__PURE__ */ jsxs("td", { className: "px-6 py-4 whitespace-nowrap", children: [
            /* @__PURE__ */ jsxs("div", { className: "text-sm", children: [
              /* @__PURE__ */ jsx("span", { className: "font-medium text-gray-900", children: connection.from_location.type === "city" ? connection.from_location.city : connection.from_location.state }),
              /* @__PURE__ */ jsxs("span", { className: "text-gray-500 ml-1", children: [
                "(",
                connection.from_location.state,
                ")"
              ] })
            ] }),
            connection.from_location.nga_format && /* @__PURE__ */ jsxs("div", { className: "text-xs text-gray-500 mt-1", children: [
              "Format: ",
              connection.from_location.nga_format
            ] })
          ] }),
          /* @__PURE__ */ jsxs("td", { className: "px-6 py-4 whitespace-nowrap", children: [
            /* @__PURE__ */ jsxs("div", { className: "text-sm", children: [
              /* @__PURE__ */ jsx("span", { className: "font-medium text-gray-900", children: connection.to_location.type === "city" ? connection.to_location.city : connection.to_location.state }),
              /* @__PURE__ */ jsxs("span", { className: "text-gray-500 ml-1", children: [
                "(",
                connection.to_location.state,
                ")"
              ] })
            ] }),
            connection.to_location.per_format && /* @__PURE__ */ jsxs("div", { className: "text-xs text-gray-500 mt-1", children: [
              "Format: ",
              connection.to_location.per_format
            ] })
          ] }),
          /* @__PURE__ */ jsxs("td", { className: "px-6 py-4 whitespace-nowrap", children: [
            /* @__PURE__ */ jsx("div", { className: "text-sm text-gray-600", children: ((_a2 = connection.template_type) == null ? void 0 : _a2.name) || "Not Set" }),
            connection.template_url && /* @__PURE__ */ jsx("div", { className: "text-xs text-gray-500 mt-1 truncate max-w-xs", children: connection.template_url })
          ] }),
          /* @__PURE__ */ jsx("td", { className: "px-6 py-4 whitespace-nowrap", children: /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => handleToggleStatus(connection),
              className: `inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${connection.status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}`,
              children: connection.status === "active" ? "Active" : "Inactive"
            }
          ) }),
          /* @__PURE__ */ jsx("td", { className: "px-6 py-4 whitespace-nowrap text-right text-sm font-medium", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-end space-x-3", children: [
            connection.template_url && /* @__PURE__ */ jsx(
              "a",
              {
                href: connection.template_url,
                target: "_blank",
                rel: "noopener noreferrer",
                className: "text-blue-600 hover:text-blue-900",
                title: "Preview SEO Page",
                children: /* @__PURE__ */ jsx(ExternalLink, { className: "w-4 h-4" })
              }
            ),
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => {
                  setSelectedConnection(connection);
                  setIsModalOpen(true);
                },
                className: "text-blue-600 hover:text-blue-900",
                title: "Edit Connection",
                children: /* @__PURE__ */ jsx(Edit2, { className: "w-4 h-4" })
              }
            ),
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => handleDelete(connection),
                className: "text-red-600 hover:text-red-900",
                title: "Delete Connection",
                children: /* @__PURE__ */ jsx(Trash2, { className: "w-4 h-4" })
              }
            )
          ] }) })
        ] }, connection.id);
      }) })
    ] }) }),
    filteredConnections.length > ITEMS_PER_PAGE2 && /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-700", children: [
        "Showing",
        " ",
        /* @__PURE__ */ jsx("span", { className: "font-medium", children: Math.min((currentPage - 1) * ITEMS_PER_PAGE2 + 1, filteredConnections.length) }),
        " ",
        "to",
        " ",
        /* @__PURE__ */ jsx("span", { className: "font-medium", children: Math.min(currentPage * ITEMS_PER_PAGE2, filteredConnections.length) }),
        " ",
        "of ",
        /* @__PURE__ */ jsx("span", { className: "font-medium", children: filteredConnections.length }),
        " connections"
      ] }) }),
      /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => setCurrentPage((page) => Math.max(1, page - 1)),
            disabled: currentPage === 1,
            className: `px-3 py-1 rounded ${currentPage === 1 ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-300"}`,
            children: "Previous"
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => setCurrentPage(
              (page) => Math.min(Math.ceil(filteredConnections.length / ITEMS_PER_PAGE2), page + 1)
            ),
            disabled: currentPage >= Math.ceil(filteredConnections.length / ITEMS_PER_PAGE2),
            className: `px-3 py-1 rounded ${currentPage >= Math.ceil(filteredConnections.length / ITEMS_PER_PAGE2) ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-300"}`,
            children: "Next"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsx(
      RouteConnectionModal,
      {
        isOpen: isModalOpen,
        onClose: () => {
          setIsModalOpen(false);
          setSelectedConnection(void 0);
        },
        connection: selectedConnection,
        onSave: fetchConnections,
        existingConnections
      }
    )
  ] });
}
function ManageSeoPages() {
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE2 = 10;
  useEffect(() => {
    fetchPages();
  }, []);
  const fetchPages = async () => {
    try {
      setLoading(true);
      setError(null);
      const { data, error: error2 } = await supabase$1.from("seo_page_templates").select(`
          *,
          template_type:template_type_id(name, slug)
        `).order("created_at", { ascending: false });
      if (error2) throw error2;
      setPages(data || []);
    } catch (err) {
      console.error("Error fetching SEO pages:", err);
      setError("Failed to load SEO pages");
    } finally {
      setLoading(false);
    }
  };
  const filteredPages = pages.filter((page) => {
    const searchString = `${page.url_structure} ${page.seo_title} ${page.meta_description}`.toLowerCase();
    return searchString.includes(searchTerm.toLowerCase());
  });
  const paginatedPages = filteredPages.slice(
    (currentPage - 1) * ITEMS_PER_PAGE2,
    currentPage * ITEMS_PER_PAGE2
  );
  if (loading) {
    return /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center p-8", children: /* @__PURE__ */ jsx(Loader2, { className: "w-8 h-8 text-blue-600 animate-spin" }) });
  }
  if (error) {
    return /* @__PURE__ */ jsxs("div", { className: "p-4 bg-red-50 border border-red-200 rounded-lg flex items-center text-red-700", children: [
      /* @__PURE__ */ jsx(AlertCircle, { className: "w-5 h-5 mr-2" }),
      error
    ] });
  }
  if (pages.length === 0) {
    return /* @__PURE__ */ jsxs("div", { className: "text-center py-12", children: [
      /* @__PURE__ */ jsx("div", { className: "w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4", children: /* @__PURE__ */ jsx(AlertCircle, { className: "w-8 h-8 text-blue-600" }) }),
      /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold text-gray-900 mb-2", children: "No SEO Pages Found" }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-600 max-w-md mx-auto", children: "No SEO pages have been generated yet. Make sure you have enabled some states and configured locations as ready." })
    ] });
  }
  return /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxs("div", { className: "relative", children: [
      /* @__PURE__ */ jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 text-gray-400", size: 20 }),
      /* @__PURE__ */ jsx(
        "input",
        {
          type: "text",
          value: searchTerm,
          onChange: (e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          },
          placeholder: "Search pages...",
          className: "w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        }
      )
    ] }),
    /* @__PURE__ */ jsx("div", { className: "bg-white rounded-lg border border-gray-200 overflow-hidden", children: /* @__PURE__ */ jsxs("table", { className: "min-w-full divide-y divide-gray-200", children: [
      /* @__PURE__ */ jsx("thead", { className: "bg-gray-50", children: /* @__PURE__ */ jsxs("tr", { children: [
        /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "URL Structure" }),
        /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Title" }),
        /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Type" }),
        /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Actions" })
      ] }) }),
      /* @__PURE__ */ jsx("tbody", { className: "bg-white divide-y divide-gray-200", children: paginatedPages.map((page) => {
        var _a2;
        return /* @__PURE__ */ jsxs("tr", { className: "hover:bg-gray-50", children: [
          /* @__PURE__ */ jsx("td", { className: "px-6 py-4", children: /* @__PURE__ */ jsx("div", { className: "text-sm font-medium text-gray-900", children: page.url_structure }) }),
          /* @__PURE__ */ jsx("td", { className: "px-6 py-4", children: /* @__PURE__ */ jsx("div", { className: "text-sm text-gray-600 max-w-md truncate", children: page.seo_title }) }),
          /* @__PURE__ */ jsx("td", { className: "px-6 py-4", children: /* @__PURE__ */ jsx("div", { className: "text-sm text-gray-600", children: ((_a2 = page.template_type) == null ? void 0 : _a2.name) || "Unknown" }) }),
          /* @__PURE__ */ jsx("td", { className: "px-6 py-4 whitespace-nowrap text-right text-sm font-medium", children: /* @__PURE__ */ jsxs(
            "a",
            {
              href: page.url_structure,
              target: "_blank",
              rel: "noopener noreferrer",
              className: "inline-flex items-center text-blue-600 hover:text-blue-900",
              children: [
                /* @__PURE__ */ jsx(ExternalLink, { className: "w-4 h-4 mr-1" }),
                "View"
              ]
            }
          ) })
        ] }, page.id);
      }) })
    ] }) }),
    filteredPages.length > ITEMS_PER_PAGE2 && /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-700", children: [
        "Showing",
        " ",
        /* @__PURE__ */ jsx("span", { className: "font-medium", children: Math.min((currentPage - 1) * ITEMS_PER_PAGE2 + 1, filteredPages.length) }),
        " ",
        "to",
        " ",
        /* @__PURE__ */ jsx("span", { className: "font-medium", children: Math.min(currentPage * ITEMS_PER_PAGE2, filteredPages.length) }),
        " ",
        "of ",
        /* @__PURE__ */ jsx("span", { className: "font-medium", children: filteredPages.length }),
        " pages"
      ] }) }),
      /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => setCurrentPage((page) => Math.max(1, page - 1)),
            disabled: currentPage === 1,
            className: `px-3 py-1 rounded ${currentPage === 1 ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-300"}`,
            children: "Previous"
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => setCurrentPage(
              (page) => Math.min(Math.ceil(filteredPages.length / ITEMS_PER_PAGE2), page + 1)
            ),
            disabled: currentPage >= Math.ceil(filteredPages.length / ITEMS_PER_PAGE2),
            className: `px-3 py-1 rounded ${currentPage >= Math.ceil(filteredPages.length / ITEMS_PER_PAGE2) ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-300"}`,
            children: "Next"
          }
        )
      ] })
    ] })
  ] });
}
const TABS = [
  {
    id: "pages",
    label: "Manage SEO Pages",
    icon: /* @__PURE__ */ jsx(Book, { className: "w-5 h-5" })
  },
  {
    id: "states",
    label: "Select States for SEO",
    icon: /* @__PURE__ */ jsx(Globe, { className: "w-5 h-5" })
  },
  {
    id: "templates",
    label: "SEO Templates & Configurations",
    icon: /* @__PURE__ */ jsx(Settings, { className: "w-5 h-5" })
  },
  {
    id: "formats",
    label: "Location Formats",
    icon: /* @__PURE__ */ jsx(MapPin, { className: "w-5 h-5" })
  },
  {
    id: "types",
    label: "Template Types",
    icon: /* @__PURE__ */ jsx(Layout, { className: "w-5 h-5" })
  },
  {
    id: "routes",
    label: "Route Connections",
    icon: /* @__PURE__ */ jsx(Share2, { className: "w-5 h-5" })
  }
];
function SeoPages() {
  const [activeTab, setActiveTab] = useState("pages");
  const renderContent = () => {
    switch (activeTab) {
      case "states":
        return /* @__PURE__ */ jsx(StateSelection, {});
      case "formats":
        return /* @__PURE__ */ jsx(LocationFormats, {});
      case "types":
        return /* @__PURE__ */ jsx(TemplateTypes, {});
      case "templates":
        return /* @__PURE__ */ jsx(TemplateConfigurations, {});
      case "routes":
        return /* @__PURE__ */ jsx(RouteConnections, {});
      case "pages":
        return /* @__PURE__ */ jsx(ManageSeoPages, {});
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg shadow-md overflow-hidden", children: [
    /* @__PURE__ */ jsxs("div", { className: "px-6 py-4 border-b border-gray-200", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold text-gray-800", children: "SEO Pages Management" }),
      /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600 mt-1", children: "Manage your SEO pages, states, and templates" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "border-b border-gray-200", children: /* @__PURE__ */ jsx("div", { className: "flex flex-wrap", children: TABS.map((tab) => /* @__PURE__ */ jsxs(
      "button",
      {
        onClick: () => setActiveTab(tab.id),
        className: `
                flex items-center gap-2 px-6 py-3 text-sm font-medium border-b-2 
                ${activeTab === tab.id ? "border-blue-600 text-blue-600" : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"}
              `,
        children: [
          tab.icon,
          tab.label
        ]
      },
      tab.id
    )) }) }),
    /* @__PURE__ */ jsx("div", { className: "p-6", children: renderContent() })
  ] });
}
function SitemapGeneratorPage() {
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState(null);
  const [sitemap, setSitemap] = useState(null);
  const [lastGenerated, setLastGenerated] = useState(null);
  const [totalRoutes, setTotalRoutes] = useState(0);
  const generateSitemap = async () => {
    try {
      setGenerating(true);
      setError(null);
      let allRoutes = [];
      let page = 0;
      const pageSize = 1e3;
      let hasMore = true;
      while (hasMore) {
        const { data: routes, error: error2, count } = await supabase$1.from("seo_location_connections").select(`
            template_url,
            from_location:from_location_id(
              type, city, state, nga_format
            ),
            to_location:to_location_id(
              type, city, state, per_format
            )
          `, { count: "exact" }).eq("status", "active").not("template_url", "is", null).order("template_url").range(page * pageSize, (page + 1) * pageSize - 1);
        if (error2) throw error2;
        if (routes) {
          allRoutes = allRoutes.concat(routes);
        }
        hasMore = routes && routes.length === pageSize;
        page++;
        console.log(`Fetched ${(routes == null ? void 0 : routes.length) || 0} routes (page ${page}). Total so far: ${allRoutes.length}`);
      }
      setTotalRoutes(allRoutes.length);
      console.log(`Total routes fetched: ${allRoutes.length}`);
      const baseUrl = "https://biletaavioni.himatravel.com";
      const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${baseUrl}/about</loc>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  <url>
    <loc>${baseUrl}/contact</loc>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  <url>
    <loc>${baseUrl}/privacy</loc>
    <changefreq>monthly</changefreq>
    <priority>0.4</priority>
  </url>
  <url>
    <loc>${baseUrl}/terms</loc>
    <changefreq>monthly</changefreq>
    <priority>0.4</priority>
  </url>
  ${allRoutes.map((route) => `
  <url>
    <loc>${baseUrl}${route.template_url}</loc>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
    <lastmod>${(/* @__PURE__ */ new Date()).toISOString().split("T")[0]}</lastmod>
  </url>`).join("")}
</urlset>`;
      const { error: settingsError } = await supabase$1.from("system_settings").upsert({
        setting_name: "sitemap_xml",
        setting_value: true,
        description: xml
      }, {
        onConflict: "setting_name"
      });
      if (settingsError) throw settingsError;
      setSitemap(xml);
      setLastGenerated(/* @__PURE__ */ new Date());
    } catch (err) {
      console.error("Error generating sitemap:", err);
      setError(err instanceof Error ? err.message : "Failed to generate sitemap");
    } finally {
      setGenerating(false);
      setLoading(false);
    }
  };
  useEffect(() => {
    const fetchExistingSitemap = async () => {
      try {
        const { data, error: error2 } = await supabase$1.from("system_settings").select("description, updated_at").eq("setting_name", "sitemap_xml").single();
        if (error2) {
          if (error2.code === "PGRST116") {
            await generateSitemap();
          } else {
            throw error2;
          }
        } else if (data) {
          setSitemap(data.description);
          setLastGenerated(new Date(data.updated_at));
          setTotalRoutes((data.description.match(/<url>/g) || []).length - 5);
          setLoading(false);
        }
      } catch (err) {
        console.error("Error fetching sitemap:", err);
        setError(err instanceof Error ? err.message : "Failed to load sitemap");
        setLoading(false);
      }
    };
    fetchExistingSitemap();
  }, []);
  const handleDownload = () => {
    if (!sitemap) return;
    const blob = new Blob([sitemap], { type: "application/xml" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "sitemap.xml";
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };
  if (loading) {
    return /* @__PURE__ */ jsx("div", { className: "min-h-[400px] flex items-center justify-center", children: /* @__PURE__ */ jsx(Loader2, { className: "w-8 h-8 text-blue-600 animate-spin" }) });
  }
  return /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg shadow-md overflow-hidden", children: [
    /* @__PURE__ */ jsxs("div", { className: "px-6 py-4 border-b border-gray-200", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsx(Globe, { className: "w-6 h-6 text-blue-600" }),
          /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold text-gray-800", children: "Sitemap Generator" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: generateSitemap,
              disabled: generating,
              className: `flex items-center px-4 py-2 rounded-lg text-sm font-medium ${generating ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "bg-blue-600 text-white hover:bg-blue-700"}`,
              children: [
                /* @__PURE__ */ jsx(RefreshCw, { className: `w-4 h-4 mr-2 ${generating ? "animate-spin" : ""}` }),
                generating ? "Generating..." : "Regenerate Sitemap"
              ]
            }
          ),
          /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: handleDownload,
              disabled: !sitemap,
              className: "flex items-center px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed",
              children: [
                /* @__PURE__ */ jsx(Download, { className: "w-4 h-4 mr-2" }),
                "Download XML"
              ]
            }
          )
        ] })
      ] }),
      lastGenerated && /* @__PURE__ */ jsxs("div", { className: "text-sm text-gray-500 mt-2", children: [
        "Last generated: ",
        lastGenerated.toLocaleString(),
        " | Total routes: ",
        totalRoutes
      ] })
    ] }),
    error && /* @__PURE__ */ jsxs("div", { className: "m-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center text-red-700", children: [
      /* @__PURE__ */ jsx(AlertCircle, { className: "w-5 h-5 mr-2" }),
      error
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "p-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "bg-gray-900 rounded-lg overflow-hidden", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between px-4 py-2 bg-gray-800", children: [
          /* @__PURE__ */ jsx("div", { className: "text-sm text-gray-400", children: "sitemap.xml" }),
          /* @__PURE__ */ jsx("div", { className: "text-sm text-gray-400", children: sitemap ? `${(sitemap.length / 1024).toFixed(1)} KB` : "0 KB" })
        ] }),
        /* @__PURE__ */ jsx("pre", { className: "p-4 text-sm text-gray-300 overflow-x-auto max-h-[600px] overflow-y-auto", children: sitemap ? sitemap : "No sitemap generated yet" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-6 bg-blue-50 border border-blue-100 rounded-lg p-4", children: [
        /* @__PURE__ */ jsx("h3", { className: "text-sm font-medium text-blue-900 mb-2", children: "Public Access" }),
        /* @__PURE__ */ jsxs("p", { className: "text-sm text-blue-700", children: [
          "The sitemap is publicly accessible at:",
          " ",
          /* @__PURE__ */ jsx(
            "a",
            {
              href: "https://biletaavioni.himatravel.com/sitemap.xml",
              target: "_blank",
              rel: "noopener noreferrer",
              className: "underline hover:text-blue-900",
              children: "https://biletaavioni.himatravel.com/sitemap.xml"
            }
          )
        ] })
      ] })
    ] })
  ] });
}
function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalBookings: 0,
    totalSearches: 0
  });
  useState({
    api_endpoint: "https://serpapi.com",
    commission_rate: 0,
    api_key: ""
  });
  useState(true);
  useState(false);
  useState(null);
  useState(false);
  const navigate = useNavigate();
  const handleSignOut = async () => {
    await supabase$1.auth.signOut();
    navigate("/admin/login");
  };
  const StatCard = ({ title, value, icon: Icon }) => /* @__PURE__ */ jsxs("div", { className: "bg-white p-6 rounded-lg shadow-md", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-4", children: [
      /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold text-gray-700", children: title }),
      /* @__PURE__ */ jsx("div", { className: "p-2 bg-blue-100 rounded-full", children: /* @__PURE__ */ jsx(Icon, { className: "w-6 h-6 text-blue-600" }) })
    ] }),
    /* @__PURE__ */ jsx("p", { className: "text-3xl font-bold text-gray-900", children: value })
  ] });
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-gray-50 flex", children: [
    /* @__PURE__ */ jsxs("div", { className: "w-64 bg-white shadow-md", children: [
      /* @__PURE__ */ jsx("div", { className: "p-4 border-b border-gray-200", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
        /* @__PURE__ */ jsx(Settings, { className: "w-6 h-6 text-blue-600 mr-2" }),
        /* @__PURE__ */ jsx("span", { className: "text-xl font-bold text-gray-900", children: "Admin Panel" })
      ] }) }),
      /* @__PURE__ */ jsxs("nav", { className: "p-4 space-y-2", children: [
        /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: () => setActiveTab("overview"),
            className: `w-full flex items-center px-4 py-2 rounded-lg text-sm font-medium ${activeTab === "overview" ? "bg-blue-100 text-blue-700" : "text-gray-600 hover:bg-gray-50"}`,
            children: [
              /* @__PURE__ */ jsx(DollarSign, { className: "w-5 h-5 mr-3" }),
              "Overview"
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: () => setActiveTab("airports"),
            className: `w-full flex items-center px-4 py-2 rounded-lg text-sm font-medium ${activeTab === "airports" ? "bg-blue-100 text-blue-700" : "text-gray-600 hover:bg-gray-50"}`,
            children: [
              /* @__PURE__ */ jsx(Plane, { className: "w-5 h-5 mr-3" }),
              "Airports"
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: () => setActiveTab("commission"),
            className: `w-full flex items-center px-4 py-2 rounded-lg text-sm font-medium ${activeTab === "commission" ? "bg-blue-100 text-blue-700" : "text-gray-600 hover:bg-gray-50"}`,
            children: [
              /* @__PURE__ */ jsx(Percent, { className: "w-5 h-5 mr-3" }),
              "Commission Rules"
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: () => setActiveTab("tracking"),
            className: `w-full flex items-center px-4 py-2 rounded-lg text-sm font-medium ${activeTab === "tracking" ? "bg-blue-100 text-blue-700" : "text-gray-600 hover:bg-gray-50"}`,
            children: [
              /* @__PURE__ */ jsx(TrendingUp, { className: "w-5 h-5 mr-3" }),
              "Route Tracking"
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: () => setActiveTab("api"),
            className: `w-full flex items-center px-4 py-2 rounded-lg text-sm font-medium ${activeTab === "api" ? "bg-blue-100 text-blue-700" : "text-gray-600 hover:bg-gray-50"}`,
            children: [
              /* @__PURE__ */ jsx(Search, { className: "w-5 h-5 mr-3" }),
              "Manual API Search"
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: () => setActiveTab("scoring"),
            className: `w-full flex items-center px-4 py-2 rounded-lg text-sm font-medium ${activeTab === "scoring" ? "bg-blue-100 text-blue-700" : "text-gray-600 hover:bg-gray-50"}`,
            children: [
              /* @__PURE__ */ jsx(Star, { className: "w-5 h-5 mr-3" }),
              "Flight Scoring"
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: () => setActiveTab("seo"),
            className: `w-full flex items-center px-4 py-2 rounded-lg text-sm font-medium ${activeTab === "seo" ? "bg-blue-100 text-blue-700" : "text-gray-600 hover:bg-gray-50"}`,
            children: [
              /* @__PURE__ */ jsx(Globe, { className: "w-5 h-5 mr-3" }),
              "SEO Pages"
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: () => setActiveTab("sitemap"),
            className: `w-full flex items-center px-4 py-2 rounded-lg text-sm font-medium ${activeTab === "sitemap" ? "bg-blue-100 text-blue-700" : "text-gray-600 hover:bg-gray-50"}`,
            children: [
              /* @__PURE__ */ jsx(FileText, { className: "w-5 h-5 mr-3" }),
              "Sitemap Generator"
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: () => setActiveTab("system"),
            className: `w-full flex items-center px-4 py-2 rounded-lg text-sm font-medium ${activeTab === "system" ? "bg-blue-100 text-blue-700" : "text-gray-600 hover:bg-gray-50"}`,
            children: [
              /* @__PURE__ */ jsx(Database, { className: "w-5 h-5 mr-3" }),
              "System Controls"
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: () => setActiveTab("docs"),
            className: `w-full flex items-center px-4 py-2 rounded-lg text-sm font-medium ${activeTab === "docs" ? "bg-blue-100 text-blue-700" : "text-gray-600 hover:bg-gray-50"}`,
            children: [
              /* @__PURE__ */ jsx(Book, { className: "w-5 h-5 mr-3" }),
              "Documentation"
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
      /* @__PURE__ */ jsx("nav", { className: "bg-white shadow-sm", children: /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxs("div", { className: "flex justify-between h-16", children: [
        /* @__PURE__ */ jsx("div", { className: "flex items-center space-x-8", children: /* @__PURE__ */ jsxs("div", { className: "hidden md:flex space-x-4", children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => setActiveTab("searches"),
              className: `px-3 py-2 rounded-md text-sm font-medium ${activeTab === "searches" ? "bg-blue-100 text-blue-700" : "text-gray-500 hover:text-gray-700"}`,
              children: "Client Searches"
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => setActiveTab("agents"),
              className: `px-3 py-2 rounded-md text-sm font-medium ${activeTab === "agents" ? "bg-blue-100 text-blue-700" : "text-gray-500 hover:text-gray-700"}`,
              children: "Sales Agents"
            }
          )
        ] }) }),
        /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: handleSignOut,
            className: "flex items-center px-4 py-2 text-gray-700 hover:text-gray-900",
            children: [
              /* @__PURE__ */ jsx(LogOut, { className: "w-5 h-5 mr-2" }),
              "Sign Out"
            ]
          }
        )
      ] }) }) }),
      /* @__PURE__ */ jsxs("main", { className: "p-8", children: [
        activeTab === "overview" && /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6 mb-8", children: [
          /* @__PURE__ */ jsx(StatCard, { title: "Total Users", value: stats.totalUsers, icon: Users }),
          /* @__PURE__ */ jsx(StatCard, { title: "Total Bookings", value: stats.totalBookings, icon: BookOpen }),
          /* @__PURE__ */ jsx(StatCard, { title: "Saved Searches", value: stats.totalSearches, icon: Search })
        ] }),
        activeTab === "airports" && /* @__PURE__ */ jsx(AirportsManagement, {}),
        activeTab === "searches" && /* @__PURE__ */ jsx(AdminClientSearches, {}),
        activeTab === "agents" && /* @__PURE__ */ jsx(SalesAgentManagement, {}),
        activeTab === "commission" && /* @__PURE__ */ jsx(CommissionRulesManagement, {}),
        activeTab === "tracking" && /* @__PURE__ */ jsx(RouteTrackingDashboard, {}),
        activeTab === "api" && /* @__PURE__ */ jsx(ManualApiSearch, {}),
        activeTab === "system" && /* @__PURE__ */ jsx(SystemSettings, {}),
        activeTab === "scoring" && /* @__PURE__ */ jsx(FlightScoringSettings, {}),
        activeTab === "docs" && /* @__PURE__ */ jsx(AdminDocumentation, {}),
        activeTab === "seo" && /* @__PURE__ */ jsx(SeoPages, {}),
        activeTab === "sitemap" && /* @__PURE__ */ jsx(SitemapGeneratorPage, {})
      ] })
    ] })
  ] });
}
function AgentLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const { data: authData, error: authError } = await supabase$1.auth.signInWithPassword({
        email,
        password
      });
      if (authError) {
        if (authError.message === "Invalid login credentials") {
          throw new Error("Invalid email or password");
        }
        throw authError;
      }
      if (!authData.user) {
        throw new Error("Authentication failed");
      }
      const { data: agentData, error: agentError } = await supabase$1.from("sales_agents").select("id, is_active").eq("id", authData.user.id).maybeSingle();
      if (agentError) {
        throw new Error("Failed to verify agent status");
      }
      if (!agentData) {
        throw new Error("Invalid sales agent account");
      }
      if (!agentData.is_active) {
        throw new Error("Your account is currently inactive. Please contact the administrator.");
      }
      navigate("/agent/dashboard");
    } catch (err) {
      console.error("Login error:", err);
      setError(err instanceof Error ? err.message : "An error occurred during login");
      await supabase$1.auth.signOut();
    } finally {
      setLoading(false);
    }
  };
  return /* @__PURE__ */ jsx("div", { className: "min-h-screen bg-gray-50 flex items-center justify-center p-4", children: /* @__PURE__ */ jsx("div", { className: "max-w-md w-full", children: /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg shadow-md p-8", children: [
    /* @__PURE__ */ jsx("div", { className: "flex justify-center mb-8", children: /* @__PURE__ */ jsx("div", { className: "bg-blue-100 p-3 rounded-full", children: /* @__PURE__ */ jsx(Lock, { className: "w-8 h-8 text-blue-600" }) }) }),
    /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold text-center text-gray-900 mb-8", children: "Sales Agent Login" }),
    error && /* @__PURE__ */ jsx("div", { className: "mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg", children: error }),
    /* @__PURE__ */ jsxs("form", { onSubmit: handleLogin, className: "space-y-6", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Email" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "email",
            value: email,
            onChange: (e) => setEmail(e.target.value),
            className: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500",
            required: true
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Password" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "password",
            value: password,
            onChange: (e) => setPassword(e.target.value),
            className: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500",
            required: true
          }
        )
      ] }),
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "submit",
          disabled: loading,
          className: `w-full py-3 rounded-lg font-semibold text-white ${loading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}`,
          children: loading ? "Please wait..." : "Sign In"
        }
      )
    ] }),
    /* @__PURE__ */ jsx("div", { className: "mt-4 text-center", children: /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-600", children: [
      "Don't have an agent account?",
      " ",
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => navigate("/agent/register"),
          className: "text-blue-600 hover:text-blue-700",
          children: "Register here"
        }
      )
    ] }) })
  ] }) }) });
}
function AgentRegister() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const { data: authData, error: authError } = await supabase$1.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
            phone_number: phoneNumber,
            role: "agent"
          }
        }
      });
      if (authError) throw authError;
      if (!authData.user) throw new Error("Failed to create user");
      const { error: profileError } = await supabase$1.from("sales_agents").insert([
        {
          id: authData.user.id,
          name,
          email,
          phone_number: phoneNumber
        }
      ]);
      if (profileError) throw profileError;
      navigate("/agent/login");
    } catch (err) {
      console.error("Registration error:", err);
      setError(err instanceof Error ? err.message : "Failed to register");
    } finally {
      setLoading(false);
    }
  };
  return /* @__PURE__ */ jsx("div", { className: "min-h-screen bg-gray-50 flex items-center justify-center p-4", children: /* @__PURE__ */ jsx("div", { className: "max-w-md w-full", children: /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg shadow-md p-8", children: [
    /* @__PURE__ */ jsx("div", { className: "flex justify-center mb-8", children: /* @__PURE__ */ jsx("div", { className: "bg-blue-100 p-3 rounded-full", children: /* @__PURE__ */ jsx(UserPlus, { className: "w-8 h-8 text-blue-600" }) }) }),
    /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold text-center text-gray-900 mb-8", children: "Sales Agent Registration" }),
    error && /* @__PURE__ */ jsx("div", { className: "mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg", children: error }),
    /* @__PURE__ */ jsxs("form", { onSubmit: handleRegister, className: "space-y-6", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Full Name" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "text",
            value: name,
            onChange: (e) => setName(e.target.value),
            className: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500",
            required: true
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Email" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "email",
            value: email,
            onChange: (e) => setEmail(e.target.value),
            className: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500",
            required: true
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Password" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "password",
            value: password,
            onChange: (e) => setPassword(e.target.value),
            minLength: 8,
            className: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500",
            required: true
          }
        ),
        /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-gray-500", children: "Must be at least 8 characters long" })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Phone Number" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "tel",
            value: phoneNumber,
            onChange: (e) => setPhoneNumber(e.target.value),
            className: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          }
        )
      ] }),
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "submit",
          disabled: loading,
          className: `w-full py-3 rounded-lg font-semibold text-white ${loading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}`,
          children: loading ? "Please wait..." : "Register"
        }
      )
    ] }),
    /* @__PURE__ */ jsx("div", { className: "mt-4 text-center", children: /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-600", children: [
      "Already have an account?",
      " ",
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => navigate("/agent/login"),
          className: "text-blue-600 hover:text-blue-700",
          children: "Sign in"
        }
      )
    ] }) })
  ] }) }) });
}
function SitemapPage() {
  const [sitemap, setSitemap] = useState(null);
  useEffect(() => {
    const fetchSitemap = async () => {
      try {
        const { data: settings, error: settingsError } = await supabase$1.from("system_settings").select("description").eq("setting_name", "sitemap_xml").single();
        if (!settingsError && (settings == null ? void 0 : settings.description)) {
          setSitemap(settings.description);
          return;
        }
        const { data: routes, error: routesError } = await supabase$1.from("seo_location_connections").select("template_url, updated_at").eq("status", "active").not("template_url", "is", null).order("template_url");
        if (routesError) throw routesError;
        const baseUrl = "https://biletaavioni.himatravel.com";
        const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  ${(routes || []).map((route) => `
  <url>
    <loc>${baseUrl}${route.template_url}</loc>
    <lastmod>${new Date(route.updated_at).toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>`).join("")}
</urlset>`;
        setSitemap(xml);
        await supabase$1.from("system_settings").upsert({
          setting_name: "sitemap_xml",
          setting_value: true,
          description: xml
        }, {
          onConflict: "setting_name"
        });
      } catch (err) {
        console.error("Error generating sitemap:", err);
      }
    };
    fetchSitemap();
  }, []);
  useEffect(() => {
    const meta = document.createElement("meta");
    meta.httpEquiv = "Content-Type";
    meta.content = "application/xml";
    document.head.appendChild(meta);
    return () => {
      document.head.removeChild(meta);
    };
  }, []);
  return sitemap ? /* @__PURE__ */ jsx("pre", { style: { display: "none" }, children: sitemap }) : null;
}
function UserSitemapPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [routes, setRoutes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const itemsPerPage = 20;
  useEffect(() => {
    fetchRoutes();
  }, []);
  const fetchRoutes = async () => {
    try {
      const { data, error: error2 } = await supabase$1.from("seo_location_connections").select(`
          template_url,
          from_location:from_location_id(
            type, city, state, nga_format
          ),
          to_location:to_location_id(
            type, city, state, per_format
          )
        `).eq("status", "active").not("template_url", "is", null).order("template_url");
      if (error2) throw error2;
      setRoutes(data || []);
    } catch (err) {
      console.error("Error fetching routes:", err);
      setError(err instanceof Error ? err.message : "Failed to load routes");
    } finally {
      setLoading(false);
    }
  };
  const filteredRoutes = routes.filter((route) => {
    var _a2, _b2;
    const searchLower = searchTerm.toLowerCase();
    const fromCity = ((_a2 = route.from_location.city) == null ? void 0 : _a2.toLowerCase()) || "";
    const fromState = route.from_location.state.toLowerCase();
    const toCity = ((_b2 = route.to_location.city) == null ? void 0 : _b2.toLowerCase()) || "";
    const toState = route.to_location.state.toLowerCase();
    return fromCity.includes(searchLower) || fromState.includes(searchLower) || toCity.includes(searchLower) || toState.includes(searchLower);
  });
  const totalPages = Math.ceil(filteredRoutes.length / itemsPerPage);
  const paginatedRoutes = filteredRoutes.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  if (loading) {
    return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-gray-50", children: [
      /* @__PURE__ */ jsx(Navbar, {}),
      /* @__PURE__ */ jsx("div", { className: "container mx-auto px-4 py-12", children: /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center min-h-[400px]", children: /* @__PURE__ */ jsx(Loader2, { className: "w-8 h-8 text-blue-600 animate-spin" }) }) }),
      /* @__PURE__ */ jsx(GlobalFooter, {})
    ] });
  }
  if (error) {
    return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-gray-50", children: [
      /* @__PURE__ */ jsx(Navbar, {}),
      /* @__PURE__ */ jsx("div", { className: "container mx-auto px-4 py-12", children: /* @__PURE__ */ jsxs("div", { className: "bg-red-50 border border-red-200 rounded-lg p-4 text-red-700 flex items-center", children: [
        /* @__PURE__ */ jsx(AlertCircle, { className: "w-5 h-5 mr-2" }),
        error
      ] }) }),
      /* @__PURE__ */ jsx(GlobalFooter, {})
    ] });
  }
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-gray-50", children: [
    /* @__PURE__ */ jsx(Navbar, {}),
    /* @__PURE__ */ jsx("main", { className: "container mx-auto px-4 py-12", children: /* @__PURE__ */ jsxs("div", { className: "max-w-5xl mx-auto", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center mb-12", children: [
        /* @__PURE__ */ jsx("h1", { className: "text-3xl md:text-4xl font-bold text-gray-900 mb-4", children: "Të Gjitha Destinacionet" }),
        /* @__PURE__ */ jsx("p", { className: "text-lg text-gray-600", children: "Zbuloni të gjitha destinacionet tona dhe gjeni fluturimin tuaj të ardhshëm" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "mb-8", children: /* @__PURE__ */ jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsx(Search, { className: "absolute left-4 top-1/2 -translate-y-1/2 text-gray-400", size: 20 }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "text",
            value: searchTerm,
            onChange: (e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            },
            placeholder: "Kërko destinacione...",
            className: "w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          }
        )
      ] }) }),
      /* @__PURE__ */ jsx("div", { className: "grid gap-4", children: paginatedRoutes.map((route, index) => {
        const fromName = route.from_location.type === "city" ? route.from_location.city : route.from_location.state;
        const toName = route.to_location.type === "city" ? route.to_location.city : route.to_location.state;
        return /* @__PURE__ */ jsxs(
          "a",
          {
            href: route.template_url,
            className: "bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow flex items-center justify-between group",
            children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-6", children: [
                /* @__PURE__ */ jsx("div", { className: "p-3 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors", children: /* @__PURE__ */ jsx(Plane, { className: "w-6 h-6 text-blue-600" }) }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 text-lg font-medium text-gray-900", children: [
                    /* @__PURE__ */ jsx("span", { children: fromName }),
                    /* @__PURE__ */ jsx(ChevronRight, { className: "w-5 h-5 text-gray-400" }),
                    /* @__PURE__ */ jsx("span", { children: toName })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "text-sm text-gray-500 mt-1", children: [
                    route.from_location.state,
                    " → ",
                    route.to_location.state
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsx(ChevronRight, { className: "w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" })
            ]
          },
          index
        );
      }) }),
      totalPages > 1 && /* @__PURE__ */ jsx("div", { className: "mt-8 flex justify-center", children: /* @__PURE__ */ jsxs("nav", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => setCurrentPage((p) => Math.max(1, p - 1)),
            disabled: currentPage === 1,
            className: "px-3 py-1 rounded border border-gray-300 disabled:bg-gray-100 disabled:text-gray-400",
            children: "Previous"
          }
        ),
        Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => setCurrentPage(page),
            className: `w-8 h-8 rounded-full ${currentPage === page ? "bg-blue-600 text-white" : "text-gray-600 hover:bg-gray-100"}`,
            children: page
          },
          page
        )),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => setCurrentPage((p) => Math.min(totalPages, p + 1)),
            disabled: currentPage === totalPages,
            className: "px-3 py-1 rounded border border-gray-300 disabled:bg-gray-100 disabled:text-gray-400",
            children: "Next"
          }
        )
      ] }) })
    ] }) }),
    /* @__PURE__ */ jsx(GlobalFooter, {})
  ] });
}
function App() {
  const { user } = useAuth();
  const isAdmin = (user == null ? void 0 : user.email) === "admin@example.com";
  return /* @__PURE__ */ jsx(HelmetProvider, { children: /* @__PURE__ */ jsx("div", { className: "min-h-screen flex flex-col bg-gray-50", children: /* @__PURE__ */ jsxs(Routes, { children: [
    /* @__PURE__ */ jsx(
      Route,
      {
        path: "/admin/login",
        element: !isAdmin ? /* @__PURE__ */ jsx(AdminLogin, {}) : /* @__PURE__ */ jsx(Navigate, { to: "/admin", replace: true })
      }
    ),
    /* @__PURE__ */ jsx(
      Route,
      {
        path: "/admin/*",
        element: isAdmin ? /* @__PURE__ */ jsx(AdminDashboard, {}) : /* @__PURE__ */ jsx(Navigate, { to: "/admin/login", replace: true })
      }
    ),
    /* @__PURE__ */ jsx(Route, { path: "/agent/login", element: /* @__PURE__ */ jsx(AgentLogin, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "/agent/register", element: /* @__PURE__ */ jsx(AgentRegister, {}) }),
    /* @__PURE__ */ jsx(
      Route,
      {
        path: "/home",
        element: /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx(Navbar, {}),
          /* @__PURE__ */ jsx(HomePage, {}),
          /* @__PURE__ */ jsx(GlobalFooter, {})
        ] })
      }
    ),
    /* @__PURE__ */ jsx(
      Route,
      {
        path: "/results",
        element: /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx(Navbar, {}),
          /* @__PURE__ */ jsx(ResultsPage, {}),
          /* @__PURE__ */ jsx(GlobalFooter, {})
        ] })
      }
    ),
    /* @__PURE__ */ jsx(
      Route,
      {
        path: "/seo-preview",
        element: /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx(Navbar, {}),
          /* @__PURE__ */ jsx(SEOPreview, {}),
          /* @__PURE__ */ jsx(GlobalFooter, {})
        ] })
      }
    ),
    /* @__PURE__ */ jsx(Route, { path: "/contact", element: /* @__PURE__ */ jsx(ContactPage, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "/privacy", element: /* @__PURE__ */ jsx(PrivacyPage, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "/terms", element: /* @__PURE__ */ jsx(TermsPage, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "/cookies", element: /* @__PURE__ */ jsx(CookiesPage, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "/about", element: /* @__PURE__ */ jsx(AboutPage, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "/careers", element: /* @__PURE__ */ jsx(CareersPage, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "/sitemap", element: /* @__PURE__ */ jsx(UserSitemapPage, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "bileta-avioni/:params?", element: /* @__PURE__ */ jsx(SEOPage, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "/fluturime/:params?", element: /* @__PURE__ */ jsx(SEOPage, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "/sitemap.xml", element: /* @__PURE__ */ jsx(SitemapPage, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "/", element: /* @__PURE__ */ jsx(Navigate, { to: "/home", replace: true }) }),
    /* @__PURE__ */ jsx(Route, { path: "*", element: /* @__PURE__ */ jsx(Navigate, { to: "/home", replace: true }) })
  ] }) }) });
}
if (typeof document !== "undefined") {
  hydrateRoot(
    document.getElementById("root"),
    /* @__PURE__ */ jsx(React.StrictMode, { children: /* @__PURE__ */ jsx(BrowserRouter, { children: /* @__PURE__ */ jsx(HelmetProvider, { children: /* @__PURE__ */ jsx(AuthProvider, { children: /* @__PURE__ */ jsx(App, {}) }) }) }) })
  );
}
