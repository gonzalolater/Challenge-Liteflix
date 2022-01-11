import { useRef, useCallback } from "react";
import PropTypes from "prop-types";
import { useLocation, useRouteMatch } from "react-router-dom";

const isArray = arr => Array.isArray(arr);

const array = arr => (isArray(arr) ? arr : []);

// const focusRef = () => {
//   const ref = useRef(null);
//   const setRef = useCallback(node => {
//     if (node) node.querySelector("input").focus();
//     ref.current = node;
// });
// return setRef;
// };

const refPropType = () => PropTypes.oneOfType([PropTypes.func, PropTypes.shape({ current: PropTypes.object })]);

const childrenPropType = () => PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]);

const mapArrayPropType = () => PropTypes.shape({ data: PropTypes.arrayOf(PropTypes.object), map: PropTypes.arrayOf(PropTypes.object) });

const filterByParentId = ({ data, map }, parentId) =>
  array(data).filter(d => parentId && array(map).some(m => m?.id === d?.id && m?.parentId === parentId));

const filterByParentIds = ({ data, map }, parentIds) =>
  array(data).filter(d => array(map).some(m => m.id === d.id && array(parentIds).some(parentId => m.parentId === parentId)));

const anyById = (data, id) => data.some(x => x.id === id);

const fileSize = bytes => {
  if (!bytes) return "0 Bytes";
  const suffixes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  let val = (bytes / 1024 ** i).toFixed(2);
  let decimal = false;
  while ([".", "0"].indexOf(val[val.length - 1]) >= 0 && !decimal) {
    decimal = val[val.length - 1] === ".";
    val = val.substr(0, val.length - 1);
  }
  return `${val} ${suffixes[i]}`;
};

const useDebounce = (fn, delay = 0) => {
  const ref = useRef({ id: 0 });
  ref.current.fn = fn;
  const bouncer = useCallback(
    (...args) => {
      ref.current.promise = new Promise((resolve, reject) => {
        ref.current.resolve = resolve;
        ref.current.reject = reject;
      });
      if (ref.current.timeout) {
        clearTimeout(ref.current.timeout);
      }
      ref.current.timeout = setTimeout(async () => {
        const id = ref.current.id + 1;
        const checkLatest = () => id === ref.current.id;
        ref.current.id = id;
        try {
          const response = await ref.current.fn(...args);
          if (checkLatest()) ref.current.resolve(response);
        } catch (err) {
          if (checkLatest()) ref.current.reject(err);
        } finally {
          if (checkLatest()) ref.current.promise = undefined;
        }
        ref.current.timeout = undefined;
      }, delay);
      return ref.current.promise;
    },
    [delay]
  );
  return bouncer;
};

const useLastRouteId = route => {
  const { pathname } = useLocation();
  const paths = pathname.split("/");
  const index = paths.findIndex(item => item === route);
  const id = parseInt(paths[index + 1], 0);

  return Number.isNaN(id) ? null : id;
};

const useRouteParam = (name, int = true) => {
  const { params } = useRouteMatch();
  const sId = params[name];
  if (!sId) return undefined;
  if (!int) return sId;
  const id = parseInt(sId, 0);
  if (Number.isNaN(id)) return undefined;
  return id;
};

const mapOptionStrings = arr => arr.map((text, ix) => ({ id: ix + 1, text }));

const handleComplexChange = (prevState, name, value) => {
  if (name.indexOf(".") >= 0) {
    const names = name.split(".");
    const [name1, name2, name3] = names;
    if (names.length === 3) return { ...prevState, [name1]: { ...prevState[name1], [name2]: { ...prevState[name1][name2], [name3]: value } } };
    return { ...prevState, [name1]: { ...prevState[name1], [name2]: value } };
  }
  return { ...prevState, [name]: value };
};

const capitalizeFirstLetter = word => word.charAt(0).toLocaleUpperCase() + word.slice(1);

const lowerFirstLetter = word => word.charAt(0).toLocaleLowerCase() + word.slice(1);

const propByToolbar = (theme, prop, fnParse) => {
  const { toolbar } = theme.mixins;
  const source = "minHeight";
  const fn = v => (typeof fnParse === "function" ? fnParse(v) : v);
  return Object.keys(toolbar).reduce(
    (acc, p) => ({ ...acc, [p === source ? prop : p]: p === source ? fn(toolbar[p]) : { [prop]: fn(toolbar[p][source]) } }),
    {}
  );
};

const propsByToolbar = (theme, props, fnParse) => {
  if (!Array.isArray(props) || !props.some(() => true)) return {};
  const { toolbar } = theme.mixins;
  const source = "minHeight";
  const mapProps = v => props.reduce((acc, p) => ({ ...acc, [p]: typeof fnParse === "function" ? fnParse(v, p) : v }), {});
  return Object.keys(toolbar).reduce((acc, p) => {
    if (p === source) return { ...acc, ...mapProps(toolbar[p]) };
    return { ...acc, [p]: mapProps(toolbar[p][source]) };
  }, {});
};

const embeddedArray = (arraySource, arrayTarget) => arrayTarget.every(o => arraySource.includes(o));
const isNullOrEmpty = variable => variable === null || variable === undefined || variable === "";
const isStateId = stateId =>
  !isNullOrEmpty(stateId) && ((typeof stateId === "number" && stateId > 0) || (typeof stateId === "string" && stateId.length > 0));
const verifyStateId = (filter, stateId) => {
  if (typeof stateId === "number") return filter?.states?.findIndex(id => id === stateId) > -1;
  if (typeof stateId === "string") return embeddedArray(filter?.states, stateId.split(","));
  return true;
};

const isFilterEnabled = (filter, clientId, stateId, lobId) => {
  const isEnabled =
    (clientId != null || !isNullOrEmpty(stateId) || lobId != null) &&
    (filter?.clients.length > 0 || filter?.states.length > 0 || filter?.lob.length > 0) &&
    ((clientId != null && filter?.clients?.findIndex(id => id === clientId) > -1) ||
      !clientId ||
      (stateId != null && verifyStateId(filter, stateId)) ||
      !stateId ||
      (lobId != null && filter?.lob?.findIndex(id => id === lobId) > -1) ||
      !lobId);
  return isEnabled;
};

const getRule = (rules, attr, withoutFilter) => {
  if (!withoutFilter && rules.some(elem => elem.isFiltered === false)) return rules.some(elem => elem[attr] === true && elem.isFiltered === false);
  if (rules.some(elem => elem.isFiltered === true) && !withoutFilter) return rules.some(elem => elem[attr] === true && elem.isFiltered === true);
  return rules.some(elem => elem[attr] === true);
};

const getUserAccess = (securityProfilesDetails, codeName, clientId, stateId, lobId) => {
  const rules = [];
  const withoutFilter = !clientId && !isStateId(stateId) && !lobId;
  securityProfilesDetails.forEach(elem => {
    elem.rules.forEach(el => {
      if (el.code === codeName.split(".")[0]) {
        const r = el?.children?.find(element => element.code === codeName);
        if (r?.id > 0) {
          if (elem.clients?.length > 0 || elem.states?.length > 0 || elem.lob?.length > 0) {
            const isFiltered = isFilterEnabled(elem, clientId, stateId, lobId) || withoutFilter;
            if (isFiltered === true) {
              rules.push({ ...r, isFiltered: true });
            }
          } else {
            rules.push({ ...r, isFiltered: false });
          }
        }
      }
    });
  });
  const rule = {
    read: getRule(rules, "read", withoutFilter),
    create: getRule(rules, "create", withoutFilter),
    update: getRule(rules, "update", withoutFilter),
    delete: getRule(rules, "delete", withoutFilter)
  };

  return rule;
};

const combineDateTime = (date, time, asDate) => {
  if (Number.isNaN(Date.parse(date)) || Number.isNaN(Date.parse(time))) return null;
  const d = new Date(date);
  const t = new Date(time);
  const parts = [
    [`0${d.getMonth() + 1}`, "-"],
    [`0${d.getDate()}`, "T"],
    [`0${t.getHours()}`, ":"],
    [`0${t.getMinutes()}`, ":00"]
  ];
  const value = `${d.getFullYear()}-${parts.map(([x, s]) => `${x.substr(x.length - 2)}${s}`).join("")}`;
  if (asDate) return new Date(value);
  return value;
};

const findSelect = (arr, id) => array(arr).find(item => item.id === id)?.text;

const capitalize = txt =>
  String(txt || "")
    .split(" ")
    .map(t => t.trim())
    .filter(t => t)
    .reduce((a, t) => [...a, `${t.charAt(0).toUpperCase()}${t.slice(1)}`], [])
    .join(" ");

const setExportTitleFileName = title => `TerraClaim_${title}`;

const isObject = item => item && typeof item === "object" && !isArray(item);

const parseObject = obj => ({ ...(isObject(obj) ? obj : {}) });
const arrayFromValues = vals =>
  array(vals).reduce((a, v, i) => {
    if (typeof v === "string") return [...a, { id: i + 1, text: v }];
    if (isObject(v)) return [...a, { ...v, id: v.id || i + 1 }];
    return a;
  }, []);

const mergeDeep = (target, ...sources) => {
  if (!sources.length) return target;
  const source = sources.shift();
  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach(key => {
      if (!isObject(source[key])) return Object.assign(target, { [key]: source[key] });
      if (!target[key]) Object.assign(target, { [key]: {} });
      return mergeDeep(target[key], source[key]);
    });
  }
  return mergeDeep(target, ...sources);
};
const treeReserveTypes = (rtList, current, lobId, ltgId) => {
  const reserveTypeByLob = rtList
    .filter(elem => elem.claimLineOfBusinessId === lobId && elem.claimLossTypeGroupId === ltgId)
    .map(elem => ({ ...elem, text: elem.name, subOptions: elem.reserveTypes.map(el => ({ ...el, text: el.name, subOptions: [] })) }));
  return reserveTypeByLob.reduce(
    (acc, rt) =>
      current.find(c => c.typeId === rt.id || c.parentId === rt.id)
        ? [
            ...acc,
            { ...rt, level: rt.level || 0 },
            ...treeReserveTypes(
              rt.reserveTypes.map(srt => ({ ...srt, text: srt.name, level: (rt.level || 0) + 1 })),
              current,
              lobId,
              ltgId
            )
          ]
        : [...acc],
    []
  );
};
const isFunction = fn => typeof fn === "function";
export {
  isArray,
  array,
  arrayFromValues,
  childrenPropType,
//   focusRef,
  refPropType,
  fileSize,
  filterByParentId,
  filterByParentIds,
  anyById,
  mapArrayPropType,
  useDebounce,
  handleComplexChange,
  useLastRouteId,
  useRouteParam,
  lowerFirstLetter,
  capitalizeFirstLetter,
  propByToolbar,
  propsByToolbar,
  getUserAccess,
  combineDateTime,
  findSelect,
  capitalize,
  setExportTitleFileName,
  mapOptionStrings,
  isObject,
  parseObject,
  mergeDeep,
  treeReserveTypes,
  isFunction,
  isNullOrEmpty
};
