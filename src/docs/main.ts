import {
  ScrollRise,
} from "scroll-rise";

const versionEl = document.getElementById('version');
versionEl!.textContent = ScrollRise.version();
