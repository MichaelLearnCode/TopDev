import Tab from './components/Tab.js';
import Dropdown from './components/Dropdown.js';

Tab({}).init().defaultActive(1);
Dropdown({}).init();
Dropdown({dropdownClass: 'js-dropdown-2'}).init();
